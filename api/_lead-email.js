// Branded customer auto-reply for website leads (HTML + plain-text twin).
// Files starting with "_" in /api are not deployed as functions by Vercel; leads.js imports this.
// Brand: palette B (navy #011F5D, navy-purple #1B0B55, cyan #02D7F5, blue #016FD6, purple #7A3DFF),
// the official Piets logo mark (hosted PNG, never redrawn), Bricolage Grotesque / Inter / JetBrains Mono
// with safe fallbacks because many mail apps ignore web fonts. No prices. No vendor or client names.

export const PHONE = '631-871-5957';
const TEL = '+16318715957';
const SITE = 'https://pietstechsolutions.com';
const LOGO = SITE + '/assets/brand/logo-mark.png';

const F_DISPLAY = "'Bricolage Grotesque','Segoe UI',Arial,Helvetica,sans-serif";
const F_BODY = "Inter,'Segoe UI',Arial,Helvetica,sans-serif";
const F_MONO = "'JetBrains Mono',Consolas,'Courier New',monospace";

export const AI_LINE = 'Much of this message was prepared with AI. We do our best to keep it perfect. '
  + 'If you spot a mistake or have a question, just reply or call ' + PHONE + '.';

const STEPS = [
  ['We read your request', 'A real person at Piets looks over what you sent us.'],
  ['We call or text you', 'We reach out at ' + PHONE + ' to talk it through and answer your questions.'],
  ['We plan it with you', 'We put together a plan and a free quote that fit your place.']
];

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function firstName(name) {
  const f = String(name || '').trim().split(/\s+/)[0] || '';
  return f ? f.charAt(0).toUpperCase() + f.slice(1) : 'there';
}

export function customerReplySubject() {
  return 'We got your request | Piets Technology Solutions';
}

export function customerReplyText(lead, serviceLabel) {
  const lines = [
    'Hi ' + firstName(lead.name) + ',',
    '',
    'Thanks for reaching out to Piets Technology Solutions. Your request' + (serviceLabel && serviceLabel !== 'Not specified' ? ' for ' + serviceLabel : '') + ' is in.',
    '',
    'WHAT HAPPENS NEXT',
    ...STEPS.map(([t, d], i) => (i + 1) + '. ' + t + ' - ' + d),
    '',
    'Need us sooner? Call or text ' + PHONE + '.',
    '',
    'Piets Technology Solutions Inc',
    PHONE + ' | ' + SITE.replace('https://', ''),
    '',
    '--',
    AI_LINE
  ];
  return lines.join('\n');
}

