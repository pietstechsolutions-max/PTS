#!/usr/bin/env node
// Builds the static site: renders content/blog/*.md → public/blog/<slug>.html,
// regenerates blog index, sitemap.xml and rss.xml. Also (re)generates the
// static marketing pages via ./lib/pages.js so sitemap stays complete.
// Usage: node scripts/build-blog.js   (npm run build)
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { SITE, SERVICES, esc, head, banner, nav, footer, breadcrumbLd, slugify } from './lib/site.js';
import { buildPages } from './lib/pages.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'content', 'blog');
const PUB = join(ROOT, 'public');
const BLOG = join(PUB, 'blog');
mkdirSync(BLOG, { recursive: true });

/* ---- tiny YAML front matter parser (title, description, date, slug, tags, focusKeyword) ---- */
function parseFrontMatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    else v = v.replace(/^["']|["']$/g, '');
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

const fmtDate = d => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const words = s => s.split(/\s+/).filter(Boolean).length;

marked.use({ gfm: true, headerIds: false, mangle: false });

/* ---- load posts ---- */
const posts = readdirSync(CONTENT).filter(f => f.endsWith('.md')).map(f => {
  const src = readFileSync(join(CONTENT, f), 'utf8');
  const { data, body } = parseFrontMatter(src);
  const slug = data.slug || slugify(f.replace(/\.md$/, ''));
  const html = marked.parse(body);
  const mtime = statSync(join(CONTENT, f)).mtime.toISOString().slice(0, 10);
  return { ...data, slug, tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []), html, body, file: f,
    readMin: Math.max(1, Math.round(words(body) / 220)), modified: mtime > data.date ? mtime : data.date };
}).sort((a, b) => (a.date < b.date ? 1 : -1));

/* ---- shared blog layout ---- */
function ctaBox() {
  return `<aside class="cta-box"><h3>Want this handled for you?</h3><p>Free demo (in person or video call), references available, and a solution tailored to your place. ${esc(SITE.clientLine)}</p><div class="btn-row"><a class="btn btn-primary" href="tel:${SITE.phoneE164}">Call ${SITE.phone}</a><a class="btn btn-light" href="sms:${SITE.phoneE164}">Text us</a><a class="btn btn-light" href="/#quote">Get a free quote</a></div></aside>`;
}
function authorBox() {
  return `<div class="author"><img src="/assets/brand/logo-mark.png" width="56" height="56" alt="" loading="lazy"><p><strong>${esc(SITE.name)}</strong><br>Low-voltage tech for homes and small businesses — cameras, Wi-Fi, cabling, POS, phones and 24/7 support across Long Island, NYC, the Hudson Valley and the Capital Region. ${esc(SITE.tagline)}</p></div>`;
}
function postCard(p) {
  return `<a class="post-card" href="/blog/${p.slug}.html"><time datetime="${p.date}">${fmtDate(p.date)} · ${p.readMin} min read</time><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><span>Read more →</span></a>`;
}
function related(p) {
  const score = o => o.tags.filter(t => p.tags.includes(t)).length;
  return posts.filter(o => o.slug !== p.slug).sort((a, b) => score(b) - score(a)).slice(0, 3);
}

function renderPost(p) {
  const path = `/blog/${p.slug}.html`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description, datePublished: p.date, dateModified: p.modified,
      image: SITE.url + SITE.banner, url: SITE.url + path, mainEntityOfPage: SITE.url + path, keywords: [p.focusKeyword, ...p.tags].filter(Boolean).join(', '),
      wordCount: words(p.body), author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: SITE.url + '/assets/brand/logo-mark.png' } } },
    breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }, { name: p.title, path }]),
  ];
  const rel = related(p);
  const body = `${banner()}
${nav('blog')}
<main id="main">
<div class="page-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/blog/">Blog</a><span>/</span><strong>${esc(p.title)}</strong></nav><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p></div></div>
<section class="section"><div class="wrap">
<article class="article">
  <p class="meta">Published <time datetime="${p.date}">${fmtDate(p.date)}</time> · ${p.readMin} min read · by ${esc(SITE.name)}</p>
  ${p.html}
  ${p.tags.length ? `<ul class="tags" aria-label="Tags">${p.tags.map(t => `<li><a href="/blog/#tag-${slugify(t)}">#${esc(t)}</a></li>`).join('')}</ul>` : ''}
  ${ctaBox()}
  ${authorBox()}
</article>
${rel.length ? `<section class="section" style="padding-bottom:0"><div class="section-head"><div class="eyebrow">Keep reading</div><h2>Related posts</h2></div><div class="grid grid-3">${rel.map(postCard).join('')}</div></section>` : ''}
</div></section>
<section class="section section-soft" id="quote"><div class="wrap"><div class="section-head"><div class="eyebrow">Free quote</div><h2>Ready to talk about your project?</h2><p>Call or text <a href="tel:${SITE.phoneE164}">${SITE.phone}</a>, email <a href="mailto:${SITE.email}">${SITE.email}</a>, or <a href="/#quote">send the quote form</a>. ${esc(SITE.clientLine)}</p></div><div class="btn-row"><a class="btn btn-navy" href="/#quote">Get a free quote</a><a class="btn btn-outline" href="/services.html">See all services</a></div></div></section>
</main>
${footer()}`;
  return head({ title: p.title.length <= 60 ? p.title : p.title.slice(0, 57) + '…', description: p.description.slice(0, 155), path, type: 'article', extraLd: ld, published: p.date, modified: p.modified }) + body;
}

