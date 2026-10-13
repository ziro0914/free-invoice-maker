// Static site generator for Free Invoice Maker. Usage: node build.mjs
// Inputs:  config.json, data/professions.json, content/guides/*.json, src/*
// Output:  docs/ (served by GitHub Pages)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, 'docs');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));
const professions = readJson('data/professions.json', []);
const guides = fs.existsSync(path.join(ROOT, 'content/guides'))
  ? fs.readdirSync(path.join(ROOT, 'content/guides')).filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(ROOT, 'content/guides', f), 'utf8')))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  : [];

const BASE = cfg.base;               // e.g. "/free-invoice-maker/"
const SITE = cfg.siteUrl.replace(/\/$/, '') + BASE; // absolute URL root, trailing slash
const BUILD_DATE = new Date().toISOString().slice(0, 10);

function readJson(rel, fallback) {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fallback;
}
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const url = rel => BASE + rel;
const abs = rel => SITE + rel;

function write(rel, html) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function analytics() {
  let s = '';
  if (cfg.gaId) {
    s += `<script async src="https://www.googletagmanager.com/gtag/js?id=${cfg.gaId}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${cfg.gaId}');</script>`;
  }
  if (cfg.adsenseClient) {
    s += `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cfg.adsenseClient}" crossorigin="anonymous"></script>`;
  }
  return s;
}

function partnerBox(context) {
  const p = (cfg.partners || []).find(x => x.url);
  if (!p) return '';
  return `<aside class="partner"><strong>${esc(p.headline)}</strong> ${esc(p.text)} <a href="${esc(p.url)}" rel="sponsored noopener" target="_blank">${esc(p.cta)} →</a></aside>`;
}

function layout({ title, description, rel, body, jsonld = [], tool = false }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(rel)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(rel)}">
<meta name="twitter:card" content="summary">
${cfg.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(cfg.googleSiteVerification)}">` : ''}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230f766e'/%3E%3Cpath d='M9 8h14M9 14h14M9 20h9' stroke='white' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E">
<link rel="stylesheet" href="${url('assets/style.css')}?v=${BUILD_DATE}">
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
${analytics()}
</head>
<body>
<header class="site"><div class="wrap">
  <a class="brand" href="${url('')}">Free<b>Invoice</b>Maker</a>
  <nav><a href="${url('invoice-templates/')}">Templates</a><a href="${url('guides/')}">Guides</a></nav>
</div></header>
<main>${body}</main>
<footer class="site"><div class="wrap">
  <p><a href="${url('')}">Invoice generator</a><a href="${url('invoice-templates/')}">Invoice templates</a><a href="${url('guides/')}">Guides</a><a href="${url('about/')}">About</a><a href="${url('privacy/')}">Privacy</a></p>
  <p>© ${new Date().getFullYear()} Free Invoice Maker. Free forever, no sign-up. Your data stays in your browser. Not tax or legal advice.</p>
</div></footer>
${tool ? `<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" defer></script>
<script src="${url('assets/app.js')}?v=${BUILD_DATE}" defer></script>` : ''}
</body>
</html>
`;
}

function toolHtml() {
  return `<section class="wrap tool">
