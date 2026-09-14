// Smoke test: boots the app on a random port in sandbox mode with a temp database and walks the main flows.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'piets-test-'));
process.env.SANDBOX = 'true';
process.env.DB_PATH = path.join(tmpDir, 'test.db');
process.env.DISABLE_SCHEDULER = 'true';
process.env.SKIP_BUILD = 'true';
process.env.SESSION_SECRET = 'test-secret';
process.env.NODE_ENV = 'test';
process.env.BLOG_API_TOKEN = 'test-blog-token';
process.env.API_TOKEN = 'test-api-token';

const { createApp } = await import('../app.js');
const { getDb, setSetting, closeDb } = await import('../db.js');
const { seedIfEmpty } = await import('../seed.js');
const { processQueue, runSteps, enqueue } = await import('../lib/automations.js');
const http = await import('node:http');
const crypto = await import('node:crypto');

let server; let base; let db;

// Tiny cookie jar so we can hold a session across requests.
function jar() {
  const cookies = {};
  return {
    async fetch(url, opts = {}) {
      const headers = { ...(opts.headers || {}) };
      const c = Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ');
      if (c) headers.cookie = c;
      const res = await fetch(base + url, { ...opts, headers, redirect: 'manual' });
      for (const sc of res.headers.getSetCookie?.() || []) {
        const [kv] = sc.split(';');
        const [k, v] = kv.split('=');
        cookies[k] = v;
      }
      return res;
    }
  };
}
const form = (obj) => ({ method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(obj).toString() });

before(async () => {
  db = getDb();
  seedIfEmpty();
  // Make sure SMS steps are not deferred by quiet hours during the test.
  setSetting('quiet_hours_start', '0');
  setSetting('quiet_hours_end', '24');
  process.env.BASE_URL = 'http://127.0.0.1';
  const app = createApp();
  await new Promise((resolve) => { server = app.listen(0, '127.0.0.1', resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((r) => server.close(r));
  closeDb();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('healthz reports sandbox', async () => {
  const r = await fetch(base + '/healthz');
  const j = await r.json();
  assert.equal(r.status, 200);
  assert.equal(j.ok, true);
  assert.equal(j.sandbox, true);
});

test('POST /api/leads creates a contact, a lead in stage New and fires new_lead automation', async () => {
  const r = await fetch(base + '/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Smoke Tester', phone: '631-555-0177', email: 'smoke@example.com', town: 'Islip', service: 'Wi-Fi', message: 'Slow internet', source: 'test' }) });
  const j = await r.json();
  assert.equal(j.ok, true);
  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(j.lead_id);
  assert.equal(lead.stage, 'New');
  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(j.contact_id);
  assert.equal(contact.phone, '+16315550177');
  // Automation: instant text to the lead + owner alert, both in the outbox.
  const sms = db.prepare("SELECT * FROM outbox WHERE channel = 'sms' AND to_addr = '+16315550177'").all();
  assert.ok(sms.length >= 1, 'lead should receive an instant text');
  assert.match(sms[0].body, /Smoke|thanks/i);
  const owner = db.prepare("SELECT * FROM outbox WHERE channel = 'sms' AND json_extract(meta, '$.owner_alert') = 1").all();
  assert.ok(owner.length >= 1, 'owner should be alerted');
  // Dedupe: same phone again does not create a second contact.
  const r2 = await fetch(base + '/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Smoke Tester', phone: '6315550177', service: 'Cameras' }) });
  const j2 = await r2.json();
  assert.equal(j2.contact_id, j.contact_id);
  // Honeypot silently accepted.
  const r3 = await fetch(base + '/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Bot', phone: '6315550000', website: 'http://spam' }) });
  assert.equal((await r3.json()).ok, true);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM contacts WHERE phone = '+16315550000'").get().n, 0);
});

