/* Field HQ client portal tour — interactive mock with sample data. Nothing is saved or sent.
   Piets Technology Solutions Inc · 631-871-5957. Much of this was prepared with AI — tell Matt about any mistake. */
(function () {
  'use strict';
  var root = document.getElementById('fhqDemo'); if (!root) return;
  var P = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>', quote: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-8 8"/>',
    bill: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>', chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    today: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', jobs: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3"/>',
    pipe: '<path d="M4 6h4v12H4zM10 6h4v8h-4zM16 6h4v5h-4z"/>', cam: '<path d="M3 7h11a2 2 0 0 1 2 2v1l4-2.5v9L16 14v1a2 2 0 0 1-2 2H3z"/><circle cx="8.5" cy="12" r="2.5"/>'
  };
  var ic = function (n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>'; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var D = {
    approved: false, signer: '',
    msgs: [['them', 'Hi Jordan, your quote is ready. Tap Quotes to look it over. Questions? We are here 24/7.', 'Piets · 9:12 AM'], ['me', 'Thanks! Can you do Thursday morning?', 'You · 9:40 AM'], ['them', 'Thursday 9 AM works. You will get a reminder the day before.', 'Piets · 9:44 AM']],
    jobs: [
      { t: 'Wi-Fi upgrade', c: 'Sample Cafe', s: 0 }, { t: '8-camera install', c: 'Sample Home', s: 1 }, { t: 'Piet Box setup', c: 'Sample Dental', s: 1 },
      { t: 'POS network fix', c: 'Sample Deli', s: 2 }, { t: 'Smart home hub', c: 'Sample Home 2', s: 3 }, { t: 'Printer repair', c: 'Sample Office', s: 3 }
    ]
  };
  var STAGES = ['New lead', 'Quote sent', 'Scheduled', 'Done'];
  var NAV = {
    client: [['home', 'home', 'Home'], ['quote', 'quote', 'Quotes', 1], ['visits', 'cal', 'Visits'], ['photos', 'photo', 'Photos'], ['bills', 'bill', 'Invoices'], ['msgs', 'chat', 'Messages']],
    team: [['today', 'today', 'Today'], ['board', 'pipe', 'Jobs board'], ['inbox', 'chat', 'Conversations']],
    partner: [['phome', 'home', 'Overview'], ['pleads', 'pipe', 'My leads'], ['pdeals', 'jobs', 'Deals'], ['pres', 'photo', 'Resources'], ['ppay', 'bill', 'Payouts']]
  };
  /* Partner (VAR / reseller) sample data — no amounts on purpose */
  var PD = { leads: [
      { biz: 'Sample Marina', what: 'MarinaVue + dock cameras', st: 2, when: 'Sep 30' }, { biz: 'Sample Barn', what: 'StableVue', st: 1, when: 'Oct 2' },
      { biz: 'Sample Deli', what: 'Piet Box · 2 TVs', st: 3, when: 'Oct 6' }, { biz: 'Sample Dental', what: 'Website + Field HQ', st: 0, when: 'Oct 8' } ] };
  var PSTAGES = ['Lead sent', 'Quote out', 'Scheduled', 'Installed'];
  var role = (root.getAttribute('data-default-role') === 'partner') ? 'partner' : 'client', page = role === 'partner' ? 'phome' : 'home';
  var LINES = [['Paramont 4K camera (sample)', 4, 0], ['NVR recorder + drive (sample)', 1, 0], ['Install, setup & training', 1, 0]];
  function V() {
    if (role === 'client') {
      if (page === 'home') return '<h4>Hi Jordan</h4><p class="sub">Sample Home · your Piets portal</p><div class="grid">' +
        st('Quote', D.approved ? 'Approved' : 'Ready to review') + st('Next visit', 'Thu 9:00 AM') + st('Balance', D.approved ? 'Deposit due' : 'Nothing due') + st('Piet Box', 'Online') + '</div>' +
        '<div class="list">' + row('quote', '8-camera install', D.approved ? 'Approved by ' + esc(D.signer) : 'Waiting for your OK', D.approved ? 'ok' : 'warn', D.approved ? 'Approved' : 'Review') + row('cal', 'Install visit', 'Thursday 9:00 AM · Piets tech', '', 'Scheduled') + row('chat', 'New message from Piets', '"Thursday 9 AM works…"', '', 'Read') + '</div>';
      if (page === 'quote') return '<h4>Your quote</h4><p class="sub">Sample quote. Real quotes show your exact gear, labor and price.</p><div class="quote"><div class="hd"><b>8-camera install · Sample Home</b><span class="pill ' + (D.approved ? 'ok' : 'warn') + '">' + (D.approved ? 'Approved' : 'Waiting for your OK') + '</span></div><table>' +
        LINES.map(function (l) { return '<tr><td>' + l[0] + '</td><td>Qty ' + l[1] + '</td></tr>'; }).join('') + '<tr><td><b>Total</b></td><td><b>Shown on your real quote</b></td></tr></table>' +
        (D.approved ? '<div class="sign"><span class="pill ok">Signed by ' + esc(D.signer) + '</span><span style="font-size:.85rem;color:var(--f-mut)">Piets got it and will confirm your visit.</span></div>'
          : '<div class="sign"><label for="fhqSign" style="font-size:.85rem;font-weight:600">Type your name to approve</label><input id="fhqSign" maxlength="60" placeholder="Your full name"><button class="fbtn" type="button" data-act="approve">Approve quote</button></div>') + '</div>';
      if (page === 'visits') return '<h4>Visits</h4><p class="sub">Reminders go out the day before.</p><div class="list">' + row('cal', 'Walkthrough', 'Done · last Monday', 'ok', 'Done') + row('cal', 'Install', 'Thursday 9:00 AM', '', 'Scheduled') + row('cal', 'Training + handoff', 'After install', '', 'Planned') + '</div>';
      if (page === 'photos') return '<h4>Photos</h4><p class="sub">Before, during and after shots from your job.</p><div class="photos">' + ['Front door view', 'Driveway view', 'Back yard view', 'Recorder closet', 'Phone app setup', 'Cable run'].map(function (x) { return '<div class="ph">' + ic(x.indexOf('app') > -1 ? 'photo' : 'cam') + x + '<br>(sample)</div>'; }).join('') + '</div>';
      if (page === 'bills') return '<h4>Invoices</h4><p class="sub">Zelle, Venmo, Cash App, cash or check at no extra charge. Card by secure link (4% processing fee).</p><div class="list">' + row('bill', 'INV-1001 · Walkthrough', 'Free', 'ok', 'No charge') + row('bill', 'Deposit · 8-camera install', D.approved ? 'Ready after approval' : 'Appears after you approve', D.approved ? 'warn' : '', D.approved ? 'Due' : 'Not yet') + '</div>';
      if (page === 'msgs') return '<h4>Messages</h4><p class="sub">Text-style chat with Piets.</p>' + thread() + '<div class="msgbox"><label for="fhqMsg" class="sr-only">Message</label><input id="fhqMsg" maxlength="200" placeholder="Type a message"><button class="fbtn" type="button" data-act="send">Send</button></div>';
    } else if (role === 'partner') {
      var inst = PD.leads.filter(function (l) { return l.st === 3; }).length, open = PD.leads.filter(function (l) { return l.st === 1 || l.st === 2; }).length;
      if (page === 'phome') return '<h4>Hi Alex</h4><p class="sub">Sample Partner Co. · your Piets partner portal</p><div class="grid">' +
        st('Leads sent', String(PD.leads.length)) + st('Open quotes', String(open)) + st('Installed', String(inst)) + st('Next payout', 'Nov 1') + '</div>' +
        '<div class="list">' + PD.leads.slice(0, 3).map(function (l) { return row('jobs', esc(l.biz) + ' · ' + esc(l.what), 'Sent ' + l.when, l.st === 3 ? 'ok' : (l.st === 0 ? '' : 'warn'), PSTAGES[l.st]); }).join('') + '</div>' +
        '<div class="fhq-cta"><button class="fbtn" type="button" data-page="pleads">Submit a lead</button><button class="fbtn ghost" type="button" data-page="pres">Demo kit &amp; resources</button></div>';
      if (page === 'pleads') return '<h4>My leads</h4><p class="sub">Send Piets a business. We quote, install, support and bill. You follow it here.</p>' +
        '<div class="quote"><div class="hd"><b>Submit a lead</b><span class="pill dk">Takes 20 seconds</span></div><div class="sign" style="flex-wrap:wrap"><input id="fhqLeadBiz" maxlength="60" placeholder="Business name"><input id="fhqLeadWhat" maxlength="60" placeholder="What they need (Piet Box, cameras, website…)"><button class="fbtn" type="button" data-act="plead">Send to Piets</button></div></div>' +
        '<div class="list">' + PD.leads.map(function (l) { return row('jobs', esc(l.biz) + ' · ' + esc(l.what), 'Sent ' + l.when, l.st === 3 ? 'ok' : (l.st === 0 ? '' : 'warn'), PSTAGES[l.st]); }).join('') + '</div>';
      if (page === 'pdeals') return '<h4>Deals</h4><p class="sub">Every lead moves left to right. Piets updates it; you just watch.</p><div class="board">' + PSTAGES.map(function (sname, i) {
        var ls = PD.leads.filter(function (l) { return l.st === i; });
        return '<div class="col"><h5>' + sname + '<span>' + ls.length + '</span></h5>' + ls.map(function (l) { return '<div class="jc"><b>' + esc(l.biz) + '</b><span>' + esc(l.what) + '</span></div>'; }).join('') + '</div>';
      }).join('') + '</div>';
      if (page === 'pres') return '<h4>Resources</h4><p class="sub">Everything you need to sell Piets. Co-branded versions on request.</p><div class="list">' +
        row('photo', 'Piet Box one-pager + TV demo', 'pietstechsolutions.com/piet-box', '', 'Open') + row('photo', 'Website demo builder', 'pietstechsolutions.com/websites — build a demo in a minute, in front of the client', '', 'Open') +
        row('photo', 'Field HQ client portal tour', 'pietstechsolutions.com/portal', '', 'Open') + row('photo', 'Pietvue apps: MarinaVue, StableVue, PuppyVue', 'pietstechsolutions.com/apps', '', 'Open') +
        row('photo', 'Logo pack + brand colors', 'Ask Piets · sent as a zip', '', 'Request') + '</div>';
      if (page === 'ppay') return '<h4>Payouts</h4><p class="sub">Paid monthly for installed deals. Amounts show on your real statement.</p><div class="quote"><table>' +
        [['October (so far)', '1 installed · 2 in progress', 'Pending'], ['September', '2 installed', 'Paid'], ['August', '1 installed', 'Paid']].map(function (r) { return '<tr><td><b>' + r[0] + '</b><br><span style="color:var(--f-mut);font-size:.85rem">' + r[1] + '</span></td><td><span class="pill ' + (r[2] === 'Paid' ? 'ok' : 'warn') + '">' + r[2] + '</span></td></tr>'; }).join('') + '</table></div>';
    } else {
      if (page === 'today') return '<h4>Today</h4><p class="sub">Piets team view · sample data</p><div class="grid">' + st('Visits today', '3') + st('Quotes waiting', String(D.jobs.filter(function (j) { return j.s === 1; }).length)) + st('New leads', String(D.jobs.filter(function (j) { return j.s === 0; }).length)) + st('Piet Boxes online', 'All') + '</div><div class="list">' +
        row('cal', '9:00 AM · Sample Home', '8-camera install · ' + (D.approved ? 'quote approved' : 'quote waiting'), D.approved ? 'ok' : 'warn', D.approved ? 'Go' : 'Waiting') + row('cal', '1:00 PM · Sample Deli', 'POS network fix', '', 'Scheduled') + row('cal', '4:00 PM · Sample Cafe', 'Wi-Fi walkthrough', '', 'Scheduled') + '</div>';
      if (page === 'board') return '<h4>Jobs board</h4><p class="sub">Tap "Move" to push a job to the next stage. New website leads land in New lead.</p><div class="board">' + STAGES.map(function (s, i) {
        var js = D.jobs.filter(function (j) { return j.s === i; });
        return '<div class="col"><h5>' + s + '<span>' + js.length + '</span></h5>' + js.map(function (j) { var k = D.jobs.indexOf(j); return '<div class="jc"><b>' + esc(j.t) + '</b><span>' + esc(j.c) + '</span>' + (i < 3 ? '<br><button type="button" data-move="' + k + '">Move to ' + STAGES[i + 1] + ' →</button>' : '') + '</div>'; }).join('') + '</div>';
      }).join('') + '</div>';
      if (page === 'inbox') return '<h4>Conversations</h4><p class="sub">Sample Home · Jordan</p>' + thread(true) + '<div class="msgbox"><label for="fhqMsg" class="sr-only">Reply</label><input id="fhqMsg" maxlength="200" placeholder="Reply as Piets"><button class="fbtn" type="button" data-act="send">Send</button></div>';
    }
    return '';
  }
  function st(a, b) { return '<div class="stat"><small>' + a + '</small><b>' + b + '</b></div>'; }
  function row(i, t, s, cls, p) { return '<div class="row"><span style="color:var(--f-bl2);width:22px;height:22px;display:inline-flex">' + ic(i) + '</span><div class="t"><b>' + t + '</b><span>' + s + '</span></div><span class="pill ' + (cls || '') + '">' + p + '</span></div>'; }
  function thread(team) { return '<div class="thread" id="fhqThread">' + D.msgs.map(function (m) { var me = team ? m[0] === 'them' : m[0] === 'me'; return '<div class="bub ' + (me ? 'me' : 'them') + '">' + esc(m[1]) + '<small>' + esc(m[2]) + '</small></div>'; }).join('') + '</div>'; }
  function render() {
    root.querySelectorAll('.fhq__role button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-role') === role); });
    root.querySelector('.fhq__nav').innerHTML = NAV[role].map(function (n) { return '<button type="button" data-page="' + n[0] + '"' + (n[0] === page ? ' aria-current="page"' : '') + '>' + ic(n[1]) + n[2] + (n[3] && !D.approved ? '<span class="badge">1</span>' : '') + '</button>'; }).join('');
    root.querySelector('.fhq__main').innerHTML = V();
    var t = document.getElementById('fhqThread'); if (t) t.scrollTop = t.scrollHeight;
  }
  root.addEventListener('click', function (e) {
    var r = e.target.closest('[data-role]'); if (r) { role = r.getAttribute('data-role'); page = NAV[role][0][0]; render(); return; }
    var p = e.target.closest('[data-page]'); if (p) { page = p.getAttribute('data-page'); render(); return; }
    var m = e.target.closest('[data-move]'); if (m) { var j = D.jobs[+m.getAttribute('data-move')]; j.s = Math.min(3, j.s + 1); render(); return; }
    var a = e.target.closest('[data-act]'); if (!a) return;
    if (a.getAttribute('data-act') === 'approve') {
      var inp = document.getElementById('fhqSign'); var v = (inp.value || '').trim();
      if (v.length < 2) { inp.setAttribute('aria-invalid', 'true'); inp.placeholder = 'Type your name first'; inp.focus(); return; }
      D.approved = true; D.signer = v; D.jobs[1].s = 2; D.msgs.push(['them', 'Got your approval, ' + v.split(' ')[0] + '. See you Thursday at 9.', 'Piets · just now']); render();
    }
    if (a.getAttribute('data-act') === 'plead') {
      var b1 = document.getElementById('fhqLeadBiz'), w1 = document.getElementById('fhqLeadWhat'); var bv = (b1.value || '').trim(), wv = (w1.value || '').trim();
      if (bv.length < 2) { b1.setAttribute('aria-invalid', 'true'); b1.placeholder = 'Business name first'; b1.focus(); return; }
      PD.leads.unshift({ biz: bv, what: wv || 'Ask Piets', st: 0, when: 'just now' }); render(); return;
    }
    if (a.getAttribute('data-act') === 'send') {
      var i2 = document.getElementById('fhqMsg'); var txt = (i2.value || '').trim(); if (!txt) { i2.focus(); return; }
      D.msgs.push([role === 'team' ? 'them' : 'me', txt, (role === 'team' ? 'Piets' : 'You') + ' · just now']); render();
      if (role === 'client') setTimeout(function () { D.msgs.push(['them', 'Thanks! A Piets tech will reply shortly. (Demo reply)', 'Piets · just now']); if (page === 'msgs') render(); }, 900);
      var n = document.getElementById('fhqMsg'); if (n) n.focus();
    }
  });
  root.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'fhqMsg') { e.preventDefault(); var b = root.querySelector('[data-act="send"]'); if (b) b.click(); } });
  render();
})();
