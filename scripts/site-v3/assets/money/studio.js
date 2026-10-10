/* Piets Design Studio — put cameras or lighting on a photo of the actual house.
   Everything runs in the browser. The photo never leaves the device unless the visitor
   sends the design to Piets themselves.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";
  var root = document.getElementById("studio-app");
  if (!root) return;

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- two sample properties to start from, both drawn in code ----------------
     Same dusk treatment on each: a house and a storefront, so a homeowner and a shop or
     plaza owner both see something like their own building before uploading a photo. */
  var SAMPLE_HOME =
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
    '</svg>';

  /* A storefront / small plaza elevation at dusk. Two units under one parapet, so the
     restaurant, the bodega and the plaza owner all see themselves in it. Demo signage
     only — "Sample Cafe" and an unlettered neighbouring unit. */
  var SAMPLE_SHOP =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">' +
    '<defs>' +
    '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#0A1A3C"/><stop offset="55%" stop-color="#1B2D55"/>' +
    '<stop offset="100%" stop-color="#3A3F63"/></linearGradient>' +
    '<linearGradient id="face" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#4A5370"/><stop offset="100%" stop-color="#313A52"/></linearGradient>' +
    '<linearGradient id="face2" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#3C455E"/><stop offset="100%" stop-color="#283045"/></linearGradient>' +
    '<linearGradient id="lot" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#20283A"/><stop offset="100%" stop-color="#121926"/></linearGradient>' +
    '<linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#FFE2AE" stop-opacity=".92"/>' +
    '<stop offset="100%" stop-color="#E7A95C" stop-opacity=".72"/></linearGradient>' +
    '<linearGradient id="glass2" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#9FB6D8" stop-opacity=".5"/>' +
    '<stop offset="100%" stop-color="#55668A" stop-opacity=".45"/></linearGradient>' +
    '<radialGradient id="spill"><stop offset="0" stop-color="#FFD9A0" stop-opacity=".5"/>' +
    '<stop offset="100%" stop-color="#FFD9A0" stop-opacity="0"/></radialGradient>' +
    '</defs>' +
    '<rect width="1200" height="750" fill="url(#sky)"/>' +
    /* stars */
    '<g fill="#CFE0FF" opacity=".45">' +
    '<circle cx="110" cy="70" r="1.5"/><circle cx="350" cy="44" r="1.1"/><circle cx="600" cy="88" r="1.3"/>' +
    '<circle cx="820" cy="56" r="1.1"/><circle cx="1010" cy="96" r="1.4"/><circle cx="1150" cy="48" r="1.1"/>' +
    '<circle cx="210" cy="132" r="1"/><circle cx="930" cy="140" r="1"/></g>' +
    /* distant roofline behind the plaza */
    '<g fill="#101A2C" opacity=".9">' +
    '<rect x="0" y="300" width="150" height="120"/><rect x="150" y="340" width="110" height="80"/>' +
    '<rect x="1020" y="320" width="180" height="100"/></g>' +
    /* trees at the edges */
    '<g fill="#0E1726" opacity=".95">' +
    '<ellipse cx="46" cy="330" rx="64" ry="46"/><ellipse cx="1172" cy="316" rx="60" ry="44"/>' +
    '<rect x="40" y="340" width="12" height="62"/><rect x="1166" y="326" width="12" height="70"/></g>' +
    /* parking lot */
    '<rect y="560" width="1200" height="190" fill="url(#lot)"/>' +
    /* sidewalk */
    '<rect x="0" y="536" width="1200" height="30" fill="#2A3245"/>' +
    '<rect x="0" y="536" width="1200" height="4" fill="#3A4359"/>' +
    /* building block — two units under one parapet */
    '<rect x="120" y="300" width="620" height="240" fill="url(#face)"/>' +
    '<rect x="740" y="332" width="330" height="208" fill="url(#face2)"/>' +
    /* parapet caps — the line people trace for lighting */
    '<rect x="112" y="284" width="636" height="20" rx="3" fill="#39415C"/>' +
    '<rect x="112" y="284" width="636" height="6" rx="3" fill="#4A5473"/>' +
    '<rect x="732" y="316" width="346" height="18" rx="3" fill="#39415C"/>' +
    '<rect x="732" y="316" width="346" height="5" rx="3" fill="#4A5473"/>' +
    /* raised sign tower over the entry */
    '<rect x="330" y="232" width="250" height="58" rx="4" fill="#2B3349"/>' +
    '<rect x="324" y="222" width="262" height="14" rx="3" fill="#3E4766"/>' +
    '<rect x="346" y="246" width="218" height="32" rx="3" fill="#0D1526"/>' +
    '<text x="455" y="270" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="22" ' +
    'font-weight="700" letter-spacing="2" fill="#8FA6C8">SAMPLE CAFE</text>' +
    /* awnings over the shopfront bays */
    '<path d="M150 388 L300 388 L312 424 L138 424 Z" fill="#24314D"/>' +
    '<path d="M150 388 L300 388 L306 406 L144 406 Z" fill="#2E3C5C"/>' +
    '<path d="M560 388 L710 388 L722 424 L548 424 Z" fill="#24314D"/>' +
    '<path d="M560 388 L710 388 L716 406 L554 406 Z" fill="#2E3C5C"/>' +
    /* light spill on the sidewalk */
    '<ellipse cx="225" cy="548" rx="150" ry="46" fill="url(#spill)"/>' +
    '<ellipse cx="455" cy="552" rx="160" ry="50" fill="url(#spill)"/>' +
    '<ellipse cx="635" cy="548" rx="140" ry="44" fill="url(#spill)"/>' +
    /* plate glass — left bay */
    '<rect x="150" y="424" width="150" height="112" fill="url(#glass)"/>' +
    '<g stroke="#161E30" stroke-width="7" fill="none">' +
    '<rect x="150" y="424" width="150" height="112"/><path d="M225 424v112"/></g>' +
    /* plate glass — right bay */
    '<rect x="560" y="424" width="150" height="112" fill="url(#glass)"/>' +
    '<g stroke="#161E30" stroke-width="7" fill="none">' +
    '<rect x="560" y="424" width="150" height="112"/><path d="M635 424v112"/></g>' +
    /* entry — double glass door under a lit transom */
    '<rect x="372" y="396" width="166" height="26" rx="2" fill="#F2C87A" opacity=".72"/>' +
    '<rect x="372" y="396" width="166" height="26" rx="2" fill="none" stroke="#161E30" stroke-width="5"/>' +
    '<rect x="378" y="430" width="154" height="106" fill="url(#glass)"/>' +
    '<g stroke="#161E30" stroke-width="7" fill="none">' +
    '<rect x="378" y="430" width="154" height="106"/><path d="M455 430v106"/></g>' +
    '<g fill="#0E1626"><rect x="440" y="474" width="8" height="26" rx="4"/>' +
    '<rect x="462" y="474" width="8" height="26" rx="4"/></g>' +
    /* neighbouring unit — unlettered fascia, one window dark, one lit */
    '<rect x="770" y="350" width="260" height="30" rx="3" fill="#0F1726"/>' +
    '<rect x="776" y="420" width="110" height="116" fill="url(#glass2)"/>' +
    '<g stroke="#161E30" stroke-width="7" fill="none"><rect x="776" y="420" width="110" height="116"/></g>' +
    '<rect x="906" y="420" width="110" height="116" fill="url(#glass)" opacity=".55"/>' +
    '<g stroke="#161E30" stroke-width="7" fill="none"><rect x="906" y="420" width="110" height="116"/></g>' +
    /* service door at the far right — the one that wants a camera on it */
    '<rect x="1038" y="446" width="36" height="90" rx="2" fill="#222B3E"/>' +
    '<circle cx="1046" cy="492" r="2.4" fill="#8FA6C8"/>' +
    /* wall pack over the service door */
    '<rect x="1044" y="422" width="24" height="9" rx="3" fill="#3D465F"/>' +
    '<ellipse cx="1056" cy="470" rx="34" ry="52" fill="url(#spill)" opacity=".7"/>' +
    /* bollards and a planter */
    '<g fill="#1A2234"><rect x="330" y="508" width="12" height="32" rx="6"/>' +
    '<rect x="568" y="508" width="12" height="32" rx="6"/>' +
    '<rect x="124" y="500" width="54" height="40" rx="5"/></g>' +
    '<ellipse cx="151" cy="500" rx="30" ry="16" fill="#14202E"/>' +
    /* lot lamp post — out in the parking lot, clear of the facade */
    '<g fill="#1B2335"><rect x="1121" y="470" width="9" height="180"/>' +
    '<rect x="1094" y="462" width="64" height="11" rx="4"/></g>' +
    '<ellipse cx="1125" cy="672" rx="140" ry="48" fill="url(#spill)" opacity=".5"/>' +
    /* parking stripes */
    '<g stroke="#38425A" stroke-width="5" opacity=".75">' +
    '<path d="M150 620 L120 750"/><path d="M330 620 L310 750"/><path d="M510 620 L500 750"/>' +
    '<path d="M690 620 L690 750"/><path d="M870 620 L880 750"/><path d="M1050 620 L1070 750"/></g>' +
    '<rect x="0" y="612" width="1200" height="4" fill="#38425A" opacity=".55"/>' +
    '</svg>';

  var SAMPLES = {
    home: { nm: "Sample home", svg: SAMPLE_HOME, hint: "A two-storey house with an attached garage." },
    shop: { nm: "Sample storefront", svg: SAMPLE_SHOP, hint: "A storefront and a neighbouring plaza unit." }
  };

  function sampleUrl(k) {
    var s = SAMPLES[k] || SAMPLES.home;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s.svg);
  }

  /* ---------------- state ---------------- */
  var S = {
    mode: "cam",
    img: null,
    sample: "home",
    usingPhoto: false,
    imgName: "Sample home",
    cams: [],          // {x,y,aim,fov,type}
    runs: [[]],        // lighting: array of runs, each an array of {x,y}
    sel: -1,
    style: "warm",
    spacing: 26,
    perm: true,
    chase: false,
    drag: null,
    savedAt: 0,
    photoMissing: false,
    /* keyboard driving: a crosshair on the picture, moved with the arrow keys */
    kb: false,
    kx: 0.5,
    ky: 0.55
  };

  var STYLES = {
    warm:    { nm: "Warm white",        cols: ["#FFD9A0"] },
    cool:    { nm: "Cool white",        cols: ["#DCEEFF"] },
    multi:   { nm: "Classic multi",     cols: ["#FF5D5D", "#2EE59D", "#FFD166", "#5BA8FF", "#C77DFF"] },
    xmas:    { nm: "Red & green",       cols: ["#FF4D4D", "#2EE59D"] },
    fall:    { nm: "Orange & purple",   cols: ["#FF9A3C", "#A05BFF"] },
    piets:   { nm: "Piets cyan/purple", cols: ["#02D7F5", "#7A3DFF"] }
  };

  var FOVS = [
    ["Wide", 110], ["Standard", 90], ["Narrow", 70], ["Long range", 45]
  ];

  /* ---------------- saved design: this browser only, per viewer ----------------
     Kept in the browser's own storage on the visitor's device. Nothing is sent to
     Piets, and an uploaded photo is never stored — only the design on top of it. */
  var LSKEY = "piets.studio.v1", saveTimer = null;

  function lsGet() { try { return window.localStorage.getItem(LSKEY); } catch (e) { return null; } }
  function lsSet(v) { try { window.localStorage.setItem(LSKEY, v); return true; } catch (e) { return false; } }
  function lsDel() { try { window.localStorage.removeItem(LSKEY); } catch (e) { } }

  function r4(v) { v = +v; return isFinite(v) ? Math.round(v * 1e4) / 1e4 : 0; }
  function n01(v) {
    v = +v;
    if (!isFinite(v)) return null;
    return Math.max(-0.2, Math.min(1.2, Math.round(v * 1e4) / 1e4));
  }
  function fovOk(v) {
    v = +v;
    for (var i = 0; i < FOVS.length; i++) if (FOVS[i][1] === v) return v;
    return 90;
  }
  function typeOk(v) { return (v === "Bullet" || v === "Dome") ? v : "Turret"; }

  function cleanPts(arr, cap) {
    var out = [], i, p, x, y;
    if (!arr || !arr.length) return out;
    for (i = 0; i < arr.length && out.length < cap; i++) {
      p = arr[i];
      if (!p) continue;
      x = n01(p.x); y = n01(p.y);
      if (x === null || y === null) continue;
      out.push({ x: x, y: y });
    }
    return out;
  }

  function saveSoon() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(writeSave, 450);
  }

  function writeSave() {
    saveTimer = null;
    try {
      var cams = [], i, c, x, y;
      for (i = 0; i < S.cams.length && cams.length < 60; i++) {
        c = S.cams[i];
        x = n01(c.x); y = n01(c.y);
        if (x === null || y === null) continue;
        cams.push({ x: x, y: y, aim: r4(c.aim), fov: fovOk(c.fov), type: typeOk(c.type) });
      }
      var runs = S.runs.slice(0, 16).map(function (r) { return cleanPts(r, 300); });
      var d = {
        v: 1, ts: Date.now(),
        mode: S.mode === "light" ? "light" : "cam",
        style: STYLES[S.style] ? S.style : "warm",
        spacing: S.spacing, perm: !!S.perm, chase: !!S.chase,
        sample: SAMPLES[S.sample] ? S.sample : "home",
        photo: !!S.usingPhoto || !!S.photoMissing,
        cams: cams, runs: runs
      };
      if (lsSet(JSON.stringify(d))) S.savedAt = d.ts;
    } catch (e) { /* storage full, blocked or private mode — the studio keeps working */ }
    savedLine();
  }

  function restore() {
    var raw = lsGet();
    if (!raw) return false;
    var d = null;
    try { d = JSON.parse(raw); } catch (e) { d = null; }
    if (!d || typeof d !== "object" || d.v !== 1) { lsDel(); return false; }
    try {
      S.mode = d.mode === "light" ? "light" : "cam";
      if (STYLES[d.style]) S.style = d.style;
      var sp = +d.spacing;
      if (isFinite(sp) && sp >= 12 && sp <= 54) S.spacing = sp;
      S.perm = d.perm !== false;
      S.chase = !!d.chase;
      if (SAMPLES[d.sample]) S.sample = d.sample;

      var cams = [];
      (Object.prototype.toString.call(d.cams) === "[object Array]" ? d.cams : []).slice(0, 60)
        .forEach(function (c) {
          if (!c) return;
          var x = n01(c.x), y = n01(c.y);
          if (x === null || y === null) return;
          cams.push({ x: x, y: y, aim: r4(c.aim), fov: fovOk(c.fov), type: typeOk(c.type) });
        });
      S.cams = cams;

      var runs = [];
      (Object.prototype.toString.call(d.runs) === "[object Array]" ? d.runs : []).slice(0, 16)
        .forEach(function (r) { runs.push(cleanPts(r, 300)); });
      S.runs = runs.length ? runs : [[]];

      S.sel = cams.length ? cams.length - 1 : -1;
      S.savedAt = isFinite(+d.ts) ? +d.ts : 0;
      S.photoMissing = !!d.photo;
      return true;
    } catch (e) {
      S.cams = []; S.runs = [[]]; S.sel = -1; S.savedAt = 0; S.photoMissing = false;
      S.sample = "home";
      return false;
    }
  }

  function savedLine(msg) {
    var el = root.querySelector("[data-savedline]");
    var btn = root.querySelector("[data-forget]");
    if (!el || !btn) return;
    if (msg) { el.hidden = false; el.textContent = msg; btn.hidden = true; return; }
    if (!S.savedAt) { el.hidden = true; el.textContent = ""; btn.hidden = true; return; }
    var when = "";
    try {
      when = new Date(S.savedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch (e) { when = ""; }
    el.hidden = false;
    el.textContent = "Saved in this browser" + (when ? " at " + when : "") +
      " \u2014 close the tab and the design is still here. It is kept on this device only, never sent to Piets." +
      (S.photoMissing ? " Your photo is not kept, so re-upload it to see this design on it."
        : (SAMPLES[S.sample] ? " Drawn on the " + SAMPLES[S.sample].nm.toLowerCase() + "." : ""));
    btn.hidden = false;
  }

  /* ---------------- canvas ---------------- */
  var cv, ctx, rect = { x: 0, y: 0, w: 1, h: 1 }, t0 = Date.now();

  function fit() {
    if (!cv) return;
    var wrapW = cv.parentElement.clientWidth || 800;
    var h = Math.round(wrapW * 0.625);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.style.width = wrapW + "px";
    cv.style.height = h + "px";
    cv.width = Math.round(wrapW * dpr);
    cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (S.img) {
      var ir = S.img.width / S.img.height, cr = wrapW / h, w, hh;
      if (ir > cr) { hh = h; w = h * ir; } else { w = wrapW; hh = wrapW / ir; }
      rect = { x: (wrapW - w) / 2, y: (h - hh) / 2, w: w, h: hh };
    } else {
      rect = { x: 0, y: 0, w: wrapW, h: h };
    }
    draw();
  }

  function toPx(p) { return { x: rect.x + p.x * rect.w, y: rect.y + p.y * rect.h }; }
  function toNorm(x, y) { return { x: (x - rect.x) / rect.w, y: (y - rect.y) / rect.h }; }

  function draw() {
    if (!ctx) return;
    var W = cv.clientWidth, H = cv.clientHeight;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#070D1C";
    ctx.fillRect(0, 0, W, H);
    if (S.img) { try { ctx.drawImage(S.img, rect.x, rect.y, rect.w, rect.h); } catch (e) { } }

    if (S.mode === "cam") drawCams(); else drawLights();
    if (S.kb) drawCursor();
    drawStamp(W, H);
  }

  /* the keyboard crosshair — only on screen while the picture is being driven
     from the keyboard, so it never shows up in a mouse user's download */
  function drawCursor() {
    var p = toPx({ x: S.kx, y: S.ky });
    var r = 15;
    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(5,10,31,.75)";
    ctx.beginPath();
    ctx.moveTo(p.x - r, p.y); ctx.lineTo(p.x + r, p.y);
    ctx.moveTo(p.x, p.y - r); ctx.lineTo(p.x, p.y + r);
    ctx.stroke();
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = "#02D7F5";
    ctx.beginPath();
    ctx.moveTo(p.x - r, p.y); ctx.lineTo(p.x + r, p.y);
    ctx.moveTo(p.x, p.y - r); ctx.lineTo(p.x, p.y + r);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6.5, 0, 6.2832);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  function drawStamp(W, H) {
    ctx.save();
    ctx.font = "600 11px Inter, sans-serif";
    var label = "PIETS TECHNOLOGY SOLUTIONS · 631-871-5957 · pietstechsolutions.com";
    var w = ctx.measureText(label).width;
    ctx.fillStyle = "rgba(5,10,31,.62)";
    ctx.fillRect(8, H - 28, w + 20, 20);
    ctx.fillStyle = "rgba(226,238,255,.85)";
    ctx.fillText(label, 18, H - 14);
    ctx.restore();
  }

  function drawCams() {
    S.cams.forEach(function (c, i) {
      var p = toPx(c), len = Math.max(rect.w, rect.h) * 0.30;
      var half = (c.fov * Math.PI / 180) / 2;
      var a = c.aim;

      /* field of view cone — kept light so the building stays readable underneath */
      var g = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, len);
      g.addColorStop(0, "rgba(2,215,245,.26)");
      g.addColorStop(.55, "rgba(2,215,245,.10)");
      g.addColorStop(1, "rgba(2,215,245,0)");
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, len, a - half, a + half);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = i === S.sel ? "rgba(167,139,250,.9)" : "rgba(2,215,245,.38)";
      ctx.lineWidth = i === S.sel ? 2 : 1.2;
      ctx.stroke();

      /* body */
      ctx.beginPath();
      ctx.arc(p.x, p.y, 13, 0, 6.2832);
      ctx.fillStyle = i === S.sel ? "#7A3DFF" : "#011F5D";
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#02D7F5";
      ctx.stroke();

      /* lens direction nub */
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + Math.cos(a) * 20, p.y + Math.sin(a) * 20);
      ctx.strokeStyle = "#02D7F5";
      ctx.lineWidth = 3;
      ctx.stroke();

      /* label */
      ctx.font = "700 11px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#061024";
      var tag = "CAM " + (i + 1);
      var tw = ctx.measureText(tag).width;
      ctx.fillStyle = "rgba(2,215,245,.95)";
      roundRect(p.x - tw / 2 - 7, p.y - 32, tw + 14, 17, 8);
      ctx.fill();
      ctx.fillStyle = "#04121F";
      ctx.fillText(tag, p.x - tw / 2, p.y - 20);

      /* aim handle on the selected camera */
      if (i === S.sel) {
        var hx = p.x + Math.cos(a) * len * 0.72, hy = p.y + Math.sin(a) * len * 0.72;
        ctx.beginPath();
        ctx.arc(hx, hy, 9, 0, 6.2832);
        ctx.fillStyle = "#B08CFF";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawLights() {
    var cols = STYLES[S.style].cols;
    var phase = (!RM && S.chase) ? ((Date.now() - t0) / 420) : 0;
    var n = 0;

    S.runs.forEach(function (run) {
      if (run.length < 2) {
        run.forEach(function (pt) {
          var p = toPx(pt);
          ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, 6.2832);
          ctx.fillStyle = "rgba(255,255,255,.8)"; ctx.fill();
        });
        return;
      }
      /* the track */
      ctx.beginPath();
      run.forEach(function (pt, i) {
        var p = toPx(pt);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = "rgba(10,16,32,.85)";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      /* bulbs evenly spaced along the path */
      var segs = [], total = 0, i;
      for (i = 1; i < run.length; i++) {
        var a = toPx(run[i - 1]), b = toPx(run[i]);
        var d = Math.hypot(b.x - a.x, b.y - a.y);
        segs.push({ a: a, b: b, d: d });
        total += d;
      }
      var step = Math.max(10, S.spacing);
      var count = Math.floor(total / step);
      for (i = 0; i <= count; i++) {
        var want = i * step, acc = 0, s, pos = null;
        for (var j = 0; j < segs.length; j++) {
          s = segs[j];
          if (acc + s.d >= want) {
            var f = s.d ? (want - acc) / s.d : 0;
            pos = { x: s.a.x + (s.b.x - s.a.x) * f, y: s.a.y + (s.b.y - s.a.y) * f };
            break;
          }
          acc += s.d;
        }
        if (!pos) continue;
        var col = cols[(n + i) % cols.length];
        var lit = 1;
        if (!RM && S.chase) {
          var k = (i - phase) % 4;
          if (k < 0) k += 4;
          lit = k < 1.6 ? 1 : 0.22;
        }
        bulb(pos.x, pos.y, col, lit);
      }
      n += count;
    });
  }

  function bulb(x, y, col, lit) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, 16);
    g.addColorStop(0, hexA(col, 0.85 * lit));
    g.addColorStop(.35, hexA(col, 0.32 * lit));
    g.addColorStop(1, hexA(col, 0));
    ctx.beginPath(); ctx.arc(x, y, 16, 0, 6.2832); ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 6.2832);
    ctx.fillStyle = lit > .5 ? "#fff" : hexA(col, .5); ctx.fill();
  }

  function hexA(hex, a) {
    var h = hex.replace("#", "");
    var r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  /* ---------------- interaction ---------------- */
  function hitCam(x, y) {
    for (var i = S.cams.length - 1; i >= 0; i--) {
      var p = toPx(S.cams[i]);
      if (Math.hypot(x - p.x, y - p.y) < 20) return i;
    }
    return -1;
  }
  function hitHandle(x, y) {
    if (S.sel < 0 || !S.cams[S.sel]) return false;
    var c = S.cams[S.sel], p = toPx(c), len = Math.max(rect.w, rect.h) * 0.30;
    var hx = p.x + Math.cos(c.aim) * len * 0.72, hy = p.y + Math.sin(c.aim) * len * 0.72;
    return Math.hypot(x - hx, y - hy) < 18;
  }

  function onDown(e) {
    if (S.kb) { S.kb = false; }
    var b = cv.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - b.left;
    var y = (e.touches ? e.touches[0].clientY : e.clientY) - b.top;

    if (S.mode === "cam") {
      if (hitHandle(x, y)) { S.drag = { kind: "aim" }; return; }
      var i = hitCam(x, y);
      if (i >= 0) { S.sel = i; S.drag = { kind: "move", i: i }; draw(); panel(); return; }
      var np = toNorm(x, y);
      /* default aim: down and outward, the way a corner camera actually sits */
      var out = np.x < 0.5 ? -1 : 1;
      S.cams.push({ x: np.x, y: np.y, aim: Math.atan2(0.85, out * 0.75), fov: 90, type: "Turret" });
      S.sel = S.cams.length - 1;
      draw(); panel(); saveSoon();
    } else {
      var p2 = toNorm(x, y);
      S.runs[S.runs.length - 1].push(p2);
      draw(); panel(); saveSoon();
    }
  }

  function onMove(e) {
    if (!S.drag) return;
    if (e.cancelable) e.preventDefault();
    var b = cv.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - b.left;
    var y = (e.touches ? e.touches[0].clientY : e.clientY) - b.top;
    var c = S.cams[S.sel];
    if (!c) return;
    if (S.drag.kind === "move") {
      var np = toNorm(x, y); c.x = np.x; c.y = np.y;
    } else {
      var p = toPx(c);
      c.aim = Math.atan2(y - p.y, x - p.x);
    }
    draw();
  }

  function onUp() {
    if (S.drag) saveSoon();
    S.drag = null;
  }

  /* ---------------- keyboard driving ----------------
     Everything the mouse can do on the picture has a key: the arrows move a
     crosshair, Enter places or picks, G moves the selected camera to the
     crosshair, the comma and full stop keys aim it, Delete takes it back. */
  function say(msg) {
    var el = root.querySelector("[data-stsay]");
    if (el) el.textContent = msg;
  }

  function nearestCam() {
    var best = -1, bd = 1e9;
    S.cams.forEach(function (c, i) {
      var d = Math.hypot(c.x - S.kx, c.y - S.ky);
      if (d < bd) { bd = d; best = i; }
    });
    return { i: best, d: bd };
  }

  function deg(a) { return Math.round(((a * 180 / Math.PI) + 450) % 360); }

  function onKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var k = e.key, step = e.shiftKey ? 0.005 : 0.025, used = true, c;

    if (k === "ArrowLeft" || k === "ArrowRight" || k === "ArrowUp" || k === "ArrowDown") {
      S.kb = true;
      if (k === "ArrowLeft") S.kx -= step;
      if (k === "ArrowRight") S.kx += step;
      if (k === "ArrowUp") S.ky -= step;
      if (k === "ArrowDown") S.ky += step;
      S.kx = Math.max(0, Math.min(1, S.kx));
      S.ky = Math.max(0, Math.min(1, S.ky));
      draw();
      say("Crosshair at " + Math.round(S.kx * 100) + " across, " + Math.round(S.ky * 100) + " down.");
    } else if (k === "Enter" || k === " " || k === "Spacebar") {
      S.kb = true;
      if (S.mode === "cam") {
        var near = nearestCam();
        if (near.i >= 0 && near.d < 0.035) {
          S.sel = near.i;
          c = S.cams[S.sel];
          say("Camera " + (S.sel + 1) + " selected. " + c.type + ", " + c.fov + " degree coverage.");
        } else {
          var out = S.kx < 0.5 ? -1 : 1;
          S.cams.push({ x: S.kx, y: S.ky, aim: Math.atan2(0.85, out * 0.75), fov: 90, type: "Turret" });
          S.sel = S.cams.length - 1;
          say("Camera " + S.cams.length + " placed. " + S.cams.length + " on the picture.");
          saveSoon();
        }
      } else {
        S.runs[S.runs.length - 1].push({ x: S.kx, y: S.ky });
        var n = S.runs[S.runs.length - 1].length;
        say("Point " + n + " added to this run.");
        saveSoon();
      }
      draw(); panel();
    } else if ((k === "g" || k === "G") && S.mode === "cam") {
      c = S.cams[S.sel];
      if (!c) { say("Pick a camera first — press Enter on one."); }
      else {
        S.kb = true;
        c.x = S.kx; c.y = S.ky;
        say("Camera " + (S.sel + 1) + " moved to the crosshair.");
        draw(); saveSoon();
      }
    } else if ((k === "," || k === "<" || k === "." || k === ">") && S.mode === "cam") {
      c = S.cams[S.sel];
      if (!c) { say("Pick a camera first — press Enter on one."); }
      else {
        S.kb = true;
        c.aim += (k === "," || k === "<") ? -0.1047 : 0.1047;   /* six degrees a press */
        say("Camera " + (S.sel + 1) + " aimed at " + deg(c.aim) + " degrees.");
        draw(); saveSoon();
      }
    } else if (k === "Delete" || k === "Backspace") {
      S.kb = true;
      if (S.mode === "cam") {
        if (S.sel >= 0 && S.cams[S.sel]) {
          var was = S.sel + 1;
          S.cams.splice(S.sel, 1);
          S.sel = S.cams.length - 1;
          say("Camera " + was + " removed. " + S.cams.length + " left.");
        } else { say("No camera selected."); }
      } else {
        var last = S.runs[S.runs.length - 1];
        if (last.length) { last.pop(); say("Last point undone."); }
        else if (S.runs.length > 1) { S.runs.pop(); say("Empty run removed."); }
        else { say("Nothing to undo."); }
      }
      draw(); panel(); saveSoon();
    } else {
      used = false;
    }

    if (used) e.preventDefault();
  }

  /* ---------------- control panel ---------------- */
  function panel() {
    var el = root.querySelector("[data-panel]");
    if (!el) return;
    var h = "";

    if (S.mode === "cam") {
      h += '<h4>Camera positions</h4><p class="sub">Tap the picture to drop a camera. Drag it to move it, ' +
        'drag the purple dot to aim it. No mouse? Tab to the picture and use the arrow keys and Enter &mdash; ' +
        'the full key list sits under it.</p>';
      h += '<div class="mk" style="grid-template-columns:repeat(2,1fr)">' +
        '<div><b>' + S.cams.length + '</b><span>Cameras placed</span></div>' +
        '<div class="pur"><b>' + (S.cams.length ? S.cams[Math.max(0, S.sel)].fov + '&deg;' : '&mdash;') +
        '</b><span>Selected coverage</span></div></div>';

      if (S.sel >= 0 && S.cams[S.sel]) {
        var c = S.cams[S.sel];
        h += '<p class="note" style="margin:14px 0 8px;color:#CDB4FF">Editing CAM ' + (S.sel + 1) + '</p>';
        h += '<div class="calcf"><div class="f"><label>Coverage angle</label><div class="mseg">';
        FOVS.forEach(function (f) {
          h += '<button type="button" data-fov="' + f[1] + '" aria-pressed="' + (c.fov === f[1]) + '">' +
            f[0] + ' &middot; ' + f[1] + '&deg;</button>';
        });
        h += '</div></div><div class="f"><label>Housing</label><div class="mseg">';
        ["Turret", "Bullet", "Dome"].forEach(function (t) {
          h += '<button type="button" data-type="' + t + '" aria-pressed="' + (c.type === t) + '">' + t + '</button>';
        });
        h += '</div></div></div>';
        h += '<div class="macts"><button type="button" class="mbtn g" data-delcam>Remove CAM ' + (S.sel + 1) + '</button></div>';
      }

      if (S.cams.length) {
        h += '<div class="mrows" style="margin-top:16px">';
        S.cams.forEach(function (c2, i) {
          h += '<div class="r"><b>CAM ' + (i + 1) + '</b><span class="m">' + c2.type + '</span>' +
            '<span class="tail"><span class="mtag cy">' + c2.fov + '&deg;</span>' +
            '<button type="button" class="mbtn g" style="padding:4px 11px;font-size:.74rem" data-pick="' + i + '">Edit</button>' +
            '</span></div>';
        });
        h += '</div>';
        h += '<p class="note">Approximate views only. Final positions are confirmed on the walk-through &mdash; ' +
          'soffit height, overhang and where the power and cable can actually run decide the last few inches.</p>';
      }
    } else {
      h += '<h4>Lighting design</h4><p class="sub">Tap along the roofline, the fascia or a railing. Each tap ' +
        'adds a point and the run lights up between them. No mouse? Tab to the picture, walk the crosshair ' +
        'with the arrow keys and press Enter at each corner.</p>';
      h += '<div class="calcf"><div class="f"><label>Colour</label><div class="mseg">';
      Object.keys(STYLES).forEach(function (k) {
        h += '<button type="button" data-style="' + k + '" aria-pressed="' + (S.style === k) + '">' +
          STYLES[k].nm + '</button>';
      });
      h += '</div></div>';
      h += '<div class="f"><label for="stSpace">Bulb spacing</label>' +
        '<input type="range" id="stSpace" min="12" max="54" step="2" value="' + S.spacing + '">' +
        '<span class="hint">Tighter spacing reads brighter from the street.</span></div>';
      h += '<div class="f"><label>Install type</label><div class="mseg">' +
        '<button type="button" data-perm="1" aria-pressed="' + (S.perm === true) + '">Permanent &middot; year-round</button>' +
        '<button type="button" data-perm="0" aria-pressed="' + (S.perm === false) + '">Seasonal install</button>' +
        '</div></div></div>';
      h += '<label class="pos__sw" style="margin-top:14px"><input type="checkbox" data-chase' +
        (S.chase ? " checked" : "") + '><span class="tr"></span> Animate a chase effect</label>';
      if (RM) h += '<p class="note">Your device asks for reduced motion, so the chase stays still here.</p>';

      var pts = S.runs.reduce(function (a, r) { return a + r.length; }, 0);
      h += '<div class="mk" style="grid-template-columns:repeat(2,1fr);margin-top:16px">' +
        '<div><b>' + S.runs.filter(function (r) { return r.length > 1; }).length + '</b><span>Runs drawn</span></div>' +
        '<div class="pur"><b>' + pts + '</b><span>Points set</span></div></div>';
      h += '<div class="macts"><button type="button" class="mbtn g" data-newrun>Start another run</button>' +
        '<button type="button" class="mbtn g" data-undo>Undo last point</button></div>';
      h += '<p class="note">' + (S.perm
        ? 'Permanent track is mounted once under the fascia and stays up all year &mdash; you change the colour ' +
          'from your phone for every holiday, or run a soft warm white the rest of the time.'
        : 'Seasonal installs go up in November and come down in January. Storage between seasons is part of it.') +
        '</p>';
    }
    el.innerHTML = h;
  }

  /* ---------------- tabs: the ARIA tabs/tabpanel pair ---------------- */
  /* The mode strip announced role="tab" with nothing attached to it: no ids, no
     aria-controls, no role="tabpanel" on the body it actually switches, and both
     tabs in the page's tab order. Same wiring as pos.js, drive.js and fleet.js.
     The shared accessibility layer (assets/money/a11y.js) gives every
     role="tablist" in these demos arrow keys, Home and End, so the strip carries
     a roving tabindex as the ARIA tabs pattern wants: one tab stop for the strip,
     and the arrows move between the tabs. If that file is missing for any reason,
     the fallback handler below takes the arrow keys instead, so the other tab is
     never stranded out of reach of the keyboard. */
  var PANEL_ID = "stPanel";
  function modeKey() { return S.mode === "light" ? "light" : "cam"; }
  function tabId(k) { return "stTab-" + k; }
  function tabAttrs(k) {
    var on = k === modeKey();
    return ' role="tab" id="' + tabId(k) + '" aria-controls="' + PANEL_ID + '"' +
      ' aria-selected="' + (on ? "true" : "false") + '" tabindex="' + (on ? "0" : "-1") + '"';
  }
  /* keeps aria-selected, the roving tabindex and the panel's label in step */
  function markModes() {
    var cur = modeKey();
    root.querySelectorAll("[data-mode]").forEach(function (b) {
      var on = b.getAttribute("data-mode") === cur;
      b.setAttribute("aria-selected", String(on));
      b.setAttribute("tabindex", on ? "0" : "-1");
    });
    var panel = document.getElementById(PANEL_ID);
    if (panel) panel.setAttribute("aria-labelledby", tabId(cur));
  }
  function a11yOn() { return root.getAttribute("data-a11y") === "on"; }

  /* ---------------- shell ---------------- */
  function shell() {
    root.innerHTML =
      '<div class="mcon">' +
        '<div class="mcon__bar"><span class="mcon__lg"><i></i></span><b>Piets Design Studio</b>' +
          '<span class="mcon__demo">Demo</span>' +
          '<span class="mcon__live">Runs on your device</span></div>' +
        '<div class="mcon__tabs" role="tablist" aria-label="Design mode">' +
          '<button type="button" data-mode="cam"' + tabAttrs("cam") + '>Security cameras</button>' +
          '<button type="button" data-mode="light"' + tabAttrs("light") + '>Holiday &amp; permanent lighting</button>' +
        '</div>' +
        '<div class="mcon__body" id="' + PANEL_ID + '" role="tabpanel" aria-labelledby="' + tabId(modeKey()) + '">' +
          '<div class="studio">' +
            '<div class="studio__stage">' +
              '<div class="studio__cv"><canvas id="stCanvas" tabindex="0" role="application" ' +
                'aria-describedby="stKeys" aria-label="Design canvas — place cameras or trace a lighting run">' +
                '</canvas></div>' +
              '<p class="studio__keys" id="stKeys">Mouse or touch: tap the picture. ' +
                '<b>Keyboard:</b> the picture takes focus with Tab &mdash; then arrow keys move the crosshair ' +
                '(hold Shift for fine steps), <kbd>Enter</kbd> places a camera or a lighting point (or picks ' +
                'the camera under the crosshair), <kbd>G</kbd> moves the picked camera to the crosshair, ' +
                '<kbd>,</kbd> and <kbd>.</kbd> aim it, <kbd>Delete</kbd> takes the last thing back.</p>' +
              '<p class="sr-only" role="status" aria-live="polite" data-stsay></p>' +
              '<div class="studio__tools">' +
                '<label class="mbtn g" style="cursor:pointer">Upload a photo' +
                  '<input type="file" accept="image/*" data-file class="studio__file"></label>' +
                '<span class="studio__samples" role="group" aria-label="Sample property">' +
                  '<button type="button" class="mbtn g" data-sample="home" aria-pressed="true">Sample home</button>' +
                  '<button type="button" class="mbtn g" data-sample="shop" aria-pressed="false">Sample storefront</button>' +
                '</span>' +
                '<button type="button" class="mbtn g" data-undo2>Undo</button>' +
                '<button type="button" class="mbtn g" data-clear>Clear</button>' +
                '<button type="button" class="mbtn" data-save>Download the design</button>' +
                '<button type="button" class="mbtn g" data-forget hidden>Clear saved design</button>' +
              '</div>' +
              '<p class="note" data-fname>Sample home &middot; your own photo never leaves this device.</p>' +
              '<p class="note" data-savedline hidden></p>' +
            '</div>' +
            '<div class="studio__side" data-panel></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    cv = document.getElementById("stCanvas");
    ctx = cv.getContext("2d");

    cv.addEventListener("mousedown", onDown);
    cv.addEventListener("touchstart", onDown, { passive: true });
    cv.addEventListener("keydown", onKey);
    cv.addEventListener("focus", function () { S.kb = true; draw(); });
    cv.addEventListener("blur", function () { S.kb = false; draw(); });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("resize", fit, { passive: true });

    restore();
    markModes();
    loadSample(S.sample);
    panel();
    savedLine();
  }

  function loadSample(k) {
    if (!SAMPLES[k]) k = SAMPLES[S.sample] ? S.sample : "home";
    S.sample = k;
    S.usingPhoto = false;
    markSamples();
    var im = new Image();
    im.onload = function () { S.img = im; S.imgName = SAMPLES[k].nm; stamp(); fit(); };
    im.onerror = function () { S.img = null; S.imgName = SAMPLES[k].nm; stamp(); fit(); };
    im.src = sampleUrl(k);
  }

  function markSamples() {
    root.querySelectorAll("[data-sample]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-sample") === S.sample));
    });
  }

  function stamp() {
    var f = root.querySelector("[data-fname]");
    if (!f) return;
    var hint = (!S.usingPhoto && SAMPLES[S.sample]) ? " " + SAMPLES[S.sample].hint : "";
    f.textContent = S.imgName + hint + " · your own photo never leaves this device.";
  }

  root.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-mode],[data-sample],[data-clear],[data-undo2],[data-save],[data-fov],[data-type],[data-delcam],[data-pick],[data-style],[data-perm],[data-newrun],[data-undo],[data-forget]") : null;
    if (!el || !root.contains(el)) return;

    if (el.hasAttribute("data-forget")) {
      if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
      lsDel();
      S.savedAt = 0; S.photoMissing = false;
      savedLine("Saved design cleared from this browser. What is on screen stays until you change it.");
      return;
    }

    if (el.hasAttribute("data-mode")) {
      S.mode = el.getAttribute("data-mode") === "light" ? "light" : "cam";
      markModes();
      draw(); panel(); return;
    }
    if (el.hasAttribute("data-sample")) {
      var want = el.getAttribute("data-sample");
      if (S.sample !== want) { S.cams = []; S.runs = [[]]; S.sel = -1; }
      loadSample(want);
      panel();
      return;
    }
    if (el.hasAttribute("data-clear")) {
      if (S.mode === "cam") { S.cams = []; S.sel = -1; } else { S.runs = [[]]; }
      draw(); panel(); return;
    }
    if (el.hasAttribute("data-undo2") || el.hasAttribute("data-undo")) {
      if (S.mode === "cam") { S.cams.pop(); S.sel = S.cams.length - 1; }
      else {
        var last = S.runs[S.runs.length - 1];
        if (last.length) last.pop();
        else if (S.runs.length > 1) S.runs.pop();
      }
      draw(); panel(); return;
    }
    if (el.hasAttribute("data-save")) { save(); return; }
    if (el.hasAttribute("data-fov")) { if (S.cams[S.sel]) S.cams[S.sel].fov = +el.getAttribute("data-fov"); draw(); panel(); return; }
    if (el.hasAttribute("data-type")) { if (S.cams[S.sel]) S.cams[S.sel].type = el.getAttribute("data-type"); draw(); panel(); return; }
    if (el.hasAttribute("data-delcam")) { S.cams.splice(S.sel, 1); S.sel = S.cams.length - 1; draw(); panel(); return; }
    if (el.hasAttribute("data-pick")) { S.sel = +el.getAttribute("data-pick"); draw(); panel(); return; }
    if (el.hasAttribute("data-style")) { S.style = el.getAttribute("data-style"); draw(); panel(); return; }
    if (el.hasAttribute("data-perm")) { S.perm = el.getAttribute("data-perm") === "1"; panel(); return; }
    if (el.hasAttribute("data-newrun")) { if (S.runs[S.runs.length - 1].length) S.runs.push([]); panel(); return; }
  });

  root.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-mode],[data-sample],[data-clear],[data-undo2],[data-fov],[data-type],[data-delcam],[data-style],[data-perm],[data-newrun],[data-undo]") : null;
    if (!el || !root.contains(el)) return;
    if (el.hasAttribute("data-sample")) S.photoMissing = false;
    saveSoon();
  });

  /* Arrow keys on the mode strip. The shared a11y layer does this for every demo,
     so this only runs if that file did not load — otherwise a key press would
     move twice. */
  root.addEventListener("keydown", function (e) {
    if (a11yOn() || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (!t || !t.closest) return;
    var tab = t.closest('[role="tab"]');
    var list = tab ? tab.closest('[role="tablist"]') : null;
    if (!list || !root.contains(list)) return;
    var all = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var i = all.indexOf(tab), n = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % all.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + all.length) % all.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = all.length - 1;
    else return;
    e.preventDefault();
    all[n].click();
    var want = all[n].getAttribute("id");
    var back = want ? root.querySelector('[id="' + want + '"]') : null;
    if (back) { try { back.focus({ preventScroll: true }); } catch (err) { back.focus(); } }
  });

  root.addEventListener("change", function (e) {
    var t = e.target;
    if (!t) return;
    if (t.hasAttribute("data-file") && t.files && t.files[0]) {
      var file = t.files[0];
      var fr = new FileReader();
      fr.onload = function () {
        var im = new Image();
        im.onload = function () {
          S.img = im;
          S.imgName = file.name.length > 36 ? file.name.slice(0, 33) + "…" : file.name;
          S.cams = []; S.runs = [[]]; S.sel = -1;
          S.photoMissing = false;
          S.usingPhoto = true;
          stamp(); fit(); panel(); saveSoon();
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
      return;
    }
    if (t.hasAttribute("data-chase")) { S.chase = !!t.checked; panel(); saveSoon(); return; }
  });

  root.addEventListener("input", function (e) {
    if (e.target && e.target.id === "stSpace") { S.spacing = +e.target.value; draw(); saveSoon(); }
  });

  function save() {
    try {
      var url = cv.toDataURL("image/png");
      var a = document.createElement("a");
      a.href = url;
      a.download = "piets-design-" + (S.mode === "cam" ? "cameras" : "lighting") + ".png";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (err) {
      alert("This browser blocked the download. Screenshot the design instead, or call 631-871-5957 and we will build it with you.");
    }
  }

  /* chase animation */
  function loop() {
    if (!RM && S.mode === "light" && S.chase) draw();
    requestAnimationFrame(loop);
  }

  try {
    shell();
    requestAnimationFrame(loop);
  } catch (err) {
    root.innerHTML = '<p class="note">The design studio could not start in this browser. ' +
      'Call 631-871-5957 and we will design it with you over a video call.</p>';
  }
})();
