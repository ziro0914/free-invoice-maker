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
