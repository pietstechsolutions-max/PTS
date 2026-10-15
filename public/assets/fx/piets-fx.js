/* Piets FX — one module for the whole site (Oct 15 2026).
   Ported from the piets-landing preview (CanvasBg.tsx, LiquidVideo.tsx, GlowOrb.tsx) into plain
   JavaScript: no React, no Next.js. Loaded on every page by the build (scripts/build-blog.js).

   What it does
   1. Background (every page): a slow domain-warped fbm field on obsidian + drifting dust.
      Home: Brain AI (section 1b) — a living brain in the hero with every cable type running
      out of it, down the page, into the device that belongs to each section.
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
const BRAIN_HERO = IS_HOME && !!D.querySelector('[data-hm-brain]');

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
  if (IS_HOME && !BRAIN_HERO) {   // the old fiber coil; Brain AI's cable run replaces it on the home page
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
uniform float uTime; uniform float uSeed; uniform float uHalo; uniform float uVelocity; uniform float uBright; uniform float uCoilLevel; uniform float uType;
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
  if (uType > 0.5 && uType < 1.5) base = mix(BLUE_DP, BLUE, facing);                     // Cat6
  else if (uType > 1.5 && uType < 2.5) base = mix(NAVY_PUR, PURPLE, 0.4 + 0.6 * facing); // HDMI
  else if (uType > 2.5 && uType < 3.5) base = vec3(0.55, 0.62, 0.74) * (0.5 + 0.5 * facing); // coax
  else if (uType > 3.5) base = mix(BLUE, CYAN, facing * 0.6);                          // Cat6A
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
      uniforms: { uTime: { value: 0 }, uUncoil: { value: 0 }, uExpand: { value: halo ? 0.07 : 0 }, uSeed: { value: seed }, uHalo: { value: halo ? 1 : 0 }, uVelocity: { value: 0 }, uBright: { value: 1 }, uCoilLevel: { value: 0.42 }, uType: { value: 0 } }
    });
    const segs = W.innerWidth < 700 ? 420 : 720;
    for (let i = 0; i < 5; i++) {
      const g = new THREE.TubeGeometry(new Strand(i), segs, 0.028, 8, false);
      const c = new THREE.TubeGeometry(new Coil(i), segs, 0.028, 8, false);
      g.setAttribute('aCoil', c.getAttribute('position').clone());
      g.setAttribute('aCoilNormal', c.getAttribute('normal').clone());
      c.dispose();
      const core = mk(1.618 * i, false), halo = mk(1.618 * i, true);
      if (BRAIN_HERO) { core.uniforms.uType.value = i; halo.uniforms.uType.value = i; }
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
        const u = m.uniforms; u.uTime.value = clockT; u.uUncoil.value = BRAIN_HERO ? 2 : uncoil; u.uVelocity.value = vel;
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

/* ---------------- 1b · Brain AI + the cable run (home) ----------------
   A living point-cloud brain is the hero (shape from the Piet's Brain project, re-coloured to palette B).
   Out of it runs a bundle of real cable types — fiber, Cat6, Cat6A, HDMI, coax, speaker wire — that
   sweeps to the left edge of the page and follows you all the way down. At every section a cable
   peels off and plugs into the device that belongs there (Wi-Fi in the middle of the four screens,
   cameras, audio, access control, smart home, a switch for services, a TV for the demos …).
   Wireless shows as radio rings and Wi-Fi arcs. Cables draw themselves in as you scroll.
   One fixed canvas, drawn in page pixels from the real element positions, so it lands right at
   every width. Palette B only — no orange, no pink. */
