// Client hub (Jobber-style) at /portal. Passwordless login with a 6-digit code.
import { Router } from 'express';
import { emitEvent } from '../lib/events.js';
import rateLimit from 'express-rate-limit';
import { getDb, getSetting } from '../db.js';
import { config } from '../config.js';
import { nowIso, addHours, normalizePhone, normalizeEmail, isEmail, randomCode, audit, changeLog, money, prettyPhone, cardFee } from '../lib/util.js';
import { sendSms, sendEmail, recordOutbox, createSubscriptionCheckout } from '../lib/providers.js';
import { findContactByPhoneOrEmail, getContact, contactBalanceCents, getQuote, approveQuote, declineQuote, requestQuoteChanges, getJob, getInvoice, invoiceCheckoutLink, planPrices, activeSubscription, PLANS } from '../lib/services.js';
import { notifyOwner } from '../lib/providers.js';

const router = Router();
const loginLimiter = rateLimit({ windowMs: 10 * 60 * 1000, limit: 15, standardHeaders: 'draft-7', legacyHeaders: false });

function requireClient(req, res, next) {
  if (req.session?.contactId) {
    const c = getContact(req.session.contactId);
    if (c && !c.archived) { req.contact = c; res.locals.contact = c; return next(); }
  }
  req.session.returnTo = req.originalUrl;
  res.redirect('/portal/login');
}

router.get('/', (req, res) => {
  if (!req.session?.contactId) return res.redirect('/portal/login');
  const db = getDb();
  const c = getContact(req.session.contactId);
  if (!c) return res.redirect('/portal/logout');
  const balance = contactBalanceCents(c.id);
  const openQuotes = db.prepare("SELECT * FROM quotes WHERE contact_id = ? AND archived = 0 AND status IN ('Sent', 'Changes Requested') ORDER BY id DESC").all(c.id);
  const nextJob = db.prepare("SELECT * FROM jobs WHERE contact_id = ? AND archived = 0 AND status != 'Complete' ORDER BY COALESCE(scheduled_at, '9999') LIMIT 1").get(c.id);
  const unpaid = db.prepare("SELECT * FROM invoices WHERE contact_id = ? AND archived = 0 AND status IN ('Sent', 'Partial', 'Overdue') ORDER BY id DESC").all(c.id);
  const sub = activeSubscription(c.id);
  const unread = db.prepare("SELECT COUNT(*) AS n FROM messages WHERE contact_id = ? AND direction = 'out' AND read_at IS NULL AND channel = 'sms' AND campaign_id IS NULL").get(c.id).n;
  res.page('portal', 'portal/home', { title: 'Home', contact: c, balance, openQuotes, nextJob, unpaid, sub, unread });
});

// ---- login ----
router.get('/login', (req, res) => {
  if (req.session?.contactId) return res.redirect('/portal');
  res.page('portal', 'portal/login', { title: 'Sign in', step: 'identify', error: null, dest: '' });
});

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const raw = String(req.body.identifier || '').trim();
    const contact = isEmail(raw) ? findContactByPhoneOrEmail('', raw) : findContactByPhoneOrEmail(raw, '');
    // Always show the code step (do not reveal whether the account exists).
    if (!contact) {
      audit('portal', 'login_unknown', 'contact', null, raw);
      return res.page('portal', 'portal/login', { title: 'Sign in', step: 'verify', error: null, dest: raw, sent: false });
    }
    const code = randomCode();
    const channel = isEmail(raw) ? 'email' : 'sms';
    const dest = channel === 'email' ? contact.email : contact.phone;
    getDb().prepare('INSERT INTO login_codes (contact_id, code, channel, destination, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run(contact.id, code, channel, dest, addHours(0.25), nowIso());
    const text = `${getSetting('business_name')} login code: ${code}. It expires in 15 minutes. If you didn't request this, ignore this message.`;
    if (channel === 'sms') await sendSms(dest, text, { contactId: contact.id, bypassOptIn: true, meta: { login_code: code } });
    else await sendEmail(dest, `Your ${getSetting('business_name')} login code`, text, { contactId: contact.id, meta: { login_code: code } });
    if (config.sandbox) console.log(`[portal] login code for ${dest}: ${code}`);
    audit('portal', 'login_code_sent', 'contact', contact.id, channel);
    res.page('portal', 'portal/login', { title: 'Enter your code', step: 'verify', error: null, dest: raw, sent: true });
  } catch (e) { next(e); }
});

