// Generates index.html, services.html and locations/*.html into public/.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { SITE, SERVICES, LOCATIONS, esc, head, banner, nav, footer, quoteForm, faqBlock, faqLd, breadcrumbLd, orgLd, localBusinessLd, pageHead, planner, icon } from './site.js';
import { heroSection, worksWith, statsBand, servicesBlock, industryTabs, commercialBand, compareBlock, howItWorks, coverageTeaser, plansBlock, brochureGate, reviewsSlot, HOME_FAQ, finalCta, areasBlock as homeAreas, plannerSection, newFromPiets } from './home.js';

const write = (pub, rel, html) => { const f = join(pub, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); return rel; };

// Local areasBlock function since the one in home.js doesn't import LOCATIONS
const areasBlock = () => {
  return `
<section class="section" id="service-area">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">Service area</div>
      <h2>Based in Suffolk County. Serving New York.</h2>
      <p>On-site across Long Island, NYC, the Hudson Valley and the Johnstown / Capital Region. Remote support anywhere.</p>
    </div>
    <div class="areas-grid">
      ${LOCATIONS.map(loc => `
        <div class="area-card">
          <h3>${loc.name}</h3>
          <p>${loc.short}</p>
        </div>
      `).join('')}
    </div>
    <p class="areas-note">Larger commercial projects anywhere in the US on request</p>
  </div>
</section>
`;
};

/* ---------------- HOME ---------------- */
// HOME_FAQ imported from home.js

function homePage() {
  const title = 'Security Cameras, IT & Wi-Fi Support | Piets Tech Solutions';
  const description = 'Security cameras, IT support, Wi-Fi, cabling, smart home, POS and 24/7 tech support across Long Island, NYC, Hudson Valley & Capital Region. Free demos.';
  const ld = [orgLd(), localBusinessLd({ areaServed: ['Suffolk County, NY', 'Nassau County, NY', 'New York City, NY', 'Westchester County, NY', 'Putnam County, NY', 'Dutchess County, NY', 'Orange County, NY', 'Johnstown, NY', 'Albany, NY', 'Saratoga Springs, NY'] }), faqLd(HOME_FAQ),
    { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url }];

  const body = `${banner()}
${nav('home')}
<main id="main">
${heroSection()}
${worksWith()}
${statsBand()}
${servicesBlock()}
${newFromPiets()}
${industryTabs()}
${commercialBand()}
${compareBlock()}
${howItWorks()}
${coverageTeaser()}
${plansBlock()}
${brochureGate()}
${reviewsSlot()}
${homeAreas()}
${plannerSection(planner({source:'Planner - home', heading:'Plan your project in 4 quick steps', id:'quote'}))}
${faqBlock(HOME_FAQ)}
${finalCta()}
</main>
${footer()}`;

    return head({ title, description, path: '/', extraLd: ld, bodyClass: 'home-page', extraScripts: '<script src="/assets/js/hero.js" defer></script><script src="/assets/js/planner.js" defer></script>' }) + body;
}

/* ---------------- SERVICES ---------------- */
const SERVICE_DETAIL = {
  'security-cameras': { bullets: ['InVid Tech Paramont 4K IP cameras and NVRs', 'Color night vision, smart motion & people/vehicle detection', 'View live and recorded video from your phone, anywhere', 'Local recording — no required monthly cloud fees', 'Homes, storefronts, restaurants, warehouses, multi-family', 'Free on-site or video-call demo before you buy'], cta: 'See a Paramont system live', ctaText: 'We’ll bring a demo camera and show you exactly what you’ll see on your phone — day and night.' },
  'it-support': { bullets: ['Slow computer tune-ups, upgrades and data migration', 'Printer setup, wireless printing and repair', 'Virus & malware removal, security hardening', 'Email, Microsoft 365 and Google Workspace help', 'Backups that actually restore', 'On-site or remote — whichever is faster'], cta: 'Get it fixed today', ctaText: 'Most software issues are solved remotely within the hour. Hardware problems get an honest repair-or-replace answer.' },
  'networking-wifi': { bullets: ['Wi-Fi surveys that find the real dead zones', 'Business-grade access points with seamless roaming', 'Proper routers, switches, VLANs and guest networks', 'Mesh done right (wired backhaul, not band-aids)', 'Outdoor Wi-Fi for patios, pools and yards', 'ISP coordination and speed troubleshooting'], cta: 'Fix your Wi-Fi for good', ctaText: 'Tell us the square footage and where it drops out. We’ll design a network that covers every corner.' },
  'structured-cabling': { bullets: ['Cat6 / Cat6A data drops, tested and labeled', 'Fiber runs between buildings and floors', 'Patch panels, racks and clean cable management', 'Camera, access-point and TV wiring', 'New construction pre-wire and retrofits', 'Coax, speaker and low-voltage cleanup'], cta: 'Get a cabling quote', ctaText: 'Send a rough count of drops and a floor plan or photos — we’ll quote fast and walk the site for free.' },
  'smart-home': { bullets: ['Home Assistant setup on local, private hardware', 'Lighting, shades, thermostats, locks and garage', 'Camera and doorbell integration with automations', 'Voice control, dashboards and scenes', 'Bring your existing devices together in one app', 'No required subscriptions'], cta: 'See a smart home demo', ctaText: 'We’ll show you a working Home Assistant dashboard and map out what’s possible with what you already own.' },
  'pos': { bullets: ['Restaurant, café, bar and retail POS installs', 'Payment terminals and merchant account setup', 'Kitchen printers, KDS screens and order tablets', 'Online ordering and delivery-app integrations', 'Reliable POS network with backup internet', 'Staff training and ongoing support'], cta: 'Talk POS with someone who installs it', ctaText: 'We’ll review your workflow and recommend a setup that fits — not the one with the biggest commission.' },
  'ip-phones': { bullets: ['Cloud VoIP with auto-attendant and call queues', 'Desk phones, cordless and mobile apps', 'Voicemail-to-email, call recording and texting', 'Keep your existing number', 'Fax, paging and door-intercom integration', 'Often cheaper than your current landline bill'], cta: 'Get a phone system quote', ctaText: 'Tell us how many users and lines you need. We’ll show you a demo and the monthly numbers.' },
  'menu-boards': { bullets: ['Commercial displays mounted and wired cleanly', 'Update menus and prices from your phone', 'Scheduled breakfast / lunch / dinner boards', 'Promo videos and specials rotation', 'Works with most POS systems', 'Single screen or full wall'], cta: 'Upgrade your menu boards', ctaText: 'Send a photo of your counter. We’ll design a board layout and quote the screens, mounts and wiring.' },
  'ghost-kitchen': { bullets: ['Order tablets for every delivery platform', 'Kitchen printers and KDS screens', 'Fast, reliable Wi-Fi and wired network', 'Cameras for security and food-safety review', 'Phones, intercom and door access', 'Open-day support so nothing slips'], cta: 'Open your ghost kitchen faster', ctaText: 'We’ll build the full tech list for your space and have you taking orders on day one.' },
  'access-control': { bullets: ['Keypads, fobs, cards and mobile credentials', 'Video intercoms for lobbies and gates', 'Door strikes, maglocks and request-to-exit', 'Schedules, audit logs and remote unlock', 'Integrates with Paramont cameras', 'Offices, multi-family, gyms, warehouses'], cta: 'Control who gets in', ctaText: 'One door or twenty — we’ll walk the site and design a system you can manage from your phone.' },
  'remote-support': { bullets: ['Secure RustDesk screen-share sessions', 'No account needed — just a one-time code', 'Software fixes, printer setups, email, updates', 'Camera and network checks without a visit', 'Fast: most sessions under 30 minutes', 'Available to clients anywhere'], cta: 'Start a remote session', ctaText: 'Call or text and we’ll send you the RustDesk link. You watch everything we do on screen.' },
  'tech-support-247': { bullets: ['Call or text any hour, any day', 'Emergencies get immediate attention', 'Camera, network, POS and phone outages', 'Remote first, on-site when needed', 'Clear communication and follow-up', "Questions? We're here 24/7"], cta: 'Need help right now?', ctaText: 'Call 631-871-5957. If it’s down, we’re on it.' },
  'managed-services': { bullets: ['Remote monitoring of networks, cameras and PCs', 'Priority support with guaranteed response', 'Monthly camera health checks and cleanups', 'Patching, backups and security updates', 'Vendor coordination (ISP, POS, phones)', 'Flat monthly fee — Basic, Pro or Business'], cta: 'Compare monthly plans', ctaText: 'See the three plans on the home page, or ask us to tailor one for your business.' },
};