const CABLE = {            // colour, radius in px, look (0 fiber · 1 twisted pair · 2 coax · 3 flat lead)
  fiber: { c: [0.008, 0.843, 0.961], r: 1.8, k: 0 },
  cat6:  { c: [0.02, 0.48, 0.98],    r: 2.8, k: 1 },
  cat6a: { c: [0.12, 0.66, 1.0],     r: 2.6, k: 1 },
  coax:  { c: [0.80, 0.86, 0.95],    r: 3.4, k: 2 },
  hdmi:  { c: [0.478, 0.239, 1.0],   r: 2.3, k: 3, twin: 4.5 },
  audio: { c: [0.70, 0.62, 1.0],     r: 1.6, k: 3, twin: 3.6 }
};
function startBrainRun(THREE) {
  const brainEl = D.querySelector('[data-hm-brain]');
  if (!brainEl) return;
  const canvas = D.createElement('canvas');
  canvas.id = 'fx-brain'; canvas.setAttribute('aria-hidden', 'true');
  const bgc = D.getElementById('fx-bg');
  if (bgc) bgc.after(canvas); else D.body.insertBefore(canvas, D.body.firstChild);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
  catch (e) { canvas.remove(); return; }
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -4000, 4000);
  const small = W.innerWidth < 700;

  /* --- brain points (shape from the Piet's Brain project, re-coloured to palette B) --- */
  let seed = 20261015; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const P = new Uint8Array(512); { const p = [...Array(256).keys()]; for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } for (let i = 0; i < 512; i++) P[i] = p[i & 255]; }
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10), lerp = (a, b, t) => a + (b - a) * t;
  const grad = (h, x, y, z) => { const u = h < 8 ? x : y, v = h < 4 ? y : (h === 12 || h === 14 ? x : z); return ((h & 1) ? -u : u) + ((h & 2) ? -v : v); };
  function perlin(x, y, z) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255; x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = fade(x), v = fade(y), w = fade(z), A = P[X] + Y, AA = P[A] + Z, AB = P[A + 1] + Z, B = P[X + 1] + Y, BA = P[B] + Z, BB = P[B + 1] + Z;
    return lerp(lerp(lerp(grad(P[AA] & 15, x, y, z), grad(P[BA] & 15, x - 1, y, z), u), lerp(grad(P[AB] & 15, x, y - 1, z), grad(P[BB] & 15, x - 1, y - 1, z), u), v),
      lerp(lerp(grad(P[AA + 1] & 15, x, y, z - 1), grad(P[BA + 1] & 15, x - 1, y, z - 1), u), lerp(grad(P[AB + 1] & 15, x, y - 1, z - 1), grad(P[BB + 1] & 15, x - 1, y - 1, z - 1), u), v), w);
  }
  function unit() { let x, y, z, d; do { x = rnd() * 2 - 1; y = rnd() * 2 - 1; z = rnd() * 2 - 1; d = x * x + y * y + z * z; } while (d > 1 || d < 1e-4); d = Math.sqrt(d); return [x / d, y / d, z / d]; }
  function cortex() {
    for (let tries = 0; tries < 40; tries++) {
      const u = unit(), s = u[0] >= 0 ? 1 : -1;
      let x = u[0] * 0.9 + s * 0.075, y = u[1] * 0.8, z = u[2] * 1.16;
      if (y < -0.22) y = -0.22 + (y + 0.22) * 0.5;
      const tl = Math.exp(-((y + 0.22) ** 2) / 0.05) * Math.exp(-((z - 0.2) ** 2) / 0.22);
      x += s * 0.12 * tl * Math.abs(u[0]); y -= 0.1 * tl * Math.abs(u[0]);
      if (z > 0 && y > 0) y += 0.07 * z;
      const n = perlin(x * 3.3 + 7, y * 3.3, z * 3.3), ridge = 1 - Math.abs(n);
      if (rnd() > 0.28 + 0.72 * ridge * ridge) continue;
      const sc = 1 + 0.09 * (ridge * ridge - 0.5), fiss = Math.exp(-(x * x) / 0.006) * Math.max(0, y) * 0.18;
      return [x * sc, y * sc - fiss, z * sc, ridge];
    }
    return [0, 0, 0, 0];
  }
  const NS = small ? 0.45 : 0.8;
  const cyan = new THREE.Color('#02D7F5'), blue = new THREE.Color('#016FD6'), purple = new THREE.Color('#7A3DFF'), white = new THREE.Color('#CFF8FF');
  const pos = [], col = [], sd = [], surf = [];
  const add = (x, y, z, c) => { pos.push(x, y, z); col.push(c.r, c.g, c.b); sd.push(rnd()); };
  for (let i = 0; i < 9000 * NS; i++) { const [x, y, z, r] = cortex(); surf.push([x, y, z]); const c = blue.clone().lerp(cyan, Math.min(1, r * 1.1)).lerp(purple, Math.max(0, -y - 0.05) * 0.9); if (rnd() < 0.04) c.copy(white); add(x, y, z, c); }
  for (let i = 0; i < 1800 * NS; i++) { const [x, y, z] = cortex(); const k = 0.2 + 0.72 * Math.pow(rnd(), 0.7); add(x * k, y * k, z * k, blue.clone().lerp(purple, rnd() * 0.6)); }
  for (let i = 0; i < 900 * NS; i++) { const u = unit(); const x = u[0] * 0.52, y = u[1] * 0.26 - 0.42, z = u[2] * 0.34 - 0.78; if (rnd() > 0.35 + 0.65 * Math.abs(Math.sin(y * 58))) continue; add(x, y, z, purple.clone().lerp(cyan, 0.35 * rnd())); }
  for (let i = 0; i < 360 * NS; i++) { const t = rnd(), a = rnd() * Math.PI * 2, r = (0.14 - 0.05 * t) * Math.sqrt(rnd()); add(Math.cos(a) * r, -0.38 - t * 0.62, -0.22 - t * 0.12 + Math.sin(a) * r, cyan.clone().lerp(blue, t)); }
  const linkPos = [], linkPh = [], linkT = [];
  for (let i = 0; i < 1700 * NS; i++) {
    const a = surf[Math.floor(rnd() * surf.length)]; let best = null, bd = 1e9;
    for (let k = 0; k < 30; k++) { const b = surf[Math.floor(rnd() * surf.length)]; const d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2; if (d > 0.004 && d < bd) { bd = d; best = b; } }
    if (!best || bd > 0.16) continue; const ph = rnd(); linkPos.push(...a, ...best); linkT.push(0, 1); linkPh.push(ph, ph);
  }
  const pix = Math.min(W.devicePixelRatio || 1, 1.75);
  const brainMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPix: { value: pix }, uScale: { value: 100 }, uMouse: { value: new THREE.Vector2(9, 9) }, uCtr: { value: new THREE.Vector2() }, uIn: { value: RM ? 1 : 0 } },
    vertexShader: `${SIMPLEX}
uniform float uTime, uPix, uScale, uIn; uniform vec2 uMouse, uCtr;
attribute vec3 color; attribute float aSeed; varying vec3 vCol; varying float vGlow;
void main(){
  vec3 p = position * (1.0 + 0.022 * sin(uTime * 1.25 + position.y * 2.2 + position.z * 1.3));
  p = mix(p * (0.2 + 2.4 * aSeed), p, smoothstep(0.0, 1.0, clamp(uIn * 1.4 - aSeed * 0.4, 0.0, 1.0)));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec2 q = ((modelMatrix * vec4(p, 1.0)).xy - uCtr) / uScale - uMouse;
  float f = exp(-dot(q, q) * 5.0);
  mv.xy += normalize(q + 1e-4) * f * 0.12 * uScale;
  float wave = 0.5 + 0.5 * sin(uTime * 2.1 - length(position) * 5.5 + aSeed * 6.2831);
  float fire = smoothstep(0.965, 1.0, sin(uTime * 0.75 + aSeed * 61.0));
  vGlow = (0.45 + 0.5 * wave + fire * 1.6 + f * 1.8) * uIn;
  vCol = color;
  gl_PointSize = uPix * (1.6 + 1.5 * fract(aSeed * 7.13) + fire * 2.0) * clamp(uScale / 110.0, 0.7, 1.4);
  gl_Position = projectionMatrix * mv;
}`,
    fragmentShader: `varying vec3 vCol; varying float vGlow;
void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(vCol * vGlow, a * a * 0.9); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const bg = new THREE.BufferGeometry();
  bg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  bg.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  bg.setAttribute('aSeed', new THREE.Float32BufferAttribute(sd, 1));
  const brain = new THREE.Group(); scene.add(brain);
  const spin = new THREE.Group(); brain.add(spin); spin.rotation.set(0.12, -0.7, 0);
  const pts = new THREE.Points(bg, brainMat); pts.frustumCulled = false; spin.add(pts);
  const lg = new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.Float32BufferAttribute(linkPos, 3));
  lg.setAttribute('aLT', new THREE.Float32BufferAttribute(linkT, 1));
  lg.setAttribute('aPh', new THREE.Float32BufferAttribute(linkPh, 1));
  const linkMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uIn: { value: RM ? 1 : 0 } },
    vertexShader: `attribute float aLT; attribute float aPh; varying float vLT; varying float vPh; void main(){ vLT = aLT; vPh = aPh; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform float uTime, uIn; varying float vLT; varying float vPh;
void main(){ float tr = fract(uTime * 0.45 + vPh * 7.0); float b = smoothstep(0.18, 0.0, abs(vLT - tr)); gl_FragColor = vec4(mix(vec3(0.05, 0.45, 0.95), vec3(0.75, 0.98, 1.0), b), (0.05 + b * 0.5) * uIn); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const links = new THREE.LineSegments(lg, linkMat); links.frustumCulled = false; spin.add(links);

  /* --- cables: tubes in page pixels; x = page x - width/2, y = -page y --- */
  const tubeVS = `varying vec2 vUv; varying vec3 vN; varying float vDocY;
void main(){ vUv = uv; vN = normalize(normalMatrix * normal); vec4 wp = modelMatrix * vec4(position, 1.0); vDocY = -wp.y; gl_Position = projectionMatrix * viewMatrix * wp; }`;
  const tubeFS = `${BRAND}
uniform vec3 uColor; uniform float uKind, uProg, uTime, uLen, uPh, uHalo, uDir, uHead, uFadeEnd;
varying vec2 vUv; varying vec3 vN; varying float vDocY;
void main(){
  if (vUv.x > uProg || vDocY > uHead) discard;
  float facing = clamp(abs(vN.z), 0.0, 1.0);
  float s = vUv.x * uLen;                              // px along the cable, so patterns keep their size
  float head = max(smoothstep(22.0, 0.0, (uProg - vUv.x) * uLen) * step(uProg, 0.999), smoothstep(26.0, 0.0, uHead - vDocY) * step(uHead, 1e8));
  float flow = uDir > 0.0 ? s - uTime * 140.0 : s + uTime * 140.0;
  vec3 col; float a;
  if (uKind < 0.5) {                                   // fiber: glass line, fast light pulses
    float p = exp(-pow((fract((s - uTime * 300.0) / 120.0 + uPh) - 0.5) * 9.0, 2.0));
    col = mix(uColor * 0.85, vec3(0.9, 1.0, 1.0), p + facing * 0.2); a = 0.85 + p * 0.15;
  } else if (uKind < 1.5) {                            // Cat6: jacket, twisted-pair stripe, data packets
    float tw = smoothstep(0.35, 0.5, abs(fract(s / 9.0 + vUv.y * 2.0) - 0.5));
    float pk = step(0.86, fract(flow / 34.0 + uPh)) * step(fract(flow / 260.0 + uPh), 0.5);
    col = uColor * (0.55 + facing * 0.8) * (0.85 + 0.25 * tw) + CYAN * pk * 1.3; a = 0.95;
  } else if (uKind < 2.5) {                            // coax: silver sheath, slow cyan band
    float band = exp(-pow((fract(flow / 300.0 + uPh) - 0.5) * 7.0, 2.0));
    col = uColor * (0.3 + facing * 0.6) + CYAN * band; a = 0.95;
  } else {                                             // HDMI / speaker wire: flat twin lead, wide pulses
    float p = exp(-pow((fract(flow / 180.0 + uPh) - 0.5) * 5.0, 2.0));
    col = uColor * (0.55 + facing * 0.75) + vec3(0.85, 0.8, 1.0) * p * 0.9; a = 0.95;
  }
  col += vec3(0.8, 1.0, 1.0) * head * 1.6;
  float ends = smoothstep(0.0, 0.02, vUv.x) * mix(1.0, smoothstep(1.0, 0.6, vUv.x), uFadeEnd);
  if (uHalo > 0.5) { a = pow(facing, 3.0) * (0.13 + head * 0.5); col = mix(uColor, CYAN, 0.4) * 1.3; }
  gl_FragColor = vec4(col, a * ends);
}`;
  const cables = [];
  const clearCables = () => { cables.forEach((c) => { scene.remove(c.mesh); c.mesh.geometry.dispose(); c.mesh.material.dispose(); }); cables.length = 0; };
  // pts: [[x,y],…] in page px. opt: { gate:'scroll'|'grow', at: page y where a 'grow' cable starts, fadeEnd, dir }
  function addCable(pts, type, opt) {
    const T = CABLE[type] || CABLE.cat6;
    const make = (dx, dy) => new THREE.CatmullRomCurve3(pts.map(([x, y], k) => new THREE.Vector3(x + dx - cw / 2, -(y + dy), (opt.z || 0) + (k % 2) * 6)), false, 'centripetal');
    const curves = T.twin ? [make(-T.twin / 2, -T.twin / 2), make(T.twin / 2, T.twin / 2)] : [make(0, 0)];
    const ph = (cables.length * 0.137) % 1;
    curves.forEach((curve) => {
      const len = curve.getLength();
      const segs = Math.max(30, Math.min(1400, Math.round(len / 7)));
      [true, false].forEach((halo) => {
        if (halo && (type === 'coax' || T.twin || opt.halo === false)) return;
        const m = new THREE.ShaderMaterial({
          uniforms: { uColor: { value: new THREE.Vector3(...T.c) }, uKind: { value: T.k }, uProg: { value: 1 }, uTime: { value: 0 }, uLen: { value: len }, uPh: { value: ph }, uHalo: { value: halo ? 1 : 0 }, uDir: { value: opt.dir || 1 }, uHead: { value: 1e9 }, uFadeEnd: { value: opt.fadeEnd ? 1 : 0 } },
          vertexShader: tubeVS, fragmentShader: tubeFS, transparent: true, depthWrite: false,
          blending: halo ? THREE.AdditiveBlending : THREE.NormalBlending, side: halo ? THREE.BackSide : THREE.FrontSide
        });
        const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, segs, T.r * (halo ? 3.4 : 1), 8, false), m);
        mesh.frustumCulled = false; mesh.renderOrder = halo ? 1 : 2; scene.add(mesh);
        cables.push({ mesh, m, gate: opt.gate || 'scroll', at: opt.at || 0, len, node: opt.node });
      });
    });
  }

  /* --- wireless: radio rings (brain, Wi-Fi) + Wi-Fi arcs that travel to the phone --- */
  const airMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uB: { value: new THREE.Vector3(-999, -999, 1) }, uF: { value: new THREE.Vector3(-999, -999, 1) }, uTo: { value: new THREE.Vector2(1, 0) }, uDist: { value: 0 }, uIn: { value: RM ? 1 : 0 }, uWifiOn: { value: RM ? 1 : 0 }, uPix: { value: pix } },
    vertexShader: `void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: `${BRAND}
