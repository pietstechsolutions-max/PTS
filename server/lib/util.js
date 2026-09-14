// Small shared helpers: money, phone numbers, dates, merge fields, audit log.
import { getDb, getSetting } from '../db.js';

export const nowIso = () => new Date().toISOString();

export function addHours(hours, from = new Date()) {
  return new Date(from.getTime() + hours * 3600 * 1000).toISOString();
}
export function addDays(days, from = new Date()) {
  return addHours(days * 24, from);
}

// ---- money (stored in integer cents) ----
export function money(cents) {
  const n = (Number(cents) || 0) / 100;
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
export function toCents(v) {
  if (v === undefined || v === null || v === '') return 0;
  const n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}
export function fromCents(cents) {
  return ((Number(cents) || 0) / 100).toFixed(2);
}
export function calcTotals(items, taxRate) {
  const subtotal = items.reduce((s, it) => s + Math.round((Number(it.qty) || 0) * (Number(it.unit_cents) || 0)), 0);
  const tax = Math.round(subtotal * (Number(taxRate) || 0) / 100);
  return { subtotal_cents: subtotal, tax_cents: tax, total_cents: subtotal + tax };
}
export function cardFee(cents) {
  const pct = Number(getSetting('card_fee_percent', '4')) || 0;
  return Math.round(cents * pct / 100);
}

// ---- phones ----
export function normalizePhone(raw) {
  if (!raw) return '';
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length === 10) return '+1' + digits;
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits;
  if (String(raw).trim().startsWith('+') && digits.length > 10) return '+' + digits;
  return digits ? '+' + digits : '';
}
export function prettyPhone(e164) {
  const d = String(e164 || '').replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) return `${d.slice(1, 4)}-${d.slice(4, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return e164 || '';
}
export function normalizeEmail(raw) {
  return String(raw || '').trim().toLowerCase();
}
export function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || ''));
}

// ---- dates (Eastern Time display) ----
export function fmtDate(iso, opts = {}) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric', ...opts });
}
export function fmtDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}
export function fmtDateInput(iso) {
  if (!iso) return '';
  return String(iso).slice(0, 10);
}
export function fmtDateTimeInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  // datetime-local wants local wall time; we present ET.
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d);
  const g = (t) => parts.find((p) => p.type === t)?.value;
  return `${g('year')}-${g('month')}-${g('day')}T${g('hour') === '24' ? '00' : g('hour')}:${g('minute')}`;
}
export function easternHour(date = new Date()) {
  const h = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }).format(date);
  return Number(h) % 24;
}
export function withinQuietHours(date = new Date()) {
  const start = Number(getSetting('quiet_hours_start', '8'));
  const end = Number(getSetting('quiet_hours_end', '20'));
  const h = easternHour(date);
  return h >= start && h < end; // true = OK to send
}
// Returns an ISO time at which sending is allowed (now, or next 8am ET).
export function nextAllowedSendTime(date = new Date()) {
  if (withinQuietHours(date)) return date.toISOString();
  const start = Number(getSetting('quiet_hours_start', '8'));
  let d = new Date(date.getTime());
  for (let i = 0; i < 48; i++) {
    d = new Date(d.getTime() + 15 * 60 * 1000);
    if (easternHour(d) === start) return d.toISOString();
    if (withinQuietHours(d)) return d.toISOString();
  }
  return d.toISOString();
}

// ---- merge fields ----
export function mergeFields(text, ctx = {}) {
  return String(text || '').replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (_, key) => {
    const v = ctx[key];
    return v === undefined || v === null ? '' : String(v);
  });
}

// ---- audit log ----
export function audit(actor, action, entityType = '', entityId = null, details = '') {
  try {
    getDb().prepare('INSERT INTO audit_log (actor, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run(actor, action, entityType, entityId, typeof details === 'string' ? details : JSON.stringify(details), nowIso());
  } catch (e) {
    console.error('audit failed', e.message);
  }
}

export function changeLog(entityType, entityId, author, message) {
  getDb().prepare('INSERT INTO change_log (entity_type, entity_id, author, message, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(entityType, entityId, author, message, nowIso());
}

export function parseJson(s, fallback) {
  try { return JSON.parse(s); } catch { return fallback; }
}

export function firstName(contact) {
  return (contact?.first_name || '').trim() || 'there';
}
export function fullName(contact) {
  return [contact?.first_name, contact?.last_name].filter(Boolean).join(' ').trim() || contact?.company || contact?.email || prettyPhone(contact?.phone) || 'Customer';
}
export function splitName(name) {
  const parts = String(name || '').trim().split(/\s+/);
  return { first_name: parts.shift() || '', last_name: parts.join(' ') };
}

export function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
