# Run log

## 2026-10-12 — launch
- Market research: Google AI Overviews cut search referrals to small publishers sharply (Chartbeat: −60% small sites); simple calculator sites report ~$0 revenue. Chose a tool that produces a file (PDF invoice) AI answers can't replace, plus profession-specific templates (pSEO with real utility).
- Shipped: generator (PDF, logo, 14 currencies, tax/discount, local-only data), profession pages, guides, sitemap.
- Next: owner sets up Search Console + Analytics + AdSense; daily content cadence.

## 2026-10-12 (daily run)
- Research (competitors / keyword): many free no-signup generators exist (Invoicemaker, Freebillkit, InvoiceGen on Product Hunt, PDF Generator API); "best of" lists are vendor-written. Top results for "invoice vs receipt" are from Blinksale, Billdu, SelfEmployed.com, Indy — confirms steady informational demand. Sources: https://invoicemaker.com/blog/best-invoice-maker-for-freelancers/ , https://www.selfemployed.com/invoice-vs-receipt/ , https://blinksale.com/post/invoice-vs-receipt-whats-the-difference
- Shipped: guide /guides/invoice-vs-receipt/ (~980 words). Build + check pass (39 pages).
- Metrics: none available (no analytics yet). gh issue list unavailable (GraphQL blocked); no owner info found, config.json unchanged.
- Next: guide "first invoice as a freelancer", then receipt/PAID mode in product.

## 2026-10-12 (daily run 2)
- Research: freelance-invoice guides (Remote, Wise, FreshBooks, Ruul) agree on the same core checklist; wedding-photo invoices commonly use deposit + milestone payments (vendor sources, unverified figures). Sources: https://remote.com/blog/how-to-invoice-as-a-freelancer , https://www.freshbooks.com/hub/pages/invoice-as-freelancer , https://invoicebloom.io/blog/how-to-invoice-for-photography
- Shipped: guide https://ziro0914.github.io/free-invoice-maker/guides/first-freelance-invoice/ (~925 words); IndexNow key file wired into build.mjs (config indexNowKey) + check.mjs. Build+check pass (40 pages).
- Metrics: none (no analytics). Open issues: none found via GitHub MCP; gh unavailable.
- IndexNow: NOT submitted — sandbox network policy returns 403 (CONNECT tunnel) for ziro0914.github.io and api.indexnow.org; key file + page liveness could not be verified. First submission of all 40 sitemap URLs still pending; retry when network allows.
- Next: receipt/PAID + estimate mode toggle; guide "what is a proforma invoice".

## 2026-10-13 (daily run)
- Owner info: issue #1 comment — domain postponed, AdSense on hold; Search Console/FreshBooks/GA4 still pending (no IDs given). config.json unchanged.
- Research (niche professions): wedding photographers typically use deposit + balance structure, add-ons (second shooter, travel, overtime); tax on prints vs digital varies by region. Nanny invoices list dates/hours/rate, separate extras and reimbursements. Sources: https://invoicequick.com/invoice-templates/wedding-photographer-invoice-template , https://invoicemaker.com/blog/invoice-template-for-photographers/ , https://invoicesimple.com/invoice-template/nanny-invoice
- Shipped: professions wedding-photographer, nanny (/invoice-template/wedding-photographer/, /invoice-template/nanny/). Build+check pass (42 pages).
- IndexNow: not submitted — sandbox proxy denies ziro0914.github.io (curl 000); key liveness unverifiable. Pending.
- Next: guide "proforma invoice"; estimate/quote mode.

## 2026-10-14 (local session)
- Domain https://sendinvoicefree.com live with HTTPS enforced. Added free tools hub /tools/ with Etsy fee, freelance hourly rate and reorder point calculators, each linking to a paid Gumroad product.
- IndexNow: submitted all 46 sitemap URLs for host sendinvoicefree.com from the local machine (HTTP 200). Cloud runs: if the sandbox blocks api.indexnow.org, just log it; the local session submits.

