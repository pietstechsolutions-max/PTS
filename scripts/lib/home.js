// Home page sections for the Piets Technology Solutions website.
// Content follows BRIEF/FACTS.md only (no prices, no invented numbers).
import { SITE, LOCATIONS, esc, versionAssets } from './site.js';

/* Small inline icon set (24px, stroke = currentColor) */
const I = {
  camera: '<path d="M3 7h11a2 2 0 0 1 2 2v1l4-2.5v9L16 14v1a2 2 0 0 1-2 2H3z"/><circle cx="8.5" cy="12" r="2.5"/>',
  wifi: '<path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5 12.3a10 10 0 0 1 14 0"/><path d="M8.5 15.8a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/>',
  cable: '<path d="M7 3v5a5 5 0 0 0 10 0V3"/><path d="M12 13v8"/><path d="M5 3h4M15 3h4"/>',
  door: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><circle cx="15" cy="12.5" r="1" fill="currentColor"/><path d="M9 7h4"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
  pos: '<rect x="4" y="3" width="16" height="11" rx="2"/><path d="M8 18h8M12 14v4M6 21h12"/>',
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  hub: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><circle cx="7" cy="7" r=".8" fill="currentColor"/><circle cx="7" cy="17" r=".8" fill="currentColor"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  x: '<path d="M7 7l10 10M17 7 7 17"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  browser: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  portal: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
};
export const ico = (name, size = 24) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || ''}</svg>`;

/* ---------- Hero: headline + "Describe your project" box + animated hub ---------- */
function hubDiagram() {
  const nodes = [
    { key: 'cameras', label: 'Cameras', icon: 'camera', x: 200, y: 52, tip: 'InVid Tech Paramont camera systems' },
    { key: 'wifi', label: 'Wi-Fi', icon: 'wifi', x: 328, y: 126, tip: 'Business-grade networking' },
    { key: 'doors', label: 'Doors', icon: 'door', x: 328, y: 274, tip: 'Access control & intercoms' },
    { key: 'phones', label: 'Phones', icon: 'phone', x: 200, y: 348, tip: 'VoIP phone systems' },
    { key: 'pos', label: 'POS', icon: 'pos', x: 72, y: 274, tip: 'POS & payment terminals' },
    { key: 'smart', label: 'Smart home', icon: 'home', x: 72, y: 126, tip: 'Local Home Assistant automation' },
  ];
  const lines = nodes.map((n, i) => `<path id="hubpath-${n.key}" class="hub__line" d="M200 200 L${n.x} ${n.y}"/>
      <circle class="hub__pulse" r="4"><animateMotion dur="${2.6 + i * 0.35}s" begin="${i * 0.4}s" repeatCount="indefinite"><mpath href="#hubpath-${n.key}"/></animateMotion></circle>`).join('\n      ');
  const sats = nodes.map((n, i) => `<g class="hub__node" style="--d:${i * 0.5}s" tabindex="0" role="img" aria-label="${esc(n.label)}: ${esc(n.tip)}">
        <circle class="hub__ring" cx="${n.x}" cy="${n.y}" r="30"/>
        <svg x="${n.x - 12}" y="${n.y - 12}" width="24" height="24" viewBox="0 0 24 24" class="hub__icon" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${I[n.icon]}</svg>
        <text x="${n.x}" y="${n.y + (n.y > 200 ? 50 : -42)}" text-anchor="middle" class="hub__label">${esc(n.label)}</text>
        <title>${esc(n.label)} — ${esc(n.tip)}</title>
      </g>`).join('\n      ');
  return `<svg class="hub" viewBox="0 0 400 400" role="img" aria-labelledby="hub-title">
      <title id="hub-title">One Piets hub connects cameras, Wi-Fi, doors, phones, POS and smart home</title>
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#00E5FF" stop-opacity=".45"/><stop offset="1" stop-color="#00E5FF" stop-opacity="0"/></radialGradient>
        <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#02D7F5"/><stop offset=".55" stop-color="#016FD6"/><stop offset="1" stop-color="#7A3DFF"/></linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" class="hub__orbit"/>
      <circle cx="200" cy="200" r="95" class="hub__orbit hub__orbit--inner"/>
      ${lines}
      <circle cx="200" cy="200" r="90" fill="url(#hubGlow)"/>
      <g class="hub__core" tabindex="0" role="img" aria-label="Piets hub: one system, one partner">
        <circle cx="200" cy="200" r="46" fill="url(#hubGrad)"/>
        <circle cx="200" cy="200" r="46" class="hub__core-ring"/>
        <svg x="184" y="176" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${I.hub}</svg>
        <text x="200" y="226" text-anchor="middle" class="hub__core-label">PIETS HUB</text>
      </g>
      ${sats}
    </svg>`;
}

export function heroSection() {
  const chips = ['8 cameras for my restaurant in Hauppauge', 'New Wi-Fi for a 2-floor office', 'Door fobs for a dental office', 'POS + kitchen printers for a pizzeria'];
  return `
