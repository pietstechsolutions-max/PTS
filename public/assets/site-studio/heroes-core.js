/* Piets Site Studio — hero "display screen" system.
   Each hero = { title, status, seg?, stage(html), gauges?, dock[], css, run(root, D, K) }.
   run() is serialized into the generated site, so it must only use its arguments and the DOM.
   Piets Technology Solutions Inc · 631-871-5957 */
(function (g) {
  'use strict';
  var H = g.PietsHeroes = g.PietsHeroes || { list: {} };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  H.esc = esc;
  H.icon = function (path) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + path + '</svg>'; };

  /* Shared frame CSS: brand accent drives the chrome, scene art keeps its own real-world colors. */
  H.SHELL_CSS = [
    '.hcard{position:relative;border-radius:24px;overflow:hidden;background:#070b10;color:#e8eef3;border:1px solid rgba(255,255,255,.14);box-shadow:0 34px 80px -34px #000,0 0 0 1px color-mix(in srgb,var(--a) 22%,transparent)}',
    '.htop{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.1);background:#0a1017;min-height:44px}',
    '.hlive{display:inline-flex;align-items:center;gap:7px;font:600 .6rem var(--mono);letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}',
    '.hlive i{width:7px;height:7px;border-radius:50%;background:#2fd27a;box-shadow:0 0 8px #2fd27a;animation:hpu 1.6s infinite;flex:none}',
    '.hcard.alert .hlive i{background:#ff5b52;box-shadow:0 0 8px #ff5b52}',
    '@keyframes hpu{50%{opacity:.3}}',
    '.hstat{font:600 .6rem var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--a2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;text-align:right}',
    '.hcard.alert .hstat{color:#ff9b94}',
    '.hseg{display:flex;gap:4px;flex:none}.hseg button{font:600 .58rem var(--mono);letter-spacing:.08em;text-transform:uppercase;border:1px solid rgba(255,255,255,.22);background:transparent;color:#cfe0e8;border-radius:99px;padding:5px 9px;min-height:30px;cursor:pointer}',
    '.hseg button[aria-pressed=true]{background:var(--a);border-color:var(--a);color:var(--on)}',
    '.hstage{position:relative;overflow:hidden;background:#05080c}.hstage>svg{display:block;width:100%;height:auto}',
    '.hstage svg text{font-family:var(--mono)}',
    '.hgauge{display:grid;grid-template-columns:repeat(4,1fr);background:#070b10;border-top:1px solid rgba(255,255,255,.1)}',
    '.hgauge div{padding:8px 10px;border-left:1px solid rgba(255,255,255,.08);display:grid;line-height:1.1;min-width:0}.hgauge div:first-child{border-left:0}',
    '.hgauge small{font:600 .52rem var(--mono);letter-spacing:.12em;text-transform:uppercase;color:#8ea0ae;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.hgauge b{font:600 1.02rem var(--mono);color:#fff;font-variant-numeric:tabular-nums;margin-top:3px}.hgauge span{font:600 .52rem var(--mono);color:var(--a2);letter-spacing:.1em}',
    '.hgauge .warn b{color:#ff9b94}',
    '.hdock{display:grid;grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:6px;padding:10px;background:#0a1017}',
    '.hdock button{display:grid;justify-items:center;gap:3px;padding:8px 2px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#e8eef3;cursor:pointer;min-height:60px;transition:transform .15s,border-color .15s,background .15s}',
    '.hdock button svg{width:22px;height:22px;stroke:var(--a2);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '.hdock button span{font-size:.66rem;font-weight:700;line-height:1.1;text-align:center}',
    '.hdock button:hover{border-color:var(--a2);transform:translateY(-1px)}',
    '.hdock button[aria-pressed=true]{background:color-mix(in srgb,var(--a) 20%,transparent);border-color:var(--a2);box-shadow:inset 0 0 0 1px var(--a2)}',
    '@media(max-width:560px){.hdock{grid-template-columns:repeat(var(--nm,4),minmax(0,1fr))}.hgauge b{font-size:.88rem}.hgauge div{padding:7px 6px}.htop{flex-wrap:wrap;row-gap:3px}.htop .hstat{flex-basis:100%;text-align:left}}',
    '.hgauge div{grid-template-rows:1fr auto auto}.hgauge small{white-space:normal;overflow:visible;text-overflow:clip;line-height:1.2;align-self:start;overflow-wrap:anywhere}',
    '.hmsg{padding:11px 14px 14px;background:#0a1017;border-top:1px solid rgba(255,255,255,.08);font-size:.9rem;line-height:1.5;color:#cfdbe3;min-height:70px;display:grid;gap:8px}',
    '.hmsg b{color:#fff}.hmsg .hgo{justify-self:start;border:0;border-radius:99px;min-height:38px;padding:0 16px;font-weight:700;font-size:.86rem;cursor:pointer;background:linear-gradient(135deg,var(--a2),var(--a));color:var(--on)}',
    '.hmsg .hgo[hidden]{display:none}',
    '@media(prefers-reduced-motion:reduce){.hcard *{animation:none!important;transition:none!important}}'
  ].join('\n');

  /* Shared runtime kit (serialized into the site). */
  H.kit = function heroKit(root) {
    var msg = root.querySelector('.hmsg p'), go = root.querySelector('.hgo'), stat = root.querySelector('.hstat');
    var K = {
      say: function (html, pick, alert) {
        if (msg) msg.innerHTML = html;
        if (go) { go.hidden = !pick; go.dataset.pick = pick || ''; }
        root.classList.toggle('alert', !!alert);
      },
      status: function (t) { if (stat) stat.textContent = t; },
      gauge: function (id, v, warn) { var el = root.querySelector('[data-g="' + id + '"]'); if (!el) return; el.querySelector('b').textContent = v; el.classList.toggle('warn', !!warn); },
      press: function (attr, val) { Array.prototype.forEach.call(root.querySelectorAll('[' + attr + ']'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute(attr) === val)); }); },
      onDock: function (fn) { Array.prototype.forEach.call(root.querySelectorAll('[data-k]'), function (b) { b.addEventListener('click', function () { fn(b.getAttribute('data-k'), b); }); }); },
      onSeg: function (fn) { Array.prototype.forEach.call(root.querySelectorAll('[data-s]'), function (b) { b.addEventListener('click', function () { fn(b.getAttribute('data-s'), b); }); }); },
      reduced: !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)
    };
    if (go) go.addEventListener('click', function () { root.dispatchEvent(new CustomEvent('hero-pick', { bubbles: true, detail: go.dataset.pick })); });
    return K;
  };

  /* Build the frame. */
  H.shell = function (o) {
    var dock = o.dock || [];
    var h = '<div class="hcard" data-hero="' + esc(o.id) + '">';
    h += '<div class="htop"><span class="hlive"><i></i>' + esc(o.title) + '</span>';
    if (o.seg) h += '<div class="hseg" role="group" aria-label="' + esc(o.segLabel || 'View') + '">' + o.seg.map(function (s, i) { return '<button type="button" data-s="' + esc(s[0]) + '" aria-pressed="' + (i === (o.segOn || 0)) + '">' + esc(s[1]) + '</button>'; }).join('') + '</div>';
    else h += '<span class="hstat">' + esc(o.status || '') + '</span>';
    h += '</div><div class="hstage">' + o.stage + '</div>';
    if (o.gauges) h += '<div class="hgauge" aria-live="off">' + o.gauges.map(function (x) { return '<div data-g="' + esc(x[0]) + '"><small>' + esc(x[1]) + '</small><b>' + esc(x[2]) + '</b><span>' + esc(x[3] || '') + '</span></div>'; }).join('') + '</div>';
    if (dock.length) h += '<div class="hdock" role="group" aria-label="' + esc(o.dockLabel || 'Try it') + '" style="--n:' + Math.min(dock.length, 8) + ';--nm:' + (dock.length > 4 ? 4 : dock.length) + '">' + dock.map(function (d, i) { return '<button type="button" data-k="' + esc(d[0]) + '" aria-pressed="' + (i === (o.dockOn == null ? -1 : o.dockOn)) + '">' + H.icon(d[2]) + '<span>' + esc(d[1]) + '</span></button>'; }).join('') + '</div>';
    h += '<div class="hmsg" aria-live="polite"><p>' + (o.msg || '') + '</p><button class="hgo" type="button" hidden>' + esc(o.goText || 'Start a request for this') + ' &rarr;</button></div></div>';
    return h;
  };

  /* Entry point used by engine.js.
     style 'live' (default) = real-photo live job view for every trade.
     style 'inside' = the illustrated x-ray / interactive scene (only where one exists, else null). */
  H.INSIDE = { plumbing: 'plumbing', hvac: 'hvac', electrical: 'electrical', tech: 'tech', auto: 'auto', detailing: 'shine', contractor: 'cabinet' };
  H.build = function (trade, ctx, opts) {
    opts = opts || {};
    var key, hero;
    if (opts.style === 'inside') { key = H.INSIDE[trade]; hero = key && H.list[key]; if (!hero) return null; }
    else { key = 'live'; hero = H.list.live; if (!hero) return null; }
    var o = hero.build(ctx);
    o.id = key;
    var sel = JSON.stringify('.hcard[data-hero="' + key + '"]');
    return { id: key, html: H.shell(o), css: hero.css || '', shellCss: H.SHELL_CSS, run: '(function(){var r=document.querySelector(' + sel + ');if(!r)return;var K=(' + H.kit.toString() + ')(r);(' + hero.run.toString() + ')(r,' + JSON.stringify(o.data || {}).replace(/</g, '\\u003c') + ',K);})();' };
  };
})(typeof window !== 'undefined' ? window : globalThis);
