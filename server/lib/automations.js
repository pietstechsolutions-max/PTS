// Rule engine: triggers -> steps. Delayed steps live in the `jobs_queue` table and are
// processed by a simple scheduler (setInterval every minute).
//
// Step shapes (stored as JSON in automations.steps):
//   { type: 'send_sms',   body: 'Hi {{first_name}} ...' }
//   { type: 'send_email', subject: '...', body: '...' }
//   { type: 'wait',       hours: 48 }         (or { days: 2 })
//   { type: 'add_tag',    tag: 'lead' }
//   { type: 'move_stage', stage: 'Contacted' }
//   { type: 'notify_owner', body: 'New lead: {{name}}' }
//   { type: 'stop_if',    condition: 'quote_not_open' | 'invoice_paid' | 'lead_closed' }
//   { type: 'webhook',    url: 'https://hooks.zapier.com/...' }   (POSTs the event payload, like an outbound webhook)
//   { type: 'ai_agent',   agent: 'sms_reply_drafter' }            (runs an AI agent for the contact; autopilot decides draft/send)
import { getDb, getSetting } from '../db.js';
import { config } from '../config.js';
import { nowIso, addHours, mergeFields, parseJson, audit, money, prettyPhone, nextAllowedSendTime } from './util.js';
import { sendSms, sendEmail, notifyOwner, recordOutbox } from './providers.js';
import * as services from './services.js';
import { processCampaigns } from './campaigns.js';
import { emitEvent, buildPayload, postJson, deliverWebhook, EVENT_NAMES } from './events.js';
import { runAgent } from './ai.js';

export const TRIGGERS = ['new_lead', 'quote_sent', 'quote_approved', 'invoice_sent', 'invoice_overdue', 'job_complete', 'inbound_sms_keyword'];
export const ACTION_TYPES = ['send_sms', 'send_email', 'wait', 'add_tag', 'move_stage', 'notify_owner', 'stop_if', 'webhook', 'ai_agent'];
// Triggers that are also published as events (the rest are emitted where they happen).
const TRIGGER_EVENTS = new Set(['new_lead', 'quote_sent', 'quote_approved', 'invoice_sent', 'job_complete']);

export function enqueue(type, payload, runAt = nowIso()) {
  const r = getDb().prepare('INSERT INTO jobs_queue (type, payload, run_at, created_at) VALUES (?, ?, ?, ?)')
    .run(type, JSON.stringify(payload), runAt, nowIso());
  return r.lastInsertRowid;
}

/** Fire a trigger. Matching automations start immediately (step 0 runs inline). */
export async function fireTrigger(trigger, ctx = {}) {
  const db = getDb();
  if (TRIGGER_EVENTS.has(trigger) && EVENT_NAMES.includes(trigger)) {
    try { emitEvent(trigger, ctx); } catch (e) { console.error('emitEvent failed', e.message); }
  }
  const rows = db.prepare('SELECT * FROM automations WHERE trigger = ? AND enabled = 1 AND archived = 0').all(trigger);
  const started = [];
  for (const a of rows) {
    if (trigger === 'inbound_sms_keyword') {
      const kw = (a.trigger_keyword || '').trim().toLowerCase();
      if (kw && kw !== String(ctx.keyword || '').toLowerCase()) continue;
    }
    db.prepare('UPDATE automations SET run_count = run_count + 1 WHERE id = ?').run(a.id);
    audit('system', 'automation_started', 'automation', a.id, { trigger, ctx });
    started.push(a.id);
    try {
      await runSteps(a.id, 0, ctx);
    } catch (e) {
      console.error(`automation ${a.id} failed:`, e.message);
    }
  }
  return started;
}

function buildContext(ctx) {
  const db = getDb();
  const contact = ctx.contactId ? db.prepare('SELECT * FROM contacts WHERE id = ?').get(ctx.contactId) : null;
  const lead = ctx.leadId ? db.prepare('SELECT * FROM leads WHERE id = ?').get(ctx.leadId) : null;
  const quote = ctx.quoteId ? db.prepare('SELECT * FROM quotes WHERE id = ?').get(ctx.quoteId) : null;
  const invoice = ctx.invoiceId ? db.prepare('SELECT * FROM invoices WHERE id = ?').get(ctx.invoiceId) : null;
  const job = ctx.jobId ? db.prepare('SELECT * FROM jobs WHERE id = ?').get(ctx.jobId) : null;
  const merge = services.contactMergeContext(contact, {
    phone: prettyPhone(contact?.phone),
    email: contact?.email || '',
    service: lead?.service || quote?.title || job?.title || '',
    message: lead?.message || '',
    source: lead?.source || '',
    quote_number: quote?.number || '',
    quote_total: quote ? money(quote.total_cents) : '',
    quote_link: quote ? `${config.baseUrl}/portal/quotes/${quote.id}` : `${config.baseUrl}/portal`,
    invoice_number: invoice?.number || '',
    invoice_total: invoice ? money(invoice.total_cents - invoice.paid_cents) : '',
    invoice_link: invoice ? `${config.baseUrl}/portal/invoices/${invoice.id}` : `${config.baseUrl}/portal`,
    job_title: job?.title || '',
    keyword: ctx.keyword || '',
    inbound_text: ctx.text || ''
  });
  return { contact, lead, quote, invoice, job, merge };
}