<section class="hero">
  <div class="hero__bg" aria-hidden="true"></div>
  <canvas class="hero__fx" aria-hidden="true"></canvas>
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <div class="pill"><span class="pill__dot"></span>${esc(SITE.clientLine)}</div>
      <h1>Security, networks &amp; building tech — <span class="grad-text">one partner</span> for New York.</h1>
      <p class="hero__lead">Cameras, Wi-Fi, cabling, access control, phones, POS and smart home — designed, installed and supported by the person who quotes your job.</p>
      <div class="btn-row">
        <a href="/plan.html" class="btn btn-primary btn-lg">Book a free demo ${ico('arrow', 18)}</a>
        <a href="tel:${SITE.phoneE164}" class="btn btn-ghost btn-lg">${ico('phone', 18)} Call ${SITE.phone}</a>
      </div>
      <ul class="hero__promises">
        <li>${ico('check', 18)} Licensed &amp; insured</li>
        <li>${ico('check', 18)} Free demos</li>
        <li>${ico('check', 18)} No required cloud fees</li>
      </ul>

      <div class="smartbox" data-smartbox>
        <label class="smartbox__label" for="hero-textarea">${ico('spark', 18)} Describe your project — we'll build your plan</label>
        <textarea id="hero-textarea" rows="2" placeholder="e.g. 8 cameras and new Wi-Fi for my restaurant in Hauppauge"></textarea>
        <div class="smartbox__row">
          <div class="smartbox__chips">
            ${chips.map(c => `<button type="button" class="example-chip">${esc(c)}</button>`).join('\n            ')}
          </div>
          <button type="button" class="btn btn-primary" data-build-plan>Build my plan ${ico('arrow', 18)}</button>
        </div>
        <div class="hero-reco" data-reco aria-live="polite"></div>
      </div>
    </div>
    <div class="hero__visual">
      <div class="hero__stage">
      ${hubDiagram()}
      <div class="phone" role="img" aria-label="Piets apps on a phone: MarinaVue, StableVue and the Piet Box">
        <div class="phone__frame">
          <div class="phone__island"></div>
          <div class="phone__screen">
            <img src="/assets/photos/app-marinavue.jpg" alt="" class="is-on" width="585" height="1266" data-cap="MarinaVue" data-sub="Staff app · marina dashboard">
            <img src="/assets/photos/app-stablevue.jpg" alt="" width="585" height="1266" data-cap="StableVue" data-sub="Today board · barn cameras & care">
            <img src="/assets/photos/app-stablevue-owner.jpg" alt="" width="585" height="1266" data-cap="StableVue owner portal" data-sub="Live stall camera on your phone">
            <img src="/assets/photos/app-pietbox.jpg" alt="" width="585" height="1266" data-cap="Piet Box" data-sub="Your TV · menus, promos, photo wall">
            <div class="phone__cap" aria-hidden="true"></div>
          </div>
          <div class="phone__dots" aria-hidden="true"><i class="is-on"></i><i></i><i></i><i></i></div>
          <div class="phone__glare"></div>
        </div>
      </div>
      <span class="hero__tag hero__tag--1"><i></i>Camera 4 · live</span>
      <span class="hero__tag hero__tag--2"><i></i>Front door · unlocked from phone</span>
      </div>
    </div>
  </div>
