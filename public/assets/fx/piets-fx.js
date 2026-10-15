/* Piets FX — one module for the whole site (Oct 15 2026).
   Ported from the piets-landing preview (CanvasBg.tsx, LiquidVideo.tsx, GlowOrb.tsx) into plain
   JavaScript: no React, no Next.js. Loaded on every page by the build (scripts/build-blog.js).

   What it does
   1. Background (every page): a slow domain-warped fbm field on obsidian + drifting dust.
      Home adds the fiber bundle: five strands coiled behind the Piets Hub, breathing,
      that unwind as you scroll while the camera follows the cable down the page.
   2. Liquid media panel (home, .fx-liquid): pointer ripples, swirl, chromatic split, scanlines.
      Shows the server-aisle scene drawn in code. To use a video later, put its URL in the
      panel's data-video attribute — it is graded into the brand automatically.
   3. Cards tilt toward the cursor with a WebGL glow orb that follows the mouse inside.
   4. Terminal form fields: "> " prompts and borders that draw themselves on focus.
   5. Magnetic primary buttons and Lenis smooth scrolling.
   Fallbacks: no WebGL -> static CSS gradient (piets-fx.css), orb -> CSS radial glow.
   prefers-reduced-motion -> one still frame, no Lenis, no tilt, no magnet.

   three.js r160 and Lenis 1.1.13 are local files next to this one, pinned (never a CDN).
   Palette B only. Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell Piets about any mistake so it gets fixed. */

const D = document, W = window, ROOT = D.documentElement;
const RM = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = W.matchMedia('(hover: hover) and (pointer: fine)').matches;
const HERE = new URL('.', import.meta.url).href;
const IS_HOME = D.body.classList.contains('home-page');

/* ---------------- shared scroll / pointer state ---------------- */
const S = { y: 0, progress: 0, velocity: 0, pointer: { x: 0, y: 0 } };
function readScroll() {
  const y = W.scrollY || ROOT.scrollTop || 0;
  const max = Math.max(1, ROOT.scrollHeight - W.innerHeight);
  if (!S._lenis) S.velocity = y - S.y;
  S.y = y; S.progress = Math.min(1, Math.max(0, y / max));
}
W.addEventListener('scroll', readScroll, { passive: true });
W.addEventListener('pointermove', (e) => {
  S.pointer.x = (e.clientX / W.innerWidth) * 2 - 1;
  S.pointer.y = -((e.clientY / W.innerHeight) * 2 - 1);
}, { passive: true });
readScroll();

/* ---------------- GLSL shared ---------------- */
const SIMPLEX = `
vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
float fbm(vec3 p){
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++) { s += a * snoise(p); p *= 2.02; a *= 0.5; }
  return s;
}
`;
/* Palette B in linear-ish floats. PURPLE is Piets' own accent (#7A3DFF) — not in the landing preview. */
const BRAND = `
const vec3 OBSIDIAN = vec3(0.012, 0.016, 0.031);
const vec3 NAVY     = vec3(0.004, 0.122, 0.365);   // #011F5D
const vec3 NAVY_PUR = vec3(0.106, 0.043, 0.333);   // #1B0B55
const vec3 CYAN     = vec3(0.008, 0.843, 0.961);   // #02D7F5
const vec3 BLUE     = vec3(0.004, 0.635, 0.910);   // #01A2E8
const vec3 BLUE_DP  = vec3(0.004, 0.435, 0.839);   // #016FD6
const vec3 PURPLE   = vec3(0.478, 0.239, 1.000);   // #7A3DFF
`;