test('portal: passwordless login via code from outbox, invoices, Stripe checkout (mock)', async () => {
  const s = jar();
  let r = await s.fetch('/portal/login', form({ identifier: '631-555-0100' }));
  assert.equal(r.status, 200);
  const codeRow = db.prepare("SELECT json_extract(meta, '$.login_code') AS code FROM outbox WHERE channel = 'sms' AND to_addr = '+16315550100' AND json_extract(meta, '$.login_code') IS NOT NULL ORDER BY id DESC LIMIT 1").get();
  assert.ok(codeRow?.code, 'login code should be in the outbox');
  // Wrong code is rejected
  r = await s.fetch('/portal/login/verify', form({ identifier: '631-555-0100', code: '000000' }));
  assert.equal(r.status, 401);
  r = await s.fetch('/portal/login/verify', form({ identifier: '631-555-0100', code: codeRow.code }));
  assert.equal(r.status, 302);
  assert.equal(r.headers.get('location'), '/portal');
  r = await s.fetch('/portal');
  assert.equal(r.status, 200);
  const home = await r.text();
  assert.match(home, /Hi Demo/);
  assert.match(home, /631-871-5957/);

  r = await s.fetch('/portal/invoices');
  const html = await r.text();
  assert.match(html, /INV-1002/);
  assert.match(html, /Due on receipt/);
  const unpaid = db.prepare("SELECT * FROM invoices WHERE number = 'INV-1002'").get();
  r = await s.fetch(`/portal/invoices/${unpaid.id}`);
  const page = await r.text();
  assert.match(page, /Pay by card/);
  assert.match(page, /4% card processing fee/);
  assert.match(page, /Zelle/);
  assert.doesNotMatch(page, /thank you for the opportunity/i);

  // Print view has only phone/email/website in header, no street address
  r = await s.fetch(`/portal/invoices/${unpaid.id}/print`);
  const print = await r.text();
  assert.match(print, /Piets Technology Solutions Inc/);
  assert.match(print, /Service date/);

  // Stripe checkout (mock) -> redirect to mock checkout page; then simulate payment
  r = await s.fetch(`/portal/invoices/${unpaid.id}/pay`, { method: 'POST' });
  assert.equal(r.status, 302);
  const url = r.headers.get('location');
  assert.match(url, /\/mock\/stripe\/checkout\//);
  const sessionId = url.split('/').pop();
  const link = db.prepare("SELECT * FROM outbox WHERE channel = 'payment' ORDER BY id DESC LIMIT 1").get();
  const meta = JSON.parse(link.meta);
  assert.equal(meta.fee_cents, Math.round(unpaid.total_cents * 0.04));
  // Send the same thing Stripe would send to the webhook
  r = await fetch(base + '/webhooks/stripe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'checkout.session.completed', data: { object: { id: sessionId, mode: 'payment', metadata: { invoice_id: String(unpaid.id), amount_cents: String(meta.amount_cents), fee_cents: String(meta.fee_cents) } } } }) });
  assert.equal(r.status, 200);
  const paid = db.prepare('SELECT * FROM invoices WHERE id = ?').get(unpaid.id);
  assert.equal(paid.status, 'Paid');
  assert.equal(paid.paid_cents, unpaid.total_cents);

  // Quote approval creates a job
  const quote = db.prepare("SELECT * FROM quotes WHERE number = 'EST-1002'").get();
  r = await s.fetch(`/portal/quotes/${quote.id}/approve`, form({ signed_name: 'Demo Customer' }));
  assert.equal(r.status, 302);
  const q2 = db.prepare('SELECT * FROM quotes WHERE id = ?').get(quote.id);
  assert.equal(q2.status, 'Approved');
  assert.ok(q2.job_id);
  const log = db.prepare("SELECT * FROM change_log WHERE entity_type = 'quote' AND entity_id = ? ORDER BY id DESC LIMIT 2").all(quote.id);
  assert.ok(log.some((l) => /approved by "Demo Customer"/.test(l.message)));

  // Subscription checkout (price must be > 0)
  setSetting('plan_pro_price', '99');
  r = await s.fetch('/portal/plans/subscribe', form({ plan: 'Pro' }));
  assert.equal(r.status, 302);
  const sub = db.prepare("SELECT * FROM subscriptions WHERE plan = 'Pro' ORDER BY id DESC LIMIT 1").get();
  assert.equal(sub.status, 'pending');
  r = await fetch(base + '/webhooks/stripe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'checkout.session.completed', data: { object: { id: sub.stripe_session_id, mode: 'subscription', subscription: 'sub_test_1', metadata: { contact_id: String(sub.contact_id), plan: 'Pro' } } } }) });
  assert.equal(db.prepare('SELECT status FROM subscriptions WHERE id = ?').get(sub.id).status, 'active');
});

test('Twilio inbound webhook: QUOTE keyword creates a lead, STOP opts out, 6-digit codes rejected', async () => {
  let r = await fetch(base + '/webhooks/twilio/sms', form({ From: '+16315550188', To: '+16318715957', Body: 'QUOTE', MessageSid: 'SM1' }));
  assert.equal(r.status, 200);
  const xml = await r.text();
  assert.match(xml, /<Message>/);
  const c = db.prepare("SELECT * FROM contacts WHERE phone = '+16315550188'").get();
  assert.ok(c);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM leads WHERE contact_id = ? AND stage = 'New'").get(c.id).n, 1);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM messages WHERE contact_id = ? AND direction = 'in'").get(c.id).n, 1);

  r = await fetch(base + '/webhooks/twilio/sms', form({ From: '+16315550188', To: '+16318715957', Body: 'STOP', MessageSid: 'SM2' }));
  assert.match(await r.text(), /unsubscribed/i);
  assert.equal(db.prepare('SELECT sms_opt_in FROM contacts WHERE id = ?').get(c.id).sms_opt_in, 0);

  r = await fetch(base + '/webhooks/twilio/sms', form({ From: '+16315550188', To: '+16318715957', Body: 'START', MessageSid: 'SM3' }));
  assert.equal(db.prepare('SELECT sms_opt_in FROM contacts WHERE id = ?').get(c.id).sms_opt_in, 1);

  r = await fetch(base + '/webhooks/twilio/sms', form({ From: '+16315550188', To: '+16318715957', Body: '123456', MessageSid: 'SM4' }));
  assert.match(await r.text(), /enter your login code on the website/i);
});

test('automation engine: delayed step lands in jobs_queue and runs when due; stop_if guard works', async () => {
  const contact = db.prepare("SELECT * FROM contacts WHERE phone = '+16315550100'").get();
  const quote = db.prepare("SELECT * FROM quotes WHERE number = 'EST-1001'").get(); // Approved -> follow-up must stop
  const followUp = db.prepare("SELECT * FROM automations WHERE trigger = 'quote_sent'").get();
  const before = db.prepare("SELECT COUNT(*) AS n FROM jobs_queue WHERE status = 'pending'").get().n;
  const result = await runSteps(followUp.id, 0, { contactId: contact.id, quoteId: quote.id });
  assert.equal(result, 'waiting');
  const queued = db.prepare("SELECT * FROM jobs_queue WHERE status = 'pending' ORDER BY id DESC LIMIT 1").get();
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM jobs_queue WHERE status = 'pending'").get().n, before + 1);
  // Fast-forward: make it due now, process, and it must stop because the quote is not open.
  db.prepare("UPDATE jobs_queue SET run_at = ? WHERE id = ?").run(new Date(Date.now() - 1000).toISOString(), queued.id);
  const smsBefore = db.prepare("SELECT COUNT(*) AS n FROM outbox WHERE channel = 'sms' AND to_addr = '+16315550100'").get().n;
  const n = await processQueue();
  assert.ok(n >= 1);
  assert.equal(db.prepare('SELECT status FROM jobs_queue WHERE id = ?').get(queued.id).status, 'done');
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM outbox WHERE channel = 'sms' AND to_addr = '+16315550100'").get().n, smsBefore, 'no follow-up text for an approved quote');

  // Direct queued SMS runs and lands in the outbox.
  enqueue('send_sms', { to: '+16315550100', body: 'Queued hello', opts: { contactId: contact.id } }, new Date(Date.now() - 1000).toISOString());
  await processQueue();
  assert.ok(db.prepare("SELECT id FROM outbox WHERE channel = 'sms' AND body = 'Queued hello'").get());
});

test('admin: login, dashboard, pipeline stage move, campaign send, audit log', async () => {
  const s = jar();
  let r = await s.fetch('/admin');
  assert.equal(r.status, 302);
  r = await s.fetch('/admin/login', form({ email: 'admin@pietstechsolutions.com', password: 'change-me' }));
  assert.equal(r.status, 302);
  r = await s.fetch('/admin');
  assert.equal(r.status, 200);
  const dash = await r.text();
  assert.match(dash, /Unpaid invoices/);
  assert.match(dash, /MRR/);
  for (const p of ['/admin/contacts', '/admin/pipeline', '/admin/quotes', '/admin/jobs', '/admin/invoices', '/admin/conversations', '/admin/campaigns', '/admin/automations', '/admin/settings', '/admin/outbox', '/admin/audit']) {
    const rr = await s.fetch(p);
    assert.equal(rr.status, 200, p);
  }
  const lead = db.prepare("SELECT * FROM leads WHERE stage = 'New' ORDER BY id LIMIT 1").get();
  r = await s.fetch(`/admin/pipeline/${lead.id}/stage`, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ stage: 'Contacted' }) });
  assert.equal(r.status, 200);
  assert.equal(db.prepare('SELECT stage FROM leads WHERE id = ?').get(lead.id).stage, 'Contacted');
  assert.ok(db.prepare("SELECT id FROM change_log WHERE entity_type = 'lead' AND entity_id = ? AND message LIKE '%Contacted%'").get(lead.id));

  // Campaign: only opted-in contacts, footer appended
  r = await s.fetch('/admin/campaigns', form({ name: 'Test blast', channel: 'sms', body: 'Hi {{first_name}}, test blast.', throttle: '50' }));
  assert.equal(r.status, 302);
  const camp = db.prepare("SELECT * FROM campaigns WHERE name = 'Test blast'").get();
  r = await s.fetch(`/admin/campaigns/${camp.id}/send`, form({ when: 'now' }));
  assert.equal(r.status, 302);
  const { processCampaigns } = await import('../lib/campaigns.js');
  await processCampaigns();
  const c2 = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(camp.id);
  assert.equal(c2.status, 'Done');
  assert.ok(c2.sent_count >= 2);
  const optedOut = db.prepare("SELECT id FROM contacts WHERE phone = '+16315550102'").get();
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM campaign_recipients WHERE campaign_id = ? AND contact_id = ?').get(camp.id, optedOut.id).n, 0, 'opted-out contact excluded');
  const sent = db.prepare("SELECT body FROM outbox WHERE channel = 'sms' AND json_extract(meta, '$.campaignId') = ? LIMIT 1").get(camp.id);
  assert.match(sent.body, /Reply STOP to opt out/);

  // Record a manual payment on a new invoice
  const demo = db.prepare("SELECT * FROM contacts WHERE phone = '+16315550100'").get();
  r = await s.fetch('/admin/invoices', form({ contact_id: demo.id, service_date: '2026-09-01', invoice_date: '2026-09-02', item_description: 'Test line', item_qty: '2', item_price: '100', item_section: 'main', tax_rate: '8.75', notes: '' }));
  const invId = r.headers.get('location').split('/').pop();
  const inv = db.prepare('SELECT * FROM invoices WHERE id = ?').get(invId);
  assert.equal(inv.subtotal_cents, 20000);
  assert.equal(inv.tax_cents, 1750);
  assert.equal(inv.total_cents, 21750);
  assert.match(inv.number, /^INV-\d{4}$/);
  await s.fetch(`/admin/invoices/${invId}/send`, { method: 'POST' });
  r = await s.fetch(`/admin/invoices/${invId}/payment`, form({ amount: '100', method: 'Zelle', reference: 'Z123' }));
  assert.equal(db.prepare('SELECT status FROM invoices WHERE id = ?').get(invId).status, 'Partial');
  r = await s.fetch(`/admin/invoices/${invId}/payment`, form({ amount: '117.50', method: 'Check', reference: '#1001' }));
  assert.equal(db.prepare('SELECT status FROM invoices WHERE id = ?').get(invId).status, 'Paid');

  assert.ok(db.prepare("SELECT id FROM audit_log WHERE action = 'payment_recorded'").get());
  assert.ok(db.prepare("SELECT id FROM audit_log WHERE action = 'login' AND actor LIKE 'admin:%'").get());
});

