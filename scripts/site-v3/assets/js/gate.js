/* ---- Brochure gate logic for form[data-gate] ---- */
(function () {
  var gateForms = document.querySelectorAll('form[data-gate]');
  if (!gateForms.length) return;

  Array.prototype.forEach.call(gateForms, function (form) {
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('button[type="submit"]');
    var gateLink = form.parentElement.querySelector('[data-gate-link]');

    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.FormData) return; // native POST fallback
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (data.website) { return; } // honeypot filled → silently drop
      data.source = 'Brochure - Smart Home';
      data.service = 'smart-home';
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
         if (msg) { msg.className = 'form-msg ok'; msg.textContent = 'Thanks! Your request is in.'; }
         if (gateLink) { gateLink.style.display = 'block'; }
          if (window.ptsTrack) window.ptsTrack('generate_lead', { form_source: 'Brochure - Smart Home', service: 'smart-home' });
       }).catch(function () {
         if (msg) { msg.className = 'form-msg err'; msg.textContent = 'Hmm, that didn’t go through. Please call or text 631-871-5957 and we’ll take care of you.'; }
       }).finally(function () {
         if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; }
       });
    });
  });
})();