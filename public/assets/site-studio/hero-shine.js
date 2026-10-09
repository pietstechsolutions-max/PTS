/* Hero: drag-to-polish — interactive polish. Piets Technology Solutions Inc · 631-871-5957 */
(function (g) {
  'use strict';
  var H = g.PietsHeroes;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const PAINT={
  white:{n:"White",c:["#ffffff","#dfe9ef","#a9bac5"]},
  black:{n:"Black",c:["#5a6a80","#1c242e","#05080c"]},
  blue:{n:"Blue",c:["#4db3ff","#0b5bd0","#021f5a"]},
  red:{n:"Red",c:["#ff7b6e","#c4231a","#590a06"]},
  silver:{n:"Silver",c:["#eef3f7","#a9b6c1","#5b6773"]},
  teal:{n:"Sea green",c:["#5ee8cc","#0f9f8a","#04403a"]}
};
function waves(y,cls,col,op,amp){let d="M-200 "+y;for(let i=0;i<16;i++)d+="q25 "+(-amp)+" 50 0t50 0";return `<path class="${cls}" d="${d}" fill="none" stroke="${col}" stroke-width="1.6" opacity="${op}"/>`;}
function bgScene(kind,id){
  const car=kind!=="boat";
  let s=`<defs><linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04152b"/><stop offset=".55" stop-color="#0d4a73"/><stop offset="1" stop-color="#f09d58"/></linearGradient>`+
  `<radialGradient id="sn${id}"><stop offset="0" stop-color="#ffd98a" stop-opacity=".95"/><stop offset=".35" stop-color="#ffb54a" stop-opacity=".4"/><stop offset="1" stop-color="#ffb54a" stop-opacity="0"/></radialGradient>`+
  `<linearGradient id="se${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a6a8e"/><stop offset="1" stop-color="#031a30"/></linearGradient>`+
  `<linearGradient id="dk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4838"/><stop offset="1" stop-color="#17110e"/></linearGradient></defs>`+
  `<rect width="800" height="420" fill="url(#sk${id})"/><circle cx="610" cy="326" r="190" fill="url(#sn${id})"/><circle cx="610" cy="332" r="34" fill="#ffe3a0"/>`+
  `<ellipse cx="180" cy="120" rx="120" ry="8" fill="#fff" opacity=".07"/><ellipse cx="420" cy="80" rx="160" ry="6" fill="#fff" opacity=".06"/><ellipse cx="660" cy="150" rx="90" ry="5" fill="#ffd9a0" opacity=".14"/>`+
  `<rect y="330" width="800" height="90" fill="url(#se${id})"/>`+
  `<path d="M0 330 L0 318 Q40 306 80 316 T170 314 T260 318 T360 312 T450 318 L450 330Z" fill="#06223a" opacity=".9"/>`;
  for(let i=0;i<9;i++)s+=`<rect x="${566+(i%3)*28-i*3}" y="${338+i*8}" width="${50-i*3}" height="2" fill="#ffd98a" opacity="${(.5-i*.04).toFixed(2)}"/>`;
  s+=`<g>${waves(352,"wv","#6fd8e8",.35,5)}${waves(372,"wv2","#6fd8e8",.25,6)}${waves(398,"wv","#27d6e4",.2,7)}</g>`;
  if(car){
    s+=`<rect y="334" width="800" height="86" fill="url(#dk${id})"/><rect y="334" width="800" height="3" fill="#b8814f" opacity=".7"/>`;
    for(let x=0;x<=840;x+=64)s+=`<path d="M${x} 337 L${x-34} 420" stroke="#0b0807" stroke-width="2" opacity=".7"/>`;
    s+=`<rect x="26" y="290" width="14" height="46" fill="#1b1410"/><rect x="760" y="296" width="14" height="40" fill="#1b1410"/><rect x="23" y="286" width="20" height="6" fill="#2e231b"/><rect x="757" y="292" width="20" height="6" fill="#2e231b"/>`;
  }
  return s;
}
const SHAPES={
  sedan:{b:"M55 312 L55 278 Q55 258 82 252 L190 238 Q232 186 300 170 L500 166 Q578 172 618 226 L704 244 Q748 254 748 288 L748 312 Z",w:["M218 234 Q245 195 300 182 L392 180 L392 234 Z","M408 180 L498 180 Q552 186 584 234 L408 234 Z"],dx:[395,408],top:[180,300]},
  suv:{b:"M55 312 L55 268 Q55 246 82 240 L180 226 Q205 150 270 142 L560 142 Q600 150 640 220 L706 236 Q748 246 748 284 L748 312 Z",w:["M205 224 Q225 164 275 154 L390 152 L390 224 Z","M406 152 L555 152 Q590 160 618 224 L406 224 Z"],dx:[393,406],top:[152,300]},
  truck:{b:"M55 312 L55 238 L330 238 L330 176 Q340 156 380 152 L520 150 Q568 156 596 200 L640 230 L706 244 Q748 252 748 288 L748 312 Z",w:["M352 176 Q356 164 386 162 L470 160 L470 222 L352 222 Z","M486 160 L520 160 Q552 166 574 222 L486 222 Z"],dx:[478,478],top:[160,300]}
};
function sparkP(x,y,r){return `<path d="M${x} ${y-r}L${x+r*.28} ${y-r*.28}L${x+r} ${y}L${x+r*.28} ${y+r*.28}L${x} ${y+r}L${x-r*.28} ${y+r*.28}L${x-r} ${y}L${x-r*.28} ${y-r*.28}Z" fill="#fff"/>`;}
function beadsMk(id,box,seed,n){
  const R=rng(seed);let s=`<g clip-path="url(#${id})">`;
  for(let i=0;i<n;i++){const x=box[0]+R()*box[2],y=box[1]+R()*box[3],r=2+R()*4.2;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="rgba(210,240,255,.16)" stroke="rgba(255,255,255,.75)" stroke-width=".8"/><circle cx="${(x-r*.3).toFixed(1)}" cy="${(y-r*.35).toFixed(1)}" r="${(r*.28).toFixed(1)}" fill="#fff"/>`;}
  return s+"</g>";
}
function carMarkup(o,id){
  const sh=SHAPES[o.type]||SHAPES.sedan,c=(PAINT[o.paint]||PAINT.blue).c,hz=o.haze||0,dt=o.dirt||0;
  let s=`<defs><linearGradient id="bd${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient>`+
  `<linearGradient id="gl${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${o.glow?"#ffe6b0":"#c4e8fb"}"/><stop offset="1" stop-color="${o.glow?"#ff9d3a":"#0b2c5a"}"/></linearGradient>`+
  `<radialGradient id="rm${id}"><stop offset="0" stop-color="#f4fbff"/><stop offset="1" stop-color="#8aa6c2"/></radialGradient>`+
  `<clipPath id="cp${id}"><path d="${sh.b}"/></clipPath>`+
  `<filter id="dt${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.09" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .36  0 0 0 0 .27  0 0 0 0 .17  0 0 0 1.9 -.78"/></filter>`+
  `<filter id="hz${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.6 0.9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .9  0 0 0 0 .93  0 0 0 0 .95  0 0 0 1.4 -.3"/></filter></defs>`;
  s+=`<ellipse cx="400" cy="338" rx="352" ry="13" fill="#000" opacity=".42"/><path d="${sh.b}" fill="url(#bd${id})"/>`;
  sh.w.forEach(w=>{s+=`<path d="${w}" fill="url(#gl${id})"/>`;});
  s+=`<path d="M${sh.dx[0]} ${sh.top[0]} L${sh.dx[0]} 300 M${sh.dx[1]} ${sh.top[0]} L${sh.dx[1]} 300" stroke="#02163d" stroke-opacity=".5" stroke-width="2" fill="none"/>`+
     `<rect x="${sh.dx[0]-44}" y="250" width="34" height="6" rx="3" fill="#02163d" opacity=".55"/><rect x="${sh.dx[1]+14}" y="250" width="34" height="6" rx="3" fill="#02163d" opacity=".55"/>`+
     `<path d="M706 258 L744 266 L744 280 L706 276 Z" fill="${o.spark?"#fff6c8":"#cdbf8a"}"/><path d="M55 268 L72 268 L72 284 L55 284 Z" fill="#c63a3a"/>`;
  if(!(o.haze>=0.99)){s+=`<path d="M110 262 Q260 232 520 236 Q600 240 668 262" fill="none" stroke="#fff" stroke-opacity="${(Math.max(0,.55-hz*.7)).toFixed(2)}" stroke-width="10" stroke-linecap="round"/>`;}
  if(hz>0.01)s+=`<g clip-path="url(#cp${id})"><rect x="40" y="130" width="720" height="200" fill="#e6eef3" opacity="${(hz*.3).toFixed(2)}"/><rect x="40" y="130" width="720" height="200" filter="url(#hz${id})" opacity="${(hz*.7).toFixed(2)}"/></g>`;
  if(dt>0.01)s+=`<g clip-path="url(#cp${id})"><rect x="40" y="130" width="720" height="200" filter="url(#dt${id})" opacity="${(dt*.62).toFixed(2)}"/><rect x="55" y="250" width="693" height="62" fill="#6b5a45" opacity="${(dt*.4).toFixed(2)}"/></g>`;
  if(o.beads)s+=beadsMk("cp"+id,[60,150,690,160],11,90);
  [[190],[612]].forEach(w=>{const x=w[0];s+=`<circle cx="${x}" cy="312" r="58" fill="#06101d"/><circle cx="${x}" cy="312" r="46" fill="#10151c"/><circle cx="${x}" cy="312" r="30" fill="url(#rm${id})"/><g stroke="#3a5d86" stroke-width="3"><path d="M${x} 284v56M${x-28} 312h56M${x-20} 292l40 40M${x+20} 292l-40 40"/></g><circle cx="${x}" cy="312" r="8" fill="#10151c"/>`;});
  if(o.spark)s+=sparkP(618,210,17)+sparkP(300,250,11)+sparkP(700,262,13)+sparkP(130,268,9)+sparkP(480,200,9);
  return s;
}
const HULL="M96 292 L118 368 Q300 384 520 380 Q690 374 742 322 Q762 300 772 258 Q700 278 600 284 L560 288 Z";
function boatMarkup(o,id){
  const c=(PAINT[o.paint]||PAINT.blue).c,hz=o.haze||0,dt=o.dirt||0,len=o.len||30;
  const sc=(.6+(clamp(len,16,60)-16)/44*.4).toFixed(3);
  const chalk=hz>.01;
  let s=`<defs><linearGradient id="hl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${chalk?"#ece9d8":"#ffffff"}"/><stop offset="1" stop-color="${chalk?"#c9c5ad":"#dcebf4"}"/></linearGradient>`+
  `<linearGradient id="gw${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c4e8fb"/><stop offset="1" stop-color="#0b2c5a"/></linearGradient>`+
  `<clipPath id="cp${id}"><path d="${HULL}"/></clipPath>`+
  `<filter id="dt${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.03 0.1" numOctaves="3" seed="5"/><feColorMatrix values="0 0 0 0 .34  0 0 0 0 .3  0 0 0 0 .2  0 0 0 1.9 -.8"/></filter>`+
  `<filter id="hz${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.5 0.8" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 .86  0 0 0 0 .84  0 0 0 0 .7  0 0 0 1.5 -.35"/></filter></defs>`;
  s+=`<g transform="translate(400 382) scale(${sc}) translate(-400 -382)">`+
  `<ellipse cx="420" cy="386" rx="330" ry="8" fill="#000" opacity=".3"/>`+
  `<path d="M50 258 L98 258 L102 328 L56 334 Z" fill="#232a33"/><rect x="50" y="258" width="48" height="10" fill="${c[1]}"/><path d="M66 334 L92 331 L90 392 L70 392 Z" fill="#1a2028"/>`+
  `<path d="${HULL}" fill="url(#hl${id})"/>`+
  `<path d="M104 318 L742 300 L748 312 L110 334 Z" fill="${c[1]}"/>`+
  `<path d="M118 368 Q300 384 520 380 Q690 374 742 322 L730 316 Q680 358 520 364 Q300 368 114 352 Z" fill="#0b2c4d"/>`+
  `<path d="M96 292 L560 288 L600 284 Q700 278 772 258 L770 250 Q700 268 600 272 L560 276 L96 280 Z" fill="#cfd9df"/>`+
  `<path d="M384 288 L392 214 L470 214 L482 286 Z" fill="${hz>.01?"#dcd9c8":"#f4f9fc"}"/><path d="M398 192 L466 192 L470 214 L394 214 Z" fill="url(#gw${id})"/>`+
  `<rect x="360" y="160" width="160" height="8" fill="${c[2]}"/><path d="M372 168 L372 214 M508 168 L508 214" stroke="${c[2]}" stroke-width="5"/>`+
  `<rect x="404" y="236" width="56" height="38" fill="${o.glow?"#ffcf7a":"#0f2438"}" opacity=".9"/>`+
  `<path d="M760 262 L706 244" stroke="#9eb0bb" stroke-width="3"/>`;
  if(!(hz>=0.99))s+=`<path d="M130 322 Q400 306 740 298" fill="none" stroke="#fff" stroke-opacity="${Math.max(0,.6-hz*.8).toFixed(2)}" stroke-width="9" stroke-linecap="round"/>`;
  if(hz>0.01)s+=`<g clip-path="url(#cp${id})"><rect x="90" y="250" width="700" height="140" fill="#d9d4b8" opacity="${(hz*.3).toFixed(2)}"/><rect x="90" y="250" width="700" height="140" filter="url(#hz${id})" opacity="${(hz*.75).toFixed(2)}"/></g>`;
  if(dt>0.01)s+=`<g clip-path="url(#cp${id})"><rect x="90" y="250" width="700" height="140" filter="url(#dt${id})" opacity="${(dt*.6).toFixed(2)}"/><path d="M118 352 Q300 366 520 362 Q690 356 736 320 L742 326 Q690 376 520 382 Q300 386 118 372 Z" fill="#6f6a3e" opacity="${(dt*.55).toFixed(2)}"/></g>`;
  if(o.beads)s+=beadsMk("cp"+id,[100,260,670,120],21,80);
  if(o.spark)s+=sparkP(620,288,15)+sparkP(300,304,11)+sparkP(700,296,10)+sparkP(430,206,9);
  s+="</g>";
  return s;
}

  function shade(hex, t) { var n = parseInt(String(hex).replace('#', ''), 16); if (isNaN(n)) return hex; var r = n >> 16 & 255, gg = n >> 8 & 255, b = n & 255, m = t < 0 ? 0 : 255, k = Math.abs(t); return '#' + [r, gg, b].map(function (v) { v = Math.round(v + (m - v) * k); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
  function scene(kind) {
    var mk = function (o, i) { return kind === 'boat' ? boatMarkup(Object.assign({ len: 34, paint: 'brand' }, o), 'h' + i) : carMarkup(Object.assign({ type: 'suv', paint: 'brand' }, o), 'h' + i); };
    return bgScene(kind, 'h') + '<defs><clipPath id="swp"><rect id="swr" x="0" y="0" width="0" height="420"/></clipPath><linearGradient id="swg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe3a0" stop-opacity="0"/><stop offset=".85" stop-color="#ffe3a0" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity=".95"/></linearGradient></defs>' +
      '<g class="' + (kind === 'boat' ? 'bob' : '') + '">' + mk({ haze: .72, dirt: .5 }, 'd') + '<g clip-path="url(#swp)">' + mk({ haze: 0, dirt: 0, spark: true }, 's') + '</g></g>' +
      '<g id="swl"><rect x="-70" y="40" width="70" height="320" fill="url(#swg)"/><rect x="-1.5" y="40" width="3" height="320" fill="#fff"/><path d="M0 190 L5 200 L0 210 L-5 200Z" fill="#fff"/></g>';
  }
  H.list.shine = {
    css: [
      '.hcard .shbox{position:relative;aspect-ratio:800/420;touch-action:pan-y;cursor:ew-resize;user-select:none;-webkit-user-select:none;background:#07243d}',
      '.hcard .shbox svg{position:absolute;inset:0;width:100%;height:100%;display:block}',
      '.hcard .shbox input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0;z-index:4}',
      '.hcard .shlab{position:absolute;left:12px;bottom:12px;z-index:3;font:600 .62rem var(--mono);letter-spacing:.16em;text-transform:uppercase;background:rgba(3,16,28,.8);border:1px solid #29587a;padding:6px 10px;color:#9fe8ef;border-radius:6px}',
      '.hcard .shhint{position:absolute;right:12px;bottom:12px;z-index:3;font:600 .6rem var(--mono);letter-spacing:.1em;text-transform:uppercase;color:#fff;background:rgba(0,0,0,.45);padding:5px 9px;border-radius:99px}',
      '.hcard .bob{animation:shbob 4.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes shbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}',
      '.hcard .wv{animation:shdrift 9s linear infinite}.hcard .wv2{animation:shdrift 14s linear infinite reverse}@keyframes shdrift{to{transform:translateX(-200px)}}'
    ].join('\n'),
    build: function (c) {
      PAINT.brand = { n: 'Brand', c: [shade(c.color || '#1e88e5', .45), c.color || '#1e88e5', shade(c.color || '#1e88e5', -.65)] };
      var car = scene('car'), boat = scene('boat');
      return {
        title: 'Live polish · drag it', seg: [['car', 'Car'], ['boat', 'Boat']], segOn: 0, segLabel: 'Pick a subject',
        stage: '<div class="shbox"><svg viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + car + '</svg><span class="shlab">Hazy paint → polished</span><span class="shhint">Drag ↔</span><input type="range" min="0" max="100" value="0" aria-label="Drag to polish the surface"></div>',
        gauges: [['gloss', 'Gloss', '22', 'GU'], ['swirl', 'Swirls', '86', '%'], ['prot', 'Protection', '0', 'MO'], ['time', 'Time', '0.0', 'HRS']],
        dock: [
          ['wash', 'Hand wash', '<path d="M4 14h16v5H4zM7 14V9h10v5M9 6c0-1 1-2 1-3M13 6c0-1 1-2 1-3"/>'],
          ['correct', 'Paint correction', '<circle cx="12" cy="12" r="7"/><path d="M12 5v14M5 12h14"/>'],
          ['ceramic', 'Ceramic coat', '<path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7z"/>'],
          ['interior', 'Interior', '<path d="M6 20V9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v11M6 14h12"/>']
        ],
        msg: '<b>Drag across the screen to polish it yourself.</b> Dull and hazy on the left, corrected and glossy on the right.',
        data: {
          car: car, boat: boat,
          wash: ['Full detail', '<b>Hand wash + decon.</b> Foam, two-bucket wash and clay to pull out bonded grime before any polishing.', 60, 70, 0, 1.5],
          correct: ['Paint correction', '<b>Paint correction.</b> Machine polishing takes out swirls and haze so the color goes deep again.', 88, 8, 0, 6],
          ceramic: ['Ceramic coating', '<b>Ceramic coating.</b> A hard protective layer with that wet look. Water beads right off.', 94, 4, 24, 8],
          interior: ['Interior only', '<b>Interior deep clean.</b> Seats, carpets, vents and stains handled, smells gone.', 40, 86, 0, 3]
        }
      };
    },
    run: function (root, D, K) {
      var box = root.querySelector('.shbox'), svg = box.querySelector('svg'), rng = box.querySelector('input'), lab = box.querySelector('.shlab');
      var S = { p: 0, auto: true, t0: performance.now(), last: 0 };
      function setP(p) {
        S.p = Math.max(0, Math.min(1, p)); var x = S.p * 800, r = svg.querySelector('#swr'), l = svg.querySelector('#swl');
        if (r) r.setAttribute('width', x); if (l) l.setAttribute('transform', 'translate(' + x + ' 0)'); rng.value = Math.round(S.p * 100);
        K.gauge('gloss', Math.round(22 + S.p * 70)); K.gauge('swirl', Math.round(86 - S.p * 82));
      }
      function kind(k) { svg.innerHTML = D[k]; lab.textContent = k === 'boat' ? 'Dull gelcoat → polished' : 'Hazy paint → polished'; K.press('data-s', k); setP(S.p); }
      rng.addEventListener('input', function () { S.auto = false; S.last = performance.now(); setP(+rng.value / 100); });
      K.onSeg(kind);
      K.onDock(function (k) { var d = D[k]; K.press('data-k', k); K.say(d[1], d[0]); K.gauge('prot', d[4]); K.gauge('time', d[5].toFixed(1)); S.auto = false; S.last = performance.now(); setP(d[2] / 100); });
      function loop(t) {
        if (!S.auto && t - S.last > 3500) { S.auto = true; S.t0 = t - S.p * .5 * 7000; }
        if (S.auto) { var ph = (((t - S.t0) / 7000) % 1 + 1) % 1, p; if (ph < .5) { var u = ph / .5; p = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; } else if (ph < .82) p = 1; else p = 1 - (ph - .82) / .18; setP(p); }
        requestAnimationFrame(loop);
      }
      if (K.reduced) setP(.5); else requestAnimationFrame(loop);
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