function servicesPage() {
  const title = 'Services — Cameras, IT, Wi-Fi, Cabling, POS | Piets Tech';
  const description = 'InVid Tech Paramont cameras, IT support, Wi-Fi, cabling, smart home, POS, business phones, access control and 24/7 support. Free demos.';
  const ld = [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services.html' }]),
    ...SERVICES.map(s => ({ '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.pitch, url: SITE.url + '/services.html#' + s.id, serviceType: s.name,
      provider: { '@type': 'LocalBusiness', name: SITE.name, telephone: SITE.phoneE164, url: SITE.url },
      areaServed: LOCATIONS.map(l => ({ '@type': 'Place', name: l.region })) }))];
  const subnav = `<nav class="subnav sticky" aria-label="Services"><div class="wrap"><ul>${SERVICES.map(s => `<li><a href="#${s.id}">${esc(s.short)}</a></li>`).join('')}</ul></div></nav>`;
  
  // Service-specific checklists based ONLY on FACTS.md
  const SERVICE_CHECKLISTS = {
    'security-cameras': [
      'InVid Tech Paramont IP camera systems',
      '4K options available',
      'Night vision',
      'View from your phone',
      'Designed and installed locally',
      'Recorder sized for your storage needs'
    ],
    'networking-wifi': [
      'Business-grade access points',
      'Business-grade routers and switches',
      'Dead zones eliminated',
      'Guest networks supported',
      'Clean, documented network closets'
    ],
    'structured-cabling': [
      'Cat6/Cat6A cabling',
      'Fiber optic cabling',
      'Labeled and tested installations',
      'New construction projects',
      'Retrofit projects',
      'Serves offices, warehouses, restaurants, homes'
    ],
    'access-control': [
      'Keypad entry systems',
      'Fob-based credentials',
      'Mobile device credentials',
      'Video intercom systems',
      'For offices',
      'For multi-family buildings',
      'For commercial doors'
    ],
    'ip-phones': [
      'Auto-attendant features',
      'Call routing capabilities',
      'Mobile apps included',
      'Voicemail-to-email functionality',
      'Keep your existing number'
    ],
    'pos': [
      'Restaurant POS systems',
      'Retail POS systems',
      'Payment terminal setup',
      'Kitchen printer integration',
      'Network infrastructure behind POS',
      'Hands-on payment-processing experience'
    ],
    'menu-boards': [
      'TV menu boards',
      'Updated from your phone',
      'Commercial displays',
      'Clean mounting and wiring',
      'Single screen or full wall'
    ],
    'ghost-kitchen': [
      'Order tablets for delivery platforms',
      'Kitchen printers',
      'KDS screens (Kitchen Display Systems)',
      'Fast, reliable Wi-Fi and wired network',
      'Cameras for security and food safety',
      'Phones, intercom and door access'
    ],
    'smart-home': [
      'Local, private Home Assistant setup',
      'Lighting automation',
      'Shades',
      'Thermostats',
      'Smart locks',
      'Camera integration',
      'No required cloud fees'
    ],
    'it-support': [
      'PC repair and tune-ups',
      'Printer setup and repair',
      'Email troubleshooting',
      'Malware cleanup',
      'On-site support available',
      'Remote support available'
    ],
    'remote-support': [
      'Secure RustDesk screen-share sessions',
      'No account needed',
      'Software fixes assistance',
      'Printer setup help',
      'Email support',
      'Available to clients anywhere'
    ],
    'tech-support-247': [
      'Call any hour, any day',
      'Text any hour, any day',
      'Emergency support available',
      'Camera system support',
      'Network support',
      'Phone system support',
      'Questions? We\'re here 24/7'
    ],
    'managed-services': [
      'Remote monitoring of networks and cameras',
      'Monthly camera health checks',
      'Priority support options',
      'Basic tier available',
      'Pro tier available (most popular)',
      'Business tier available'
    ]
  };

  const sections = SERVICES.map(s => {
    const checklist = SERVICE_CHECKLISTS[s.id] || [];
    return `<section class="service" id="${s.id}">
  <div class="wrap">
    <div class="service-content">
      <div class="service-icon">${icon(s.icon)}</div>
      <div class="service-info">
        <h2>${esc(s.name)}</h2>
        <p>${esc(s.pitch)}</p>
        <ul class="check-list">
          ${checklist.map(item => `<li>${esc(item)}</li>`).join('')}
        </ul>
        <div class="service-actions">
          <a href="/plan.html?service=${s.id}" class="btn btn-outline">Plan this</a>
          <a href="tel:${SITE.phoneE164}" class="btn btn-navy">Call ${SITE.phone}</a>
        </div>
      </div>
    </div>
  </div>
</section>`; }).join('\n');

  const body = `${banner()}
${nav('services')}
<main id="main">
${pageHead({ crumbs: [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services.html' }], h1: 'Services', intro: 'Everything low-voltage, from one local team. Every service comes with a free demo, references and a solution tailored to your space.' })}
${subnav}
${sections}
  ${planner({source:'Planner - services', heading:'Get a tailored plan', id:'services-planner'})}
</main>
${footer()}`;
    return head({ title, description, path: '/services.html', extraLd: ld, bodyClass: '', extraScripts: '<script src="/assets/js/planner.js" defer></script>' }) + body;
}

