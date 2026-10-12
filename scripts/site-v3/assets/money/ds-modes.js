/* Piets Design Studio — one tool, three modes (owner, Oct 10 2026, item D:
   "Put the coverage planner and the outdoor lighting into one: the Design Studio —
   lighting, cameras, and anything else I implemented.")
   One ARIA tab strip: Cameras · Lighting · Coverage Planner.
   - Cameras and Lighting are the photo studio (assets/money/studio.js, via window.PietsStudio).
   - Coverage Planner is the floor-plan planner (assets/js/coverage.js), unchanged.
   The mode is in the address (?mode=cameras|lighting|coverage) so /coverage can redirect
   straight to it and a link can open the right mode. Arrow keys, Home and End move
   between tabs (roving tabindex). Nothing here is uploaded anywhere.
   Piets Technology Solutions Inc · 631-871-5957 */
(function () {
  "use strict";
  var list = document.querySelector("[data-dsmodes]");
  if (!list) return;
  var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
  var studioPanel = document.getElementById("dsPanel-studio");
  var covPanel = document.getElementById("dsPanel-coverage");
  var NAMES = { cameras: "cam", lighting: "light" };
  var cur = null;

  function fromUrl() {
    try {
      var m = new URLSearchParams(location.search).get("mode");
      if (m === "cameras" || m === "lighting" || m === "coverage") return m;
    } catch (e) { /* old browser: fall through */ }
    return null;
  }
  function fromStudio() {
    return (window.PietsStudio && window.PietsStudio.mode() === "light") ? "lighting" : "cameras";
  }

  function show(mode, opts) {
    opts = opts || {};
    if (mode !== "cameras" && mode !== "lighting" && mode !== "coverage") mode = "cameras";
    var changed = mode !== cur;
    cur = mode;
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-dsmode") === mode;
      t.setAttribute("aria-selected", String(on));
      t.setAttribute("tabindex", on ? "0" : "-1");
    });
    var onCov = mode === "coverage";
    studioPanel.hidden = onCov;
    covPanel.hidden = !onCov;
    var tab = list.querySelector('[data-dsmode="' + mode + '"]');
    (onCov ? covPanel : studioPanel).setAttribute("aria-labelledby", tab.id);
    if (!onCov && window.PietsStudio) window.PietsStudio.setMode(NAMES[mode]);
    document.documentElement.setAttribute("data-dsmode", mode);
    // a panel that was hidden measured 0px wide; let both tools size themselves again
    if (changed) {
      try { window.dispatchEvent(new Event("resize")); }
      catch (e) { var ev = document.createEvent("Event"); ev.initEvent("resize", true, true); window.dispatchEvent(ev); }
    }
    if (opts.url !== false && window.history && history.replaceState) {
      try {
        var u = new URL(location.href);
        u.searchParams.set("mode", mode);
        history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch (e) { /* ignore */ }
    }
  }

  list.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest('[role="tab"]') : null;
    if (!t || !list.contains(t)) return;
    show(t.getAttribute("data-dsmode"));
  });
  list.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var i = tabs.indexOf(document.activeElement), n = -1;
    if (i < 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    else return;
    e.preventDefault();
    e.stopPropagation();
    show(tabs[n].getAttribute("data-dsmode"));
    tabs[n].focus();
  });
  // links on this page that point at a mode switch here instead of reloading
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href*="mode="]') : null;
    if (!a) return;
    var u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.pathname.replace(/\.html$/, "") !== location.pathname.replace(/\.html$/, "")) return;
    var m = u.searchParams.get("mode");
    if (!m) return;
    e.preventDefault();
    show(m);
    var target = document.getElementById("studio");
    if (target) target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  show(fromUrl() || fromStudio(), { url: !!fromUrl() });
})();