function guard(condition, c) {
  switch (condition) {
    case 'quote_not_open': return !c.quote || c.quote.status !== 'Sent';
    case 'invoice_paid': return !c.invoice || c.invoice.status === 'Paid' || c.invoice.archived;
    case 'lead_closed': return !c.lead || c.lead.status === 'Closed';
    default: return false;
  }
}

/** Run steps of an automation starting at index. Returns when a wait is scheduled or steps end. */
export async function runSteps(automationId, startIndex, ctx) {
  const db = getDb();
  const a = db.prepare('SELECT * FROM automations WHERE id = ?').get(automationId);
  if (!a || !a.enabled) return 'disabled';
  const steps = parseJson(a.steps, []);
  for (let i = startIndex; i < steps.length; i++) {
    const step = steps[i];
    const c = buildContext(ctx);
    switch (step.type) {
      case 'wait': {
        const hours = Number(step.hours) || (Number(step.days) || 0) * 24;
        const runAt = addHours(hours);
        enqueue('automation_step', { automationId, stepIndex: i + 1, ctx }, runAt);
        return 'waiting';
      }
      case 'stop_if': {
        if (guard(step.condition, c)) {
          audit('system', 'automation_stopped', 'automation', automationId, { step: i, condition: step.condition });
          return 'stopped';
        }
        break;
      }
      case 'send_sms': {
        if (!c.contact?.phone) break;
        const body = mergeFields(step.body, c.merge);
        // Respect quiet hours: defer if outside 8am-8pm ET.
        const allowed = nextAllowedSendTime();
        if (new Date(allowed).getTime() - Date.now() > 60 * 1000) {
          // Queue just this text for the next allowed window; later steps continue now.
          enqueue('send_sms', { to: c.contact.phone, body, opts: { contactId: c.contact.id, appendFooter: !!step.footer } }, allowed);
          audit('system', 'sms_deferred_quiet_hours', 'automation', automationId, { step: i, sendAt: allowed });
          break;
        }
        await sendSms(c.contact.phone, body, { contactId: c.contact.id, appendFooter: !!step.footer });
        break;
      }
      case 'send_email': {
        if (!c.contact?.email) break;
        await sendEmail(c.contact.email, mergeFields(step.subject || `Message from ${getSetting('business_name')}`, c.merge), mergeFields(step.body, c.merge), { contactId: c.contact.id });
        break;
      }
      case 'add_tag': {
        if (c.contact) services.addTag(c.contact.id, step.tag);
        break;
      }
      case 'move_stage': {
        if (c.lead) services.moveLead(c.lead.id, step.stage, 'automation');
        break;
      }
      case 'notify_owner': {
        await notifyOwner(mergeFields(step.body, c.merge));
        break;
      }
      case 'webhook': {
        if (!step.url) break;
        const payload = buildPayload('automation_step', { ...ctx, extra: { automation_id: automationId, step: i, automation: a.name } });
        const r = await postJson(step.url, { ...payload, id: 0 }, { secret: step.secret || '' });
        audit('system', r.ok ? 'automation_webhook_sent' : 'automation_webhook_failed', 'automation', automationId, { step: i, url: step.url, status: r.status, error: r.error });
        if (config.sandbox) recordOutbox('webhook', step.url, `automation "${a.name}" step ${i + 1} (${r.ok ? 'delivered' : r.error || 'HTTP ' + r.status})`, JSON.stringify(payload, null, 2), { automation_id: automationId, ok: r.ok });
        break;
      }
      case 'ai_agent': {
        if (!step.agent) break;
        const r = await runAgent(step.agent, { contactId: c.contact?.id, leadId: c.lead?.id, input: { text: ctx.text || c.lead?.message || '', service: c.merge.service, trigger: a.trigger, automation: a.name }, actor: 'automation:' + automationId });
        audit('system', r.ok ? 'automation_ai_agent_ran' : 'automation_ai_agent_failed', 'automation', automationId, { step: i, agent: step.agent, error: r.error, tools: (r.tool_calls || []).map((t) => t.name), autopilot: r.autopilot });
        break;
      }
      default:
        console.warn('unknown step type', step.type);
    }
  }
  return 'done';
}