router.post('/login/verify', loginLimiter, (req, res) => {
  const raw = String(req.body.identifier || '').trim();
  const code = String(req.body.code || '').replace(/\D/g, '');
  const contact = isEmail(raw) ? findContactByPhoneOrEmail('', raw) : findContactByPhoneOrEmail(raw, '');
  const db = getDb();
  const row = contact ? db.prepare('SELECT * FROM login_codes WHERE contact_id = ? AND code = ? AND used_at IS NULL AND expires_at > ? ORDER BY id DESC LIMIT 1').get(contact.id, code, nowIso()) : null;
  if (!row) {
    audit('portal', 'login_failed', 'contact', contact?.id || null, raw);
    return res.status(401).page('portal', 'portal/login', { title: 'Enter your code', step: 'verify', error: 'That code is not right or has expired. Try again or request a new one.', dest: raw, sent: true });
  }
  db.prepare('UPDATE login_codes SET used_at = ? WHERE id = ?').run(nowIso(), row.id);
  req.session.regenerate((err) => {
    if (err) return res.redirect('/portal/login');
    req.session.contactId = contact.id;
    audit('portal', 'login_success', 'contact', contact.id);
    const to = req.session.returnTo || '/portal';
    delete req.session.returnTo;
    req.session.save(() => res.redirect(to));
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/portal/login'));
});
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/portal/login'));
});

router.use(requireClient);

// ---- quote requests (leads) ----
router.get('/requests', (req, res) => {
  const db = getDb();
  const leads = db.prepare('SELECT * FROM leads WHERE contact_id = ? AND archived = 0 ORDER BY id DESC').all(req.contact.id);
  for (const l of leads) l.log = db.prepare("SELECT * FROM change_log WHERE entity_type = 'lead' AND entity_id = ? ORDER BY id").all(l.id);
  res.page('portal', 'portal/requests', { title: 'Quote requests', leads });
});
router.post('/requests', async (req, res, next) => {
  try {
    const db = getDb();
    const service = String(req.body.service || '').trim().slice(0, 120);
    const message = String(req.body.message || '').trim().slice(0, 2000);
    if (!service && !message) { req.flash('error', 'Tell us what you need.'); return res.redirect('/portal/requests'); }
    const ts = nowIso();
    const r = db.prepare("INSERT INTO leads (contact_id, stage, service, message, source, created_at, updated_at) VALUES (?, 'New', ?, ?, 'Client hub', ?, ?)").run(req.contact.id, service, message, ts, ts);
    changeLog('lead', r.lastInsertRowid, 'client', `Quote request received${service ? ' for ' + service : ''}.`);
    audit('client', 'lead_created', 'lead', r.lastInsertRowid, 'from portal');
    await notifyOwner(`New quote request from ${req.contact.first_name} (${prettyPhone(req.contact.phone)}): ${service} - ${message}`);
    req.flash('ok', 'Got it! We will follow up shortly.');
    res.redirect('/portal/requests');
  } catch (e) { next(e); }
});
router.post('/requests/:id/note', async (req, res, next) => {
  try {
    const db = getDb();
    const lead = db.prepare('SELECT * FROM leads WHERE id = ? AND contact_id = ?').get(req.params.id, req.contact.id);
    if (!lead) return res.status(404).send('Not found');
    const note = String(req.body.note || '').trim().slice(0, 1000);
    if (!note) return res.redirect('/portal/requests');
    changeLog('lead', lead.id, 'client', `Change request: ${note}`);
    db.prepare('UPDATE leads SET updated_at = ? WHERE id = ?').run(nowIso(), lead.id);
    audit('client', 'lead_change_request', 'lead', lead.id, note);
    await notifyOwner(`${req.contact.first_name} added a note to quote request #${lead.id}: "${note}"`);
    req.flash('ok', 'Your note was added.');
    res.redirect('/portal/requests');
  } catch (e) { next(e); }
});

