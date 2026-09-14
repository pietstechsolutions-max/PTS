// Back office (GoHighLevel + Jobber style) at /admin.
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import crypto from 'node:crypto';
import { getDb, getSetting, setSetting, getSettings } from '../db.js';
import { config } from '../config.js';
import { nowIso, addDays, normalizePhone, normalizeEmail, toCents, audit, changeLog, parseJson, money, mergeFields, prettyPhone, fromCents, cardFee } from '../lib/util.js';
import { sendSms, sendEmail } from '../lib/providers.js';
import * as S from '../lib/services.js';
import { TRIGGERS, ACTION_TYPES, enqueue, runSteps, tick } from '../lib/automations.js';
import { EVENT_NAMES, testWebhook, listEvents } from '../lib/events.js';
import { createApiKey, revokeApiKey, listApiKeys } from '../lib/apikeys.js';
import { listAgents, getAgent, saveAgent, runAgent, AI_PROVIDERS, AUTOPILOT_MODES, TOOL_NAMES, TOOLS, aiStatus, resolveProvider } from '../lib/ai.js';
import { emitEvent } from '../lib/events.js';
import { audienceContacts, scheduleCampaign, processCampaigns } from '../lib/campaigns.js';
import * as Blog from '../lib/blog.js';

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 25, standardHeaders: 'draft-7', legacyHeaders: false });

function safeEqual(a, b) {
  const ab = Buffer.from(String(a)); const bb = Buffer.from(String(b));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}
function requireAdmin(req, res, next) {
  if (req.session?.admin) { res.locals.admin = req.session.admin; return next(); }
  req.session.returnTo = req.originalUrl;
  res.redirect('/admin/login');
}
const A = (req) => 'admin:' + (req.session?.admin?.email || 'unknown');

// ---- auth ----
router.get('/login', (req, res) => {
  if (req.session?.admin) return res.redirect('/admin');
  res.page('auth', 'admin/login', { title: 'Admin sign in', error: null });
});
router.post('/login', loginLimiter, (req, res) => {
  const email = normalizeEmail(req.body.email);
  const pw = String(req.body.password || '');
  if (safeEqual(email, config.admin.email.toLowerCase()) && safeEqual(pw, config.admin.password)) {
    req.session.regenerate(() => {
      req.session.admin = { email };
      audit('admin:' + email, 'login', 'admin');
      const to = req.session.returnTo || '/admin';
      delete req.session.returnTo;
      req.session.save(() => res.redirect(to));
    });
    return;
  }
  audit('admin', 'login_failed', 'admin', null, email);
  res.status(401).page('auth', 'admin/login', { title: 'Admin sign in', error: 'Wrong email or password.' });
});
router.post('/logout', (req, res) => req.session.destroy(() => res.redirect('/admin/login')));
router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/admin/login')));

router.use(requireAdmin);

// ---- dashboard ----
router.get('/', (req, res) => {
  const db = getDb();
  const weekAgo = addDays(-7);
  const kpi = {
    newLeads: db.prepare('SELECT COUNT(*) AS n FROM leads WHERE archived = 0 AND created_at >= ?').get(weekAgo).n,
    openQuotes: db.prepare("SELECT COUNT(*) AS n, COALESCE(SUM(total_cents), 0) AS total FROM quotes WHERE archived = 0 AND status IN ('Sent', 'Changes Requested')").get(),
    unpaid: db.prepare("SELECT COUNT(*) AS n, COALESCE(SUM(total_cents - paid_cents), 0) AS total FROM invoices WHERE archived = 0 AND status IN ('Sent', 'Partial', 'Overdue')").get(),
    mrr: S.mrrCents(),
    subs: db.prepare("SELECT COUNT(*) AS n FROM subscriptions WHERE status IN ('active', 'cancel_requested')").get().n,
    jobsWeek: db.prepare("SELECT COUNT(*) AS n FROM jobs WHERE archived = 0 AND status != 'Complete' AND scheduled_at BETWEEN ? AND ?").get(nowIso().slice(0, 10), addDays(7)).n,
    unreadSms: db.prepare("SELECT COUNT(*) AS n FROM messages WHERE direction = 'in' AND read_at IS NULL").get().n
  };
  const activity = db.prepare('SELECT * FROM audit_log ORDER BY id DESC LIMIT 25').all();
  const upcoming = db.prepare("SELECT j.*, c.first_name, c.last_name FROM jobs j JOIN contacts c ON c.id = j.contact_id WHERE j.archived = 0 AND j.status != 'Complete' ORDER BY COALESCE(j.scheduled_at, '9999') LIMIT 6").all();
  const followUps = db.prepare("SELECT l.*, c.first_name, c.last_name, c.phone FROM leads l JOIN contacts c ON c.id = l.contact_id WHERE l.archived = 0 AND l.status = 'Open' AND l.next_follow_up IS NOT NULL AND l.next_follow_up <= ? ORDER BY l.next_follow_up LIMIT 8").all(addDays(1).slice(0, 10));
  res.page('admin', 'admin/dashboard', { title: 'Dashboard', kpi, activity, upcoming, followUps });
});

