// Public API: lead capture, health check, mock Stripe checkout (sandbox only).
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { config } from '../config.js';
import { getDb } from '../db.js';
import { createLead, recordPayment, getInvoice } from '../lib/services.js';
import { normalizePhone, isEmail, nowIso, audit, parseJson, money } from '../lib/util.js';
import { providerStatus } from '../lib/providers.js';
import * as Blog from '../lib/blog.js';
import crypto from 'node:crypto';
import { emitEvent } from '../lib/events.js';

const router = Router();

router.get('/healthz', (req, res) => {
  let dbOk = true;
  try { getDb().prepare('SELECT 1').get(); } catch { dbOk = false; }
  res.json({ ok: dbOk, status: dbOk ? 'healthy' : 'db_error', time: nowIso(), ...providerStatus(), version: 1 });
});

const leadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false, message: { ok: false, error: 'Too many requests, please try again later.' } });

const leadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  phone: z.string().trim().max(40).optional().default(''),
  email: z.string().trim().max(160).optional().default(''),
  town: z.string().trim().max(80).optional().default(''),
  service: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  source: z.string().trim().max(80).optional().default('Website'),
  website: z.string().max(200).optional().default(''), // honeypot
  company_url: z.string().max(200).optional().default('') // second honeypot
}).passthrough();

router.post('/api/leads', leadLimiter, async (req, res, next) => {
  try {
    const parsed = leadSchema.safeParse(req.body || {});
    const wantsHtml = !req.is('json') && req.accepts(['json', 'html']) === 'html';
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(', ');
      if (wantsHtml) return res.redirect('/?lead=error');
      return res.status(400).json({ ok: false, error: msg });
    }
    const d = parsed.data;
    // Honeypot: bots fill hidden fields. Pretend success.
    if (d.website || d.company_url) return res.json({ ok: true });
    const phone = normalizePhone(d.phone);
    const email = isEmail(d.email) ? d.email.toLowerCase() : '';
    if (!phone && !email) {
      if (wantsHtml) return res.redirect('/?lead=error');
      return res.status(400).json({ ok: false, error: 'A phone number or email is required.' });
    }
    const { lead, contact } = await createLead({ name: d.name, phone, email, town: d.town, service: d.service, message: d.message, source: d.source || 'Website' });
    if (wantsHtml) return res.redirect(req.get('referer') ? new URL(req.get('referer')).pathname + '?lead=sent' : '/?lead=sent');
    res.json({ ok: true, lead_id: lead.id, contact_id: contact.id });
  } catch (e) { next(e); }
});

// ---- Blog API: POST /api/blog with Authorization: Bearer <BLOG_API_TOKEN> ----
router.post('/api/blog', async (req, res, next) => {
  try {
    const token = config.blogApiToken;
    const given = (req.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
    const ok = token && given && given.length === token.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(token));
    if (!ok) { audit('api', 'blog_unauthorized', 'blog', null, req.ip); return res.status(401).json({ ok: false, error: token ? 'Invalid or missing bearer token' : 'BLOG_API_TOKEN is not set on the server' }); }
    const r = await publishBlogPost(req.body || {}, 'api');
    res.status(r.status).json(r.body);
  } catch (e) { next(e); }
});

/** Shared by POST /api/blog and POST /api/v1/blog. Returns { status, body }. */
export async function publishBlogPost(b, actor = 'api') {
  const existing = b.slug ? Blog.getPost(b.slug) : null;
  const { errors, post } = Blog.validatePost({ ...b, tags: Array.isArray(b.tags) ? b.tags : b.tags }, { existingSlug: existing?.slug });
  if (errors.length) return { status: 400, body: { ok: false, error: errors.join(', '), errors } };
  Blog.savePost(post, { existingSlug: existing?.slug, actor });
  const build = await Blog.runBuild();
  const url = `${config.baseUrl}/blog/${post.slug}.html`;
  emitEvent('blog_published', { post: { title: post.title, slug: post.slug, description: post.description, tags: post.tags, url, updated: !!existing } });
  return { status: existing ? 200 : 201, body: { ok: true, slug: post.slug, url, updated: !!existing, build: { ok: build.ok, output: build.output.slice(0, 500) }, seo: Blog.seoCheck(post) } };
}

