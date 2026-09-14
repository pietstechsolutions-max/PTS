// AI agents: configurable rows in `ai_agents` (Admin -> Integrations) that run on a provider
// (Anthropic, OpenAI-compatible incl. Ollama/LM Studio, or any custom URL) with a tool-use loop
// over built-in tools that read/write the CRM (lookup_contact, create_lead, add_note, send_sms, ...).
//
//   runAgent('sms_reply_drafter', { input: { text: 'Do you do doorbell cams?' }, contactId: 12 })
//   -> { ok, output, tool_calls: [{ name, input, result }], mock, provider, model, run_id, autopilot }
//
// Without an API key (sandbox) every provider returns a deterministic MOCK reply and logs to the
// Outbox (channel "ai"), so automations and Zaps can be tested end-to-end offline.
//
// Autopilot per agent: off | draft (reply saved as a draft the owner approves in Conversations) | auto (sent).
import { getDb, getSetting } from '../db.js';
import { config } from '../config.js';
import { nowIso, audit, parseJson, normalizePhone, prettyPhone, fullName, nextAllowedSendTime, money } from './util.js';
import { sendSms, recordOutbox } from './providers.js';
import * as services from './services.js';

export const AI_PROVIDERS = ['anthropic', 'openai', 'ollama', 'custom_url'];
export const AUTOPILOT_MODES = ['off', 'draft', 'auto'];
const MAX_TOOL_ROUNDS = 6;

// ---------------------------------------------------------------- tools
function ctxContactId(args, ctx) {
  const id = Number(args.contact_id) || Number(ctx.contactId) || null;
  return id;
}
function contactSummary(c) {
  if (!c) return null;
  const db = getDb();
  return {
    id: c.id, name: fullName(c), first_name: c.first_name, last_name: c.last_name, phone: prettyPhone(c.phone), email: c.email, town: c.town, company: c.company,
    tags: parseJson(c.tags, []), sms_opt_in: !!c.sms_opt_in, source: c.source,
    open_leads: db.prepare("SELECT id, stage, service, message, source, created_at FROM leads WHERE contact_id = ? AND archived = 0 AND status = 'Open' ORDER BY id DESC LIMIT 5").all(c.id),
    quotes: db.prepare('SELECT id, number, title, status, total_cents FROM quotes WHERE contact_id = ? AND archived = 0 ORDER BY id DESC LIMIT 5').all(c.id).map((q) => ({ ...q, total: money(q.total_cents) })),
    open_invoices: db.prepare("SELECT id, number, status, total_cents, paid_cents FROM invoices WHERE contact_id = ? AND archived = 0 AND status IN ('Sent', 'Partial', 'Overdue') ORDER BY id DESC").all(c.id).map((i) => ({ ...i, due: money(i.total_cents - i.paid_cents) })),
    jobs: db.prepare("SELECT id, title, status, scheduled_at FROM jobs WHERE contact_id = ? AND archived = 0 ORDER BY id DESC LIMIT 5").all(c.id),
    recent_messages: db.prepare("SELECT direction, channel, body, created_at FROM messages WHERE contact_id = ? AND status != 'draft' ORDER BY id DESC LIMIT 10").all(c.id).reverse(),
    notes: db.prepare('SELECT body, created_at FROM notes WHERE contact_id = ? ORDER BY id DESC LIMIT 5').all(c.id)
  };
}