<form id="invoice-form" class="card" autocomplete="on" onsubmit="return false">
  <fieldset><legend>From (your business)</legend>
    <div class="grid2">
      <label>Business / your name<input name="biz_name" placeholder="Jane Doe Studio"></label>
      <label>Email<input name="biz_email" type="email" placeholder="you@example.com"></label>
      <label>Phone<input name="biz_phone" placeholder="+1 555 0100"></label>
      <label>Logo (optional)<input name="logo" type="file" accept="image/png,image/jpeg"></label>
    </div>
    <label>Address<textarea name="biz_address" rows="2" placeholder="123 Main St&#10;Austin, TX 78701"></textarea></label>
    <button type="button" id="logo-clear" class="btn" style="margin-top:6px;padding:4px 10px;font-size:13px">Remove logo</button>
  </fieldset>
  <fieldset><legend>Bill to (client)</legend>
    <div class="grid2">
      <label>Client name<input name="client_name" placeholder="Acme Inc."></label>
      <label>Client email<input name="client_email" type="email" placeholder="billing@acme.com"></label>
    </div>
    <label>Client address<textarea name="client_address" rows="2"></textarea></label>
  </fieldset>
  <fieldset><legend>Invoice details</legend>
    <div class="grid2">
      <label>Invoice #<input name="number"></label>
      <label>Currency<select name="currency"></select></label>
      <label>Issue date<input name="issued" type="date"></label>
      <label>Due date<input name="due" type="date"></label>
    </div>
  </fieldset>
  <fieldset><legend>Line items</legend>
    <div class="item-head"><span>Description</span><span>Qty</span><span>Rate</span><span style="text-align:right">Amount</span><span></span></div>
    <div id="items"></div>
    <button type="button" id="add-item" class="btn" style="margin-top:4px">+ Add line</button>
  </fieldset>
  <fieldset>
    <div class="grid2">
      <label>Tax rate (%)<input name="tax" type="number" step="any" min="0"></label>
      <label>Discount (amount)<input name="discount" type="number" step="any" min="0"></label>
    </div>
    <label>Notes &amp; payment terms<textarea name="notes" rows="3"></textarea></label>
  </fieldset>
  <p class="small">Saved automatically in this browser only. Nothing is uploaded.</p>
</form>
<div class="sticky">
  <div class="actions no-print" style="margin-bottom:10px">
    <button type="button" id="download" class="btn primary">Download PDF</button>
    <button type="button" id="print" class="btn">Print</button>
    <button type="button" id="reset" class="btn">New invoice</button>
  </div>
  <div id="preview" aria-live="polite"></div>