// ---- contacts ----
router.get('/contacts', (req, res) => {
  const db = getDb();
  const q = String(req.query.q || '').trim();
  const showArchived = req.query.archived === '1';
  let rows;
  if (q) {
    const like = `%${q}%`;
    rows = db.prepare(`SELECT * FROM contacts WHERE archived = ? AND (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ? OR email LIKE ? OR town LIKE ? OR company LIKE ? OR tags LIKE ?) ORDER BY updated_at DESC LIMIT 200`)
      .all(showArchived ? 1 : 0, like, like, like.replace(/\D/g, '') ? `%${q.replace(/\D/g, '')}%` : like, like, like, like, like);
  } else rows = db.prepare('SELECT * FROM contacts WHERE archived = ? ORDER BY updated_at DESC LIMIT 200').all(showArchived ? 1 : 0);
  for (const c of rows) c.balance = S.contactBalanceCents(c.id);
  res.page('admin', 'admin/contacts', { title: 'Contacts', rows, q, showArchived });
});
router.get('/contacts/new', (req, res) => res.page('admin', 'admin/contact-form', { title: 'New contact', c: null }));
router.post('/contacts', (req, res) => {
  const { contact, created } = S.upsertContact({ first_name: req.body.first_name, last_name: req.body.last_name, phone: req.body.phone, email: req.body.email, town: req.body.town, company: req.body.company, source: req.body.source || 'Manual', tags: String(req.body.tags || '').split(',').map((t) => t.trim()).filter(Boolean) });
  audit(A(req), created ? 'contact_created' : 'contact_matched', 'contact', contact.id);
  req.flash('ok', created ? 'Contact created.' : 'A contact with that phone/email already existed - opened it.');
  res.redirect(`/admin/contacts/${contact.id}`);
});
router.get('/contacts/:id', (req, res) => {
  const db = getDb();
  const c = S.getContact(req.params.id);
  if (!c) return res.status(404).send('Not found');
  const id = c.id;
  const data = {
    c,
    leads: db.prepare('SELECT * FROM leads WHERE contact_id = ? ORDER BY id DESC').all(id),
    quotes: db.prepare('SELECT * FROM quotes WHERE contact_id = ? ORDER BY id DESC').all(id),
    jobs: db.prepare('SELECT * FROM jobs WHERE contact_id = ? ORDER BY id DESC').all(id),
    invoices: db.prepare('SELECT * FROM invoices WHERE contact_id = ? ORDER BY id DESC').all(id),
    messages: db.prepare('SELECT * FROM messages WHERE contact_id = ? ORDER BY id DESC LIMIT 10').all(id),
    notes: db.prepare('SELECT * FROM notes WHERE contact_id = ? ORDER BY id DESC').all(id),
    subs: db.prepare('SELECT * FROM subscriptions WHERE contact_id = ? ORDER BY id DESC').all(id),
    payments: db.prepare('SELECT p.*, i.number FROM payments p LEFT JOIN invoices i ON i.id = p.invoice_id WHERE p.contact_id = ? ORDER BY p.id DESC').all(id),
    balance: S.contactBalanceCents(id)
  };
  // Unified timeline
  const timeline = [];
  data.leads.forEach((l) => timeline.push({ at: l.created_at, kind: 'lead', text: `Lead: ${l.service || 'request'} (${l.stage})`, href: '/admin/pipeline' }));
  data.quotes.forEach((q) => timeline.push({ at: q.created_at, kind: 'quote', text: `Estimate ${q.number} - ${money(q.total_cents)} (${q.status})`, href: `/admin/quotes/${q.id}` }));
  data.jobs.forEach((j) => timeline.push({ at: j.scheduled_at || j.created_at, kind: 'job', text: `Job #${j.id} ${j.title} (${j.status})`, href: `/admin/jobs/${j.id}` }));
  data.invoices.forEach((i) => timeline.push({ at: i.created_at, kind: 'invoice', text: `Invoice ${i.number} - ${money(i.total_cents)} (${i.status})`, href: `/admin/invoices/${i.id}` }));
  data.messages.forEach((m) => timeline.push({ at: m.created_at, kind: 'message', text: `${m.direction === 'in' ? 'Received' : 'Sent'} ${m.channel}: ${m.body.slice(0, 90)}`, href: `/admin/conversations/${id}` }));
  data.notes.forEach((n) => timeline.push({ at: n.created_at, kind: 'note', text: `Note: ${n.body.slice(0, 120)}` }));
  data.payments.forEach((p) => timeline.push({ at: p.created_at, kind: 'payment', text: `Payment ${money(p.amount_cents)} by ${p.method}${p.number ? ' for ' + p.number : ''}` }));
  timeline.sort((a, b) => (a.at < b.at ? 1 : -1));
  res.page('admin', 'admin/contact', { title: `${c.first_name} ${c.last_name}`.trim() || 'Contact', ...data, timeline, tags: parseJson(c.tags, []) });
});
router.get('/contacts/:id/edit', (req, res) => {
  const c = S.getContact(req.params.id);
  if (!c) return res.status(404).send('Not found');
  res.page('admin', 'admin/contact-form', { title: 'Edit contact', c: { ...c, tags: parseJson(c.tags, []).join(', ') } });
});
router.post('/contacts/:id', (req, res) => {
  const db = getDb();
  const c = S.getContact(req.params.id);
  if (!c) return res.status(404).send('Not found');
  const tags = String(req.body.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
  const optIn = req.body.sms_opt_in ? 1 : 0;
  db.prepare(`UPDATE contacts SET first_name = ?, last_name = ?, company = ?, phone = ?, email = ?, town = ?, tags = ?, source = ?, sms_opt_in = ?, sms_opt_out_at = CASE WHEN ? = 1 THEN NULL ELSE COALESCE(sms_opt_out_at, ?) END, email_opt_in = ?, updated_at = ? WHERE id = ?`)
    .run(String(req.body.first_name || '').trim(), String(req.body.last_name || '').trim(), String(req.body.company || '').trim(), normalizePhone(req.body.phone), normalizeEmail(req.body.email), String(req.body.town || '').trim(), JSON.stringify(tags), String(req.body.source || '').trim(), optIn, optIn, nowIso(), req.body.email_opt_in ? 1 : 0, nowIso(), c.id);
  audit(A(req), 'contact_updated', 'contact', c.id);
  emitEvent('contact_updated', { contactId: c.id });
  req.flash('ok', 'Contact saved.');
  res.redirect(`/admin/contacts/${c.id}`);
});
router.post('/contacts/:id/notes', (req, res) => {
  const body = String(req.body.body || '').trim();
  if (body) {
    getDb().prepare('INSERT INTO notes (contact_id, body, author, created_at) VALUES (?, ?, ?, ?)').run(req.params.id, body, 'owner', nowIso());
    audit(A(req), 'note_added', 'contact', Number(req.params.id));
  }
  res.redirect(`/admin/contacts/${req.params.id}`);
});
router.post('/contacts/:id/archive', (req, res) => {
  getDb().prepare('UPDATE contacts SET archived = ?, updated_at = ? WHERE id = ?').run(req.body.restore ? 0 : 1, nowIso(), req.params.id);
  audit(A(req), req.body.restore ? 'contact_restored' : 'contact_archived', 'contact', Number(req.params.id));
  res.redirect(req.body.restore ? `/admin/contacts/${req.params.id}` : '/admin/contacts');
});
router.post('/contacts/:id/optin', (req, res) => {
  S.setSmsOptIn(Number(req.params.id), req.body.opt_in === '1', 'Changed by ' + A(req));
  res.redirect(`/admin/contacts/${req.params.id}`);
});

// ---- pipeline ----
router.get('/pipeline', (req, res) => {
  const db = getDb();
  const leads = db.prepare('SELECT l.*, c.first_name, c.last_name, c.phone, c.town FROM leads l JOIN contacts c ON c.id = l.contact_id WHERE l.archived = 0 ORDER BY l.updated_at DESC').all();
  const columns = S.PIPELINE_STAGES.map((stage) => ({ stage, leads: leads.filter((l) => l.stage === stage), value: leads.filter((l) => l.stage === stage).reduce((s, l) => s + l.value_cents, 0) }));
  const contacts = db.prepare('SELECT id, first_name, last_name, phone FROM contacts WHERE archived = 0 ORDER BY first_name, last_name').all();
  res.page('admin', 'admin/pipeline', { title: 'Pipeline', columns, stages: S.PIPELINE_STAGES, contacts });
});
router.post('/pipeline', async (req, res, next) => {
  try {
    let contactId = Number(req.body.contact_id);
    if (!contactId) {
      const r = S.upsertContact({ name: req.body.name, phone: req.body.phone, email: req.body.email, town: req.body.town, source: req.body.source || 'Manual' });
      contactId = r.contact.id;
    }
    const c = S.getContact(contactId);
    const db = getDb();
    const ts = nowIso();
    const r = db.prepare("INSERT INTO leads (contact_id, stage, service, message, source, value_cents, next_follow_up, created_at, updated_at) VALUES (?, 'New', ?, ?, ?, ?, ?, ?, ?)")
      .run(c.id, String(req.body.service || ''), String(req.body.message || ''), String(req.body.source || 'Manual'), toCents(req.body.value), req.body.next_follow_up || null, ts, ts);
    changeLog('lead', r.lastInsertRowid, 'owner', 'Quote request added by the office.');
    audit(A(req), 'lead_created', 'lead', r.lastInsertRowid);
    res.redirect('/admin/pipeline');
  } catch (e) { next(e); }
});
router.post('/pipeline/:id/stage', (req, res) => {
  S.moveLead(Number(req.params.id), req.body.stage, A(req));
  if (req.accepts(['html', 'json']) === 'json' || req.is('json')) return res.json({ ok: true });
  res.redirect('/admin/pipeline');
});
router.post('/pipeline/:id', (req, res) => {
  const db = getDb();
  db.prepare('UPDATE leads SET service = ?, message = ?, source = ?, value_cents = ?, next_follow_up = ?, updated_at = ? WHERE id = ?')
    .run(String(req.body.service || ''), String(req.body.message || ''), String(req.body.source || ''), toCents(req.body.value), req.body.next_follow_up || null, nowIso(), req.params.id);
  if (req.body.stage) S.moveLead(Number(req.params.id), req.body.stage, A(req));
  audit(A(req), 'lead_updated', 'lead', Number(req.params.id));
  res.redirect(req.body.redirect || '/admin/pipeline');
});
router.post('/pipeline/:id/archive', (req, res) => {
  getDb().prepare('UPDATE leads SET archived = 1, updated_at = ? WHERE id = ?').run(nowIso(), req.params.id);
  audit(A(req), 'lead_archived', 'lead', Number(req.params.id));
  res.redirect('/admin/pipeline');
});
router.post('/pipeline/:id/reply', (req, res) => {
  const lead = getDb().prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!lead) return res.status(404).send('Not found');
  const note = String(req.body.note || '').trim();
  if (note) { changeLog('lead', lead.id, 'owner', note); audit(A(req), 'lead_note', 'lead', lead.id, note); }
  res.redirect(req.body.redirect || '/admin/pipeline');
});