export const TOOLS = {
  lookup_contact: {
    description: 'Find a contact by id, phone, email or name and return their profile, open leads, quotes, open invoices, jobs, recent texts and notes.',
    schema: { type: 'object', properties: { contact_id: { type: 'integer' }, phone: { type: 'string' }, email: { type: 'string' }, name: { type: 'string' } } },
    run(args, ctx) {
      const db = getDb();
      let c = null;
      const id = ctxContactId(args, ctx);
      if (args.phone || args.email) c = services.findContactByPhoneOrEmail(args.phone, args.email);
      if (!c && args.name) { const like = `%${String(args.name).trim()}%`; c = db.prepare("SELECT * FROM contacts WHERE archived = 0 AND (first_name || ' ' || last_name LIKE ? OR company LIKE ?) ORDER BY updated_at DESC LIMIT 1").get(like, like); }
      if (!c && id) c = services.getContact(id);
      return c ? contactSummary(c) : { found: false };
    }
  },
  create_lead: {
    description: 'Create a quote request (lead) in the New pipeline column. Creates or matches the contact by phone/email. Fires the new-lead automation.',
    schema: { type: 'object', properties: { name: { type: 'string' }, phone: { type: 'string' }, email: { type: 'string' }, town: { type: 'string' }, service: { type: 'string', description: 'e.g. Security cameras, Wi-Fi, TV mount, Smart home' }, message: { type: 'string' }, source: { type: 'string' } }, required: ['service'] },
    async run(args, ctx) {
      let phone = args.phone; let email = args.email; let name = args.name;
      const id = ctxContactId(args, ctx);
      if (!phone && !email && id) { const c = services.getContact(id); phone = c?.phone; email = c?.email; name = name || fullName(c); }
      if (!phone && !email) return { error: 'Need a phone or email to create a lead' };
      const { lead, contact } = await services.createLead({ name, phone, email, town: args.town, service: args.service, message: args.message, source: args.source || 'AI agent' });
      return { lead_id: lead.id, contact_id: contact.id, stage: lead.stage };
    }
  },
  add_note: {
    description: 'Add an internal note to the contact record (never shown to the customer).',
    schema: { type: 'object', properties: { contact_id: { type: 'integer' }, body: { type: 'string' } }, required: ['body'] },
    run(args, ctx) {
      const id = ctxContactId(args, ctx);
      if (!id) return { error: 'No contact' };
      const r = getDb().prepare('INSERT INTO notes (contact_id, body, author, created_at) VALUES (?, ?, ?, ?)').run(id, String(args.body || '').slice(0, 2000), 'ai:' + (ctx.agent || 'agent'), nowIso());
      audit('ai:' + (ctx.agent || 'agent'), 'note_added', 'contact', id);
      return { note_id: Number(r.lastInsertRowid) };
    }
  },
  send_sms: {
    description: 'Text the customer. Respects STOP/opt-out and quiet hours (8am-8pm ET; outside that it is queued). Keep it short and plain.',
    schema: { type: 'object', properties: { contact_id: { type: 'integer' }, phone: { type: 'string' }, body: { type: 'string' } }, required: ['body'] },
    async run(args, ctx) {
      const id = ctxContactId(args, ctx);
      const c = id ? services.getContact(id) : (args.phone ? services.findContactByPhoneOrEmail(args.phone, '') : null);
      const to = c?.phone || normalizePhone(args.phone);
      if (!to) return { error: 'No phone number' };
      if (c && !c.sms_opt_in) return { error: 'Contact opted out of SMS (STOP). Not sent.' };
      const allowed = nextAllowedSendTime();
      if (new Date(allowed).getTime() - Date.now() > 60 * 1000) {
        const { enqueue } = await import('./automations.js');
        enqueue('send_sms', { to, body: String(args.body), opts: { contactId: c?.id || null } }, allowed);
        return { queued: true, send_at: allowed };
      }
      const r = await sendSms(to, String(args.body), { contactId: c?.id || null, meta: { ai_agent: ctx.agent || true } });
      return r.ok ? { sent: true, message_id: r.id, mock: !!r.mock } : { error: r.error };
    }
  },
  create_quote_draft: {
    description: 'Create a DRAFT estimate for the contact with line items. Only use prices the owner gave you; otherwise leave unit_price at 0 so the owner fills it in. The draft is never sent automatically.',
    schema: { type: 'object', properties: { contact_id: { type: 'integer' }, title: { type: 'string' }, notes: { type: 'string' }, items: { type: 'array', items: { type: 'object', properties: { description: { type: 'string' }, qty: { type: 'number' }, unit_price: { type: 'number' } }, required: ['description'] } } }, required: ['title', 'items'] },
    run(args, ctx) {
      const id = ctxContactId(args, ctx);
      if (!id) return { error: 'No contact' };
      const lead = getDb().prepare("SELECT id FROM leads WHERE contact_id = ? AND archived = 0 AND status = 'Open' ORDER BY id DESC LIMIT 1").get(id);
      const quoteId = services.saveQuote(null, { contact_id: id, lead_id: lead?.id || null, title: args.title, notes: args.notes || '', items: (args.items || []).map((i) => ({ description: i.description, qty: i.qty ?? 1, unit_price: i.unit_price ?? 0 })) }, 'ai:' + (ctx.agent || 'agent'), 'Draft estimate created by AI agent - review before sending.');
      const q = services.getQuote(quoteId);
      return { quote_id: quoteId, number: q.number, status: q.status, total: money(q.total_cents), admin_link: `${config.baseUrl}/admin/quotes/${quoteId}` };
    }
  },
  get_open_invoices: {
    description: 'List unpaid invoices (Sent / Partial / Overdue) for a contact, or for everyone when no contact is given.',
    schema: { type: 'object', properties: { contact_id: { type: 'integer' } } },
    run(args, ctx) {
      const id = ctxContactId(args, ctx);
      const db = getDb();
      const rows = id
        ? db.prepare("SELECT i.*, c.first_name, c.last_name FROM invoices i JOIN contacts c ON c.id = i.contact_id WHERE i.contact_id = ? AND i.archived = 0 AND i.status IN ('Sent', 'Partial', 'Overdue') ORDER BY i.id DESC").all(id)
        : db.prepare("SELECT i.*, c.first_name, c.last_name FROM invoices i JOIN contacts c ON c.id = i.contact_id WHERE i.archived = 0 AND i.status IN ('Sent', 'Partial', 'Overdue') ORDER BY i.id DESC LIMIT 50").all();
      return rows.map((i) => ({ id: i.id, number: i.number, contact: `${i.first_name} ${i.last_name}`.trim(), status: i.status, total: money(i.total_cents), due: money(i.total_cents - i.paid_cents), sent_at: i.sent_at, link: `${config.baseUrl}/portal/invoices/${i.id}` }));
    }
  },
  schedule_job: {
    description: 'Create a job (visit) for the contact on the calendar. scheduled_at is an ISO date-time; omit it to leave the job unscheduled.',
    schema: { type: 'object', properties: { contact_id: { type: 'integer' }, title: { type: 'string' }, scheduled_at: { type: 'string' }, notes: { type: 'string' } }, required: ['title'] },
    run(args, ctx) {
      const id = ctxContactId(args, ctx);
      if (!id) return { error: 'No contact' };
      const when = args.scheduled_at ? new Date(args.scheduled_at) : null;
      const job = services.createJob({ contact_id: id, title: args.title, scheduled_at: when && !Number.isNaN(when.getTime()) ? when.toISOString() : null, notes: args.notes || '' }, 'ai:' + (ctx.agent || 'agent'));
      return { job_id: job.id, status: job.status, scheduled_at: job.scheduled_at, admin_link: `${config.baseUrl}/admin/jobs/${job.id}` };
    }
  },
  tag_contact: {
    description: 'Add a tag to the contact (e.g. hot, warm, cold, commercial, cameras).',
    schema: { type: 'object', properties: { contact_id: { type: 'integer' }, tag: { type: 'string' } }, required: ['tag'] },
    run(args, ctx) {
      const id = ctxContactId(args, ctx);
      if (!id) return { error: 'No contact' };
      const tag = String(args.tag || '').trim().toLowerCase();
      if (['hot', 'warm', 'cold'].includes(tag)) {
        const c = services.getContact(id);
        const tags = parseJson(c?.tags || '[]', []).filter((t) => !['hot', 'warm', 'cold'].includes(String(t).toLowerCase()));
        getDb().prepare('UPDATE contacts SET tags = ?, updated_at = ? WHERE id = ?').run(JSON.stringify(tags), nowIso(), id);
      }
      services.addTag(id, tag);
      return { contact_id: id, tags: parseJson(services.getContact(id).tags, []) };
    }
  },
  move_lead_stage: {
    description: 'Move the contact\'s most recent open lead to a pipeline stage: New, Contacted, Estimate Sent, Won or Lost.',
    schema: { type: 'object', properties: { contact_id: { type: 'integer' }, lead_id: { type: 'integer' }, stage: { type: 'string', enum: ['New', 'Contacted', 'Estimate Sent', 'Won', 'Lost'] } }, required: ['stage'] },
    run(args, ctx) {
      const id = ctxContactId(args, ctx);
      const lead = args.lead_id ? getDb().prepare('SELECT * FROM leads WHERE id = ?').get(args.lead_id) : (ctx.leadId ? getDb().prepare('SELECT * FROM leads WHERE id = ?').get(ctx.leadId) : (id ? getDb().prepare("SELECT * FROM leads WHERE contact_id = ? AND archived = 0 ORDER BY id DESC LIMIT 1").get(id) : null));
      if (!lead) return { error: 'No lead found for this contact' };
      if (!services.PIPELINE_STAGES.includes(args.stage)) return { error: 'Bad stage' };
      services.moveLead(lead.id, args.stage, 'ai:' + (ctx.agent || 'agent'));
      return { lead_id: lead.id, stage: args.stage };
    }
  }
};
export const TOOL_NAMES = Object.keys(TOOLS);