/* ---------------- LOCATIONS ---------------- */
const LOC_COPY = {
    'long-island': {
      title: 'Security Cameras & IT Support Long Island | Suffolk & Nassau',
      description: 'Security camera installation, IT support, Wi-Fi upgrades, cabling and POS across Suffolk and Nassau County. Free demos, 24/7 support. Call 631-871-5957.',
      h1: 'Security Cameras, IT Support &amp; Wi-Fi on Long Island',
      intro: 'Piets Technology Solutions is based right here in Suffolk County. From Huntington to Riverhead and across Nassau, we install InVid Tech Paramont camera systems, fix Wi-Fi dead zones, run clean cabling and support small businesses 24/7.',
      para: 'Long Island homes and businesses have their own tech challenges: big split-levels with Wi-Fi that dies upstairs, waterfront properties that need weatherproof cameras, strip-mall restaurants that need POS and menu boards running through the dinner rush. We live and work here, and you deal directly with the installer. Whether you’re a homeowner in Smithtown, a deli in Bay Shore or an office in Hauppauge, you get the same thing: a free demo, a straight quote and a clean install.',
      faq: [
        { q: 'Do you cover all of Long Island?', a: "Yes — Suffolk and Nassau County. Questions? We're here 24/7 at 631-871-5957." },
        { q: 'Do you install cameras in Suffolk County homes?', a: 'Yes. A typical layout covers the driveway, front door, backyard and side yards with InVid Tech Paramont cameras. We’ll walk the property and show you a live demo first.' },
        { q: 'Can you fix Wi-Fi in a large Long Island house?', a: 'Yes. We survey the house, wire access points where they belong and eliminate dead zones in the basement, upstairs bedrooms and the backyard.' },
        { q: 'Do you support restaurants and delis?', a: 'Absolutely. POS, kitchen printers, TV menu boards, cameras, phones and Wi-Fi for staff and guests. We understand you can’t be down during a rush.' },
      ] },
    'nyc': {
      title: 'Security Cameras & IT Support NYC | All Five Boroughs',
      description: 'Security cameras, IT support, networking, cabling, POS and access control in Manhattan, Brooklyn, Queens, the Bronx & Staten Island. Free demos, 24/7.',
      h1: 'Security Cameras, IT &amp; Networking in New York City',
      intro: 'Piets Technology Solutions serves all five boroughs with InVid Tech Paramont camera systems, access control, business Wi-Fi, structured cabling, POS and 24/7 support for storefronts, offices, restaurants and multi-family buildings.',
      para: 'City jobs need an installer who respects building rules, tight schedules and tighter spaces. We work with property managers and small business owners across Manhattan, Brooklyn, Queens, the Bronx and Staten Island: cameras and video intercoms for walk-ups and lobbies, access control for offices, POS and menu boards for restaurants, and networks that hold up in dense buildings full of interference. Free video-call demos make it easy to plan before we ever set foot on site.',
      faq: [
        { q: 'Do you install cameras in NYC apartment buildings?', a: 'Yes. InVid Tech Paramont cameras and recorders for lobbies, hallways, entrances, roofs and basements, plus video intercoms and access control so residents and managers can see and control entry from a phone.' },
        { q: 'Can you work around building management requirements?', a: 'Yes. We provide certificates of insurance, coordinate with supers and management, and schedule around building rules and quiet hours.' },
        { q: 'Do you support NYC restaurants and ghost kitchens?', a: 'Yes. POS, kitchen printers, order tablets, menu boards, cameras and reliable Wi-Fi. We set up delivery-only kitchens to take orders from day one.' },
        { q: 'Is remote support available in NYC?', a: 'Yes. Many software, email, printer and network issues can be handled remotely with RustDesk.' },
      ] },
    'hudson-valley': {
      title: 'Security Cameras & IT Support | Hudson Valley NY',
      description: 'Camera installation, Wi-Fi upgrades, cabling, smart home and IT support in Westchester, Putnam, Dutchess and Orange County. Free demos, 24/7 support.',
      h1: 'Security Cameras, Wi-Fi &amp; IT Support in the Hudson Valley',
      intro: 'From White Plains to Poughkeepsie and Newburgh, Piets Technology Solutions brings InVid Tech Paramont security cameras, whole-home Wi-Fi, structured cabling, Home Assistant smart home automation and small business IT to the Hudson Valley.',
      para: 'Hudson Valley properties are bigger, older and more spread out: stone walls that kill Wi-Fi, long driveways that need cameras with real range, barns and detached garages that need fiber or point-to-point links. We plan for all of it. For businesses in Westchester, Putnam, Dutchess and Orange County, we deliver the same POS, phones, cabling and managed support we provide on Long Island, with free demos on a video call so planning is easy.',
      faq: [
        { q: 'Do you cover Westchester and Putnam County?', a: 'Yes. Westchester, Putnam, Dutchess and Orange County are all in our on-site service area.' },
        { q: 'Can you get Wi-Fi to a detached garage or barn?', a: 'Yes. Depending on distance we run fiber, direct-burial Cat6 or a wireless point-to-point bridge, then add an access point in the outbuilding.' },
        { q: 'Do you do smart home installs in the Hudson Valley?', a: 'Yes. Home Assistant automation for lighting, shades, thermostats, locks, cameras and gates, running locally on your own hardware with no required subscriptions.' },
        { q: 'What about long driveways and gates?', a: 'InVid Tech Paramont cameras with night vision, plus gate intercoms and access control you manage from your phone.' },
      ] },
    'johnstown-capital-region': {
      title: 'Security Cameras & IT Support Johnstown NY | Capital Region',
      description: 'Security cameras, IT support, Wi-Fi, cabling and POS in Johnstown, Gloversville, Amsterdam, Albany and Saratoga Springs. Free demos, 24/7 support.',
      h1: 'Security Cameras &amp; IT Support in Johnstown, Gloversville, Amsterdam, Albany &amp; Saratoga',
      intro: 'Piets Technology Solutions serves Fulton and Montgomery County and the greater Capital Region with InVid Tech Paramont camera systems, business Wi-Fi, structured cabling, POS, IP phones and 24/7 tech support.',
      para: 'Johnstown, Gloversville and Amsterdam businesses deserve the same tier of tech as Albany and Saratoga Springs. We bring it: camera systems for shops, farms and warehouses; Wi-Fi and cabling for offices, schools and churches; POS and menu boards for restaurants; and managed support so a small team never has to worry about IT. Remote support and video-call demos mean you get fast answers even when we’re not on site.',
      faq: [
        { q: 'Do you really come to Johnstown and Gloversville?', a: 'Yes. Johnstown, Gloversville, Amsterdam, Albany and Saratoga are in our on-site area.' },
        { q: 'Can you install cameras on a farm or large property?', a: 'Yes. InVid Tech Paramont cameras with night vision for barns, gates and outbuildings, and recordings you can check from your phone.' },
        { q: 'Do you support Capital Region small businesses monthly?', a: 'Yes. Our Basic, Pro and Business managed plans include remote monitoring, priority support and camera health checks, with on-site visits scheduled as needed.' },
        { q: 'What if I need help right away?', a: "Call or text 631-871-5957. Many issues can be handled remotely. Questions? We're here 24/7." },
      ] },
};

