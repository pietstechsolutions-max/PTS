/* Piets home page — rebuilt Oct 11 2026. Drives the four screens around the
   Piets Hub, draws the wires into the hub, and reveals sections on scroll.
   If this file never loads, every screen still shows a complete first frame.
   Off under reduced motion; paused when the hero is off screen or the tab is hidden.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  'use strict';
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = document.querySelector('[data-hm-stage]');
  var live = true, timers = [];
  function every(ms, fn) {
    timers.push(setInterval(function () { if (live) { try { fn(); } catch (e) { /* never break the page */ } } }, ms));
  }

  if (stage) {
    /* ---- wires: one line from each screen into the hub, redrawn on resize ---- */
    var svg = stage.querySelector('.hm-wires');
    var hub = stage.querySelector('.hm-hub');
    var devs = [].slice.call(stage.querySelectorAll('[data-hm-wire]'));
    function draw() {
      if (!svg || !hub) return;
      var s = stage.getBoundingClientRect();
      var h = hub.getBoundingClientRect();
      var hx = h.left + h.width / 2 - s.left, hy = h.top + h.height / 2 - s.top;
      svg.setAttribute('viewBox', '0 0 ' + s.width + ' ' + s.height);
      var out = '';
      devs.forEach(function (d, i) {
        var p = d.querySelector('.hm-panel, .hm-phone').getBoundingClientRect();
        var x = p.left + p.width / 2 - s.left, y = p.top + p.height / 2 - s.top;
        var col = i % 2 ? '#9B6BFF' : '#02D7F5';
        var id = 'hmw' + i;
        out += '<path id="' + id + '" d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + ' L' + hx.toFixed(1) + ' ' + hy.toFixed(1) + '" stroke="' + col + '" stroke-opacity=".55"/>';
        if (!RM) out += '<circle r="3.2" fill="' + col + '" style="color:' + col + '"><animateMotion dur="' + (2.8 + i * .5) + 's" repeatCount="indefinite"><mpath href="#' + id + '"/></animateMotion></circle>';
      });
      svg.innerHTML = out;
    }
    draw();
    if ('ResizeObserver' in window) new ResizeObserver(draw).observe(stage);
    else window.addEventListener('resize', draw, { passive: true });
    window.addEventListener('load', draw);

    /* ---- TV: the Piet Box rolls over every 7s ---- */
    (function () {
      var slides = [].slice.call(stage.querySelectorAll('[data-hm-slide]'));
      var bar = stage.querySelector('[data-hm-bar]');
      var wall = stage.querySelectorAll('.hm-wall span');
      if (slides.length < 2 || RM) return;
      var i = 0, n = 0;
      every(7000, function () {
        slides[i].classList.remove('is-on');
        i = (i + 1) % slides.length;
        slides[i].classList.add('is-on');
        if (bar) { bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run'); }
        if (slides[i].hasAttribute('data-hm-wallslide') && wall.length) {
          var c = wall[n % wall.length]; c.classList.remove('is-new'); void c.offsetWidth; c.classList.add('is-new'); n++;
        }
      });
    })();

    /* ---- recorder: live clock, playhead, motion box ---- */
    (function () {
      var clocks = [].slice.call(stage.querySelectorAll('[data-hm-clock]'));
      var head = stage.querySelector('[data-hm-head]');
      var box = stage.querySelector('[data-hm-box]');
      function two(v) { return (v < 10 ? '0' : '') + v; }
      function tick() {
        var d = new Date(), t = two(d.getHours()) + ':' + two(d.getMinutes()) + ':' + two(d.getSeconds());
        clocks.forEach(function (c) { c.textContent = t; });
        if (head) head.style.left = ((d.getSeconds() * 1000 + d.getMilliseconds()) / 600).toFixed(2) + '%';
      }
      tick();
      if (RM) return;
      every(1000, tick);
      var on = false;
      every(3000, function () { on = !on; if (box) box.classList.toggle('on', on); });
    })();

    /* ---- computer: a job card moves to the next column ---- */
    (function () {
      var card = stage.querySelector('[data-hm-move]');
      if (!card || RM) return;
      every(5200, function () {
        card.classList.add('move');
        setTimeout(function () { card.classList.remove('move'); }, 1700);
      });
    })();

    /* ---- phone: real Piets app screens, with working dots ---- */
    (function () {
      var imgs = [].slice.call(stage.querySelectorAll('.hm-phone__screen img'));
      var wrap = stage.querySelector('[data-hm-dots]');
      if (!imgs.length) return;
      var i = 0, held = false, dots = [];
      function show(k) {
        imgs[i].classList.remove('is-on'); i = k; imgs[i].classList.add('is-on');
        dots.forEach(function (d, j) { d.setAttribute('aria-current', j === i ? 'true' : 'false'); });
      }
      if (wrap) imgs.forEach(function (im, k) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Show the ' + (im.getAttribute('data-name') || 'app') + ' screen');
        b.setAttribute('aria-current', k === 0 ? 'true' : 'false');
        b.appendChild(document.createElement('span'));
        b.addEventListener('click', function () { held = true; show(k); });
        wrap.appendChild(b); dots.push(b);
      });
      if (imgs.length > 1 && !RM) every(4800, function () { if (!held) show((i + 1) % imgs.length); });
    })();

    /* ---- pause when nobody can see it ---- */
    var hero = stage.closest('.hm-hero') || stage;
    document.addEventListener('visibilitychange', function () { live = !document.hidden; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { live = e[0].isIntersecting && !document.hidden; }, { threshold: 0.01 }).observe(hero);
    }
  }

  /* ---- sections rise in as they arrive ---- */
  var rev = [].slice.call(document.querySelectorAll('.hm-reveal'));
  if (RM || !('IntersectionObserver' in window)) { rev.forEach(function (r) { r.classList.add('is-in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  rev.forEach(function (r) { io.observe(r); });
})();
