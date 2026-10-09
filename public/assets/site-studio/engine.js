/* Piets Site Studio — demo site generator (the playbook as code).
   buildSite(intake, copy, opts) -> full standalone HTML for the client's demo.
   Section order: demo ribbon, ticker, header, live hero scene,
   stats, services, why-us/owner, work photos, process, reviews, areas, quote stepper, FAQ, final CTA,
   footer with Piets box + AI disclaimer, sticky call bar, Ask bubble.
   Multi-language: English text lives here (UI_EN) and in trades.js / hero-photo.js; other languages load
   from lang/xx.js into window.PietsLang[xx] and override text only.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com */
(function (g) {
  'use strict';
  var TR = g.PietsTrades, SC = g.PietsScenes;
  var PIETS = { name: 'Piets Technology Solutions Inc', phone: '631-871-5957', tel: '+16318715957', url: 'https://pietstechsolutions.com' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function digits(p) { return String(p || '').replace(/\D/g, ''); }
  /* phones: +country numbers are kept as typed; plain 10-digit numbers are treated as US/Canada */
  function intl(p) { return /^\s*(\+|00)/.test(String(p || '')); }
  function tel(p) { var d = digits(p); if (!d) return ''; if (intl(p)) return '+' + (String(p).trim().indexOf('00') === 0 ? d.slice(2) : d); if (d.length === 10) return '+1' + d; if (d.length === 11 && d[0] === '1') return '+' + d; return d; }
  function fmtPhone(p) { var raw = String(p || '').trim(), d = digits(raw); if (!intl(raw) && d.length === 11 && d[0] === '1') d = d.slice(1); if (!intl(raw) && d.length === 10) return d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6); return raw.replace(/\s+/g, ' ').slice(0, 24); }
  function safeImg(u) { return typeof u === 'string' && /^(data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,|[a-z0-9_\-]+\.(png|jpe?g|webp|gif|svg)$)/i.test(u) ? u : ''; }
  function safeUrl(u) { u = String(u || '').trim(); if (!u) return ''; if (!/^https?:\/\//i.test(u)) u = 'https://' + u; return /^https:\/\/[^\s"'<>]+$/i.test(u.replace(/^http:/i, 'https:')) ? u.replace(/^http:/i, 'https:') : ''; }

  /* ---------- color ---------- */
  function hexToRgb(h) { h = String(h || '').replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); var n = parseInt(h, 16); if (isNaN(n) || h.length !== 6) return null; return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function rgbToHex(r) { return '#' + r.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
  function mix(a, b, t) { var A = hexToRgb(a), B = hexToRgb(b); return rgbToHex(A.map(function (v, i) { return v + (B[i] - v) * t; })); }
  function lum(h) { var c = hexToRgb(h).map(function (v) { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
  function palette(base, style) {
    if (!hexToRgb(base)) base = '#1e88e5';
    var dark = style !== 'light';
    var a2 = mix(base, '#ffffff', .35);
    var on = contrast(base, '#ffffff') >= 3 ? '#ffffff' : '#0b0f14';
    var ink = mix(base, '#05080c', .9), ink2 = mix(base, '#070b10', .84), ink3 = mix(base, '#0b1118', .78);
    var aTxt = base; // accent used as text on light paper must be dark enough
    for (var i = 0; i < 8 && contrast(aTxt, '#ffffff') < 4.5; i++) aTxt = mix(aTxt, '#000000', .18);
    var aOnDark = base; for (var j = 0; j < 8 && contrast(aOnDark, ink) < 4.5; j++) aOnDark = mix(aOnDark, '#ffffff', .2);
    return { a: base, a2: a2, on: on, ink: ink, ink2: ink2, ink3: ink3, aTxt: aTxt, aDark: aOnDark, dark: dark, sky1: mix(base, '#020509', .86), sky2: mix(base, '#0a1420', .7) };
  }
  var FONTS = {
    industrial: { disp: '"Archivo","Arial Narrow",system-ui,sans-serif', body: '"Inter",system-ui,sans-serif', href: 'Archivo:wght@700;800;900&family=Inter:wght@400;500;600;700' },
    modern: { disp: '"Bricolage Grotesque",system-ui,sans-serif', body: '"DM Sans",system-ui,sans-serif', href: 'Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;700' },
    elegant: { disp: '"Fraunces",Georgia,serif', body: '"Jost",system-ui,sans-serif', href: 'Fraunces:opsz,wght@9..144,600;9..144,700&family=Jost:wght@400;500;600' },
    clean: { disp: '"Manrope",system-ui,sans-serif', body: '"Manrope",system-ui,sans-serif', href: 'Manrope:wght@400;500;600;700;800' }
  };

  /* ---------- icons ---------- */
  var IC = {
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    fan: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 4-7s2 5-2 7M14 12c4 0 7 1 7 4s-5 2-7-2M12 14c0 4-1 7-4 7s-2-5 2-7M10 12c-4 0-7-1-7-4s5-2 7 2"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>', leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
    car: '<path d="M3 16v-3l2-5h14l2 5v3"/><path d="M3 16h18"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    sparkle: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>', hammer: '<path d="M14 6l4 4-9 9-4-4z"/><path d="M14 6l2-2 4 4-2 2"/>',
    spray: '<rect x="7" y="9" width="8" height="12" rx="2"/><path d="M9 9V6h4v3M13 6h3M18 4v1M20 6h1M18 8v1"/>', plate: '<circle cx="12" cy="13" r="7"/><circle cx="12" cy="13" r="3"/><path d="M3 4v6M21 4v6"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8.5 20 20M8.5 15.5 20 4"/>', heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    dumbbell: '<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>', wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
    store: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18"/><path d="M9 20v-6h6v6"/>', check: '<path d="M5 12l5 5 9-10"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M4 5h16v11H8l-4 4z"/>', star: '<path d="M12 3l2.7 5.6 6.2.9-4.5 4.4 1 6.1L12 17l-5.5 3 1-6.1L3 9.5l6.2-.9z"/>'
  };
  function icon(n, cls) { return '<svg class="' + (cls || 'i') + '" viewBox="0 0 24 24" aria-hidden="true">' + (IC[n] || IC.check) + '</svg>'; }

  /* ---------- default (no-AI) copy ---------- */
  function areasOf(intake) {
    var a = (intake.areas || []).filter(Boolean);
    if (!a.length && intake.town) a = [intake.town];
    return a.slice(0, 18);
  }
  var UI_EN = {
    nav_services: 'Services', nav_about: 'About', nav_work: 'Work', nav_areas: 'Areas', nav_login: 'Client login', nav_faq: 'FAQ',
    serving: 'Serving {x}', your_area: 'your area', local: 'Local', title_in: '{label} in {town}',
    st_years: 'Years in business', st_rating: 'Google rating', st_reviews: '{n} Google reviews', st_247: '24/7', st_calltext: 'Call or text', st_same: 'Same day', st_replies: 'Replies to requests', st_towns: 'Towns served', st_home: 'Home base: {town}',
    photo_slot: 'Your job photo {n}', goes_here: 'goes here', team_slot: 'Your team photo goes here',
    rv_cust: 'Customer review (provided by {biz})', rv_ph: 'Your real Google reviews show here automatically on the live site. We never write fake reviews.',
    rib_built: 'built by', rib_preview: 'Preview only, not live yet', call_x: 'Call {phone}', need: 'What do you need?',
    svc_eye: 'What we do', svc_h: 'Services in', svc_p: 'Tap any service to start a quote with it already picked.', req_this: 'Request this',
    why_eye: 'Why {biz}', meet: 'Meet', real1: 'Real people,', real2: 'real work',
    work_eye: 'Recent work', work_h1: 'See it', work_h2: 'for yourself', how_eye: 'How it works', how_h1: 'Simple from', how_h2: 'start to finish',
    rev_eye: 'Reviews', rev_h1: 'What customers', rev_h2: 'say', on_google: '{r} on Google', from_n: 'from {n} reviews',
    area_eye: 'Service area', area_h: 'Proudly serving', area_p: 'Not sure if we come to you? Type your town.', your_town: 'Your town', check: 'Check',
    q_steps: '3 quick steps', qs1: 'What do you need?', qs2: 'Tell us a bit more', details: 'Details', details_ph: 'What is going on? When do you need it?', photos_opt: 'Photos (optional)',
    qs3: 'Where do we send your price?', name: 'Name', mobile: 'Mobile', town: 'Town', recv: 'Request received', recv_p: 'This is a demo, so nothing was sent. Scroll down to see it land in Field HQ. On your live site it hits your phone instantly with an auto text-back to the customer.',
    see_hq: 'See it in Field HQ', back: 'Back', next: 'Next', send_req: 'Send request',
    hq_eye: 'Field HQ built in', hq_h1: 'Every request lands in', hq_h2: 'your pocket', hq_p: 'Try the quote form above, then watch it show up here. On the live site it hits your phone instantly, texts the customer back, and becomes a quote, a job and an invoice without retyping anything.',
    hq_f1: 'New-lead alerts by text and email', hq_f2: 'Auto text-back so no lead goes cold', hq_f3: 'Quotes, jobs, invoices and payments in one place', hq_f4: 'Client login so customers can see their job and pay',
    hq_tabs: 'Inbox|Quotes|Jobs|Invoices|Clients|Reviews', hq_k1: 'New leads', hq_k2: 'Quotes out', hq_k3: 'Jobs today', hq_wait1: 'Your leads show up here', hq_wait2: 'Waiting', hq_demo: 'Demo inbox. Nothing here is a real customer.',
    faq_eye: 'FAQ', faq_h1: 'Good', faq_h2: 'questions', fin_h: '{biz} is', fin_em: 'ready when you are', text_us: 'Text us',
    ft_services: 'Services', ft_contact: 'Contact', text_x: 'Text {phone}', rights: 'All rights reserved.', web_by: 'Website by',
    ai_note: 'Much of this demo was drafted with AI from the answers provided. We do our best to keep it accurate; if you spot a mistake or have a question or suggestion, tell Piets Technology Solutions so we can correct it.',
    stk_call: 'Call', stk_text: 'Text', stk_quote: 'Quote', ask: 'Ask us', ask_biz: 'Ask {biz}', close: 'Close', type_q: 'Type a question', send: 'Send',
    js_new: 'New · just now', js_auto: 'Auto-text to {n}: Thanks for reaching out to {biz}! We got your request and will text you shortly.', js_request: 'Request',
    js_yes: 'Yes! We serve {x}.', js_check: 'Call or text {phone} and we will check {x} for you.', js_us: 'us', js_hi: 'Hi! Ask me about services, areas or how to get a quote.',
    js_svc: 'Yes, we do {x}. Use the quote form and we will price it for you.', js_else: 'Good question! Call or text {phone} and we will answer right away. (On the live site this assistant is trained on your business.)',
    dc_ask: 'Ask us about {x}. Clear pricing before we start.', dc_about: '{biz} is a local {noun} serving {town} and nearby areas. You deal directly with {who}, from the first call to the finished {job}.', dc_owner: 'the owner',
    dc_sub: '{biz}: {adj} {service} service in {town}{more}. Clear prices, real people, work done right.', dc_fast: 'fast, honest', dc_friendly: 'friendly, reliable', dc_more: ' and surrounding areas',
    w1t: 'Local and owner-run', w1d: 'You talk to the people who actually do the work.', w2t: 'Price before we start', w2d: 'No surprises. You approve it first.',
    w3t_e: 'Fast response', w3d_e: 'Call or text. We reply fast, day or night.', w3t: 'On time, every time', w3d: 'We show up when we say and finish clean.',
    dc_cta: 'Ready when you are. Call, text or send a request and we will take it from there.', tk_247: '24/7 LINE', tk_call: 'CALL OR TEXT',
    hrs_e: '24/7 emergency line', hrs: 'Mon–Sat', your_biz: 'Your Business',
    h_go: 'Start a request for this', h_see: 'See the work', h_live: 'Live', h_onsite: 'On site', h_progress: 'Progress', h_next: 'Next opening', h_tb: 'Text-back',
    h_gl: 'live', h_gj: 'job', h_gb: 'book', h_ga: 'auto', h_today: 'today', h_tmrw: 'tomorrow', h_hq: 'Field HQ · now', h_own: 'Your photos', h_realjob: 'A real job by {biz}.', h_done: 'Done', h_sec: '9 sec', h_job: 'Job'
  };
  /* language pack: English base + overrides from window.PietsLang[code] */
  function pack(lang) {
    var P = (g.PietsLang && lang && lang !== 'en' && g.PietsLang[lang]) || null;
    var ui = {}, k; for (k in UI_EN) ui[k] = UI_EN[k]; if (P && P.ui) for (k in P.ui) if (P.ui[k]) ui[k] = P.ui[k];
    return { code: P ? lang : 'en', P: P, ui: ui };
  }
  function fill(str, v) { return String(str).replace(/\{(\w+)\}/g, function (m, k) { return v && v[k] != null ? v[k] : m; }); }
  function tradeL(trade, lang) {
    var base = TR.T[trade] || TR.T.other, P = g.PietsLang && g.PietsLang[lang], o = P && P.trades && P.trades[trade];
    if (!o) return base;
    var t = {}, k; for (k in base) t[k] = base[k];
    ['label', 'noun', 'job', 'hero', 'picks', 'faq'].forEach(function (f) { if (o[f]) t[f] = o[f]; });
    if (o.services && o.services.length === base.services.length) t.services = o.services;
    t.en = base;
    return t;
  }
  var WORDS = {
    _: { q: 'Free quote', q2: 'Get a free quote', est: 'Free estimates', zero: '$0', steps: 'Get your price in', checks: ['Price before we start', 'Local &amp; owner-run', 'Fast replies'] },
    restaurant: { q: 'Order / reserve', q2: 'Order or reserve', est: 'Order ahead', zero: 'Fresh', steps: 'Order, reserve or cater in', checks: ['Made from scratch', 'Local &amp; owner-run', 'Fast replies'] },
    beauty: { q: 'Book now', q2: 'Book an appointment', est: 'Easy booking', zero: 'Text', steps: 'Book in', checks: ['Consult first', 'Local &amp; owner-run', 'Text reminders'] },
    health: { q: 'Book a visit', q2: 'Book a visit', est: 'New patients welcome', zero: 'New', steps: 'Request a visit in', checks: ['On-time visits', 'Local &amp; caring', 'Text reminders'] },
    fitness: { q: 'Free class', q2: 'Try a free class', est: 'First class free', zero: '$0', steps: 'Claim your free class in', checks: ['All levels welcome', 'Local &amp; owner-run', 'Real coaches'] },
    other: { q: 'Contact us', q2: 'Get in touch', est: 'Local &amp; owner-run', zero: 'Local', steps: 'Send a request in', checks: ['Friendly service', 'Local &amp; owner-run', 'Fast replies'] }
  };
  function words(tr, lang) {
    var P = g.PietsLang && g.PietsLang[lang], w = WORDS[tr] || WORDS._;
    var o = P && P.words && (P.words[tr] || (WORDS[tr] ? null : P.words._));
    if (!o) return w;
    var r = {}, k; for (k in w) r[k] = w[k]; for (k in o) if (o[k]) r[k] = o[k]; return r;
  }
  function defaultCopy(intake) {
    var lang = intake.lang || 'en', L = pack(lang).ui, P = pack(lang).P;
    var t = tradeL(intake.trade, lang), en = t.en || t;
    var town = intake.town || L.your_area;
    var chosen = (intake.services || []).filter(Boolean);
    /* a picked library service (stored in English) maps to the same service in this language */
    var lib = {}; en.services.forEach(function (s, i) { lib[s[0].toLowerCase()] = t.services[i]; });
    var services = (chosen.length ? chosen : en.services.map(function (s) { return s[0]; })).slice(0, 9).map(function (n) {
      var hit = lib[String(n).toLowerCase()];
      return hit ? { name: hit[0], desc: hit[1] } : { name: n, desc: fill(L.dc_ask, { x: String(n).toLowerCase() }) };
    });
    var phone = fmtPhone(intake.phone);
    var areas = areasOf(intake);
    var faq = t.faq.map(function (f) { return { q: f[0], a: f[1] }; });
    ((P && P.faqCommon) || TR.FAQ_COMMON).forEach(function (f) { faq.push({ q: f[0], a: f[1].replace('{areas}', areas.join(', ') || town).replace('{phone}', phone || L.js_us) }); });
    var diff = String(intake.diff || '').trim();
    var owner = String(intake.owner || '').trim();
    var about = diff ? diff : fill(L.dc_about, { biz: intake.biz, noun: t.noun, town: town, who: owner || L.dc_owner, job: t.job });
    return {
      headline: t.hero[0], highlight: t.hero[1],
      sub: fill(L.dc_sub, { biz: intake.biz, adj: t.emergency ? L.dc_fast : L.dc_friendly, service: lang === 'de' ? t.label.split(' /')[0] : t.label.split(' /')[0].toLowerCase(), town: town, more: areas.length > 1 ? L.dc_more : '' }),
      about: about,
      why: [{ t: L.w1t, d: L.w1d }, { t: L.w2t, d: L.w2d }, { t: t.emergency ? L.w3t_e : L.w3t, d: t.emergency ? L.w3d_e : L.w3d }],
      services: services, process: ((P && P.process) || TR.PROCESS).map(function (p) { return { t: p[0], d: p[1] }; }), faq: faq.slice(0, 6),
      cta: L.dc_cta,
      ticker: [phone ? (t.emergency ? L.tk_247 : L.tk_call) + ' · ' + phone : '', fill(L.serving, { x: town }), words(intake.trade, lang).est.replace('&amp;', '&')].filter(Boolean)
    };
  }
  function mergeCopy(base, ai) {
    if (!ai || typeof ai !== 'object') return base;
    var out = {}; for (var k in base) out[k] = base[k];
    ['headline', 'highlight', 'sub', 'about', 'cta'].forEach(function (k) { if (typeof ai[k] === 'string' && ai[k].trim()) out[k] = ai[k].trim().slice(0, 420); });
    if (Array.isArray(ai.services) && ai.services.length) out.services = ai.services.filter(function (s) { return s && s.name; }).slice(0, 9).map(function (s) { return { name: String(s.name).slice(0, 60), desc: String(s.desc || '').slice(0, 200) }; });
    if (Array.isArray(ai.why) && ai.why.length >= 3) out.why = ai.why.slice(0, 3).map(function (s) { return { t: String(s.t || s.title || '').slice(0, 60), d: String(s.d || s.desc || '').slice(0, 180) }; });
    if (Array.isArray(ai.faq) && ai.faq.length) out.faq = ai.faq.filter(function (f) { return f && f.q && f.a; }).slice(0, 7).map(function (f) { return { q: String(f.q).slice(0, 140), a: String(f.a).slice(0, 400) }; });
    if (Array.isArray(ai.process) && ai.process.length >= 3) out.process = ai.process.slice(0, 4).map(function (p) { return { t: String(p.t || p.title || '').slice(0, 50), d: String(p.d || p.desc || '').slice(0, 160) }; });
    return out;
  }

  /* ---------- the site ---------- */
  function buildSite(intake, copy, opts) {
    opts = opts || {};
    var lang = intake.lang || 'en', LP = pack(lang), L = LP.ui; lang = LP.code;
    var t = tradeL(intake.trade, lang);
    var P = palette(intake.color || t.color, intake.style);
    var F = FONTS[t.fonts] || FONTS.modern;
    var biz = String(intake.biz || L.your_biz).slice(0, 60);
    var phone = fmtPhone(intake.phone), telHref = tel(intake.phone);
    var town = intake.town || '';
    var areas = areasOf(intake);
    var logo = safeImg(intake.logo);
    var photos = (intake.photos || []).map(safeImg).filter(Boolean).slice(0, 8);
    var hours = intake.hours || (t.emergency ? L.hrs_e : L.hrs);
    var initials = biz.split(/\s+/).filter(function (w) { return /^[0-9A-Za-z\u00C0-\u024F\u0400-\u04FF]/.test(w); }).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
    var WD = words(intake.trade, lang);
    var hctx = { lang: lang, ui: L, biz: biz, town: intake.town || '', phone: fmtPhone(intake.phone), color: P.a, trade: intake.trade || 'other', photos: photos.length, services: (copy.services || []).map(function (s) { return s.name; }) };
    var HERO = g.PietsHeroes && g.PietsHeroes.build ? g.PietsHeroes.build(intake.trade || 'other', hctx) : null;
    /* interactive x-ray scenes are English-only for now, so other languages skip that section */
    var INSIDE = HERO && lang === 'en' ? g.PietsHeroes.build(intake.trade || 'other', hctx, { style: 'inside' }) : null;
    var INS_COPY = { plumbing: ['See inside the pipes', 'Tap a problem and watch how we find it and fix it, the same way we explain it at your door.'], hvac: ['See inside the system', 'Tap a problem and see what is going on inside the unit, and what we do about it.'], electrical: ['See inside the walls', 'Tap a problem to see where it starts and how we make it safe.'], tech: ['See inside the network', 'Tap a device to see how your cameras, Wi-Fi and smart home tie together.'], auto: ['From the tow to the keys', 'Tap a step to follow a car from roadside to ready.'], detailing: ['Try the polish yourself', 'Drag across the paint and watch the swirls disappear.'], contractor: ['Pick your finish', 'Tap a finish to see the cabinet wall change.'] };
    var scene = HERO ? '' : (SC.S[t.scene] || SC.S.store)();
    var demo = opts.demo !== false;
    var light = !P.dark;
    var reviewText = String(intake.review || '').trim();
    var rating = parseFloat(intake.rating); var rcount = parseInt(intake.reviewsCount, 10);
    var social = [[L.web || 'Website', safeUrl(intake.site)], ['Facebook', safeUrl(intake.fb)], ['Instagram', safeUrl(intake.ig)]].filter(function (x) { return x[1]; });

    var css = [
      ':root{--a:' + P.a + ';--a2:' + P.a2 + ';--on:' + P.on + ';--ink:' + P.ink + ';--ink2:' + P.ink2 + ';--ink3:' + P.ink3 + ';--atx:' + P.aTxt + ';--adk:' + P.aDark + ';--sky1:' + P.sky1 + ';--sky2:' + P.sky2 + ';',
      '--txt:#eef3f7;--mut:#a4b2bf;--line:rgba(255,255,255,.11);--paper:' + (light ? '#ffffff' : '#f3f5f7') + ';--dk:#0d141b;--dkm:#53606c;--pline:#dde3e9;',
      '--disp:' + F.disp + ';--body:' + F.body + ';--mono:"JetBrains Mono",ui-monospace,Menlo,Consolas,monospace;color-scheme:' + (light ? 'light' : 'dark') + '}',
      '*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:84px}body{margin:0;background:' + (light ? '#f7f8fa' : 'var(--ink)') + ';color:' + (light ? 'var(--dk)' : 'var(--txt)') + ';font:17px/1.6 var(--body);overflow-x:hidden}',
      'img{max-width:100%;display:block}a{color:inherit}button,input,select,textarea{font:inherit;color:inherit}[hidden]{display:none!important}:focus-visible{outline:2px solid var(--a2);outline-offset:3px}',
      '.wrap{max-width:1160px;margin:0 auto;padding:0 18px}h1,h2,h3{font-family:var(--disp);line-height:1.06;margin:0;letter-spacing:-.01em;text-wrap:balance}h1{font-size:clamp(2.3rem,6.6vw,4.2rem);font-weight:800}h2{font-size:clamp(1.8rem,4.6vw,2.8rem);font-weight:800}h3{font-size:1.18rem}p{margin:0}',
      'h1 em,h2 em{font-style:normal;color:var(--adk)}.lt h2 em{color:var(--atx)}',
      '.eye{font:600 .72rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--adk)}.lt .eye{color:var(--atx)}',
      'section{padding:72px 0}.lt{background:var(--paper);color:var(--dk)}.d2{background:var(--ink2)}' + (light ? '.d2{background:#eef1f4;color:var(--dk)}.d2 .eye,.d2 h2 em{color:var(--atx)}.d2 .mut{color:var(--dkm)}' : ''),
      '.head{max-width:680px;display:grid;gap:12px;margin:0 0 30px}.head.c{margin:0 auto 30px;text-align:center}.mut{color:var(--mut)}.lt .mut{color:var(--dkm)}',
      '.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:99px;padding:0 24px;min-height:50px;font-weight:700;text-decoration:none;cursor:pointer;white-space:nowrap;transition:transform .15s}.btn:hover{transform:translateY(-1px)}',
      '.go{background:linear-gradient(135deg,var(--a2),var(--a));color:var(--on);box-shadow:0 12px 28px -12px var(--a)}.gh{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.25)}' + (light ? '.gh{background:#fff;border-color:#c6ced6;color:var(--dk)}' : '') + '.lt .gh,.card .gh,.qbox .gh{background:#fff;border:1px solid #c6ced6;color:var(--dk)}.final .gh,.stk .gh{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.3);color:#fff}.sm{min-height:40px;padding:0 16px;font-size:.92rem}',
      '.i{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}',
      '.ribbon{background:#011F5D;color:#dbe8ff;font-size:.78rem;padding:7px 14px;text-align:center;line-height:1.4}.ribbon b{color:#00FFFF;letter-spacing:.06em}.ribbon a{color:#00FFFF}',
      '.tick{background:var(--ink2);border-bottom:1px solid var(--line);font:500 .72rem var(--mono);letter-spacing:.06em;color:#dbe6ee;overflow:hidden}.tick .run{display:flex;gap:40px;white-space:nowrap;padding:8px 0;width:max-content;animation:mq 30s linear infinite}.tick b{color:var(--adk)}@keyframes mq{to{transform:translateX(-50%)}}',
      '.hdr{position:sticky;top:0;z-index:50;background:' + (light ? 'rgba(255,255,255,.92)' : 'color-mix(in srgb,var(--ink) 90%,transparent)') + ';backdrop-filter:blur(12px);border-bottom:1px solid ' + (light ? '#e3e8ee' : 'var(--line)') + '}',
      '.hdr .wrap{display:flex;align-items:center;gap:14px;min-height:70px}.logo{display:flex;align-items:center;gap:10px;text-decoration:none;min-width:0;margin-right:auto}.logo img{height:46px;width:auto;max-width:150px;object-fit:contain;border-radius:8px;background:#fff;padding:3px}',
      '.mono{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,var(--a2),var(--a));color:var(--on);font:800 1.1rem var(--disp);flex:none}.logo b{font:800 1.08rem var(--disp);line-height:1.1;display:block;max-width:240px}.logo small{display:block;font:500 .58rem var(--mono);letter-spacing:.18em;text-transform:uppercase;color:var(--adk)}' + (light ? '.logo small{color:var(--atx)}' : ''),
      '.nav{display:none;gap:4px}.nav a{text-decoration:none;padding:8px 12px;border-radius:99px;font-size:.93rem}.nav a:hover{background:rgba(127,127,127,.15)}@media(min-width:1000px){.nav{display:flex}}@media(max-width:560px){.hdr .go{display:none}.logo b{font-size:.95rem}}',
      '.hero{position:relative;overflow:hidden;padding:44px 0 40px;' + (light ? 'background:linear-gradient(180deg,#fff,#f1f4f7)' : '') + '}.hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(127,127,127,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(127,127,127,.08) 1px,transparent 1px);background-size:46px 46px;-webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 30%,#000 30%,transparent 80%);mask-image:radial-gradient(ellipse 80% 70% at 50% 30%,#000 30%,transparent 80%)}',
      '.hero .wrap{position:relative;display:grid;gap:30px}.hero .wrap>*{min-width:0}@media(min-width:960px){.hero .wrap{grid-template-columns:.92fr 1.08fr;align-items:center;gap:40px}}',
      '.pill{display:inline-flex;align-items:center;gap:8px;border:1px solid color-mix(in srgb,var(--a) 55%,transparent);border-radius:99px;padding:6px 14px;font:500 .68rem var(--mono);letter-spacing:.1em;text-transform:uppercase;max-width:100%}.pill i{width:7px;height:7px;border-radius:50%;background:#2fd27a;box-shadow:0 0 10px #2fd27a;animation:pu 1.8s infinite;flex:none}@keyframes pu{50%{opacity:.3}}',
      '.hero h1{margin:16px 0 14px}.lead{font-size:1.12rem;max-width:34em;opacity:.88}.cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}.checks{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:18px;font-size:.92rem;opacity:.9}.checks span{display:inline-flex;gap:6px;align-items:center}.checks .i{color:var(--adk);width:16px;height:16px}',
      '.need{margin-top:22px;border:1px solid ' + (light ? '#dfe5eb' : 'rgba(255,255,255,.16)') + ';background:' + (light ? '#fff' : 'rgba(255,255,255,.04)') + ';border-radius:18px;padding:14px}.need b{display:block;font:600 .66rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--adk);margin-bottom:8px}' + (light ? '.need b{color:var(--atx)}' : ''),
      '.chips{display:flex;flex-wrap:wrap;gap:6px}.chip{border:1px solid ' + (light ? '#cfd6dd' : 'rgba(255,255,255,.2)') + ';background:transparent;border-radius:99px;padding:7px 13px;font-size:.86rem;cursor:pointer;min-height:38px}.chip:hover,.chip[aria-pressed=true]{border-color:var(--a);background:color-mix(in srgb,var(--a) 18%,transparent)}',
      '.scard{border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.14);background:#060a0f;box-shadow:0 30px 70px -30px #000}.stop{display:flex;justify-content:space-between;gap:8px;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.1);font:500 .6rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:#dfe8ee}.stop span:first-child:before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:#ff4a3d;margin-right:7px;animation:pu 1.4s infinite}.stop span:last-child{color:var(--adk)}',
      '.scene{display:block;width:100%;height:auto}',
      '.strip{border-block:1px solid var(--line);background:var(--ink2)}' + (light ? '.strip{background:#fff;border-color:#e3e8ee}' : '') + '.strip .wrap{display:grid;grid-template-columns:repeat(2,1fr)}.strip div{padding:16px 12px}.strip b{display:block;font:800 1.45rem var(--disp)}.strip span{font:500 .62rem var(--mono);letter-spacing:.12em;text-transform:uppercase;opacity:.7}@media(min-width:820px){.strip .wrap{grid-template-columns:repeat(4,1fr)}}',
      '.cards{display:grid;gap:14px}@media(min-width:620px){.cards{grid-template-columns:1fr 1fr}}@media(min-width:980px){.cards{grid-template-columns:repeat(3,1fr)}}',
      '.card{background:#fff;color:var(--dk);border:1px solid var(--pline);border-radius:20px;padding:22px;display:grid;gap:9px;align-content:start;box-shadow:0 14px 30px -24px rgba(10,20,30,.45);transition:transform .2s}.card:hover{transform:translateY(-3px)}.card p{color:var(--dkm);font-size:.95rem}',
      '.tile{width:46px;height:46px;border-radius:14px;background:var(--ink);display:grid;place-items:center;color:var(--a2)}.tile .i{width:24px;height:24px}.card .lk{justify-self:start;background:none;border:0;padding:4px 0;color:var(--atx);font-weight:700;cursor:pointer;min-height:36px}',
      '.why{display:grid;gap:26px;align-items:center}.why>*{min-width:0}@media(min-width:940px){.why{grid-template-columns:1fr 1fr;gap:48px}}.wl{display:grid;gap:12px;margin-top:18px}.wl div{display:flex;gap:12px;border:1px solid var(--line);border-radius:16px;padding:14px;background:rgba(255,255,255,.03)}' + (light ? '.wl div{border-color:#dde3e9;background:#fff}' : '') + '.wl .i{color:var(--adk);margin-top:3px}.wl b{display:block}',
      '.ph{aspect-ratio:4/3;border-radius:22px;overflow:hidden;border:1px solid var(--line);background:var(--ink3);display:grid;place-items:center;text-align:center;color:var(--mut);font:500 .8rem var(--mono);padding:20px}.ph img{width:100%;height:100%;object-fit:cover}',
      '.gal{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}@media(min-width:800px){.gal{grid-template-columns:repeat(4,1fr)}}.gal button{border:0;padding:0;border-radius:16px;overflow:hidden;aspect-ratio:1;cursor:zoom-in;background:var(--ink3)}.gal img{width:100%;height:100%;object-fit:cover;transition:transform .4s}.gal button:hover img{transform:scale(1.05)}.gal .empty{display:grid;place-items:center;cursor:default;border:1.5px dashed #9fb0bf;color:#6b7b89;font:500 .72rem var(--mono);text-align:center;padding:10px;background:#eef2f5}',
      '.steps{display:grid;gap:12px}@media(min-width:900px){.steps{grid-template-columns:repeat(4,1fr)}}.st{border:1px solid var(--line);border-radius:18px;padding:20px;background:rgba(255,255,255,.03);display:grid;gap:8px;align-content:start}' + (light ? '.st{border-color:#dde3e9;background:#fff}' : '') + '.st .n{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--a2),var(--a));color:var(--on);display:grid;place-items:center;font:800 1rem var(--disp)}.st p{opacity:.8;font-size:.94rem}',
      '.rv{display:grid;gap:14px}@media(min-width:820px){.rv{grid-template-columns:repeat(3,1fr)}}.rq{background:#fff;color:var(--dk);border:1px solid var(--pline);border-radius:18px;padding:18px;display:grid;gap:8px}.rq.ph2{border-style:dashed;background:#f7f9fb;color:#6b7b89;font-size:.92rem}.stars{color:#f0a500;letter-spacing:2px}',
      '.ar{display:grid;gap:22px}.ar>*{min-width:0}@media(min-width:900px){.ar{grid-template-columns:1.1fr .9fr;align-items:start}}.towns{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}.towns span{border:1px solid var(--line);border-radius:99px;padding:5px 12px;font-size:.86rem}' + (light ? '.towns span{border-color:#d6dde4}' : '') + '.chk{display:flex;gap:8px;margin-top:16px}.chk input{flex:1;min-width:0;border-radius:99px;border:1px solid ' + (light ? '#c6ced6' : 'rgba(255,255,255,.25)') + ';background:' + (light ? '#fff' : 'rgba(0,0,0,.3)') + ';padding:0 16px;min-height:48px}.chkr{margin-top:10px;min-height:1.5em}',
      '.hrs{border:1px solid var(--line);border-radius:18px;padding:18px;display:grid;gap:10px}' + (light ? '.hrs{border-color:#dde3e9;background:#fff}' : '') + '.hrs div{display:flex;gap:10px;align-items:center}.hrs .i{color:var(--adk)}',
      '.qbox{max-width:760px;margin:0 auto;background:#fff;color:var(--dk);border-radius:24px;padding:clamp(18px,3vw,30px);box-shadow:0 24px 50px -34px rgba(0,0,0,.6);border:1px solid var(--pline)}.prog{display:flex;gap:6px;margin-bottom:16px}.prog i{flex:1;height:5px;border-radius:9px;background:#e3e8ee}.prog i.on{background:var(--a)}',
      '.opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}@media(min-width:620px){.opts{grid-template-columns:repeat(3,minmax(0,1fr))}}.opt{border:1.5px solid #c6ced6;background:#fff;border-radius:14px;padding:12px;text-align:left;cursor:pointer;min-height:54px;font-weight:600;font-size:.92rem}.opt[aria-pressed=true]{border-color:var(--atx);background:color-mix(in srgb,var(--a) 12%,#fff);box-shadow:inset 0 0 0 1px var(--atx)}',
      '.fld{display:grid;gap:6px;margin-bottom:14px}.fld label{font:600 .66rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:#3b4652}.fld input,.fld textarea{border:1.5px solid #c6ced6;border-radius:14px;padding:12px 14px;min-height:50px;width:100%;background:#fff;color:var(--dk)}.fld textarea{min-height:90px}.qnav{display:flex;justify-content:space-between;gap:10px;margin-top:10px;flex-wrap:wrap}.ok{border-radius:16px;padding:18px;background:color-mix(in srgb,var(--a) 10%,#fff);border:1px solid color-mix(in srgb,var(--a) 40%,#fff)}',
      '.fhq{display:grid;gap:24px;align-items:center}.fhq>*{min-width:0}@media(min-width:960px){.fhq{grid-template-columns:.9fr 1.1fr}}.fhqf{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:8px}.fhqf li{padding-left:24px;position:relative}.fhqf li:before{content:"\\25C6";position:absolute;left:2px;color:var(--adk);font-size:.7rem;top:.35em}',
      '.dash{border-radius:20px;border:1px solid rgba(255,255,255,.14);background:#0a1016;color:#e8eef3;overflow:hidden;box-shadow:0 30px 60px -30px #000}.dash .bar{display:flex;gap:6px;align-items:center;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.1);font:500 .62rem var(--mono);letter-spacing:.1em;color:#9fb0bf}.dash .bar i{width:10px;height:10px;border-radius:50%;background:#26323e}.dash .bar b{margin-left:auto;color:#00e5f0}',
      '.dash .in{display:grid;grid-template-columns:110px 1fr;min-height:280px}.dash nav{border-right:1px solid rgba(255,255,255,.08);padding:10px;display:grid;gap:4px;align-content:start;font-size:.78rem;color:#9fb0bf}.dash nav span{padding:6px 8px;border-radius:8px}.dash nav span.on{background:color-mix(in srgb,var(--a) 25%,transparent);color:#fff}@media(max-width:520px){.dash .in{grid-template-columns:1fr}.dash nav{display:none}}',
      '.dash .mn{padding:12px;display:grid;gap:8px;align-content:start}.kp{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.kp div{border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px}.kp b{display:block;font:800 1.25rem var(--disp)}.kp span{font:500 .5rem var(--mono);letter-spacing:.1em;text-transform:uppercase;color:#9fb0bf}',
      '.ld{display:flex;justify-content:space-between;gap:8px;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px 10px;font-size:.8rem}.ld em{font-style:normal;font:600 .58rem var(--mono);letter-spacing:.08em;text-transform:uppercase;color:#9fb0bf;white-space:nowrap}.ld.new{border-color:var(--a);background:color-mix(in srgb,var(--a) 14%,transparent);animation:pop .6s}.ld.new em{color:var(--a2)}@keyframes pop{from{transform:scale(.96);opacity:0}}',
      '.sms{justify-self:end;max-width:85%;background:#1f8f4e;color:#fff;border-radius:14px 14px 4px 14px;padding:8px 11px;font-size:.78rem}.dash small.n{font-size:.68rem;color:#7f8f9d}',
      '.faq{max-width:820px;margin:0 auto;display:grid;gap:10px}.faq details{background:#fff;color:var(--dk);border:1px solid var(--pline);border-radius:16px;padding:0 18px}.faq summary{cursor:pointer;list-style:none;font-weight:700;padding:16px 0;display:flex;justify-content:space-between;gap:12px;min-height:54px;align-items:center}.faq summary::-webkit-details-marker{display:none}.faq summary:after{content:"+";font-size:1.4rem;color:var(--atx)}.faq details[open] summary:after{content:"\\2212"}.faq p{color:var(--dkm);padding-bottom:16px}',
      '.final{text-align:center;background:radial-gradient(700px 340px at 50% 0,color-mix(in srgb,var(--a) 35%,transparent),transparent 70%),var(--ink);color:var(--txt)}.final p{max-width:34em;margin:12px auto 0;opacity:.85}.final .cta{justify-content:center}',
      'footer{background:#05080b;color:#a9b5c0;padding:44px 0 120px;font-size:.92rem}@media(min-width:980px){footer{padding-bottom:44px}}.fg{display:grid;gap:24px}@media(min-width:860px){.fg{grid-template-columns:1.3fr 1fr 1fr}}footer h4{margin:0 0 10px;font:600 .66rem var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--adk)}footer ul{list-style:none;margin:0;padding:0;display:grid;gap:6px}footer a{text-decoration:none;color:#d3dbe2}',
      '.pbox{margin-top:26px;background:#011F5D;border:1px solid #1d3f8a;border-radius:16px;padding:16px;color:#d7e4ff;font-size:.86rem;display:flex;gap:14px;align-items:center;flex-wrap:wrap}.pbox svg{width:26px;height:30px;flex:none}.pbox b{color:#fff;font-style:italic;letter-spacing:.04em}.pbox small{display:block;font-size:.72rem;color:#8fa8dc;margin-top:6px;line-height:1.5}',
      '.stk{position:fixed;z-index:60;left:0;right:0;bottom:0;display:flex;gap:8px;padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px));background:color-mix(in srgb,var(--ink) 95%,transparent);border-top:1px solid var(--line)}.stk .btn{flex:1;min-height:46px;padding:0 8px;font-size:.9rem}@media(min-width:980px){.stk{display:none}}',
      '.askb{position:fixed;z-index:62;right:14px;bottom:calc(78px + env(safe-area-inset-bottom,0px));border:0;border-radius:99px;min-height:52px;padding:0 18px;background:linear-gradient(135deg,var(--a2),var(--a));color:var(--on);font-weight:800;cursor:pointer;box-shadow:0 12px 30px -8px var(--a);display:flex;gap:8px;align-items:center}@media(min-width:980px){.askb{bottom:20px;right:20px}}',
      '.chat{position:fixed;z-index:81;left:0;right:0;bottom:0;height:min(520px,82vh);background:#0b1218;color:#eef3f7;border:1px solid #233140;border-radius:20px 20px 0 0;display:flex;flex-direction:column}@media(min-width:620px){.chat{left:auto;right:20px;bottom:20px;width:380px;border-radius:20px}}.chat header{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #233140}.chat .cm{flex:1;overflow:auto;padding:14px;display:grid;gap:8px;align-content:start}.msg{max-width:88%;padding:9px 12px;border-radius:14px;font-size:.92rem;white-space:pre-wrap}.msg.a{background:#14202b;border:1px solid #233140}.msg.u{justify-self:end;background:var(--a);color:var(--on)}.chat form{display:flex;gap:8px;padding:10px;border-top:1px solid #233140}.chat input{flex:1;min-width:0;border-radius:99px;border:1px solid #233140;background:#000;color:#fff;padding:0 14px;min-height:44px}.x{background:rgba(255,255,255,.1);border:0;color:#fff;border-radius:50%;width:38px;height:38px;cursor:pointer}',
      '.lb{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.92);display:grid;place-items:center;padding:16px}.lb img{max-height:84vh;max-width:92vw;border-radius:10px}.lb .x{position:absolute;top:14px;right:14px}',
      '.wm{position:fixed;z-index:40;pointer-events:none;right:-60px;top:46%;transform:rotate(-90deg);font:800 .7rem var(--mono);letter-spacing:.4em;color:rgba(127,127,127,.35)}',
      '.rvl{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s}.rvl.in{opacity:1;transform:none}',
      HERO ? HERO.shellCss + '\n' + HERO.css + (INSIDE ? '\n' + INSIDE.css : '') + '\n#inside .wrap{display:grid;gap:28px;align-items:center}#inside .wrap>*{min-width:0}@media(min-width:960px){#inside .wrap{grid-template-columns:.8fr 1.2fr;gap:44px}}#inside .hcard{max-width:720px;width:100%;justify-self:center}' : SC.CSS,
      '@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rvl{opacity:1;transform:none}}'
    ].join('\n');

    var navItems = [['#services', L.nav_services], ['#about', L.nav_about], ['#work', L.nav_work], ['#areas', L.nav_areas], ['#fieldhq', L.nav_login], ['#faq', L.nav_faq]];
    var tick = (copy.ticker || []).concat([fill(L.serving, { x: areas.slice(0, 4).join(' · ') || town })]).filter(Boolean);
    var tickRun = tick.map(function (x) { return '<span><b>&#9670;</b> ' + esc(x) + '</span>'; }).join('');
    var logoHtml = logo ? '<img src="' + esc(logo) + '" alt="' + esc(biz) + ' logo">' : '<span class="mono">' + esc(initials || 'B') + '</span>';
    var services = copy.services || [];
    var pickList = t.picks.slice(0, 6);

    var stats = [];
    if (intake.years) stats.push([esc(intake.years) + '+', esc(L.st_years)]);
    if (rating && rating <= 5) stats.push([rating.toFixed(1) + '&#9733;', esc(rcount ? fill(L.st_reviews, { n: rcount }) : L.st_rating)]);
    stats.push([t.emergency ? L.st_247 : esc(L.st_same), esc(t.emergency ? L.st_calltext : L.st_replies)]);
    stats.push([String(Math.max(areas.length, 1)), esc(areas.length > 1 ? L.st_towns : fill(L.st_home, { town: town }))]);
    stats.push([WD.zero, WD.est]);
    stats = stats.slice(0, 4);

    var gal = photos.length ? photos.map(function (p, i) { return '<button type="button" data-lb="' + i + '"><img src="' + esc(p) + '" alt="' + esc(biz) + ' ' + (i + 1) + '" loading="lazy"></button>'; }).join('')
      : [1, 2, 3, 4].map(function (i) { return '<div class="empty">' + esc(fill(L.photo_slot, { n: i }).toUpperCase()) + '<br>' + esc(L.goes_here) + '</div>'; }).join('');

    var rv = reviewText ? '<div class="rq"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><p>&ldquo;' + esc(reviewText.slice(0, 500)) + '&rdquo;</p><small class="mut">' + esc(fill(L.rv_cust, { biz: biz })) + '</small></div>' : '';
    var rvph = '<div class="rq ph2">' + esc(L.rv_ph) + '</div>';
    var reviewsHtml = rv + rvph + (rv ? '' : rvph) + rvph;

    var owner = String(intake.owner || '').trim();
    var html = '<!doctype html><html lang="' + lang + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>' + esc(biz) + (town ? ' | ' + esc(fill(L.title_in, { label: t.label.split(' /')[0], town: town })) : '') + '</title>' +
      '<meta name="description" content="' + esc(String(copy.sub || '').slice(0, 155)) + '">' +
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=' + F.href + '&family=JetBrains+Mono:wght@500;600&display=swap">' +
      '<style>' + css + '</style></head><body>' +
      (demo ? '<div class="ribbon"><b>DEMO</b> ' + esc(L.rib_built) + ' <b>PIETS TECHNOLOGY SOLUTIONS</b> &middot; <a href="tel:' + PIETS.tel + '">' + PIETS.phone + '</a> &middot; ' + esc(L.rib_preview) + '</div><div class="wm">DEMO &middot; PIETS</div>' : '') +
      '<div class="tick" aria-hidden="true"><div class="run">' + tickRun + tickRun + tickRun + tickRun + '</div></div>' +
      '<header class="hdr"><div class="wrap"><a class="logo" href="#top">' + logoHtml + '<span><b>' + esc(biz) + '</b><small>' + esc(t.label.split(' /')[0]) + (town ? ' &middot; ' + esc(town) : '') + '</small></span></a>' +
      '<nav class="nav" aria-label="Main">' + navItems.map(function (n) { return '<a href="' + n[0] + '">' + n[1] + '</a>'; }).join('') + '</nav>' +
      (telHref ? '<a class="btn gh sm" href="tel:' + telHref + '">' + icon('phone') + '<span>' + esc(phone) + '</span></a>' : '') + '<a class="btn go sm" href="#quote">' + WD.q + '</a></div></header>' +
      '<main id="top"><section class="hero"><div class="wrap"><div>' +
      '<span class="pill"><i></i>' + esc(t.label.split(' /')[0]) + ' &middot; ' + esc(town || L.local) + (t.emergency ? ' &middot; 24/7' : '') + '</span>' +
      '<h1>' + esc(copy.headline) + ' <em>' + esc(copy.highlight) + '</em></h1><p class="lead">' + esc(copy.sub) + '</p>' +
      '<div class="cta">' + (telHref ? '<a class="btn go" href="tel:' + telHref + '">' + icon('phone') + esc(fill(L.call_x, { phone: phone })) + '</a>' : '') + '<a class="btn gh" href="#quote">' + WD.q2 + ' &rarr;</a></div>' +
      '<div class="checks">' + WD.checks.map(function (c) { return '<span>' + icon('check') + c + '</span>'; }).join('') + '</div>' +
      '<div class="need"><b>' + esc(L.need) + '</b><div class="chips">' + pickList.map(function (p) { return '<button class="chip" type="button" data-pick="' + esc(p) + '">' + esc(p) + '</button>'; }).join('') + '</div></div></div>' +
      (HERO ? HERO.html : '<div class="scard"><div class="stop"><span>Live</span><span>' + esc(biz.slice(0, 26)) + '</span></div><svg class="scene" viewBox="0 0 640 360" role="img" aria-label="Animated ' + esc(t.label) + ' scene">' + scene + '</svg></div>') +
      '</div></section>' +
      '<div class="strip"><div class="wrap">' + stats.map(function (s) { return '<div><b>' + s[0] + '</b><span>' + s[1] + '</span></div>'; }).join('') + '</div></div>' +
      '<section class="lt" id="services"><div class="wrap"><div class="head"><span class="eye">' + esc(L.svc_eye) + '</span><h2>' + esc(L.svc_h) + ' <em>' + esc(town || L.your_area) + '</em></h2><p class="mut">' + esc(L.svc_p) + '</p></div><div class="cards">' +
      services.map(function (s) { return '<div class="card rvl"><span class="tile">' + icon(t.icon) + '</span><h3>' + esc(s.name) + '</h3><p>' + esc(s.desc) + '</p><button class="lk" type="button" data-pick="' + esc(s.name) + '">' + esc(L.req_this) + ' &rarr;</button></div>'; }).join('') + '</div></div></section>' +
      (INSIDE ? '<section id="inside"><div class="wrap"><div class="head" style="margin:0"><span class="eye">Interactive</span><h2>' + esc((INS_COPY[intake.trade] || ['See how we work'])[0]) + '</h2><p class="mut">' + esc((INS_COPY[intake.trade] || ['', ''])[1]) + '</p></div>' + INSIDE.html + '</div></section>' : '') +
      '<section class="d2" id="about"><div class="wrap why"><div class="ph rvl">' + (photos[0] ? '<img src="' + esc(photos[0]) + '" alt="' + esc(biz) + '">' : (logo ? '<img src="' + esc(logo) + '" alt="' + esc(biz) + ' logo" style="object-fit:contain;background:#fff;padding:30px">' : esc(L.team_slot.toUpperCase()))) + '</div>' +
      '<div><span class="eye">' + esc(fill(L.why_eye, { biz: biz })) + '</span><h2 style="margin:10px 0 14px">' + (owner ? esc(L.meet) + ' <em>' + esc(owner) + '</em>' : esc(L.real1) + ' <em>' + esc(L.real2) + '</em>') + '</h2><p class="mut">' + esc(copy.about) + '</p>' +
      '<div class="wl">' + (copy.why || []).map(function (w) { return '<div>' + icon('check') + '<span><b>' + esc(w.t) + '</b><span class="mut">' + esc(w.d) + '</span></span></div>'; }).join('') + '</div></div></div></section>' +
      '<section class="lt" id="work"><div class="wrap"><div class="head"><span class="eye">' + esc(L.work_eye) + '</span><h2>' + esc(L.work_h1) + ' <em>' + esc(L.work_h2) + '</em></h2></div><div class="gal">' + gal + '</div></div></section>' +
      '<section class="d2"><div class="wrap"><div class="head c"><span class="eye">' + esc(L.how_eye) + '</span><h2>' + esc(L.how_h1) + ' <em>' + esc(L.how_h2) + '</em></h2></div><div class="steps">' +
      (copy.process || []).map(function (p, i) { return '<div class="st rvl"><span class="n">' + (i + 1) + '</span><h3>' + esc(p.t) + '</h3><p>' + esc(p.d) + '</p></div>'; }).join('') + '</div></div></section>' +
      '<section class="lt" id="reviews"><div class="wrap"><div class="head"><span class="eye">' + esc(L.rev_eye) + '</span><h2>' + esc(L.rev_h1) + ' <em>' + esc(L.rev_h2) + '</em></h2>' + (rating ? '<p class="mut"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span> ' + esc(fill(L.on_google, { r: rating.toFixed(1) })) + (rcount ? ' ' + esc(fill(L.from_n, { n: rcount })) : '') + '</p>' : '') + '</div><div class="rv">' + reviewsHtml + '</div></div></section>' +
      '<section class="d2" id="areas"><div class="wrap ar"><div><span class="eye">' + esc(L.area_eye) + '</span><h2 style="margin:10px 0 12px">' + esc(L.area_h) + ' <em>' + esc(town || L.your_area) + '</em></h2><p class="mut">' + esc(L.area_p) + '</p>' +
      '<div class="towns">' + areas.map(function (a) { return '<span>' + esc(a) + '</span>'; }).join('') + '</div><form class="chk" data-chk><input aria-label="' + esc(L.your_town) + '" placeholder="' + esc(L.your_town) + '"><button class="btn go sm">' + esc(L.check) + '</button></form><div class="chkr" aria-live="polite"></div></div>' +
      '<div class="hrs">' + (telHref ? '<div>' + icon('phone') + '<a href="tel:' + telHref + '">' + esc(phone) + '</a></div>' : '') + '<div>' + icon('clock') + '<span>' + esc(hours) + '</span></div><div>' + icon('pin') + '<span>' + esc(town || L.local) + '</span></div>' + (intake.bizEmail ? '<div>' + icon('chat') + '<span>' + esc(intake.bizEmail) + '</span></div>' : '') + '</div></div></section>' +
      '<section class="lt" id="quote"><div class="wrap"><div class="head c"><span class="eye">' + WD.q + '</span><h2>' + WD.steps + ' <em>' + esc(L.q_steps) + '</em></h2></div><div class="qbox"><div class="prog"><i class="on"></i><i></i><i></i></div>' +
      '<div data-qs="1"><h3 style="margin-bottom:12px">' + esc(L.qs1) + '</h3><div class="opts">' + services.slice(0, 9).map(function (s) { return '<button class="opt" type="button" data-opt="' + esc(s.name) + '" aria-pressed="false">' + esc(s.name) + '</button>'; }).join('') + '</div></div>' +
      '<div data-qs="2" hidden><h3 style="margin-bottom:12px">' + esc(L.qs2) + '</h3><div class="fld"><label for="qd">' + esc(L.details) + '</label><textarea id="qd" placeholder="' + esc(L.details_ph) + '"></textarea></div><div class="fld"><label for="qp">' + esc(L.photos_opt) + '</label><input id="qp" type="file" accept="image/*" multiple></div></div>' +
      '<div data-qs="3" hidden><h3 style="margin-bottom:12px">' + esc(L.qs3) + '</h3><div class="fld"><label for="qn">' + esc(L.name) + '</label><input id="qn" autocomplete="name"></div><div class="fld"><label for="qph">' + esc(L.mobile) + '</label><input id="qph" type="tel" autocomplete="tel"></div><div class="fld"><label for="qt">' + esc(L.town) + '</label><input id="qt" value="' + esc(town) + '"></div></div>' +
      '<div data-qs="4" hidden><div class="ok"><h3>' + esc(L.recv) + '</h3><p style="margin-top:6px">' + esc(L.recv_p) + '</p><a class="btn go sm" href="#fieldhq" style="margin-top:10px">' + esc(L.see_hq) + ' &darr;</a></div></div>' +
      '<div class="qnav"><button class="btn gh sm" type="button" data-qback hidden>&larr; ' + esc(L.back) + '</button><button class="btn go" type="button" data-qnext>' + esc(L.next) + ' &rarr;</button></div></div></div></section>' +
      '<section class="d2" id="fieldhq"><div class="wrap fhq"><div><span class="eye">' + esc(L.hq_eye) + '</span><h2 style="margin:10px 0 12px">' + esc(L.hq_h1) + ' <em>' + esc(L.hq_h2) + '</em></h2><p class="mut">' + esc(L.hq_p) + '</p>' +
      '<ul class="fhqf">' + [L.hq_f1, L.hq_f2, L.hq_f3, L.hq_f4].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="dash" aria-label="Field HQ preview"><div class="bar"><i></i><i></i><i></i><span>FIELD HQ &middot; ' + esc(biz.toUpperCase().slice(0, 28)) + '</span><b>' + esc(L.h_live.toUpperCase()) + '</b></div><div class="in"><nav>' + L.hq_tabs.split('|').map(function (x, i) { return '<span' + (i ? '' : ' class="on"') + '>' + esc(x) + '</span>'; }).join('') + '</nav>' +
      '<div class="mn"><div class="kp"><div><b data-k="leads">0</b><span>' + esc(L.hq_k1) + '</span></div><div><b>0</b><span>' + esc(L.hq_k2) + '</span></div><div><b>0</b><span>' + esc(L.hq_k3) + '</span></div></div><div data-inbox><div class="ld"><span>' + esc(L.hq_wait1) + '</span><em>' + esc(L.hq_wait2) + '</em></div></div><small class="n">' + esc(L.hq_demo) + '</small></div></div></div></div></section>' +
      '<section class="d2" id="faq"><div class="wrap"><div class="head c"><span class="eye">' + esc(L.faq_eye) + '</span><h2>' + esc(L.faq_h1) + ' <em>' + esc(L.faq_h2) + '</em></h2></div><div class="faq">' +
      (copy.faq || []).map(function (f) { return '<details><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>'; }).join('') + '</div></div></section>' +
      '<section class="final"><div class="wrap"><h2>' + esc(fill(L.fin_h, { biz: biz })) + ' <em>' + esc(L.fin_em) + '</em></h2><p>' + esc(copy.cta) + '</p><div class="cta">' + (telHref ? '<a class="btn go" href="tel:' + telHref + '">' + esc(fill(L.call_x, { phone: phone })) + '</a><a class="btn gh" href="sms:' + telHref + '">' + esc(L.text_us) + '</a>' : '') + '<a class="btn gh" href="#quote">' + WD.q + '</a></div></div></section></main>' +
      '<footer><div class="wrap"><div class="fg"><div><a class="logo" href="#top" style="margin-bottom:12px">' + logoHtml + '<span><b style="color:#fff">' + esc(biz) + '</b></span></a><p>' + esc(String(copy.sub || '').slice(0, 160)) + '</p></div>' +
      '<div><h4>' + esc(L.ft_services) + '</h4><ul>' + services.slice(0, 6).map(function (s) { return '<li><a href="#services">' + esc(s.name) + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4>' + esc(L.ft_contact) + '</h4><ul>' + (telHref ? '<li><a href="tel:' + telHref + '">' + esc(fill(L.call_x, { phone: phone })) + '</a></li><li><a href="sms:' + telHref + '">' + esc(fill(L.text_x, { phone: phone })) + '</a></li>' : '') + '<li>' + esc(hours) + '</li>' + social.map(function (s) { return '<li><a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + s[0] + '</a></li>'; }).join('') + '</ul></div></div>' +
      '<p style="margin-top:22px;font-size:.8rem">&copy; ' + new Date().getFullYear() + ' ' + esc(biz) + '. ' + esc(L.rights) + '</p>' +
      '<div class="pbox"><svg viewBox="0 0 40 44" aria-hidden="true"><rect width="30" height="6" rx="3" fill="#00FFFF"/><rect y="9" width="36" height="6" rx="3" fill="#02D7F5"/><rect y="18" width="30" height="6" rx="3" fill="#01A2E8"/><rect y="27" width="8" height="6" rx="3" fill="#016FD6"/><rect y="36" width="8" height="6" rx="3" fill="#016FD6"/></svg>' +
      '<div>' + esc(L.web_by) + ' <b>PIETS TECHNOLOGY SOLUTIONS</b> &middot; <a href="tel:' + PIETS.tel + '">' + PIETS.phone + '</a> &middot; <a href="' + PIETS.url + '/websites">pietstechsolutions.com</a>' +
      '<small>' + esc(L.ai_note) + '</small></div></div></div></footer>' +
      '<nav class="stk" aria-label="Quick contact">' + (telHref ? '<a class="btn go" href="tel:' + telHref + '">' + esc(L.stk_call) + '</a><a class="btn gh" href="sms:' + telHref + '">' + esc(L.stk_text) + '</a>' : '') + '<a class="btn gh" href="#quote">' + esc(L.stk_quote) + '</a></nav>' +
      '<button class="askb" type="button" data-ask>' + icon('chat') + '<span>' + esc(L.ask) + '</span></button>' +
      '<div class="chat" data-chat hidden role="dialog" aria-label="' + esc(fill(L.ask_biz, { biz: biz })) + '"><header><b>' + esc(fill(L.ask_biz, { biz: biz })) + '</b><button class="x" type="button" data-chatx aria-label="' + esc(L.close) + '">&times;</button></header><div class="cm"></div><form><input placeholder="' + esc(L.type_q) + '" aria-label="' + esc(L.type_q) + '"><button class="btn go sm">' + esc(L.send) + '</button></form></div>' +
      '<script>window.__SITE__=' + JSON.stringify({ L: { next: L.next, send_req: L.send_req, js_new: L.js_new, js_auto: L.js_auto, js_request: L.js_request, js_yes: L.js_yes, js_check: L.js_check, js_us: L.js_us, js_hi: L.js_hi, js_svc: L.js_svc, js_else: L.js_else }, biz: biz, phone: phone, tel: telHref, areas: areas, faq: copy.faq || [], photos: photos.length, services: services.map(function (s) { return s.name; }) }).replace(/</g, '\\u003c') + ';</script>' +
      '<script>(' + siteScript.toString() + ')();</script>' + (HERO ? '<script>' + HERO.run.replace(/<\/script/gi, '<\\/script') + '</script>' : '') + (INSIDE ? '<script>' + INSIDE.run.replace(/<\/script/gi, '<\\/script') + '</script>' : '') + '</body></html>';
    return html;
  }

  /* runs inside the generated demo site */
  function siteScript() {
    document.addEventListener('click', function (e) { if (e.defaultPrevented) return; var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return; var id = a.getAttribute('href').slice(1), el = id ? document.getElementById(id) : document.body; e.preventDefault(); if (el) el.scrollIntoView({ behavior: 'smooth' }); });
    var D = window.__SITE__, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
    var picked = '', T = D.L, F = function (s, v) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }); };
    function goQuote(name) {
      picked = name; $$('[data-opt]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-opt') === name ? 'true' : 'false'); });
      $$('[data-pick]').forEach(function (b) { if (b.classList.contains('chip')) b.setAttribute('aria-pressed', b.getAttribute('data-pick') === name ? 'true' : 'false'); });
      var q = $('#quote'); if (q) q.scrollIntoView({ behavior: 'smooth' });
      var d = $('#qd'); if (d && !d.value && name) d.value = name + ': ';
    }
    $$('[data-pick]').forEach(function (b) { b.addEventListener('click', function () { goQuote(b.getAttribute('data-pick')); }); });
    document.addEventListener('hero-pick', function (e) { var want = String(e.detail || ''), opts = $$('[data-opt]').map(function (b) { return b.getAttribute('data-opt'); }); var hit = opts.filter(function (o) { return o.toLowerCase() === want.toLowerCase(); })[0] || opts.filter(function (o) { var a = o.toLowerCase(), w = want.toLowerCase().split(' ')[0]; return a.indexOf(w) > -1; })[0] || want; goQuote(hit); });
    var step = 1;
    function show() { $$('[data-qs]').forEach(function (s) { s.hidden = +s.getAttribute('data-qs') !== step; }); $$('.prog i').forEach(function (i, n) { i.classList.toggle('on', n < Math.min(step, 3)); }); $('[data-qback]').hidden = step === 1 || step === 4; $('[data-qnext]').hidden = step === 4; $('[data-qnext]').textContent = step === 3 ? T.send_req : T.next + ' \u2192'; }
    $$('[data-opt]').forEach(function (b) { b.addEventListener('click', function () { picked = b.getAttribute('data-opt'); $$('[data-opt]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); }); });
    $('[data-qnext]').addEventListener('click', function () {
      if (step === 1 && !picked) { var f = $('[data-opt]'); if (f) f.focus(); return; }
      if (step === 3 && (!$('#qn').value.trim() || $('#qph').value.replace(/\D/g, '').length < 10)) { ($('#qn').value.trim() ? $('#qph') : $('#qn')).focus(); return; }
      step++; show();
      if (step === 4) addLead();
    });
    function addLead() {
      var box = $('[data-inbox]'); if (!box) return;
      var first = box.querySelector('.ld'); if (first && !first.classList.contains('new')) first.remove();
      var n = $('#qn').value.trim(), town = $('#qt').value.trim();
      var row = document.createElement('div'); row.className = 'ld new';
      var a = document.createElement('span'); a.textContent = n + ' \u00b7 ' + (picked || T.js_request) + (town ? ' \u00b7 ' + town : '');
      var b = document.createElement('em'); b.textContent = T.js_new;
      row.appendChild(a); row.appendChild(b); box.insertBefore(row, box.firstChild);
      var sms = document.createElement('div'); sms.className = 'sms';
      sms.textContent = F(T.js_auto, { n: n.split(' ')[0], biz: D.biz });
      box.insertBefore(sms, row.nextSibling);
      var k = $('[data-k=leads]'); if (k) k.textContent = String(+k.textContent + 1);
    }
    $('[data-qback]').addEventListener('click', function () { step = Math.max(1, step - 1); show(); });
    var chk = $('[data-chk]'); if (chk) chk.addEventListener('submit', function (e) {
      e.preventDefault(); var v = chk.querySelector('input').value.trim().toLowerCase(); var r = $('.chkr'); if (!v) return;
      var hit = D.areas.filter(function (a) { return a.toLowerCase().indexOf(v) > -1 || v.indexOf(a.toLowerCase()) > -1; })[0];
      r.textContent = hit ? F(T.js_yes, { x: hit }) : F(T.js_check, { phone: D.phone || T.js_us, x: chk.querySelector('input').value.trim() });
    });
    var chat = $('[data-chat]'), cm = chat.querySelector('.cm');
    function say(t, who) { var m = document.createElement('div'); m.className = 'msg ' + who; m.textContent = t; cm.appendChild(m); cm.scrollTop = cm.scrollHeight; }
    $('[data-ask]').addEventListener('click', function () { chat.hidden = false; if (!cm.children.length) say(T.js_hi, 'a'); chat.querySelector('input').focus(); });
    $('[data-chatx]').addEventListener('click', function () { chat.hidden = true; });
    chat.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault(); var i = chat.querySelector('input'), q = i.value.trim(); if (!q) return; say(q, 'u'); i.value = '';
      var words = q.toLowerCase().split(/[\s.,!?;:()"']+/).filter(function (w) { return w.length > 3; });
      var best = null, bs = 0; D.faq.forEach(function (f) { var s = 0, txt = (f.q + ' ' + f.a).toLowerCase(); words.forEach(function (w) { if (txt.indexOf(w) > -1) s++; }); if (s > bs) { bs = s; best = f; } });
      var svc = D.services.filter(function (s) { return q.toLowerCase().indexOf(s.toLowerCase().split(' ')[0]) > -1; })[0];
      setTimeout(function () {
        if (best && bs) say(best.a, 'a'); else if (svc) say(F(T.js_svc, { x: svc.toLowerCase() }), 'a');
        else say(F(T.js_else, { phone: D.phone || T.js_us }), 'a');
      }, 350);
    });
    $$('[data-lb]').forEach(function (b) { b.addEventListener('click', function () { var d = document.createElement('div'); d.className = 'lb'; d.innerHTML = '<button class="x" aria-label="Close">&times;</button>'; var im = document.createElement('img'); im.src = b.querySelector('img').src; im.alt = ''; d.appendChild(im); d.addEventListener('click', function () { d.remove(); }); document.body.appendChild(d); }); });
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 }); $$('.rvl').forEach(function (el) { io.observe(el); }); } else $$('.rvl').forEach(function (el) { el.classList.add('in'); });
    setTimeout(function () { $$('.rvl').forEach(function (el) { el.classList.add('in'); }); }, 2500);
  }

  g.PietsEngine = { buildSite: buildSite, defaultCopy: defaultCopy, mergeCopy: mergeCopy, palette: palette, esc: esc, fmtPhone: fmtPhone, tel: tel, trades: TR.T, tradeL: tradeL, UI_EN: UI_EN, WORDS: WORDS, pack: pack,
    LANGS: [['en', 'English'], ['es', 'Español'], ['fr', 'Français'], ['de', 'Deutsch'], ['pt', 'Português'], ['it', 'Italiano'], ['pl', 'Polski']] };
})(typeof window !== 'undefined' ? window : globalThis);
