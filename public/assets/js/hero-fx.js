/* Piets hero: live screens (scaled, clocks, TV slides, timers) + cyan/purple particle network.
   Piets Technology Solutions Inc · 631-871-5957. Light on purpose: ~25 fps, pauses off screen / hidden tab, static under prefers-reduced-motion. */
(function(){
  "use strict";
  var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* 1. scale each "native size" screen to its frame */
  var scrs = [].slice.call(document.querySelectorAll(".scr[data-w]"));
  function fit(){
    scrs.forEach(function(s){
      var w = parseFloat(s.getAttribute("data-w")), h = parseFloat(s.getAttribute("data-h")), p = s.parentElement;
      var k = Math.min(p.clientWidth / w, p.clientHeight / h);
      s.style.transform = "scale(" + k + ")";
    });
  }
  fit(); window.addEventListener("resize", fit, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  setTimeout(fit, 600);
  /* 2. clocks + timers */
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  var clocks = [].slice.call(document.querySelectorAll(".js-clock")), shorts = [].slice.call(document.querySelectorAll(".js-clock-short")), timers = [].slice.call(document.querySelectorAll(".js-timer")), prints = [].slice.call(document.querySelectorAll(".js-print"));
  var t0 = 4 * 60 + 12, tick = 0;
  function clock(){
    var d = new Date(), hh = d.getHours(), s = pad(hh) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
    clocks.forEach(function(c){ c.textContent = s; });
    var h12 = hh % 12 || 12; shorts.forEach(function(c){ c.textContent = h12 + ":" + pad(d.getMinutes()); });
    t0++; timers.forEach(function(c){ c.textContent = pad(Math.floor(t0 / 3600)) + ":" + pad(Math.floor(t0 / 60) % 60) + ":" + pad(t0 % 60); });
    tick++; prints.forEach(function(c){ var ph = Math.floor(tick / 5) % 4; c.textContent = ["Printing", "Printing", "Done", "Online"][ph]; c.className = "st" + (ph < 2 ? " busy" : ""); });
  }
  if (!rm) { clock(); setInterval(clock, 1000); }
  /* 3. TV slides */
  var slides = [].slice.call(document.querySelectorAll(".tvslide")), dots = [].slice.call(document.querySelectorAll(".tv__dots i")), si = 0;
  if (slides.length > 1 && !rm) setInterval(function(){
    slides[si].classList.remove("is-on"); if (dots[si]) dots[si].classList.remove("on");
    si = (si + 1) % slides.length;
    slides[si].classList.add("is-on"); if (dots[si]) dots[si].classList.add("on");
  }, 4500);
  /* 4. particles */
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
