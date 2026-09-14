// Inbound REST API for Zapier ("Webhooks by Zapier"), Make, n8n, scripts and AI agents.
// Mounted at /api/v1. Every request needs  Authorization: Bearer <key>  where <key> is API_TOKEN
// from .env or a key created in Admin -> Integrations. Responses are always { ok: true, data } or
// { ok: false, error }. Rate limit: 120 requests / minute per key.
import { Router } from 'express';
import { z } from 'zod';
import { getDb, getSetting } from '../db.js';
import { config } from '../config.js';
import { nowIso, normalizePhone, normalizeEmail, isEmail, audit, parseJson, money, toCents, nextAllowedSendTime, fullName } from '../lib/util.js';
import { sendSms, sendEmail } from '../lib/providers.js';
import * as S from '../lib/services.js';
import { runSteps, enqueue, kickQueue } from '../lib/automations.js';
import { scheduleCampaign, processCampaigns } from '../lib/campaigns.js';
import { listEvents, EVENT_NAMES } from '../lib/events.js';
import { verifyApiKey } from '../lib/apikeys.js';
import { runAgent, listAgents, TOOL_NAMES } from '../lib/ai.js';
import { publishBlogPost } from './public.js';

const router = Router();
const ok = (res, data, status = 200) => res.status(status).json({ ok: true, data });
const fail = (res, error, status = 400, extra = {}) => res.status(status).json({ ok: false, error, ...extra });
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ---- auth + rate limit ----
const RATE_LIMIT = 120;
const buckets = new Map(); // keyId -> { windowStart, count }
router.use((req, res, next) => {
  const token = (req.get('authorization') || '').replace(/^Bearer\s+/i, '').trim() || String(req.query.api_key || '');
  const key = verifyApiKey(token);
  if (!key) {
    audit('api', 'unauthorized', 'api', null, { ip: req.ip, path: req.path });
    return fail(res, config.apiToken || getDb().prepare('SELECT COUNT(*) AS n FROM api_keys WHERE archived = 0').get().n ? 'Invalid or missing API key. Send header: Authorization: Bearer <key>' : 'API is off: set API_TOKEN in server/.env or create a key in Admin -> Integrations', 401);
  }
  req.apiKey = key;
  const now = Date.now();
  const b = buckets.get(key.id) || { windowStart: now, count: 0 };
  if (now - b.windowStart >= 60000) { b.windowStart = now; b.count = 0; }
  b.count++;
  buckets.set(key.id, b);
  res.set('x-ratelimit-limit', String(RATE_LIMIT));
  res.set('x-ratelimit-remaining', String(Math.max(0, RATE_LIMIT - b.count)));
  if (b.count > RATE_LIMIT) return fail(res, `Rate limit: ${RATE_LIMIT} requests per minute per key`, 429);
  next();
});
const actor = (req) => 'api:' + (req.apiKey?.name || req.apiKey?.id);

function validate(schema, body) {
  const r = schema.safeParse(body || {});
  if (r.success) return { data: r.data };
  return { error: r.error.issues.map((i) => `${i.path.join('.') || 'body'}: ${i.message}`).join('; ') };
}
const idParam = (v) => { const n = Number(v); return Number.isInteger(n) && n > 0 ? n : null; };
const contactIdSchema = z.union([z.number().int().positive(), z.string().regex(/^\d+$/)]).transform(Number);
const itemSchema = z.object({ description: z.string().trim().min(1).max(300), qty: z.coerce.number().min(0).default(1), unit_price: z.coerce.number().min(0).default(0), section: z.enum(['main', 'other']).default('main') });

function contactOut(c) {
  if (!c) return null;
  return { ...c, tags: parseJson(c.tags, []), name: fullName(c), admin_link: `${config.baseUrl}/admin/contacts/${c.id}` };
}
function resolveContact(body) {
  if (body.contactId || body.contact_id) return S.getContact(Number(body.contactId || body.contact_id)) || null;
  if (body.phone || body.email) return S.findContactByPhoneOrEmail(body.phone, body.email);
  return null;
}

