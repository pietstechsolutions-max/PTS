// Generates index.html, services.html and locations/*.html into public/.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { SITE, SERVICES, LOCATIONS, esc, head, banner, nav, footer, quoteForm, faqBlock, faqLd, breadcrumbLd, orgLd, localBusinessLd, pageHead } from './site.js';

const write = (pub, rel, html) => { const f = join(pub, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); return rel; };

/* ---------------- HOME ---------------- */
const HOME_FAQ = [
  { q: 'Do you really answer 24/7?', a: "Yes. Call or text 631-871-5957 any time. Emergencies get handled right away; routine requests get a fast callback. Questions? We're here 24/7." },
  { q: 'Is the demo really free?', a: 'Yes. We can walk you through a camera system, Wi-Fi upgrade or POS setup in person or on a video call, with no obligation. We also share references from similar jobs.' },
  { q: 'Which areas do you cover?', a: 'Suffolk and Nassau County on Long Island, all five NYC boroughs, the Hudson Valley (Westchester, Putnam, Dutchess, Orange) and the Johnstown / Capital Region. Remote support is available anywhere.' },
  { q: 'What camera brand do you install?', a: 'We install InVid Tech Paramont series IP cameras and recorders: 4K resolution, excellent night vision, remote viewing from your phone, and no required monthly cloud fees.' },
  { q: 'Do I need a monthly plan?', a: 'No. Every install comes with a warranty and support. Monthly managed plans are optional for people who want remote monitoring, priority response and regular camera health checks.' },
];