// ---- quotes ----
function itemsFromForm(body) {
  const desc = [].concat(body['item_description'] || []);
  const qty = [].concat(body['item_qty'] || []);
  const price = [].concat(body['item_price'] || []);
  const section = [].concat(body['item_section'] || []);
  return desc.map((d, i) => ({ description: d, qty: qty[i], unit_price: price[i], section: section[i] || 'main' }));
}
router.get('/quotes', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT q.*, c.first_name, c.last_name FROM quotes q JOIN contacts c ON c.id = q.contact_id WHERE q.archived = 0 ORDER BY q.id DESC').all();
  res.page('admin', 'admin/quotes', { title: 'Quotes', rows });
});
router.get('/quotes/new', (req, res) => {
  const db = getDb();
  const contacts = db.prepare('SELECT id, first_name, last_name, phone FROM contacts WHERE archived = 0 ORDER BY first_name, last_name').all();
  const lead = req.query.lead_id ? db.prepare('SELECT * FROM leads WHERE id = ?').get(req.query.lead_id) : null;
  const q = { contact_id: Number(req.query.contact_id) || lead?.contact_id || '', lead_id: lead?.id || '', title: lead?.service || '', notes: '', items: [], tax_rate: getSetting('tax_rate'), valid_until: addDays(Number(getSetting('quote_valid_days', '7'))).slice(0, 10) };
  res.page('admin', 'admin/quote-form', { title: 'New estimate', q, contacts, isNew: true });
});
router.post('/quotes', (req, res, next) => {
  try {
    const id = S.saveQuote(null, { contact_id: Number(req.body.contact_id), lead_id: Number(req.body.lead_id) || null, title: req.body.title, notes: req.body.notes, items: itemsFromForm(req.body), tax_rate: req.body.tax_rate, valid_until: req.body.valid_until }, A(req));
    req.flash('ok', 'Estimate saved as draft.');
    res.redirect(`/admin/quotes/${id}`);
  } catch (e) { next(e); }
});
router.get('/quotes/:id', (req, res) => {
  const q = S.getQuote(req.params.id);
  if (!q) return res.status(404).send('Not found');
  const db = getDb();
  q.revisions = db.prepare('SELECT * FROM quote_revisions WHERE quote_id = ? ORDER BY revision DESC').all(q.id).map((r) => ({ ...r, snapshot: parseJson(r.snapshot, {}) }));
  q.log = db.prepare("SELECT * FROM change_log WHERE entity_type = 'quote' AND entity_id = ? ORDER BY id DESC").all(q.id);
  res.page('admin', 'admin/quote', { title: `Estimate ${q.number}`, q });
});
router.get('/quotes/:id/edit', (req, res) => {
  const q = S.getQuote(req.params.id);
  if (!q) return res.status(404).send('Not found');
  const contacts = getDb().prepare('SELECT id, first_name, last_name, phone FROM contacts WHERE archived = 0 ORDER BY first_name, last_name').all();
  res.page('admin', 'admin/quote-form', { title: `Edit ${q.number}`, q, contacts, isNew: false });
});
router.get('/quotes/:id/print', (req, res) => {
  const q = S.getQuote(req.params.id);
  if (!q) return res.status(404).send('Not found');
  res.page('print', 'print/quote', { title: `Estimate ${q.number}`, q });
});
router.post('/quotes/:id', (req, res, next) => {
  try {
    S.saveQuote(Number(req.params.id), { title: req.body.title, notes: req.body.notes, items: itemsFromForm(req.body), tax_rate: req.body.tax_rate, valid_until: req.body.valid_until }, A(req), String(req.body.change_summary || '').trim());
    req.flash('ok', 'Estimate revised. Send it again so the client sees the new version.');
    res.redirect(`/admin/quotes/${req.params.id}`);
  } catch (e) { next(e); }
});
router.post('/quotes/:id/send', async (req, res, next) => {
  try { await S.sendQuote(Number(req.params.id), A(req)); req.flash('ok', 'Estimate sent by text and email with a portal link.'); res.redirect(`/admin/quotes/${req.params.id}`); } catch (e) { next(e); }
});
router.post('/quotes/:id/approve', async (req, res, next) => {
  try { await S.approveQuote(Number(req.params.id), String(req.body.signed_name || 'Approved by phone (office)')); req.flash('ok', 'Marked approved and a job was created.'); res.redirect(`/admin/quotes/${req.params.id}`); } catch (e) { next(e); }
});
router.post('/quotes/:id/convert', (req, res) => {
  const job = S.createJobFromQuote(Number(req.params.id), A(req));
  res.redirect(job ? `/admin/jobs/${job.id}` : `/admin/quotes/${req.params.id}`);
});
router.post('/quotes/:id/invoice', (req, res) => {
  const q = S.getQuote(req.params.id);
  if (!q) return res.status(404).send('Not found');
  const id = S.createInvoice({ contact_id: q.contact_id, quote_id: q.id, job_id: q.job_id, service_date: nowIso().slice(0, 10), items: q.items.map((i) => ({ ...i, unit_price: i.unit_cents / 100 })), notes: '', tax_rate: q.tax_rate }, A(req));
  getDb().prepare('UPDATE quotes SET invoice_id = ? WHERE id = ?').run(id, q.id);
  changeLog('quote', q.id, 'owner', `Invoice created from this estimate.`);
  res.redirect(`/admin/invoices/${id}`);
});
router.post('/quotes/:id/archive', (req, res) => {
  getDb().prepare('UPDATE quotes SET archived = 1, updated_at = ? WHERE id = ?').run(nowIso(), req.params.id);
  audit(A(req), 'quote_archived', 'quote', Number(req.params.id));
  res.redirect('/admin/quotes');
});