async function execTool(name, args, ctx, calls) {
  const t = TOOLS[name];
  let result;
  if (!t) result = { error: `Unknown tool ${name}` };
  else {
    try { result = await t.run(args || {}, ctx); } catch (e) { result = { error: e.message }; }
  }
  calls.push({ name, input: args || {}, result });
  audit('ai:' + (ctx.agent || 'agent'), 'ai_tool_call', 'contact', ctx.contactId || null, { tool: name, input: args, result });
  return result;
}

// ---------------------------------------------------------------- agents
export function getAgent(nameOrId) {
  const db = getDb();
  const row = typeof nameOrId === 'number' || /^\d+$/.test(String(nameOrId))
    ? db.prepare('SELECT * FROM ai_agents WHERE id = ?').get(Number(nameOrId))
    : db.prepare('SELECT * FROM ai_agents WHERE name = ?').get(String(nameOrId));
  return row || null;
}
export function listAgents(includeArchived = false) {
  return getDb().prepare(`SELECT * FROM ai_agents WHERE archived = ${includeArchived ? '0 OR archived = 1' : '0'} ORDER BY id`).all().map((a) => ({ ...a, tools: parseJson(a.tools, []) }));
}
export function saveAgent(id, data, actor = 'owner') {
  const db = getDb();
  const ts = nowIso();
  const tools = (Array.isArray(data.tools) ? data.tools : String(data.tools || '').split(',')).map((t) => String(t).trim()).filter((t) => TOOL_NAMES.includes(t));
  const provider = AI_PROVIDERS.includes(data.provider) ? data.provider : 'anthropic';
  const autopilot = AUTOPILOT_MODES.includes(data.autopilot) ? data.autopilot : 'draft';
  const temp = Math.max(0, Math.min(1, Number(data.temperature ?? 0.3) || 0));
  const name = String(data.name || '').trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '') || 'agent';
  if (id) {
    db.prepare('UPDATE ai_agents SET name = ?, description = ?, provider = ?, model = ?, custom_url = ?, system_prompt = ?, tools = ?, temperature = ?, autopilot = ?, enabled = ?, updated_at = ? WHERE id = ?')
      .run(name, String(data.description || ''), provider, String(data.model || '').trim(), String(data.custom_url || '').trim(), String(data.system_prompt || ''), JSON.stringify(tools), temp, autopilot, data.enabled ? 1 : 0, ts, id);
    audit(actor, 'ai_agent_updated', 'ai_agent', id);
    return id;
  }
  const r = db.prepare('INSERT INTO ai_agents (name, description, provider, model, custom_url, system_prompt, tools, temperature, autopilot, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(name, String(data.description || ''), provider, String(data.model || '').trim(), String(data.custom_url || '').trim(), String(data.system_prompt || ''), JSON.stringify(tools), temp, autopilot, data.enabled === undefined || data.enabled ? 1 : 0, ts, ts);
  audit(actor, 'ai_agent_created', 'ai_agent', Number(r.lastInsertRowid));
  return Number(r.lastInsertRowid);
}