function locationPage(loc) {
  const c = LOC_COPY[loc.slug];
  const path = `/locations/${loc.slug}.html`;
  const ld = [localBusinessLd({ areaServed: [...loc.counties, ...loc.towns.slice(0, 12)].map(t => t + ', NY'), path, name: `${SITE.name} — ${loc.name}`, description: c.description }),
    ...SERVICES.slice(0, 6).map(s => ({ '@context': 'https://schema.org', '@type': 'Service', name: `${s.name} ${loc.slug === 'long-island' ? 'on' : 'in'} ${loc.name}`, serviceType: s.name, url: SITE.url + path + '#' + s.id,
      provider: { '@type': 'LocalBusiness', name: SITE.name, telephone: SITE.phoneE164 }, areaServed: loc.counties.map(t => ({ '@type': 'Place', name: t + ', NY' })) })),
    faqLd(c.faq), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Locations', path: '/locations/' }, { name: loc.name, path }])];

  const cards = SERVICES.map(s => `<article class="card" id="${s.id}"><div class="icon" aria-hidden="true">${icon(s.icon)}</div><h3>${esc(s.name)}</h3><p>${esc(s.pitch)}</p><a class="more" href="/services.html#${s.id}">Details →</a></article>`).join('\n      ');
  const others = LOCATIONS.filter(l => l.slug !== loc.slug).map(l => `<a class="area" href="/locations/${l.slug}.html"><strong>${esc(l.name)}</strong><span>${esc(l.short)}</span></a>`).join('');

  const body = `${banner()}
${nav('locations')}
<main id="main">
${pageHead({ crumbs: [{ name: 'Home', path: '/' }, { name: 'Locations', path: '/locations/' }, { name: loc.name, path }], h1: c.h1, intro: c.intro })}
<div class="trust"><div class="wrap"><ul><li>24/7 tech support</li><li>Free demos — in person or video call</li><li>References available</li><li>Licensed &amp; insured</li></ul></div></div>
<section class="section">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">Local tech, local answers</div><h2>Serving ${esc(loc.short)}</h2></div>
    <p style="max-width:52rem">${c.para}</p>
    <div class="btn-row"><a class="btn btn-navy" href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a><a class="btn btn-outline" href="sms:${SITE.phoneE164}">Text us</a><a class="btn btn-outline" href="#quote">Get a free quote</a></div>
  </div>
</section>
<section class="section section-soft" id="services">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">Services ${loc.slug === 'long-island' ? 'on' : 'in'} ${esc(loc.name)}</div><h2>What we install and support here</h2></div>
    <div class="grid">
      ${cards}
    </div>
  </div>
</section>
<section class="section" id="towns">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">Towns we serve</div><h2>${esc(loc.counties.join(' · '))}</h2><p>Don’t see your town? We probably cover it — just ask.</p></div>
    <ul class="chips">${loc.towns.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
  </div>
</section>
${faqBlock(c.faq, { heading: `${loc.name} FAQ` })}
${quoteForm({ source: `location-${loc.slug}`, title: `Get a free quote ${loc.slug === 'long-island' ? 'on' : 'in'} ${loc.name}` })}
<section class="section section-soft">
  <div class="wrap"><div class="section-head"><div class="eyebrow">Other areas</div><h2>Also serving</h2></div><div class="areas">${others}</div></div>
</section>
</main>
${footer()}`;
    return head({ title: c.title, description: c.description, path, extraLd: ld, bodyClass: '', extraScripts: '<script src="/assets/js/planner.js" defer></script>' }) + body;
}

function locationsIndex() {
  const title = 'Service Areas — Long Island, NYC, Hudson Valley | Piets Tech';
  const description = 'Piets Technology Solutions serves Long Island, NYC, the Hudson Valley and the Johnstown / Capital Region with cameras, IT, Wi-Fi, cabling and 24/7 support.';
  const path = '/locations/';
  const ld = [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Locations', path }]), localBusinessLd({ areaServed: LOCATIONS.flatMap(l => l.counties.map(c => c + ', NY')), path })];
  const body = `${banner()}
${nav('locations')}
<main id="main">
${pageHead({ crumbs: [{ name: 'Home', path: '/' }, { name: 'Locations', path }], h1: 'Service Areas', intro: 'Based in Suffolk County, on-site across Long Island, NYC, the Hudson Valley and the Capital Region, and remote support anywhere. Pick your area for local details.' })}
<section class="section"><div class="wrap"><div class="areas">${LOCATIONS.map(l => `<a class="area" href="/locations/${l.slug}.html"><strong>${esc(l.name)}</strong><span>${esc(l.short)}</span></a>`).join('')}</div></div></section>
${quoteForm({ source: 'locations-index' })}
</main>
${footer()}`;
   return head({ title, description, path, extraLd: ld, bodyClass: '' }) + body;
}

function planPage() {
  const title = 'Project Planner | Piets Technology Solutions';
  const description = 'Tell us about your project and we’ll create a tailored plan for your security, networking, or smart home needs.';
   
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description: description, url: SITE.url + '/plan.html' }
  ];
   
    // Embed the planner directly in the page
    const plannerHtml = planner({ 
      source: 'Planner - plan page',
      heading: 'Tell us about your project',
      id: 'planner'
    });
   
  const body = `${banner()}
${nav('plan')}
<main id="main">
  <div class="page-head">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span>/</span><strong>Project Planner</strong>
      </nav>
      <h1>Build Your Custom Tech Plan</h1>
      <p>Tell us about your project and we’ll create a tailored plan for your security, networking, or smart home needs.</p>
    </div>
  </div>
   
  ${plannerHtml}
   
  <section class="section section-soft" id="quote">
    <div class="wrap">
      <div class="section-head">
        <div class="eyebrow">Free quote</div>
        <h2>Ready to talk about your project?</h2>
        <p>Call or text <a href="tel:${SITE.phoneE164}">${SITE.phone}</a>, email <a href="mailto:${SITE.email}">${SITE.email}</a>, or <a href="/#quote">send the quote form</a>. ${esc(SITE.clientLine)}</p>
      </div>
      <div class="btn-row">
        <a class="btn btn-navy" href="/#quote">Get a free quote</a>
        <a class="btn btn-outline" href="/services.html">See all services</a>
      </div>
    </div>
  </section>
</main>
${footer()}`;
   
    return head({ title, description, path: '/plan.html', extraLd: ld, bodyClass: '', extraScripts: '<script src="/assets/js/planner.js" defer></script>' }) + body;
}