// ---- jobs ----
router.get('/jobs', (req, res) => {
  const rows = getDb().prepare("SELECT j.*, c.first_name, c.last_name, c.town FROM jobs j JOIN contacts c ON c.id = j.contact_id WHERE j.archived = 0 ORDER BY CASE j.status WHEN 'Complete' THEN 1 ELSE 0 END, COALESCE(j.scheduled_at, '9999')").all();
  res.page('admin', 'admin/jobs', { title: 'Jobs', rows });
});
router.get('/jobs/new', (req, res) => {
  const contacts = getDb().prepare('SELECT id, first_name, last_name, phone FROM contacts WHERE archived = 0 ORDER BY first_name, last_name').all();
  res.page('admin', 'admin/job-form', { title: 'New job', contacts, contact_id: Number(req.query.contact_id) || '' });
});
router.post('/jobs', (req, res) => {
  const job = S.createJob({ contact_id: Number(req.body.contact_id), title: req.body.title || 'Service visit', scheduled_at: parseLocalEt(req.body.scheduled_at) || null, notes: req.body.notes }, A(req));
  res.redirect(`/admin/jobs/${job.id}`);
});
router.get('/jobs/:id', (req, res) => {
  const j = S.getJob(req.params.id);
  if (!j) return res.status(404).send('Not found');
  res.page('admin', 'admin/job', { title: `Job #${j.id}`, j, statuses: S.JOB_STATUSES });
});
function parseLocalEt(v) {
  if (!v) return null;
  // datetime-local value in ET -> ISO. Use offset from Intl for that date.
  const probe = new Date(v + ':00Z');
  const etHour = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }).format(probe)) % 24;
  const offset = (etHour - probe.getUTCHours() + 24) % 24; // 20 for -4, 19 for -5
  const off = offset >= 12 ? offset - 24 : offset;
  return new Date(probe.getTime() - off * 3600 * 1000).toISOString();
}
router.post('/jobs/:id', async (req, res, next) => {
  try {
    const db = getDb();
    const j = S.getJob(req.params.id);
    if (!j) return res.status(404).send('Not found');
    const status = S.JOB_STATUSES.includes(req.body.status) ? req.body.status : j.status;
    db.prepare('UPDATE jobs SET title = ?, scheduled_at = ?, notes = ?, status = ?, updated_at = ? WHERE id = ?')
      .run(String(req.body.title || j.title), parseLocalEt(req.body.scheduled_at) || null, String(req.body.notes || ''), status === 'Complete' ? j.status : status, nowIso(), j.id);
    // checklist + materials
    const ck = [].concat(req.body.checklist_item || []); const ckDone = [].concat(req.body.checklist_done || []);
    db.prepare('DELETE FROM job_checklist WHERE job_id = ?').run(j.id);
    const insCk = db.prepare('INSERT INTO job_checklist (job_id, item, done, sort) VALUES (?, ?, ?, ?)');
    ck.forEach((item, i) => { if (String(item).trim()) insCk.run(j.id, String(item).trim(), ckDone.includes(String(i)) ? 1 : 0, i); });
    const mat = [].concat(req.body.material_item || []); const matQty = [].concat(req.body.material_qty || []);
    db.prepare('DELETE FROM job_materials WHERE job_id = ?').run(j.id);
    const insMat = db.prepare('INSERT INTO job_materials (job_id, item, qty, sort) VALUES (?, ?, ?, ?)');
    mat.forEach((item, i) => { if (String(item).trim()) insMat.run(j.id, String(item).trim(), Number(matQty[i]) || 1, i); });
    audit(A(req), 'job_updated', 'job', j.id);
    const newWhen = parseLocalEt(req.body.scheduled_at) || null;
    if (newWhen && newWhen !== j.scheduled_at) emitEvent('job_scheduled', { contactId: j.contact_id, jobId: j.id, quoteId: j.quote_id, extra: { rescheduled: !!j.scheduled_at } });
    if (status === 'Complete' && j.status !== 'Complete') {
      const invoiceId = await S.completeJob(j.id, A(req));
      req.flash('ok', `Job marked complete. Invoice draft created - review and send it.`);
      return res.redirect(`/admin/invoices/${invoiceId}`);
    }
    req.flash('ok', 'Job saved.');
    res.redirect(`/admin/jobs/${j.id}`);
  } catch (e) { next(e); }
});
router.post('/jobs/:id/complete', async (req, res, next) => {
  try {
    const invoiceId = await S.completeJob(Number(req.params.id), A(req));
    req.flash('ok', 'Job complete. Invoice draft created from the estimate - review and send it.');
    res.redirect(`/admin/invoices/${invoiceId}`);
  } catch (e) { next(e); }
});
router.post('/jobs/:id/archive', (req, res) => {
  getDb().prepare('UPDATE jobs SET archived = 1, updated_at = ? WHERE id = ?').run(nowIso(), req.params.id);
  audit(A(req), 'job_archived', 'job', Number(req.params.id));
  res.redirect('/admin/jobs');
});

// ---- invoices ----
router.get('/invoices', (req, res) => {
  S.markOverdueInvoices();
  const rows = getDb().prepare('SELECT i.*, c.first_name, c.last_name FROM invoices i JOIN contacts c ON c.id = i.contact_id WHERE i.archived = 0 ORDER BY i.id DESC').all();
  res.page('admin', 'admin/invoices', { title: 'Invoices', rows });
});
router.get('/invoices/new', (req, res) => {
  const contacts = getDb().prepare('SELECT id, first_name, last_name, phone FROM contacts WHERE archived = 0 ORDER BY first_name, last_name').all();
  const inv = { contact_id: Number(req.query.contact_id) || '', service_date: nowIso().slice(0, 10), invoice_date: nowIso().slice(0, 10), notes: '', items: [], tax_rate: getSetting('tax_rate') };
  res.page('admin', 'admin/invoice-form', { title: 'New invoice', inv, contacts, isNew: true });
});
router.post('/invoices', (req, res, next) => {
  try {
    const id = S.createInvoice({ contact_id: Number(req.body.contact_id), service_date: req.body.service_date, invoice_date: req.body.invoice_date, notes: req.body.notes, items: itemsFromForm(req.body), tax_rate: req.body.tax_rate }, A(req));
    res.redirect(`/admin/invoices/${id}`);
  } catch (e) { next(e); }
});
router.get('/invoices/:id', (req, res) => {
  const inv = S.getInvoice(req.params.id);
  if (!inv) return res.status(404).send('Not found');
  res.page('admin', 'admin/invoice', { title: `Invoice ${inv.number}`, inv, methods: S.PAYMENT_METHODS, fee: cardFee(inv.due_cents) });
});
router.get('/invoices/:id/edit', (req, res) => {
  const inv = S.getInvoice(req.params.id);
  if (!inv) return res.status(404).send('Not found');
  const contacts = getDb().prepare('SELECT id, first_name, last_name, phone FROM contacts WHERE archived = 0 ORDER BY first_name, last_name').all();
  res.page('admin', 'admin/invoice-form', { title: `Edit ${inv.number}`, inv, contacts, isNew: false });
});
router.get('/invoices/:id/print', (req, res) => {
  const inv = S.getInvoice(req.params.id);
  if (!inv) return res.status(404).send('Not found');
  res.page('print', 'print/invoice', { title: `Invoice ${inv.number}`, inv });
});
router.post('/invoices/:id', (req, res, next) => {
  try {
    S.updateInvoice(Number(req.params.id), { service_date: req.body.service_date, invoice_date: req.body.invoice_date, notes: req.body.notes, items: itemsFromForm(req.body), tax_rate: req.body.tax_rate }, A(req));
    req.flash('ok', 'Invoice saved.');
    res.redirect(`/admin/invoices/${req.params.id}`);
  } catch (e) { next(e); }
});
router.post('/invoices/:id/send', async (req, res, next) => {
  try { await S.sendInvoice(Number(req.params.id), A(req)); req.flash('ok', 'Invoice sent by text and email.'); res.redirect(`/admin/invoices/${req.params.id}`); } catch (e) { next(e); }
});
router.post('/invoices/:id/payment', (req, res, next) => {
  try {
    const amount = toCents(req.body.amount);
    if (amount <= 0) { req.flash('error', 'Enter an amount.'); return res.redirect(`/admin/invoices/${req.params.id}`); }
    const method = S.PAYMENT_METHODS.includes(req.body.method) ? req.body.method : 'Cash';
    S.recordPayment(Number(req.params.id), { amount_cents: amount, method, reference: String(req.body.reference || '') }, A(req));
    req.flash('ok', `Recorded ${money(amount)} by ${method}.`);
    res.redirect(`/admin/invoices/${req.params.id}`);
  } catch (e) { next(e); }
});
router.post('/invoices/:id/card-link', async (req, res, next) => {
  try {
    const inv = S.getInvoice(req.params.id);
    if (!inv) return res.status(404).send('Not found');
    const { url } = await S.invoiceCheckoutLink(inv.id);
    audit(A(req), 'card_link_created', 'invoice', inv.id, url);
    if (req.body.send === '1' && inv.contact.phone) {
      await sendSms(inv.contact.phone, `Hi ${inv.contact.first_name || 'there'}, here is a secure card payment link for invoice ${inv.number} (${money(inv.due_cents)} + ${getSetting('card_fee_percent')}% card fee): ${url}`, { contactId: inv.contact.id });
      req.flash('ok', 'Card link texted to the client.');
    } else req.flash('ok', `Card link: ${url}`);
    res.redirect(`/admin/invoices/${inv.id}`);
  } catch (e) { next(e); }
});
router.post('/invoices/:id/archive', (req, res) => {
  getDb().prepare('UPDATE invoices SET archived = 1, updated_at = ? WHERE id = ?').run(nowIso(), req.params.id);
  audit(A(req), 'invoice_archived', 'invoice', Number(req.params.id));
  res.redirect('/admin/invoices');
});