/** Which provider backend will actually be used and whether it is mocked. */
export function resolveProvider(agent) {
  const p = agent.provider || 'anthropic';
  if (p === 'anthropic') return { provider: p, mock: !config.ai.anthropicApiKey, model: agent.model || config.ai.anthropicModel };
  if (p === 'openai') return { provider: p, mock: !config.ai.openaiApiKey && !config.ai.openaiLocal, model: agent.model || config.ai.openaiModel, baseUrl: config.ai.openaiBaseUrl };
  if (p === 'ollama') return { provider: p, mock: config.sandbox && !agent.custom_url && !config.ai.openaiLocal, model: agent.model || 'llama3.1', baseUrl: (agent.custom_url || (config.ai.openaiLocal ? config.ai.openaiBaseUrl : 'http://localhost:11434/v1')).replace(/\/$/, '') };
  if (p === 'custom_url') return { provider: p, mock: !agent.custom_url, url: agent.custom_url };
  return { provider: p, mock: true };
}
export function aiStatus() {
  return {
    anthropic: config.ai.anthropicApiKey ? 'live' : 'mock',
    openai: config.ai.openaiApiKey || config.ai.openaiLocal ? 'live' : 'mock',
    openaiBaseUrl: config.ai.openaiBaseUrl
  };
}