function coveragePage() {
  const title = 'Camera Coverage Planner | Piets Technology Solutions';
  const description = 'Design your security camera layout with our interactive floor plan tool. Place cameras, adjust lenses, and see coverage percentages in real time.';
   
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description: description, url: SITE.url + '/coverage.html' }
  ];
   
  const body = `${banner()}
${nav('coverage')}
<main id="main">
  <div class="page-head">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span>/</span><strong>Camera Coverage Planner</strong>
      </nav>
      <h1>Camera Coverage Planner</h1>
      <p>Design your security camera layout with our interactive floor plan tool. Place cameras, adjust lenses, and see coverage percentages in real time.</p>
    </div>
  </div>
   
  <div class="coverage-container">
    <div class="coverage-toolbar">
      <div class="coverage-group">
        <span class="coverage-group__label">1. Your space</span>
        <div class="seg" role="group" aria-label="Space type">
          <button type="button" class="seg__btn active" data-plan="house" aria-pressed="true">House</button>
          <button type="button" class="seg__btn" data-plan="storefront" aria-pressed="false">Storefront / Restaurant</button>
          <button type="button" class="seg__btn" data-plan="office" aria-pressed="false">Office</button>
          <button type="button" class="seg__btn" data-plan="warehouse" aria-pressed="false">Warehouse</button>
        </div>
      </div>
      <div class="coverage-group">
        <span class="coverage-group__label">2. Lens</span>
        <div class="seg" role="group" aria-label="Camera lens">
          <button type="button" class="seg__btn active" data-lens="wide" aria-pressed="true">Wide</button>
          <button type="button" class="seg__btn" data-lens="standard" aria-pressed="false">Standard</button>
          <button type="button" class="seg__btn" data-lens="long" aria-pressed="false">Long</button>
        </div>
      </div>
    </div>

    <div class="coverage-floorplan">
      <svg id="cov-stage" viewBox="0 0 1000 700" role="application" aria-label="Floor plan. Tap to drop a camera."></svg>
    </div>
    <p class="coverage-help">Tap the plan to drop a camera. Drag a camera to move it, drag its white dot to aim it. Pick a camera, then a lens, to change it. Keyboard: Tab to a camera, arrows move, Q / E rotate, Delete removes.</p>

    <div class="coverage-controls">
      <div class="coverage-stats">
        <div class="stat"><span class="stat-label">Cameras</span><span class="stat-value" id="camera-count" aria-live="polite">0</span></div>
        <div class="stat"><span class="stat-label">Rough coverage</span><span class="stat-value" id="coverage-percent" aria-live="polite">0%</span></div>
        <div class="stat"><span class="stat-label">Lens mix</span><span class="stat-value stat-value--sm" id="lens-mix" aria-live="polite">0 wide · 0 std · 0 long</span></div>
      </div>
      <div class="coverage-actions">
        <button type="button" class="btn btn-outline" id="undo-btn">Undo</button>
        <button type="button" class="btn btn-outline" id="clear-btn">Clear</button>
        <button type="button" class="btn btn-primary" id="send-layout-btn">Send my layout to Piets</button>
      </div>
    </div>
    <p class="coverage-note">This is a rough visual. We confirm exact placement on a free walkthrough or video call.</p>

    <div class="coverage-form-container" id="coverage-form-container" hidden>
      <form class="form coverage-form" data-cov-form action="/api/leads" method="post" novalidate>
        <input type="hidden" name="source" value="Coverage Planner">
        <input type="hidden" name="service" value="security-cameras">
        <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp">
        <h2>Send your layout to Piets</h2>
        <div class="two">
          <div class="field"><label for="coverage-name">Name *</label><input id="coverage-name" name="name" type="text" required autocomplete="name"></div>
          <div class="field"><label for="coverage-phone">Phone *</label><input id="coverage-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel"></div>
        </div>
        <div class="two">
          <div class="field"><label for="coverage-email">Email</label><input id="coverage-email" name="email" type="email" autocomplete="email"></div>
          <div class="field"><label for="coverage-town">Town / ZIP *</label><input id="coverage-town" name="town" type="text" required autocomplete="postal-code"></div>
        </div>
        <div class="field"><label for="coverage-message">Layout details</label><textarea id="coverage-message" name="message" rows="4"></textarea></div>
        <button class="btn btn-navy btn-block" type="submit">Send layout</button>
        <div class="form-msg" role="status" aria-live="polite"></div>
      </form>
    </div>
  </div>
</main>
${footer()}`;
 
   return head({ title, description, path: '/coverage.html', extraLd: ld, bodyClass: '', extraScripts: '<script src="/assets/js/coverage.js" defer></script>' }) + body;
}

