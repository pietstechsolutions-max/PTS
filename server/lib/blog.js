// Blog posts live as markdown files in content/blog/*.md (front matter + body).
// The build script (npm run build) renders them into public/blog. Archived posts move to content/blog/_archive/.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT_DIR } from '../config.js';
import { audit } from './util.js';

export const BLOG_DIR = path.join(ROOT_DIR, 'content', 'blog');
export const ARCHIVE_DIR = path.join(BLOG_DIR, '_archive');

export function slugify(s) {
  return String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

export function parseFrontMatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    else v = v.replace(/^["']|["']$/g, '');
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

const q = (s) => '"' + String(s ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ') + '"';

export function serialize(post) {
  const tags = (post.tags || []).map((t) => String(t).trim()).filter(Boolean);
  return [
    '---',
    `title: ${q(post.title)}`,
    `description: ${q(post.description)}`,
    `date: ${post.date}`,
    `slug: ${post.slug}`,
    `tags: [${tags.join(', ')}]`,
    `focusKeyword: ${String(post.focusKeyword || '').replace(/\r?\n/g, ' ')}`,
    '---',
    '',
    String(post.body || '').replace(/\r\n/g, '\n').trim(),
    ''
  ].join('\n');
}

function readDir(dir, archived) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const file = path.join(dir, f);
    const src = fs.readFileSync(file, 'utf8');
    const { data, body } = parseFrontMatter(src);
    const slug = data.slug || slugify(f.replace(/\.md$/, ''));
    return {
      file: f, slug, archived,
      title: data.title || slug, description: data.description || '', date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
      focusKeyword: data.focusKeyword || '', body,
      words: body.split(/\s+/).filter(Boolean).length,
      modified: fs.statSync(file).mtime.toISOString()
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function listPosts() {
  return { posts: readDir(BLOG_DIR, false), archived: readDir(ARCHIVE_DIR, true) };
}

export function getPost(slug) {
  const s = slugify(slug);
  return readDir(BLOG_DIR, false).find((p) => p.slug === s || p.file === s + '.md') || null;
}

export function validatePost(input, { existingSlug } = {}) {
  const errors = [];
  const title = String(input.title || '').trim();
  const description = String(input.description || '').trim();
  const body = String(input.body || '').trim();
  let slug = slugify(input.slug || title);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(input.date || '')) ? input.date : new Date().toISOString().slice(0, 10);
  const tags = Array.isArray(input.tags) ? input.tags : String(input.tags || '').split(',');
  if (!title) errors.push('Title is required.');
  if (!body) errors.push('Body is required.');
  if (!slug) errors.push('Slug could not be made from the title.');
  if (slug && slug !== existingSlug && (fs.existsSync(path.join(BLOG_DIR, slug + '.md')) || fs.existsSync(path.join(ARCHIVE_DIR, slug + '.md')))) errors.push(`A post with slug "${slug}" already exists.`);
  return { errors, post: { title, description, slug, date, tags: tags.map((t) => String(t).trim()).filter(Boolean), focusKeyword: String(input.focusKeyword || '').trim(), body } };
}

/** Write a post. If existingSlug differs from the new slug, the old file is renamed. Returns the post. */
export function savePost(post, { existingSlug, actor = 'admin' } = {}) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
  if (existingSlug && existingSlug !== post.slug) {
    const old = path.join(BLOG_DIR, existingSlug + '.md');
    if (fs.existsSync(old)) fs.renameSync(old, path.join(BLOG_DIR, post.slug + '.md'));
  }
  fs.writeFileSync(path.join(BLOG_DIR, post.slug + '.md'), serialize(post), 'utf8');
  audit(actor, existingSlug ? 'blog_post_updated' : 'blog_post_created', 'blog', null, post.slug);
  return post;
}

/** Archive = move to content/blog/_archive/. Never deletes. */
export function archivePost(slug, actor = 'admin') {
  const s = slugify(slug);
  const src = path.join(BLOG_DIR, s + '.md');
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  let dest = path.join(ARCHIVE_DIR, s + '.md');
  if (fs.existsSync(dest)) dest = path.join(ARCHIVE_DIR, `${s}-${Date.now()}.md`);
  fs.renameSync(src, dest);
  audit(actor, 'blog_post_archived', 'blog', null, s);
  return true;
}

export function restorePost(slug, actor = 'admin') {
  const s = slugify(slug);
  const src = path.join(ARCHIVE_DIR, s + '.md');
  if (!fs.existsSync(src) || fs.existsSync(path.join(BLOG_DIR, s + '.md'))) return false;
  fs.renameSync(src, path.join(BLOG_DIR, s + '.md'));
  audit(actor, 'blog_post_restored', 'blog', null, s);
  return true;
}

/** Runs `npm run build` (if the root package.json has a build script). Resolves { ok, output }. */
export function runBuild() {
  return new Promise((resolve) => {
    let pkg;
    try { pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8')); } catch { return resolve({ ok: false, output: 'package.json not found' }); }
    if (!pkg.scripts?.build) return resolve({ ok: false, output: 'no build script' });
    const child = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build', '--silent'], { cwd: ROOT_DIR, env: { ...process.env, NODE_ENV: undefined } });
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    const t = setTimeout(() => { child.kill(); }, 120000);
    child.on('close', (code) => { clearTimeout(t); resolve({ ok: code === 0, output: out.trim() }); });
    child.on('error', (e) => { clearTimeout(t); resolve({ ok: false, output: e.message }); });
  });
}

/** Simple SEO checks for the editor. */
export function seoCheck(post) {
  const kw = String(post.focusKeyword || '').trim().toLowerCase();
  const body = String(post.body || '');
  const has = (s) => !!kw && String(s || '').toLowerCase().includes(kw);
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p && !p.startsWith('#'));
  const h2s = [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1]);
  const words = body.split(/\s+/).filter(Boolean).length;
  const checks = [
    { label: `Title length ${post.title.length}/60`, ok: post.title.length > 0 && post.title.length <= 60, hint: post.title.length > 60 ? 'Too long - Google cuts titles around 60 characters.' : '' },
    { label: `Description length ${post.description.length}/155`, ok: post.description.length > 0 && post.description.length <= 155, hint: post.description.length > 155 ? 'Too long - keep under 155 characters.' : (!post.description ? 'Add a description.' : '') },
    { label: 'Focus keyword set', ok: !!kw, hint: kw ? '' : 'Pick the phrase people would search for.' },
    { label: 'Keyword in title', ok: has(post.title), hint: '' },
    { label: 'Keyword in first paragraph', ok: has(paragraphs[0]), hint: '' },
    { label: 'Keyword in an H2 heading', ok: h2s.some(has), hint: h2s.length ? '' : 'Add ## headings to break up the post.' },
    { label: `Word count ${words}`, ok: words >= 600, hint: words < 600 ? 'Aim for 600+ words for a helpful article.' : '' },
    { label: 'Slug is short and readable', ok: post.slug.length > 0 && post.slug.length <= 60, hint: '' }
  ];
  return { checks, score: Math.round(100 * checks.filter((c) => c.ok).length / checks.length), words, h2Count: h2s.length };
}