// ---- conversations ----
router.get('/conversations', (req, res) => {
  const db = getDb();
  const threads = db.prepare(`SELECT c.id, c.first_name, c.last_name, c.phone, c.sms_opt_in,
      (SELECT body FROM messages m WHERE m.contact_id = c.id AND m.channel = 'sms' ORDER BY m.id DESC LIMIT 1) AS last_body,
      (SELECT created_at FROM messages m WHERE m.contact_id = c.id AND m.channel = 'sms' ORDER BY m.id DESC LIMIT 1) AS last_at,
      (SELECT COUNT(*) FROM messages m WHERE m.contact_id = c.id AND m.direction = 'in' AND m.read_at IS NULL) AS unread
    FROM contacts c WHERE c.archived = 0 AND EXISTS (SELECT 1 FROM messages m WHERE m.contact_id = c.id) ORDER BY last_at DESC`).all();
  res.page('admin', 'admin/conversations', { title: 'Conversations', threads, current: null, msgs: [], templates: [] });
});
router.get('/conversations/:contactId', (req, res) => {
  const db = getDb();
  const current = S.getContact(req.params.contactId);
  if (!current) return res.status(404).send('Not found');
  const threads = db.prepare(`SELECT c.id, c.first_name, c.last_name, c.phone, c.sms_opt_in,
      (SELECT body FROM messages m WHERE m.contact_id = c.id ORDER BY m.id DESC LIMIT 1) AS last_body,
      (SELECT created_at FROM messages m WHERE m.contact_id = c.id ORDER BY m.id DESC LIMIT 1) AS last_at,
      (SELECT COUNT(*) FROM messages m WHERE m.contact_id = c.id AND m.direction = 'in' AND m.read_at IS NULL) AS unread
    FROM contacts c WHERE c.archived = 0 AND (EXISTS (SELECT 1 FROM messages m WHERE m.contact_id = c.id) OR c.id = ?) ORDER BY last_at DESC`).all(current.id);
  const msgs = db.prepare('SELECT * FROM messages WHERE contact_id = ? ORDER BY id').all(current.id);
  db.prepare("UPDATE messages SET read_at = ? WHERE contact_id = ? AND direction = 'in' AND read_at IS NULL").run(nowIso(), current.id);
  const templates = db.prepare('SELECT * FROM templates WHERE archived = 0 ORDER BY name').all();
  const latestQuote = db.prepare("SELECT id FROM quotes WHERE contact_id = ? AND archived = 0 ORDER BY id DESC LIMIT 1").get(current.id);
  const latestInvoice = db.prepare("SELECT id, number FROM invoices WHERE contact_id = ? AND archived = 0 ORDER BY id DESC LIMIT 1").get(current.id);
  const merge = S.contactMergeContext(current, { quote_link: latestQuote ? `${config.baseUrl}/portal/quotes/${latestQuote.id}` : `${config.baseUrl}/portal`, invoice_link: latestInvoice ? `${config.baseUrl}/portal/invoices/${latestInvoice.id}` : `${config.baseUrl}/portal`, invoice_number: latestInvoice?.number || '' });
  const agents = listAgents().filter((a) => a.enabled && a.autopilot !== 'off' || a.name === 'sms_reply_drafter').sort((a, b) => (a.name === 'sms_reply_drafter' ? -1 : b.name === 'sms_reply_drafter' ? 1 : 0));
  res.page('admin', 'admin/conversations', { title: `Chat with ${current.first_name}`, threads, current, msgs: msgs.filter((m) => m.status !== 'draft_discarded'), templates, merge, agents });
});
router.post('/conversations/:contactId/drafts/:id/send', async (req, res, next) => {
  try {
    const db = getDb();
    const m = db.prepare("SELECT * FROM messages WHERE id = ? AND contact_id = ? AND status = 'draft'").get(req.params.id, req.params.contactId);
    if (!m) { req.flash('error', 'Draft not found (already sent or discarded).'); return res.redirect(`/admin/conversations/${req.params.contactId}`); }
    const c = S.getContact(m.contact_id);
    const text = String(req.body.body || m.body).trim();
    const r = await sendSms(c.phone, text, { contactId: c.id, bypassOptIn: req.body.force === '1' });
    db.prepare("UPDATE messages SET status = ?, read_at = ? WHERE id = ?").run(r.ok ? 'draft_sent' : 'draft', nowIso(), m.id);
    audit(A(req), r.ok ? 'ai_draft_approved' : 'ai_draft_send_failed', 'contact', c.id, { message_id: m.id, error: r.error });
    if (!r.ok) req.flash('error', 'Not sent: ' + r.error); else req.flash('ok', 'Draft sent.');
    res.redirect(`/admin/conversations/${c.id}`);
  } catch (e) { next(e); }
});
router.post('/conversations/:contactId/drafts/:id/discard', (req, res) => {
  getDb().prepare("UPDATE messages SET status = 'draft_discarded', read_at = ? WHERE id = ? AND contact_id = ? AND status = 'draft'").run(nowIso(), req.params.id, req.params.contactId);
  audit(A(req), 'ai_draft_discarded', 'contact', Number(req.params.contactId), { message_id: Number(req.params.id) });
  res.redirect(`/admin/conversations/${req.params.contactId}`);
});
router.post('/conversations/:contactId/ai-draft', async (req, res, next) => {
  try {
    const c = S.getContact(req.params.contactId);
    if (!c) return res.status(404).send('Not found');
    const last = getDb().prepare("SELECT body FROM messages WHERE contact_id = ? AND direction = 'in' ORDER BY id DESC LIMIT 1").get(c.id);
    const agent = getAgent(req.body.agent || 'sms_reply_drafter');
    if (!agent) { req.flash('error', 'Agent not found.'); return res.redirect(`/admin/conversations/${c.id}`); }
    const r = await runAgent({ ...agent, autopilot: 'draft', enabled: 1 }, { contactId: c.id, input: { text: last?.body || String(req.body.text || '') }, actor: A(req) });
    req.flash(r.ok ? 'ok' : 'error', r.ok ? `AI draft ready${r.mock ? ' (mock - add an API key for real replies)' : ''} - review it below and press Send.` : 'AI failed: ' + r.error);
    res.redirect(`/admin/conversations/${c.id}`);
  } catch (e) { next(e); }
});

router.post('/conversations/:contactId', async (req, res, next) => {
  try {
    const c = S.getContact(req.params.contactId);
    if (!c) return res.status(404).send('Not found');
    const body = String(req.body.body || '').trim();
    if (!body) return res.redirect(`/admin/conversations/${c.id}`);
    const channel = req.body.channel === 'email' ? 'email' : 'sms';
    const db = getDb();
    const latestQuote = db.prepare("SELECT id FROM quotes WHERE contact_id = ? AND archived = 0 ORDER BY id DESC LIMIT 1").get(c.id);
    const latestInvoice = db.prepare("SELECT id, number FROM invoices WHERE contact_id = ? AND archived = 0 ORDER BY id DESC LIMIT 1").get(c.id);
    const text = mergeFields(body, S.contactMergeContext(c, { quote_link: latestQuote ? `${config.baseUrl}/portal/quotes/${latestQuote.id}` : `${config.baseUrl}/portal`, invoice_link: latestInvoice ? `${config.baseUrl}/portal/invoices/${latestInvoice.id}` : `${config.baseUrl}/portal`, invoice_number: latestInvoice?.number || '' }));
    const r = channel === 'sms' ? await sendSms(c.phone, text, { contactId: c.id, bypassOptIn: req.body.force === '1' }) : await sendEmail(c.email, String(req.body.subject || `Message from ${getSetting('business_name')}`), text, { contactId: c.id });
    audit(A(req), 'message_sent', 'contact', c.id, { channel, ok: r.ok });
    if (!r.ok) req.flash('error', 'Not sent: ' + r.error);
    res.redirect(`/admin/conversations/${c.id}`);
  } catch (e) { next(e); }
});

