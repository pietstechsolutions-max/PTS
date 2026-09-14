// Minimal express-session store backed by the SQLite `sessions` table.
import session from 'express-session';
import { getDb } from '../db.js';

export class SqliteStore extends session.Store {
  constructor() {
    super();
    this.db = getDb();
    this.stmts = {
      get: this.db.prepare('SELECT sess, expired_at FROM sessions WHERE sid = ?'),
      set: this.db.prepare('INSERT INTO sessions (sid, sess, expired_at) VALUES (?, ?, ?) ON CONFLICT(sid) DO UPDATE SET sess = excluded.sess, expired_at = excluded.expired_at'),
      del: this.db.prepare('DELETE FROM sessions WHERE sid = ?'),
      touch: this.db.prepare('UPDATE sessions SET expired_at = ? WHERE sid = ?'),
      purge: this.db.prepare('DELETE FROM sessions WHERE expired_at < ?')
    };
    const t = setInterval(() => { try { this.stmts.purge.run(Date.now()); } catch { /* ignore */ } }, 10 * 60 * 1000);
    t.unref?.();
  }
  expiry(sess) {
    const maxAge = sess?.cookie?.maxAge ?? 30 * 86400 * 1000;
    return Date.now() + maxAge;
  }
  get(sid, cb) {
    try {
      const row = this.stmts.get.get(sid);
      if (!row) return cb(null, null);
      if (row.expired_at < Date.now()) { this.stmts.del.run(sid); return cb(null, null); }
      cb(null, JSON.parse(row.sess));
    } catch (e) { cb(e); }
  }
  set(sid, sess, cb) {
    try { this.stmts.set.run(sid, JSON.stringify(sess), this.expiry(sess)); cb && cb(null); } catch (e) { cb && cb(e); }
  }
  destroy(sid, cb) {
    try { this.stmts.del.run(sid); cb && cb(null); } catch (e) { cb && cb(e); }
  }
  touch(sid, sess, cb) {
    try { this.stmts.touch.run(this.expiry(sess), sid); cb && cb(null); } catch (e) { cb && cb(e); }
  }
}
