# Zapier, the API and AI agents - plain-English guide

This is the "connect Piets HQ to everything else" manual. It covers three things you will find under **Admin -> Integrations** (the tab between Blog and Settings):

1. **Outbound webhooks** - Piets HQ *pushes* things that happen (new lead, invoice paid...) to Zapier, Make, n8n, Google Sheets, QuickBooks, Slack, anything.
2. **The API** - other tools *push into* Piets HQ (Facebook Lead Ads creates a lead, Google Calendar creates a job, a missed call sends a text...).
3. **AI agents** - little helpers that read the CRM and draft texts, qualify leads or write scope summaries, and that Zaps or automations can call.

Nothing here needs code. Everything can be tested in sandbox mode before any real text goes out.

---

## Part 1 - Before you start: get an API key

You only need this for Part 3 (Zapier -> Piets HQ) and Part 4 (AI). Outbound webhooks (Part 2) do not need a key.

1. Open **Admin -> Integrations**. The first box is **API keys**.
2. In "New key name" type where it will be used, e.g. `Zapier`, and press **Create key**.
3. A yellow box appears with the key (it starts with `pk_`). **Copy it now** - it is only shown once. If you lose it, revoke it and make a new one.
4. In Zapier you will paste it as a header: **Authorization** = `Bearer pk_...` (the word Bearer, a space, then the key).

You can instead put one master key in `server/.env` as `API_TOKEN=...` and restart; it works the same way. Keys can be revoked any time from the same box (Zaps using a revoked key get a 401 error).

To check a key works, open a terminal and run:

```
curl -H "Authorization: Bearer pk_YOURKEY" https://YOUR-DOMAIN/api/v1/ping
```

You should see `{"ok":true,"data":{"pong":true,...}}`.

---

## Part 2 - Piets HQ -> Zapier (outbound webhooks / "Catch Hook")

### What you see in Zapier

1. Log in to Zapier and press **+ Create -> Zaps**. You get an empty canvas with a **Trigger** box on top and an **Action** box under it.
2. Click the Trigger box. In the search field type **Webhooks** and choose **Webhooks by Zapier** (orange icon).
3. Under *Event* choose **Catch Hook** and press **Continue**.
4. Zapier now shows a long URL that looks like `https://hooks.zapier.com/hooks/catch/1234567/abcdefg/` with a **Copy** button. Copy it. (Leave "Pick off a Child Key" blank.)
5. Press **Continue** and then **Test trigger**. Zapier now sits waiting for a request - keep this tab open.

### Where to paste it in Piets HQ

1. In another tab open **Admin -> Integrations** and scroll to **Outbound webhooks**.
2. Open **+ Add outbound webhook**:
   * **Name**: anything, e.g. `Zapier - new leads`.
   * **URL**: paste the Zapier URL.
   * **Signing secret**: leave blank for Zapier (Zapier cannot check signatures; use it for your own scripts).
   * **Events to send**: tick the events you want. For a new-lead Zap tick only **new_lead**. Ticking **all events** sends everything (good for a Google Sheet "activity log").
3. Press **Add webhook**. The hook appears as a card with an **on** badge.
4. Press **Send test** on that card. Piets HQ POSTs a sample `new_lead` (using your first contact) to Zapier. The green flash message tells you it was delivered (HTTP 200).
5. Back in Zapier press **Find new records** - the sample request appears. Press **Continue with selected record**.

Now build the Action (Google Sheets row, Slack message, Gmail...). The fields you can drag in are exactly the JSON below.

### What the payload looks like

Every webhook receives this JSON body (fields differ a little per event; everything under `data` is only present when it applies):

```json
{
  "event": "new_lead",
  "timestamp": "2026-09-12T14:03:00.000Z",
  "id": 41,
  "data": {
    "contact": { "id": 7, "name": "Maria Lopez", "first_name": "Maria", "last_name": "Lopez", "phone": "+16315550101", "email": "maria@example.com", "town": "Huntington", "tags": ["lead"], "sms_opt_in": 1 },
    "lead": { "id": 12, "stage": "New", "service": "Security cameras", "message": "4 cameras, driveway + backyard", "source": "Website", "value_cents": 0 }
  },
  "links": { "portal": "https://YOUR-DOMAIN/portal", "admin": "https://YOUR-DOMAIN/admin/pipeline" }
}
```