// ---- campaigns ----
router.get('/campaigns', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM campaigns WHERE archived = 0 ORDER BY id DESC').all();
  for (const r of rows) r.recipients = db.prepare('SELECT COUNT(*) AS n FROM campaign_recipients WHERE campaign_id = ?').get(r.id).n;
  const tags = new Set();
  for (const c of db.prepare('SELECT tags FROM contacts WHERE archived = 0').all()) parseJson(c.tags, []).forEach((t) => tags.add(t));
  res.page('admin', 'admin/campaigns', { title: 'Campaigns', rows, tags: [...tags].sort(), stages: S.PIPELINE_STAGES, templates: db.prepare("SELECT * FROM templates WHERE archived = 0 ORDER BY name").all() });
});
router.post('/campaigns', (req, res) => {
  const db = getDb();
  const audience = { tags: [].concat(req.body.tags || []).filter(Boolean), stage: req.body.stage || '', opted_in_only: true };
  const ts = nowIso();
  const r = db.prepare('INSERT INTO campaigns (name, channel, subject, body, audience, throttle_per_minute, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(String(req.body.name || 'Untitled campaign'), req.body.channel === 'email' ? 'email' : 'sms', String(req.body.subject || ''), String(req.body.body || ''), JSON.stringify(audience), Math.max(1, Math.min(60, Number(req.body.throttle) || 10)), 'Draft', ts, ts);
  audit(A(req), 'campaign_created', 'campaign', r.lastInsertRowid);
  res.redirect(`/admin/campaigns/${r.lastInsertRowid}`);
});
router.get('/campaigns/:id', (req, res) => {
  const db = getDb();
  const c = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(req.params.id);
  if (!c) return res.status(404).send('Not found');
  c.audience = parseJson(c.audience, {});
  const preview = audienceContacts(c.audience, c.channel);
  const recipients = db.prepare('SELECT r.*, ct.first_name, ct.last_name, ct.phone, ct.email FROM campaign_recipients r JOIN contacts ct ON ct.id = r.contact_id WHERE r.campaign_id = ? ORDER BY r.id').all(c.id);
  const sampleText = mergeFields(c.body, S.contactMergeContext(preview[0] || { first_name: 'Sam' }));
  res.page('admin', 'admin/campaign', { title: c.name, c, preview, recipients, sampleText });
});
router.post('/campaigns/:id/send', (req, res, next) => {
  try {
    const when = req.body.when === 'later' && req.body.scheduled_at ? parseLocalEt(req.body.scheduled_at) : null;
    const n = scheduleCampaign(Number(req.params.id), when, A(req));
    req.flash('ok', when ? `Scheduled for ${n} contacts.` : `Sending to ${n} contacts (throttled; runs every minute, 8am-8pm ET only).`);
    if (!when) processCampaigns().catch(() => {});
    res.redirect(`/admin/campaigns/${req.params.id}`);
  } catch (e) { next(e); }
});
router.post('/campaigns/:id/archive', (req, res) => {
  getDb().prepare("UPDATE campaigns SET archived = 1, status = CASE WHEN status IN ('Scheduled', 'Sending') THEN 'Stopped' ELSE status END, updated_at = ? WHERE id = ?").run(nowIso(), req.params.id);
  audit(A(req), 'campaign_archived', 'campaign', Number(req.params.id));
  res.redirect('/admin/campaigns');
});

// ---- automations ----
router.get('/automations', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM automations WHERE archived = 0 ORDER BY id').all().map((a) => ({ ...a, steps: parseJson(a.steps, []) }));
  const queue = db.prepare("SELECT * FROM jobs_queue WHERE status IN ('pending', 'running') ORDER BY run_at LIMIT 50").all().map((j) => ({ ...j, payload: parseJson(j.payload, {}) }));
  const recent = db.prepare("SELECT * FROM jobs_queue WHERE status IN ('done', 'failed') ORDER BY id DESC LIMIT 20").all().map((j) => ({ ...j, payload: parseJson(j.payload, {}) }));
  res.page('admin', 'admin/automations', { title: 'Automations', rows, queue, recent, TRIGGERS, ACTION_TYPES });
});
router.get('/automations/new', (req, res) => res.page('admin', 'admin/automation-form', { title: 'New automation', a: { name: '', trigger: 'new_lead', trigger_keyword: '', enabled: 1, steps: [] }, TRIGGERS, ACTION_TYPES, stages: S.PIPELINE_STAGES }));
router.get('/automations/:id/edit', (req, res) => {
  const a = getDb().prepare('SELECT * FROM automations WHERE id = ?').get(req.params.id);
  if (!a) return res.status(404).send('Not found');
  res.page('admin', 'admin/automation-form', { title: 'Edit automation', a: { ...a, steps: parseJson(a.steps, []) }, TRIGGERS, ACTION_TYPES, stages: S.PIPELINE_STAGES });
});
function stepsFromForm(body) {
  const types = [].concat(body.step_type || []);
  const vals = [].concat(body.step_value || []);
  const subj = [].concat(body.step_subject || []);
  const units = [].concat(body.step_unit || []);
  return types.map((t, i) => {
    const v = String(vals[i] ?? '').trim();
    switch (t) {
      case 'wait': return units[i] === 'days' ? { type: 'wait', days: Number(v) || 1 } : { type: 'wait', hours: Number(v) || 1 };
      case 'send_sms': return { type: 'send_sms', body: v, footer: true };
      case 'send_email': return { type: 'send_email', subject: String(subj[i] || ''), body: v };
      case 'add_tag': return { type: 'add_tag', tag: v };
      case 'move_stage': return { type: 'move_stage', stage: v };
      case 'notify_owner': return { type: 'notify_owner', body: v };
      case 'stop_if': return { type: 'stop_if', condition: v };
      case 'webhook': return { type: 'webhook', url: v, secret: String(subj[i] || '') };
      case 'ai_agent': return { type: 'ai_agent', agent: v };
      default: return null;
    }
  }).filter(Boolean);
}
router.post('/automations', (req, res) => {
  const ts = nowIso();
  const r = getDb().prepare('INSERT INTO automations (name, trigger, trigger_keyword, steps, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(String(req.body.name || 'Untitled'), TRIGGERS.includes(req.body.trigger) ? req.body.trigger : 'new_lead', String(req.body.trigger_keyword || ''), JSON.stringify(stepsFromForm(req.body)), req.body.enabled ? 1 : 0, ts, ts);
  audit(A(req), 'automation_created', 'automation', r.lastInsertRowid);
  res.redirect('/admin/automations');
});
router.post('/automations/:id', (req, res) => {
  getDb().prepare('UPDATE automations SET name = ?, trigger = ?, trigger_keyword = ?, steps = ?, enabled = ?, updated_at = ? WHERE id = ?')
    .run(String(req.body.name || 'Untitled'), TRIGGERS.includes(req.body.trigger) ? req.body.trigger : 'new_lead', String(req.body.trigger_keyword || ''), JSON.stringify(stepsFromForm(req.body)), req.body.enabled ? 1 : 0, nowIso(), req.params.id);
  audit(A(req), 'automation_updated', 'automation', Number(req.params.id));
  res.redirect('/admin/automations');
});
router.post('/automations/:id/toggle', (req, res) => {
  getDb().prepare('UPDATE automations SET enabled = CASE enabled WHEN 1 THEN 0 ELSE 1 END, updated_at = ? WHERE id = ?').run(nowIso(), req.params.id);
  audit(A(req), 'automation_toggled', 'automation', Number(req.params.id));
  res.redirect('/admin/automations');
});
router.post('/automations/:id/archive', (req, res) => {
  getDb().prepare('UPDATE automations SET archived = 1, enabled = 0, updated_at = ? WHERE id = ?').run(nowIso(), req.params.id);
  audit(A(req), 'automation_archived', 'automation', Number(req.params.id));
  res.redirect('/admin/automations');
});
router.post('/automations/:id/test', async (req, res, next) => {
  try {
    const contactId = Number(req.body.contact_id) || getDb().prepare('SELECT id FROM contacts WHERE archived = 0 ORDER BY id LIMIT 1').get()?.id;
    const result = await runSteps(Number(req.params.id), 0, { contactId });
    audit(A(req), 'automation_tested', 'automation', Number(req.params.id), result);
    req.flash('ok', `Test run: ${result}. Check the Outbox.`);
    res.redirect('/admin/automations');
  } catch (e) { next(e); }
});
router.post('/automations/run-queue', async (req, res, next) => {
  try {
    // Run due steps now (also lets you fast-forward a queued step).
    if (req.body.job_id) getDb().prepare("UPDATE jobs_queue SET run_at = ? WHERE id = ? AND status = 'pending'").run(nowIso(), req.body.job_id);
    await tick();
    req.flash('ok', 'Scheduler ran.');
    res.redirect('/admin/automations');
  } catch (e) { next(e); }
});

// ---- templates (also on settings page) ----
router.post('/templates', (req, res) => {
  const db = getDb();
  if (req.body.id) db.prepare('UPDATE templates SET name = ?, channel = ?, subject = ?, body = ? WHERE id = ?').run(String(req.body.name || ''), req.body.channel === 'email' ? 'email' : 'sms', String(req.body.subject || ''), String(req.body.body || ''), req.body.id);
  else db.prepare('INSERT INTO templates (name, channel, subject, body, created_at) VALUES (?, ?, ?, ?, ?)').run(String(req.body.name || 'Template'), req.body.channel === 'email' ? 'email' : 'sms', String(req.body.subject || ''), String(req.body.body || ''), nowIso());
  audit(A(req), 'template_saved', 'template', Number(req.body.id) || null);
  res.redirect('/admin/settings#templates');
});
router.post('/templates/:id/archive', (req, res) => {
  getDb().prepare('UPDATE templates SET archived = 1 WHERE id = ?').run(req.params.id);
  audit(A(req), 'template_archived', 'template', Number(req.params.id));
  res.redirect('/admin/settings#templates');
});

// ---- settings ----
const SETTING_KEYS = ['business_name', 'business_legal_name', 'business_phone', 'business_email', 'business_website', 'service_area', 'tax_rate', 'card_fee_percent', 'quote_valid_days', 'invoice_terms', 'checks_payable_to',
  'zelle_handle', 'venmo_handle', 'cashapp_handle', 'plan_basic_price', 'plan_pro_price', 'plan_business_price', 'plan_basic_desc', 'plan_pro_desc', 'plan_business_desc', 'twilio_number',
  'a2p_brand_registered', 'a2p_campaign_approved', 'a2p_number_linked', 'quiet_hours_start', 'quiet_hours_end', 'sms_footer', 'review_link', 'owner_phone'];
router.get('/settings', (req, res) => {
  const templates = getDb().prepare('SELECT * FROM templates WHERE archived = 0 ORDER BY name').all();
  res.page('admin', 'admin/settings', { title: 'Settings', s: getSettings(), templates, config, keys: SETTING_KEYS });
});
router.post('/settings', (req, res) => {
  for (const k of SETTING_KEYS) {
    if (k.startsWith('a2p_')) setSetting(k, req.body[k] ? '1' : '0');
    else if (k in req.body) setSetting(k, String(req.body[k]).trim());
  }
  if (req.body.owner_phone) setSetting('owner_phone', normalizePhone(req.body.owner_phone));
  audit(A(req), 'settings_updated', 'settings');
  req.flash('ok', 'Settings saved.');
  res.redirect('/admin/settings');
});

// ---- blog ----
router.get('/blog', (req, res) => {
  const { posts, archived } = Blog.listPosts();
  res.page('admin', 'admin/blog', { title: 'Blog', posts, archived, buildResult: req.session.buildResult || null });
  delete req.session.buildResult;
});
router.get('/blog/new', (req, res) => {
  const post = { title: '', description: '', slug: '', date: nowIso().slice(0, 10), tags: [], focusKeyword: '', body: '' };
  res.page('admin', 'admin/blog-form', { title: 'New post', post, isNew: true, errors: [], seo: Blog.seoCheck(post) });
});
router.get('/blog/:slug/edit', (req, res) => {
  const post = Blog.getPost(req.params.slug);
  if (!post) return res.status(404).send('Not found');
  res.page('admin', 'admin/blog-form', { title: 'Edit post', post, isNew: false, errors: [], seo: Blog.seoCheck(post) });
});
async function handleBlogSave(req, res, next, existingSlug) {
  try {
    const { errors, post } = Blog.validatePost(req.body, { existingSlug });
    if (errors.length) return res.status(400).page('admin', 'admin/blog-form', { title: existingSlug ? 'Edit post' : 'New post', post: { ...post, slug: existingSlug || post.slug }, isNew: !existingSlug, errors, seo: Blog.seoCheck(post) });
    Blog.savePost(post, { existingSlug, actor: A(req) });
    const build = await Blog.runBuild();
    emitEvent('blog_published', { post: { title: post.title, slug: post.slug, description: post.description, tags: post.tags, url: `${config.baseUrl}/blog/${post.slug}.html`, updated: !!existingSlug } });
    req.session.buildResult = build;
    req.flash(build.ok ? 'ok' : 'error', build.ok ? `Post "${post.title}" saved and the site was rebuilt.` : `Post saved but the build failed: ${build.output.slice(0, 300)}`);
    res.redirect('/admin/blog');
  } catch (e) { next(e); }
}
router.post('/blog', (req, res, next) => handleBlogSave(req, res, next, null));
router.post('/blog/:slug', (req, res, next) => handleBlogSave(req, res, next, Blog.slugify(req.params.slug)));
router.post('/blog/:slug/archive', async (req, res, next) => {
  try {
    const ok = Blog.archivePost(req.params.slug, A(req));
    if (ok) { const build = await Blog.runBuild(); req.session.buildResult = build; req.flash('ok', 'Post archived (moved to content/blog/_archive) and site rebuilt.'); }
    res.redirect('/admin/blog');
  } catch (e) { next(e); }
});
router.post('/blog/:slug/restore', async (req, res, next) => {
  try {
    const ok = Blog.restorePost(req.params.slug, A(req));
    if (ok) { const build = await Blog.runBuild(); req.session.buildResult = build; req.flash('ok', 'Post restored and site rebuilt.'); }
    res.redirect('/admin/blog');
  } catch (e) { next(e); }
});
router.post('/blog-rebuild', async (req, res, next) => {
  try { req.session.buildResult = await Blog.runBuild(); audit(A(req), 'blog_rebuild', 'blog'); res.redirect('/admin/blog'); } catch (e) { next(e); }
});

// ---- integrations: API keys, outbound webhooks, AI agents, Zapier recipes ----
router.get('/integrations', (req, res) => {
  const db = getDb();
  const hooks = db.prepare('SELECT * FROM webhooks WHERE archived = 0 ORDER BY id').all().map((w) => ({ ...w, events: parseJson(w.events, []), deliveries: db.prepare('SELECT * FROM webhook_deliveries WHERE webhook_id = ? ORDER BY id DESC LIMIT 10').all(w.id) }));
  const agents = listAgents().map((a) => ({ ...a, resolved: resolveProvider(a), runs: db.prepare('SELECT * FROM ai_runs WHERE agent_id = ? ORDER BY id DESC LIMIT 5').all(a.id).map((r) => ({ ...r, tool_calls: parseJson(r.tool_calls, []) })) }));
  const recentEvents = listEvents({ limit: 15 });
  const testResult = req.session.aiTestResult || null; delete req.session.aiTestResult;
  const newKey = req.session.newApiKey || null; delete req.session.newApiKey;
  const tools = TOOL_NAMES.map((n) => ({ name: n, description: TOOLS[n].description }));
  res.page('admin', 'admin/integrations', { title: 'Integrations', keys: listApiKeys(), hooks, agents, recentEvents, testResult, newKey, EVENT_NAMES, AI_PROVIDERS, AUTOPILOT_MODES, tools, ai: aiStatus(), config, envToken: !!config.apiToken, tab: String(req.query.tab || '') });
});
router.post('/integrations/keys', (req, res) => {
  const { id, key } = createApiKey(req.body.name || 'Zapier', A(req));
  req.session.newApiKey = { id, key, name: req.body.name || 'Zapier' };
  req.session.save(() => res.redirect('/admin/integrations#keys'));
});
router.post('/integrations/keys/:id/revoke', (req, res) => { revokeApiKey(Number(req.params.id), A(req)); req.flash('ok', 'Key revoked.'); res.redirect('/admin/integrations#keys'); });

function hookFromForm(body) {
  const events = [].concat(body.events || []).filter((e) => e === '*' || EVENT_NAMES.includes(e));
  return { name: String(body.name || 'Zapier hook').trim().slice(0, 120), url: String(body.url || '').trim(), events: JSON.stringify(events.length ? events : ['*']), secret: String(body.secret || '').trim(), enabled: body.enabled ? 1 : 0 };
}
router.post('/integrations/webhooks', (req, res) => {
  const h = hookFromForm(req.body);
  if (!/^https?:\/\//i.test(h.url)) { req.flash('error', 'Webhook URL must start with http:// or https://'); return res.redirect('/admin/integrations#webhooks'); }
  const r = getDb().prepare('INSERT INTO webhooks (name, url, events, secret, enabled, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(h.name, h.url, h.events, h.secret, h.enabled, nowIso());
  audit(A(req), 'webhook_created', 'webhook', Number(r.lastInsertRowid), { url: h.url });
  req.flash('ok', 'Webhook added. Press "Send test" to fire a sample new_lead payload at it.');
  res.redirect('/admin/integrations#webhooks');
});
router.post('/integrations/webhooks/:id', (req, res) => {
  const h = hookFromForm(req.body);
  if (!/^https?:\/\//i.test(h.url)) { req.flash('error', 'Webhook URL must start with http:// or https://'); return res.redirect('/admin/integrations#webhooks'); }
  getDb().prepare('UPDATE webhooks SET name = ?, url = ?, events = ?, secret = ?, enabled = ? WHERE id = ?').run(h.name, h.url, h.events, h.secret, h.enabled, req.params.id);
  audit(A(req), 'webhook_updated', 'webhook', Number(req.params.id));
  req.flash('ok', 'Webhook saved.');
  res.redirect('/admin/integrations#webhooks');
});
router.post('/integrations/webhooks/:id/toggle', (req, res) => {
  getDb().prepare('UPDATE webhooks SET enabled = CASE enabled WHEN 1 THEN 0 ELSE 1 END WHERE id = ?').run(req.params.id);
  audit(A(req), 'webhook_toggled', 'webhook', Number(req.params.id));
  res.redirect('/admin/integrations#webhooks');
});
router.post('/integrations/webhooks/:id/archive', (req, res) => {
  getDb().prepare('UPDATE webhooks SET archived = 1, enabled = 0 WHERE id = ?').run(req.params.id);
  audit(A(req), 'webhook_archived', 'webhook', Number(req.params.id));
  req.flash('ok', 'Webhook archived.');
  res.redirect('/admin/integrations#webhooks');
});
router.post('/integrations/webhooks/:id/test', async (req, res, next) => {
  try {
    const r = await testWebhook(Number(req.params.id), EVENT_NAMES.includes(req.body.event) ? req.body.event : 'new_lead');
    audit(A(req), 'webhook_tested', 'webhook', Number(req.params.id), r);
    req.flash(r.ok ? 'ok' : 'error', r.ok ? `Test delivered (HTTP ${r.status}, ${r.ms} ms). Check the delivery log and your Zap.` : `Test failed: ${r.error || 'HTTP ' + r.status}. See the delivery log.`);
    res.redirect('/admin/integrations#webhooks');
  } catch (e) { next(e); }
});

function agentFromForm(body) {
  return { name: body.name, description: body.description, provider: body.provider, model: body.model, custom_url: body.custom_url, system_prompt: body.system_prompt, tools: [].concat(body.tools || []), temperature: body.temperature, autopilot: body.autopilot, enabled: !!body.enabled };
}
router.post('/integrations/agents', (req, res, next) => {
  try { const id = saveAgent(null, agentFromForm(req.body), A(req)); req.flash('ok', 'Agent created.'); res.redirect(`/admin/integrations#agent-${id}`); } catch (e) { next(e); }
});
router.post('/integrations/agents/:id', (req, res, next) => {
  try { saveAgent(Number(req.params.id), agentFromForm(req.body), A(req)); req.flash('ok', 'Agent saved.'); res.redirect(`/admin/integrations#agent-${req.params.id}`); } catch (e) { next(e); }
});
router.post('/integrations/agents/:id/archive', (req, res) => {
  getDb().prepare('UPDATE ai_agents SET archived = 1, enabled = 0, updated_at = ? WHERE id = ?').run(nowIso(), req.params.id);
  audit(A(req), 'ai_agent_archived', 'ai_agent', Number(req.params.id));
  req.flash('ok', 'Agent archived.');
  res.redirect('/admin/integrations#agents');
});
router.post('/integrations/agents/:id/test', async (req, res, next) => {
  try {
    const agent = getAgent(Number(req.params.id));
    if (!agent) return res.status(404).send('Not found');
    let input = {};
    const raw = String(req.body.input || '').trim();
    if (raw) { try { input = raw.startsWith('{') ? JSON.parse(raw) : { text: raw }; } catch { input = { text: raw }; } }
    const contactId = Number(req.body.contact_id) || null;
    const r = await runAgent({ ...agent, enabled: 1 }, { input, contactId, actor: A(req), dryAutopilot: req.body.apply !== '1' });
    req.session.aiTestResult = { agentId: agent.id, agent: agent.name, input, ...r };
    req.session.save(() => res.redirect(`/admin/integrations#agent-${agent.id}`));
  } catch (e) { next(e); }
});

// ---- outbox + audit ----
router.get('/outbox', (req, res) => {
  const db = getDb();
  const channel = req.query.channel || '';
  const rows = (channel ? db.prepare('SELECT * FROM outbox WHERE channel = ? ORDER BY id DESC LIMIT 200').all(channel) : db.prepare('SELECT * FROM outbox ORDER BY id DESC LIMIT 200').all())
    .map((r) => ({ ...r, meta: parseJson(r.meta, {}) }));
  res.page('admin', 'admin/outbox', { title: 'Outbox', rows, channel });
});
router.get('/audit', (req, res) => {
  const rows = getDb().prepare('SELECT * FROM audit_log ORDER BY id DESC LIMIT 300').all();
  res.page('admin', 'admin/audit', { title: 'Audit log', rows });
});

export default router;