// ---- Sandbox-only mock Stripe Checkout page ----
router.get('/mock/stripe/checkout/:sessionId', (req, res) => {
  if (config.providers.stripe !== 'mock') return res.status(404).send('Not available');
  const db = getDb();
  const row = db.prepare('SELECT * FROM outbox WHERE channel = ? AND json_extract(meta, "$.session_id") = ? ORDER BY id DESC LIMIT 1').get('payment', req.params.sessionId);
  if (!row) return res.status(404).send('Unknown mock session');
  const meta = parseJson(row.meta, {});
  res.page('portal', 'mock-checkout', { title: 'Mock Stripe Checkout', meta, sessionId: req.params.sessionId, money });
});

router.post('/mock/stripe/checkout/:sessionId/pay', async (req, res, next) => {
  try {
    if (config.providers.stripe !== 'mock') return res.status(404).send('Not available');
    const db = getDb();
    const row = db.prepare('SELECT * FROM outbox WHERE channel = ? AND json_extract(meta, "$.session_id") = ? ORDER BY id DESC LIMIT 1').get('payment', req.params.sessionId);
    if (!row) return res.status(404).send('Unknown mock session');
    const meta = parseJson(row.meta, {});
    const result = applyCheckoutCompleted({ id: req.params.sessionId, mode: meta.mode, metadata: meta.mode === 'payment'
      ? { invoice_id: String(meta.invoice_id), amount_cents: String(meta.amount_cents), fee_cents: String(meta.fee_cents) }
      : { contact_id: String(meta.contact_id), plan: meta.plan }, subscription: meta.mode === 'subscription' ? 'sub_mock_' + req.params.sessionId.slice(-6) : null });
    audit('system', 'mock_checkout_paid', 'stripe', null, { sessionId: req.params.sessionId, result });
    res.redirect(meta.mode === 'payment' ? `/portal/invoices/${meta.invoice_id}?paid=1` : '/portal/plans?subscribed=1');
  } catch (e) { next(e); }
});

/** Shared with the Stripe webhook: apply a checkout.session.completed event. */
export function applyCheckoutCompleted(session) {
  const db = getDb();
  const md = session.metadata || {};
  if (session.mode === 'payment' && md.invoice_id) {
    const inv = getInvoice(Number(md.invoice_id));
    if (!inv) return { ok: false, error: 'invoice not found' };
    const already = db.prepare('SELECT id FROM payments WHERE provider_id = ?').get(session.id);
    if (already) return { ok: true, duplicate: true };
    const amount = Number(md.amount_cents) || inv.due_cents;
    recordPayment(inv.id, { amount_cents: amount, fee_cents: Number(md.fee_cents) || 0, method: 'Card', reference: 'Stripe ' + session.id, provider_id: session.id }, 'stripe');
    return { ok: true, invoice_id: inv.id };
  }
  if (session.mode === 'subscription') {
    const sub = db.prepare('SELECT * FROM subscriptions WHERE stripe_session_id = ?').get(session.id)
      || (md.contact_id ? db.prepare("SELECT * FROM subscriptions WHERE contact_id = ? AND status = 'pending' ORDER BY id DESC LIMIT 1").get(Number(md.contact_id)) : null);
    if (sub) {
      db.prepare("UPDATE subscriptions SET status = 'active', stripe_subscription_id = ?, started_at = COALESCE(started_at, ?), updated_at = ? WHERE id = ?")
        .run(typeof session.subscription === 'string' ? session.subscription : session.subscription?.id || null, nowIso(), nowIso(), sub.id);
      // Only one active plan per contact.
      db.prepare("UPDATE subscriptions SET status = 'canceled', ended_at = ? WHERE contact_id = ? AND id != ? AND status IN ('active', 'cancel_requested', 'pending')").run(nowIso(), sub.contact_id, sub.id);
      audit('stripe', 'subscription_active', 'subscription', sub.id);
      emitEvent('subscription_started', { contactId: sub.contact_id, subscriptionId: sub.id });
      return { ok: true, subscription_id: sub.id };
    }
  }
  return { ok: true, ignored: true };
}

export default router;
