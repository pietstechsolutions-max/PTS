// Shared layout + data for Piets Technology Solutions static site generator.
export const SITE = {
  portalLive: process.env.PORTAL_LIVE === '1',
  name: 'Piets Technology Solutions',
  legalName: 'Piets Technology Solutions Inc',
  url: 'https://pietstechsolutions.com',
  phone: '631-871-5957',
  phoneE164: '+16318715957',
  email: 'pietstechsolutions@gmail.com',
  domain: 'pietstechsolutions.com',
  tagline: 'Wi-Fi, Wires, Whatever — Piet Makes It Better',
  clientLine: "Questions? We're here 24/7",
  banner: '/assets/brand/banner.png',
};

export const SERVICES = [
  { id: 'security-cameras', short: 'Security Cameras', name: 'Security Camera Systems', icon: 'CAM',
    pitch: 'InVid Tech Paramont IP camera systems with crisp 4K video, night vision and remote viewing from your phone. Designed, installed and supported locally.' },
  { id: 'it-support', short: 'IT Support & Repair', name: 'IT Support & Computer/Printer Repair', icon: 'IT',
    pitch: 'Slow PCs, printer headaches, email issues, malware cleanup — fixed fast, on site or remotely. Homes and small businesses.' },
  { id: 'networking-wifi', short: 'Networking & Wi-Fi', name: 'Networking & Wi-Fi Upgrades', icon: 'WIFI',
    pitch: 'Kill dead zones for good. Business-grade access points, proper routers and switches, and a network that just works.' },
  { id: 'structured-cabling', short: 'Structured Cabling', name: 'Structured Cabling', icon: 'CAT6',
    pitch: 'Clean, labeled, tested Cat6/Cat6A and fiber runs for offices, warehouses, restaurants and homes. New builds and retrofits.' },
  { id: 'smart-home', short: 'Smart Home', name: 'Smart Home & Home Assistant Automation', icon: 'HOME',
    pitch: 'Lights, locks, thermostats, cameras and shades on one local, private Home Assistant setup — no monthly cloud fees required.' },
  { id: 'pos', short: 'POS & Merchant', name: 'Point of Sale & Merchant Solutions', icon: 'POS',
    pitch: 'Restaurant and retail POS installs, payment terminals, kitchen printers and the network behind them. Tailored to how you actually run.' },
  { id: 'ip-phones', short: 'IP Phone Systems', name: 'IP Phone Systems', icon: 'VOIP',
    pitch: 'Modern VoIP phones with auto-attendants, call routing, mobile apps and voicemail-to-email. Lower bills, better features.' },
  { id: 'menu-boards', short: 'TV Menu Boards', name: 'Restaurant TV Menu Boards', icon: 'TV',
    pitch: 'Digital menu boards you update from your phone. Mounted, wired, and looking sharp — update prices without reprinting.' },
  { id: 'ghost-kitchen', short: 'Ghost Kitchen Setup', name: 'Ghost Kitchen Setup', icon: 'GK',
    pitch: 'Order tablets, printers, network, cameras and phones for delivery-only kitchens. Open fast with tech that keeps up with the rush.' },
  { id: 'access-control', short: 'Access Control', name: 'Access Control', icon: 'KEY',
    pitch: 'Keypads, fobs, mobile credentials and video intercoms for offices, multi-family and commercial doors. Know who came in, and when.' },
  { id: 'remote-support', short: 'Remote Support', name: 'Remote Support (RustDesk)', icon: 'RMT',
    pitch: 'Secure screen-share support in minutes with RustDesk. Most software problems get solved without a truck roll.' },
  { id: 'tech-support-247', short: '24/7 Tech Support', name: '24/7 Tech Support', icon: '24/7',
    pitch: "Something down at 11pm on a Saturday? Call or text. Questions? We're here 24/7." },
  { id: 'managed-services', short: 'Managed Services', name: 'Monthly Managed Services', icon: 'MSP',
    pitch: 'Remote monitoring, priority support and monthly camera health checks for a flat monthly fee. Problems get caught before you notice them.' },
];

