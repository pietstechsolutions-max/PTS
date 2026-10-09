/* Piets Site Studio — builder page translation (English source text stays in the HTML).
   Packs: lang/ui-xx.js set window.PietsUILang[xx] = { "English text": "translation", ... }.
   A MutationObserver translates any English text the page or studio.js puts on screen.
   Piets Technology Solutions Inc · 631-871-5957 */
(function (g) {
  'use strict';
  var U = g.PietsUI = { lang: 'en', dict: {}, ready: false };
  var SKIP = { SCRIPT: 1, STYLE: 1, IFRAME: 1, TEXTAREA: 1, NOSCRIPT: 1, svg: 1, SVG: 1, OPTION: 0 };
  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  var busy = false;

  U.T = function (s, v) {
    var r = (U.dict && U.dict[s]) || s;
    return v ? String(r).replace(/\{(\w+)\}/g, function (m, k) { return v[k] != null ? v[k] : m; }) : r;
  };
  function skip(el) {
    for (var e = el; e && e.nodeType === 1; e = e.parentNode) { if (SKIP[e.nodeName] || e.hasAttribute('data-noi18n')) return true; }
    return false;
  }
  function doText(n) {
    if (n.__set != null && n.nodeValue === n.__set) return;     // our own write
    var v = n.nodeValue; if (!v || !/[A-Za-z]/.test(v)) { n.__en = null; return; }
    n.__en = v;
    var k = v.trim(), t = U.dict[k];
    var out = t ? v.replace(k, t) : v;
    if (out !== v) { n.__set = out; n.nodeValue = out; } else n.__set = null;
  }
  function doAttrs(el) {
    el.__ena = el.__ena || {};
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var v = el.getAttribute(a), mine = el.__ena[a + '_set'];
      if (mine != null && v === mine) return;
      el.__ena[a] = v;
      var t = U.dict[v.trim()];
      if (t) { el.__ena[a + '_set'] = t; el.setAttribute(a, t); } else el.__ena[a + '_set'] = null;
    });
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!skip(root.parentNode)) doText(root); return; }
    if (root.nodeType !== 1 || skip(root)) return;
    doAttrs(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: function (n) { return (n.nodeType === 1 && SKIP[n.nodeName]) || (n.nodeType === 1 && n.hasAttribute('data-noi18n')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
    var n; while ((n = w.nextNode())) { if (n.nodeType === 3) doText(n); else doAttrs(n); }
  }
  /* put English back on every node, then translate again with the current dictionary */
  function reapply() {
    busy = true;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    var n; while ((n = w.nextNode())) {
      if (n.nodeType === 3) { if (n.__en != null && n.__set != null && n.nodeValue === n.__set) { n.nodeValue = n.__en; n.__set = null; } }
      else if (n.__ena) ATTRS.forEach(function (a) { if (n.__ena[a + '_set'] != null && n.getAttribute(a) === n.__ena[a + '_set']) { n.setAttribute(a, n.__ena[a]); n.__ena[a + '_set'] = null; } });
    }
    walk(document.body);
    busy = false;
  }
  var base = (function () { var s = document.querySelector('script[src*="site-studio/ui-i18n.js"]'); return s ? s.getAttribute('src').replace(/ui-i18n\.js.*$/, '') : '/assets/site-studio/'; })();
  function load(src, test) {
    return new Promise(function (ok) {
      if (test()) return ok(true);
      var sc = document.createElement('script'); sc.src = src; sc.async = true;
      sc.onload = function () { ok(test()); }; sc.onerror = function () { ok(false); };
      document.head.appendChild(sc);
    });
  }
  /* trade names and service names come from the demo language packs (same translations the demos use) */
  function tradePairs(code) {
    var P = g.PietsLang && g.PietsLang[code], T = g.PietsTrades && g.PietsTrades.T, d = {};
    if (!P || !P.trades || !T) return d;
    Object.keys(T).forEach(function (k) {
      var o = P.trades[k]; if (!o) return;
      if (o.label) d[T[k].label] = o.label;
      (T[k].services || []).forEach(function (s, i) { if (o.services && o.services[i]) d[s[0]] = o.services[i][0]; });
    });
    return d;
  }
  U.set = function (code) {
    code = code || 'en';
    var jobs = code === 'en' ? [] : [
      load(base + 'lang/ui-' + code + '.js', function () { return !!(g.PietsUILang && g.PietsUILang[code]); }),
      load(base + 'lang/' + code + '.js', function () { return !!(g.PietsLang && g.PietsLang[code]); })
    ];
    return Promise.all(jobs).then(function () {
      var d = {}, k;
      if (code !== 'en') { var a = tradePairs(code), b = (g.PietsUILang && g.PietsUILang[code]) || {}; for (k in a) d[k] = a[k]; for (k in b) d[k] = b[k]; }
      U.lang = (code === 'en' || Object.keys(d).length) ? code : 'en'; U.dict = d;
      document.documentElement.lang = U.lang;
      try { localStorage.setItem('piets_ui_lang', U.lang); } catch (e) { }
      reapply();
      document.dispatchEvent(new CustomEvent('piets-ui-lang', { detail: U.lang }));
      return U.lang;
    });
  };
  U.start = function (langs) {
    var saved = null; try { saved = localStorage.getItem('piets_ui_lang'); } catch (e) { }
    var nav = String((navigator.languages && navigator.languages[0]) || navigator.language || 'en').slice(0, 2).toLowerCase();
    var ok = function (c) { return (langs || []).some(function (l) { return l[0] === c; }); };
    var code = saved && ok(saved) ? saved : (ok(nav) ? nav : 'en');
    new MutationObserver(function (ms) {
      if (busy || U.lang === 'en') return;
      busy = true;
      ms.forEach(function (m) {
        if (m.type === 'characterData') { if (!skip(m.target.parentNode)) doText(m.target); }
        else if (m.type === 'attributes') { if (!skip(m.target)) doAttrs(m.target); }
        else m.addedNodes.forEach(function (n) { walk(n); });
      });
      busy = false;
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    return U.set(code);
  };
})(window);
