# SEO + AI pass — Oct 11, 2026

Branch: `seo-ai-2026-10-11` (made from `master` 16f203d). Nothing here is live until it is merged into `master`.

> IMPORTANT for the next PC release: `projects\pts-v4-demo` on the PC does not have these changes yet.
> Before the next PUSH WEBSITE PREVIEW, pull this branch (or `master` after the merge) into `pts-v4-demo`,
> or the preview push will overwrite them.

## What changed
- meta: services.html
- meta: plan.html
- meta: coverage.html
- meta: commercial.html
- meta: plans.html
- meta: remote-support.html
- meta: about.html
- meta: websites.html
- meta: piet-box.html
- meta: portal.html
- meta: locations/index.html
- meta: locations/long-island.html
- meta: locations/nyc.html
- meta: locations/hudson-valley.html
- meta: locations/johnstown-capital-region.html
- meta: blog/index.html
- meta: apps.html
- meta: fieldhq.html
- meta: payments.html
- meta: ghost-kitchen.html
- meta: design-studio.html
- meta: lighting.html
- meta: fleet.html
- meta: financing.html
- meta: software.html
- meta: partners.html
- meta: blog/website-for-contractors-long-island.html
- meta: blog/permanent-lighting-vs-putting-them-up-every-year.html
- meta: blog/what-your-card-statement-is-costing-you.html
- meta: blog/small-business-pos-setup-cost.html
- meta: blog/wifi-dead-zones-why-your-router-isnt-enough.html
- share image: services.html -> og-services.jpg
- share image: plan.html -> og-plan.jpg
- share image: commercial.html -> og-commercial.jpg
- share image: plans.html -> og-plans.jpg
- share image: remote-support.html -> og-remote-support.jpg
- share image: about.html -> og-about.jpg
- share image: portal.html -> og-portal.jpg
- share image: lighting.html -> og-lighting.jpg
- share image: financing.html -> og-financing.jpg
- share image: software.html -> og-software.jpg
- share image: partners.html -> og-partners.jpg
- share image: locations/index.html -> og-locations.jpg
- share image: locations/long-island.html -> og-locations-long-island.jpg
- share image: locations/nyc.html -> og-locations-nyc.jpg
- share image: locations/hudson-valley.html -> og-locations-hudson-valley.jpg
- share image: locations/johnstown-capital-region.html -> og-locations-johnstown-capital-region.jpg
- share image: blog/index.html -> og-blog.jpg
- share image: blog/how-many-security-cameras-long-island-home.html -> og-blog-how-many-security-cameras-long-island-home.jpg
- share image: blog/permit-for-security-cameras-suffolk-county.html -> og-blog-permit-for-security-cameras-suffolk-county.jpg
- share image: blog/wifi-dead-zones-why-your-router-isnt-enough.html -> og-blog-wifi-dead-zones-why-your-router-isnt-enough.jpg
- share image: blog/restaurant-wifi-setup-hudson-valley.html -> og-blog-restaurant-wifi-setup-hudson-valley.jpg
- share image: blog/small-business-pos-setup-cost.html -> og-blog-small-business-pos-setup-cost.jpg
- share image: blog/what-your-card-statement-is-costing-you.html -> og-blog-what-your-card-statement-is-costing-you.jpg
- share image: blog/permanent-lighting-vs-putting-them-up-every-year.html -> og-blog-permanent-lighting-vs-putting-them-up-every-year.jpg
- share image: blog/website-for-contractors-long-island.html -> og-blog-website-for-contractors-long-island.jpg
- Service schema: lighting.html
- Service schema: payments.html
- Service schema: ghost-kitchen.html
- Service schema: financing.html
- Service schema: fleet.html
- Service schema: design-studio.html
- new page: /security-cameras.html
- new page: /wifi-networking.html
- new page: /it-support.html
- new page: /structured-cabling.html
- new page: /access-control.html
- new page: /smart-home.html
- new page: /locations/suffolk-county.html
- new page: /locations/nassau-county.html
- new page: /contact.html
- new page: /links.html
- site-wide: {'anchors': 511, 'footer_areas': 44, 'footer_contact': 44, 'nav_contact': 43}
- home: new H1, service cards link to service pages, partners block shortened to one strip, fixed unclosed </p>
- services: "Full details" button on 6 sections
- 404: removed duplicate robots tag
- US spelling: colour->color, licence->license, labelled->labeled (visible text only)
- locations: hub + Long Island link to Suffolk/Nassau pages
- blog links: blog/how-many-security-cameras-long-island-home.html
- blog links: blog/permit-for-security-cameras-suffolk-county.html
- blog links: blog/wifi-dead-zones-why-your-router-isnt-enough.html
- blog links: blog/restaurant-wifi-setup-hudson-valley.html
- blog links: blog/small-business-pos-setup-cost.html
- blog links: blog/what-your-card-statement-is-costing-you.html
- blog links: blog/permanent-lighting-vs-putting-them-up-every-year.html
- blog links: blog/website-for-contractors-long-island.html
- sitemap: +9 pages, lastmod 2026-10-11
- schema: 42 Service urls now point at the new service pages
- new file: /llms.txt- vercel.json: www.pietstechsolutions.com 301 -> pietstechsolutions.com; /contact-us -> /contact
- vercel.json + api/not-found.js: any address that matches no page now answers with a real 404 and the branded 404 page (it used to return the home page with 200)
- public/robots.txt: AI search crawlers named and allowed, sitemap + llms.txt listed

## Not done (waiting on Matt)
- Facebook + Google Business Profile links in the business schema (sameAs) and footer
- Google reviews section (needs the Google Business Profile)
- Blog author as a person (no answer yet; company name kept)
- CSS file merge (skipped: risk of changing the look for a small speed gain)

Much of this was prepared with AI. Matt does his best to keep it perfect. If you spot a mistake, tell Matt at 631-871-5957 so he can fix it.
