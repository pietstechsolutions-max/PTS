/* Piet Box Studio — builder + live Command Center demo.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Sample data only. Much of this was prepared with AI — tell Matt about any mistake. */
(function () {
  'use strict';
  var A = window.PietArt;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var KEY = 'pietbox-studio-v1';

  /* ---------- data ---------- */
  var TYPES = [
    { id: 'restaurant', label: 'Restaurant', icon: 'fork', devs: { cameras: 6, wifi: 2, pos: 2, printers: 3, computers: 1, tvs: 2, phones: 1 }, pains: ['drops', 'pos', 'wifi'] },
    { id: 'dental', label: 'Dental / medical', icon: 'tooth', devs: { cameras: 4, wifi: 2, computers: 6, printers: 2, phones: 4, doors: 1 }, pains: ['drops', 'waiting', 'printers'] },
    { id: 'retail', label: 'Retail / bodega', icon: 'store', devs: { cameras: 8, wifi: 1, pos: 2, printers: 1, tvs: 1 }, pains: ['cams', 'pos', 'drops'] },
    { id: 'liquor', label: 'Liquor store', icon: 'bottle', devs: { cameras: 10, wifi: 1, pos: 2, printers: 1 }, pains: ['cams', 'pos'] },
    { id: 'auto', label: 'Auto shop', icon: 'wrench', devs: { cameras: 6, wifi: 2, computers: 3, printers: 1, tvs: 1 }, pains: ['wifi', 'cams'] },
    { id: 'office', label: 'Office', icon: 'building', devs: { wifi: 2, computers: 8, printers: 2, phones: 6, doors: 1, cameras: 2 }, pains: ['waiting', 'wifi', 'printers'] },
    { id: 'home', label: 'Home', icon: 'home', devs: { cameras: 5, wifi: 3, computers: 3, tvs: 3, smart: 12 }, pains: ['wifi', 'smart', 'cams'] },
    { id: 'other', label: 'Something else', icon: 'pulse', devs: { wifi: 2, computers: 2, cameras: 2 }, pains: ['drops'] }
  ];
  var DEVS = [
    { id: 'cameras', label: 'Cameras', icon: 'camera', max: 64 },
    { id: 'wifi', label: 'Wi-Fi access points', icon: 'wifi', max: 20 },
    { id: 'pos', label: 'POS / registers', icon: 'pos', max: 20 },
    { id: 'printers', label: 'Printers', icon: 'printer', max: 20 },
    { id: 'computers', label: 'Computers', icon: 'laptop', max: 60 },
    { id: 'tvs', label: 'TVs / screens', icon: 'tv', max: 20 },
    { id: 'phones', label: 'Desk phones', icon: 'phone', max: 40 },
    { id: 'doors', label: 'Door / access', icon: 'door', max: 20 },
    { id: 'smart', label: 'Smart home devices', icon: 'home', max: 80 }
  ];
  var PAINS = [
    { id: 'drops', label: 'Internet keeps dropping', addon: 'backup' },
    { id: 'wifi', label: 'Slow or spotty Wi-Fi' },
    { id: 'cams', label: "Can't see my cameras", addon: 'cams' },
    { id: 'pos', label: 'Cards / POS go down', addon: 'backup' },
    { id: 'printers', label: 'Printers act up' },
    { id: 'waiting', label: 'Waiting days for a tech' },
    { id: 'smart', label: 'Want a smart home', addon: 'smart' },
    { id: 'tv', label: 'Want TV menu or welcome screens', addon: 'tv' }
  ];
  var ADDONS = [
    { id: 'remote', label: 'Remote access', fixed: true },
    { id: 'watch', label: '24/7 watch', fixed: true },
    { id: 'backup', label: 'Backup internet' },
    { id: 'cams', label: 'Camera link-up' },
    { id: 'smart', label: 'Smart home hub' },
    { id: 'tv', label: 'TV screen mode' },
    { id: 'phones', label: 'Business phones (coming soon)', soon: true }
  ];
  var FEATS = [
    ['remote', 'Remote access', 'Piets connects in minutes, with your OK.'],
    ['pulse', '24/7 watch', 'Internet, Wi-Fi, cameras and registers checked all day.'],
    ['antenna', 'Backup internet', 'Main line drops? A backup line takes over.'],
    ['camera', 'Camera link-up', 'Offline camera or full drive? We hear first.'],
    ['home', 'Smart home hub', 'Home Assistant lights, locks and thermostats.'],
    ['upload', 'Instant upgrades', 'New features pushed to the box remotely.'],
    ['tv', 'TV screen mode', 'Welcome screens and menu boards on your TV.'],
    ['phone', 'Business phones', 'One phone system for every shop.', true]
  ];

  var S = { step: 1, type: 'restaurant', name: '', town: '', devs: {}, pains: [], addons: ['remote', 'watch'] };
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function load() { try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && o.type) { S = Object.assign(S, o); S.step = 1; } } catch (e) {} }
  function typeObj() { return TYPES.filter(function (t) { return t.id === S.type; })[0] || TYPES[0]; }

  /* ---------- static bits ---------- */
  function initStatic() {
    var mk = document.querySelector('[data-mark]');
    if (mk) mk.innerHTML = '<defs><linearGradient id="hdrmk" x1="0" x2="1"><stop offset="0" stop-color="#00FFFF"/><stop offset="1" stop-color="#01A2E8"/></linearGradient></defs>' + A.markG('hdrmk');
    document.querySelectorAll('[data-ic]').forEach(function (e) { e.innerHTML = A.icon(e.getAttribute('data-ic'), 20, 2); });
    $('pbFeats').innerHTML = FEATS.map(function (f) { return '<div class="feat"><span class="ic">' + A.icon(f[0], 20, 1.8) + '</span><div><b>' + f[1] + (f[3] ? '<span class="soon">SOON</span>' : '') + '</b><span>' + f[2] + '</span></div></div>'; }).join('');
    $('pbHeroBox').innerHTML = A.box({ uid: 'hero' });
    var orbs = [['camera', 'Cameras', 50, 6], ['wifi', 'Wi-Fi', 92, 28], ['pos', 'POS', 92, 72], ['tv', 'TV', 50, 92], ['home', 'Smart home', 8, 72], ['shield', '24/7 watch', 8, 28]];
    $('pbOrbs').innerHTML = orbs.map(function (o, i) { return '<div class="orb" data-orb="' + i + '" style="left:' + o[2] + '%;top:' + o[3] + '%">' + A.icon(o[0], 24, 1.8) + '<b>' + o[1] + '</b></div>'; }).join('');
    var msgs = ['Piet Box online · all systems go', 'Camera check · 6 of 6 online', 'Wi-Fi check · strong signal', 'POS check · cards working', 'TV screen · menu updated', 'Update pushed · box is current'];
    var k = 0;
    if (!RM) setInterval(function () {
      k = (k + 1) % msgs.length; $('pbTicker').textContent = msgs[k];
      document.querySelectorAll('.orb').forEach(function (o) { o.classList.remove('ping'); });
      var o = document.querySelector('[data-orb="' + ((k + 5) % 6) + '"]'); if (o) o.classList.add('ping');
    }, 2600);
  }

  /* ---------- wizard ---------- */
  function renderTypes() {
    $('pbTypes').innerHTML = TYPES.map(function (t) { return '<button type="button" class="opt" role="radio" aria-checked="' + (S.type === t.id) + '" data-type="' + t.id + '">' + A.icon(t.icon, 22, 1.8) + t.label + '</button>'; }).join('');
  }
  function renderDevs() {
    $('pbDevs').innerHTML = DEVS.map(function (d) {
      var n = S.devs[d.id] || 0;
      return '<div class="dev' + (n ? ' has' : '') + '">' + A.icon(d.icon, 22, 1.8) + '<span>' + d.label + '</span><div class="cnt"><button type="button" data-dev="' + d.id + '" data-d="-1" aria-label="Fewer ' + d.label + '">&minus;</button><output id="cnt_' + d.id + '">' + n + '</output><button type="button" data-dev="' + d.id + '" data-d="1" aria-label="More ' + d.label + '">+</button></div></div>';
    }).join('');
  }
  function renderPains() {
    $('pbPains').innerHTML = PAINS.map(function (p) { return '<button type="button" class="chip" aria-pressed="' + (S.pains.indexOf(p.id) > -1) + '" data-pain="' + p.id + '">' + p.label + '</button>'; }).join('');
  }
  function renderAddons() {
    $('pbAddons').innerHTML = ADDONS.map(function (a) {
      var on = a.fixed || S.addons.indexOf(a.id) > -1;
      return '<button type="button" class="chip" aria-pressed="' + on + '" data-addon="' + a.id + '"' + (a.fixed ? ' disabled title="Always included"' : '') + '>' + a.label + (a.fixed ? ' · always on' : '') + '</button>';
    }).join('');
  }
  function suggestAddons() {
    var set = { remote: 1, watch: 1 };
    S.pains.forEach(function (p) { var o = PAINS.filter(function (x) { return x.id === p; })[0]; if (o && o.addon) set[o.addon] = 1; });
    if ((S.devs.cameras || 0) > 0) set.cams = 1;
    if ((S.devs.smart || 0) > 0) set.smart = 1;
    if ((S.devs.tvs || 0) > 0 && (S.type === 'restaurant' || S.type === 'retail')) set.tv = 1;
    S.addons = Object.keys(set);
  }
  var LABELS = ['Your place', 'What you have', 'What bugs you', 'Your box'];
  function show(step) {
    S.step = step;
    document.querySelectorAll('#pbForm .ws').forEach(function (f) { f.hidden = +f.getAttribute('data-step') !== step; });
    document.querySelectorAll('#pbStepper li').forEach(function (li, i) { li.className = i + 1 === step ? 'on' : (i + 1 < step ? 'done' : ''); });
    $('pbBack').hidden = step === 1;
    $('pbNext').innerHTML = step === 4 ? 'Build my demo &rarr;' : 'Next &rarr;';
    $('pbErr').hidden = true;
    if (step === 4) renderAddons();
  }
  function err(msg, el) { $('pbErr').textContent = msg; $('pbErr').hidden = false; if (el) { el.setAttribute('aria-invalid', 'true'); el.focus(); } }
  function next() {
    if (S.step === 1) {
      var nm = $('pb_name'); S.name = nm.value.trim(); S.town = $('pb_town').value.trim();
      if (!S.name) return err('Add a business or family name so the demo shows your place.', nm);
      nm.removeAttribute('aria-invalid');
    }
    if (S.step === 3) suggestAddons();
    save();
    if (S.step < 4) { show(S.step + 1); scrollWiz(); return; }
    build();
  }
  function scrollWiz() { var w = $('pbWiz'); if (w && w.getBoundingClientRect().top < 0) w.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); }

  function initWizard() {
    load();
    if (!Object.keys(S.devs).length) S.devs = Object.assign({}, typeObj().devs);
    $('pb_name').value = S.name || ''; $('pb_town').value = S.town || '';
    renderTypes(); renderDevs(); renderPains(); show(1);
    $('pbTypes').addEventListener('click', function (e) {
      var b = e.target.closest('[data-type]'); if (!b) return;
      if (S.type !== b.getAttribute('data-type')) { S.type = b.getAttribute('data-type'); S.devs = Object.assign({}, typeObj().devs); S.pains = typeObj().pains.slice(); renderDevs(); renderPains(); }
      renderTypes(); save();
    });
    $('pbDevs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-dev]'); if (!b) return;
      var id = b.getAttribute('data-dev'), d = DEVS.filter(function (x) { return x.id === id; })[0];
      var n = Math.max(0, Math.min(d.max, (S.devs[id] || 0) + (+b.getAttribute('data-d'))));
      S.devs[id] = n; $('cnt_' + id).textContent = n; b.closest('.dev').classList.toggle('has', n > 0); save();
    });
    $('pbPains').addEventListener('click', function (e) {
      var b = e.target.closest('[data-pain]'); if (!b) return; var id = b.getAttribute('data-pain'), i = S.pains.indexOf(id);
      if (i > -1) S.pains.splice(i, 1); else S.pains.push(id); b.setAttribute('aria-pressed', i < 0); save();
    });
    $('pbAddons').addEventListener('click', function (e) {
      var b = e.target.closest('[data-addon]'); if (!b || b.disabled) return; var id = b.getAttribute('data-addon'), i = S.addons.indexOf(id);
      if (i > -1) S.addons.splice(i, 1); else S.addons.push(id); b.setAttribute('aria-pressed', i < 0); save();
    });
    $('pbNext').addEventListener('click', next);
    $('pbBack').addEventListener('click', function () { show(Math.max(1, S.step - 1)); });
    $('pbForm').addEventListener('submit', function (e) { e.preventDefault(); next(); });
    $('pb_name').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); next(); } });
    $('ccRebuild').addEventListener('click', function () { show(1); });
  }

  function build() {
    $('pbWiz').hidden = true; $('pbBuilding').hidden = false;
    var lis = $('pbBlist').querySelectorAll('li'); lis.forEach(function (l) { l.className = ''; });
    $('pbBuilding').scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
    var i = 0, t = setInterval(function () {
      if (i < lis.length) { lis[i].className = 'on'; i++; return; }
      clearInterval(t); $('pbBuilding').hidden = true; $('pbWiz').hidden = false; show(1);
      CC.start(true); $('center').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
    }, RM ? 120 : 650);
  }

  /* ---------- Command Center ---------- */
  var CC = (function () {
    var state = {}, chart = [], timer = null, busy = false, tick = 0;
    function now() { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2); }
    function feed(msg, cls) {
      var ul = $('ccFeed'); var li = document.createElement('li'); li.className = cls || '';
      li.innerHTML = '<time>' + now() + '</time><span>' + esc(msg) + '</span>'; ul.insertBefore(li, ul.firstChild);
      while (ul.children.length > 30) ul.removeChild(ul.lastChild);
    }
    function has(a) { return S.addons.indexOf(a) > -1; }
    function tilesSpec() {
      var t = [{ id: 'net', icon: 'cloud', label: 'Internet', val: 'Online' }];
      if (has('backup')) t.push({ id: 'backup', icon: 'antenna', label: 'Backup line', val: 'Ready' });
      DEVS.forEach(function (d) {
        var n = S.devs[d.id] || 0; if (!n) return;
        var v = d.id === 'cameras' ? n + ' of ' + n + ' online' : (n === 1 ? 'Online' : n + ' online');
        t.push({ id: d.id, icon: d.icon, label: d.label, val: v });
      });
      t.push({ id: 'sec', icon: 'shield', label: 'Security', val: 'Protected' });
      t.push({ id: 'upd', icon: 'upload', label: 'Updates', val: 'Current' });
      return t;
    }
    function renderTiles() {
      $('ccTiles').innerHTML = tilesSpec().map(function (t) {
        var st = state[t.id] || { cls: '', val: t.val };
        return '<div class="tile ' + st.cls + '" id="tile_' + t.id + '"><small>' + A.icon(t.icon, 16, 2) + esc(t.label) + '</small><b><span class="dot ' + st.cls + '"></span><span>' + esc(st.val) + '</span></b></div>';
      }).join('');
    }
    function setTile(id, cls, val) { state[id] = { cls: cls, val: val }; renderTiles(); }
    function clearTile(id) { delete state[id]; renderTiles(); }
    function setStatus(cls, text) { var s = $('ccStatus'); s.className = 'st ' + cls; s.innerHTML = '<span class="dot ' + cls + '"></span>' + esc(text); }
    function sims() {
      var list = [['net', 'antenna', 'Internet goes down']];
      if ((S.devs.cameras || 0) > 0) list.push(['cam', 'camera', 'A camera goes offline']);
      if ((S.devs.pos || 0) > 0 || (S.devs.printers || 0) > 0) list.push(['printer', 'printer', 'Printer stops printing']);
      list.push(['help', 'remote', 'You need help on a computer']);
      list.push(['upd', 'upload', 'Piets pushes a new feature']);
      if (has('tv')) list.push(['tv', 'tv', 'Show my TV screen']);
      $('ccSim').innerHTML = list.map(function (s) { return '<button type="button" data-sim="' + s[0] + '">' + A.icon(s[1], 20, 1.8) + s[2] + '</button>'; }).join('');
    }
    function lock(on) { busy = on; document.querySelectorAll('#ccSim button').forEach(function (b) { if (b.getAttribute('data-sim') !== 'tv') b.disabled = on; }); }
    function seq(steps) { lock(true); var i = 0; (function run() { if (i >= steps.length) { lock(false); return; } var s = steps[i++]; s[1](); setTimeout(run, RM ? 300 : s[0]); })(); }
    var SIM = {
      net: function () {
        var bk = has('backup');
        seq([
          [1400, function () { setTile('net', 'bad', 'Down'); setStatus('bad', 'Internet down'); $('ccNet').textContent = 'Down'; feed('Main internet line dropped', 'bad'); }],
          [1600, function () {
            if (bk) { setTile('backup', 'warn', 'In use'); setStatus('warn', 'Running on backup'); $('ccNet').textContent = 'Backup line'; feed('Backup line took over · cards and cameras still working', 'ok'); }
            else { feed('Piets alerted · calling your internet provider for you', 'warn'); feed('Tip: add backup internet so cards keep working', 'warn'); }
          }],
          [2400, function () { feed('Piets alerted before you called', 'ok'); }],
          [1800, function () { clearTile('net'); if (bk) clearTile('backup'); setStatus('', 'All systems go'); $('ccNet').textContent = 'Main line'; feed('Main line back · switched home', 'ok'); }]
        ]);
      },
      cam: function () {
        var n = S.devs.cameras || 1;
        seq([
          [1500, function () { setTile('cameras', 'bad', (n - 1) + ' of ' + n + ' online'); setStatus('warn', 'Camera offline'); feed('Camera ' + Math.min(3, n) + ' stopped sending video', 'bad'); }],
          [1700, function () { feed('Box restarted the camera port remotely', 'warn'); }],
          [1500, function () { clearTile('cameras'); setStatus('', 'All systems go'); feed('Camera ' + Math.min(3, n) + ' back online · recording', 'ok'); }]
        ]);
      },
      printer: function () {
        seq([
          [1400, function () { setTile('printers', 'warn', 'Kitchen printer stuck'); setStatus('warn', 'Printer issue'); feed('Kitchen printer stopped responding', 'warn'); }],
          [1700, function () { feed('Piets cleared the print queue remotely', 'ok'); }],
          [1200, function () { clearTile('printers'); setStatus('', 'All systems go'); feed('Printer back · test ticket printed', 'ok'); }]
        ]);
      },
      help: function () {
        $('ccRemoteCode').textContent = String(100 + Math.floor(Math.random() * 899)) + ' ' + String(100 + Math.floor(Math.random() * 899)) + ' ' + String(100 + Math.floor(Math.random() * 899));
        $('ccRemoteT').textContent = 'Piets wants to connect'; $('ccRemoteP').textContent = 'Your OK is needed before anyone can see a screen.';
        $('ccRemoteOk').hidden = false; $('ccRemoteNo').textContent = 'Not now';
        $('ccRemote').hidden = false; $('ccRemoteOk').focus(); feed('You asked for help · Piets is requesting access', 'warn');
      },
      upd: function () {
        seq([
          [1300, function () { setTile('upd', 'warn', 'Installing…'); feed('Piets pushed an update to your box', 'warn'); }],
          [1500, function () { clearTile('upd'); feed('Update installed · no visit needed', 'ok'); }]
        ]);
      },
      tv: function () { var tv = $('ccTv'); tv.hidden = !tv.hidden; if (!tv.hidden) { tvRender(); feed('TV screen mode shown', 'ok'); } }
    };
    var tvI = 0, tvT = null;
    function tvSlides() {
      var nm = S.name || typeObj().label;
      var t = S.type;
      var s = [['Welcome', 'Welcome to ' + nm, S.town ? S.town : 'We are glad you are here']];
      if (t === 'restaurant') s.push(['Today', "Today's specials", 'Updated by Piets from anywhere'], ['Order', 'Free Wi-Fi for guests', 'Ask for the password at the counter']);
      else if (t === 'dental') s.push(['Patients', 'Please check in at the desk', 'Free Wi-Fi in the waiting room']);
      else if (t === 'home') s.push(['Home', 'Good evening', 'Doors locked · cameras on']);
      else s.push(['Info', 'Thanks for stopping by', 'Free Wi-Fi available']);
      return s;
    }
    function tvRender() {
      var s = tvSlides(); tvI = tvI % s.length; var x = s[tvI];
      $('ccTvScr').innerHTML = '<div class="k">' + esc(x[0]) + '</div><div class="t">' + esc(x[1]) + '</div><div class="s">' + esc(x[2]) + '</div><div class="tv__dots">' + s.map(function (_, i) { return '<i class="' + (i === tvI ? 'on' : '') + '"></i>'; }).join('') + '</div><div class="ph"><span>Powered by Piets</span>631-871-5957</div>';
      clearTimeout(tvT); if (!RM) tvT = setTimeout(function () { if (!$('ccTv').hidden) { tvI++; tvRender(); } }, 3500);
    }
    function drawChart() {
      var c = $('ccChart'); if (!c) return; var w = c.clientWidth || 900, h = 120, dpr = window.devicePixelRatio || 1;
      if (c.width !== Math.round(w * dpr)) { c.width = Math.round(w * dpr); c.height = h * dpr; }
      var g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
      g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 1; for (var y = 30; y < h; y += 30) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
      var bad = state.net && state.net.cls === 'bad';
      var n = chart.length, step = w / 59;
      g.beginPath(); for (var i = 0; i < n; i++) { var px = i * step, py = h - 8 - chart[i] * (h - 20); if (i) g.lineTo(px, py); else g.moveTo(px, py); }
      g.lineTo((n - 1) * step, h); g.lineTo(0, h); g.closePath();
      var gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, bad ? 'rgba(255,176,32,.4)' : 'rgba(0,229,255,.4)'); gr.addColorStop(1, 'rgba(0,229,255,0)'); g.fillStyle = gr; g.fill();
      g.beginPath(); for (i = 0; i < n; i++) { px = i * step; py = h - 8 - chart[i] * (h - 20); if (i) g.lineTo(px, py); else g.moveTo(px, py); }
      g.strokeStyle = bad ? '#FFB020' : '#00E5FF'; g.lineWidth = 2.5; g.stroke();
      if (n) { g.beginPath(); g.arc((n - 1) * step, h - 8 - chart[n - 1] * (h - 20), 4.5, 0, 7); g.fillStyle = '#fff'; g.fill(); }
    }
    function pushPoint() {
      tick++;
      var base = 0.45 + 0.18 * Math.sin(tick / 6) + Math.random() * 0.18;
      if (state.net && state.net.cls === 'bad') base = has('backup') ? 0.22 + Math.random() * 0.06 : 0.02;
      chart.push(Math.max(0, Math.min(1, base))); while (chart.length > 60) chart.shift(); drawChart();
      var secs = tick % 30; $('ccLast').textContent = secs < 3 ? 'just now' : secs + ' s ago';
    }
    var ROUTINE = ['Wi-Fi check · strong signal', 'Speed test · normal', 'Camera check · all recording', 'Backup check · ready', 'Security scan · clean', 'POS check · cards working', 'Recorder drive · healthy'];
    function routine() {
      if (busy) return; var r = ROUTINE.filter(function (m) {
        if (m.indexOf('Camera') === 0 || m.indexOf('Recorder') === 0) return (S.devs.cameras || 0) > 0;
        if (m.indexOf('POS') === 0) return (S.devs.pos || 0) > 0; if (m.indexOf('Backup') === 0) return has('backup'); return true;
      }); feed(r[Math.floor(Math.random() * r.length)], 'ok');
    }
    function start(fromBuild) {
      state = {}; var t = typeObj(); var nm = S.name || ('Sample ' + t.label);
      $('ccName').textContent = nm; $('ccKind').textContent = t.label + (S.town ? ' · ' + S.town : '');
      $('ccSite').textContent = nm.toUpperCase();
      $('ccTitle').innerHTML = 'What Piets sees <em>for ' + esc(nm) + '</em>';
      var total = 0; DEVS.forEach(function (d) { total += S.devs[d.id] || 0; }); $('ccDevCount').textContent = total;
      $('ccBox').innerHTML = A.box({ uid: 'cc', glow: false });
      $('ccFeed').innerHTML = ''; $('ccTv').hidden = true;
      renderTiles(); sims(); setStatus('', 'All systems go'); $('ccNet').textContent = 'Main line'; lock(false);
      feed('Piet Box connected to the Piets Hub', 'ok');
      feed('Found ' + total + ' devices on your network', 'ok');
      feed('24/7 watch turned on', 'ok');
      if (!chart.length) for (var i = 0; i < 60; i++) { tick++; chart.push(0.45 + 0.18 * Math.sin(tick / 6) + Math.random() * 0.18); }
      drawChart();
      if (!timer) { timer = setInterval(pushPoint, 1000); setInterval(routine, 7000); }
      if (fromBuild) feed('Demo built from your answers', 'ok');
    }
    function init() {
      $('ccSim').addEventListener('click', function (e) { var b = e.target.closest('[data-sim]'); if (!b || b.disabled) return; var k = b.getAttribute('data-sim'); if (busy && k !== 'tv') return; SIM[k](); });
      $('ccRemoteOk').addEventListener('click', function () {
        $('ccRemoteT').textContent = 'Piets is connected'; $('ccRemoteP').textContent = 'Demo: in real life, Piets would now fix the problem while you watch. You can end the session any time.';
        $('ccRemoteOk').hidden = true; $('ccRemoteNo').textContent = 'End session'; feed('You allowed remote help · Piets connected', 'ok');
      });
      $('ccRemoteNo').addEventListener('click', function () { $('ccRemote').hidden = true; feed('Remote session closed', 'ok'); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('ccRemote').hidden) { $('ccRemote').hidden = true; } });
      window.addEventListener('resize', drawChart);
      start(false);
    }
    return { init: init, start: start };
  })();

  /* ---------- request form ---------- */
  function initRequest() {
    var f = $('pbReq');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = $('rq_name'), p = $('rq_phone'), out = $('rqOut'), er = $('rqErr');
      er.hidden = true; out.innerHTML = '';
      [n, p].forEach(function (x) { x.removeAttribute('aria-invalid'); });
      if (!n.value.trim()) { er.textContent = 'Add your name.'; er.hidden = false; n.setAttribute('aria-invalid', 'true'); n.focus(); return; }
      if (p.value.replace(/\D/g, '').length < 7) { er.textContent = 'Add a phone number we can call or text.'; er.hidden = false; p.setAttribute('aria-invalid', 'true'); p.focus(); return; }
      if (f.website && f.website.value) return;
      var btn = $('rqBtn'); btn.disabled = true; btn.textContent = 'Sending…';
      var msg = 'Piet Box request. Place: ' + (S.name || '-') + ' (' + typeObj().label + (S.town ? ', ' + S.town : '') + '). Devices: ' + DEVS.filter(function (d) { return S.devs[d.id]; }).map(function (d) { return d.label + ' ' + S.devs[d.id]; }).join(', ') + '. Wants: ' + S.addons.join(', ') + '. Pains: ' + S.pains.join(', ') + '. Best time: ' + $('rq_time').value;
      var body = { name: n.value.trim(), phone: p.value.trim(), email: $('rq_email').value.trim(), town: S.town || '', service: 'managed-services', message: msg, source: 'piet-box', website: '' };
      var ctl = window.AbortController ? new AbortController() : null; var to = setTimeout(function () { if (ctl) ctl.abort(); }, 12000);
      var done = function (ok) {
        clearTimeout(to); btn.disabled = false; btn.textContent = 'Request my Piet Box walkthrough';
        out.innerHTML = ok ? '<div class="ok"><b>Got it.</b> Piets will call or text you to set up your walkthrough.</div>'
          : '<div class="warnbox"><b>This demo can’t send requests.</b> Please call or text Piets at <span class="copy">631-871-5957</span> or email pietstechsolutions@gmail.com and mention the Piet Box.</div>';
      };
      try {
        fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctl ? ctl.signal : undefined })
          .then(function (r) { done(r.ok); }).catch(function () { done(false); });
      } catch (x) { done(false); }
    });
  }

  function boot() { initStatic(); initWizard(); CC.init(); initRequest(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