function businessContext() {
  return `Business: ${getSetting('business_name')} (${getSetting('business_legal_name')}), low-voltage technology installer on Long Island, NY: security cameras, Wi-Fi/networking, TV mounting, smart home, access control, small-business IT. Phone ${getSetting('business_phone')}. Email ${getSetting('business_email')}. Website ${getSetting('business_website')}. Estimates are free. Never quote prices unless the owner gave them. Today is ${nowIso().slice(0, 10)}.`;
}

function userMessage(input, contactId, agent) {
  const parts = [];
  if (agent) parts.push(`AUTOPILOT: ${agent.autopilot === 'auto' ? 'auto (your reply is texted to the customer immediately)' : agent.autopilot === 'draft' ? 'draft (the owner reviews your reply before it is sent)' : 'off (your reply is only shown to the owner)'}`);
  const c = contactId ? services.getContact(contactId) : null;
  if (c) parts.push('CONTACT (JSON):\n' + JSON.stringify(contactSummary(c), null, 1));
  if (input && typeof input === 'object') {
    if (input.text) parts.push('INBOUND TEXT FROM CUSTOMER:\n' + input.text);
    const rest = { ...input }; delete rest.text;
    if (Object.keys(rest).length) parts.push('INPUT (JSON):\n' + JSON.stringify(rest, null, 1));
  } else if (input) parts.push(String(input));
  if (!parts.length) parts.push('(no input)');
  return parts.join('\n\n');
}

// ---------------------------------------------------------------- mock
function mockRun(agent, input, ctx, calls) {
  const text = String(input?.text || input?.message || input?.notes || (typeof input === 'string' ? input : '') || '');
  const low = text.toLowerCase();
  const c = ctx.contactId ? services.getContact(ctx.contactId) : null;
  const first = c?.first_name || 'there';
  const tools = parseJson(agent.tools, []);
  const phone = getSetting('business_phone');
  return (async () => {
    if (agent.name === 'lead_qualifier') {
      const lead = ctx.leadId ? getDb().prepare('SELECT * FROM leads WHERE id = ?').get(ctx.leadId) : (c ? getDb().prepare("SELECT * FROM leads WHERE contact_id = ? AND archived = 0 ORDER BY id DESC LIMIT 1").get(c.id) : null);
      const temp = /asap|today|tomorrow|urgent|this week|right away/.test(low) ? 'hot' : /just looking|price|how much|maybe|someday|browsing/.test(low) ? 'cold' : 'warm';
      const missing = [];
      if (!(lead?.service || /camera|wifi|wi-fi|network|tv|mount|smart|doorbell|alarm|access/.test(low))) missing.push('What are you looking to get done (cameras, Wi-Fi, TV mount, smart home)?');
      if (!c?.town) missing.push('What town are you in?');
      missing.push('When would you like it done - this week, this month, or just planning?');
      if (missing.length < 3) missing.push('Is this for a home or a business?');
      if (tools.includes('tag_contact') && c) await execTool('tag_contact', { tag: temp }, ctx, calls);
      if (tools.includes('move_lead_stage') && lead && lead.stage === 'New' && agent.autopilot === 'auto') await execTool('move_lead_stage', { stage: 'Contacted' }, ctx, calls);
      if (tools.includes('add_note') && c) await execTool('add_note', { body: `[mock AI] Lead rated ${temp}. Asked: ${missing.slice(0, 3).join(' | ')}` }, ctx, calls);
      return `Hi ${first}, thanks for reaching out to Piets Technology Solutions! Quick questions so I can set up your free estimate: ${missing.slice(0, 3).map((q, i) => `${i + 1}) ${q}`).join(' ')} - Pete, ${phone}`;
    }
    if (agent.name === 'sms_reply_drafter') {
      const topic = /camera|doorbell/.test(low) ? 'cameras' : /wifi|wi-fi|internet|network/.test(low) ? 'Wi-Fi' : /tv|mount/.test(low) ? 'TV mounting' : /invoice|pay|bill/.test(low) ? 'your invoice' : 'that';
      if (/invoice|pay|bill/.test(low)) return `Hi ${first}, thanks for the text! You can see and pay your invoice any time in your client hub: ${config.baseUrl}/portal. Zelle, Venmo, Cash App, check or card all work. Questions? Call/text 631-871-5957.`;
      return `Hi ${first}, thanks for reaching out! Yes - we can absolutely help with ${topic}. I'd love to stop by for a free demo and estimate so you can see exactly what you'd get. What day works best this week? - Pete, 631-871-5957`;
    }
    if (agent.name === 'quote_summarizer') {
      const lines = text.split(/\n|[.;]\s+/).map((s) => s.trim()).filter(Boolean).slice(0, 6);
      return `Scope of work: ${lines.length ? lines.map((l) => l.replace(/\s+/g, ' ')).join('. ') + '.' : 'See notes.'} Includes labor, standard mounting hardware and cleanup. Any pricing is set by the owner on the estimate.`;
    }
    return `[mock ${agent.name}] ${text ? 'Received: ' + text.slice(0, 200) : 'No input.'} Add an API key (ANTHROPIC_API_KEY or OPENAI_API_KEY) in server/.env for real replies.`;
  })();
}