/* ---------------- 1 · background ---------------- */
function webglOK() {
  try { const c = D.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
}

async function startBackground(THREE) {
  const canvas = D.createElement('canvas');
  canvas.id = 'fx-bg'; canvas.setAttribute('aria-hidden', 'true');
  D.body.insertBefore(canvas, D.body.firstChild);
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: IS_HOME, alpha: false, powerPreference: IS_HOME ? 'high-performance' : 'low-power' });
  } catch (e) { canvas.remove(); return; }
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setClearColor('#030408');
  const maxDpr = IS_HOME ? 1.75 : 1.25;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 140);
  camera.position.set(-2.3, 0.15, 7.4);
  let clockT = 0;

  /* field: screen-space quad, always behind */
  const fieldMat = new THREE.ShaderMaterial({
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }`,
    fragmentShader: `${SIMPLEX}${BRAND}
uniform float uTime; uniform float uScroll; uniform vec2 uPointer; uniform vec2 uRes; uniform float uHome;
varying vec2 vUv;
void main(){
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.035;
  vec2 q = vec2(fbm(vec3(p * 1.1, t)), fbm(vec3(p * 1.1 + 5.2, t + 1.3)));
  float n = fbm(vec3(p * 1.4 + q * 1.6 + vec2(0.0, uScroll * 3.0), t * 1.5));
  vec3 col = OBSIDIAN;
  col = mix(col, NAVY * 0.75, smoothstep(-0.15, 0.55, n));
  col = mix(col, BLUE_DP * 0.32, smoothstep(0.35, 0.85, n) * 0.6);
  col = mix(col, NAVY_PUR * 0.9, smoothstep(0.1, 0.7, q.y) * 0.35);
  float seam = smoothstep(0.012, 0.0, abs(n - 0.28)) * 0.09;
  col += mix(CYAN, PURPLE, smoothstep(-0.4, 0.6, p.x + q.x)) * seam * (0.4 + 0.6 * smoothstep(0.5, -0.5, p.y));
  vec2 pp = uPointer * vec2(uRes.x / uRes.y, 1.0) * 0.5;
  col += BLUE * 0.06 * exp(-length(p - pp) * 2.6);
  col *= mix(0.55, 1.0, smoothstep(1.25, 0.2, length(p)));
  col *= mix(0.78, 1.0, uHome);
  gl_FragColor = vec4(col, 1.0);
}`,
    depthWrite: false, depthTest: false,
    uniforms: { uTime: { value: 0 }, uScroll: { value: 0 }, uPointer: { value: new THREE.Vector2() }, uRes: { value: new THREE.Vector2(1, 1) }, uHome: { value: IS_HOME ? 1 : 0 } }
  });
  const field = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fieldMat);
  field.frustumCulled = false; field.renderOrder = -10; scene.add(field);

  /* the fiber route (home) and its coiled form */
  const route = (e, t = new THREE.Vector3()) => {
    const o = THREE.MathUtils.smoothstep(e, 0, 0.12);
    return t.set(2.1 * Math.sin(e * Math.PI * 3.4) * o, -(72 * e), (Math.cos(e * Math.PI * 2.2) - 1) * 1.1 * o);
  };
  class Strand extends THREE.Curve {
    constructor(s) { super(); this.s = s; }
    getPoint(e, t = new THREE.Vector3()) {
      route(e, t);
      const a = this.s / 5 * Math.PI * 2 + 38 * e, r = 0.16 + 0.05 * Math.sin(20 * e + this.s);
      t.x += Math.cos(a) * r; t.z += Math.sin(a) * r; return t;
    }
  }
  class Coil extends THREE.Curve {
    constructor(s) { super(); this.s = s; }
    getPoint(e, t = new THREE.Vector3()) {
      const a = 5.5 * e * Math.PI * 2 + 1.25 * this.s, r = 1.15 + 0.09 * this.s + 0.08 * Math.sin(9 * e), y = (0.5 - e) * 2.4 + 0.06 * Math.sin(0.5 * a);
      return t.set(Math.cos(a) * r, y, Math.sin(a) * r * 0.85);
    }
  }
  const fiberMats = [];
  if (IS_HOME) {
    const vs = `${SIMPLEX}
uniform float uTime; uniform float uUncoil; uniform float uExpand; uniform float uSeed;
attribute vec3 aCoil; attribute vec3 aCoilNormal;
varying vec2 vUv; varying vec3 vNormalV; varying vec3 vViewDir; varying float vMorph;
void main(){
  vUv = uv;
  float m = smoothstep(0.0, 1.0, clamp(uUncoil * 1.55 - uv.x * 0.55, 0.0, 1.0));
  vMorph = m;
  vec3 pos = mix(aCoil, position, m);
  vec3 nrm = normalize(mix(aCoilNormal, normal, m));
  float t = uTime * 0.18;
  float amp = mix(0.11, 0.05, m);
  vec3 drift = vec3(snoise(vec3(uv.x * 7.0, t, uSeed)), snoise(vec3(uv.x * 7.0 + 17.3, t, uSeed)), snoise(vec3(uv.x * 7.0 + 41.7, t, uSeed))) * amp;
  pos.xz *= 1.0 + (1.0 - m) * 0.035 * sin(uTime * 0.9 + uv.x * 6.2831);
  pos += drift + nrm * uExpand;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vNormalV = normalize(normalMatrix * nrm);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
    const fs = `${BRAND}
uniform float uTime; uniform float uSeed; uniform float uHalo; uniform float uVelocity; uniform float uBright; uniform float uCoilLevel;
varying vec2 vUv; varying vec3 vNormalV; varying vec3 vViewDir; varying float vMorph;
void main(){
  float facing = abs(dot(normalize(vNormalV), normalize(vViewDir)));
  float speed = 0.22 + uVelocity * 0.05;
  float p = fract(vUv.x * 9.0 - uTime * speed + uSeed * 0.37);
  float pulse = exp(-pow((p - 0.5) * 26.0, 2.0));
  float p2 = fract(vUv.x * 23.0 - uTime * speed * 1.7 + uSeed);
  float spark = exp(-pow((p2 - 0.5) * 60.0, 2.0)) * 0.6;
  vec3 base = mix(BLUE_DP, CYAN, smoothstep(0.0, 1.0, facing));
  base = mix(base, BLUE, 0.35 * sin(vUv.x * 40.0 + uSeed));
  base = mix(base, PURPLE, 0.28 * smoothstep(0.55, 1.0, sin(vUv.x * 13.0 + uSeed * 2.0)));
  vec3 col = base * (0.55 + facing * 0.9) + vec3(0.75, 1.0, 1.0) * (pulse + spark);
  col *= mix(uCoilLevel, 1.0, vMorph) * uBright;
  float ends = smoothstep(0.0, 0.015, vUv.x) * smoothstep(1.0, 0.97, vUv.x);
  float alpha;
  if (uHalo > 0.5) { alpha = pow(facing, 2.5) * (0.16 + pulse * 0.35); col = mix(mix(BLUE, PURPLE, 0.35), CYAN, pulse); }
  else { alpha = 0.85 + pulse * 0.15; }
  gl_FragColor = vec4(col, alpha * ends);
}`;
    const mk = (seed, halo) => new THREE.ShaderMaterial({
      vertexShader: vs, fragmentShader: fs, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      side: halo ? THREE.BackSide : THREE.FrontSide,
      uniforms: { uTime: { value: 0 }, uUncoil: { value: 0 }, uExpand: { value: halo ? 0.07 : 0 }, uSeed: { value: seed }, uHalo: { value: halo ? 1 : 0 }, uVelocity: { value: 0 }, uBright: { value: 1 }, uCoilLevel: { value: 0.42 } }
    });
    const segs = W.innerWidth < 700 ? 420 : 720;
    for (let i = 0; i < 5; i++) {
      const g = new THREE.TubeGeometry(new Strand(i), segs, 0.028, 8, false);
      const c = new THREE.TubeGeometry(new Coil(i), segs, 0.028, 8, false);
      g.setAttribute('aCoil', c.getAttribute('position').clone());
      g.setAttribute('aCoilNormal', c.getAttribute('normal').clone());
      c.dispose();
      const core = mk(1.618 * i, false), halo = mk(1.618 * i, true);
      fiberMats.push(core, halo);
      const mh = new THREE.Mesh(g, halo); mh.frustumCulled = false; mh.renderOrder = 1; scene.add(mh);
      const mc = new THREE.Mesh(g, core); mc.frustumCulled = false; mc.renderOrder = 2; scene.add(mc);
    }
  }

  /* dust */
  const COUNT = IS_HOME ? (W.innerWidth < 700 ? 700 : 1400) : 520;
  const dg = new THREE.BufferGeometry();
  const dp = new Float32Array(COUNT * 3), ds = new Float32Array(COUNT), tv = new THREE.Vector3();
  for (let i = 0; i < COUNT; i++) {
    if (IS_HOME) {
      route(Math.max(0, 1.05 * Math.random() - 0.03), tv);
      const r = 2.5 + 6 * Math.random(), a = Math.random() * Math.PI * 2;
      dp[3 * i] = tv.x + Math.cos(a) * r; dp[3 * i + 1] = tv.y + (Math.random() - 0.5) * 3 + 2; dp[3 * i + 2] = tv.z + Math.sin(a) * r * 0.6 - 2;
    } else {
      dp[3 * i] = (Math.random() - 0.5) * 22; dp[3 * i + 1] = (Math.random() - 0.5) * 14; dp[3 * i + 2] = -2 - Math.random() * 8;
    }
    ds[i] = Math.random();
  }
  dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  dg.setAttribute('aSeed', new THREE.BufferAttribute(ds, 1));
  const dustMat = new THREE.ShaderMaterial({
    vertexShader: `${SIMPLEX}
uniform float uTime; uniform float uPixelRatio; attribute float aSeed; varying float vTwinkle; varying float vSeed;
void main(){
  vec3 pos = position; float t = uTime * 0.05;
  pos += vec3(snoise(vec3(pos.xy * 0.15, t + aSeed)), snoise(vec3(pos.yz * 0.15, t - aSeed)), 0.0) * 0.6;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vTwinkle = 0.5 + 0.5 * sin(uTime * (0.8 + aSeed) + aSeed * 30.0); vSeed = aSeed;
  gl_PointSize = (2.2 + aSeed * 2.4) * uPixelRatio * (10.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`,
    fragmentShader: `${BRAND}
varying float vTwinkle; varying float vSeed;
void main(){
  float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d);
  vec3 c = mix(BLUE, CYAN, vTwinkle); c = mix(c, PURPLE, step(0.82, vSeed) * 0.8);
  gl_FragColor = vec4(c, a * (0.15 + 0.45 * vTwinkle));
}`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } }
  });
  const dust = new THREE.Points(dg, dustMat); dust.frustumCulled = false; scene.add(dust);

  /* where the coil sits: centred behind the Piets Hub core when it is on screen */
  const hub = IS_HOME ? D.querySelector('[data-fx-coil], .hm-hub__core') : null;
  const coilNdc = new THREE.Vector2(0.38, 0.0);
  function placeCoil() {
    if (!hub) return;
    const r = hub.getBoundingClientRect();
    if (!r.width) return;
    const cx = (r.left + r.width / 2) / W.innerWidth, cy = (r.top + S.y + r.height / 2) / W.innerHeight;
    coilNdc.set(cx * 2 - 1, -(cy * 2 - 1));
  }

  let w = 0, h = 0;
  function resize() {
    const nw = W.innerWidth, nh = W.innerHeight;
    if (nw === w && Math.abs(nh - h) < 120 && w) { return; } // ignore phone toolbar wobble
    w = nw; h = nh;
    renderer.setPixelRatio(Math.min(W.devicePixelRatio || 1, maxDpr));
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    fieldMat.uniforms.uRes.value.set(w, h);
    dustMat.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    placeCoil();
  }
  resize();
  W.addEventListener('resize', resize, { passive: true });
  W.addEventListener('load', placeCoil);
  if (D.fonts && D.fonts.ready) D.fonts.ready.then(placeCoil);
  setTimeout(placeCoil, 600); setTimeout(placeCoil, 2000);
  let first = true;

  const sPt = new THREE.Vector3(), sAhead = new THREE.Vector3(), camGoal = new THREE.Vector3(), look = new THREE.Vector3(), lookGoal = new THREE.Vector3(), ptr = new THREE.Vector2();
  let uncoil = 0, vel = 0, last = performance.now(), running = true, visible = true;
  const tanHalf = Math.tan(THREE.MathUtils.degToRad(21));

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    clockT += dt * (RM ? 0.15 : 1);
    const fu = fieldMat.uniforms;
    fu.uTime.value = clockT; fu.uScroll.value = S.progress;
    fu.uPointer.value.lerp(new THREE.Vector2(S.pointer.x, S.pointer.y), 0.05);
    dustMat.uniforms.uTime.value = clockT;

    if (IS_HOME) {
      const small = w < 1024;
      const target = THREE.MathUtils.clamp(S.y / (1.1 * h), 0, 1);
      uncoil = THREE.MathUtils.lerp(uncoil, target, 0.08);
      vel = THREE.MathUtils.lerp(vel, Math.min(Math.abs(S.velocity), 40), 0.1);
      for (const m of fiberMats) {
        const u = m.uniforms; u.uTime.value = clockT; u.uUncoil.value = uncoil; u.uVelocity.value = vel;
        // once it leaves the hero the cable runs down the page gutter; where there is no gutter it dims behind the content
        const gutter = (w - 1240) / 2, roomy = gutter >= 90;
        const follow = THREE.MathUtils.smoothstep(S.y / (1.1 * h), 0.15, 0.9);
        const lvl = small ? 0.6 : 0.95;
        u.uBright.value = THREE.MathUtils.lerp(lvl, roomy ? 0.85 : 0.3, follow); u.uCoilLevel.value = small ? 0.18 : 0.34;
      }
      const d = THREE.MathUtils.smoothstep(S.y / (1.1 * h), 0, 1);
      const pr = 0.97 * THREE.MathUtils.clamp((S.progress - 0.04) / 0.96, 0, 1);
      route(pr, sPt); route(Math.min(pr + 0.025, 1), sAhead);
      // coiled: shift the camera so the spool lands on the hub core (desktop) or upper centre (phone)
      const dist = small ? 13.5 : 12.6;
      // phones/tablets: the hub sits below the text, so the spool peeks up from the bottom of the first screen
      const ny = small ? Math.max(-0.82, Math.min(0.8, coilNdc.y)) : coilNdc.y;
      const ox = -coilNdc.x * tanHalf * dist * camera.aspect;
      const oy = -ny * tanHalf * dist;
      const start = camGoal.set(ox, oy + 0.15, dist);
      const fdist = 6.2 + (small ? 2.6 : 0);
      const gutterPx = Math.max(24, (w - 1240) / 4);                 // middle of the left gutter
      const ndcX = -1 + (2 * gutterPx) / w;
      const side = -ndcX * tanHalf * (fdist + 1.1) * camera.aspect;  // world offset that puts the cable there
      const follow = new THREE.Vector3(sPt.x + side, sPt.y + 1.3, fdist);
      start.lerp(follow, d);
      ptr.lerp(new THREE.Vector2(S.pointer.x, S.pointer.y), 0.04);
      start.x += 0.35 * ptr.x; start.y += 0.25 * ptr.y;
      camera.position.lerp(start, RM || first ? 1 : 0.09);
      lookGoal.set(ox * (1 - d) + (sAhead.x + side) * d, oy * (1 - d) + sAhead.y * d, sAhead.z * d);
      look.lerp(lookGoal, RM || first ? 1 : 0.09); first = false;
      camera.lookAt(look);
    } else {
      camera.position.set(S.pointer.x * 0.3, S.pointer.y * 0.2 - S.progress * 1.5, 7.4);
      camera.lookAt(0, -S.progress * 1.5, 0);
    }
    renderer.render(scene, camera);
    if (RM) return; // one still frame; re-drawn on resize/scroll below
    if (running && visible) requestAnimationFrame(frame);
  }
  D.addEventListener('visibilitychange', () => {
    visible = !D.hidden;
    if (visible && !RM) { last = performance.now(); requestAnimationFrame(frame); }
  });
  if (RM) {
    let q = 0; const redraw = () => { if (q) return; q = requestAnimationFrame(() => { q = 0; frame(performance.now()); }); };
    W.addEventListener('scroll', redraw, { passive: true }); W.addEventListener('resize', redraw);
  }
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); running = false; ROOT.classList.remove('fx-gl'); });
  requestAnimationFrame(frame);
  ROOT.classList.add('fx-gl');
}

