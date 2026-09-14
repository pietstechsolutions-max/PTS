# GO LIVE — pietstechsolutions.com (plain-English checklist)

Everything below is already built. These are the only steps that need YOUR logins.

## 1. Put the code on GitHub (5 min)
1. github.com → New repository → name `piets-site` → Private → Create.
2. Unzip `piets-site.zip` on your PC, open a terminal in that folder and run:
   git init && git add . && git commit -m "Piets site" && git branch -M main
   git remote add origin https://github.com/YOUR-USER/piets-site.git && git push -u origin main

## 2. Start the server on Render.com (free tier works for sandbox) (5 min)
1. render.com → sign up with GitHub → New → Blueprint → pick `piets-site` (it reads render.yaml).
2. In the service → Environment, add:
   ADMIN_EMAIL, ADMIN_PASSWORD (pick a real one), SESSION_SECRET (any long random text),
   OWNER_PHONE=+16318715957, BASE_URL=https://pietstechsolutions.com, BLOG_API_TOKEN (long random text).
   Leave Stripe/Twilio blank for now = SANDBOX mode (fake texts/payments show in Admin → Outbox).
3. Deploy. You get a URL like https://piets-site.onrender.com. Test /portal and /admin there.

## 3. Point the GoDaddy domain (5 min, takes up to 1 hr to spread)
Render → Settings → Custom Domains → add pietstechsolutions.com and www.pietstechsolutions.com. Render shows two records. In GoDaddy → My Products → DNS:
- Type A, Name @, Value = the IP Render shows (currently 216.24.57.1)
- Type CNAME, Name www, Value = piets-site.onrender.com
Delete/replace the old A record pointing to the old site (GoDaddy keeps nothing you need — the old site stays in your GoDaddy account).
Render issues the free SSL automatically.

## 4. Turn on real payments — Stripe (10 min)
1. stripe.com → create account for Piets Technology Solutions Inc (EIN, bank account).
2. Developers → API keys → copy Secret + Publishable into Render env (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY).
3. Developers → Webhooks → Add endpoint: https://pietstechsolutions.com/webhooks/stripe, events: checkout.session.completed, invoice.paid, customer.subscription.* → copy signing secret → STRIPE_WEBHOOK_SECRET.
4. Admin → Settings → set the 3 managed-service plan prices.

## 5. Turn on real texting — Twilio + A2P 10DLC (15 min + 1–7 days approval)
1. twilio.com → create account → buy a 631 number.
2. Trust Hub → A2P 10DLC → Register brand as a US company (legal name Piets Technology Solutions Inc, EIN, address, website pietstechsolutions.com) → Low-volume standard campaign, use case "Mixed" (customer care + marketing). Sample messages and opt-in language are in server/README.md. Opt-in language must also be on the website form (already there).
3. Messaging → Services → create a Messaging Service, add the number, set inbound webhook: https://pietstechsolutions.com/webhooks/twilio/sms
4. Put TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, TWILIO_MESSAGING_SERVICE_SID into Render env. Until the campaign is approved, texts to US numbers are blocked/filtered — that's carrier policy, not a bug.

## 6. Email sending (optional, 5 min)
Gmail → App password → SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, SMTP_SECURE=true, SMTP_USER=pietstechsolutions@gmail.com, SMTP_PASS=app password.

## 7. Maps — do this ONE listing right (30 min, verification by video/postcard)
Google and Apple both require a real address you work from. Fake/virtual "locations" get suspended and can drag down the real listing. So:
1. business.google.com → Add business → "Piets Technology Solutions" → category "Security system installer" (+ Computer support, Electronics repair, Home automation company) → choose "I deliver goods and services to my customers" → HIDE address → service areas: Suffolk County, Nassau County, New York NY, Westchester County, Dutchess County, Orange County, Fulton County (Johnstown), Albany, Saratoga Springs.
2. Add phone 631-871-5957, website, hours, description (24/7 support line), the 4 location page URLs as products/services, photos of real jobs, the logo.
3. businessconnect.apple.com → same details (Apple Business Connect).
4. Also list on Bing Places, Yelp, Nextdoor, Angi/Thumbtack for backlinks.
5. Ask every finished job for a Google review (the "job complete" automation already texts the request — paste your review link into Admin → Settings).
The four location pages on the site (/locations/...) are what rank you in those areas.

## 8. Search engines
- search.google.com/search-console → add property pietstechsolutions.com → verify by DNS TXT in GoDaddy → submit sitemap https://pietstechsolutions.com/sitemap.xml
- bing.com/webmasters → import from Google Search Console → done (Bing also feeds DuckDuckGo/Yahoo).
- Add GA4 and Meta Pixel IDs where the code says TODO (owner) in public/assets/site.js.

## 9. Weekly blog
A scheduled task drafts and publishes one SEO post a week via the blog API (needs BLOG_API_TOKEN set in Render and pasted into the task). Until then it saves the draft into PIETS_HQ/10_SALES_MARKETING/Blog_Drafts.

## Placeholders to fill (Admin → Settings or the HTML)
Plan prices · 3 testimonials · license # in footer · GA4/Pixel IDs · Google review link.

## 10. Zapier + AI agents (added)
- Admin → Integrations: create an API key (copy it once), add Zapier "Catch Hook" URLs for the events you want, and set up AI agents.
- Full step-by-step: SERVER_ZAPIER_AND_AI.md. Env to add on Render: API_TOKEN, ANTHROPIC_API_KEY (or OPENAI_API_KEY / OPENAI_BASE_URL for local models).
- AI agents default to "draft only" — you approve every text in Admin → Conversations before it goes out.
