// Outbound providers: SMS (Twilio), email (SMTP), payments (Stripe).
// In sandbox mode (missing keys or SANDBOX=true) every provider is a MOCK that writes
// to the `outbox` table (Admin -> Outbox) and logs to the console.
import { config } from '../config.js';
import { getDb, getSetting } from '../db.js';
import { nowIso, cardFee } from './util.js';

let stripeClient = null;
let twilioClient = null;
let mailer = null;

async function getStripe() {
  if (stripeClient) return stripeClient;
  const { default: Stripe } = await import('stripe');
  stripeClient = new Stripe(config.stripe.secretKey, { apiVersion: '2024-12-18.acacia' });
  return stripeClient;
}
async function getTwilio() {
  if (twilioClient) return twilioClient;
  const { default: twilio } = await import('twilio');
  twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
  return twilioClient;
}
async function getMailer() {
  if (mailer) return mailer;
  const { default: nodemailer } = await import('nodemailer');
  mailer = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: { user: config.smtp.user, pass: config.smtp.pass }
  });
  return mailer;
}

export function recordOutbox(channel, to, subject, body, meta = {}) {
  const r = getDb().prepare('INSERT INTO outbox (channel, to_addr, subject, body, meta, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(channel, to || '', subject || '', body || '', JSON.stringify(meta), nowIso());
  console.log(`[outbox:${channel}] to=${to} ${subject ? 'subject=' + JSON.stringify(subject) + ' ' : ''}body=${JSON.stringify(body)}`);
  return r.lastInsertRowid;
}

function recordMessage({ contactId, direction, channel, from, to, subject, body, status, providerId, campaignId }) {
  const r = getDb().prepare(`INSERT INTO messages (contact_id, direction, channel, from_addr, to_addr, subject, body, status, provider_id, campaign_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(contactId ?? null, direction, channel, from || '', to || '', subject || '', body, status, providerId || null, campaignId || null, nowIso());
  return r.lastInsertRowid;
}

/**
 * Send an SMS. Returns { ok, id, providerId, mock }.
 * opts: { contactId, campaignId, skipFooter, bypassOptIn }
 */
export async function sendSms(to, body, opts = {}) {
  const fromNumber = config.twilio.phoneNumber || getSetting('twilio_number') || config.business.phoneE164;
  const db = getDb();
  const contact = opts.contactId ? db.prepare('SELECT * FROM contacts WHERE id = ?').get(opts.contactId) : null;
  if (contact && !contact.sms_opt_in && !opts.bypassOptIn) {
    recordMessage({ contactId: opts.contactId, direction: 'out', channel: 'sms', from: fromNumber, to, body, status: 'blocked_opt_out', campaignId: opts.campaignId });
    return { ok: false, error: 'Contact opted out of SMS' };
  }
  let text = String(body || '').trim();
  const footer = getSetting('sms_footer', 'Reply STOP to opt out');
  if (opts.appendFooter && footer && !text.toLowerCase().includes('stop')) text += `\n${footer}`;

  if (config.providers.sms === 'twilio') {
    try {
      const client = await getTwilio();
      const params = { to, body: text };
      if (config.twilio.messagingServiceSid) params.messagingServiceSid = config.twilio.messagingServiceSid;
      else params.from = fromNumber;
      const msg = await client.messages.create(params);
      const id = recordMessage({ contactId: opts.contactId, direction: 'out', channel: 'sms', from: fromNumber, to, body: text, status: 'sent', providerId: msg.sid, campaignId: opts.campaignId });
      return { ok: true, id, providerId: msg.sid };
    } catch (e) {
      recordMessage({ contactId: opts.contactId, direction: 'out', channel: 'sms', from: fromNumber, to, body: text, status: 'failed', campaignId: opts.campaignId });
      return { ok: false, error: e.message };
    }
  }
  const outboxId = recordOutbox('sms', to, '', text, { contactId: opts.contactId || null, campaignId: opts.campaignId || null, ...(opts.meta || {}) });
  const id = recordMessage({ contactId: opts.contactId, direction: 'out', channel: 'sms', from: fromNumber, to, body: text, status: 'sent (mock)', providerId: 'mock-' + outboxId, campaignId: opts.campaignId });
  return { ok: true, id, providerId: 'mock-' + outboxId, mock: true };
}

/** Send an email. opts: { contactId, campaignId, html } */
export async function sendEmail(to, subject, body, opts = {}) {
  const from = config.smtp.from;
  if (config.providers.email === 'smtp') {
    try {
      const t = await getMailer();
      const info = await t.sendMail({ from, to, subject, text: body, html: opts.html });
      const id = recordMessage({ contactId: opts.contactId, direction: 'out', channel: 'email', from, to, subject, body, status: 'sent', providerId: info.messageId, campaignId: opts.campaignId });
      return { ok: true, id, providerId: info.messageId };
    } catch (e) {
      recordMessage({ contactId: opts.contactId, direction: 'out', channel: 'email', from, to, subject, body, status: 'failed', campaignId: opts.campaignId });
      return { ok: false, error: e.message };
    }
  }
  const outboxId = recordOutbox('email', to, subject, body, { contactId: opts.contactId || null, campaignId: opts.campaignId || null, ...(opts.meta || {}) });
  const id = recordMessage({ contactId: opts.contactId, direction: 'out', channel: 'email', from, to, subject, body, status: 'sent (mock)', providerId: 'mock-' + outboxId, campaignId: opts.campaignId });
  return { ok: true, id, providerId: 'mock-' + outboxId, mock: true };
}

/** Notify the owner (SMS to OWNER_PHONE, plus email). */
export async function notifyOwner(text) {
  const phone = getSetting('owner_phone') || config.owner.phone;
  const r = await sendSms(phone, text, { bypassOptIn: true, meta: { owner_alert: true } });
  if (config.owner.email) await sendEmail(config.owner.email, 'Piets HQ alert', text, { meta: { owner_alert: true } });
  return r;
}

/**
 * Create a Stripe Checkout session for an invoice (card, 4% fee added on top).
 * Returns { url, sessionId, mock }.
 */
export async function createInvoiceCheckout(invoice, contact) {
  const due = Math.max(0, invoice.total_cents - invoice.paid_cents);
  const fee = cardFee(due);
  const feePct = getSetting('card_fee_percent', '4');
  const successUrl = `${config.baseUrl}/portal/invoices/${invoice.id}?paid=1`;
  const cancelUrl = `${config.baseUrl}/portal/invoices/${invoice.id}`;
  if (config.providers.stripe === 'stripe') {
    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: contact?.email || undefined,
      line_items: [
        { price_data: { currency: 'usd', product_data: { name: `Invoice ${invoice.number}` }, unit_amount: due }, quantity: 1 },
        { price_data: { currency: 'usd', product_data: { name: `Card processing fee (${feePct}%)` }, unit_amount: fee }, quantity: 1 }
      ],
      metadata: { invoice_id: String(invoice.id), invoice_number: invoice.number, contact_id: String(invoice.contact_id), fee_cents: String(fee), amount_cents: String(due) },
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    getDb().prepare('UPDATE invoices SET stripe_session_id = ? WHERE id = ?').run(session.id, invoice.id);
    return { url: session.url, sessionId: session.id };
  }
  const sessionId = 'cs_mock_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const url = `${config.baseUrl}/mock/stripe/checkout/${sessionId}`;
  getDb().prepare('UPDATE invoices SET stripe_session_id = ? WHERE id = ?').run(sessionId, invoice.id);
  recordOutbox('payment', contact?.email || contact?.phone || '', `Card payment link for ${invoice.number}`, url,
    { invoice_id: invoice.id, amount_cents: due, fee_cents: fee, total_cents: due + fee, session_id: sessionId, mode: 'payment' });
  return { url, sessionId, mock: true, amount_cents: due, fee_cents: fee };
}

/** Create a Stripe Checkout session in subscription mode for a managed-services plan. */
export async function createSubscriptionCheckout(contact, plan, priceCents) {
  const successUrl = `${config.baseUrl}/portal/plans?subscribed=1`;
  const cancelUrl = `${config.baseUrl}/portal/plans`;
  const db = getDb();
  if (config.providers.stripe === 'stripe') {
    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: contact?.email || undefined,
      line_items: [{ price_data: { currency: 'usd', recurring: { interval: 'month' }, product_data: { name: `Managed Services - ${plan}` }, unit_amount: priceCents }, quantity: 1 }],
      metadata: { contact_id: String(contact.id), plan },
      subscription_data: { metadata: { contact_id: String(contact.id), plan } },
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    db.prepare('INSERT INTO subscriptions (contact_id, plan, status, price_cents, stripe_session_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .run(contact.id, plan, 'pending', priceCents, session.id, nowIso(), nowIso());
    return { url: session.url, sessionId: session.id };
  }
  const sessionId = 'cs_mock_sub_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const url = `${config.baseUrl}/mock/stripe/checkout/${sessionId}`;
  db.prepare('INSERT INTO subscriptions (contact_id, plan, status, price_cents, stripe_session_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(contact.id, plan, 'pending', priceCents, sessionId, nowIso(), nowIso());
  recordOutbox('payment', contact?.email || contact?.phone || '', `Subscription checkout (${plan})`, url,
    { contact_id: contact.id, plan, price_cents: priceCents, session_id: sessionId, mode: 'subscription' });
  return { url, sessionId, mock: true };
}

export async function verifyStripeEvent(rawBody, signature) {
  if (config.providers.stripe === 'stripe' && config.stripe.webhookSecret) {
    const stripe = await getStripe();
    return stripe.webhooks.constructEvent(rawBody, signature, config.stripe.webhookSecret);
  }
  return JSON.parse(rawBody.toString('utf8'));
}

export async function validateTwilioSignature(req) {
  if (config.providers.sms !== 'twilio') return true;
  const { default: twilio } = await import('twilio');
  const url = `${config.baseUrl}${req.originalUrl}`;
  return twilio.validateRequest(config.twilio.authToken, req.get('x-twilio-signature') || '', url, req.body || {});
}

export function providerStatus() {
  return {
    sandbox: config.sandbox,
    stripe: config.providers.stripe,
    sms: config.providers.sms,
    email: config.providers.email
  };
}
