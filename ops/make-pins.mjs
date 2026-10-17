// Generates Pinterest pin images (1000x1500 PNG) + a Pinterest bulk-upload CSV.
// Run locally (needs Chrome + playwright-core):
//   PW_DIR=/path/with/node_modules node ops/make-pins.mjs [startDate YYYY-MM-DD] [pinsPerDay]
// Outputs: static/pins/<slug>.png (copied to the site by build.mjs) and marketing/pinterest/pins.csv
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const require = createRequire((process.env.PW_DIR || ROOT) + '/');
const { chromium } = require('playwright-core');

const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));
const SITE = cfg.siteUrl.replace(/\/$/, '') + cfg.base;
const HOST = new URL(SITE).host;
const professions = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/professions.json'), 'utf8'));
const BOARD = 'Free Invoice Templates';
const startDate = process.argv[2] || new Date(Date.now() + 864e5).toISOString().slice(0, 10);
const perDay = Number(process.argv[3] || 2);

const OUT = path.join(ROOT, 'static/pins');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(ROOT, 'marketing/pinterest'), { recursive: true });

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const money = n => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// Rotate a few accent colors so a board of pins doesn't look identical.
const PALETTE = ['#0f766e', '#1d4ed8', '#7c3aed', '#b45309', '#be123c', '#047857'];

function pinHtml(p, i) {
  const accent = PALETTE[i % PALETTE.length];
  const items = p.items.slice(0, 4);
  const total = items.reduce((s, it) => s + it.qty * it.rate, 0);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:1000px;height:1500px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;background:${accent};color:#fff;padding:70px 64px;display:flex;flex-direction:column}
  .kicker{font-size:30px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.85}
  h1{font-size:92px;line-height:1.02;margin:18px 0 22px;font-weight:800}
  .sub{font-size:36px;opacity:.92;margin-bottom:44px}
  .sheet{background:#fff;color:#1c1d1f;border-radius:22px;padding:46px 44px;box-shadow:0 24px 60px rgba(0,0,0,.25);flex:1}
  .row{display:flex;justify-content:space-between;align-items:flex-start}
  .inv{font-size:46px;font-weight:800;letter-spacing:.08em}
  .meta{font-size:22px;color:#666;text-align:right;line-height:1.5}
  .biz{font-size:24px;font-weight:700}
  table{width:100%;border-collapse:collapse;margin-top:40px;font-size:24px}
  th{background:#f3f4f6;color:#555;text-transform:uppercase;font-size:18px;text-align:left;padding:12px 14px}
  td{border-bottom:1px solid #e5e5e5;padding:16px 14px;vertical-align:top}
  th:last-child,td:last-child{text-align:right;white-space:nowrap}
  .total{display:flex;justify-content:flex-end;gap:40px;font-size:32px;font-weight:800;margin-top:22px;border-top:3px solid #1c1d1f;padding-top:14px}
  .sheet{display:flex;flex-direction:column}
  .notes{margin-top:44px;font-size:24px;line-height:1.45;color:#444;background:#f7f7f5;border-radius:12px;padding:20px 22px}
  .notes span{display:block;font-size:17px;text-transform:uppercase;letter-spacing:.08em;color:#888;margin-bottom:6px}
  .feat{list-style:none;padding:24px 0 0;margin-top:auto;display:flex;gap:14px;flex-wrap:wrap}
  .feat li{font-size:22px;font-weight:700;color:${accent};border:2px solid ${accent};border-radius:99px;padding:8px 18px}
  .foot{margin-top:40px;display:flex;justify-content:space-between;align-items:center}
  .url{font-size:40px;font-weight:800}
  .badge{background:#fff;color:${accent};font-weight:800;font-size:28px;padding:14px 24px;border-radius:99px}
  </style></head><body>
  <div class="kicker">Free · No sign-up · PDF</div>
  <h1>${esc(p.name)} Invoice Template</h1>
  <div class="sub">Fill in, preview, download a PDF in 60 seconds.</div>
  <div class="sheet">
    <div class="row"><div><div class="biz">Your ${esc(p.name)} Business</div><div class="meta" style="text-align:left">you@example.com</div></div>
      <div><div class="inv">INVOICE</div><div class="meta"># INV-0001<br>Due in 14 days</div></div></div>
    <table><thead><tr><th>Description</th><th>Amount</th></tr></thead><tbody>
      ${items.map(it => `<tr><td>${esc(it.desc)}</td><td>${money(it.qty * it.rate)}</td></tr>`).join('')}
    </tbody></table>
    <div class="total"><span>Total</span><span>${money(total)}</span></div>
    <div class="notes"><span>Payment terms</span>${esc(p.payment_terms)}</div>
    <ul class="feat"><li>Your logo</li><li>14 currencies</li><li>Tax &amp; discounts</li></ul>
  </div>
  <div class="foot"><div class="url">${esc(HOST)}</div><div class="badge">Make yours free →</div></div>
  </body></html>`;
}

const csvCell = s => `"${String(s ?? '').replace(/"/g, '""')}"`;

const browser = await chromium.launch({ executablePath: process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 1000, height: 1500 } });
const rows = [['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords']];
for (const [i, p] of professions.entries()) {
  await page.setContent(pinHtml(p, i), { waitUntil: 'load' });
  // Long profession names wrap to 3 lines and push the footer off the canvas: shrink the title until it fits.
  for (const size of [80, 70, 62, 56]) {
    if (await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.querySelector(".foot").getBoundingClientRect().bottom + 40) <= 1500)) break;
    await page.evaluate(s => { document.querySelector('h1').style.fontSize = s + 'px'; }, size);
  }
  if (!(await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.querySelector(".foot").getBoundingClientRect().bottom + 40) <= 1500))) throw new Error(`pin overflows: ${p.slug}`);
  await page.screenshot({ path: path.join(OUT, `${p.slug}.png`), type: 'png' });
  const day = new Date(startDate + 'T00:00:00Z');
  day.setUTCDate(day.getUTCDate() + Math.floor(i / perDay));
  // 15:00 / 21:00 UTC = morning / afternoon in US time zones
  const hour = i % perDay === 0 ? 15 : 21;
  const publish = `${day.toISOString().slice(0, 10)}T${String(hour).padStart(2, '0')}:00:00`;
  const title = `Free ${p.name} Invoice Template (PDF, No Sign-Up)`.slice(0, 100);
  // Pinterest caps descriptions at 500 chars: keep the call to action whole, trim the intro at a sentence/word boundary.
  const cta = ` Fill in the ${p.name.toLowerCase()} invoice online, add your logo and download a PDF. Free, no account, data stays in your browser.`;
  let lead = p.intro[0];
  const room = 500 - cta.length;
  if (lead.length > room) {
    const cut = lead.slice(0, room);
    const sentenceEnd = cut.lastIndexOf('. ');
    lead = sentenceEnd > 80 ? cut.slice(0, sentenceEnd + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…';
  }
  const desc = lead + cta;
  const kw = [p.keyword, `${p.name.toLowerCase()} invoice`, 'invoice template', 'free invoice generator', 'freelance invoice'].join(', ');
  rows.push([title, `${SITE}pins/${p.slug}.png`, BOARD, '', desc, `${SITE}invoice-template/${p.slug}/`, publish, kw]);
}
await browser.close();
fs.writeFileSync(path.join(ROOT, 'marketing/pinterest/pins.csv'), rows.map(r => r.map(csvCell).join(',')).join('\n') + '\n');
console.log(`Generated ${professions.length} pins -> static/pins/, CSV -> marketing/pinterest/pins.csv (board "${BOARD}", from ${startDate}, ${perDay}/day)`);
