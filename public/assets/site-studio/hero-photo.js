/* Piets Site Studio — "Live job" photo hero (default for every trade).
   Real photography (Pexels, free commercial use) with a live job overlay: crew-cam HUD, running clock,
   job card with a checklist that ticks, Field HQ notifications, slow camera drift, cross-fades.
   If the client uploaded work photos, their own photos are used instead of stock.
   Piets Technology Solutions Inc · 631-871-5957 */
(function (g) {
  'use strict';
  var H = g.PietsHeroes = g.PietsHeroes || { list: {} };
  var I = {
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
    pipe: '<path d="M3 7h7a4 4 0 0 1 4 4v10M3 12h5a1 1 0 0 1 1 1v8M12 21h6"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z"/>',
    thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/>',
    snow: '<path d="M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7"/>',
    fan: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 4-7s2 5-2 7M14 12c4 0 7 1 7 4s-5 2-7-2M12 14c0 4-1 7-4 7s-2-5 2-7M10 12c-4 0-7-1-7-4s5-2 7 2"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-6"/>',
    panel: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    plug: '<path d="M7 2v5M17 2v5M5 7h14v4a7 7 0 0 1-14 0zM12 18v4"/>',
    bulb: '<path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 2z"/>',
    mower: '<path d="M3 15h13l2-6h3"/><circle cx="6" cy="18" r="2"/><circle cx="15" cy="18" r="2"/><path d="M5 15v-4h7v4"/>',
    hedge: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1L20 20M8.1 15.9L20 4"/>',
    grid: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    truck: '<path d="M2 16V7h11v9M13 10h4l4 4v2h-8"/><circle cx="6" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    car: '<path d="M3 16v-3l2-5h14l2 5v3"/><path d="M3 13h18"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    spray: '<path d="M9 9h6v12H9zM10 9V5h4v4M17 4h1M17 7h3M17 10h1"/>',
    clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6"/>',
    sparkle: '<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    seat: '<path d="M7 3h6l1 9H8zM6 12h10l1 4H5zM7 16v5M15 16v5"/>',
    boat: '<path d="M3 17l2 3h14l2-3zM6 17V9l6-5v13M12 8l6 9"/>',
    cabinet: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M10 11v2M14 11v2"/>',
    bath: '<path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM6 12V5a2 2 0 0 1 4 0M6 20l-1 2M18 20l1 2"/>',
    floor: '<path d="M3 7l9-4 9 4-9 4zM3 12l9 4 9-4M3 17l9 4 9-4"/>',
    hammer: '<path d="M14 6l4 4M3 21l9-9M12 4l6 6-3 3-6-6z"/>',
    bucket: '<path d="M5 8h14l-2 13H7zM5 8a7 4 0 0 1 14 0"/>',
    window: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
    chef: '<path d="M7 14v6h10v-6M7 14a4 4 0 1 1 1.5-7.7A4 4 0 0 1 16 6a4 4 0 1 1 1 8z"/>',
    plate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
    glass: '<path d="M7 3h10l-1 7a4 4 0 0 1-8 0zM12 14v7M8 21h8"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 4a3 3 0 0 1 0 6M18 14a6 6 0 0 1 3 6"/>',
    comb: '<path d="M4 20L20 4M7 17l-2-2M10 14l-2-2M13 11l-2-2M16 8l-2-2"/>',
    razor: '<path d="M4 7h12v4H4zM16 9h4M8 11v9h4v-9"/>',
    steth: '<path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/>',
    tooth: '<path d="M8 3C4 3 3 6 4 9s1 6 2 9 2 3 3 0 1-4 3-4 2 1 3 4 2 3 3 0 1-6 2-9 0-6-4-6c-2 0-3 1-4 1S10 3 8 3z"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    run: '<circle cx="15" cy="4" r="2"/><path d="M7 21l3-6 3 2v5M6 11l4-3 4 2 3 3M10 8l3 7"/>',
    dumbbell: '<path d="M6 6v12M18 6v12M3 9v6M21 9v6M6 12h12"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="1"/><rect x="3" y="13" width="18" height="7" rx="1"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1"/>',
    camera: '<path d="M3 7h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/>',
    store: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18M9 20v-6h6v6"/>',
    tag: '<path d="M3 3h8l10 10-8 8L3 11z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    bag: '<path d="M5 8h14l-1 13H6zM9 8a3 3 0 0 1 6 0"/>'
  };
  H.photoIcons = I;

  var SVC = ['Request in · auto-text sent', 'Price approved on phone', 'Work underway', 'Done · photos sent'];
  var SUB = ['Customer got a text back in 9 sec', 'Approved with one tap, no phone tag', 'Live updates going to the customer', 'Before / after photos + invoice sent'];
  /* scene: [photoId, dock label, icon, job title, note, pick, focusX%, focusY%] */
  var SETS = {
    plumbing: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'On site · leak traced', 'Fixed · pressure tested', 'Cleaned up · photos sent'], sub: ['Customer got a text back in 9 sec', 'Price approved from their phone', 'No drips at 62 psi', 'Before / after photos + invoice sent'], scenes: [
      [6419128, 'Leak fix', 'wrench', 'Leak under the kitchen sink', 'Shut off, traced and fixed. The price shows up on your phone before we touch a thing.', 'Leak repair', 62, 38],
      [29226620, 'Re-pipe', 'pipe', 'Old galvanized out, PEX in', 'Whole-house re-pipe with clean, labeled runs and no surprise walls.', 'Re-pipe', 50, 55],
      [34938439, 'Water heater', 'flame', 'Water heater swap', 'Old tank out, new one in, hot water back tonight.', 'Water heater', 32, 42],
      [34938442, 'Boiler', 'thermo', 'Boiler tune-up before winter', 'Cleaned, tested and adjusted so it runs quiet all season.', 'Boiler service', 40, 38]] },
    hvac: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'Diagnosed · price approved', 'Repair underway', 'Done · temps checked'], sub: ['Customer got a text back in 9 sec', 'Approved with one tap, no phone tag', 'Live updates going to the customer', 'Supply air 55°F · photos sent'], scenes: [
      [32497161, 'AC tune-up', 'snow', 'AC tune-up', 'Coils cleaned, refrigerant checked, cold air back the same day.', 'AC repair', 52, 58],
      [7347538, 'Mini-split', 'fan', 'Ductless mini-split install', 'Quiet, efficient cooling for the rooms that never get cold.', 'Mini-split install', 58, 34],
      [7859953, 'Heating', 'flame', 'Furnace & boiler service', 'Pump, burner and safeties checked before the first cold night.', 'Heating repair', 52, 46],
      [5463587, 'Rooftop', 'gauge', 'Rooftop unit repair', 'Commercial units diagnosed and back online fast.', 'Commercial HVAC', 40, 50]] },
    electrical: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'Tested · price approved', 'Wiring underway', 'Done · inspected & labeled'], sub: ['Customer got a text back in 9 sec', 'Approved with one tap, no phone tag', 'Power off only where needed', 'Panel photo + invoice sent'], scenes: [
      [27928762, 'Panel', 'panel', 'Panel upgrade', 'Old panel out, new breakers labeled and inspected.', 'Panel upgrade', 58, 40],
      [14319099, 'Troubleshoot', 'gauge', 'Outlet & circuit troubleshooting', 'Find the fault, fix it right, test every circuit.', 'Troubleshooting', 50, 50],
      [27355830, 'EV charger', 'plug', 'EV charger install', 'Level 2 charger on its own circuit, charging by tonight.', 'EV charger', 50, 50],
      [7641361, 'Lighting', 'bulb', 'Lighting install', 'Recessed, pendant and outdoor lighting, done clean.', 'Lighting', 50, 40]] },
    landscaping: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'Crew on site', 'Work underway', 'Done · before / after sent'], sub: ['Customer got a text back in 9 sec', 'Arrival text sent to the customer', 'Live updates going out', 'Before / after photos + invoice sent'], scenes: [
      [4162016, 'Mowing', 'mower', 'Weekly mowing', 'Cut, edged and blown clean, same day every week.', 'Lawn mowing', 48, 62],
      [24595771, 'Hedges', 'hedge', 'Hedge trimming', 'Sharp lines, clippings hauled away.', 'Hedge trimming', 60, 22],
      [16239805, 'Patios', 'grid', 'Paver patio install', 'Base compacted, pavers set, joints sanded tight.', 'Patio / hardscape', 50, 58],
      [280222, 'Curb appeal', 'home', 'Spring clean-up & curb appeal', 'Beds, mulch, edging and a lawn that stripes.', 'Spring clean-up', 50, 62]] },
    auto: { cam: 'Shop cam', steps: ['Call in · tow dispatched', 'Estimate approved', 'In the bay', 'Ready · customer texted'], sub: ['Live ETA texted to the customer', 'Estimate approved from their phone', 'Progress photos sent', 'Pickup text sent'], scenes: [
      [13151224, 'Towing', 'truck', '24/7 towing', 'Flatbed on the way. A live ETA goes straight to your phone.', 'Towing', 46, 58],
      [17992463, 'Paint & body', 'spray', 'Paint & body', 'Body work, color match and a booth-baked finish.', 'Collision repair', 50, 56],
      [3807517, 'Repairs', 'wrench', 'Mechanical repair', 'Diagnose, quote, fix. No surprise charges.', 'Mechanical repair', 44, 40],
      [4489776, 'Inspection', 'clip', 'Inspection & maintenance', 'Brakes, fluids and safety checks while you wait.', 'Maintenance', 52, 45]] },
    detailing: { cam: 'Bay cam', steps: ['Booked · reminder sent', 'Wash & decon', 'Polish & protect', 'Done · photos sent'], sub: ['Reminder text went out last night', 'Customer gets live progress', 'Gloss readings logged', 'Before / after photos sent'], scenes: [
      [6870296, 'Polish', 'sparkle', 'Paint correction', 'Swirls out, gloss back. Machine polished panel by panel.', 'Paint correction', 50, 50],
      [20228312, 'Ceramic', 'drop', 'Ceramic coating', 'Water beads right off for years, not weeks.', 'Ceramic coating', 50, 50],
      [5233285, 'Interior', 'seat', 'Interior detail', 'Vacuumed, steamed and wiped down to like-new.', 'Interior detail', 50, 50],
      [36283840, 'Boats', 'boat', 'Boat detailing', 'Oxidation out, gel coat shining at the dock.', 'Boat detailing', 50, 52]] },
    contractor: { cam: 'Site cam', steps: ['Request in · auto-text sent', 'Walkthrough · price approved', 'Build underway', 'Done · final walkthrough'], sub: ['Customer got a text back in 9 sec', 'Signed from their phone', 'Daily photo updates sent', 'Punch list closed, photos sent'], scenes: [
      [39383713, 'Kitchens', 'cabinet', 'Kitchen remodel', 'Cabinets, counters and lighting, start to finish.', 'Kitchen remodel', 50, 50],
      [4469187, 'Baths', 'bath', 'Bathroom remodel', 'Tile, glass and fixtures, done clean.', 'Bathroom remodel', 50, 50],
      [8832032, 'Flooring', 'floor', 'Flooring install', 'Level, tight seams, trim finished.', 'Flooring', 50, 62],
      [5033522, 'Built-ins', 'hammer', 'Custom built-ins', 'Soft-close drawers and cabinetry built to fit.', 'Custom carpentry', 50, 50]] },
    cleaning: { cam: 'Crew cam', steps: ['Booked · reminder sent', 'Crew arrived', 'Cleaning underway', 'Done · checklist sent'], sub: ['Reminder text went out last night', 'Arrival text sent', 'Room-by-room checklist', 'Photos + checklist sent'], scenes: [
      [5591903, 'Kitchens', 'sparkle', 'Deep clean · kitchen', 'Counters, appliances and floors scrubbed spotless.', 'Deep cleaning', 50, 45],
      [6195111, 'Floors', 'bucket', 'Floors & mopping', 'Every room vacuumed and mopped.', 'House cleaning', 50, 50],
      [31435403, 'Windows', 'window', 'Window cleaning', 'Streak-free glass, inside and out.', 'Window cleaning', 50, 50],
      [28586197, 'Move-out', 'home', 'Move-in / move-out clean', 'Empty-house clean, ready for the walkthrough.', 'Move-out cleaning', 50, 50]] },
    restaurant: { idl: 'Ticket', cam: 'Kitchen', g1: 'Ticket', steps: ['Order in · text confirmed', 'Fired', 'Plated', 'Out to the table'], sub: ['Order confirmed by text', 'On the line now', 'Plated to order', 'Pickup text sent'], scenes: [
      [36430088, 'Kitchen', 'chef', 'From scratch, every plate', 'Our kitchen, live during service.', 'Order online', 50, 40],
      [36430150, 'Specials', 'plate', "Tonight's special", 'Plated to order, hot and fresh.', 'Order online', 50, 50],
      ['34650', 'Dining', 'glass', 'The dining room', 'Reserve a table in two taps.', 'Reserve a table', 50, 50],
      [2337843, 'Catering', 'users', 'Catering trays', 'Parties, offices and events, delivered.', 'Catering', 50, 50]] },
    beauty: { idl: 'Appt', cam: 'Studio', g1: 'In chair', steps: ['Booked · reminder sent', 'Consult', 'In the chair', 'Done · next visit booked'], sub: ['Reminder text went out last night', 'Style notes saved', 'Running on time', 'Next visit booked by text'], scenes: [
      [3356170, 'Cuts', 'hedge', 'Precision cut', 'Consult first, then exactly the cut you asked for.', 'Haircut', 50, 40],
      [13714796, 'Styling', 'comb', 'Blowout & styling', 'Smooth, shiny and photo-ready.', 'Styling', 50, 50],
      [9153970, 'Beards', 'razor', 'Beard trim & shape-up', 'Clean lines, sharp edges.', 'Beard trim', 50, 50],
      [6007400, 'Hot towel', 'sparkle', 'Hot towel shave', 'The classic straight-razor treatment.', 'Shave', 50, 40]] },
    health: { idl: 'Visit', cam: 'Today', g1: 'Visit', steps: ['Booked · reminder sent', 'Checked in', 'With the doctor', 'Done · next visit booked'], sub: ['Reminder text went out', 'Forms done on their phone', 'Running on time', 'Next visit booked by text'], scenes: [
      [8413334, 'Exams', 'steth', 'Checkups & exams', 'Unhurried visits and clear answers.', 'Book a visit', 50, 40],
      [5622270, 'Cleanings', 'tooth', 'Cleanings', 'Gentle care that runs on time.', 'Cleaning', 50, 50],
      [6809658, 'Check-in', 'clip', 'Easy check-in', 'Fill out forms on your phone before you arrive.', 'New patient', 50, 50],
      [4269274, 'Our team', 'users', 'A friendly team', 'Real people who remember you.', 'Book a visit', 50, 40]] },
    fitness: { idl: 'Session', cam: 'Floor', g1: 'Session', steps: ['Booked · reminder sent', 'Warm-up', 'Main set', 'Done · next session booked'], sub: ['Reminder text went out', 'Checked in at the door', 'Coach logging the workout', 'Next session booked by text'], scenes: [
      [33846716, 'Coaching', 'users', 'Small-group coaching', 'Coaches who watch and fix your form.', 'Free class', 50, 50],
      [6455906, '1-on-1', 'heart', 'Personal training', 'A plan built around you.', 'Personal training', 50, 50],
      [37677569, 'Classes', 'run', 'Group classes', 'Every level welcome.', 'Group class', 50, 50],
      [2261481, 'Strength', 'dumbbell', 'Strength floor', 'Racks, plates and room to lift.', 'Membership', 50, 50]] },
    tech: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'Site survey · price approved', 'Install underway', 'Done · tested & documented'], sub: ['Customer got a text back in 9 sec', 'Approved with one tap, no phone tag', 'Live updates going to the customer', 'Network map + photos sent'], scenes: [
      [442150, 'Networks', 'server', 'Network rack clean-up', 'Labeled, tested and documented.', 'Network setup', 50, 50],
      [442151, 'Cabling', 'wifi', 'Cabling & Wi-Fi', 'Cat6 runs and Wi-Fi that reaches every room.', 'Wi-Fi', 50, 50],
      [96612, 'Cameras', 'camera', 'Security cameras', 'HD cameras you can watch from your phone.', 'Security cameras', 50, 40],
      [39600228, 'Smart home', 'home', 'Doorbells & smart home', 'Doorbell cams, locks and alarms tied together.', 'Smart home', 50, 50]] },
    other: { idl: 'Order', cam: 'Shop', g1: 'Open', steps: ['Request in · auto-text sent', 'Confirmed', 'Getting it ready', 'Done · thank-you sent'], sub: ['Customer got a text back in 9 sec', 'Confirmed by text', 'Ready-for-pickup alert queued', 'Thank-you text sent'], scenes: [
      [36729524, "We're open", 'store', 'Open today', 'Stop in, or order ahead and skip the wait.', 'Visit', 50, 40],
      [8475169, 'Our shop', 'tag', 'Our shop', 'Local, owner-run and glad to see you.', 'Visit', 50, 50],
      [36730430, 'Service', 'bag', 'Help in person', 'Ask us anything, we know our stuff.', 'Question', 50, 50],
      [7772165, 'Pick-up', 'users', 'Order & pick up', 'Ready when you get here.', 'Order', 50, 50]] }
  };
  H.photoSets = SETS;

  function url(id, w) {
    id = String(id);
    return id === '34650' ? 'https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=' + w
      : 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + w;
  }
  H.photoUrl = url;

  var CSS = [
    '.pv{position:relative;aspect-ratio:16/11;overflow:hidden;background:radial-gradient(120% 90% at 70% 20%,color-mix(in srgb,var(--a) 45%,#0b1220),#05080c 70%)}',
    '.pv:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:32px 32px}',
    '.pv-ph{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.3s ease;filter:saturate(1.06) contrast(1.05);transform-origin:var(--ox,50%) var(--oy,50%);will-change:transform,opacity}',
    '.pv-ph.on{opacity:1}.pv-ph.kb{animation:pvkb 14s cubic-bezier(.3,.1,.3,1) forwards}',
    '@keyframes pvkb{from{transform:scale(1.02)}to{transform:scale(1.12)}}',
    '.pv-ph.bad{display:none}',
    '.pv-sh{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(3,6,10,.62),rgba(3,6,10,0) 26%,rgba(3,6,10,0) 48%,rgba(3,6,10,.78)),radial-gradient(120% 90% at 50% 50%,transparent 60%,rgba(0,0,0,.45))}',
    '.pv-gr{position:absolute;inset:0;pointer-events:none;opacity:.10;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.85%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")}',
    '.pv-br{position:absolute;inset:12px;pointer-events:none}.pv-br i{position:absolute;width:18px;height:18px;border:2px solid rgba(255,255,255,.55)}',
    '.pv-br i:nth-child(1){left:0;top:0;border-right:0;border-bottom:0}.pv-br i:nth-child(2){right:0;top:0;border-left:0;border-bottom:0}.pv-br i:nth-child(3){left:0;bottom:0;border-right:0;border-top:0}.pv-br i:nth-child(4){right:0;bottom:0;border-left:0;border-top:0}',
    '.pv-hud{position:absolute;left:22px;right:22px;top:20px;display:flex;justify-content:space-between;align-items:center;gap:10px;font:600 .62rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.6)}',
    '.pv-hud span{display:inline-flex;align-items:center;gap:7px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.pv-hud em{font-style:normal;background:#e5322b;color:#fff;border-radius:4px;padding:2px 6px;letter-spacing:.12em;text-shadow:none;flex:none}',
    '.pv-hud em:before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#fff;margin-right:5px;vertical-align:1px;animation:hpu 1.2s infinite}',
    '.pv-clk{font-variant-numeric:tabular-nums;flex:none}',
    '.pv-ts{position:absolute;right:20px;top:48px;width:min(58%,262px);display:grid;gap:7px;pointer-events:none}',
    '.pv-t{display:grid;grid-template-columns:28px 1fr;gap:9px;align-items:center;padding:9px 11px;border-radius:14px;background:rgba(12,18,26,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.14);box-shadow:0 12px 30px -12px rgba(0,0,0,.7);animation:pvin .5s cubic-bezier(.2,.9,.3,1.2) both}',
    '.pv-t.out{animation:pvout .45s ease forwards}',
    '@keyframes pvin{from{opacity:0;transform:translateY(-10px) scale(.96)}}@keyframes pvout{to{opacity:0;transform:translateX(20px)}}',
    '.pv-t i{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:linear-gradient(135deg,var(--a2),var(--a));color:var(--on);font:800 .7rem var(--mono);font-style:normal}',
    '.pv-t small{display:block;font:600 .5rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:#9fb2c0}',
    '.pv-t b{display:block;font-size:.76rem;line-height:1.25;color:#fff}.pv-t span{display:block;font-size:.68rem;line-height:1.3;color:#c7d3dc}',
    '.pv-job{position:absolute;left:18px;bottom:18px;width:min(48%,252px);padding:12px 14px 13px;border-radius:16px;background:rgba(10,15,22,.74);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.15);box-shadow:0 20px 40px -18px rgba(0,0,0,.8)}',
    '.pv-job small{display:flex;justify-content:space-between;gap:8px;font:600 .52rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--a2)}',
    '.pv-job h4{margin:4px 0 2px;font-size:.9rem;line-height:1.2;color:#fff;font-family:inherit;letter-spacing:0}',
    '.pv-job p{margin:0 0 9px;font-size:.7rem;color:#aebdc8}',
    '.pv-steps{list-style:none;margin:0 0 10px;padding:0;display:grid;gap:5px}',
    '.pv-steps li{margin:0;padding:0;background:none;border:0;box-shadow:none;display:grid;grid-template-columns:16px 1fr;gap:8px;align-items:center;font-size:.68rem;color:#7f8f9b;transition:color .3s}',
    '.pv-steps li:before{content:"";width:12px;height:12px;border-radius:50%;border:1.5px solid rgba(255,255,255,.3);box-sizing:border-box;transition:all .3s}',
    '.pv-steps li.pv-n{color:#fff}.pv-steps li.pv-n:before{border-color:var(--a2);border-top-color:transparent;animation:pvspin .8s linear infinite}',
    '.pv-steps li.pv-y{color:#d7e3ea}.pv-steps li.pv-y:before{background:#2fd27a;border-color:#2fd27a;box-shadow:inset 0 0 0 2px rgba(10,15,22,.9)}',
    '@keyframes pvspin{to{transform:rotate(360deg)}}',
    '.pv-bar{height:4px;border-radius:9px;background:rgba(255,255,255,.12);overflow:hidden}.pv-bar i{display:block;height:100%;width:0;border-radius:9px;background:linear-gradient(90deg,var(--a),var(--a2));transition:width .9s ease}',
    '.pv-cap{position:absolute;right:20px;bottom:20px;display:flex;align-items:center;gap:8px;font:600 .58rem var(--mono);letter-spacing:.12em;text-transform:uppercase;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7)}',
    '.pv-dots{display:flex;gap:4px}.pv-dots b{width:16px;height:3px;border-radius:3px;background:rgba(255,255,255,.35);overflow:hidden;position:relative}.pv-dots b.on:after{content:"";position:absolute;inset:0;background:#fff;transform-origin:left;animation:pvdot var(--dur,11s) linear forwards}',
    '.pv-dots b.done{background:#fff}@keyframes pvdot{from{transform:scaleX(0)}}',
    '.pv-own{position:absolute;left:22px;top:44px;font:600 .52rem var(--mono);letter-spacing:.14em;text-transform:uppercase;color:#fff;background:rgba(47,210,122,.25);border:1px solid rgba(47,210,122,.6);border-radius:99px;padding:3px 8px}',
    '@media(max-width:560px){.hcard[data-hero=live] .hstat{display:none}.pv{aspect-ratio:4/4.1}.pv-job{width:auto;right:18px;bottom:46px;padding:10px 12px}.pv-steps li:not(.pv-n){display:none}.pv-steps li.pv-n{display:grid}.pv-steps{margin-bottom:8px}.pv-ts{left:18px;right:18px;width:auto;top:44px}.pv-t:nth-child(n+2){display:none}.pv-cap{left:20px;right:auto;bottom:18px}.pv-hud{left:18px;right:18px;top:16px}}',
    '@media(prefers-reduced-motion:reduce){.pv-ph.kb{animation:none}}'
  ].join('\n');

  H.list.live = {
    css: CSS,
    build: function (ctx) {
      var tr = SETS[ctx.trade] ? ctx.trade : 'other';
      var S = SETS[tr], esc = H.esc, U = ctx.ui || {};
      function u(k, d) { return U[k] || d; }
      /* language override: window.PietsLang[lang].hero[trade] = { cam, idl, g1, steps, sub, scenes: [[label, job, note, pick], ...] } */
      var LH = ctx.lang && ctx.lang !== 'en' && g.PietsLang && g.PietsLang[ctx.lang] && g.PietsLang[ctx.lang].hero && g.PietsLang[ctx.lang].hero[tr];
      if (LH) { var S2 = {}, k; for (k in S) S2[k] = S[k]; ['cam', 'idl', 'g1', 'steps', 'sub'].forEach(function (f) { if (LH[f]) S2[f] = LH[f]; }); S = S2; }
      var scenes = S.scenes.map(function (s, i) { var x = LH && LH.scenes && LH.scenes[i]; return { src: url(s[0], 1280), srcs: url(s[0], 720) + ' 720w, ' + url(s[0], 1280) + ' 1280w', label: x ? x[0] : s[1], icon: s[2], job: x ? x[1] : s[3], note: x ? x[2] : s[4], pick: x ? x[3] : s[5], ox: s[6], oy: s[7] }; });
      var own = Math.min(ctx.photos || 0, 4);
      if (own >= 2) {
        var sv = (ctx.services || []).filter(Boolean);
        scenes = scenes.slice(0, own).map(function (s, i) {
          var name = sv[i] || s.job;
          return { own: i, src: '', srcs: '', label: String(name).split(/[ &\/]/)[0].slice(0, 12), icon: s.icon, job: name, note: u('h_realjob', 'A real job by {biz}.').replace('{biz}', ctx.biz), pick: name, ox: 50, oy: 50 };
        });
      }
      var town = ctx.town || u('local', 'Local');
      var steps = S.steps || SVC;
      var stage = '<div class="pv" role="img" aria-label="' + esc(ctx.biz + ': ' + scenes.map(function (s) { return s.job; }).join(', ')) + '">' +
        scenes.map(function (s, i) {
          return '<img class="pv-ph' + (i === 0 ? ' on kb' : '') + '" alt="" decoding="async"' + (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') +
            (s.src ? ' src="' + esc(s.src) + '" srcset="' + esc(s.srcs) + '" sizes="(max-width:960px) 100vw, 660px"' : '') + ' style="--ox:' + s.ox + '%;--oy:' + s.oy + '%">';
        }).join('') +
        '<div class="pv-gr"></div><div class="pv-sh"></div><div class="pv-br"><i></i><i></i><i></i><i></i></div>' +
        '<div class="pv-hud"><span><em>' + esc(u('h_live', 'Live')) + '</em>' + esc(S.cam + ' · ' + town) + '</span><span class="pv-clk">--:--:--</span></div>' +
        (own >= 2 ? '<div class="pv-own">' + esc(u('h_own', 'Your photos')) + '</div>' : '') +
        '<div class="pv-ts" aria-hidden="true"></div>' +
        '<div class="pv-job"><small><span class="pv-id">' + esc(S.idl || u('h_job', 'Job')) + ' #----</span><span class="pv-tm">00:00</span></small><h4 class="pv-jt">' + esc(scenes[0].job) + '</h4><p class="pv-ad">' + esc(town) + ' · ' + esc(ctx.biz) + '</p>' +
        '<ol class="pv-steps">' + steps.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol><div class="pv-bar"><i></i></div></div>' +
        '<div class="pv-cap"><span class="pv-cl">' + esc(scenes[0].label) + '</span><span class="pv-dots">' + scenes.map(function () { return '<b></b>'; }).join('') + '</span></div>' +
        '</div>';
      return {
        title: u('h_live', 'Live') + ' · ' + ctx.biz.slice(0, 28),
        status: S.cam + ' · ' + town,
        stage: stage,
        gauges: [['tmr', S.g1 || u('h_onsite', 'On site'), '00:00', u('h_gl', 'live')], ['pct', u('h_progress', 'Progress'), '0%', u('h_gj', 'job')], ['nx', u('h_next', 'Next opening'), '--', u('h_gb', 'book')], ['tb', u('h_tb', 'Text-back'), u('h_sec', '9 sec'), u('h_ga', 'auto')]],
        goText: u('h_go', 'Start a request for this'),
        dock: scenes.map(function (s) { return [String(scenes.indexOf(s)), s.label, I[s.icon] || I.wrench]; }),
        dockLabel: u('h_see', 'See the work'),
        dockOn: 0,
        msg: '<b>' + esc(scenes[0].job) + '.</b> ' + esc(scenes[0].note),
        data: { h24: !!(ctx.lang && ctx.lang !== 'en'), tx: { today: u('h_today', 'today'), tmrw: u('h_tmrw', 'tomorrow'), hq: u('h_hq', 'Field HQ · now'), done: u('h_done', 'Done') }, idl: S.idl || u('h_job', 'Job'), sc: scenes.map(function (s) { return { j: s.job, n: s.note, p: s.pick, l: s.label, o: s.own }; }), steps: steps, sub: S.sub || SUB, town: town }
      };
    },
    run: function (root, D, K) {
      var st = root.querySelector('.pv'); if (!st) return;
      var imgs = st.querySelectorAll('.pv-ph'), dots = st.querySelectorAll('.pv-dots b'), lis = st.querySelectorAll('.pv-steps li');
      var bar = st.querySelector('.pv-bar i'), ts = st.querySelector('.pv-ts'), clk = st.querySelector('.pv-clk');
      var jt = st.querySelector('.pv-jt'), cl = st.querySelector('.pv-cl'), idEl = st.querySelector('.pv-id'), tm = st.querySelector('.pv-tm');
      var cur = 0, step = -1, timer = null, secs = 0, paused = 0, STEP = 2300;
      /* client's own photos come from the gallery already on the page (no duplicate data) */
      var gal = document.querySelectorAll('[data-lb] img');
      D.sc.forEach(function (s, i) { if (s.o != null && gal[s.o] && imgs[i]) imgs[i].src = gal[s.o].getAttribute('src'); });
      Array.prototype.forEach.call(imgs, function (im) {
        function bad() { im.classList.add('bad'); }
        im.addEventListener('error', bad);
        im.addEventListener('load', function () { if (im.naturalWidth) im.classList.remove('bad'); });
        if (!im.getAttribute('src')) bad();
        setTimeout(function () { if (im.complete && !im.naturalWidth) bad(); }, 9000);
      });
      function pad(n) { return (n < 10 ? '0' : '') + n; }
      function tick() {
        var d = new Date(); if (clk) clk.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
        secs++; var t = pad(Math.floor(secs / 60)) + ':' + pad(secs % 60); if (tm) tm.textContent = t; K.gauge('tmr', t);
      }
      function nextOpen() {
        var d = new Date(); d.setMinutes(d.getMinutes() + 120); d.setMinutes(d.getMinutes() < 30 ? 30 : 60, 0, 0);
        var h = d.getHours(), day = d.getDate() !== new Date().getDate();
        if (h >= 18 || h < 8) { day = true; h = 8; d.setMinutes(0); }
        K.gauge('nx', D.h24 ? h + ':' + pad(d.getMinutes()) : (h % 12 || 12) + ':' + pad(d.getMinutes()) + (h < 12 ? 'am' : 'pm'));
        var sp = root.querySelector('[data-g="nx"] span'); if (sp) sp.textContent = day ? D.tx.tmrw : D.tx.today;
      }
      function toast(title, sub) {
        if (!ts) return;
        var el = document.createElement('div'); el.className = 'pv-t';
        el.innerHTML = '<i>HQ</i><div><small></small><b></b><span></span></div>'; el.querySelector('small').textContent = D.tx.hq;
        el.querySelector('b').textContent = title; el.querySelector('span').textContent = sub;
        ts.insertBefore(el, ts.firstChild);
        while (ts.children.length > 2) ts.removeChild(ts.lastChild);
        setTimeout(function () { el.classList.add('out'); setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 460); }, 4200);
      }
      function setStep(n) {
        step = n;
        Array.prototype.forEach.call(lis, function (li, i) { li.className = i < n ? 'pv-y' : (i === n ? 'pv-n' : ''); });
        var pct = Math.round(Math.min(n, lis.length) / lis.length * 100);
        if (bar) bar.style.width = pct + '%'; K.gauge('pct', pct + '%');
        if (n < lis.length) { toast(D.steps[n], D.sub[n] || ''); K.status(D.steps[n]); }
        else K.status(D.tx.done + ' · ' + D.sc[cur].l);
      }
      function show(i, user) {
        var prev = imgs[cur];
        if (prev && i !== cur) { prev.classList.remove('on'); setTimeout(function (p) { return function () { if (!p.classList.contains('on')) p.classList.remove('kb'); }; }(prev), 1400); }
        cur = i; var im = imgs[i];
        if (im) { im.classList.remove('kb'); void im.offsetWidth; im.classList.add('on'); if (!K.reduced) im.classList.add('kb'); }
        Array.prototype.forEach.call(dots, function (d, k) { d.className = k < i ? 'done' : ''; });
        if (dots[i]) { void dots[i].offsetWidth; dots[i].style.setProperty('--dur', ((D.steps.length + 1) * STEP / 1000) + 's'); dots[i].className = K.reduced ? 'done' : 'on'; }
        var s = D.sc[i];
        if (jt) jt.textContent = s.j; if (cl) cl.textContent = s.l;
        if (idEl) idEl.textContent = D.idl + ' #' + (4800 + Math.floor(Math.random() * 190));
        secs = 600 + Math.floor(Math.random() * 1500);
        K.press('data-k', String(i));
        K.say('<b>' + s.j.replace(/</g, '&lt;') + '.</b> ' + s.n.replace(/</g, '&lt;'), user ? s.p : null);
        setStep(0); run();
      }
      function run() {
        clearTimeout(timer);
        if (K.reduced) { setStep(D.steps.length); return; }
        timer = setTimeout(function () {
          if (step < D.steps.length) { setStep(step + 1); run(); }
          else if (Date.now() > paused) show((cur + 1) % imgs.length);
          else run();
        }, STEP);
      }
      K.onDock(function (k) { paused = Date.now() + 25000; show(+k, true); });
      /* pause the loop while the hero is off screen */
      var vis = true;
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; if (vis) run(); else clearTimeout(timer); }).observe(root);
      setInterval(function () { if (vis) tick(); }, 1000);
      tick(); nextOpen(); setInterval(nextOpen, 60000);
      show(0, false);
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
