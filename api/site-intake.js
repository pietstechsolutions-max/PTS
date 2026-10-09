// Vercel serverless function: receives a Site Studio demo / invoice request and emails it to Piets
// with the client's logo, photos and their demo site attached (open demo.html next to the photos).
// Piets Technology Solutions Inc · 631-871-5957
// Uses the same SMTP_USER / SMTP_PASS / OWNER_EMAIL env vars as api/leads.js.
import nodemailer from 'nodemailer';

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'pietstechsolutions@gmail.com';
const PHONE = '631-871-5957';
const CTRL = new RegExp('[\\u0000-\\u001f\\u007f]', 'g');
const clean = (v, max = 300) => String(v == null ? '' : v).replace(CTRL, ' ').trim().slice(0, max);
const keep = (v, max = 2000) => String(v == null ? '' : v).replace(new RegExp('[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f\\u007f]', 'g'), ' ').trim().slice(0, max);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ACTIONS = { demo: 'New website demo', invoice: 'INVOICE REQUEST', deposit_click: 'Deposit checkout opened' };
const TIERS = { starter: 'Starter', pro: 'Pro', premium: 'Premium', shabang: 'THE WHOLE SHABANG' }; // prices live in public/assets/site-studio/studio-config.js

export const config = { api: { bodyParser: { sizeLimit: '4.5mb' } } };

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const raw = await new Promise((resolve, reject) => {
    let d = ''; req.on('data', c => { d += c; if (d.length > 4700000) req.destroy(); });
    req.on('end', () => resolve(d)); req.on('error', reject);
  });
  try { return JSON.parse(raw || '{}'); } catch { return {}; }
}

export function summarize(body) {
  const it = body.intake || {};
  const action = ACTIONS[body.action] ? body.action : 'demo';
  const tier = TIERS[body.tier] || clean(body.tier, 40);
  const rows = [
    ['Action', ACTIONS[action] + (tier ? ' · ' + tier : '')],
    ['Contact', clean(it.cname, 80)], ['Mobile', clean(it.cmobile, 30)], ['Email', clean(it.cemail, 120) || '-'],
    ['Business', clean(it.biz, 60)], ['Trade', clean(it.trade, 30)], ['Business phone', clean(it.phone, 30)],
    ['Website language', clean(it.lang || 'en', 5)], ['OK to text/email', it.consent ? 'Yes' : 'No (call only)'], ['Town', clean(it.town, 60)], ['Towns served', (it.areas || []).map(a => clean(a, 40)).join(', ') || '-'],
    ['Owner', clean(it.owner, 40) || '-'], ['Years', clean(it.years, 3) || '-'], ['Hours', clean(it.hours, 40)],
    ['Services', (it.services || []).map(s => clean(s, 40)).join(', ')], ['Different', keep(it.diff, 600) || '-'],
    ['Website', clean(it.site, 200) || '-'], ['Facebook', clean(it.fb, 200) || '-'], ['Instagram', clean(it.ig, 200) || '-'],
    ['Google', (clean(it.rating, 4) || '-') + ' / ' + (clean(it.reviewsCount, 6) || '-') + ' reviews'],
    ['Style', clean(it.style, 10) + ' · ' + clean(it.color, 10) + ' · ' + (it.vibe || []).map(v => clean(v, 30)).join(', ')],
    ['Logo / photos', (it.hasLogo ? 'logo' : 'no logo') + ' · ' + (Number(it.photoCount) || 0) + ' photos'],
    ['Copy', body.aiUsed ? 'AI-written' : 'Template'], ['OK to contact', it.cname ? 'yes' : '-']
  ];
  return { action, tier, rows, it };
}