Other events carry `data.quote` (with `items`), `data.invoice` (with `items`, `due_cents`), `data.job` (with `checklist`), `data.message` (inbound texts), `data.payment`, `data.subscription`, `data.campaign`, `data.post` (blog) and `data.change` (`{ from, to }` for stage changes). Money is always in **cents** (`23925` = $239.25); in Zapier add a *Formatter -> Numbers -> Perform Math Operation* step (divide by 100) if you need dollars.

Headers sent: `Content-Type: application/json`, `X-Piets-Event: <event name>`, `X-Piets-Delivery: <event id>`, and `X-Piets-Signature: sha256=<hex>` when a secret is set (HMAC-SHA256 of the raw body - verify it in your own scripts before trusting the data).

### The event names (tick these on the webhook or filter on them in Zapier)

| Event | Fires when |
|---|---|
| `new_lead` | Website form, text-in QUOTE, API `POST /leads`, or an AI agent creates a quote request |
| `lead_stage_changed` | A lead moves column in the pipeline (`data.change.from` / `to`) |
| `contact_created` / `contact_updated` | A contact is created / edited (admin, API, portal) |
| `quote_sent` / `quote_approved` / `quote_declined` / `quote_change_requested` | Estimate lifecycle (client actions come from the portal) |
| `job_scheduled` | A job is created or its date changes |
| `job_complete` | Job marked complete (an invoice draft was created) |
| `invoice_sent` / `invoice_paid` / `invoice_overdue` | Invoice lifecycle |
| `payment_recorded` | Every payment (card, Zelle, cash...) including partials |
| `subscription_started` / `subscription_canceled` | Managed-services plan changes (Stripe or client request) |
| `inbound_sms` | Every text received, including STOP/START (`data.message.body`) |
| `campaign_sent` | A campaign finished sending |
| `blog_published` | A post was published from Admin -> Blog or the API |

### Delivery log, retries, sandbox

* Each webhook card has a **Delivery log** showing the last 10 attempts with the HTTP status and how long it took.
* If Zapier is down or the URL is wrong, Piets HQ retries after 1 minute, 5 minutes and 30 minutes (through the same queue as automation waits - see Admin -> Automations -> Queued steps). After that the delivery is marked failed and the card shows a red "consecutive failures" count. Fix the URL and press **Send test**.
* In **sandbox mode** (no Twilio/Stripe keys yet) every webhook still fires for real (it is your own URL) *and* a copy lands in **Admin -> Outbox -> Webhooks** so you can read the exact JSON.
* Turn a webhook off with **Turn off**; **Archive** hides it (nothing is ever deleted).

### Alternative: polling instead of webhooks

If you prefer Zapier to *ask* every few minutes, use **Webhooks by Zapier -> Retrieve Poll** with URL `https://YOUR-DOMAIN/api/v1/events?event=new_lead&flat=1` and header `Authorization: Bearer pk_...`. Zapier de-duplicates on the `id` field. Without `flat=1` the same endpoint returns `{ ok, data: { events, next_since } }` for scripts: call it again with `?since=<next_since>`.

---

## Part 3 - Zapier -> Piets HQ (the API)

### Setting up a "Webhooks by Zapier -> POST" action

1. In your Zap add an **Action**, search **Webhooks by Zapier**, choose event **POST** (or **Custom Request** if you need PUT/GET).
2. **URL**: one of the endpoints below, e.g. `https://YOUR-DOMAIN/api/v1/leads`.
3. **Payload Type**: `json`.
4. **Data**: add one row per field (left = field name, right = value, drag fields from the trigger). Nested lists like `items` need **Custom Request** with a raw JSON body.
5. **Wrap Request In Array**: no. **Unflatten**: yes.
6. **Headers**: add `Authorization` = `Bearer pk_YOURKEY` and `Content-Type` = `application/json`.
7. Press **Test action**. A good reply looks like `{"ok": true, "data": {...}}`. A bad one is `{"ok": false, "error": "phone: A phone number or a valid email is required"}` - the error names the field.

### Endpoints

All under `https://YOUR-DOMAIN/api/v1`. Every response is `{ ok, data }` or `{ ok, error }`. 120 requests per minute per key.

