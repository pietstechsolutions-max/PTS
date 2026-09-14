// SMS / email campaigns: audience filters, throttled sending, quiet hours, opt-in enforcement.
import { getDb, getSetting } from '../db.js';
import { nowIso, mergeFields, parseJson, audit, withinQuietHours, nextAllowedSendTime } from './util.js';
import { sendSms, sendEmail } from './providers.js';
import { contactMergeContext } from './services.js';
import { emitEvent } from './events.js';

/** audience: { tags: [..], stage: 'New'|..., opted_in_only: true, has_email: bool } */
export function audienceContacts(audience = {}, channel = 'sms') {
  const db = getDb();
  let rows = db.prepare('SELECT * FROM contacts WHERE archived = 0').all();
  const tags = (audience.tags || []).map((t) => String(t).trim().toLowerCase()).filter(Boolean);
  if (tags.length) rows = rows.filter((c) => { const ct = parseJson(c.tags, []).map((t) => String(t).toLowerCase()); return tags.some((t) => ct.includes(t)); });
  if (audience.stage) {
    const ids = new Set(db.prepare('SELECT contact_id FROM leads WHERE stage = ? AND archived = 0').all(audience.stage).map((r) => r.contact_id));
    rows = rows.filter((c) => ids.has(c.id));
  }
  if (channel === 'sms') {
    rows = rows.filter((c) => c.phone);
    // Opted-in only is ALWAYS enforced for SMS (TCPA / A2P rules).
    rows = rows.filter((c) => c.sms_opt_in === 1);
  } else {
    rows = rows.filter((c) => c.email && c.email_opt_in === 1);
  }
  return rows;
}

export function scheduleCampaign(campaignId, when = null, actor = 'owner') {
  const db = getDb();
  const c = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(campaignId);
  if (!c) throw new Error('Campaign not found');
  const audience = parseJson(c.audience, {});
  const contacts = audienceContacts(audience, c.channel);
  const tx = db.transaction(() => {
    db.prepare('DELETE FROM campaign_recipients WHERE campaign_id = ?').run(campaignId);
    const ins = db.prepare("INSERT INTO campaign_recipients (campaign_id, contact_id, status) VALUES (?, ?, 'queued')");
    for (const ct of contacts) ins.run(campaignId, ct.id);
    db.prepare("UPDATE campaigns SET status = 'Scheduled', scheduled_at = ?, sent_count = 0, failed_count = 0, updated_at = ? WHERE id = ?")
      .run(when || nowIso(), nowIso(), campaignId);
  });
  tx();
  audit(actor, 'campaign_scheduled', 'campaign', campaignId, { recipients: contacts.length, when });
  return contacts.length;
}

/** Called by the scheduler every minute. Sends up to throttle_per_minute per campaign. */
export async function processCampaigns() {
  const db = getDb();
  const due = db.prepare("SELECT * FROM campaigns WHERE archived = 0 AND status IN ('Scheduled', 'Sending') AND scheduled_at <= ?").all(nowIso());
  let sent = 0;
  for (const c of due) {
    if (c.channel === 'sms' && !withinQuietHours()) {
      // Quiet hours (8am-8pm ET). Push to next allowed window.
      db.prepare('UPDATE campaigns SET scheduled_at = ?, updated_at = ? WHERE id = ?').run(nextAllowedSendTime(), nowIso(), c.id);
      continue;
    }
    db.prepare("UPDATE campaigns SET status = 'Sending', updated_at = ? WHERE id = ?").run(nowIso(), c.id);
    const batch = db.prepare("SELECT r.*, ct.* , r.id AS recipient_id FROM campaign_recipients r JOIN contacts ct ON ct.id = r.contact_id WHERE r.campaign_id = ? AND r.status = 'queued' LIMIT ?")
      .all(c.id, Math.max(1, c.throttle_per_minute || 10));
    for (const r of batch) {
      const ctx = contactMergeContext(r);
      const body = mergeFields(c.body, ctx);
      let res;
      if (c.channel === 'sms') res = await sendSms(r.phone, body, { contactId: r.contact_id, campaignId: c.id, appendFooter: true });
      else res = await sendEmail(r.email, mergeFields(c.subject || c.name, ctx), body, { contactId: r.contact_id, campaignId: c.id });
      db.prepare('UPDATE campaign_recipients SET status = ?, error = ?, sent_at = ? WHERE id = ?')
        .run(res.ok ? 'sent' : 'failed', res.ok ? null : res.error || 'failed', nowIso(), r.recipient_id);
      db.prepare(`UPDATE campaigns SET sent_count = sent_count + ?, failed_count = failed_count + ?, updated_at = ? WHERE id = ?`)
        .run(res.ok ? 1 : 0, res.ok ? 0 : 1, nowIso(), c.id);
      sent++;
    }
    const remaining = db.prepare("SELECT COUNT(*) AS n FROM campaign_recipients WHERE campaign_id = ? AND status = 'queued'").get(c.id).n;
    if (remaining === 0) {
      db.prepare("UPDATE campaigns SET status = 'Done', updated_at = ? WHERE id = ?").run(nowIso(), c.id);
      emitEvent('campaign_sent', { campaignId: c.id });
    }
  }
  return sent;
}

/** Attribute an inbound SMS reply / opt-out to the most recent campaign sent to that contact (last 7 days). */
export function attributeReply(contactId, optOut = false) {
  const db = getDb();
  const r = db.prepare(`SELECT campaign_id FROM messages WHERE contact_id = ? AND direction = 'out' AND campaign_id IS NOT NULL
    AND created_at > datetime('now', '-7 days') ORDER BY id DESC LIMIT 1`).get(contactId);
  if (!r) return;
  db.prepare(`UPDATE campaigns SET reply_count = reply_count + 1, opt_out_count = opt_out_count + ?, updated_at = ? WHERE id = ?`)
    .run(optOut ? 1 : 0, nowIso(), r.campaign_id);
}
