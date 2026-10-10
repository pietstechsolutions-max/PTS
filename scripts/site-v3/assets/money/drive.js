/* Piets — delivery dispatch, channel manager and the chargeback dispute desk.
   Sample data, running in the browser. Nothing is saved and nothing is sent.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";
  var root = document.getElementById("driveDemo");
  if (!root) return;

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var S = {
    tab: "drive",
    stage: 0,          // 0 new order, 1 quoting, 2 driver assigned, 3 picked up, 4 delivered
    t: 0,
    timer: null,
    cases: [
      {
        id: "CB-4471", who: "Order #8812 · delivery", amt: "$64.20", plat: "Delivery platform",
        reason: "Customer says the order never arrived", days: 6, state: "open",
        ev: [["Itemised order receipt", 1], ["POS timestamp at handoff", 1],
             ["Camera clip at the pickup door", 1], ["Driver GPS drop pin", 1],
             ["Photo of the drop", 0]]
      },
      {
        id: "CB-4468", who: "Order #8790 · pickup", amt: "$28.75", plat: "Card issuer",
        reason: "Cardholder does not recognise the charge", days: 11, state: "open",
        ev: [["Itemised order receipt", 1], ["POS timestamp at handoff", 1],
             ["Camera clip at the counter", 1], ["Signature on the terminal", 1],
             ["Matching loyalty account", 1]]
      },
      {
        id: "CB-4455", who: "Order #8702 · delivery", amt: "$112.40", plat: "Delivery platform",
        reason: "Quality complaint, full refund issued to customer", days: 2, state: "won"
      }
    ]
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function money(v) {
    return "$" + Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  /* The shared accessibility layer (assets/money/a11y.js) gives every role="tablist"
     in these demos arrow keys, Home and End. The strip below therefore carries a
     roving tabindex, as the ARIA tabs pattern wants: one tab stop for the strip, and
     the arrows move between the tabs. If that file is missing for any reason, the
     fallback handler at the bottom of this file takes the arrow keys instead, so the
     other tabs are never stranded out of reach of the keyboard. Same pattern as
     assets/money/pos.js. */
  function a11yOn() { return root.getAttribute("data-a11y") === "on"; }

  function tabAttrs(id, panelId, on) {
    return ' role="tab" id="' + id + '" aria-controls="' + panelId + '"' +
      ' aria-selected="' + (on ? "true" : "false") + '" tabindex="' + (on ? "0" : "-1") + '"';
  }

  /* ---------------- dispatch ---------------- */
  var ROUTE = [[86, 268], [150, 250], [214, 262], [268, 220], [332, 206], [392, 166],
               [452, 150], [512, 120], [566, 96], [618, 74]];

  function pointAt(f) {
    if (f <= 0) return { x: ROUTE[0][0], y: ROUTE[0][1] };
    if (f >= 1) return { x: ROUTE[ROUTE.length - 1][0], y: ROUTE[ROUTE.length - 1][1] };
    var segs = ROUTE.length - 1, pos = f * segs, i = Math.floor(pos), k = pos - i;
    var a = ROUTE[i], b = ROUTE[i + 1];
    return { x: a[0] + (b[0] - a[0]) * k, y: a[1] + (b[1] - a[1]) * k };
  }

  function mapSvg() {
    var d = ROUTE.map(function (p, i) { return (i ? "L" : "M") + p[0] + " " + p[1]; }).join(" ");
    var f = S.stage >= 3 ? Math.min(1, S.t / 100) : 0;
    var p = pointAt(f);
    var grid = "";
    for (var x = 0; x <= 700; x += 50) grid += '<path d="M' + x + ' 0V340" stroke="#13203A" stroke-width="1"/>';
    for (var y = 0; y <= 340; y += 50) grid += '<path d="M0 ' + y + 'H700" stroke="#13203A" stroke-width="1"/>';

    return '<svg viewBox="0 0 700 340" preserveAspectRatio="xMidYMid slice" aria-label="Delivery route, sample">' +
      '<rect width="700" height="340" fill="#071024"/>' + grid +
      /* a couple of blocks */
      '<g fill="#0E1A33">' +
      '<rect x="40" y="60" width="130" height="80" rx="4"/><rect x="220" y="40" width="110" height="70" rx="4"/>' +
      '<rect x="400" y="210" width="150" height="90" rx="4"/><rect x="580" y="170" width="90" height="70" rx="4"/>' +
      '</g>' +
      /* route */
      '<path d="' + d + '" stroke="#1E3A63" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" stroke="#02D7F5" stroke-width="2.5" fill="none" stroke-linecap="round" ' +
      'stroke-linejoin="round" stroke-dasharray="7 10" opacity=".85"/>' +
      /* kitchen pin */
      '<g transform="translate(86,268)"><circle r="13" fill="#011F5D" stroke="#02D7F5" stroke-width="2.5"/>' +
      '<path d="M-5 -2v6a2 2 0 0 0 4 0v-6M-3 4v-8M3 -5c-1 0-2 1.5-2 3.5S2 1 3 1v5" stroke="#02D7F5" ' +
      'stroke-width="1.6" fill="none" stroke-linecap="round"/></g>' +
      '<text x="86" y="300" fill="#8FE9FB" font-family="monospace" font-size="11" text-anchor="middle">KITCHEN</text>' +
      /* customer pin */
      '<g transform="translate(618,74)"><circle r="13" fill="#2A1352" stroke="#B08CFF" stroke-width="2.5"/>' +
      '<path d="M-5 2l5-5 5 5v5h-10z" stroke="#B08CFF" stroke-width="1.6" fill="none" stroke-linejoin="round"/></g>' +
      '<text x="618" y="106" fill="#CDB4FF" font-family="monospace" font-size="11" text-anchor="middle">CUSTOMER</text>' +
      /* driver */
      (S.stage >= 2 ?
        '<g transform="translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ')">' +
        '<circle r="18" fill="#2EE59D" opacity=".14"/>' +
        '<circle r="9" fill="#2EE59D" stroke="#041B12" stroke-width="2"/></g>' : "") +
      '</svg>';
  }

  var STEPS = [
    ["Order lands", "Straight off your own ordering page — your customer, your data."],
    ["Driver quoted", "Piets asks DoorDash Drive for a quote on that address."],
    ["Driver assigned", "A Dasher takes it. The customer gets a tracking link automatically."],
    ["Picked up", "Kitchen hands it over. The camera over the door records the handoff."],
    ["Delivered", "Drop confirmed, GPS pin and timestamp filed against the order."]
  ];

  function driveView() {
    var eta = S.stage < 2 ? "—" : S.stage >= 4 ? "0" : String(Math.max(1, Math.ceil(18 - (S.t / 100) * 16)));
    var h = '<h4>Your own delivery, somebody else&rsquo;s driver</h4>' +
      '<p class="sub">Take the order on your own page and keep the customer. Hand only the driving to ' +
      'DoorDash Drive. Sample order, running here in your browser.</p>';

    h += '<div class="drive"><div>';
    h += '<div class="dmap">' +
      '<div class="dmap__hud"><span>Sample Cafe &middot; order #8841</span>' +
      '<span>' + (S.stage >= 3 ? "Driver en route" : S.stage >= 2 ? "Driver heading to kitchen" :
        S.stage >= 1 ? "Getting a quote" : "Waiting to dispatch") + '</span></div>' +
      '<div class="dmap__eta"><b>' + eta + '</b><span>min to door</span></div>' +
      mapSvg() + '</div>';

    h += '<div class="macts">';
    if (S.stage === 0) h += '<button type="button" class="mbtn" data-go>Dispatch a driver</button>';
    else h += '<button type="button" class="mbtn g" data-reset>Run it again</button>';
    h += '<a class="mbtn g" href="payments.html#pos">See the register that took this order</a></div>';
    h += '</div>';

    h += '<div>';
    STEPS.forEach(function (s, i) {
      var cls = S.stage > i ? "done" : S.stage === i ? "on" : "";
      h += '<div class="dstep ' + cls + '"><span class="dot">' + (S.stage > i ? "✓" : (i + 1)) + '</span>' +
        '<span><b>' + s[0] + '</b><em>' + s[1] + '</em></span></div>';
    });
    h += '<p class="note">Sample timings. Real quotes, fees and driver availability come from the ' +
      'platform at the moment you dispatch — Piets wires the integration, it does not set their prices.</p>';
    h += '</div></div>';
    return h;
  }

  function tick() {
    S.t += RM ? 100 : 2.2;
    if (S.t >= 100) { S.t = 100; S.stage = 4; stop(); }
    paint();
  }
  function stop() { if (S.timer) { clearInterval(S.timer); S.timer = null; } }

  function go() {
    S.stage = 1; S.t = 0; paint();
    setTimeout(function () { if (S.stage === 1) { S.stage = 2; paint(); } }, RM ? 150 : 900);
    setTimeout(function () {
      if (S.stage === 2) { S.stage = 3; paint(); stop(); S.timer = setInterval(tick, 60); }
    }, RM ? 300 : 1900);
  }

  /* ---------------- channel cost ---------------- */
  function channelView() {
    return '<h4>What the platforms actually cost you</h4>' +
      '<p class="sub">Put in your own numbers off your own payout statement. This is arithmetic, not a claim ' +
      'about any platform&rsquo;s rates — only your agreement says what yours are.</p>' +
      '<div class="calc"><div class="calcf">' +
        '<div class="f"><label for="chSales">Monthly sales through the platforms</label>' +
          '<div class="inp"><span>$</span><input type="number" id="chSales" value="24000" min="0" step="100"></div></div>' +
        '<div class="f"><label for="chRate">Commission rate in your agreement</label>' +
          '<div class="inp"><input type="number" id="chRate" value="23" min="0" max="60" step="0.5"><span>%</span></div>' +
          '<span class="hint">Marketplace plans differ. Read yours — do not guess.</span></div>' +
        '<div class="f"><label for="chOwn">What a flat per-delivery fee would run you</label>' +
          '<div class="inp"><span>$</span><input type="number" id="chOwn" value="8" min="0" step="0.25"></div>' +
          '<span class="hint">Self-delivery through Drive is normally quoted per drop, not as a cut of the ticket.</span></div>' +
        '<div class="f"><label for="chOrders">Orders a month</label>' +
          '<div class="inp"><span>#</span><input type="number" id="chOrders" value="780" min="0" step="10"></div></div>' +
        '<div class="f"><label for="chTicket">One sample ticket</label>' +
          '<div class="inp"><span>$</span><input type="number" id="chTicket" value="40" min="0" step="1"></div>' +
          '<span class="hint">Used for the ticket breakdown below.</span></div>' +
        '<div class="f"><label for="chFood">Your food cost on that ticket</label>' +
          '<div class="inp"><input type="number" id="chFood" min="0" max="100" step="1" placeholder="type yours"><span>%</span></div>' +
          '<span class="hint">Off your own invoices. We will not guess a number for you &mdash; leave it blank and the ' +
          'breakdown stays blank.</span></div>' +
      '</div>' +
      '<div class="calcout"><span class="cap">Commission at your rate</span>' +
        '<div class="big" id="chOut">&mdash;</div>' +
        '<div class="l"><span>Per-drop cost at your fee</span><b id="chFlat">&mdash;</b></div>' +
        '<div class="l"><span>Difference a month</span><b id="chDiff">&mdash;</b></div>' +
        '<div class="l"><span>Difference a year</span><b id="chYr">&mdash;</b></div>' +
        '<p class="dis">Your numbers only. It ignores the orders the marketplace brings you that you would ' +
        'not have got otherwise — that is the real trade, and it is worth talking through rather than ' +
        'assuming. Most kitchens end up running both.</p></div></div>' +
      '<div class="tsplit">' +
        '<div class="tsplit__h"><h6>Where one ticket goes</h6>' +
          '<span class="mtag cy" id="chTkTag">&mdash;</span>' +
          '<p class="sub2">One order, split three ways on the commission rate and the food cost <b>you</b> typed in ' +
          'above. Change either number and the bar moves. There is no average, benchmark or industry figure ' +
          'anywhere in here &mdash; it is your arithmetic.</p></div>' +
        '<div class="tsplit__bar" id="chBar" role="img" aria-label="Ticket breakdown"></div>' +
        '<div class="tsplit__legend" id="chLegend" aria-live="polite"></div>' +
        '<p class="ask" id="chAsk" hidden>Put your food cost percentage in above and this fills in.</p>' +
        '<p class="note">What is left is what is left <em>of the ticket</em> &mdash; before labour, rent, ' +
        'packaging, utilities, delivery fees the platform charges separately, card processing and tax. Those are ' +
        'real and they come out of the same slice. Bring three months of statements and we will do the whole ' +
        'picture with you properly.</p>' +
      '</div>' +
      '<div class="chan" style="margin-top:22px">' +
        '<div><h6>One menu</h6><div class="ln"><span>Your site</span><b>synced</b></div>' +
          '<div class="ln"><span>Marketplaces</span><b>synced</b></div>' +
          '<div class="ln"><span>In-store POS</span><b>synced</b></div></div>' +
        '<div><h6>86 an item once</h6><div class="ln"><span>Pushes to</span><b>all channels</b></div>' +
          '<div class="ln"><span>Time to update</span><b>seconds</b></div></div>' +
        '<div><h6>Hours &amp; pauses</h6><div class="ln"><span>Holiday hours</span><b>one place</b></div>' +
          '<div class="ln"><span>Pause orders</span><b>one tap</b></div></div>' +
        '<div><h6>One report</h6><div class="ln"><span>All channels</span><b>combined</b></div>' +
          '<div class="ln"><span>Exports to</span><b>your books</b></div></div>' +
      '</div>';
  }

  function runChannel() {
    var sales = +(document.getElementById("chSales") || {}).value || 0;
    var rate = +(document.getElementById("chRate") || {}).value || 0;
    var fee = +(document.getElementById("chOwn") || {}).value || 0;
    var ords = +(document.getElementById("chOrders") || {}).value || 0;
    var comm = sales * rate / 100, flat = fee * ords, diff = comm - flat;
    var m = money;
    var a = document.getElementById("chOut"); if (a) a.textContent = m(comm);
    var b = document.getElementById("chFlat"); if (b) b.textContent = m(flat);
    var c = document.getElementById("chDiff"); if (c) c.textContent = (diff >= 0 ? "" : "−") + m(Math.abs(diff));
    var d = document.getElementById("chYr"); if (d) d.textContent = (diff >= 0 ? "" : "−") + m(Math.abs(diff) * 12);
    runSplit(rate);
  }

  /* one sample ticket, split on the visitor's own two numbers */
  function runSplit(rate) {
    var bar = document.getElementById("chBar");
    var leg = document.getElementById("chLegend");
    var ask = document.getElementById("chAsk");
    var tag = document.getElementById("chTkTag");
    if (!bar || !leg) return;

    var tEl = document.getElementById("chTicket");
    var fEl = document.getElementById("chFood");
    var ticket = tEl ? +tEl.value : 0;
    var foodRaw = fEl ? String(fEl.value).trim() : "";
    var hasFood = foodRaw !== "" && isFinite(+foodRaw);
    var foodPc = hasFood ? +foodRaw : 0;

    if (tag) tag.innerHTML = ticket > 0 ? esc(money(ticket)) + " ticket" : "&mdash;";

    if (!(ticket > 0) || !hasFood) {
      bar.innerHTML = '<i class="idle" style="width:100%"></i>';
      bar.setAttribute("aria-label", "Ticket breakdown — waiting for your food cost");
      leg.innerHTML = "";
      if (ask) ask.hidden = false;
      return;
    }
    if (ask) ask.hidden = true;

    var food = ticket * foodPc / 100;
    var cut = ticket * rate / 100;
    var keep = ticket - food - cut;
    var over = keep < 0;
    var base = over ? (food + cut) : ticket;
    function w(v) { return base > 0 ? (Math.max(0, v) / base * 100) : 0; }
    function pc(v) { return ticket > 0 ? (v / ticket * 100).toFixed(1) + "%" : "\u2014"; }

    bar.innerHTML =
      '<i class="food" style="width:' + w(food).toFixed(2) + '%"></i>' +
      '<i class="comm" style="width:' + w(cut).toFixed(2) + '%"></i>' +
      (over ? "" : '<i class="keep" style="width:' + w(keep).toFixed(2) + '%"></i>');
    bar.setAttribute("aria-label",
      "On a " + money(ticket) + " ticket: food cost " + money(food) + ", platform commission " +
      money(cut) + ", left over " + (over ? "minus " + money(Math.abs(keep)) : money(keep)) + ".");

    var rows = [
      ["food", "Food cost", food, "The ingredients on that one order, at the percentage you typed."],
      ["comm", "Platform commission", cut, "Your own agreement&rsquo;s rate of " + (rate || 0) + "% on this ticket."],
      ["keep", "What is left", keep, over
        ? "At those two numbers this ticket is underwater before you pay anybody."
        : "Everything else has to come out of this \u2014 labour, rent, packaging, utilities."]
    ];
    var h = "";
    rows.forEach(function (r) {
      var neg = r[2] < 0;
      h += '<div class="' + (neg ? "neg" : "") + '"><span class="sw ' + r[0] + '"></span>' +
        '<b>' + r[1] + '</b>' +
        '<span class="amt">' + (neg ? "\u2212" : "") + esc(money(Math.abs(r[2]))) + '</span>' +
        '<span class="pcf">' + esc(pc(r[2])) + ' of the ticket</span>' +
        '<em>' + r[3] + '</em></div>';
    });
    leg.innerHTML = h;
  }

  /* ---------------- dispute desk ---------------- */
  function dispView() {
    var open = S.cases.filter(function (c) { return c.state === "open"; }).length;
    var h = '<h4>The dispute desk</h4>' +
      '<p class="sub">A chargeback is winnable or it is not, and that comes down to whether the evidence was ' +
      'collected at the time. Piets installs the register and the cameras, so it is.</p>';
    h += '<div class="mk">' +
      '<div class="warn"><b>' + open + '</b><span>Open cases</span></div>' +
      '<div><b>$92.95</b><span>At stake, open</span></div>' +
      '<div class="good"><b>1</b><span>Resolved your way</span></div>' +
      '<div class="pur"><b>Auto</b><span>Evidence collected</span></div></div>';

    h += '<div class="disp">';
    S.cases.forEach(function (c, i) {
      h += '<div class="dcase"><div class="dcase__h"><b>' + esc(c.id) + '</b>' +
        '<span class="m">' + esc(c.who) + ' &middot; ' + esc(c.reason) + '</span>' +
        '<span class="tail"><span class="mtag">' + esc(c.plat) + '</span>' +
        '<span class="mtag ' + (c.state === "won" ? "ok" : c.state === "filed" ? "pur" : "warn") + '">' +
        (c.state === "won" ? "Resolved" : c.state === "filed" ? "Packet filed" : c.days + " days to respond") +
        '</span><span class="mtag cy">' + esc(c.amt) + '</span></span></div>';
      if (c.ev) {
        h += '<div class="dcase__b"><div class="evid">';
        c.ev.forEach(function (e) {
          h += '<span class="' + (e[1] ? "" : "off") + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">' +
            (e[1] ? '<path d="M20 6L9 17l-5-5"/>' : '<circle cx="12" cy="12" r="9"/><path d="M12 8v5"/>') +
            '</svg>' + esc(e[0]) + '</span>';
        });
        h += '</div>';
        if (c.state === "open") {
          h += '<div class="macts"><button type="button" class="mbtn" data-file="' + i + '">' +
            'Build the response packet</button></div>';
        } else if (c.state === "filed") {
          h += '<div class="flash">Packet built and filed with ' + esc(c.plat).toLowerCase() +
            ' — receipt, timestamps, the camera clip and the GPS pin, in their format, inside the window.</div>';
        }
        h += '</div>';
      }
      h += '</div>';
    });
    h += '</div>';

    h += '<div class="callout" style="margin-top:20px">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M3 7h11a2 2 0 0 1 2 2v1l4-2.5v9L16 14v1a2 2 0 0 1-2 2H3z"/></svg>' +
      '<p><b>This is the part nobody else can do.</b> The camera over the handoff door is a Piets camera, ' +
      'the register is a Piets register, and the order record ties them together. When a platform says the ' +
      'food never arrived, there is footage of it going out the door at the timestamp on the ticket.</p></div>';
    h += '<p class="note">Sample cases. No win rate is promised here — some disputes go against you no matter ' +
      'what you file, and the platforms and card networks make the final call, not Piets.</p>';
    return h;
  }

  /* ---------------- paint ---------------- */
  function paint() {
    var tabs = [["drive", "Dispatch a driver"], ["chan", "What platforms cost"], ["disputes", "Chargebacks &amp; disputes"]];
    var keys = tabs.map(function (t) { return t[0]; });
    var curTab = keys.indexOf(S.tab) < 0 ? keys[0] : S.tab;
    var h = '<div class="mcon"><div class="mcon__bar"><span class="mcon__lg"><i></i></span>' +
      '<b>Piets Delivery Desk</b><span class="mcon__demo">Demo</span>' +
      '<span class="mcon__live">Live in your browser</span></div>' +
      '<div class="mcon__tabs" role="tablist" aria-label="Delivery sections">';
    tabs.forEach(function (t) {
      h += '<button type="button"' + tabAttrs("driveTab-" + t[0], "drivePanel", t[0] === curTab) +
        ' data-tab="' + t[0] + '">' + t[1] + '</button>';
    });
    h += '</div><div class="mcon__body" id="drivePanel" role="tabpanel" aria-labelledby="driveTab-' +
      curTab + '">';
    h += curTab === "chan" ? channelView() : curTab === "disputes" ? dispView() : driveView();
    h += '</div></div>';
    root.innerHTML = h;
    if (S.tab === "chan") runChannel();
  }

  root.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-tab],[data-go],[data-reset],[data-file]") : null;
    if (!el || !root.contains(el)) return;
    if (el.hasAttribute("data-tab")) {
      S.tab = el.getAttribute("data-tab");
      if (S.tab !== "drive") stop();
      paint(); return;
    }
    if (el.hasAttribute("data-go")) { go(); return; }
    if (el.hasAttribute("data-reset")) { stop(); S.stage = 0; S.t = 0; paint(); return; }
    if (el.hasAttribute("data-file")) {
      var c = S.cases[+el.getAttribute("data-file")];
      if (c) { c.state = "filed"; if (c.ev) c.ev.forEach(function (x) { x[1] = 1; }); }
      paint(); return;
    }
  });

  /* Arrow keys on the tab strip. The shared a11y layer does this for every demo,
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

  root.addEventListener("input", function (e) {
    if (S.tab === "chan" && e.target && /^ch/.test(e.target.id)) runChannel();
  });

  try { paint(); } catch (err) {
    root.innerHTML = '<p class="note">This demo could not start in your browser. Call 631-871-5957 and we will walk you through it.</p>';
  }
})();
