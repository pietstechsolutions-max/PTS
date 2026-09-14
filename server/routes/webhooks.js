// Inbound webhooks from Twilio (SMS) and Stripe (payments / subscriptions).
import { Router } from 'express';
import { getDb, getSetting } from '../db.js';
import { config } from '../config.js';
import { nowIso, normalizePhone, audit } from '../lib/util.js';
import { validateTwilioSignature, verifyStripeEvent, sendSms, notifyOwner } from '../lib/providers.js';
import { upsertContact, setSmsOptIn, createLead, getInvoice, recordPayment } from '../lib/services.js';
import { fireTrigger, enqueue, kickQueue } from '../lib/automations.js';
import { emitEvent } from '../lib/events.js';
import { getAgent } from '../lib/ai.js';
import { attributeReply } from '../lib/campaigns.js';
import { applyCheckoutCompleted } from './public.js';

const router = Router();

const twiml = (text) => `<?xml version="1.0" encoding="UTF-8"?><Response>${text ? `<Message>${text.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))}</Message>` : ''}</Response>`;

const STOP_WORDS = ['stop', 'stopall', 'unsubscribe', 'cancel', 'end', 'quit'];
const START_WORDS = ['start', 'yes', 'unstop'];

router.post('/twilio/sms', async (req, res, next) => {
  try {
    if (!(await validateTwilioSignature(req))) {
      audit('twilio', 'bad_signature', 'webhook', null, req.originalUrl);
      return res.status(403).send('Invalid signature');
    }
    const from = normalizePhone(req.body.From || '');
    const to = req.body.To || '';
    const text = String(req.body.Body || '').trim();
    const word = text.toLowerCase().replace(/[^a-z]/g, '');
    const db = getDb();
    if (!from) return res.status(400).send('Missing From');

    const { contact, created } = upsertContact({ phone: from, source: 'Inbound SMS' });
    const msgId = Number(db.prepare(`INSERT INTO messages (contact_id, direction, channel, from_addr, to_addr, body, status, provider_id, created_at) VALUES (?, 'in', 'sms', ?, ?, ?, 'received', ?, ?)`)
      .run(contact.id, from, to, text, req.body.MessageSid || null, nowIso()).lastInsertRowid);
    audit('twilio', 'inbound_sms', 'contact', contact.id, text.slice(0, 200));
    emitEvent('inbound_sms', { contactId: contact.id, messageId: msgId, text, keyword: word });

    // Compliance keywords (Twilio also handles these at the carrier level; we mirror the flag).
    if (STOP_WORDS.includes(word)) {
      setSmsOptIn(contact.id, false, 'Replied ' + text);
      attributeReply(contact.id, true);
      res.type('text/xml');
      return res.send(twiml(`${getSetting('business_name')}: You are unsubscribed and will receive no more texts. Reply START to re-subscribe.`));
    }
    if (START_WORDS.includes(word) && !contact.sms_opt_in) {
      setSmsOptIn(contact.id, true, 'Replied ' + text);
      res.type('text/xml');
      return res.send(twiml(`${getSetting('business_name')}: You are re-subscribed. Reply STOP to opt out.`));
    }
    if (word === 'help' || word === 'info') {
      res.type('text/xml');
      return res.send(twiml(`${getSetting('business_name')}: Low-voltage tech help on Long Island. Call ${getSetting('business_phone')} or email ${getSetting('business_email')}. Reply STOP to opt out.`));
    }

    attributeReply(contact.id, false);
    // 6-digit login codes are never accepted over SMS (login only through the portal form).
    if (/^\d{6}$/.test(word === '' ? text : word) || /^\d{6}$/.test(text)) {
      res.type('text/xml');
      return res.send(twiml('For your security, please enter your login code on the website, not by text.'));
    }

    // AI lead qualifier (Admin -> Integrations -> AI agents): runs from the queue so Twilio gets an instant answer.
    const qualifier = getAgent('lead_qualifier');
    if (qualifier?.enabled && !qualifier.archived && qualifier.autopilot !== 'off') {
      enqueue('ai_agent', { agent: 'lead_qualifier', contactId: contact.id, input: { text, source: 'inbound_sms', message_id: msgId }, actor: 'inbound_sms' });
      kickQueue();
    }

    // Keyword QUOTE -> create a lead and auto-reply.
    if (word === 'quote' || word === 'estimate') {
      await createLead({ name: contact.first_name ? `${contact.first_name} ${contact.last_name}`.trim() : '', phone: from, service: 'Text-in quote request', message: text, source: 'SMS keyword' });
      res.type('text/xml');
      return res.send(twiml(`Thanks! ${getSetting('business_name')} got your request. Reply with what you need (cameras, Wi-Fi, TV mount, smart home, etc.) and your town, and we'll text you back to set up a free estimate. Reply STOP to opt out.`));
    }

    // Other keyword automations + owner notification of the reply.
    await fireTrigger('inbound_sms_keyword', { contactId: contact.id, keyword: word, text });
    await notifyOwner(`SMS from ${contact.first_name || from}${created ? ' (new contact)' : ''}: "${text}" - reply in Admin -> Conversations: ${config.baseUrl}/admin/conversations/${contact.id}`);
    res.type('text/xml');
    return res.send(twiml(''));
  } catch (e) { next(e); }
});