/* ---------------- 2 · liquid media panel ---------------- */
function startLiquid(THREE, el) {
  const canvas = D.createElement('canvas'); canvas.setAttribute('aria-hidden', 'true');
  el.insertBefore(canvas, el.firstChild);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false }); } catch (e) { canvas.remove(); return; }
  const scene = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  const mat = new THREE.ShaderMaterial({
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: `${SIMPLEX}${BRAND}
uniform sampler2D uTex; uniform float uHasVideo; uniform vec2 uTexSize; uniform vec2 uRes; uniform float uTime;
uniform vec2 uMouse; uniform float uStrength; uniform float uScrollVel;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
vec3 serverRoom(vec2 uv){
  vec2 p = uv - vec2(0.5, 0.5);
  float ax = max(abs(p.x), 0.002);
  float side = p.x < 0.0 ? 0.0 : 1.0;
  float z = 1.0 / ax; float v = p.y / ax; float fog = exp(-z * 0.09);
  vec3 col = OBSIDIAN;
  if (abs(v) < 1.0) {
    float rc = z * 0.55; float fr = fract(rc); float uc = (v + 1.0) * 9.0; float fu = fract(uc);
    vec2 cell = vec2(floor(rc), floor(uc)) + side * 57.0; float h = hash(cell);
    vec3 panel = mix(vec3(0.020, 0.030, 0.050), NAVY * 0.55, 0.35 + 0.3 * h);
    float post = smoothstep(0.06, 0.0, fr) + smoothstep(0.94, 1.0, fr);
    float seam = smoothstep(0.06, 0.0, fu) * 0.6;
    col = panel * (1.0 - seam) + BLUE_DP * post * 0.35;
    float blink = step(0.35, fract(h * 13.7 + uTime * (0.25 + h * 0.9)));
    float ledA = smoothstep(0.05, 0.0, length(vec2((fr - 0.18) * 1.6, (fu - 0.5) * 0.9)));
    float ledB = smoothstep(0.05, 0.0, length(vec2((fr - 0.26) * 1.6, (fu - 0.5) * 0.9)));
    vec3 ledCol = h > 0.86 ? vec3(0.15, 1.0, 0.55) : (h > 0.72 ? PURPLE : mix(CYAN, BLUE, fract(h * 3.1)));
    col += ledCol * (ledA * blink + ledB * (1.0 - blink) * 0.6) * 2.2;
    col += BLUE * 0.06 * step(0.5, fract(fu * 6.0)) * smoothstep(0.4, 0.9, fr);
    col *= fog * 1.6;
  } else {
    float d = abs(p.y); float zz = 0.5 / d; float xx = p.x * zz * 2.0;
    float tile = max(smoothstep(0.04, 0.0, abs(fract(zz * 0.7) - 0.5) - 0.46), smoothstep(0.04, 0.0, abs(fract(xx * 1.2) - 0.5) - 0.46));
    col = vec3(0.012, 0.018, 0.03) + BLUE_DP * tile * 0.18;
    if (p.y > 0.0) col += CYAN * smoothstep(0.08, 0.0, abs(xx)) * 0.9;
    else col += mix(BLUE, PURPLE, 0.4) * 0.10 * smoothstep(0.5, 0.0, abs(xx));
    col *= exp(-zz * 0.12) * 1.4;
  }
  col += BLUE * 0.35 * exp(-length(p * vec2(1.4, 2.2)) * 7.0);
  return col;
}
vec3 sampleScene(vec2 uv){
  if (uHasVideo > 0.5) {
    float panelAspect = uRes.x / uRes.y; float texAspect = uTexSize.x / max(uTexSize.y, 1.0);
    vec2 s = panelAspect > texAspect ? vec2(1.0, texAspect / panelAspect) : vec2(panelAspect / texAspect, 1.0);
    vec2 cuv = (uv - 0.5) * s + 0.5; vec3 v = texture2D(uTex, cuv).rgb;
    float l = dot(v, vec3(0.299, 0.587, 0.114));
    return mix(NAVY * 0.5, mix(BLUE_DP, CYAN, l), smoothstep(0.05, 0.9, l)) * 0.35 + v * 0.75;
  }
  return serverRoom(uv);
}
void main(){
  vec2 uv = vUv; vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.12;
  vec2 flow = vec2(snoise(vec3(uv * 3.0, t)), snoise(vec3(uv * 3.0 + 9.1, t))) * 0.006;
  vec2 d = (uv - uMouse) * aspect; float dist = length(d);
  float wave = sin(dist * 42.0 - uTime * 7.0) * exp(-dist * 7.5);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  vec2 ripple = dir / aspect * wave * 0.035 * uStrength;
  float swirl = exp(-dist * 9.0) * uStrength * 0.6;
  vec2 tangent = vec2(-dir.y, dir.x) / aspect * swirl * 0.03;
  vec2 smear = vec2(0.0, uScrollVel * 0.0012 * snoise(vec3(uv.x * 8.0, uTime, 0.0)));
  vec2 duv = uv + flow + ripple + tangent + smear;
  float ca = 0.0025 + (abs(wave) * uStrength + abs(uScrollVel) * 0.01) * 0.006;
  vec3 col; col.r = sampleScene(duv + dir * ca).r; col.g = sampleScene(duv).g; col.b = sampleScene(duv - dir * ca).b;
  col += CYAN * pow(max(wave, 0.0), 6.0) * uStrength * 0.35;
  col *= 0.94 + 0.06 * sin(uv.y * uRes.y * 1.4);
  col *= smoothstep(1.05, 0.35, length((uv - 0.5) * vec2(1.2, 1.0)));
  gl_FragColor = vec4(col, 1.0);
}`,
    uniforms: { uTex: { value: null }, uHasVideo: { value: 0 }, uTexSize: { value: new THREE.Vector2(16, 9) }, uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0.5, 0.5) }, uStrength: { value: 0 }, uScrollVel: { value: 0 } }
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat); quad.frustumCulled = false; scene.add(quad);

  // Higgsfield (or any) video later: <div class="fx-liquid" data-video="/assets/video/hero.mp4">
  const src = el.getAttribute('data-video');
  let vtex = null, video = null;
  if (src) {
    video = D.createElement('video');
    Object.assign(video, { src, muted: true, loop: true, playsInline: true, preload: 'auto' });
    video.crossOrigin = 'anonymous';
    video.addEventListener('loadeddata', () => {
      if (vtex) return;
      vtex = new THREE.VideoTexture(video); vtex.colorSpace = THREE.SRGBColorSpace; vtex.minFilter = THREE.LinearFilter;
      mat.uniforms.uTex.value = vtex; mat.uniforms.uHasVideo.value = 1;
      if (!RM) video.play().catch(() => {});
    });
    video.load();
  }

  const target = new THREE.Vector2(0.5, 0.5); let energy = 0, hovering = false, inView = true, t0 = performance.now(), last = t0;
  el.addEventListener('pointerenter', () => { hovering = true; });
  el.addEventListener('pointerleave', () => { hovering = false; });
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height;
    energy = Math.min(1.4, energy + 6 * Math.hypot(x - target.x, y - target.y)); target.set(x, y);
  });
  function size() {
    const r = el.getBoundingClientRect();
    renderer.setPixelRatio(Math.min(W.devicePixelRatio || 1, 1.5));
    renderer.setSize(Math.max(1, r.width), Math.max(1, r.height), false);
    mat.uniforms.uRes.value.set(r.width, r.height);
  }
  size(); W.addEventListener('resize', size, { passive: true });
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView && !RM) requestAnimationFrame(tick); }, { rootMargin: '120px' }).observe(el);
  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    const u = mat.uniforms;
    u.uMouse.value.lerp(target, 0.12);
    energy = THREE.MathUtils.lerp(energy, hovering ? 0.18 : 0, Math.min(1, 1.6 * dt));
    u.uStrength.value = energy;
    u.uScrollVel.value = THREE.MathUtils.lerp(u.uScrollVel.value, S.velocity, 0.1);
    u.uTime.value = (now - t0) / 1000;
    if (video && video.videoWidth) u.uTexSize.value.set(video.videoWidth, video.videoHeight);
    renderer.render(scene, cam);
    if (!RM && inView && !D.hidden) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  D.addEventListener('visibilitychange', () => { if (!D.hidden && inView && !RM) { last = performance.now(); requestAnimationFrame(tick); } });
  el.classList.add('fx-liquid--on');
}

