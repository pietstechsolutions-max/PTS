/* Piets custom POS — live register demo (Sample Cafe / Sample Bar / Sample Retail).
   Runs entirely in the browser with sample data. Nothing is saved, nothing is sent.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";
  var root = document.getElementById("posDemo");
  if (!root) return;

  var TAX = 0.0875;                 // Suffolk County NY, effective March 1 2025
  var SURCHARGE_DEFAULT = 4;        // Piets' own card-processing rate, editable in the demo

  /* Three register presets. Same engine, different menu, stations and order channels —
     this is the part Piets builds around how a given shop actually rings. */
  var VENUES = {
    Cafe: {
      label: "Cafe",
      name: "Sample Cafe",
      blurb: "Counter service, kitchen printer at the grill, retail shelf by the register.",
      channels: ["In store", "Pickup", "Delivery"],
      ticket: "Kitchen ticket",
      stationNote: "Routed to the station printer. Bar items print at the bar, grill items at the grill.",
      menu: {
        Counter: [
          { n: "Egg & Cheese Roll", p: 5.75, m: "Add bacon +1.50", k: "GRILL" },
          { n: "Breakfast Burrito", p: 9.25, m: "Hot sauce on side", k: "GRILL" },
          { n: "Avocado Toast", p: 8.50, m: "Sub sourdough", k: "COLD" },
          { n: "Bagel, Buttered", p: 2.75, m: "Toasted", k: "COLD" },
          { n: "Turkey Club", p: 12.50, m: "No tomato", k: "COLD" },
          { n: "Soup of the Day", p: 6.25, m: "Cup", k: "HOT" },
          { n: "Chicken Over Rice", p: 11.00, m: "White + hot", k: "GRILL" },
          { n: "Side Home Fries", p: 4.00, m: "Extra crispy", k: "GRILL" }
        ],
        Drinks: [
          { n: "Drip Coffee", p: 2.95, m: "Large", k: "BAR" },
          { n: "Latte", p: 5.25, m: "Oat milk", k: "BAR" },
          { n: "Cold Brew", p: 5.50, m: "No ice", k: "BAR" },
          { n: "Fresh OJ", p: 4.75, m: "", k: "BAR" },
          { n: "Bottled Water", p: 2.00, m: "", k: "" },
          { n: "Fountain Soda", p: 2.50, m: "", k: "" }
        ],
        Retail: [
          { n: "Whole Bean 12oz", p: 16.00, m: "Dark roast", k: "" },
          { n: "Branded Mug", p: 14.00, m: "", k: "" },
          { n: "Gift Card", p: 25.00, m: "Reload", k: "" },
          { n: "Pastry Box (6)", p: 18.00, m: "Mixed", k: "COLD" }
        ]
      }
    },
    Bar: {
      label: "Bar",
      name: "Sample Bar",
      blurb: "Open tabs, a service-bar printer and an ID prompt on every age-restricted ring.",
      channels: ["Bar tab", "Table", "Takeout"],
      ticket: "Bar & kitchen ticket",
      stationNote: "Routed to the station printer. Drinks print at the service bar, food at the grill.",
      menu: {
        Draft: [
          { n: "Draft Lager", p: 8.00, m: "16oz", k: "BAR", id: 1 },
          { n: "Draft IPA", p: 9.00, m: "16oz", k: "BAR", id: 1 },
          { n: "Draft Stout", p: 9.00, m: "Nitro pour", k: "BAR", id: 1 },
          { n: "Pitcher, Lager", p: 26.00, m: "4 glasses", k: "BAR", id: 1 }
        ],
        "Bottle & can": [
          { n: "Domestic Bottle", p: 6.00, m: "", k: "BAR", id: 1 },
          { n: "Craft Can 16oz", p: 9.00, m: "", k: "BAR", id: 1 },
          { n: "Hard Seltzer", p: 7.00, m: "Lime", k: "BAR", id: 1 },
          { n: "Non-Alc Beer", p: 6.00, m: "", k: "BAR" },
          { n: "Fountain Soda", p: 2.50, m: "", k: "BAR" }
        ],
        Spirits: [
          { n: "Well Drink", p: 9.00, m: "Tall, light ice", k: "BAR", id: 1 },
          { n: "Call Drink", p: 12.00, m: "Rocks", k: "BAR", id: 1 },
          { n: "House Wine, Glass", p: 11.00, m: "Red", k: "BAR", id: 1 },
          { n: "Shot & Beer", p: 12.00, m: "", k: "BAR", id: 1 }
        ],
        Kitchen: [
          { n: "Wings (10)", p: 15.00, m: "Hot, extra blue cheese", k: "GRILL" },
          { n: "Smash Burger", p: 14.00, m: "Med, no onion", k: "GRILL" },
          { n: "Basket of Fries", p: 7.00, m: "Well done", k: "GRILL" },
          { n: "Warm Pretzel", p: 9.00, m: "Mustard", k: "HOT" }
        ]
      }
    },
    Retail: {
      label: "Retail",
      name: "Sample Retail",
      blurb: "Shelf scanning, a deli station and the same ID prompt a liquor shelf needs.",
      channels: ["Counter", "Pickup", "Delivery"],
      ticket: "Pack & hold ticket",
      stationNote: "Routed to the station printer. Deli and counter items print where they get made.",
      menu: {
        Beer: [
          { n: "6-Pack Domestic", p: 11.99, m: "Cold box", k: "", id: 1 },
          { n: "12-Pack Domestic", p: 19.99, m: "", k: "", id: 1 },
          { n: "Craft 4-Pack", p: 14.99, m: "", k: "", id: 1 },
          { n: "Single Tall Can", p: 3.49, m: "Bag it", k: "", id: 1 }
        ],
        "Wine & spirits": [
          { n: "Red Wine 750ml", p: 15.99, m: "", k: "", id: 1 },
          { n: "White Wine 750ml", p: 14.99, m: "Chilled", k: "", id: 1 },
          { n: "Vodka 1L", p: 24.99, m: "", k: "", id: 1 },
          { n: "Whiskey 750ml", p: 29.99, m: "Gift bag", k: "", id: 1 }
        ],
        Grocery: [
          { n: "Chips, Large Bag", p: 2.49, m: "", k: "" },
          { n: "Candy Bar", p: 2.29, m: "", k: "" },
          { n: "Bottled Water", p: 1.99, m: "", k: "" },
          { n: "Energy Drink", p: 3.79, m: "", k: "" },
          { n: "Paper Towels", p: 4.49, m: "", k: "" }
        ],
        Counter: [
          { n: "Deli Sandwich", p: 9.49, m: "Hero, no mayo", k: "DELI" },
          { n: "Breakfast Wrap", p: 6.99, m: "To go", k: "DELI" },
          { n: "Coffee, Large", p: 2.25, m: "Light & sweet", k: "COUNTER" },
          { n: "Gift Card", p: 25.00, m: "Load", k: "" }
        ]
      }
    }
  };

  var state = {
    venue: "Cafe",
    cat: "Counter",
    lines: [],
    channel: "In store",
    surcharge: false,
    rate: SURCHARGE_DEFAULT,
    tab: "reg",
    paid: null,
    idok: false,
    order: 418
  };

  function venue() { return VENUES[state.venue]; }
  function cats() { return Object.keys(venue().menu); }
  function items() { return venue().menu[state.cat] || []; }
  function needsId() {
    var i;
    for (i = 0; i < state.lines.length; i++) if (state.lines[i].id) return true;
    return false;
  }

  function money(v) { return "$" + (Math.round(v * 100) / 100).toFixed(2); }

  /* ids for the tab / tabpanel wiring below — a category name becomes "posCat-drinks" */
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "x";
  }

  /* The shared accessibility layer (assets/money/a11y.js) gives every role="tablist"
     in these demos arrow keys, Home and End. The tab strips below therefore carry a
     roving tabindex, as the ARIA tabs pattern wants: one tab stop for the strip, and
     the arrows move between the tabs. If that file is missing for any reason, the
     fallback handler at the bottom of this file takes the arrow keys instead, so the
     other tabs are never stranded out of reach of the keyboard. */
  function a11yOn() { return root.getAttribute("data-a11y") === "on"; }

  function tabAttrs(id, panelId, on) {
    return ' role="tab" id="' + id + '" aria-controls="' + panelId + '"' +
      ' aria-selected="' + (on ? "true" : "false") + '" tabindex="' + (on ? "0" : "-1") + '"';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function totals() {
    var sub = 0, i;
    for (i = 0; i < state.lines.length; i++) sub += state.lines[i].p * state.lines[i].q;
    var tax = sub * TAX;
    var base = sub + tax;
    var sur = state.surcharge ? base * (state.rate / 100) : 0;
    return { sub: sub, tax: tax, sur: sur, cash: base, card: base + sur };
  }

  function setVenue(v) {
    if (!VENUES[v] || v === state.venue) return;
    state.venue = v;
    state.cat = cats()[0];
    state.lines = [];
    state.channel = venue().channels[0];
    state.paid = null;
    state.idok = false;
    render();
  }

  function add(item) {
    var i;
    for (i = 0; i < state.lines.length; i++) {
      if (state.lines[i].n === item.n) { state.lines[i].q++; state.paid = null; render(); return; }
    }
    state.lines.push({ n: item.n, p: item.p, m: item.m, k: item.k, id: item.id ? 1 : 0, q: 1 });
    state.paid = null;
    render();
  }

  function bump(idx, d) {
    var l = state.lines[idx];
    if (!l) return;
    l.q += d;
    if (l.q <= 0) state.lines.splice(idx, 1);
    state.paid = null;
    render();
  }

  function tender(kind) {
    if (!state.lines.length) return;
    if (needsId() && !state.idok) return;
    var t = totals();
    state.paid = {
      kind: kind,
      amount: kind === "Cash" ? t.cash : t.card,
      t: t,
      lines: state.lines.slice(),
      order: state.order,
      channel: state.channel,
      venue: state.venue,
      idok: needsId() && state.idok ? 1 : 0,
      time: new Date()
    };
    state.order++;
    state.lines = [];
    state.idok = false;
    render();
    var out = root.querySelector("[data-out]");
    if (out && out.scrollIntoView) { try { out.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) { } }
  }

  function clock(d) {
    var h = d.getHours(), m = d.getMinutes(), ap = h >= 12 ? "PM" : "AM";
    h = h % 12; if (!h) h = 12;
    return h + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }

  /* ---------------- views ---------------- */

  function registerView() {
    var t = totals(), v = venue(), h = "", i;

    h += '<div class="macts" style="margin:0 0 14px">';
    h += '<span class="mtag pur">Register preset</span>';
    Object.keys(VENUES).forEach(function (key) {
      h += '<button type="button" class="mbtn ' + (state.venue === key ? "" : "g") +
        '" data-venue="' + esc(key) + '"' + (state.venue === key ? ' aria-current="true"' : '') + '>' +
        esc(VENUES[key].label) + '</button>';
    });
    h += '</div>';
    h += '<p class="note" style="margin:0 0 16px"><b>' + esc(v.name) + '.</b> ' + esc(v.blurb) +
      ' Switching the preset clears the ticket.</p>';

    h += '<div class="pos">';

    /* left: menu */
    h += '<div>';
    var cl = cats(), curCat = cl.indexOf(state.cat) < 0 ? cl[0] : state.cat;
    h += '<div class="pos__cats" role="tablist" aria-label="Menu category">';
    cl.forEach(function (c) {
      h += '<button type="button"' + tabAttrs("posCat-" + slug(c), "posMenu", c === curCat) +
        ' data-cat="' + esc(c) + '">' + esc(c) + '</button>';
    });
    h += '</div>';
    h += '<div class="pos__grid" id="posMenu" role="tabpanel" aria-labelledby="posCat-' +
      slug(curCat) + '">';
    items().forEach(function (it, n) {
      h += '<button type="button" class="pos__tile" data-add="' + n + '">' +
        '<strong>' + esc(it.n) + '</strong>' +
        '<span>' + money(it.p) + '</span>' +
        (it.k ? '<em>' + esc(it.k) + '</em>' : (it.id ? '<em>ID</em>' : '<em>&nbsp;</em>')) +
        '</button>';
    });
    h += '</div>';

    h += '<div class="macts"><span class="mtag cy">Order channel</span>';
    v.channels.forEach(function (c) {
      h += '<button type="button" class="mbtn ' + (state.channel === c ? "" : "g") +
        '" data-chan="' + esc(c) + '">' + esc(c) + '</button>';
    });
    h += '</div>';
    if (state.channel === "Delivery") {
      h += '<p class="note">Delivery tickets hand off to your own driver or to DoorDash Drive &mdash; ' +
        '<a href="ghost-kitchen.html#drive" style="color:#8FE9FB">see the dispatch demo</a>.</p>';
    }
    h += '</div>';

    /* right: ticket */
    h += '<div class="pos__ticket">';
    h += '<div class="pos__thead"><b>Order #' + state.order + '</b>' +
      '<span class="mtag pur">' + esc(state.channel) + '</span></div>';

    if (!state.lines.length) {
      h += '<div class="pos__empty">Tap an item to start a ticket.</div>';
    } else {
      h += '<ul class="pos__lines">';
      for (i = 0; i < state.lines.length; i++) {
        var l = state.lines[i];
        h += '<li class="pos__line">' +
          '<span class="qty"><button type="button" data-q="' + i + '" data-d="-1" aria-label="One less ' + esc(l.n) + '">&minus;</button>' +
          '<b>' + l.q + '</b>' +
          '<button type="button" data-q="' + i + '" data-d="1" aria-label="One more ' + esc(l.n) + '">+</button></span>' +
          '<span class="nm">' + esc(l.n) + (l.m ? '<em>' + esc(l.m) + '</em>' : '') + '</span>' +
          '<span class="amt">' + money(l.p * l.q) + '</span>' +
          '<button type="button" class="rm" data-rm="' + i + '" aria-label="Remove ' + esc(l.n) + '">&times;</button>' +
          '</li>';
      }
      h += '</ul>';
    }

    h += '<div class="pos__tot">';
    h += '<div class="l"><span>Subtotal</span><b>' + money(t.sub) + '</b></div>';
    h += '<div class="l"><span>Sales tax &middot; 8.75%</span><b>' + money(t.tax) + '</b></div>';
    if (state.surcharge) {
      h += '<div class="l sur"><span>Card price adds ' + state.rate + '%</span><b>' + money(t.sur) + '</b></div>';
      h += '<div class="l"><span>Cash price</span><b>' + money(t.cash) + '</b></div>';
      h += '<div class="l big"><span>Card price</span><b>' + money(t.card) + '</b></div>';
    } else {
      h += '<div class="l big"><span>Total</span><b>' + money(t.cash) + '</b></div>';
    }
    h += '</div>';

    h += '<label class="pos__sw"><input type="checkbox" data-sur' + (state.surcharge ? " checked" : "") +
      '><span class="tr"></span> Run a cash-discount / card-surcharge program</label>';
    if (state.surcharge) {
      h += '<div class="pos__sw" style="margin-top:8px">Card rate ' +
        '<input type="number" data-rate value="' + state.rate + '" min="0" max="10" step="0.25" ' +
        'style="width:74px;height:32px;padding:0 9px;border-radius:9px;background:rgba(255,255,255,.08);' +
        'border:1px solid rgba(255,255,255,.18);color:#fff;font-family:var(--font-mono);text-align:right" ' +
        'aria-label="Card surcharge percent"> %</div>';
    }

    /* age-restricted gate — the register will not tender until it is cleared */
    if (needsId()) {
      h += '<div data-idgate aria-live="polite" style="margin-top:14px;padding:12px 14px;border-radius:14px;' +
        'background:rgba(122,61,255,.16);border:1px solid rgba(155,107,255,.5)">';
      if (state.idok) {
        h += '<p style="margin:0;font-size:.8rem;color:#D9C9FF"><b>ID cleared for this ticket.</b> ' +
          'The register logs that the prompt was answered before tender.</p>';
      } else {
        h += '<p style="margin:0 0 10px;font-size:.8rem;color:#D9C9FF"><b>Age-restricted item on this ticket.</b> ' +
          'The register holds payment until the cashier answers the prompt.</p>' +
          '<button type="button" class="mbtn" data-idok>ID checked &mdash; continue</button>';
      }
      h += '</div>';
    }

    h += '<div class="pos__pay">';
    h += payBtn("Card", '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>');
    h += payBtn("Cash", '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>');
    h += payBtn("Tap", '<path d="M8 6a8 8 0 0 1 0 12"/><path d="M12 3a12 12 0 0 1 0 18"/><circle cx="4" cy="12" r="1.6"/>');
    h += '</div>';
    h += '</div>';

    h += '</div>';

    if (state.paid) h += receipt(state.paid);
    return h;
  }

  function payBtn(label, path) {
    var off = !state.lines.length || (needsId() && !state.idok);
    return '<button type="button" data-pay="' + label + '"' + (off ? " disabled" : "") + '>' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>' +
      label + '</button>';
  }

  function receipt(p) {
    var v = VENUES[p.venue] || venue();
    var h = '<div class="pos__out" data-out>';

    h += '<div class="rcpt"><div class="stripe"></div>' +
      '<h5>' + esc(v.name) + '</h5>' +
      '<div class="meta">Order #' + p.order + ' &middot; ' + esc(p.channel) + '<br>' +
      clock(p.time) + ' &middot; Paid by ' + esc(p.kind) + '<br>' +
      (p.idok ? 'ID prompt answered at the register<br>' : '') +
      'Register 1 &middot; Powered by Piets</div>' +
      '<table>';
    p.lines.forEach(function (l) {
      h += '<tr><td>' + l.q + ' &times; ' + esc(l.n) + '</td><td class="n">' + money(l.p * l.q) + '</td></tr>';
    });
    h += '</table><div class="tt">' +
      '<div class="l"><span>Subtotal</span><span>' + money(p.t.sub) + '</span></div>' +
      '<div class="l"><span>Sales tax 8.75%</span><span>' + money(p.t.tax) + '</span></div>';
    if (p.kind !== "Cash" && p.t.sur > 0) {
      h += '<div class="l"><span>Card price adjustment</span><span>' + money(p.t.sur) + '</span></div>';
    }
    h += '<div class="l big"><span>' + esc(p.kind) + '</span><span>' + money(p.amount) + '</span></div></div>';
    h += '<div class="ft">Piets Technology Solutions Inc &middot; 631-871-5957 &middot; pietstechsolutions.com<br>' +
      'Sample receipt. No card was read and nothing was sent.</div></div>';

    var kitchen = p.lines.filter(function (l) { return l.k; });
    h += '<div class="kds"><h5><span>' + esc(v.ticket) + ' #' + p.order + '</span><span>' + clock(p.time) + '</span></h5>';
    if (!kitchen.length) {
      h += '<p style="margin:0;color:#6FBF9C">No station items on this order &mdash; nothing printed.</p>';
    } else {
      h += '<ul>';
      kitchen.forEach(function (l) {
        h += '<li><span>' + l.q + '&times;</span>' + esc(l.n.toUpperCase()) +
          (l.m ? '<em>&raquo; ' + esc(l.m) + '</em>' : '') + '</li>';
      });
      h += '</ul>';
    }
    h += '<p style="margin:12px 0 0;color:#6FBF9C;font-size:.72rem">' + esc(v.stationNote) + '</p></div>';

    h += '</div>';
    return h;
  }

  function officeView() {
    var rows = [
      ["Card &mdash; tap & chip", "$3,418.60", "182 sales", "ok"],
      ["Cash drawer", "$612.25", "41 sales", ""],
      ["Delivery platforms", "$1,944.10", "63 orders", "pur"],
      ["Gift cards sold", "$175.00", "7 sales", ""],
      ["Voids &amp; comps", "$84.50", "6 tickets", "warn"],
      ["Tips to staff", "$511.35", "pooled", "cy"]
    ];
    var h = '<h4>Yesterday, all channels in one place</h4>' +
      '<p class="sub">Sample day. Your real numbers land here whether the order came from the counter, ' +
      'the phone or a delivery app.</p>';
    h += '<div class="mk">' +
      '<div><b>286</b><span>Tickets</span></div>' +
      '<div><b>$6,149.95</b><span>Gross sales</span></div>' +
      '<div class="pur"><b>$21.50</b><span>Average ticket</span></div>' +
      '<div class="good"><b>99.4%</b><span>Auth approval</span></div>' +
      '</div>';
    h += '<div class="mrows">';
    rows.forEach(function (r) {
      h += '<div class="r"><b>' + r[0] + '</b><span class="m">' + r[2] + '</span>' +
        '<span class="tail"><span class="mtag ' + r[3] + '">' + r[1] + '</span></span></div>';
    });
    h += '</div>';
    h += '<div class="macts">' +
      '<button type="button" class="mbtn g" data-tab="reg">Back to the register</button>' +
      '<a class="mbtn" href="plan.html">Get this set up</a></div>';
    h += '<p class="note">Sample figures for the demo only &mdash; not a Piets performance claim. ' +
      'Your own reporting is built from your own sales.</p>';
    return h;
  }

  function hardwareView() {
    var kit = [
      ["Counter terminal", "Touchscreen register, cash drawer, customer-facing display", "ok"],
      ["Handheld", "Take the order and the payment at the table or the curb", "ok"],
      ["Kitchen printer / KDS", "Grill, bar and expo each get only their own tickets", "ok"],
      ["Tap reader", "Contactless, chip and swipe, plus phone wallets", "ok"],
      ["Online ordering", "Your own page, your own customer list, your own margin", "pur"],
      ["Back-of-house network", "The wiring, switch, Wi-Fi and failover it all rides on", "cy"]
    ];
    var h = '<h4>What actually gets installed</h4>' +
      '<p class="sub">Piets wires it, programs it and supports it &mdash; the same person who quotes the job.</p>';
    h += '<div class="mrows">';
    kit.forEach(function (k) {
      h += '<div class="r"><b>' + k[0] + '</b><span class="m">' + k[1] + '</span>' +
        '<span class="tail"><span class="mtag ' + k[2] + '">included</span></span></div>';
    });
    h += '</div>';
    h += '<div class="callout" style="margin-top:18px">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M3 7h11a2 2 0 0 1 2 2v1l4-2.5v9L16 14v1a2 2 0 0 1-2 2H3z"/></svg>' +
      '<p><b>Cameras over the register.</b> Because Piets installs the cameras too, a void or a no-sale ' +
      'can be pulled up next to the footage of the drawer at that second. One system, one phone call.</p></div>';
    h += '<div class="macts"><button type="button" class="mbtn g" data-tab="reg">Back to the register</button>' +
      '<a class="mbtn" href="plan.html">Book a walkthrough</a></div>';
    return h;
  }

  /* ---------------- render ---------------- */

  function render() {
    var tabs = [["reg", "Register"], ["office", "Back office"], ["kit", "What gets installed"]];
    var h = '<div class="mcon">';
    h += '<div class="mcon__bar"><span class="mcon__lg"><i></i></span>' +
      '<b>Piets POS &middot; ' + esc(venue().name) + '</b><span class="mcon__demo">Demo</span>' +
      '<span class="mcon__live">Live in your browser</span></div>';
    var keys = tabs.map(function (t) { return t[0]; });
    var curTab = keys.indexOf(state.tab) < 0 ? keys[0] : state.tab;
    h += '<div class="mcon__tabs" role="tablist" aria-label="POS sections">';
    tabs.forEach(function (t) {
      h += '<button type="button"' + tabAttrs("posTab-" + t[0], "posPanel", t[0] === curTab) +
        ' data-tab="' + t[0] + '">' + t[1] + '</button>';
    });
    h += '</div><div class="mcon__body" id="posPanel" role="tabpanel" aria-labelledby="posTab-' +
      curTab + '">';
    h += state.tab === "office" ? officeView() : state.tab === "kit" ? hardwareView() : registerView();
    h += '</div></div>';
    root.innerHTML = h;
  }

  root.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-add],[data-q],[data-rm],[data-cat],[data-pay],[data-tab],[data-chan],[data-venue],[data-idok]") : null;
    if (!el || !root.contains(el)) return;
    if (el.hasAttribute("data-add")) { add(items()[+el.getAttribute("data-add")]); return; }
    if (el.hasAttribute("data-q")) { bump(+el.getAttribute("data-q"), +el.getAttribute("data-d")); return; }
    if (el.hasAttribute("data-rm")) { state.lines.splice(+el.getAttribute("data-rm"), 1); state.paid = null; render(); return; }
    if (el.hasAttribute("data-cat")) { state.cat = el.getAttribute("data-cat"); render(); return; }
    if (el.hasAttribute("data-venue")) { setVenue(el.getAttribute("data-venue")); return; }
    if (el.hasAttribute("data-chan")) { state.channel = el.getAttribute("data-chan"); render(); return; }
    if (el.hasAttribute("data-idok")) { state.idok = true; render(); return; }
    if (el.hasAttribute("data-pay")) { tender(el.getAttribute("data-pay")); return; }
    if (el.hasAttribute("data-tab")) { state.tab = el.getAttribute("data-tab"); render(); return; }
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
    all[n].click();
    var want = all[n].getAttribute("id");
    var back = want ? root.querySelector('[id="' + want + '"]') : null;
    if (back) { try { back.focus({ preventScroll: true }); } catch (err) { back.focus(); } }
  });

  root.addEventListener("change", function (e) {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-sur")) {
      state.surcharge = !!e.target.checked; render();
    }
  });

  root.addEventListener("input", function (e) {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-rate")) {
      var v = parseFloat(e.target.value);
      state.rate = isNaN(v) ? 0 : Math.max(0, Math.min(10, v));
      var t = totals();
      var box = root.querySelector(".pos__tot");
      if (box) {
        box.innerHTML =
          '<div class="l"><span>Subtotal</span><b>' + money(t.sub) + '</b></div>' +
          '<div class="l"><span>Sales tax &middot; 8.75%</span><b>' + money(t.tax) + '</b></div>' +
          '<div class="l sur"><span>Card price adds ' + state.rate + '%</span><b>' + money(t.sur) + '</b></div>' +
          '<div class="l"><span>Cash price</span><b>' + money(t.cash) + '</b></div>' +
          '<div class="l big"><span>Card price</span><b>' + money(t.card) + '</b></div>';
      }
    }
  });

  try { render(); } catch (err) { root.innerHTML = '<p class="note">The register demo could not start in this browser. Call 631-871-5957 and we will walk you through it.</p>'; }
})();
