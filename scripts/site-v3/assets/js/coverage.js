/* Piets — Camera Coverage Planner (coverage.html).
   Roadmap item 21 (the owner, Oct 10 2026): "can you make the coverage planner in more
   same thing like the lighting and the cameras." So this file now draws the plan on
   a canvas with the same dusk-and-glow treatment, the same console shell (.mcon),
   the same canvas-as-a-control keyboard handling and the same focus rings as the
   Design Studio and the lighting canvas, on palette B only — navy #011F5D,
   navy-purple #1B0B55, cyan #02D7F5, blue #016FD6, purple accent #7A3DFF.

   What it computes is unchanged from the old SVG version: the same three lens
   shapes, the same four floor plans, and the same rough-coverage figure sampled on
   a 20-unit grid inside the shell. It draws and counts what the visitor places —
   there is no average, no benchmark and no invented figure anywhere in here, and
   nothing is a quote.

   It also updates in place rather than repainting its own markup, so a keyboard
   user's focus is never thrown back up the page. That is why this page does not
   need assets/money/a11y.js: there is no repaint to recover from, the live line
   below the plan is permanent, and the tab strip carries its own arrow keys.

   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";

  var root = document.getElementById("cov-app");
  if (!root) return;

  var W = 1000, H = 700;

  /* ---- the three lens shapes · unchanged from the old planner ---- */
  var LENSES = {
    wide: { label: "Wide", fov: 110, range: 190, short: "wide" },
    standard: { label: "Standard", fov: 80, range: 280, short: "std" },
    long: { label: "Long", fov: 40, range: 430, short: "long" }
  };
  var LENS_ORDER = ["wide", "standard", "long"];

  /* ---- the four sample spaces · unchanged room rectangles ---- */
  var PLANS = {
    house: {
      label: "House", kind: "Sample home", shell: [80, 70, 840, 560], rooms: [
        [80, 70, 300, 250, "Living room"], [380, 70, 250, 250, "Kitchen"], [630, 70, 290, 250, "Garage"],
        [80, 320, 240, 310, "Bedroom"], [320, 320, 260, 310, "Hall & entry"], [580, 320, 340, 310, "Backyard side"]]
    },
    storefront: {
      label: "Storefront / Restaurant", kind: "Sample cafe", shell: [80, 70, 840, 560], rooms: [
        [80, 70, 560, 360, "Dining / sales floor"], [640, 70, 280, 220, "Register"], [640, 290, 280, 140, "Office"],
        [80, 430, 420, 200, "Kitchen / stock"], [500, 430, 420, 200, "Back door & alley"]]
    },
    office: {
      label: "Office", kind: "Sample office", shell: [80, 70, 840, 560], rooms: [
        [80, 70, 260, 200, "Reception"], [340, 70, 580, 200, "Open office"], [80, 270, 260, 360, "Conference"],
        [340, 270, 300, 360, "Hallway"], [640, 270, 280, 180, "Server / IT"], [640, 450, 280, 180, "Storage"]]
    },
    warehouse: {
      label: "Warehouse", kind: "Sample warehouse", shell: [60, 60, 880, 580], rooms: [
        [60, 60, 640, 420, "Racking & floor"], [700, 60, 240, 240, "Office"], [700, 300, 240, 180, "Shipping"],
        [60, 480, 880, 160, "Loading dock & yard"]]
    }
  };
  var PLAN_ORDER = ["house", "storefront", "office", "warehouse"];

  var PANEL_ID = "covPanel";
  var reduce = false;
  try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { reduce = false; }

  var S = {
    plan: "house",
    lens: "wide",
    byPlan: { house: [], storefront: [], office: [], warehouse: [] },
    hist: { house: [], storefront: [], office: [], warehouse: [] },
    selected: -1,
    cx: 500, cy: 350,          /* the keyboard crosshair */
    kb: false,                 /* true only while the canvas holds keyboard focus */
    t: 0
  };
  function cams() { return S.byPlan[S.plan]; }
  function hist() { return S.hist[S.plan]; }
  function plan() { return PLANS[S.plan]; }

  var cv, ctx, live, elCams, elPct, elMix, elHint;

  /* ================= console shell ================= */
  /* The space strip is a real ARIA tabs/tabpanel pair, same wiring as pos.js,
     drive.js, fleet.js and studio.js: an id and aria-controls on every tab, one
     role="tabpanel" on the body they switch, aria-labelledby following the
     selection, and a roving tabindex so the strip is one tab stop. */
  function tabId(k) { return "covTab-" + k; }
  function tabAttrs(k) {
    var on = k === S.plan;
    return ' role="tab" id="' + tabId(k) + '" aria-controls="' + PANEL_ID + '"' +
      ' aria-selected="' + (on ? "true" : "false") + '" tabindex="' + (on ? "0" : "-1") + '"';
  }
  function markTabs() {
    root.querySelectorAll("[data-plan]").forEach(function (b) {
      var on = b.getAttribute("data-plan") === S.plan;
      b.setAttribute("aria-selected", String(on));
      b.setAttribute("tabindex", on ? "0" : "-1");
    });
    var p = document.getElementById(PANEL_ID);
    if (p) p.setAttribute("aria-labelledby", tabId(S.plan));
  }
  function markLenses() {
    root.querySelectorAll("[data-lens]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lens") === S.lens));
    });
  }

  function shell() {
    var tabs = PLAN_ORDER.map(function (k) {
      return '<button type="button" data-plan="' + k + '"' + tabAttrs(k) + '>' + esc(PLANS[k].label) + "</button>";
    }).join("");
    var lensBtns = LENS_ORDER.map(function (k) {
      return '<button type="button" data-lens="' + k + '" aria-pressed="' + (k === S.lens) + '">' +
        esc(LENSES[k].label) + "</button>";
    }).join("");

    root.innerHTML =
      '<div class="mcon">' +
        '<div class="mcon__bar"><span class="mcon__lg"><i></i></span><b>Piets Coverage Planner</b>' +
          '<span class="mcon__demo">Demo</span>' +
          '<span class="mcon__live">Runs on your device</span></div>' +
        '<div class="mcon__tabs" role="tablist" aria-label="Kind of space">' + tabs + '</div>' +
        '<div class="mcon__body" id="' + PANEL_ID + '" role="tabpanel" aria-labelledby="' + tabId(S.plan) + '">' +
          '<div class="studio">' +
            '<div class="studio__stage">' +
              '<div class="studio__cv cov__cv"><canvas id="covCanvas" tabindex="0" role="application" ' +
                'aria-describedby="covKeys" aria-label="Floor plan — place cameras and aim them"></canvas>' +
                '<span class="cov__badge" id="covBadge">Sample home</span></div>' +
              '<p class="studio__keys" id="covKeys">Mouse or touch: tap the plan to drop a camera, ' +
                'drag a camera to move it, drag its purple dot to aim it. ' +
                '<b>Keyboard:</b> the plan takes focus with Tab &mdash; then arrow keys move the crosshair ' +
                '(hold Shift for fine steps), <kbd>Enter</kbd> drops a camera (or picks the one under the ' +
                'crosshair), <kbd>G</kbd> moves the picked camera to the crosshair, <kbd>,</kbd> and ' +
                '<kbd>.</kbd> aim it, <kbd>Delete</kbd> takes the last one back.</p>' +
              '<p class="sr-only" role="status" aria-live="polite" id="covSay"></p>' +
              '<div class="studio__tools">' +
                '<button type="button" class="mbtn g" data-undo>Undo</button>' +
                '<button type="button" class="mbtn g" data-clear>Clear</button>' +
                '<button type="button" class="mbtn" data-send>Send my layout to Piets</button>' +
                '<a class="mbtn g" href="design-studio.html">See it on your own house</a>' +
              '</div>' +
              '<p class="note" id="covNote">A rough visual, not a survey. We confirm exact placement on a free ' +
                'walkthrough or video call &middot; 631-871-5957.</p>' +
            '</div>' +
            '<div class="studio__side">' +
              '<h4>Your layout</h4>' +
              '<p class="sub">Counted off the cameras you placed.</p>' +
              '<div class="mk cov__mk">' +
                '<div><b id="covCams">0</b><span>Cameras</span></div>' +
                '<div class="pur"><b id="covPct">0%</b><span>Rough coverage</span></div>' +
                '<div id="covMixCell"><b id="covMix">&mdash;</b><span>Lens mix</span></div>' +
              '</div>' +
              '<div class="calcf" style="margin-top:16px">' +
                '<div class="f"><label id="covLensLab">Lens for the next camera</label>' +
                  '<div class="mseg" role="group" aria-labelledby="covLensLab">' + lensBtns + '</div>' +
                  '<span class="hint">Wide takes in more side to side, long reaches further down a driveway. ' +
                  'Pick a camera on the plan first and the lens changes that one.</span></div>' +
              '</div>' +
              '<p class="note">Rough coverage is the share of this sample floor plan that falls inside the ' +
                'shapes you drew. It is arithmetic on your own layout &mdash; not a measurement, not a ' +
                'benchmark, and not a quote.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    cv = document.getElementById("covCanvas");
    ctx = cv.getContext("2d");
    live = document.getElementById("covSay");
    elCams = document.getElementById("covCams");
    elPct = document.getElementById("covPct");
    elMix = document.getElementById("covMix");
    elHint = document.getElementById("covBadge");

    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onUp);
    cv.addEventListener("keydown", onKey);
    cv.addEventListener("focus", function () { S.kb = true; draw(); });
    cv.addEventListener("blur", function () { S.kb = false; draw(); });

    root.addEventListener("click", onClick);
    root.addEventListener("keydown", onStripKey);

    window.addEventListener("resize", fit, { passive: true });
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ================= sizing ================= */
  var k = 1;                                   /* plan units per CSS pixel */
  function px(n) { return n * k; }              /* a pixel-sized thing, in plan units */
  function fit() {
    if (!cv) return;
    var box = cv.parentNode.getBoundingClientRect();
    var w = Math.max(240, box.width || 640);
    var h = Math.round(w * (H / W));
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.style.width = "100%";
    cv.style.height = h + "px";
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    k = W / w;
    draw();
  }

  /* ================= the numbers · unchanged arithmetic ================= */
  function coverage() {
    var p = plan().shell, sx = p[0], sy = p[1], sw = p[2], sh = p[3];
    var list = cams(), total = 0, hit = 0, x, y, i, c, L, dx, dy, d, diff, got;
    for (x = sx + 10; x < sx + sw; x += 20) {
      for (y = sy + 10; y < sy + sh; y += 20) {
        total++;
        got = false;
        for (i = 0; i < list.length && !got; i++) {
          c = list[i]; L = LENSES[c.lens];
          dx = x - c.x; dy = y - c.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d > L.range) continue;
          if (d < 1) { got = true; break; }
          diff = Math.atan2(dy, dx) * 180 / Math.PI - c.angle;
          diff = ((diff + 540) % 360) - 180;
          if (Math.abs(diff) <= L.fov / 2) got = true;
        }
        if (got) hit++;
      }
    }
    return total ? Math.round((hit / total) * 100) : 0;
  }

  function mix() {
    var m = { wide: 0, standard: 0, long: 0 };
    cams().forEach(function (c) { m[c.lens]++; });
    return m;
  }

  function stats() {
    var m = mix(), n = cams().length;
    if (elCams) elCams.textContent = String(n);
    if (elPct) elPct.textContent = coverage() + "%";
    if (elMix) elMix.innerHTML = n ? (m.wide + " wide &middot; " + m.standard + " std &middot; " + m.long + " long") : "&mdash;";
  }

  function summary() {
    var m = mix();
    return "COVERAGE PLANNER — Space: " + plan().label + " | Cameras: " + cams().length +
      " (wide " + m.wide + ", standard " + m.standard + ", long " + m.long + ")" +
      " | Rough coverage: " + coverage() + "%";
  }

  function say(msg) {
    if (!live) return;
    live.textContent = msg + " " + cams().length + " camera" + (cams().length === 1 ? "" : "s") +
      ", rough coverage " + coverage() + " percent.";
  }

  /* ================= drawing ================= */
  function sector(c) {
    var L = LENSES[c.lens], half = (L.fov / 2) * Math.PI / 180, a = c.angle * Math.PI / 180;
    return { a0: a - half, a1: a + half, r: L.range };
  }

  function draw() {
    if (!ctx) return;
    var s = cv.width / W;
    ctx.setTransform(s, 0, 0, s, 0, 0);
    ctx.clearRect(0, 0, W, H);

    /* --- dusk background, the same navy → navy-purple as the bands above --- */
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#071232");
    g.addColorStop(1, "#120A34");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    glow(W * 0.84, H * 0.1, W * 0.6, "rgba(122,61,255,.34)");
    glow(W * 0.08, H * 0.94, W * 0.5, "rgba(2,215,245,.16)");

    /* --- the grid the plan sits on --- */
    ctx.lineWidth = px(1);
    ctx.strokeStyle = "rgba(2,215,245,.055)";
    ctx.beginPath();
    for (var x = 0; x <= W; x += 25) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (var y = 0; y <= H; y += 25) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();

    var p = plan();

    /* --- rooms: a lit navy floor with a cyan edge --- */
    p.rooms.forEach(function (r) {
      ctx.fillStyle = "rgba(1,31,93,.55)";
      ctx.fillRect(r[0], r[1], r[2], r[3]);
      ctx.strokeStyle = "rgba(143,233,251,.3)";
      ctx.lineWidth = px(1.6);
      ctx.strokeRect(r[0] + px(0.8), r[1] + px(0.8), r[2] - px(1.6), r[3] - px(1.6));
      ctx.fillStyle = "rgba(199,216,240,.62)";
      ctx.font = "600 " + Math.max(px(10), 13) + "px Inter, system-ui, sans-serif";
      ctx.textAlign = "left"; ctx.textBaseline = "top";
      ctx.fillText(r[4], r[0] + px(10), r[1] + px(9));
    });

    /* --- the outer shell, drawn as a wall with a blue glow --- */
    var sh = p.shell;
    ctx.save();
    ctx.shadowColor = "rgba(1,111,214,.75)";
    ctx.shadowBlur = px(16);
    ctx.strokeStyle = "#016FD6";
    ctx.lineWidth = px(4.5);
    roundRect(sh[0], sh[1], sh[2], sh[3], px(6));
    ctx.stroke();
    ctx.restore();

    /* --- what each camera can see --- */
    var list = cams(), breathe = reduce ? 0 : Math.sin(S.t / 46) * 0.03;
    list.forEach(function (c, i) {
      var sel = i === S.selected, sc = sector(c);
      var rg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, sc.r);
      if (sel) {
        rg.addColorStop(0, "rgba(205,180,255," + (0.62 + breathe) + ")");
        rg.addColorStop(0.45, "rgba(122,61,255,.42)");
        rg.addColorStop(0.8, "rgba(122,61,255,.2)");
        rg.addColorStop(1, "rgba(122,61,255,0)");
      } else {
        rg.addColorStop(0, "rgba(2,215,245," + (0.55 + breathe) + ")");
        rg.addColorStop(0.45, "rgba(1,111,214,.4)");
        rg.addColorStop(0.8, "rgba(1,111,214,.19)");
        rg.addColorStop(1, "rgba(1,111,214,0)");
      }
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.arc(c.x, c.y, sc.r, sc.a0, sc.a1);
      ctx.closePath();
      /* a flat wash so the shaded area is unmistakable, then the hot spot on top */
      ctx.fillStyle = sel ? "rgba(122,61,255,.2)" : "rgba(2,215,245,.14)";
      ctx.fill();
      ctx.fillStyle = rg;
      ctx.fill();
      ctx.strokeStyle = sel ? "rgba(205,180,255,.9)" : "rgba(143,233,251,.72)";
      ctx.lineWidth = px(1.4);
      ctx.stroke();
    });

    /* --- the cameras themselves --- */
    list.forEach(function (c, i) {
      var sel = i === S.selected, a = c.angle * Math.PI / 180;
      var hd = Math.max(px(44), 34), hx = c.x + hd * Math.cos(a), hy = c.y + hd * Math.sin(a);
      ctx.save();
      ctx.setLineDash([px(5), px(5)]);
      ctx.strokeStyle = "rgba(255,255,255,.6)";
      ctx.lineWidth = px(1.6);
      ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(hx, hy); ctx.stroke();
      ctx.restore();

      /* the aim handle — purple, the same accent the Design Studio uses */
      dot(hx, hy, Math.max(px(8), 7), "#7A3DFF", "#E9DDFF");

      var r = Math.max(px(15), 13);
      ctx.save();
      ctx.shadowColor = sel ? "rgba(167,139,250,.95)" : "rgba(2,215,245,.85)";
      ctx.shadowBlur = px(14);
      var lg = ctx.createLinearGradient(c.x - r, c.y - r, c.x + r, c.y + r);
      lg.addColorStop(0, sel ? "#CDB4FF" : "#02D7F5");
      lg.addColorStop(1, sel ? "#7A3DFF" : "#016FD6");
      ctx.fillStyle = lg;
      ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.lineWidth = px(2.4);
      ctx.strokeStyle = "#fff";
      ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, Math.PI * 2); ctx.stroke();

      ctx.fillStyle = "#041024";
      ctx.font = "800 " + Math.max(px(15), 12) + "px Inter, system-ui, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(String(i + 1), c.x, c.y + px(0.5));
    });

    /* --- the keyboard crosshair, only while the plan holds keyboard focus --- */
    if (S.kb) {
      ctx.save();
      ctx.strokeStyle = "rgba(2,215,245,.9)";
      ctx.lineWidth = px(1.4);
      ctx.setLineDash([px(6), px(6)]);
      ctx.beginPath();
      ctx.moveTo(S.cx - px(22), S.cy); ctx.lineTo(S.cx + px(22), S.cy);
      ctx.moveTo(S.cx, S.cy - px(22)); ctx.lineTo(S.cx, S.cy + px(22));
      ctx.stroke();
      ctx.restore();
      ctx.strokeStyle = "rgba(205,180,255,.95)";
      ctx.lineWidth = px(1.6);
      ctx.beginPath(); ctx.arc(S.cx, S.cy, px(9), 0, Math.PI * 2); ctx.stroke();
    }

    /* --- the only text on an empty plan --- */
    if (!list.length) {
      var pulse = reduce ? 0.8 : 0.7 + Math.sin(S.t / 30) * 0.18;
      ctx.fillStyle = "rgba(226,238,255," + pulse.toFixed(2) + ")";
      ctx.font = "700 " + Math.max(px(21), 15) + "px Inter, system-ui, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("Tap the plan to drop a camera", W / 2, H / 2 + px(28));
    }
  }

  function glow(cx, cy, r, color) {
    var rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    rg.addColorStop(0, color);
    rg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);
  }
  function dot(x, y, r, fill, ring) {
    ctx.fillStyle = fill;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = px(2);
    ctx.strokeStyle = ring;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
  }
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* a single slow loop, only so the cones breathe and the empty-plan line fades;
     it does not run at all when the visitor asked for reduced motion */
  function tick() {
    S.t++;
    draw();
    window.requestAnimationFrame(tick);
  }

  /* ================= history ================= */
  function snapshot() {
    var h = hist();
    h.push(JSON.stringify(cams()));
    if (h.length > 50) h.shift();
  }

  /* ================= pointer ================= */
  function toPlan(e) {
    var b = cv.getBoundingClientRect();
    var x = (e.clientX - b.left) / (b.width || 1) * W;
    var y = (e.clientY - b.top) / (b.height || 1) * H;
    return { x: Math.max(0, Math.min(W, x)), y: Math.max(0, Math.min(H, y)) };
  }
  function hitCam(p) {
    var list = cams(), r = Math.max(px(20), 18), i, c, d;
    for (i = list.length - 1; i >= 0; i--) {
      c = list[i];
      d = Math.hypot(p.x - c.x, p.y - c.y);
      if (d <= r) return { i: i, mode: "move" };
    }
    for (i = list.length - 1; i >= 0; i--) {
      c = list[i];
      var a = c.angle * Math.PI / 180, hd = Math.max(px(44), 34);
      d = Math.hypot(p.x - (c.x + hd * Math.cos(a)), p.y - (c.y + hd * Math.sin(a)));
      if (d <= Math.max(px(16), 14)) return { i: i, mode: "aim" };
    }
    return null;
  }

  var drag = null;
  function onDown(e) {
    var p = toPlan(e), h = hitCam(p);
    if (h) {
      snapshot();
      S.selected = h.i;
      drag = { i: h.i, mode: h.mode, moved: false };
      try { cv.setPointerCapture(e.pointerId); } catch (err) { /* older browsers */ }
      S.lens = cams()[h.i].lens;
      markLenses();
      draw();
      say("Camera " + (h.i + 1) + " picked, " + LENSES[cams()[h.i].lens].label.toLowerCase() + " lens.");
      return;
    }
    snapshot();
    var sh = plan().shell;
    var angle = Math.atan2(sh[1] + sh[3] / 2 - p.y, sh[0] + sh[2] / 2 - p.x) * 180 / Math.PI;
    cams().push({ x: Math.round(p.x), y: Math.round(p.y), angle: Math.round(angle), lens: S.lens });
    S.selected = -1;
    S.cx = Math.round(p.x); S.cy = Math.round(p.y);
    draw(); stats();
    say("Camera " + cams().length + " placed, " + LENSES[S.lens].label.toLowerCase() + " lens.");
  }
  function onMove(e) {
    if (!drag) return;
    var p = toPlan(e), c = cams()[drag.i];
    if (!c) { drag = null; return; }
    if (drag.mode === "move") { c.x = Math.round(p.x); c.y = Math.round(p.y); }
    else c.angle = Math.round(Math.atan2(p.y - c.y, p.x - c.x) * 180 / Math.PI);
    drag.moved = true;
    draw(); stats();
  }
  function onUp() {
    if (drag) {
      if (!drag.moved) hist().pop();
      else say(drag.mode === "move" ? "Camera " + (drag.i + 1) + " moved." : "Camera " + (drag.i + 1) + " aimed.");
    }
    drag = null;
  }

  /* ================= the plan is a control ================= */
  function onKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var step = e.shiftKey ? 6 : 24, list = cams(), c, i;

    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (e.key === "ArrowLeft") S.cx -= step;
      if (e.key === "ArrowRight") S.cx += step;
      if (e.key === "ArrowUp") S.cy -= step;
      if (e.key === "ArrowDown") S.cy += step;
      S.cx = Math.max(0, Math.min(W, S.cx));
      S.cy = Math.max(0, Math.min(H, S.cy));
      e.preventDefault(); draw();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      var under = hitCam({ x: S.cx, y: S.cy });
      if (under) {
        S.selected = under.i;
        S.lens = list[under.i].lens;
        markLenses(); draw();
        say("Camera " + (under.i + 1) + " picked, " + LENSES[list[under.i].lens].label.toLowerCase() + " lens.");
        return;
      }
      snapshot();
      var sh = plan().shell;
      var angle = Math.atan2(sh[1] + sh[3] / 2 - S.cy, sh[0] + sh[2] / 2 - S.cx) * 180 / Math.PI;
      list.push({ x: S.cx, y: S.cy, angle: Math.round(angle), lens: S.lens });
      S.selected = -1;
      draw(); stats();
      say("Camera " + list.length + " placed, " + LENSES[S.lens].label.toLowerCase() + " lens.");
      return;
    }
    if (e.key === "g" || e.key === "G") {
      if (S.selected < 0 || !list[S.selected]) return;
      e.preventDefault(); snapshot();
      c = list[S.selected]; c.x = S.cx; c.y = S.cy;
      draw(); stats();
      say("Camera " + (S.selected + 1) + " moved to the crosshair.");
      return;
    }
    if (e.key === "," || e.key === ".") {
      i = S.selected > -1 ? S.selected : list.length - 1;
      if (i < 0 || !list[i]) return;
      e.preventDefault(); snapshot();
      list[i].angle = Math.round(list[i].angle + (e.key === "," ? -6 : 6));
      S.selected = i;
      draw(); stats();
      say("Camera " + (i + 1) + " aimed.");
      return;
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      i = S.selected > -1 ? S.selected : list.length - 1;
      if (i < 0 || !list[i]) return;
      e.preventDefault(); snapshot();
      list.splice(i, 1);
      S.selected = -1;
      draw(); stats();
      say("Camera " + (i + 1) + " removed.");
    }
  }

  /* ================= console controls ================= */
  function switchPlan(key) {
    if (!PLANS[key] || key === S.plan) { if (PLANS[key]) markTabs(); return; }
    S.plan = key;
    S.selected = -1;
    S.cx = 500; S.cy = 350;
    markTabs();
    if (elHint) elHint.textContent = PLANS[key].kind;
    draw(); stats();
    say(PLANS[key].label + " plan.");
  }

  function onClick(e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var b;

    if ((b = t.closest("[data-plan]"))) { switchPlan(b.getAttribute("data-plan")); return; }

    if ((b = t.closest("[data-lens]"))) {
      S.lens = b.getAttribute("data-lens");
      markLenses();
      if (S.selected > -1 && cams()[S.selected]) {
        snapshot();
        cams()[S.selected].lens = S.lens;
        draw(); stats();
        say("Camera " + (S.selected + 1) + " set to the " + LENSES[S.lens].label.toLowerCase() + " lens.");
      } else {
        say("Next camera will be " + LENSES[S.lens].label.toLowerCase() + ".");
      }
      return;
    }

    if (t.closest("[data-undo]")) {
      var h = hist();
      if (!h.length) { say("Nothing to undo."); return; }
      S.byPlan[S.plan] = JSON.parse(h.pop());
      S.selected = -1;
      draw(); stats();
      say("Undone.");
      return;
    }

    if (t.closest("[data-clear]")) {
      if (!cams().length) { say("The plan is already empty."); return; }
      snapshot();
      S.byPlan[S.plan] = [];
      S.selected = -1;
      draw(); stats();
      say("Plan cleared.");
      return;
    }

    if (t.closest("[data-send]")) { sendLayout(); }
  }

  /* arrow keys on the space strip. The shared assets/money/a11y.js gives the other
     demos this; this page updates in place and does not load it, so the strip
     carries the handler itself and nothing is stranded behind tabindex="-1". */
  function onStripKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (!t || !t.closest) return;
    var tab = t.closest('[role="tab"]');
    if (!tab) return;
    var list = tab.closest('[role="tablist"]');
    if (!list || !root.contains(list)) return;
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var i = tabs.indexOf(tab), n = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    else return;
    e.preventDefault();
    switchPlan(tabs[n].getAttribute("data-plan"));
    try { tabs[n].focus({ preventScroll: true }); } catch (err) { tabs[n].focus(); }
  }

  /* ================= the lead form · unchanged behaviour ================= */
  var wrap = document.getElementById("coverage-form-container");
  var form = document.querySelector("[data-cov-form]");

  function sendLayout() {
    if (!wrap || !form) return;
    wrap.hidden = false;
    var msg = form.querySelector('[name="message"]');
    if (msg) msg.value = summary();
    wrap.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setTimeout(function () {
      var n = form.querySelector('[name="name"]');
      if (n) { try { n.focus({ preventScroll: true }); } catch (e) { n.focus(); } }
    }, 400);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var out = form.querySelector(".form-msg");
      var data = {};
      new FormData(form).forEach(function (v, kk) { data[kk] = v; });
      if (data.website) return;
      if (!data.name || !data.phone || !data.town) {
        if (out) { out.textContent = "Please add your name, phone and town."; out.className = "form-msg err"; }
        return;
      }
      if (!data.message || data.message.indexOf("COVERAGE") !== 0) data.message = summary() + "\n" + (data.message || "");
      data.page = location.pathname;
      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error("bad status");
        form.innerHTML = '<div class="planner-success"><h3>Layout sent &mdash; thank you!</h3>' +
          "<p>We'll review it and reach out to set up a free walkthrough or video call. " +
          'Questions? Call or text 631-871-5957.</p></div>';
        if (window.ptsTrack) window.ptsTrack("generate_lead", { source: "Coverage Planner" });
      }).catch(function () {
        if (out) {
          out.textContent = "Something went wrong. Please call or text 631-871-5957.";
          out.className = "form-msg err";
        }
        if (btn) btn.disabled = false;
      });
    });
  }

  /* ================= go ================= */
  shell();
  markTabs();
  markLenses();
  if (elHint) elHint.textContent = plan().kind;
  fit();
  stats();
  if (!reduce) window.requestAnimationFrame(tick);
})();
