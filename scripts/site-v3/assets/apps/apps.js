/* Piets Apps — live demo switcher. Sample data only; nothing is saved or sent.
   Piets Technology Solutions Inc · 631-871-5957.
   Much of this was prepared with AI. Tell the owner about any mistake so it gets fixed. */
(function () {
  'use strict';
  var root = document.getElementById('appDeck'); if (!root) return;

  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function kpi(v,l,cls){return '<div class="kpi '+(cls||'')+'"><b>'+esc(v)+'</b><span>'+esc(l)+'</span></div>';}
  function row(title,meta,chips){
    var t=(chips||[]).map(function(c){return '<span class="chip '+(c[1]||'')+'">'+esc(c[0])+'</span>';}).join('');
    return '<div class="r"><div><b>'+esc(title)+'</b><div class="m">'+esc(meta)+'</div></div><div class="tail">'+t+'</div></div>';
  }
  function rows(list){return '<div class="rows">'+list.join('')+'</div>';}

  var APPS = {
    marinavue: {
      name:'Piets MarinaVue', tag:'Marinas & boatyards', live:'Demo data',
      icon:'<path d="M3 18h18M12 3v12M12 7l6 3-6 3"/>',
      blurb:'Slips, vessels, yard work, dock Wi-Fi, cameras and billing — one app for the harbormaster, the staff and every boat owner.',
      roles:{
        'Staff app':function(){
          return '<h4>Harborview Marina &amp; Boatyard</h4><div class="sub">Sample marina · Great South Bay · VHF CH 09</div>'
            + '<div class="kpis">'+kpi('34 / 40','Slips occupied')+kpi('7','Vessels on the hard')+kpi('3','Open work orders','warn')+kpi('1','Camera down','bad')+'</div>'
            + rows([
              row('Slip B-14 · 38ft Sportfish','Haul-out booked Thu 8:00 AM · lift well 1',[['Scheduled','ok']]),
              row('Dock C Wi-Fi','Access point offline 42 min · auto-ticket opened',[['Needs tech','warn']]),
              row('Camera 7 · fuel dock','No stream since 6:12 AM',[['Offline','bad']]),
              row('Work order #1184','Bottom paint · 22ft center console',[['In progress','pur']])
            ]) + '<div class="appnote">Tap a role above to see the same marina through the owner’s eyes.</div>';
        },
        'Boat owner':function(){
          return '<h4>Your boat</h4><div class="sub">Sample owner view · phone or tablet</div>'
            + '<div class="kpis">'+kpi('B-14','Your slip')+kpi('Oct 14','Next haul-out')+kpi('\u2014','Balance due','good')+kpi('2','Cameras on your dock')+'</div>'
            + rows([
              row('Request a pump-out','Pick a day, we confirm by text',[['1 tap','pur']]),
              row('Watch your dock','Live camera, last 14 days of clips',[['Live','ok']]),
              row('Winter storage','Reserve your spot for the season',[['Open','ok']]),
              row('Invoices','Slip fees, fuel and yard work in one place',[['Paid','ok']])
            ]) + '<div class="appnote">Owners never see another owner’s boat, bill or camera.</div>';
        },
        'Gate & cameras':function(){
          return '<h4>Access &amp; video</h4><div class="sub">Gate, dock doors and cameras, tied to who actually paid</div>'
            + '<div class="kpis">'+kpi('128','Fobs active')+kpi('6','Gate opens today')+kpi('18','Cameras online','good')+kpi('30d','Clip retention')+'</div>'
            + rows([
              row('Main gate','Opens for paid slips only · auto-locks after hours',[['Armed','ok']]),
              row('Dock A door','Owner app unlock, no fob needed',[['Enabled','pur']]),
              row('Fuel dock camera','4K Paramont · night vision',[['Online','ok']]),
              row('Expired slip B-02','Fob disabled automatically on Oct 1',[['Blocked','warn']])
            ]);
        }
      }
    },
    stablevue: {
      name:'Piets StableVue', tag:'Barns & equestrian centers', live:'Demo data',
      icon:'<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>',
      blurb:'The morning board, the care list, turnout rules, paperwork and barn cameras — so nothing gets missed at 6 AM.',
      roles:{
        'Today board':function(){
          return '<h4>Morning board</h4><div class="sub">Sample equestrian center · Friday</div>'
            + '<div class="kpis">'+kpi('6','Horses on property')+kpi('41 / 54','Care tasks done')+kpi('1','Blocked from turnout','bad')+kpi('0','Mares on foal watch')+'</div>'
            + rows([
              row('Winslow · stall A-3','Vaccination expired Sep 29 — turnout blocked',[['Record the shot','pur']]),
              row('Feed round 1','6 of 6 buckets logged by 6:40 AM',[['Done','ok']]),
              row('Stall cleaning','4 of 6 stalls',[['In progress','warn']]),
              row('Farrier · Tuesday','3 horses booked, owners auto-notified',[['Scheduled','ok']])
            ]) + '<div class="appnote">Tap a cell when it is done. Turnout checks paperwork before it lets you.</div>';
        },
        'Owner portal':function(){
          return '<h4>Your horse</h4><div class="sub">Sample owner view</div>'
            + '<div class="kpis">'+kpi('A-3','Stall')+kpi('Oct 29','Next farrier')+kpi('2','Vet records due','warn')+kpi('24/7','Barn camera')+'</div>'
            + rows([
              row('Watch the barn','Live stall and aisle cameras',[['Live','ok']]),
              row('Care log','Every feed, turnout and blanket change, time-stamped',[['Today','pur']]),
              row('Upload Coggins','Drag the PDF in — turnout unlocks itself',[['Needed','warn']]),
              row('Board invoice','Auto-billed the 1st',[['Paid','ok']])
            ]);
        },
        'Barn cameras':function(){
          return '<h4>Cameras &amp; Wi-Fi</h4><div class="sub">Paramont cameras, barn-wide Wi-Fi, no monthly cloud fee</div>'
            + '<div class="kpis">'+kpi('12','Cameras')+kpi('4','Foaling stalls')+kpi('100%','Wi-Fi coverage','good')+kpi('21d','Playback')+'</div>'
            + rows([
              row('Foaling stall 2','Motion alert to the barn manager’s phone',[['Armed','ok']]),
              row('Aisle camera','Records on movement, 24/7 on request',[['Online','ok']]),
              row('Arena Wi-Fi','Outdoor access point, lesson streaming',[['Strong','ok']]),
              row('Tack room door','Access control, logs every entry',[['Locked','pur']])
            ]);
        }
      }
    },
    puppyvue: {
      name:'Piets PuppyVue', tag:'Breeders & kennels', live:'Demo data',
      icon:'<circle cx="12" cy="13" r="5"/><path d="M6 6.5 8 9M18 6.5 16 9"/>',
      blurb:'Litters, whelping cameras, health records, waitlists and deposits — with a private page for every buyer.',
      roles:{
        'Kennel view':function(){
          return '<h4>Litters &amp; whelping</h4><div class="sub">Sample kennel</div>'
            + '<div class="kpis">'+kpi('2','Active litters')+kpi('11','Puppies')+kpi('9','Reserved','good')+kpi('14','Waitlist')+'</div>'
            + rows([
              row('Litter A · day 32','Whelping camera recording · temperature logged hourly',[['Live','ok']]),
              row('Shots due','4 puppies, second round Friday',[['Reminder set','pur']]),
              row('Microchips','7 of 11 registered',[['In progress','warn']]),
              row('Go-home packets','Auto-built PDF per puppy',[['Ready','ok']])
            ]);
        },
        'Buyer page':function(){
          return '<h4>Your puppy</h4><div class="sub">Private link per family — no logins to remember</div>'
            + '<div class="kpis">'+kpi('#4','Your pick')+kpi('Nov 8','Go-home day')+kpi('Paid','Deposit','good')+kpi('Daily','New photos')+'</div>'
            + rows([
              row('Watch the litter','Whelping camera, on a schedule you set',[['Live','ok']]),
              row('Weekly photo drop','Pushed to your phone every Sunday',[['On','pur']]),
              row('Health records','Vet visits, shots, worming — all in one PDF',[['Updated','ok']]),
              row('Balance','Pay by link, card or Zelle',[['Due Nov 1','warn']])
            ]);
        },
        'Waitlist':function(){
          return '<h4>Waitlist &amp; deposits</h4><div class="sub">Order kept honest automatically</div>'
            + '<div class="kpis">'+kpi('14','On the list')+kpi('6','Deposits held')+kpi('0','Missed replies','good')+kpi('48h','Reply window')+'</div>'
            + rows([
              row('Position 1 · sample family','Offered pick, 48h to reply',[['Waiting','warn']]),
              row('Position 2 · sample family','Auto-moves up if no reply',[['Queued','pur']]),
              row('Deposit receipts','Emailed and logged the second they pay',[['Automatic','ok']]),
              row('No-shows','Refund rule applied from your own terms',[['Set','ok']])
            ]);
        }
      }
    },
    pietbox: {
      name:'The Piet Box', tag:'Any TV, working for you', live:'Plug in, scan, done',
      icon:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 20h8"/>',
      blurb:'One small box turns any screen into a menu board, an ad wall and a customer photo wall. Piets loads it and runs it monthly — you never touch a router.',
      roles:{
        'On the screen':function(){
          return '<h4>What customers see</h4><div class="sub">Sample counter screen</div>'
            + '<div class="kpis">'+kpi('3','Screens')+kpi('12','Menu items')+kpi('48','Photos this week','good')+kpi('0','Visits needed')+'</div>'
            + rows([
              row('Menu board','Prices change from your phone in seconds',[['Live','ok']]),
              row('Promo rotation','Happy hour auto-swaps at 4 PM',[['Timed','pur']]),
              row('Photo wall','Customers scan the QR and their shot appears',[['Moderated','ok']]),
              row('Closed-day screen','Hours, phone and a map',[['Ready','ok']])
            ]) + '<div class="appnote">Build your own screen on the Piet Box page — it takes about a minute.</div>';
        },
        'Owner phone':function(){
          return '<h4>Running it from your phone</h4><div class="sub">No app store, no passwords to lose</div>'
            + '<div class="kpis">'+kpi('1 tap','Change a price')+kpi('30s','New promo')+kpi('Yes','Works offline','good')+kpi('24/7','Piets support')+'</div>'
            + rows([
              row('Price edit','Type it, it is on the screen before you put the phone down',[['Instant','pur']]),
              row('Approve photos','Nothing shows until you say yes',[['Safe','ok']]),
              row('Second location','Same menu, different screen',[['Supported','ok']]),
              row('Monthly plan','Piets keeps it loaded, updated and alive',[['Managed','pur']])
            ]);
        }
      }
    },
    polish: {
      name:'Polish Network (TV box)', tag:'Family TV, in Polish', live:'Built for parents',
      icon:'<rect x="2" y="5" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M10 10l5 2.5-5 2.5z"/>',
      blurb:'A simple Polish-language TV box for family: giant buttons, a remote that makes sense, and a start screen anyone can use.',
      roles:{
        'Start screen':function(){
          return '<h4>Ekran startowy</h4><div class="sub">Big tiles, Polish labels, nothing to configure</div>'
            + '<div class="kpis">'+kpi('6','Big tiles')+kpi('2','Button presses to watch','good')+kpi('0','Menus to learn')+kpi('PL','Language')+'</div>'
            + rows([
              row('Telewizja na żywo','One button to live TV',[['Ready','ok']]),
              row('Ulubione','Favourites pinned to the front',[['Set','pur']]),
              row('Radio','Polish stations, same remote',[['On','ok']]),
              row('Pomoc','One button calls Piets',[['631-871-5957','pur']])
            ]);
        },
        'What it fixes':function(){
          return '<h4>Why we built it</h4><div class="sub">The old app was too complicated</div>'
            + rows([
              row('No tiny text','Everything sized for a living-room TV',[['Fixed','ok']]),
              row('No sign-in loops','Box stays signed in',[['Fixed','ok']]),
              row('No hunting','Favourites first, everything else behind one button',[['Fixed','ok']]),
              row('Slow box friendly','Light motion so old hardware keeps up',[['Tuned','pur']])
            ]);
        }
      }
    },
    tools: {
      name:'Piets field tools', tag:'What the tech carries', live:'In use on jobs',
      icon:'<path d="M3 12h4l3 7 4-14 3 7h4"/>',
      blurb:'The tools Piets built for its own work — a network scanner with no subscription, and a recorder watchdog that spots a dead camera before you do.',
      roles:{
        'Network Analyzer':function(){
          return '<h4>Piets Network Analyzer</h4><div class="sub">A network scanner with no subscription and no scan limit</div>'
            + '<div class="kpis">'+kpi('43','Devices found')+kpi('0','Scan limits','good')+kpi('None','Subscription','good')+kpi('6s','Full sweep')+'</div>'
            + rows([
              row('Unknown device','New MAC on the camera VLAN',[['Flagged','warn']]),
              row('Open ports','Shows what is exposed, in plain English',[['Checked','ok']]),
              row('Wi-Fi map','Signal per room, written to a report',[['Report','pur']]),
              row('Export','One click to a PDF for the client file',[['Ready','ok']])
            ]);
        },
        'Recorder Watch':function(){
          return '<h4>Piets Recorder Watch</h4><div class="sub">We find the dead camera before the client calls</div>'
            + '<div class="kpis">'+kpi('19','Sites watched')+kpi('2','Alerts today','warn')+kpi('98%','Cameras up','good')+kpi('5m','Check interval')+'</div>'
            + rows([
              row('Sample site · camera 4','No stream for 11 minutes',[['Alert sent','bad']]),
              row('Sample site · drive health','Surveillance drive at 91% life',[['Healthy','ok']]),
              row('Recording gap','Overnight gap found and reported',[['Resolved','ok']]),
              row('Monthly report','Uptime per camera, emailed to the client',[['Included','pur']])
            ]) + '<div class="appnote">Part of the Piets managed plans.</div>';
        }
      }
    }
  };

  var order = ['marinavue','stablevue','puppyvue','pietbox','polish','tools'];
  var cur = 'marinavue', curRole = null;

  function svg(d){return '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';}

  function render(){
    var a = APPS[cur];
    var roleNames = Object.keys(a.roles);
    if (!curRole || roleNames.indexOf(curRole) < 0) curRole = roleNames[0];

    var list = order.map(function(k){
      var x = APPS[k];
      return '<button type="button" role="tab" data-app="'+k+'" aria-selected="'+(k===cur)+'">'
        + '<span class="dot">'+svg(x.icon)+'</span>'
        + '<span><strong>'+esc(x.name)+'</strong><small>'+esc(x.tag)+'</small></span></button>';
    }).join('');

    var roles = roleNames.map(function(r){
      return '<button type="button" role="tab" data-role="'+esc(r)+'" aria-selected="'+(r===curRole)+'">'+esc(r)+'</button>';
    }).join('');

    root.innerHTML =
      '<div class="applist" role="tablist" aria-label="Piets apps">'+list+'</div>'
      + '<div class="appstage">'
      +   '<div class="appbar"><span class="lg"><i></i></span><b>'+esc(a.name)+'</b>'
      +     '<span class="live">'+esc(a.live)+'</span></div>'
      +   '<div class="approles" role="tablist" aria-label="View as">'+roles+'</div>'
      +   '<div class="appbody">'+a.roles[curRole]()+'</div>'
      + '</div>';
  }

  root.addEventListener('click', function(e){
    var b = e.target.closest('button[data-app]');
    if (b){ cur = b.getAttribute('data-app'); curRole = null; render(); return; }
    var r = e.target.closest('button[data-role]');
    if (r){ curRole = r.getAttribute('data-role'); render(); }
  });

  render();
})();