export const LOCATIONS = [
  { slug: 'long-island', name: 'Long Island', short: 'Suffolk & Nassau County', region: 'Long Island, NY',
    counties: ['Suffolk County', 'Nassau County'],
    towns: ['Huntington', 'Smithtown', 'Islip', 'Babylon', 'Brookhaven', 'Bay Shore', 'Patchogue', 'Commack', 'Hauppauge', 'Stony Brook', 'Port Jefferson', 'Riverhead', 'Sayville', 'Lindenhurst', 'Farmingdale', 'Hicksville', 'Levittown', 'Garden City', 'Massapequa', 'Oyster Bay', 'Glen Cove', 'Freeport', 'Long Beach', 'Mineola'] },
  { slug: 'nyc', name: 'New York City', short: 'All five boroughs', region: 'New York City, NY',
    counties: ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'],
    towns: ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island', 'Astoria', 'Flushing', 'Long Island City', 'Jamaica', 'Williamsburg', 'Bushwick', 'Park Slope', 'Bay Ridge', 'Harlem', 'Midtown', 'Lower Manhattan', 'Riverdale', 'Fordham', 'St. George', 'Tottenville'] },
  { slug: 'hudson-valley', name: 'Hudson Valley', short: 'Westchester, Putnam, Dutchess & Orange', region: 'Hudson Valley, NY',
    counties: ['Westchester County', 'Putnam County', 'Dutchess County', 'Orange County'],
    towns: ['White Plains', 'Yonkers', 'New Rochelle', 'Mount Vernon', 'Scarsdale', 'Tarrytown', 'Peekskill', 'Yorktown', 'Carmel', 'Mahopac', 'Brewster', 'Cold Spring', 'Poughkeepsie', 'Fishkill', 'Beacon', 'Wappingers Falls', 'Hyde Park', 'Rhinebeck', 'Newburgh', 'Middletown', 'Goshen', 'Monroe', 'Warwick', 'Cornwall'] },
  { slug: 'johnstown-capital-region', name: 'Johnstown & Capital Region', short: 'Johnstown, Gloversville, Amsterdam, Albany & Saratoga', region: 'Capital Region, NY',
    counties: ['Fulton County', 'Montgomery County', 'Albany County', 'Saratoga County', 'Schenectady County'],
    towns: ['Johnstown', 'Gloversville', 'Amsterdam', 'Albany', 'Saratoga Springs', 'Schenectady', 'Troy', 'Clifton Park', 'Ballston Spa', 'Malta', 'Colonie', 'Latham', 'Guilderland', 'Rotterdam', 'Niskayuna', 'Broadalbin', 'Mayfield', 'Northville', 'Fonda', 'Canajoharie'] },
];

export const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

export function head({ title, description, path, type = 'website', extraLd = [], published, modified }) {
  const canonical = SITE.url + path;
  const ld = [...extraLd];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#011F5D">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}${SITE.banner}">
<meta property="og:image:width" content="1600">
<meta property="og:image:height" content="360">
<meta property="og:locale" content="en_US">
${published ? `<meta property="article:published_time" content="${published}">\n` : ''}${modified ? `<meta property="article:modified_time" content="${modified}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE.url}${SITE.banner}">
<link rel="icon" href="/assets/brand/favicon-64.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="/assets/brand/logo-mark.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="alternate" type="application/rss+xml" title="${esc(SITE.name)} Blog" href="${SITE.url}/rss.xml">
<link rel="stylesheet" href="/assets/site.css">
${ld.map(o => `<script type="application/ld+json">${json(o)}</script>`).join('\n')}
<!-- TODO (owner): GA4 / Meta Pixel snippets go here. Conversion events are pushed to window.dataLayer by /assets/site.js -->
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
`;
}

export function banner() {
  return `<a class="banner" href="/" aria-label="${esc(SITE.name)} home">
  <img src="${SITE.banner}" width="1600" height="360" alt="${esc(SITE.name)} — ${esc(SITE.tagline)}. ${esc(SITE.clientLine)} ${SITE.phone}" fetchpriority="high">
</a>`;
}

export function nav(current = '') {
  const item = (href, label, key) => `<li><a href="${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<header class="nav">
  <div class="wrap">
    <a class="brand" href="/"><img src="/assets/brand/logo-mark.png" width="34" height="34" alt=""><span>PIETS</span></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="menu">Menu</button>
    <ul id="menu">
      ${item('/services.html', 'Services', 'services')}
      ${item('/locations/', 'Locations', 'locations')}
      ${item('/blog/', 'Blog', 'blog')}
      ${SITE.portalLive ? item('/portal', 'Client Portal', 'portal') : ''}
      <li><a class="btn btn-light" href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a></li>
      <li><a class="btn btn-primary" href="#quote">Get a Free Quote</a></li>
    </ul>
  </div>
</header>`;
}

export function quoteForm({ source, title = 'Get a Free Quote', intro }) {
  const opts = SERVICES.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('\n          ');
  return `<section class="section quote-section" id="quote">
  <div class="wrap quote-layout">
    <div class="quote-side">
      <div class="eyebrow">Free quote · Free demo</div>
      <h2>${esc(title)}</h2>
      <p>${esc(intro || 'Tell us what you need and we’ll follow up with a straight answer, a price, and a free demo — in person or on a video call. References available.')}</p>
      <ul class="contact-lines">
        <li>Call: <a href="tel:${SITE.phoneE164}">${SITE.phone}</a></li>
        <li>Text: <a href="sms:${SITE.phoneE164}">${SITE.phone}</a></li>
        <li>Email: <a href="mailto:${SITE.email}">${SITE.email}</a></li>
      </ul>
      <p><strong>${esc(SITE.clientLine)}</strong></p>
    </div>
    <form class="form" data-lead-form action="/api/leads" method="post" novalidate>
      <h3>Request a quote</h3>
      <input type="hidden" name="source" value="${esc(source)}">
      <p class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>
      <div class="two">
        <div class="field"><label for="f-name-${slugify(source)}">Name *</label><input id="f-name-${slugify(source)}" name="name" type="text" required autocomplete="name"></div>
        <div class="field"><label for="f-phone-${slugify(source)}">Phone *</label><input id="f-phone-${slugify(source)}" name="phone" type="tel" required autocomplete="tel" inputmode="tel"></div>
      </div>
      <div class="two">
        <div class="field"><label for="f-email-${slugify(source)}">Email</label><input id="f-email-${slugify(source)}" name="email" type="email" autocomplete="email"></div>
        <div class="field"><label for="f-town-${slugify(source)}">Town / ZIP *</label><input id="f-town-${slugify(source)}" name="town" type="text" required autocomplete="postal-code"></div>
      </div>
      <div class="field"><label for="f-service-${slugify(source)}">What do you need? *</label>
        <select id="f-service-${slugify(source)}" name="service" required>
          <option value="">Choose a service…</option>
          ${opts}
          <option value="other">Something else</option>
        </select></div>
      <div class="field"><label for="f-msg-${slugify(source)}">Tell us a little more</label><textarea id="f-msg-${slugify(source)}" name="message" placeholder="How many cameras, doors, rooms, registers… anything helps."></textarea></div>
      <button class="btn btn-navy" type="submit">Send my request</button>
      <p class="fine">No spam, no pressure. We reply fast and we don’t share your info.</p>
      <div class="form-msg" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>`;
}

export function faqBlock(items, { heading = 'Frequently asked questions', eyebrow = 'FAQ' } = {}) {
  return `<section class="section faq" id="faq">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">${esc(eyebrow)}</div><h2>${esc(heading)}</h2></div>
    ${items.map(q => `<details><summary>${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`).join('\n    ')}
  </div>
</section>`;
}

export function faqLd(items) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: items.map(q => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })) };
}

