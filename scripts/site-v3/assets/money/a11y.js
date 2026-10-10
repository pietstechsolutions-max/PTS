/* Piets — the accessibility layer the v3 demos share.
   The demos repaint themselves by replacing their own markup, which throws a
   keyboard user's focus back to the top of the page, and their figures change
   silently. This file adds three things and changes nothing else — no numbers,
   no copy, no demo logic:
     1. focus that survives a repaint (keyboard interactions only),
     2. a polite live line that reads a figure out when it changes,
     3. arrow keys, Home and End on the demo tab strips.
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  "use strict";

  /* Which demo roots to wire, and which figures are worth reading out.
     A watch entry is [selector, spoken label]. An empty label means the
     figure's own row label is used. */
  var SPECS = [
    { sel: "#rateCheck", watch: [["#rcRate", "Your effective rate"], ["#rcPer", "Cost per transaction"]] },
    { sel: "#finCalc", watch: [["#fcPay", "Estimated monthly payment"], ["#fcTot", "Total of payments"]] },
    { sel: "#driveDemo", watch: [["#chOut", "Commission at your rate"], ["#chDiff", "Difference a month"]] },
    { sel: "#posDemo", watch: [[".pos__tot .l.big", ""]] },
    { sel: "#driveDesk", watch: [] },
    { sel: "#fleetDemo", watch: [] },
    { sel: "#studio-app", watch: [] }
  ];

  /* Attributes the demos use to identify their own controls. A control is found
     again after a repaint by the same attribute and value. */
  var KEYS = ["id", "name", "data-add", "data-q", "data-d", "data-rm", "data-pay", "data-tab",
    "data-cat", "data-ch", "data-v", "data-fill", "data-fillall", "data-resetlegs", "data-term",
    "data-fov", "data-type", "data-pick", "data-style", "data-perm", "data-mode", "data-sample",
    "data-newrun", "data-undo", "data-undo2", "data-clear", "data-save", "data-forget",
    "data-idok", "data-sur", "data-rate", "data-chase", "data-fuel", "data-notify", "data-crash",
    "data-delcam", "data-file", "data-open", "data-close", "data-send", "data-step"];

  var FOCUSABLE = 'button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';

  /* Only put focus back when the person is actually driving from the keyboard —
     a mouse user does not want a ring appearing under their cursor. */
  var kb = false;
  document.addEventListener("keydown", function () { kb = true; }, true);
  document.addEventListener("mousedown", function () { kb = false; }, true);
  document.addEventListener("touchstart", function () { kb = false; }, true);

  function attrSig(el) {
    var parts = [el.tagName], i;
    for (i = 0; i < KEYS.length; i++) {
      if (el.hasAttribute && el.hasAttribute(KEYS[i])) parts.push(KEYS[i] + "=" + el.getAttribute(KEYS[i]));
    }
    return parts;
  }

  function sigOf(el, root) {
    if (!el || el === document.body || !root.contains(el)) return null;
    var parts = attrSig(el);
    var attr = parts.length > 1 ? parts[1].split("=")[0] : null;
    var idx = -1;
    if (attr) {
      var peers = root.querySelectorAll("[" + attr + "]");
      idx = Array.prototype.indexOf.call(peers, el);
    } else {
      var same = root.querySelectorAll(el.tagName);
      idx = Array.prototype.indexOf.call(same, el);
      parts.push("#" + idx);
    }
    return { s: parts.join("|"), attr: attr, idx: idx };
  }

  function refind(sig, root) {
    if (!sig) return null;
    var all = root.querySelectorAll(FOCUSABLE), i, c;
    for (i = 0; i < all.length; i++) {
      c = sigOf(all[i], root);
      if (c && c.s === sig.s) return all[i];
    }
    /* the exact control is gone (a removed line, a tab that repainted) — land on
       the one now sitting in its place rather than dumping focus on the body */
    if (sig.attr) {
      var peers = root.querySelectorAll("[" + sig.attr + "]");
      if (peers.length) return peers[Math.max(0, Math.min(sig.idx, peers.length - 1))];
    }
    return root.querySelector(FOCUSABLE);
  }

  /* read one watched figure as "label value" */
  function readOut(root, pair) {
    var el = root.querySelector(pair[0]);
    if (!el) return null;
    var b = el.querySelector ? el.querySelector("b") : null;
    var value = (b ? b.textContent : el.textContent) || "";
    value = value.replace(/\s+/g, " ").trim();
    if (!value || value === "—" || value === "—") return null;
    var label = pair[1];
    if (!label && b) {
      var sp = el.querySelector("span");
      label = sp ? (sp.textContent || "").replace(/\s+/g, " ").trim() : "";
    }
    return { key: pair[0], text: (label ? label + ": " : "") + value };
  }

  function wire(spec) {
    var root = document.querySelector(spec.sel);
    if (!root || root.getAttribute("data-a11y") === "on") return;
    root.setAttribute("data-a11y", "on");

    /* the live line lives OUTSIDE the demo, so a repaint cannot delete it */
    var live = document.createElement("p");
    live.className = "sr-only";
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    if (root.parentNode) root.parentNode.insertBefore(live, root.nextSibling);

    var last = {};
    spec.watch.forEach(function (p) {
      var r = readOut(root, p);
      if (r) last[r.key] = r.text;
    });

    /* a demo that builds itself a beat after this file runs would otherwise read
       its opening figures out loud. Snapshot silently for the first moment. */
    var armed = false;
    setTimeout(function () { armed = true; }, 700);

    var pending = null;
    function capture() { pending = sigOf(document.activeElement, root); }
    root.addEventListener("keydown", capture, true);
    root.addEventListener("click", capture, true);

    var timer = 0;
    function settle() {
      timer = 0;

      /* 1. put focus back where the keyboard left it */
      if (kb && pending) {
        var a = document.activeElement;
        if (!a || a === document.body || !root.contains(a)) {
          var el = refind(pending, root);
          if (el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
        }
      }
      pending = null;

      /* 2. say what changed */
      var said = [];
      spec.watch.forEach(function (p) {
        var r = readOut(root, p);
        if (!r) return;
        if (last[r.key] !== r.text) { last[r.key] = r.text; said.push(r.text); }
      });
      if (said.length && armed) live.textContent = said.join(". ") + ".";
    }

    if (window.MutationObserver) {
      new window.MutationObserver(function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(settle, 320);
      }).observe(root, { childList: true, subtree: true, characterData: true });
    }

    /* 3. arrow keys on the tab strips */
    root.addEventListener("keydown", function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var t = e.target;
      if (!t || !t.closest) return;
      var tab = t.closest('[role="tab"]');
      if (!tab) return;
      var list = tab.closest('[role="tablist"]');
      if (!list || !root.contains(list)) return;
      var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
      var i = tabs.indexOf(tab), n = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = tabs.length - 1;
      else return;
      e.preventDefault();
      try { tabs[n].focus({ preventScroll: true }); } catch (err) { tabs[n].focus(); }
      capture();            /* so a repaint restores the NEW tab, not the old one */
      tabs[n].click();
    });
  }

  function start() { SPECS.forEach(function (s) { try { wire(s); } catch (e) { /* never block a demo */ } }); }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
