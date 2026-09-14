// Demo data. Runs automatically when the database is empty; `npm run seed:reset` wipes and re-seeds.
import { fileURLToPath } from 'node:url';
import { getDb, setSetting, DEFAULT_SETTINGS } from './db.js';
import { nowIso, addDays, toCents, calcTotals, changeLog, audit } from './lib/util.js';
import { SEED_AUTOMATIONS } from './lib/automations.js';
import { seedAgents } from './lib/ai.js';

const TABLES = ['contacts', 'notes', 'leads', 'change_log', 'quotes', 'quote_items', 'quote_revisions', 'jobs', 'job_checklist', 'job_materials',
  'invoices', 'invoice_items', 'payments', 'subscriptions', 'messages', 'templates', 'campaigns', 'campaign_recipients', 'automations', 'jobs_queue', 'outbox', 'audit_log', 'login_codes', 'sessions',
  'events', 'webhooks', 'webhook_deliveries', 'api_keys', 'ai_agents', 'ai_runs'];

export function isEmpty() {
  const db = getDb();
  return db.prepare('SELECT COUNT(*) AS n FROM contacts').get().n === 0;
}

export function resetDb() {
  const db = getDb();
  const tx = db.transaction(() => {
    for (const t of TABLES) db.prepare(`DELETE FROM ${t}`).run();
    db.prepare("DELETE FROM sqlite_sequence").run();
    db.prepare('DELETE FROM settings').run();
    for (const [k, v] of Object.entries(DEFAULT_SETTINGS)) db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(k, v);
  });
  tx();
}

export function seedAutomationsAndTemplates() {
  const db = getDb();
  const ts = nowIso();
  seedAgents();
  if (db.prepare('SELECT COUNT(*) AS n FROM automations').get().n === 0) {
    const ins = db.prepare('INSERT INTO automations (name, trigger, trigger_keyword, steps, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, 1, ?, ?)');
    for (const a of SEED_AUTOMATIONS) ins.run(a.name, a.trigger, a.trigger_keyword || '', JSON.stringify(a.steps), ts, ts);
  }
  if (db.prepare('SELECT COUNT(*) AS n FROM templates').get().n === 0) {
    const ins = db.prepare('INSERT INTO templates (name, channel, subject, body, created_at) VALUES (?, ?, ?, ?, ?)');
    ins.run('Estimate link', 'sms', '', 'Hi {{first_name}}, here is your estimate from {{business_name}}: {{quote_link}} - valid 7 days. Questions? Call {{business_phone}}.', ts);
    ins.run('On my way', 'sms', '', 'Hi {{first_name}}, this is {{business_name}}. I am on my way and should arrive in about 30 minutes.', ts);
    ins.run('Invoice reminder', 'sms', '', 'Hi {{first_name}}, a reminder that invoice {{invoice_number}} is due on receipt. You can pay online here: {{invoice_link}}', ts);
    ins.run('Review request', 'sms', '', 'Thanks again {{first_name}}! If you have a minute, a Google review helps a lot: {{review_link}}', ts);
    ins.run('Seasonal check-in', 'sms', '', 'Hi {{first_name}}, {{business_name}} here. Need cameras, Wi-Fi, TV mounting or smart-home work before the holidays? Reply YES for a free estimate.', ts);
    ins.run('Estimate email', 'email', 'Your estimate from {{business_name}}', 'Hi {{first_name}},\n\nYour estimate is ready to review and approve online: {{quote_link}}\n\nPrices are valid for 7 days and may rise after.\n\n{{business_name}}\n{{business_phone}}', ts);
  }
}