export function breadcrumbLd(items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE.url + it.path })) };
}

export function orgLd() {
  return { '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, legalName: SITE.legalName, url: SITE.url,
    logo: SITE.url + '/assets/brand/logo-mark.png', image: SITE.url + SITE.banner, telephone: SITE.phoneE164, email: SITE.email,
    slogan: SITE.tagline, contactPoint: [{ '@type': 'ContactPoint', telephone: SITE.phoneE164, contactType: 'customer service', availableLanguage: 'English', hoursAvailable: 'Mo-Su 00:00-23:59' }] };
}

export function localBusinessLd({ areaServed, path = '/', name = SITE.name, description }) {
  return { '@context': 'https://schema.org', '@type': ['LocalBusiness', 'ProfessionalService'], '@id': SITE.url + path + '#business', name, url: SITE.url + path,
    image: SITE.url + SITE.banner, logo: SITE.url + '/assets/brand/logo-mark.png', telephone: SITE.phoneE164, email: SITE.email, priceRange: '$$',
    description: description || 'Security cameras, IT support, networking & Wi-Fi, structured cabling, smart home, POS, IP phones and 24/7 tech support.',
    address: { '@type': 'PostalAddress', addressRegion: 'NY', addressCountry: 'US' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
    areaServed: areaServed.map(a => ({ '@type': 'Place', name: a })),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: SITE.url + '/services.html#' + s.id } })) } };
}

