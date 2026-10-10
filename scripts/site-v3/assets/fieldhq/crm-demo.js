/* Field HQ — CRM console demo. Sample data only. Nothing is saved or sent.
   Piets Technology Solutions Inc · 631-871-5957.
   Much of this was prepared with AI — tell the owner about any mistake so it gets fixed. */
(function () {
  'use strict';
  var root = document.getElementById('crmDemo'); if (!root) return;

  var TAX = 0.0875; // Suffolk County NY, effective Mar 1 2025
  var STAGES = ['New lead', 'Quote sent', 'Scheduled', 'Done'];

  var D = {
    tab: 'today',
    who: 'team',
    flash: '',
    invoiceNo: 1042,
    jobs: [
      { t: '8-camera install',   c: 'Sample Home · Westbury', s: 1 },
      { t: 'Wi-Fi upgrade',      c: 'Sample Cafe · Patchogue', s: 0 },
      { t: 'Piet Box setup',     c: 'Sample Dental · Mastic', s: 2 },
      { t: 'POS network fix',    c: 'Sample Deli · Riverhead', s: 2 },
      { t: 'Smart home hub',     c: 'Sample Home 2 · Hauppauge', s: 3 },
      { t: 'Printer repair',     c: 'Sample Office · Islip', s: 3 },
      { t: 'Access control',     c: 'Sample Shop · Bay Shore', s: 0 }
    ],
    lines: [
      { d: 'Paramont 4K camera — supplied, installed, set up', q: 8, p: 0 },
      { d: 'NVR recorder + surveillance drive', q: 1, p: 0 },
      { d: 'Cat6 cable runs, mounts and terminations', q: 1, p: 0 },
      { d: 'Phone app setup and on-site training', q: 1, p: 0 }
    ]
  };

  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  /* Pricing is not published yet (the owner, Oct 10 2026): a figure of zero is a price point
     that has not been set, so it prints as an em dash rather than as $0.00. Type a number
     into the quote builder and the arithmetic appears exactly as it always did. */
  function usd(n){return (+n) ? '$' + (Math.round(n*100)/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}) : '\u2014';}
  function k(v,l,cls){return '<div class="k '+(cls||'')+'"><b>'+esc(v)+'</b><span>'+esc(l)+'</span></div>';}
  function row(t,m,tags){
    var x=(tags||[]).map(function(c){return '<span class="tag '+(c[1]||'')+'">'+esc(c[0])+'</span>';}).join('');
    return '<div class="r"><div><b>'+esc(t)+'</b><div class="m">'+esc(m)+'</div></div><div class="tail">'+x+'</div></div>';
  }
  function lst(a){return '<div class="lst">'+a.join('')+'</div>';}
  function sub(){var s=0;D.lines.forEach(function(l){s+=(+l.q||0)*(+l.p||0);});return s;}

  var TABS = [
    ['today','Today'], ['pipe','Pipeline'], ['quote','Quote builder'],
    ['inv','Invoice'], ['sched','Schedule'], ['client','Client portal']
  ];

  var V = {};

  V.today = function(){
    var open = D.jobs.filter(function(j){return j.s<3;});
    return '<h4>Today</h4><div class="sub">Friday · everything that needs you, in one screen</div>'
      + '<div class="k4">'+k(String(open.length),'Open jobs')+k('Coming soon','Pipeline value','pur')
      + k('2','Quotes waiting on a yes','warn')+k('1','Unpaid invoice','bad')+'</div>'
      + lst([
        row('8-camera install · Sample Home','Quote sent Tue — no answer yet',[['Follow up','t-warn']]),
        row('Piet Box setup · Sample Dental','Thursday 9:00 AM — equipment already ordered',[['Scheduled','t-ok']]),
        row('POS network fix · Sample Deli','Today 2:00 PM — 1 hour',[['Today','t-pur']]),
        row('Smart home hub · Sample Home 2','Finished — invoice not sent',[['Bill it','t-bad']]),
        row('Access control · Sample Shop','New lead from the website form, 11 min ago',[['New','t-ok']])
      ])
      + '<div class="note">Field HQ tells you the money step on every job: send it, invoice it, schedule it, or follow up.</div>';
  };

  V.pipe = function(){
    var cols = STAGES.map(function(name, si){
      var inCol = D.jobs.map(function(j,i){return {j:j,i:i};}).filter(function(x){return x.j.s===si;});
      var cards = inCol.map(function(x){
        return '<div class="pcard"><b>'+esc(x.j.t)+'</b><em>'+esc(x.j.c)+'</em>'
          + '<div class="mv">'
          +   '<button type="button" data-mv="-1" data-i="'+x.i+'"'+(si===0?' disabled':'')+' aria-label="Move back">&#8592; Back</button>'
          +   '<button type="button" data-mv="1" data-i="'+x.i+'"'+(si===3?' disabled':'')+' aria-label="Move forward">Advance &#8594;</button>'
          + '</div></div>';
      }).join('') || '<div class="note" style="margin:0">Nothing here.</div>';
      return '<div class="pcol"><h5><span>'+esc(name)+'</span><span>'+inCol.length+'</span></h5><div class="tot">Pricing coming soon</div>'+cards+'</div>';
    }).join('');
    return '<h4>Pipeline</h4><div class="sub">Move a job and the board moves with it. Try it.</div>'
      + '<div class="pipe">'+cols+'</div>'
      + '<div class="note">Same board on the phone in the van. Nothing sits in a stage without a next step and a date.</div>';
  };

  V.quote = function(){
    var rows = D.lines.map(function(l,i){
      return '<tr><td><input type="text" data-f="d" data-i="'+i+'" value="'+esc(l.d)+'" aria-label="Description"></td>'
        + '<td class="n"><input type="number" min="0" step="1" data-f="q" data-i="'+i+'" value="'+l.q+'" aria-label="Quantity"></td>'
        + '<td class="n"><input type="number" min="0" step="10" data-f="p" data-i="'+i+'" value="'+l.p+'" aria-label="Price each"></td>'
        + '<td class="n">'+usd((+l.q||0)*(+l.p||0))+'</td>'
        + '<td class="n"><button type="button" class="x" data-del="'+i+'" aria-label="Remove line">&times;</button></td></tr>';
    }).join('');
    var s = sub(), tax = s*TAX, tot = s+tax;
    return '<h4>Quote builder</h4><div class="sub">Change a number — the tax, the total and the deposit schedule all redo themselves</div>'
      + '<div class="qb"><table><thead><tr><th>Line</th><th class="n">Qty</th><th class="n">Each</th><th class="n">Line total</th><th></th></tr></thead>'
      + '<tbody>'+rows+'</tbody></table>'
      + '<button type="button" class="add" data-add="1">+ Add a line</button>'
      + '<div class="qtot">'
      +   '<div class="qbox"><div class="l"><span>Subtotal (pre-tax)</span><b>'+usd(s)+'</b></div>'
      +     '<div class="l"><span>Sales tax · Suffolk County 8.75%</span><b>'+usd(tax)+'</b></div>'
      +     '<div class="l big"><span>Total</span><b>'+usd(tot)+'</b></div>'
      +     '<div class="note" style="margin-top:10px">Every price above is pre-tax. Tax shows once, at the end — the way a Piets estimate reads.</div></div>'
      +   '<div class="pay">'
      +     '<div class="p"><span>Deposit now · 50% + all tax</span><b>'+usd(s*0.5+tax)+'</b></div>'
      +     '<div class="p"><span>On arrival with equipment · 25%</span><b>'+usd(s*0.25)+'</b></div>'
      +     '<div class="p"><span>On completion · 25%</span><b>'+usd(s*0.25)+'</b></div>'
      +   '</div>'
      + '</div></div>'
      + '<div class="acts"><button type="button" data-act="send">Send to the client</button>'
      + '<button type="button" class="g" data-act="toinv">Turn it into an invoice</button></div>'
      + (D.flash ? '<div class="flash">'+esc(D.flash)+'</div>' : '')
      + '<div class="note">Pricing is not published yet. Type your own numbers into the Each column and the tax, the total and the deposit schedule all work exactly as they will on a real quote.</div>';
  };

  V.inv = function(){
    var s = sub(), tax = s*TAX, tot = s+tax;
    var rows = D.lines.filter(function(l){return (+l.q||0)*(+l.p||0) > 0 || l.d;}).map(function(l){
      return '<tr><td>'+esc(l.d)+'</td><td class="n">'+(+l.q||0)+'</td><td class="n">'+usd(+l.p||0)+'</td><td class="n">'+usd((+l.q||0)*(+l.p||0))+'</td></tr>';
    }).join('');
    return '<h4>Invoice</h4><div class="sub">Built straight from the quote — numbered, logged, due on receipt</div>'
      + '<div class="inv"><div class="stripe"></div>'
      + '<div class="ih"><div class="co"><b>PIETS TECHNOLOGY SOLUTIONS</b>'
      +   '<span>631-871-5957</span><span>pietstechsolutions@gmail.com</span><span>pietstechsolutions.com</span></div>'
      +   '<div class="no"><b>INV-'+D.invoiceNo+'</b><span>Invoice date: sample</span><span>Service date: sample</span><span>Due on receipt</span></div></div>'
      + '<table><thead><tr><th>Description</th><th class="n">Qty</th><th class="n">Each</th><th class="n">Amount</th></tr></thead><tbody>'+rows+'</tbody></table>'
      + '<div class="tt"><div class="l"><span>Subtotal</span><span>'+usd(s)+'</span></div>'
      +   '<div class="l"><span>Sales tax 8.75%</span><span>'+usd(tax)+'</span></div>'
      +   '<div class="l big"><span>Total due</span><span>'+usd(tot)+'</span></div></div>'
      + '<div class="ft">Zelle, Venmo, Cash App, cash or check — no fee. Card by secure payment link, 4% processing fee added. Checks payable to Piets Technology Solutions Inc.<br>'
      +   'Parts of this document were prepared with AI. We work hard to keep it accurate — if you spot a mistake or have a question or suggestion, contact Piets Technology Solutions at 631-871-5957 so we can fix it.</div></div>'
      + '<div class="acts"><button type="button" data-act="paid">Mark it paid</button>'
      + '<button type="button" class="g" data-act="next">Next invoice number</button></div>'
      + (D.flash ? '<div class="flash">'+esc(D.flash)+'</div>' : '');
  };

  V.sched = function(){
    var days = [
      ['Mon', [['9:00 AM','POS network fix · Sample Deli',''],['1:30 PM','Site walk · Sample Shop','p']]],
      ['Tue', [['8:00 AM','8-camera install · day 1','']]],
      ['Wed', [['8:00 AM','8-camera install · day 2',''],['3:00 PM','Training + app setup','p']]],
      ['Thu', [['9:00 AM','Piet Box setup · Sample Dental','']]],
      ['Fri', [['10:00 AM','Wi-Fi survey · Sample Cafe','p'],['2:00 PM','Remote support block','']]]
    ];
    var html = days.map(function(d){
      var evs = d[1].map(function(e){return '<div class="ev '+e[2]+'"><b>'+esc(e[0])+'</b>'+esc(e[1])+'</div>';}).join('');
      return '<div class="d"><h5>'+esc(d[0])+'</h5>'+evs+'</div>';
    }).join('');
    return '<h4>The week</h4><div class="sub">Jobs, travel and the remote-support block — the client gets the reminder, you do not have to send it</div>'
      + '<div class="wk">'+html+'</div>'
      + lst([
        row('Day-before reminder','Text goes out automatically at 4 PM',[['Automatic','t-ok']]),
        row('On-my-way','Client gets a ping when you leave the last job',[['30 min out','t-pur']]),
        row('Photos','Install photos attach to the job and the client sees them',[['On','t-ok']])
      ]);
  };

  V.client = function(){
    return '<h4>What your client sees</h4><div class="sub">Same job, their side — no password, just the link you text them</div>'
      + '<div class="k4">'+k('1','Quote to review','warn')+k('Thu 9 AM','Next visit')+k('12','Job photos')+k('\u2014','Balance','good')+'</div>'
      + lst([
        row('Your quote','Read it, ask a question, approve it with your name',[['Waiting on you','t-warn']]),
        row('Your visits','Every appointment, with a reminder the day before',[['Thu 9:00 AM','t-pur']]),
        row('Your photos','Before, during and after — yours to keep',[['12 new','t-ok']]),
        row('Your invoices','Pay by Zelle, Venmo, Cash App, check or card link',[['Paid','t-ok']]),
        row('Message Piets','Straight to Piets. Questions? We are here 24/7.',[['Open','t-pur']])
      ])
      + '<div class="acts"><a class="btn btn-primary btn-sm" href="portal.html" style="text-decoration:none">Take the full portal tour</a></div>';
  };

  function render(){
    var tabs = TABS.map(function(t){
      return '<button type="button" role="tab" data-tab="'+t[0]+'" aria-selected="'+(t[0]===D.tab)+'">'+esc(t[1])+'</button>';
    }).join('');
    root.innerHTML =
      '<div class="crm__bar"><span class="crm__lg"><i></i></span><b>Field HQ</b>'
      + '<span class="crm__demo">Demo data</span>'
      + '<span class="crm__who"><button type="button" data-who="team" aria-pressed="'+(D.who==='team')+'">Piets team</button>'
      + '<button type="button" data-who="client" aria-pressed="'+(D.who==='client')+'">Client</button></span></div>'
      + '<div class="crm__tabs" role="tablist" aria-label="Field HQ screens">'+tabs+'</div>'
      + '<div class="crm__body">'+ (D.who==='client' ? V.client() : V[D.tab]()) +'</div>';
  }

  root.addEventListener('click', function(e){
    var t = e.target.closest('[data-tab]');
    if (t){ D.tab = t.getAttribute('data-tab'); D.who='team'; D.flash=''; render(); return; }
    var w = e.target.closest('[data-who]');
    if (w){ D.who = w.getAttribute('data-who'); D.flash=''; render(); return; }
    var mv = e.target.closest('[data-mv]');
    if (mv){
      var i = +mv.getAttribute('data-i'), d = +mv.getAttribute('data-mv');
      D.jobs[i].s = Math.max(0, Math.min(3, D.jobs[i].s + d)); render(); return;
    }
    var del = e.target.closest('[data-del]');
    if (del){ D.lines.splice(+del.getAttribute('data-del'),1); if(!D.lines.length) D.lines.push({d:'New line',q:1,p:0}); render(); return; }
    if (e.target.closest('[data-add]')){ D.lines.push({d:'New line — describe the work', q:1, p:0}); render(); return; }
    var a = e.target.closest('[data-act]');
    if (a){
      var act = a.getAttribute('data-act');
      if (act==='send'){ D.flash='Quote sent. The client gets a text with a link — no password. Field HQ chases it for you in 3 days if nobody answers.'; }
      if (act==='toinv'){ D.tab='inv'; D.flash='Invoice INV-'+D.invoiceNo+' built from the quote and logged.'; }
      if (act==='paid'){ D.flash='Marked paid. Logged against the job, the client gets a receipt with no blank fields on it.'; }
      if (act==='next'){ D.invoiceNo++; D.flash='Next number in the log: INV-'+D.invoiceNo+'.'; }
      render();
    }
  });

  root.addEventListener('input', function(e){
    var f = e.target.getAttribute && e.target.getAttribute('data-f'); if (!f) return;
    var i = +e.target.getAttribute('data-i');
    var v = e.target.value;
    D.lines[i][f] = (f==='d') ? v : (v===''?0:+v);
    if (f==='d') {
      // live total refresh without stealing focus from the text field
      return;
    }
    var pos = e.target.selectionStart, id = f+'-'+i;
    e.target.setAttribute('data-keep', id);
    render();
    var again = root.querySelector('[data-f="'+f+'"][data-i="'+i+'"]');
    if (again){ again.focus(); try{ again.setSelectionRange(pos,pos); }catch(_){} }
  });

  render();
})();
