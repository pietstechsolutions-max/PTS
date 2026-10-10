/* Piets QR — small self-contained QR Code generator (byte mode, error correction M, versions 1-15).
   Written for Piets Technology Solutions Inc (631-871-5957). No outside libraries.
   Usage: PietsQR.svg(text, {size:240, dark:'#011442', light:'#fff', margin:4}) -> SVG string
          PietsQR.matrix(text) -> 2D array of booleans */
(function (g) {
  'use strict';
  // EC level M: [total codewords, ec codewords per block, blocks group1, data cw g1, blocks g2, data cw g2]
  var EC_M = [null,
    [26, 10, 1, 16, 0, 0], [44, 16, 1, 28, 0, 0], [70, 26, 1, 44, 0, 0], [100, 18, 2, 32, 0, 0], [134, 24, 2, 43, 0, 0],
    [172, 16, 4, 27, 0, 0], [196, 18, 4, 31, 0, 0], [242, 22, 2, 38, 2, 39], [292, 22, 3, 36, 2, 37], [346, 26, 4, 43, 1, 44],
    [404, 30, 1, 50, 4, 51], [466, 22, 6, 36, 2, 37], [532, 22, 8, 37, 1, 38], [581, 24, 4, 40, 5, 41], [655, 24, 5, 41, 5, 42]];
  var ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50],
    [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70]];
  // GF(256)
  var EXP = new Array(512), LOG = new Array(256);
  (function () { var x = 1; for (var i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; } for (i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
  function gmul(a, b) { return (a && b) ? EXP[LOG[a] + LOG[b]] : 0; }
  function rsGen(n) { var p = [1]; for (var i = 0; i < n; i++) { var q = new Array(p.length + 1).fill(0); for (var j = 0; j < p.length; j++) { q[j] ^= p[j]; q[j + 1] ^= gmul(p[j], EXP[i]); } p = q; } return p; }
  function rsEnc(data, n) { var gen = rsGen(n), res = data.concat(new Array(n).fill(0)); for (var i = 0; i < data.length; i++) { var c = res[i]; if (c) for (var j = 0; j < gen.length; j++) res[i + j] ^= gmul(gen[j], c); } return res.slice(data.length); }
  function utf8(s) { var out = []; s = unescape(encodeURIComponent(s)); for (var i = 0; i < s.length; i++) out.push(s.charCodeAt(i)); return out; }
  function dataCap(v) { var e = EC_M[v]; return e[2] * e[3] + e[4] * e[5]; }

  function encode(text) {
    var bytes = utf8(text), v;
    for (v = 1; v <= 15; v++) { var cb = v < 10 ? 8 : 16; if (4 + cb + bytes.length * 8 <= dataCap(v) * 8) break; }
    if (v > 15) throw new Error('Text too long for QR');
    var bits = [];
    var put = function (val, len) { for (var i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
    put(4, 4); put(bytes.length, v < 10 ? 8 : 16); bytes.forEach(function (b) { put(b, 8); });
    var cap = dataCap(v) * 8;
    put(0, Math.min(4, cap - bits.length));
    while (bits.length % 8) bits.push(0);
    var cw = []; for (var i = 0; i < bits.length; i += 8) { var b = 0; for (var k = 0; k < 8; k++) b = (b << 1) | bits[i + k]; cw.push(b); }
    for (var pad = 0; cw.length < dataCap(v); pad++) cw.push(pad % 2 ? 0x11 : 0xEC);
    // blocks
    var e = EC_M[v], blocks = [], ecb = [], pos = 0;
    for (i = 0; i < e[2]; i++) { blocks.push(cw.slice(pos, pos + e[3])); pos += e[3]; }
    for (i = 0; i < e[4]; i++) { blocks.push(cw.slice(pos, pos + e[5])); pos += e[5]; }
    blocks.forEach(function (bl) { ecb.push(rsEnc(bl, e[1])); });
    var final = [], maxd = Math.max(e[3], e[5]);
    for (i = 0; i < maxd; i++) blocks.forEach(function (bl) { if (i < bl.length) final.push(bl[i]); });
    for (i = 0; i < e[1]; i++) ecb.forEach(function (bl) { final.push(bl[i]); });
    return { v: v, cw: final };
  }

  function build(text) {
    var enc = encode(text), v = enc.v, n = v * 4 + 17;
    var M = [], F = [];
    for (var y = 0; y < n; y++) { M.push(new Array(n).fill(false)); F.push(new Array(n).fill(false)); }
    function set(x, y, d) { M[y][x] = d; F[y][x] = true; }
    function finder(x0, y0) { for (var dy = -1; dy <= 7; dy++) for (var dx = -1; dx <= 7; dx++) { var x = x0 + dx, y = y0 + dy; if (x < 0 || y < 0 || x >= n || y >= n) continue; var d = (dx >= 0 && dx <= 6 && (dy === 0 || dy === 6)) || (dy >= 0 && dy <= 6 && (dx === 0 || dx === 6)) || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4); set(x, y, d); } }
    finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
    for (var i = 8; i < n - 8; i++) { set(i, 6, i % 2 === 0); set(6, i, i % 2 === 0); }
    var al = ALIGN[v];
    for (var a = 0; a < al.length; a++) for (var b = 0; b < al.length; b++) {
      var cx = al[a], cy = al[b]; var last = al.length - 1; if ((a === 0 && b === 0) || (a === 0 && b === last) || (a === last && b === 0)) continue;
      for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++) set(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }
    set(8, n - 8, true); // dark module
    // reserve format + version areas
    for (i = 0; i < 9; i++) { if (!F[8][i]) set(i, 8, false); if (!F[i][8]) set(8, i, false); }
    for (i = 0; i < 8; i++) { set(n - 1 - i, 8, false); set(8, n - 1 - i, false); }
    set(8, n - 8, true);
    if (v >= 7) for (i = 0; i < 6; i++) for (var j = 0; j < 3; j++) { set(i, n - 11 + j, false); set(n - 11 + j, i, false); }
    // data
    var bits = []; enc.cw.forEach(function (c) { for (var k = 7; k >= 0; k--) bits.push((c >>> k) & 1); });
    var bi = 0, up = true;
    for (var x = n - 1; x > 0; x -= 2) {
      if (x === 6) x = 5;
      for (var t = 0; t < n; t++) {
        y = up ? n - 1 - t : t;
        for (var c = 0; c < 2; c++) { var xx = x - c; if (F[y][xx]) continue; M[y][xx] = bi < bits.length ? bits[bi] === 1 : false; bi++; }
      }
      up = !up;
    }
    var masks = [
      function (x, y) { return (x + y) % 2 === 0; }, function (x, y) { return y % 2 === 0; }, function (x, y) { return x % 3 === 0; },
      function (x, y) { return (x + y) % 3 === 0; }, function (x, y) { return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0; },
      function (x, y) { return (x * y) % 2 + (x * y) % 3 === 0; }, function (x, y) { return ((x * y) % 2 + (x * y) % 3) % 2 === 0; },
      function (x, y) { return ((x + y) % 2 + (x * y) % 3) % 2 === 0; }];
    function fmtBits(mask) { var d = (0 << 3) | mask; /* EC M = 00 */ var r = d << 10; for (var k = 14; k >= 10; k--) if ((r >>> k) & 1) r ^= 0x537 << (k - 10); return ((d << 10) | r) ^ 0x5412; }
    function verBits(v) { var r = v << 12; for (var k = 17; k >= 12; k--) if ((r >>> k) & 1) r ^= 0x1f25 << (k - 12); return (v << 12) | r; }
    function apply(mask) {
      var G = M.map(function (r) { return r.slice(); });
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (!F[y][x] && masks[mask](x, y)) G[y][x] = !G[y][x];
      var f = fmtBits(mask), bit, i;
      var gb = function (k) { return ((f >>> k) & 1) === 1; };
      for (i = 0; i <= 5; i++) G[i][8] = gb(i);
      G[7][8] = gb(6); G[8][8] = gb(7); G[8][7] = gb(8);
      for (i = 9; i < 15; i++) G[8][14 - i] = gb(i);
      for (i = 0; i < 8; i++) G[8][n - 1 - i] = gb(i);
      for (i = 8; i < 15; i++) G[n - 15 + i][8] = gb(i);
      G[n - 8][8] = true;
      if (v >= 7) { var vb = verBits(v); for (i = 0; i < 18; i++) { var bb = ((vb >>> i) & 1) === 1, a = Math.floor(i / 3), b = i % 3 + n - 11; G[b][a] = bb; G[a][b] = bb; } }
      return G;
    }
    function penalty(G) {
      var p = 0, x, y, k;
      for (y = 0; y < n; y++) { var run = 1; for (x = 1; x < n; x++) { if (G[y][x] === G[y][x - 1]) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else run = 1; } }
      for (x = 0; x < n; x++) { run = 1; for (y = 1; y < n; y++) { if (G[y][x] === G[y - 1][x]) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else run = 1; } }
      for (y = 0; y < n - 1; y++) for (x = 0; x < n - 1; x++) { var c = G[y][x]; if (c === G[y][x + 1] && c === G[y + 1][x] && c === G[y + 1][x + 1]) p += 3; }
      var pat1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0], pat2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
      for (y = 0; y < n; y++) for (x = 0; x <= n - 11; x++) { var h1 = true, h2 = true, v1 = true, v2 = true; for (k = 0; k < 11; k++) { var hv = G[y][x + k] ? 1 : 0, vv = G[x + k][y] ? 1 : 0; if (hv !== pat1[k]) h1 = false; if (hv !== pat2[k]) h2 = false; if (vv !== pat1[k]) v1 = false; if (vv !== pat2[k]) v2 = false; } p += 40 * ((h1 ? 1 : 0) + (h2 ? 1 : 0) + (v1 ? 1 : 0) + (v2 ? 1 : 0)); }
      var dark = 0; for (y = 0; y < n; y++) for (x = 0; x < n; x++) if (G[y][x]) dark++;
      p += Math.floor(Math.abs(dark * 20 - n * n * 10) / (n * n)) * 10;
      return p;
    }
    var best = null, bp = Infinity;
    for (var m = 0; m < 8; m++) { var G = apply(m), pp = penalty(G); if (pp < bp) { bp = pp; best = G; } }
    return best;
  }
  function svg(text, o) {
    o = o || {}; var m = build(text), n = m.length, mg = o.margin == null ? 4 : o.margin, s = n + mg * 2, d = '';
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (m[y][x]) d += 'M' + (x + mg) + ' ' + (y + mg) + 'h1v1h-1z';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + s + ' ' + s + '" width="' + (o.size || 240) + '" height="' + (o.size || 240) + '" shape-rendering="crispEdges" role="img" aria-label="QR code"><rect width="' + s + '" height="' + s + '" fill="' + (o.light || '#fff') + '"/><path d="' + d + '" fill="' + (o.dark || '#011442') + '"/></svg>';
  }
  g.PietsQR = { matrix: build, svg: svg };
  if (typeof module !== 'undefined') module.exports = g.PietsQR;
})(typeof window !== 'undefined' ? window : globalThis);
