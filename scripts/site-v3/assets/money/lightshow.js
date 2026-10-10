/* Piets lighting hero — the sample home with a run already on the roofline, cycling
   slowly through colour sets. Drawn in code, nothing loaded, no photo involved.
   The full designer (your own photo, your own runs) is assets/money/studio.js.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";
  var root = document.getElementById("lightshow");
  if (!root) return;
  var cv = root.querySelector("canvas");
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext("2d");
  if (!ctx) return;

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- the same dusk sample home the Design Studio starts from ---------------- */
var SAMPLE = encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">' +
    '<defs>' +
    '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#0A1A3C"/><stop offset="55%" stop-color="#1B2D55"/>' +
    '<stop offset="100%" stop-color="#3A3F63"/></linearGradient>' +
    '<linearGradient id="w2" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#4C5674"/><stop offset="100%" stop-color="#333B54"/></linearGradient>' +
    '<linearGradient id="roofg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#2B3147"/><stop offset="100%" stop-color="#1B2033"/></linearGradient>' +
    '<linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#27354A"/><stop offset="100%" stop-color="#151E2E"/></linearGradient>' +
    '<radialGradient id="glow"><stop offset="0" stop-color="#FFD9A0" stop-opacity=".55"/>' +
    '<stop offset="100%" stop-color="#FFD9A0" stop-opacity="0"/></radialGradient>' +
    '</defs>' +
    '<rect width="1200" height="750" fill="url(#sky)"/>' +
    /* stars */
    '<g fill="#CFE0FF" opacity=".5">' +
    '<circle cx="140" cy="80" r="1.6"/><circle cx="320" cy="48" r="1.2"/><circle cx="520" cy="96" r="1.4"/>' +
    '<circle cx="760" cy="60" r="1.1"/><circle cx="980" cy="104" r="1.5"/><circle cx="1100" cy="52" r="1.2"/>' +
    '<circle cx="240" cy="150" r="1"/><circle cx="880" cy="160" r="1"/></g>' +
    /* treeline — soft rounded canopies, not peaks */
    '<g fill="#101A2C" opacity=".95">' +
    '<ellipse cx="54" cy="430" rx="78" ry="56"/><ellipse cx="132" cy="412" rx="62" ry="48"/>' +
    '<ellipse cx="206" cy="436" rx="70" ry="44"/><ellipse cx="272" cy="452" rx="54" ry="34"/>' +
    '<ellipse cx="968" cy="424" rx="74" ry="54"/><ellipse cx="1046" cy="404" rx="64" ry="50"/>' +
    '<ellipse cx="1124" cy="430" rx="72" ry="46"/><ellipse cx="1186" cy="450" rx="52" ry="34"/>' +
    '<rect x="46" y="440" width="13" height="48"/><rect x="200" y="446" width="12" height="44"/>' +
    '<rect x="1040" y="436" width="13" height="50"/><rect x="1118" y="444" width="12" height="44"/>' +
    '</g>' +
    /* lawn */
    '<rect y="470" width="1200" height="280" fill="url(#lawn)"/>' +
    /* driveway */
    '<path d="M700 750 L1200 750 L1200 560 L840 560 Z" fill="#1E2639"/>' +
    /* house body */
    '<rect x="250" y="330" width="520" height="250" fill="url(#w2)"/>' +
    /* garage wing */
    '<rect x="700" y="400" width="230" height="180" fill="#3E465F"/>' +
    /* main gable roof */
    '<path d="M225 335 L510 190 L795 335 Z" fill="url(#roofg)"/>' +
    /* garage roof */
    '<path d="M682 405 L815 330 L948 405 Z" fill="#242A3E"/>' +
    /* fascia band — the line people trace for lighting */
    '<rect x="225" y="330" width="570" height="9" fill="#39415C"/>' +
    '<rect x="682" y="400" width="266" height="8" fill="#39415C"/>' +
    /* porch */
    '<rect x="420" y="455" width="190" height="125" fill="#2E3650"/>' +
    '<rect x="424" y="448" width="182" height="12" fill="#39415C"/>' +
    '<rect x="432" y="460" width="10" height="120" fill="#454E6B"/>' +
    '<rect x="588" y="460" width="10" height="120" fill="#454E6B"/>' +
    /* door + glow */
    '<circle cx="505" cy="540" r="90" fill="url(#glow)"/>' +
    '<rect x="482" y="490" width="46" height="90" rx="3" fill="#8A6A3E"/>' +
    '<circle cx="520" cy="537" r="2.5" fill="#E8D5A8"/>' +
    /* windows, some lit */
    '<g>' +
    '<rect x="300" y="380" width="64" height="74" rx="3" fill="#F2C87A" opacity=".85"/>' +
    '<rect x="300" y="380" width="64" height="74" rx="3" fill="none" stroke="#1B2033" stroke-width="5"/>' +
    '<rect x="640" y="380" width="64" height="74" rx="3" fill="#2B3350"/>' +
    '<rect x="640" y="380" width="64" height="74" rx="3" fill="none" stroke="#1B2033" stroke-width="5"/>' +
    '<rect x="300" y="480" width="64" height="74" rx="3" fill="#2B3350"/>' +
    '<rect x="300" y="480" width="64" height="74" rx="3" fill="none" stroke="#1B2033" stroke-width="5"/>' +
    '<rect x="640" y="480" width="64" height="74" rx="3" fill="#F2C87A" opacity=".7"/>' +
    '<rect x="640" y="480" width="64" height="74" rx="3" fill="none" stroke="#1B2033" stroke-width="5"/>' +
    '<rect x="470" y="250" width="72" height="56" rx="3" fill="#2B3350"/>' +
    '<rect x="470" y="250" width="72" height="56" rx="3" fill="none" stroke="#1B2033" stroke-width="5"/>' +
    '</g>' +
    /* garage door */
    '<rect x="730" y="440" width="170" height="140" rx="4" fill="#28304A"/>' +
    '<g stroke="#39415C" stroke-width="3">' +
    '<path d="M730 475h170M730 510h170M730 545h170"/></g>' +
    /* shrubs */
    '<g fill="#16202F">' +
    '<ellipse cx="290" cy="578" rx="46" ry="26"/><ellipse cx="370" cy="582" rx="38" ry="20"/>' +
    '<ellipse cx="660" cy="580" rx="42" ry="22"/></g>' +
    /* walkway */
    '<path d="M470 750 L545 750 L530 580 L495 580 Z" fill="#232B3F"/>' +
    '</svg>'
  );

  
  var SAMPLE_URL = "data:image/svg+xml;charset=utf-8," + SAMPLE;

  /* ---------------- the run that is already drawn on the house ----------------
     Normalised to the 1200x750 sample: the main gable rake, the garage rake and
     the porch fascia — the three lines a permanent install actually follows. */
  function N(x, y) { return { x: x / 1200, y: y / 750 }; }
  var RUNS = [
    [N(226, 337), N(510, 192), N(794, 337)],
    [N(683, 406), N(815, 331), N(947, 406)],
    [N(425, 450), N(605, 450)]
  ];

  /* ---------------- colour sets (no pink; Piets palette on the third) ---------------- */
  var SETS = [
    { k: "warm",  nm: "Warm white",    cols: ["#FFD9A0"] },
    { k: "xmas",  nm: "Red & green",   cols: ["#FF4D4D", "#2EE59D"] },
    { k: "piets", nm: "Cyan & purple", cols: ["#02D7F5", "#7A3DFF"] }
  ];
  var HOLD = 4600, FADE = 900;

  var S = { from: 0, to: 0, t0: Date.now(), auto: !RM, img: null, w: 0, h: 0, raf: 0, vis: true };

  var badge = root.querySelector("[data-lsbadge]");
  var btns = [].slice.call(root.querySelectorAll("[data-set]"));

  /* ---------------- colour helpers ---------------- */
  function rgb(hex) {
    var h = hex.replace("#", "");
    return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
  }
  function mix(a, b, f) {
    var x = rgb(a), y = rgb(b);
    return [Math.round(x[0] + (y[0] - x[0]) * f), Math.round(x[1] + (y[1] - x[1]) * f), Math.round(x[2] + (y[2] - x[2]) * f)];
  }
  function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
  function colAt(i, f) {
    var A = SETS[S.from].cols, B = SETS[S.to].cols;
    return mix(A[i % A.length], B[i % B.length], f);
  }

  /* ---------------- sizing ---------------- */
  function fit() {
    var host = cv.parentElement;
    var w = Math.max(200, Math.round((host && host.clientWidth) || 420));
    var h = Math.round(w * 0.625);
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    S.w = w; S.h = h;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    cv.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  /* ---------------- drawing ---------------- */
  function bulb(x, y, c, r) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(c, 0.85));
    g.addColorStop(0.35, rgba(c, 0.32));
    g.addColorStop(1, rgba(c, 0));
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, Math.max(1.3, r * 0.17), 0, 6.2832);
    ctx.fillStyle = "#fff"; ctx.fill();
  }

  function fadeF() {
    if (!S.auto || S.from === S.to) return 1;
    var dt = Date.now() - S.t0;
    if (dt <= HOLD) return 0;
    return Math.min(1, (dt - HOLD) / FADE);
  }

  function path(run, W, H) {
    ctx.beginPath();
    run.forEach(function (p, i) {
      var x = p.x * W, y = p.y * H;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
  }

  function draw() {
    var W = S.w, H = S.h;
    if (!W || !H) return;
    ctx.clearRect(0, 0, W, H);
    if (S.img) ctx.drawImage(S.img, 0, 0, W, H);
    else { ctx.fillStyle = "#0A1A3C"; ctx.fillRect(0, 0, W, H); }

    var f = fadeF();
    var r = Math.max(8, W / 44);
    var step = Math.max(10, W / 36);
    var wash = colAt(0, f);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    /* a soft wash of the current colour on the roofline, then the track itself */
    RUNS.forEach(function (run) {
      path(run, W, H);
      ctx.strokeStyle = rgba(wash, 0.1); ctx.lineWidth = Math.max(10, W / 30); ctx.stroke();
      path(run, W, H);
      ctx.strokeStyle = rgba(wash, 0.14); ctx.lineWidth = Math.max(5, W / 64); ctx.stroke();
      path(run, W, H);
      ctx.strokeStyle = "rgba(10,16,32,.8)"; ctx.lineWidth = Math.max(1.6, W / 190); ctx.stroke();
    });

    /* bulbs evenly spaced along each run */
    var n = 0;
    RUNS.forEach(function (run) {
      var segs = [], total = 0, i;
      for (i = 1; i < run.length; i++) {
        var a = { x: run[i - 1].x * W, y: run[i - 1].y * H };
        var b = { x: run[i].x * W, y: run[i].y * H };
        var d = Math.hypot(b.x - a.x, b.y - a.y);
        segs.push({ a: a, b: b, d: d });
        total += d;
      }
      var count = Math.floor(total / step);
      for (i = 0; i <= count; i++) {
        var want = i * step, acc = 0, pos = null;
        for (var j = 0; j < segs.length; j++) {
          var s = segs[j];
          if (acc + s.d >= want) {
            var k = s.d ? (want - acc) / s.d : 0;
            pos = { x: s.a.x + (s.b.x - s.a.x) * k, y: s.a.y + (s.b.y - s.a.y) * k };
            break;
          }
          acc += s.d;
        }
        if (!pos) continue;
        bulb(pos.x, pos.y, colAt(n + i, f), r);
      }
      n += count + 1;
    });
  }

  /* ---------------- set selection ---------------- */
  function label() {
    /* badge and chips both follow the set actually on the house right now */
    var cur = SETS[fadeF() < 0.5 ? S.from : S.to];
    if (badge && badge.textContent !== cur.nm) badge.textContent = cur.nm;
    btns.forEach(function (b) {
      var on = b.getAttribute("data-set") === cur.k;
      if (b.getAttribute("aria-pressed") !== String(on)) b.setAttribute("aria-pressed", String(on));
    });
  }

  function pick(k, manual) {
    var idx = -1;
    SETS.forEach(function (s, i) { if (s.k === k) idx = i; });
    if (idx < 0) return;
    if (manual) S.auto = false;
    S.from = S.to; S.to = idx; S.t0 = Date.now() - HOLD;
    if (!S.auto) { S.from = idx; }
    label();
    draw();
  }

  btns.forEach(function (b) {
    b.addEventListener("click", function () { pick(b.getAttribute("data-set"), true); });
  });

  /* ---------------- loop ---------------- */
  function loop() {
    S.raf = 0;
    if (S.auto && S.vis && !document.hidden) {
      if (Date.now() - S.t0 >= HOLD + FADE) {
        S.from = S.to;
        S.to = (S.to + 1) % SETS.length;
        S.t0 = Date.now();
      }
      draw();
      label();
    }
    S.raf = window.requestAnimationFrame ? window.requestAnimationFrame(loop) : 0;
  }

  if (window.IntersectionObserver) {
    new window.IntersectionObserver(function (es) {
      es.forEach(function (e) { S.vis = e.isIntersecting; });
    }, { threshold: 0.05 }).observe(cv);
  }

  var im = new Image();
  im.onload = function () { S.img = im; draw(); };
  im.onerror = function () { S.img = null; draw(); };
  im.src = SAMPLE_URL;

  window.addEventListener("resize", function () { fit(); });
  fit();
  label();
  if (!RM && window.requestAnimationFrame) loop();
})();