test('POST /api/blog: 401 without token, writes markdown + rebuilds with token', async () => {
  const Blog = await import('../lib/blog.js');
  const slug = 'smoke-test-post-' + Date.now();
  const body = 'Smoke test cameras are the focus keyword of this paragraph.\n\n## Smoke test cameras heading\n\n' + 'Word '.repeat(50);
  const payload = { title: 'Smoke test cameras post', description: 'A test post about smoke test cameras.', slug, tags: ['test', 'cameras'], focusKeyword: 'smoke test cameras', body };
  let r = await fetch(base + '/api/blog', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  assert.equal(r.status, 401);
  r = await fetch(base + '/api/blog', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer wrong' }, body: JSON.stringify(payload) });
  assert.equal(r.status, 401);
  const mdPath = path.join(Blog.BLOG_DIR, slug + '.md');
  const htmlPath = path.join(Blog.BLOG_DIR, '..', '..', 'public', 'blog', slug + '.html');
  try {
    r = await fetch(base + '/api/blog', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer test-blog-token' }, body: JSON.stringify(payload) });
    const j = await r.json();
    assert.equal(r.status, 201, JSON.stringify(j));
    assert.equal(j.ok, true);
    assert.equal(j.slug, slug);
    assert.ok(fs.existsSync(mdPath), 'markdown file written');
    const src = fs.readFileSync(mdPath, 'utf8');
    assert.match(src, /^---\ntitle: "Smoke test cameras post"/);
    assert.match(src, /tags: \[test, cameras\]/);
    assert.match(src, /focusKeyword: smoke test cameras/);
    assert.equal(j.build.ok, true, j.build.output);
    assert.ok(fs.existsSync(htmlPath), 'public/blog html rendered by build');
    assert.ok(j.seo.checks.find((c) => c.label === 'Keyword in title').ok);
    assert.ok(j.seo.checks.find((c) => c.label === 'Keyword in an H2 heading').ok);
    // Archive moves (never deletes)
    assert.equal(Blog.archivePost(slug, 'test'), true);
    assert.ok(!fs.existsSync(mdPath));
    assert.ok(fs.existsSync(path.join(Blog.ARCHIVE_DIR, slug + '.md')));
    // Admin blog page lists posts
    const s = jar();
    await s.fetch('/admin/login', form({ email: 'admin@pietstechsolutions.com', password: 'change-me' }));
    const page = await (await s.fetch('/admin/blog')).text();
    assert.match(page, /content\/blog/);
  } finally {
    // Clean up the test's own artifacts, then rebuild so the blog index/sitemap are fresh.
    for (const f of [mdPath, path.join(Blog.ARCHIVE_DIR, slug + '.md'), htmlPath]) { try { fs.unlinkSync(f); } catch { /* ignore */ } }
    try { if (fs.readdirSync(Blog.ARCHIVE_DIR).length === 0) fs.rmdirSync(Blog.ARCHIVE_DIR); } catch { /* ignore */ }
    await Blog.runBuild();
  }
});

// ---------------------------------------------------------------- Integrations: API, webhooks, AI agents
const API = { 'content-type': 'application/json', authorization: 'Bearer test-api-token' };
const api = (method, p, body) => fetch(base + '/api/v1' + p, { method, headers: API, body: body === undefined ? undefined : JSON.stringify(body) }).then(async (r) => ({ status: r.status, json: await r.json() }));

// Local HTTP server that plays Zapier / a custom AI agent URL.
const received = [];
let hookServer; let hookBase;
before(async () => {
  hookServer = http.createServer((req, res) => {
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', () => {
      received.push({ url: req.url, headers: req.headers, raw, body: (() => { try { return JSON.parse(raw); } catch { return null; } })() });
      if (req.url.startsWith('/agent')) {
        res.setHeader('content-type', 'application/json');
        return res.end(JSON.stringify({ output: 'hello from custom agent', tool_calls: [{ name: 'tag_contact', arguments: { tag: 'custom-agent' } }] }));
      }
      if (req.url.startsWith('/fail')) { res.statusCode = 500; return res.end('nope'); }
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ status: 'success', attempt: 'zap-123' }));
    });
  });
  await new Promise((resolve) => hookServer.listen(0, '127.0.0.1', resolve));
  hookBase = `http://127.0.0.1:${hookServer.address().port}`;
});
after(async () => { await new Promise((r) => hookServer.close(r)); });
const waitFor = async (fn, ms = 3000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const v = fn(); if (v) return v; await new Promise((r) => setTimeout(r, 25)); } return fn(); };

