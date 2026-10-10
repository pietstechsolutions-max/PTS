/* Piets — Remote Support session demo (roadmap item 24, Oct 10 2026).
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Self-contained, page-scoped: mounts into #rs-app on remote-support.html only.
   Nothing here invents a figure, a rate, a speed or a spec. Every screen is drawn
   in code with sample data. The RustDesk ID shown is a placeholder, not an ID.
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  'use strict';
  var mount = document.getElementById('rs-app');
  if (!mount) return;

  var TABS = [
    { k: 'run',   id: 'rsTab-run',   label: 'A session, start to finish' },
    { k: 'scope', id: 'rsTab-scope', label: 'What we can fix from here' },
    { k: 'real',  id: 'rsTab-real',  label: 'Make sure it is really us' }
  ];

  var S = { tab: 'run', step: 0, log: [] };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
    });
  }
  function now() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }
  function say(t) { S.log.push({ t: now(), m: t }); }

  /* ---------------- shell (built once, then updated in place) ---------------- */
  mount.innerHTML =
    '<div class="mcon">' +
      '<div class="mcon__bar">' +
        '<span class="mcon__lg" aria-hidden="true"><i></i></span>' +
        '<b>Remote session</b>' +
        '<span class="mcon__demo">Demo</span>' +
        '<span class="mcon__live">Sample screens</span>' +
      '</div>' +
      '<div class="mcon__tabs" role="tablist" aria-label="Remote session demo">' +
        TABS.map(function (t) {
          return '<button type="button" role="tab" id="' + t.id + '" data-rs-tab="' + t.k + '" ' +
                 'aria-controls="rsPanel" aria-selected="false" tabindex="-1">' + esc(t.label) + '</button>';
        }).join('') +
      '</div>' +
      '<div class="mcon__body" id="rsPanel" role="tabpanel" aria-labelledby="' + TABS[0].id + '"></div>' +
    '</div>';

  var panel = mount.querySelector('#rsPanel');
  var tabBtns = Array.prototype.slice.call(mount.querySelectorAll('[data-rs-tab]'));

  function markTabs() {
    var key = tabKey();
    tabBtns.forEach(function (b) {
      var on = b.getAttribute('data-rs-tab') === key;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (on) panel.setAttribute('aria-labelledby', b.id);
    });
  }
  function tabKey() {
    for (var i = 0; i < TABS.length; i++) if (TABS[i].k === S.tab) return S.tab;
    return TABS[0].k;
  }

  /* ---------------- the two sample screens ---------------- */
  function desktop(opts) {
    /* a sample desktop, drawn in code. opts: {queue:n, printing:bool, cursor:bool} */
    var rows = [
      { n: 'Invoice_sample.pdf', s: opts.queue > 0 ? 'Stuck in queue' : 'Printed', bad: opts.queue > 0 },
      { n: 'Menu_sample.pdf',    s: opts.queue > 1 ? 'Waiting'        : 'Printed', bad: opts.queue > 1 },
      { n: 'Labels_sample.pdf',  s: opts.queue > 2 ? 'Waiting'        : 'Printed', bad: opts.queue > 2 }
    ];
    return '' +
      '<div class="rsd">' +
        '<div class="rsd__bar"><i></i><i></i><i></i><span>Print queue &middot; Sample printer</span></div>' +
        '<div class="rsd__rows">' +
          rows.map(function (r) {
            return '<div class="rsd__row"><b>' + esc(r.n) + '</b>' +
                   '<span class="rsd__st' + (r.bad ? ' bad' : ' ok') + '">' + esc(r.s) + '</span></div>';
          }).join('') +
        '</div>' +
        (opts.printing ? '<div class="rsd__out" aria-hidden="true"><span></span></div>' : '') +
        (opts.cursor ? '<span class="rsd__cur" aria-hidden="true"></span>' : '') +
      '</div>';
  }

  function screenBox(who, sub, inner, cls) {
    return '<div class="rss' + (cls ? ' ' + cls : '') + '">' +
             '<div class="rss__cap"><b>' + esc(who) + '</b><span>' + esc(sub) + '</span></div>' +
             '<div class="rss__scr">' + inner + '</div>' +
           '</div>';
  }

  /* ---------------- tab 1: the run ---------------- */
  function viewRun() {
    var yours, theirs, actions, banner = '';

    if (S.step === 0) {
      yours  = desktop({ queue: 3 });
      theirs = '<div class="rsw"><span class="rsw__k">Piets</span><p>Nothing is connected. We cannot see this screen and we cannot start a session on our own.</p></div>';
      actions = [{ a: 'call', t: 'Call Piets and read out your ID', p: 1 }];
    } else if (S.step === 1) {
      yours = desktop({ queue: 3 }) +
        '<div class="rsp" role="group" aria-label="Permission request on your screen">' +
          '<div class="rsp__t">Accept connection?</div>' +
          '<p class="rsp__b">A remote desktop connection has been requested. Nothing happens until you choose.</p>' +
          '<div class="rsp__who"><span>Requested by</span><b>Piets Technology Solutions</b></div>' +
          '<div class="rsp__act">' +
            '<button type="button" class="rsb rsb--yes" data-rs-act="allow">Accept</button>' +
            '<button type="button" class="rsb rsb--no" data-rs-act="deny">Decline</button>' +
          '</div>' +
        '</div>';
      theirs = '<div class="rsw"><span class="rsw__k">Piets</span><p>ID entered. Waiting for you to accept &mdash; this is where it stops if you do nothing.</p>' +
               '<div class="rsid"><span>ID read out to us</span><b>&bull;&bull;&bull; &bull;&bull;&bull; &bull;&bull;&bull;</b><em>sample &mdash; your real ID is shown in RustDesk</em></div></div>';
      actions = [];
    } else if (S.step === -1) {
      yours  = desktop({ queue: 3 });
      theirs = '<div class="rsw rsw--no"><span class="rsw__k">Piets</span><p><b>Declined.</b> No connection was made and nothing on this computer changed. Declining is always a safe answer &mdash; if you are not sure who is asking, decline and call 631-871-5957.</p></div>';
      actions = [{ a: 'reset', t: 'Start the demo again', p: 0 }];
    } else if (S.step === 2) {
      yours  = desktop({ queue: 3, cursor: true });
      theirs = screenInner(desktop({ queue: 3, cursor: true }));
      banner = sharing();
      actions = [{ a: 'fix', t: 'Watch us clear the stuck queue', p: 3 }];
    } else if (S.step === 3) {
      yours  = desktop({ queue: 0, printing: true, cursor: true });
      theirs = screenInner(desktop({ queue: 0, printing: true, cursor: true }));
      banner = sharing();
      actions = [{ a: 'end', t: 'End the session', p: 4 }];
    } else {
      yours  = desktop({ queue: 0 });
      theirs = '<div class="rsw"><span class="rsw__k">Piets</span><p><b>Session closed.</b> The connection is gone. We cannot get back in &mdash; the next session needs a new ID and a new accept from you.</p></div>';
      actions = [{ a: 'reset', t: 'Run it again', p: 0 }];
    }

    return '' +
      '<h4>Watch a session happen &mdash; and stop it</h4>' +
      '<p class="sub">Both screens below are drawn in code with sample files on them. The Accept and Decline buttons are real: press Decline and the demo does what a decline really does.</p>' +
      '<div class="rsgrid">' +
        screenBox('Your screen', 'what you see', yours + banner, 'rss--you') +
        screenBox('Our screen', 'what we see', theirs, 'rss--us') +
      '</div>' +
      (actions.length
        ? '<div class="rsacts">' + actions.map(function (a) {
            return '<button type="button" class="rsgo" data-rs-act="' + a.a + '">' + esc(a.t) + '</button>';
          }).join('') + '</div>'
        : '<p class="rshint">Choose <b>Accept</b> or <b>Decline</b> on your screen above to carry on.</p>') +
      '<div class="rslog"><div class="rslog__h">Session log</div><ol>' +
        (S.log.length
          ? S.log.map(function (l) { return '<li><span>' + esc(l.t) + '</span>' + l.m + '</li>'; }).join('')
          : '<li class="rslog__e"><span>&mdash;</span>Nothing has happened yet.</li>') +
      '</ol></div>';
  }
  function sharing() {
    return '<div class="rsban"><span class="rsban__d" aria-hidden="true"></span>' +
           'You are sharing this screen. You can end it at any time.</div>';
  }
  function screenInner(html) {
    return '<div class="rsmirror">' + html + '<span class="rsmirror__tag">Live view</span></div>';
  }

  /* ---------------- tab 2 ---------------- */
  function viewScope() {
    var can = [
      ['Software and settings', 'Slow machines, applications that will not open, Windows and macOS settings, updates and patches.'],
      ['Email and accounts', 'Mail client setup, send and receive problems, spam filtering, Microsoft 365 and Google Workspace.'],
      ['Printers and devices', 'Drivers, print queues, scan-to-email, wireless printing &mdash; as long as the device is powered and on the network.'],
      ['Network checks', 'Router and Wi-Fi settings, what the machine can and cannot reach, and talking to your internet provider with you.'],
      ['Camera systems', 'InVid Tech Paramont recorder settings, checking that cameras are recording, and setting up viewing on your phone.'],
      ['Showing you how', 'Walking through something on your own screen so you can do it yourself next time.']
    ];
    var cant = [
      ['Anything unplugged', 'If the computer, the recorder or the router is off or off the network, nothing reaches it from here.'],
      ['Hardware that has failed', 'A dead drive, a failed power supply or a damaged cable needs hands on it.'],
      ['Cabling and mounting', 'Runs, jacks, camera positions, access control hardware &mdash; those are visits.'],
      ['Work on a machine you cannot reach', 'Someone has to be at the computer to read out the ID and accept.']
    ];
    return '' +
      '<h4>What a remote session is good for &mdash; and what it is not</h4>' +
      '<p class="sub">Worth saying plainly, so nobody waits on a session for something that needs a van.</p>' +
      '<div class="rstwo">' +
        '<div class="rscol"><div class="rscol__h rscol__h--yes">From a remote session</div>' +
          can.map(function (r) { return '<div class="rsitem"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>'; }).join('') +
        '</div>' +
        '<div class="rscol"><div class="rscol__h rscol__h--no">Needs someone on site</div>' +
          cant.map(function (r) { return '<div class="rsitem"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>'; }).join('') +
        '</div>' +
      '</div>' +
      '<p class="note">If it turns out to need a visit, we say so on the call rather than after an hour on your screen. Call or text 631-871-5957.</p>';
  }

  /* ---------------- tab 3 ---------------- */
  function viewReal() {
    var never = [
      'Call you out of the blue to say your computer has a virus or a warranty is expiring.',
      'Ask for a password, a bank or card number, a gift card, or a code texted to you.',
      'Ask you to install anything other than RustDesk from rustdesk.com.',
      'Connect without you accepting the request on your own screen.',
      'Ask you to stay on the line while you move money or buy anything.'
    ];
    var doo = [
      ['Hang up and call us back', 'Call 631-871-5957 yourself. Do not use a number someone on the phone gave you, and do not call back the number that rang you.'],
      ['Check what you are being asked to install', 'A Piets remote session uses RustDesk, downloaded from rustdesk.com. Nothing else.'],
      ['You read the ID to us, not the other way round', 'We cannot start anything from our side. The ID comes from your screen, in your words.'],
      ['Read the prompt before you accept', 'The accept box names what is asking. If it is not what you expect, decline &mdash; nothing happens.'],
      ['Watch the screen', 'Everything we do is on your monitor while it happens. If something looks wrong, close RustDesk and the session is over.']
    ];
    return '' +
      '<h4>Remote support is a favourite trick of scammers. Here is how to be sure.</h4>' +
      '<p class="sub">This page exists partly so you have something to check against. Nothing here is a judgement call &mdash; it is a short list either way.</p>' +
      '<div class="rstwo">' +
        '<div class="rscol"><div class="rscol__h rscol__h--yes">What to do</div>' +
          doo.map(function (r) { return '<div class="rsitem"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>'; }).join('') +
        '</div>' +
        '<div class="rscol"><div class="rscol__h rscol__h--no">Piets will never</div>' +
          never.map(function (r) { return '<div class="rsitem rsitem--n"><span>' + r + '</span></div>'; }).join('') +
        '</div>' +
      '</div>' +
      '<p class="note">If something has already happened and you are not sure, call 631-871-5957. We would far rather look at it for nothing than hear about it later.</p>';
  }

  /* ---------------- render ---------------- */
  function render(focusSel) {
    var k = tabKey();
    panel.innerHTML = k === 'scope' ? viewScope() : k === 'real' ? viewReal() : viewRun();
    markTabs();
    if (focusSel) {
      var f = panel.querySelector(focusSel);
      if (f) try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); }
    }
  }

  /* live region lives OUTSIDE the panel so a repaint cannot delete it */
  var live = document.createElement('p');
  live.className = 'rslive';
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  mount.appendChild(live);
  function announce(t) { live.textContent = t; }

  /* ---------------- events ---------------- */
  mount.addEventListener('click', function (e) {
    var tb = e.target.closest('[data-rs-tab]');
    if (tb) { S.tab = tb.getAttribute('data-rs-tab'); render(); announce(tb.textContent.trim() + ' selected.'); return; }

    var a = e.target.closest('[data-rs-act]');
    if (!a) return;
    var act = a.getAttribute('data-rs-act');

    if (act === 'call')  { S.step = 1;  say('You called 631-871-5957 and read out the ID shown in RustDesk.'); say('Request sent. Your screen is asking you to accept or decline.'); render('[data-rs-act="allow"]'); announce('Your screen is asking you to accept or decline the connection.'); }
    else if (act === 'allow') { S.step = 2; say('You accepted. The session is open and you can see everything.'); render('[data-rs-act="fix"]'); announce('Accepted. The session is open and you can end it at any time.'); }
    else if (act === 'deny')  { S.step = -1; say('You declined. No connection was made and nothing changed.'); render('[data-rs-act="reset"]'); announce('Declined. No connection was made and nothing on the computer changed.'); }
    else if (act === 'fix')   { S.step = 3; say('Stuck print queue cleared, on your screen, while you watched.'); render('[data-rs-act="end"]'); announce('The stuck print queue was cleared. The sample printer is printing.'); }
    else if (act === 'end')   { S.step = 4; say('You ended the session. The connection is closed.'); render('[data-rs-act="reset"]'); announce('Session closed. The connection is gone.'); }
    else if (act === 'reset') { S.step = 0; S.log = []; render('[data-rs-act="call"]'); announce('Demo reset.'); }
  });

  /* arrow / Home / End on the tab strip. Stands down if the shared a11y.js is loaded,
     so the two never both move focus. Same data-a11y guard pos.js, drive.js,
     fleet.js and studio.js use. */
  mount.addEventListener('keydown', function (e) {
    if (mount.getAttribute('data-a11y') === 'on' || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target.closest('[data-rs-tab]');
    if (!t) return;
    var i = tabBtns.indexOf(t), n = tabBtns.length, j = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = n - 1;
    if (j < 0) return;
    e.preventDefault();
    S.tab = tabBtns[j].getAttribute('data-rs-tab');
    render();
    tabBtns[j].focus();
    announce(tabBtns[j].textContent.trim() + ' selected.');
  });

  render();
})();
