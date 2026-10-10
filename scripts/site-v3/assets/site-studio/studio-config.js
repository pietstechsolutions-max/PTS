/* ============================================================
   PIETS SITE STUDIO — SETTINGS YOU CAN EDIT
   Prices are blank on purpose until the owner publishes a price list (set setup/monthly to numbers to show them).
   Piets Technology Solutions Inc · 631-871-5957
   ============================================================ */
window.STUDIO_CONFIG = {
  depositPercent: 50,           // % of setup price charged up front
  cardFeeNote: '',

  // Paste a Stripe Payment Link for each tier's DEPOSIT (dashboard.stripe.com → Payment Links).
  // Leave '' and the button turns into "Request an invoice" automatically.
  stripeLinks: {
    starter: '',
    pro: '',
    premium: '',
    shabang: ''
  },

  tiers: [
    { id: 'starter', name: 'Starter', setup: null, monthly: null, tag: 'Get online right',
      features: ['Your demo turned into a real site (up to 5 pages)', 'Your logo, colors, photos and real reviews', 'Click-to-call, text and quote form to your phone + email', 'Google Business Profile hookup', 'Hosting, SSL and small monthly edits', 'Live in about 7 days'] },
    { id: 'pro', name: 'Pro', setup: null, monthly: null, tag: 'More pages, more leads', popular: true,
      features: ['Everything in Starter', 'Up to 12 pages, with service + town pages for Google', 'Live animated hero like your demo', 'AI assistant trained on your business', 'Field HQ Lite: lead inbox + auto text-back', 'One new blog post every month'] },
    { id: 'premium', name: 'Premium', setup: null, monthly: null, tag: 'Run the business from it',
      features: ['Everything in Pro', 'Full Field HQ: quotes, jobs, invoices, client portal', 'Custom tools (price builder, planner, booking)', 'Review-request automation', 'Two blog posts a month + ad landing pages', 'Priority same-day edits'] },
    { id: 'shabang', name: 'The Whole Shabang', setup: null, monthly: null, tag: 'All in. Everything.', vip: true,
      features: ['Everything we build, all in', 'We handle your whole online presence for you', 'Constant hands-on support from Piets', 'We scope the full list together on a call', 'Built around your business, nothing off the shelf'] }
  ]
};