</section>
${versionAssets('<script src="/assets/js/hero-fx.js" defer></script>')}`;
}

export function worksWith() {
  const items = ['InVid Tech Paramont', 'Home Assistant', 'RustDesk', 'Cat6 / Cat6A & fiber', 'VoIP', 'POS & payment terminals', 'Access control', 'Digital menu boards'];
  const run = items.map(t => `<span>${esc(t)}</span><i></i>`).join('');
  return `
<section class="works-with" aria-label="Systems we work with">
  <div class="works-with__label">Works with</div>
  <div class="marquee"><div class="marquee__track" aria-hidden="true"><div class="marquee__run">${run}${run}</div><div class="marquee__run">${run}${run}</div></div>
  <p class="sr-only">${items.map(esc).join(', ')}</p></div>
</section>`;
}

export function statsBand() {
  const stats = [
    { v: '24/7', label: 'Support by phone & text' },
    { v: '13', count: 13, label: 'Services under one roof' },
    { v: '4', count: 4, label: 'On-site service regions' },
    { v: '0', count: 0, label: 'Required cloud fees' },
  ];
  return `
<section class="stats">
  <div class="wrap stats__grid">
    ${stats.map(s => `<div class="stat"><span class="stat__value"${s.count !== undefined ? ` data-count="${s.count}"` : ''}>${s.v}</span><span class="stat__label">${esc(s.label)}</span></div>`).join('\n    ')}
  </div>
</section>`;
}

export function servicesBlock() {
  const services = [
    { id: 'security-cameras', name: 'Security Cameras', icon: 'camera', text: 'InVid Tech Paramont IP systems with 4K options, night vision and viewing from your phone.' },
    { id: 'networking-wifi', name: 'Networking & Wi-Fi', icon: 'wifi', text: 'Business-grade access points, routers and switches. Dead zones gone, guest networks done right.' },
    { id: 'structured-cabling', name: 'Structured Cabling', icon: 'cable', text: 'Cat6/Cat6A and fiber — labeled, tested and documented, for new builds and retrofits.' },
    { id: 'access-control', name: 'Access Control & Intercoms', icon: 'door', text: 'Keypads, fobs, mobile credentials and video intercoms for offices and multi-family doors.' },
    { id: 'ip-phones', name: 'Business Phones (VoIP)', icon: 'phone', text: 'Auto-attendants, call routing, mobile apps and voicemail-to-email.' },
    { id: 'pos', name: 'POS & Merchant', icon: 'pos', text: 'Restaurant and retail POS, payment terminals, kitchen printers and the network behind them.' },
  ];
  return `
