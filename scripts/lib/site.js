// Shared layout + data for Piets Technology Solutions static site generator.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const PUBLIC_DIR = fileURLToPath(new URL('../../public/', import.meta.url));
const _vcache = {};
// Adds ?v=<content hash> to local CSS/JS so browsers pick up changes (Vercel caches /assets for a year).
export function versionAssets(html) {
  return html.replace(/(["'])(\/assets\/[^"'?#]+\.(?:css|js))\1/g, (m, q, url) => {
    if (!(url in _vcache)) {
      try { _vcache[url] = createHash('sha1').update(readFileSync(PUBLIC_DIR + url.slice(1))).digest('hex').slice(0, 8); }
      catch { _vcache[url] = ''; }
    }
    return _vcache[url] ? `${q}${url}?v=${_vcache[url]}${q}` : m;
  });
}
export const SITE = {
  portalLive: process.env.PORTAL_LIVE === '1',
  // Field HQ (client portal + team app). Set FIELDHQ_URL once Field HQ is hosted. FIELDHQ_DEMO=1 shows one-click demo buttons (local demo only).
  fieldhqUrl: (process.env.FIELDHQ_URL || '').replace(/\/$/, ''),
  fieldhqDemo: process.env.FIELDHQ_DEMO === '1',
  fieldhqTenant: process.env.FIELDHQ_TENANT || '',
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
    pitch: 'Slow PCs, printer headaches, email issues, malware cleanup — on site or remotely. Homes and small businesses.' },
  { id: 'networking-wifi', short: 'Networking & Wi-Fi', name: 'Networking & Wi-Fi Upgrades', icon: 'WIFI',
    pitch: 'Kill dead zones for good. Business-grade access points, proper routers and switches, and a network that just works.' },
  { id: 'structured-cabling', short: 'Structured Cabling', name: 'Structured Cabling', icon: 'CAT6',
    pitch: 'Clean, labeled, tested Cat6/Cat6A and fiber runs for offices, warehouses, restaurants and homes. New builds and retrofits.' },
  { id: 'smart-home', short: 'Smart Home', name: 'Smart Home & Home Assistant Automation', icon: 'HOME',
    pitch: 'Lights, locks, thermostats, cameras and shades on one local, private Home Assistant setup — no monthly cloud fees required.' },
  { id: 'pos', short: 'POS & Merchant', name: 'Point of Sale & Merchant Solutions', icon: 'POS',
    pitch: 'Restaurant and retail POS installs, payment terminals, kitchen printers and the network behind them. Tailored to how you actually run.' },
  { id: 'ip-phones', short: 'Business Phones', name: 'Business Phone Systems (VoIP)', icon: 'VOIP',
    pitch: 'Modern VoIP phones with auto-attendants, call routing, mobile apps and voicemail-to-email.' },
  { id: 'menu-boards', short: 'Digital Menu Boards', name: 'Digital Menu Boards', icon: 'TV',
    pitch: 'Digital menu boards you update from your phone. Mounted, wired, and looking sharp — update prices without reprinting.' },
  { id: 'ghost-kitchen', short: 'Ghost Kitchen Setup', name: 'Ghost Kitchen Setup', icon: 'GK',
    pitch: 'Order tablets, printers, network, cameras and phones for delivery-only kitchens. Set up so you can take orders from day one.' },
  { id: 'access-control', short: 'Access Control', name: 'Access Control & Intercoms', icon: 'KEY',
    pitch: 'Keypads, fobs, mobile credentials and video intercoms for offices, multi-family and commercial doors. Know who came in, and when.' },
  { id: 'remote-support', short: 'Remote Support', name: 'Remote Support (RustDesk)', icon: 'RMT',
    pitch: 'Secure screen-share help in minutes with RustDesk.' },
  { id: 'tech-support-247', short: '24/7 Tech Support', name: '24/7 Tech Support', icon: '24/7',
    pitch: "Something down at 11pm on a Saturday? Call or text. Questions? We're here 24/7." },
  { id: 'managed-services', short: 'Managed Services', name: 'Managed Services Plans', icon: 'MSP',
    pitch: 'Optional plans with remote monitoring, monthly camera health checks and priority support.' },
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

export function head({ title, description, path, type = 'website', extraLd = [], published, modified, bodyClass = '', extraScripts = '' }) {
    const canonical = SITE.url + path;
    const ld = [...extraLd];
    return versionAssets(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${path === '/404' ? '' : `<link rel="canonical" href="${canonical}">`}
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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/main.css">
<link rel="stylesheet" href="/assets/css/assistant.css">
${ld.map(o => `<script type="application/ld+json">${json(o)}</script>`).join('\n')}
${extraScripts}
</head>
<body class="${bodyClass}">
<script>document.documentElement.classList.add('js');</script>
<script src="/assets/js/core.js" defer></script>
<script src="/assets/js/sections.js" defer></script>
<script src="/assets/js/gate.js" defer></script>
<script src="/assets/assistant.js" defer></script>
<a class="skip" href="#main">Skip to content</a>
`);
}

export function banner() {
  const msg = `<span>New: the Piet Box &mdash; plug it in, we handle the rest</span><i></i><span>Free on-site or video demo</span><i></i><span>No required cloud fees</span><i></i><span>InVid Tech Paramont authorized installer</span><i></i><span>Questions? We're here 24/7</span><i></i>`;
  return `<div class="announcement" data-announcement>
  <div class="announcement__track" aria-hidden="true"><div class="announcement__run">${msg}${msg}</div><div class="announcement__run">${msg}${msg}</div></div>
  <p class="sr-only">New: the Piet Box. Free on-site or video demo. No required cloud fees. InVid Tech Paramont authorized installer. Questions? We're here 24/7.</p>
  <button class="announcement__close" type="button" data-close-announcement aria-label="Close announcement"><svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" aria-hidden="true"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
</div>`;
}

export function nav(current = '') {
  const item = (href, label, key) => `<li><a href="${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="brand" href="/" aria-label="${esc(SITE.name)} home"><img src="/assets/brand/logo-mark.svg" width="36" height="36" alt=""><span class="brand__text"><strong>PIETS</strong><small>Technology Solutions</small></span></a>
    <nav class="site-nav" aria-label="Main">
      <ul id="primary-menu" class="site-nav__links">
        ${item('/services.html', 'Services', 'services')}
        ${item('/commercial.html', 'Commercial', 'commercial')}
        ${item('/coverage.html', 'Coverage Planner', 'coverage')}
        ${item('/plans.html', 'Plans', 'plans')}
        ${item('/locations/', 'Locations', 'locations')}
        ${item('/blog/', 'Blog', 'blog')}
        ${item('/piet-box', 'Piet Box', 'piet-box')}
        ${item('/websites', 'Websites', 'websites')}
        ${item('/apps.html', 'Apps', 'apps')}
        ${SITE.portalLive ? `<li class="site-nav__mobile-only"><a href="/portal"${current === 'portal' ? ' aria-current="page"' : ''}>Client login</a></li>` : ''}
        <li class="site-nav__mobile-only"><a href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a></li>
        <li class="site-nav__mobile-only"><a href="/plan.html">Get a quote</a></li>
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="header-phone" href="tel:${SITE.phoneE164}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>${SITE.phone}</a>
      ${SITE.portalLive ? '<a class="btn btn-ghost btn-sm header-login" href="/portal">Client login</a>' : '<a class="btn btn-ghost btn-sm" href="#assistant" data-open-assistant>Talk to Piets</a>'}
      <a class="btn btn-primary btn-sm" href="/plan.html">Get a quote</a>
    </div>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
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
      <p class="fine">No spam, no pressure. We don’t share your info.</p>
      <div class="form-msg" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>`;
}

export function faqBlock(items, { heading = 'Frequently asked questions', eyebrow = 'FAQ' } = {}) {
  return `<section class="section faq" id="faq">
  <div class="wrap wrap--narrow">
    <div class="section-head section-head--center"><div class="eyebrow">${esc(eyebrow)}</div><h2>${esc(heading)}</h2></div>
    <div class="faq-list">
    ${items.map(q => `<details class="faq-item"><summary>${esc(q.q)}<span class="faq-icon" aria-hidden="true"></span></summary><div class="faq-body"><p>${esc(q.a)}</p></div></details>`).join('\n    ')}
    </div>
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
  return { '@context': 'https://schema.org', '@type': ['LocalBusiness', 'ProfessionalService'], '@id': SITE.url + '/#business', name: SITE.name, url: SITE.url + '/',
    image: SITE.url + SITE.banner, logo: SITE.url + '/assets/brand/logo-mark.png', telephone: SITE.phoneE164, email: SITE.email,
    description: description || 'Security cameras, IT support, networking & Wi-Fi, structured cabling, smart home, POS, business phones and 24/7 tech support.',
    address: { '@type': 'PostalAddress', addressRegion: 'NY', addressCountry: 'US' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
    areaServed: areaServed.map(a => ({ '@type': 'Place', name: a })),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: SITE.url + '/services.html#' + s.id } })) } };
}

export function footer() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <a class="brand" href="/" aria-label="${esc(SITE.name)} home"><img src="/assets/brand/logo-mark.svg" width="40" height="40" alt=""><span class="brand__text"><strong>PIETS</strong><small>Technology Solutions</small></span></a>
        <p>${esc(SITE.tagline)}</p>
        <a class="btn btn-primary btn-sm" href="/plan.html">Get a free quote</a>
        <p class="site-footer__247">${esc(SITE.clientLine)}</p>
      </div>
      <div class="site-footer__cols">
        <div><h4>Services</h4><ul>
          ${SERVICES.map(s => `<li><a href="/services.html#${s.id}">${esc(s.short || s.name)}</a></li>`).join('\n          ')}
        </ul></div>
        <div><h4>Company</h4><ul>
          <li><a href="/about.html">About us</a></li>
          <li><a href="/commercial.html">Commercial</a></li>
          <li><a href="/plans.html">Managed plans</a></li>
          <li><a href="/coverage.html">Coverage Planner</a></li>
          <li><a href="/remote-support.html">Remote support</a></li>
          <li><a href="/piet-box">The Piet Box (new)</a></li>
          <li><a href="/websites">Website demo (free)</a></li>
          <li><a href="/apps.html">Apps we built (MarinaVue, StableVue, PuppyVue, Field HQ)</a></li>
          <li><a href="/partners.html">Partners &amp; resellers (VAR program)</a></li>
          <li><a href="/blog/">Blog</a></li>
          ${SITE.portalLive ? '<li><a href="/portal">Client login (Field HQ)</a></li>' : ''}
        </ul>
        <h4>Service areas</h4><ul>
          ${LOCATIONS.map(l => `<li><a href="/locations/${l.slug}.html">${esc(l.name)}</a></li>`).join('\n          ')}
        </ul></div>
        <div><h4>Contact</h4><ul>
          <li><a href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a></li>
          <li><a href="sms:${SITE.phoneE164}">Text ${SITE.phone}</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        </ul></div>
      </div>
    </div>
    <div class="site-footer__legal">
      <p>© <span data-year>2026</span> ${esc(SITE.legalName)}. All rights reserved. Licensed &amp; insured. InVid Tech Paramont authorized installer.</p>
      <p class="site-footer__ai">Some content on this site was drafted with AI assistance. Spot a mistake or have a suggestion? Tell us at ${SITE.email} and we'll fix it.</p>
    </div>
  </div>
</footer>
<nav class="mobile-bar" aria-label="Quick contact">
  <a href="tel:${SITE.phoneE164}">Call</a>
  <a href="sms:${SITE.phoneE164}">Text</a>
  <a class="mobile-bar__quote" href="/plan.html">Get a quote</a>
</nav>
</body>
</html>
`;
}

export function pageHead({ crumbs, h1, intro, eyebrow }) {
  const c = crumbs.map((x, i) => i < crumbs.length - 1 ? `<a href="${x.path}">${esc(x.name)}</a><span>/</span>` : `<strong>${esc(x.name)}</strong>`).join('');
  return `<div class="page-head page-head--dark"><div class="wrap"><div class="page-head__content">${eyebrow ? `<div class="page-head__eyebrow">${esc(eyebrow)}</div>` : ''}${crumbs.length > 0 ? `<nav class="crumbs" aria-label="Breadcrumb">${c}</nav>` : ''}<h1>${h1}</h1>${intro ? `<p>${intro}</p>` : ''}</div></div></div>`;
}

export function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

const ICON_PATHS = {
  camera: '<path d="M3 7h11a2 2 0 0 1 2 2v1l4-2.5v9L16 14v1a2 2 0 0 1-2 2H3z"/><circle cx="8.5" cy="12" r="2.5"/>',
  wifi: '<path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5 12.3a10 10 0 0 1 14 0"/><path d="M8.5 15.8a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/>',
  cable: '<path d="M7 3v5a5 5 0 0 0 10 0V3"/><path d="M12 13v8"/><path d="M5 3h4M15 3h4"/>',
  door: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><circle cx="15" cy="12.5" r="1" fill="currentColor"/><path d="M9 7h4"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
  pos: '<rect x="4" y="3" width="16" height="11" rx="2"/><path d="M8 18h8M12 14v4M6 21h12"/>',
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  laptop: '<rect x="4" y="5" width="16" height="10" rx="1.5"/><path d="M2 19h20"/>',
  tv: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
  kitchen: '<path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10"/><path d="M16 3c-1.7 0-3 2-3 5s1.3 4 3 4v9"/>',
  remote: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8"/><path d="M10 8l2 2-2 2M13 12h2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  hub: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><circle cx="7" cy="7" r=".8" fill="currentColor"/><circle cx="7" cy="17" r=".8" fill="currentColor"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
const ICON_CODES = { CAM: 'camera', IT: 'laptop', WIFI: 'wifi', CAT6: 'cable', HOME: 'home', POS: 'pos', VOIP: 'phone',
  TV: 'tv', GK: 'kitchen', KEY: 'door', RMT: 'remote', '24/7': 'clock', MSP: 'hub' };

export function icon(name, size = 24) {
  const svg = ICON_PATHS[ICON_CODES[name] || name];
  if (!svg) return '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${svg}</svg>`;
}

// Helper function to get URL parameter
export function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Planner helper function implementing FEATURES E
export function planner({ source, heading, id }) {
  // Property types
  const propertyTypes = [
    { value: 'home', label: 'Home' },
    { value: 'small-business', label: 'Small business' },
    { value: 'commercial-building', label: 'Commercial building' },
    { value: 'multi-site-business', label: 'Multi-site business' },
    { value: 'new-construction', label: 'New construction or renovation' }
  ];
  
  // Sizes
  const sizes = [
    { value: '1-4', label: '1–4' },
    { value: '5-10', label: '5–10' },
    { value: '11-25', label: '11–25' },
    { value: '25-plus', label: '25+' },
    { value: 'not-sure', label: 'Not sure' }
  ];
  
  // Timelines
  const timelines = [
    { value: 'asap', label: 'ASAP' },
    { value: 'this-month', label: 'This month' },
    { value: '1-3-months', label: '1–3 months' },
    { value: 'planning-ahead', label: 'Planning ahead' }
  ];
  
  // Services for multi-select (we'll use checkboxes)
  const serviceOptions = SERVICES.map(service => ({
    value: service.id,
    label: service.name,
    icon: service.icon
  }));
  
  // Generate unique ID if not provided
  const plannerId = id || 'planner-' + Math.random().toString(36).substr(2, 9);
  
  return `
<div class="planner-container" id="${plannerId}">
  <div class="planner-header">
    <h2>${heading}</h2>
    <div class="planner-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
      </div>
      <div class="progress-steps">
        <span class="step current" data-step="1">1</span>
        <span class="step" data-step="2">2</span>
        <span class="step" data-step="3">3</span>
        <span class="step" data-step="4">4</span>
      </div>
    </div>
  </div>
  
  <form class="planner-form" data-lead-form action="/api/leads" method="post" novalidate>
    <input type="hidden" name="source" value="${esc(source)}">
    <input type="hidden" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    
    <!-- Step 1: Services -->
    <div class="planner-step" data-step="1">
      <h3>What services do you need?</h3>
      <p>Select all that apply</p>
      <div class="service-grid">
        ${serviceOptions.map(service => `
          <label class="service-option">
            <input type="checkbox" name="service" value="${service.value}">
            <div class="service-icon" aria-hidden="true">${icon(service.icon, 22)}</div>
            <div class="service-label">${service.label}</div>
          </label>
        `).join('')}
      </div>
      <div class="form-msg" role="status" aria-live="polite"></div>
    </div>
    
    <!-- Step 2: Property & Location -->
    <div class="planner-step" data-step="2" style="display: none;">
      <h3>Property type & location</h3>
      <div class="two">
        <div class="field">
          <label for="${plannerId}-property">Property type *</label>
          <select id="${plannerId}-property" name="property" required>
            <option value="">Choose property type…</option>
            ${propertyTypes.map(type => `<option value="${type.value}">${type.label}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="${plannerId}-town">Town / ZIP *</label>
          <input id="${plannerId}-town" name="town" type="text" required autocomplete="postal-code">
        </div>
      </div>
      <div class="form-msg" role="status" aria-live="polite"></div>
    </div>
    
    <!-- Step 3: Size & Timeline -->
    <div class="planner-step" data-step="3" style="display: none;">
      <h3>Size & timeline</h3>
      <div class="two">
        <div class="field">
          <label for="${plannerId}-size">How many devices/points? *</label>
          <select id="${plannerId}-size" name="size" required>
            <option value="">Choose size…</option>
            ${sizes.map(size => `<option value="${size.value}">${size.label}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="${plannerId}-timeline">When do you need it? *</label>
          <select id="${plannerId}-timeline" name="timeline" required>
            <option value="">Choose timeline…</option>
            ${timelines.map(timeline => `<option value="${timeline.value}">${timeline.label}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="field">
        <label for="${plannerId}-notes">Notes (optional)</label>
        <textarea id="${plannerId}-notes" name="notes" placeholder="Any additional details about your project…"></textarea>
      </div>
      <div class="form-msg" role="status" aria-live="polite"></div>
    </div>
    
    <!-- Step 4: Contact Info -->
    <div class="planner-step" data-step="4" style="display: none;">
      <h3>Contact information</h3>
      <div class="two">
        <div class="field">
          <label for="${plannerId}-name">Name *</label>
          <input id="${plannerId}-name" name="name" type="text" required autocomplete="name">
        </div>
        <div class="field">
          <label for="${plannerId}-phone">Phone *</label>
          <input id="${plannerId}-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel">
        </div>
      </div>
      <div class="two">
        <div class="field">
          <label for="${plannerId}-email">Email</label>
          <input id="${plannerId}-email" name="email" type="email" autocomplete="email">
        </div>
        <div class="field">
          <label for="${plannerId}-best-time">Best time to reach</label>
          <input id="${plannerId}-best-time" name="best_time" type="text" placeholder="e.g., mornings, afternoons">
        </div>
      </div>
      <p class="consent">By sending this you agree we can call or text you about your project. Msg &amp; data rates may apply. Reply STOP to opt out.</p>
      <div class="form-msg" role="status" aria-live="polite"></div>
    </div>
    
    <!-- Navigation -->
    <div class="planner-nav">
      <button type="button" class="btn btn-outline planner-prev" style="display: none;">Back</button>
      <button type="button" class="btn btn-navy planner-next">Next</button>
      <button type="submit" class="btn btn-navy planner-submit" style="display: none;">Send my request</button>
    </div>
  </form>
  
  <!-- Success Screen -->
  <div class="planner-success" style="display: none;">
    <h3>You're in. We'll reach out shortly.</h3>
    <p>Thank you for sharing your project details. We'll review your information and get back to you soon.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="tel:${SITE.phoneE164}">Call us now</a>
      <a class="btn btn-light" href="sms:${SITE.phoneE164}">Text us now</a>
    </div>
  </div>
</div>


`;
}
