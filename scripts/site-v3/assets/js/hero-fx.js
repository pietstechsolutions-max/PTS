/* Piets hero effects: phone screen cycling + particle network. Piets Technology Solutions Inc · 631-871-5957.
   Light on purpose: ~25 fps, pauses when the hero is off screen or the tab is hidden, off under prefers-reduced-motion. */
(function(){
  "use strict";
  var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scr = document.querySelector(".phone__screen");
  if (scr) {
    var imgs = [].slice.call(scr.querySelectorAll("img"));
    var dots = [].slice.call(document.querySelectorAll(".phone__dots i"));
    var cap = document.querySelector(".phone__cap");
    var i = 0;
    function show(n){
      imgs[i].classList.remove("is-on"); if (dots[i]) dots[i].classList.remove("is-on");
      i = n;
      imgs[i].classList.add("is-on"); if (dots[i]) dots[i].classList.add("is-on");
      if (cap) { cap.style.opacity = 0; setTimeout(function(){ cap.innerHTML = (imgs[i].getAttribute("data-cap") || "") + "<small>" + (imgs[i].getAttribute("data-sub") || "") + "</small>"; cap.style.opacity = 1; }, 380); }
    }
    if (cap && imgs[0]) cap.innerHTML = (imgs[0].getAttribute("data-cap") || "") + "<small>" + (imgs[0].getAttribute("data-sub") || "") + "</small>";
    if (imgs.length > 1 && !rm) setInterval(function(){ show((i + 1) % imgs.length); }, 4200);
    dots.forEach(function(d, k){ d.addEventListener("click", function(){ show(k); }); });
  }
  var c = document.querySelector(".hero__fx");
  if (!c || rm || !c.getContext) return;
  var ctx = c.getContext("2d"), hero = c.parentElement, W = 0, H = 0, pts = [], N = 70;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size(){
    W = hero.clientWidth; H = hero.clientHeight;
    c.width = W * dpr; c.height = H * dpr; c.style.width = W + "px"; c.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    N = W < 700 ? 34 : 72; pts = [];
    for (var k = 0; k < N; k++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28, r: Math.random() * 1.6 + .6, p: Math.random() < .35 });
  }
  size(); window.addEventListener("resize", size, { passive: true });
  var vis = true;
  document.addEventListener("visibilitychange", function(){ vis = !document.hidden; });
  if ("IntersectionObserver" in window) new IntersectionObserver(function(e){ vis = e[0].isIntersecting && !document.hidden; }).observe(hero);
  var last = 0;
  function frame(t){
    requestAnimationFrame(frame);
    if (!vis || t - last < 40) return; last = t;
    ctx.clearRect(0, 0, W, H);
    var a, b, p, q;
    for (a = 0; a < pts.length; a++) { p = pts[a]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
    ctx.lineWidth = 1;
    for (a = 0; a < pts.length; a++) for (b = a + 1; b < pts.length; b++) {
      p = pts[a]; q = pts[b]; var dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
      if (d < 15000) { var al = 1 - d / 15000; ctx.strokeStyle = (p.p || q.p) ? "rgba(122,61,255," + (al * .38) + ")" : "rgba(2,215,245," + (al * .3) + ")"; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    }
    for (a = 0; a < pts.length; a++) { p = pts[a]; ctx.fillStyle = p.p ? "rgba(176,140,255,.95)" : "rgba(2,215,245,.95)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
  }
  requestAnimationFrame(frame);
})();