router.post('/stripe', async (req, res) => {
  let event;
  try {
    event = await verifyStripeEvent(req.body, req.get('stripe-signature'));
  } catch (e) {
    audit('stripe', 'bad_signature', 'webhook', null, e.message);
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }
  const db = getDb();
  const obj = event.data?.object || {};
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const r = applyCheckoutCompleted(obj);
        audit('stripe', event.type, 'stripe', null, r);
        break;
      }
      case 'invoice.paid': {
        // Subscription renewals arrive as Stripe invoices; keep the subscription active and log the payment.
        const subId = typeof obj.subscription === 'string' ? obj.subscription : obj.subscription?.id;
        if (subId) {
          const sub = db.prepare('SELECT * FROM subscriptions WHERE stripe_subscription_id = ?').get(subId);
          if (sub) {
            db.prepare("UPDATE subscriptions SET status = CASE WHEN status = 'cancel_requested' THEN status ELSE 'active' END, updated_at = ? WHERE id = ?").run(nowIso(), sub.id);
            db.prepare('INSERT INTO payments (invoice_id, contact_id, amount_cents, fee_cents, method, reference, provider_id, created_at) VALUES (NULL, ?, ?, 0, ?, ?, ?, ?)')
              .run(sub.contact_id, Number(obj.amount_paid) || sub.price_cents, 'Card', `Subscription ${sub.plan} - Stripe invoice ${obj.id}`, obj.id, nowIso());
          }
        } else if (obj.metadata?.invoice_id) {
          const inv = getInvoice(Number(obj.metadata.invoice_id));
          if (inv && !db.prepare('SELECT id FROM payments WHERE provider_id = ?').get(obj.id)) {
            recordPayment(inv.id, { amount_cents: Number(obj.amount_paid) || inv.due_cents, method: 'Card', reference: 'Stripe invoice ' + obj.id, provider_id: obj.id }, 'stripe');
          }
        }
        audit('stripe', event.type, 'stripe', null, obj.id);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = db.prepare('SELECT * FROM subscriptions WHERE stripe_subscription_id = ?').get(obj.id)
          || (obj.metadata?.contact_id ? db.prepare("SELECT * FROM subscriptions WHERE contact_id = ? ORDER BY id DESC LIMIT 1").get(Number(obj.metadata.contact_id)) : null);
        if (sub) {
          const map = { active: 'active', trialing: 'active', past_due: 'past_due', canceled: 'canceled', unpaid: 'past_due', incomplete: 'pending', incomplete_expired: 'canceled', paused: 'paused' };
          let status = map[obj.status] || sub.status;
          if (event.type === 'customer.subscription.deleted') status = 'canceled';
          if (obj.cancel_at_period_end && status === 'active') status = 'cancel_requested';
          db.prepare('UPDATE subscriptions SET status = ?, stripe_subscription_id = ?, ended_at = ?, updated_at = ? WHERE id = ?')
            .run(status, obj.id, status === 'canceled' ? nowIso() : null, nowIso(), sub.id);
          if (status === 'active' && sub.status !== 'active') emitEvent('subscription_started', { contactId: sub.contact_id, subscriptionId: sub.id });
          if ((status === 'canceled' || status === 'cancel_requested') && sub.status !== status) emitEvent('subscription_canceled', { contactId: sub.contact_id, subscriptionId: sub.id, extra: { status } });
        }
        audit('stripe', event.type, 'subscription', sub?.id || null, obj.id);
        break;
      }
      default:
        audit('stripe', 'ignored_event', 'stripe', null, event.type);
    }
  } catch (e) {
    console.error('stripe webhook handler error', e);
    return res.status(500).json({ received: false, error: e.message });
  }
  res.json({ received: true });
});

export default router;
