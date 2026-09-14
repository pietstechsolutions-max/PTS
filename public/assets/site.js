/* Piets Technology Solutions — minimal site JS (no dependencies) */
(function () {
  'use strict';

  /* ---- Conversion tracking hooks ----
   * TODO (owner): add your GA4 Measurement ID and/or Meta Pixel ID.
   * Example GA4:  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
   * Example Meta: fbq('init','XXXXXXXXXXXXXXX');
   * Events are pushed to window.dataLayer so any tag manager can pick them up.
   */
  window.dataLayer = window.dataLayer || [];
  function track(event, data) {
    try { window.dataLayer.push(Object.assign({ event: event }, data || {})); } catch (e) { /* noop */ }
  }

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav ul');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---- Click-to-call / SMS tracking ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"],a[href^="sms:"]');
    if (!a) return;
    track(a.getAttribute('href').indexOf('tel:') === 0 ? 'click_to_call' : 'click_to_text', { link_url: a.getAttribute('href') });
  });

  /* ---- Lead forms: POST JSON to /api/leads, fall back to native POST ---- */
  var forms = document.querySelectorAll('form[data-lead-form]');
  Array.prototype.forEach.call(forms, function (form) {
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.FormData) return; // native POST fallback
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (data.website) { return; } // honeypot filled → silently drop
      data.page = location.pathname;
      data.referrer = document.referrer || '';
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      if (msg) { msg.className = 'form-msg'; msg.textContent = ''; }
      fetch(form.getAttribute('action') || '/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json().catch(function () { return {}; });
      }).then(function () {
        form.reset();
        if (msg) { msg.className = 'form-msg ok'; msg.textContent = 'Thanks! Your request is in. We’ll reach out shortly — or call us now at 631-871-5957.'; }
        track('generate_lead', { form_source: data.source || '', service: data.service || '' });
      }).catch(function () {
        if (msg) { msg.className = 'form-msg err'; msg.textContent = 'Hmm, that didn’t go through. Please call or text 631-871-5957 and we’ll take care of you.'; }
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; }
      });
    });
  });

  /* ---- Copyright year ---- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
