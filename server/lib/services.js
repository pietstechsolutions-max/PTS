// Business logic shared by admin, portal and webhooks: contacts, leads, quotes, jobs, invoices, payments, subscriptions.
import { getDb, getSetting, nextNumber } from '../db.js';
import { config } from '../config.js';
import { nowIso, addDays, normalizePhone, normalizeEmail, calcTotals, toCents, audit, changeLog, parseJson, splitName, money, fullName } from './util.js';
import { sendSms, sendEmail, createInvoiceCheckout } from './providers.js';
import { fireTrigger } from './automations.js';
import { emitEvent } from './events.js';

export const PIPELINE_STAGES = ['New', 'Contacted', 'Estimate Sent', 'Won', 'Lost'];
export const QUOTE_STATUSES = ['Draft', 'Sent', 'Changes Requested', 'Approved', 'Declined', 'Expired'];
export const JOB_STATUSES = ['Scheduled', 'In progress', 'Complete'];
export const INVOICE_STATUSES = ['Draft', 'Sent', 'Partial', 'Paid', 'Overdue'];
export const PAYMENT_METHODS = ['Zelle', 'Venmo', 'Cash App', 'Cash', 'Check', 'Card'];
export const PLANS = ['Basic', 'Pro', 'Business'];

// ---------------- contacts ----------------
export function findContactByPhoneOrEmail(phone, email) {
  const db = getDb();
  const p = normalizePhone(phone);
  const e = normalizeEmail(email);
  if (p) {
    const r = db.prepare('SELECT * FROM contacts WHERE phone = ? AND archived = 0 ORDER BY id LIMIT 1').get(p);
    if (r) return r;
  }
  if (e) {
    const r = db.prepare('SELECT * FROM contacts WHERE email = ? AND archived = 0 ORDER BY id LIMIT 1').get(e);
    if (r) return r;
  }
  return null;
}

