// Entry point: npm start -> node server/index.js
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { config, ROOT_DIR } from './config.js';
import { getDb } from './db.js';
import { seedIfEmpty } from './seed.js';
import { createApp } from './app.js';
import { startScheduler, tick } from './lib/automations.js';

function runBuildIfPresent() {
  if (!config.runBuildOnStart) return;
  try {
    const pkgPath = path.join(ROOT_DIR, 'package.json');
    if (!fs.existsSync(pkgPath)) return;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (!pkg.scripts?.build) return;
    const scriptFile = String(pkg.scripts.build).split(/\s+/).find((p) => p.endsWith('.js'));
    if (scriptFile && !fs.existsSync(path.join(ROOT_DIR, scriptFile))) {
      console.log(`[build] skipped: ${scriptFile} not found yet`);
      return;
    }
    console.log('[build] running `npm run build` to refresh blog posts...');
    const r = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build', '--silent'], { cwd: ROOT_DIR, stdio: 'inherit', timeout: 120000 });
    console.log(r.status === 0 ? '[build] done' : `[build] exited with code ${r.status} (continuing)`);
  } catch (e) {
    console.log('[build] skipped:', e.message);
  }
}

async function main() {
  runBuildIfPresent();
  getDb();
  const seeded = seedIfEmpty();
  const app = createApp();
  const server = app.listen(config.port, () => {
    const url = config.baseUrl;
    console.log('');
    console.log('============================================================');
    console.log('  Piets Technology Solutions - HQ server');
    console.log('============================================================');
    console.log(`  Mode:        ${config.sandbox ? 'SANDBOX (mock providers, see Admin -> Outbox)' : 'LIVE'}`);
    console.log(`  Stripe:      ${config.providers.stripe}    SMS: ${config.providers.sms}    Email: ${config.providers.email}`);
    console.log(`  Database:    ${config.dbPath}${seeded ? '  (seeded with demo data)' : ''}`);
    console.log(`  Website:     ${url}/`);
    console.log(`  Client hub:  ${url}/portal   (demo: 631-555-0100 or demo@example.com)`);
    console.log(`  Admin:       ${url}/admin`);
    console.log(`  Health:      ${url}/healthz`);
    console.log(`  Webhooks:    POST ${url}/webhooks/twilio/sms   POST ${url}/webhooks/stripe`);
    console.log(`  API (Zapier): ${url}/api/v1  - keys, outbound webhooks and AI agents in Admin -> Integrations`);
    if (config.admin.usingDefaults) {
      console.log('');
      console.log(`  WARNING: using default admin login ${config.admin.email} / ${config.admin.password}`);
      console.log('           Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env before going live.');
    }
    console.log('============================================================');
  });
  if (config.schedulerEnabled) {
    startScheduler(60 * 1000);
    setTimeout(() => tick().catch(() => {}), 2000).unref?.();
  }
  const shutdown = () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(0), 2000).unref?.(); };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((e) => { console.error(e); process.exit(1); });