/* ---------------- 3 · tilt cards + glow orb ---------------- */
const ORB_VS = `attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;
const ORB_FS = `precision highp float;
${SIMPLEX}
uniform vec2 uRes; uniform vec2 uMouse; uniform float uTime; uniform float uIntensity;
varying vec2 vUv;
void main(){
  vec2 frag = vUv * uRes; vec2 d = (frag - uMouse) / uRes.y; float r = length(d); float ang = atan(d.y, d.x);
  float n = snoise(vec3(cos(ang) * 1.4, sin(ang) * 1.4, uTime * 0.6));
  float radius = 0.42 + n * 0.06; float core = smoothstep(radius, 0.0, r); float halo = exp(-r * 2.4) * 0.9;
  float plasma = snoise(vec3(d * 5.0, uTime * 0.8)) * 0.5 + 0.5;
  vec3 cyan = vec3(0.008, 0.843, 0.961); vec3 blue = vec3(0.004, 0.435, 0.839); vec3 purple = vec3(0.478, 0.239, 1.0);
  vec3 col = mix(mix(blue, purple, 0.35 * (1.0 - plasma)), cyan, plasma) * (core * 1.6 + halo);
  col += vec3(0.85, 1.0, 1.0) * pow(core, 4.0) * 0.5;
  float a = clamp((core * 0.9 + halo) * uIntensity, 0.0, 1.0) * 0.55;
  gl_FragColor = vec4(col * uIntensity, a);
}`;
const Orb = {
  gl: null, canvas: null, failed: false, raf: 0, host: null, on: false, level: 0, x: 0, y: 0, tx: 0, ty: 0, t0: performance.now(),
  init() {
    if (this.gl || this.failed) return !!this.gl;
    const c = D.createElement('canvas'); c.className = 'fx-orb'; c.setAttribute('aria-hidden', 'true');
    const gl = c.getContext('webgl', { premultipliedAlpha: false, antialias: false, alpha: true });
    if (!gl) { this.failed = true; return false; }
    try {
      const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
      const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, ORB_VS)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, ORB_FS)); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('link');
      const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(p, 'aPos'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      this.u = { res: gl.getUniformLocation(p, 'uRes'), mouse: gl.getUniformLocation(p, 'uMouse'), time: gl.getUniformLocation(p, 'uTime'), k: gl.getUniformLocation(p, 'uIntensity') };
      gl.useProgram(p); this.gl = gl; this.canvas = c; return true;
    } catch (e) { this.failed = true; return false; }
  },
  enter(host) {
    if (!this.init()) { this.css(host); return; }
    if (this.host !== host) { host.insertBefore(this.canvas, host.firstChild); this.host = host; this.level = 0; this.x = this.tx; this.y = this.ty; }
    this.on = true; if (!this.raf) this.raf = requestAnimationFrame((t) => this.draw(t));
  },
  css(host) {
    if (host.querySelector(':scope > .fx-orb--css')) return;
    const d = D.createElement('div'); d.className = 'fx-orb fx-orb--css'; d.setAttribute('aria-hidden', 'true'); host.insertBefore(d, host.firstChild);
  },
  move(host, x, y) {
    this.tx = x; this.ty = y;
    const f = host.querySelector(':scope > .fx-orb--css');
    if (f) f.style.background = `radial-gradient(260px circle at ${x}px ${y}px, rgba(2,215,245,.26), rgba(122,61,255,.12) 40%, transparent 70%)`;
  },
  leave() { this.on = false; },
  draw() {
    const gl = this.gl, c = this.canvas; if (!gl || !c.isConnected) { this.raf = 0; return; }
    const dpr = Math.min(W.devicePixelRatio || 1, 1.5), w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    this.x += (this.tx - this.x) * 0.16; this.y += (this.ty - this.y) * 0.16; this.level += ((this.on ? 1 : 0) - this.level) * 0.09;
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(this.u.res, w, h); gl.uniform2f(this.u.mouse, this.x * dpr, h - this.y * dpr);
    gl.uniform1f(this.u.time, (performance.now() - this.t0) / 1000); gl.uniform1f(this.u.k, this.level);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (this.on || this.level > 0.01) this.raf = requestAnimationFrame((t) => this.draw(t));
    else { gl.clear(gl.COLOR_BUFFER_BIT); this.raf = 0; }
  }
};

const TILT_SEL = '.hm-svc,.hm-plan,.hm-ind,.hm-famc,.card,.post-card,.famcard,.scard,.serve-card,.support-card,.plan-card,.tier,.reco-card,.area-card,.service';
function startTilt() {
  if (RM || !FINE) return;
  D.querySelectorAll(TILT_SEL).forEach((el) => {
    if (el.closest('form') || el.closest('.planner-container') || el.dataset.fxTilt === 'off') return;
    el.classList.add('fx-tilt');
    const sheen = D.createElement('span'); sheen.className = 'fx-sheen'; sheen.setAttribute('aria-hidden', 'true'); el.insertBefore(sheen, el.firstChild);
    let rect = null;
    el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); el.classList.add('fx-hover', 'fx-tilting'); Orb.enter(el); });
    el.addEventListener('pointermove', (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const k = Math.min(1, 420 / Math.max(rect.width, 1)); // big rows tilt less
      const rx = (y / rect.height - 0.5) * -16 * k, ry = (x / rect.width - 0.5) * 18 * k;
      el.style.transform = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${1 + 0.015 * k})`;
      el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px');
      Orb.move(el, x, y);
    });
    el.addEventListener('pointerleave', () => { rect = null; el.classList.remove('fx-hover', 'fx-tilting'); el.style.transform = ''; Orb.leave(); });
  });
}

