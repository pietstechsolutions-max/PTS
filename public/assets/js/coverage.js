// coverage.js - Camera Coverage Planner (rough visual, not an engineering tool)
(function () {
  const stage = document.getElementById('cov-stage');
  if (!stage) return;
  const NS = 'http://www.w3.org/2000/svg';
  const W = 1000, H = 700;

  const LENSES = {
    wide: { label: 'Wide', fov: 110, range: 190 },
    standard: { label: 'Standard', fov: 80, range: 280 },
    long: { label: 'Long', fov: 40, range: 430 }
  };

  // Floor plans: outer shell + rooms [x, y, w, h, label]
  const PLANS = {
    house: { label: 'House', shell: [80, 70, 840, 560], rooms: [
      [80, 70, 300, 250, 'Living room'], [380, 70, 250, 250, 'Kitchen'], [630, 70, 290, 250, 'Garage'],
      [80, 320, 240, 310, 'Bedroom'], [320, 320, 260, 310, 'Hall & entry'], [580, 320, 340, 310, 'Backyard side']] },
    storefront: { label: 'Storefront / Restaurant', shell: [80, 70, 840, 560], rooms: [
      [80, 70, 560, 360, 'Dining / sales floor'], [640, 70, 280, 220, 'Register'], [640, 290, 280, 140, 'Office'],
      [80, 430, 420, 200, 'Kitchen / stock'], [500, 430, 420, 200, 'Back door & alley']] },
    office: { label: 'Office', shell: [80, 70, 840, 560], rooms: [
      [80, 70, 260, 200, 'Reception'], [340, 70, 580, 200, 'Open office'], [80, 270, 260, 360, 'Conference'],
      [340, 270, 300, 360, 'Hallway'], [640, 270, 280, 180, 'Server / IT'], [640, 450, 280, 180, 'Storage']] },
    warehouse: { label: 'Warehouse', shell: [60, 60, 880, 580], rooms: [
      [60, 60, 640, 420, 'Racking & floor'], [700, 60, 240, 240, 'Office'], [700, 300, 240, 180, 'Shipping'],
      [60, 480, 880, 160, 'Loading dock & yard']] }
  };

  // k = how many SVG units one screen pixel is; keeps text and handles readable on phones
  let k = 1;
  const measure = () => { const w = stage.getBoundingClientRect().width || W; k = Math.max(1, W / w); };
  const sz = (base, minPx) => Math.max(base, minPx * k);

  const state = { plan: 'house', lens: 'wide', cams: [], history: [], selected: -1 };
  const $ = (s) => document.querySelector(s);
  const el = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };

  const gPlan = el('g', {}, stage), gFov = el('g', {}, stage), gCams = el('g', {}, stage);
  const hint = el('text', { x: W / 2, y: H / 2 + 40, 'text-anchor': 'middle', fill: 'rgba(255,255,255,.7)', 'font-size': 22, 'font-weight': 600, 'font-family': 'inherit', 'pointer-events': 'none' }, stage);
  hint.textContent = 'Tap anywhere on the plan to drop a camera';

  function drawPlan() {
    measure();
    hint.setAttribute('font-size', sz(22, 14));
    gPlan.innerHTML = '';
    const p = PLANS[state.plan];
    for (let x = 0; x <= W; x += 25) el('line', { x1: x, y1: 0, x2: x, y2: H, stroke: 'rgba(255,255,255,.04)' }, gPlan);
    for (let y = 0; y <= H; y += 25) el('line', { x1: 0, y1: y, x2: W, y2: y, stroke: 'rgba(255,255,255,.04)' }, gPlan);
    p.rooms.forEach(([x, y, w, h, label]) => {
      el('rect', { x, y, width: w, height: h, fill: 'rgba(255,255,255,.02)', stroke: 'rgba(255,255,255,.22)', 'stroke-width': 2 }, gPlan);
      const t = el('text', { x: x + 12, y: y + 12 + sz(15, 10), fill: 'rgba(255,255,255,.5)', 'font-size': sz(15, 10), 'font-family': 'inherit' }, gPlan);
      t.textContent = label;
    });
    const [sx, sy, sw, sh] = p.shell;
    el('rect', { x: sx, y: sy, width: sw, height: sh, fill: 'none', stroke: '#01A2E8', 'stroke-width': 4, rx: 4 }, gPlan);
  }

  function sector(c) {
    const L = LENSES[c.lens], half = (L.fov / 2) * Math.PI / 180, a = c.angle * Math.PI / 180;
    const x1 = c.x + L.range * Math.cos(a - half), y1 = c.y + L.range * Math.sin(a - half);
    const x2 = c.x + L.range * Math.cos(a + half), y2 = c.y + L.range * Math.sin(a + half);
    return `M${c.x},${c.y} L${x1},${y1} A${L.range},${L.range} 0 0 1 ${x2},${y2} Z`;
  }

  function drawCams() {
    gFov.innerHTML = ''; gCams.innerHTML = '';
    hint.style.display = state.cams.length ? 'none' : '';
    state.cams.forEach((c, i) => {
      const sel = i === state.selected;
      el('path', { d: sector(c), fill: sel ? 'rgba(42,214,255,.30)' : 'rgba(1,162,232,.20)', stroke: 'rgba(42,214,255,.75)', 'stroke-width': 1.5 }, gFov);
      const g = el('g', { class: 'cov-cam', tabindex: 0, role: 'button', 'data-i': i,
        'aria-label': `Camera ${i + 1}, ${LENSES[c.lens].label} lens. Arrow keys move, Q and E rotate, Delete removes.` }, gCams);
      const rr = sz(15, 12), hd = sz(46, 30), a = c.angle * Math.PI / 180, hx = c.x + hd * Math.cos(a), hy = c.y + hd * Math.sin(a);
      el('line', { x1: c.x, y1: c.y, x2: hx, y2: hy, stroke: '#fff', 'stroke-width': 2, 'stroke-dasharray': '4 4' }, g);
      el('circle', { cx: hx, cy: hy, r: sz(9, 9), fill: '#fff', stroke: '#01A2E8', 'stroke-width': 3, class: 'cov-aim', 'data-i': i, style: 'cursor:grab' }, g);
      el('circle', { cx: c.x, cy: c.y, r: rr, fill: sel ? '#2AD6FF' : '#01A2E8', stroke: '#fff', 'stroke-width': 3, style: 'cursor:move' }, g);
      const t = el('text', { x: c.x, y: c.y + rr * 0.35, 'text-anchor': 'middle', fill: '#050A1F', 'font-size': rr * 0.9, 'font-weight': 800, 'pointer-events': 'none' }, g);
      t.textContent = i + 1;
    });
    updateStats();
  }

  function coverage() {
    const [sx, sy, sw, sh] = PLANS[state.plan].shell;
    let total = 0, hit = 0;
    for (let x = sx + 10; x < sx + sw; x += 20) for (let y = sy + 10; y < sy + sh; y += 20) {
      total++;
      if (state.cams.some((c) => {
        const L = LENSES[c.lens], dx = x - c.x, dy = y - c.y, d = Math.hypot(dx, dy);
        if (d > L.range) return false;
        if (d < 1) return true;
        let diff = Math.atan2(dy, dx) * 180 / Math.PI - c.angle;
        diff = ((diff + 540) % 360) - 180;
        return Math.abs(diff) <= L.fov / 2;
      })) hit++;
    }
    return total ? Math.round((hit / total) * 100) : 0;
  }

  function mix() {
    const m = { wide: 0, standard: 0, long: 0 };
    state.cams.forEach((c) => m[c.lens]++);
    return m;
  }

  function updateStats() {
    const m = mix();
    $('#camera-count').textContent = state.cams.length;
    $('#coverage-percent').textContent = coverage() + '%';
    $('#lens-mix').textContent = `${m.wide} wide · ${m.standard} std · ${m.long} long`;
  }

  function snapshot() { state.history.push(JSON.stringify(state.cams)); if (state.history.length > 50) state.history.shift(); }

  function toSvg(e) {
    const pt = stage.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(stage.getScreenCTM().inverse());
    return { x: Math.max(0, Math.min(W, p.x)), y: Math.max(0, Math.min(H, p.y)) };
  }

  // Pointer: tap empty space = add camera; drag body = move; drag white dot = aim
  let drag = null;
  stage.addEventListener('pointerdown', (e) => {
    const p = toSvg(e);
    const aim = e.target.closest('.cov-aim');
    const cam = e.target.closest('.cov-cam');
    if (aim || cam) {
      const i = +(aim || cam).getAttribute('data-i');
      snapshot(); state.selected = i;
      drag = { i, mode: aim ? 'aim' : 'move', moved: false };
      stage.setPointerCapture(e.pointerId);
      drawCams();
      return;
    }
    snapshot();
    const [sx, sy, sw, sh] = PLANS[state.plan].shell;
    const angle = Math.atan2(sy + sh / 2 - p.y, sx + sw / 2 - p.x) * 180 / Math.PI;
    state.cams.push({ x: Math.round(p.x), y: Math.round(p.y), angle: Math.round(angle), lens: state.lens });
    state.selected = -1;
    drawCams();
  });
  stage.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const p = toSvg(e), c = state.cams[drag.i];
    if (drag.mode === 'move') { c.x = Math.round(p.x); c.y = Math.round(p.y); }
    else c.angle = Math.round(Math.atan2(p.y - c.y, p.x - c.x) * 180 / Math.PI);
    drag.moved = true;
    drawCams();
  });
  const endDrag = () => { if (drag && !drag.moved) state.history.pop(); drag = null; };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  // Keyboard on focused camera
  stage.addEventListener('keydown', (e) => {
    const g = e.target.closest && e.target.closest('.cov-cam');
    if (!g) return;
    const i = +g.getAttribute('data-i'), c = state.cams[i];
    const step = e.shiftKey ? 25 : 8;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[e.key]) { snapshot(); c.x += moves[e.key][0]; c.y += moves[e.key][1]; }
    else if (e.key === 'q' || e.key === 'Q') { snapshot(); c.angle -= 15; }
    else if (e.key === 'e' || e.key === 'E') { snapshot(); c.angle += 15; }
    else if (e.key === 'Delete' || e.key === 'Backspace') { snapshot(); state.cams.splice(i, 1); state.selected = -1; drawCams(); return e.preventDefault(); }
    else return;
    e.preventDefault(); state.selected = i; drawCams();
    const again = gCams.querySelector(`[data-i="${i}"].cov-cam`); if (again) again.focus();
  });

  // Space templates
  document.querySelectorAll('[data-plan]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-plan]').forEach((x) => { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
    b.classList.add('active'); b.setAttribute('aria-pressed', 'true');
    state.plan = b.getAttribute('data-plan'); state.cams = []; state.history = []; state.selected = -1;
    drawPlan(); drawCams();
  }));

  // Lens picker: sets lens for new cameras, and changes the selected camera
  document.querySelectorAll('[data-lens]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-lens]').forEach((x) => { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
    b.classList.add('active'); b.setAttribute('aria-pressed', 'true');
    state.lens = b.getAttribute('data-lens');
    if (state.selected > -1 && state.cams[state.selected]) { snapshot(); state.cams[state.selected].lens = state.lens; drawCams(); }
  }));

  $('#undo-btn').addEventListener('click', () => { if (!state.history.length) return; state.cams = JSON.parse(state.history.pop()); state.selected = -1; drawCams(); });
  $('#clear-btn').addEventListener('click', () => { if (!state.cams.length) return; snapshot(); state.cams = []; state.selected = -1; drawCams(); });

  function summary() {
    const m = mix();
    return `COVERAGE PLANNER — Space: ${PLANS[state.plan].label} | Cameras: ${state.cams.length} (wide ${m.wide}, standard ${m.standard}, long ${m.long}) | Rough coverage: ${coverage()}%`;
  }

  const wrap = $('#coverage-form-container');
  const form = document.querySelector('[data-cov-form]');
  $('#send-layout-btn').addEventListener('click', () => {
    wrap.hidden = false;
    const msg = form.querySelector('[name="message"]');
    msg.value = summary() + (msg.dataset.notes ? '\n' + msg.dataset.notes : '');
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => form.querySelector('[name="name"]').focus({ preventScroll: true }), 400);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const out = form.querySelector('.form-msg');
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.phone || !data.town) { out.textContent = 'Please add your name, phone and town.'; out.className = 'form-msg err'; return; }
    if (!data.message || !data.message.startsWith('COVERAGE')) data.message = summary() + '\n' + (data.message || '');
    data.page = location.pathname;
    const btn = form.querySelector('[type="submit"]'); btn.disabled = true;
    try {
      const r = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error('bad status');
      form.innerHTML = '<div class="planner-success"><h3>Layout sent — thank you!</h3><p>We\'ll review it and reach out to set up a free walkthrough or video call. Questions? Call or text 631-871-5957.</p></div>';
      if (window.ptsTrack) window.ptsTrack('generate_lead', { source: 'Coverage Planner' });
    } catch (err) {
      out.textContent = 'Something went wrong. Please call or text 631-871-5957.'; out.className = 'form-msg err'; btn.disabled = false;
    }
  });

  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { drawPlan(); drawCams(); }, 150); });
  drawPlan(); drawCams();
})();