// ---------------------------------------------------------------- providers
function toolDefs(agent, style) {
  const names = parseJson(agent.tools, []).filter((n) => TOOLS[n]);
  if (style === 'anthropic') return names.map((n) => ({ name: n, description: TOOLS[n].description, input_schema: TOOLS[n].schema }));
  return names.map((n) => ({ type: 'function', function: { name: n, description: TOOLS[n].description, parameters: TOOLS[n].schema } }));
}
async function callJson(url, headers, body, timeoutMs = 90000) {
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body), signal: AbortSignal.timeout(timeoutMs) });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = null; }
  if (!res.ok) throw new Error(`${url.replace(/\?.*/, '')} -> HTTP ${res.status}: ${(json?.error?.message || json?.error || text).toString().slice(0, 300)}`);
  return json ?? { text };
}

async function runAnthropic(agent, system, user, ctx, calls, model) {
  const tools = toolDefs(agent, 'anthropic');
  const messages = [{ role: 'user', content: user }];
  let out = '';
  for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
    const body = { model, max_tokens: 1024, temperature: agent.temperature ?? 0.3, system, messages };
    if (tools.length) body.tools = tools;
    const j = await callJson('https://api.anthropic.com/v1/messages', { 'x-api-key': config.ai.anthropicApiKey, 'anthropic-version': '2023-06-01' }, body);
    const content = j.content || [];
    out = content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim() || out;
    const uses = content.filter((b) => b.type === 'tool_use');
    if (j.stop_reason !== 'tool_use' || !uses.length) break;
    messages.push({ role: 'assistant', content });
    const results = [];
    for (const u of uses) results.push({ type: 'tool_result', tool_use_id: u.id, content: JSON.stringify(await execTool(u.name, u.input, ctx, calls)) });
    messages.push({ role: 'user', content: results });
  }
  return out;
}

async function runOpenAI(agent, system, user, ctx, calls, model, baseUrl, apiKey) {
  const tools = toolDefs(agent, 'openai');
  const messages = [{ role: 'system', content: system }, { role: 'user', content: user }];
  const headers = apiKey ? { authorization: `Bearer ${apiKey}` } : {};
  let out = '';
  for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
    const body = { model, temperature: agent.temperature ?? 0.3, messages };
    if (tools.length) body.tools = tools;
    const j = await callJson(`${baseUrl}/chat/completions`, headers, body);
    const msg = j.choices?.[0]?.message || {};
    if (msg.content) out = String(msg.content).trim();
    const tcs = msg.tool_calls || [];
    if (!tcs.length) break;
    messages.push({ role: 'assistant', content: msg.content || null, tool_calls: tcs });
    for (const tc of tcs) {
      const args = parseJson(tc.function?.arguments || '{}', {});
      const result = await execTool(tc.function?.name, args, ctx, calls);
      messages.push({ role: 'tool', tool_call_id: tc.id, content: JSON.stringify(result) });
    }
  }
  return out;
}

async function runCustomUrl(agent, system, user, ctx, calls, url) {
  const c = ctx.contactId ? services.getContact(ctx.contactId) : null;
  const j = await callJson(url, {}, { agent: agent.name, model: agent.model || '', system_prompt: system, input: ctx.input, prompt: user, contact: c ? contactSummary(c) : null, tools: parseJson(agent.tools, []) });
  let out = '';
  if (typeof j === 'string') out = j;
  else out = j.output ?? j.reply ?? j.text ?? j.content ?? j.message ?? j.choices?.[0]?.message?.content ?? '';
  if (typeof out !== 'string') out = JSON.stringify(out);
  for (const tc of Array.isArray(j?.tool_calls) ? j.tool_calls : []) {
    const name = tc.name || tc.function?.name; const args = tc.input || tc.arguments || tc.args || parseJson(tc.function?.arguments || '{}', {});
    if (name) await execTool(name, typeof args === 'string' ? parseJson(args, {}) : args, ctx, calls);
  }
  return out.trim();
}