test('API v1: 401 without key, named keys, contact + lead, notes/tags, events poll returns new_lead', async () => {
  let r = await fetch(base + '/api/v1/contacts', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
  assert.equal(r.status, 401);
  assert.equal((await r.json()).ok, false);
  r = await fetch(base + '/api/v1/ping', { headers: { authorization: 'Bearer wrong-key' } });
  assert.equal(r.status, 401);
  // Named key from Admin -> Integrations works and is only stored hashed.
  const { createApiKey, verifyApiKey } = await import('../lib/apikeys.js');
  const k = createApiKey('Zapier test', 'test');
  assert.match(k.key, /^pk_/);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM api_keys WHERE key_hash = ?').get(k.key).n, 0, 'plain key must not be stored');
  assert.equal(verifyApiKey(k.key)?.name, 'Zapier test');
  r = await fetch(base + '/api/v1/ping', { headers: { authorization: 'Bearer ' + k.key } });
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('x-ratelimit-limit'), '120');

  const sinceId = db.prepare('SELECT COALESCE(MAX(id), 0) AS id FROM events').get().id;
  // Upsert contact
  let out = await api('POST', '/contacts', { name: 'Zap Contact', phone: '631-555-0199', email: 'zap@example.com', town: 'Commack', tags: ['zapier', 'cameras'] });
  assert.equal(out.status, 201, JSON.stringify(out.json));
  assert.equal(out.json.ok, true);
  assert.equal(out.json.data.created, true);
  const contactId = out.json.data.contact.id;
  assert.equal(out.json.data.contact.phone, '+16315550199');
  // Same phone again -> matched, fields updated, not duplicated
  out = await api('POST', '/contacts', { phone: '6315550199', town: 'Kings Park', tags: 'vip' });
  assert.equal(out.status, 200);
  assert.equal(out.json.data.created, false);
  assert.equal(out.json.data.contact.id, contactId);
  assert.equal(out.json.data.contact.town, 'Kings Park');
  assert.ok(out.json.data.contact.tags.includes('vip') && out.json.data.contact.tags.includes('zapier'));
  // Validation error shape
  out = await api('POST', '/contacts', { name: 'Nobody' });
  assert.equal(out.status, 400);
  assert.equal(out.json.ok, false);
  assert.match(out.json.error, /phone/i);
  // Search + get
  out = await api('GET', '/contacts?q=Zap');
  assert.ok(out.json.data.contacts.some((c) => c.id === contactId));
  out = await api('POST', `/contacts/${contactId}/notes`, { body: 'Came from Zapier' });
  assert.equal(out.status, 201);
  out = await api('POST', `/contacts/${contactId}/tags`, { tag: 'hot', remove: ['vip'] });
  assert.ok(out.json.data.tags.includes('hot') && !out.json.data.tags.includes('vip'));
  out = await api('GET', `/contacts/${contactId}`);
  assert.equal(out.json.data.notes[0].body, 'Came from Zapier');
  // Lead via API fires new_lead (automation texts the lead) and shows in the events poll
  out = await api('POST', '/leads', { contactId, service: 'Wi-Fi', message: 'Dead zones upstairs', source: 'Facebook Lead Ads' });
  assert.equal(out.status, 201, JSON.stringify(out.json));
  const leadId = out.json.data.lead.id;
  assert.equal(out.json.data.lead.stage, 'New');
  out = await api('POST', `/leads/${leadId}/stage`, { stage: 'Contacted' });
  assert.equal(out.json.data.lead.stage, 'Contacted');
  out = await api('POST', `/leads/${leadId}/stage`, { stage: 'Bogus' });
  assert.equal(out.status, 400);
  out = await api('GET', `/events?since=${sinceId}`);
  assert.equal(out.json.ok, true);
  const names = out.json.data.events.map((e) => e.event);
  assert.ok(names.includes('contact_created'), 'contact_created event');
  assert.ok(names.includes('contact_updated'), 'contact_updated event');
  assert.ok(names.includes('new_lead'), 'new_lead event: ' + names.join(','));
  assert.ok(names.includes('lead_stage_changed'), 'lead_stage_changed event');
  const ev = out.json.data.events.find((e) => e.event === 'new_lead');
  assert.equal(ev.data.contact.id, contactId);
  assert.equal(ev.data.lead.service, 'Wi-Fi');
  assert.match(ev.links.admin, /\/admin\/pipeline$/);
  assert.ok(out.json.data.next_since >= ev.id);
  // flat=1 gives a bare array for Zapier's Retrieve Poll
  const flat = await fetch(base + `/api/v1/events?since=${sinceId}&event=new_lead&flat=1`, { headers: API }).then((x) => x.json());
  assert.ok(Array.isArray(flat) && flat.length >= 1 && flat[0].event === 'new_lead');
  // SMS: quiet hours are open (set in before()), so it sends; opt-out refused
  out = await api('POST', '/messages/sms', { contactId, body: 'Hello from the API' });
  assert.equal(out.status, 201, JSON.stringify(out.json));
  assert.ok(db.prepare("SELECT id FROM outbox WHERE channel = 'sms' AND body = 'Hello from the API'").get());
  const optedOut = db.prepare("SELECT id FROM contacts WHERE phone = '+16315550102'").get();
  out = await api('POST', '/messages/sms', { contactId: optedOut.id, body: 'Should be blocked' });
  assert.equal(out.status, 409);
  // Quote -> send, invoice -> payment, job
  out = await api('POST', '/quotes', { contactId, title: 'Wi-Fi mesh', items: [{ description: 'Mesh node', qty: 3, unit_price: 150 }, { description: 'Labor', qty: 2, unit_price: 125 }] });
  assert.equal(out.status, 201, JSON.stringify(out.json));
  assert.equal(out.json.data.quote.subtotal_cents, 70000);
  const quoteId = out.json.data.quote.id;
  out = await api('POST', `/quotes/${quoteId}/send`);
  assert.equal(out.json.data.quote.status, 'Sent');
  out = await api('POST', '/invoices', { contactId, items: [{ description: 'Service call', qty: 1, unit_price: 100 }], tax_rate: 0, send: true });
  assert.equal(out.status, 201, JSON.stringify(out.json));
  const invId = out.json.data.invoice.id;
  assert.equal(out.json.data.invoice.status, 'Sent');
  out = await api('POST', `/invoices/${invId}/payments`, { amount: 100, method: 'Zelle', reference: 'Z-1' });
  assert.equal(out.json.data.invoice.status, 'Paid');
  out = await api('POST', '/jobs', { contactId, title: 'Mesh install', scheduled_at: '2026-10-02T14:00:00-04:00', notes: 'Bring 3 nodes' });
  assert.equal(out.status, 201, JSON.stringify(out.json));
  assert.equal(out.json.data.job.status, 'Scheduled');
  out = await api('GET', '/jobs?contactId=' + contactId);
  assert.ok(out.json.data.jobs.some((j) => j.title === 'Mesh install'));
  out = await api('GET', `/events?since=${sinceId}`);
  const later = out.json.data.events.map((e) => e.event);
  for (const n of ['quote_sent', 'invoice_sent', 'payment_recorded', 'invoice_paid', 'job_scheduled']) assert.ok(later.includes(n), n + ' event');
  // Unknown route is JSON 404
  out = await api('GET', '/nope');
  assert.equal(out.status, 404);
  assert.equal(out.json.ok, false);
});