/* ---------------- COMMERCIAL ---------------- */
function commercialPage() {
  const title = 'Commercial Technology Solutions | Piets Tech Solutions';
  const description = 'Custom technology solutions for businesses: security cameras, networking, cabling, access control, POS, and smart home systems. Free demos and tailored plans.';
  
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description: description, url: SITE.url + '/commercial.html' },
    breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Commercial', path: '/commercial.html' }])
  ];
  
  const body = `${banner()}
${nav('commercial')}
<main id="main">
  <div class="page-head">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span>/</span><strong>Commercial Solutions</strong>
      </nav>
      <h1>Commercial Technology Solutions</h1>
      <p>Cameras, networking, cabling, access control, POS and phones for restaurants, offices, retail, warehouses and multi-family buildings — designed, installed and supported by one local partner.</p>
    </div>
  </div>
  
  <!-- Who it is for -->
  <section class="section" id="who-it-is-for">
    <div class="wrap">
      <div class="section-head">
        <div class="eyebrow">Who we serve</div>
        <h2>Built around how your business runs</h2>
      </div>
      <div class="who-we-serve-grid">
        <div class="serve-card"><h3>Restaurants &amp; ghost kitchens</h3><p>POS and payment terminals, kitchen printers, digital menu boards, cameras and Wi-Fi that hold up through the rush.</p></div>
        <div class="serve-card"><h3>Dental &amp; medical offices</h3><p>Segmented office networks, cameras for entrances and common areas, access control and business phones.</p></div>
        <div class="serve-card"><h3>Auto &amp; mechanic shops</h3><p>Cameras over bays and lots, Wi-Fi for the office and waiting room, and phones that ring where you are.</p></div>
        <div class="serve-card"><h3>Convenience stores, bodegas &amp; liquor stores</h3><p>Cameras over registers, doors and aisles, POS and card terminals, and remote viewing from your phone.</p></div>
        <div class="serve-card"><h3>Offices &amp; retail</h3><p>Structured cabling, network upgrades, access control, phone systems and IT support.</p></div>
        <div class="serve-card"><h3>Multi-family &amp; property managers</h3><p>Video intercoms, access control, cameras for lobbies and hallways, and Wi-Fi for common areas.</p></div>
        <div class="serve-card"><h3>Builders &amp; general contractors</h3><p>Your low-voltage partner on new builds and renovations: pre-wire, cabling, cameras and access control.</p></div>
        <div class="serve-card"><h3>Warehouses &amp; industrial</h3><p>Camera coverage for large spaces, networking across the building and access control for secure areas.</p></div>
      </div>
    </div>
  </section>
  
  <!-- Scope list -->
  <section class="section section-soft" id="scope">
    <div class="wrap">
      <div class="section-head">
        <div class="eyebrow">Commercial services</div>
        <h2>One partner for every system</h2>
      </div>
      <div class="scope-grid">
        <div class="scope-item">
          <div class="scope-icon">${icon('CAM')}</div>
          <h3>Security Camera Systems</h3>
          <p>InVid Tech Paramont IP camera systems with 4K resolution, night vision, and remote viewing capabilities. Designed for indoor and outdoor commercial environments.</p>
        </div>
        <div class="scope-item">
          <div class="scope-icon">${icon('WIFI')}</div>
          <h3>Networking & Wi-Fi</h3>
          <p>Business-grade access points, proper routing and switching, and enterprise Wi-Fi solutions that eliminate dead zones and provide seamless coverage.</p>
        </div>
        <div class="scope-item">
          <div class="scope-icon">${icon('CAT6')}</div>
          <h3>Structured Cabling</h3>
          <p>Professional Cat6/Cat6A and fiber optic cabling installations, labeled and tested, for new construction, renovations, and retrofits.</p>
        </div>
        <div class="scope-item">
          <div class="scope-icon">${icon('KEY')}</div>
          <h3>Access Control & Intercoms</h3>
          <p>Keypad entry systems, fob-based credentials, mobile access, and video intercoms for controlling access to commercial properties.</p>
        </div>
        <div class="scope-item">
          <div class="scope-icon">${icon('POS')}</div>
          <h3>POS & Merchant Solutions</h3>
          <p>Restaurant and retail point-of-sale systems, payment terminals, kitchen printers, and the network infrastructure to support them.</p>
        </div>
        <div class="scope-item">
          <div class="scope-icon">${icon('VOIP')}</div>
          <h3>Business Phones (VoIP)</h3>
          <p>Auto-attendants, call routing, mobile apps and voicemail-to-email, so customers always reach you.</p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- 5-step project flow -->
  <section class="section" id="project-flow">
    <div class="wrap">
      <div class="section-head">
        <div class="eyebrow">Our process</div>
        <h2>How we work with commercial clients</h2>
      </div>
      <div class="flow-steps">
        <div class="flow-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Free Consultation</h3>
            <p>We start with a free on-site or video consultation to understand your business needs, current technology, and goals for improvement.</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Custom Design</h3>
            <p>We put together a tailored plan and a written quote built around your space, budget and timeline.</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Professional Installation</h3>
            <p>We install with clean, labeled wiring and schedule the work to keep disruption to your business low.</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>Training & Documentation</h3>
            <p>We walk your staff through the new systems and leave you documentation for what was installed.</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>Ongoing Support</h3>
            <p>Questions? We're here 24/7. Optional managed plans add remote monitoring and regular checkups.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- FAQ -->
  ${faqBlock([
        { q: 'Do you work with businesses outside of Long Island?', a: 'Yes. While we\'re based in Suffolk County and serve the New York metro area, we handle larger commercial projects anywhere in the US on request.' },
        { q: 'Can you provide references from other commercial clients?', a: 'Yes. References are available on request.' },
        { q: 'Do you offer ongoing maintenance and support?', a: "Yes. Questions? We're here 24/7, and our managed plans add remote monitoring, priority support and regular maintenance." },
        { q: 'How long does a typical commercial installation take?', a: 'Timeline varies based on project scope. We provide detailed timelines during the consultation phase and work to minimize disruption to your business operations.' },
        { q: 'Do you handle permits and approvals for commercial installations?', a: 'We coordinate with property managers and building owners, and we\'ll tell you up front if your project is likely to need a permit or landlord approval so nothing surprises you.' }
      ], { heading: 'Commercial technology questions', eyebrow: 'Common questions' })}

  
   <!-- Planner -->
   ${plannerSection(planner({source:'Planner - commercial', heading:'Plan your commercial project', id:'commercial-quote'}))}
</main>
${footer()}`;
  
    return head({ title, description, path: '/commercial.html', extraLd: ld, bodyClass: '', extraScripts: '<script src="/assets/js/planner.js" defer></script>' }) + body;
}

