/* Piets Site Studio — wizard, uploads, AI copy call, live preview, plans + payment.
   Piets Technology Solutions Inc · 631-871-5957 */
(function () {
  'use strict';
  var E = window.PietsEngine, CFG = window.STUDIO_CONFIG || { tiers: [], stripeLinks: {}, depositPercent: 50 };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var KEY = 'piets_studio_v1';
  function T(str, v) { if (window.PietsUI) return window.PietsUI.T(str, v); return v ? String(str).replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }) : str; }
  var state = { step: 1, trade: '', services: [], custom: [], vibe: [], style: 'dark', color: '', logo: null, photos: [], copy: null, html: '', sent: false, aiUsed: false };
  var ICONS = { plumbing: 'drop', hvac: 'fan', electrical: 'bolt', landscaping: 'leaf', auto: 'car', detailing: 'sparkle', contractor: 'hammer', cleaning: 'spray', restaurant: 'plate', beauty: 'scissors', health: 'heart', fitness: 'dumbbell', tech: 'wifi', other: 'store' };
  var SVG = { drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>', fan: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 4-7s2 5-2 7M14 12c4 0 7 1 7 4s-5 2-7-2M12 14c0 4-1 7-4 7s-2-5 2-7M10 12c-4 0-7-1-7-4s5-2 7 2"/>', bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>', leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>', car: '<path d="M3 16v-3l2-5h14l2 5v3"/><path d="M3 16h18"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>', sparkle: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>', hammer: '<path d="M14 6l4 4-9 9-4-4z"/><path d="M14 6l2-2 4 4-2 2"/>', spray: '<rect x="7" y="9" width="8" height="12" rx="2"/><path d="M9 9V6h4v3M13 6h3"/>', plate: '<circle cx="12" cy="13" r="7"/><circle cx="12" cy="13" r="3"/>', scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8.5 20 20M8.5 15.5 20 4"/>', heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>', dumbbell: '<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>', wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/>', store: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18"/>' };
  var VIBES = ['Premium', 'Friendly', 'Fast', 'Family-owned', 'Modern', 'Old-school quality', 'Eco-friendly', 'No-nonsense'];
  var COLORS = ['#1e88e5', '#0ea5a4', '#2fbf4f', '#f5b301', '#ef6c35', '#e8452a', '#d9467a', '#7c5cff', '#e0aa78', '#22303c'];
  var FIELDS = ['biz', 'phone', 'lang', 'town', 'owner', 'years', 'bizEmail', 'diff', 'areas', 'hours', 'site', 'fb', 'ig', 'rating', 'reviewsCount', 'review', 'cname', 'cmobile', 'cemail'];

  function toast(m) { var t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(function () { t.hidden = true; }, 3200); }
  function money(n) { return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  function field(n) { var el = $('#f_' + n); return el ? el.value.trim() : ''; }
  function digits(s) { return String(s || '').replace(/\D/g, ''); }

  /* ---------- save / restore (text only, never photos) ---------- */
  function save() {
    try {
      var o = { step: state.step, trade: state.trade, services: state.services, custom: state.custom, vibe: state.vibe, style: state.style, color: state.color, f: {} };
      FIELDS.forEach(function (n) { o.f[n] = field(n); });
      localStorage.setItem(KEY, JSON.stringify(o));
    } catch (e) { /* storage blocked: fine */ }
  }
  function restore() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (!o) return;
      FIELDS.forEach(function (n) { var el = $('#f_' + n); if (el && o.f && o.f[n] != null) el.value = o.f[n]; });
      ['trade', 'services', 'custom', 'vibe', 'style', 'color'].forEach(function (k) { if (o[k] != null) state[k] = o[k]; });
    } catch (e) { }
  }

  /* ---------- step 1: trades ---------- */
  function renderTrades() {
    var g = $('#tradeGrid'); g.innerHTML = '';
    Object.keys(E.trades).forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'trade'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', state.trade === k ? 'true' : 'false'); b.dataset.trade = k;
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + SVG[ICONS[k] || 'store'] + '</svg><span></span>'; b.querySelector('span').textContent = E.trades[k].label;
      b.addEventListener('click', function () {
        if (state.trade !== k) { state.trade = k; state.services = []; if (!state.colorFromLogo && !state.colorPicked) state.color = ''; }
        $$('.trade').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        renderServices(); renderColors(); save();
      });
      g.appendChild(b);
    });
  }
  /* ---------- step 2: services ---------- */
  function renderServices() {
    var c = $('#svcChips'); c.innerHTML = '';
    var t = E.trades[state.trade] || E.trades.other;
    var all = t.services.map(function (s) { return s[0]; }).concat(state.custom);
    if (!state.services.length) state.services = all.slice(0, 4);
    all.forEach(function (n) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = n;
      b.setAttribute('aria-pressed', state.services.indexOf(n) > -1 ? 'true' : 'false');
      b.addEventListener('click', function () { var i = state.services.indexOf(n); if (i > -1) state.services.splice(i, 1); else state.services.push(n); b.setAttribute('aria-pressed', i > -1 ? 'false' : 'true'); save(); });
      c.appendChild(b);
    });
  }
  function addCustom() {
    var i = $('#svcAdd'), v = i.value.trim().slice(0, 40); if (!v) return;
    if (state.custom.indexOf(v) < 0) state.custom.push(v); if (state.services.indexOf(v) < 0) state.services.push(v);
    i.value = ''; renderServices(); save();
  }
  /* ---------- step 4: look ---------- */
  function renderColors() {
    var c = $('#colors'); c.innerHTML = '';
    var t = E.trades[state.trade] || E.trades.other;
    var list = [];
    if (state.logoColor) list.push(state.logoColor);
    list.push(t.color); COLORS.forEach(function (x) { if (list.indexOf(x) < 0) list.push(x); });
    if (!state.color) state.color = state.logoColor || t.color;
    list.slice(0, 10).forEach(function (hex) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'cbtn'; b.style.background = hex; b.setAttribute('aria-label', T('Color {x}', { x: hex }) + (hex === state.logoColor ? ' ' + T('(from your logo)') : ''));
      b.setAttribute('aria-pressed', hex.toLowerCase() === String(state.color).toLowerCase() ? 'true' : 'false');
      b.addEventListener('click', function () { state.color = hex; state.colorPicked = true; $$('.cbtn').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); save(); });
      c.appendChild(b);
    });
    var lab = document.createElement('label'); lab.className = 'cpick'; lab.innerHTML = '<input type="color" aria-label="Custom color"> <span>Custom</span>';
    var inp = lab.querySelector('input'); inp.value = /^#[0-9a-f]{6}$/i.test(state.color) ? state.color : '#1e88e5';
    inp.addEventListener('input', function () { state.color = inp.value; state.colorPicked = true; $$('.cbtn').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); save(); });
    c.appendChild(lab);
    $('#colorNote').textContent = state.logoColor ? '(first one is from your logo)' : '';
  }
  function renderVibes() {
    var c = $('#vibeChips'); c.innerHTML = '';
    VIBES.forEach(function (v) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = v; b.setAttribute('aria-pressed', state.vibe.indexOf(v) > -1 ? 'true' : 'false');
      b.addEventListener('click', function () { var i = state.vibe.indexOf(v); if (i > -1) state.vibe.splice(i, 1); else state.vibe.push(v); b.setAttribute('aria-pressed', i > -1 ? 'false' : 'true'); save(); });
      c.appendChild(b);
    });
    $$('[data-style]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.style === state.style ? 'true' : 'false');
      b.onclick = function () { state.style = b.dataset.style; $$('[data-style]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); save(); };
    });
  }

  /* ---------- step 3: uploads (shrunk on device) ---------- */
  function readImg(file, max, type, q) {
    return new Promise(function (res, rej) {
      if (!file || !/^image\//.test(file.type)) return rej(new Error('Not an image'));
      if (file.size > 25 * 1024 * 1024) return rej(new Error('Image too big'));
      var url = URL.createObjectURL(file), im = new Image();
      im.onload = function () {
        var s = Math.min(1, max / Math.max(im.width, im.height)), w = Math.max(1, Math.round(im.width * s)), h = Math.max(1, Math.round(im.height * s));
        var cv = document.createElement('canvas'); cv.width = w; cv.height = h; var cx = cv.getContext('2d');
        if (type === 'image/jpeg') { cx.fillStyle = '#fff'; cx.fillRect(0, 0, w, h); }
        cx.drawImage(im, 0, 0, w, h); URL.revokeObjectURL(url);
        res({ data: cv.toDataURL(type, q), canvas: cv });
      };
      im.onerror = function () { URL.revokeObjectURL(url); rej(new Error('Could not read image')); };
      im.src = url;
    });
  }
  function brandColor(cv) {
    try {
      var s = 48, c2 = document.createElement('canvas'); c2.width = s; c2.height = s; var x = c2.getContext('2d'); x.drawImage(cv, 0, 0, s, s);
      var d = x.getImageData(0, 0, s, s).data, bins = {};
      for (var i = 0; i < d.length; i += 4) {
        var r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3]; if (a < 140) continue;
        var mx = Math.max(r, g, b), mn = Math.min(r, g, b), sat = mx ? (mx - mn) / mx : 0;
        if (sat < .35 || mx < 60 || mx > 250 && mn > 200) continue;
        var k = (r >> 5) + ',' + (g >> 5) + ',' + (b >> 5); bins[k] = bins[k] || { n: 0, r: 0, g: 0, b: 0 }; var o = bins[k]; o.n++; o.r += r; o.g += g; o.b += b;
      }
      var best = null; for (var k2 in bins) if (!best || bins[k2].n > best.n) best = bins[k2];
      if (!best || best.n < 6) return '';
      return '#' + [best.r, best.g, best.b].map(function (v) { v = Math.round(v / best.n); return (v < 16 ? '0' : '') + v.toString(16); }).join('');
    } catch (e) { return ''; }
  }
  function renderThumbs() {
    var t = $('#thumbs'); t.innerHTML = '';
    state.photos.forEach(function (p, i) {
      var d = document.createElement('div'); d.className = 'thumb'; d.innerHTML = '<img alt=""><button type="button" aria-label="Remove photo">&times;</button>'; d.querySelector('img').src = p;
      d.querySelector('button').onclick = function () { state.photos.splice(i, 1); renderThumbs(); };
      t.appendChild(d);
    });
  }
  function wireUploads() {
    $('#f_logo').addEventListener('change', function (e) {
      var f = e.target.files[0]; if (!f) return;
      readImg(f, 600, 'image/png').then(function (r) {
        state.logo = r.data; var pv = $('#logoPrev'); pv.src = r.data; pv.hidden = false;
        var c = brandColor(r.canvas); if (c) { state.logoColor = c; state.colorFromLogo = true; if (!state.colorPicked) state.color = c; toast('Got your brand color from your logo.'); }
        renderColors();
      }).catch(function (er) { toast(er.message); });
    });
    $('#f_photos').addEventListener('change', function (e) {
      var files = Array.prototype.slice.call(e.target.files).slice(0, 8 - state.photos.length);
      if (!files.length) { toast('8 photos max.'); return; }
      Promise.all(files.map(function (f) { return readImg(f, 1200, 'image/jpeg', .66).catch(function () { return null; }); })).then(function (rs) {
        rs.forEach(function (r) { if (r) state.photos.push(r.data); }); renderThumbs(); e.target.value = '';
      });
    });
  }

  /* ---------- phones (worldwide): 7-15 digits; +country kept as typed ---------- */
  function okPhone(v) { if (/[A-Za-z]/.test(String(v || ''))) return false; var d = digits(v); return d.length >= 7 && d.length <= 15 && (/^\s*(\+|00)/.test(v) || d.length >= 10 || d.length === 7); }
  /* ---------- languages: packs load on demand from /assets/site-studio/lang/xx.js ---------- */
  var LANG_BASE = (function () { var s = document.querySelector('script[src*="site-studio/engine.js"]'); return s ? s.getAttribute('src').replace(/engine\.js.*$/, '') : '/assets/site-studio/'; })();
  var langWait = {};
  function loadLang(code) {
    if (!code || code === 'en' || (window.PietsLang && window.PietsLang[code])) return Promise.resolve(true);
    if (langWait[code]) return langWait[code];
    return (langWait[code] = new Promise(function (ok) {
      var sc = document.createElement('script'); sc.src = LANG_BASE + 'lang/' + code + '.js'; sc.async = true;
      sc.onload = function () { ok(true); }; sc.onerror = function () { delete langWait[code]; ok(false); };
      document.head.appendChild(sc); setTimeout(function () { ok(!!(window.PietsLang && window.PietsLang[code])); }, 8000);
    }));
  }
  function renderLangs() {
    var sel = $('#f_lang'); if (!sel || sel.options.length) return;
    (E.LANGS || [['en', 'English']]).forEach(function (l) { var o = document.createElement('option'); o.value = l[0]; o.textContent = l[1]; sel.appendChild(o); });
    var nav = String((navigator.languages && navigator.languages[0]) || navigator.language || 'en').slice(0, 2).toLowerCase();
    sel.value = (E.LANGS || []).some(function (l) { return l[0] === nav; }) ? nav : 'en';
    sel.addEventListener('change', function () { loadLang(sel.value); });
  }

  /* ---------- wizard nav + validation ---------- */
  function errorOut(msg, el) { var e = $('#wizErr'); e.textContent = msg; e.hidden = false; if (el) { el.setAttribute('aria-invalid', 'true'); el.focus(); } }
  function validate(step) {
    $('#wizErr').hidden = true; $$('[aria-invalid]').forEach(function (x) { x.removeAttribute('aria-invalid'); });
    if (step === 1) {
      if (!field('biz')) return errorOut('Add your business name.', $('#f_biz'));
      if (!okPhone(field('phone'))) return errorOut('Add your business phone (with country code if outside the US or Canada).', $('#f_phone'));
      if (!state.trade) return errorOut('Pick what kind of business you are.', $('.trade'));
      if (!field('town')) return errorOut('Add your main town or city.', $('#f_town'));
    }
    if (step === 2 && !state.services.length) return errorOut('Pick at least one service.', $('#svcChips .chip'));
    if (step === 3) { var r = field('rating'); if (r && !(parseFloat(r) > 0 && parseFloat(r) <= 5)) return errorOut('Google rating should be between 1 and 5.', $('#f_rating')); }
    if (step === 5) {
      if (!field('cname')) return errorOut('Add your name.', $('#f_cname'));
      if (!okPhone(field('cmobile'))) return errorOut('Add your mobile so we can text your demo (with country code if outside the US or Canada).', $('#f_cmobile'));
      var em = field('cemail'); if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return errorOut('That email looks off.', $('#f_cemail'));
    }
    return true;
  }
  function go(step) {
    state.step = step;
    $$('.ws').forEach(function (f) { f.hidden = +f.dataset.step !== step; });
    $$('#stepper li').forEach(function (li, i) { li.className = i + 1 < step ? 'done' : (i + 1 === step ? 'on' : ''); });
    $('#backBtn').hidden = step === 1;
    $('#nextBtn').textContent = step === 5 ? T('Build my demo') + ' \u26A1' : T('Next') + ' \u2192';
    if (step === 2) renderServices(); if (step === 4) { renderColors(); renderVibes(); }
    save();
    var w = $('#wiz'); if (w.getBoundingClientRect().top < 0) w.scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------- build ---------- */
  function intake(withImages) {
    var o = {};
    FIELDS.forEach(function (n) { o[n] = field(n); });
    o.trade = state.trade; o.services = state.services.slice(0, 12); o.vibe = state.vibe; o.style = state.style; o.color = state.color;
    o.areas = String(o.areas || '').split(/[,;\n]/).map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 18);
    if (o.areas.length && o.town && o.areas.map(function (a) { return a.toLowerCase(); }).indexOf(o.town.toLowerCase()) < 0) o.areas.unshift(o.town);
    o.hasLogo = !!state.logo; o.photoCount = state.photos.length;
    o.consent = !!(document.getElementById('f_ok') && document.getElementById('f_ok').checked);
    if (withImages) { o.logo = state.logo; o.photos = state.photos; }
    return o;
  }
  function stepAnim(i) { $$('#blist li').forEach(function (li, n) { li.classList.toggle('on', n <= i); }); }
  function fetchJSON(url, body, ms) {
    var ctl = 'AbortController' in window ? new AbortController() : null, t = ctl && setTimeout(function () { ctl.abort(); }, ms);
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j._status = r.status; return j; }); })
      .finally(function () { if (t) clearTimeout(t); });
  }
  var building = false;
  function build() {
    if (document.querySelector('.hp').value) return; // bot
    if (building) return; building = true; setTimeout(function () { building = false; }, 8000);
    var it = intake(false);
    $('#wiz').hidden = true; $('#building').hidden = false; stepAnim(0);
    $('#building').scrollIntoView({ behavior: 'smooth', block: 'center' });
    var base;
    setTimeout(function () { stepAnim(1); }, 700);
    loadLang(it.lang).then(function () { base = E.defaultCopy(it); return fetchJSON('/api/site-demo', { intake: it }, 30000); }).then(function (j) {
      if (j && j.ok && j.copy) { state.aiUsed = true; return E.mergeCopy(base, j.copy); }
      state.aiUsed = false; return base;
    }).catch(function () { state.aiUsed = false; return base || E.defaultCopy(it); }).then(function (copy) {
      stepAnim(2); state.copy = copy;
      setTimeout(function () {
        stepAnim(3);
        var full = intake(true);
        state.html = E.buildSite(full, copy, { demo: true });
        setTimeout(showPreview, 500);
        sendIntake('demo');
      }, 500);
    });
  }
  function showPreview() {
    building = false;
    $('#building').hidden = true; $('#wiz').hidden = false;
    var pv = $('#preview'); pv.hidden = false;
    $('#pvFrame').srcdoc = state.html;
    $('#pvTitle').innerHTML = ''; $('#pvTitle').appendChild(document.createTextNode(field('biz') + ' ')); var em = document.createElement('em'); em.textContent = T('is looking good.'); $('#pvTitle').appendChild(em);
    $('#pvNote').textContent = T(state.aiUsed ? 'Copy written by AI from your answers.' : 'Built from our templates for your trade.') + ' ' + T('Scroll it, tap it, try the quote form and the Field HQ inbox.');
    pv.scrollIntoView({ behavior: 'smooth' });
    renderTiers();
  }

  /* ---------- send to Piets (email + attachments) ---------- */
  function sendIntake(action, tier) {
    var it = intake(false);
    var files = [];
    if (state.logo) files.push({ name: 'logo.png', data: state.logo });
    state.photos.forEach(function (p, i) { files.push({ name: 'photo-' + (i + 1) + '.jpg', data: p }); });
    // email copy of the demo points at attachment file names to stay small
    var lite = Object.assign({}, intake(false), { logo: state.logo ? 'logo.png' : '', photos: state.photos.map(function (p, i) { return 'photo-' + (i + 1) + '.jpg'; }) });
    var demoHtml = state.copy ? E.buildSite(lite, state.copy, { demo: true }) : '';
    var body = { action: action, tier: tier || '', intake: it, copy: state.copy, aiUsed: state.aiUsed, demoHtml: demoHtml, files: files, page: location.pathname, referrer: document.referrer.slice(0, 200), website: document.querySelector('.hp').value };
    var size = JSON.stringify(body).length;
    var before = body.files.length;
    while (size > 4000000 && body.files.length > 1) { body.files.pop(); size = JSON.stringify(body).length; }
    body.droppedFiles = before - body.files.length;
    if (body.droppedFiles && action === 'demo') toast('A few photos were too big to send. Piets will ask you for them.');
    return fetchJSON('/api/site-intake', body, 12000).then(function (j) {
      if (j && j.ok) { state.sent = true; return true; }
      throw new Error('not ok');
    }).catch(function () {
      if (action === 'invoice') showPay(T('We could not reach our system automatically'), T('Tap below to text Piets directly and we will get you set up right away.'), [smsBtn(((CFG.tiers || []).filter(function (x) { return x.id === tier; })[0] || {}).name || tier)]);
      return false;
    });
  }
  function smsBtn(tier) {
    var a = document.createElement('a'); a.className = 'btn btn-go'; a.href = 'sms:+16318715957?&body=' + encodeURIComponent('Hi Piets, this is ' + field('cname') + ' from ' + field('biz') + '. I built a website demo and want the ' + (tier || '') + ' plan.'); a.textContent = 'Text Piets 631-871-5957'; return a;
  }

  /* ---------- plans + payment ---------- */
  function renderTiers() {
    var box = $('#tiers'); box.innerHTML = '';
    var pct = CFG.depositPercent || 50;
    var anyPrice = CFG.tiers.some(function (t) { return t.setup != null; });
    $('#depNote').textContent = anyPrice ? T('{x}% deposit starts your build. The rest is due when your site goes live. Monthly starts after launch. No long contract.', { x: pct }) : 'Pricing is coming soon. Build your free demo, pick the plan you like, and Piets will text you the details. Nothing is due today.';
    $('#feeNote').textContent = anyPrice ? T(CFG.cardFeeNote || '') : '';
    CFG.tiers.forEach(function (t) {
      var priced = t.setup != null, dep = priced ? Math.round(t.setup * pct) / 100 : null;
      var d = document.createElement('div'); d.className = 'tier' + (t.popular ? ' pop' : '') + (t.vip ? ' vip' : '');
      d.innerHTML = (t.popular || t.vip ? '<span class="badge"></span>' : '') + '<span class="tg2"></span><h3></h3><div class="price"></div><div class="mo"></div><ul></ul><p class="dep"></p><button class="btn btn-go" type="button"></button><button class="btn btn-ghost" type="button">Send me an invoice</button>';
      if (t.popular || t.vip) d.querySelector('.badge').textContent = t.vip ? 'All in' : 'Most popular';
      d.querySelector('.tg2').textContent = t.tag; d.querySelector('h3').textContent = t.name;
      d.querySelector('.price').innerHTML = priced ? money(t.setup) + ' <small>setup</small>' : 'Pricing <small>coming soon</small>';
      d.querySelector('.mo').textContent = priced ? T('+ {x}/mo', { x: money(t.monthly) }) : '';
      t.features.forEach(function (f) { var li = document.createElement('li'); li.textContent = f; d.querySelector('ul').appendChild(li); });
      d.querySelector('.dep').textContent = priced ? T('Deposit today: {x}', { x: money(dep) }) : 'No payment today';
      var payB = d.querySelectorAll('button')[0], invB = d.querySelectorAll('button')[1];
      var link = priced ? (CFG.stripeLinks || {})[t.id] : '';
      if (t.vip) { payB.textContent = link ? 'Pay deposit by card' : 'Book my Shabang call'; } else payB.textContent = link ? 'Pay deposit by card' : (priced ? T('Start with {x}', { x: T(t.name) }) : 'Ask about ' + T(t.name));
      payB.addEventListener('click', function () { choose(t, link ? 'card' : 'invoice'); });
      invB.addEventListener('click', function () { choose(t, 'invoice'); });
      if (!priced) invB.style.display = 'none';
      box.appendChild(d);
    });
  }
  function needDemo() {
    toast('Build your free demo first (1 minute), then pick your plan.');
    $('#build').scrollIntoView({ behavior: 'smooth' });
  }
  var choosing = false;
  function choose(t, how) {
    if (!state.html || !field('cname') || !okPhone(field('cmobile'))) { needDemo(); return; }
    if (choosing) return; choosing = true; setTimeout(function () { choosing = false; }, 1500);
    var priced = t.setup != null, dep = priced ? Math.round(t.setup * (CFG.depositPercent || 50)) / 100 : null;
    if (!priced) how = 'invoice';
    if (how === 'card') {
      sendIntake('deposit_click', t.id);
      var url = CFG.stripeLinks[t.id];
      try { var u = new URL(url); if (field('cemail')) u.searchParams.set('prefilled_email', field('cemail')); u.searchParams.set('client_reference_id', (field('biz') || 'site').replace(/[^A-Za-z0-9_-]/g, '-').slice(0, 60)); url = u.toString(); } catch (e) { }
      showPay(T('Opening secure checkout'), T('Deposit for {x}: {y} plus the 4% card fee. If it does not open, tap below.', { x: T(t.name), y: money(dep) }), [linkBtn(url, T('Open checkout'))]);
      window.open(url, '_blank', 'noopener');
      return;
    }
    showPay(T('Sending your request…'), '', []);
    sendIntake('invoice', t.id).then(function (ok) {
      if (ok && t.vip) { showPay(T('Got it, {x}!', { x: field('cname').split(' ')[0] }), T('Piets will call you at {x} to book your Whole Shabang planning call. Nothing is due until we agree on the scope together.', { x: field('cmobile') }), [smsBtn(t.name)]); return; }
      if (ok && !priced) { showPay(T('Got it, {x}!', { x: field('cname').split(' ')[0] }), 'Piets will text you at ' + field('cmobile') + ' to confirm the ' + T(t.name) + ' plan and go over the details. Nothing is due today.', [smsBtn(t.name)]); return; }
      if (ok) showPay(T('Got it, {x}!', { x: field('cname').split(' ')[0] }), T('Piets will text you at {x} to confirm {y} and send your {z} deposit invoice. Zelle, Venmo, Cash App or check have no fee.', { x: field('cmobile'), y: T(t.name), z: money(dep) }), [smsBtn(t.name)]);
    });
  }
  function linkBtn(href, txt) { var a = document.createElement('a'); a.className = 'btn btn-go'; a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = txt; return a; }
  function showPay(title, msg, btns) {
    var b = $('#payBox'); b.hidden = false; $('#payTitle').textContent = title; $('#payMsg').textContent = msg;
    var a = $('#payActs'); a.innerHTML = ''; btns.forEach(function (x) { a.appendChild(x); });
    b.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- hero: real generated sample sites (fictional businesses), desktop + phone ---------- */
  function heroMock() {
    /* fictional sample businesses; phone numbers are reserved-for-fiction numbers (US/Canada 555-01xx, UK Ofcom drama ranges) or left blank */
    var list = [['plumbing', 'Bluecrest Plumbing', 'Austin', '#1e88e5', 'en', '512-555-0142'], ['restaurant', 'Sabor de Casa', 'Miami', '#f07a3a', 'es', '305-555-0147'], ['landscaping', 'Fernway Lawn & Garden', 'Denver', '#2fbf4f', 'en', '303-555-0119'], ['beauty', 'Atelier Lumière', 'Montréal', '#d16ba5', 'fr', '514-555-0188'], ['auto', 'Ironbridge Auto Body', 'Manchester', '#e8452a', 'en', '+44 161 496 0157'], ['contractor', 'Dąb Remonty', 'Chicago', '#e0aa78', 'pl', '773-555-0123'], ['detailing', 'Glossworks Detailing', 'Brighton', '#ffb54a', 'en', '+44 7700 900156'], ['fitness', 'Kraftwerk Fitness', 'Berlin', '#ff5a36', 'de', ''], ['hvac', 'Northwind Heating & Air', 'Phoenix', '#0ea5a4', 'en', '602-555-0130']];
    var view = $('#liveView'), pview = $('#livePView');
    if (!view || !pview || !E || !E.buildSite) return;
    var i = 0, cache = {}, timer = null, vis = true, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function html(x) {
      if (cache[x[0]]) return cache[x[0]];
      var it = { biz: x[1], trade: x[0], town: x[2], phone: x[5], areas: [x[2]], services: [], color: x[3], style: 'dark', lang: x[4] };
      return (cache[x[0]] = E.buildSite(it, E.defaultCopy(it), {}));
    }
    function fit() {
      var s1 = view.clientWidth / 1280, s2 = pview.clientWidth / 390;
      Array.prototype.forEach.call(view.querySelectorAll('iframe'), function (f) { f.style.transform = 'scale(' + s1 + ')'; });
      Array.prototype.forEach.call(pview.querySelectorAll('iframe'), function (f) { f.style.transform = 'scale(' + s2 + ')'; });
    }
    function put(box, src) {
      var f = document.createElement('iframe');
      f.setAttribute('sandbox', 'allow-scripts'); f.setAttribute('tabindex', '-1'); f.setAttribute('loading', 'eager'); f.title = 'Sample demo site';
      f.srcdoc = src; box.appendChild(f); fit();
      var shown = false;
      function reveal() {
        if (shown) return; shown = true;
        f.classList.add('on');
        var old = Array.prototype.filter.call(box.querySelectorAll('iframe'), function (o) { return o !== f; });
        setTimeout(function () { old.forEach(function (o) { if (o.parentNode) o.parentNode.removeChild(o); }); }, 1000);
        var ph = box.querySelector('.live__ph'); if (ph) ph.remove();
      }
      f.addEventListener('load', reveal); setTimeout(reveal, 700);
    }
    var LN = {}; (E.LANGS || []).forEach(function (l) { LN[l[0]] = l[1]; });
    function show() {
      var x = list[i % list.length], t = E.trades[x[0]]; i++;
      loadLang(x[4]).then(function () {
        var src; try { src = html(x); } catch (e) { return; }
        put(view, src); put(pview, src);
        $('#liveUrl').textContent = x[1].toLowerCase().normalize('NFD').replace(/[^a-z]/g, '') + '.com';
        $('#liveTag').textContent = T(t.label).split(' /')[0] + ' \u00b7 ' + x[2] + ' \u00b7 ' + (LN[x[4]] || 'English');
      });
    }
    function loop() { clearTimeout(timer); if (reduced || !vis) return; timer = setTimeout(function () { show(); loop(); }, 10000); }
    window.addEventListener('resize', fit);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; loop(); }).observe(view);
    show(); loop();
  }

  /* ---------- builder page language (header switcher) ---------- */
  var langTouched = false; try { langTouched = localStorage.getItem('piets_lang_touched') === '1'; } catch (e) { }
  function uiLangInit() {
    var sw = $('#uiLang'), U = window.PietsUI; if (!U) return;
    if (sw) {
      (E.LANGS || []).forEach(function (l) { var o = document.createElement('option'); o.value = l[0]; o.textContent = l[1]; sw.appendChild(o); });
      sw.addEventListener('change', function () { U.set(sw.value); });
    }
    if ($('#f_lang')) $('#f_lang').addEventListener('change', function () { langTouched = true; try { localStorage.setItem('piets_lang_touched', '1'); } catch (e) { } });
    document.addEventListener('piets-ui-lang', function (e) {
      if (sw) sw.value = e.detail;
      var fl = $('#f_lang'); if (fl && !langTouched) { fl.value = e.detail; loadLang(e.detail); save(); }
      renderTiers(); $('#nextBtn').textContent = state.step === 5 ? T('Build my demo') + ' \u26A1' : T('Next') + ' \u2192';
      if (state.html && !$('#preview').hidden) { $('#pvTitle em') && ($('#pvTitle em').textContent = T('is looking good.')); }
    });
    U.start(E.LANGS);
  }

  /* ---------- init ---------- */
  function init() {
    renderLangs(); restore(); if ($('#f_lang') && !$('#f_lang').value) $('#f_lang').value = 'en'; loadLang(field('lang')); renderTrades(); renderServices(); renderColors(); renderVibes(); wireUploads(); renderTiers(); heroMock(); uiLangInit();
    $('#svcAddBtn').addEventListener('click', addCustom);
    $('#svcAdd').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } });
    var lastNext = 0; $('#nextBtn').addEventListener('click', function () { var now = Date.now(); if (now - lastNext < 450) return; lastNext = now; if (validate(state.step) !== true) return; if (state.step < 5) go(state.step + 1); else build(); });
    ['#f_phone', '#f_cmobile'].forEach(function (id) { $(id).addEventListener('blur', function () { if (/^\s*(\+|00)/.test(this.value)) return; var d = digits(this.value); if (d.length === 11 && d[0] === '1') d = d.slice(1); if (d.length === 10) this.value = d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6); }); });
    $('#backBtn').addEventListener('click', function () { go(Math.max(1, state.step - 1)); });
    $('#wizForm').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#wizForm').addEventListener('input', save);
    $$('[data-dev]').forEach(function (b) { b.addEventListener('click', function () { $$('[data-dev]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); $('#frameWrap').classList.toggle('phone', b.dataset.dev === 'phone'); }); });
    $('#fullBtn').addEventListener('click', function () { var w = window.open('', '_blank'); if (!w) { toast('Allow pop-ups to open full screen.'); return; } w.document.open(); w.document.write(state.html); w.document.close(); });
    $('#editBtn').addEventListener('click', function () { go(1); $('#build').scrollIntoView({ behavior: 'smooth' }); });
    go(Math.min(Math.max(1, state.step || 1), 5));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