export function attachmentsFrom(body) {
  const out = [];
  let total = 0;
  for (const f of (Array.isArray(body.files) ? body.files : []).slice(0, 9)) {
    const name = clean(f && f.name, 40).replace(/[^A-Za-z0-9._-]/g, '');
    const m = /^data:(image\/(png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(f && f.data || ''));
    if (!name || !m) continue;
    const buf = Buffer.from(m[3], 'base64'); total += buf.length; if (total > 4200000) break;
    out.push({ filename: name, content: buf, contentType: m[1] });
  }
  const html = String(body.demoHtml || '');
  if (html.startsWith('<!doctype html>') && html.length < 600000) out.push({ filename: 'demo.html', content: html, contentType: 'text/html' });
  return out;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  let body; try { body = await readBody(req); } catch { return res.status(400).json({ ok: false }); }
  if (clean(body.website)) return res.status(200).json({ ok: true }); // honeypot
  const { action, tier, rows, it } = summarize(body);
  if (!clean(it.biz) || String(it.cmobile || '').replace(/\D/g, '').length < 10) return res.status(400).json({ ok: false, error: 'Missing business or mobile.' });

  const user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error('[site-intake] SMTP not configured - NOT delivered:', JSON.stringify(rows));
    return res.status(503).json({ ok: false, error: 'Not connected yet. Please call or text ' + PHONE + '.' });
  }
  const urgent = action === 'invoice' || body.tier === 'shabang';
  const subject = (urgent ? '🔥 ' : '') + ACTIONS[action] + ': ' + clean(it.biz, 60) + ' (' + clean(it.trade, 30) + ', ' + clean(it.town, 40) + ')' + (tier ? ' — ' + tier : '');
  const html = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:680px">'
    + '<div style="background:#011F5D;color:#fff;padding:14px 18px;border-radius:8px 8px 0 0"><strong style="font-size:18px">' + esc(ACTIONS[action]) + '</strong>'
    + '<div style="color:#02D7F5;font-size:13px">Site Studio · pietstechsolutions.com/websites</div></div>'
    + '<table style="width:100%;border-collapse:collapse;border:1px solid #e3e8ef;border-top:0">'
    + rows.map(([k, v]) => '<tr><td style="padding:7px 12px;background:#f6f8fb;border-bottom:1px solid #e3e8ef;width:130px;color:#011F5D"><strong>' + esc(k) + '</strong></td><td style="padding:7px 12px;border-bottom:1px solid #e3e8ef">' + esc(v).replace(/\n/g, '<br>') + '</td></tr>').join('')
    + '</table><p style="margin:14px 0">'
    + '<a href="tel:' + esc(clean(it.cmobile, 30)) + '" style="background:#01A2E8;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;margin-right:8px">Call ' + esc(clean(it.cname, 40)) + '</a>'
    + '<a href="sms:' + esc(clean(it.cmobile, 30)) + '" style="background:#011F5D;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Text</a></p>'
    + '<p style="color:#555;font-size:13px">Save all attachments to one folder and open <b>demo.html</b> to see exactly what they saw. Next step: Claude skill <b>piets-client-demo-site</b> turns this into the full build.</p></div>';
  try {
    const tx = nodemailer.createTransport({ host: process.env.SMTP_HOST || 'smtp.gmail.com', port: Number(process.env.SMTP_PORT || 465), secure: String(process.env.SMTP_SECURE ?? 'true') !== 'false', auth: { user, pass } });
    await tx.sendMail({ from: '"Piets Site Studio" <' + user + '>', to: OWNER_EMAIL, replyTo: clean(it.cemail, 120) || undefined, subject, text: rows.map(([k, v]) => k + ': ' + v).join('\n'), html, attachments: attachmentsFrom(body) });
    if (action === 'demo' && clean(it.cemail, 120) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(it.cemail)) {
      try {
        await tx.sendMail({ from: '"Piets Technology Solutions" <' + user + '>', to: clean(it.cemail, 120), subject: 'Your ' + clean(it.biz, 60) + ' website demo',
          text: `Hi ${clean(it.cname, 40).split(' ')[0] || 'there'},\n\nThanks for building your website demo with Piets. Matt will reach out shortly to walk you through it and answer questions.\n\nWant to move faster? Reply to this email or call/text ${PHONE}.\n\nPiets Technology Solutions\nQuestions? We're here 24/7: ${PHONE}\nhttps://pietstechsolutions.com/websites` });
      } catch (e) { console.error('[site-intake] auto-reply failed:', e.message); }
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[site-intake] send failed:', e.message, JSON.stringify(rows));
    return res.status(502).json({ ok: false, error: 'Could not send. Please call or text ' + PHONE + '.' });
  }
}
