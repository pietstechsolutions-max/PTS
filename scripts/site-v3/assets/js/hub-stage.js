/* Piets hero — the hub stage. Drives the four screens around the Piets hub:
   the TV rolling the Piet Box, the InVid Tech Paramont recorder view, the
   computer running Piets Software and the phone running the Piets Apps.

   Everything on these screens is drawn in code and labelled as a demo with
   sample data. This file only MOVES what is already in the page: if it never
   loads, the hero still renders a complete, correct first frame.

   It changes no figure on the page. The one counter it touches is the Piet Box
   photo-wall count on the phone, which is the demo's own number.

   Light on purpose: no canvas, no rAF loop. Three timers, all paused when the
   hero is off screen or the tab is hidden, and all off under reduced motion.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";

  var stage = document.querySelector(".home-page .hero__stage");
  if (!stage) return;

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var live = true;                 /* on screen and tab visible */
  var timers = [];
  function every(ms, fn) { timers.push(setInterval(function () { if (live) { try { fn(); } catch (e) { /* never break the hero */ } } }, ms)); }

  /* ---------------- 1. the TV: the Piet Box rolls over ---------------- */
  (function () {
    var box = stage.querySelector("[data-pbx]");
    if (!box) return;
    var slides = [].slice.call(box.querySelectorAll("[data-pbx-slide]"));
    var bar = box.querySelector("[data-pbx-bar]");
    var wall = box.querySelector("[data-pbx-wall]");
    var wallCount = stage.querySelector("[data-app-wall]");
    if (slides.length < 2 || RM) return;
    var i = 0, shots = 6;

    function restartBar() {
      if (!bar) return;
      bar.classList.remove("run");
      void bar.offsetWidth;          /* reflow, so the animation runs again */
      bar.classList.add("run");
    }
    every(7000, function () {
      slides[i].classList.remove("is-on");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-on");
      restartBar();
      /* when the photo wall comes round, one more picture goes up */
      if (wall && slides[i].querySelector("[data-pbx-wall]") === wall) {
        var cells = wall.querySelectorAll(".pbx__ph");
        var n = cells[shots % cells.length];
        if (n) { n.classList.remove("is-new"); void n.offsetWidth; n.classList.add("is-new"); }
        shots++;
        if (wallCount) wallCount.textContent = String(6 + (shots - 6));
      }
    });
  })();

  /* ---------------- 2. the recorder: clocks, timeline, motion box ---------------- */
  (function () {
    var clocks = [].slice.call(stage.querySelectorAll("[data-nvr-clock]"));
    var head = stage.querySelector("[data-nvr-head]");
    var boxes = [].slice.call(stage.querySelectorAll("[data-nvr-box]"));

    function two(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var d = new Date();
      var t = two(d.getHours()) + ":" + two(d.getMinutes()) + ":" + two(d.getSeconds());
      for (var k = 0; k < clocks.length; k++) clocks[k].textContent = t;
      if (head) head.style.left = ((d.getSeconds() * 1000 + d.getMilliseconds()) / 60000 * 100).toFixed(2) + "%";
    }
    tick();
    if (RM) return;                  /* a still, correct frame is enough */
    every(1000, tick);
    /* the box the recorder draws round movement — on while the car crosses */
    var on = false;
    every(2750, function () {
      on = !on;
      for (var k = 0; k < boxes.length; k++) boxes[k].classList.toggle("on", on);
    });
  })();

  /* ---------------- 3. the computer: one card moves between columns ---------------- */
  (function () {
    var card = stage.querySelector("[data-sw-card]");
    if (!card || RM) return;
    every(5200, function () {
      card.classList.add("move");
      setTimeout(function () { card.classList.remove("move"); }, 1400);
    });
  })();

  /* ---------------- 4. the phone: the apps run, and the dots work ---------------- */
  (function () {
    var app = stage.querySelector("[data-app]");
    if (!app) return;
    var views = [].slice.call(app.querySelectorAll("[data-app-view]"));
    var dotWrap = stage.querySelector("[data-app-dots]");
    if (!views.length) return;
    var i = 0, held = false, dots = [];

    function show(n) {
      views[i].classList.remove("is-on");
      i = n;
      views[i].classList.add("is-on");
      for (var k = 0; k < dots.length; k++) dots[k].setAttribute("aria-current", k === i ? "true" : "false");
    }

    /* The old build drew the dots as bare <i> elements, which no keyboard could
       reach and which did not respond to a tap. They are buttons now. */
    if (dotWrap) {
      views.forEach(function (v, k) {
        var nm = v.querySelector(".app__name");
        var label = nm && nm.firstChild && nm.firstChild.nodeValue ? nm.firstChild.nodeValue.trim() : "App " + (k + 1);
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Show the " + label + " app demo");
        b.setAttribute("aria-current", k === 0 ? "true" : "false");
        b.appendChild(document.createElement("span"));
        b.addEventListener("click", function () { held = true; show(k); });
        dotWrap.appendChild(b);
        dots.push(b);
      });
    }

    if (views.length > 1 && !RM) every(6500, function () { if (!held) show((i + 1) % views.length); });
  })();

  /* ---------------- pause when nobody can see it ---------------- */
  (function () {
    var hero = stage.closest(".hero") || stage;
    function set(v) { live = v && !document.hidden; }
    document.addEventListener("visibilitychange", function () { set(!document.hidden); });
    if ("IntersectionObserver" in window) {
      new window.IntersectionObserver(function (e) { set(e[0].isIntersecting); }, { threshold: 0.01 }).observe(hero);
    }
  })();
})();
