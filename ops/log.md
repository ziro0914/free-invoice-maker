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
