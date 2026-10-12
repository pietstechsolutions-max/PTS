/* Piets Site Studio — "Live job" scene hero (default for every trade).
   Scene plates DRAWN IN CODE (no stock art, no external image request) under a live job overlay:
   crew-cam HUD, running clock, job card with a checklist that ticks, Field HQ notifications,
   slow drift, cross-fades. If the client uploaded work photos, their own photos are used instead.
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
      ['undersink', 'Leak fix', 'wrench', 'Leak under the kitchen sink', 'Shut off, traced and fixed. The price shows up on your phone before we touch a thing.', 'Leak repair', 62, 38],
      ['repipe', 'Re-pipe', 'pipe', 'Old galvanized out, PEX in', 'Whole-house re-pipe with clean, labeled runs and no surprise walls.', 'Re-pipe', 50, 55],
      ['heater', 'Water heater', 'flame', 'Water heater swap', 'Old tank out, new one in, hot water back tonight.', 'Water heater', 32, 42],
      ['boilerroom', 'Boiler', 'thermo', 'Boiler tune-up before winter', 'Cleaned, tested and adjusted so it runs quiet all season.', 'Boiler service', 40, 38]] },
    hvac: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'Diagnosed · price approved', 'Repair underway', 'Done · temps checked'], sub: ['Customer got a text back in 9 sec', 'Approved with one tap, no phone tag', 'Live updates going to the customer', 'Supply air 55°F · photos sent'], scenes: [
      ['ac', 'AC tune-up', 'snow', 'AC tune-up', 'Coils cleaned, refrigerant checked, cold air back the same day.', 'AC repair', 52, 58],
      ['split', 'Mini-split', 'fan', 'Ductless mini-split install', 'Quiet, efficient cooling for the rooms that never get cold.', 'Mini-split install', 58, 34],
      ['heat', 'Heating', 'flame', 'Furnace & boiler service', 'Pump, burner and safeties checked before the first cold night.', 'Heating repair', 52, 46],
      ['rooftop', 'Rooftop', 'gauge', 'Rooftop unit repair', 'Commercial units diagnosed and back online fast.', 'Commercial HVAC', 40, 50]] },
    electrical: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'Tested · price approved', 'Wiring underway', 'Done · inspected & labeled'], sub: ['Customer got a text back in 9 sec', 'Approved with one tap, no phone tag', 'Power off only where needed', 'Panel photo + invoice sent'], scenes: [
      ['panel', 'Panel', 'panel', 'Panel upgrade', 'Old panel out, new breakers labeled and inspected.', 'Panel upgrade', 58, 40],
      ['circuit', 'Troubleshoot', 'gauge', 'Outlet & circuit troubleshooting', 'Find the fault, fix it right, test every circuit.', 'Troubleshooting', 50, 50],
      ['evcharger', 'EV charger', 'plug', 'EV charger install', 'Level 2 charger on its own circuit, charging by tonight.', 'EV charger', 50, 50],
      ['lighting', 'Lighting', 'bulb', 'Lighting install', 'Recessed, pendant and outdoor lighting, done clean.', 'Lighting', 50, 40]] },
    landscaping: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'Crew on site', 'Work underway', 'Done · before / after sent'], sub: ['Customer got a text back in 9 sec', 'Arrival text sent to the customer', 'Live updates going out', 'Before / after photos + invoice sent'], scenes: [
      ['mowing', 'Mowing', 'mower', 'Weekly mowing', 'Cut, edged and blown clean, same day every week.', 'Lawn mowing', 48, 62],
      ['hedges', 'Hedges', 'hedge', 'Hedge trimming', 'Sharp lines, clippings hauled away.', 'Hedge trimming', 60, 22],
      ['patio', 'Patios', 'grid', 'Paver patio install', 'Base compacted, pavers set, joints sanded tight.', 'Patio / hardscape', 50, 58],
      ['beds', 'Curb appeal', 'home', 'Spring clean-up & curb appeal', 'Beds, mulch, edging and a lawn that stripes.', 'Spring clean-up', 50, 62]] },
    auto: { cam: 'Shop cam', steps: ['Call in · tow dispatched', 'Estimate approved', 'In the bay', 'Ready · customer texted'], sub: ['Live ETA texted to the customer', 'Estimate approved from their phone', 'Progress photos sent', 'Pickup text sent'], scenes: [
      ['towing', 'Towing', 'truck', '24/7 towing', 'Flatbed on the way. A live ETA goes straight to your phone.', 'Towing', 46, 58],
      ['paint', 'Paint & body', 'spray', 'Paint & body', 'Body work, color match and a booth-baked finish.', 'Collision repair', 50, 56],
      ['repair', 'Repairs', 'wrench', 'Mechanical repair', 'Diagnose, quote, fix. No surprise charges.', 'Mechanical repair', 44, 40],
      ['inspect', 'Inspection', 'clip', 'Inspection & maintenance', 'Brakes, fluids and safety checks while you wait.', 'Maintenance', 52, 45]] },
    detailing: { cam: 'Bay cam', steps: ['Booked · reminder sent', 'Wash & decon', 'Polish & protect', 'Done · photos sent'], sub: ['Reminder text went out last night', 'Customer gets live progress', 'Gloss readings logged', 'Before / after photos sent'], scenes: [
      ['polish', 'Polish', 'sparkle', 'Paint correction', 'Swirls out, gloss back. Machine polished panel by panel.', 'Paint correction', 50, 50],
      ['ceramic', 'Ceramic', 'drop', 'Ceramic coating', 'Water beads right off for years, not weeks.', 'Ceramic coating', 50, 50],
      ['interior', 'Interior', 'seat', 'Interior detail', 'Vacuumed, steamed and wiped down to like-new.', 'Interior detail', 50, 50],
      ['boat', 'Boats', 'boat', 'Boat detailing', 'Oxidation out, gel coat shining at the dock.', 'Boat detailing', 50, 52]] },
    contractor: { cam: 'Site cam', steps: ['Request in · auto-text sent', 'Walkthrough · price approved', 'Build underway', 'Done · final walkthrough'], sub: ['Customer got a text back in 9 sec', 'Signed from their phone', 'Daily photo updates sent', 'Punch list closed, photos sent'], scenes: [
      ['kitchen', 'Kitchens', 'cabinet', 'Kitchen remodel', 'Cabinets, counters and lighting, start to finish.', 'Kitchen remodel', 50, 50],
      ['bath', 'Baths', 'bath', 'Bathroom remodel', 'Tile, glass and fixtures, done clean.', 'Bathroom remodel', 50, 50],
      ['flooring', 'Flooring', 'floor', 'Flooring install', 'Level, tight seams, trim finished.', 'Flooring', 50, 62],
      ['builtins', 'Built-ins', 'hammer', 'Custom built-ins', 'Soft-close drawers and cabinetry built to fit.', 'Custom carpentry', 50, 50]] },
    cleaning: { cam: 'Crew cam', steps: ['Booked · reminder sent', 'Crew arrived', 'Cleaning underway', 'Done · checklist sent'], sub: ['Reminder text went out last night', 'Arrival text sent', 'Room-by-room checklist', 'Photos + checklist sent'], scenes: [
      ['kitchenwipe', 'Kitchens', 'sparkle', 'Deep clean · kitchen', 'Counters, appliances and floors scrubbed spotless.', 'Deep cleaning', 50, 45],
      ['floorsclean', 'Floors', 'bucket', 'Floors & mopping', 'Every room vacuumed and mopped.', 'House cleaning', 50, 50],
      ['windows', 'Windows', 'window', 'Window cleaning', 'Streak-free glass, inside and out.', 'Window cleaning', 50, 50],
      ['emptyroom', 'Move-out', 'home', 'Move-in / move-out clean', 'Empty-house clean, ready for the walkthrough.', 'Move-out cleaning', 50, 50]] },
    restaurant: { idl: 'Ticket', cam: 'Kitchen', g1: 'Ticket', steps: ['Order in · text confirmed', 'Fired', 'Plated', 'Out to the table'], sub: ['Order confirmed by text', 'On the line now', 'Plated to order', 'Pickup text sent'], scenes: [
      ['cookline', 'Kitchen', 'chef', 'From scratch, every plate', 'Our kitchen, live during service.', 'Order online', 50, 40],
      ['plate', 'Specials', 'plate', "Tonight's special", 'Plated to order, hot and fresh.', 'Order online', 50, 50],
      ['dining', 'Dining', 'glass', 'The dining room', 'Reserve a table in two taps.', 'Reserve a table', 50, 50],
      ['catering', 'Catering', 'users', 'Catering trays', 'Parties, offices and events, delivered.', 'Catering', 50, 50]] },
    beauty: { idl: 'Appt', cam: 'Studio', g1: 'In chair', steps: ['Booked · reminder sent', 'Consult', 'In the chair', 'Done · next visit booked'], sub: ['Reminder text went out last night', 'Style notes saved', 'Running on time', 'Next visit booked by text'], scenes: [
      ['cut', 'Cuts', 'hedge', 'Precision cut', 'Consult first, then exactly the cut you asked for.', 'Haircut', 50, 40],
      ['styling', 'Styling', 'comb', 'Blowout & styling', 'Smooth, shiny and photo-ready.', 'Styling', 50, 50],
      ['beard', 'Beards', 'razor', 'Beard trim & shape-up', 'Clean lines, sharp edges.', 'Beard trim', 50, 50],
      ['shave', 'Hot towel', 'sparkle', 'Hot towel shave', 'The classic straight-razor treatment.', 'Shave', 50, 40]] },
    health: { idl: 'Visit', cam: 'Today', g1: 'Visit', steps: ['Booked · reminder sent', 'Checked in', 'With the doctor', 'Done · next visit booked'], sub: ['Reminder text went out', 'Forms done on their phone', 'Running on time', 'Next visit booked by text'], scenes: [
      ['exam', 'Exams', 'steth', 'Checkups & exams', 'Unhurried visits and clear answers.', 'Book a visit', 50, 40],
      ['dental', 'Cleanings', 'tooth', 'Cleanings', 'Gentle care that runs on time.', 'Cleaning', 50, 50],
      ['checkin', 'Check-in', 'clip', 'Easy check-in', 'Fill out forms on your phone before you arrive.', 'New patient', 50, 50],
      ['team', 'Our team', 'users', 'A friendly team', 'Real people who remember you.', 'Book a visit', 50, 40]] },
    fitness: { idl: 'Session', cam: 'Floor', g1: 'Session', steps: ['Booked · reminder sent', 'Warm-up', 'Main set', 'Done · next session booked'], sub: ['Reminder text went out', 'Checked in at the door', 'Coach logging the workout', 'Next session booked by text'], scenes: [
      ['coaching', 'Coaching', 'users', 'Small-group coaching', 'Coaches who watch and fix your form.', 'Free class', 50, 50],
      ['onetoone', '1-on-1', 'heart', 'Personal training', 'A plan built around you.', 'Personal training', 50, 50],
      ['classes', 'Classes', 'run', 'Group classes', 'Every level welcome.', 'Group class', 50, 50],
      ['strength', 'Strength', 'dumbbell', 'Strength floor', 'Racks, plates and room to lift.', 'Membership', 50, 50]] },
    tech: { cam: 'Crew cam', steps: ['Request in · auto-text sent', 'Site survey · price approved', 'Install underway', 'Done · tested & documented'], sub: ['Customer got a text back in 9 sec', 'Approved with one tap, no phone tag', 'Live updates going to the customer', 'Network map + photos sent'], scenes: [
      ['serverrack', 'Networks', 'server', 'Network rack clean-up', 'Labeled, tested and documented.', 'Network setup', 50, 50],
      ['cabling', 'Cabling', 'wifi', 'Cabling & Wi-Fi', 'Cat6 runs and Wi-Fi that reaches every room.', 'Wi-Fi', 50, 50],
      ['cameras', 'Cameras', 'camera', 'Security Cameras', 'HD cameras you can watch from your phone.', 'Security Cameras', 50, 40],
      ['smarthome', 'Smart Home', 'home', 'Doorbells & smart home', 'Doorbell cams, locks and alarms tied together.', 'Smart Home', 50, 50]] },
    other: { idl: 'Order', cam: 'Shop', g1: 'Open', steps: ['Request in · auto-text sent', 'Confirmed', 'Getting it ready', 'Done · thank-you sent'], sub: ['Customer got a text back in 9 sec', 'Confirmed by text', 'Ready-for-pickup alert queued', 'Thank-you text sent'], scenes: [
      ['openshop', "We're open", 'store', 'Open today', 'Stop in, or order ahead and skip the wait.', 'Visit', 50, 40],
      ['shopfloor', 'Our shop', 'tag', 'Our shop', 'Local, owner-run and glad to see you.', 'Visit', 50, 50],
      ['servicedesk', 'Service', 'bag', 'Help in person', 'Ask us anything, we know our stuff.', 'Question', 50, 50],
      ['pickup', 'Pick-up', 'users', 'Order & pick up', 'Ready when you get here.', 'Order', 50, 50]] }
  };
  H.photoSets = SETS;

  /* ---------- scene plates, drawn in code ----------
     No stock photography and no external image request: every plate is a flat
     SVG built here from five stages and a set of props, tinted with the client's
     own accent so it belongs to their site. A client who uploads their own work
     photos gets those instead (see `own` below). */
  var STAGE = {
    indoor: '<rect width="160" height="110" fill="#3c4a5b"/><rect width="160" height="74" fill="#45556a"/><rect y="74" width="160" height="36" fill="#28323f"/><rect y="73" width="160" height="2" fill="#1a222c"/><rect x="104" y="12" width="44" height="44" fill="#86b4d6" opacity=".62"/><rect x="104" y="12" width="44" height="44" fill="none" stroke="#9fb4c9" stroke-width="1.4"/><path d="M126 12v44M104 34h44" stroke="#9fb4c9" stroke-width="1.1"/><path d="M104 56L148 56L160 110L74 110Z" fill="#ffffff" opacity=".1"/><ellipse cx="112" cy="92" rx="52" ry="14" fill="#ffffff" opacity=".07"/>',
    utility: '<rect width="160" height="110" fill="#1f2834"/><rect y="84" width="160" height="26" fill="#2b3543"/><path d="M0 11h160M0 21h160" stroke="#36414f" stroke-width="4"/><circle cx="34" cy="17" r="20" fill="#ffe9c0" opacity=".07"/><circle cx="34" cy="17" r="12" fill="#ffe9c0" opacity=".1"/><circle cx="34" cy="17" r="5" fill="#ffeeca" opacity=".55"/><ellipse cx="46" cy="88" rx="48" ry="11" fill="#ffe9c0" opacity=".06"/><ellipse cx="80" cy="90" rx="74" ry="9" fill="#000000" opacity=".22"/>',
    outdoor: '<rect width="160" height="110" fill="#17293f"/><rect width="160" height="44" fill="#27486e"/><rect width="160" height="22" fill="#30587f"/><circle cx="126" cy="22" r="24" fill="#ffd9a0" opacity=".08"/><circle cx="126" cy="22" r="11" fill="#ffe3b8" opacity=".3"/><path d="M0 62L160 56L160 110L0 110Z" fill="#28383f"/><path d="M4 62V38L26 23L48 38v24Z" fill="#1b2935"/><rect x="17" y="42" width="11" height="10" fill="#ffd9a0" opacity=".45"/>',
    roof: '<rect width="160" height="110" fill="#1b3050"/><rect width="160" height="50" fill="#2a4e76"/><rect width="160" height="24" fill="#345a85"/><circle cx="30" cy="18" r="16" fill="#ffd9a0" opacity=".1"/><rect y="58" width="160" height="52" fill="#49505b"/><rect y="54" width="160" height="6" fill="#5b636e"/><path d="M0 74h160M0 92h160" stroke="#555d68" stroke-width="1.5"/><ellipse cx="70" cy="90" rx="66" ry="14" fill="#ffffff" opacity=".05"/>',
    bay: '<rect width="160" height="110" fill="#1b2634"/><rect x="84" y="6" width="74" height="68" fill="#27333f"/><path d="M84 16h74M84 26h74M84 36h74M84 46h74M84 56h74M84 66h74" stroke="#38475a" stroke-width="1.4"/><rect y="74" width="160" height="36" fill="#232d39"/><rect x="12" y="4" width="56" height="4" rx="2" fill="#eaf4ff" opacity=".7"/><path d="M12 8L0 74h92L68 8Z" fill="#eaf4ff" opacity=".055"/><rect x="10" y="76" width="60" height="32" fill="#eaf4ff" opacity=".055"/>',
    retail: '<rect width="160" height="110" fill="#242b36"/><rect y="78" width="160" height="32" fill="#3b3020"/><path d="M0 85h160M0 93h160M0 101h160" stroke="#2d2418" stroke-width="1.2"/><g><path d="M34 0v15M80 0v15M126 0v15" stroke="#49535f" stroke-width="1.3"/><circle cx="34" cy="18" r="4" fill="#ffe9c4"/><circle cx="80" cy="18" r="4" fill="#ffe9c4"/><circle cx="126" cy="18" r="4" fill="#ffe9c4"/><circle cx="34" cy="18" r="16" fill="#ffe3b0" opacity=".12"/><circle cx="80" cy="18" r="16" fill="#ffe3b0" opacity=".12"/><circle cx="126" cy="18" r="16" fill="#ffe3b0" opacity=".12"/><path d="M34 18L16 80h36Z" fill="#ffe3b0" opacity=".06"/><path d="M80 18L62 80h36Z" fill="#ffe3b0" opacity=".06"/><path d="M126 18L108 80h36Z" fill="#ffe3b0" opacity=".06"/></g>'
  };
  var PROP = {
    cab: '<rect x="4" y="52" width="68" height="24" fill="#3d4a5a"/><rect x="2" y="48" width="72" height="5" fill="#8d9aa8"/><path d="M27 53v23M50 53v23" stroke="#2b3542" stroke-width="1.4"/>',
    cabU: '<rect x="4" y="12" width="62" height="22" fill="#44525f"/><path d="M25 12v22M46 12v22" stroke="#2b3542" stroke-width="1.4"/>',
    trap: '<g stroke="#9fb0bf" stroke-width="3" fill="none"><path d="M30 55v9a6 6 0 0 0 12 0v-7"/><path d="M42 57h16"/></g><circle cx="36" cy="71" r="2.4" fill="#8fd9ef"/>',
    pipes: '<g stroke="#8a9bab" stroke-width="4" fill="none" opacity=".92"><path d="M0 34h56a8 8 0 0 1 8 8v26"/><path d="M0 46h36a8 8 0 0 1 8 8v24"/><path d="M98 28v42h58"/></g><g fill="#5f6d7b"><rect x="60" y="30" width="6" height="8"/><rect x="94" y="48" width="8" height="6"/></g>',
    tank: '<rect x="96" y="26" width="34" height="56" rx="6" fill="#59656f"/><rect x="96" y="26" width="34" height="8" rx="4" fill="#6e7a84"/><path d="M104 26v-9h18v9" stroke="#8a9bab" stroke-width="3" fill="none"/><rect x="104" y="48" width="18" height="10" fill="#2b3542"/>',
    boiler: '<rect x="40" y="30" width="48" height="48" rx="4" fill="#4a5560"/><rect x="48" y="38" width="32" height="15" fill="#2b3542"/><circle cx="64" cy="65" r="5" fill="#ff9d4a" opacity=".6"/><path d="M50 30V18M78 30V18" stroke="#8a9bab" stroke-width="3"/>',
    condenser: '<rect x="14" y="54" width="44" height="34" rx="3" fill="#5a6670"/><circle cx="36" cy="69" r="12" fill="#333d47"/><path d="M28 69h16M36 61v16" stroke="#8a9bab" stroke-width="2"/><rect x="14" y="54" width="44" height="4" fill="#6e7a84"/>',
    head: '<rect x="94" y="16" width="50" height="16" rx="4" fill="#e6edf3"/><path d="M96 32h46" stroke="#b8c4ce" stroke-width="2"/><path d="M104 36l-4 9M118 36l-4 9M132 36l-4 9" stroke="#bfe6f5" stroke-width="2" opacity=".55"/>',
    furnace: '<rect x="44" y="26" width="46" height="52" fill="#4f5a64"/><rect x="52" y="34" width="30" height="18" fill="#2b3542"/><path d="M52 60h30" stroke="#8a9bab" stroke-width="2"/><rect x="56" y="17" width="22" height="9" fill="#6e7a84"/>',
    rtu: '<rect x="38" y="36" width="64" height="30" rx="2" fill="#6b737c"/><rect x="38" y="32" width="64" height="5" fill="#808892"/><circle cx="58" cy="51" r="9" fill="#434b54"/><path d="M50 51h16" stroke="#9aa3ac" stroke-width="2"/><rect x="82" y="42" width="15" height="19" fill="#525a63"/>',
    panel: '<rect x="48" y="16" width="44" height="60" fill="#3c4650"/><rect x="52" y="20" width="36" height="52" fill="#222a33"/><g fill="#cfd8e0"><rect x="55" y="24" width="14" height="4"/><rect x="71" y="24" width="14" height="4"/><rect x="55" y="32" width="14" height="4"/><rect x="71" y="32" width="14" height="4"/><rect x="55" y="40" width="14" height="4"/><rect x="71" y="40" width="14" height="4"/><rect x="55" y="48" width="14" height="4"/><rect x="71" y="48" width="14" height="4"/><rect x="55" y="56" width="14" height="4"/><rect x="71" y="56" width="14" height="4"/></g><path d="M92 18l13-6v66l-13-6Z" fill="#333c46"/>',
    outletwall: '<rect x="28" y="40" width="15" height="21" rx="2" fill="#e8eef3"/><circle cx="35" cy="46" r="1.7" fill="#3b4652"/><circle cx="35" cy="55" r="1.7" fill="#3b4652"/><path d="M98 18v42h20" stroke="#8a9bab" stroke-width="3" fill="none"/><rect x="112" y="52" width="17" height="17" rx="2" fill="#dfe7ee"/><circle cx="120" cy="60" r="2" fill="#3b4652"/>',
    ev: '<rect x="16" y="26" width="27" height="37" rx="5" fill="#e9eff4"/><rect x="21" y="32" width="17" height="13" rx="2" fill="#2b3542"/><path d="M29 63q-5 19 14 21h18" stroke="#2b3542" stroke-width="3.5" fill="none"/><circle cx="29" cy="52" r="3" fill="#5ce0b0"/>',
    cans: '<circle cx="34" cy="7" r="6" fill="#ffe9c0"/><path d="M34 7L18 50h32Z" fill="#ffe9c0" opacity=".13"/><circle cx="82" cy="7" r="6" fill="#ffe9c0"/><path d="M82 7L66 50h32Z" fill="#ffe9c0" opacity=".13"/>',
    lawn: '<path d="M0 110V68L160 62v48Z" fill="#2f5e3a"/><g fill="#3b7347" opacity=".85"><path d="M0 110V68l20-1-5 43Z"/><path d="M40 110l5-44 20-1-9 45Z"/><path d="M96 110l9-46 20-1-13 47Z"/></g>',
    hedge: '<rect y="52" width="160" height="24" rx="6" fill="#27502f"/><g fill="#2f6038" opacity=".85"><circle cx="20" cy="54" r="10"/><circle cx="50" cy="51" r="11"/><circle cx="84" cy="54" r="10"/><circle cx="118" cy="51" r="11"/><circle cx="148" cy="55" r="10"/></g>',
    pavers: '<path d="M0 110V72l160-6v44Z" fill="#6b6a66"/><g stroke="#56554f" stroke-width="1.2"><path d="M0 84h160M0 96h160M20 70v40M50 69v41M80 68v42M110 67v43M140 66v44"/></g>',
    beds: '<path d="M0 110V76l160-6v40Z" fill="#4a3426"/><g fill="#2f6038"><circle cx="26" cy="73" r="9"/><circle cx="62" cy="71" r="7"/><circle cx="104" cy="73" r="8"/><circle cx="138" cy="71" r="6"/></g>',
    truck: '<rect x="16" y="50" width="56" height="10" fill="#8d2f2a"/><rect x="72" y="38" width="31" height="22" rx="3" fill="#a8372f"/><rect x="78" y="43" width="19" height="10" fill="#9fc2d8" opacity=".75"/><rect x="16" y="46" width="60" height="4" fill="#b8bfc6"/><circle cx="34" cy="64" r="7" fill="#1a1f26"/><circle cx="92" cy="64" r="7" fill="#1a1f26"/>',
    booth: '<rect x="8" y="10" width="144" height="8" fill="#dceaf7" opacity=".5"/><rect x="26" y="46" width="94" height="22" rx="8" fill="#6f7b86"/><rect x="40" y="37" width="56" height="12" rx="5" fill="#7d8992"/><rect x="34" y="40" width="20" height="8" rx="3" fill="#e8eef3" opacity=".5"/><path d="M26 46h94" stroke="#aab4bd" stroke-width="1.5"/>',
    lift: '<rect x="28" y="28" width="6" height="54" fill="#c9962c"/><rect x="120" y="28" width="6" height="54" fill="#c9962c"/><rect x="34" y="44" width="86" height="6" fill="#b8882a"/><rect x="42" y="26" width="70" height="15" rx="5" fill="#49616f"/><rect x="56" y="17" width="41" height="10" rx="4" fill="#5a7382"/><circle cx="56" cy="43" r="5" fill="#1a1f26"/><circle cx="102" cy="43" r="5" fill="#1a1f26"/>',
    car: '<rect x="32" y="52" width="92" height="16" rx="7" fill="#3f566a"/><rect x="50" y="41" width="50" height="13" rx="5" fill="#4d697f"/><rect x="56" y="44" width="38" height="8" fill="#9fc2d8" opacity=".6"/><circle cx="52" cy="69" r="8" fill="#15191f"/><circle cx="106" cy="69" r="8" fill="#15191f"/>',
    carclose: '<path d="M-10 88Q80 20 170 88v22H-10Z" fill="#2c4a63"/><path d="M-10 88Q80 20 170 88" stroke="#7fb6d8" stroke-width="2" opacity=".5" fill="none"/><ellipse cx="68" cy="56" rx="26" ry="10" fill="#ffffff" opacity=".18"/><circle cx="120" cy="60" r="15" fill="#ffffff" opacity=".07"/>',
    beads: '<g fill="#bfe6f5" opacity=".6"><circle cx="38" cy="46" r="2.2"/><circle cx="50" cy="40" r="1.6"/><circle cx="60" cy="48" r="2.6"/><circle cx="72" cy="41" r="1.8"/><circle cx="84" cy="47" r="2.2"/><circle cx="96" cy="42" r="1.6"/><circle cx="106" cy="49" r="2.4"/><circle cx="44" cy="54" r="1.5"/><circle cx="78" cy="55" r="1.8"/><circle cx="114" cy="43" r="1.5"/></g>',
    seats: '<path d="M18 92L28 44h46l-4 48Z" fill="#3a3a42"/><path d="M78 92l6-52h46l-2 52Z" fill="#43434c"/><rect y="52" width="16" height="40" fill="#2e2e36"/><path d="M30 60h38M84 56h40" stroke="#55555f" stroke-width="2"/>',
    boat: '<path d="M30 54h90l-16 20H46Z" fill="#e6edf3"/><rect x="60" y="42" width="27" height="12" rx="3" fill="#cfd8e0"/><rect x="26" y="74" width="98" height="5" fill="#3a4450"/><circle cx="52" cy="83" r="5" fill="#1a1f26"/><circle cx="102" cy="83" r="5" fill="#1a1f26"/>',
    tub: '<rect x="14" y="52" width="88" height="26" rx="8" fill="#eef3f7"/><rect x="14" y="78" width="88" height="6" fill="#d3dbe2"/><path d="M106 38v16" stroke="#b8c4ce" stroke-width="3"/><g stroke="#4b5a68" stroke-width="1" opacity=".45"><path d="M0 14h104M0 26h104M0 38h104M18 10v38M44 10v38M70 10v38M96 10v38"/></g>',
    planks: '<path d="M0 110V74l160-6v42Z" fill="#8a5f36"/><g stroke="#6e4a28" stroke-width="1.2"><path d="M0 84h160M0 94h160M0 103h160M44 72v38M100 70v40"/></g><rect x="96" y="58" width="56" height="9" fill="#9c6c3d"/>',
    shelf: '<rect x="10" y="14" width="58" height="62" fill="#46525e"/><path d="M10 31h58M10 47h58M10 62h58" stroke="#2b3542" stroke-width="2"/><g fill="#8d9aa8" opacity=".7"><rect x="16" y="19" width="6" height="11"/><rect x="26" y="21" width="5" height="9"/><rect x="38" y="35" width="7" height="11"/><rect x="50" y="52" width="6" height="9"/></g>',
    bucket: '<path d="M106 60h26l-4 22h-18Z" fill="#3e76a8"/><rect x="104" y="56" width="30" height="5" rx="2" fill="#4d87bb"/><path d="M96 18v58" stroke="#9aa3ac" stroke-width="3"/><path d="M87 76h18l-3 9H90Z" fill="#c9d4dd"/>',
    squeegee: '<rect x="94" y="12" width="54" height="48" fill="#9fc8e0" opacity=".42"/><rect x="94" y="12" width="54" height="48" fill="none" stroke="#7b8ea1" stroke-width="1.6"/><path d="M98 32l46-9" stroke="#ffffff" stroke-width="5" opacity=".45"/><rect x="90" y="25" width="8" height="19" rx="2" fill="#2f3b47"/>',
    line: '<rect x="6" y="10" width="122" height="16" rx="3" fill="#7c868f"/><rect x="6" y="26" width="122" height="4" fill="#5c666f"/><rect x="6" y="52" width="122" height="24" fill="#9aa3ac"/><g fill="#1f262e"><circle cx="32" cy="56" r="4"/><circle cx="54" cy="56" r="4"/><circle cx="76" cy="56" r="4"/></g><g fill="#ff9d4a" opacity=".45"><circle cx="32" cy="56" r="8"/><circle cx="76" cy="56" r="8"/></g>',
    dish: '<ellipse cx="80" cy="74" rx="44" ry="15" fill="#f2f5f8"/><ellipse cx="80" cy="72" rx="29" ry="9" fill="#e4e9ee"/><ellipse cx="73" cy="70" rx="14" ry="6" fill="#8a5a3a"/><ellipse cx="92" cy="72" rx="8" ry="4" fill="#3f6b3c"/>',
    tables: '<g fill="#5b4530"><ellipse cx="40" cy="78" rx="25" ry="8"/><ellipse cx="118" cy="73" rx="22" ry="7"/></g><g fill="#3a4450"><rect x="12" y="58" width="8" height="26" rx="3"/><rect x="60" y="56" width="8" height="26" rx="3"/><rect x="92" y="54" width="7" height="23" rx="3"/><rect x="136" y="54" width="7" height="23" rx="3"/></g>',
    trays: '<g fill="#aeb8c1"><rect x="14" y="62" width="40" height="14" rx="2"/><rect x="60" y="62" width="40" height="14" rx="2"/><rect x="106" y="62" width="40" height="14" rx="2"/></g><g fill="#b0762f"><rect x="18" y="64" width="32" height="8"/><rect x="64" y="64" width="32" height="8"/><rect x="110" y="64" width="32" height="8"/></g><rect x="6" y="76" width="148" height="5" fill="#4b5663"/>',
    mirror: '<rect x="16" y="12" width="42" height="46" rx="4" fill="#9fc8e0" opacity=".42"/><rect x="16" y="12" width="42" height="46" rx="4" fill="none" stroke="#c8d3dc" stroke-width="1.6"/><rect x="12" y="58" width="50" height="5" fill="#b9c3cc"/><rect x="26" y="66" width="23" height="11" rx="4" fill="#2f3b47"/><rect x="34" y="77" width="6" height="14" fill="#3b4652"/><rect x="28" y="91" width="19" height="4" rx="2" fill="#3b4652"/>',
    barberchair: '<rect x="54" y="44" width="42" height="17" rx="6" fill="#4a2f28"/><rect x="58" y="23" width="32" height="23" rx="6" fill="#55372e"/><rect x="71" y="61" width="8" height="20" fill="#9aa3ac"/><rect x="60" y="81" width="30" height="5" rx="2" fill="#9aa3ac"/>',
    exambed: '<rect x="22" y="54" width="88" height="14" rx="4" fill="#dfe7ee"/><rect x="22" y="47" width="35" height="8" rx="4" fill="#e9eff4"/><rect x="28" y="68" width="6" height="19" fill="#9aa3ac"/><rect x="98" y="68" width="6" height="19" fill="#9aa3ac"/><rect x="120" y="26" width="28" height="21" rx="3" fill="#2b3542"/><path d="M124 39l6-9 5 7 4-5" stroke="#5ce0b0" stroke-width="1.6" fill="none"/>',
    dentalchair: '<rect x="28" y="56" width="74" height="15" rx="6" fill="#cfe0ea"/><rect x="92" y="37" width="23" height="20" rx="6" fill="#d9e6ef"/><rect x="58" y="71" width="8" height="18" fill="#9aa3ac"/><circle cx="46" cy="23" r="10" fill="#f3f7fa"/><path d="M46 33v11" stroke="#9aa3ac" stroke-width="3"/><circle cx="46" cy="23" r="19" fill="#ffffff" opacity=".12"/>',
    desk: '<rect x="18" y="52" width="124" height="30" fill="#6b5338"/><rect x="14" y="45" width="132" height="8" rx="2" fill="#86693f"/><rect x="100" y="28" width="27" height="17" rx="2" fill="#2b3542"/><rect x="34" y="33" width="35" height="12" rx="3" fill="#3b4652"/>',
    racks: '<g stroke="#b53d33" stroke-width="5" fill="none"><path d="M18 22v58M50 22v58M18 33h32M96 22v58M128 22v58M96 33h32"/></g><g fill="#1f262e"><circle cx="22" cy="46" r="7"/><circle cx="46" cy="46" r="7"/><circle cx="100" cy="50" r="6"/><circle cx="124" cy="50" r="6"/></g>',
    dumb: '<rect x="22" y="52" width="114" height="6" fill="#3b4652"/><rect x="22" y="70" width="114" height="6" fill="#3b4652"/><g fill="#272e37"><rect x="30" y="42" width="25" height="9" rx="4"/><rect x="64" y="42" width="25" height="9" rx="4"/><rect x="98" y="42" width="25" height="9" rx="4"/><rect x="30" y="60" width="25" height="9" rx="4"/><rect x="64" y="60" width="25" height="9" rx="4"/><rect x="98" y="60" width="25" height="9" rx="4"/></g>',
    mats: '<path d="M0 110V70l160-6v46Z" fill="#2b3a44"/><g stroke="#394b57" stroke-width="1.4"><path d="M0 84h160M0 97h160M54 68v42M108 66v44"/></g><g fill="#4c5a66"><rect x="18" y="74" width="36" height="10" rx="4"/><rect x="72" y="82" width="36" height="10" rx="4"/></g>',
    rack: '<rect x="44" y="10" width="58" height="80" fill="#20272f"/><rect x="48" y="14" width="50" height="72" fill="#161c23"/><g fill="#2c3540"><rect x="50" y="16" width="46" height="8"/><rect x="50" y="26" width="46" height="8"/><rect x="50" y="36" width="46" height="8"/><rect x="50" y="46" width="46" height="8"/><rect x="50" y="56" width="46" height="8"/><rect x="50" y="66" width="46" height="8"/><rect x="50" y="76" width="46" height="8"/></g><g fill="#5ce0b0"><rect x="90" y="19" width="3" height="2"/><rect x="90" y="29" width="3" height="2"/><rect x="90" y="39" width="3" height="2"/><rect x="90" y="59" width="3" height="2"/><rect x="90" y="79" width="3" height="2"/></g><g fill="#8fd9ef" opacity=".8"><rect x="54" y="48" width="2" height="2"/><rect x="60" y="48" width="2" height="2"/><rect x="66" y="48" width="2" height="2"/><rect x="72" y="48" width="2" height="2"/></g>',
    tray: '<rect y="22" width="160" height="6" fill="#5b6672"/><g stroke="#2f7fbf" stroke-width="2.5" fill="none" opacity=".9"><path d="M0 28q40 11 80 8t80-4"/><path d="M0 33q40 12 80 10t80-3"/></g><g stroke="#cfd8e0" stroke-width="1.5"><path d="M20 28v11M60 28v11M104 28v11M140 28v11"/></g>',
    dome: '<rect x="58" y="4" width="42" height="5" fill="#44525f"/><circle cx="79" cy="15" r="9" fill="#e6edf3"/><circle cx="79" cy="17" r="4" fill="#1f262e"/><path d="M79 24L18 100h122Z" fill="#bfe6f5" opacity=".13"/>',
    hub: '<rect x="94" y="24" width="36" height="48" rx="5" fill="#1f262e"/><rect x="98" y="28" width="28" height="31" rx="2" fill="#2f7fbf" opacity=".45"/><g fill="#cfd8e0"><rect x="102" y="32" width="19" height="3"/><rect x="102" y="38" width="13" height="3"/><rect x="102" y="44" width="16" height="3"/></g><circle cx="112" cy="65" r="3" fill="#5ce0b0"/><rect x="26" y="38" width="13" height="23" rx="5" fill="#3b4652"/><circle cx="32" cy="45" r="3" fill="#bfe6f5"/>',
    storefront: '<rect x="14" y="30" width="132" height="36" fill="#1b2a38"/><path d="M10 30h140l-6-13H16Z" fill="#8d2f2a"/><g fill="#ffd9a0" opacity=".33"><rect x="24" y="38" width="36" height="24"/><rect x="100" y="38" width="36" height="24"/></g><rect x="70" y="36" width="23" height="30" fill="#2f3b47"/><rect x="24" y="23" width="112" height="3" fill="#b8bfc6" opacity=".5"/>',
    shelves: '<rect x="8" y="18" width="60" height="60" fill="#3c4650"/><path d="M8 35h60M8 51h60M8 65h60" stroke="#28313b" stroke-width="2"/><rect x="94" y="18" width="58" height="60" fill="#3c4650"/><path d="M94 35h58M94 51h58M94 65h58" stroke="#28313b" stroke-width="2"/><g fill="#8d9aa8" opacity=".75"><rect x="14" y="24" width="10" height="10"/><rect x="28" y="26" width="8" height="8"/><rect x="44" y="40" width="10" height="10"/><rect x="100" y="24" width="9" height="10"/><rect x="118" y="40" width="10" height="10"/><rect x="134" y="54" width="9" height="10"/></g>',
    counter: '<rect x="22" y="56" width="116" height="28" fill="#5b4530"/><rect x="18" y="49" width="124" height="7" rx="2" fill="#7a5c3c"/><rect x="92" y="31" width="29" height="19" rx="3" fill="#2b3542"/><rect x="96" y="35" width="21" height="11" fill="#5ce0b0" opacity=".4"/><rect x="38" y="39" width="23" height="11" rx="3" fill="#3b4652"/>',
    boxes: '<rect x="14" y="28" width="132" height="54" fill="#3c4650"/><path d="M14 56h132" stroke="#28313b" stroke-width="2"/><g fill="#b0762f"><rect x="22" y="34" width="27" height="19"/><rect x="56" y="32" width="31" height="21"/><rect x="95" y="36" width="25" height="17"/><rect x="28" y="60" width="29" height="19"/><rect x="70" y="62" width="27" height="17"/><rect x="108" y="59" width="30" height="20"/></g>'
  };
  var ART = {
    undersink: ['indoor', 'cab', 'cabU', 'trap'],
    repipe: ['utility', 'pipes'],
    heater: ['utility', 'tank'],
    boilerroom: ['utility', 'boiler'],
    ac: ['outdoor', 'condenser'],
    split: ['indoor', 'head'],
    heat: ['utility', 'furnace'],
    rooftop: ['roof', 'rtu'],
    panel: ['utility', 'panel'],
    circuit: ['indoor', 'outletwall'],
    evcharger: ['bay', 'ev'],
    lighting: ['indoor', 'cans'],
    mowing: ['outdoor', 'lawn'],
    hedges: ['outdoor', 'hedge'],
    patio: ['outdoor', 'pavers'],
    beds: ['outdoor', 'beds'],
    towing: ['outdoor', 'truck'],
    paint: ['bay', 'booth'],
    repair: ['bay', 'lift'],
    inspect: ['bay', 'car'],
    polish: ['bay', 'carclose'],
    ceramic: ['bay', 'car', 'beads'],
    interior: ['bay', 'seats'],
    boat: ['outdoor', 'boat'],
    kitchen: ['indoor', 'cab', 'cabU'],
    bath: ['indoor', 'tub'],
    flooring: ['indoor', 'planks'],
    builtins: ['indoor', 'shelf'],
    kitchenwipe: ['indoor', 'cab', 'bucket'],
    floorsclean: ['indoor', 'bucket'],
    windows: ['indoor', 'squeegee'],
    emptyroom: ['indoor', 'cans', 'planks'],
    cookline: ['indoor', 'line'],
    plate: ['retail', 'dish'],
    dining: ['retail', 'tables'],
    catering: ['retail', 'trays'],
    cut: ['retail', 'mirror'],
    styling: ['retail', 'mirror', 'mirror|66|0'],
    beard: ['retail', 'barberchair'],
    shave: ['indoor', 'barberchair'],
    exam: ['indoor', 'exambed'],
    dental: ['indoor', 'dentalchair'],
    checkin: ['retail', 'desk'],
    team: ['indoor', 'desk'],
    coaching: ['retail', 'racks'],
    onetoone: ['indoor', 'dumb'],
    classes: ['retail', 'mats'],
    strength: ['retail', 'dumb'],
    serverrack: ['utility', 'rack'],
    cabling: ['utility', 'tray'],
    cameras: ['outdoor', 'dome'],
    smarthome: ['indoor', 'hub'],
    openshop: ['outdoor', 'storefront'],
    shopfloor: ['retail', 'shelves'],
    servicedesk: ['retail', 'counter'],
    pickup: ['retail', 'boxes']
  };

  /* art(kind) -> one self-contained SVG scene plate. No ids, so four plates can
     sit in one document without colliding. */
  function art(kind) {
    var d = ART[kind] || ART.emptyroom, i, p, bits = STAGE[d[0]] || STAGE.indoor;
    for (i = 1; i < d.length; i++) {
      p = d[i].split('|');
      bits += p.length > 1
        ? '<g transform="translate(' + (+p[1] || 0) + ',' + (+p[2] || 0) + ')">' + (PROP[p[0]] || '') + '</g>'
        : (PROP[p[0]] || '');
    }
    return '<svg viewBox="0 0 160 110" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + bits +
      '<circle cx="138" cy="14" r="60" fill="var(--a)" opacity=".1"/>' +
      '<circle cx="138" cy="14" r="34" fill="var(--a2)" opacity=".08"/>' +
      '<rect width="160" height="110" fill="var(--a)" opacity=".07"/></svg>';
  }
  H.photoArt = art;

  var CSS = [
    '.pv{position:relative;aspect-ratio:16/11;overflow:hidden;background:radial-gradient(120% 90% at 70% 20%,color-mix(in srgb,var(--a) 45%,#0b1220),#05080c 70%)}',
    '.pv:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:32px 32px}',
    '.pv-ph{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.3s ease;filter:saturate(1.06) contrast(1.05);transform-origin:var(--ox,50%) var(--oy,50%);will-change:transform,opacity}',
    '.pv-ph.on{opacity:1}.pv-ph.kb{animation:pvkb 14s cubic-bezier(.3,.1,.3,1) forwards}',
    '@keyframes pvkb{from{transform:scale(1.02)}to{transform:scale(1.12)}}',
    '.pv-ph.bad{display:none}',
    '.pv-art{display:block;background:#05080c}.pv-art svg{display:block;width:100%;height:100%}',
    '.pv-sh{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(3,6,10,.5),rgba(3,6,10,0) 24%,rgba(3,6,10,0) 54%,rgba(3,6,10,.58)),radial-gradient(120% 90% at 50% 50%,transparent 62%,rgba(0,0,0,.34))}',
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
    '.pv-job h4{margin:4px 0 2px;font-size:.9rem;line-height:1.2;color:#fff;font-family:inherit;font-weight:700;letter-spacing:0}',
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
      var scenes = S.scenes.map(function (s, i) { var x = LH && LH.scenes && LH.scenes[i]; return { art: art(s[0]), label: x ? x[0] : s[1], icon: s[2], job: x ? x[1] : s[3], note: x ? x[2] : s[4], pick: x ? x[3] : s[5], ox: s[6], oy: s[7] }; });
      var own = Math.min(ctx.photos || 0, 4);
      if (own >= 2) {
        var sv = (ctx.services || []).filter(Boolean);
        scenes = scenes.slice(0, own).map(function (s, i) {
          var name = sv[i] || s.job;
          return { own: i, art: '', label: String(name).split(/[ &\/]/)[0].slice(0, 12), icon: s.icon, job: name, note: u('h_realjob', 'A real job by {biz}.').replace('{biz}', ctx.biz), pick: name, ox: 50, oy: 50 };
        });
      }
      var town = ctx.town || u('local', 'Local');
      var steps = S.steps || SVC;
      var stage = '<div class="pv" role="img" aria-label="' + esc(ctx.biz + ': ' + scenes.map(function (s) { return s.job; }).join(', ')) + '">' +
        scenes.map(function (s, i) {
          var on = i === 0 ? ' on kb' : '', pos = ' style="--ox:' + s.ox + '%;--oy:' + s.oy + '%"';
          /* the client's own uploaded photo: a real <img>, filled in by run() from the gallery */
          if (s.own != null) return '<img class="pv-ph' + on + '" alt="" decoding="async"' + (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + pos + '>';
          /* otherwise a scene plate drawn in code — nothing is requested from the network */
          return '<div class="pv-ph pv-art' + on + '"' + pos + '>' + s.art + '</div>';
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
      D.sc.forEach(function (s, i) { if (s.o != null && gal[s.o] && imgs[i] && imgs[i].tagName === 'IMG') imgs[i].src = gal[s.o].getAttribute('src'); });
      Array.prototype.forEach.call(imgs, function (im) {
        if (im.tagName !== 'IMG') return; /* code-drawn plates have nothing to load */
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
