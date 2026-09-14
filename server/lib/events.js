// Event bus: every meaningful thing that happens (new lead, quote approved, invoice paid...)
// is recorded in the `events` table (polled by GET /api/v1/events) and POSTed as JSON to every
// enabled outbound webhook (Zapier "Catch Hook", Make, n8n, your own script) that subscribes to it.
//
//   emitEvent('invoice_paid', { contactId, invoiceId })
//
// Payload shape sent to webhooks:
//   { event, timestamp, id, data: { contact, lead|quote|invoice|job|message|payment|subscription|campaign|post }, links: { portal, admin } }
// Signed with HMAC-SHA256 of the raw body in header X-Piets-Signature ("sha256=<hex>") when the webhook has a secret.
// Delivery is retried 3x with backoff through jobs_queue. Every attempt is written to webhook_deliveries.
// In sandbox mode a copy of every delivery is also written to the Outbox (channel "webhook").
import crypto from 'node:crypto';
import { getDb } from '../db.js';
import { config } from '../config.js';
import { nowIso, addHours, audit, parseJson } from './util.js';
import { recordOutbox } from './providers.js';

export const EVENT_NAMES = [
  'new_lead', 'lead_stage_changed', 'contact_created', 'contact_updated',
  'quote_sent', 'quote_approved', 'quote_declined', 'quote_change_requested',
  'job_scheduled', 'job_complete', 'invoice_sent', 'invoice_paid', 'invoice_overdue', 'payment_recorded',
  'subscription_started', 'subscription_canceled', 'inbound_sms', 'campaign_sent', 'blog_published'
];

const RETRY_DELAYS_HOURS = [0, 1 / 60, 5 / 60, 30 / 60]; // attempt 1 now, then +1 min, +5 min, +30 min

function pick(row, omit = []) {
  if (!row) return null;
  const out = { ...row };
  for (const k of omit) delete out[k];
  return out;
}

/** Build the public JSON payload for an event from a context of ids. */
export function buildPayload(name, ctx = {}) {
  const db = getDb();
  const get = (table, id) => (id ? db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id) : null);
  const contact = get('contacts', ctx.contactId) || (ctx.leadId ? get('contacts', get('leads', ctx.leadId)?.contact_id) : null);
  const lead = get('leads', ctx.leadId);
  const quote = get('quotes', ctx.quoteId);
  const invoice = get('invoices', ctx.invoiceId);
  const job = get('jobs', ctx.jobId);
  const message = get('messages', ctx.messageId);
  const payment = get('payments', ctx.paymentId);
  const subscription = get('subscriptions', ctx.subscriptionId);
  const campaign = get('campaigns', ctx.campaignId);
  const data = {};
  if (contact) data.contact = { ...pick(contact, ['stripe_customer_id']), tags: parseJson(contact.tags, []), name: [contact.first_name, contact.last_name].filter(Boolean).join(' ') };
  if (lead) data.lead = lead;
  if (quote) data.quote = { ...pick(quote), items: db.prepare('SELECT section, description, qty, unit_cents, sort FROM quote_items WHERE quote_id = ? ORDER BY section, sort, id').all(quote.id) };
  if (invoice) data.invoice = { ...pick(invoice, ['stripe_session_id']), due_cents: Math.max(0, invoice.total_cents - invoice.paid_cents), items: db.prepare('SELECT section, description, qty, unit_cents, sort FROM invoice_items WHERE invoice_id = ? ORDER BY section, sort, id').all(invoice.id) };
  if (job) data.job = { ...pick(job), checklist: db.prepare('SELECT item, done FROM job_checklist WHERE job_id = ? ORDER BY sort, id').all(job.id) };
  if (message) data.message = pick(message);
  if (payment) data.payment = pick(payment);
  if (subscription) data.subscription = pick(subscription, ['stripe_session_id']);
  if (campaign) data.campaign = pick(campaign);
  if (ctx.post) data.post = ctx.post;
  if (ctx.extra) Object.assign(data, ctx.extra);
  if (ctx.text !== undefined) data.text = ctx.text;
  if (ctx.keyword !== undefined) data.keyword = ctx.keyword;
  if (ctx.from !== undefined && ctx.to !== undefined) data.change = { from: ctx.from, to: ctx.to };
  const base = config.baseUrl;
  const links = { portal: `${base}/portal`, admin: contact ? `${base}/admin/contacts/${contact.id}` : `${base}/admin` };
  if (quote) { links.portal = `${base}/portal/quotes/${quote.id}`; links.admin = `${base}/admin/quotes/${quote.id}`; }
  if (invoice) { links.portal = `${base}/portal/invoices/${invoice.id}`; links.admin = `${base}/admin/invoices/${invoice.id}`; }
  if (job) { links.portal = `${base}/portal/jobs`; links.admin = `${base}/admin/jobs/${job.id}`; }
  if (message) links.admin = `${base}/admin/conversations/${message.contact_id}`;
  if (lead && !quote && !invoice && !job) links.admin = `${base}/admin/pipeline`;
  if (ctx.post?.url) links.portal = ctx.post.url;
  return { event: name, timestamp: nowIso(), data, links, contact_id: contact?.id || null };
}