| Endpoint | Body fields | Notes |
|---|---|---|
| `POST /contacts` | `name` (or `first_name`/`last_name`), `phone`, `email`, `town`, `company`, `tags` (list or "a, b"), `source`, `note` | Matched by phone, then email. Existing contact = fields updated, tags merged. Returns `data.created`. |
| `GET /contacts?q=text` | | Searches name, phone, email, town, company, tags |
| `GET /contacts/:id` | | Full record: leads, quotes, invoices, jobs, notes, messages, balance |
| `POST /contacts/:id/notes` | `body` | Internal note |
| `POST /contacts/:id/tags` | `tags` or `tag`, optional `remove` | |
| `POST /leads` | `name`, `phone` and/or `email` (or `contactId`), `town`, `service`, `message`, `source`, `value` | Lands in the **New** column and runs the "New lead" automation (instant text + owner alert) |
| `POST /leads/:id/stage` | `stage`: `New`, `Contacted`, `Estimate Sent`, `Won`, `Lost` | |
| `POST /messages/sms` | `contactId` or `phone`, `body`, `urgent` (true/false), `footer` | Refused with 409 if the contact texted STOP. Outside 8am-8pm ET the text is queued (202) unless `urgent` is true. Unknown phone = contact created. |
| `POST /messages/email` | `contactId` or `email`, `subject`, `body`, `html` | |
| `GET /quotes?status=Sent` · `POST /quotes` · `POST /quotes/:id/send` | `contactId` (or `phone`/`email`), `title`, `items: [{ description, qty, unit_price }]`, `notes`, `tax_rate`, `send` | Prices in dollars. `send: true` texts + emails the portal link immediately |
| `GET /invoices?unpaid=1` · `POST /invoices` · `POST /invoices/:id/send` | `contactId`, `items`, `service_date`, `invoice_date`, `notes`, `tax_rate`, `send` | |
| `POST /invoices/:id/payments` | `amount` (dollars) or `amount_cents`, `method` (Zelle, Venmo, Cash App, Cash, Check, Card), `reference` | Omit amount to pay the full balance. Fires `payment_recorded` and `invoice_paid`. |
| `GET /jobs?from=&to=` · `POST /jobs` · `POST /jobs/:id/complete` | `contactId` (or `phone`/`email` + `name`), `title`, `scheduled_at` (ISO, e.g. `2026-10-02T14:00:00-04:00`), `notes`, `checklist: []`, `quoteId` | Complete creates the invoice draft |
| `POST /automations/:id/trigger` | `contactId` or `phone`/`email`, optional `leadId`, `quoteId`, `invoiceId`, `jobId`, `text` | Ids are on Admin -> Automations |
| `POST /campaigns/:id/send` | optional `scheduled_at` | |
| `GET /events?since=41&event=invoice_paid&limit=100` | | Polling trigger (see Part 2) |
| `POST /blog` | `title`, `description`, `slug`, `tags`, `focusKeyword`, `body` | Same as `/api/blog`; fires `blog_published` |
| `POST /ai/run` | `agent`, `input` (object, usually `{ "text": "..." }`), `contactId` or `phone`, `dryRun` | See Part 4 |
| `GET /ai/agents` | | Lists agents and tools |

### Six ready-made Zaps (also shown with copy buttons under Admin -> Integrations -> Zapier recipes)

**(a) New lead -> Google Sheets row + Slack/Gmail alert** *(Piets HQ -> Zapier)*
Trigger: Webhooks by Zapier / Catch Hook (Part 2) with an outbound webhook that has only `new_lead` ticked. Action 1: Google Sheets -> Create Spreadsheet Row, map `data contact name`, `data contact phone`, `data contact town`, `data lead service`, `data lead message`, `links admin`. Action 2: Slack -> Send Channel Message (or Gmail -> Send Email) with the same fields.

**(b) Facebook Lead Ads -> pipeline** *(Zapier -> Piets HQ)*
Trigger: Facebook Lead Ads / New Lead. Action: Webhooks POST to `/api/v1/leads`, body:
```json
{ "name": "Jane Smith", "phone": "631-555-0123", "email": "jane@example.com", "town": "Smithtown", "service": "Security cameras", "message": "Interested in 4 cameras", "source": "Facebook Lead Ads" }
```
Result: the lead appears in Admin -> Pipeline (New) and gets the instant "thanks, we'll text you" message.