function homePage() {
  const title = 'Security Cameras, IT & Wi-Fi Support | Piets Tech Solutions';
  const description = 'Security cameras, IT support, Wi-Fi, cabling, smart home, POS and 24/7 tech support across Long Island, NYC, Hudson Valley & Capital Region. Free demos.';
  const ld = [orgLd(), localBusinessLd({ areaServed: ['Suffolk County, NY', 'Nassau County, NY', 'New York City, NY', 'Westchester County, NY', 'Putnam County, NY', 'Dutchess County, NY', 'Orange County, NY', 'Johnstown, NY', 'Albany, NY', 'Saratoga Springs, NY'] }), faqLd(HOME_FAQ),
    { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url }];

  const serviceCards = SERVICES.map(s => `<article class="card"><div class="icon" aria-hidden="true">${s.icon}</div><h3>${esc(s.name)}</h3><p>${esc(s.pitch)}</p><a class="more" href="/services.html#${s.id}">Learn more →</a></article>`).join('\n      ');

  const plans = [
    { key: 'basic', name: 'Basic', tag: '', note: 'For homes and small offices that want someone watching the basics.', items: ['Remote monitoring of your network & cameras', 'Monthly camera health check', 'Remote support during business hours', 'Discounted on-site rates'] },
    { key: 'pro', name: 'Pro', tag: 'Most popular', note: 'For busy small businesses that can’t afford downtime.', items: ['Everything in Basic', 'Priority response, 7 days a week', 'Quarterly on-site checkup', 'Patching, backups & security updates', 'Vendor coordination (ISP, POS, phones)'] },
    { key: 'business', name: 'Business', tag: '', note: 'For multi-location or high-traffic operations.', items: ['Everything in Pro', '24/7 priority support line', 'Monthly on-site visit', 'Camera, access control & phone system management', 'Custom SLA and reporting'] },
  ].map(p => `<div class="plan${p.key === 'pro' ? ' featured' : ''}" data-plan="${p.key}">${p.tag ? `<span class="tag">${p.tag}</span>` : ''}<h3>${p.name}</h3>
        <div class="price">from $<span data-plan-price="${p.key}">__</span><small>/mo</small></div>
        <p class="note">${p.note}</p>
        <ul>${p.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <a class="btn ${p.key === 'pro' ? 'btn-navy' : 'btn-outline'}" href="#quote" data-plan-cta="${p.key}">Ask about ${p.name}</a></div>`).join('\n      ');

  const areas = LOCATIONS.map(l => `<a class="area" href="/locations/${l.slug}.html"><strong>${esc(l.name)}</strong><span>${esc(l.short)}</span></a>`).join('\n      ');

  const testimonials = [1, 2, 3].map(i => `<figure class="quote"><div class="stars" aria-hidden="true">★★★★★</div><blockquote><p>[Client testimonial ${i} — replace with a real, permissioned review.]</p></blockquote><figcaption><footer>[Client name], [Town] — [Service] <span class="placeholder">Placeholder</span></footer></figcaption></figure>`).join('\n      ');

  const body = `${banner()}
${nav('home')}
<main id="main">
<section class="hero">
  <div class="wrap">
    <span class="kicker">${esc(SITE.clientLine)}</span>
    <h1>Cameras, Wi-Fi, Cabling &amp; IT Support — <em>Done Right</em>, Locally.</h1>
    <p class="lead">${esc(SITE.name)} installs and supports the tech that keeps your home and business running: InVid Tech Paramont security cameras, dead-zone-free Wi-Fi, clean cabling, POS, phones and smart home automation. Straight answers, free demos, references on request.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a>
      <a class="btn btn-light" href="sms:${SITE.phoneE164}">Text us</a>
      <a class="btn btn-light" href="#quote">Get a free quote</a>
    </div>
  </div>
</section>
<div class="trust"><div class="wrap"><ul>
  <li>24/7 tech support</li>
  <li>Licensed &amp; insured</li>
  <li>Free demos — in person or video call</li>
  <li>References available</li>
  <li>Solutions tailored to you</li>
</ul></div></div>

<section class="section" id="services">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">What we do</div><h2>One call for all your low-voltage tech</h2><p>From a single camera to a full restaurant build-out. If it has a wire or a Wi-Fi signal, we handle it.</p></div>
    <div class="grid">
      ${serviceCards}
    </div>
    <div class="btn-row"><a class="btn btn-navy" href="/services.html">See all services</a><a class="btn btn-outline" href="#quote">Get a free quote</a></div>
  </div>
</section>

<section class="section section-soft" id="how-it-works">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">How it works</div><h2>Three steps. No runaround.</h2></div>
    <div class="steps">
      <div class="step"><h3>Tell us what’s going on</h3><p>Call, text or send the form. We’ll ask a few quick questions and set up a free demo or walkthrough — in person or on a video call.</p></div>
      <div class="step"><h3>Get a clear, tailored plan</h3><p>You get a straight quote with the exact gear and labor, plus references from similar jobs. No upsell, no mystery line items.</p></div>
      <div class="step"><h3>We install, you relax</h3><p>Clean install, everything tested and labeled, and a walkthrough so you know how to use it. Then we’re a call away, 24/7.</p></div>
    </div>
  </div>
</section>

<section class="section section-navy" id="plans">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">Managed services</div><h2>Monthly plans that catch problems before you do</h2><p>Remote monitoring, priority support and camera health checks for one flat monthly fee. Pick the level that fits, cancel any time.</p></div>
    <div class="plans">
      ${plans}
    </div>
  </div>
</section>

<section class="section" id="service-area">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">Service area</div><h2>Based in Suffolk County. Serving New York.</h2><p>On-site across Long Island, NYC, the Hudson Valley and the Johnstown / Capital Region. Remote support anywhere.</p></div>
    <div class="areas">
      ${areas}
    </div>
  </div>
</section>

<section class="section section-soft" id="testimonials">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">What clients say</div><h2>References available on request</h2><p>Ask us for references from jobs like yours — we’re happy to connect you.</p></div>
    <div class="grid grid-3">
      ${testimonials}
    </div>
  </div>
</section>

${faqBlock(HOME_FAQ)}

${quoteForm({ source: 'home' })}
</main>
${footer()}`;

  return head({ title, description, path: '/', extraLd: ld }) + body;
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
  const description = 'Paramont security cameras, IT support, Wi-Fi upgrades, structured cabling, smart home, POS, IP phones, access control and 24/7 support. Free demos.';
  const ld = [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services.html' }]),
    ...SERVICES.map(s => ({ '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.pitch, url: SITE.url + '/services.html#' + s.id, serviceType: s.name,
      provider: { '@type': 'LocalBusiness', name: SITE.name, telephone: SITE.phoneE164, url: SITE.url },
      areaServed: LOCATIONS.map(l => ({ '@type': 'Place', name: l.region })) }))];
  const subnav = `<nav class="subnav" aria-label="Services"><div class="wrap"><ul>${SERVICES.map(s => `<li><a href="#${s.id}">${esc(s.short)}</a></li>`).join('')}</ul></div></nav>`;
  const sections = SERVICES.map(s => { const d = SERVICE_DETAIL[s.id]; return `<section class="service" id="${s.id}">
  <div class="wrap inner">
    <div>
      <div class="eyebrow">${esc(s.short)}</div>
      <h2>${esc(s.name)}</h2>
      <p>${esc(s.pitch)}</p>
      <ul>${d.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      <div class="btn-row"><a class="btn btn-navy" href="#quote">Get a free quote</a><a class="btn btn-outline" href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a></div>
    </div>
    <aside class="cta-box"><h3>${esc(d.cta)}</h3><p>${esc(d.ctaText)}</p><a class="btn btn-primary" href="sms:${SITE.phoneE164}">Text ${SITE.phone}</a></aside>
  </div>
</section>`; }).join('\n');

  const body = `${banner()}
${nav('services')}
<main id="main">
${pageHead({ crumbs: [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services.html' }], h1: 'Services', intro: 'Everything low-voltage, from one local team. Every service comes with a free demo, references and a solution tailored to your space.' })}
${subnav}
${sections}
${quoteForm({ source: 'services' })}
</main>
${footer()}`;
  return head({ title, description, path: '/services.html', extraLd: ld }) + body;
}

