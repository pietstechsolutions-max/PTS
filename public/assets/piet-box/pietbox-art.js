/* Piet Box art kit — shared SVG pieces for graphics, PDF and the demo.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Spot a mistake? Tell Matt so it gets fixed. */
(function (g) {
  'use strict';
  var ICONS = {
    camera: '<path d="M3 7h11a2 2 0 0 1 2 2v1l4-2.5v9L16 14v1a2 2 0 0 1-2 2H3z"/><circle cx="8.5" cy="12" r="2.5"/>',
    wifi: '<path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5 12.3a10 10 0 0 1 14 0"/><path d="M8.5 15.8a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/>',
    door: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><circle cx="15" cy="12.5" r="1" fill="currentColor"/><path d="M9 7h4"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
    pos: '<rect x="4" y="3" width="16" height="11" rx="2"/><path d="M8 18h8M12 14v4M6 21h12"/>',
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    laptop: '<rect x="4" y="5" width="16" height="10" rx="1.5"/><path d="M2 19h20"/>',
    tv: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
    printer: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    remote: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8"/><path d="M10 8l2 2-2 2M13 12h2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    check: '<path d="M5 13l4 4L19 7"/>',
    plug: '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>',
    cloud: '<path d="M7 18a5 5 0 0 1-.9-9.9A6 6 0 0 1 17.6 7 4.5 4.5 0 0 1 17.5 18z"/><path d="M12 16v-5M9.5 13.5 12 11l2.5 2.5"/>',
    pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
    antenna: '<path d="M12 12v9"/><circle cx="12" cy="10" r="2"/><path d="M7.8 5.8a6 6 0 0 0 0 8.4M16.2 5.8a6 6 0 0 1 0 8.4M5 3a10 10 0 0 0 0 14M19 3a10 10 0 0 1 0 14"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    tooth: '<path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7.5.4 2.6 1 6 2.5 6 1.7 0 1.6-4.5 4.5-4.5s2.8 4.5 4.5 4.5c1.5 0 2.1-3.4 2.5-6 .5-3 2-4.5 2-7.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>',
    fork: '<path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10"/><path d="M16 3c-1.7 0-3 2-3 5s1.3 4 3 4v9"/>',
    store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M11 21v-3h2v3"/>',
    bottle: '<path d="M10 2h4v4l2 3v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z"/><path d="M8 13h8"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
  };
  function icon(name, size, stroke) {
    size = size || 24;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (stroke || 1.75) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }
  function iconPaths(name) { return ICONS[name] || ''; }

  /* Signal-bar "P" mark (brand), drawn at 0,0 in a 120x100 box */
  function markG(id) {
    return '<g><rect x="0" y="0" width="14" height="76" rx="4" fill="#fff"/>' +
      '<rect x="18" y="0" width="52" height="11" rx="5.5" fill="url(#' + id + ')"/>' +
      '<rect x="18" y="17" width="44" height="11" rx="5.5" fill="url(#' + id + ')"/>' +
      '<rect x="18" y="34" width="52" height="11" rx="5.5" fill="url(#' + id + ')"/>' +
      '<rect x="18" y="54" width="30" height="8" rx="4" fill="#02D7F5" opacity=".55"/>' +
      '<rect x="18" y="68" width="18" height="8" rx="4" fill="#02D7F5" opacity=".3"/></g>';
  }

  /* The Piet Box — isometric render. opts: {uid, leds:[on/off x4], glow:true, status:'on'|'off'|'warn'} */
  var _n = 0;
  function box(opts) {
    opts = opts || {};
    var u = opts.uid || ('pb' + (++_n));
    var st = opts.status || 'on';
    var led = st === 'off' ? '#163257' : (st === 'warn' ? '#FFB020' : '#00E5FF');
    var ledGlow = st === 'off' ? '' : ' filter="url(#' + u + 'led)"';
    var s = '';
    s += '<svg class="pietbox-svg" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Piet Box">';
    s += '<defs>' +
      '<linearGradient id="' + u + 'top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a4aa8"/><stop offset=".55" stop-color="#173478"/><stop offset="1" stop-color="#0c1f55"/></linearGradient>' +
      '<linearGradient id="' + u + 'front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14306f"/><stop offset="1" stop-color="#081b47"/></linearGradient>' +
      '<linearGradient id="' + u + 'side" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2257"/><stop offset="1" stop-color="#050f30"/></linearGradient>' +
      '<linearGradient id="' + u + 'mk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#00FFFF"/><stop offset="1" stop-color="#01A2E8"/></linearGradient>' +
      '<linearGradient id="' + u + 'edge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#00E5FF" stop-opacity="0"/><stop offset=".25" stop-color="#00E5FF"/><stop offset=".75" stop-color="#01A2E8"/><stop offset="1" stop-color="#7A3DFF" stop-opacity="0"/></linearGradient>' +
      '<radialGradient id="' + u + 'shadow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + u + 'glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#00E5FF" stop-opacity=".45"/><stop offset="1" stop-color="#00E5FF" stop-opacity="0"/></radialGradient>' +
      '<filter id="' + u + 'led" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '</defs>';
    if (opts.glow !== false) s += '<ellipse cx="300" cy="230" rx="280" ry="150" fill="url(#' + u + 'glow)"/>';
    s += '<ellipse cx="300" cy="318" rx="250" ry="42" fill="url(#' + u + 'shadow)"/>';
    // faces
    s += '<polygon points="60,190 220,250 220,314 60,254" fill="url(#' + u + 'side)"/>';
    s += '<polygon points="220,250 540,150 540,214 220,314" fill="url(#' + u + 'front)"/>';
    s += '<polygon points="380,90 540,150 220,250 60,190" fill="url(#' + u + 'top)"/>';
    // top vents + bevel highlight
    s += '<polyline points="60,190 380,90 540,150" fill="none" stroke="#5f86ff" stroke-opacity=".55" stroke-width="2"/>';
    s += '<polyline points="60,190 220,250 540,150" fill="none" stroke="#9fc4ff" stroke-opacity=".35" stroke-width="1.5"/>';
    for (var i = 0; i < 7; i++) {
      var ox = 150 + i * 26, oy = 176 - i * 8;
      s += '<line x1="' + ox + '" y1="' + oy + '" x2="' + (ox + 110) + '" y2="' + (oy + 41) + '" stroke="#04123a" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>';
    }
    // front face content (skewed plane: local 320 x 64)
    s += '<g transform="matrix(1,-0.3125,0,1,220,250)">';
    s += '<rect x="16" y="12" width="40" height="40" rx="8" fill="#011442" stroke="#00E5FF" stroke-opacity=".35"/>';
    s += '<g transform="translate(25,18) scale(.36)">' + markG(u + 'mk') + '</g>';
    s += '<text x="66" y="34" font-family="Bricolage Grotesque,Inter,Arial,sans-serif" font-weight="800" font-style="italic" font-size="21" fill="#fff" letter-spacing="1">PIET BOX</text>';
    s += '<text x="67" y="47" font-family="JetBrains Mono,Consolas,monospace" font-weight="500" font-size="7" fill="#9fc4ff" letter-spacing="2.4">TECHNOLOGY SOLUTIONS</text>';
    for (var k = 0; k < 4; k++) s += '<circle cx="' + (232 + k * 14) + '" cy="40" r="3.6" fill="' + led + '"' + ledGlow + (st === 'on' && k === 3 ? ' class="pb-blink"' : '') + '/>';
    s += '<rect x="226" y="16" width="70" height="8" rx="4" fill="#04123a"/>';
    s += '<rect x="0" y="58" width="320" height="3" fill="url(#' + u + 'edge)" opacity="' + (st === 'off' ? '.15' : '.95') + '"/>';
    s += '</g>';
    // side ports (left face, skewed)
    s += '<g transform="matrix(1,0.375,0,1,60,190)">';
    s += '<rect x="22" y="18" width="26" height="18" rx="2" fill="#020a22" stroke="#2c4f9a"/><rect x="58" y="18" width="26" height="18" rx="2" fill="#020a22" stroke="#2c4f9a"/><circle cx="112" cy="27" r="7" fill="#020a22" stroke="#2c4f9a"/><circle cx="134" cy="27" r="3" fill="' + led + '"/>';
    s += '</g>';
    s += '</svg>';
    return s;
  }

  g.PietArt = { icon: icon, iconPaths: iconPaths, box: box, markG: markG, ICONS: ICONS };
})(typeof window !== 'undefined' ? window : globalThis);
