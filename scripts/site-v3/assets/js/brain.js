/* Piets — Brain shell motion for inner pages (no WebGL).
   Draws the wire + port in each page header, adds the page's live mini-visual,
   lights card ports as they scroll in, and pauses everything off screen or in a
   hidden tab. Decorative only: every page is complete with this file missing.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake. */
(function () {
  "use strict";
  var d = document, root = d.documentElement;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";
  var io = "IntersectionObserver" in window;

  /* hidden tab: pause every CSS animation we own */
  d.addEventListener("visibilitychange", function () { root.classList.toggle("tab-hidden", d.hidden); });

  /* ---------- 1. the wire in the page header ---------- */
  function headWire(head) {
    if (head.querySelector(".bw-head")) return;
    var box = d.createElement("div"); box.className = "bw-head"; box.setAttribute("aria-hidden", "true");
    var svg = d.createElementNS(NS, "svg"); box.appendChild(svg); head.insertBefore(box, head.firstChild);
    function draw() {
      var w = head.clientWidth, h = head.clientHeight; if (!w || !h) return;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      var y1 = h - 26, x0 = Math.max(16, (w - 1200) / 2 + 16);
      var y0 = h - 70; var p1 = "M-10 " + y0 + " C" + (w * .15) + " " + y0 + " " + (w * .2) + " " + y1 + " " + (w * .4) + " " + y1 + " H" + (w + 10);
      var py = h * .86; var p2 = "M" + (w + 10) + " " + (h * .12) + " C" + (w * .86) + " " + (h * .12) + " " + (w * .8) + " " + py + " " + (w * .68) + " " + py + " H" + (w * .64);
      var p3 = "M" + x0 + " " + (h + 10) + " V" + (h - 8);
      var html = "";
      [p1, p2, p3].forEach(function (p) { html += '<path class="bw-bg" d="' + p + '"/>'; });
      html += '<path class="bw-fg" pathLength="1" d="' + p1 + '"/><path class="bw-fg p" pathLength="1" d="' + p2 + '"/><path class="bw-fg o" pathLength="1" d="' + p3 + '"/>';
      html += '<circle class="bw-port" cx="' + (w * .64) + '" cy="' + py + '" r="6"/>';
      if (!reduced) html += '<circle class="bw-pk" r="2.6"><animateMotion dur="3.2s" repeatCount="indefinite" path="' + p1 + '"/></circle>';
      svg.innerHTML = html;
    }
    draw();
    var t; addEventListener("resize", function () { clearTimeout(t); t = setTimeout(draw, 150); });
    requestAnimationFrame(function () { box.classList.add("on"); });
  }

  /* ---------- 2. the page's live mini-visual ---------- */
  var V = {
    cam: '<div class="noise"></div><svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice"><g class="ln"><path d="M30 118 L30 72 L82 38 L134 72 L134 118"/><rect x="46" y="84" width="18" height="14"/><rect x="100" y="84" width="18" height="14"/><rect x="71" y="92" width="22" height="26"/><path d="M134 118 V82 H208 V118"/><path d="M142 88 H200 M142 96 H200 M142 104 H200 M142 112 H200"/><path d="M0 118 H320"/><path d="M156 180 L168 118 M240 180 L192 118"/><path d="M270 118 V78 M270 78 q0 -8 8 -8 h18"/></g></svg><div class="scan"></div><div class="box" style="left:44%;top:56%;width:52px;height:30px"></div><span class="lbl tl"><i></i>LIVE · 4K</span><span class="lbl tr" data-bclock>00:00:00</span><span class="lbl bl">CAM 1 · DRIVEWAY</span><span class="lbl br">Sample view</span>',
    wifi: '<svg viewBox="0 0 320 180"><path id="bA" class="ln" d="M160 50 C120 80 70 100 58 134"/><path id="bB" class="ln" d="M160 50 L160 132"/><path id="bC" class="ln" d="M160 50 C200 80 250 100 262 134"/><circle class="ring" cx="160" cy="46" r="16"/><circle class="ring" cx="160" cy="46" r="16"/><circle class="ring" cx="160" cy="46" r="16"/><rect x="140" y="36" width="40" height="20" rx="10" fill="#0A1A38" stroke="#00E1FF"/><circle cx="160" cy="46" r="3" fill="#00E1FF"/><rect class="ln" x="36" y="134" width="44" height="26" rx="3"/><rect class="ln" x="148" y="132" width="24" height="38" rx="5"/><rect class="ln" x="246" y="136" width="32" height="20" rx="4"/><text x="36" y="176">LAPTOP</text><text x="146" y="178">PHONE</text><text x="240" y="172">CAMERA</text><text x="186" y="40">ACCESS POINT</text>' +
      '<circle r="3.2" fill="#00E1FF"><animateMotion dur="1.8s" repeatCount="indefinite"><mpath href="#bA"/></animateMotion></circle><circle r="3.2" fill="#FF8A2B"><animateMotion dur="1.8s" begin=".9s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#bA"/></animateMotion></circle><circle r="3.2" fill="#00E1FF"><animateMotion dur="1.3s" begin=".3s" repeatCount="indefinite"><mpath href="#bB"/></animateMotion></circle><circle r="3.2" fill="#00E1FF"><animateMotion dur="2.1s" begin=".6s" repeatCount="indefinite"><mpath href="#bC"/></animateMotion></circle><circle r="3.2" fill="#FF8A2B"><animateMotion dur="2.1s" begin="1.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#bC"/></animateMotion></circle></svg>',
    fiber: function () {
      var cols = ["#00E1FF", "#00E1FF", "#1E8BFF", "#1E8BFF", "#FF8A2B", "#FF8A2B", "#7B5CFF"], h = '<svg viewBox="0 0 320 180">';
      cols.forEach(function (c, i) { var y0 = 34 + i * 19, y1 = 66 + i * 8, p = "M10 " + y0 + " C120 " + y0 + " 150 " + y1 + " 262 " + y1;
        h += '<path d="' + p + '" fill="none" stroke="' + c + '" stroke-opacity=".28" stroke-width="2"/><path class="flow" d="' + p + '" stroke="' + c + '" style="color:' + c + ';animation-delay:-' + (i * .23).toFixed(2) + 's"/>'; });
      h += '<rect x="262" y="56" width="40" height="68" rx="6" fill="#0A1A38" stroke="#2B4A78"/>';
      for (var k = 0; k < 5; k++) h += '<rect x="270" y="' + (64 + k * 12) + '" width="24" height="6" rx="2" fill="#1E8BFF" class="glow" style="animation-delay:-' + (k * .4) + 's"/>';
      return h + '<text x="262" y="140">PATCH</text><text x="14" y="20">FIBER · CAT6 · CAT6A</text><text x="14" y="168" style="fill:#38F2A0">LABELED · TESTED · DOCUMENTED</text></svg>';
    },
    fob: '<svg viewBox="0 0 320 180"><rect x="196" y="30" width="60" height="120" rx="12" fill="#0A1A38" stroke="#2B4A78"/><circle class="led" cx="226" cy="46" r="5"/><circle cx="226" cy="90" r="16" fill="none" stroke="#5E7493" stroke-dasharray="3 3"/><g fill="#1B3460"><rect x="206" y="116" width="10" height="7" rx="2"/><rect x="221" y="116" width="10" height="7" rx="2"/><rect x="236" y="116" width="10" height="7" rx="2"/><rect x="206" y="128" width="10" height="7" rx="2"/><rect x="221" y="128" width="10" height="7" rx="2"/><rect x="236" y="128" width="10" height="7" rx="2"/></g><g class="fob"><path d="M122 74 h28 a12 12 0 0 1 12 12 v8 a12 12 0 0 1 -12 12 h-28 z" fill="#0E2550" stroke="#00E1FF" stroke-width="1.4"/><circle cx="114" cy="90" r="9" fill="none" stroke="#97ADC9" stroke-width="1.6"/></g><text x="20" y="26" class="msg">PRESENT FOB</text><text x="20" y="26" class="msg2" style="fill:#38F2A0">ACCESS GRANTED</text><text x="20" y="168">SAMPLE DOOR · OFFICE</text></svg>',
    voip: function () {
      var h = '<svg viewBox="0 0 320 180"><text x="16" y="24">INCOMING · SAMPLE</text><g class="eq">';
      for (var i = 0; i < 26; i++) { var hh = 8 + 26 * Math.sin(Math.PI * i / 25); h += '<rect x="' + (16 + i * 6) + '" y="' + (58 - hh / 2) + '" width="3.4" height="' + hh.toFixed(1) + '" rx="1.5" style="animation-delay:-' + ((i * .13) % 1).toFixed(2) + 's"/>'; }
      h += '</g><path id="vR" class="ln" d="M180 58 C220 58 220 30 260 30 M180 58 H260 M180 58 C220 58 220 86 260 86"/>';
      h += '<g><rect x="260" y="20" width="50" height="20" rx="6" fill="#0A1A38" stroke="#2B4A78"/><text x="267" y="34" style="fill:#CFE6FF">1 NEW</text><rect x="260" y="48" width="50" height="20" rx="6" fill="#0A1A38" stroke="#2B4A78"/><text x="267" y="62" style="fill:#CFE6FF">2 BILL</text><rect x="260" y="76" width="50" height="20" rx="6" fill="#0A1A38" stroke="#00E1FF"/><text x="267" y="90" style="fill:#00E1FF">3 24/7</text></g>';
      h += '<path class="flow cy" style="color:#00E1FF" d="M180 58 C220 58 220 86 260 86"/><rect x="16" y="112" width="288" height="44" rx="10" fill="#0A1A38" stroke="#2B4A78"/><text x="30" y="132" style="fill:#CFE6FF">AUTO-ATTENDANT</text><text x="30" y="146" class="glow" style="fill:#38F2A0">RINGING YOUR MOBILE APP…</text></svg>';
      return h;
    },
    pos: '<svg viewBox="0 0 320 180"><rect x="14" y="20" width="168" height="140" rx="12" fill="#0A1A38" stroke="#2B4A78"/><text x="26" y="40">REGISTER · SAMPLE CAFE</text><g><rect x="26" y="50" width="70" height="30" rx="7" fill="#0E2550" stroke="#00E1FF"/><text x="32" y="69" style="fill:#CFE6FF">COLD BREW</text><rect x="102" y="50" width="70" height="30" rx="7" fill="#0E2550" stroke="#2B4A78"/><text x="108" y="69" style="fill:#CFE6FF">PASTRY</text><rect x="26" y="86" width="70" height="30" rx="7" fill="#0E2550" stroke="#2B4A78"/><text x="32" y="105" style="fill:#CFE6FF">TOAST</text><rect x="102" y="86" width="70" height="30" rx="7" fill="#0E2550" stroke="#00E1FF"/><text x="108" y="105" style="fill:#CFE6FF">SANDWICH</text></g><rect x="26" y="124" width="146" height="26" rx="7" fill="#38F2A0" class="glow"/><text x="76" y="141" style="fill:#03130B">CHARGE</text><path class="flow or" style="color:#FF8A2B" d="M182 90 C210 90 210 60 236 60"/><rect x="236" y="22" width="72" height="136" rx="8" fill="#0A1A38" stroke="#2B4A78"/><text x="244" y="40">KITCHEN</text><g class="print"><rect x="244" y="48" width="56" height="82" rx="3" fill="#EAF5FF"/><g fill="#02122B"><rect x="250" y="58" width="40" height="4"/><rect x="250" y="68" width="30" height="4"/><rect x="250" y="78" width="36" height="4"/><rect x="250" y="88" width="24" height="4"/></g><text x="252" y="118" class="tick" style="fill:#0A8A55;font-size:11px">PAID</text></g></svg>',
    home: '<svg viewBox="0 0 320 180"><path id="hA" class="ln" d="M160 90 C120 90 90 50 56 46"/><path id="hB" class="ln" d="M160 90 C200 90 230 50 264 46"/><path id="hC" class="ln" d="M160 90 C120 90 90 134 56 138"/><path id="hD" class="ln" d="M160 90 C200 90 230 134 264 138"/><circle class="ring" cx="160" cy="90" r="14"/><circle class="ring" cx="160" cy="90" r="14"/><rect x="138" y="78" width="44" height="24" rx="8" fill="#0A1A38" stroke="#7B5CFF"/><text x="146" y="94" style="fill:#CFE6FF">HUB</text><g fill="#0A1A38" stroke="#2B4A78"><rect x="26" y="32" width="54" height="26" rx="7"/><rect x="240" y="32" width="54" height="26" rx="7"/><rect x="26" y="124" width="54" height="26" rx="7"/><rect x="240" y="124" width="54" height="26" rx="7"/></g><text x="34" y="49" style="fill:#CFE6FF">LIGHTS</text><text x="250" y="49" style="fill:#CFE6FF">LOCKS</text><text x="34" y="141" style="fill:#CFE6FF">SHADES</text><text x="246" y="141" style="fill:#CFE6FF">THERMO</text><text x="98" y="176">LOCAL · PRIVATE · NO CLOUD FEE</text>' +
      '<circle r="3" fill="#7B5CFF"><animateMotion dur="1.6s" repeatCount="indefinite"><mpath href="#hA"/></animateMotion></circle><circle r="3" fill="#00E1FF"><animateMotion dur="1.9s" begin=".4s" repeatCount="indefinite"><mpath href="#hB"/></animateMotion></circle><circle r="3" fill="#00E1FF"><animateMotion dur="1.7s" begin=".8s" repeatCount="indefinite"><mpath href="#hC"/></animateMotion></circle><circle r="3" fill="#7B5CFF"><animateMotion dur="2.1s" begin="1.1s" repeatCount="indefinite"><mpath href="#hD"/></animateMotion></circle></svg>',
    lights: function () {
      var h = '<svg viewBox="0 0 320 180"><path class="ln" d="M20 110 L20 70 L100 26 L180 70 L180 110 Z M180 110 H300 V76 H180"/><path d="M14 72 L100 24 L186 72 L306 72" fill="none" stroke="#2B4A78" stroke-width="1.5"/>';
      var cols = ["#00E1FF", "#7B5CFF", "#1E8BFF", "#FF8A2B"], pts = [];
      for (var i = 0; i <= 10; i++) pts.push([14 + i * 8.6, 72 - i * 4.8]);
      for (i = 1; i <= 10; i++) pts.push([100 + i * 8.6, 24 + i * 4.8]);
      for (i = 1; i <= 14; i++) pts.push([186 + i * 8.5, 72]);
      pts.forEach(function (p, k) { h += '<circle cx="' + p[0].toFixed(1) + '" cy="' + (p[1] + 2).toFixed(1) + '" r="2.6" fill="' + cols[k % 4] + '" class="glow" style="filter:drop-shadow(0 0 4px ' + cols[k % 4] + ');animation-delay:-' + ((k * .17) % 2.6).toFixed(2) + 's"/>'; });
      return h + '<text x="14" y="168">PERMANENT TRACK · FROM YOUR PHONE</text></svg>';
    },
    remote: '<svg viewBox="0 0 320 180"><rect x="16" y="40" width="110" height="74" rx="8" fill="#0A1A38" stroke="#2B4A78"/><rect x="194" y="40" width="110" height="74" rx="8" fill="#0A1A38" stroke="#00E1FF"/><path d="M56 128 h30 M71 114 v14 M234 128 h30 M249 114 v14" stroke="#2B4A78" stroke-width="2"/><g fill="#1B3460"><rect x="26" y="52" width="60" height="6" rx="2"/><rect x="26" y="64" width="80" height="6" rx="2"/><rect x="26" y="76" width="50" height="6" rx="2"/></g><g fill="#1E8BFF" class="glow"><rect x="204" y="52" width="60" height="6" rx="2"/><rect x="204" y="64" width="80" height="6" rx="2"/><rect x="204" y="76" width="50" height="6" rx="2"/></g><path class="ln" d="M126 77 H194"/><path class="flow cy" style="color:#00E1FF" d="M126 77 H194"/><rect x="146" y="66" width="28" height="22" rx="5" fill="#0A1A38" stroke="#38F2A0"/><path d="M154 72 v-3 a6 6 0 0 1 12 0 v3" fill="none" stroke="#38F2A0" stroke-width="1.6"/><text x="22" y="30">YOUR SCREEN</text><text x="214" y="30">PIETS TECH</text><text x="64" y="168" style="fill:#38F2A0">SECURE SESSION · ENDS WHEN YOU CLOSE IT</text></svg>'
  };
  var MAP = {
    "security-cameras": "cam", "wifi-networking": "wifi", "structured-cabling": "fiber", "access-control": "fob",
    "payments": "pos", "ghost-kitchen": "pos", "services": "voip", "smart-home": "home", "lighting": "lights",
    "it-support": "remote", "remote-support": "remote", "commercial": "fiber", "plans": "wifi", "design-studio": "cam"
  };
  function miniVisual(head) {
    var slug = location.pathname.replace(/^\/+|\/+$/g, "").replace(/\.html$/, "").split("/").pop() || "";
    var key = MAP[slug]; if (!key || head.querySelector(".bmv")) return;
    var src = V[key]; var html = typeof src === "function" ? src() : src;
    var box = d.createElement("div"); box.className = "bmv bmv--" + key; box.setAttribute("aria-hidden", "true"); box.innerHTML = html;
    var host = head.querySelector(".wrap") || head; host.appendChild(box); head.classList.add("has-bmv");
    var clk = box.querySelector("[data-bclock]");
    if (clk) { var tick = function () { if (!box.classList.contains("paused")) clk.textContent = new Date().toTimeString().slice(0, 8); }; tick(); setInterval(tick, 1000); }
    watch(box);
  }

  /* ---------- 3. pause off screen ---------- */
  var pauseIO = io ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      e.target.classList.toggle("paused", !e.isIntersecting);
      var svgs = e.target.querySelectorAll("svg");
      for (var i = 0; i < svgs.length; i++) { try { e.isIntersecting ? svgs[i].unpauseAnimations() : svgs[i].pauseAnimations(); } catch (x) {} }
    });
  }, { rootMargin: "60px" }) : null;
  function watch(el) { if (pauseIO) pauseIO.observe(el); }
  d.addEventListener("visibilitychange", function () {
    var s = d.querySelectorAll(".bmv svg,.bw-head svg");
    for (var i = 0; i < s.length; i++) { try { d.hidden ? s[i].pauseAnimations() : s[i].unpauseAnimations(); } catch (x) {} }
  });

  /* ---------- 4. card ports light up as they arrive ---------- */
  function ports() {
    var cards = d.querySelectorAll(".card,.post-card,.plan-card,.serve-card,.hm-svc");
    if (!io || reduced) { for (var i = 0; i < cards.length; i++) cards[i].classList.add("bw-live"); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("bw-live"); o.unobserve(e.target); } }); }, { rootMargin: "0px 0px -18% 0px" });
    for (var j = 0; j < cards.length; j++) o.observe(cards[j]);
  }

  function init() {
    if (!d.body.classList.contains("brain")) return;
    var head = d.querySelector("main .page-head") || d.querySelector(".phero");
    if (head) { headWire(head); miniVisual(head); var w = head.querySelector(".bw-head svg"); if (w) watch(head.querySelector(".bw-head")); }
    ports();
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", init); else init();
})();