export function seedDemo() {
  const db = getDb();
  const ts = nowIso();
  const taxRate = 8.75;

  const insContact = db.prepare(`INSERT INTO contacts (first_name, last_name, company, phone, email, town, tags, source, sms_opt_in, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const c1 = insContact.run('Demo', 'Customer', '', '+16315550100', 'demo@example.com', 'Smithtown', JSON.stringify(['customer', 'cameras']), 'Website', 1, addDays(-40), ts).lastInsertRowid;
  const c2 = insContact.run('Maria', 'Lopez', '', '+16315550101', 'maria.lopez@example.com', 'Huntington', JSON.stringify(['lead']), 'Google', 1, addDays(-6), ts).lastInsertRowid;
  const c3 = insContact.run('Tom', 'Nguyen', 'Nguyen Dental', '+16315550102', 'tom@example.com', 'Bay Shore', JSON.stringify(['lead', 'commercial']), 'Referral', 0, addDays(-20), ts).lastInsertRowid;
  db.prepare('UPDATE contacts SET sms_opt_out_at = ? WHERE id = ?').run(addDays(-2), c3);

  db.prepare('INSERT INTO notes (contact_id, body, author, created_at) VALUES (?, ?, ?, ?)').run(c1, 'Has a 4-camera Reolink system, wants to add a doorbell cam.', 'owner', addDays(-30));

  // Leads: one in each stage
  const insLead = db.prepare(`INSERT INTO leads (contact_id, stage, service, message, source, value_cents, next_follow_up, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const l1 = insLead.run(c2, 'New', 'Security cameras', 'Looking for 4 cameras around the house, mostly driveway and backyard.', 'Google', toCents(1800), addDays(1).slice(0, 10), 'Open', addDays(-1), ts).lastInsertRowid;
  const l2 = insLead.run(c3, 'Contacted', 'Network / Wi-Fi', 'Office Wi-Fi drops constantly, 6 workstations.', 'Referral', toCents(1200), addDays(2).slice(0, 10), 'Open', addDays(-5), ts).lastInsertRowid;
  const l3 = insLead.run(c1, 'Estimate Sent', 'Doorbell camera + TV mount', 'Add a doorbell cam and mount a 65" TV in the den.', 'Website', toCents(650), addDays(2).slice(0, 10), 'Open', addDays(-9), ts).lastInsertRowid;
  const l4 = insLead.run(c1, 'Won', 'Security cameras', '4 camera system install.', 'Website', toCents(1900), null, 'Closed', addDays(-40), ts).lastInsertRowid;
  const l5 = insLead.run(c3, 'Lost', 'Access control', 'Wanted a keypad for the back door.', 'Referral', toCents(500), null, 'Closed', addDays(-20), ts).lastInsertRowid;
  changeLog('lead', l1, 'client', 'Quote request received for Security cameras.');
  changeLog('lead', l2, 'client', 'Quote request received for Network / Wi-Fi.');
  changeLog('lead', l2, 'owner', 'Status changed from "New" to "Contacted".');
  changeLog('lead', l3, 'client', 'Quote request received for Doorbell camera + TV mount.');
  changeLog('lead', l3, 'owner', 'Status changed from "New" to "Estimate Sent".');
  changeLog('lead', l4, 'owner', 'Status changed from "Estimate Sent" to "Won".');
  changeLog('lead', l5, 'owner', 'Status changed from "Contacted" to "Lost".');

  // Quotes
  function makeQuote(number, contactId, leadId, title, status, items, notes, revisions, sentAt, approvedBy) {
    const totals = calcTotals(items, taxRate);
    const q = db.prepare(`INSERT INTO quotes (number, contact_id, lead_id, title, status, notes, valid_until, subtotal_cents, tax_rate, tax_cents, total_cents, revision, sent_at, approved_by, approved_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(number, contactId, leadId, title, status, notes, addDays(status === 'Approved' ? -30 : 5).slice(0, 10), totals.subtotal_cents, taxRate, totals.tax_cents, totals.total_cents, revisions.length, sentAt, approvedBy || null, approvedBy ? addDays(-33) : null, addDays(-10), ts).lastInsertRowid;
    const ins = db.prepare('INSERT INTO quote_items (quote_id, section, description, qty, unit_cents, sort) VALUES (?, ?, ?, ?, ?, ?)');
    items.forEach((it, i) => ins.run(q, it.section || 'main', it.description, it.qty, it.unit_cents, i));
    revisions.forEach((r, i) => {
      db.prepare('INSERT INTO quote_revisions (quote_id, revision, summary, author, snapshot, created_at) VALUES (?, ?, ?, ?, ?, ?)')
        .run(q, i + 1, r.summary, r.author, JSON.stringify({ items: r.items || items, ...calcTotals(r.items || items, taxRate) }), r.at);
      db.prepare('INSERT INTO change_log (entity_type, entity_id, author, message, created_at) VALUES (?, ?, ?, ?, ?)').run('quote', q, r.author, r.summary, r.at);
    });
    return q;
  }
  const q1Items = [
    { description: '4K PoE security camera (turret, night vision)', qty: 4, unit_cents: 18900 },
    { description: '8-channel NVR with 2TB storage', qty: 1, unit_cents: 32900 },
    { description: 'Cat6 cable run and termination (per camera)', qty: 4, unit_cents: 12500 },
    { description: 'Installation labor, setup and phone app configuration', qty: 1, unit_cents: 45000 },
    { section: 'other', description: 'Optional: 2 additional cameras (backyard)', qty: 2, unit_cents: 18900 }
  ];
  const q1 = makeQuote('EST-1001', c1, l4, 'Security camera system (4 cameras)', 'Approved', q1Items, 'Includes 1-year workmanship warranty. Customer supplies power outlet near NVR location.',
    [
      { summary: 'Estimate created.', author: 'owner', at: addDays(-38), items: q1Items.slice(0, 4) },
      { summary: 'Estimate revised (rev 2). Added optional backyard cameras section per client request.', author: 'owner', at: addDays(-36) },
      { summary: 'Estimate approved by "Demo Customer".', author: 'client', at: addDays(-33) }
    ], addDays(-37), 'Demo Customer');
  const q2Items = [
    { description: 'Video doorbell (PoE) with chime', qty: 1, unit_cents: 21900 },
    { description: '65" TV wall mount (tilting) - customer supplies TV', qty: 1, unit_cents: 8900 },
    { description: 'In-wall HDMI/power concealment kit', qty: 1, unit_cents: 9900 },
    { description: 'Installation labor', qty: 3, unit_cents: 12500 }
  ];
  const q2 = makeQuote('EST-1002', c1, l3, 'Doorbell camera + 65" TV mount', 'Sent', q2Items, 'TV mount assumes standard wood studs. Doorbell wiring reuses existing chime transformer if compatible.',
    [
      { summary: 'Estimate created.', author: 'owner', at: addDays(-8), items: q2Items.slice(0, 2).concat(q2Items.slice(3)) },
      { summary: 'Change requested: Can you hide the HDMI cable in the wall?', author: 'client', at: addDays(-7) },
      { summary: 'Estimate revised (rev 2). Added in-wall concealment kit. Total increased to $850.43.', author: 'owner', at: addDays(-6) },
      { summary: 'Estimate EST-1002 sent (rev 2). Valid until ' + addDays(1).slice(0, 10) + '.', author: 'owner', at: addDays(-6) }
    ], addDays(-6), null);
  setSetting('next_quote_number', '1003');

  // Job from approved quote (complete) + invoices
  const job1 = db.prepare(`INSERT INTO jobs (contact_id, quote_id, title, status, scheduled_at, notes, completed_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(c1, q1, 'Security camera system (4 cameras)', 'Complete', addDays(-28), 'Gate code 1234. Dog in backyard - call ahead.', addDays(-28), addDays(-33), ts).lastInsertRowid;
  db.prepare('UPDATE quotes SET job_id = ? WHERE id = ?').run(job1, q1);
  const insCk = db.prepare('INSERT INTO job_checklist (job_id, item, done, sort) VALUES (?, ?, ?, ?)');
  ['Walk property with customer, confirm camera positions', 'Run Cat6 to 4 locations', 'Mount cameras and NVR', 'Configure app on customer phone', 'Clean up and review footage with customer'].forEach((i, n) => insCk.run(job1, i, 1, n));
  const insMat = db.prepare('INSERT INTO job_materials (job_id, item, qty, sort) VALUES (?, ?, ?, ?)');
  [['4K PoE turret camera', 4], ['8ch NVR 2TB', 1], ['Cat6 500ft box', 1], ['RJ45 ends / boots', 10]].forEach(([i, q], n) => insMat.run(job1, i, q, n));
  changeLog('quote', q1, 'system', `Job #${job1} created from this estimate.`);

  // A second, upcoming job (scheduled next week) so the dashboard has something on the calendar.
  const job2 = db.prepare(`INSERT INTO jobs (contact_id, quote_id, title, status, scheduled_at, notes, created_at, updated_at) VALUES (?, NULL, ?, 'Scheduled', ?, ?, ?, ?)`)
    .run(c1, 'Service call - camera 3 offline', addDays(3).slice(0, 11) + '14:00:00.000Z', 'Check PoE port 3 on NVR, bring spare Cat6 ends.', ts, ts).lastInsertRowid;
  const insCk2 = db.prepare('INSERT INTO job_checklist (job_id, item, done, sort) VALUES (?, ?, 0, ?)');
  ['Test camera 3 cable with tester', 'Swap PoE port / re-terminate', 'Confirm recording in app'].forEach((i, n) => insCk2.run(job2, i, n));

  function makeInvoice(number, contactId, quoteId, jobId, status, items, serviceDate, invoiceDate, paidCents, sentAt) {
    const totals = calcTotals(items, taxRate);
    const inv = db.prepare(`INSERT INTO invoices (number, contact_id, quote_id, job_id, status, service_date, invoice_date, terms, notes, subtotal_cents, tax_rate, tax_cents, total_cents, paid_cents, sent_at, paid_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Due on receipt', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(number, contactId, quoteId, jobId, status, serviceDate, invoiceDate, 'Thank you for your business. Checks payable to Piets Technology Solutions Inc.', totals.subtotal_cents, taxRate, totals.tax_cents, totals.total_cents, paidCents, sentAt, status === 'Paid' ? sentAt : null, invoiceDate, ts).lastInsertRowid;
    const ins = db.prepare('INSERT INTO invoice_items (invoice_id, section, description, qty, unit_cents, sort) VALUES (?, ?, ?, ?, ?, ?)');
    items.forEach((it, i) => ins.run(inv, it.section || 'main', it.description, it.qty, it.unit_cents, i));
    return inv;
  }
  const inv1 = makeInvoice('INV-1001', c1, q1, job1, 'Paid', q1Items.slice(0, 4), addDays(-28).slice(0, 10), addDays(-28).slice(0, 10), calcTotals(q1Items.slice(0, 4), taxRate).total_cents, addDays(-28));
  db.prepare('INSERT INTO payments (invoice_id, contact_id, amount_cents, fee_cents, method, reference, created_at) VALUES (?, ?, ?, 0, ?, ?, ?)')
    .run(inv1, c1, calcTotals(q1Items.slice(0, 4), taxRate).total_cents, 'Zelle', 'Zelle conf #A1B2C3', addDays(-27));
  db.prepare('UPDATE jobs SET invoice_id = ? WHERE id = ?').run(inv1, job1);
  db.prepare('UPDATE quotes SET invoice_id = ? WHERE id = ?').run(inv1, q1);
  const inv2Items = [
    { description: 'Service call - troubleshoot camera 3 offline', qty: 1, unit_cents: 12500 },
    { description: 'Replace damaged Cat6 run (garage to NVR)', qty: 1, unit_cents: 9500 }
  ];
  makeInvoice('INV-1002', c1, null, null, 'Sent', inv2Items, addDays(-4).slice(0, 10), addDays(-3).slice(0, 10), 0, addDays(-3));
  setSetting('next_invoice_number', '1003');

  // Subscription
  db.prepare(`INSERT INTO subscriptions (contact_id, plan, status, price_cents, stripe_subscription_id, started_at, created_at, updated_at) VALUES (?, ?, 'active', ?, ?, ?, ?, ?)`)
    .run(c1, 'Basic', toCents(DEFAULT_SETTINGS.plan_basic_price), 'sub_demo_basic', addDays(-20), addDays(-20), ts);

  // Messages
  const insMsg = db.prepare(`INSERT INTO messages (contact_id, direction, channel, from_addr, to_addr, body, status, created_at) VALUES (?, ?, 'sms', ?, ?, ?, ?, ?)`);
  insMsg.run(c1, 'in', '+16315550100', '+16318715957', 'Hi, camera 3 went offline last night. Can you take a look?', 'received', addDays(-5));
  insMsg.run(c1, 'out', '+16318715957', '+16315550100', 'Hi Demo, sorry about that! I can stop by tomorrow between 10-12. Does that work?', 'sent (mock)', addDays(-5));
  insMsg.run(c1, 'in', '+16315550100', '+16318715957', 'Yes, that works. Thanks!', 'received', addDays(-5));
  insMsg.run(c2, 'out', '+16318715957', '+16315550101', 'Hi Maria, thanks for reaching out to Piets Technology Solutions! We got your request for Security cameras and will text you shortly to set up a free estimate.', 'sent (mock)', addDays(-1));

  // Campaign (done)
  const camp = db.prepare(`INSERT INTO campaigns (name, channel, body, audience, scheduled_at, throttle_per_minute, status, sent_count, failed_count, reply_count, opt_out_count, created_at, updated_at)
    VALUES (?, 'sms', ?, ?, ?, 10, 'Done', 2, 0, 1, 0, ?, ?)`)
    .run('Spring camera check-up', 'Hi {{first_name}}, {{business_name}} here. Spring special: free camera health check with any service visit this month. Reply YES to book.', JSON.stringify({ tags: ['customer', 'lead'], opted_in_only: true }), addDays(-15), addDays(-16), ts).lastInsertRowid;
  db.prepare("INSERT INTO campaign_recipients (campaign_id, contact_id, status, sent_at) VALUES (?, ?, 'sent', ?)").run(camp, c1, addDays(-15));
  db.prepare("INSERT INTO campaign_recipients (campaign_id, contact_id, status, sent_at) VALUES (?, ?, 'sent', ?)").run(camp, c2, addDays(-15));

  audit('system', 'seed', '', null, 'Demo data created');
}

export function seedIfEmpty() {
  seedAutomationsAndTemplates();
  if (!isEmpty()) return false;
  seedDemo();
  return true;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const reset = process.argv.includes('--reset');
  if (reset) { resetDb(); console.log('Database cleared.'); }
  const did = seedIfEmpty();
  console.log(did ? 'Demo data seeded.' : 'Database already has data (use --reset to start over).');
}