/* ---------------- 4 · terminal-style form fields ---------------- */
const FIELD_SEL = 'input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]):not([type=submit]):not([type=button]),select,textarea';
function startFields() {
  let n = 0;
  D.querySelectorAll(FIELD_SEL).forEach((f) => {
    if (f.closest('[data-fx-plain], .assistant, #assistant, .pts-assistant, [class*="assistant"]')) return;
    if (f.offsetParent === null && !f.closest('.planner-step,[hidden]')) return;
    if (f.parentElement.classList.contains('fx-field-wrap')) return;
    const wrap = D.createElement('span'); wrap.className = 'fx-field-wrap';
    f.parentNode.insertBefore(wrap, f); wrap.appendChild(f);
    const svg = D.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'fx-draw'); svg.setAttribute('aria-hidden', 'true');
    const id = 'fxg' + (n++);
    svg.innerHTML = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#02D7F5"/><stop offset="60%" stop-color="#016FD6"/><stop offset="100%" stop-color="#7A3DFF"/></linearGradient></defs><rect class="fx-draw__line" pathLength="1" rx="10" ry="10" stroke="url(#${id})"/>`;
    wrap.appendChild(svg);
    const rect = svg.querySelector('rect');
    const fit = () => { const w = f.offsetWidth, h = f.offsetHeight; if (!w) return; rect.setAttribute('x', 0.75); rect.setAttribute('y', 0.75); rect.setAttribute('width', Math.max(w - 1.5, 0)); rect.setAttribute('height', Math.max(h - 1.5, 0)); };
    f.addEventListener('focus', () => { fit(); wrap.classList.add('fx-on'); });
    f.addEventListener('blur', () => wrap.classList.remove('fx-on'));
    f.addEventListener('invalid', () => { fit(); wrap.classList.add('fx-bad'); });
    f.addEventListener('input', () => wrap.classList.remove('fx-bad'));
    // the field's own label gets a terminal prompt
    const lab = (f.id && D.querySelector(`label[for="${CSS.escape(f.id)}"]`)) || f.closest('label');
    if (lab && !lab.querySelector('.fx-prompt') && lab.textContent.trim().length < 60) {
      const p = D.createElement('span'); p.className = 'fx-prompt'; p.setAttribute('aria-hidden', 'true'); p.textContent = '>';
      lab.insertBefore(p, lab.firstChild); lab.classList.add('fx-prompted');
    }
  });
  // planner steps / tabs reveal fields later — keep the outline sized
  W.addEventListener('resize', () => D.querySelectorAll('.fx-field-wrap.fx-on input,.fx-field-wrap.fx-on textarea,.fx-field-wrap.fx-on select').forEach((f) => f.dispatchEvent(new Event('focus'))), { passive: true });
}