// ---- quotes ----
router.get('/quotes', (req, res) => {
  const quotes = getDb().prepare("SELECT * FROM quotes WHERE contact_id = ? AND archived = 0 AND status != 'Draft' ORDER BY id DESC").all(req.contact.id);
  res.page('portal', 'portal/quotes', { title: 'Quotes', quotes });
});
function loadClientQuote(req, res) {
  const q = getQuote(req.params.id);
  if (!q || q.contact_id !== req.contact.id || q.archived || q.status === 'Draft') { res.status(404).page('portal', 'portal/404', { title: 'Not found' }); return null; }
  q.log = getDb().prepare("SELECT * FROM change_log WHERE entity_type = 'quote' AND entity_id = ? ORDER BY id").all(q.id);
  q.expired = q.status === 'Sent' && q.valid_until && q.valid_until < nowIso().slice(0, 10);
  return q;
}
router.get('/quotes/:id', (req, res) => {
  const q = loadClientQuote(req, res);
  if (!q) return;
  res.page('portal', 'portal/quote', { title: `Estimate ${q.number}`, q });
});
router.get('/quotes/:id/print', (req, res) => {
  const q = loadClientQuote(req, res);
  if (!q) return;
  res.page('print', 'print/quote', { title: `Estimate ${q.number}`, q });
});
router.post('/quotes/:id/approve', async (req, res, next) => {
  try {
    const q = loadClientQuote(req, res);
    if (!q) return;
    const name = String(req.body.signed_name || '').trim().slice(0, 120);
    if (!name) { req.flash('error', 'Please type your name to approve.'); return res.redirect(`/portal/quotes/${q.id}`); }
    if (q.status !== 'Sent' && q.status !== 'Changes Requested') { req.flash('error', 'This estimate can no longer be approved.'); return res.redirect(`/portal/quotes/${q.id}`); }
    await approveQuote(q.id, name);
    await notifyOwner(`Estimate ${q.number} APPROVED by ${name} (${money(q.total_cents)}). A job was created - schedule it in Admin -> Jobs.`);
    req.flash('ok', `Thanks ${name.split(' ')[0]}! Estimate ${q.number} is approved. We will reach out to schedule.`);
    res.redirect(`/portal/quotes/${q.id}`);
  } catch (e) { next(e); }
});
router.post('/quotes/:id/decline', async (req, res, next) => {
  try {
    const q = loadClientQuote(req, res);
    if (!q) return;
    const name = String(req.body.signed_name || '').trim().slice(0, 120);
    if (!name) { req.flash('error', 'Please type your name to decline.'); return res.redirect(`/portal/quotes/${q.id}`); }
    await declineQuote(q.id, name, String(req.body.reason || '').slice(0, 500));
    await notifyOwner(`Estimate ${q.number} was declined by ${name}.${req.body.reason ? ' Reason: ' + req.body.reason : ''}`);
    req.flash('ok', 'Estimate declined. Thanks for letting us know.');
    res.redirect(`/portal/quotes/${q.id}`);
  } catch (e) { next(e); }
});
router.post('/quotes/:id/changes', async (req, res, next) => {
  try {
    const q = loadClientQuote(req, res);
    if (!q) return;
    const note = String(req.body.note || '').trim().slice(0, 1000);
    if (!note) { req.flash('error', 'Tell us what you would like changed.'); return res.redirect(`/portal/quotes/${q.id}`); }
    requestQuoteChanges(q.id, note);
    await notifyOwner(`Change requested on ${q.number} by ${req.contact.first_name}: "${note}"`);
    req.flash('ok', 'Change request sent. We will send a revised estimate.');
    res.redirect(`/portal/quotes/${q.id}`);
  } catch (e) { next(e); }
});