**(c) Google Calendar event -> Job** *(Zapier -> Piets HQ)*
Trigger: Google Calendar / New Event (your work calendar). Action: Webhooks POST to `/api/v1/jobs`:
```json
{ "phone": "631-555-0100", "name": "Demo Customer", "title": "Camera install - 4 cameras", "scheduled_at": "2026-10-02T14:00:00-04:00", "notes": "Gate code 1234." }
```
Put the customer's phone in the event description (or use an attendee email as `email`). The job shows in Admin -> Jobs and in the client hub.

**(d) invoice_paid -> QuickBooks / Wave** *(Piets HQ -> Zapier)*
Outbound webhook with `invoice_paid` (add `payment_recorded` for partials). Action: QuickBooks Online -> Create Sales Receipt (or Wave -> Create Invoice). Customer = `data contact name` / `data contact email`; amount = `data invoice total_cents` divided by 100 with a Formatter step; memo = `data invoice number`; line items from `data invoice items`. Filter step: `event` exactly matches `invoice_paid`.

**(e) Twilio missed call -> follow-up text** *(Zapier -> Piets HQ)*
Trigger: Twilio / New Call, Filter: Status is `no-answer` or `busy`. Action: Webhooks POST to `/api/v1/messages/sms`:
```json
{ "phone": "{{caller number}}", "body": "Hi, this is Pete at Piets Technology Solutions - sorry I missed your call! Text me what you need (cameras, Wi-Fi, TV mount, smart home) and your town and I will get right back to you. 631-871-5957", "urgent": false }
```
Optional second action: POST `/api/v1/leads` with `source: "Missed call"`. Opted-out numbers are refused (409) so you stay compliant.

**(f) Google Business review -> thank-you text** *(Zapier -> Piets HQ)*
Trigger: Google Business Profile / New Review. Action 1: Webhooks GET `/api/v1/contacts?q={{reviewer name}}` (same Authorization header) - the reply has `data.contacts[0].id`. Action 2 with a Filter (rating >= 4 and an id was found): POST `/api/v1/messages/sms`:
```json
{ "contactId": 1, "body": "Thank you so much for the kind review! It really helps a small local business. If you ever need anything, just text me. - Pete, 631-871-5957" }
```
Action 3: POST `/api/v1/contacts/1/tags` with `{ "tags": ["reviewer"] }`. For low ratings POST a note instead so you can call them.

### Make / n8n / your own script

Same URLs and header. n8n: use an **HTTP Request** node (Authentication: Header Auth). Make: **HTTP -> Make a request**, Body type: Raw / JSON. For inbound events use a Webhook node and paste its URL as an outbound webhook.

---

## Part 4 - AI agents

### What they are

An agent is a saved recipe: which AI provider to use, a system prompt (the instructions), which tools it may use, and what to do with its answer (autopilot). You edit them under **Admin -> Integrations -> AI agents**. Three come pre-made:

| Agent | Does | Default autopilot |
|---|---|---|
| `lead_qualifier` | Reads a new lead or inbound text, asks the missing questions (what / where / when), tags the contact hot / warm / cold, adds a note, moves the stage to Contacted when it auto-sends | draft-only |
| `sms_reply_drafter` | Drafts a reply in the Piets voice: upbeat, short, plain English, always mentions the free demo, never quotes prices, signs "- Pete, 631-871-5957" | draft-only |
| `quote_summarizer` | Turns rough job notes into a 2-5 sentence scope of work for an estimate; never invents prices | off |

**Autopilot** means what happens with the agent's text when a contact is involved:

* **off** - text is only returned (API response, Test box, automation audit).
* **draft-only** - a yellow dashed "AI draft" bubble appears in **Admin -> Conversations** for that contact. You can edit it, press **Send this reply**, or **Discard**. Nothing is texted until you press Send.
* **auto-send** - texted immediately. STOP/opt-out and the 8am-8pm ET quiet hours still apply (outside hours it is queued).

### Where agents run