/* ---------------- 5 · magnetic buttons ---------------- */
function startMagnet() {
  if (RM || !FINE) return;
  D.querySelectorAll('.btn-primary,.hm-btn--main,.hm-btn--primary,.btn-go,.planner-submit,[data-fx-magnet]').forEach((b) => {
    if (b.closest('.site-header,.mobile-bar,.announcement')) return;
    b.classList.add('fx-mag');
    let r = null;
    b.addEventListener('pointerenter', () => { r = b.getBoundingClientRect(); b.classList.add('fx-magging'); });
    b.addEventListener('pointermove', (e) => {
      if (!r) r = b.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
      b.style.transform = `translate(${(x * 0.28).toFixed(1)}px, ${(y * 0.36).toFixed(1)}px)`;
    });
    b.addEventListener('pointerleave', () => { r = null; b.classList.remove('fx-magging'); b.style.transform = ''; });
  });
}

/* ---------------- 6 · Lenis smooth scrolling ---------------- */
async function startLenis() {
  if (RM) return;
  let Lenis;
  try { Lenis = (await import(HERE + 'lenis-1.1.13.mjs')).default; } catch (e) { return; }
  const lenis = new Lenis({
    lerp: 0.1, smoothWheel: true, syncTouch: false,
    prevent: (node) => !!(node.closest && node.closest('[data-lenis-prevent],.nav-more__panel,.login-menu__panel,.site-nav,dialog,[role=dialog],[class*="assistant"],.ss-modal,textarea,select'))
  });
  S._lenis = lenis;
  lenis.on('scroll', (l) => { S.velocity = l.velocity || 0; readScroll(); });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  // in-page anchors keep their scroll-padding offset
  D.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href*="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const u = new URL(a.href, location.href);
    if (u.pathname !== location.pathname || !u.hash || u.hash === '#') return;
    let t = null; try { t = D.querySelector(decodeURIComponent(u.hash)); } catch (err) { return; }
    if (!t) return;
    e.preventDefault();
    lenis.scrollTo(t, { offset: -90 });
    history.pushState(null, '', u.hash);
  });
  // menus that lock the page (phone nav) stop Lenis while open
  new MutationObserver(() => {
    const locked = getComputedStyle(D.body).overflow === 'hidden' || ROOT.classList.contains('nav-open') || D.body.classList.contains('nav-open');
    locked ? lenis.stop() : lenis.start();
  }).observe(D.body, { attributes: true, attributeFilter: ['class', 'style'] });
}

/* ---------------- boot ---------------- */
async function boot() {
  ROOT.classList.add('fx');
  startFields();
  startTilt();
  startMagnet();
  startLenis();
  // home sections: reveal a quarter-screen early so nothing reads as empty while scrolling
  if ('IntersectionObserver' in W) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px 25% 0px' });
    D.querySelectorAll('.hm-reveal:not(.is-in)').forEach((r) => io.observe(r));
  }
  if (!webglOK()) { ROOT.classList.add('fx-nogl'); return; }
  let THREE;
  try { THREE = await import(HERE + 'three-0.160.0.module.min.js'); } catch (e) { ROOT.classList.add('fx-nogl'); return; }
  try { await startBackground(THREE); } catch (e) { ROOT.classList.add('fx-nogl'); }
  D.querySelectorAll('.fx-liquid').forEach((el) => { try { startLiquid(THREE, el); } catch (e) { /* static gradient stays */ } });
}
if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