</div>
</section>`;
}

const appJsonld = (name, rel) => ({
  '@context': 'https://schema.org', '@type': 'WebApplication', name, url: abs(rel),
  applicationCategory: 'BusinessApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
});
const faqJsonld = faq => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
});
const faqHtml = faq => `<h2>FAQ</h2><div class="faq">${faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;
const profLinks = (exclude) => `<ul class="links">${professions.filter(p => p.slug !== exclude)
  .map(p => `<li><a href="${url(`invoice-template/${p.slug}/`)}">${esc(p.name)} invoice template</a></li>`).join('')}</ul>`;

const HOME_FAQ = [
  { q: 'Is this invoice generator really free?', a: 'Yes. There is no sign-up, no watermark and no limit on invoices. The tool runs in your browser, so we never see or store your invoices. The site is supported by ads and partner links.' },
  { q: 'Where is my data stored?', a: 'Your business details, logo and next invoice number are saved in your own browser (local storage) so the next invoice is faster. Client details and line items are never uploaded anywhere. Clearing your browser data removes them.' },
  { q: 'What should an invoice include?', a: 'At minimum: your name or business name and contact details, the client’s name, a unique invoice number, issue and due dates, a description of each item or service with quantity and rate, the total due, and how to pay. Some countries require tax IDs or VAT details, so check local rules.' },
  { q: 'Can I add my logo and change the currency?', a: 'Yes. Upload a PNG or JPG logo under 500 KB and choose from 14 currencies including USD, EUR, GBP, CAD and AUD. You can also add a tax rate and a discount.' }
];

function buildHome() {
  const rel = '';
  const body = `<section class="wrap hero">
  <h1>Free Invoice Generator — Make a PDF Invoice in 60 Seconds</h1>
  <p>Fill in the form, see a live preview and download a professional PDF invoice. No sign-up, no watermark, and your data never leaves your browser.</p>
  <div class="badges"><span>No account needed</span><span>No watermark</span><span>14 currencies</span><span>Works on phone</span></div>
</section>
${toolHtml()}
<article class="wrap content">
  ${partnerBox('home')}
  <h2>How to make an invoice</h2>
  <ol>
    <li>Enter your business name, contact details and (optionally) your logo. They are remembered for next time.</li>
    <li>Add your client's name and billing address.</li>
    <li>List each product or service with quantity and rate. Totals, tax and discount are calculated for you.</li>
    <li>Add payment terms — when payment is due and how to pay (bank transfer, PayPal, card link).</li>
    <li>Click <strong>Download PDF</strong> and email it to your client. The invoice number increments automatically.</li>
  </ol>
  <h2>Invoice templates by profession</h2>
  <p>Start from a template pre-filled with typical line items and payment terms for your trade:</p>
  ${profLinks()}
  ${guides.length ? `<h2>Latest guides</h2><ul>${guides.slice(0, 6).map(g => `<li><a href="${url(`guides/${g.slug}/`)}">${esc(g.title)}</a></li>`).join('')}</ul>` : ''}
  ${faqHtml(HOME_FAQ)}
</article>`;
  write('index.html', layout({
    title: 'Free Invoice Generator — Create & Download PDF Invoices | No Sign-Up',
    description: 'Create a professional invoice in seconds. Free invoice generator with logo, tax, discounts and 14 currencies. Download as PDF — no sign-up, no watermark.',
    rel, body, tool: true, jsonld: [appJsonld('Free Invoice Maker', rel), faqJsonld(HOME_FAQ)]
  }));
}

function buildProfession(p) {
  const rel = `invoice-template/${p.slug}/`;
  const prefill = { slug: p.slug, items: p.items, payment_terms: p.payment_terms };
  const body = `<section class="wrap hero">
  <h1>Free ${esc(p.name)} Invoice Template</h1>
  <p>${esc(p.intro[0])}</p>
  <div class="badges"><span>Pre-filled for ${esc(p.plural.toLowerCase())}</span><span>Download as PDF</span><span>No sign-up</span></div>
</section>
<script>window.FIM_PREFILL=${JSON.stringify(prefill)};</script>
${toolHtml()}
<article class="wrap content">
  <p>${esc(p.intro[1])}</p>
  ${partnerBox(p.slug)}
  <h2>Invoicing tips for ${esc(p.plural.toLowerCase())}</h2>
  <ul>${p.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
  <h2>Typical line items</h2>
  <ul>${p.items.map(i => `<li>${esc(i.desc)}</li>`).join('')}</ul>
  <p class="small">Rates shown are examples only — edit them to match your pricing.</p>
  ${faqHtml(p.faq)}
  <h2>More invoice templates</h2>
  ${profLinks(p.slug)}
</article>`;
  write(rel + 'index.html', layout({
    title: p.title, description: p.description, rel, body, tool: true,
    jsonld: [appJsonld(`${p.name} Invoice Generator`, rel), faqJsonld(p.faq), {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Invoice templates', item: abs('invoice-templates/') },
        { '@type': 'ListItem', position: 2, name: `${p.name} invoice template`, item: abs(rel) }]
    }]
  }));
}

function buildHub() {
  const rel = 'invoice-templates/';
  const body = `<section class="wrap hero"><h1>Free Invoice Templates by Profession</h1>
<p>${professions.length} free invoice templates pre-filled with typical services, rates and payment terms. Pick yours, edit and download a PDF.</p></section>
<article class="wrap content">${profLinks()}</article>`;
  write(rel + 'index.html', layout({
    title: 'Free Invoice Templates by Profession (PDF) | Free Invoice Maker',
    description: `Browse ${professions.length} free invoice templates for freelancers, trades and creatives. Pre-filled line items and payment terms. Download as PDF.`,
    rel, body
  }));
}

function buildGuides() {
  const rel = 'guides/';
  const list = guides.map(g => `<li><a href="${url(`guides/${g.slug}/`)}">${esc(g.title)}</a> <span class="small">${esc(g.date)}</span></li>`).join('');
  write(rel + 'index.html', layout({
    title: 'Invoicing Guides for Freelancers | Free Invoice Maker',
    description: 'Practical guides on invoicing, getting paid on time, payment terms, late fees and freelance pricing.',
    rel, body: `<section class="wrap hero"><h1>Invoicing guides</h1><p>Practical, no-fluff advice on getting paid.</p></section>
<article class="wrap content"><ul>${list || '<li>Coming soon.</li>'}</ul></article>`
  }));
  for (const g of guides) {
    const grel = `guides/${g.slug}/`;
    write(grel + 'index.html', layout({
      title: g.title + ' | Free Invoice Maker', description: g.description, rel: grel,
      jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: g.title, datePublished: g.date, dateModified: g.updated || g.date, description: g.description }],
      body: `<article class="wrap content"><p class="small"><a href="${url('guides/')}">Guides</a> · ${esc(g.date)}</p>
<h1>${esc(g.title)}</h1>${g.html}
${partnerBox(g.slug)}
<p><a href="${url('')}"><strong>Create a free invoice now →</strong></a></p></article>`
    }));
  }
}