// ---- jobs ----
router.get('/jobs', (req, res) => {
  const db = getDb();
  const jobs = db.prepare('SELECT * FROM jobs WHERE contact_id = ? AND archived = 0 ORDER BY COALESCE(scheduled_at, created_at) DESC').all(req.contact.id);
  for (const j of jobs) {
    j.checklist = db.prepare('SELECT * FROM job_checklist WHERE job_id = ? ORDER BY sort, id').all(j.id);
    j.quote = j.quote_id ? db.prepare('SELECT number, total_cents FROM quotes WHERE id = ?').get(j.quote_id) : null;
  }
  res.page('portal', 'portal/jobs', { title: 'Jobs', jobs });
});

// ---- invoices ----
router.get('/invoices', (req, res) => {
  const invoices = getDb().prepare("SELECT * FROM invoices WHERE contact_id = ? AND archived = 0 AND status != 'Draft' ORDER BY id DESC").all(req.contact.id);
  res.page('portal', 'portal/invoices', { title: 'Invoices', invoices, balance: contactBalanceCents(req.contact.id) });
});
function loadClientInvoice(req, res) {
  const inv = getInvoice(req.params.id);
  if (!inv || inv.contact_id !== req.contact.id || inv.archived || inv.status === 'Draft') { res.status(404).page('portal', 'portal/404', { title: 'Not found' }); return null; }
  return inv;
}
router.get('/invoices/:id', (req, res) => {
  const inv = loadClientInvoice(req, res);
  if (!inv) return;
  res.page('portal', 'portal/invoice', { title: `Invoice ${inv.number}`, inv, fee: cardFee(inv.due_cents), paidJustNow: req.query.paid === '1' });
});
router.get('/invoices/:id/print', (req, res) => {
  const inv = loadClientInvoice(req, res);
  if (!inv) return;
  res.page('print', 'print/invoice', { title: `Invoice ${inv.number}`, inv });
});
router.post('/invoices/:id/pay', async (req, res, next) => {
  try {
    const inv = loadClientInvoice(req, res);
    if (!inv) return;
    if (inv.due_cents <= 0) { req.flash('ok', 'This invoice is already paid.'); return res.redirect(`/portal/invoices/${inv.id}`); }
    const { url } = await invoiceCheckoutLink(inv.id);
    audit('client', 'checkout_started', 'invoice', inv.id, url);
    if (req.accepts(['html', 'json']) === 'json') return res.json({ ok: true, url });
    res.redirect(url);
  } catch (e) { next(e); }
});

// ---- account / balance ----
router.get('/account', (req, res) => {
  const db = getDb();
  const unpaid = db.prepare("SELECT * FROM invoices WHERE contact_id = ? AND archived = 0 AND status IN ('Sent', 'Partial', 'Overdue') ORDER BY id").all(req.contact.id);
  const payments = db.prepare('SELECT p.*, i.number FROM payments p LEFT JOIN invoices i ON i.id = p.invoice_id WHERE p.contact_id = ? ORDER BY p.id DESC LIMIT 20').all(req.contact.id);
  res.page('portal', 'portal/account', { title: 'Account', unpaid, payments, balance: contactBalanceCents(req.contact.id) });
});
router.post('/account', (req, res) => {
  const db = getDb();
  const first = String(req.body.first_name || '').trim().slice(0, 60);
  const last = String(req.body.last_name || '').trim().slice(0, 60);
  const town = String(req.body.town || '').trim().slice(0, 80);
  const email = normalizeEmail(req.body.email);
  const smsOpt = req.body.sms_opt_in ? 1 : 0;
  db.prepare("UPDATE contacts SET first_name = ?, last_name = ?, town = ?, email = CASE WHEN ? != '' THEN ? ELSE email END, sms_opt_in = ?, sms_opt_out_at = CASE WHEN ? = 1 THEN NULL ELSE COALESCE(sms_opt_out_at, ?) END, updated_at = ? WHERE id = ?")
    .run(first, last, town, email, email, smsOpt, smsOpt, nowIso(), nowIso(), req.contact.id);
  audit('client', 'account_updated', 'contact', req.contact.id);
  req.flash('ok', 'Your details were saved.');
  res.redirect('/portal/account');
});

