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

## 2026-10-17 (daily run, cloud)
- Owner info: issue #1 open, only the 10-13 comment; no new IDs; config.json unchanged.
- Research (invoice numbering): consensus = unique, sequential, consistent; formats INV-0001, year+seq, client-code; UK/VAT sources disagree on gaps (strict "no gaps" vs. acceptable if cancelled invoice kept/explained per HMRC FAQ via Avalara) -> hedged in guide. Sources: https://invoicebloom.io/blog/freelance-invoice-numbering-system-best-practices , https://invoiceninja.com/blog/how-to-number-freelance-invoices/ , https://www.selfemployed.com/what-is-an-invoice-number/ , https://www.avalara.com/vatlive/en/vat-news/sequential-invoice-numbering-for-tax-invoices.html , https://www.taxfly.co.uk/academy/vat-for-small-business/valid-vat-invoices
- Shipped: guide https://sendinvoicefree.com/guides/invoice-numbering/ (~1000 words). Build+check pass (51 pages).
- Metrics: none (no analytics).
- Next: guide "late fees", estimate/quote mode toggle, a calculator (sales tax/VAT) next run.
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com; local session to submit /guides/invoice-numbering/, /guides/, /, /sitemap.xml.

## 2026-10-17 (iMac IndexNow + health)
- URLs checked: 51
- Broken: none
- Submitted to IndexNow: 1 new URL(s) + home + sitemap, HTTP 200

## 2026-10-18 (daily run, cloud)
- Owner info: issue #1 not checkable (gh GraphQL blocked); OWNER_TODO has no new info; config.json unchanged.
- Research (late fees): simple monthly = amount x rate x months; compounding grows on balance; typical 1-2%/month; some places regulate/cap late fees. Source: https://www.brex.com/spend-trends/cash-flow-management/late-fees-on-invoices.md , https://enty.io/blog/how-to-calculate-and-charge-late-fees-on-invoices-a-complete-guide
- Shipped: calculator https://sendinvoicefree.com/tools/invoice-late-fee-calculator/ (cta -> freelancer-kit $12, wording from SHOP). Hand check: $5000 x 1.5% x 3 = 225 simple; 5000 x 1.015^3 - 5000 = 228.39 compounding. Build+check pass (52 pages).
- Metrics: none.
- Next: guide "how to charge late fees" linking this calculator; estimate/quote mode; sales tax/VAT calculator.
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com and api.indexnow.org; local session to submit /tools/invoice-late-fee-calculator/, /tools/, /, /sitemap.xml.

## 2026-10-18 (iMac IndexNow + health)
- URLs checked: 52. Broken: none (dog-walker had one transient curl failure, 200 on recheck).
- Submitted to IndexNow: /tools/invoice-late-fee-calculator/, /, /sitemap.xml. HTTP status: 200