<section class="section" id="services">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">What we do</div>
      <h2>One partner for every wire and signal.</h2>
      <p>Thirteen services, one point of contact. Here are the six most requested — <a href="/services.html">see all services</a>.</p>
    </div>
    <div class="card-grid">
      ${services.map(s => `<article class="card service-card">
        <div class="icon-tile">${ico(s.icon)}</div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.text)}</p>
        <a href="/plan.html?service=${s.id}" class="card-link">Plan this ${ico('arrow', 16)}</a>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function industryTabs() {
  const industries = [
    { id: 'restaurants', name: 'Restaurants', text: 'Our biggest segment. POS and payment terminals, kitchen printers, digital menu boards, cameras over the register and back door, and Wi-Fi that holds up during the rush. Ghost kitchens too.', chips: ['POS & terminals', 'Kitchen printers', 'TV menu boards', 'Cameras', 'Guest Wi-Fi'] },
    { id: 'offices', name: 'Offices & retail', text: 'A clean network closet, Wi-Fi with no dead zones, VoIP phones, door access and cameras — one installer, one point of contact.', chips: ['Networking', 'VoIP phones', 'Access control', 'Cameras', 'IT support'] },
    { id: 'property', name: 'Property managers', text: 'Video intercoms, fob access, common-area cameras and building Wi-Fi for multi-family and commercial buildings.', chips: ['Video intercoms', 'Fob access', 'Common-area cameras', 'Building Wi-Fi'] },
    { id: 'builders', name: 'Builders & GCs', text: 'Your low-voltage partner on new builds and renovations: structured cabling, camera and access pre-wire, network rough-in and finish.', chips: ['Structured cabling', 'Pre-wire', 'Network rough-in', 'Cameras & access'] },
    { id: 'medical', name: 'Dental & medical', text: 'Secure, separated networks for front desk and equipment, door access for staff areas, phones and cameras.', chips: ['Separated networks', 'Door access', 'VoIP phones', 'Cameras'] },
    { id: 'auto', name: 'Auto shops', text: 'Cameras over bays, lots and the front counter, Wi-Fi for the office and waiting room, and phones that reach you in the shop.', chips: ['Bay & lot cameras', 'Office Wi-Fi', 'Business phones', 'View from your phone'] },
    { id: 'stores', name: 'Stores & bodegas', text: 'Convenience stores, bodegas and liquor stores: cameras over registers, doors and aisles, POS and card terminals, and remote viewing from your phone.', chips: ['Register cameras', 'POS & card terminals', 'Remote viewing', 'Reliable network'] },
    { id: 'homes', name: 'Homes', text: 'Whole-home Wi-Fi, camera systems you view from your phone, and local, private Home Assistant automation with no required cloud fees.', chips: ['Whole-home Wi-Fi', 'Cameras', 'Home Assistant', 'Smart locks'] },
  ];
  return `
<section class="section section--mist" id="industries">
  <div class="wrap">
    <div class="section-head section-head--center">
      <div class="eyebrow">Built for how you work</div>
      <h2>Pick your industry.</h2>
    </div>
    <div class="tabs-container">
      <div class="tabs" role="tablist" aria-label="Industries">
        ${industries.map((ind, i) => `<button class="tab-btn${i === 0 ? ' active' : ''}" type="button" role="tab" id="tab-${ind.id}" aria-controls="panel-${ind.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(ind.name)}</button>`).join('\n        ')}
      </div>
      ${industries.map((ind, i) => `<div class="tab-panel" role="tabpanel" id="panel-${ind.id}" aria-labelledby="tab-${ind.id}"${i === 0 ? '' : ' hidden'}>
        <div class="tab-panel__text">
          <h3>${esc(ind.name)}</h3>
          <p>${esc(ind.text)}</p>
          <a href="/plan.html" class="btn btn-primary">Get a tailored plan ${ico('arrow', 18)}</a>
        </div>
        <ul class="tab-panel__chips">${ind.chips.map(c => `<li>${ico('check', 16)} ${esc(c)}</li>`).join('')}</ul>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function commercialBand() {
  return `
<section class="band">
  <div class="band__glow" aria-hidden="true"></div>
  <div class="wrap band__inner">
    <div>
      <div class="eyebrow eyebrow--light">Commercial · Property managers · Builders</div>
      <h2>Bigger building? Multiple sites? One low-voltage partner.</h2>
      <p>Cameras, access, cabling, Wi-Fi and phones planned together — so nothing gets lost between vendors.</p>
    </div>
    <a href="/commercial.html" class="btn btn-primary btn-lg">Explore commercial ${ico('arrow', 18)}</a>
  </div>
</section>`;
}

export function compareBlock() {
  const bad = ['A different company for cameras, Wi-Fi and phones', 'Nobody owns the problem when something breaks', 'Separate bills, contacts and schedules', 'Finger-pointing between vendors'];
  const good = ['One partner for every low-voltage system', 'You deal directly with the installer', 'One contact, one plan, one schedule', 'Clean, labeled installs with 24/7 support'];
  return `
<section class="section" id="compare">
  <div class="wrap">
    <div class="section-head section-head--center">
      <div class="eyebrow">Why one partner</div>
      <h2>Patchwork of vendors vs. one Piets system.</h2>
    </div>
    <div class="compare">
      <div class="compare__col compare__col--bad">
        <h3>Patchwork of vendors</h3>
        <ul>${bad.map(b => `<li>${ico('x', 18)} ${esc(b)}</li>`).join('')}</ul>
      </div>
      <div class="compare__col compare__col--good">
        <h3>One Piets system</h3>
        <ul>${good.map(g => `<li>${ico('check', 18)} ${esc(g)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>`;
}

export function howItWorks() {
  const steps = [
    ['Free walkthrough or video demo', 'We look at your space and your goals — in person or on a video call.'],
    ['Tailored design & quote', 'A plan built for your site: what goes where, and why. No one-size packages.'],
    ['Clean, labeled install', 'Neat runs, labeled cables and a documented system you can actually find your way around.'],
    ['Training & 24/7 support', 'We show you how everything works. Questions later? Call or text any time.'],
  ];
  return `
<section class="section section--mist" id="how">
  <div class="wrap">
    <div class="section-head section-head--center">
      <div class="eyebrow">How it works</div>
      <h2>From first call to fully running.</h2>
    </div>
    <ol class="steps">
      ${steps.map(([t, d], i) => `<li class="step"><span class="step__num">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>`;
}

export function coverageTeaser() {
  return `
<section class="section" id="coverage-teaser">
  <div class="wrap">
    <div class="feature-panel">
      <div class="feature-panel__copy">
        <div class="eyebrow eyebrow--light">Free tool</div>
        <h2>See your camera coverage before a single wire is run.</h2>
        <p>Pick a floor plan, drop cameras, aim them and watch the coverage fill in. Send the layout to us and we'll confirm it on a free walkthrough.</p>
        <a href="/coverage.html" class="btn btn-primary btn-lg">Open the Coverage Planner ${ico('arrow', 18)}</a>
      </div>
      <div class="feature-panel__visual" aria-hidden="true">
        <svg viewBox="0 0 360 260" class="mini-plan">
          <rect x="20" y="20" width="320" height="220" rx="6" class="mini-plan__wall"/>
          <path d="M20 130 H150 M210 20 V100 M210 150 V240" class="mini-plan__wall"/>
          <path d="M70 240 h40" class="mini-plan__door"/>
          <path class="mini-plan__cone c1" d="M30 30 L160 70 L90 150 Z"/>
          <path class="mini-plan__cone c2" d="M330 30 L210 60 L270 160 Z"/>
          <path class="mini-plan__cone c3" d="M330 230 L220 200 L280 150 Z"/>
          <path class="mini-plan__cone c4" d="M30 230 L140 170 L120 240 Z"/>
          <circle cx="30" cy="30" r="7" class="mini-plan__cam"/><circle cx="330" cy="30" r="7" class="mini-plan__cam"/>
          <circle cx="330" cy="230" r="7" class="mini-plan__cam"/><circle cx="30" cy="230" r="7" class="mini-plan__cam"/>
        </svg>
        <div class="mini-plan__badge"><strong>4</strong> cameras placed</div>
      </div>
    </div>
  </div>
</section>`;
}

export function plansBlock() {
  const plans = [
    { name: 'Basic', features: ['Remote monitoring of network & cameras', 'Monthly camera health check', 'Remote support during business hours', 'Discounted on-site rates'] },
    { name: 'Pro', popular: true, features: ['Everything in Basic', 'Priority response 7 days a week', 'Quarterly on-site checkup', 'Patching, backups & security updates', 'Vendor coordination (ISP, POS, phones)'] },
    { name: 'Business', features: ['Everything in Pro', '24/7 priority line', 'Monthly on-site visit', 'Camera, access control & phone system management', 'Custom SLA and reporting'] },
  ];
  return `
<section class="section section--mist" id="plans">
  <div class="wrap">
    <div class="section-head section-head--center">
      <div class="eyebrow">Optional managed plans</div>
      <h2>Stay ahead of problems.</h2>
      <p>Plans are optional — no contract required to get service. Every plan is quoted to your site.</p>
    </div>
    <div class="plans">
      ${plans.map(p => `<article class="plan${p.popular ? ' plan--popular' : ''}">
        ${p.popular ? '<span class="plan__badge">Most popular</span>' : ''}
        <h3>${esc(p.name)}</h3>
        <p class="plan__price">Custom quote</p>
        <ul>${p.features.map(f => `<li>${ico('check', 16)} ${esc(f)}</li>`).join('')}</ul>
        <a href="/plan.html?service=managed-services" class="btn ${p.popular ? 'btn-primary' : 'btn-outline'}">Ask for pricing</a>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function brochureGate() {
  return `
<section class="section" id="brochure">
  <div class="wrap">
    <div class="gate">
      <div class="gate__copy">
        <div class="icon-tile icon-tile--lg">${ico('home', 28)}</div>
        <div class="eyebrow">Smart home brochure</div>
        <h2>Get the Home Assistant smart-home brochure.</h2>
        <p>Local, private automation for lights, locks, thermostats, shades and cameras — with no required cloud fees.</p>
      </div>
      <div class="gate__form">
        <form class="form" data-gate action="/api/leads" method="post" novalidate>
          <input type="hidden" name="website" tabindex="-1" autocomplete="off" class="hp-input" aria-hidden="true">
          <div class="field"><label for="brochure-name">Name *</label><input id="brochure-name" name="name" type="text" required autocomplete="name"></div>
          <div class="field"><label for="brochure-phone">Phone *</label><input id="brochure-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel"></div>
          <div class="field"><label for="brochure-email">Email *</label><input id="brochure-email" name="email" type="email" required autocomplete="email"></div>
          <button class="btn btn-primary btn-block" type="submit">Get the brochure</button>
          <div class="form-msg" role="status" aria-live="polite"></div>
        </form>
        <a class="btn btn-outline btn-block gate__download" data-gate-link href="/assets/docs/Piets_Home_Assistant_Brochure.pdf" download style="display:none">Download the brochure (PDF)</a>
      </div>
    </div>
  </div>
</section>`;
}

export function reviewsSlot() {
  return `
<section class="section section--tight" id="references">
  <div class="wrap">
    <div class="refs">
      <div>${ico('shield', 28)}</div>
      <div>
        <h2>References available on request.</h2>
        <p>Grown by word of mouth. Ask us for references from jobs like yours — we're happy to connect you.</p>
      </div>
      <a class="btn btn-outline" href="sms:+16318715957?body=Hi%2C%20I%E2%80%99d%20like%20a%20reference">Ask for references</a>
    </div>
  </div>
</section>`;
}

export function areasBlock() {
  return `
<section class="section" id="service-area">
  <div class="wrap">
    <div class="section-head">
      <div class="eyebrow">Service area</div>
      <h2>Based in Suffolk County. Serving New York.</h2>
      <p>On-site across Long Island, NYC, the Hudson Valley and the Johnstown / Capital Region. Remote support anywhere.</p>
    </div>
    <div class="areas">
      ${LOCATIONS.map(l => `<a class="area" href="/locations/${l.slug}.html"><h3>${esc(l.name)}</h3><p>${esc(l.short)}</p><span class="card-link">See ${esc(l.name)} ${ico('arrow', 16)}</span></a>`).join('\n      ')}
    </div>
    <p class="note">Larger commercial projects anywhere in the US on request.</p>
  </div>
</section>`;
}

export function plannerSection(plannerHtml) {
  return `
<section class="section section--mist" id="plan-section">
  <div class="wrap wrap--narrow">
    ${plannerHtml}
  </div>
</section>`;
}

export const HOME_FAQ = [
  { q: 'Do you really answer 24/7?', a: "Yes — call or text 631-871-5957 any time. Questions? We're here 24/7." },
  { q: 'Is the demo really free?', a: 'Yes. We can walk you through a camera system, Wi-Fi upgrade or POS setup in person or on a video call, with no obligation. References are available on request.' },
  { q: 'Which areas do you cover?', a: 'Suffolk and Nassau County on Long Island, all five NYC boroughs, the Hudson Valley (Westchester, Putnam, Dutchess, Orange) and the Johnstown / Capital Region. Remote support is available anywhere, and larger commercial projects anywhere in the US on request.' },
  { q: 'What camera brand do you install?', a: 'We are an InVid Tech Paramont authorized installer: IP cameras and recorders with 4K options, night vision and viewing from your phone — with no required monthly cloud fees.' },
  { q: 'Do I need a monthly plan?', a: 'No. Managed plans are optional — no contract is required to get service. They are there for people who want remote monitoring, camera health checks and priority support.' },
  { q: 'How much does it cost?', a: 'Every job is quoted to your site — there are no one-size packages. Book a free demo and you get a tailored plan and quote.' },
  { q: 'What payment methods do you accept?', a: 'Zelle, Venmo, Cash App, cash or check at no extra charge; credit/debit card via a secure payment link (4% card processing fee).' },
  { q: 'What is the Piet Box?', a: 'A small box we plug into your router. It calls Piets, so we can watch your internet, Wi-Fi, cameras and registers 24/7, help remotely with your OK and add features without a visit. Try the free demo at /piet-box.' },
  { q: 'How does remote support work?', a: 'We use RustDesk. You open RustDesk, read us your ID, and we connect with your permission.' },
];

export function finalCta() {
  return `
<section class="final-cta">
  <div class="final-cta__glow" aria-hidden="true"></div>
  <div class="wrap final-cta__inner">
    <div class="eyebrow eyebrow--light">Ready when you are</div>
    <h2>Get a tailored plan — and a free demo.</h2>
    <p>Tell us about your project. You deal directly with the installer, start to finish.</p>
    <div class="btn-row btn-row--center">
      <a href="/plan.html" class="btn btn-primary btn-lg">Build my plan ${ico('arrow', 18)}</a>
      <a href="tel:${SITE.phoneE164}" class="btn btn-ghost btn-lg">Call ${SITE.phone}</a>
    </div>
  </div>
</section>`;
}

/* New products band: Piet Box, Website Studio, Field HQ client portal */
export function newFromPiets() {
  const card = (href, icon, tag, title, text, cta) => `<a class="nfp__card" href="${href}">
      <span class="nfp__ic">${ico(icon, 26)}</span><span class="nfp__tag">${tag}</span>
      <h3>${title}</h3><p>${text}</p><span class="nfp__go">${cta} ${ico('arrow', 16)}</span></a>`;
  return `
<section class="section nfp" id="new">
  <div class="wrap">
    <div class="section-head"><div class="eyebrow">New from Piets</div><h2>Three new ways we take tech off your plate</h2><p>Try each one right here. Every demo is free and takes about a minute.</p></div>
    <div class="nfp__grid">
      ${card('/piet-box', 'hub', 'New · Piet Box', 'Plug it in. We handle the rest.', 'One small box that lets Piets watch your internet, Wi-Fi, cameras and registers 24/7 and fix things remotely.', 'Build your Piet Box demo')}
      ${card('/websites', 'browser', 'Website demo builder', 'See your new website first.', 'Answer five questions, add your logo and photos, and watch a demo of your new site get built.', 'Build my free website demo')}
      ${card(SITE.portalLive ? '/portal' : '/plan.html', 'portal', 'Field HQ client portal', 'Your job, in one place.', 'Approve quotes, see visits and photos, pay invoices and message Piets from your phone.', SITE.portalLive ? 'Take the portal tour' : 'Ask about the portal')}
    </div>
  </div>
</section>`;
}