/* ---------------- LOCATIONS ---------------- */
const LOC_COPY = {
  'long-island': {
    title: 'Security Cameras & IT Support Long Island | Suffolk & Nassau',
    description: 'Security camera installation, IT support, Wi-Fi upgrades, cabling and POS across Suffolk and Nassau County. Free demos, 24/7 support. Call 631-871-5957.',
    h1: 'Security Cameras, IT Support &amp; Wi-Fi on Long Island',
    intro: 'Piets Technology Solutions is based right here in Suffolk County. From Huntington to Riverhead and across Nassau, we install Paramont camera systems, fix Wi-Fi dead zones, run clean cabling and support small businesses 24/7.',
    para: 'Long Island homes and businesses have their own tech challenges: big split-levels with Wi-Fi that dies upstairs, waterfront properties that need weatherproof cameras, strip-mall restaurants that need POS and menu boards running through the dinner rush. We live and work here, so response is fast and pricing is local. Whether you’re a homeowner in Smithtown, a deli in Bay Shore or an office in Hauppauge, you get the same thing: a free demo, a straight quote and a clean install.',
    faq: [
      { q: 'How fast can you get to me on Long Island?', a: 'Same-day or next-day in most of Suffolk County and western Nassau. Emergencies (cameras down, network outage, POS not working) get priority any day of the week.' },
      { q: 'Do you install cameras in Suffolk County homes?', a: 'Yes. Most Long Island homes need 4 to 8 InVid Tech Paramont cameras covering the driveway, front door, backyard and side yards. We’ll walk the property and show you a live demo first.' },
      { q: 'Can you fix Wi-Fi in a large Long Island house?', a: 'That’s one of our most common jobs. We survey the house, wire access points where they belong and eliminate dead zones in the basement, upstairs bedrooms and the backyard.' },
      { q: 'Do you support restaurants and delis?', a: 'Absolutely. POS, kitchen printers, TV menu boards, cameras, phones and Wi-Fi for staff and guests. We understand you can’t be down during a rush.' },
    ] },
  'nyc': {
    title: 'Security Cameras & IT Support NYC | All Five Boroughs',
    description: 'Security cameras, IT support, networking, cabling, POS and access control in Manhattan, Brooklyn, Queens, the Bronx & Staten Island. Free demos, 24/7.',
    h1: 'Security Cameras, IT &amp; Networking in New York City',
    intro: 'Piets Technology Solutions serves all five boroughs with InVid Tech Paramont camera systems, access control, business Wi-Fi, structured cabling, POS and 24/7 support for storefronts, offices, restaurants and multi-family buildings.',
    para: 'City jobs need a crew that respects building rules, tight schedules and tighter spaces. We work with property managers and small business owners across Manhattan, Brooklyn, Queens, the Bronx and Staten Island: cameras and video intercoms for walk-ups and lobbies, access control for offices, POS and menu boards for restaurants, and networks that hold up in dense buildings full of interference. Free video-call demos make it easy to plan before we ever set foot on site.',
    faq: [
      { q: 'Do you install cameras in NYC apartment buildings?', a: 'Yes. Paramont cameras and NVRs for lobbies, hallways, entrances, roofs and basements, plus video intercoms and access control so residents and managers can see and control entry from a phone.' },
      { q: 'Can you work around building management requirements?', a: 'Yes. We provide certificates of insurance, coordinate with supers and management, and schedule around building rules and quiet hours.' },
      { q: 'Do you support NYC restaurants and ghost kitchens?', a: 'Yes. POS, kitchen printers, order tablets, menu boards, cameras and reliable Wi-Fi. We’ve set up delivery-only kitchens that need to be taking orders on day one.' },
      { q: 'Is remote support available in NYC?', a: 'Yes. Most software, email, printer and network issues are solved remotely via RustDesk in under an hour, so you don’t wait for a truck.' },
    ] },
  'hudson-valley': {
    title: 'Security Cameras & IT Support Hudson Valley | Westchester+',
    description: 'Camera installation, Wi-Fi upgrades, cabling, smart home and IT support in Westchester, Putnam, Dutchess and Orange County. Free demos, 24/7 support.',
    h1: 'Security Cameras, Wi-Fi &amp; IT Support in the Hudson Valley',
    intro: 'From White Plains to Poughkeepsie and Newburgh, Piets Technology Solutions brings Paramont security cameras, whole-home Wi-Fi, structured cabling, Home Assistant smart home automation and small business IT to the Hudson Valley.',
    para: 'Hudson Valley properties are bigger, older and more spread out: stone walls that kill Wi-Fi, long driveways that need cameras with real range, barns and detached garages that need fiber or point-to-point links. We plan for all of it. For businesses in Westchester, Putnam, Dutchess and Orange County, we deliver the same POS, phones, cabling and managed support we provide on Long Island, with free demos on a video call so planning is easy.',
    faq: [
      { q: 'Do you cover Westchester and Putnam County?', a: 'Yes. Westchester, Putnam, Dutchess and Orange County are all in our regular service area, with on-site visits scheduled in efficient routes to keep travel costs low.' },
      { q: 'Can you get Wi-Fi to a detached garage or barn?', a: 'Yes. Depending on distance we run fiber, direct-burial Cat6 or a wireless point-to-point bridge, then add an access point in the outbuilding.' },
      { q: 'Do you do smart home installs in the Hudson Valley?', a: 'Yes. Home Assistant automation for lighting, shades, thermostats, locks, cameras and gates, running locally on your own hardware with no required subscriptions.' },
      { q: 'What about long driveways and gates?', a: 'Paramont cameras with long-range night vision and license plate capture, plus gate intercoms and access control you manage from your phone.' },
    ] },
  'johnstown-capital-region': {
    title: 'Security Cameras & IT Support Johnstown NY | Capital Region',
    description: 'Security cameras, IT support, Wi-Fi, cabling and POS in Johnstown, Gloversville, Amsterdam, Albany and Saratoga Springs. Free demos, 24/7 support.',
    h1: 'Security Cameras &amp; IT Support in Johnstown, Gloversville, Amsterdam, Albany &amp; Saratoga',
    intro: 'Piets Technology Solutions serves Fulton and Montgomery County and the greater Capital Region with InVid Tech Paramont camera systems, business Wi-Fi, structured cabling, POS, IP phones and 24/7 tech support.',
    para: 'Johnstown, Gloversville and Amsterdam businesses deserve the same tier of tech as Albany and Saratoga Springs. We bring it: camera systems for shops, farms and warehouses; Wi-Fi and cabling for offices, schools and churches; POS and menu boards for restaurants; and managed support so a small team never has to worry about IT. Remote support and video-call demos mean you get fast answers even when we’re not on site.',
    faq: [
      { q: 'Do you really come to Johnstown and Gloversville?', a: 'Yes. Fulton and Montgomery County are a regular part of our route, along with Albany, Schenectady, Troy and Saratoga. We group visits to keep on-site costs down.' },
      { q: 'Can you install cameras on a farm or large property?', a: 'Yes. Paramont cameras with long-range night vision, solar or wireless options for remote barns and gates, and recording you can check from anywhere.' },
      { q: 'Do you support Capital Region small businesses monthly?', a: 'Yes. Our Basic, Pro and Business managed plans include remote monitoring, priority support and camera health checks, with on-site visits scheduled as needed.' },
      { q: 'What if I need help right away?', a: "Call or text 631-871-5957. Most issues are fixed remotely within the hour. Questions? We're here 24/7." },
    ] },
};