function renderIndex() {
  const path = '/blog/';
  const tags = [...new Set(posts.flatMap(p => p.tags))].sort();
  const ld = [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Blog', path }]),
    { '@context': 'https://schema.org', '@type': 'Blog', name: `${SITE.name} Blog`, url: SITE.url + path, blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: SITE.url + '/blog/' + p.slug + '.html', datePublished: p.date })) }];
  const body = `${banner()}
${nav('blog')}
<main id="main">
<div class="page-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><strong>Blog</strong></nav><h1>Tech tips for New York homes &amp; small businesses</h1><p>Straight answers on cameras, Wi-Fi, cabling, POS and the rest — from the people who install it.</p></div></div>
<section class="section"><div class="wrap">
  <div class="grid grid-3">${posts.map(postCard).join('')}</div>
  ${tags.length ? `<div class="section-head" style="margin-top:2.5rem"><div class="eyebrow">Topics</div></div><ul class="chips">${tags.map(t => `<li id="tag-${slugify(t)}">${esc(t)}</li>`).join('')}</ul>` : ''}
  <p style="margin-top:1.5rem"><a href="/rss.xml">RSS feed</a></p>
</div></section>
<section class="section section-soft" id="quote"><div class="wrap"><div class="section-head"><div class="eyebrow">Free quote</div><h2>Have a project in mind?</h2><p>${esc(SITE.clientLine)} Call or text <a href="tel:${SITE.phoneE164}">${SITE.phone}</a> or <a href="/#quote">request a free quote</a>.</p></div><div class="btn-row"><a class="btn btn-navy" href="/#quote">Get a free quote</a><a class="btn btn-outline" href="sms:${SITE.phoneE164}">Text ${SITE.phone}</a></div></div></section>
</main>
${footer()}`;
  return head({ title: 'Blog — Cameras, Wi-Fi, POS & IT Tips | Piets Tech Solutions', description: 'Practical guides on security cameras, Wi-Fi dead zones, POS costs, cabling and small business IT for Long Island, NYC, Hudson Valley and Capital Region.', path, extraLd: ld }) + body;
}

/* ---- write everything ---- */
const pageFiles = buildPages(PUB);
for (const p of posts) writeFileSync(join(BLOG, `${p.slug}.html`), renderPost(p));
writeFileSync(join(BLOG, 'index.html'), renderIndex());

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services.html', priority: '0.9', changefreq: 'monthly' },
  { loc: '/locations/', priority: '0.7', changefreq: 'monthly' },
  ...pageFiles.filter(f => f.startsWith('locations/') && !f.endsWith('index.html')).map(f => ({ loc: '/' + f, priority: '0.8', changefreq: 'monthly' })),
  { loc: '/blog/', priority: '0.7', changefreq: 'weekly', lastmod: posts[0]?.modified },
  ...posts.map(p => ({ loc: `/blog/${p.slug}.html`, priority: '0.6', changefreq: 'yearly', lastmod: p.modified })),
];
writeFileSync(join(PUB, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE.url}${u.loc}</loc><lastmod>${u.lastmod || today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`);

const cdata = s => `<![CDATA[${String(s).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
writeFileSync(join(PUB, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(SITE.name)} Blog</title>
  <link>${SITE.url}/blog/</link>
  <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
  <description>Tech tips on security cameras, Wi-Fi, cabling, POS and IT for New York homes and small businesses.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${posts.map(p => `  <item>
    <title>${cdata(p.title)}</title>
    <link>${SITE.url}/blog/${p.slug}.html</link>
    <guid isPermaLink="true">${SITE.url}/blog/${p.slug}.html</guid>
    <pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate>
    <description>${cdata(p.description)}</description>
    ${p.tags.map(t => `<category>${esc(t)}</category>`).join('')}
  </item>`).join('\n')}
</channel>
</rss>
`);

/* ---- clean URLs: Vercel (cleanUrls:true) and the Node server (extensions:['html']) both serve
   /services for /services.html, and Vercel 308-redirects the .html form. Rewrite every internal
   link, canonical, og:url, sitemap/RSS entry and JSON-LD url so nothing points at a redirect. ---- */
function cleanUrls(s) {
  const site = SITE.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return s
    .replace(new RegExp(`(${site})?/index\\.html(?=["'#?\\s<])`, 'g'), '$1/')
    .replace(new RegExp(`((?:${site})?/[A-Za-z0-9_\\-/]+?)/index\\.html(?=["'#?\\s<])`, 'g'), '$1/')
    .replace(new RegExp(`((?:${site})?/[A-Za-z0-9_\\-/]+?)\\.html(?=["'#?\\s<])`, 'g'), '$1')
    // trailingSlash:false on Vercel — /blog/ redirects to /blog, so drop trailing slashes (root "/" stays)
    .replace(new RegExp(`((?:${site})?/[A-Za-z0-9_\\-]+(?:/[A-Za-z0-9_\\-]+)*)/(?=["'#?\\s<])`, 'g'), '$1');
}
function walk(dir) {
  for (const f of readdirSync(dir)) {
    const fp = join(dir, f);
    if (statSync(fp).isDirectory()) walk(fp);
    else if (/\.(html|xml)$/.test(f)) writeFileSync(fp, cleanUrls(readFileSync(fp, 'utf8')));
  }
}
walk(PUB);

console.log(`Built ${pageFiles.length} pages, ${posts.length} posts, blog/index.html, sitemap.xml, rss.xml`);
