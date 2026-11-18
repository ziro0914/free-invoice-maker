#!/usr/bin/env node
// Submit new or changed pages from docs/sitemap.xml to IndexNow.
//
// Candidates = URLs in docs/sitemap.xml that are not yet in ops/indexnow-submitted.txt
//            + URLs of docs/**/index.html files changed in the current push (already-known pages)
// Successfully submitted URLs are appended to ops/indexnow-submitted.txt, one per line,
// keeping the order the file already has (small, readable diffs).
//
// Usage:  node ops/indexnow.mjs [--dry-run]
// Env:    CHANGED_FILES  newline-separated repo-relative paths changed in this push (optional)
//         DRY_RUN=1      same as --dry-run
//         INDEXNOW_ENDPOINT  override endpoint (used by tests)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DRY = process.argv.includes('--dry-run') || process.env.DRY_RUN === '1';
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const LEDGER = path.join(ROOT, 'ops/indexnow-submitted.txt');
const SITEMAP = path.join(ROOT, 'docs/sitemap.xml');
const KEY_FILE = (key) => path.join(ROOT, 'docs', `${key}.txt`);
const CHUNK = 500;

const summary = [];
const log = (msg) => { console.log(msg); summary.push(msg); };
const fail = (msg) => { console.error(`ERROR: ${msg}`); summary.push(`ERROR: ${msg}`); };

function finish(code) {
  const body = `# IndexNow\n\n${summary.map((l) => `- ${l}`).join('\n')}\n`;
  if (process.env.GITHUB_STEP_SUMMARY) {
    try { fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, body); } catch { /* not fatal */ }
  }
  process.exit(code);
}

// ---- config (read-only) ---------------------------------------------------
let config = {};
try { config = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8')); } catch { /* fall through */ }
const site = String(config.siteUrl || process.env.SITE_URL || 'https://sendinvoicefree.com').replace(/\/+$/, '');
const host = new URL(site).host;
const key = process.env.INDEXNOW_KEY || config.indexNowKey || '';
if (!key) { fail('no IndexNow key in config.json (indexNowKey)'); finish(1); }
if (!fs.existsSync(KEY_FILE(key))) { fail(`key file missing: docs/${key}.txt`); finish(1); }
const inside = fs.readFileSync(KEY_FILE(key), 'utf8').trim();
if (inside !== key) { fail(`docs/${key}.txt does not contain the key`); finish(1); }
const keyLocation = `${site}/${key}.txt`;

// ---- sitemap URLs ---------------------------------------------------------
if (!fs.existsSync(SITEMAP)) { fail('docs/sitemap.xml missing'); finish(1); }
const sitemapUrls = [...fs.readFileSync(SITEMAP, 'utf8').matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim());
if (!sitemapUrls.length) { fail('no <loc> entries in docs/sitemap.xml'); finish(1); }

// ---- ledger ---------------------------------------------------------------
const readLedger = () => new Set(
  (fs.existsSync(LEDGER) ? fs.readFileSync(LEDGER, 'utf8') : '')
    .split('\n').map((l) => l.trim()).filter(Boolean),
);
const ledger = readLedger();
log(`sitemap: ${sitemapUrls.length} URLs, ledger: ${ledger.size} URLs`);

// ---- changed pages --------------------------------------------------------
// docs/index.html -> site root, docs/<slug>/index.html -> site/<slug>/
function urlForPath(p) {
  const m = /^docs\/(?:(.*)\/)?index\.html$/.exec(p.trim());
  if (!m) return null;
  const slug = m[1] || '';
  return slug === 'index' ? `${site}/` : `${site}/${slug.replace(/\/+$/, '')}/`;
}
const changed = (process.env.CHANGED_FILES || '')
  .split('\n').map((l) => l.trim()).filter(Boolean)
  .map(urlForPath).filter(Boolean);

// Candidates: brand-new pages first, then changed pages that were submitted before.
const sitemapSet = new Set(sitemapUrls);
const fresh = sitemapUrls.filter((u) => !ledger.has(u));
const touched = [...new Set(changed)].filter((u) => sitemapSet.has(u) && ledger.has(u) && !fresh.includes(u));

const queue = [...fresh, ...touched];
log(`new: ${fresh.length}, changed: ${touched.length}, to submit: ${queue.length}`);
for (const u of [...fresh.slice(0, 50), ...touched.slice(0, 50)]) log(`  ${u}`);

if (!queue.length) { log('nothing to submit'); finish(0); }

// ---- submit ---------------------------------------------------------------
const submitted = [];
const errors = [];
async function send(batch, label) {
  const body = JSON.stringify({ host, key, keyLocation, urlList: batch });
  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
      signal: AbortSignal.timeout(30000),
    });
  } catch (e) {
    errors.push(`${label}: request failed (${e.message})`);
    return;
  }
  const text = (await res.text().catch(() => '')).slice(0, 300);
  if (res.status === 200 || res.status === 202) {
    submitted.push(...batch);
    log(`submitted ${label}: HTTP ${res.status}${text ? ` ${text}` : ''}`);
  } else {
    errors.push(`${label}: HTTP ${res.status} ${text}`);
  }
}

if (DRY) {
  log(`dry run: would POST ${queue.length} URLs to ${ENDPOINT}`);
} else {
  for (let i = 0; i < queue.length; i += CHUNK) {
    await send(queue.slice(i, i + CHUNK), `batch ${Math.floor(i / CHUNK) + 1}`);
  }
}

// ---- ledger write ---------------------------------------------------------
// Append-only, existing order kept, so the file diff stays small and readable.
if (!DRY && submitted.length) {
  const next = [...ledger];
  const seen = new Set(next);
  for (const u of submitted) if (!seen.has(u)) { seen.add(u); next.push(u); }
  if (next.length > ledger.size) {
    fs.writeFileSync(LEDGER, `${next.join('\n')}\n`);
    log(`ledger updated: +${next.length - ledger.size} URLs (total ${next.length})`);
  } else {
    log('ledger already had every submitted URL - not rewritten');
  }
}

for (const e of errors) fail(e);
finish(errors.length ? 1 : 0);
