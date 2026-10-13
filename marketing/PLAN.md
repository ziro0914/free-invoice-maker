# Free Invoice Maker: Launch & Growth Plan

Product: https://sendinvoicefree.com/ (old github.io URL redirects)
Positioning: free, no signup, browser-only invoice generator. Live preview, PDF download with no watermark, logo upload, 14 currencies, tax and discount, data never leaves the browser. About 30 prefilled profession templates and a set of guides.
Markets: US / UK / CA / AU, English.
Operating model: an AI agent drafts and schedules. The owner has to create accounts and do any posting that needs a human identity (Reddit, HN, Product Hunt).

Ground rules for this plan:
- No fabricated stats, testimonials or user counts. Every claim in the copy has to be checkable on the site.
- No vote rings, no asking friends to upvote, no multiple accounts. HN, Product Hunt and Reddit all detect and penalize this.
- Disclose that you built it in every community post ("I built this").

---

## 0. Critical blocker before anything else: custom domain

**AdSense will not approve a `*.github.io/subpath` site.** AdSense requires a site you control at the domain root, so a GitHub Pages project subpath does not qualify. All SEO authority you build on `ziro0914.github.io/free-invoice-maker/` also stays tied to that URL, so moving later costs you rankings and backlinks.

**Action:** buy a domain (about $10–15/year, e.g. Cloudflare Registrar or Porkbun) such as `freeinvoicemaker.<tld>` or something similar that is still available. Point GitHub Pages at it with a CNAME. Do this **before** Day 1 of the launch so every backlink from launch sites points at the permanent URL. GitHub Pages redirects the old URL automatically once the custom domain is set. After the switch, update canonical tags, the sitemap and internal absolute links.

---

## 1. Channel ranking (top 10 for this product)

Impact means the realistic contribution to qualified visits and backlinks over 3–6 months. It is not a promise.