test('outbound webhook: fires to a local server with valid HMAC signature, retries failures via jobs_queue, test-fire', async () => {
  db.prepare("INSERT INTO webhooks (name, url, events, secret, enabled, created_at) VALUES ('Zap catch', ?, '[\"new_lead\",\"invoice_paid\"]', 'shh-secret', 1, ?)").run(hookBase + '/catch', new Date().toISOString());
  const hook = db.prepare("SELECT * FROM webhooks WHERE name = 'Zap catch'").get();
  received.length = 0;
  const out = await api('POST', '/leads', { name: 'Hook Lead', phone: '631-555-0166', service: 'Cameras', source: 'test' });
  assert.equal(out.status, 201);
  const got = await waitFor(() => received.find((x) => x.url === '/catch'));
  assert.ok(got, 'webhook should be delivered');
  assert.equal(got.headers['content-type'], 'application/json');
  assert.equal(got.headers['x-piets-event'], 'new_lead');
  assert.equal(got.body.event, 'new_lead');
  assert.equal(got.body.data.contact.phone, '+16315550166');
  assert.equal(got.body.data.lead.service, 'Cameras');
  assert.ok(got.body.id > 0 && got.body.timestamp);
  const expected = 'sha256=' + crypto.createHmac('sha256', 'shh-secret').update(got.raw).digest('hex');
  assert.equal(got.headers['x-piets-signature'], expected, 'HMAC signature must match the raw body');
  // Only subscribed events are delivered: a stage change must not hit this hook.
  await api('POST', `/leads/${out.json.data.lead.id}/stage`, { stage: 'Lost' });
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(received.filter((x) => x.url === '/catch' && x.body?.event === 'lead_stage_changed').length, 0);
  const del = await waitFor(() => db.prepare("SELECT * FROM webhook_deliveries WHERE webhook_id = ? AND status = 'ok'").get(hook.id));
  assert.ok(del, 'delivery logged');
  assert.equal(db.prepare('SELECT last_status, fail_count FROM webhooks WHERE id = ?').get(hook.id).fail_count, 0);
  // Sandbox: a copy is in the Outbox as channel "webhook"
  assert.ok(db.prepare("SELECT id FROM outbox WHERE channel = 'webhook' AND to_addr = ?").get(hookBase + '/catch'));

  // Failing endpoint -> retry queued in jobs_queue
  db.prepare("INSERT INTO webhooks (name, url, events, secret, enabled, created_at) VALUES ('Broken', ?, '[\"*\"]', '', 1, ?)").run(hookBase + '/fail', new Date().toISOString());
  const broken = db.prepare("SELECT * FROM webhooks WHERE name = 'Broken'").get();
  const { emitEvent, testWebhook } = await import('../lib/events.js');
  const ev = emitEvent('contact_updated', { contactId: out.json.data.contact.id });
  await ev.deliveries;
  const retry = db.prepare("SELECT * FROM jobs_queue WHERE type = 'webhook' AND status = 'pending' ORDER BY id DESC LIMIT 1").get();
  assert.ok(retry, 'retry should be queued');
  const payload = JSON.parse(retry.payload);
  assert.equal(payload.webhookId, broken.id);
  assert.equal(payload.attempt, 2);
  assert.equal(db.prepare('SELECT fail_count FROM webhooks WHERE id = ?').get(broken.id).fail_count, 1);
  // Fast-forward the retry through the queue; still failing -> attempt 3 queued
  db.prepare('UPDATE jobs_queue SET run_at = ? WHERE id = ?').run(new Date(Date.now() - 1000).toISOString(), retry.id);
  await processQueue();
  assert.equal(db.prepare('SELECT status FROM jobs_queue WHERE id = ?').get(retry.id).status, 'done');
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM webhook_deliveries WHERE webhook_id = ? AND attempt = 2").get(broken.id).n, 1);
  db.prepare('UPDATE webhooks SET archived = 1, enabled = 0 WHERE id = ?').run(broken.id);
  // Admin test-fire
  const t = await testWebhook(hook.id, 'invoice_paid');
  assert.equal(t.ok, true);
  const testReq = received.find((x) => x.body?.test === true && x.body.event === 'invoice_paid');
  assert.ok(testReq, 'test payload delivered');
});

