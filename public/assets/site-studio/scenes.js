/* Piets Site Studio — live hero scenes (one per trade). viewBox 0 0 640 360.
   Colors come from CSS vars: --a (brand), --a2 (brand light), --sky1/--sky2 (scene sky).
   Piets Technology Solutions Inc · 631-871-5957 */
(function (g) {
  'use strict';
  var defs = '<defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sk1"/><stop offset="1" class="sk2"/></linearGradient>' +
    '<linearGradient id="cuG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3be8a"/><stop offset=".5" stop-color="#c07a3e"/><stop offset="1" stop-color="#6a3a18"/></linearGradient>' +
    '<radialGradient id="glowG"><stop offset="0" class="gl1"/><stop offset="1" stop-opacity="0" class="gl2"/></radialGradient></defs>';
  var sky = '<rect width="640" height="360" fill="url(#skyG)"/>';
  function stars(n) { var s = ''; for (var i = 0; i < n; i++) { var x = (i * 97) % 640, y = (i * 53) % 150; s += '<circle class="star" style="animation-delay:' + (i % 7) * 0.4 + 's" cx="' + x + '" cy="' + (y + 8) + '" r="' + (i % 3 ? 1 : 1.6) + '" fill="#fff" opacity=".7"/>'; } return s; }
  function label(x, y, t) { return '<text class="lbl" x="' + x + '" y="' + y + '">' + t + '</text>'; }
  function house(x, y, w, h) {
    return '<g><polygon points="' + (x - 14) + ',' + y + ' ' + (x + w / 2) + ',' + (y - h * 0.55) + ' ' + (x + w + 14) + ',' + y + '" fill="#0f2235" stroke="#2a4a68" stroke-width="2"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#13283d" stroke="#2a4a68" stroke-width="2"/>' +
      '<rect class="win" x="' + (x + 18) + '" y="' + (y + 18) + '" width="34" height="28" rx="2"/><rect class="win" x="' + (x + w - 52) + '" y="' + (y + 18) + '" width="34" height="28" rx="2" style="animation-delay:1.2s"/></g>';
  }

  var S = {};
  S.pipes = function () {
    return defs + sky + stars(22) + '<rect y="300" width="640" height="60" fill="#0a1622"/>' + house(150, 150, 300, 150) +
      '<path d="M60 320 H200 V250 H300 V200 H400" fill="none" stroke="url(#cuG)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path class="flow sa2" d="M60 320 H200 V250 H300 V200 H400" fill="none" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M300 250 V285 H520" fill="none" stroke="url(#cuG)" stroke-width="12" stroke-linecap="round"/>' +
      '<path class="flow hot" d="M300 250 V285 H520" fill="none" stroke-width="4" stroke-linecap="round"/>' +
      '<rect x="380" y="180" width="60" height="16" rx="4" fill="#8aa6bd"/><rect x="396" y="168" width="10" height="16" fill="#8aa6bd"/>' +
      '<g class="drip"><circle cx="401" cy="204" r="3" class="ac2"/><circle cx="401" cy="204" r="3" class="ac2" style="animation-delay:.4s"/></g>' +
      '<rect x="470" y="220" width="56" height="80" rx="10" fill="#1d3a55" stroke="#4d7a9e" stroke-width="2"/><circle class="flame" cx="498" cy="290" r="6" fill="#ff8a3d"/>' +
      '<circle cx="90" cy="300" r="20" fill="#0d1e2e" stroke="#6b8aa3" stroke-width="3"/><line class="needle" x1="90" y1="300" x2="90" y2="286" stroke="#ff5b52" stroke-width="3" stroke-linecap="round"/>' +
      label(62, 340, 'MAIN 62 PSI') + label(470, 214, 'HOT 120°F');
  };
  S.hvac = function () {
    var w = ''; for (var i = 0; i < 4; i++) w += '<path class="air sa2" style="animation-delay:' + i * 0.3 + 's" d="M200 ' + (190 + i * 22) + ' q 25 -10 50 0 t 50 0 t 50 0 t 50 0" fill="none" stroke-width="3" stroke-linecap="round"/>';
    return defs + sky + stars(16) + '<rect y="300" width="640" height="60" fill="#0a1622"/>' + house(170, 150, 300, 150) + w +
      '<g transform="translate(520 240)"><rect x="-46" y="-40" width="92" height="80" rx="8" fill="#1a3149" stroke="#4d7a9e" stroke-width="2"/><circle r="28" fill="#0c1a28" stroke="#4d7a9e" stroke-width="2"/>' +
      '<g class="spin"><path d="M0 0 L0 -24 A10 10 0 0 1 10 -6Z M0 0 L22 10 A10 10 0 0 1 4 14Z M0 0 L-22 12 A10 10 0 0 1 -14 -6Z" class="ac"/></g><circle r="4" fill="#fff"/></g>' +
      '<rect x="390" y="170" width="44" height="58" rx="8" fill="#0c1a28" stroke="#4d7a9e"/><text class="temp" x="412" y="205" text-anchor="middle">72°</text>' + label(474, 300, 'CONDENSER ON');
  };
  S.electric = function () {
    var p = ['M60 80 H220 V180 H330', 'M60 280 H180 V200 H330', 'M580 90 H430 V170 H350', 'M580 280 H460 V210 H350', 'M330 180 H350 M330 200 H350'];
    var t = ''; p.forEach(function (d, i) { t += '<path d="' + d + '" fill="none" stroke="#24405c" stroke-width="5" stroke-linecap="round"/><path class="pulse sa2" style="animation-delay:' + i * 0.35 + 's" d="' + d + '" fill="none" stroke-width="5" stroke-linecap="round"/>'; });
    var b = ''; [[60, 80], [60, 280], [580, 90], [580, 280]].forEach(function (c, i) { b += '<circle class="bulb" style="animation-delay:' + i * 0.5 + 's" cx="' + c[0] + '" cy="' + c[1] + '" r="16" fill="url(#glowG)"/><circle cx="' + c[0] + '" cy="' + c[1] + '" r="7" class="ac2"/>'; });
    var br = ''; for (var i = 0; i < 6; i++) br += '<rect x="' + (300 + (i % 2) * 42) + '" y="' + (150 + Math.floor(i / 2) * 28) + '" width="34" height="18" rx="3" fill="' + (i === 3 ? '#ff5b52' : '#2e4a66') + '"/>';
    return defs + '<rect width="640" height="360" fill="#081521"/>' + t + b + '<rect x="288" y="130" width="96" height="110" rx="8" fill="#0f2235" stroke="#4d7a9e" stroke-width="2"/>' + br + label(296, 262, '200A PANEL');
  };
  S.lawn = function () {
    var stripes = ''; for (var i = 0; i < 5; i++) stripes += '<rect class="stripe" style="animation-delay:' + i * 0.9 + 's" x="40" y="' + (230 + i * 24) + '" width="560" height="12" fill="#ffffff" opacity=".16"/>';
    return defs + sky + '<circle class="sunp" cx="540" cy="70" r="30" fill="#ffe27a"/>' + '<path d="M0 220 Q160 160 320 210 T640 200 V360 H0Z" fill="#3a8f4c"/>' +
      '<rect y="222" width="640" height="138" class="grass"/>' + stripes +
      '<g class="sway"><rect x="86" y="140" width="12" height="90" fill="#5b3a22"/><circle cx="92" cy="130" r="44" fill="#2f8f45"/></g>' +
      '<g class="mower"><rect x="0" y="-22" width="54" height="22" rx="6" class="ac"/><rect x="40" y="-46" width="5" height="26" fill="#cfd8dc" transform="rotate(-20 42 -30)"/><circle cx="10" cy="2" r="8" fill="#111"/><circle cx="44" cy="2" r="8" fill="#111"/></g>';
  };
  S.road = function () {
    return defs + sky + stars(26) + '<rect y="250" width="640" height="110" fill="#14171c"/><line class="dash" x1="0" y1="305" x2="640" y2="305" stroke="#f5c542" stroke-width="5"/>' +
      '<rect x="400" y="120" width="200" height="130" fill="#1b1f26" stroke="#3a414c"/><rect x="420" y="140" width="160" height="26" rx="3" class="ac signlit"/><text class="sgn" x="500" y="159" text-anchor="middle">OPEN 24/7</text>' +
      '<rect x="430" y="180" width="140" height="70" fill="#0f1216" stroke="#3a414c"/>' +
      '<g class="truck"><rect x="0" y="-52" width="120" height="34" rx="4" class="ac"/><rect x="120" y="-62" width="50" height="44" rx="6" class="ac"/><rect x="132" y="-56" width="28" height="18" rx="2" fill="#bfe3ff"/>' +
      '<line x1="10" y1="-52" x2="-30" y2="-90" stroke="#cfd8dc" stroke-width="5"/><circle class="beacon" cx="150" cy="-66" r="5" fill="#ffcf4a"/>' +
      '<g transform="translate(30 -14)"><g class="wheel"><circle r="14" fill="#0b0c0e" stroke="#555" stroke-width="3"/><line x1="-10" y1="0" x2="10" y2="0" stroke="#888" stroke-width="2"/></g></g>' +
      '<g transform="translate(140 -14)"><g class="wheel"><circle r="14" fill="#0b0c0e" stroke="#555" stroke-width="3"/><line x1="-10" y1="0" x2="10" y2="0" stroke="#888" stroke-width="2"/></g></g></g>';
  };
  S.shine = function () {
    var car = 'M90 250 L110 215 Q120 200 145 198 L230 190 L290 150 Q305 140 330 140 H430 Q455 140 472 155 L505 188 L560 196 Q590 202 592 228 V250 Q592 260 580 260 H100 Q90 260 90 250Z';
    var sp = ''; [[170, 170], [360, 120], [520, 160], [250, 230], [460, 215]].forEach(function (c, i) { sp += '<path class="spark" style="animation-delay:' + i * 0.45 + 's" d="M' + c[0] + ' ' + (c[1] - 10) + ' L' + (c[0] + 3) + ' ' + (c[1] - 3) + ' L' + (c[0] + 10) + ' ' + c[1] + ' L' + (c[0] + 3) + ' ' + (c[1] + 3) + ' L' + c[0] + ' ' + (c[1] + 10) + ' L' + (c[0] - 3) + ' ' + (c[1] + 3) + ' L' + (c[0] - 10) + ' ' + c[1] + ' L' + (c[0] - 3) + ' ' + (c[1] - 3) + 'Z" fill="#fff"/>'; });
    var bub = ''; for (var i = 0; i < 8; i++) bub += '<circle class="bub" style="animation-delay:' + i * 0.5 + 's" cx="' + (110 + i * 60) + '" cy="300" r="' + (4 + i % 3 * 2) + '" fill="none" stroke="#bfefff" stroke-width="1.5"/>';
    return defs + sky + stars(12) + '<rect y="262" width="640" height="98" fill="#0c1a28"/><ellipse cx="340" cy="268" rx="270" ry="10" fill="#000" opacity=".35"/>' +
      '<clipPath id="carC"><path d="' + car + '"/></clipPath><path d="' + car + '" class="ac"/><path d="M300 158 Q310 150 330 150 H420 Q440 150 452 162 L478 190 H280Z" fill="#bfe3ff" opacity=".55"/>' +
      '<g clip-path="url(#carC)"><rect class="sweep" x="-120" y="120" width="70" height="160" fill="#fff" opacity=".45" transform="skewX(-20)"/></g>' +
      '<circle cx="170" cy="258" r="26" fill="#0b0c0e" stroke="#777" stroke-width="4"/><circle cx="510" cy="258" r="26" fill="#0b0c0e" stroke="#777" stroke-width="4"/>' + sp + bub;
  };
  S.build = function () {
    var grid = ''; for (var x = 0; x <= 640; x += 32) grid += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="360" stroke="#ffffff" opacity=".05"/>'; for (var y = 0; y <= 360; y += 32) grid += '<line x1="0" y1="' + y + '" x2="640" y2="' + y + '" stroke="#ffffff" opacity=".05"/>';
    var d = ['M170 300 V170 L320 80 L470 170 V300 Z', 'M200 300 V200 H270 V300', 'M360 200 H430 V250 H360 Z', 'M150 300 H500', 'M320 80 V60'];
    var p = ''; d.forEach(function (s, i) { p += '<path class="draw sa2" style="animation-delay:' + i * 0.5 + 's" d="' + s + '" fill="none" stroke-width="3" pathLength="1"/>'; });
    return defs + '<rect width="640" height="360" fill="#0d1520"/>' + grid + p +
      '<g><line x1="560" y1="40" x2="560" y2="330" stroke="#c9a24a" stroke-width="6"/><line x1="380" y1="44" x2="600" y2="44" stroke="#c9a24a" stroke-width="6"/>' +
      '<g class="hook"><line x1="420" y1="44" x2="420" y2="110" stroke="#9aa7b0" stroke-width="2"/><rect x="404" y="110" width="32" height="20" class="ac"/></g></g>' +
      label(176, 324, '24’-0”') + label(480, 180, 'ELEV. A');
  };
  S.clean = function () {
    var win = ''; for (var r = 0; r < 2; r++) for (var c = 0; c < 4; c++) { var x = 90 + c * 120, y = 70 + r * 120; win += '<rect x="' + x + '" y="' + y + '" width="100" height="100" rx="4" fill="#5d6b74" opacity=".55"/><rect class="wipe" style="animation-delay:' + (r * 4 + c) * 0.5 + 's" x="' + x + '" y="' + y + '" width="100" height="100" rx="4" fill="#bfefff"/>'; }
    var bub = ''; for (var i = 0; i < 10; i++) bub += '<circle class="bub" style="animation-delay:' + i * 0.4 + 's" cx="' + (60 + i * 55) + '" cy="330" r="' + (5 + i % 3 * 3) + '" fill="none" stroke="#bfefff" stroke-width="1.5"/>';
    return defs + '<rect width="640" height="360" fill="#0c1a28"/><rect x="70" y="50" width="500" height="270" fill="#13283d" stroke="#2a4a68"/>' + win + bub;
  };
  S.food = function () {
    var steam = ''; for (var i = 0; i < 3; i++) steam += '<path class="steam" style="animation-delay:' + i * 0.6 + 's" d="M' + (290 + i * 30) + ' 190 q -10 -20 0 -40 t 0 -40" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>';
    var tk = ''; for (var i = 0; i < 4; i++) tk += '<g class="ticket" style="animation-delay:' + i * 1.2 + 's"><rect x="0" y="0" width="70" height="80" fill="#fffdf5"/><rect x="8" y="12" width="40" height="5" fill="#999"/><rect x="8" y="24" width="54" height="4" fill="#ccc"/><rect x="8" y="34" width="46" height="4" fill="#ccc"/></g>';
    return defs + '<rect width="640" height="360" fill="#140d09"/><rect y="250" width="640" height="110" fill="#2a1a10"/><rect x="0" y="40" width="640" height="6" fill="#6b4a2e"/>' + tk +
      '<ellipse cx="320" cy="250" rx="130" ry="26" fill="#f4eee4"/><ellipse cx="320" cy="244" rx="80" ry="16" class="ac"/>' + steam +
      '<text class="ready" x="320" y="320" text-anchor="middle">ORDER READY</text>';
  };
  S.beauty = function () {
    var sp = ''; [[170, 110], [470, 90], [500, 250], [140, 260]].forEach(function (c, i) { sp += '<circle class="star" style="animation-delay:' + i * 0.5 + 's" cx="' + c[0] + '" cy="' + c[1] + '" r="4" fill="#fff"/>'; });
    return defs + '<rect width="640" height="360" fill="#160c12"/><ellipse cx="320" cy="170" rx="120" ry="150" fill="none" class="sa" stroke-width="6"/><ellipse cx="320" cy="170" rx="108" ry="138" fill="url(#glowG)" opacity=".5"/>' +
      '<g transform="translate(320 180)"><g class="snipA"><path d="M0 0 L-90 -14 L-90 -4 Z" fill="#dfe5ea"/><circle cx="20" cy="18" r="14" fill="none" stroke="#dfe5ea" stroke-width="5"/></g>' +
      '<g class="snipB"><path d="M0 0 L-90 14 L-90 4 Z" fill="#dfe5ea"/><circle cx="20" cy="-18" r="14" fill="none" stroke="#dfe5ea" stroke-width="5"/></g><circle r="4" class="ac"/></g>' + sp;
  };
  S.health = function () {
    return defs + '<rect width="640" height="360" fill="#081627"/>' + (function () { var g = ''; for (var x = 0; x <= 640; x += 40) g += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="360" stroke="#fff" opacity=".04"/>'; return g; })() +
      '<path class="ecg sa2" d="M0 200 H180 L200 160 L220 240 L245 110 L270 260 L290 200 H400 L415 180 L430 200 H640" fill="none" stroke-width="4" stroke-linejoin="round" pathLength="1"/>' +
      '<g transform="translate(500 110)"><g class="beat"><path d="M0 18 C -30 -8 -14 -34 0 -16 C 14 -34 30 -8 0 18Z" class="ac"/></g></g>' +
      '<g transform="translate(60 260)">' + [0, 1, 2, 3, 4].map(function (i) { return '<rect class="slot" style="animation-delay:' + i * 0.6 + 's" x="' + i * 56 + '" y="0" width="48" height="40" rx="6" fill="#13304d"/>'; }).join('') + '</g>' + label(60, 250, 'OPEN SLOTS THIS WEEK');
  };
  S.fitness = function () {
    var bars = ''; for (var i = 0; i < 12; i++) bars += '<rect class="eq ac2" style="animation-delay:' + (i % 5) * 0.15 + 's" x="' + (40 + i * 48) + '" y="230" width="30" height="100"/>';
    return defs + '<rect width="640" height="360" fill="#120a0b"/>' + bars +
      '<g class="lift"><rect x="170" y="130" width="300" height="10" fill="#cfd8dc"/><rect x="150" y="100" width="22" height="70" rx="4" class="ac"/><rect x="468" y="100" width="22" height="70" rx="4" class="ac"/><rect x="128" y="112" width="20" height="46" rx="4" fill="#555"/><rect x="492" y="112" width="20" height="46" rx="4" fill="#555"/></g>';
  };
  S.store = function () {
    var aw = ''; for (var i = 0; i < 10; i++) aw += '<path d="M' + (120 + i * 40) + ' 120 h40 v30 q-20 14 -40 0Z" ' + (i % 2 ? 'fill="#f4f1ea"' : 'class="ac"') + '/>';
    var ppl = ''; for (var i = 0; i < 3; i++) ppl += '<g class="walk" style="animation-delay:' + i * 2.2 + 's"><circle cx="0" cy="-48" r="9" fill="#dfe5ea"/><rect x="-9" y="-38" width="18" height="38" rx="8" fill="#9aa7b0"/></g>';
    return defs + sky + stars(14) + '<rect y="300" width="640" height="60" fill="#0b1118"/><rect x="120" y="100" width="400" height="200" fill="#141c26" stroke="#2c3a4a"/>' + aw +
      '<rect x="150" y="170" width="160" height="110" fill="#ffe6a8" opacity=".25"/><rect x="340" y="170" width="70" height="130" fill="#0d131b"/>' +
      '<rect x="430" y="180" width="70" height="30" rx="6" fill="#0d131b" stroke="#ff4a5a"/><text class="open" x="465" y="201" text-anchor="middle">OPEN</text>' + ppl;
  };

  var CSS = [
    '.sk1{stop-color:var(--sky1)}.sk2{stop-color:var(--sky2)}.gl1{stop-color:var(--a2)}.gl2{stop-color:var(--a2)}',
    '.ac{fill:var(--a)}.ac2{fill:var(--a2)}.sa{stroke:var(--a)}.sa2{stroke:var(--a2)}',
    '.scene text.lbl{font:600 10px var(--mono);letter-spacing:.12em;fill:#9fbccc}',
    '.scene .star{animation:tw 3s ease-in-out infinite alternate}@keyframes tw{to{opacity:.15}}',
    '.scene .win{fill:#ffe6a8;opacity:.35;animation:win 5s ease-in-out infinite alternate}@keyframes win{to{opacity:.7}}',
    '.scene .flow{stroke-dasharray:10 9;animation:flow 1s linear infinite}.scene .hot{stroke:#f2666f}@keyframes flow{to{stroke-dashoffset:-19}}',
    '.scene .drip circle{animation:drip 1.2s ease-in infinite}@keyframes drip{0%{transform:translateY(0);opacity:1}100%{transform:translateY(60px);opacity:0}}',
    '.scene .flame{animation:fl .3s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:bottom}@keyframes fl{to{transform:scaleY(1.4)}}',
    '.scene .needle{transform-box:view-box;transform-origin:90px 300px;animation:nd 3s ease-in-out infinite alternate}@keyframes nd{from{transform:rotate(-30deg)}to{transform:rotate(40deg)}}',
    '.scene .air{stroke-dasharray:14 10;animation:flow 1.2s linear infinite;opacity:.8}',
    '.scene .spin{animation:spin .7s linear infinite;transform-box:fill-box;transform-origin:center}@keyframes spin{to{transform:rotate(360deg)}}',
    '.scene .temp{font:800 20px var(--disp);fill:#fff}',
    '.scene .pulse{stroke-dasharray:30 400;animation:pls 1.8s linear infinite}@keyframes pls{from{stroke-dashoffset:430}to{stroke-dashoffset:0}}',
    '.scene .bulb{animation:bl 1.6s ease-in-out infinite alternate}@keyframes bl{from{opacity:.25}to{opacity:1}}',
    '.scene .grass{fill:#45ae58}.scene .stripe{transform-box:fill-box;transform-origin:left;animation:str 9s linear infinite}@keyframes str{0%{transform:scaleX(0)}40%,90%{transform:scaleX(1)}100%{transform:scaleX(1);opacity:0}}',
    '.scene .mower{animation:mow 9s linear infinite}@keyframes mow{0%{transform:translate(-90px,262px) scale(1.5)}100%{transform:translate(700px,262px) scale(1.5)}}',
    '.scene .sway{transform-box:fill-box;transform-origin:bottom;animation:sw 4s ease-in-out infinite alternate}@keyframes sw{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}',
    '.scene .sunp{animation:sp 4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}@keyframes sp{to{transform:scale(1.08)}}',
    '.scene .dash{stroke-dasharray:28 22;animation:rd 1s linear infinite}@keyframes rd{to{stroke-dashoffset:-50}}',
    '.scene .truck{animation:trk 8s cubic-bezier(.45,.05,.3,1) infinite}@keyframes trk{0%{transform:translate(-260px,268px)}35%,55%{transform:translate(160px,268px)}100%{transform:translate(720px,268px)}}',
    '.scene .wheel{animation:spin .5s linear infinite;transform-box:fill-box;transform-origin:center}',
    '.scene .beacon{animation:bc .5s steps(2) infinite}@keyframes bc{50%{opacity:.15}}',
    '.scene .sgn{font:800 13px var(--disp);letter-spacing:.12em;fill:var(--on)}.scene .signlit{animation:bl 2s ease-in-out infinite alternate}',
    '.scene .sweep{animation:swp 3s ease-in-out infinite}@keyframes swp{0%{transform:translateX(0) skewX(-20deg)}70%,100%{transform:translateX(820px) skewX(-20deg)}}',
    '.scene .spark{transform-box:fill-box;transform-origin:center;animation:spk 2.2s ease-in-out infinite}@keyframes spk{0%,100%{transform:scale(0);opacity:0}50%{transform:scale(1);opacity:1}}',
    '.scene .bub{animation:bub 4s ease-in infinite}@keyframes bub{0%{transform:translateY(0);opacity:0}20%{opacity:.9}100%{transform:translateY(-200px);opacity:0}}',
    '.scene .draw{stroke-dasharray:1;stroke-dashoffset:1;animation:drw 6s ease-in-out infinite}@keyframes drw{0%{stroke-dashoffset:1}40%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}',
    '.scene .hook{transform-box:view-box;transform-origin:420px 44px;animation:hk 3s ease-in-out infinite alternate}@keyframes hk{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}',
    '.scene .wipe{transform-box:fill-box;transform-origin:left;animation:wp 6s ease-in-out infinite;opacity:.85}@keyframes wp{0%{transform:scaleX(0)}30%,80%{transform:scaleX(1)}100%{transform:scaleX(1);opacity:0}}',
    '.scene .steam{animation:stm 2.4s ease-in-out infinite}@keyframes stm{0%{opacity:0;transform:translateY(10px)}50%{opacity:.6}100%{opacity:0;transform:translateY(-20px)}}',
    '.scene .ticket{animation:tkt 4.8s linear infinite}@keyframes tkt{0%{transform:translate(-80px,50px)}100%{transform:translate(660px,50px)}}',
    '.scene .ready{font:800 18px var(--disp);letter-spacing:.2em;fill:var(--a2);animation:bc 1s steps(2) infinite}',
    '.scene .snipA{animation:snA .6s ease-in-out infinite alternate}.scene .snipB{animation:snB .6s ease-in-out infinite alternate}@keyframes snA{from{transform:rotate(-12deg)}to{transform:rotate(0)}}@keyframes snB{from{transform:rotate(12deg)}to{transform:rotate(0)}}',
    '.scene .ecg{stroke-dasharray:1;stroke-dashoffset:1;animation:drw 3s linear infinite}',
    '.scene .beat{transform-box:fill-box;transform-origin:center;animation:bt 1s ease-in-out infinite}@keyframes bt{50%{transform:scale(1.25)}}',
    '.scene .slot{animation:slt 3s ease-in-out infinite}@keyframes slt{0%,40%{fill:#13304d}50%,100%{fill:var(--a)}}',
    '.scene .eq{transform-box:fill-box;transform-origin:bottom;animation:eq .9s ease-in-out infinite alternate}@keyframes eq{from{transform:scaleY(.2)}to{transform:scaleY(1)}}',
    '.scene .lift{animation:lift 1.6s ease-in-out infinite alternate}@keyframes lift{from{transform:translateY(60px)}to{transform:translateY(0)}}',
    '.scene .open{font:800 13px var(--disp);letter-spacing:.14em;fill:#ff4a5a;animation:bl 1s ease-in-out infinite alternate}',
    '.scene .walk{animation:wlk 6.6s linear infinite}@keyframes wlk{from{transform:translate(-40px,300px)}to{transform:translate(680px,300px)}}',
    '@media(prefers-reduced-motion:reduce){.scene *{animation:none!important}}'
  ].join('\n');

  g.PietsScenes = { S: S, CSS: CSS };
})(typeof window !== 'undefined' ? window : globalThis);