// ---- meta ----
router.get('/', (req, res) => ok(res, { name: 'Piets HQ API', version: 1, key: req.apiKey.name, events: EVENT_NAMES, tools: TOOL_NAMES, docs: `${config.baseUrl}/admin/integrations` }));
router.get('/ping', (req, res) => ok(res, { pong: true, time: nowIso(), sandbox: config.sandbox }));

// ---- contacts ----
const contactSchema = z.object({
  name: z.string().trim().max(160).optional(), first_name: z.string().trim().max(80).optional(), last_name: z.string().trim().max(80).optional(),
  phone: z.string().trim().max(40).optional(), email: z.string().trim().max(160).optional(), town: z.string().trim().max(80).optional(),
  company: z.string().trim().max(120).optional(), source: z.string().trim().max(80).optional(), tags: z.union([z.array(z.string()), z.string()]).optional(),
  sms_opt_in: z.coerce.boolean().optional(), email_opt_in: z.coerce.boolean().optional(), note: z.string().trim().max(2000).optional()
});
router.post('/contacts', wrap((req, res) => {
  const { data, error } = validate(contactSchema, req.body);
  if (error) return fail(res, error);
  if (!normalizePhone(data.phone) && !isEmail(data.email || '')) return fail(res, 'A phone number or a valid email is required');
  const tags = Array.isArray(data.tags) ? data.tags : String(data.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
  const { contact, created } = S.upsertContact({ name: data.name, first_name: data.first_name, last_name: data.last_name, phone: data.phone, email: data.email, town: data.town, company: data.company, source: data.source || 'API', tags });
  let c = contact;
  if (!created) {
    // Existing contact: apply the fields that were sent (upsert only fills blanks).
    const fields = {};
    for (const k of ['first_name', 'last_name', 'company', 'town', 'source', 'sms_opt_in', 'email_opt_in']) if (data[k] !== undefined && data[k] !== '') fields[k] = data[k];
    if (data.name && !data.first_name) { const parts = data.name.split(/\s+/); fields.first_name = parts.shift(); fields.last_name = parts.join(' '); }
    if (normalizePhone(data.phone)) fields.phone = data.phone;
    if (isEmail(data.email || '')) fields.email = data.email;
    if (tags.length) fields.tags = [...new Set([...parseJson(contact.tags, []), ...tags])];
    c = S.updateContact(contact.id, fields, actor(req));
  } else if (data.sms_opt_in === false || data.email_opt_in === false) c = S.updateContact(contact.id, { sms_opt_in: data.sms_opt_in, email_opt_in: data.email_opt_in }, actor(req));
  if (data.note) getDb().prepare('INSERT INTO notes (contact_id, body, author, created_at) VALUES (?, ?, ?, ?)').run(c.id, data.note, actor(req), nowIso());
  audit(actor(req), created ? 'contact_created' : 'contact_upserted', 'contact', c.id);
  return ok(res, { contact: contactOut(c), created }, created ? 201 : 200);
}));
router.get('/contacts', (req, res) => {
  const db = getDb();
  const q = String(req.query.q || '').trim();
  const limit = Math.max(1, Math.min(200, Number(req.query.limit) || 50));
  let rows;
  if (q) {
    const like = `%${q}%`; const digits = q.replace(/\D/g, '');
    rows = db.prepare('SELECT * FROM contacts WHERE archived = 0 AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR town LIKE ? OR company LIKE ? OR tags LIKE ? OR phone LIKE ?) ORDER BY updated_at DESC LIMIT ?')
      .all(like, like, like, like, like, like, digits ? `%${digits}%` : like, limit);
  } else rows = db.prepare('SELECT * FROM contacts WHERE archived = 0 ORDER BY updated_at DESC LIMIT ?').all(limit);
  ok(res, { contacts: rows.map(contactOut), count: rows.length });
});
router.get('/contacts/:id', (req, res) => {
  const id = idParam(req.params.id); const c = id && S.getContact(id);
  if (!c) return fail(res, 'Contact not found', 404);
  const db = getDb();
  ok(res, {
    contact: contactOut(c),
    leads: db.prepare('SELECT * FROM leads WHERE contact_id = ? AND archived = 0 ORDER BY id DESC').all(id),
    quotes: db.prepare('SELECT id, number, title, status, total_cents, valid_until, sent_at, created_at FROM quotes WHERE contact_id = ? AND archived = 0 ORDER BY id DESC').all(id),
    invoices: db.prepare('SELECT id, number, status, total_cents, paid_cents, invoice_date, sent_at, paid_at FROM invoices WHERE contact_id = ? AND archived = 0 ORDER BY id DESC').all(id),
    jobs: db.prepare('SELECT id, title, status, scheduled_at, completed_at FROM jobs WHERE contact_id = ? AND archived = 0 ORDER BY id DESC').all(id),
    notes: db.prepare('SELECT id, body, author, created_at FROM notes WHERE contact_id = ? ORDER BY id DESC LIMIT 50').all(id),
    messages: db.prepare('SELECT id, direction, channel, body, status, created_at FROM messages WHERE contact_id = ? ORDER BY id DESC LIMIT 50').all(id),
    balance_cents: S.contactBalanceCents(id),
    subscription: S.activeSubscription(id) || null
  });
});
router.post('/contacts/:id/notes', (req, res) => {
  const id = idParam(req.params.id); const c = id && S.getContact(id);
  if (!c) return fail(res, 'Contact not found', 404);
  const { data, error } = validate(z.object({ body: z.string().trim().min(1).max(4000) }), req.body);
  if (error) return fail(res, error);
  const r = getDb().prepare('INSERT INTO notes (contact_id, body, author, created_at) VALUES (?, ?, ?, ?)').run(id, data.body, actor(req), nowIso());
  audit(actor(req), 'note_added', 'contact', id);
  ok(res, { note: { id: Number(r.lastInsertRowid), contact_id: id, body: data.body } }, 201);
});
router.post('/contacts/:id/tags', (req, res) => {
  const id = idParam(req.params.id); const c = id && S.getContact(id);
  if (!c) return fail(res, 'Contact not found', 404);
  const { data, error } = validate(z.object({ tags: z.union([z.array(z.string().trim().min(1)), z.string().trim().min(1)]).optional(), tag: z.string().trim().min(1).optional(), remove: z.union([z.array(z.string()), z.string()]).optional() }), req.body);
  if (error) return fail(res, error);
  const add = [].concat(data.tags ? (Array.isArray(data.tags) ? data.tags : data.tags.split(',')) : [], data.tag ? [data.tag] : []).map((t) => t.trim()).filter(Boolean);
  const remove = [].concat(data.remove ? (Array.isArray(data.remove) ? data.remove : data.remove.split(',')) : []).map((t) => t.trim().toLowerCase());
  if (!add.length && !remove.length) return fail(res, 'Send "tags" (array or comma list), "tag" or "remove"');
  let tags = parseJson(c.tags, []).filter((t) => !remove.includes(String(t).toLowerCase()));
  for (const t of add) if (!tags.includes(t)) tags.push(t);
  S.updateContact(id, { tags }, actor(req));
  ok(res, { contact_id: id, tags });
});

// ---- leads ----
const leadSchema = z.object({
  name: z.string().trim().max(160).optional().default(''), phone: z.string().trim().max(40).optional().default(''), email: z.string().trim().max(160).optional().default(''),
  contactId: contactIdSchema.optional(), town: z.string().trim().max(80).optional().default(''), service: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().max(4000).optional().default(''), source: z.string().trim().max(80).optional().default('API'), value: z.union([z.number(), z.string()]).optional()
});
router.post('/leads', wrap(async (req, res) => {
  const { data, error } = validate(leadSchema, req.body);
  if (error) return fail(res, error);
  let phone = data.phone; let email = data.email; let name = data.name;
  if (data.contactId) { const c = S.getContact(data.contactId); if (!c) return fail(res, 'Contact not found', 404); phone = c.phone; email = c.email; name = name || fullName(c); }
  if (!normalizePhone(phone) && !isEmail(email)) return fail(res, 'A phone number or a valid email is required');
  const { lead, contact } = await S.createLead({ name, phone, email, town: data.town, service: data.service, message: data.message, source: data.source, value: data.value });
  ok(res, { lead: { ...lead, admin_link: `${config.baseUrl}/admin/pipeline` }, contact: contactOut(contact) }, 201);
}));
router.get('/leads', (req, res) => {
  const stage = String(req.query.stage || '');
  const rows = stage
    ? getDb().prepare('SELECT l.*, c.first_name, c.last_name, c.phone, c.email, c.town FROM leads l JOIN contacts c ON c.id = l.contact_id WHERE l.archived = 0 AND l.stage = ? ORDER BY l.id DESC LIMIT 200').all(stage)
    : getDb().prepare('SELECT l.*, c.first_name, c.last_name, c.phone, c.email, c.town FROM leads l JOIN contacts c ON c.id = l.contact_id WHERE l.archived = 0 ORDER BY l.id DESC LIMIT 200').all();
  ok(res, { leads: rows, stages: S.PIPELINE_STAGES });
});
router.post('/leads/:id/stage', (req, res) => {
  const id = idParam(req.params.id); const lead = id && getDb().prepare('SELECT * FROM leads WHERE id = ?').get(id);
  if (!lead) return fail(res, 'Lead not found', 404);
  const { data, error } = validate(z.object({ stage: z.enum(S.PIPELINE_STAGES), note: z.string().trim().max(1000).optional() }), req.body);
  if (error) return fail(res, error + `. Stages: ${S.PIPELINE_STAGES.join(', ')}`);
  S.moveLead(id, data.stage, actor(req));
  ok(res, { lead: getDb().prepare('SELECT * FROM leads WHERE id = ?').get(id) });
});

// ---- messages ----
router.post('/messages/sms', wrap(async (req, res) => {
  const { data, error } = validate(z.object({ contactId: contactIdSchema.optional(), phone: z.string().trim().optional(), body: z.string().trim().min(1).max(1200), urgent: z.coerce.boolean().optional().default(false), footer: z.coerce.boolean().optional().default(false) }), req.body);
  if (error) return fail(res, error);
  let c = data.contactId ? S.getContact(data.contactId) : (data.phone ? S.findContactByPhoneOrEmail(data.phone, '') : null);
  if (data.contactId && !c) return fail(res, 'Contact not found', 404);
  const to = c?.phone || normalizePhone(data.phone);
  if (!to) return fail(res, 'Need contactId (with a phone) or phone');
  if (!c && data.phone) c = S.upsertContact({ phone: data.phone, source: 'API SMS' }).contact;
  if (c && !c.sms_opt_in) { audit(actor(req), 'sms_blocked_opt_out', 'contact', c.id); return fail(res, 'Contact opted out of SMS (STOP). Not sent.', 409, { contact_id: c.id }); }
  const allowed = nextAllowedSendTime();
  if (!data.urgent && new Date(allowed).getTime() - Date.now() > 60 * 1000) {
    const jobId = enqueue('send_sms', { to, body: data.body, opts: { contactId: c?.id || null, appendFooter: data.footer } }, allowed);
    audit(actor(req), 'sms_deferred_quiet_hours', 'contact', c?.id || null, { sendAt: allowed });
    return ok(res, { queued: true, send_at: allowed, queue_id: Number(jobId), contact_id: c?.id || null, reason: `Quiet hours (${getSetting('quiet_hours_start')}:00-${getSetting('quiet_hours_end')}:00 ET). Pass "urgent": true to send now.` }, 202);
  }
  const r = await sendSms(to, data.body, { contactId: c?.id || null, appendFooter: data.footer, meta: { api_key: req.apiKey.name } });
  audit(actor(req), 'message_sent', 'contact', c?.id || null, { channel: 'sms', ok: r.ok });
  if (!r.ok) return fail(res, r.error, 502);
  ok(res, { sent: true, message_id: r.id, mock: !!r.mock, contact_id: c?.id || null }, 201);
}));
router.post('/messages/email', wrap(async (req, res) => {
  const { data, error } = validate(z.object({ contactId: contactIdSchema.optional(), email: z.string().trim().optional(), subject: z.string().trim().min(1).max(200), body: z.string().trim().min(1).max(20000), html: z.string().optional() }), req.body);
  if (error) return fail(res, error);
  const c = data.contactId ? S.getContact(data.contactId) : (data.email ? S.findContactByPhoneOrEmail('', data.email) : null);
  if (data.contactId && !c) return fail(res, 'Contact not found', 404);
  const to = c?.email || normalizeEmail(data.email);
  if (!isEmail(to)) return fail(res, 'Need contactId (with an email) or a valid email');
  if (c && !c.email_opt_in) return fail(res, 'Contact opted out of email. Not sent.', 409, { contact_id: c.id });
  const r = await sendEmail(to, data.subject, data.body, { contactId: c?.id || null, html: data.html, meta: { api_key: req.apiKey.name } });
  audit(actor(req), 'message_sent', 'contact', c?.id || null, { channel: 'email', ok: r.ok });
  if (!r.ok) return fail(res, r.error, 502);
  ok(res, { sent: true, message_id: r.id, mock: !!r.mock, contact_id: c?.id || null }, 201);
}));

// ---- quotes ----
const quoteOut = (q) => q && ({ ...q, items: q.items, contact: contactOut(q.contact), total: money(q.total_cents), portal_link: `${config.baseUrl}/portal/quotes/${q.id}`, admin_link: `${config.baseUrl}/admin/quotes/${q.id}` });
router.get('/quotes', (req, res) => {
  const db = getDb();
  const where = ['q.archived = 0']; const args = [];
  if (req.query.status) { where.push('q.status = ?'); args.push(String(req.query.status)); }
  if (req.query.contactId) { where.push('q.contact_id = ?'); args.push(Number(req.query.contactId)); }
  const rows = db.prepare(`SELECT q.*, c.first_name, c.last_name, c.phone, c.email FROM quotes q JOIN contacts c ON c.id = q.contact_id WHERE ${where.join(' AND ')} ORDER BY q.id DESC LIMIT 200`).all(...args);
  ok(res, { quotes: rows.map((q) => ({ ...q, total: money(q.total_cents), portal_link: `${config.baseUrl}/portal/quotes/${q.id}` })), statuses: S.QUOTE_STATUSES });
});
router.get('/quotes/:id', (req, res) => { const q = S.getQuote(idParam(req.params.id)); if (!q) return fail(res, 'Quote not found', 404); ok(res, { quote: quoteOut(q) }); });
router.post('/quotes', wrap((req, res) => {
  const { data, error } = validate(z.object({ contactId: contactIdSchema.optional(), phone: z.string().optional(), email: z.string().optional(), leadId: contactIdSchema.optional(), title: z.string().trim().min(1).max(200), notes: z.string().trim().max(4000).optional().default(''), items: z.array(itemSchema).min(1), tax_rate: z.coerce.number().min(0).max(30).optional(), valid_until: z.string().optional(), send: z.coerce.boolean().optional().default(false) }), req.body);
  if (error) return fail(res, error);
  const c = resolveContact(data);
  if (!c) return fail(res, 'Contact not found (send contactId, or phone/email of an existing contact)', 404);
  const id = S.saveQuote(null, { contact_id: c.id, lead_id: data.leadId || null, title: data.title, notes: data.notes, items: data.items, tax_rate: data.tax_rate, valid_until: data.valid_until }, actor(req), 'Estimate created via API.');
  const finish = async () => { if (data.send) await S.sendQuote(id, actor(req)); return ok(res, { quote: quoteOut(S.getQuote(id)) }, 201); };
  return finish();
}));
router.post('/quotes/:id/send', wrap(async (req, res) => {
  const q = S.getQuote(idParam(req.params.id)); if (!q) return fail(res, 'Quote not found', 404);
  await S.sendQuote(q.id, actor(req));
  ok(res, { quote: quoteOut(S.getQuote(q.id)) });
}));

// ---- invoices ----
const invoiceOut = (i) => i && ({ ...i, contact: contactOut(i.contact), total: money(i.total_cents), due: money(i.due_cents), portal_link: `${config.baseUrl}/portal/invoices/${i.id}`, admin_link: `${config.baseUrl}/admin/invoices/${i.id}` });
router.get('/invoices', (req, res) => {
  S.markOverdueInvoices();
  const db = getDb();
  const where = ['i.archived = 0']; const args = [];
  if (req.query.status) { where.push('i.status = ?'); args.push(String(req.query.status)); }
  if (req.query.unpaid === '1' || req.query.unpaid === 'true') where.push("i.status IN ('Sent', 'Partial', 'Overdue')");
  if (req.query.contactId) { where.push('i.contact_id = ?'); args.push(Number(req.query.contactId)); }
  const rows = db.prepare(`SELECT i.*, c.first_name, c.last_name, c.phone, c.email FROM invoices i JOIN contacts c ON c.id = i.contact_id WHERE ${where.join(' AND ')} ORDER BY i.id DESC LIMIT 200`).all(...args);
  ok(res, { invoices: rows.map((i) => ({ ...i, due_cents: Math.max(0, i.total_cents - i.paid_cents), total: money(i.total_cents), due: money(i.total_cents - i.paid_cents), portal_link: `${config.baseUrl}/portal/invoices/${i.id}` })), statuses: S.INVOICE_STATUSES });
});
router.get('/invoices/:id', (req, res) => { const i = S.getInvoice(idParam(req.params.id)); if (!i) return fail(res, 'Invoice not found', 404); ok(res, { invoice: invoiceOut(i) }); });
router.post('/invoices', wrap(async (req, res) => {
  const { data, error } = validate(z.object({ contactId: contactIdSchema.optional(), phone: z.string().optional(), email: z.string().optional(), quoteId: contactIdSchema.optional(), jobId: contactIdSchema.optional(), items: z.array(itemSchema).min(1), service_date: z.string().optional(), invoice_date: z.string().optional(), notes: z.string().trim().max(4000).optional().default(''), tax_rate: z.coerce.number().min(0).max(30).optional(), send: z.coerce.boolean().optional().default(false) }), req.body);
  if (error) return fail(res, error);
  const c = resolveContact(data);
  if (!c) return fail(res, 'Contact not found', 404);
  const id = S.createInvoice({ contact_id: c.id, quote_id: data.quoteId, job_id: data.jobId, items: data.items, service_date: data.service_date, invoice_date: data.invoice_date, notes: data.notes, tax_rate: data.tax_rate }, actor(req));
  if (data.send) await S.sendInvoice(id, actor(req));
  ok(res, { invoice: invoiceOut(S.getInvoice(id)) }, 201);
}));
router.post('/invoices/:id/send', wrap(async (req, res) => {
  const inv = S.getInvoice(idParam(req.params.id)); if (!inv) return fail(res, 'Invoice not found', 404);
  await S.sendInvoice(inv.id, actor(req));
  ok(res, { invoice: invoiceOut(S.getInvoice(inv.id)) });
}));
router.post('/invoices/:id/payments', (req, res) => {
  const inv = S.getInvoice(idParam(req.params.id)); if (!inv) return fail(res, 'Invoice not found', 404);
  const { data, error } = validate(z.object({ amount: z.union([z.number(), z.string()]).optional(), amount_cents: z.coerce.number().int().optional(), method: z.enum(S.PAYMENT_METHODS).optional().default('Cash'), reference: z.string().trim().max(200).optional().default('') }), req.body);
  if (error) return fail(res, error + `. Methods: ${S.PAYMENT_METHODS.join(', ')}`);
  const cents = data.amount_cents ?? (data.amount !== undefined ? toCents(data.amount) : inv.due_cents);
  if (!(cents > 0)) return fail(res, 'Amount must be greater than 0 (omit to pay the full balance)');
  const updated = S.recordPayment(inv.id, { amount_cents: cents, method: data.method, reference: data.reference }, actor(req));
  ok(res, { invoice: invoiceOut(updated), payment: { amount_cents: cents, method: data.method, reference: data.reference } }, 201);
});

// ---- jobs ----
const jobOut = (j) => j && ({ ...j, contact: contactOut(j.contact), quote: j.quote ? { id: j.quote.id, number: j.quote.number, total_cents: j.quote.total_cents } : null, admin_link: `${config.baseUrl}/admin/jobs/${j.id}` });
router.get('/jobs', (req, res) => {
  const db = getDb();
  const where = ['j.archived = 0']; const args = [];
  if (req.query.status) { where.push('j.status = ?'); args.push(String(req.query.status)); }
  if (req.query.contactId) { where.push('j.contact_id = ?'); args.push(Number(req.query.contactId)); }
  if (req.query.from) { where.push('j.scheduled_at >= ?'); args.push(String(req.query.from)); }
  if (req.query.to) { where.push('j.scheduled_at <= ?'); args.push(String(req.query.to)); }
  const rows = db.prepare(`SELECT j.*, c.first_name, c.last_name, c.phone, c.town FROM jobs j JOIN contacts c ON c.id = j.contact_id WHERE ${where.join(' AND ')} ORDER BY COALESCE(j.scheduled_at, '9999') LIMIT 200`).all(...args);
  ok(res, { jobs: rows, statuses: S.JOB_STATUSES });
});
router.get('/jobs/:id', (req, res) => { const j = S.getJob(idParam(req.params.id)); if (!j) return fail(res, 'Job not found', 404); ok(res, { job: jobOut(j) }); });
router.post('/jobs', (req, res) => {
  const { data, error } = validate(z.object({ contactId: contactIdSchema.optional(), phone: z.string().optional(), email: z.string().optional(), name: z.string().optional(), quoteId: contactIdSchema.optional(), title: z.string().trim().min(1).max(200), scheduled_at: z.string().trim().optional(), notes: z.string().trim().max(4000).optional().default(''), checklist: z.array(z.string()).optional() }), req.body);
  if (error) return fail(res, error);
  let c = resolveContact(data);
  if (!c && (normalizePhone(data.phone) || isEmail(data.email || ''))) c = S.upsertContact({ name: data.name, phone: data.phone, email: data.email, source: 'API job' }).contact;
  if (!c) return fail(res, 'Contact not found (send contactId, or phone/email)', 404);
  let when = null;
  if (data.scheduled_at) { const d = new Date(data.scheduled_at); if (Number.isNaN(d.getTime())) return fail(res, 'scheduled_at must be an ISO date-time, e.g. 2026-10-02T14:00:00-04:00'); when = d.toISOString(); }
  const job = S.createJob({ contact_id: c.id, quote_id: data.quoteId, title: data.title, scheduled_at: when, notes: data.notes, checklist: data.checklist }, actor(req));
  ok(res, { job: jobOut(S.getJob(job.id)) }, 201);
});
router.post('/jobs/:id/complete', wrap(async (req, res) => {
  const j = S.getJob(idParam(req.params.id)); if (!j) return fail(res, 'Job not found', 404);
  if (j.status === 'Complete') return ok(res, { job: jobOut(j), already_complete: true });
  const invoiceId = await S.completeJob(j.id, actor(req));
  ok(res, { job: jobOut(S.getJob(j.id)), invoice_id: invoiceId });
}));

// ---- automations + campaigns ----
router.get('/automations', (req, res) => ok(res, { automations: getDb().prepare('SELECT id, name, trigger, trigger_keyword, enabled, run_count FROM automations WHERE archived = 0 ORDER BY id').all() }));
router.post('/automations/:id/trigger', wrap(async (req, res) => {
  const id = idParam(req.params.id); const a = id && getDb().prepare('SELECT * FROM automations WHERE id = ? AND archived = 0').get(id);
  if (!a) return fail(res, 'Automation not found', 404);
  const { data, error } = validate(z.object({ contactId: contactIdSchema.optional(), phone: z.string().optional(), email: z.string().optional(), leadId: contactIdSchema.optional(), quoteId: contactIdSchema.optional(), invoiceId: contactIdSchema.optional(), jobId: contactIdSchema.optional(), text: z.string().optional(), keyword: z.string().optional() }), req.body);
  if (error) return fail(res, error);
  const c = resolveContact(data);
  if (!c) return fail(res, 'Contact not found (send contactId, or phone/email)', 404);
  if (!a.enabled) return fail(res, 'Automation is turned off', 409);
  const ctx = { contactId: c.id, leadId: data.leadId, quoteId: data.quoteId, invoiceId: data.invoiceId, jobId: data.jobId, text: data.text, keyword: data.keyword };
  getDb().prepare('UPDATE automations SET run_count = run_count + 1 WHERE id = ?').run(a.id);
  audit(actor(req), 'automation_started', 'automation', a.id, { via: 'api', ctx });
  const result = await runSteps(a.id, 0, ctx);
  ok(res, { automation_id: a.id, result, contact_id: c.id });
}));
router.post('/campaigns/:id/send', wrap(async (req, res) => {
  const id = idParam(req.params.id); const c = id && getDb().prepare('SELECT * FROM campaigns WHERE id = ? AND archived = 0').get(id);
  if (!c) return fail(res, 'Campaign not found', 404);
  const { data, error } = validate(z.object({ scheduled_at: z.string().optional() }), req.body);
  if (error) return fail(res, error);
  let when = null;
  if (data.scheduled_at) { const d = new Date(data.scheduled_at); if (Number.isNaN(d.getTime())) return fail(res, 'scheduled_at must be an ISO date-time'); when = d.toISOString(); }
  const n = scheduleCampaign(c.id, when, actor(req));
  if (!when) processCampaigns().catch(() => {});
  ok(res, { campaign_id: c.id, recipients: n, scheduled_at: when || nowIso() });
}));

// ---- events (polling trigger) ----
router.get('/events', (req, res) => {
  const rows = listEvents({ since: req.query.since, name: req.query.event || req.query.name, limit: req.query.limit, contactId: req.query.contactId });
  const last = rows.length ? Math.max(...rows.map((r) => r.id)) : (Number(req.query.since) || 0);
  if (req.query.flat === '1' || req.query.flat === 'true') return res.json(rows); // bare array for Zapier "Retrieve Poll"
  ok(res, { events: rows, next_since: last, event_names: EVENT_NAMES });
});
router.get('/events/names', (req, res) => ok(res, { events: EVENT_NAMES }));

// ---- blog ----
router.post('/blog', wrap(async (req, res) => { const r = await publishBlogPost(req.body || {}, actor(req)); res.status(r.status).json(r.body); }));

// ---- AI agents ----
router.get('/ai/agents', (req, res) => ok(res, { agents: listAgents().map((a) => ({ id: a.id, name: a.name, description: a.description, provider: a.provider, model: a.model, autopilot: a.autopilot, enabled: !!a.enabled, tools: a.tools })), tools: TOOL_NAMES }));
router.post('/ai/run', wrap(async (req, res) => {
  const { data, error } = validate(z.object({ agent: z.string().trim().min(1), input: z.any().optional().default({}), contactId: contactIdSchema.optional(), phone: z.string().optional(), email: z.string().optional(), leadId: contactIdSchema.optional(), dryRun: z.coerce.boolean().optional().default(false) }), req.body);
  if (error) return fail(res, error);
  const c = resolveContact(data);
  if ((data.contactId || data.phone || data.email) && !c) return fail(res, 'Contact not found', 404);
  const r = await runAgent(data.agent, { input: data.input, contactId: c?.id, leadId: data.leadId, actor: actor(req), dryAutopilot: data.dryRun });
  if (!r.ok) return fail(res, r.error || 'Agent failed', r.error?.startsWith('Unknown agent') ? 404 : 502, { run_id: r.run_id, tool_calls: r.tool_calls });
  ok(res, r);
}));

// 404 inside /api/v1
router.use((req, res) => fail(res, `No route ${req.method} /api/v1${req.path}`, 404));
// Errors inside /api/v1 are always JSON.
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  console.error('api error', err);
  if (err.type === 'entity.parse.failed') return fail(res, 'Body must be valid JSON', 400);
  fail(res, err.message || 'Server error', err.status || 500);
});

export default router;