export function footer() {
  return `<footer class="footer">
  <div class="wrap">
    <div class="cols">
      <div>
        <img class="logo" src="/assets/brand/logo-lockup.png" width="640" height="140" alt="${esc(SITE.name)}" loading="lazy">
        <p class="tag">${esc(SITE.tagline)}</p>
        <p>Low-voltage tech for homes and small businesses across Long Island, NYC, the Hudson Valley and the Capital Region. Free demos, references available, solutions tailored to you.</p>
        <p><strong>${esc(SITE.clientLine)}</strong></p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          ${SERVICES.slice(0, 7).map(s => `<li><a href="/services.html#${s.id}">${esc(s.short)}</a></li>`).join('\n          ')}
          <li><a href="/services.html">All services →</a></li>
        </ul>
      </div>
      <div>
        <h4>Service areas</h4>
        <ul>
          ${LOCATIONS.map(l => `<li><a href="/locations/${l.slug}.html">${esc(l.name)}</a></li>`).join('\n          ')}
          <li><a href="/locations/">All locations →</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a></li>
          <li><a href="sms:${SITE.phoneE164}">Text ${SITE.phone}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          ${SITE.portalLive ? '<li><a href="/portal">Client Portal</a></li>' : ''}
          <li><a href="/blog/">Blog</a></li>
        </ul>
      </div>
    </div>
    <div class="legal">
      <span>© <span data-year>2026</span> ${esc(SITE.legalName)}. All rights reserved.</span>
      <span>Licensed &amp; insured — license # available on request. <!-- TODO (owner): add license number --></span>
      <span>InVid Tech Paramont authorized installer.</span>
    </div>
  </div>
</footer>
<nav class="mobile-bar" aria-label="Quick contact">
  <a class="call" href="tel:${SITE.phoneE164}">Call</a>
  <a class="text" href="sms:${SITE.phoneE164}">Text</a>
  <a class="quote-link" href="#quote">Quote</a>
</nav>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

export function pageHead({ crumbs, h1, intro }) {
  const c = crumbs.map((x, i) => i < crumbs.length - 1 ? `<a href="${x.path}">${esc(x.name)}</a><span>/</span>` : `<strong>${esc(x.name)}</strong>`).join('');
  return `<div class="page-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb">${c}</nav><h1>${h1}</h1>${intro ? `<p>${intro}</p>` : ''}</div></div>`;
}

export function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
