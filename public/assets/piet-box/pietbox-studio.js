/* Piet Box Studio v3 — screen builder + live TV demo (ads, menu boards, QR photo wall, scan-to-advertise).
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Sample data only. Much of this was prepared with AI — tell Matt about any mistake. */
(function () {
  'use strict';
  var A = window.PietArt, Q = window.PietsQR;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var KEY = 'pietbox-studio-v3';
  var QR_URL = 'https://pietstechsolutions.com/piet-box';
  var qrSvg = function (u) { try { return Q.svg(u, { size: 200, dark: '#011442', margin: 2 }); } catch (e) { return ''; } };

  var TYPES = [
    { id: 'deli', label: 'Deli / restaurant', icon: 'fork', menu: 'Bacon, egg & cheese | $6.50\nTurkey club | $11.99\nChicken cutlet hero | $12.99\nSoup of the day | $5.50\nCoffee | $2.25\nFresh bagel | $2.75', promo: 'Lunch special $9.99' },
    { id: 'pizza', label: 'Pizzeria', icon: 'fork', menu: 'Cheese slice | $3.50\nPepperoni slice | $4.25\nGrandma slice | $4.50\nLarge pie | $19.99\nGarlic knots (6) | $4.99\nSoda | $2.50', promo: '2 slices + soda $8.99' },
    { id: 'bar', label: 'Bar / lounge', icon: 'bottle', menu: 'Draft beer | $7\nHouse wine | $9\nMargarita | $12\nWings (10) | $14\nLoaded fries | $9', promo: 'Happy hour 4–7 PM' },
    { id: 'barber', label: 'Barber / salon', icon: 'user', menu: 'Haircut | $30\nSkin fade | $35\nBeard trim | $15\nKids cut | $25\nCut + beard | $45', promo: 'Walk-ins welcome' },
    { id: 'gym', label: 'Gym / studio', icon: 'pulse', menu: '6:00 AM | Bootcamp\n9:00 AM | Yoga\n12:00 PM | Boxing\n5:30 PM | HIIT\n7:00 PM | Open gym', promo: 'First class free' },
    { id: 'dental', label: 'Dental / medical', icon: 'tooth', menu: 'Cleanings | Same week\nWhitening | Ask us\nNew patients | Welcome\nMost insurance | Accepted', promo: 'Ask about whitening' },
    { id: 'retail', label: 'Store / bodega', icon: 'store', menu: 'Coffee | $1.75\nEgg sandwich | $4.50\nBottled water | $1.50\nEnergy drinks | 2 for $5\nLottery | Here', promo: 'Hot coffee all day' },
    { id: 'other', label: 'Something else', icon: 'building', menu: 'Item one | $10\nItem two | $15\nItem three | $20', promo: 'Ask about today’s deal' }
  ];
  var SHOWS = [['welcome', 'Welcome screen'], ['menu', 'Menu / price board'], ['promo', 'Specials & promos'], ['qr-photo', 'Photo wall (scan to post)'], ['qr-ad', 'Scan to advertise here']];
  var FEATS = [['menu', 'Menu boards', 'Items and prices, changed remotely.'], ['megaphone', 'Promos', 'Specials, events, welcome screens.'], ['store', 'Scan to advertise', 'Local businesses ask to buy ad time.'],
    ['photo', 'Photo wall', 'Customers post photos by QR.'], ['shield', 'Approved first', 'Nothing shows until it is OK’d.'], ['qr', 'QR setup', 'Scan the TV to link the box.'], ['cloud', 'Run by Piets', 'Changes sent from the Piets Hub.'], ['lock', 'No router setup', 'The box only calls out.']];
  var S = { step: 1, type: 'deli', name: '', promo: '', shows: ['welcome', 'menu', 'promo', 'qr-photo', 'qr-ad'], menu: '' };
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function load() { try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && o.type) { S = Object.assign(S, o); S.step = 1; } } catch (e) {} }
  function T() { return TYPES.filter(function (t) { return t.id === S.type; })[0] || TYPES[0]; }
  function items(txt) { return String(txt || '').split('\n').map(function (l) { return l.trim(); }).filter(Boolean).slice(0, 14).map(function (l) { var p = l.split('|'); return [p[0].trim(), (p[1] || '').trim()]; }); }

  /* sample "photos" drawn on a canvas so the demo needs no image files */
  function sampleImg(label, c1, c2) {
    try { var c = document.createElement('canvas'); c.width = 480; c.height = 360; var g = c.getContext('2d'); var gr = g.createLinearGradient(0, 0, 480, 360); gr.addColorStop(0, c1); gr.addColorStop(1, c2); g.fillStyle = gr; g.fillRect(0, 0, 480, 360);
      g.fillStyle = 'rgba(255,255,255,.18)'; for (var i = 0; i < 9; i++) { g.beginPath(); g.arc(40 + i * 55, 60 + (i % 3) * 110, 18 + (i % 4) * 8, 0, 7); g.fill(); }
      g.fillStyle = '#fff'; g.font = '800 46px Arial'; g.textAlign = 'center'; g.fillText(label, 240, 196); return c.toDataURL('image/jpeg', .8); } catch (e) { return ''; }
  }
  var SAMPLES = [];

  /* ---------- TV renderer (shared by hero + demo) ---------- */
  function TV(el, opts) {
    var me = this; this.el = el; this.i = -1; this.timer = null; this.paused = false; this.mode = 'play'; this.photos = []; this.ads = []; this.data = opts.data; this.onPos = opts.onPos || function () {};
    this.rot = function () {
      var d = me.data(), out = [];
      d.shows.forEach(function (s) {
        if (s === 'welcome') out.push({ type: 'promo', k: 'Welcome', t: 'Welcome to ' + d.name, x: d.tag || 'Glad you are here', sec: 7 });
        if (s === 'menu' && d.items.length) out.push({ type: 'menu', t: d.menuTitle || 'Menu', items: d.items, sec: 11 });
        if (s === 'promo') out.push({ type: 'promo', k: 'Today', t: d.promo || 'Ask about today’s special', x: 'At ' + d.name, sec: 7, color: '#0a3a8a' });
        if (s === 'qr-photo') { out.push({ type: 'qr', k: 'Photo wall', t: 'Put your photo on the screen', x: 'Scan, post, and look up in a minute.', sec: 9, pics: true }); me.photos.forEach(function (p) { out.push({ type: 'photo', t: p.name, x: p.text, img: p.img, sec: 7 }); }); }
        if (s === 'qr-ad') out.push({ type: 'qr', k: 'Advertise here', t: 'Your business on this screen', x: 'Local businesses: scan to ask about an ad.', sec: 9 });
      });
      me.ads.forEach(function (a, n) { out.splice(Math.min(out.length, 2 + n * 2), 0, { type: 'ad', t: a.name, x: a.text, color: a.color, sec: 8 }); });
      return out.length ? out : [{ type: 'promo', k: 'Piet Box', t: d.name, x: '', sec: 8 }];
    };
  }
  TV.prototype.slide = function (s, d) {
    if (s.type === 'menu') return '<div class="ts menu"><div class="k">' + esc(d.name) + '</div><div class="t s">' + esc(s.t) + '</div><ul class="' + (s.items.length > 6 ? 'two' : '') + '">' + s.items.map(function (r) { return '<li><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></li>'; }).join('') + '</ul></div>';
    if (s.type === 'qr') return '<div class="ts split"><div><div class="k">' + esc(s.k) + '</div><div class="t s">' + esc(s.t) + '</div><div class="x">' + esc(s.x) + '</div>' + (s.pics && this.photos.length ? '<div class="pics">' + this.photos.slice(0, 4).map(function (p) { return '<span style="background-image:url(' + p.img + ')"></span>'; }).join('') + '</div>' : '') + '</div><div class="qrb">' + qrSvg(QR_URL) + 'SCAN ME</div></div>';
    if (s.type === 'photo') return '<div class="ts photo"><div class="ph" style="background-image:url(' + s.img + ')"></div><div style="display:grid;align-content:center"><span class="badge">ON THE WALL</span><div class="t s">' + esc(s.t) + '</div><div class="x">' + esc(s.x) + '</div></div></div>';
    if (s.type === 'ad') return '<div class="ts split"><div><div class="k">Local business</div><div class="t s">' + esc(s.t) + '</div><div class="x">' + esc(s.x) + '</div></div><div class="adart" style="background:' + (s.color || 'var(--grad)') + '">' + esc(s.t.split(' ')[0]) + '</div></div>';
    return '<div class="ts promo" style="' + (s.color ? 'background:radial-gradient(70cqw 50cqw at 75% 30%,' + s.color + ',#050A1F 75%)' : '') + '"><div class="k">' + esc(s.k || '') + '</div><div class="t">' + esc(s.t) + '</div><div class="x">' + esc(s.x || '') + '</div></div>';
  };
  TV.prototype.foot = function (d) {
    var own = this.mode === 'owned';
    return '<div class="tvfoot"><span class="v">' + esc(d.name) + '</span><div class="tvdots">' + this.list.map(function (_, k) { return '<i class="' + (k === this.i ? 'on' : '') + '"></i>'; }, this).join('') + '</div>' + (own ? '' : '<span class="mini">' + qrSvg(QR_URL) + '</span><span class="mt">Scan to put your photo on this screen</span>') + '<span class="by">' + (own ? 'Owned by ' + esc(d.name) : 'Screen by Piets') + '<b>631-871-5957</b></span></div>';
  };
  TV.prototype.show = function (i) {
    var d = this.data(); this.list = this.rot(); this.i = ((i % this.list.length) + this.list.length) % this.list.length;
    var s = this.list[this.i];
    var old = this.el.querySelectorAll('.ts');
    this.el.insertAdjacentHTML('beforeend', this.slide(s, d));
    var nw = this.el.lastElementChild; requestAnimationFrame(function () { requestAnimationFrame(function () { nw.classList.add('on'); }); });
    setTimeout(function () { old.forEach(function (o) { if (o.parentNode) o.parentNode.removeChild(o); }); }, RM ? 0 : 750);
    var f = this.el.querySelector('.tvfoot'); if (f) f.remove(); this.el.insertAdjacentHTML('beforeend', this.foot(d));
    this.onPos(this.i, this.list.length);
    clearTimeout(this.timer); var me = this;
    if (!this.paused && !RM && this.mode !== 'paused' && this.mode !== 'setup') this.timer = setTimeout(function () { me.show(me.i + 1); }, (s.sec || 8) * 1000);
  };
  TV.prototype.restart = function () { this.el.querySelectorAll('.tvmsg').forEach(function (m) { m.remove(); }); this.show(0); };
  TV.prototype.jump = function (type, match) { var l = this.rot(); for (var k = 0; k < l.length; k++) if (l[k].type === type && (!match || l[k].t === match)) { this.show(k); return; } this.show(0); };
  TV.prototype.msg = function (html) { clearTimeout(this.timer); this.el.querySelectorAll('.tvmsg').forEach(function (m) { m.remove(); }); this.el.insertAdjacentHTML('beforeend', '<div class="tvmsg">' + html + '</div>'); };

  /* ---------- static ---------- */
  function initStatic() {
    var mk = document.querySelector('[data-mark]');
    if (mk) mk.innerHTML = '<defs><linearGradient id="hdrmk" x1="0" x2="1"><stop offset="0" stop-color="#00FFFF"/><stop offset="1" stop-color="#016FD6"/></linearGradient></defs>' + A.markG('hdrmk');
    document.querySelectorAll('[data-ic]').forEach(function (e) { e.innerHTML = A.icon(e.getAttribute('data-ic'), 22, 2); });
    $('pbFeats').innerHTML = FEATS.map(function (f) { return '<div class="feat"><span class="ic">' + A.icon(f[0], 20, 1.8) + '</span><div><b>' + f[1] + '</b><span>' + f[2] + '</span></div></div>'; }).join('');
    $('pbHeroBox').innerHTML = A.box({ uid: 'hero', glow: false });
    SAMPLES = [['Happy Birthday!', '#ff5f8f', '#7b2ff7', 'Sam', 'Happy 30th Sam!'], ['Game Night', '#0ea5e9', '#1e3a8a', 'The Crew', 'Tuesday regulars!'], ['Team Lunch', '#f59e0b', '#b45309', 'Office Gang', 'Best heroes on the block']].map(function (s) { return { img: sampleImg(s[0], s[1], s[2]), name: s[3], text: s[4] }; });
    var hero = new TV($('heroTv'), { data: function () { var t = TYPES[0]; return { name: 'Main Street Deli', tag: 'Fresh every morning', promo: t.promo, items: items(t.menu), shows: ['welcome', 'menu', 'qr-photo', 'promo', 'qr-ad'] }; } });
    hero.photos = [SAMPLES[0]]; hero.ads = [{ name: 'Joe’s Pizza', text: '2 blocks away · Grandma slice $4.50', color: 'linear-gradient(135deg,#ffb020,#ff5d5d)' }];
    hero.show(0);
  }

  /* ---------- wizard ---------- */
  function renderTypes() { $('pbTypes').innerHTML = TYPES.map(function (t) { return '<button type="button" class="opt" role="radio" aria-checked="' + (S.type === t.id) + '" data-type="' + t.id + '">' + A.icon(t.icon, 22, 1.8) + t.label + '</button>'; }).join(''); }
  function renderShows() { $('pbShows').innerHTML = SHOWS.map(function (s) { return '<button type="button" class="chip" aria-pressed="' + (S.shows.indexOf(s[0]) > -1) + '" data-show="' + s[0] + '">' + s[1] + '</button>'; }).join(''); }
  function show(step) {
    S.step = step;
    document.querySelectorAll('#pbForm .ws').forEach(function (f) { f.hidden = +f.getAttribute('data-step') !== step; });
    document.querySelectorAll('#pbStepper li').forEach(function (li, i) { li.className = i + 1 === step ? 'on' : (i + 1 < step ? 'done' : ''); });
    $('pbBack').hidden = step === 1; $('pbNext').innerHTML = step === 3 ? 'Build my screen &rarr;' : 'Next &rarr;'; $('pbErr').hidden = true;
    if (step === 3 && !$('pb_menu').value.trim()) $('pb_menu').value = S.menu || T().menu;
  }
  function err(m, el) { $('pbErr').textContent = m; $('pbErr').hidden = false; if (el) { el.setAttribute('aria-invalid', 'true'); el.focus(); } }
  function next() {
    if (S.step === 1) { var nm = $('pb_name'); S.name = nm.value.trim(); S.promo = $('pb_promo').value.trim(); if (!S.name) return err('Add your business name so the demo shows your screen.', nm); nm.removeAttribute('aria-invalid'); }
    if (S.step === 2 && !S.shows.length) return err('Pick at least one thing for your screen.');
    if (S.step === 3) S.menu = $('pb_menu').value;
    save();
    if (S.step < 3) { show(S.step + 1); var w = $('pbWiz'); if (w.getBoundingClientRect().top < 0) w.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); return; }
    build();
  }
  function initWizard() {
    load(); $('pb_name').value = S.name || ''; $('pb_promo').value = S.promo || ''; $('pb_menu').value = S.menu || '';
    renderTypes(); renderShows(); show(1);
    $('pbTypes').addEventListener('click', function (e) { var b = e.target.closest('[data-type]'); if (!b) return; if (S.type !== b.getAttribute('data-type')) { S.type = b.getAttribute('data-type'); S.menu = ''; $('pb_menu').value = ''; } renderTypes(); save(); });
    $('pbShows').addEventListener('click', function (e) { var b = e.target.closest('[data-show]'); if (!b) return; var id = b.getAttribute('data-show'), i = S.shows.indexOf(id); if (i > -1) S.shows.splice(i, 1); else S.shows.push(id); b.setAttribute('aria-pressed', i < 0); save(); });
    $('pbNext').addEventListener('click', next);
    $('pbBack').addEventListener('click', function () { show(Math.max(1, S.step - 1)); });
    $('pbForm').addEventListener('submit', function (e) { e.preventDefault(); next(); });
    ['pb_name', 'pb_promo'].forEach(function (id) { $(id).addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); next(); } }); });
    $('ccRebuild').addEventListener('click', function () { show(1); });
  }
  function build() {
    $('pbWiz').hidden = true; $('pbBuilding').hidden = false;
    var lis = $('pbBlist').querySelectorAll('li'); lis.forEach(function (l) { l.className = ''; });
    $('pbBuilding').scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
    var i = 0, t = setInterval(function () {
      if (i < lis.length) { lis[i++].className = 'on'; return; }
      clearInterval(t); $('pbBuilding').hidden = true; $('pbWiz').hidden = false; show(1);
      DEMO.start(true); $('center').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
    }, RM ? 100 : 600);
  }

  /* ---------- live demo ---------- */
  var DEMO = (function () {
    var tv = null, mode = 'play', menuItems = [];
    function now() { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
    function feed(m, c) { var ul = $('ccFeed'), li = document.createElement('li'); li.className = c || ''; li.innerHTML = '<time>' + now() + '</time><span>' + esc(m) + '</span>'; ul.insertBefore(li, ul.firstChild); while (ul.children.length > 25) ul.removeChild(ul.lastChild); }
    function data() { return { name: S.name || 'Sample ' + T().label, tag: S.promo ? '' : 'Glad you are here', promo: S.promo || T().promo, items: menuItems, shows: S.shows.length ? S.shows : ['welcome'], menuTitle: S.type === 'gym' ? 'Class schedule' : (S.type === 'dental' ? 'Our services' : 'Menu') }; }
    function sims() {
      var l = [['photo', 'photo', 'A customer posts a photo'], ['ad', 'store', 'A local business asks for an ad'], ['price', 'menu', 'Piets changes a price'], ['setup', 'qr', 'Set up a new box by QR'], ['due', 'lock', 'A payment is missed'], ['buyout', 'check', 'Client buys the box ($500+)']];
      $('ccSim').innerHTML = l.map(function (s) { return '<button type="button" data-sim="' + s[0] + '">' + A.icon(s[1], 20, 1.8) + s[2] + '</button>'; }).join('');
    }
    function phone(title, html) { $('phonePanel').hidden = false; $('phoneT').textContent = title; $('phoneF').innerHTML = html; }
    var pickImg = 0;
    var SIM = {
      photo: function () {
        pickImg = 0;
        phone("Customer's phone · scanned the QR", '<label for="phName">Your name</label><input id="phName" maxlength="30" value="' + esc(SAMPLES[0].name) + '"><label for="phMsg">Message</label><input id="phMsg" maxlength="60" value="' + esc(SAMPLES[0].text) + '"><span>Pick a photo</span><div class="row3">' + SAMPLES.map(function (s, k) { return '<button type="button" class="samp" data-samp="' + k + '" aria-pressed="' + (k === 0) + '" style="background-image:url(' + s.img + ')" aria-label="Sample photo ' + (k + 1) + '"></button>'; }).join('') + '</div><button class="btn btn-go btn-sm" type="button" data-phone="sendphoto">Send my photo</button>');
      },
      ad: function () {
        phone("Local business owner's phone", '<label for="adName">Business name</label><input id="adName" maxlength="30" value="Joe’s Pizza"><label for="adMsg">Ad line</label><input id="adMsg" maxlength="60" value="2 blocks away · Grandma slice $4.50"><button class="btn btn-go btn-sm" type="button" data-phone="sendad">Ask about an ad</button>');
      },
      price: function () {
        if (!menuItems.length) { feed('No menu on this screen yet', 'warn'); return; }
        var it = menuItems[0], old = it[1], m = /([\d.]+)/.exec(old || ''); it[1] = m ? old.replace(m[1], (parseFloat(m[1]) + 0.5).toFixed(2).replace(/\.00$/, '')) : 'New price';
        feed('Piets changed "' + it[0] + '" ' + old + ' → ' + it[1] + ' · sent to the TV', 'ok'); tv.jump('menu');
      },
      setup: function () {
        mode = 'setup'; tv.mode = 'setup';
        var serial = 'PB-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(), code = Math.random().toString(36).slice(2, 8).toUpperCase();
        tv.msg('<div><div class="k">Piet Box · set up</div><div class="t s">Scan to set up this screen</div><div class="x">No router changes. The box calls out to the Piets Hub.</div><div style="margin-top:2cqw"><div class="k" style="color:var(--mut)">Serial</div><div class="serial">' + serial + '</div><div class="k" style="color:var(--mut);margin-top:1cqw">Setup code</div><div class="codebig">' + code + '</div></div></div><div class="qrb">' + qrSvg(QR_URL) + 'SCAN TO SET UP</div>');
        feed('New box ' + serial + ' checked in · waiting for setup', 'warn');
        phone("Matt's phone · scanned the TV", '<span>Box <b>' + serial + '</b></span><label for="suName">Business name</label><input id="suName" maxlength="40" value="' + esc(data().name) + '"><button class="btn btn-go btn-sm" type="button" data-phone="link">Link this box</button>');
      },
      due: function () {
        mode = 'due'; feed('Payment missed · small notice on the TV', 'warn');
        tv.el.querySelectorAll('.tvnote').forEach(function (n) { n.remove(); }); tv.el.insertAdjacentHTML('beforeend', '<span class="tvnote">Account notice: owner, please call Piets</span>');
        lockSims(true);
        setTimeout(function () {
          mode = 'paused'; tv.mode = 'paused'; feed('Grace days over · screen paused', 'bad');
          tv.msg('<div><div class="k">Screen paused</div><div class="t s">This screen is paused</div><div class="x">The monthly service is not paid. The owner can call Piets to turn it back on.</div><div class="t s" style="margin-top:1.6cqw">631-871-5957</div></div><div class="qrb">' + qrSvg(QR_URL) + 'SCAN TO PAY</div>');
          phone("Owner's phone", '<span>Screen paused. Pay to turn it back on.</span><button class="btn btn-go btn-sm" type="button" data-phone="pay">Pay now</button>');
        }, RM ? 300 : 3000);
      },
      buyout: function () {
        phone("Owner's phone · leaving Piets", '<span>Keep the box and get your content released for a one-time unlock fee, starting at $500.</span><button class="btn btn-go btn-sm" type="button" data-phone="buy">Pay unlock fee</button>');
      }
    };
    function lockSims(on) { document.querySelectorAll('#ccSim button').forEach(function (b) { b.disabled = on; }); }
    function onPhone(act) {
      if (act === 'sendphoto') {
        var p = { img: SAMPLES[pickImg].img, name: ($('phName').value || 'Guest').trim().slice(0, 30), text: ($('phMsg').value || '').trim().slice(0, 60) };
        feed('New photo from ' + p.name + ' · waiting for approval', 'warn');
        $('phoneF').innerHTML = '<div class="okmsg">Sent! It shows up once Piets approves it.</div><button class="btn btn-ghost btn-sm" type="button" data-phone="approvephoto">Approve (as Piets)</button>';
        $('phoneF')._pending = p;
      } else if (act === 'approvephoto') {
        var q = $('phoneF')._pending; if (!q) return; tv.photos.unshift(q); tv.photos = tv.photos.slice(0, 6); if (S.shows.indexOf('qr-photo') < 0) S.shows.push('qr-photo');
        feed('Photo approved · on the TV now', 'ok'); $('phoneF').innerHTML = '<div class="okmsg">Look up! It is on the screen.</div>'; tv.jump('photo', q.name);
      } else if (act === 'sendad') {
        var a = { name: ($('adName').value || 'Local business').trim().slice(0, 30), text: ($('adMsg').value || '').trim().slice(0, 60), color: 'linear-gradient(135deg,#ffb020,#ff5d5d)' };
        feed('Ad request from ' + a.name + ' · Piets calls them with options', 'warn');
        $('phoneF').innerHTML = '<div class="okmsg">Got it. Piets will call about price and timing.</div><button class="btn btn-ghost btn-sm" type="button" data-phone="approvead">Ad paid · put it on (as Piets)</button>';
        $('phoneF')._ad = a;
      } else if (act === 'approvead') {
        var ad = $('phoneF')._ad; if (!ad) return; tv.ads.unshift(ad); tv.ads = tv.ads.slice(0, 4); feed('Ad for ' + ad.name + ' is live · extra money from your TV', 'ok'); $('phoneF').innerHTML = '<div class="okmsg">Ad is on the screen.</div>'; tv.jump('ad', ad.name);
      } else if (act === 'link') {
        var nm = ($('suName').value || '').trim(); if (nm) S.name = nm.slice(0, 40);
        mode = 'play'; tv.mode = 'play'; feed('Box linked to ' + data().name + ' · screen is live', 'ok'); $('phoneF').innerHTML = '<div class="okmsg">Linked. The TV switches over by itself.</div>'; tv.restart(); title();
      } else if (act === 'pay') {
        mode = 'play'; tv.mode = 'play'; lockSims(false); tv.el.querySelectorAll('.tvnote').forEach(function (n) { n.remove(); }); feed('Payment received · screen back on', 'ok'); $('phoneF').innerHTML = '<div class="okmsg">Paid. The screen is back on.</div>'; tv.restart();
      } else if (act === 'buy') {
        mode = 'owned'; tv.mode = 'owned'; feed('Unlock fee paid · box released to ' + data().name, 'ok'); feed('Data export sent: menu, ads, photos', 'ok');
        $('phoneF').innerHTML = '<div class="okmsg">The box is yours. Your menus, ads and photos were sent to you.</div>'; tv.restart();
      }
    }
    function title() { $('ccTitle').innerHTML = esc(data().name) + ' <em>is live</em>'; }
    function start(fromBuild) {
      menuItems = items(S.menu || T().menu);
      if (!tv) {
        tv = new TV($('demoTv'), { data: data, onPos: function (i, n) { $('tvPos').textContent = (i + 1) + ' / ' + n; } });
        sims();
        $('ccSim').addEventListener('click', function (e) { var b = e.target.closest('[data-sim]'); if (!b || b.disabled) return; var k = b.getAttribute('data-sim'); if ((mode === 'paused' || mode === 'setup') && k !== 'due') return; SIM[k](); });
        $('phoneF').addEventListener('click', function (e) { var s = e.target.closest('[data-samp]'); if (s) { pickImg = +s.getAttribute('data-samp'); document.querySelectorAll('.samp').forEach(function (x) { x.setAttribute('aria-pressed', x === s); }); return; } var b = e.target.closest('[data-phone]'); if (b) onPhone(b.getAttribute('data-phone')); });
        $('tvNext').addEventListener('click', function () { if (mode === 'play' || mode === 'owned' || mode === 'due') tv.show(tv.i + 1); });
        $('tvPrev').addEventListener('click', function () { if (mode === 'play' || mode === 'owned' || mode === 'due') tv.show(tv.i - 1); });
        $('tvPause').addEventListener('click', function () { tv.paused = !tv.paused; this.setAttribute('aria-pressed', tv.paused); this.textContent = tv.paused ? 'Play' : 'Pause'; if (!tv.paused) tv.show(tv.i + 1); else clearTimeout(tv.timer); });
        tv.photos = [SAMPLES[1]];
      }
      mode = 'play'; tv.mode = 'play'; lockSims(false); $('phonePanel').hidden = true; $('ccFeed').innerHTML = ''; tv.ads = [];
      tv.el.querySelectorAll('.tvnote').forEach(function (n) { n.remove(); });
      feed('Box linked by QR · ' + data().name, 'ok'); feed('Screen loaded: ' + S.shows.length + ' kinds of slides', 'ok');
      if (fromBuild) feed('Demo built from your answers', 'ok');
      title(); tv.restart();
    }
    return { start: start };
  })();

  /* ---------- request ---------- */
  function initRequest() {
    var f = $('pbReq');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = $('rq_name'), p = $('rq_phone'), out = $('rqOut'), er = $('rqErr'); er.hidden = true; out.innerHTML = '';
      [n, p].forEach(function (x) { x.removeAttribute('aria-invalid'); });
      if (!n.value.trim()) { er.textContent = 'Add your name.'; er.hidden = false; n.setAttribute('aria-invalid', 'true'); n.focus(); return; }
      if (p.value.replace(/\D/g, '').length < 7) { er.textContent = 'Add a phone number we can call or text.'; er.hidden = false; p.setAttribute('aria-invalid', 'true'); p.focus(); return; }
      if (f.website && f.website.value) return;
      var btn = $('rqBtn'); btn.disabled = true; btn.textContent = 'Sending…';
      var msg = 'Piet Box (screen) request. Business: ' + (S.name || '-') + ' (' + T().label + '). TVs: ' + $('rq_tvs').value + '. Wants: ' + S.shows.join(', ') + '.';
      var body = { name: n.value.trim(), phone: p.value.trim(), email: $('rq_email').value.trim(), town: '', service: 'menu-boards', message: msg, source: 'piet-box', page: '/piet-box', website: '' };
      var ctl = window.AbortController ? new AbortController() : null, to = setTimeout(function () { if (ctl) ctl.abort(); }, 12000);
      var done = function (ok) { clearTimeout(to); btn.disabled = false; btn.textContent = 'Request my Piet Box walkthrough';
        out.innerHTML = ok ? '<div class="ok"><b>Got it.</b> Piets will call or text you to set up your walkthrough.</div>' : '<div class="warnbox"><b>This demo can’t send requests.</b> Please call or text Piets at <span class="copy">631-871-5957</span> or email pietstechsolutions@gmail.com and mention the Piet Box.</div>'; };
      try { fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined }).then(function (r) { done(r.ok); }).catch(function () { done(false); }); } catch (x) { done(false); }
    });
  }
  function boot() { initStatic(); initWizard(); DEMO.start(false); initRequest(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
