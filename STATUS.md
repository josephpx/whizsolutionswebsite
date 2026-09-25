# whizsolutions.net website — STATUS
Last updated: 15 Sep 2026 (by Fable)

## What it is
The corporate website (Next.js App Router **static export** — no build step available here; we edit the exported files directly). Hosted on **Cloudflare Pages**, project "whizsolutions" (also whizsolutions.pages.dev), custom domain www.whizsolutions.net.

## How it deploys (IMPORTANT)
Cloudflare dashboard → Workers & Pages → whizsolutions → **Create deployment** → drag the whole site folder → Save and deploy.
**Versioning rule (Joseph's standing rule): every change = a NEW folder (v50 → v51 → v52...), never edit a deployed folder in place.** Fable creates the new folder each time.

## Route precedence on the same domain
Three Workers override Pages on their paths: `whiz-engage` (/genpharm/als-survey*), `whiz-engage-ksa` (/genpharm/als-survey-ksa*), `whizgeo` (/api/whizgeo*, /whizgeo/mcp*), `whizfootprint` (/whizfootprint*). Everything else = Pages static files.

## Current version
- **whiz-website-v60-waraq-seo** (in this folder) — LIVE 25 Sep. (a) SEO/GEO pack for the WaraqPDF page: OG + Twitter share cards with 1200×630 og-image, JSON-LD FAQPage + SoftwareApplication + BreadcrumbList (schema text = the legally-reviewed page copy verbatim). (b) Page moved to **/waraqpdf/** with 301 redirects from /waraq and /waraq/* in _redirects; navbar (39 pages, chunk renamed 289-e2a85c40b7d1f934), products card, sitemap, canonical and the _headers CSP block all follow. Verified live incl. redirect.
- **whiz-website-v59-waraqpdf** — LIVE 25 Sep (briefly). Product renamed WaraqPDF everywhere (page, products card HTML+payload, navbar in 39 pages + chunk renamed 289-c7e94a2d15f38b60), 23 tools / 21 on-device counts, Read PDF card added, hero primary "Open WaraqPDF — free preview" → https://waraqpdf.com. Verified live: zero standalone "Waraq" strings, no stale counts, hydration clean.
- **whiz-website-v58-waraq-conversion** — LIVE 24 Sep night. v56: /waraq on-page 22-tool grid (collapsed, 6 openers), Back-to-Home bar, /products/ Waraq card (HTML+RSC tandem). v57: cache-busted landing.css/js (?v=), hero order tools|privacy|access, Waraq in the Products navbar dropdown (39 pages + chunk renamed 289-b4d21f7c93ae5081). v58: clickable tool cards pre-filling the access form ("I'm interested in: <tool>", hover hint "Request access →"), sticky header CTA, 2 inline Request-early-access buttons; legally-reviewed copy untouched.
- **MANDATORY CHECKLIST ITEM (learned twice now): any change to a referenced .css/.js file REQUIRES bumping its ?v= query in every page that links it.** Browsers cache aggressively; without the bump, visitors (and Joseph) see broken half-old pages.
- v55: Manus redesign baseline — Manus's complete /waraq redesign (Manrope/DM Mono, custom illustrations as webp, category cards, collapsed plans/FAQ disclosures) production-hardened by Fable: all 8 links to the not-yet-hosted app repointed to the early-access form, CTAs relabeled "Request early access" (standing Waraq-agent rule until the app is hosted — flip back when it is), form wired to the site's Formspree endpoint (subject "Waraq early access"), fake JS success removed, images compressed 7.5MB→0.6MB. Supplier-name rule verified across text/code/filenames.
- v53/v54 = Fable's first functional build + the _headers font fix (superseded same day). Adds the /waraq/ product page (Waraq private PDF tools, early-access phase): self-contained page built verbatim from the Waraq team's handover pack, DM Sans + Waraq design tokens, 4 product screenshots, early-access Formspree form (site's existing endpoint, subject switches early-access/enterprise), _headers per-path CSP, sitemap entry. NOT in the Products navbar yet — deliberate until official launch (direct-link early access). NO supplier names anywhere on the page (mandatory Waraq rule: never name conversion-engine suppliers).
- v53 = same without the font fix (superseded within the day).
- **_headers LESSON (24 Sep):** Cloudflare Pages APPLIES ALL matching header rules — a per-path CSP does NOT replace the site-wide /* CSP, browsers enforce both (strictest wins). To loosen CSP for a path you MUST first remove the inherited header with `! Content-Security-Policy` inside the path rule, then set the new one. The /waraq/* block does this correctly; copy that pattern for any future per-path CSP.

## Previous
- **whiz-website-v52-footprint-paused** — LIVE 22–24 Sep. Prepared by Astra from v51, audited byte-level and hydration-verified by Fable. Removes ALL WhizFootprint promotion (menu entry in 39 pages + renamed chunk 289-9773aa9a2815fe77, /products/ card in HTML+RSC payload, marketing page + assets, _headers block, sitemap entry) as part of the founder-authorized product pause.
- Rollbacks: whiz-website-v51-navfix (restores WhizFootprint promotion — only with founder authorization), releases/whiz-website-v48-roadmapcopy (pre-September anchor).

## Version history
- v46/v47: Whiz Engage marketing page era (zips in releases/)
- v48: roadmap copy — verified live baseline before product-launch changes
- v49: WhizFootprint launch — added /products/whizfootprint/ marketing page (Manus Option A, fictional data), Products dropdown menu entry (39 static HTML files + hydration chunk 289-*.js renamed for cache safety), per-path CSP in _headers, sitemap entry
- v50: image fix — dashboard webp cropped (blank-left removed), CSS sizing (max-height 62vh), styles.css?v=2 cache-bust
- v51: navigation consistency — WhizFootprint marketing page got the WhizFleet/ServiceOps-style "Back to Home" utility bar (teal identity) + its dropdown fixed to the standard 4 products (broken /products/whizengage 404 fixed → /whizengage/); /products/ overview now shows all 4 products (HTML + React RSC payload edited in tandem — hydration verified clean)

## Technical traps (read before editing!)
1. The header/nav exists in the static HTML of every page AND hardcoded in chunk `_next/static/chunks/289-*.js` (React hydration source). Both must match; rename the chunk when editing it and update all HTML references.
2. Page BODY content also exists twice: visible HTML + `self.__next_f` RSC payload in the same file. Edit both or React wipes your change at hydration (v51 /products/ edit did this correctly — use it as the reference).
3. `_headers` carries a strict site-wide CSP allow-list; new third-party domains must be added there. /products/whizfootprint/* has its own CSP block (Google Fonts allowed).
4. Site-wide search for old paths after any URL change (v51 grep-verified zero stale links).

## Structure here
- `whiz-website-v51-navfix/` — CURRENT source (deploy this)
- `releases/` — v46–v50 folders + zips + WhizFootprint page zip (design handoff)
- `not-implemented/` — ADD-TO-WEBSITE-FOLDER (superseded), whiz-products-page worker paste (obsolete approach: marketing page as worker — abandoned when Pages deploy method was discovered). Old downloaded website zips (incl. Google-Business versions never implemented) are still in Joseph's Downloads; add here if wanted.
- `assets/` — hero image, email signature; `assets/case-studies/` — ~60 project/case-study source images (Etihad, Tanseeq, Legrand, Roca, payroll dashboards, etc.)

## Related but separate
- Site chatbot: `shared/whiz-assistant-worker-PASTE-THIS.js.txt` (worker on whiz-assistant.josephpx.workers.dev, allowed in CSP connect-src)
- Product APPS are not in this project: see whiz-engage/, whizfootprint/, serviceops/ folders. Rule: **website project owns all marketing pages (including /whizengage, /whizfleet, /serviceops, /products/whizfootprint); product projects own only their applications.**

## Pending
- Deploy v51 (drag whiz-website-v51-navfix) and live-verify.