test('AI agents: mock reply in sandbox writes a draft; custom_url provider round-trips; inbound SMS -> lead_qualifier', async () => {
  const contact = db.prepare("SELECT * FROM contacts WHERE phone = '+16315550100'").get();
  const drafts0 = db.prepare("SELECT COUNT(*) AS n FROM messages WHERE contact_id = ? AND status = 'draft'").get(contact.id).n;
  let out = await api('POST', '/ai/run', { agent: 'sms_reply_drafter', contactId: contact.id, input: { text: 'Hi, do you install doorbell cameras?' } });
  assert.equal(out.status, 200, JSON.stringify(out.json));
  assert.equal(out.json.ok, true);
  assert.equal(out.json.data.mock, true);
  assert.match(out.json.data.output, /631-871-5957/);
  assert.match(out.json.data.output, /free demo/i);
  assert.equal(out.json.data.autopilot.mode, 'draft');
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM messages WHERE contact_id = ? AND status = 'draft'").get(contact.id).n, drafts0 + 1, 'draft-only autopilot saves a draft');
  assert.ok(db.prepare("SELECT id FROM outbox WHERE channel = 'ai' AND to_addr = 'sms_reply_drafter'").get(), 'mock AI logged to outbox');
  assert.ok(db.prepare("SELECT id FROM ai_runs WHERE id = ?").get(out.json.data.run_id));
  // Unknown agent
  out = await api('POST', '/ai/run', { agent: 'nope' });
  assert.equal(out.status, 404);
  // dryRun does not create a draft
  out = await api('POST', '/ai/run', { agent: 'quote_summarizer', contactId: contact.id, input: { notes: 'Mount 65in TV over fireplace. Hide HDMI in wall. Add doorbell cam.' }, dryRun: true });
  assert.equal(out.status, 200);
  assert.match(out.json.data.output, /Scope of work/);

  // Owner approves the draft in Admin -> Conversations
  const s = jar();
  await s.fetch('/admin/login', form({ email: 'admin@pietstechsolutions.com', password: 'change-me' }));
  let page = await (await s.fetch(`/admin/conversations/${contact.id}`)).text();
  assert.match(page, /AI draft/);
  const draft = db.prepare("SELECT * FROM messages WHERE contact_id = ? AND status = 'draft' ORDER BY id DESC LIMIT 1").get(contact.id);
  let r = await s.fetch(`/admin/conversations/${contact.id}/drafts/${draft.id}/send`, form({ body: draft.body + ' (edited)' }));
  assert.equal(r.status, 302);
  assert.equal(db.prepare('SELECT status FROM messages WHERE id = ?').get(draft.id).status, 'draft_sent');
  assert.ok(db.prepare("SELECT id FROM outbox WHERE channel = 'sms' AND body LIKE '%(edited)'").get());

  // custom_url provider: POST to our local server, use its output and tool_calls
  const { saveAgent, runAgent } = await import('../lib/ai.js');
  const id = saveAgent(null, { name: 'custom_test', provider: 'custom_url', custom_url: hookBase + '/agent', system_prompt: 'echo', tools: ['tag_contact'], autopilot: 'off', enabled: 1 }, 'test');
  out = await api('POST', '/ai/run', { agent: 'custom_test', contactId: contact.id, input: { text: 'ping' } });
  assert.equal(out.status, 200, JSON.stringify(out.json));
  assert.equal(out.json.data.mock, false);
  assert.equal(out.json.data.provider, 'custom_url');
  assert.equal(out.json.data.output, 'hello from custom agent');
  assert.equal(out.json.data.tool_calls[0].name, 'tag_contact');
  assert.ok(JSON.parse(db.prepare('SELECT tags FROM contacts WHERE id = ?').get(contact.id).tags).includes('custom-agent'));
  const sent = received.find((x) => x.url === '/agent');
  assert.equal(sent.body.agent, 'custom_test');
  assert.equal(sent.body.input.text, 'ping');
  assert.equal(sent.body.contact.id, contact.id);
  const direct = await runAgent(id, { input: { text: 'again' }, contactId: contact.id });
  assert.equal(direct.ok, true);

  // Inbound SMS -> lead_qualifier (queued, then processed) leaves a draft with the missing questions and tags the lead
  const from = '+16315550144';
  r = await fetch(base + '/webhooks/twilio/sms', form({ From: from, To: '+16318715957', Body: 'Hi I need cameras installed asap at my house', MessageSid: 'SM9' }));
  assert.equal(r.status, 200);
  const c2 = db.prepare('SELECT * FROM contacts WHERE phone = ?').get(from);
  await processQueue();
  const qd = await waitFor(() => db.prepare("SELECT * FROM messages WHERE contact_id = ? AND status = 'draft'").get(c2.id));
  assert.ok(qd, 'lead_qualifier draft created from inbound SMS');
  assert.match(qd.body, /free estimate/i);
  assert.match(qd.subject, /lead_qualifier/);
  assert.ok(JSON.parse(db.prepare('SELECT tags FROM contacts WHERE id = ?').get(c2.id).tags).includes('hot'), 'asap -> hot');
  assert.ok(db.prepare("SELECT id FROM events WHERE name = 'inbound_sms' AND contact_id = ?").get(c2.id), 'inbound_sms event');
  // Turning autopilot off stops the hook
  db.prepare("UPDATE ai_agents SET autopilot = 'off' WHERE name = 'lead_qualifier'").run();
  const q0 = db.prepare("SELECT COUNT(*) AS n FROM jobs_queue WHERE type = 'ai_agent'").get().n;
  await fetch(base + '/webhooks/twilio/sms', form({ From: from, To: '+16318715957', Body: 'another text', MessageSid: 'SM10' }));
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM jobs_queue WHERE type = 'ai_agent'").get().n, q0);
  db.prepare("UPDATE ai_agents SET autopilot = 'draft' WHERE name = 'lead_qualifier'").run();
});

