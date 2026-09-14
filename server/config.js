// Central configuration. Every value comes from environment variables (see .env.example).
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const env = process.env;
const bool = (v, d = false) => (v === undefined || v === '' ? d : /^(1|true|yes|on)$/i.test(v));

export const ROOT_DIR = path.join(__dirname, '..');
export const SERVER_DIR = __dirname;
export const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
export const BRAND_DIR = path.join(ROOT_DIR, 'brand');

const hasStripe = !!(env.STRIPE_SECRET_KEY && env.STRIPE_SECRET_KEY.startsWith('sk_'));
const hasTwilio = !!(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_PHONE_NUMBER);
const hasSmtp = !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
const forceSandbox = bool(env.SANDBOX, false);

export const config = {
  env: env.NODE_ENV || 'development',
  port: Number(env.PORT || 3000),
  baseUrl: (env.BASE_URL || `http://localhost:${env.PORT || 3000}`).replace(/\/$/, ''),
  dbPath: env.DB_PATH || path.join(__dirname, 'data', 'piets.db'),
  sessionSecret: env.SESSION_SECRET || 'dev-only-change-me-' + 'piets',
  sandbox: forceSandbox || !(hasStripe && hasTwilio && hasSmtp),
  providers: {
    stripe: !forceSandbox && hasStripe ? 'stripe' : 'mock',
    sms: !forceSandbox && hasTwilio ? 'twilio' : 'mock',
    email: !forceSandbox && hasSmtp ? 'smtp' : 'mock'
  },
  admin: {
    email: env.ADMIN_EMAIL || 'admin@pietstechsolutions.com',
    password: env.ADMIN_PASSWORD || 'change-me',
    usingDefaults: !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD
  },
  owner: {
    phone: env.OWNER_PHONE || '+16318715957',
    email: env.OWNER_EMAIL || 'pietstechsolutions@gmail.com'
  },
  stripe: {
    secretKey: env.STRIPE_SECRET_KEY || '',
    webhookSecret: env.STRIPE_WEBHOOK_SECRET || '',
    publishableKey: env.STRIPE_PUBLISHABLE_KEY || ''
  },
  twilio: {
    accountSid: env.TWILIO_ACCOUNT_SID || '',
    authToken: env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: env.TWILIO_PHONE_NUMBER || '',
    messagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID || ''
  },
  smtp: {
    host: env.SMTP_HOST || '',
    port: Number(env.SMTP_PORT || 587),
    secure: bool(env.SMTP_SECURE, false),
    user: env.SMTP_USER || '',
    pass: env.SMTP_PASS || '',
    from: env.SMTP_FROM || 'Piets Technology Solutions <pietstechsolutions@gmail.com>'
  },
  business: {
    name: 'Piets Technology Solutions',
    legalName: 'Piets Technology Solutions Inc',
    phone: '631-871-5957',
    phoneE164: '+16318715957',
    email: 'pietstechsolutions@gmail.com',
    website: 'pietstechsolutions.com',
    area: 'Long Island, NY'
  },
  brand: {
    navy: '#011F5D',
    navyDeep: '#011442',
    cyan: '#00FFFF',
    cyanMid: '#02D7F5',
    blue: '#01A2E8',
    blueDeep: '#016FD6'
  },
  blogApiToken: env.BLOG_API_TOKEN || '',
  // --- Integrations (Zapier / API / AI) ---
  apiToken: env.API_TOKEN || '',
  webhookTimeoutMs: Number(env.WEBHOOK_TIMEOUT_MS || 10000),
  ai: {
    anthropicApiKey: forceSandbox ? '' : (env.ANTHROPIC_API_KEY || ''),
    anthropicModel: env.ANTHROPIC_MODEL || 'claude-sonnet-4-5',
    openaiApiKey: forceSandbox ? '' : (env.OPENAI_API_KEY || ''),
    openaiBaseUrl: (env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, ''),
    openaiModel: env.OPENAI_MODEL || 'gpt-4o-mini',
    // A non-default base URL (Ollama, LM Studio, vLLM) usually needs no key.
    openaiLocal: !!env.OPENAI_BASE_URL && !/api\.openai\.com/.test(env.OPENAI_BASE_URL)
  },
  schedulerEnabled: !bool(env.DISABLE_SCHEDULER, false),
  runBuildOnStart: !bool(env.SKIP_BUILD, false)
};

export default config;