/* ---------------- PLANS ---------------- */
function remotePage() {
  const title = 'Remote Support | Piets Technology Solutions';
  const description = 'Secure RustDesk screen-share sessions for fast IT help anywhere. We never connect without your permission.';
  const ld = [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Remote Support', path: '/remote-support.html' }])];

  const body = `${banner()}
${nav('remote-support')}
<main id="main">
<div class="page-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span><strong>Remote Support</strong>
    </nav>
    <h1>Remote Support</h1>
    <p>Get fast IT help anywhere with secure RustDesk screen-share sessions. We never connect without your explicit permission.</p>
  </div>
</div>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">How it works</div>
      <h2>Simple, secure, permission-based support</h2>
    </div>
    <ol class="steps">
      <li>
        <h3>Call or text us</h3>
        <p>Reach out at 631-871-5957 and let us know you need remote support.</p>
      </li>
      <li>
        <h3>Download RustDesk</h3>
        <p>Get it free at <a href="https://rustdesk.com/" target="_blank" rel="noopener">rustdesk.com</a>, then open it.</p>
      </li>
      <li>
        <h3>Read us your RustDesk ID</h3>
        <p>We connect only with your permission.</p>
      </li>
      <li>
        <h3>We fix it together</h3>
        <p>You watch everything we do on screen as we resolve software issues, printer problems, email setup, and more.</p>
      </li>
      <li>
        <h3>Session ends when you say</h3>
        <p>You're in control — close RustDesk anytime to end the session.</p>
      </li>
    </ol>
  </div>
</section>

<section class="section section-soft">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">Security & privacy</div>
      <h2>Your permission is required every time</h2>
    </div>
    <div class="trust">
      <div class="wrap">
        <ul>
          <li>No account or installation required</li>
          <li>One-time, secure connection codes</li>
          <li>We never connect without your explicit permission</li>
          <li>You see everything we do on your screen</li>
          <li>End-to-end encrypted RustDesk connection</li>
          <li>Session ends when you close the application</li>
        </ul>
      </div>
    </div>
    <p class="security-note"><strong>Important:</strong> Piets Technology Solutions will never initiate a remote connection without your explicit, verbal permission. If you receive an unsolicited request claiming to be from us, do not connect and call us directly at 631-871-5957 to verify.</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">What we can help with</div>
      <h2>Common remote support issues</h2>
    </div>
    <div class="grid grid-3">
      <div class="support-card">
        <h3>Software fixes</h3>
        <p>Slow computers, application errors, email issues, Microsoft 365/Google Workspace problems.</p>
      </div>
      <div class="support-card">
        <h3>Printer & peripheral setup</h3>
        <p>Printer installation, wireless printing, scanner setup, device driver updates.</p>
      </div>
      <div class="support-card">
        <h3>Network troubleshooting</h3>
        <p>Wi-Fi connectivity issues, router configuration, network diagnostics, ISP coordination.</p>
      </div>
      <div class="support-card">
        <h3>Email & communication</h3>
        <p>Email client setup, email delivery issues, spam filtering, video conferencing problems.</p>
      </div>
      <div class="support-card">
        <h3>Updates & maintenance</h3>
        <p>Operating system updates, security patches, software upgrades, backup verification.</p>
      </div>
      <div class="support-card">
        <h3>Camera system checks</h3>
        <p>InVid Tech Paramont camera system status, recording verification, remote viewing setup, motion detection testing.</p>
      </div>
    </div>
  </div>
</section>

${quoteForm({source:'Remote Support - remote-support', id:'remote-support'})}
</main>
${footer()}`;

   return head({ title, description, path: '/remote-support.html', extraLd: ld, bodyClass: '' }) + body;
}

/* ---------------- 404 ---------------- */
function notFoundPage() {
  const body = `${banner()}
${nav('')}
<main id="main">
  <section class="page-head page-head--404">
    <div class="wrap">
      <div class="eyebrow">Error 404</div>
      <h1>That page isn't here.</h1>
      <p>The link may be old or mistyped. Try one of these, or call or text ${SITE.phone}. Questions? We're here 24/7.</p>
      <div class="btn-row">
        <a href="/" class="btn btn-primary btn-lg">Go to the home page</a>
        <a href="/services" class="btn btn-ghost btn-lg">See services</a>
        <a href="/plan" class="btn btn-ghost btn-lg">Get a quote</a>
      </div>
    </div>
  </section>
</main>
${footer()}`;
  return head({ title: 'Page not found | Piets Technology Solutions', description: 'This page could not be found.', path: '/404', bodyClass: '' }).replace('<head>', '<head>\n<meta name="robots" content="noindex">') + body;
}

function aboutPage() {
  const title = 'About Us | Owner-Operated Tech Support | Piets Tech';
  const description = 'Owner-operated and based in Suffolk County — you deal directly with the installer. Licensed & insured, free demos, references available, 24/7 support.';
  const ld = [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about.html' }])];

  const body = `${banner()}
${nav('about')}
<main id="main">
<div class="page-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span><strong>About Us</strong>
    </nav>
    <h1>About Piets Technology Solutions</h1>
    <p>Owner-operated technology company providing reliable, personalized service across Long Island, New York City, the Hudson Valley and the Capital Region.</p>
  </div>
</div>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">How we work</div>
      <h2>Personalized, owner-operated service</h2>
    </div>
    <div class="trust">
      <div class="wrap">
        <ul>
          <li>Owner-operated: you deal directly with the installer</li>
          <li>Free demos — in person or by video call</li>
          <li>References available on request</li>
          <li>Licensed &amp; insured</li>
          <li>Every quote tailored to your specific needs</li>
          <li>24/7 support by phone or text</li>
          <li>No required monthly cloud fees for camera systems</li>
        </ul>
      </div>
    </div>
    <p>When you work with Piets Technology Solutions, you're dealing directly with the person who quotes, installs, and supports your technology systems. No salespeople — the person who quotes your job installs it.</p>
  </div>
</section>

<section class="section section-soft">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">Our service area</div>
      <h2>Where we provide on-site support</h2>
    </div>
    <div class="areas-grid">
      ${LOCATIONS.map(loc => `
        <div class="area-card">
          <h3>${loc.name}</h3>
          <p>${loc.short}</p>
        </div>
      `).join('')}
    </div>
    <p class="areas-note">Larger commercial projects anywhere in the US on request • Remote support anywhere</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">Get started</div>
      <h2>Ready to talk about your project?</h2>
    </div>
    <p>We offer free demos to show you exactly what we can do for your home or business. See our systems in action, get a straight answer, and receive a tailored quote — all with no obligation.</p>
    ${quoteForm({source:'About - about', id:'about'})}
  </div>
</section>
</main>
${footer()}`;

   return head({ title, description, path: '/about.html', extraLd: ld, bodyClass: '' }) + body;
}

function plansPage() {
  const title = 'Managed Services Plans | Piets Technology Solutions';
  const description = 'Optional managed services plans for cameras and networks. Basic, Pro and Business tiers with remote monitoring and priority support. No contract required.';
  
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description: description, url: SITE.url + '/plans.html' },
    breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Plans', path: '/plans.html' }])
  ];
  
  const body = `${banner()}
${nav('plans')}
<main id="main">
  <div class="page-head">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span>/</span><strong>Managed Services Plans</strong>
      </nav>
      <h1>Managed Services Plans</h1>
      <p>Keep your technology systems running smoothly with our monthly managed services plans. Choose from Basic, Pro, or Business tiers, each designed to provide proactive monitoring, priority support, and regular maintenance.</p>
    </div>
  </div>
  
  <!-- 3 tier cards -->
  <section class="section" id="plans-tier">
    <div class="wrap">
      <div class="section-head">
        <div class="eyebrow">Choose your plan</div>
        <h2>Managed services tiers</h2>
      </div>
      <div class="plans-grid">
        <!-- Basic Plan -->
        <div class="plan-card">
          <div class="plan-header">
            <h3>Basic</h3>
            <p class="plan-tag">Essential monitoring</p>
          </div>
          <div class="plan-body">
            <ul class="plan-features">
              <li>Remote monitoring of networks & cameras</li>
              <li>Monthly camera health checks</li>
              <li>Remote support during business hours</li>
              <li>Discounted on-site rates</li>
            </ul>
            <div class="plan-cta">
              <a href="/plan.html?service=managed-services" class="btn btn-outline">Ask for pricing</a>
            </div>
          </div>
        </div>
        
        <!-- Pro Plan (Most Popular) -->
        <div class="plan-card popular">
          <div class="plan-header">
            <h3>Pro</h3>
            <p class="plan-tag">Most Popular</p>
          </div>
          <div class="plan-body">
            <ul class="plan-features">
              <li>Everything in Basic</li>
              <li>Priority response 7 days a week</li>
              <li>Quarterly on-site checkups</li>
              <li>Patching, backups & security updates</li>
              <li>Vendor coordination (ISP, POS, phones)</li>
            </ul>
            <div class="plan-cta">
              <a href="/plan.html?service=managed-services" class="btn btn-navy">Ask for pricing</a>
            </div>
          </div>
        </div>
        
        <!-- Business Plan -->
        <div class="plan-card">
          <div class="plan-header">
            <h3>Business</h3>
            <p class="plan-tag">Comprehensive</p>
          </div>
          <div class="plan-body">
            <ul class="plan-features">
              <li>Everything in Pro</li>
              <li>24/7 priority support line</li>
              <li>Monthly on-site visits</li>
              <li>Camera, access control & phone system management</li>
              <li>Custom SLA and reporting</li>
            </ul>
            <div class="plan-cta">
              <a href="/plan.html?service=managed-services" class="btn btn-outline">Ask for pricing</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Plan FAQ -->
  ${faqBlock([
        { q: 'What is the difference between the plan tiers?', a: 'The Basic plan includes essential monitoring and remote support during business hours. The Pro plan adds priority response, quarterly checkups, and system maintenance. The Business plan includes 24/7 priority support, monthly on-site visits, and comprehensive system management.' },
        { q: 'Are there long-term contracts required?', a: 'No. Plans are optional, and no contract is required to get service. Every plan is quoted to your site — ask us for the details.' },
        { q: 'Can I customize a plan for my specific needs?', a: 'Absolutely. While we offer three standard tiers, we can tailor a managed services plan to fit your specific technology environment and business requirements.' },
        { q: 'How do I know which plan is right for my business?', a: 'During your free consultation, we\'ll assess your current technology systems, business needs, and budget to recommend the most appropriate plan tier for your situation.' },
        { q: 'What happens if I need support outside of covered hours?', a: "Questions? We're here 24/7 by phone or text. Pro adds priority response 7 days a week; Business adds a 24/7 priority line." }
      ], { heading: 'Managed services FAQ', eyebrow: 'Plan questions' })}

  
  <!-- Planner -->
  ${plannerSection(planner({source:'Planner - plans', heading:'Find the right plan in 4 quick steps', id:'plans-quote'}))}
</main>
${footer()}`;
  
   return head({ title, description, path: '/plans.html', extraLd: ld, bodyClass: '' }) + body;
}