/** Webhooks subscribed to an event ("*" = everything). */
export function matchingWebhooks(name) {
  return getDb().prepare('SELECT * FROM webhooks WHERE enabled = 1 AND archived = 0').all()
    .filter((w) => { const evs = parseJson(w.events, []); return evs.includes('*') || evs.includes(name); });
}

export function signBody(secret, body) {
  return 'sha256=' + crypto.createHmac('sha256', secret).update(body).digest('hex');
}

/**
 * Record an event and start delivering it to matching webhooks.
 * Returns { id, payload, deliveries } where deliveries is a Promise (callers do not need to await it).
 */
export function emitEvent(name, ctx = {}) {
  const db = getDb();
  const payload = buildPayload(name, ctx);
  const r = db.prepare('INSERT INTO events (name, contact_id, payload, created_at) VALUES (?, ?, ?, ?)')
    .run(name, payload.contact_id, JSON.stringify({ event: payload.event, data: payload.data, links: payload.links }), payload.timestamp);
  const id = Number(r.lastInsertRowid);
  const full = { event: payload.event, timestamp: payload.timestamp, id, data: payload.data, links: payload.links };
  const hooks = matchingWebhooks(name);
  const deliveries = Promise.all(hooks.map((w) => deliverWebhook(w.id, full, 1).catch((e) => ({ ok: false, error: e.message }))));
  return { id, payload: full, deliveries };
}

/** POST a JSON payload to a URL with our headers. Returns { ok, status, body, error, ms }. */
export async function postJson(url, payload, { secret = '', headers = {}, timeoutMs = config.webhookTimeoutMs } = {}) {
  const body = JSON.stringify(payload);
  const h = { 'content-type': 'application/json', 'user-agent': 'PietsHQ-Webhooks/1.0', 'x-piets-event': payload.event || '', ...headers };
  if (payload.id) h['x-piets-delivery'] = String(payload.id);
  if (secret) h['x-piets-signature'] = signBody(secret, body);
  const started = Date.now();
  try {
    const res = await fetch(url, { method: 'POST', headers: h, body, signal: AbortSignal.timeout(timeoutMs) });
    const text = (await res.text().catch(() => '')).slice(0, 2000);
    return { ok: res.ok, status: res.status, body: text, ms: Date.now() - started };
  } catch (e) {
    return { ok: false, status: 0, body: '', error: e.name === 'TimeoutError' ? `Timed out after ${timeoutMs}ms` : e.message, ms: Date.now() - started };
  }
}

