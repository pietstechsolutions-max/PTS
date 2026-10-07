(function () {
  'use strict';

  /* ---- Conversion tracking hooks ----
   * TODO (owner): add your GA4 Measurement ID and/or Meta Pixel ID.
   * Example GA4:  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
   * Example Meta: fbq('init','XXXXXXXXXXXXXXX');
   * Events are pushed to window.dataLayer so any tag manager can pick them up.
   */
  window.dataLayer = window.dataLayer || [];
  function track(name, data) {
    try { window.dataLayer.push(Object.assign({ event: name }, data || {})); } catch (e) { /* noop */ }
  }
  // Expose track function as window.ptsTrack
  window.ptsTrack = track;

  /* ---- Announcement bar close (sessionStorage in try/catch) ---- */
  (function () {
    var bar = document.querySelector('[data-announcement]');
    if (!bar) return;

    var closeBtn = bar.querySelector('[data-close-announcement]');
    if (!closeBtn) return;

    // Check if already closed in sessionStorage
    try {
      if (sessionStorage.getItem('pietsAnnouncementClosed') === 'true') {
        bar.style.display = 'none';
      }
    } catch (e) {
      // sessionStorage unavailable, continue without it
    }

    closeBtn.addEventListener('click', function () {
      bar.style.display = 'none';
      try {
        sessionStorage.setItem('pietsAnnouncementClosed', 'true');
      } catch (e) {
        // sessionStorage unavailable, continue without it
      }
    });
  })();

  /* ---- Copyright year ---- */
  (function () {
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = new Date().getFullYear();
  })();

  /* ---- Mobile menu toggle (aria-expanded, Esc closes) ---- */
  (function () {
    var btn = document.querySelector('[aria-controls="primary-menu"]');
    var menu = document.getElementById('primary-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
      var header = document.querySelector('.site-header');
      var nav = menu.closest('.site-nav');
      if (header && nav) nav.style.top = Math.max(0, header.getBoundingClientRect().bottom) + 'px';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
        btn.focus();
      }
    });
  })();
  /* ---- Generic lead forms (quote forms) -> JSON POST to /api/leads ---- */
  (function () {
    var forms = document.querySelectorAll('form[data-lead-form]:not(.planner-form):not([data-gate])');
    Array.prototype.forEach.call(forms, function (form) {
      var msg = form.querySelector('.form-msg');
      var btn = form.querySelector('button[type="submit"]');
      form.addEventListener('submit', function (e) {
        if (!window.fetch || !window.FormData) return;
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        if (data.website) return;
        data.page = location.pathname;
        if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
        if (msg) { msg.className = 'form-msg'; msg.textContent = ''; }
        fetch(form.getAttribute('action') || '/api/leads', {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data)
        }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); })
          .then(function () {
            form.reset();
            if (msg) { msg.className = 'form-msg ok'; msg.textContent = "Thanks — your request is in. We'll reach out shortly. Questions? Call or text 631-871-5957."; }
            track('generate_lead', { form_source: data.source || 'Quote form', service: data.service || '' });
          })
          .catch(function () {
            if (msg) { msg.className = 'form-msg err'; msg.textContent = 'Hmm, that didn’t go through. Please call or text 631-871-5957 and we’ll take care of you.'; }
          })
          .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; } });
      });
    });
  })();

  /* ---- Close mobile menu when a link is tapped ---- */
  (function () {
    var menu = document.getElementById('primary-menu');
    var btn = document.querySelector('[aria-controls="primary-menu"]');
    if (!menu || !btn) return;
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.classList.remove('open'); document.body.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  })();
})();
