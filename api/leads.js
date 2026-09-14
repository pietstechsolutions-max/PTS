// Vercel serverless function: receives the website quote form and emails it to the owner.
// Configure SMTP_USER + SMTP_PASS (Gmail app password) in the Vercel project's
// Environment Variables. Without them this returns 503 and the form tells the
// visitor to call or text instead — it never fakes a success.
import nodemailer from 'nodemailer';

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'pietstechsolutions@gmail.com';
const PHONE = '631-871-5957';

const SERVICES = {
  'security-cameras': 'Security cameras', 'it-support': 'IT support',
  'networking-wifi': 'Networking / Wi-Fi', 'structured-cabling': 'Structured cabling',
  'smart-home': 'Smart home', 'pos': 'Point of sale', 'ip-phones': 'IP phones',
  'menu-boards': 'TV menu boards', 'ghost-kitchen': 'Ghost kitchen',
  'access-control': 'Access control', 'remote-support': 'Remote support',
  'tech-support-247': '24/7 tech support', 'managed-services': 'Managed services',
  'other': 'Other'
};

const CTRL = new RegExp('[\\u0000-\\u001f\\u007f]', 'g');

function clean(v, max = 2000) {
  return String(v == null ? '' : v).replace(CTRL, ' ').trim().slice(0, max);
}
function keepLines(v, max = 4000) {
  return String(v == null ? '' : v).replace(new RegExp('[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f\\u007f]', 'g'), ' ').trim().slice(0, max);
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const raw = await new Promise((resolve, reject) => {
    let d = '';
    req.on('data', (c) => { d += c; if (d.length > 100000) req.destroy(); });
    req.on('end', () => resolve(d));
    req.on('error', reject);
  });
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return Object.fromEntries(new URLSearchParams(raw)); }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Use POST.' });
  }

  let body;
  try { body = await readBody(req); } catch { return res.status(400).json({ ok: false, error: 'Bad request.' }); }

  if (clean(body.website)) return res.status(200).json({ ok: true }); // honeypot

  const lead = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    town: clean(body.town, 120),
    service: clean(body.service, 60),
    message: keepLines(body.message, 4000),
    source: clean(body.source, 60) || 'website',
    page: clean(body.page, 200),
    referrer: clean(body.referrer, 300)
  };
  if (!lead.name || !lead.phone) {
    return res.status(400).json({ ok: false, error: 'Name and phone are required.' });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error('[lead] SMTP not configured - lead NOT delivered:', JSON.stringify(lead));
    return res.status(503).json({ ok: false, error: 'Form is not connected yet. Please call or text ' + PHONE + '.' });
  }

  const serviceLabel = SERVICES[lead.service] || lead.service || 'Not specified';
  const rows = [
    ['Name', lead.name], ['Phone', lead.phone], ['Email', lead.email || '-'],
    ['Town / ZIP', lead.town || '-'], ['Service', serviceLabel],
    ['Message', lead.message || '-'], ['From page', lead.page || '/'],
    ['Source', lead.source], ['Referrer', lead.referrer || 'direct']
  ];
  const text = rows.map(([k, v]) => k + ': ' + v).join('\n');
  const html = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px">'
    + '<div style="background:#011F5D;color:#fff;padding:14px 18px;border-radius:8px 8px 0 0">'
    + '<strong style="font-size:18px">New website lead</strong>'
    + '<div style="color:#02D7F5;font-size:13px">pietstechsolutions.com</div></div>'
    + '<table style="width:100%;border-collapse:collapse;border:1px solid #e3e8ef;border-top:0">'
    + rows.map(([k, v]) => '<tr>'
      + '<td style="padding:8px 12px;background:#f6f8fb;border-bottom:1px solid #e3e8ef;width:130px;color:#011F5D"><strong>' + esc(k) + '</strong></td>'
      + '<td style="padding:8px 12px;border-bottom:1px solid #e3e8ef">' + esc(v).replace(/\n/g, '<br>') + '</td></tr>').join('')
    + '</table>'
    + '<p style="margin:14px 0 0"><a href="tel:' + esc(lead.phone) + '" style="background:#01A2E8;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Call ' + esc(lead.phone) + '</a></p>'
    + '</div>';

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE == null ? 'true' : process.env.SMTP_SECURE) !== 'false',
      auth: { user, pass }
    });
    await transport.sendMail({
      from: '"Piets Website" <' + user + '>',
      to: OWNER_EMAIL,
      replyTo: lead.email || undefined,
      subject: 'New lead: ' + lead.name + ' - ' + serviceLabel + (lead.town ? ' (' + lead.town + ')' : ''),
      text,
      html
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[lead] send failed - lead NOT delivered:', e.message, JSON.stringify(lead));
    return res.status(502).json({ ok: false, error: 'Could not send right now. Please call or text ' + PHONE + '.' });
  }
}
