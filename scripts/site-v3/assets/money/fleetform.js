/* Piets Fleet — pilot & partner intake. Self-contained, no dependencies.
   Three steps, branch on role, client-side validation, honest demo fallback.
   Nothing is computed or claimed here: every value shown back is one the
   visitor typed or picked. */
(function () {
  var root = document.getElementById('fleetapply');
  if (!root) return;

  var form = root.querySelector('[data-fleet-form]');
  var steps = Array.prototype.slice.call(root.querySelectorAll('.planner-step'));
  var fill = root.querySelector('.progress-fill');
  var dots = Array.prototype.slice.call(root.querySelectorAll('.progress-steps .step'));
  var prevBtn = root.querySelector('.fleet-prev');
  var nextBtn = root.querySelector('.fleet-next');
  var sendBtn = root.querySelector('.fleet-submit');
  var success = root.querySelector('[data-success]');
  var fallback = root.querySelector('[data-fallback]');
  var out = root.querySelector('[data-out]');
  var outSms = root.querySelector('[data-out-sms]');
  var outMail = root.querySelector('[data-out-mail]');
  var review = root.querySelector('[data-review]');
  var reviewList = root.querySelector('[data-review-list]');
  var branches = Array.prototype.slice.call(root.querySelectorAll('[data-branch]'));
  if (!form || !steps.length || !prevBtn || !nextBtn || !sendBtn) return;

  var step = 1;
  var total = steps.length;

  var LABEL = {
    role: 'Applying as', vehicles: 'Vehicles', town: 'Based in', need: 'Would help most',
    trade: 'What we do', area: 'Area covered', radius: 'Travels',
    hours: 'Available', notes: 'Notes', company: 'Business', name: 'Name',
    phone: 'Phone', email: 'Email', best_time: 'Best time'
  };

  function text(el) {
    if (!el) return '';
    if (el.tagName === 'SELECT') return el.selectedIndex > 0 ? el.options[el.selectedIndex].text : '';
    return (el.value || '').trim();
  }

  function labelOf(input) {
    var wrap = input.closest('.service-option');
    var lab = wrap && wrap.querySelector('.service-label');
    if (!lab) return input.value;
    return (lab.childNodes[0] && lab.childNodes[0].textContent || lab.textContent || '').trim();
  }

  function role() {
    var r = form.querySelector('input[name="role"]:checked');
    return r ? r.value : '';
  }

  /* Hidden branch fields must not block validation or submit. */
  function syncBranches() {
    var want = role();
    branches.forEach(function (b) {
      var on = b.getAttribute('data-branch') === want;
      b.hidden = !on;
      Array.prototype.forEach.call(b.querySelectorAll('input,select,textarea'), function (el) {
        el.disabled = !on;
      });
    });
  }

  function msgFor(el) {
    var s = el.closest ? el.closest('.planner-step') : null;
    return s ? s.querySelector('.form-msg') : null;
  }

  function clearErr(el) {
    el.classList.remove('error');
    var e = el.parentElement && el.parentElement.querySelector('.error-message');
    if (e) e.remove();
  }

  function showErr(el, text) {
    clearErr(el);
    el.classList.add('error');
    if (el.parentElement) {
      var e = document.createElement('div');
      e.className = 'error-message';
      e.setAttribute('role', 'alert');
      e.textContent = text;
      el.parentElement.appendChild(e);
    }
  }

  /* one live-region line per step: the first problem found is the one announced */
  function say(stepEl, text) {
    var m = stepEl.querySelector('.form-msg');
    if (!m) return;
    if (!text) { m.textContent = ''; m.className = 'form-msg'; return; }
    if (!m.textContent) { m.className = 'form-msg err'; m.textContent = text; }
  }

  function firstVisible(sel, scope) {
    var list = Array.prototype.slice.call((scope || form).querySelectorAll(sel));
    for (var i = 0; i < list.length; i++) {
      if (!list[i].disabled && list[i].offsetParent !== null) return list[i];
    }
    return null;
  }

  function validate(n) {
    var s = steps[n - 1];
    if (!s) return true;
    var ok = true;
    /* clear the step's live summary so the first problem found is the one announced */
    Array.prototype.forEach.call(s.querySelectorAll('.form-msg'), function (m) {
      m.textContent = ''; m.className = 'form-msg';
    });

    if (n === 1) {
      if (!role()) { say(s, 'Pick one so we ask the right questions.'); return false; }
      return true;
    }

    if (n === 2 && role() === 'partner') {
      if (!s.querySelectorAll('input[name="trade"]:checked').length) {
        say(s, 'Pick at least one thing your business does.');
        ok = false;
      }
    }

    if (n === 3) {
      var consent = s.querySelector('[name="sms_consent"]');
      if (consent && !consent.checked) {
        showErr(consent, 'Please tick this so we are allowed to contact you.');
        say(s, 'Please tick the box so we are allowed to contact you.');
        ok = false;
      } else if (consent) { clearErr(consent); }
    }

    Array.prototype.forEach.call(s.querySelectorAll('input[required],select[required],textarea[required]'), function (el) {
      if (el.disabled || el.name === 'sms_consent') return;
      if (!el.checkValidity()) {
        showErr(el, el.validationMessage || 'Please fill this in.');
        say(s, 'Please check the highlighted field above.');
        ok = false;
      } else {
        clearErr(el);
      }
    });

    return ok;
  }

  function progress() {
    if (fill) fill.style.width = ((step - 1) / (total - 1)) * 100 + '%';
    dots.forEach(function (d, i) {
      var n = i + 1;
      d.classList.toggle('done', n < step);
      d.classList.toggle('current', n === step);
    });
  }

  function pairs() {
    var rows = [];
    var r = form.querySelector('input[name="role"]:checked');
    if (r) rows.push([LABEL.role, r.value === 'partner' ? 'Partner business' : 'Fleet operator']);
    ['vehicles', 'town', 'trade', 'area', 'radius', 'hours', 'need', 'notes',
      'company', 'name', 'phone', 'email', 'best_time'].forEach(function (key) {
      var boxes = Array.prototype.slice.call(form.querySelectorAll('input[type="checkbox"][name="' + key + '"]'));
      if (boxes.length) {
        var on = boxes.filter(function (b) { return b.checked && !b.disabled; }).map(labelOf);
        if (on.length) rows.push([LABEL[key] || key, on.join(', ')]);
        return;
      }
      var el = form.querySelector('[name="' + key + '"]');
      if (!el || el.disabled) return;
      var v = text(el);
      if (v) rows.push([LABEL[key] || key, v]);
    });
    return rows;
  }

  function drawReview() {
    if (!review || !reviewList) return;
    var rows = pairs();
    reviewList.textContent = '';
    rows.forEach(function (p) {
      var dt = document.createElement('dt');
      dt.textContent = p[0];
      var dd = document.createElement('dd');
      dd.textContent = p[1];
      reviewList.appendChild(dt);
      reviewList.appendChild(dd);
    });
    review.hidden = rows.length === 0;
  }

  function summary() {
    return pairs().map(function (p) { return p[0] + ': ' + p[1]; }).join('\n');
  }

  function show(n, moveFocus) {
    step = n;
    steps.forEach(function (s, i) { s.style.display = (i + 1 === n) ? 'block' : 'none'; });
    if (n === 2) syncBranches();
    if (n === 3) drawReview();
    prevBtn.style.display = n > 1 ? 'inline-flex' : 'none';
    nextBtn.style.display = n < total ? 'inline-flex' : 'none';
    sendBtn.style.display = n === total ? 'inline-flex' : 'none';
    progress();
    if (moveFocus !== false) {
      var f = firstVisible('input:not([type="hidden"]),select,textarea', steps[n - 1]);
      if (f) { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } }
      steps[n - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function send(e) {
    if (e) e.preventDefault();
    if (!validate(step)) return;

    var body = summary();
    var data = {
      name: text(form.querySelector('[name="name"]')),
      company: text(form.querySelector('[name="company"]')),
      phone: text(form.querySelector('[name="phone"]')),
      email: text(form.querySelector('[name="email"]')),
      service: 'piets-fleet',
      role: role(),
      message: 'FLEET INTAKE\n' + body,
      source: (form.querySelector('[name="source"]') || {}).value || 'Fleet intake',
      page: location.pathname,
      website: (form.querySelector('[name="website"]') || {}).value || ''
    };

    sendBtn.disabled = true;
    var done = false;
    function finish(ok) {
      if (done) return;
      done = true;
      sendBtn.disabled = false;
      form.style.display = 'none';
      if (ok) {
        if (success) {
          success.style.display = 'block';
          var b = success.querySelector('.btn');
          if (b) b.focus();
        }
      } else if (fallback) {
        fallback.hidden = false;
        if (out) out.value = body;
        var enc = encodeURIComponent('Piets Fleet — ' + (data.role === 'partner' ? 'partner' : 'pilot') + ' interest\n\n' + body);
        if (outSms) outSms.href = 'sms:+16318715957?&body=' + enc;
        if (outMail) outMail.href = 'mailto:pietstechsolutions@gmail.com?subject=' +
          encodeURIComponent('Piets Fleet — ' + (data.role === 'partner' ? 'partner application' : 'pilot list')) + '&body=' + enc;
        fallback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var h = fallback.querySelector('h4');
        if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
      }
    }

    if (!window.fetch) { finish(false); return; }
    var killed = setTimeout(function () { finish(false); }, 8000);
    window.fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) {
      clearTimeout(killed);
      if (!r.ok) throw new Error('bad status');
      if (window.ptsTrack) window.ptsTrack('generate_lead', { form_source: data.source, service: data.service });
      finish(true);
    }).catch(function () {
      clearTimeout(killed);
      finish(false);
    });
  }

  function init() {
    syncBranches();
    show(1, false);

    form.addEventListener('change', function (e) {
      if (e.target && e.target.name === 'role') {
        syncBranches();
        say(steps[0], '');
      }
      if (e.target && (e.target.name === 'trade' || e.target.name === 'need')) {
        var s = e.target.closest('.planner-step');
        if (s && e.target.checked) { say(s, ''); }
      }
    });

    /* keep the review panel in step with what is typed on the last step */
    form.addEventListener('input', function () { if (step === total) drawReview(); });
    form.addEventListener('change', function () { if (step === total) drawReview(); });

    prevBtn.addEventListener('click', function () { if (step > 1) show(step - 1); });
    nextBtn.addEventListener('click', function () { if (validate(step) && step < total) show(step + 1); });
    sendBtn.addEventListener('click', send);
    form.addEventListener('submit', send);
    form.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var t = e.target;
      if (t && (t.tagName === 'TEXTAREA' || t.tagName === 'BUTTON' || t.tagName === 'A')) return;
      e.preventDefault();
      if (step < total) { if (validate(step)) show(step + 1); } else { send(e); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