1. **Inbound texts.** Every text that arrives (Twilio webhook) is handed to `lead_qualifier` if that agent is enabled and its autopilot is not off. With draft-only you get a ready reply waiting in Conversations next to the customer's text.
2. **Conversations page.** Open any thread and press **Draft reply with AI** (pick the agent in the dropdown) - it reads the last inbound text and adds a draft.
3. **Automations.** Add a step of type **ai agent** with the agent name, e.g. trigger `new_lead` -> `ai_agent: lead_qualifier`.
4. **API / Zapier.** `POST /api/v1/ai/run` with `{ "agent": "sms_reply_drafter", "contactId": 12, "input": { "text": "Do you do doorbell cams?" } }`. The response contains `output` (the text), `tool_calls` (what it did), `mock` (true when no key is set) and `autopilot` (e.g. `{ mode: "draft", message_id: 88 }`). Add `"dryRun": true` to skip autopilot.
5. **Test box.** Each agent card has "Test this agent": type a sample text, optionally a contact id, press **Run test** and the reply and tool calls appear underneath. Tools run for real (a `create_lead` call really creates a lead); the draft/send step is skipped unless you tick "Apply autopilot".

### Tools (what agents are allowed to do)

Tick them per agent. Every call is written to the audit log.

| Tool | Effect |
|---|---|
| `lookup_contact` | Reads the contact, open leads, quotes, unpaid invoices, jobs, last 10 texts, notes |
| `create_lead` | New quote request in the pipeline (fires the new-lead automation) |
| `add_note` | Internal note on the contact |
| `send_sms` | Texts the contact - refuses opted-out numbers, queues outside quiet hours |
| `create_quote_draft` | Draft estimate with line items; prices default to $0 for you to fill in; never sent by itself |
| `get_open_invoices` | Unpaid invoices for the contact (or everyone) |
| `schedule_job` | Creates a job on the calendar |
| `tag_contact` | Adds a tag (hot/warm/cold replace each other) |
| `move_lead_stage` | Moves the latest lead to New / Contacted / Estimate Sent / Won / Lost |

### Providers and keys

Set keys in `server/.env` and restart. The Integrations page shows LIVE or MOCK per provider.

* **anthropic** - `ANTHROPIC_API_KEY` from console.anthropic.com. Default model `claude-sonnet-4-5` (override per agent or with `ANTHROPIC_MODEL`).
* **openai** - `OPENAI_API_KEY`. Also any OpenAI-compatible server: set `OPENAI_BASE_URL`. Default model `gpt-4o-mini`.
* **ollama** - local models with no key: install Ollama, `ollama run llama3.1`, set `OPENAI_BASE_URL=http://localhost:11434/v1` (or put that URL in the agent's Custom URL field) and model `llama3.1`. LM Studio and vLLM work the same way.
* **custom_url** - Piets HQ POSTs `{ agent, model, system_prompt, input, prompt, contact, tools }` to any URL you give (a Zapier "Catch Hook" that runs an AI step and replies, Make, n8n, your own server). Reply with JSON `{ "output": "text to use" }` and optionally `"tool_calls": [{ "name": "tag_contact", "arguments": { "tag": "hot" } }]` and the tools are executed.

**No key = mock mode.** Agents return a sensible canned reply (the drafter still signs with 631-871-5957, the qualifier still asks three questions and tags the lead) and every run is logged to **Admin -> Outbox -> AI**. This lets you wire up automations and Zaps and see drafts appear in Conversations before spending anything.

### Safety rails built in

* Draft-only is the default; nothing is texted by an agent unless you switch it to auto-send.
* Opt-out (STOP) and quiet hours are enforced inside the `send_sms` tool and the API - agents cannot bypass them.
* Prompts tell agents never to quote prices; `create_quote_draft` leaves prices at $0 unless the notes contain them.
* Every run is stored (`ai_runs`, "Recent runs" on the agent card) and every tool call is in Admin -> Audit log with the input and result.
* Archive an agent to retire it; nothing is deleted.

---

## Part 5 - Testing everything without real keys

1. `npm start`, open Admin -> Integrations, create a key.
2. Add an outbound webhook pointing at a Zapier Catch Hook (or https://webhook.site for a quick look), tick `new_lead`, press **Send test**.
3. Submit the website quote form (or `curl -X POST .../api/v1/leads ...`). Watch: Pipeline gets the lead, Outbox gets the texts, Outbox -> Webhooks shows the JSON that went to Zapier, the webhook card's delivery log shows 200.
4. Send a text to the Twilio webhook (in sandbox you can POST `From=+16315550199&Body=hi do you do cameras` to `/webhooks/twilio/sms` with curl). Open Conversations: the customer's text is there with an AI draft under it. Edit, Send.
5. `npm test` runs all of this automatically against a throw-away database, including a local fake Zapier that checks the HMAC signature.