## 2026-10-19 (daily run, cloud)
- Owner info: gh auth failed in sandbox (issue #1 not checkable); OWNER_TODO has no new info; config.json unchanged.
- Research (late-fee practice/limits): fee must be disclosed in the agreement beforehand, not added retroactively; typical freelancer range ~1-2%/month, hybrid "1.5% or $50/25 whichever greater"; state caps vary and figures unverified -> hedged in guide; UK has statutory B2B late payment regime (check gov.uk). Sources: https://invoicemaker.com/invoice-late-fees/ , https://keepertax.com/posts/typical-late-fee-for-invoice , https://ruul.io/blog/late-payment-fees-guide , https://www.freshbooks.com/hub/invoicing/how-do-i-charge-late-fees-on-an-invoice
- Shipped: guide https://sendinvoicefree.com/guides/how-to-charge-late-fees/ (~1030 words; links to /, late-fee calculator, payment-terms, late-payment emails, first-invoice guides, freelance-writer template). Example checked: $2000 x1.5% x3 = 90 simple; compounding 91.36. Build+check pass (53 pages).
- Metrics: none.
- Next: tax-saving guide, deposits guide, estimate/quote mode, sales tax/VAT calculator.
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com and api.indexnow.org; local session to submit /guides/how-to-charge-late-fees/, /guides/, /, /sitemap.xml.

## 2026-10-20 (daily run, cloud)
- Owner info: OWNER_TODO has no new info; config.json unchanged.
- Research (tax set-aside per invoice): common range ~25-35% of net profit; SE tax 15.3%; round up if unsure; estimated payments generally if expecting to owe $1,000+; varies by state. Sources: https://www.workmade.com/blog/how-much-should-a-freelancer-set-aside-for-taxes , https://www.everlance.com/blog/how-much-a-freelancer-should-set-aside-for-taxes , https://taxbracketcalc.com/self-employment/tax-set-aside-calculator/
- Shipped: guide https://sendinvoicefree.com/guides/how-much-to-save-from-each-invoice-for-taxes/ (~900 words; links to /, tax calculator, numbering, payment terms, writer template, tax-organizer). Example checked: 2000 - 20% = 1600; x30% = 480; left 1120. Build+check pass (54 pages).
- Metrics: none.
- Next: net 30 vs net 15 guide, deposits guide, estimate/quote mode, sales tax/VAT calculator.
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com; local session to submit /guides/how-much-to-save-from-each-invoice-for-taxes/, /guides/, /, /sitemap.xml.

## 2026-10-21 (daily run, cloud)
- Owner info: OWNER_TODO has no new info; config.json unchanged.
- Research (Net 15 vs Net 30): sources broadly agree Net 15 is a common freelancer default for small/new clients, Net 30 is expected by larger clients; shorter terms improve cash flow; pair with late-payment clause (rates need local-law check). A cited late-payment statistic on one source was unverified -> not used. Sources: https://invoicer.ai/learn/net-30-vs-net-15-payment-terms , https://www.selfemployed.com/what-is-net-15/ , https://agiled.app/hub/agencies/net-30-vs-net-15 , https://ruul.io/blog/freelance-invoice-terms , https://www.plutio.com/freelancer-magazine/invoice-payment-terms
- Shipped: guide https://sendinvoicefree.com/guides/net-30-vs-net-15/ (~960 words; links to /, late-fee calculator, payment terms, late fees, late email, tax-save guides, proforma, writer template). Example checked: $4000 invoiced on the 1st; Net 15 -> ~16th, Net 30 -> ~31st, 15 extra days. Build+check pass (55 pages).
- Metrics: none.
- Next: deposits/retainers guide, estimate/quote mode, sales tax/VAT calculator (calculator due next run).
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com; local session to submit /guides/net-30-vs-net-15/, /guides/, /, /sitemap.xml.

## 2026-10-22 (daily run, cloud)
- Owner info: issue #1 only has the 10-13 comment; OWNER_TODO no new info; config.json unchanged.
- Research (VAT/GST/sales-tax invoice calc): competitors offer such tools (Plutio tools https://plutio.com/tools , Aus GST calculator on Product Hunt https://www.producthunt.com/products/aus-freelancer-tax-invoice-calculator ); basic method = net x rate, reverse = gross/(1+rate); rules vary by location -> hedged. No other stats used.
- Shipped: calculator https://sendinvoicefree.com/tools/vat-gst-sales-tax-invoice-calculator/ (cta -> freelancer-kit $12, existing wording). Hand check: net 1000 @20% -> tax 200, total 1200; reverse 1200/1.2 = 1000 net, 200 tax. Build+check pass (56 pages).
- Metrics: none.
- Next: deposits/retainers guide, estimate/quote mode, UK late-payment interest calc (needs verified figures).
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com; local session to submit /tools/vat-gst-sales-tax-invoice-calculator/, /tools/, /, /sitemap.xml.

## 2026-10-23 (daily run, cloud)
- Owner info: issue #1 only has the 10-13 comment; OWNER_TODO no new info; config.json unchanged.
- Research (deposits/retainers): common advice 25-50% upfront (higher for small jobs, milestones for large); deposit usually credited on final invoice; refundability wording/jurisdiction varies, sources are mostly vendor blogs/forums -> hedged. Sources: https://www.moneycrashers.com/freelance-security-deposit-upfront-payment/ , https://weareindy.com/blog/how-to-ask-for-a-deposit-or-an-upfront-payment , https://invoicebloom.io/glossary/retainer , https://www.jim.com/blog/how-to-take-deposits-from-clients
- Shipped: guide https://sendinvoicefree.com/guides/deposit-invoice-for-freelancers/ (~900 words). Example checked: 3000 x 30% = 900; 3000 - 900 = 2100. Build+check pass (57 pages).
- Metrics: none.
- Next: calculator (UK late-payment interest or milestone), estimate/quote mode.
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com; local session to submit /guides/deposit-invoice-for-freelancers/, /guides/, /, /sitemap.xml.

## 2026-10-24 (daily run, cloud)
- Owner info: OWNER_TODO has no new info; config.json unchanged.
- Research (profession demand): vendors cover drone and voice-actor invoices with separate capture/editing/licence lines (https://invoicequick.com/invoice-templates/drone-invoice-template , https://paperform.co/templates/drone-pilot-invoice-template/) and session vs usage vs buyout lines (https://invoicequickly.com/blog/how-to-invoice-voice-actor , https://voiceactor.com/articles/ai-voiceover-work). Nanny/wedding-photographer already existed (backlog was stale). Usage-fee percentage claims unverified -> not used.
- Shipped: professions https://sendinvoicefree.com/invoice-template/drone-pilot/ and https://sendinvoicefree.com/invoice-template/voice-actor/. Build+check pass (59 pages).
- Metrics: none.
- Next: calculator next run (UK late-payment interest needs verified figures, or milestone/hourly-to-project), estimate/quote mode.
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com; local session to submit /invoice-template/drone-pilot/, /invoice-template/voice-actor/, /, /sitemap.xml.

## 2026-10-25 (daily run, cloud)
- Owner info: OWNER_TODO has no new info; config.json unchanged.
- Research (margin vs markup for freelancers): sources agree margin = profit/price, markup = profit/cost; price from margin = cost/(1-margin). Benchmark margin figures conflict between vendors -> not used. Sources: https://www.getharvest.com/calculators/margin-vs-markup-explained , https://www.plutio.com/tools/profit-margin-calculator , https://www.skillademia.com/calculators/markup-margin-calculator/
- Shipped: calculator https://sendinvoicefree.com/tools/profit-margin-vs-markup-calculator/ (cta -> rate-calculator $7, existing wording). Hand check: cost 1800, 40% margin -> 3000 price, 66.7% markup; 30% markup -> 2340, margin 23.08%. Build+check pass (60 pages).
- Metrics: none.
- Next: milestone-billing guide, estimate/quote mode, UK late-payment interest calc (verified figures).
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com; local session to submit /tools/profit-margin-vs-markup-calculator/, /tools/, /, /sitemap.xml.

## 2026-10-26 (daily run, cloud)
- Owner info: gh auth fails in sandbox (issue #1 unchecked); OWNER_TODO has no new info; config.json unchanged.
- Research (milestone billing): sources agree on 2-4 deliverable-based payment points, example 30/40/30 split, 50/50 for short jobs, milestones for work beyond ~4-6 weeks; risks = vague milestones and slow client approvals. Examples are practitioner advice, not stats. Sources: https://stripe.com/ie/resources/more/how-to-invoice-as-a-freelancer , https://ruul.io/blog/milestone-payments-freelancers , https://www.selfemployed.com/what-is-a-milestone-payment/
- Shipped: guide https://sendinvoicefree.com/guides/milestone-billing-for-freelancers/ (~1060 words; links to /, project price calculator, payment terms, numbering, deposit, late email, late fee guides, web-developer + graphic-designer templates). Example checked: 6000 x (30%+40%+30%) = 1800+2400+1800 = 6000. Build+check pass (61 pages).
- Metrics: none.
- Next: margin-vs-markup guide, estimate/quote mode, professions (app developer, data analyst), calculator ~Oct 28.
- IndexNow: not submitted — sandbox proxy denies sendinvoicefree.com and api.indexnow.org; local session to submit /guides/milestone-billing-for-freelancers/, /guides/, /, /sitemap.xml.

## 2026-10-27 (daily run, cloud)
- Owner info: gh auth fails in sandbox; OWNER_TODO has no new info; config.json unchanged.
- Research (margin vs markup for service pricing): sources agree margin = profit/price, markup = profit/cost, price = cost/(1-margin); 30% markup yields ~23% margin; include own time and overhead in cost; no reliable freelance margin benchmark found -> none used. Sources: https://yourincomecalculator.com/gb/blog/profit-margin-vs-markup-why-small-business-pricing-goes-wrong , https://www.plutio.com/tools/profit-margin-calculator , https://invoicefly.com/?p=79179
- Shipped: guide https://sendinvoicefree.com/guides/margin-vs-markup-for-freelancers/ (~970 words; links to /, margin calculator, hourly rate, project price, tax calculator, tax-save, payment terms, deposit guides, web-developer + graphic-designer templates). Examples checked: 1800/(1-0.3)=2571.43; 1800*1.3=2340, profit 540 = 23.08%; 1200/0.65=1846.15, profit 646.15 = 35%. Build+check pass (62 pages).
- Metrics: none.
- Next: calculator ~Oct 28 (milestone/hourly-to-project or UK late-payment interest with verified figures), estimate/quote mode, professions (app developer, data analyst).
- IndexNow: pending post-push attempt (see below).
