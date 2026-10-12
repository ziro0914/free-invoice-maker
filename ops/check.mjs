// Sanity checks run after build. Exits non-zero on problems.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const fail = [];

const profs = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/professions.json'), 'utf8'));
const req = ['slug', 'name', 'plural', 'keyword', 'title', 'description', 'intro', 'items', 'tips', 'faq', 'payment_terms'];
const seen = new Set();
for (const p of profs) {
  for (const k of req) if (!(k in p)) fail.push(`profession ${p.slug}: missing ${k}`);
  if (seen.has(p.slug)) fail.push(`duplicate slug ${p.slug}`);
  seen.add(p.slug);
  if (!/^[a-z0-9-]+$/.test(p.slug)) fail.push(`bad slug ${p.slug}`);
  if (!fs.existsSync(path.join(ROOT, 'docs/invoice-template', p.slug, 'index.html'))) fail.push(`not built: ${p.slug}`);
}

const gdir = path.join(ROOT, 'content/guides');
for (const f of fs.existsSync(gdir) ? fs.readdirSync(gdir).filter(f => f.endsWith('.json')) : []) {
  const g = JSON.parse(fs.readFileSync(path.join(gdir, f), 'utf8'));
  for (const k of ['slug', 'title', 'description', 'date', 'html']) if (!g[k]) fail.push(`guide ${f}: missing ${k}`);
  if (/<script|<iframe|\son\w+=/i.test(g.html || '')) fail.push(`guide ${f}: disallowed markup`);
  if (!fs.existsSync(path.join(ROOT, 'docs/guides', g.slug, 'index.html'))) fail.push(`not built: guide ${g.slug}`);
}

for (const f of ['index.html', 'sitemap.xml', 'robots.txt', 'assets/app.js', 'assets/style.css'])
  if (!fs.existsSync(path.join(ROOT, 'docs', f))) fail.push(`missing docs/${f}`);

if (fail.length) { console.error('CHECK FAILED\n' + fail.join('\n')); process.exit(1); }
console.log(`check ok: ${profs.length} professions`);
