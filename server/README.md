# Piets HQ server

One Node.js app that runs three things for Piets Technology Solutions:

| What | Where | Who uses it |
|---|---|---|
| Public website (static, pre-rendered blog) | `/` | Customers, Google |
| Client Hub (quotes, jobs, invoices, pay online, plans, messages) | `/portal` | Customers |
| Back office (CRM, pipeline, quotes, jobs, invoices, texting, campaigns, automations) | `/admin` | You |

It behaves like a mix of **GoHighLevel** (leads, pipeline, SMS/email automations, campaigns) and **Jobber** (quote -> job -> invoice -> payment, client hub).

---

## 1. Run it on your computer

You need Node.js 22 or newer (https://nodejs.org).

```bash
cd piets-site
npm install
npm start
```

Then open:

* http://localhost:3000/ - the website
* http://localhost:3000/portal - Client Hub. Demo customer: phone **631-555-0100** or email **demo@example.com**
* http://localhost:3000/admin - back office. Default login **admin@pietstechsolutions.com / change-me**

The first start creates `server/data/piets.db` (SQLite) and fills it with demo data (3 contacts, leads in every stage, 2 estimates, jobs, invoices, a subscription). `npm run seed:reset` wipes it and re-seeds.

`npm test` runs the smoke test (starts the app on a random port in sandbox mode and walks lead capture, portal login, invoices, Stripe checkout, Twilio inbound, automations, admin, the `/api/v1` API, outbound webhooks with signatures, and AI agents in mock + custom-URL mode).

### Sandbox mode (no keys)

Until you add real Stripe / Twilio / SMTP keys, the app runs in **SANDBOX**:

* Nothing is texted, emailed or charged.
* Every text, email and payment link is written to **Admin -> Outbox** (and printed in the terminal).
* Portal login codes show up in the Outbox with a yellow "login code" badge.
* "Pay by card" opens a fake Stripe page with a "Pay (simulated)" button that marks the invoice paid the same way a real Stripe webhook would.

Set `SANDBOX=true` in `.env` to force this even with real keys (handy for testing on the live server).

---

## 2. Going live: keys go in `server/.env`

Copy `server/.env.example` to `server/.env` and fill it in. Every variable is explained in that file. The important ones:

| Variable | What it is |
|---|---|
| `BASE_URL` | The public address, e.g. `https://hq.pietstechsolutions.com`. Used in links inside texts/emails. |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Your back-office login. **Change these before going live.** |
| `SESSION_SECRET` | Long random string. |
| `OWNER_PHONE` | Your cell (+1XXXXXXXXXX). New-lead / approval / reply alerts are texted here. |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | From the Stripe dashboard. Card payments (4% fee added) and monthly plans. |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` | From the Twilio console. All texting. |
| `BLOG_API_TOKEN` | Secret for `POST /api/blog` (publish posts from a script / AI writer). Blank = API off. |
| `API_TOKEN` | Master key for the Zapier / REST API at `/api/v1` (named keys can also be made in Admin -> Integrations). |
| `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `OPENAI_BASE_URL` | AI agents. Blank = mock replies. `OPENAI_BASE_URL` also points at Ollama / LM Studio. |
| `WEBHOOK_TIMEOUT_MS` | How long to wait for an outbound webhook (default 10000). |
| `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` | Email sending. For Gmail use `smtp.gmail.com`, port 587 and an **App Password**. |

A provider goes live as soon as its keys are present; the others stay mocked. The startup banner and **Admin -> Settings -> Provider status** show what is live.

### Webhook URLs to paste

| Service | Where | URL |
|---|---|---|
| Twilio | Phone Numbers -> your number -> Messaging -> "A message comes in" (HTTP POST) | `https://YOUR-DOMAIN/webhooks/twilio/sms` |
| Stripe | Developers -> Webhooks -> Add endpoint | `https://YOUR-DOMAIN/webhooks/stripe` |

Stripe events to select: `checkout.session.completed`, `invoice.paid`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`. Copy the endpoint's **Signing secret** into `STRIPE_WEBHOOK_SECRET`.

Inbound texts are signature-checked when Twilio keys are present; Stripe events are signature-checked when the webhook secret is present.

---

## 3. Deploy on Render.com (recommended) or Railway

### Render

1. Push this folder to a GitHub repo.
2. In Render: **New + -> Blueprint**, pick the repo. It reads `render.yaml` (Docker build, 1 GB persistent disk mounted at `/app/server/data` for the database, health check on `/healthz`).
3. Fill in the environment variables it asks for (the ones marked `sync: false`).
4. Deploy. Your app is at `https://piets-hq.onrender.com` until you add a custom domain (Settings -> Custom Domains).
5. Set `BASE_URL` to the final address and redeploy.

The free plan has no persistent disk, so the database would reset on every deploy - use the Starter plan.

### Railway

1. **New Project -> Deploy from GitHub repo**. Railway detects the `Dockerfile`.
2. Add a **Volume** and mount it at `/app/server/data`.
3. Add the variables from `.env.example` in the Variables tab (`PORT` is provided by Railway).
4. Settings -> Networking -> Generate domain (or add your custom domain).

### Docker anywhere

```bash
docker build -t piets-hq .
docker run -p 3000:3000 -v piets-data:/app/server/data --env-file server/.env piets-hq
```

---

## 4. Pointing the GoDaddy domain

Decide the address, e.g. `hq.pietstechsolutions.com` for this app (keep `www` on the marketing site if it is hosted elsewhere; or point the root at this app since it serves the website too).

In GoDaddy: **My Products -> DNS** for pietstechsolutions.com.

**Sub-domain (recommended, e.g. hq.):**

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | `hq` | the hostname Render/Railway shows (e.g. `piets-hq.onrender.com`) | 1 hour |

**Root domain (pietstechsolutions.com itself):**

| Type | Name | Value |
|---|---|---|
| A | `@` | the IP address Render shows under Custom Domains (Render uses `216.24.57.1`; check the dashboard) |
| CNAME | `www` | `piets-hq.onrender.com` (or your Railway host) |

Delete any existing "Parked" A record for `@` first. DNS takes 10 minutes to a few hours. Add the same domain under Custom Domains in Render/Railway so they issue the free HTTPS certificate. Then set `BASE_URL=https://...` and restart.

---

## 5. Twilio A2P 10DLC registration (required to text US customers from a business)

US carriers block unregistered business texting. Registration is done once in the Twilio console (Messaging -> Regulatory Compliance). Track progress in **Admin -> Settings -> A2P 10DLC checklist**.

**What you need (US corporation):**

1. **Legal business name** exactly as on the IRS letter: `Piets Technology Solutions Inc`
2. **EIN** (tax ID) - Twilio verifies it against IRS records; the name and address must match the IRS letter.
3. Business type: **Private / Corporation**; industry: **Professional services / Home services**.
4. Website: `https://pietstechsolutions.com` (must be live and show the business name and contact info).
5. Business phone `631-871-5957` and email `pietstechsolutions@gmail.com`. An authorized representative's name, title and email are required by Twilio but never appear to customers.

**Steps:**

1. **Create a Customer Profile / Brand** (Messaging -> Regulatory Compliance -> Brands). Low-volume "Standard" brand is enough for a solo business. One-time fee ~$4 + carrier vetting.
2. **Create a Campaign** (use case: **Mixed** - "Customer care and marketing" - or **Low Volume Mixed**). Answer:
   * *Campaign description:* "Piets Technology Solutions sends appointment confirmations, estimates, invoices and payment links to customers who requested service, plus occasional promotions to customers who opted in."
   * *Message flow / opt-in description:* "Customers opt in by submitting the quote request form on pietstechsolutions.com (checkbox: 'Text me about my estimate and appointments'), by texting QUOTE to our number, or verbally when booking service. Opt-in language: 'By providing your number you agree to receive texts from Piets Technology Solutions about your service. Msg & data rates may apply. Reply STOP to opt out, HELP for help.'"
   * *Sample message 1:* "Hi John, thanks for reaching out to Piets Technology Solutions! We got your request for security cameras and will text you shortly to set up a free estimate. Reply STOP to opt out"
   * *Sample message 2:* "Hi John, your estimate EST-1002 from Piets Technology Solutions is ready: https://hq.pietstechsolutions.com/portal/quotes/2 (valid 7 days). Reply STOP to opt out"
   * *Sample message 3:* "Hi John, invoice INV-1002 for $239.25 is due on receipt: https://hq.pietstechsolutions.com/portal/invoices/2. Pay by Zelle, Venmo, Cash App, check or card."
   * Tick: messages include links = yes; include phone numbers = yes; embedded links = yes; age-gated = no; direct lending = no.
   * Opt-out keywords: STOP; help keyword: HELP; opt-in keyword: START (the app already handles these).
3. **Link the phone number** to the campaign's Messaging Service (Messaging -> Services -> Sender pool). Put that Messaging Service SID into `TWILIO_MESSAGING_SERVICE_SID`.
4. Wait for approval (a few days). Until approved, US texts may be filtered.

The app already: appends "Reply STOP to opt out" to marketing texts, only sends campaigns to opted-in contacts, sends between 8am-8pm ET, flags STOP/START/HELP automatically, and keeps an audit trail.

---

## 6. How things work (plain English)

* **Leads**: the website form posts to `POST /api/leads`. A contact is created (or matched by phone/email), a lead lands in the **New** column, the "new lead" automation texts the customer and alerts you.
* **Pipeline**: New -> Contacted -> Estimate Sent -> Won -> Lost. Every stage change is logged and visible to the client under "Quote requests" in their hub.
* **Quotes** are numbered EST-1001 up. Every save is a revision; the client sees the change log. Send = text + email with a portal link. Valid 7 days ("prices may rise after"). Client approves by typing their name -> lead is Won -> a **Job** is created.
* **Jobs** have a date, checklist (client-visible) and materials. Mark complete -> an **Invoice** draft (INV-1001 up) is created from the estimate and the review-request automation fires.
* **Invoices**: service date + invoice date, "Due on receipt", 8.75% Suffolk tax once at the bottom. Client pays by card (Stripe Checkout, 4% fee shown as its own line) or Zelle/Venmo/Cash App/cash/check (you record it in Admin). Unpaid invoices go Overdue after 14 days and reminders go out at 3 and 7 days.
* **Managed services**: Basic / Pro / Business monthly plans priced in Settings (default $0 = "call for pricing"). Subscribe = Stripe Checkout in subscription mode; MRR shows on the dashboard.
* **Conversations**: two-way SMS inbox. Templates with `{{first_name}}`, `{{quote_link}}` etc.
* **Campaigns**: pick tags / stage, write the text, send now or later. Throttled per minute, opted-in only, quiet hours enforced.
* **Automations**: trigger -> steps (text, email, wait, tag, move stage, notify owner, stop-if). Waits go to the `jobs_queue` table and a scheduler checks it every minute. "Run scheduler now" on the Automations page fast-forwards.
* **Blog** (Admin -> Blog): posts are markdown files in `content/blog/` with front matter (title, description, date, slug, tags, focusKeyword). The editor auto-slugs from the title, shows a live SEO check (title <= 60, description <= 155, keyword in title / first paragraph / H2, word count) and runs `npm run build` on save so `/blog` updates immediately. Archive moves the file to `content/blog/_archive/`.
* **Blog API**: `POST /api/blog` with header `Authorization: Bearer <BLOG_API_TOKEN>` and JSON `{ "title", "description", "slug"?, "tags": [], "focusKeyword", "body" }` writes the file, rebuilds, and returns `{ ok, slug, url, build, seo }`. Posting an existing slug updates it. Missing/wrong token = 401.
* **Audit log**: every action. Nothing is ever hard-deleted; records are archived.

---

## 7. Zapier & API (Admin -> Integrations)

Full step-by-step guide with the six ready-made Zaps: **[`ZAPIER_AND_AI.md`](./ZAPIER_AND_AI.md)**.

**Two directions:**

1. **Piets HQ -> Zapier (outbound webhooks).** Every event below is POSTed as JSON to any URL you add under Admin -> Integrations -> Outbound webhooks (a Zapier "Catch Hook", Make, n8n, your own script). Pick which events each webhook gets, press **Send test** to fire a sample, and read the per-webhook delivery log. Payload: `{ event, timestamp, id, data: { contact, lead | quote | invoice | job | message | payment | subscription | campaign | post }, links: { portal, admin } }`. If the webhook has a secret, header `X-Piets-Signature: sha256=<HMAC-SHA256 of the raw body>` is added. Failed deliveries retry after 1, 5 and 30 minutes through `jobs_queue`. In sandbox a copy of every delivery is in Admin -> Outbox -> Webhooks.

   Events: `new_lead`, `lead_stage_changed`, `contact_created`, `contact_updated`, `quote_sent`, `quote_approved`, `quote_declined`, `quote_change_requested`, `job_scheduled`, `job_complete`, `invoice_sent`, `invoice_paid`, `invoice_overdue`, `payment_recorded`, `subscription_started`, `subscription_canceled`, `inbound_sms`, `campaign_sent`, `blog_published`.

2. **Zapier -> Piets HQ (REST API at `/api/v1`).** Every call needs `Authorization: Bearer <key>` where the key is `API_TOKEN` from `.env` or a named key created in Admin -> Integrations (shown once, stored hashed, revoke = archive). Responses are always `{ ok: true, data }` or `{ ok: false, error }`. 120 requests/minute per key. Bodies are validated (zod) and errors say which field is wrong.

| Method + path | What it does |
|---|---|
| `POST /contacts` | Create or update a contact, matched by phone or email (`name, phone, email, town, company, tags[], source, note`) |
| `GET /contacts?q=` · `GET /contacts/:id` | Search / full record with leads, quotes, invoices, jobs, notes, messages |
| `POST /contacts/:id/notes` · `POST /contacts/:id/tags` | Add a note / add or remove tags |
| `POST /leads` · `GET /leads` · `POST /leads/:id/stage` | New quote request (fires the new-lead automation) / list / move stage |
| `POST /messages/sms` · `POST /messages/email` | Text or email a contact. SMS respects STOP (409) and quiet hours (queued, `202`) unless `"urgent": true` |
| `GET /quotes` · `POST /quotes` · `POST /quotes/:id/send` | Estimates (`title, items[{description, qty, unit_price}]`, `send: true` to send at once) |
| `GET /invoices` · `POST /invoices` · `POST /invoices/:id/send` · `POST /invoices/:id/payments` | Invoices and manual payments (`amount, method, reference`) |
| `GET /jobs` · `POST /jobs` · `POST /jobs/:id/complete` | Schedule work (`title, scheduled_at` ISO, `notes, checklist[]`) |
| `POST /automations/:id/trigger` | Run an automation for a contact (`contactId` or `phone`/`email`) |
| `POST /campaigns/:id/send` | Send or schedule a campaign |
| `GET /events?since=<id>` | Polling trigger: events after an id (or ISO time). `&flat=1` returns a bare array for Zapier "Retrieve Poll" |
| `POST /blog` | Same as `POST /api/blog` |
| `POST /ai/run` · `GET /ai/agents` | Run an AI agent (below) |

Automations also gained two step types: **webhook** (POST the event JSON to a URL) and **ai_agent** (run an agent for the contact).

## 8. AI agents (Admin -> Integrations -> AI agents)

Agents are rows in `ai_agents`: name, provider (`anthropic`, `openai`, `ollama`, `custom_url`), model, system prompt, temperature, the tools it may call, and an **autopilot** setting:

* **off** - the agent only returns text (shown in the API response / Test box).
* **draft-only** (default) - the reply is saved as a draft bubble in Admin -> Conversations; you edit and press **Send this reply**.
* **auto-send** - texted right away (opt-out and 8am-8pm ET quiet hours still apply).

Built-in tools (all write to the same tables the admin uses and are audit-logged): `lookup_contact`, `create_lead`, `add_note`, `send_sms`, `create_quote_draft`, `get_open_invoices`, `schedule_job`, `tag_contact`, `move_lead_stage`.

Seeded agents: **lead_qualifier** (runs on every inbound text when its autopilot is not off: asks the missing questions, tags hot/warm/cold, moves the stage when auto-sending), **sms_reply_drafter** (Piets voice: upbeat, short, free demo, never prices, signs 631-871-5957; also the "Draft reply with AI" button in Conversations) and **quote_summarizer** (job notes -> plain-English scope, never invents prices).

Run one: `POST /api/v1/ai/run {"agent":"sms_reply_drafter","contactId":1,"input":{"text":"Do you do doorbell cameras?"}}` -> `{ ok, data: { output, tool_calls, mock, autopilot, run_id } }`. Without an API key every provider returns a deterministic mock and logs to Admin -> Outbox -> AI, so everything can be tested offline. The **Test** box on each agent runs it with sample input and shows the reply and tool calls (tools do run for real).

`custom_url` POSTs `{ agent, system_prompt, input, prompt, contact, tools }` to any URL (a Zapier/Make AI step, n8n, your own model server) and uses `output` (or `reply`/`text`) plus an optional `tool_calls: [{ name, arguments }]` array from the response.

## 9. Routes

Public: `GET /healthz`, `POST /api/leads`, `POST /api/blog` (bearer token), `POST /webhooks/twilio/sms`, `POST /webhooks/stripe`, `GET /brand/*`, `GET /assets/brand/*`, static site at `/`.

API (`/api/v1`, bearer key): see section 7 (`contacts`, `leads`, `messages/sms`, `messages/email`, `quotes`, `invoices`, `jobs`, `automations/:id/trigger`, `campaigns/:id/send`, `events`, `blog`, `ai/run`, `ai/agents`, `ping`).

Portal (`/portal`): `login`, `login/verify`, `logout`, `/` home, `requests`, `quotes`, `quotes/:id` (+ `/approve`, `/decline`, `/changes`, `/print`), `jobs`, `invoices`, `invoices/:id` (+ `/pay`, `/print`), `account`, `plans` (+ `/subscribe`, `/cancel`), `messages`.

Admin (`/admin`): `login`, `logout`, dashboard `/`, `contacts` (+ `/new`, `/:id`, `/:id/edit`, `/:id/notes`, `/:id/archive`, `/:id/optin`), `pipeline` (+ `/:id/stage`, `/:id`, `/:id/reply`, `/:id/archive`), `quotes` (+ `/new`, `/:id`, `/:id/edit`, `/:id/print`, `/:id/send`, `/:id/approve`, `/:id/convert`, `/:id/invoice`, `/:id/archive`), `jobs` (+ `/new`, `/:id`, `/:id/complete`, `/:id/archive`), `invoices` (+ `/new`, `/:id`, `/:id/edit`, `/:id/print`, `/:id/send`, `/:id/payment`, `/:id/card-link`, `/:id/archive`), `conversations` (+ `/:contactId`), `campaigns` (+ `/:id`, `/:id/send`, `/:id/archive`), `automations` (+ `/new`, `/:id/edit`, `/:id/toggle`, `/:id/test`, `/:id/archive`, `/run-queue`), `blog` (+ `/new`, `/:slug/edit`, `/:slug`, `/:slug/archive`, `/:slug/restore`), `blog-rebuild`, `templates`, `settings`, `outbox`, `audit`, `integrations` (+ `/keys`, `/keys/:id/revoke`, `/webhooks`, `/webhooks/:id`, `/webhooks/:id/test`, `/webhooks/:id/toggle`, `/webhooks/:id/archive`, `/agents`, `/agents/:id`, `/agents/:id/test`, `/agents/:id/archive`), conversations drafts (`/conversations/:contactId/drafts/:id/send`, `/discard`, `/conversations/:contactId/ai-draft`).