export function customerReplyHtml(lead, serviceLabel) {
  const hi = esc(firstName(lead.name));
  const svc = serviceLabel && serviceLabel !== 'Not specified' ? esc(serviceLabel) : '';
  const summary = [
    svc ? ['Service', svc] : null,
    lead.town ? ['Town / ZIP', esc(lead.town)] : null,
    lead.phone ? ['Best number', esc(lead.phone)] : null
  ].filter(Boolean);

  const stepRows = STEPS.map(([t, d], i) =>
    '<tr><td valign="top" style="padding:0 14px 18px 0;width:36px">'
    + '<div style="width:34px;height:34px;line-height:34px;border-radius:17px;background:#7A3DFF;color:#ffffff;text-align:center;'
    + 'font-family:' + F_MONO + ';font-weight:700;font-size:14px">' + (i + 1) + '</div></td>'
    + '<td valign="top" style="padding:0 0 18px 0">'
    + '<div style="font-family:' + F_DISPLAY + ';font-weight:700;font-size:17px;line-height:1.3;color:#011F5D">' + esc(t) + '</div>'
    + '<div style="font-family:' + F_BODY + ';font-weight:400;font-size:14px;line-height:1.55;color:#3D4A66;padding-top:2px">' + esc(d) + '</div>'
    + '</td></tr>').join('');

  const summaryRows = summary.map(([k, v]) =>
    '<tr><td style="padding:6px 0;font-family:' + F_MONO + ';font-weight:500;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#5B2EE6;width:120px">' + esc(k) + '</td>'
    + '<td style="padding:6px 0;font-family:' + F_BODY + ';font-weight:600;font-size:14px;color:#011F5D">' + v + '</td></tr>').join('');

  return '<!doctype html><html lang="en"><head><meta charset="utf-8">'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">'
    + '<title>We got your request | Piets Technology Solutions</title>'
    + '<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">'
    + '<style>body{margin:0;padding:0}a{text-decoration:none}@media (max-width:620px){.wrap{width:100%!important}.pad{padding-left:22px!important;padding-right:22px!important}.btn{display:block!important;margin:0 0 10px 0!important}}</style>'
    + '</head><body style="margin:0;padding:0;background:#EEF1F8">'
    + '<div style="display:none;max-height:0;overflow:hidden;opacity:0">Your request is in. Here is what happens next.</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EEF1F8"><tr><td align="center" style="padding:28px 12px">'
    + '<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden">'

    // Header: navy -> navy-purple with the official mark
    + '<tr><td class="pad" bgcolor="#011F5D" style="background:#011F5D;background-image:linear-gradient(160deg,#011F5D 0%,#011F5D 55%,#1B0B55 100%);padding:32px 36px 30px">'
    + '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
    + '<td valign="middle" style="padding-right:14px"><div style="border:1px solid #2E4A9E;border-radius:13px;padding:1px;width:52px"><img src="' + LOGO + '" width="52" height="52" alt="Piets logo" style="display:block;width:52px;height:52px;border:0;border-radius:11px"></div></td>'
    + '<td valign="middle"><div style="font-family:' + F_DISPLAY + ';font-weight:800;font-size:19px;line-height:1.2;color:#ffffff">Piets Technology Solutions</div>'
    + '<div style="font-family:' + F_MONO + ';font-weight:500;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#02D7F5;padding-top:4px">Request received</div></td>'
    + '</tr></table>'
    + '<div style="font-family:' + F_DISPLAY + ';font-weight:800;font-size:30px;line-height:1.15;color:#ffffff;padding-top:28px">Thanks, ' + hi + '. We&#8217;ve got it.</div>'
    + '<div style="font-family:' + F_BODY + ';font-weight:400;font-size:15px;line-height:1.55;color:#C9D6F2;padding-top:10px">Your request' + (svc ? ' for <span style="color:#ffffff;font-weight:600">' + svc + '</span>' : '') + ' is in. Here is what happens next.</div>'
    + '</td></tr>'

    // Signature gradient line
    + '<tr><td bgcolor="#016FD6" style="height:5px;line-height:5px;font-size:0;background:#016FD6;background-image:linear-gradient(100deg,#02D7F5 0%,#016FD6 55%,#7A3DFF 100%)">&nbsp;</td></tr>'

    // Steps
    + '<tr><td class="pad" style="padding:30px 36px 6px">'
    + '<div style="font-family:' + F_MONO + ';font-weight:700;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#7A3DFF;padding-bottom:16px">What happens next</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + stepRows + '</table>'
    + '</td></tr>'

    // What you sent
    + (summaryRows ? '<tr><td class="pad" style="padding:4px 36px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4EFFF;border:1px solid #E9DDFF;border-radius:12px"><tr><td style="padding:14px 18px">'
      + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + summaryRows + '</table></td></tr></table></td></tr>' : '')

    // Call / text buttons
    + '<tr><td class="pad" style="padding:22px 36px 30px">'
    + '<div style="font-family:' + F_BODY + ';font-weight:500;font-size:14px;color:#3D4A66;padding-bottom:12px">Need us sooner? We&#8217;re one tap away.</div>'
    + '<a class="btn" href="tel:' + TEL + '" style="display:inline-block;margin-right:10px;background:#016FD6;background-image:linear-gradient(100deg,#02D7F5 0%,#016FD6 55%,#7A3DFF 100%);color:#ffffff;font-family:' + F_DISPLAY + ';font-weight:700;font-size:15px;line-height:1;padding:15px 24px;border-radius:999px;text-align:center">Call ' + PHONE + '</a>'
    + '<a class="btn" href="sms:' + TEL + '" style="display:inline-block;background:#ffffff;color:#5B2EE6;border:2px solid #7A3DFF;font-family:' + F_DISPLAY + ';font-weight:700;font-size:15px;line-height:1;padding:13px 22px;border-radius:999px;text-align:center">Text ' + PHONE + '</a>'
    + '</td></tr>'

    // Footer: navy-purple
    + '<tr><td class="pad" bgcolor="#1B0B55" style="background:#1B0B55;padding:24px 36px">'
    + '<div style="font-family:' + F_DISPLAY + ';font-weight:700;font-size:15px;color:#ffffff">Piets Technology Solutions Inc</div>'
    + '<div style="font-family:' + F_MONO + ';font-weight:500;font-size:12px;color:#02D7F5;padding-top:6px">'
    + '<a href="tel:' + TEL + '" style="color:#02D7F5">' + PHONE + '</a> &nbsp;&middot;&nbsp; <a href="' + SITE + '" style="color:#9B6BFF">pietstechsolutions.com</a></div>'
    + '<div style="font-family:' + F_BODY + ';font-weight:400;font-size:11px;line-height:1.5;color:#8C86B8;padding-top:16px">' + esc(AI_LINE) + '</div>'
    + '</td></tr>'

    + '</table>'
    + '<div style="font-family:' + F_BODY + ';font-weight:400;font-size:11px;color:#8A93AB;padding-top:14px">You are getting this because you sent a request on pietstechsolutions.com.</div>'
    + '</td></tr></table></body></html>';
}