function locationPage(loc) {
  const c = LOC_COPY[loc.slug];
  const path = `/locations/${loc.slug}.html`;
  const ld = [localBusinessLd({ areaServed: [...loc.counties, ...loc.towns.slice(0, 12)].map(t => t + ', NY'), path, name: `${SITE.name} — ${loc.name}`, description: c.description }),
    ...SERVICES.slice(0, 6).map(s => ({ '@context': 'https://schema.org', '@type': 'Service', name: `${s.name} in ${loc.name}`, serviceType: s.name, url: SITE.url + path + '#' + s.id,
      provider: { '@type': 'LocalBusiness', name: SITE.name, telephone: SITE.phoneE164 }, areaServed: loc.counties.map(t => ({ '@type': 'Place', name: t + ', NY' })) })),
    faqLd(c.faq), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Locations', path: '/locations/' }, { name: loc.name, path }])];

  const cards = SERVICES.map(s => `<article class="card" id="${s.id}"><div class="icon" aria-hidden="true">${s.icon}</div><h3>${esc(s.name)}</h3><p>${esc(s.pitch)}</p><a class="more" href="/services.html#${s.id}">Details →</a></article>`).join('\n      ');
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
    <div class="section-head"><div class="eyebrow">Services in ${esc(loc.name)}</div><h2>What we install and support here</h2></div>
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
${quoteForm({ source: `location-${loc.slug}`, title: `Get a free quote in ${loc.name}` })}
<section class="section section-soft">
  <div class="wrap"><div class="section-head"><div class="eyebrow">Other areas</div><h2>Also serving</h2></div><div class="areas">${others}</div></div>
</section>
</main>
${footer()}`;
  return head({ title: c.title, description: c.description, path, extraLd: ld }) + body;
}

function locationsIndex() {
  const title = 'Service Areas — Long Island, NYC, Hudson Valley | Piets Tech';
  const description = 'Piets Technology Solutions serves Long Island, NYC, the Hudson Valley and the Johnstown / Capital Region with cameras, IT, Wi-Fi, cabling and 24/7 support.';
  const path = '/locations/';
  const ld = [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Locations', path }]), localBusinessLd({ areaServed: LOCATIONS.flatMap(l => l.counties.map(c => c + ', NY')), path })];
  const body = `${banner()}
${nav('locations')}
<main id="main">
${pageHead({ crumbs: [{ name: 'Home', path: '/' }, { name: 'Locations', path }], h1: 'Service Areas', intro: 'Based in Suffolk County, on-site across New York State, and remote support anywhere. Pick your area for local details.' })}
<section class="section"><div class="wrap"><div class="areas">${LOCATIONS.map(l => `<a class="area" href="/locations/${l.slug}.html"><strong>${esc(l.name)}</strong><span>${esc(l.short)}</span></a>`).join('')}</div></div></section>
${quoteForm({ source: 'locations-index' })}
</main>
${footer()}`;
  return head({ title, description, path, extraLd: ld }) + body;
}

export function buildPages(pub) {
  const out = [];
  out.push(write(pub, 'index.html', homePage()));
  out.push(write(pub, 'services.html', servicesPage()));
  out.push(write(pub, 'locations/index.html', locationsIndex()));
  for (const loc of LOCATIONS) out.push(write(pub, `locations/${loc.slug}.html`, locationPage(loc)));
  return out;
}