/* ---------------- CLIENT LOGIN (Field HQ) ---------------- */
function portalPage() {
  const title = 'Client Login | Field HQ Client Portal | Piets Tech';
  const description = 'Sign in to your Piets client portal (Field HQ) to approve quotes, see visits, photos and invoices, and message Piets. Take the demo tour.';
  const base = SITE.fieldhqUrl || '';
  const q = SITE.fieldhqTenant ? `?t=${encodeURIComponent(SITE.fieldhqTenant)}` : '';
  const login = base ? `${base}/login${q}` : '#tour';
  const loginLabel = base ? 'Sign in' : 'Take the demo tour';
  const demoQ = SITE.fieldhqTenant ? `&t=${encodeURIComponent(SITE.fieldhqTenant)}` : '';
  const live = (SITE.fieldhqDemo && base) ? `
    <div class="btn-row" style="margin-top:18px">
      <a class="btn btn-primary" href="${base}/api/auth/demo?role=client${demoQ}">Live app: client view</a>
      <a class="btn btn-navy" href="${base}/api/auth/demo?role=admin${demoQ}">Live app: owner view</a>
    </div>` : '';
  const ld = [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Client Login', path: '/portal' }])];
  const body = `${banner()}
${nav('portal')}
<main id="main">
${pageHead({ crumbs: [{ name: 'Home', path: '/' }, { name: 'Client Login', path: '/portal' }], eyebrow: 'Field HQ client portal', h1: 'Client login', intro: `Your quotes, visits, photos, invoices and messages in one place. ${esc(SITE.clientLine)}` })}
<section class="section">
  <div class="wrap">
    <div class="card-grid">
      <article class="card">
        <div class="eyebrow">Clients</div>
        <h3>Your client portal</h3>
        <p>Approve your quote, follow your job, see visits and photos, view invoices and message Piets.</p>
        <p style="margin-top:18px"><a class="btn btn-primary" href="${login}">${loginLabel}</a></p>
        <p style="margin-top:10px;font-size:.9rem;color:var(--muted)">Use the secure link we text or email you. No passwords.</p>
      </article>
      <article class="card">
        <div class="eyebrow">Team</div>
        <h3>Piets team sign-in</h3>
        <p>Schedule, jobs board, quotes, invoices and client messages for the Piets team.</p>
        <p style="margin-top:18px"><a class="btn btn-navy" href="${base ? login : '#tour'}">${base ? 'Team sign-in' : 'See the team view'}</a></p>
      </article>
      <article class="card">
        <div class="eyebrow">New here?</div>
        <h3>Not a client yet</h3>
        <p>Tell us about your project. Free on-site or video demo. Every quote is tailored to your place.</p>
        <p style="margin-top:18px"><a class="btn btn-outline" href="/plan.html">Get a free quote</a></p>
      </article>
    </div>${live}
  </div>
</section>
<section class="section section-soft" id="tour">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">Demo tour · sample data</div><h2>Click around the portal</h2><p>Switch between the client view and the Piets team view. Approve the sample quote, send a message, move a job. Nothing here is saved or sent.</p></div>
    <div class="fhq" id="fhqDemo">
      <div class="fhq__top"><span class="fhq__brand"><i></i>PIETS <small>FIELD HQ</small></span><div class="fhq__role" role="group" aria-label="View"><button type="button" data-role="client" aria-pressed="true">Client view</button><button type="button" data-role="team" aria-pressed="false">Team view</button></div></div>
      <div class="fhq__body"><nav class="fhq__nav" aria-label="Portal pages"></nav><div class="fhq__main" aria-live="polite"></div></div>
      <div class="fhq__note">Sample screens. Names, jobs and messages are made up. Real quotes show your exact gear, labor and price.</div>
    </div>
    <div class="fhq-cta"><a class="btn btn-primary" href="/plan.html">Get a quote and your own portal</a><a class="btn btn-outline" href="/piet-box">See the Piet Box</a></div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">For business owners</div><h2>Run your own business on Field HQ</h2><p>The same app Piets uses: quotes, scheduling, a jobs board, invoices and a client portal, set up for your trade. Ask us about it, or start with a free website demo that already sends leads into it.</p></div>
    <div class="btn-row"><a class="btn btn-navy" href="/websites">Build a free website demo</a><a class="btn btn-outline" href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a></div>
    <p style="margin-top:24px;color:var(--muted)">Paying an invoice: Zelle, Venmo, Cash App, cash or check at no extra charge. Card by secure payment link (4% processing fee). Need help signing in? Call or text ${SITE.phone}.</p>
  </div>
</section>
</main>
${footer()}`;
  return head({ title, description, path: '/portal', extraLd: ld, bodyClass: '', extraScripts: '<link rel="stylesheet" href="/assets/fieldhq/portal-demo.css"><script src="/assets/fieldhq/portal-demo.js" defer></script>' }) + body;
}

export function buildPages(pub) {
  const out = [];
  out.push(write(pub, 'index.html', homePage()));
  out.push(write(pub, 'services.html', servicesPage()));
  out.push(write(pub, 'plan.html', planPage()));
  out.push(write(pub, 'coverage.html', coveragePage()));
  out.push(write(pub, 'commercial.html', commercialPage()));
  out.push(write(pub, 'plans.html', plansPage()));
  out.push(write(pub, 'remote-support.html', remotePage()));
  out.push(write(pub, 'about.html', aboutPage()));
  out.push(write(pub, '404.html', notFoundPage()));
  if (SITE.portalLive) out.push(write(pub, 'portal.html', portalPage()));
  out.push(write(pub, 'locations/index.html', locationsIndex()));
  for (const loc of LOCATIONS) out.push(write(pub, `locations/${loc.slug}.html`, locationPage(loc)));
  return out;
}
