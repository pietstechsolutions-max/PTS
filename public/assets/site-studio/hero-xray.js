/* Heroes: HVAC, electrical and tech x-rays — drawn in the same style as the plumbing x-ray.
   Same house cutaway, mono labels, live gauges and "show a problem" dock.
   Piets Technology Solutions Inc · 631-871-5957 */
(function (g) {
  'use strict';
  var H = g.PietsHeroes;

  /* shared house cutaway, 640 x 400 */
  function house(town, opts) {
    opts = opts || {};
    var s = '<defs><linearGradient id="xsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#081a2e"/><stop offset="1" stop-color="#14365a"/></linearGradient>' +
      '<linearGradient id="xsoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2129"/><stop offset="1" stop-color="#11171d"/></linearGradient>' +
      '<linearGradient id="xmetal" x1="0" x2="1"><stop offset="0" stop-color="#7d8a91"/><stop offset=".5" stop-color="#cfd8dc"/><stop offset="1" stop-color="#6f7c83"/></linearGradient>' +
      '<radialGradient id="xglow"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe6a8" stop-opacity="0"/></radialGradient>' + (opts.defs || '') + '</defs>' +
      '<rect class="xsky" width="640" height="232" fill="url(#xsky)"/><rect y="232" width="640" height="168" fill="url(#xsoil)"/>' +
      '<g class="star" fill="#cfe6ff"><circle cx="36" cy="28" r="1.1"/><circle cx="104" cy="62" r="1"/><circle cx="560" cy="24" r="1.2"/><circle cx="604" cy="78" r="1"/><circle cx="420" cy="20" r=".9"/><circle cx="250" cy="14" r="1"/></g>' +
      '<circle cx="590" cy="44" r="12" fill="#eaf4ff" opacity=".85"/><circle cx="596" cy="40" r="11" fill="#0c2340"/>' +
      '<text x="10" y="18">' + H.esc(String(town || '').toUpperCase()) + '</text>' +
      '<polygon points="138,96 335,34 532,96" fill="#13283c" stroke="#3f6684" stroke-width="2"/>' +
      '<rect x="150" y="94" width="370" height="138" fill="#0d1f31" stroke="#3f6684" stroke-width="2"/>' +
      '<line x1="150" y1="163" x2="520" y2="163" stroke="#3f6684" stroke-width="2"/>' +
      '<rect x="150" y="232" width="370" height="96" fill="#0f1a24" stroke="#33495a" stroke-width="2"/>' +
      '<line x1="0" y1="232" x2="640" y2="232" stroke="#2e5a3a" stroke-width="3"/>' +
      '<text x="158" y="106">2ND FL · BEDROOM</text><text x="158" y="175">1ST FL · LIVING</text><text x="158" y="244">BASEMENT</text>';
    return s;
  }
  var BASE_CSS = [
    '.hcard .xr text{font-size:8.5px;letter-spacing:.08em;fill:#9fbccc}',
    '.hcard .xr .star{animation:xtw 3s ease-in-out infinite alternate}@keyframes xtw{to{opacity:.2}}',
    '.hcard .xr .mark{fill:none;stroke:#ff5b52;stroke-width:2;opacity:0;transform-box:fill-box;transform-origin:center}',
    '@keyframes xring{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.6);opacity:0}}',
    '@keyframes xflow{to{stroke-dashoffset:-19}}',
    '@keyframes xspin{to{transform:rotate(360deg)}}',
    '@keyframes xblink{50%{opacity:.25}}'
  ].join('\n');

  /* ================= HVAC ================= */
  var hvacIco = {
    cool: '<path d="M12 2v20M4 7l16 10M20 7 4 17"/>', heat: '<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-8z"/>',
    noac: '<circle cx="12" cy="12" r="8"/><path d="M8 8l8 8"/>', noheat: '<rect x="7" y="3" width="10" height="18" rx="3"/><path d="M10 8h4"/>',
    filter: '<rect x="4" y="5" width="16" height="14" rx="1"/><path d="M4 9h16M4 13h16M8 5v14M12 5v14M16 5v14"/>', short: '<path d="M3 12h4l2-5 4 10 2-5h6"/>'
  };
  H.list.hvac = {
    css: BASE_CSS + '\n' + [
      '.hcard .xr .duct{fill:none;stroke:#7d8a91;stroke-width:13;stroke-linejoin:round;stroke-linecap:square}',
      '.hcard .xr .duct2{fill:none;stroke:#5c6870;stroke-width:13;stroke-linejoin:round;stroke-linecap:square}',
      '.hcard .xr .air{fill:none;stroke-width:3;stroke-linecap:round;stroke-dasharray:8 10;animation:xflow 1s linear infinite}',
      '.hcard .xr .sup{stroke:#4fc3f7}.hcard[data-mode=heat] .xr .sup{stroke:#ff8a5c}.hcard .xr .ret{stroke:#b6c2c9;animation-duration:1.6s}',
      '.hcard .xr .vent{animation:xflow .7s linear infinite;stroke-dasharray:3 4}',
      '.hcard .xr .fan{transform-box:fill-box;transform-origin:center;animation:xspin .45s linear infinite}',
      '.hcard .xr .flame{opacity:0;transform-box:fill-box;transform-origin:bottom;animation:xfl .25s ease-in-out infinite alternate}@keyframes xfl{to{transform:scaleY(1.35)}}',
      '.hcard[data-mode=heat] .xr .flame{opacity:1}.hcard .xr .frost{opacity:1;transition:opacity .4s}.hcard[data-mode=heat] .xr .frost,.hcard[data-mode=noac] .xr .frost,.hcard[data-mode=noheat] .xr .frost{opacity:0}',
      '.hcard .xr .rline{fill:none;stroke-width:3;stroke-dasharray:6 8;animation:xflow .9s linear infinite}',
      '.hcard[data-mode=noac] .xr .fan,.hcard[data-mode=noheat] .xr .fan{animation-play-state:paused}',
      '.hcard[data-mode=noac] .xr .air,.hcard[data-mode=noheat] .xr .air,.hcard[data-mode=noac] .xr .rline,.hcard[data-mode=noheat] .xr .rline{stroke:#55636c;animation-play-state:paused}',
      '.hcard[data-mode=heat] .xr .rline{opacity:.2}',
      '.hcard .xr .dirty{opacity:0;transition:opacity .4s}.hcard[data-mode=filter] .xr .dirty{opacity:.95}.hcard[data-mode=filter] .xr .air{animation-duration:3.5s;stroke-width:1.6}',
      '.hcard[data-mode=short] .xr .air,.hcard[data-mode=short] .xr .fan{animation:xflow 1s linear infinite,xshort 3s steps(1) infinite}@keyframes xshort{0%{opacity:1}60%{opacity:.15}}',
      '.hcard[data-mode=short] .xr .fan{animation:xspin .45s linear infinite,xshort 3s steps(1) infinite}',
      '.hcard .xr .tglow{opacity:.18;transition:opacity .5s}.hcard[data-mode=noac] .xr .hot2,.hcard[data-mode=noheat] .xr .cold2{opacity:.4}',
      '.hcard[data-mode=noac] .m-noac,.hcard[data-mode=noheat] .m-noheat,.hcard[data-mode=filter] .m-filter,.hcard[data-mode=short] .m-short{opacity:1;animation:xring 1.4s ease-out infinite}',
      '.hcard .xr .tstat{font:700 13px var(--mono);fill:#eaf4ff;letter-spacing:0}'
    ].join('\n'),
    build: function (c) {
      var svg = '<svg class="xr" viewBox="0 0 640 400" role="img" aria-label="Cutaway of a house showing the furnace, ducts, outdoor AC unit and thermostat">' + house(c.town) +
        '<rect class="tglow hot2" x="152" y="96" width="366" height="134" fill="#ff5b3a"/><rect class="tglow cold2" x="152" y="96" width="366" height="134" fill="#4fc3f7" opacity="0"/>' +
        // furniture
        '<rect x="200" y="140" width="70" height="20" rx="4" fill="#2a4a63"/><rect x="200" y="132" width="20" height="12" rx="3" fill="#dfe9f0"/>' +
        '<rect x="196" y="206" width="84" height="24" rx="6" fill="#2a4a63"/><rect x="200" y="196" width="76" height="12" rx="5" fill="#35597a"/>' +
        '<rect x="430" y="196" width="40" height="30" rx="2" fill="#16304a"/><rect x="434" y="200" width="32" height="20" fill="#3b6b8f" opacity=".6"/>' +
        // ducts
        '<path class="duct" d="M300 300V250H360V120H300M360 190H300"/><path class="duct2" d="M420 120H470V280H330"/>' +
        '<path class="air sup" d="M300 300V250H360V120H300M360 190H300"/><path class="air ret" d="M420 120H470V280H330"/>' +
        '<g class="air sup vent"><path d="M300 128v14M292 128v12M308 128v12" fill="none" stroke-width="2"/><path d="M300 198v14M292 198v12M308 198v12" fill="none" stroke-width="2"/></g>' +
        '<rect x="286" y="118" width="28" height="6" fill="#c9d3d8"/><rect x="286" y="188" width="28" height="6" fill="#c9d3d8"/><rect x="412" y="116" width="18" height="10" fill="#8a9aa6"/>' +
        // furnace + coil + filter
        '<rect x="252" y="256" width="62" height="70" rx="5" fill="url(#xmetal)"/><rect x="258" y="300" width="50" height="20" rx="3" fill="#0c141b"/>' +
        '<path class="flame" d="M268 318q4-12 8 0q4-14 8 0q4-12 8 0q3-8 6 0z" fill="#ff8a3d"/>' +
        '<rect x="256" y="240" width="54" height="16" rx="3" fill="#5c6870"/><g class="frost" stroke="#bfe8ff" stroke-width="1.6"><path d="M266 244l6 6m0-6l-6 6M282 244l6 6m0-6l-6 6M298 244l6 6m0-6l-6 6"/></g>' +
        '<rect x="316" y="268" width="8" height="40" fill="#e9dfc9"/><rect class="dirty" x="316" y="268" width="8" height="40" fill="#6b5236"/>' +
        '<text x="244" y="340">FURNACE + COIL</text><text x="312" y="262">FILTER</text>' +
        // thermostat
        '<rect x="388" y="196" width="34" height="26" rx="5" fill="#0c141b" stroke="#4d7a9e"/><text class="tstat" x="405" y="214" text-anchor="middle" data-t="set">72°</text><text x="380" y="234">THERMOSTAT</text>' +
        // outdoor condenser + line set
        '<path class="rline" d="M314 262H540V214" stroke="#d08a4e"/><path class="rline" d="M314 270H548V214" stroke="#4fc3f7" style="animation-direction:reverse"/>' +
        '<rect x="532" y="176" width="78" height="56" rx="6" fill="#1a3149" stroke="#4d7a9e" stroke-width="2"/><circle cx="571" cy="204" r="21" fill="#0c1a28" stroke="#4d7a9e" stroke-width="2"/>' +
        '<g transform="translate(571 204)"><g class="fan"><path d="M0 0L0-18A8 8 0 0 1 8-4ZM0 0L16 8A8 8 0 0 1 2 12ZM0 0L-16 9A8 8 0 0 1-12-5Z" fill="#7fd4ff"/></g></g><circle cx="571" cy="204" r="3" fill="#fff"/>' +
        '<text x="534" y="246">AC CONDENSER</text><text x="452" y="296">RETURN</text><text x="366" y="148">SUPPLY</text>' +
        '<text x="470" y="110" data-t="up" style="font-size:12px;fill:#fff">71°</text><text x="470" y="180" data-t="dn" style="font-size:12px;fill:#fff">72°</text>' +
        '<circle class="mark m-noac" cx="571" cy="204" r="26"/><circle class="mark m-noheat" cx="283" cy="310" r="18"/><circle class="mark m-filter" cx="320" cy="288" r="14"/><circle class="mark m-short" cx="405" cy="209" r="18"/>' +
        '</svg>';
      var call = 'Call ' + H.esc(c.biz) + (c.phone ? ' at ' + H.esc(c.phone) : '') + '.';
      return {
        title: 'Heating & cooling x-ray · live', status: 'Cooling to 72°',
        stage: svg,
        gauges: [['in', 'Indoor', '72', '°F'], ['set', 'Set to', '72', '°F'], ['sup', 'Supply air', '55', '°F'], ['flt', 'Filter', '92', '% CLEAN']],
        dock: [['cool', 'Cooling', hvacIco.cool], ['heat', 'Heating', hvacIco.heat], ['noac', 'AC not cooling', hvacIco.noac], ['noheat', 'No heat', hvacIco.noheat], ['filter', 'Dirty filter', hvacIco.filter], ['short', 'Short cycling', hvacIco.short]],
        dockOn: 0, dockLabel: 'Show a problem',
        msg: '<b>Cool air in blue, return air in gray.</b> Tap a problem to see what a tech checks first.',
        data: {
          cool: { s: 'Cooling to 72°', v: [72, 72, 55, 92], up: 71, dn: 72, m: '<b>Everything running.</b> The condenser pulls heat out, the coil chills the air and the blower pushes it through the ducts.' },
          heat: { s: 'Heating to 70°', v: [70, 70, 118, 92], up: 69, dn: 70, m: '<b>Heating.</b> Burners light, the heat exchanger warms the air and supply ducts carry it upstairs.' },
          noac: { s: 'AC running, no cold air', v: [82, 72, 79, 88], up: 84, dn: 82, w: ['in', 'sup'], pick: 'AC not cooling', m: '<b>AC not cooling.</b> Check the breaker and that the outside unit is running. Ice on the lines? Turn it off and let it thaw. ' + call },
          noheat: { s: 'No heat', v: [58, 70, 60, 88], up: 56, dn: 58, w: ['in', 'sup'], pick: 'No heat', m: '<b>No heat.</b> Check the thermostat batteries, the furnace switch and the filter. Smell gas? Get out and call the gas company first. ' + call },
          filter: { s: 'Airflow low, filter clogged', v: [76, 72, 61, 12], up: 78, dn: 75, w: ['flt', 'in'], pick: 'Tune-up', m: '<b>Dirty filter.</b> A clogged filter chokes the airflow and can freeze the coil. Most filters need changing every 1 to 3 months.' },
          short: { s: 'Starts and stops every few minutes', v: [75, 72, 58, 85], up: 76, dn: 74, w: ['in'], pick: 'Strange noise', m: '<b>Short cycling.</b> Turning on and off over and over wears the system out. Usually sizing, a sensor or low refrigerant. ' + call }
        }
      };
    },
    run: function (root, D, K) {
      function t(k, v) { var el = root.querySelector('[data-t="' + k + '"]'); if (el) el.textContent = v + '°'; }
      function set(m) {
        var d = D[m] || D.cool; root.setAttribute('data-mode', m); K.status(d.s); K.say(d.m, d.pick, !!d.pick); K.press('data-k', m);
        ['in', 'set', 'sup', 'flt'].forEach(function (k, i) { K.gauge(k, d.v[i], d.w && d.w.indexOf(k) > -1); });
        t('set', d.v[1]); t('up', d.up); t('dn', d.dn);
        var hot = root.querySelector('.hot2'), cold = root.querySelector('.cold2');
        if (hot) hot.style.opacity = d.v[0] > d.v[1] + 3 ? .35 : (m === 'heat' ? .14 : 0);
        if (cold) cold.style.opacity = d.v[0] < d.v[1] - 3 ? .35 : (m === 'cool' ? .1 : 0);
      }
      K.onDock(set); set('cool');
    }
  };

  /* ================= ELECTRICAL ================= */
  var elIco = {
    ok: '<path d="M20 6 9 17l-5-5"/>', trip: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M10 8h4M12 8v6"/>',
    flicker: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z"/>', outage: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/><path d="M3 3l18 18"/>',
    ev: '<path d="M5 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10M5 17h10M15 9h2l2 2v5a1 1 0 0 1-2 0v-3"/><path d="M9 8l-2 4h4l-2 4"/>', panel: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M8 7h3M13 7h3M8 11h3M13 11h3M8 15h3M13 15h3"/>'
  };
  H.list.electrical = {
    css: BASE_CSS + '\n' + [
      '.hcard .xr .wire{fill:none;stroke:#3b4f61;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}',
      '.hcard .xr .amp{fill:none;stroke:#ffd54a;stroke-width:3;stroke-linecap:round;stroke-dasharray:4 16;animation:xflow .9s linear infinite}',
      '.hcard .xr .bulb{transition:opacity .3s}.hcard .xr .halo{animation:xbh 2.4s ease-in-out infinite alternate}@keyframes xbh{from{opacity:.55}to{opacity:.9}}',
      '.hcard .xr .brk{fill:#2e4a66}.hcard .xr .brk.on{fill:#3fd68a}',
      '.hcard[data-mode=trip] .c3 .amp,.hcard[data-mode=trip] .c3 .bulb{opacity:0}.hcard[data-mode=trip] .xr .b3{fill:#ff5b52}',
      '.hcard[data-mode=flicker] .xr .c1 .bulb,.hcard[data-mode=flicker] .xr .c2 .bulb{animation:xflk .35s steps(2) infinite}@keyframes xflk{50%{opacity:.15}}',
      '.hcard[data-mode=outage] .xr .grid,.hcard[data-mode=outage] .xr .gridamp{opacity:.15}.hcard .xr .gen{opacity:.35}.hcard[data-mode=outage] .xr .gen{opacity:1}',
      '.hcard .xr .exh{opacity:0}.hcard[data-mode=outage] .xr .exh{opacity:.7;animation:xex 1.6s ease-out infinite}@keyframes xex{from{transform:translate(0,0)}to{transform:translate(-14px,-26px);opacity:0}}',
      '.hcard .xr .genamp{opacity:0}.hcard[data-mode=outage] .xr .genamp{opacity:1}.hcard[data-mode=outage] .xr .c4 .bulb,.hcard[data-mode=outage] .xr .c4 .amp,.hcard[data-mode=outage] .xr .evbits{opacity:0}',
      '.hcard .xr .evbits{opacity:.25}.hcard[data-mode=ev] .xr .evbits{opacity:1}.hcard .xr .evbar{transform-box:fill-box;transform-origin:left;animation:xev 3s linear infinite}@keyframes xev{from{transform:scaleX(.1)}to{transform:scaleX(1)}}',
      '.hcard[data-mode=panel] .xr .heat{opacity:.85;animation:xblink 1s infinite}.hcard .xr .heat{opacity:0}',
      '.hcard .xr .disc{transform-box:fill-box;transform-origin:center;animation:xspin var(--dsp,3s) linear infinite}',
      '.hcard[data-mode=trip] .m-trip,.hcard[data-mode=flicker] .m-flk,.hcard[data-mode=outage] .m-out,.hcard[data-mode=panel] .m-panel{opacity:1;animation:xring 1.4s ease-out infinite}'
    ].join('\n'),
    build: function (c) {
      var brk = ''; for (var i = 0; i < 8; i++) brk += '<rect class="brk on b' + (i + 1) + '" x="' + (264 + (i % 2) * 22) + '" y="' + (256 + Math.floor(i / 2) * 14) + '" width="18" height="9" rx="2"/>';
      function circuit(cls, d, bulbs) { return '<g class="' + cls + '"><path class="wire" d="' + d + '"/><path class="amp" d="' + d + '"/>' + bulbs.map(function (b) { return '<circle class="bulb halo" cx="' + b[0] + '" cy="' + b[1] + '" r="16" fill="url(#xglow)"/><circle class="bulb" cx="' + b[0] + '" cy="' + b[1] + '" r="5" fill="#ffe6a8"/>'; }).join('') + '</g>'; }
      var svg = '<svg class="xr" viewBox="0 0 640 400" role="img" aria-label="Cutaway of a house showing the service line, meter, panel, circuits, EV charger and generator">' + house(c.town) +
        // service drop + pole + meter
        '<rect x="40" y="70" width="8" height="162" fill="#5a4636"/><rect x="24" y="78" width="40" height="5" fill="#5a4636"/><path class="grid" d="M60 80Q100 110 150 120" fill="none" stroke="#9aa7b0" stroke-width="2"/><path class="amp gridamp" d="M60 80Q100 110 150 120" />' +
        '<rect x="128" y="118" width="20" height="30" rx="4" fill="#9aa7b0"/><circle cx="138" cy="130" r="7" fill="#eaf4ff"/><g transform="translate(138 130)"><rect class="disc" x="-5" y="-1" width="10" height="2" fill="#0b1b2b"/></g><text x="96" y="160">METER</text>' +
        '<path class="wire grid" d="M138 148V250H262"/><path class="amp gridamp" d="M138 148V250H262"/>' +
        // panel
        '<rect x="256" y="246" width="56" height="70" rx="4" fill="#1d3a55" stroke="#4d7a9e" stroke-width="2"/>' + brk + '<rect class="heat" x="252" y="242" width="64" height="78" rx="6" fill="none" stroke="#ff7a3d" stroke-width="3"/><text x="252" y="336">200A PANEL</text>' +
        // circuits
        circuit('c1', 'M312 262H340V112H410', [[410, 112], [300, 112]]) + '<path class="wire" d="M340 112H300"/>' +
        circuit('c2', 'M312 276H350V180H220', [[220, 180], [300, 180]]) +
        circuit('c3', 'M312 290H360V150H460V138', [[460, 138]]) + '<rect x="452" y="150" width="16" height="10" rx="2" fill="#dfe9f0"/><text x="440" y="170" class="b3t">OUTLETS</text>' +
        circuit('c4', 'M312 304H500V214H540', [[204, 284]]) +
        // EV charger + car
        '<rect x="536" y="186" width="16" height="40" rx="3" fill="#cfd8dc"/><rect x="540" y="192" width="8" height="10" rx="1" fill="#0c141b"/><g class="evbits"><rect x="540" y="196" width="8" height="3" fill="#3fd68a" class="evbar"/><path d="M552 210Q566 214 572 222" fill="none" stroke="#2b3640" stroke-width="3"/><path class="amp" d="M552 210Q566 214 572 222"/></g>' +
        '<path d="M566 230v-10q0-6 8-8l12-10h26q6 0 10 8l4 10v10z" fill="#2a4a63"/><circle cx="580" cy="230" r="6" fill="#0b0c0e"/><circle cx="612" cy="230" r="6" fill="#0b0c0e"/><text x="532" y="246">EV CHARGER</text>' +
        // generator
        '<g class="gen"><rect x="572" y="286" width="54" height="34" rx="5" fill="#2f5d3a" stroke="#6fbf7d"/><path d="M580 296h38M580 304h38" stroke="#6fbf7d"/><circle class="exh" cx="582" cy="284" r="5" fill="#9aa7b0"/></g><path class="genamp amp" d="M572 304H520V300H312" /><text x="570" y="336">GENERATOR</text>' +
        '<circle class="mark m-trip" cx="286" cy="280" r="16"/><circle class="mark m-flk" cx="410" cy="112" r="14"/><circle class="mark m-out" cx="60" cy="80" r="16"/><circle class="mark m-panel" cx="284" cy="281" r="34"/>' +
        '</svg>';
      var call = 'Call ' + H.esc(c.biz) + (c.phone ? ' at ' + H.esc(c.phone) : '') + '.';
      return {
        title: 'Electrical x-ray · live', status: 'All circuits on',
        stage: svg,
        gauges: [['load', 'Load', '64', 'AMPS'], ['volt', 'Voltage', '240', 'V'], ['circ', 'Circuits on', '8/8', ''], ['ev', 'EV charger', '0.0', 'KW']],
        dock: [['ok', 'All good', elIco.ok], ['trip', 'Breaker trips', elIco.trip], ['flicker', 'Lights flicker', elIco.flicker], ['outage', 'Power outage', elIco.outage], ['ev', 'EV charging', elIco.ev], ['panel', 'Panel maxed', elIco.panel]],
        dockOn: 0, dockLabel: 'Show a problem',
        msg: '<b>Power flows from the street, through the meter and panel, out to every room.</b> Tap a problem to see what an electrician checks.',
        data: {
          ok: { s: 'All circuits on', v: [64, 240, '8/8', '0.0'], dsp: '3s', m: '<b>Everything is on.</b> Power flows from the street, through the meter and panel, out to every room.' },
          trip: { s: 'Outlet circuit tripped', v: [41, 240, '7/8', '0.0'], w: ['circ'], dsp: '4s', pick: 'Breaker keeps tripping', m: '<b>Breaker keeps tripping.</b> Too much on one circuit or a short. Unplug heaters and hair dryers, reset once. If it trips again, leave it off. ' + call },
          flicker: { s: 'Lights flickering upstairs', v: [66, 228, '8/8', '0.0'], w: ['volt'], dsp: '3s', pick: 'New lighting', m: '<b>Flickering lights.</b> One fixture is usually the bulb. A whole room or house can mean a loose connection, which is a fire risk. ' + call },
          outage: { s: 'Grid down, generator on', v: [38, 240, '6/8', '0.0'], w: ['circ'], dsp: '0s', pick: 'Generator', m: '<b>Power outage.</b> The transfer switch hands your essentials to the generator so heat, fridge and lights stay on.' },
          ev: { s: 'EV charging at 7.6 kW', v: [96, 238, '8/8', '7.6'], dsp: '1.2s', pick: 'EV charger', m: '<b>EV charging.</b> A Level 2 charger adds about 25 to 30 miles of range per hour. We check your panel has room first.' },
          panel: { s: 'Panel near its limit', v: [188, 232, '8/8', '7.6'], w: ['load', 'volt'], dsp: '.8s', pick: 'Panel upgrade', m: '<b>Panel maxed out.</b> Adding AC, an EV charger or a hot tub can push an old panel past its limit. Warm breakers are a warning sign. ' + call }
        }
      };
    },
    run: function (root, D, K) {
      var svg = root.querySelector('svg');
      function set(m) {
        var d = D[m] || D.ok; root.setAttribute('data-mode', m); K.status(d.s); K.say(d.m, d.pick, m === 'trip' || m === 'flicker' || m === 'panel' || m === 'outage'); K.press('data-k', m);
        ['load', 'volt', 'circ', 'ev'].forEach(function (k, i) { K.gauge(k, d.v[i], d.w && d.w.indexOf(k) > -1); });
        svg.style.setProperty('--dsp', d.dsp);
      }
      K.onDock(set); set('ok');
      setInterval(function () { var m = root.getAttribute('data-mode'), d = D[m] || D.ok, base = d.v[0]; if (typeof base === 'number') K.gauge('load', Math.round(base + (Math.random() * 6 - 3)), d.w && d.w.indexOf('load') > -1); }, 900);
    }
  };

  /* ================= TECH: cameras + Wi-Fi + network ================= */
  var tIco = {
    ok: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/>', dead: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0"/><path d="M3 3l18 18"/>',
    cams: '<path d="M3 7h11a2 2 0 0 1 2 2v1l4-2.5v9L16 14v1a2 2 0 0 1-2 2H3z"/>', night: '<path d="M20 15A8 8 0 1 1 9 4a6 6 0 0 0 11 11z"/>',
    smart: '<path d="M3 11.5 12 4l9 7.5M5 10v10h14V10"/>', down: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>'
  };
  H.list.tech = {
    css: BASE_CSS + '\n' + [
      '.hcard .xr .wave{fill:none;stroke:#00e5ff;stroke-width:2;opacity:0;transform-box:fill-box;transform-origin:center;animation:xwv 2.6s ease-out infinite}@keyframes xwv{0%{transform:scale(.2);opacity:.8}100%{transform:scale(1);opacity:0}}',
      '.hcard .xr .cone{fill:url(#xcone);opacity:.55;transform-box:view-box;animation:xsw 5s ease-in-out infinite alternate}',
      '.hcard .xr .led{animation:xblink .6s steps(2) infinite}',
      '.hcard .xr .cable{fill:none;stroke:#2c6fd1;stroke-width:3}.hcard .xr .data{fill:none;stroke:#00e5ff;stroke-width:2;stroke-dasharray:3 9;animation:xflow .6s linear infinite}',
      '.hcard .xr .ap2,.hcard .xr .ap3{transition:opacity .4s}.hcard[data-mode=dead] .xr .ap2,.hcard[data-mode=dead] .xr .ap3{opacity:0}',
      '.hcard .xr .dz{opacity:0;transition:opacity .4s}.hcard[data-mode=dead] .xr .dz{opacity:.55}',
      '.hcard .xr .walker{animation:xwk 9s linear infinite}@keyframes xwk{from{transform:translateX(0)}to{transform:translateX(150px)}}',
      '.hcard .xr .box{opacity:0}.hcard[data-mode=cams] .xr .box,.hcard[data-mode=night] .xr .box{opacity:1;animation:xblink 1s steps(2) infinite}',
      '.hcard[data-mode=night] .xr .xsky{fill:#03070d}.hcard[data-mode=night] .xr .ir{opacity:.9}.hcard .xr .ir{opacity:0}',
      '.hcard .xr .sm{opacity:.25;transition:opacity .4s}.hcard[data-mode=smart] .xr .sm{opacity:1}',
      '.hcard[data-mode=down] .xr .data,.hcard[data-mode=down] .xr .wave{animation-play-state:paused;opacity:0}.hcard[data-mode=down] .xr .led{fill:#ff5b52}',
      '.hcard[data-mode=dead] .m-dead,.hcard[data-mode=down] .m-down{opacity:1;animation:xring 1.4s ease-out infinite}',
      '@keyframes xsw{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}'
    ].join('\n'),
    build: function (c) {
      function waves(x, y, r, cls) { var s = '<g class="' + (cls || '') + '">'; for (var i = 0; i < 3; i++) s += '<circle class="wave" cx="' + x + '" cy="' + y + '" r="' + r + '" style="animation-delay:' + (i * .85) + 's"/>'; return s + '<rect x="' + (x - 9) + '" y="' + (y - 3) + '" width="18" height="6" rx="3" fill="#eaf4ff"/><circle cx="' + x + '" cy="' + y + '" r="1.6" class="led" fill="#3fd68a"/></g>'; }
      function cam(x, y, flip) { return '<g transform="translate(' + x + ' ' + y + ')' + (flip ? ' scale(-1 1)' : '') + '"><path class="cone" d="M0 0L90 60L30 90Z" style="transform-origin:' + x + 'px ' + y + 'px"/><circle class="ir" cx="8" cy="3" r="9" fill="#ff3b3b" opacity="0"/><rect x="-6" y="-5" width="18" height="10" rx="3" fill="#eaf4ff"/><circle cx="10" cy="0" r="3" fill="#0b1b2b"/></g>'; }
      var svg = '<svg class="xr" viewBox="0 0 640 400" role="img" aria-label="Cutaway of a house showing Wi-Fi coverage, security cameras and the network rack">' + house(c.town, { defs: '<linearGradient id="xcone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e5ff" stop-opacity=".55"/><stop offset="1" stop-color="#00e5ff" stop-opacity="0"/></linearGradient>' }) +
        '<rect class="dz" x="152" y="96" width="366" height="66" fill="#ff5b52"/><text class="dz" x="380" y="140" style="fill:#fff;font-size:10px">DEAD ZONE</text>' +
        // rack
        '<rect x="262" y="250" width="66" height="70" rx="4" fill="#0c141b" stroke="#4d7a9e" stroke-width="2"/>' + [0, 1, 2, 3].map(function (i) { return '<rect x="268" y="' + (258 + i * 15) + '" width="54" height="10" rx="2" fill="#1d3a55"/>' + [0, 1, 2, 3, 4].map(function (j) { return '<circle class="led" cx="' + (274 + j * 9) + '" cy="' + (263 + i * 15) + '" r="1.6" fill="#3fd68a" style="animation-delay:' + ((i * 5 + j) % 7) * .09 + 's"/>'; }).join(''); }).join('') + '<text x="258" y="336">NETWORK + NVR</text>' +
        // cables to APs and cameras
        '<path class="cable" d="M328 262H352V200H300M352 200V128H400"/><path class="data" d="M328 262H352V200H300M352 200V128H400"/>' +
        '<path class="cable" d="M328 300H515V110M515 200H520"/><path class="data" d="M328 300H515V110M515 200H520"/>' +
        waves(300, 200, 70, 'ap1') + waves(400, 128, 70, 'ap2') + waves(295, 300, 60, 'ap3') +
        cam(152, 100, true) + cam(518, 100) + cam(518, 168) +
        // walker in yard with detection box
        '<g class="walker"><g transform="translate(560 214)"><circle cx="0" cy="-14" r="4" fill="#cfd8dc"/><rect x="-4" y="-10" width="8" height="14" rx="3" fill="#9aa7b0"/><rect class="box" x="-9" y="-21" width="18" height="28" fill="none" stroke="#ffd54a" stroke-width="1.5"/></g></g>' +
        // smart home bits
        '<g class="sm"><circle cx="240" cy="120" r="6" fill="#ffe6a8"/><rect x="430" y="196" width="14" height="22" rx="2" fill="#3fd68a"/><text x="200" y="152">SMART LIGHTS</text><text x="420" y="230">SMART LOCK</text></g>' +
        '<text x="372" y="118">WI-FI 7 AP</text><text x="530" y="96">4K CAMERA</text>' +
        '<circle class="mark m-dead" cx="400" cy="128" r="20"/><circle class="mark m-down" cx="295" cy="285" r="30"/>' +
        '</svg>';
      var call = 'Call ' + H.esc(c.biz) + (c.phone ? ' at ' + H.esc(c.phone) : '') + '.';
      return {
        title: 'Network x-ray · live', status: 'Full coverage, 3 cameras recording',
        stage: svg,
        gauges: [['spd', 'Wi-Fi', '940', 'MBPS'], ['dev', 'Devices', '37', 'ONLINE'], ['cam', 'Cameras', '3/3', 'REC'], ['cov', 'Coverage', '100', '%']],
        dock: [['ok', 'All good', tIco.ok], ['dead', 'Dead zone', tIco.dead], ['cams', 'Motion alert', tIco.cams], ['night', 'Night vision', tIco.night], ['smart', 'Smart home', tIco.smart], ['down', 'Network down', tIco.down]],
        dockOn: 0, dockLabel: 'Show a problem',
        msg: '<b>Wi-Fi everywhere, cameras on every corner, all wired back to one rack.</b> Tap to see what we fix.',
        data: {
          ok: { s: 'Full coverage, 3 cameras recording', v: [940, 37, '3/3', 100], m: '<b>Everything is online.</b> Access points on each floor, cameras on every corner, all wired back to one rack.' },
          dead: { s: 'Upstairs dead zone', v: [12, 22, '3/3', 54], w: ['spd', 'cov'], pick: 'Wi-Fi', m: '<b>Dead zone.</b> One router in the basement cannot reach the bedroom. Wired access points fix it for good, not more extenders. ' + call },
          cams: { s: 'Motion on driveway, clip saved', v: [940, 37, '3/3', 100], pick: 'Cameras', m: '<b>Motion alert.</b> A person is detected, the clip is saved and your phone gets the alert in seconds.' },
          night: { s: 'IR night vision on', v: [940, 31, '3/3', 100], pick: 'Cameras', m: '<b>Night vision.</b> Infrared lights up the yard so faces and plates stay clear in the dark.' },
          smart: { s: 'Lights and lock automated', v: [940, 44, '3/3', 100], pick: 'Smart home', m: '<b>Smart home.</b> Lights, locks and thermostats run on a schedule and from your phone, no monthly fees required.' },
          down: { s: 'Internet down', v: [0, 0, '0/3', 0], w: ['spd', 'dev', 'cam', 'cov'], pick: 'Computer help', m: '<b>Network down.</b> Restart the modem first, then the router. Still down? We can often fix it remotely in minutes. ' + call }
        }
      };
    },
    run: function (root, D, K) {
      function set(m) { var d = D[m] || D.ok; root.setAttribute('data-mode', m); K.status(d.s); K.say(d.m, d.pick, m === 'dead' || m === 'down'); K.press('data-k', m); ['spd', 'dev', 'cam', 'cov'].forEach(function (k, i) { K.gauge(k, d.v[i], d.w && d.w.indexOf(k) > -1); }); }
      K.onDock(set); set('ok');
      setInterval(function () { var d = D[root.getAttribute('data-mode')] || D.ok; if (d.v[0] > 100) K.gauge('spd', Math.round(d.v[0] - Math.random() * 60)); }, 1100);
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