export function upsertContact({ name, first_name, last_name, phone, email, town, source, company, tags }) {
  const db = getDb();
  const p = normalizePhone(phone);
  const e = normalizeEmail(email);
  const names = name ? splitName(name) : { first_name: first_name || '', last_name: last_name || '' };
  const existing = findContactByPhoneOrEmail(p, e);
  const ts = nowIso();
  if (existing) {
    db.prepare(`UPDATE contacts SET
      first_name = CASE WHEN first_name = '' THEN ? ELSE first_name END,
      last_name = CASE WHEN last_name = '' THEN ? ELSE last_name END,
      phone = CASE WHEN phone = '' THEN ? ELSE phone END,
      email = CASE WHEN email = '' THEN ? ELSE email END,
      town = CASE WHEN town = '' THEN ? ELSE town END,
      company = CASE WHEN company = '' THEN ? ELSE company END,
      updated_at = ? WHERE id = ?`)
      .run(names.first_name, names.last_name, p, e, town || '', company || '', ts, existing.id);
    return { contact: db.prepare('SELECT * FROM contacts WHERE id = ?').get(existing.id), created: false };
  }
  const r = db.prepare(`INSERT INTO contacts (first_name, last_name, company, phone, email, town, tags, source, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(names.first_name, names.last_name, company || '', p, e, town || '', JSON.stringify(tags || []), source || '', ts, ts);
  emitEvent('contact_created', { contactId: Number(r.lastInsertRowid) });
  return { contact: db.prepare('SELECT * FROM contacts WHERE id = ?').get(r.lastInsertRowid), created: true };
}

/** Update contact fields (only keys present in `fields` change). Emits contact_updated. */
export function updateContact(id, fields, actor = 'owner') {
  const db = getDb();
  const c = getContact(id);
  if (!c) throw new Error('Contact not found');
  const cols = { first_name: 'string', last_name: 'string', company: 'string', phone: 'phone', email: 'email', town: 'string', source: 'string', tags: 'json', sms_opt_in: 'bool', email_opt_in: 'bool' };
  const sets = []; const args = [];
  for (const [k, kind] of Object.entries(cols)) {
    if (fields[k] === undefined) continue;
    let v = fields[k];
    if (kind === 'phone') v = normalizePhone(v);
    else if (kind === 'email') v = normalizeEmail(v);
    else if (kind === 'json') v = JSON.stringify(Array.isArray(v) ? v : String(v).split(',').map((t) => t.trim()).filter(Boolean));
    else if (kind === 'bool') v = v ? 1 : 0;
    else v = String(v ?? '').trim();
    sets.push(`${k} = ?`); args.push(v);
  }
  if (fields.sms_opt_in !== undefined) { sets.push('sms_opt_out_at = ?'); args.push(fields.sms_opt_in ? null : (c.sms_opt_out_at || nowIso())); }
  if (!sets.length) return c;
  sets.push('updated_at = ?'); args.push(nowIso(), id);
  db.prepare(`UPDATE contacts SET ${sets.join(', ')} WHERE id = ?`).run(...args);
  audit(actor, 'contact_updated', 'contact', id);
  emitEvent('contact_updated', { contactId: id });
  return getContact(id);
}

export function getContact(id) {
  return getDb().prepare('SELECT * FROM contacts WHERE id = ?').get(id);
}

export function addTag(contactId, tag) {
  const db = getDb();
  const c = getContact(contactId);
  if (!c) return;
  const tags = parseJson(c.tags, []);
  if (!tags.includes(tag)) tags.push(tag);
  db.prepare('UPDATE contacts SET tags = ?, updated_at = ? WHERE id = ?').run(JSON.stringify(tags), nowIso(), contactId);
}

export function setSmsOptIn(contactId, optIn, reason = '') {
  getDb().prepare('UPDATE contacts SET sms_opt_in = ?, sms_opt_out_at = ?, updated_at = ? WHERE id = ?')
    .run(optIn ? 1 : 0, optIn ? null : nowIso(), nowIso(), contactId);
  audit('system', optIn ? 'sms_opt_in' : 'sms_opt_out', 'contact', contactId, reason);
}

export function contactBalanceCents(contactId) {
  const r = getDb().prepare(`SELECT COALESCE(SUM(total_cents - paid_cents), 0) AS due FROM invoices
    WHERE contact_id = ? AND archived = 0 AND status IN ('Sent', 'Partial', 'Overdue')`).get(contactId);
  return r.due;
}

export function contactMergeContext(contact, extra = {}) {
  return {
    first_name: contact?.first_name || 'there',
    last_name: contact?.last_name || '',
    name: fullName(contact),
    town: contact?.town || '',
    business_name: getSetting('business_name'),
    business_phone: getSetting('business_phone'),
    portal_link: `${config.baseUrl}/portal`,
    review_link: getSetting('review_link'),
    ...extra
  };
}

// ---------------- leads ----------------
export async function createLead({ name, phone, email, town, service, message, source, value }) {
  const db = getDb();
  const { contact, created } = upsertContact({ name, phone, email, town, source });
  const ts = nowIso();
  const r = db.prepare(`INSERT INTO leads (contact_id, stage, service, message, source, value_cents, created_at, updated_at)
    VALUES (?, 'New', ?, ?, ?, ?, ?, ?)`)
    .run(contact.id, service || '', message || '', source || '', toCents(value), ts, ts);
  const leadId = r.lastInsertRowid;
  changeLog('lead', leadId, 'client', `Quote request received${service ? ' for ' + service : ''}.`);
  audit('system', 'lead_created', 'lead', leadId, { contact_id: contact.id, created_contact: created, source });
  await fireTrigger('new_lead', { contactId: contact.id, leadId });
  return { lead: db.prepare('SELECT * FROM leads WHERE id = ?').get(leadId), contact };
}

export function moveLead(leadId, stage, actor = 'owner') {
  if (!PIPELINE_STAGES.includes(stage)) throw new Error('Bad stage');
  const db = getDb();
  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(leadId);
  if (!lead) return;
  db.prepare('UPDATE leads SET stage = ?, status = ?, updated_at = ? WHERE id = ?')
    .run(stage, stage === 'Won' || stage === 'Lost' ? 'Closed' : 'Open', nowIso(), leadId);
  if (lead.stage !== stage) changeLog('lead', leadId, actor, `Status changed from "${lead.stage}" to "${stage}".`);
  audit(actor, 'lead_stage', 'lead', leadId, { from: lead.stage, to: stage });
  if (lead.stage !== stage) emitEvent('lead_stage_changed', { contactId: lead.contact_id, leadId, from: lead.stage, to: stage });
}

// ---------------- quotes ----------------
export function getQuote(id) {
  const db = getDb();
  const q = db.prepare('SELECT * FROM quotes WHERE id = ?').get(id);
  if (!q) return null;
  q.items = db.prepare('SELECT * FROM quote_items WHERE quote_id = ? ORDER BY section, sort, id').all(id);
  q.contact = getContact(q.contact_id);
  return q;
}

function parseItems(items) {
  return (items || [])
    .map((it, i) => ({
      section: it.section === 'other' ? 'other' : 'main',
      description: String(it.description || '').trim(),
      qty: Number(it.qty) || 0,
      unit_cents: typeof it.unit_cents === 'number' ? it.unit_cents : toCents(it.unit_price),
      sort: i
    }))
    .filter((it) => it.description);
}

/**
 * Create or update a quote. Every save creates a revision entry.
 * data: { contact_id, lead_id, title, notes, items:[{section,description,qty,unit_price}], tax_rate, valid_until }
 */
export function saveQuote(id, data, actor = 'owner', summary = '') {
  const db = getDb();
  const ts = nowIso();
  const items = parseItems(data.items);
  const taxRate = data.tax_rate !== undefined && data.tax_rate !== '' ? Number(data.tax_rate) : Number(getSetting('tax_rate', '8.75'));
  const totals = calcTotals(items, taxRate);
  const validDays = Number(getSetting('quote_valid_days', '7')) || 7;
  const validUntil = data.valid_until || addDays(validDays).slice(0, 10);
  const tx = db.transaction(() => {
    let quoteId = id;
    let revision = 1;
    if (!quoteId) {
      const number = nextNumber('quote');
      const r = db.prepare(`INSERT INTO quotes (number, contact_id, lead_id, title, status, notes, valid_until, subtotal_cents, tax_rate, tax_cents, total_cents, revision, created_at, updated_at)
        VALUES (?, ?, ?, ?, 'Draft', ?, ?, ?, ?, ?, ?, 1, ?, ?)`)
        .run(number, data.contact_id, data.lead_id || null, data.title || '', data.notes || '', validUntil, totals.subtotal_cents, taxRate, totals.tax_cents, totals.total_cents, ts, ts);
      quoteId = r.lastInsertRowid;
      summary = summary || 'Estimate created.';
    } else {
      const prev = db.prepare('SELECT * FROM quotes WHERE id = ?').get(quoteId);
      revision = prev.revision + 1;
      db.prepare(`UPDATE quotes SET title = ?, notes = ?, valid_until = ?, subtotal_cents = ?, tax_rate = ?, tax_cents = ?, total_cents = ?, revision = ?, updated_at = ?,
        status = CASE WHEN status IN ('Changes Requested', 'Expired', 'Declined') THEN 'Draft' ELSE status END WHERE id = ?`)
        .run(data.title || '', data.notes || '', validUntil, totals.subtotal_cents, taxRate, totals.tax_cents, totals.total_cents, revision, ts, quoteId);
      db.prepare('DELETE FROM quote_items WHERE quote_id = ?').run(quoteId);
      if (!summary) {
        const diff = totals.total_cents - prev.total_cents;
        summary = `Estimate revised (rev ${revision}). Total ${diff === 0 ? 'unchanged' : (diff > 0 ? 'increased' : 'decreased') + ' to ' + money(totals.total_cents)}.`;
      }
    }
    const ins = db.prepare('INSERT INTO quote_items (quote_id, section, description, qty, unit_cents, sort) VALUES (?, ?, ?, ?, ?, ?)');
    for (const it of items) ins.run(quoteId, it.section, it.description, it.qty, it.unit_cents, it.sort);
    const snapshot = { title: data.title || '', notes: data.notes || '', items, ...totals, tax_rate: taxRate, valid_until: validUntil };
    db.prepare('INSERT INTO quote_revisions (quote_id, revision, summary, author, snapshot, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run(quoteId, revision, summary, actor, JSON.stringify(snapshot), ts);
    changeLog('quote', quoteId, actor, summary);
    audit(actor, id ? 'quote_updated' : 'quote_created', 'quote', quoteId, summary);
    return quoteId;
  });
  return tx();
}

export async function sendQuote(quoteId, actor = 'owner') {
  const db = getDb();
  const q = getQuote(quoteId);
  if (!q) throw new Error('Quote not found');
  const ts = nowIso();
  const validDays = Number(getSetting('quote_valid_days', '7')) || 7;
  const validUntil = addDays(validDays).slice(0, 10);
  db.prepare("UPDATE quotes SET status = 'Sent', sent_at = ?, valid_until = ?, updated_at = ? WHERE id = ?").run(ts, validUntil, ts, quoteId);
  if (q.lead_id) moveLead(q.lead_id, 'Estimate Sent', actor);
  changeLog('quote', quoteId, actor, `Estimate ${q.number} sent (rev ${q.revision}). Valid until ${validUntil}.`);
  const link = `${config.baseUrl}/portal/quotes/${q.id}`;
  const ctx = contactMergeContext(q.contact, { quote_link: link, quote_number: q.number, quote_total: money(q.total_cents) });
  const body = `Hi ${ctx.first_name}, your estimate ${q.number} from ${ctx.business_name} is ready: ${link} (valid 7 days - prices may rise after). Questions? Call ${ctx.business_phone}.`;
  if (q.contact.phone) await sendSms(q.contact.phone, body, { contactId: q.contact.id, appendFooter: true });
  if (q.contact.email) await sendEmail(q.contact.email, `Estimate ${q.number} from ${ctx.business_name}`, body, { contactId: q.contact.id });
  audit(actor, 'quote_sent', 'quote', quoteId);
  await fireTrigger('quote_sent', { contactId: q.contact_id, quoteId: q.id, leadId: q.lead_id });
}

export async function approveQuote(quoteId, approvedBy) {
  const db = getDb();
  const q = getQuote(quoteId);
  if (!q) throw new Error('Quote not found');
  const ts = nowIso();
  db.prepare("UPDATE quotes SET status = 'Approved', approved_by = ?, approved_at = ?, updated_at = ? WHERE id = ?").run(approvedBy, ts, ts, quoteId);
  changeLog('quote', quoteId, 'client', `Estimate approved by "${approvedBy}".`);
  if (q.lead_id) moveLead(q.lead_id, 'Won', 'client');
  audit('client:' + approvedBy, 'quote_approved', 'quote', quoteId);
  // Convert: create Job (and an invoice draft when job completes)
  const job = createJobFromQuote(quoteId, 'system');
  await fireTrigger('quote_approved', { contactId: q.contact_id, quoteId: q.id, leadId: q.lead_id, jobId: job?.id });
  return job;
}

export async function declineQuote(quoteId, name, reason = '') {
  const db = getDb();
  const q = getQuote(quoteId);
  if (!q) throw new Error('Quote not found');
  const ts = nowIso();
  db.prepare("UPDATE quotes SET status = 'Declined', declined_at = ?, updated_at = ? WHERE id = ?").run(ts, ts, quoteId);
  changeLog('quote', quoteId, 'client', `Estimate declined by "${name}".${reason ? ' Reason: ' + reason : ''}`);
  if (q.lead_id) moveLead(q.lead_id, 'Lost', 'client');
  audit('client:' + name, 'quote_declined', 'quote', quoteId, reason);
  emitEvent('quote_declined', { contactId: q.contact_id, quoteId, leadId: q.lead_id, extra: { reason, declined_by: name } });
}

export function requestQuoteChanges(quoteId, note) {
  const db = getDb();
  const q = db.prepare('SELECT * FROM quotes WHERE id = ?').get(quoteId);
  db.prepare("UPDATE quotes SET status = 'Changes Requested', updated_at = ? WHERE id = ?").run(nowIso(), quoteId);
  changeLog('quote', quoteId, 'client', `Change requested: ${note}`);
  audit('client', 'quote_change_requested', 'quote', quoteId, note);
  if (q) emitEvent('quote_change_requested', { contactId: q.contact_id, quoteId, leadId: q.lead_id, extra: { note } });
}

export function createJobFromQuote(quoteId, actor = 'owner') {
  const db = getDb();
  const q = getQuote(quoteId);
  if (!q) return null;
  if (q.job_id) return db.prepare('SELECT * FROM jobs WHERE id = ?').get(q.job_id);
  const ts = nowIso();
  const r = db.prepare('INSERT INTO jobs (contact_id, quote_id, title, status, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(q.contact_id, q.id, q.title || `Job for ${q.number}`, 'Scheduled', '', ts, ts);
  const jobId = r.lastInsertRowid;
  const ins = db.prepare('INSERT INTO job_checklist (job_id, item, sort) VALUES (?, ?, ?)');
  q.items.filter((i) => i.section === 'main').forEach((it, i) => ins.run(jobId, it.description, i));
  db.prepare('UPDATE quotes SET job_id = ? WHERE id = ?').run(jobId, q.id);
  changeLog('quote', q.id, actor, `Job #${jobId} created from this estimate.`);
  audit(actor, 'job_created', 'job', jobId, { quote_id: q.id });
  emitEvent('job_scheduled', { contactId: q.contact_id, jobId, quoteId: q.id });
  return db.prepare('SELECT * FROM jobs WHERE id = ?').get(jobId);
}

/** Create a stand-alone job. data: { contact_id, quote_id?, title, scheduled_at (ISO)?, notes?, checklist?: [] } */
export function createJob(data, actor = 'owner') {
  const db = getDb();
  const ts = nowIso();
  const r = db.prepare('INSERT INTO jobs (contact_id, quote_id, title, status, scheduled_at, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(Number(data.contact_id), data.quote_id || null, String(data.title || 'Service visit'), 'Scheduled', data.scheduled_at || null, String(data.notes || ''), ts, ts);
  const jobId = Number(r.lastInsertRowid);
  if (Array.isArray(data.checklist)) {
    const ins = db.prepare('INSERT INTO job_checklist (job_id, item, sort) VALUES (?, ?, ?)');
    data.checklist.forEach((item, i) => { if (String(item).trim()) ins.run(jobId, String(item).trim(), i); });
  }
  audit(actor, 'job_created', 'job', jobId);
  emitEvent('job_scheduled', { contactId: Number(data.contact_id), jobId, quoteId: data.quote_id || null });
  return db.prepare('SELECT * FROM jobs WHERE id = ?').get(jobId);
}

// ---------------- jobs ----------------
export function getJob(id) {
  const db = getDb();
  const j = db.prepare('SELECT * FROM jobs WHERE id = ?').get(id);
  if (!j) return null;
  j.checklist = db.prepare('SELECT * FROM job_checklist WHERE job_id = ? ORDER BY sort, id').all(id);
  j.materials = db.prepare('SELECT * FROM job_materials WHERE job_id = ? ORDER BY sort, id').all(id);
  j.contact = getContact(j.contact_id);
  j.quote = j.quote_id ? getQuote(j.quote_id) : null;
  return j;
}

export async function completeJob(jobId, actor = 'owner') {
  const db = getDb();
  const job = getJob(jobId);
  if (!job) throw new Error('Job not found');
  const ts = nowIso();
  db.prepare("UPDATE jobs SET status = 'Complete', completed_at = ?, updated_at = ? WHERE id = ?").run(ts, ts, jobId);
  let invoiceId = job.invoice_id;
  if (!invoiceId) {
    invoiceId = createInvoice({
      contact_id: job.contact_id,
      quote_id: job.quote_id,
      job_id: job.id,
      service_date: (job.scheduled_at || ts).slice(0, 10),
      items: job.quote ? job.quote.items.map((i) => ({ ...i, unit_price: i.unit_cents / 100 })) : [],
      notes: job.quote?.notes || '',
      tax_rate: job.quote?.tax_rate
    }, actor);
    db.prepare('UPDATE jobs SET invoice_id = ? WHERE id = ?').run(invoiceId, jobId);
    if (job.quote_id) db.prepare('UPDATE quotes SET invoice_id = ? WHERE id = ?').run(invoiceId, job.quote_id);
  }
  audit(actor, 'job_completed', 'job', jobId, { invoice_id: invoiceId });
  await fireTrigger('job_complete', { contactId: job.contact_id, jobId, invoiceId, quoteId: job.quote_id });
  return invoiceId;
}

// ---------------- invoices ----------------
export function getInvoice(id) {
  const db = getDb();
  const inv = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
  if (!inv) return null;
  inv.items = db.prepare('SELECT * FROM invoice_items WHERE invoice_id = ? ORDER BY section, sort, id').all(id);
  inv.payments = db.prepare('SELECT * FROM payments WHERE invoice_id = ? ORDER BY id').all(id);
  inv.contact = getContact(inv.contact_id);
  inv.due_cents = Math.max(0, inv.total_cents - inv.paid_cents);
  return inv;
}

export function createInvoice(data, actor = 'owner') {
  const db = getDb();
  const ts = nowIso();
  const items = parseItems(data.items);
  const taxRate = data.tax_rate !== undefined && data.tax_rate !== '' && data.tax_rate !== null ? Number(data.tax_rate) : Number(getSetting('tax_rate', '8.75'));
  const totals = calcTotals(items, taxRate);
  const tx = db.transaction(() => {
    const number = nextNumber('invoice');
    const r = db.prepare(`INSERT INTO invoices (number, contact_id, quote_id, job_id, status, service_date, invoice_date, terms, notes, subtotal_cents, tax_rate, tax_cents, total_cents, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'Draft', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(number, data.contact_id, data.quote_id || null, data.job_id || null, data.service_date || ts.slice(0, 10), (data.invoice_date || ts).slice(0, 10),
        getSetting('invoice_terms', 'Due on receipt'), data.notes || '', totals.subtotal_cents, taxRate, totals.tax_cents, totals.total_cents, ts, ts);
    const id = r.lastInsertRowid;
    const ins = db.prepare('INSERT INTO invoice_items (invoice_id, section, description, qty, unit_cents, sort) VALUES (?, ?, ?, ?, ?, ?)');
    for (const it of items) ins.run(id, it.section, it.description, it.qty, it.unit_cents, it.sort);
    audit(actor, 'invoice_created', 'invoice', id, { number });
    return id;
  });
  return tx();
}

export function updateInvoice(id, data, actor = 'owner') {
  const db = getDb();
  const items = parseItems(data.items);
  const taxRate = data.tax_rate !== undefined && data.tax_rate !== '' ? Number(data.tax_rate) : Number(getSetting('tax_rate', '8.75'));
  const totals = calcTotals(items, taxRate);
  const tx = db.transaction(() => {
    db.prepare(`UPDATE invoices SET service_date = ?, invoice_date = ?, notes = ?, subtotal_cents = ?, tax_rate = ?, tax_cents = ?, total_cents = ?, updated_at = ? WHERE id = ?`)
      .run(data.service_date || null, data.invoice_date || nowIso().slice(0, 10), data.notes || '', totals.subtotal_cents, taxRate, totals.tax_cents, totals.total_cents, nowIso(), id);
    db.prepare('DELETE FROM invoice_items WHERE invoice_id = ?').run(id);
    const ins = db.prepare('INSERT INTO invoice_items (invoice_id, section, description, qty, unit_cents, sort) VALUES (?, ?, ?, ?, ?, ?)');
    for (const it of items) ins.run(id, it.section, it.description, it.qty, it.unit_cents, it.sort);
    refreshInvoiceStatus(id);
    audit(actor, 'invoice_updated', 'invoice', id);
  });
  tx();
}

export function refreshInvoiceStatus(id) {
  const db = getDb();
  const inv = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
  if (!inv) return;
  let status = inv.status;
  if (inv.paid_cents >= inv.total_cents && inv.total_cents > 0) status = 'Paid';
  else if (inv.paid_cents > 0) status = 'Partial';
  else if (inv.status === 'Paid' || inv.status === 'Partial') status = inv.sent_at ? 'Sent' : 'Draft';
  if (status === 'Sent' && inv.sent_at && Date.now() - new Date(inv.sent_at).getTime() > 14 * 86400 * 1000) status = 'Overdue';
  db.prepare('UPDATE invoices SET status = ?, paid_at = CASE WHEN ? = ? THEN COALESCE(paid_at, ?) ELSE paid_at END, updated_at = ? WHERE id = ?')
    .run(status, status, 'Paid', nowIso(), nowIso(), id);
  if (status === 'Paid' && inv.status !== 'Paid') emitEvent('invoice_paid', { contactId: inv.contact_id, invoiceId: id });
  if (status === 'Overdue' && inv.status !== 'Overdue') emitEvent('invoice_overdue', { contactId: inv.contact_id, invoiceId: id });
}

export async function sendInvoice(id, actor = 'owner') {
  const db = getDb();
  const inv = getInvoice(id);
  if (!inv) throw new Error('Invoice not found');
  const ts = nowIso();
  db.prepare("UPDATE invoices SET status = CASE WHEN status = 'Draft' THEN 'Sent' ELSE status END, sent_at = COALESCE(sent_at, ?), updated_at = ? WHERE id = ?").run(ts, ts, id);
  const link = `${config.baseUrl}/portal/invoices/${inv.id}`;
  const ctx = contactMergeContext(inv.contact, { invoice_link: link, invoice_number: inv.number, invoice_total: money(inv.total_cents) });
  const body = `Hi ${ctx.first_name}, invoice ${inv.number} for ${money(inv.due_cents)} from ${ctx.business_name} is ready (due on receipt): ${link}. Pay by Zelle, Venmo, Cash App, check or card.`;
  if (inv.contact.phone) await sendSms(inv.contact.phone, body, { contactId: inv.contact.id, appendFooter: true });
  if (inv.contact.email) await sendEmail(inv.contact.email, `Invoice ${inv.number} from ${ctx.business_name}`, body, { contactId: inv.contact.id });
  audit(actor, 'invoice_sent', 'invoice', id);
  await fireTrigger('invoice_sent', { contactId: inv.contact_id, invoiceId: inv.id });
}

export function recordPayment(invoiceId, { amount_cents, method, reference, fee_cents = 0, provider_id = null }, actor = 'owner') {
  const db = getDb();
  const inv = getInvoice(invoiceId);
  if (!inv) throw new Error('Invoice not found');
  let paymentId = null;
  const tx = db.transaction(() => {
    const r = db.prepare('INSERT INTO payments (invoice_id, contact_id, amount_cents, fee_cents, method, reference, provider_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(invoiceId, inv.contact_id, amount_cents, fee_cents, method, reference || '', provider_id, nowIso());
    paymentId = Number(r.lastInsertRowid);
    db.prepare('UPDATE invoices SET paid_cents = paid_cents + ?, updated_at = ? WHERE id = ?').run(amount_cents, nowIso(), invoiceId);
    audit(actor, 'payment_recorded', 'invoice', invoiceId, { amount_cents, method, reference });
  });
  tx();
  emitEvent('payment_recorded', { contactId: inv.contact_id, invoiceId, paymentId });
  refreshInvoiceStatus(invoiceId);
  return getInvoice(invoiceId);
}

export async function invoiceCheckoutLink(invoiceId) {
  const inv = getInvoice(invoiceId);
  if (!inv) throw new Error('Invoice not found');
  return createInvoiceCheckout(inv, inv.contact);
}

export function markOverdueInvoices() {
  const db = getDb();
  const rows = db.prepare("SELECT id FROM invoices WHERE archived = 0 AND status = 'Sent' AND sent_at IS NOT NULL AND sent_at < ?").all(addDays(-14));
  for (const r of rows) refreshInvoiceStatus(r.id);
  return rows.length;
}

// ---------------- subscriptions ----------------
export function planPrices() {
  return {
    Basic: { price_cents: toCents(getSetting('plan_basic_price', '0')), desc: getSetting('plan_basic_desc') },
    Pro: { price_cents: toCents(getSetting('plan_pro_price', '0')), desc: getSetting('plan_pro_desc') },
    Business: { price_cents: toCents(getSetting('plan_business_price', '0')), desc: getSetting('plan_business_desc') }
  };
}
export function activeSubscription(contactId) {
  return getDb().prepare("SELECT * FROM subscriptions WHERE contact_id = ? AND status IN ('active', 'pending', 'past_due', 'cancel_requested') ORDER BY id DESC LIMIT 1").get(contactId);
}
export function mrrCents() {
  return getDb().prepare("SELECT COALESCE(SUM(price_cents), 0) AS mrr FROM subscriptions WHERE status IN ('active', 'cancel_requested')").get().mrr;
}
