// Express application factory (used by index.js and by tests).
import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import ejs from 'ejs';
import path from 'node:path';
import fs from 'node:fs';
import { config, PUBLIC_DIR, BRAND_DIR, SERVER_DIR } from './config.js';
import { getDb, getSettings } from './db.js';
import { SqliteStore } from './lib/session-store.js';
import * as util from './lib/util.js';
import { providerStatus } from './lib/providers.js';
import publicRoutes from './routes/public.js';
import webhookRoutes from './routes/webhooks.js';
import portalRoutes from './routes/portal.js';
import adminRoutes from './routes/admin.js';
import apiRoutes from './routes/api.js';

export function createApp() {
  getDb();
  const app = express();
  app.set('trust proxy', 1);
  app.set('view engine', 'ejs');
  app.set('views', path.join(SERVER_DIR, 'views'));
  app.disable('x-powered-by');

  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
        'img-src': ["'self'", 'data:', 'https:'],
        'form-action': ["'self'", 'https://checkout.stripe.com'],
        'upgrade-insecure-requests': null
      }
    },
    crossOriginEmbedderPolicy: false
  }));

  // Stripe webhook needs the raw body BEFORE json parsing.
  app.use('/webhooks/stripe', express.raw({ type: '*/*', limit: '2mb' }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  app.use(session({
    store: new SqliteStore(),
    secret: config.sessionSecret,
    name: 'piets.sid',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', secure: config.env === 'production' && config.baseUrl.startsWith('https'), maxAge: 30 * 86400 * 1000 }
  }));

  // Simple flash messages.
  app.use((req, res, next) => {
    res.locals.flash = req.session?.flash || null;
    if (req.session?.flash) delete req.session.flash;
    req.flash = (type, text) => { req.session.flash = { type, text }; };
    next();
  });

  // View helpers available in every template.
  app.use((req, res, next) => {
    res.locals.h = util;
    res.locals.money = util.money;
    res.locals.fmtDate = util.fmtDate;
    res.locals.fmtDateTime = util.fmtDateTime;
    res.locals.prettyPhone = util.prettyPhone;
    res.locals.business = config.business;
    res.locals.brand = config.brand;
    res.locals.settings = getSettings();
    res.locals.providers = providerStatus();
    res.locals.sandbox = config.sandbox;
    res.locals.baseUrl = config.baseUrl;
    res.locals.path = req.path;
    res.locals.title = '';
    res.locals.csrf = '';
    next();
  });

  // Layout renderer: res.page('admin'|'portal'|'print', 'view/name', data)
  const viewsDir = path.join(SERVER_DIR, 'views');
  app.use((req, res, next) => {
    res.page = (layout, view, data = {}) => {
      const locals = { ...res.locals, ...data };
      ejs.renderFile(path.join(viewsDir, view + '.ejs'), locals, { rmWhitespace: false }, (err, body) => {
        if (err) return next(err);
        ejs.renderFile(path.join(viewsDir, 'layouts', layout + '.ejs'), { ...locals, body }, (err2, html) => {
          if (err2) return next(err2);
          res.send(html);
        });
      });
    };
    next();
  });

  // Static: public website + brand fallback.
  app.use('/brand', express.static(BRAND_DIR, { maxAge: '1d' }));
  app.use('/assets/brand', express.static(BRAND_DIR, { maxAge: '1d' }));
  app.use('/static', express.static(path.join(SERVER_DIR, 'static'), { maxAge: '1h' }));
  if (fs.existsSync(PUBLIC_DIR)) app.use(express.static(PUBLIC_DIR, { extensions: ['html'], maxAge: '5m' }));

  app.use(publicRoutes);
  app.use('/api/v1', apiRoutes);
  app.use('/webhooks', webhookRoutes);
  app.use('/portal', portalRoutes);
  app.use('/admin', adminRoutes);

  // Root fallback when the public site has no index.html yet.
  app.get('/', (req, res) => res.redirect('/portal'));

  app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) return res.page('portal', 'portal/404', { title: 'Not found' });
    res.json({ ok: false, error: 'Not found' });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    if (req.accepts('html') && !req.path.startsWith('/api')) return res.page('portal', 'portal/error', { title: 'Something went wrong', error: config.env === 'production' ? '' : err.message });
    res.json({ ok: false, error: err.message || 'Server error' });
  });

  return app;
}

export default createApp;