/** Process due rows in jobs_queue. Returns number processed. Concurrent calls are serialized. */
let queueChain = Promise.resolve(0);
export function processQueue(limit = 50) {
  const run = queueChain.then(() => processQueueNow(limit), () => processQueueNow(limit));
  queueChain = run.catch(() => 0);
  return run;
}
/** Run the queue soon (next tick) - used after enqueueing something that should not wait for the scheduler. */
export function kickQueue() {
  setImmediate(() => { processQueue().catch((e) => console.error('queue error', e.message)); });
}
async function processQueueNow(limit = 50) {
  const db = getDb();
  const due = db.prepare("SELECT * FROM jobs_queue WHERE status = 'pending' AND run_at <= ? ORDER BY run_at LIMIT ?").all(nowIso(), limit);
  let n = 0;
  for (const j of due) {
    db.prepare("UPDATE jobs_queue SET status = 'running', attempts = attempts + 1 WHERE id = ?").run(j.id);
    const payload = parseJson(j.payload, {});
    try {
      if (j.type === 'automation_step') await runSteps(payload.automationId, payload.stepIndex, payload.ctx || {});
      else if (j.type === 'send_sms') await sendSms(payload.to, payload.body, payload.opts || {});
      else if (j.type === 'send_email') await sendEmail(payload.to, payload.subject, payload.body, payload.opts || {});
      else if (j.type === 'webhook') await deliverWebhook(payload.webhookId, payload.payload, payload.attempt || 2);
      else if (j.type === 'ai_agent') {
        const r = await runAgent(payload.agent, { contactId: payload.contactId, leadId: payload.leadId, input: payload.input || {}, actor: payload.actor || 'system' });
        if (!r.ok) throw new Error(r.error || 'agent failed');
      }
      db.prepare("UPDATE jobs_queue SET status = 'done', done_at = ? WHERE id = ?").run(nowIso(), j.id);
    } catch (e) {
      const failed = j.attempts >= 3;
      db.prepare('UPDATE jobs_queue SET status = ?, last_error = ?, run_at = ? WHERE id = ?')
        .run(failed ? 'failed' : 'pending', e.message, addHours(0.25), j.id);
    }
    n++;
  }
  return n;
}

/** One scheduler tick: delayed steps, campaigns, overdue invoices. */
export async function tick() {
  try {
    const db = getDb();
    const before = db.prepare("SELECT id, contact_id FROM invoices WHERE archived = 0 AND status = 'Sent'").all();
    services.markOverdueInvoices();
    for (const inv of before) {
      const now = db.prepare('SELECT status FROM invoices WHERE id = ?').get(inv.id);
      if (now?.status === 'Overdue') await fireTrigger('invoice_overdue', { contactId: inv.contact_id, invoiceId: inv.id });
    }
    await processQueue();
    await processCampaigns();
  } catch (e) {
    console.error('scheduler tick error', e);
  }
}

let timer = null;
export function startScheduler(intervalMs = 60 * 1000) {
  if (timer) return timer;
  timer = setInterval(tick, intervalMs);
  timer.unref?.();
  return timer;
}
export function stopScheduler() {
  if (timer) clearInterval(timer);
  timer = null;
}

export const SEED_AUTOMATIONS = [
  {
    name: 'New lead: instant text + owner alert',
    trigger: 'new_lead',
    steps: [
      { type: 'send_sms', body: 'Hi {{first_name}}, thanks for reaching out to {{business_name}}! We got your request for {{service}} and will text you shortly to set up a free estimate. Call/text {{business_phone}} anytime.', footer: true },
      { type: 'notify_owner', body: 'NEW LEAD: {{name}} ({{phone}}) in {{town}} - {{service}}. "{{message}}" Source: {{source}}' },
      { type: 'add_tag', tag: 'lead' }
    ]
  },
  {
    name: 'Estimate follow-up (2 days and 5 days)',
    trigger: 'quote_sent',
    steps: [
      { type: 'wait', days: 2 },
      { type: 'stop_if', condition: 'quote_not_open' },
      { type: 'send_sms', body: 'Hi {{first_name}}, just checking in on estimate {{quote_number}} ({{quote_total}}). You can approve it here: {{quote_link}}. Any questions, call {{business_phone}}.' },
      { type: 'wait', days: 3 },
      { type: 'stop_if', condition: 'quote_not_open' },
      { type: 'send_sms', body: 'Hi {{first_name}}, your estimate {{quote_number}} expires soon and prices may rise after. Approve or ask for changes here: {{quote_link}}.' }
    ]
  },
  {
    name: 'Invoice reminder (3 days and 7 days)',
    trigger: 'invoice_sent',
    steps: [
      { type: 'wait', days: 3 },
      { type: 'stop_if', condition: 'invoice_paid' },
      { type: 'send_sms', body: 'Hi {{first_name}}, friendly reminder: invoice {{invoice_number}} ({{invoice_total}}) is due on receipt. Pay online or see Zelle/Venmo/Cash App details here: {{invoice_link}}' },
      { type: 'wait', days: 4 },
      { type: 'stop_if', condition: 'invoice_paid' },
      { type: 'send_sms', body: 'Hi {{first_name}}, invoice {{invoice_number}} ({{invoice_total}}) is still open. Please pay here: {{invoice_link}} or call {{business_phone}} if you have questions.' },
      { type: 'notify_owner', body: 'Invoice {{invoice_number}} for {{name}} is 7 days unpaid ({{invoice_total}}).' }
    ]
  },
  {
    name: 'Job complete: thank you + review request',
    trigger: 'job_complete',
    steps: [
      { type: 'send_sms', body: 'Hi {{first_name}}, thank you for choosing {{business_name}}! If you were happy with the work, a quick review helps a small local business a lot: {{review_link}}' },
      { type: 'add_tag', tag: 'customer' }
    ]
  }
];
