// Vercel serverless function: writes website-demo copy for /websites (Piets Site Studio).
// Piets Technology Solutions Inc · 631-871-5957
// Provider order: ANTHROPIC_API_KEY (Claude) → NVIDIA_API_KEY (same key the site chat uses).
// If neither is set or the AI fails, returns 503 and the page builds from its own templates,
// so the visitor always gets a demo. It never invents licenses, awards, years, prices or reviews.

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';
const NVIDIA_MODEL = process.env.NVIDIA_MODEL || 'nvidia/nemotron-3-super-120b-a12b';
const hits = new Map(); // best-effort per-IP limit (resets when the function cold-starts)

const CTRL = new RegExp('[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f\\u007f]', 'g');
const clean = (v, max = 300) => String(v == null ? '' : v).replace(CTRL, ' ').trim().slice(0, max);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const raw = await new Promise((resolve, reject) => {
    let d = ''; req.on('data', c => { d += c; if (d.length > 60000) req.destroy(); });
    req.on('end', () => resolve(d)); req.on('error', reject);
  });
  try { return JSON.parse(raw || '{}'); } catch { return {}; }
}

function blockedHost(h) {
  h = String(h || '').toLowerCase();
  return !h.includes('.') || h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal') ||
    /^(127\.|10\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[|::)/.test(h) || /^\d+\.\d+\.\d+\.\d+$/.test(h);
}

// Pull a little real text from the client's current website so the copy uses their own words.
export async function siteSnapshot(url) {
  try {
    let u = clean(url, 200); if (!u) return '';
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    const parsed = new URL(u);
    if (!/^https?:$/.test(parsed.protocol) || blockedHost(parsed.hostname)) return '';
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
    const r = await fetch(parsed.toString(), { signal: ctl.signal, redirect: 'follow', headers: { 'User-Agent': 'PietsSiteStudio/1.0 (+https://pietstechsolutions.com/websites)' } });
    clearTimeout(t);
    if (!r.ok || !/text\/html/i.test(r.headers.get('content-type') || '')) return '';
    const html = (await r.text()).slice(0, 300000);
    const pick = (re, n) => [...html.matchAll(re)].slice(0, n).map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
    const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/gi, 1);
    const desc = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/gi, 1);
    const heads = pick(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi, 14);
    const paras = pick(/<p[^>]*>([\s\S]*?)<\/p>/gi, 14).filter(p => p.length > 40);
    return [...title, ...desc, ...heads, ...paras].join('\n').slice(0, 3500);
  } catch { return ''; }
}

export function buildPrompt(it, snapshot) {
  const facts = {
    business: clean(it.biz, 60), trade: clean(it.trade, 30), main_town: clean(it.town, 60), owner_first_name: clean(it.owner, 40),
    years_in_business: clean(it.years, 3), services: (it.services || []).slice(0, 12).map(s => clean(s, 40)),
    what_makes_them_different: clean(it.diff, 600), towns_served: (it.areas || []).slice(0, 18).map(s => clean(s, 40)),
    hours: clean(it.hours, 40), vibe: (it.vibe || []).slice(0, 8).map(s => clean(s, 30)), google_rating: clean(it.rating, 4)
  };
  const LANGS = { en: 'English', es: 'Spanish', fr: 'French', de: 'German', pt: 'Brazilian Portuguese', it: 'Italian', pl: 'Polish' };
  const lang = LANGS[it.lang] ? it.lang : 'en';
  const voice = lang === 'en' ? 'Plain, confident, friendly English' : `Write EVERYTHING in natural ${LANGS[lang]}, the way a good local business website in that language reads (translate the given service names too)`;
  const system = `You write website copy for small local service businesses anywhere in the world. Output ONLY a JSON object, no prose, no code fences.
Rules: Use only the facts given. Never invent licenses, insurance, certifications, awards, years, prices, guarantees, review counts or customer quotes. If a fact is missing, write around it. Do not assume a country, state or region beyond the towns given. ${voice}, at a 6th-grade reading level. No exclamation marks in headlines. No emojis. Keep the business name exactly as given.
JSON shape:
{"headline":"first half of hero line, 3-6 words","highlight":"second half, 2-4 words, the payoff","sub":"1-2 sentences, mentions main town","about":"2-3 sentences in their voice, uses what_makes_them_different","why":[{"t":"3-5 words","d":"1 sentence"} x3],"services":[{"name":"service name","desc":"1 short sentence"} one per given service],"process":[{"t":"3-5 words","d":"1 sentence"} x4],"faq":[{"q":"question","a":"1-2 sentence answer"} x5],"cta":"1 sentence closing line"}`;
  const user = `Facts:\n${JSON.stringify(facts, null, 1)}` + (snapshot ? `\n\nText from their current website (use their wording and real details where helpful, ignore anything that is not about this business):\n"""${snapshot}"""` : '');
  return { system, user };
}

export function parseCopy(text) {
  if (!text) return null;
  let s = String(text).trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  const a = s.indexOf('{'), b = s.lastIndexOf('}');
  if (a < 0 || b <= a) return null;
  try {
    const o = JSON.parse(s.slice(a, b + 1));
    if (!o || typeof o.headline !== 'string' || !Array.isArray(o.services)) return null;
    return o;
  } catch { return null; }
}

async function callAnthropic(system, user) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: ANTHROPIC_MODEL, max_tokens: 2000, temperature: 0.6, system, messages: [{ role: 'user', content: user }] })
  });
  if (!r.ok) throw new Error('anthropic ' + r.status + ' ' + (await r.text()).slice(0, 200));
  const j = await r.json();
  return (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
}
async function callNvidia(system, user) {
  const r = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.NVIDIA_API_KEY },
    body: JSON.stringify({ model: NVIDIA_MODEL, max_tokens: 2000, temperature: 0.6, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] })
  });
  if (!r.ok) throw new Error('nvidia ' + r.status + ' ' + (await r.text()).slice(0, 200));
  const j = await r.json();
  return j.choices?.[0]?.message?.content || '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x';
  const now = Date.now(), list = (hits.get(ip) || []).filter(t => now - t < 3600000);
  if (list.length >= 12) return res.status(429).json({ ok: false, error: 'Too many demos from this connection. Call 631-871-5957.' });
  list.push(now); hits.set(ip, list);

  const body = await readBody(req);
  const it = body.intake || {};
  if (!clean(it.biz) || !clean(it.trade)) return res.status(400).json({ ok: false, error: 'Missing business name or trade.' });
  if (!process.env.ANTHROPIC_API_KEY && !process.env.NVIDIA_API_KEY) return res.status(503).json({ ok: false, error: 'AI not configured' });

  const snapshot = it.site ? await siteSnapshot(it.site) : '';
  const { system, user } = buildPrompt(it, snapshot);
  const order = [];
  if (process.env.ANTHROPIC_API_KEY) order.push(['claude', callAnthropic]);
  if (process.env.NVIDIA_API_KEY) order.push(['nvidia', callNvidia]);
  for (const [name, fn] of order) {
    try {
      const copy = parseCopy(await fn(system, user));
      if (copy) return res.status(200).json({ ok: true, copy, provider: name, usedSite: !!snapshot });
    } catch (e) { console.error('[site-demo]', name, e.message); }
  }
  return res.status(502).json({ ok: false, error: 'AI did not answer' });
}