// ---------------------------------------------------------------- run
/**
 * Run an agent. opts: { input, contactId, leadId, actor, dryAutopilot }
 */
export async function runAgent(nameOrRow, opts = {}) {
  const agent = typeof nameOrRow === 'object' ? nameOrRow : getAgent(nameOrRow);
  if (!agent) return { ok: false, error: `Unknown agent "${nameOrRow}"` };
  if (!agent.enabled || agent.archived) return { ok: false, error: `Agent "${agent.name}" is turned off` };
  const db = getDb();
  const started = Date.now();
  const contactId = Number(opts.contactId) || null;
  const ctx = { agent: agent.name, contactId, leadId: opts.leadId || null, input: opts.input ?? {} };
  const calls = [];
  const resolved = resolveProvider(agent);
  const system = `${agent.system_prompt || ''}\n\n${businessContext()}\n\nWhen you reply, your final message is the text that may be sent to the customer or shown to the owner - no preamble, no markdown.`.trim();
  const user = userMessage(opts.input, contactId, agent);
  let output = ''; let error = ''; let status = 'ok';
  try {
    if (resolved.mock) {
      output = await mockRun(agent, opts.input, ctx, calls);
      recordOutbox('ai', agent.name, `[mock ${resolved.provider}] ${agent.name}`, output, { agent: agent.name, contactId, input: opts.input ?? null, tool_calls: calls.map((c) => c.name) });
    } else if (resolved.provider === 'anthropic') output = await runAnthropic(agent, system, user, ctx, calls, resolved.model);
    else if (resolved.provider === 'openai') output = await runOpenAI(agent, system, user, ctx, calls, resolved.model, resolved.baseUrl, config.ai.openaiApiKey);
    else if (resolved.provider === 'ollama') output = await runOpenAI(agent, system, user, ctx, calls, resolved.model, resolved.baseUrl, config.ai.openaiApiKey || 'ollama');
    else if (resolved.provider === 'custom_url') output = await runCustomUrl(agent, system, user, ctx, calls, resolved.url);
  } catch (e) {
    status = 'error'; error = e.message;
  }
  const run = db.prepare('INSERT INTO ai_runs (agent_id, agent, provider, contact_id, input, output, tool_calls, status, error, mock, duration_ms, actor, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(agent.id, agent.name, resolved.provider, contactId, JSON.stringify(opts.input ?? {}), output, JSON.stringify(calls), status, error, resolved.mock ? 1 : 0, Date.now() - started, opts.actor || 'system', nowIso());
  db.prepare('UPDATE ai_agents SET run_count = run_count + 1 WHERE id = ?').run(agent.id);
  audit(opts.actor || 'system', 'ai_agent_run', 'ai_agent', agent.id, { agent: agent.name, contactId, status, mock: resolved.mock, tools: calls.map((c) => c.name) });
  const result = { ok: status === 'ok', output, error: error || undefined, tool_calls: calls, mock: resolved.mock, provider: resolved.provider, model: resolved.model || null, run_id: Number(run.lastInsertRowid), autopilot: { mode: agent.autopilot } };
  if (result.ok && output && contactId && agent.autopilot !== 'off' && !opts.dryAutopilot) {
    const alreadySent = calls.some((c) => c.name === 'send_sms' && c.result && (c.result.sent || c.result.queued));
    if (!alreadySent) result.autopilot = await applyAutopilot(agent, contactId, output, ctx);
  }
  return result;
}

/** draft: save a draft message the owner approves in Conversations. auto: send now (opt-out + quiet hours respected). */
async function applyAutopilot(agent, contactId, text, ctx) {
  const db = getDb();
  const c = services.getContact(contactId);
  if (!c?.phone) return { mode: agent.autopilot, skipped: 'no phone' };
  if (agent.autopilot === 'auto') {
    const r = await TOOLS.send_sms.run({ body: text }, ctx);
    return { mode: 'auto', ...r };
  }
  const r = db.prepare("INSERT INTO messages (contact_id, direction, channel, from_addr, to_addr, subject, body, status, provider_id, created_at) VALUES (?, 'out', 'sms', ?, ?, ?, ?, 'draft', NULL, ?)")
    .run(contactId, config.twilio.phoneNumber || getSetting('twilio_number') || config.business.phoneE164, c.phone, `ai:${agent.name}`, text, nowIso());
  audit('ai:' + agent.name, 'ai_draft_created', 'contact', contactId, { message_id: Number(r.lastInsertRowid) });
  return { mode: 'draft', message_id: Number(r.lastInsertRowid), admin_link: `${config.baseUrl}/admin/conversations/${contactId}` };
}

export const SEED_AGENTS = [
  {
    name: 'lead_qualifier',
    description: 'Reads a new lead or inbound text, asks the 3 missing questions, rates the lead hot/warm/cold and moves the pipeline stage.',
    provider: 'anthropic', model: '', temperature: 0.2, autopilot: 'draft',
    tools: ['lookup_contact', 'tag_contact', 'move_lead_stage', 'add_note'],
    system_prompt: `You are the lead qualifier for Piets Technology Solutions. You get a new lead or an inbound text from a customer plus what we already know about them.

Your job:
1. Work out what is still missing from these three things: (a) what they want done (cameras, Wi-Fi, TV mount, smart home, other), (b) what town they are in, (c) when they want it done.
2. Rate the lead: "hot" (wants it soon / clear need), "warm" (real project, no rush) or "cold" (just browsing / price shopping). Call tag_contact with hot, warm or cold.
3. Only when the input says autopilot is "auto" (your text goes out immediately) and the lead is in the New stage, call move_lead_stage with "Contacted". In draft mode leave the stage alone - the owner moves it when they send.
4. Call add_note with a one-line summary of what you learned and the rating.
5. Reply with ONE short, friendly text (under 320 characters) that thanks them and asks ONLY the missing questions, numbered. Mention the free estimate. Plain English, no prices, no markdown. Sign off "- Pete, 631-871-5957".`
  },
  {
    name: 'sms_reply_drafter',
    description: 'Drafts a reply to a customer text in the Piets voice. Draft-only by default: you approve it in Conversations.',
    provider: 'anthropic', model: '', temperature: 0.5, autopilot: 'draft',
    tools: ['lookup_contact', 'get_open_invoices', 'add_note'],
    system_prompt: `You draft text-message replies for Pete at Piets Technology Solutions (Long Island low-voltage installer: security cameras, Wi-Fi/networking, TV mounting, smart home, access control).

Voice: upbeat, short (1-3 sentences, under 320 characters), plain English, no jargon, no emojis, no markdown. Sound like a friendly local tech, not a call center.
Rules:
- Always offer or mention the free demo / free estimate when the customer is asking about a service.
- NEVER quote or estimate prices, even ballpark. If asked, say Pete will give an exact number after a quick free look.
- If they ask about an invoice or paying, point them to the client hub link if you have it and list Zelle, Venmo, Cash App, check or card.
- If they are upset, apologize once, plainly, and offer a fix or a call.
- End with "- Pete, 631-871-5957".
Reply with only the text message.`
  },
  {
    name: 'quote_summarizer',
    description: 'Turns rough job notes into a plain-English scope of work for an estimate. Never invents prices.',
    provider: 'anthropic', model: '', temperature: 0.2, autopilot: 'off',
    tools: ['lookup_contact'],
    system_prompt: `You write the "scope of work" paragraph for estimates from Piets Technology Solutions. Input is the owner's rough job notes (and sometimes the contact record).

Write 2-5 plain-English sentences a homeowner or office manager understands: what gets installed, where, what is included (labor, mounting hardware, cable runs, setup on their phone, cleanup) and what the customer must provide (power outlet, TV, internet service). Mention the 1-year workmanship warranty if the notes do not say otherwise.
NEVER invent prices, quantities or brand names that are not in the notes. If something important is unclear, end with "Owner to confirm: ..." listing it.
No markdown, no bullet symbols, no headings. Output only the paragraph.`
  }
];

export function seedAgents() {
  const db = getDb();
  if (db.prepare('SELECT COUNT(*) AS n FROM ai_agents').get().n > 0) return false;
  for (const a of SEED_AGENTS) saveAgent(null, { ...a, enabled: 1 }, 'system');
  return true;
}