function buildStatic() {
  write('about/index.html', layout({
    title: 'About | Free Invoice Maker', description: 'Free Invoice Maker is a free, private, browser-based invoice generator for freelancers and small businesses.', rel: 'about/',
    body: `<article class="wrap content"><h1>About Free Invoice Maker</h1>
<p>Free Invoice Maker is a simple, free tool for freelancers, contractors and small businesses who need a professional invoice without signing up for accounting software.</p>
<p>Everything runs in your browser. We do not have a database of your invoices — there is nothing to hack or sell. Your business details are remembered only on your own device.</p>
<p>The site is supported by advertising and by partner links to tools we think are useful. That never affects the free generator.</p>
<p>Contact: ${esc(cfg.contactEmail || 'via GitHub issues')}${cfg.contactEmail ? '' : ` at <a href="https://github.com/${esc(cfg.repo)}/issues">github.com/${esc(cfg.repo)}</a>`}.</p></article>`
  }));
  write('privacy/index.html', layout({
    title: 'Privacy Policy | Free Invoice Maker', description: 'Privacy policy for Free Invoice Maker.', rel: 'privacy/',
    body: `<article class="wrap content"><h1>Privacy Policy</h1><p class="small">Last updated ${BUILD_DATE}</p>
<h2>Invoice data</h2><p>Invoices are created entirely in your browser. Invoice content is never sent to our servers. Your business details, logo, currency, tax rate and next invoice number are stored in your browser's local storage so they can be reused; you can delete them at any time by clearing site data.</p>
<h2>Analytics</h2><p>We may use Google Analytics to understand aggregate usage (pages visited, device type, approximate country). It uses cookies. You can opt out with the Google Analytics opt-out browser add-on.</p>
<h2>Advertising</h2><p>Third-party vendors, including Google, may use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visits. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/">aboutads.info</a>. Where required (EEA, UK), a consent prompt is shown.</p>
<h2>Affiliate links</h2><p>Some links are affiliate links. If you sign up through them we may earn a commission at no extra cost to you.</p>
<h2>Contact</h2><p>${esc(cfg.contactEmail || `Open an issue at github.com/${cfg.repo}`)}</p></article>`
  }));
  write('404.html', layout({ title: 'Page not found | Free Invoice Maker', description: 'Page not found.', rel: '404.html',
    body: `<article class="wrap content"><h1>Page not found</h1><p><a href="${url('')}">Go to the free invoice generator →</a></p></article>` }));
}

function buildMeta() {
  const pages = ['', 'invoice-templates/', 'guides/', 'about/', 'privacy/',
    ...professions.map(p => `invoice-template/${p.slug}/`), ...guides.map(g => `guides/${g.slug}/`)];
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `<url><loc>${abs(p)}</loc><lastmod>${BUILD_DATE}</lastmod></url>`).join('\n')}
</urlset>
`);
  write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${abs('sitemap.xml')}\n`);
  if (cfg.indexNowKey) write(`${cfg.indexNowKey}.txt`, cfg.indexNowKey);
  if (cfg.customDomain) write('CNAME', cfg.customDomain + '\n');
  if (cfg.adsTxt) write('ads.txt', cfg.adsTxt + '\n');
  write('.nojekyll', '');
  fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'src/app.js'), path.join(OUT, 'assets/app.js'));
  fs.copyFileSync(path.join(ROOT, 'src/style.css'), path.join(OUT, 'assets/style.css'));
  return pages.length;
}

fs.rmSync(OUT, { recursive: true, force: true });
buildHome();
professions.forEach(buildProfession);
buildHub();
buildGuides();
buildStatic();
const n = buildMeta();
console.log(`Built ${n} pages (${professions.length} professions, ${guides.length} guides) -> docs/`);
