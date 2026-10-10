/* Piets Fleet — the OBD-II / fuel-delivery / partner-network console.
   Sample data, running in the browser. Nothing is saved and nothing is sent.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";
  var root = document.getElementById("fleetDemo");
  if (!root) return;

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var VEH = [
    { id: "VAN-1", nm: "Install Van 1", st: "mv", where: "On a job · Riverhead", fuel: 18, odo: 84210,
      svcAt: 87000, hrs: 2140, codes: ["Low fuel"], eta: 0, cam: "Dash + cargo" },
    { id: "VAN-2", nm: "Install Van 2", st: "mv", where: "En route · Hauppauge", fuel: 62, odo: 51880,
      svcAt: 55000, hrs: 1190, codes: [], eta: 31, cam: "Dash + cargo" },
    { id: "BKT-1", nm: "Bucket Truck 1", st: "idle", where: "Yard", fuel: 44, odo: 112640,
      svcAt: 113000, hrs: 4820, codes: ["Brake wear sensor"], eta: 0, cam: "Dash + boom" },
    { id: "SAL-1", nm: "Sales 1", st: "off", where: "Parked · overnight", fuel: 88, odo: 29310,
      svcAt: 32000, hrs: 640, codes: [], eta: 0, cam: "Dash" }
  ];

  var S = { tab: "board", v: 0, fuelReq: false, notified: false, legs: null };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function nf(n) { return n.toLocaleString("en-US"); }

  /* ids for the tab / tabpanel wiring below — "VAN-1" becomes "fleetVeh-van-1" */
  function slug(x) {
    return String(x).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "x";
  }

  /* The shared accessibility layer (assets/money/a11y.js) gives every role="tablist"
     in these demos arrow keys, Home and End. The two tab strips below therefore carry
     a roving tabindex, as the ARIA tabs pattern wants: one tab stop for the strip, and
     the arrows move between the tabs. If that file is missing for any reason, the
     fallback handler at the bottom of this file takes the arrow keys instead, so the
     other tabs are never stranded out of reach of the keyboard. */
  function a11yOn() { return root.getAttribute("data-a11y") === "on"; }

  function tabAttrs(id, panelId, on) {
    return ' role="tab" id="' + id + '" aria-controls="' + panelId + '"' +
      ' aria-selected="' + (on ? "true" : "false") + '" tabindex="' + (on ? "0" : "-1") + '"';
  }
  function clock() {
    var d = new Date(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    function p(x) { return (x < 10 ? "0" : "") + x; }
    return p(h) + ":" + p(m) + ":" + p(s);
  }

  /* ---------------- in-vehicle camera ---------------- */
  function camSvg(v) {
    return '<svg viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice" aria-label="Sample in-vehicle camera view">' +
      '<defs><linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#16223C"/><stop offset="100%" stop-color="#2A3category"/></linearGradient>' +
      '</defs>' +
      '<rect width="480" height="270" fill="#10192C"/>' +
      '<rect width="480" height="150" fill="#1A2740"/>' +
      /* road */
      '<path d="M0 270 L190 150 L290 150 L480 270 Z" fill="#232E44"/>' +
      '<path d="M236 152 L244 152 L262 190 L218 190 Z" fill="#3A4660"/>' +
      '<path d="M206 200 L274 200 L300 250 L180 250 Z" fill="#3A4660"/>' +
      /* building + a van ahead */
      '<rect x="20" y="70" width="120" height="80" fill="#121C30"/>' +
      '<rect x="350" y="60" width="110" height="90" fill="#121C30"/>' +
      '<g><rect x="196" y="112" width="92" height="46" rx="5" fill="#2E3A55"/>' +
      '<rect x="206" y="120" width="30" height="20" rx="3" fill="#44property"/>' +
      '<circle cx="214" cy="160" r="7" fill="#0E1626"/><circle cx="272" cy="160" r="7" fill="#0E1626"/></g>' +
      /* headlight wash */
      '<path d="M240 160 L120 270 L360 270 Z" fill="#FFE9B5" opacity=".07"/>' +
      '</svg>';
  }

  /* ---------------- board ---------------- */
  function boardView() {
    /* defensive: an out-of-range selection falls back to the first vehicle rather
       than producing a panel labelled by an id that is not on the page */
    var cur = (S.v >= 0 && S.v < VEH.length) ? S.v : 0;
    var v = VEH[cur];
    var toSvc = Math.max(0, v.svcAt - v.odo);
    var svcPct = Math.max(0, Math.min(100, 100 - (toSvc / 3000) * 100));

    var h = '<div class="flt"><div class="fveh" role="tablist" aria-label="Vehicles">';
    VEH.forEach(function (x, i) {
      h += '<button type="button"' + tabAttrs("fleetVeh-" + slug(x.id), "fleetVehPanel", i === cur) +
        ' data-v="' + i + '">' +
        '<strong><span class="st ' + x.st + '"></span>' + esc(x.nm) + '</strong>' +
        '<small>' + esc(x.where) + ' &middot; ' + x.fuel + '% fuel</small></button>';
    });
    h += '</div>';

    h += '<div id="fleetVehPanel" role="tabpanel" aria-labelledby="fleetVeh-' + slug(v.id) +
      '"><div class="mk">' +
      '<div><b>' + nf(v.odo) + '</b><span>Odometer</span></div>' +
      '<div class="' + (v.fuel < 25 ? "bad" : "") + '"><b>' + v.fuel + '%</b><span>Fuel</span></div>' +
      '<div class="' + (toSvc < 1000 ? "warn" : "good") + '"><b>' + nf(toSvc) + '</b><span>Miles to service</span></div>' +
      '<div class="pur"><b>' + nf(v.hrs) + '</b><span>Engine hours</span></div></div>';

    h += '<div class="fgauge">' +
      '<div><span class="cap">Fuel level · from the OBD port</span><div class="val">' + v.fuel + '%</div>' +
      '<div class="bar ' + (v.fuel < 25 ? "low" : "good") + '"><i style="width:' + v.fuel + '%"></i></div></div>' +
      '<div><span class="cap">Service interval used</span><div class="val">' + Math.round(svcPct) + '%</div>' +
      '<div class="bar ' + (svcPct > 70 ? "low" : "") + '"><i style="width:' + svcPct + '%"></i></div></div>' +
      '<div><span class="cap">Diagnostics</span><div class="val" style="font-size:1rem;padding-top:6px">' +
      (v.codes.length ? esc(v.codes.join(", ")) : "All clear") + '</div>' +
      '<div class="bar ' + (v.codes.length ? "low" : "good") + '"><i style="width:' +
      (v.codes.length ? 100 : 12) + '%"></i></div></div></div>';

    h += '<div class="twocol" style="margin-top:14px">' +
      '<div><div class="fcam">' + camSvg(v) +
      '<span class="rec">REC</span><span class="ts">' + clock() + '</span>' +
      '<span class="lbl">' + esc(v.id) + ' &middot; ' + esc(v.cam) + '</span></div>' +
      '<p class="note">The client can be given a view of this feed for their own job, and only their job.</p></div>' +
      '<div>';

    if (v.fuel < 25) {
      h += '<div class="mcon" style="border-radius:16px;box-shadow:none"><div class="mcon__body" style="padding:14px">' +
        '<b style="color:#FFB020">Low fuel on ' + esc(v.nm) + '</b>' +
        '<p class="sub" style="margin:6px 0 10px">It is sitting on a job. Send fuel to the truck instead of ' +
        'sending the truck to the fuel.</p>';
      if (!S.fuelReq) {
        h += '<div class="macts" style="margin-top:0"><button type="button" class="mbtn" data-fuel>' +
          'Request fuel delivery to this address</button></div>';
      } else {
        h += '<div class="flash">Sent to the nearest partner in the network. They get the GPS pin, the ' +
          'tank size and the fuel grade, and they bill through the app — tap to pay, tip included, ' +
          'straight to their account.</div>';
      }
      h += '</div></div>';
    }

    h += '<div class="macts">';
    if (!S.notified) h += '<button type="button" class="mbtn g" data-notify>Notify the client &mdash; 30 minutes out</button>';
    h += '<button type="button" class="mbtn g" data-crash>Simulate an incident</button></div>';
    if (S.notified) {
      h += '<div class="flash">Text sent: &ldquo;Your Piets technician is about 30 minutes out.&rdquo; ' +
        'No phone call, no guessing.</div>';
    }
    h += '</div></div>';

    h += '<p class="note">Sample fleet, sample readings. Live data comes off the OBD-II device once it is ' +
      'plugged in — nothing here is a measurement of a real vehicle.</p>';
    h += '</div></div>';
    return h;
  }

  /* ---------------- partners & service ---------------- */
  function partnersView() {
    var ic = {
      fuel: '<path d="M6 3v8a2 2 0 0 0 4 0V3M4 21h8V3H4zM16 8v9a2 2 0 0 0 4 0V9l-3-4"/>',
      wrench: '<path d="M14 7a4 4 0 1 1-5 5l-6 6 2 2 6-6a4 4 0 0 0 5-5z"/>',
      parts: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
      shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'
    };
    var P = [
      ["Fuel delivery", "Comes to the job site or the yard. Paid in the app, tip and all.", ic.fuel],
      ["Mechanics", "Gets the mileage, the last service date and the fault code before they pick up the phone.", ic.wrench],
      ["Parts counters", "The part is pulled against the VIN before the truck is off the lift.", ic.parts],
      ["Insurance", "Incident footage lands with the carrier the same hour, not three weeks later.", ic.shield]
    ];

    var h = '<h4>The partner network is the point</h4>' +
      '<p class="sub">Every alert the app raises is a job for somebody. The fuel company, the mechanic, the ' +
      'parts counter and the insurer are in the app, and the work routes to them.</p>';
    h += '<div class="partners">';
    P.forEach(function (p) {
      h += '<div><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" ' +
        'stroke-linejoin="round">' + p[2] + '</svg></span><h6>' + p[0] + '</h6><p>' + p[1] + '</p></div>';
    });
    h += '</div>';

    h += '<h4 style="margin-top:28px">Service predicted, not guessed</h4>' +
      '<p class="sub">The box logs every mile and every fill. After a few months it knows this truck better ' +
      'than the sticker on the windshield does.</p>';
    h += '<div class="mrows">' +
      '<div class="r"><b>Install Van 1</b><span class="m">Averages 1,840 mi/month · fills every 9 days</span>' +
      '<span class="tail"><span class="mtag warn">Service due in ~15 days</span></span></div>' +
      '<div class="r"><b>Install Van 2</b><span class="m">Averages 1,210 mi/month · fills every 14 days</span>' +
      '<span class="tail"><span class="mtag ok">Service due in ~78 days</span></span></div>' +
      '<div class="r"><b>Bucket Truck 1</b><span class="m">Brake wear sensor reporting · 4,820 engine hours</span>' +
      '<span class="tail"><span class="mtag bad">Book it now</span></span></div>' +
      '<div class="r"><b>Sales 1</b><span class="m">Averages 980 mi/month · fills every 19 days</span>' +
      '<span class="tail"><span class="mtag ok">Service due in ~11 weeks</span></span></div>' +
      '</div>';
    h += '<div class="callout" style="margin-top:20px">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>' +
      '<p><b>Tap to pay, in the truck.</b> The fuel driver or the technician takes the payment on their own ' +
      'phone and it settles to their own account, tip included. No terminal to carry, no invoice to chase.</p></div>';
    h += '<p class="note">Sample fleet. Averages shown are demo figures, not a performance claim.</p>';
    return h;
  }

  /* ---------------- backhaul ---------------- */
  function defaultLegs() {
    return [
      { from: "Riverhead, NY", to: "Jacksonville, FL", kind: "Booked", st: "ok" },
      { from: "Jacksonville, FL", to: "Savannah, GA", kind: "Empty", st: "empty" },
      { from: "Savannah, GA", to: "Columbia, SC", kind: "Empty", st: "empty" },
      { from: "Columbia, SC", to: "Baltimore, MD", kind: "Empty", st: "empty" },
      { from: "Baltimore, MD", to: "Riverhead, NY", kind: "Empty", st: "empty" }
    ];
  }

  function backhaulView() {
    if (!S.legs) S.legs = defaultLegs();
    var empty = S.legs.filter(function (l) { return l.st === "empty"; }).length;
    var h = '<h4>Nobody should drive home empty</h4>' +
      '<p class="sub">Think of it the way an airline thinks about legs. You went down with a load — the app ' +
      'chains the way back so each leg pays for itself.</p>';
    h += '<div class="mk" style="grid-template-columns:repeat(3,1fr)">' +
      '<div><b>' + S.legs.length + '</b><span>Legs on this run</span></div>' +
      '<div class="' + (empty ? "warn" : "good") + '"><b>' + empty + '</b><span>Still empty</span></div>' +
      '<div class="pur"><b>' + (S.legs.length - empty) + '</b><span>Filled</span></div></div>';
    h += '<div class="legs">';
    S.legs.forEach(function (l, i) {
      h += '<div class="leg ' + (l.st === "empty" ? "empty" : "") + '">' +
        '<span class="rt">' + String(i + 1).padStart(2, "0") + '</span>' +
        '<span><b>' + esc(l.from) + '</b> &rarr; <b>' + esc(l.to) + '</b></span>' +
        '<span class="tail"><span class="mtag ' + (l.st === "empty" ? "warn" : "ok") + '">' + esc(l.kind) + '</span>' +
        (l.st === "empty" ? '<button type="button" class="mbtn g" style="padding:5px 12px;font-size:.75rem" ' +
          'data-fill="' + i + '">Match a load</button>' : '') + '</span></div>';
    });
    h += '</div>';
    h += '<div class="macts"><button type="button" class="mbtn" data-fillall>Match every empty leg</button>' +
      '<button type="button" class="mbtn g" data-resetlegs>Reset</button></div>';
    h += '<p class="note">Sample route. Load matching depends on what is actually posted on the day, and no ' +
      'rate or revenue is implied here.</p>';
    return h;
  }

  /* ---------------- paint ---------------- */
  function paint() {
    var tabs = [["board", "Fleet board"], ["partners", "Fuel, service &amp; partners"], ["back", "Backhaul matching"]];
    var h = '<div class="mcon"><div class="mcon__bar"><span class="mcon__lg"><i></i></span>' +
      '<b>Piets Fleet</b><span class="mcon__demo">Concept demo</span>' +
      '<span class="mcon__live">Live in your browser</span></div>';
    /* defensive: an unknown S.tab falls back to the first tab rather than
       producing a panel labelled by a missing id */
    var keys = tabs.map(function (t) { return t[0]; });
    var curTab = keys.indexOf(S.tab) < 0 ? keys[0] : S.tab;
    h += '<div class="mcon__tabs" role="tablist" aria-label="Fleet sections">';
    tabs.forEach(function (t) {
      h += '<button type="button"' + tabAttrs("fleetTab-" + t[0], "fleetPanel", t[0] === curTab) +
        ' data-tab="' + t[0] + '">' + t[1] + '</button>';
    });
    h += '</div><div class="mcon__body" id="fleetPanel" role="tabpanel" aria-labelledby="fleetTab-' +
      curTab + '">';
    h += curTab === "partners" ? partnersView() : curTab === "back" ? backhaulView() : boardView();
    h += '</div></div>';
    root.innerHTML = h;
  }

  root.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-tab],[data-v],[data-fuel],[data-notify],[data-crash],[data-fill],[data-fillall],[data-resetlegs]") : null;
    if (!el || !root.contains(el)) return;
    if (el.hasAttribute("data-tab")) { S.tab = el.getAttribute("data-tab"); paint(); return; }
    if (el.hasAttribute("data-v")) { S.v = +el.getAttribute("data-v"); S.fuelReq = false; S.notified = false; paint(); return; }
    if (el.hasAttribute("data-fuel")) { S.fuelReq = true; paint(); return; }
    if (el.hasAttribute("data-notify")) { S.notified = true; paint(); return; }
    if (el.hasAttribute("data-crash")) { crash(); return; }
    if (el.hasAttribute("data-fill")) {
      var i = +el.getAttribute("data-fill");
      if (S.legs && S.legs[i]) { S.legs[i].st = "ok"; S.legs[i].kind = "Matched"; }
      paint(); return;
    }
    if (el.hasAttribute("data-fillall")) {
      if (S.legs) S.legs.forEach(function (l) { if (l.st === "empty") { l.st = "ok"; l.kind = "Matched"; } });
      paint(); return;
    }
    if (el.hasAttribute("data-resetlegs")) { S.legs = defaultLegs(); paint(); return; }
  });

  /* Arrow keys on the two tab strips. The shared a11y layer does this for every demo,
     so this only runs if that file did not load — otherwise a key press would move twice. */
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
    var want = all[n].getAttribute("id");
    all[n].click();
    var back = want ? root.querySelector('[id="' + want + '"]') : null;
    if (back) { try { back.focus({ preventScroll: true }); } catch (err) { back.focus(); } }
  });

  function crash() {
    var body = root.querySelector(".mcon__body");
    if (!body) return;
    var box = document.createElement("div");
    box.className = "flash warn";
    var cv = VEH[(S.v >= 0 && S.v < VEH.length) ? S.v : 0];
    box.innerHTML = '<b>Incident detected on ' + esc(cv.nm) + '.</b><br>' +
      'The 30 seconds before and after are locked so they cannot be overwritten, the clip is copied off the ' +
      'vehicle, and a packet goes to the insurer on file with the time, the GPS track and the speed at impact. ' +
      'Nobody has to remember to pull footage later. <em>Sample event — nothing was sent.</em>';
    body.appendChild(box);
    if (!RM && box.scrollIntoView) { try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { } }
  }

  try { paint(); } catch (err) {
    root.innerHTML = '<p class="note">This demo could not start in your browser. Call 631-871-5957 and we will walk you through it.</p>';
  }
})();
