// API keys for /api/v1 (Zapier, Make, scripts). Keys are shown once; only a SHA-256 hash is stored.
// The single API_TOKEN from .env also works (it is the "env" key). Comparison is timing-safe.
import crypto from 'node:crypto';
import { getDb } from '../db.js';
import { config } from '../config.js';
import { nowIso, audit } from './util.js';

const hash = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
function safeEqual(a, b) {
  const ab = Buffer.from(String(a)); const bb = Buffer.from(String(b));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

/** Create a key. Returns { id, key } - the plain key is only available here. */
export function createApiKey(name, actor = 'owner') {
  const key = 'pk_' + crypto.randomBytes(24).toString('base64url');
  const r = getDb().prepare('INSERT INTO api_keys (name, key_hash, prefix, created_at) VALUES (?, ?, ?, ?)')
    .run(String(name || 'API key').trim().slice(0, 80), hash(key), key.slice(0, 8), nowIso());
  audit(actor, 'api_key_created', 'api_key', Number(r.lastInsertRowid), { name });
  return { id: Number(r.lastInsertRowid), key };
}

export function revokeApiKey(id, actor = 'owner') {
  getDb().prepare('UPDATE api_keys SET archived = 1 WHERE id = ?').run(id);
  audit(actor, 'api_key_revoked', 'api_key', Number(id));
}

export function listApiKeys() {
  return getDb().prepare('SELECT id, name, prefix, archived, last_used_at, use_count, created_at FROM api_keys ORDER BY archived, id DESC').all();
}

/** Verify a bearer token. Returns { id, name } or null. */
export function verifyApiKey(token) {
  if (!token) return null;
  if (config.apiToken && safeEqual(token, config.apiToken)) return { id: 'env', name: 'API_TOKEN (.env)' };
  const h = hash(token);
  const rows = getDb().prepare('SELECT id, name, key_hash FROM api_keys WHERE archived = 0').all();
  for (const r of rows) {
    if (safeEqual(h, r.key_hash)) {
      getDb().prepare('UPDATE api_keys SET last_used_at = ?, use_count = use_count + 1 WHERE id = ?').run(nowIso(), r.id);
      return { id: r.id, name: r.name };
    }
  }
  return null;
}

export function apiEnabled() {
  return !!config.apiToken || getDb().prepare('SELECT COUNT(*) AS n FROM api_keys WHERE archived = 0').get().n > 0;
}