| # | Channel | Expected impact | Effort | Owner account needed? | Self-promo rules risk | Notes |
|---|---|---|---|---|---|---|
| 1 | **SEO: template pages + guides** (Google Search Console) | **High, long-term.** Searches like "photographer invoice template" and "free invoice generator no sign up" have steady intent | Medium (agent writes pages, owner does nothing after GSC setup) | Yes: Google Search Console | None | The core engine. Every other channel mainly helps here by producing backlinks and branded searches. Competition for "free invoice generator" is heavy (Invoice-Generator.com, Zoho, Wave, Canva), so profession and long-tail pages are the realistic way in. |
| 2 | **Pinterest** (template pins linking to each `/invoice-template/<profession>/` page) | **Medium–High.** Pinterest works as a search engine for "invoice template" and pins keep sending traffic for months | Low–Medium (agent makes the images, owner or a scheduler posts them) | Yes: Pinterest Business account | Low (linking to your own content is normal on Pinterest) | 30 profession templates means 30+ unique pins, plus variants. Pinterest's native scheduler and Tailwind both exist. |
| 3 | **Free directories / launch listings** (AlternativeTo, SaaSHub, Product Hunt, BetaList-style lists, "free tools" lists) | **Medium.** Backlinks plus a small, steady trickle of traffic. AlternativeTo is strong because people search "alternative to Invoice Generator / Zoho Invoice" | Low (one-time) | Yes, each site | Low (this is what they exist for) | List as an alternative to Invoice-Generator.com, Zoho Invoice, Wave, Invoice Simple, Canva invoice. |
| 4 | **Hacker News "Show HN"** | **Spiky, uncertain.** A front-page hit brings a burst of traffic and real feedback. Most Show HN posts get little attention | Low (one post, then answer comments for about 2 hours) | Yes: HN account (free, instant) | Low if you follow the rules. Show HN is explicitly for things you made. Don't ask for upvotes | The angle HN cares about: "no backend, data stays in the browser, no signup." Be ready for technical questions (PDF library, storage). |
| 5 | **Product Hunt** | **Low–Medium.** Small tools rarely rank high now, but you still get a permanent backlink and a listing | Medium (prepare assets, be present on launch day) | Yes: Product Hunt account (new accounts should exist and be used for a while before launching) | Low, but PH discourages "upvote me" asks | Launch around 12:01 AM PT. A weekend launch is less competitive. |
| 6 | **Reddit: project-showcase subs** (r/SideProject, r/InternetIsBeautiful, r/webdev "Showoff Saturday", r/alphaandbetausers) | **Medium (spiky).** | Low per post | Yes: Reddit account, preferably with some karma and age | **Medium.** Allowed in these subs, but they check account history. Read each sub's sidebar right before posting, because rules change | r/InternetIsBeautiful prefers non-commercial, no-signup sites. Post before AdSense ads go live, because heavy ads are a common removal reason. |
| 7 | **Reddit: answer-style participation** (r/freelance, r/smallbusiness, r/Bookkeeping, r/photography business threads, r/graphic_design, r/WeddingPhotography, r/HVAC, r/Contractor, r/UKPersonalFinance-type threads about invoicing) | **Low–Medium, slow.** | Medium (ongoing, needs a human voice) | Yes: Reddit | **High** for links. **r/freelance and r/smallbusiness ban self-promotion** and remove link drops. Many trade subs do too | Answer the actual question in full (what a UK sole trader's invoice must include, net-30 wording, late fees). Mention the tool only if the sub allows it and it's relevant, with disclosure. Otherwise don't link at all and just build credibility. Never post the same text twice. |
| 8 | **Quora / answer sites** | **Low–Medium, long tail.** Old answers keep ranking in Google | Low–Medium | Yes: Quora account | Low–Medium (Quora allows links with disclosure. Spammy link answers get collapsed) | Target questions like "How do I make an invoice as a freelancer?", "Free invoice template for photographers?", "What should a UK invoice include?" Give a full answer and add the link with "(I built this)". |
| 9 | **Freelancer communities and forums** (Indie Hackers, Upwork Community forum, Fiverr forum, Freelancers Union, DEV.to article) | **Low.** Indie Hackers and DEV are good for backlinks and build-in-public posts | Low–Medium | Yes, each one | **Upwork and Fiverr forums are strict.** Promoting outside tools is usually removed. Answers only, no links unless asked. Indie Hackers and DEV allow "I built X" posts | DEV.to gets a technical write-up ("Building a privacy-first invoice generator with no backend"). Indie Hackers gets a milestone or what-I-learned post. |
| 10 | **X / Twitter (build in public)** | **Low** without an existing audience | Low (agent drafts) | Yes: X account | Low | Mainly useful as a profile link and for replying to "how do I invoice a client?" threads. Don't expect organic reach from a new account. |

**Not recommended:** paid ads (CPCs for "invoice" keywords are high and the product earns tiny RPM), "There's An AI For That" and other AI directories (not an AI product), mass directory submission services (low-quality links), Facebook groups that ban promotion (most freelancer groups do).

---

## 2. 14-day launch schedule

Pre-launch (Day -3 to 0, owner): custom domain live, GSC verified and sitemap submitted, GA4 installed, Reddit / HN / PH / Pinterest accounts created. The Reddit account should start making genuine non-promotional comments now.

| Day | Action (where / what) |
|---|---|
| 1 | Submit to **AlternativeTo** (as an alternative to Invoice-Generator.com, Zoho Invoice, Invoice Simple, Wave) and **SaaSHub**. Request indexing in GSC for the homepage + templates hub. |
| 2 | **Pinterest:** create 5 boards (Invoice Templates for Freelancers, Creative / Photography, Trades and Contractors, Small Business Paperwork, Invoicing Tips). Publish the first 5 pins (drafts in section 3). |
| 3 | **Show HN** post (Tue–Thu, about 8–10 AM US Eastern). Owner answers comments for about 2 hours. |
| 4 | **r/SideProject** post (draft A). Pinterest: 3 more template pins. |
| 5 | **DEV.to** technical article (no-backend PDF generation, localStorage privacy). Adapt it into an Indie Hackers post. |
| 6 | **r/webdev Showoff Saturday** (Saturdays only. If Day 6 isn't a Saturday, move it to the nearest one). Pinterest: 3 pins. |
| 7 | **Product Hunt** launch (Saturday or Sunday 12:01 AM PT is less competitive). Post the first comment right away. Owner checks in a few times that day. |
| 8 | **Quora:** 3 detailed answers to invoicing questions, with the link disclosed. Pinterest: 3 pins. |
| 9 | **r/InternetIsBeautiful** (draft B). Must be before ads go live, and check the current rules on the day. |
| 10 | Agent publishes 2 new guides, targeting long-tail queries spotted in GSC "Queries" (e.g. "invoice vs receipt", "how to invoice as a sole trader UK"). Pinterest: 3 pins pointing to the guides. |
| 11 | **Reddit answer-style:** 3–5 genuinely helpful comments in r/freelance / r/smallbusiness / trade subs. **No links** in subs that ban them. |
| 12 | Submit to further free listings: **Indie Hackers products**, **BetaList** (free queue is slow), **Uneed**, **Fazier**, **Microlaunch**, **ToolFolio / Startup Stash** (whichever are still free. Check on the day). |
| 13 | X: post the 3 drafts across the week. Reply to 5 "how do I invoice" questions. Pinterest: 3 pins. |
| 14 | Review: GSC impressions and queries, GA4 sources, which pins got clicks. Double down on the top 2 sources. Apply for AdSense once the custom domain has content and some traffic. Ongoing pace: 1–2 pins/day, 2 guides/week, 3 Quora/Reddit answers/week. |

---

## 3. Ready-to-paste drafts

Replace `https://YOURDOMAIN` with the final custom domain.

### 3.1 Show HN

**Title:**
`Show HN: Free invoice generator that runs entirely in the browser (no signup)`

**URL field:** `https://YOURDOMAIN/`

**Text (first comment, posted by you right after submitting):**
> I built this because every "free" invoice generator I tried either wanted an account, put a watermark on the PDF, or stored my client list on their servers.
>
> This one is a static site. There's no backend. The invoice is built in your browser, the PDF is generated client-side, and your details (business info, logo, last invoice) are saved only in your browser's local storage. Nothing is sent anywhere. You can check this in the network tab.
>
> What it does: live preview, logo upload, 14 currencies, tax and discount lines, PDF download with no watermark. There are also about 30 prefilled templates for specific jobs (photographer, contractor, tutor, etc.), because the hardest part for a lot of people is knowing what line items to write.
>
> Known limitations: no recurring invoices, no payment collection, no cloud sync across devices (that's the tradeoff for keeping data local).
>
> I'd especially like feedback on PDF output in different browsers and on anything a UK/AU/CA invoice legally needs that's missing.

### 3.2 Product Hunt

**Name:** Free Invoice Maker
**Tagline (60 chars max):** `Make a clean PDF invoice in a minute. No signup, no watermark` (≈58 chars)

**Description:**
> A free invoice generator that runs entirely in your browser. Fill in your details, see a live preview, and download a PDF with no watermark. Add your logo, choose from 14 currencies, and add tax and discounts. No account and no server: your data stays on your device. It also includes about 30 ready-made templates for specific professions (photographers, contractors, tutors, designers and more) so you know what to put on the invoice.

**Topics:** Invoicing, Freelance, Productivity, Privacy

**First comment (maker):**
> Hi PH, I'm the maker.
>
> Why I built it: I needed to send a simple invoice and every "free" tool I found wanted an account, added a watermark, or kept my client data on their servers.
>
> How it works: it's a static site. The PDF is generated in your browser and your info is saved only in local storage, so you don't need an account and nothing is uploaded.
>
> Included: live preview, logo, 14 currencies, tax and discount, no-watermark PDF, and about 30 profession templates with typical line items prefilled.
>
> Not included (yet): recurring invoices, online payments, multi-device sync.
>
> What would make this genuinely useful for your invoicing? I'm reading every comment.

### 3.3 Reddit post A: r/SideProject (self-promotion of your own projects is the purpose of the sub)

**Title:** `I built a no-signup invoice generator that never uploads your data. Here's what I learned about what freelancers actually put on invoices`

**Body:**
> I made a free invoice generator that runs fully in the browser: https://YOURDOMAIN/
>
> The building part was simple (static site, client-side PDF). The surprising part was the research for the profession templates. A few things I learned that might help anyone who invoices:
>
> - **Most of what goes wrong is missing basics:** a unique invoice number, the issue date *and* a due date, and clear payment terms ("Net 14" or "Due on receipt"). Vague invoices get paid late.
> - **Itemize, even for flat fees.** "Wedding photography – 8 hrs coverage, 400 edited images, online gallery" gets fewer questions than "Photography – $2,500".
> - **Country rules differ.** UK VAT-registered businesses have specific required fields (VAT number, VAT amount, etc.). Australia requires "Tax invoice" wording and an ABN when GST applies. In the US, sales tax on services depends on the state. Check your local tax authority's page rather than trusting a template blindly, including mine.
> - **Put late-fee terms on the invoice itself**, not just in the contract, if you want to be able to apply them.
>
> Tool details: live preview, logo, 14 currencies, tax/discount, PDF with no watermark, data stays in your browser. No account.
>
> Feedback welcome, especially on missing fields for your country or trade.

### 3.4 Reddit post B: r/InternetIsBeautiful (no-signup, useful sites. Post before ads are added and re-read the sidebar rules on the day)

**Title:** `A free invoice maker that works entirely in your browser: no account, no watermark, nothing uploaded`

**Body / comment (the sub is link-post style, so put this as the first comment if it's a link post):**
> I made this. You fill in the form, watch the invoice update live, and download a PDF. Your info is saved only in your own browser's storage, so next time your business details are already there, and nothing is sent to a server.
>
> If you don't know what to write, there are templates for about 30 jobs (photographer, plumber, tutor, translator, etc.) with typical line items prefilled. Edit anything.
>
> Happy to hear what's missing.

### 3.5 Pinterest pins (5)

Image spec: 1000×1500 vertical, the invoice preview as the hero, the profession name in large text, a small "Free • No signup" badge. Link each pin to its matching template page.

1. **Title:** Free Photographer Invoice Template (Editable, PDF)
   **Description:** Editable photography invoice template with session fee, editing, prints and travel lines already filled in. Change anything, add your logo, download a PDF. Free, no signup, no watermark. Works for wedding, portrait and event photographers.
   **Link:** /invoice-template/photographer/

2. **Title:** Contractor Invoice Template: Labor + Materials, Free PDF
   **Description:** Simple invoice template for contractors and handymen, with labor hours, materials and tax broken out so clients see exactly what they're paying for. Fill it in online and download a PDF with no watermark. No account needed.
   **Link:** /invoice-template/contractor/ (use the actual slug)

3. **Title:** Freelance Graphic Designer Invoice Template (Free)
   **Description:** Itemized design invoice: logo concepts, revisions, and file delivery. Add your own logo, pick your currency (USD, GBP, CAD, AUD and more) and export to PDF in a minute. Free and private, because your data stays in your browser.
   **Link:** /invoice-template/graphic-designer/ (use the actual slug)

4. **Title:** Tutor Invoice Template: Hourly Lessons, Free Download
   **Description:** Invoice template for private tutors and music teachers, listing lessons by date with an hourly rate. Edit online, download a PDF, send it to parents. No signup, no watermark.
   **Link:** /invoice-template/tutor/ (use the actual slug)

5. **Title:** What to Include on an Invoice: Freelancer Checklist
   **Description:** Invoice number, dates, payment terms, itemized services, tax and how to pay. A plain checklist for freelancers and small businesses, plus a free invoice maker to put it into practice. No signup needed.
   **Link:** the most relevant guide in /guides/

### 3.6 X / Twitter (3)

1. > I built a free invoice generator that runs entirely in your browser.
   >
   > No signup. No watermark. Nothing uploaded. Your data stays on your device.
   >
   > Live preview → PDF in about a minute.
   > https://YOURDOMAIN/

2. > Freelancer invoicing tip: itemize even flat fees.
   >
   > "Logo design – 3 concepts, 2 revision rounds, final files (SVG/PNG)" gets paid faster than "Design work – $800."
   >
   > I made free templates with typical line items for ~30 professions: https://YOURDOMAIN/invoice-templates/

3. > Most "free" invoice tools want an account, add a watermark, or keep your client list on their servers.
   >
   > Mine is a static page. PDF is generated in your browser, details stay in local storage. Open the network tab and check.
   >
   > https://YOURDOMAIN/

### 3.7 AlternativeTo / SaaSHub listing

**Short description (≈150 chars):**
> Free, no-signup invoice generator that runs in your browser. Live preview, logo, 14 currencies, tax/discount, PDF with no watermark. Data stays local.

**Long description:**
> Free Invoice Maker is a browser-based invoice generator for freelancers and small businesses. There's no account to create and no server storing your data. The invoice is built and exported to PDF on your own device, and your business details are saved only in your browser for next time.
>
> Features:
> - Live preview while you type
> - PDF download with no watermark
> - Logo upload
> - 14 currencies (including USD, GBP, CAD, AUD, EUR)
> - Tax and discount lines
> - About 30 profession templates with typical line items (photographer, contractor, designer, tutor and more)
> - Guides on what to include on an invoice
>
> Limitations: no recurring invoices, payment collection or multi-device sync.
>
> License: Free. Platform: Web (any modern browser).
> Alternative to: Invoice-Generator.com, Zoho Invoice, Invoice Simple, Wave, Canva invoice templates.
> Tags: invoice, invoicing, freelance, privacy, no-signup, pdf.

---

## 4. Accounts the OWNER must create (priority order)

| # | Account | Why | Time |
|---|---|---|---|
| 1 | **Custom domain** (Cloudflare Registrar / Porkbun / Namecheap) + GitHub Pages custom domain setting | AdSense won't approve a github.io subpath, and it's the permanent home for all backlinks | 20–30 min, about $10–15/yr |
| 2 | **Google Search Console** (Domain property, DNS verification) | See queries and indexing, submit the sitemap. The core feedback loop for SEO | 10–15 min |
| 3 | **Google Analytics 4** (or a privacy-friendly option like Cloudflare Web Analytics, which suits the "privacy" positioning and needs no cookie banner) | Measure sources and conversions (PDF downloads as an event) | 15 min |
| 4 | **Pinterest Business account** (free, claim the website) | Channel #2. Lets the agent's pin images be published or scheduled | 15 min |
| 5 | **Reddit account**: start commenting genuinely now | Showcase posts and answers. Brand-new zero-karma accounts get filtered | 5 min + about 10 min/day of real comments for 1–2 weeks |
| 6 | **Hacker News account** | Show HN | 2 min |
| 7 | **Product Hunt account** (fill in the profile, follow and comment on a few products before launching) | Launch listing + backlink | 10 min + about 30 min of prep on launch day |
| 8 | **AlternativeTo, SaaSHub, Indie Hackers, DEV.to, Quora, X** | Listings, answers, build-in-public | about 5 min each |
| 9 | **Google AdSense** (apply only after the custom domain is live, there are several original guides, and a privacy policy page exists. EEA/UK visitors also need a Google-certified consent message, which AdSense offers) | Display revenue. Expect very low revenue at low traffic | 20 min to apply, approval takes days to weeks |
| 10 | **Affiliate programs** (all open to individuals with a website. Terms change, so verify on each program's page before applying): | Higher value per visitor than AdSense for "invoice" intent | 10–15 min each |
| | - **FreshBooks**: runs on **PartnerStack**. The official page says "up to $200 per paid subscriber" and lists a per-trial bounty (amounts vary by source). Payout after a 30-day eligibility window, paid monthly via PayPal or Stripe | Best-fit product for freelancers who outgrow a free generator | |
| | - **QuickBooks (Intuit)**: has an affiliate program run through an affiliate network (historically CJ/Impact). Pays a bounty per paid subscription. Check the current network and rates on intuit.com's affiliate page | Huge brand recognition in US/CA/UK/AU | |
| | - **Zoho Books / Zoho Invoice**: Zoho affiliate program, recurring commission on paid plans. Verify the current percentage | Good for international/multi-currency users | |
| | - **Bonsai** (freelancer invoicing/contracts): has an affiliate program aimed at freelancer audiences. Verify that it's open and its terms | Strong fit with the freelancer audience | |
| | - **Xero**: check whether a public affiliate/referral program is open in your region (it has varied) | Strong in UK/AU | |
| | Payment setup: PayPal and/or a bank account. For a Korea-based owner, PartnerStack/Impact payouts generally work via PayPal or bank transfer. Each program will ask for tax forms (W-8BEN for non-US individuals) | Required to receive payouts | 15 min (W-8BEN once per network) |

**Owner time total:** about 3–4 hours spread over the first week, then about 10–15 minutes a day for Reddit/HN/PH interactions that need a real person. Everything else (pages, pin images, drafts, guides, GSC review) the agent can handle.

### Sources
- [FreshBooks affiliate program (official)](https://www.freshbooks.com/affiliate-program)
- [FreshBooks affiliate program terms](https://www.freshbooks.com/policies/affiliate-program)
- [FreshBooks on PartnerStack](https://market.partnerstack.com/page/freshbooksusa)
