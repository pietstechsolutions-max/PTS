/* Piets Site Studio — trade library (the "playbook" content).
   Piets Technology Solutions Inc · 631-871-5957 · pietstechsolutions.com
   Each trade carries: scene, default color, fonts, services, quick-pick problems, process, FAQ.
   Copy here is the no-AI fallback. It never invents licenses, awards, years or review counts. */
(function (g) {
  'use strict';
  var T = {};

  T.plumbing = {
    label: 'Plumbing', icon: 'drop', scene: 'pipes', color: '#1e88e5', fonts: 'industrial', emergency: true,
    noun: 'plumber', job: 'plumbing job',
    hero: ['Leaks, drains and no hot water,', 'fixed right'],
    services: [
      ['Emergency plumbing', 'Burst pipe or flooding? Call any time and we head your way.'],
      ['Drain cleaning', 'Kitchen, bath and main lines cleared and checked so it stays clear.'],
      ['Water heaters', 'Repair or replace tank and tankless heaters, same-week installs.'],
      ['Leak detection & repair', 'Find the source fast and fix it without tearing up the house.'],
      ['Boilers & heating', 'Boiler service, repairs and replacements before the cold hits.'],
      ['Fixtures & remodels', 'Sinks, toilets, showers and full bathroom rough-ins.']
    ],
    picks: ['Leak', 'Clogged drain', 'No hot water', 'Burst pipe', 'Running toilet', 'Boiler issue'],
    faq: [
      ['Do you handle emergencies?', 'Yes. Call or text and tell us what is happening. If water is running, shut the main valve first.'],
      ['How much does a service call cost?', 'We give you the price before any work starts, so there are no surprises.'],
      ['Can you replace my water heater the same day?', 'Often, yes. It depends on the model and parts on hand. Ask when you call.']
    ]
  };
  T.hvac = {
    label: 'HVAC / Heating & Cooling', icon: 'fan', scene: 'hvac', color: '#0ea5a4', fonts: 'industrial', emergency: true,
    noun: 'HVAC tech', job: 'heating or cooling job',
    hero: ['Comfortable all year,', 'heat and AC done right'],
    services: [
      ['AC repair', 'Warm air, strange noises or no cooling — diagnosed and fixed fast.'],
      ['Heating repair', 'Furnaces, boilers and heat pumps brought back to life.'],
      ['New system installs', 'Right-sized systems that cut your energy bill.'],
      ['Ductless mini-splits', 'Quiet, efficient comfort for rooms the main system misses.'],
      ['Maintenance plans', 'Seasonal tune-ups that prevent breakdowns.'],
      ['Indoor air quality', 'Filters, humidifiers and purifiers for cleaner air.']
    ],
    picks: ['No heat', 'AC not cooling', 'Strange noise', 'Tune-up', 'New system quote', 'Thermostat'],
    faq: [
      ['How often should my system be serviced?', 'Once before cooling season and once before heating season keeps it running well.'],
      ['Do you install mini-splits?', 'Yes. We size and install ductless systems for homes and businesses.'],
      ['Do you offer emergency service?', 'Call or text any time and we will tell you how fast we can be there.']
    ]
  };
  T.electrical = {
    label: 'Electrician', icon: 'bolt', scene: 'electric', color: '#f5b301', fonts: 'industrial', emergency: true,
    noun: 'electrician', job: 'electrical job',
    hero: ['Safe, clean electrical work', 'done right the first time'],
    services: [
      ['Panel upgrades', 'More power for EV chargers, additions and modern homes.'],
      ['Lighting', 'Recessed, landscape and smart lighting installed clean.'],
      ['EV chargers', 'Level 2 home charging installed and ready to plug in.'],
      ['Generators', 'Standby and portable hookups so the lights stay on.'],
      ['Troubleshooting', 'Tripping breakers, dead outlets and flickering lights fixed.'],
      ['Commercial electrical', 'Fit-outs, service and maintenance for businesses.']
    ],
    picks: ['Breaker keeps tripping', 'Panel upgrade', 'EV charger', 'New lighting', 'Generator', 'Outlet not working'],
    faq: [
      ['Do you pull permits?', 'Yes, when the job needs one we handle it.'],
      ['Can you install my EV charger?', 'Yes. We check your panel and give you a clear price first.'],
      ['Do you do commercial work?', 'Yes, homes and businesses.']
    ]
  };
  T.landscaping = {
    label: 'Landscaping & Lawn', icon: 'leaf', scene: 'lawn', color: '#2fbf4f', fonts: 'modern', emergency: false,
    noun: 'landscaper', job: 'yard project',
    hero: ['The best-looking lawn', 'on the block'],
    services: [
      ['Weekly lawn care', 'Mow, trim, edge and blow — the same crew every week.'],
      ['Spring & fall cleanups', 'Leaves, beds and debris cleared so the yard starts fresh.'],
      ['Mulch & beds', 'Fresh edges and mulch that make the whole house pop.'],
      ['Hedge & shrub trimming', 'Clean shapes and healthy plants.'],
      ['Landscape design', 'Plantings, walkways and borders planned around your home.'],
      ['Snow removal', 'Driveways and walkways cleared all winter.']
    ],
    picks: ['Weekly mowing', 'Cleanup', 'Mulch', 'Hedge trimming', 'New design', 'Snow removal'],
    faq: [
      ['Do you offer weekly service?', 'Yes. Most clients are on a weekly or every-other-week schedule.'],
      ['Do I need to be home?', 'No. Just make sure gates are unlocked and pets are inside.'],
      ['Do you do one-time cleanups?', 'Yes, spring and fall cleanups are booked separately.']
    ]
  };
  T.auto = {
    label: 'Auto Repair / Body / Towing', icon: 'car', scene: 'road', color: '#e8452a', fonts: 'industrial', emergency: true,
    noun: 'shop', job: 'repair',
    hero: ['From the tow to the', 'final shine'],
    services: [
      ['Collision repair', 'Dents, panels and frame work fixed to factory spec.'],
      ['Paint & refinish', 'Color-matched paint that disappears into the rest of the car.'],
      ['Towing & roadside', 'Tows, jump starts, lockouts and tire changes.'],
      ['Insurance claims', 'We work with your insurance and keep you updated.'],
      ['Mechanical repair', 'Brakes, suspension, diagnostics and maintenance.'],
      ['Free estimates', 'Send photos and get a starting estimate fast.']
    ],
    picks: ['Need a tow', 'Accident repair', 'Dent / scratch', 'Paint', 'Check engine light', 'Brakes'],
    faq: [
      ['Can you work with my insurance company?', 'Yes. We can work with your insurance company and help you through the claim. Ask us before you decide.'],
      ['Can I send photos for an estimate?', 'Yes. Send a few clear photos and we will get back to you with a starting number.'],
      ['Do you tow?', 'Ask when you call — we will tell you how fast we can get a truck there.']
    ]
  };
  T.detailing = {
    label: 'Detailing / Car Wash', icon: 'sparkle', scene: 'shine', color: '#ffb54a', fonts: 'modern', emergency: false,
    noun: 'detailer', job: 'detail',
    hero: ['Showroom shine,', 'right in your driveway'],
    services: [
      ['Full detail', 'Inside and out, hand wash to vacuum and wipe-down.'],
      ['Paint correction', 'Swirls and haze polished out so the paint pops.'],
      ['Ceramic coating', 'Long-lasting protection and that deep wet look.'],
      ['Interior deep clean', 'Seats, carpets and stains handled.'],
      ['Boat & RV detailing', 'Hull, deck and interior care.'],
      ['Maintenance plans', 'Keep it clean on a schedule.']
    ],
    picks: ['Full detail', 'Interior only', 'Ceramic coating', 'Paint correction', 'Boat', 'Fleet'],
    faq: [
      ['Do you come to me?', 'Ask about mobile service in your area.'],
      ['How long does a full detail take?', 'Most take a few hours depending on size and condition.'],
      ['How long does ceramic coating last?', 'It depends on the product and how the vehicle is cared for — we will explain options.']
    ]
  };
  T.contractor = {
    label: 'Contractor / Remodeling', icon: 'hammer', scene: 'build', color: '#e0aa78', fonts: 'elegant', emergency: false,
    noun: 'contractor', job: 'project',
    hero: ['Built right,', 'built to last'],
    services: [
      ['Kitchens', 'Cabinets, counters and layouts planned around how you live.'],
      ['Bathrooms', 'From quick refreshes to full gut renovations.'],
      ['Additions & decks', 'More space inside and out.'],
      ['Custom carpentry', 'Built-ins, trim and finish work.'],
      ['Roofing & siding', 'Weather-tight and good-looking.'],
      ['Design help', 'Plans and material choices before anything is torn out.']
    ],
    picks: ['Kitchen', 'Bathroom', 'Addition', 'Deck', 'Carpentry', 'Not sure yet'],
    faq: [
      ['Do you give free estimates?', 'Yes. We look at the space and give you a written estimate.'],
      ['Do you handle permits?', 'When a project needs permits, we walk you through them.'],
      ['How long does a project take?', 'It depends on size and materials — you get a timeline with your estimate.']
    ]
  };
  T.cleaning = {
    label: 'Cleaning Service', icon: 'spray', scene: 'clean', color: '#22c6da', fonts: 'clean', emergency: false,
    noun: 'cleaning team', job: 'cleaning',
    hero: ['Come home to', 'spotless'],
    services: [
      ['Home cleaning', 'Weekly, bi-weekly or monthly — the same trusted team.'],
      ['Deep cleaning', 'Top to bottom, baseboards to ceiling fans.'],
      ['Move in / move out', 'Leave it perfect or start fresh.'],
      ['Office cleaning', 'After-hours cleaning for businesses.'],
      ['Windows', 'Streak-free inside and out.'],
      ['Post-construction', 'Dust and debris gone after the reno.']
    ],
    picks: ['Regular cleaning', 'Deep clean', 'Move out', 'Office', 'Windows', 'Post-construction'],
    faq: [
      ['Do you bring supplies?', 'Yes, we bring our own supplies and equipment.'],
      ['Do I need to be home?', 'No. Many clients give us a key or code.'],
      ['Can I get the same cleaner each time?', 'We do our best to keep the same team on your home.']
    ]
  };
  T.restaurant = {
    label: 'Restaurant / Food', icon: 'plate', scene: 'food', color: '#ef6c35', fonts: 'elegant', emergency: false,
    noun: 'kitchen', job: 'order',
    hero: ['Fresh, local and', 'made to order'],
    services: [
      ['Dine in', 'Come hungry — we will take care of the rest.'],
      ['Takeout & pickup', 'Order ahead and skip the wait.'],
      ['Delivery', 'Hot food to your door.'],
      ['Catering', 'Parties, offices and events of every size.'],
      ['Private events', 'Book the room for your celebration.'],
      ['Gift cards', 'The easy gift everyone likes.']
    ],
    picks: ['Order pickup', 'Catering', 'Reserve a table', 'Private event', 'Gift card', 'Menu'],
    faq: [
      ['Do you cater?', 'Yes. Tell us the date, headcount and what you have in mind.'],
      ['Do you take reservations?', 'Call us or send a request and we will confirm.'],
      ['Do you have options for allergies?', 'Tell your server or mention it on your order and we will help.']
    ]
  };
  T.beauty = {
    label: 'Salon / Barber / Spa', icon: 'scissors', scene: 'beauty', color: '#d9467a', fonts: 'elegant', emergency: false,
    noun: 'studio', job: 'appointment',
    hero: ['Look good,', 'feel better'],
    services: [
      ['Haircuts & styling', 'Cuts that fit your face and your routine.'],
      ['Color', 'Highlights, balayage and full color.'],
      ['Beard & shave', 'Clean lines and hot towel shaves.'],
      ['Nails', 'Manicures, pedicures and nail art.'],
      ['Skin & spa', 'Facials and treatments that relax and refresh.'],
      ['Bridal & events', 'Hair and makeup for the big day.']
    ],
    picks: ['Haircut', 'Color', 'Beard', 'Nails', 'Facial', 'Event'],
    faq: [
      ['Do you take walk-ins?', 'Call ahead to check today’s availability.'],
      ['How do I book?', 'Send a request here or call, and we will confirm your time.'],
      ['Do you do group bookings?', 'Yes — bridal parties and events are welcome.']
    ]
  };
  T.health = {
    label: 'Dental / Medical / Wellness', icon: 'heart', scene: 'health', color: '#2b8cff', fonts: 'clean', emergency: false,
    noun: 'practice', job: 'visit',
    hero: ['Gentle care for', 'the whole family'],
    services: [
      ['New patients', 'Easy first visits and clear answers.'],
      ['Checkups & cleanings', 'Routine care that keeps small problems small.'],
      ['Treatment plans', 'Options explained before anything starts.'],
      ['Same-week appointments', 'Ask about openings this week.'],
      ['Insurance help', 'We help you understand your coverage.'],
      ['Family care', 'Kids, parents and grandparents welcome.']
    ],
    picks: ['New patient', 'Checkup', 'Pain / urgent', 'Insurance question', 'Second opinion', 'Kids'],
    faq: [
      ['Are you accepting new patients?', 'Yes — send a request or call and we will find a time.'],
      ['Which insurance do you take?', 'Call us with your plan and we will check it for you.'],
      ['What if I have pain today?', 'Call right away and tell us what is going on.']
    ]
  };
  T.fitness = {
    label: 'Gym / Fitness / Martial Arts', icon: 'dumbbell', scene: 'fitness', color: '#ff3d4a', fonts: 'industrial', emergency: false,
    noun: 'gym', job: 'class',
    hero: ['Stronger every', 'single week'],
    services: [
      ['Memberships', 'Open gym access with no confusing extras.'],
      ['Personal training', 'One-on-one coaching built around your goals.'],
      ['Group classes', 'Energy, structure and people who show up.'],
      ['Kids programs', 'Confidence, discipline and fun.'],
      ['Free trial', 'Try a class before you commit.'],
      ['Nutrition coaching', 'Simple plans you can actually follow.']
    ],
    picks: ['Free trial', 'Membership', 'Personal training', 'Classes', 'Kids', 'Pricing'],
    faq: [
      ['Can I try a class first?', 'Yes — ask about a free trial.'],
      ['Do I need experience?', 'No. Coaches scale every class to your level.'],
      ['Are there contracts?', 'Ask us about current membership options.']
    ]
  };
  T.tech = {
    label: 'Tech / IT / Security', icon: 'wifi', scene: 'electric', color: '#02d7f5', fonts: 'modern', emergency: true,
    noun: 'tech team', job: 'project',
    hero: ['Tech that just', 'works'],
    services: [
      ['Security cameras', 'Clear coverage and phone viewing.'],
      ['Wi-Fi & networking', 'Fast, reliable coverage everywhere.'],
      ['IT support', 'Computers, printers and email fixed.'],
      ['Smart home', 'Lights, locks and automations.'],
      ['Business phones', 'Modern phone systems and apps.'],
      ['Remote support', 'Help in minutes without a visit.']
    ],
    picks: ['Cameras', 'Wi-Fi', 'Computer help', 'Smart home', 'Phones', 'Not sure'],
    faq: [
      ['Do you do free demos?', 'Ask us — we can show you before you buy.'],
      ['Do you support businesses?', 'Yes, homes and businesses.'],
      ['Can you help remotely?', 'Many issues can be fixed remotely in minutes.']
    ]
  };
  T.other = {
    label: 'Other local business', icon: 'store', scene: 'store', color: '#7c5cff', fonts: 'modern', emergency: false,
    noun: 'team', job: 'request',
    hero: ['Local, trusted and', 'ready to help'],
    services: [
      ['Our main service', 'What you come to us for, done right.'],
      ['Free estimates', 'Clear pricing before we start.'],
      ['Fast replies', 'Call, text or send a request.'],
      ['Local team', 'Neighbors serving neighbors.'],
      ['Business clients', 'Ask about commercial service.'],
      ['Gift cards', 'Ask about gift cards and specials.']
    ],
    picks: ['Get a quote', 'Book a time', 'Ask a question', 'Pricing', 'Hours', 'Other'],
    faq: [
      ['How do I get started?', 'Send a request or call and we will take it from there.'],
      ['What areas do you serve?', 'See the service area section above or ask us.'],
      ['How fast do you reply?', 'We reply as fast as we can, usually the same day.']
    ]
  };

  var PROCESS = [
    ['Tell us what you need', 'Call, text or send the quick form with a photo.'],
    ['Get a clear price', 'We confirm the details and give you the price up front.'],
    ['We do the work', 'On time, cleaned up, and checked before we leave.'],
    ['You are covered', 'Questions after? One call and we are on it.']
  ];
  var FAQ_COMMON = [
    ['What areas do you serve?', 'We serve {areas}. Not on the list? Call or text and ask.'],
    ['How do I get a quote?', 'Use the quote form on this page, or call/text {phone}. Photos help us price it faster.']
  ];

  g.PietsTrades = { T: T, PROCESS: PROCESS, FAQ_COMMON: FAQ_COMMON };
})(typeof window !== 'undefined' ? window : globalThis);