test('automation steps webhook and ai_agent execute; API can trigger an automation', async () => {
  const contact = db.prepare("SELECT * FROM contacts WHERE phone = '+16315550100'").get();
  const steps = [{ type: 'webhook', url: hookBase + '/auto', secret: 'auto-secret' }, { type: 'ai_agent', agent: 'quote_summarizer' }, { type: 'add_tag', tag: 'automated' }];
  const r = db.prepare("INSERT INTO automations (name, trigger, trigger_keyword, steps, enabled, created_at, updated_at) VALUES ('Zap + AI', 'job_complete', '', ?, 1, ?, ?)").run(JSON.stringify(steps), new Date().toISOString(), new Date().toISOString());
  const runs0 = db.prepare("SELECT COUNT(*) AS n FROM ai_runs WHERE agent = 'quote_summarizer'").get().n;
  const result = await runSteps(Number(r.lastInsertRowid), 0, { contactId: contact.id, text: 'Install 4 cameras and an NVR in the garage' });
  assert.equal(result, 'done');
  const got = received.find((x) => x.url === '/auto');
  assert.ok(got, 'automation webhook step delivered');
  assert.equal(got.body.event, 'automation_step');
  assert.equal(got.body.data.contact.id, contact.id);
  assert.equal(got.body.data.automation, 'Zap + AI');
  assert.equal(got.headers['x-piets-signature'], 'sha256=' + crypto.createHmac('sha256', 'auto-secret').update(got.raw).digest('hex'));
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM ai_runs WHERE agent = 'quote_summarizer'").get().n, runs0 + 1, 'ai_agent step ran');
  assert.ok(JSON.parse(db.prepare('SELECT tags FROM contacts WHERE id = ?').get(contact.id).tags).includes('automated'));
  assert.ok(db.prepare("SELECT id FROM audit_log WHERE action = 'automation_webhook_sent'").get());
  // Trigger the same automation through the API
  received.length = 0;
  const out = await api('POST', `/automations/${r.lastInsertRowid}/trigger`, { contactId: contact.id, text: 'via api' });
  assert.equal(out.status, 200, JSON.stringify(out.json));
  assert.equal(out.json.data.result, 'done');
  assert.ok(received.find((x) => x.url === '/auto'));
  // Admin Integrations page renders with keys, hooks, agents and recipes
  const s = jar();
  await s.fetch('/admin/login', form({ email: 'admin@pietstechsolutions.com', password: 'change-me' }));
  const page = await (await s.fetch('/admin/integrations')).text();
  assert.match(page, /Zapier recipes/);
  assert.match(page, /sms_reply_drafter/);
  assert.match(page, /Zap catch/);
  assert.match(page, /hooks\.zapier\.com/);
  let rr = await s.fetch('/admin/integrations/keys', form({ name: 'From admin' }));
  assert.equal(rr.status, 302);
  const shown = await (await s.fetch('/admin/integrations')).text();
  assert.match(shown, /Copy this key now/);
  assert.match(shown, /pk_[A-Za-z0-9_-]+/);
  const key = shown.match(/value="(pk_[A-Za-z0-9_-]+)"/)[1];
  rr = await fetch(base + '/api/v1/ping', { headers: { authorization: 'Bearer ' + key } });
  assert.equal(rr.status, 200);
  const row = db.prepare("SELECT id FROM api_keys WHERE name = 'From admin'").get();
  await s.fetch(`/admin/integrations/keys/${row.id}/revoke`, { method: 'POST' });
  rr = await fetch(base + '/api/v1/ping', { headers: { authorization: 'Bearer ' + key } });
  assert.equal(rr.status, 401, 'revoked key is rejected');
  // Agent test box
  const agent = db.prepare("SELECT id FROM ai_agents WHERE name = 'sms_reply_drafter'").get();
  rr = await s.fetch(`/admin/integrations/agents/${agent.id}/test`, form({ input: 'Do you do Wi-Fi?', contact_id: String(contact.id) }));
  assert.equal(rr.status, 302);
  const after = await (await s.fetch('/admin/integrations')).text();
  assert.match(after, /Result/);
  assert.match(after, /free demo/i);
});