## 2026-10-14 (daily run, cloud)
- Owner info: issue #1 still open, no new IDs; config.json unchanged.
- Research (freelance pricing): hourly-to-project method = hours x rate + ~10-20% buffer; admin/proposals often eat 15-30% of time; fixed pricing needs scope/revision limits. Sources: https://uxdesign.cc/freelance-designer-101-pricing-strategies-work-capacity-6039fb6526e2 , https://aiproposer.com/tools/freelance-rate-calculator , https://blog.xolo.io/how-to-calculate-freelance-rates-with-up-to-date-rate-statistics . Also US tax set-aside commonly cited 25-35% (varies; check with a pro): https://1800accountant.com/blog/how-much-to-set-aside-for-self-employed-taxes
- Shipped: calculator https://sendinvoicefree.com/tools/freelance-project-price-calculator/ (cta -> rate-calculator $7). Hand check: 20h x $60 = 1200; x1.15 = 1380; +$50 = 1430; 50% deposit = 715; effective hourly 69. Build+check pass (47 pages).
- Next: tax set-aside calculator (cta freelancer-kit/budget-planner), guide "proforma invoice".
- IndexNow: not submitted — sandbox proxy denies api.indexnow.org and sendinvoicefree.com (curl 000); local session to submit /tools/freelance-project-price-calculator/, /tools/, /, /sitemap.xml.

## 2026-10-15 (daily run, cloud)
- Owner info: issue #1 still open, no new IDs; config.json unchanged.
- Research (proforma invoice demand): proformas are non-binding previews, usually not booked as sales, often unnumbered; commercial invoice is the main customs document (rules vary); for deposits a labelled deposit invoice is advised over a proforma. Sources: https://www.xero.com/uk/guides/what-is-a-proforma-invoice , https://www.gocomet.com/blog/commercial-invoice-vs-pro-forma-invoice/ , https://sparkreceipt.com/blog/pro-forma-invoice/ , https://magicheidi.ch/en/proforma-rechnung-schweiz
- Shipped: guide https://sendinvoicefree.com/guides/proforma-invoice/ (~1000 words; links to /, project price calculator, templates, how-to-write guide). Build+check pass (48 pages).
- Metrics: none (no analytics).
- Next: tax set-aside calculator (cta freelancer-kit/budget-planner), guide "invoice numbering", estimate/quote mode in the generator (the new guide mentions no proforma mode yet).
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com (curl 000 for ~5 min); local session to submit /guides/proforma-invoice/, /guides/, /, /sitemap.xml.

## 2026-10-15 (iMac IndexNow + health)
- URLs checked: 48
- Broken: none
- Submitted: 48 new URLs (+ home, sitemap); IndexNow HTTP 200

## 2026-10-15 (iMac IndexNow + health)
- URLs checked: 49
- Broken: none
- Submitted: 1 new URL (/shop/) + home + sitemap; IndexNow HTTP 200

## 2026-10-16 (daily run, cloud)
- Owner info: issue #1 only has the 10-13 comment; no new IDs; config.json unchanged.
- Research (tax set-aside demand): SE tax = 15.3% (12.4% SS + 2.9% Medicare) on 92.35% of net earnings; common rule of thumb 25-30% of net income, some sources say 30-40%; quarterly payments generally if you expect to owe $1,000+. Sources: https://pilot.com/calculators/self-employment-tax-calculator , https://smallbiztrends.com/estimated-taxes-for-self-employed/ , https://www.hellobonsai.com/blog/how-much-to-set-aside-1099-tax , https://1800accountant.com/blog/how-much-to-set-aside-for-self-employed-taxes
- Shipped: calculator https://sendinvoicefree.com/tools/self-employed-tax-set-aside-calculator/ (cta -> tax-organizer $12, wording from backlog; hedged "not tax advice"). Hand check: profit 60000 -> SE 8477.73; income tax 12% x (60000-4238.87)=6691.34; state 4%=2400; total 17569.07 = 29.3%; quarterly 4392.27; $1000 invoice -> 292.82. Build+check pass (50 pages).
- Metrics: none (no analytics).
- Next: guide "invoice numbering", guide on quarterly estimated taxes linking this calculator; estimate/quote mode.
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com (curl 000 for ~5 min); local session to submit /tools/self-employed-tax-set-aside-calculator/, /tools/, /, /sitemap.xml.

## 2026-10-16 (iMac IndexNow + health)
- Checked 50 URLs; broken: none.
- Submitted 1 new URL(s) + / + sitemap.xml to IndexNow; HTTP 200.
