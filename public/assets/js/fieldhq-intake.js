/* FieldHQ intake — ONE shared helper for every form on pietstechsolutions.com (Oct 15 2026).
   window.sendToFieldHQ(payload) -> Promise<{sent:boolean, reason?:string}>
   ONE setting: FIELDHQ_INTAKE_URL. The build writes it from the Vercel env var of the same
   name (scripts/build-blog.js). Empty = FieldHQ not connected yet: the helper sends nothing
   and every form keeps doing exactly what it did before (POST /api/leads, text/email builders).
   It never blocks or replaces a form's own submit, and it never throws.

   Payload sent (JSON): { name, phone, email, page, form, answers:{...every field...},
                          timestamp (ISO 8601), source: "pietstechsolutions.com" }
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Much of this was prepared with AI. Tell Piets about any mistake so it gets fixed. */
(function () {
  'use strict';
  var FIELDHQ_INTAKE_URL = '__FIELDHQ_INTAKE_URL__';
  if (FIELDHQ_INTAKE_URL.indexOf('__FIELDHQ') === 0) FIELDHQ_INTAKE_URL = '';
  var SKIP = /^(website|hp|honeypot|_gotcha|bot-field)$/i; // honeypots never leave the page

  function str(v) { return v == null ? '' : String(v).trim().slice(0, 4000); }

  // Turn a <form> (or a plain object) into the answers map. Checkbox groups become lists.
  function answersFrom(src) {
    var out = {};
    if (!src) return out;
    if (typeof FormData !== 'undefined' && src instanceof HTMLFormElement) {
      var fd = new FormData(src);
      fd.forEach(function (v, k) {
        if (SKIP.test(k) || typeof v !== 'string') return;
        if (k in out) { out[k] = [].concat(out[k], str(v)); } else { out[k] = str(v); }
      });
      return out;
    }
    Object.keys(src).forEach(function (k) {
      if (SKIP.test(k)) return;
      var v = src[k];
      out[k] = Array.isArray(v) ? v.map(str) : (v && typeof v === 'object' ? JSON.stringify(v).slice(0, 4000) : str(v));
    });
    return out;
  }

  function pick(a, keys) {
    for (var i = 0; i < keys.length; i++) { var v = a[keys[i]]; if (v) return Array.isArray(v) ? v[0] : v; }
    return '';
  }

  /* payload: { form: 'Planner', answers: <form element or object>, name?, phone?, email?, page? } */
  function sendToFieldHQ(payload) {
    payload = payload || {};
    var answers = answersFrom(payload.answers || payload.form_el || {});
    var body = {
      name: str(payload.name || pick(answers, ['name', 'full_name', 'r_name', 'contact_name', 'fname'])),
      phone: str(payload.phone || pick(answers, ['phone', 'tel', 'r_phone', 'mobile'])),
      email: str(payload.email || pick(answers, ['email', 'mail'])),
      page: str(payload.page || location.pathname),
      form: str(payload.form || 'Website form'),
      answers: answers,
      timestamp: new Date().toISOString(),
      source: 'pietstechsolutions.com'
    };
    sendToFieldHQ.last = body; // lets QA (and the browser console) see exactly what would be sent
    if (!FIELDHQ_INTAKE_URL) return Promise.resolve({ sent: false, reason: 'FieldHQ not connected yet' });
    try {
      return fetch(FIELDHQ_INTAKE_URL, {
        method: 'POST', mode: 'cors', keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(function (r) { return { sent: r.ok, reason: r.ok ? '' : 'HTTP ' + r.status }; },
              function (e) { return { sent: false, reason: String(e && e.message || e) }; });
    } catch (e) { return Promise.resolve({ sent: false, reason: String(e && e.message || e) }); }
  }
  sendToFieldHQ.url = FIELDHQ_INTAKE_URL;
  sendToFieldHQ.connected = !!FIELDHQ_INTAKE_URL;
  window.sendToFieldHQ = sendToFieldHQ;
  window.FIELDHQ_INTAKE_URL = FIELDHQ_INTAKE_URL;
})();