// ---- managed services plans ----
router.get('/plans', (req, res) => {
  const sub = activeSubscription(req.contact.id);
  const history = getDb().prepare('SELECT * FROM subscriptions WHERE contact_id = ? ORDER BY id DESC').all(req.contact.id);
  res.page('portal', 'portal/plans', { title: 'Managed services', plans: planPrices(), sub, history, PLANS, subscribed: req.query.subscribed === '1' });
});
router.post('/plans/subscribe', async (req, res, next) => {
  try {
    const plan = String(req.body.plan || '');
    const prices = planPrices();
    if (!PLANS.includes(plan)) return res.status(400).send('Unknown plan');
    if (prices[plan].price_cents <= 0) { req.flash('error', 'This plan is not available for online signup yet. Call us at ' + getSetting('business_phone') + '.'); return res.redirect('/portal/plans'); }
    const { url } = await createSubscriptionCheckout(req.contact, plan, prices[plan].price_cents);
    audit('client', 'subscription_checkout', 'contact', req.contact.id, plan);
    res.redirect(url);
  } catch (e) { next(e); }
});
router.post('/plans/cancel', async (req, res, next) => {
  try {
    const sub = activeSubscription(req.contact.id);
    if (!sub) return res.redirect('/portal/plans');
    getDb().prepare("UPDATE subscriptions SET status = 'cancel_requested', cancel_requested_at = ?, updated_at = ? WHERE id = ?").run(nowIso(), nowIso(), sub.id);
    audit('client', 'subscription_cancel_requested', 'subscription', sub.id);
    emitEvent('subscription_canceled', { contactId: req.contact.id, subscriptionId: sub.id, extra: { status: 'cancel_requested' } });
    await notifyOwner(`${req.contact.first_name} asked to cancel their ${sub.plan} plan. Cancel it in Stripe and Admin -> Contacts.`);
    req.flash('ok', 'Cancel request received. We will confirm by text.');
    res.redirect('/portal/plans');
  } catch (e) { next(e); }
});

// ---- messages ----
router.get('/messages', (req, res) => {
  const db = getDb();
  const msgs = db.prepare("SELECT * FROM messages WHERE contact_id = ? AND channel = 'sms' ORDER BY id").all(req.contact.id);
  db.prepare("UPDATE messages SET read_at = ? WHERE contact_id = ? AND direction = 'out' AND read_at IS NULL").run(nowIso(), req.contact.id);
  res.page('portal', 'portal/messages', { title: 'Messages', msgs });
});
router.post('/messages', async (req, res, next) => {
  try {
    const body = String(req.body.body || '').trim().slice(0, 1000);
    if (!body) return res.redirect('/portal/messages');
    const db = getDb();
    // Message from client to business: stored as inbound, and forwarded to the owner by SMS.
    db.prepare("INSERT INTO messages (contact_id, direction, channel, from_addr, to_addr, body, status, created_at) VALUES (?, 'in', 'sms', ?, ?, ?, 'received (portal)', ?)")
      .run(req.contact.id, req.contact.phone || req.contact.email, config.business.phoneE164, body, nowIso());
    await notifyOwner(`Portal message from ${req.contact.first_name} (${prettyPhone(req.contact.phone)}): "${body}"`);
    audit('client', 'portal_message', 'contact', req.contact.id, body);
    req.flash('ok', 'Message sent. We usually reply within a few hours.');
    res.redirect('/portal/messages');
  } catch (e) { next(e); }
});

export default router;
