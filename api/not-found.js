// Real "page not found": vercel.json sends any path that matches no file here (rewrites run only
// after the filesystem check), and this answers with HTTP 404 plus the branded 404 page, so Google
// stops seeing made-up addresses as copies of the home page. Added Oct 11 2026 (SEO pass).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

let page;
try {
  page = readFileSync(join(process.cwd(), 'public', '404.html'), 'utf8');
} catch {
  page = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found | Piets Technology Solutions</title></head>' +
    '<body style="font-family:system-ui,sans-serif;max-width:640px;margin:60px auto;padding:0 16px">' +
    '<h1>Page not found</h1><p>That page does not exist. Try the <a href="/">home page</a>, <a href="/services">services</a> ' +
    'or call <a href="tel:+16318715957">631-871-5957</a>. We answer 24/7.</p></body></html>';
}

export default function handler(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.end(page);
}