/** Deliver one payload to one webhook. On failure schedules the next attempt in jobs_queue (max 4 attempts total). */
export async function deliverWebhook(webhookId, payload, attempt = 1) {
  const db = getDb();
  const w = db.prepare('SELECT * FROM webhooks WHERE id = ?').get(webhookId);
  if (!w || w.archived || !w.enabled) return { ok: false, error: 'webhook disabled' };
  const r = await postJson(w.url, payload, { secret: w.secret });
  const status = r.ok ? 'ok' : 'failed';
  db.prepare('INSERT INTO webhook_deliveries (webhook_id, event_id, event, attempt, status, response_code, response_body, error, duration_ms, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(w.id, payload.id || null, payload.event || '', attempt, status, r.status || null, r.body || '', r.error || '', r.ms, nowIso());
  db.prepare('UPDATE webhooks SET last_status = ?, last_fired_at = ?, fail_count = CASE WHEN ? = 1 THEN 0 ELSE fail_count + 1 END WHERE id = ?')
    .run(r.ok ? `${r.status} ok` : (r.error || `HTTP ${r.status}`), nowIso(), r.ok ? 1 : 0, w.id);
  if (config.sandbox) {
    recordOutbox('webhook', w.url, `${payload.event} -> ${w.name} (attempt ${attempt}: ${r.ok ? 'delivered' : r.error || 'HTTP ' + r.status})`, JSON.stringify(payload, null, 2), { webhook_id: w.id, event_id: payload.id || null, ok: r.ok, attempt });
  }
  if (!r.ok) {
    const next = attempt + 1;
    if (next <= RETRY_DELAYS_HOURS.length) {
      db.prepare('INSERT INTO jobs_queue (type, payload, run_at, created_at) VALUES (?, ?, ?, ?)')
        .run('webhook', JSON.stringify({ webhookId: w.id, payload, attempt: next }), addHours(RETRY_DELAYS_HOURS[attempt]), nowIso());
    } else {
      audit('system', 'webhook_failed', 'webhook', w.id, { event: payload.event, error: r.error || r.status });
    }
  }
  return { ok: r.ok, status: r.status, error: r.error, attempt };
}

/** Send a sample payload to a webhook right now (Admin -> Integrations -> Test). */
export async function testWebhook(webhookId, eventName = 'new_lead') {
  const db = getDb();
  const contact = db.prepare('SELECT id FROM contacts WHERE archived = 0 ORDER BY id LIMIT 1').get();
  const lead = contact ? db.prepare('SELECT id FROM leads WHERE contact_id = ? ORDER BY id DESC LIMIT 1').get(contact.id) : null;
  const payload = buildPayload(eventName, { contactId: contact?.id, leadId: lead?.id, extra: { test: true } });
  const full = { event: payload.event, timestamp: payload.timestamp, id: 0, test: true, data: payload.data, links: payload.links };
  const w = db.prepare('SELECT * FROM webhooks WHERE id = ?').get(webhookId);
  if (!w) throw new Error('Webhook not found');
  const r = await postJson(w.url, full, { secret: w.secret });
  db.prepare('INSERT INTO webhook_deliveries (webhook_id, event_id, event, attempt, status, response_code, response_body, error, duration_ms, created_at) VALUES (?, NULL, ?, 1, ?, ?, ?, ?, ?, ?)')
    .run(w.id, `${eventName} (test)`, r.ok ? 'ok' : 'failed', r.status || null, r.body || '', r.error || '', r.ms, nowIso());
  db.prepare('UPDATE webhooks SET last_status = ?, last_fired_at = ? WHERE id = ?').run(r.ok ? `${r.status} ok (test)` : (r.error || `HTTP ${r.status}`) + ' (test)', nowIso(), w.id);
  if (config.sandbox) recordOutbox('webhook', w.url, `TEST ${eventName} -> ${w.name} (${r.ok ? 'delivered' : r.error || 'HTTP ' + r.status})`, JSON.stringify(full, null, 2), { webhook_id: w.id, test: true, ok: r.ok });
  return r;
}

/** Events since an id (number) or ISO timestamp, oldest first. For Zapier polling triggers. */
export function listEvents({ since, name, limit = 100, contactId } = {}) {
  const db = getDb();
  const where = []; const args = [];
  if (since !== undefined && since !== null && since !== '') {
    if (/^\d+$/.test(String(since))) { where.push('id > ?'); args.push(Number(since)); } else { where.push('created_at > ?'); args.push(String(since)); }
  }
  if (name) { where.push('name = ?'); args.push(name); }
  if (contactId) { where.push('contact_id = ?'); args.push(Number(contactId)); }
  const rows = db.prepare(`SELECT * FROM events ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id ${since ? 'ASC' : 'DESC'} LIMIT ?`).all(...args, Math.max(1, Math.min(500, Number(limit) || 100)));
  return rows.map((r) => { const p = parseJson(r.payload, {}); return { id: r.id, event: r.name, timestamp: r.created_at, contact_id: r.contact_id, data: p.data || {}, links: p.links || {} }; });
}