uniform float uTime, uDist, uIn, uWifiOn, uPix; uniform vec3 uB, uF; uniform vec2 uTo;
float rings(vec2 d, float R, float speed){
  float re = length(d * vec2(1.0, 1.55)), a = 0.0;
  for (int k = 0; k < 3; k++) { float ph = fract(uTime * speed + float(k) / 3.0); float rr = R * 0.95 + ph * R * 2.4;
    a += exp(-pow((re - rr) / 1.7, 2.0)) * (1.0 - ph) * (1.0 - ph); }
  return a;
}
void main(){
  vec2 p = gl_FragCoord.xy / uPix;                     // screen px, y up
  float rb = rings(p - uB.xy, uB.z, 0.14) * uIn;
  float rf = rings(p - uF.xy, uF.z, 0.2) * uWifiOn;
  vec3 col = mix(CYAN, PURPLE, 0.35) * rb * 0.6 + CYAN * rf * 0.6; float a = (rb + rf) * 0.6;
  vec2 d = p - uF.xy; float r = length(d);
  float cone = smoothstep(0.80, 0.93, dot(normalize(d + 1e-4), uTo));
  for (int k = 0; k < 4; k++) {
    float ph = fract(uTime * 0.42 + float(k) / 4.0);
    float rr = uF.z + ph * (uDist - uF.z);
    float arc = exp(-pow((r - rr) / 2.6, 2.0)) * cone * smoothstep(0.0, 0.12, ph) * smoothstep(1.0, 0.85, ph) * uWifiOn;
    a += arc * 1.1; col += mix(CYAN, vec3(0.85, 1.0, 1.0), 0.4) * arc * 1.3;
  }
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}`,
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending
  });
  const air = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), airMat); air.frustumCulled = false; air.renderOrder = 0; scene.add(air);

  /* --- layout from the real page (offset positions: never fooled by reveal transforms) --- */
  function docRect(el) {
    let x = 0, y = 0, e = el;
    while (e) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
    return { l: x, t: y, r: x + el.offsetWidth, b: y + el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2, w: el.offsetWidth, h: el.offsetHeight };
  }
  let cw = 0, ch = 0, R = 120, born = RM ? 1e9 : -1, B = null, F = null, phoneTo = null, spineEnd = 0;
  function layout() {
    cw = ROOT.clientWidth; ch = W.innerHeight;
    renderer.setPixelRatio(pix); renderer.setSize(W.innerWidth, ch, false);
    camera.left = -W.innerWidth / 2; camera.right = W.innerWidth / 2; camera.top = ch / 2; camera.bottom = -ch / 2; camera.updateProjectionMatrix();
    clearCables();
    // the brain
    B = docRect(brainEl);
    R = Math.max(80, Math.min(190, B.w * 0.37));
    brain.position.set(B.cx - cw / 2, -B.cy, 0); brain.scale.setScalar(R);
    brainMat.uniforms.uScale.value = R; brainMat.uniforms.uCtr.value.set(brain.position.x, brain.position.y); airMat.uniforms.uB.value.z = R;
    // where the bundle runs: the middle of the left gutter, or just inside the edge on narrow screens
    const wrap = D.querySelector('.hm-hero .hm-wrap') || D.body;
    const wl = docRect(wrap).l + parseFloat(getComputedStyle(wrap).paddingLeft || 0);
    const X = wl >= 70 ? Math.round(wl / 2) : Math.max(8, Math.round(wl * 0.42));
    const hero = docRect(D.querySelector('.hm-hero') || brainEl);
    // every device the bundle feeds, top to bottom
    const nodes = [...D.querySelectorAll('[data-hm-node]')].map((el) => { const r = docRect(el), card = el.closest('.hm-stop'); if (card) { const c = docRect(card); r.l = c.l - 4; } return { el, r, type: (el.getAttribute('data-cable') || 'cat6').split(',')[0] }; })
      .filter((n) => n.r.w > 0).sort((a, b) => a.r.cy - b.r.cy);
    spineEnd = nodes.length ? nodes[nodes.length - 1].r.cy + 140 : hero.b + 400;
    // 1 · the trunk: out of the brain, along the bottom of the hero, then down the gutter to the last device
    const types = ['fiber', 'cat6', 'hdmi', 'coax', 'cat6a'];
    const ticks = D.querySelector('.hm-hero .hm-ticks');
    const sweepY = Math.min(hero.b - 18, Math.max(hero.b - (cw < 900 ? 34 : 56), ticks ? docRect(ticks).b + 40 : 0));
    types.forEach((type, j) => {
      const o = (j - 2) * 8.5;
      const sx = B.cx + o * 1.4, sy = B.cy + R * 0.5;
      const pts = [[sx, sy], [sx + o, sy + Math.max(40, (sweepY - sy) * 0.55)], [Math.max(X + 60, sx - 120) + o, sweepY + o * 0.6], [X + 60 + o, sweepY + o * 0.6 + 2], [X + o, sweepY + 70]];
      const end = spineEnd - 20 * j;                       // straight down the gutter: a point every 240px keeps it straight
      for (let yy = sweepY + 70 + 240; yy < end; yy += 240) pts.push([X + o + Math.sin(yy * 0.004 + j) * 1.5, yy]);
      pts.push([X + o, end]);
      addCable(pts, type, { gate: 'scroll', fadeEnd: true, z: -10, halo: j === 0 });
    });
    // 2 · one cable peels off the bundle into each device
    nodes.forEach((n, i) => {
      const r = n.r, ex = r.l + 6, ey = r.cy, o = ((i % 5) - 2) * 6.5;
      const startY = ey - Math.min(120, Math.max(50, (ex - X) * 0.35));
      const pts = ex - X < 30 ? [[X + o, startY], [X + o, ey - 10], [ex, ey]]
        : [[X + o, startY], [X + o + 4, startY + (ey - startY) * 0.55], [X + Math.min(60, (ex - X) * 0.4), ey], [ex - Math.min(50, (ex - X) * 0.3), ey], [ex, ey]];
      addCable(pts, n.type, { gate: 'grow', at: startY, z: 6, node: n.el });
      if (n.el.matches('.hm-hub--wifi')) F = { r, i };
    });
    // 3 · Wi-Fi feeds the four screens around it
    const stage = D.querySelector('[data-hm-stage]');
    phoneTo = null;
    if (stage && F) {
      const hx = F.r.cx, hy = F.r.cy, hr = F.r.w / 2;
      const plan = { tv: [['hdmi', 0]], nvr: [['cat6', -1], ['coax', 1]], pc: [['fiber', -1], ['cat6a', 1]] };
      stage.querySelectorAll('[data-hm-wire]').forEach((d) => {
        const kind = (d.className.match(/hm-dev--(\w+)/) || [])[1];
        const panel = d.querySelector('.hm-panel, .hm-phone'); if (!panel) return;
        const pr = docRect(panel);
        const cx = Math.max(pr.l, Math.min(pr.r, hx)), cy = Math.max(pr.t, Math.min(pr.b, hy));
        const dl = cx - pr.l, dr = pr.r - cx, dt = cy - pr.t, db = pr.b - cy, m = Math.min(dl, dr, dt, db);
        const ep = m === dt ? { x: cx, y: pr.t + 10, nx: 0, ny: -1 } : m === db ? { x: cx, y: pr.b - 10, nx: 0, ny: 1 } : m === dl ? { x: pr.l + 10, y: cy, nx: -1, ny: 0 } : { x: pr.r - 10, y: cy, nx: 1, ny: 0 };
        if (kind === 'phone') { phoneTo = { x: ep.x, y: ep.y }; return; }
        (plan[kind] || [['cat6', 0]]).forEach(([type, off]) => {
          const ex = ep.x + (ep.ny ? 16 * off : 0), ey = ep.y + (ep.nx ? 16 * off : 0);
          const ang = Math.atan2(ey - hy, ex - hx) + off * 0.25;
          const sx = hx + Math.cos(ang) * hr * 0.8, sy = hy + Math.sin(ang) * hr * 0.8, bend = Math.min(90, Math.hypot(ex - sx, ey - sy) * 0.5);
          addCable([[sx, sy], [sx + Math.cos(ang) * bend * 0.5, sy + Math.sin(ang) * bend * 0.5], [ex - ep.nx * bend, ey - ep.ny * bend], [ex, ey]], type, { gate: 'grow', at: hy, z: 4 });
        });
      });
    }
    if (RM) draw();
  }

  /* --- frame --- */
  let t = 0, last = performance.now(), active = true, raf = 0;
  const mouse = new THREE.Vector2(9, 9), mTarget = new THREE.Vector2(9, 9);
  W.addEventListener('pointermove', (e) => {
    if (!B) return;
    mTarget.set((e.clientX + W.scrollX - B.cx) / R, -(e.clientY + W.scrollY - B.cy) / R);
  }, { passive: true });
  function draw() {
    if (born < 0) born = t;
    const age = RM ? 99 : t - born;
    const y = W.scrollY || ROOT.scrollTop || 0;
    camera.position.set(0, -(y + ch / 2), 1000); camera.updateMatrixWorld();
    const grow = Math.min(1, age / 1.2);
    brainMat.uniforms.uIn.value = grow; linkMat.uniforms.uIn.value = grow;
    brainMat.uniforms.uTime.value = t; linkMat.uniforms.uTime.value = t; airMat.uniforms.uTime.value = t;
    airMat.uniforms.uIn.value = Math.min(1, Math.max(0, (age - 1.2) / 1.0));
    mouse.lerp(mTarget, 0.08); brainMat.uniforms.uMouse.value.copy(mouse);
    spin.rotation.y = -0.7 + Math.sin(t * 0.12) * 0.55;
    spin.rotation.x = 0.12 + Math.sin(t * 0.3) * 0.05;
    // the cable head follows the bottom of the screen; on load it first runs out of the brain
    const intro = Math.min(1, Math.max(0, (age - 0.5) / 1.6));
    const reach = y + ch * 0.97;
    const head = RM ? 1e9 : B.cy + (reach - B.cy) * intro * intro * (3 - 2 * intro);
    cables.forEach((c) => {
      const u = c.m.uniforms; u.uTime.value = t;
      if (c.gate === 'scroll') { u.uHead.value = head; u.uProg.value = 1; }
      else { u.uHead.value = 1e9; u.uProg.value = RM ? 1 : Math.min(1, Math.max(0, (head - c.at) / 260)); if (c.node && u.uProg.value >= 1 && !c.node.classList.contains('is-live')) c.node.classList.add('is-live'); }
    });
    // screen positions for the wireless shader (px, y up)
    airMat.uniforms.uB.value.x = B.cx - W.scrollX; airMat.uniforms.uB.value.y = ch - (B.cy - y);
    if (F) {
      airMat.uniforms.uF.value.set(F.r.cx - W.scrollX, ch - (F.r.cy - y), F.r.w * 0.5);
      airMat.uniforms.uWifiOn.value = RM ? 1 : Math.min(1, Math.max(0, (head - F.r.cy) / 300));
      if (phoneTo) {
        const dx = phoneTo.x - F.r.cx, dy = -(phoneTo.y - F.r.cy), L = Math.hypot(dx, dy) || 1;
        airMat.uniforms.uTo.value.set(dx / L, dy / L); airMat.uniforms.uDist.value = L + 6;
      }
    } else airMat.uniforms.uWifiOn.value = 0;
    renderer.render(scene, camera);
  }
  function loop(now) {
    raf = 0;
    const dt = Math.max(0, Math.min((now - last) / 1000, 0.05)); last = Math.max(last, now); t += dt;
    draw();
    if (active && !D.hidden) raf = requestAnimationFrame(loop);
  }
  const kick = () => { if (!raf && !RM && active && !D.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); } };
  // only runs while the brain or any of the cable run is on screen
  const watch = () => { const y = W.scrollY; const on = y < spineEnd + 200; if (on !== active) { active = on; canvas.style.visibility = on ? '' : 'hidden'; } if (RM) draw(); else kick(); };
  W.addEventListener('scroll', watch, { passive: true });
  D.addEventListener('visibilitychange', kick);
  let rq = 0; const relayout = () => { clearTimeout(rq); rq = setTimeout(() => { layout(); watch(); }, 120); };
  W.addEventListener('resize', relayout, { passive: true });
  W.addEventListener('load', relayout);
  if (D.fonts && D.fonts.ready) D.fonts.ready.then(relayout);
  if ('ResizeObserver' in W) new ResizeObserver(relayout).observe(D.body);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); ROOT.classList.remove('fx-brain'); canvas.remove(); });
  layout();
  ROOT.classList.add('fx-brain');
  W.__pietsBrain = { cables: () => cables.length, R: () => R, frame: () => t, seek: (sec) => { if (born < 0) born = t; t = born + sec; draw(); } }; // QA hook
  if (RM) draw(); else kick();
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
  if (BRAIN_HERO) { try { startBrainRun(THREE); } catch (e) { ROOT.classList.remove('fx-brain'); const c = D.getElementById('fx-brain'); if (c) c.remove(); } }
  D.querySelectorAll('.fx-liquid').forEach((el) => { try { startLiquid(THREE, el); } catch (e) { /* static gradient stays */ } });
}
if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
