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

function productBox() {
  const p = (cfg.products || []).find(x => x.url);
  if (!p) return '';
  return `<aside class="partner product"><strong>${esc(p.headline)}</strong> ${esc(p.text)} <a href="${esc(p.url)}" rel="noopener" target="_blank">${esc(p.cta)} →</a></aside>`;
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
  <nav><a href="${url('invoice-templates/')}">Templates</a><a href="${url('guides/')}">Guides</a><a href="${url('tools/')}">Free tools</a><a href="${url('shop/')}">Shop</a></nav>
</div></header>
<main>${body}</main>
<footer class="site"><div class="wrap">
  <p><a href="${url('')}">Invoice generator</a><a href="${url('invoice-templates/')}">Invoice templates</a><a href="${url('guides/')}">Guides</a><a href="${url('tools/')}">Free tools</a><a href="${url('shop/')}">Shop</a><a href="${url('tools/etsy-fee-calculator/')}">Etsy fee calculator</a><a href="${url('about/')}">About</a><a href="${url('privacy/')}">Privacy</a></p>
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
  ${productBox()}
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
  ${productBox()}
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
${productBox()}
${partnerBox(g.slug)}
<p><a href="${url('')}"><strong>Create a free invoice now →</strong></a></p></article>`
    }));
  }
}

function buildTools() {
  const rel = 'tools/etsy-fee-calculator/';
  const prod = 'https://ziroflux4.gumroad.com/l/etsy-profit-calculator';
  const field = (id, label, v, step = '0.01') => `<label>${label}<input id="${id}" type="number" inputmode="decimal" min="0" step="${step}" value="${v}"></label>`;
  const faq = [
    ['How much does Etsy take per sale?', 'For a US shop: a $0.20 listing fee, a 6.5% transaction fee on the item price plus shipping, and payment processing of 3% + $0.25 on the order total. That is usually 10-12% of the order. A sale from Offsite Ads adds 15% (12% for shops over $10k a year), capped at $100 per order.'],
    ['Does Etsy charge fees on shipping?', 'Yes. The 6.5% transaction fee and payment processing are both charged on the shipping you charge the buyer, not only on the item price.'],
    ['Is sales tax included?', 'No. Sales tax or VAT that Etsy collects from buyers is passed to the tax authority and is not your income, so this calculator leaves it out.'],
  ];
  write(`${rel}index.html`, layout({
    title: 'Etsy Fee Calculator 2026: Fees, Profit & Margin | Free',
    description: 'Free Etsy fee calculator. Enter your price, shipping and costs to see every Etsy fee, your profit, your margin and the price you need. US, UK, Canada, Australia.',
    rel,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
    body: `<section class="wrap hero"><h1>Etsy Fee Calculator</h1><p>See every Etsy fee on a sale, what you actually keep, and the price you need for your target margin. Free, no sign-up.</p></section>
<section class="wrap tool" style="margin:18px auto 40px">
<form class="card" onsubmit="return false" id="etsy">
  <fieldset><legend>Your sale</legend><div class="grid2">
    <label>Shop country<select id="cty"><option value="us">United States</option><option value="uk">United Kingdom</option><option value="ca">Canada</option><option value="au">Australia</option><option value="eu">Eurozone</option></select></label>
    ${field('price', 'Item price', 28)}${field('ship', 'Shipping you charge', 6)}
    ${field('mat', 'Materials + packaging', 5.7)}${field('post', 'Postage you pay', 7.5)}
    ${field('ads', 'Etsy Ads cost per sale', 0)}${field('target', 'Target margin %', 30, '1')}
    <label style="display:flex;gap:8px;align-items:center;padding-top:18px"><input id="offsite" type="checkbox" style="width:auto;margin:0">Sale came from Offsite Ads</label>
  </div></fieldset>
</form>
<div class="card" id="out" aria-live="polite"></div>
</section>
<article class="wrap content">
${(cfg.products || []).length ? `<aside class="partner product"><strong>Have more than one listing?</strong> The Etsy Seller Profit Calculator spreadsheet does this for up to 50 products at once, flags listings that lose money, adds labour cost and shows your monthly shop profit. Excel + Google Sheets. <a href="${prod}" rel="noopener" target="_blank">Get it ($7) →</a></aside>` : ''}
<h2>Etsy fees explained</h2>
${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}
<p class="small">Fee rates from Etsy's published fee schedule as of October 2026. Check etsy.com/legal/fees for your country. Not tax or accounting advice.</p>
</article>
<script>
(function(){
var F={us:[.065,.03,.25,.20,0,'$'],uk:[.065,.04,.20,.16,.0032,'£'],ca:[.065,.03,.25,.27,0,'C$'],au:[.065,.03,.25,.30,0,'A$'],eu:[.065,.04,.30,.18,0,'€']};
function v(id){return parseFloat(document.getElementById(id).value)||0}
function run(){
 var f=F[document.getElementById('cty').value],c=f[5],off=document.getElementById('offsite').checked;
 var p=v('price'),s=v('ship'),tot=p+s,costs=v('mat')+v('post')+v('ads'),t=v('target')/100;
 var lines=[['Listing fee',f[3]],['Transaction fee (6.5%)',tot*f[0]],['Payment processing',tot*f[1]+f[2]],['Regulatory fee',tot*f[4]],['Offsite Ads',off?Math.min(tot*.15,100):0]];
 var fees=lines.reduce(function(a,l){return a+l[1]},0),profit=tot-fees-costs,m=tot?profit/tot:0;
 var pct=f[0]+f[1]+f[4]+(off?.15:0),need=(costs+f[3]+f[2])/(1-pct-t)-s;
 function $(x){return (x<0?'-':'')+c+Math.abs(x).toFixed(2)}
 document.getElementById('out').innerHTML='<h2 style="margin-top:0">Result</h2><table style="width:100%">'+
  '<tr><td>Order total</td><td style="text-align:right">'+$(tot)+'</td></tr>'+
  lines.filter(function(l){return l[1]>0}).map(function(l){return '<tr><td>'+l[0]+'</td><td style="text-align:right">-'+$(l[1])+'</td></tr>'}).join('')+
  '<tr><td><b>Total Etsy fees</b></td><td style="text-align:right"><b>'+$(fees)+'</b> ('+(tot?(fees/tot*100).toFixed(1):0)+'%)</td></tr>'+
  '<tr><td>Your costs</td><td style="text-align:right">-'+$(costs)+'</td></tr>'+
  '<tr><td><b>Profit per sale</b></td><td style="text-align:right;font-size:1.3em"><b>'+$(profit)+'</b></td></tr>'+
  '<tr><td>Margin</td><td style="text-align:right">'+(m*100).toFixed(1)+'%</td></tr></table>'+
  '<p>Item price for a '+(t*100).toFixed(0)+'% margin: <b>'+(pct+t<1&&need>0?$(need):'n/a')+'</b></p>';
}
document.getElementById('etsy').addEventListener('input',run);run();
})();
</script>`
  }));
}

// Free calculators that each lead to one paid spreadsheet. compute(v) runs in the browser and returns [[label, value, bold?], ...].
const CALCS = [
  {
    slug: 'freelance-hourly-rate-calculator', name: 'Freelance hourly rate calculator',
    title: 'Freelance Hourly Rate Calculator: What Should I Charge? | Free',
    description: 'Free freelance rate calculator. Enter the income you want, your costs, tax and time off to get your minimum hourly, day and monthly rate.',
    h1: 'Freelance Hourly Rate Calculator', intro: 'Work out the minimum hourly rate that pays your salary, business costs and taxes, after holidays and unbilled admin time.',
    fields: [['income', 'Take-home pay you want per year', 60000, '100'], ['costs', 'Business costs per year (software, gear, insurance)', 4000, '100'],
      ['tax', 'Tax rate % (income + self-employment)', 25, '1'], ['weeks', 'Weeks off per year (holiday, sick)', 6, '1'],
      ['hours', 'Hours worked per week', 40, '1'], ['bill', 'Billable share of your hours %', 65, '1']],
    compute: `var gross=(v.income+v.costs)/Math.max(.01,1-v.tax/100),hrs=(52-v.weeks)*v.hours*v.bill/100,h=hrs?gross/hrs:0;
return [['Revenue you need per year',m(gross)],['Billable hours per year',hrs.toFixed(0)],['Minimum hourly rate',m(h),1],['Day rate (8h)',m(h*8)],['Monthly retainer equivalent',m(gross/12)]];`,
    cta: ['Want quotes and scenarios too?', 'The Freelance Rate & Pricing Calculator spreadsheet adds a project quote builder, side-by-side scenarios and a raise-your-rates simulator. Excel + Google Sheets.', 'Get it ($7)', 'https://ziroflux4.gumroad.com/l/rate-calculator'],
    faq: [['How do I calculate my freelance hourly rate?', 'Add the take-home pay you want to your yearly business costs, gross it up for tax, then divide by the hours you can actually bill in a year: weeks worked × hours per week × your billable share.'],
      ['Why is the billable share so low?', 'Most freelancers spend 30-40% of their time on sales, admin, invoicing and learning. Those hours earn nothing directly, so your rate on billable hours has to cover them.']],
  },
  {
    slug: 'reorder-point-calculator', name: 'Reorder point calculator',
    title: 'Reorder Point Calculator for Small Shops: When to Reorder | Free',
    description: 'Free reorder point calculator. Enter daily sales, supplier lead time and safety stock to see when to reorder and how many units to order.',
    h1: 'Reorder Point Calculator', intro: 'Find the stock level at which you should reorder, so you never run out of your best sellers while waiting for the supplier.',
    fields: [['sold', 'Units sold in the last 30 days', 90, '1'], ['lead', 'Supplier lead time (days)', 14, '1'], ['safety', 'Safety stock (days of sales)', 7, '1'],
      ['onhand', 'Units on hand now', 60, '1'], ['cover', 'Days of stock each order should cover', 30, '1'], ['cost', 'Unit cost', 4.5, '0.01']],
    compute: `var d=v.sold/30,rop=Math.ceil(d*(v.lead+v.safety)),qty=Math.ceil(d*v.cover),left=d?(v.onhand-rop)/d:0;
return [['Average daily sales',d.toFixed(1)],['Reorder point (units)',rop,1],[v.onhand<=rop?'Status':'Days until you need to reorder',v.onhand<=rop?'REORDER NOW':left.toFixed(0)+' days',1],['Suggested order quantity',qty],['Order cost',m(qty*v.cost)]];`,
    cta: ['Tracking more than a few products?', 'The Small Business Inventory & Stock Tracker spreadsheet does this for up to 300 SKUs from your sales log, with automatic reorder alerts, a reorder list and a stock value dashboard. Excel + Google Sheets.', 'Get it ($12)', 'https://ziroflux4.gumroad.com/l/inventory-tracker'],
    faq: [['What is a reorder point?', 'The stock level that tells you to place a new order. It equals average daily sales × (supplier lead time + safety days). When stock falls to it, the new order arrives just before you run out.'],
      ['How much safety stock do I need?', 'A common start is one to two weeks of sales. Use more if your supplier is unreliable or sales swing a lot, less for slow or cheap items.']],
  },
  {
    slug: 'freelance-project-price-calculator', name: 'Freelance project price calculator',
    title: 'Freelance Project Price Calculator: Hourly to Fixed Quote | Free',
    description: 'Free project price calculator. Turn your hourly rate and estimated hours into a fixed-price quote with a buffer for surprises, expenses and a deposit.',
    h1: 'Freelance Project Price Calculator', intro: 'Convert your hourly rate and time estimate into a fixed project quote, with a safety buffer, pass-through expenses and a deposit amount.',
    fields: [['hours', 'Estimated hours for the project', 20, '1'], ['rate', 'Your hourly rate', 60, '1'], ['buffer', 'Buffer for revisions and surprises %', 15, '1'],
      ['exp', 'Expenses to pass on (stock assets, fees)', 50, '1'], ['dep', 'Deposit % upfront', 50, '1']],
    compute: `var labor=v.hours*v.rate*(1+v.buffer/100),total=labor+v.exp,eff=v.hours?labor/v.hours:0;
return [['Labor (hours x rate + buffer)',m(labor)],['Expenses',m(v.exp)],['Fixed project price',m(total),1],['Deposit upfront',m(total*v.dep/100)],['Balance on delivery',m(total-total*v.dep/100)],['Hourly rate if it takes the estimated hours',m(eff)]];`,
    cta: ['Quote more projects with less guesswork', 'The Freelance Rate & Pricing Calculator spreadsheet adds a project quote builder, side-by-side scenarios and a raise-your-rates simulator. Excel + Google Sheets.', 'Get it ($7)', 'https://ziroflux4.gumroad.com/l/rate-calculator'],
    faq: [['How do I turn an hourly rate into a fixed project price?', 'Estimate the hours honestly, multiply by your hourly rate, add a buffer for revisions and surprises, then add any expenses you pass on. The result is your fixed price; a deposit is a share of it paid upfront.'],
      ['How big should the buffer be?', 'There is no universal number. Many freelancers add roughly 10-20% for well-defined work and more when the scope is vague or the client is new. Spell out the number of revision rounds in the quote.']],
  },
];

function buildCalcs() {
  for (const c of CALCS) {
    const rel = `tools/${c.slug}/`;
    const fields = c.fields.map(([id, label, val, step]) => `<label>${esc(label)}<input data-k="${id}" type="number" inputmode="decimal" min="0" step="${step}" value="${val}"></label>`).join('');
    write(`${rel}index.html`, layout({
      title: c.title, description: c.description, rel,
      jsonld: [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
      body: `<section class="wrap hero"><h1>${esc(c.h1)}</h1><p>${esc(c.intro)} Free, no sign-up.</p></section>
<section class="wrap tool" style="margin:18px auto 40px">
<form class="card" id="calc" onsubmit="return false"><fieldset><legend>Your numbers</legend><div class="grid2">${fields}</div></fieldset></form>
<div class="card" id="out" aria-live="polite"></div>
</section>
<article class="wrap content">
<aside class="partner product"><strong>${esc(c.cta[0])}</strong> ${esc(c.cta[1])} <a href="${c.cta[3]}" rel="noopener" target="_blank">${esc(c.cta[2])} →</a></aside>
${c.faq.map(([q, a]) => `<h2>${esc(q)}</h2><p>${esc(a)}</p>`).join('')}
<p class="small">Estimates only. Not tax, legal or financial advice. <a href="${url('tools/')}">More free tools</a></p>
</article>
<script>
(function(){
function m(x){return (x<0?'-':'')+'$'+Math.abs(x).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}
function calc(v){${c.compute}}
function run(){var v={};document.querySelectorAll('#calc [data-k]').forEach(function(e){v[e.dataset.k]=parseFloat(e.value)||0});
 document.getElementById('out').innerHTML='<h2 style="margin-top:0">Result</h2><table style="width:100%">'+calc(v).map(function(r){
  return '<tr><td>'+(r[2]?'<b>'+r[0]+'</b>':r[0])+'</td><td style="text-align:right'+(r[2]?';font-size:1.3em':'')+'">'+(r[2]?'<b>'+r[1]+'</b>':r[1])+'</td></tr>'}).join('')+'</table>';}
document.getElementById('calc').addEventListener('input',run);run();
})();
</script>`
    }));
  }
  const all = [['etsy-fee-calculator', 'Etsy fee calculator', 'Every Etsy fee on a sale, your profit and the price you need.'],
    ...CALCS.map(c => [c.slug, c.name, c.intro])];
  write('tools/index.html', layout({
    title: 'Free Calculators for Freelancers & Small Shops | Free Invoice Maker',
    description: 'Free calculators for freelancers and small online shops: Etsy fees, freelance hourly rate, reorder point. No sign-up.',
    rel: 'tools/',
    body: `<section class="wrap hero"><h1>Free tools</h1><p>Quick calculators for freelancers and small shops. No sign-up, nothing stored.</p></section>
<article class="wrap content"><ul><li><a href="${url('')}">Free invoice generator</a>: make a PDF invoice in your browser.</li>${all.map(([s, n, d]) => `<li><a href="${url(`tools/${s}/`)}">${esc(n)}</a>: ${esc(d)}</li>`).join('')}</ul></article>`
  }));
}

// Paid spreadsheets sold on Gumroad (source: github.com/ziro0914/digital-products). Keep wording to what each file actually does.
const G = 'https://ziroflux4.gumroad.com/l/';
const SHOP = [
  ['freelancer-kit', 'Freelancer Invoice & Bookkeeping Kit', 12, 'Invoice log with overdue alerts, expenses and mileage, a monthly profit dashboard and a tax set-aside.'],
  ['tax-organizer', 'Self-Employed Tax Organizer 2026 (US)', 12, 'Income, expense and mileage logs, Schedule C totals by line and a quarterly tax set-aside estimate. Not tax advice.'],
  ['rate-calculator', 'Freelance Rate & Pricing Calculator', 7, 'Your minimum hourly, day and retainer rates, a project quote builder and a raise-your-rates simulator.'],
  ['client-tracker', 'Freelance Client Tracker & Onboarding System', 12, 'Lead pipeline with follow-up reminders, a 9-step onboarding checklist and project deadlines.'],
  ['budget-planner', 'Small Business Budget & Cash-Flow Planner', 12, '12-month budget by category, budget vs actual every month and low-cash alerts.'],
  ['inventory-tracker', 'Small Business Inventory & Stock Tracker', 12, 'Stock on hand per SKU, reorder alerts, a reorder list with order cost and a best-seller dashboard.'],
  ['etsy-profit-calculator', 'Etsy Seller Profit Calculator', 7, 'Every Etsy fee line by line, profit and margin for up to 50 listings and the price for your target margin.'],
  ['money-bundle', 'Small Business Money Bundle', 22, 'Bookkeeping kit + rate calculator + budget planner. Save $9.'],
  ['etsy-seller-bundle', 'Etsy Seller Bundle', 15, 'Inventory tracker + Etsy profit calculator. Save $4.'],
];

function buildShop() {
  write('shop/index.html', layout({
    title: 'Spreadsheet Templates for Freelancers & Small Shops | Free Invoice Maker',
    description: 'Excel and Google Sheets templates for freelancers and small online shops: bookkeeping, taxes, pricing, clients, budget, inventory and Etsy fees. One-time price.',
    rel: 'shop/',
    body: `<section class="wrap hero"><h1>Spreadsheet templates</h1><p>The free tools on this site do one job at a time. These spreadsheets keep your whole year in one file. Excel, Google Sheets and Apple Numbers. One-time price, instant download.</p></section>
<article class="wrap content">${SHOP.map(([slug, name, price, text]) => `<aside class="partner product"><strong>${esc(name)} ($${price})</strong> ${esc(text)} <a href="${G}${slug}" rel="noopener" target="_blank">See it on Gumroad →</a></aside>`).join('\n')}
<p class="small">Sold through Gumroad, which handles payment and download. Not tax, legal or financial advice.</p></article>`
  }));
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
  const pages = ['', 'invoice-templates/', 'guides/', 'tools/', 'shop/', 'tools/etsy-fee-calculator/', ...CALCS.map(c => `tools/${c.slug}/`), 'about/', 'privacy/',
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
buildTools();
buildCalcs();
buildShop();
buildStatic();
const n = buildMeta();
console.log(`Built ${n} pages (${professions.length} professions, ${guides.length} guides) -> docs/`);
