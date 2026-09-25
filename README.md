# Whiz Solutions website — whizsolutions.net

Corporate website of Whiz Solutions LLC (Dubai). Live at https://www.whizsolutions.net.

**Read `STATUS.md` first** — it is the authoritative documentation: current live version, deployment method, version history, and the technical traps you must know before editing.

## What's here
- `whiz-website-v60-waraq-seo/` — the CURRENT live site (Next.js static export; edited directly, no build step). Includes all marketing pages: home, solutions, case studies, products (Whiz Engage, WhizFleet, ServiceOps) and the WaraqPDF page at `/waraqpdf/`.
- `STATUS.md` — deployment record, version history v46→v60, editing rules and lessons learned.
- `assets/` — source images (hero, case-study screenshots, email signature).
- `not-implemented/` — superseded/abandoned approaches kept for reference.
- `.gitignore` — excludes zips and superseded local version folders (v46–v59 remain only on the owner's machine; from v60 onward this repo's git history is the version record).

## How it deploys
Cloudflare Pages, project "whizsolutions": dashboard → Create deployment → drag the current version folder → Save and deploy. Every change = a NEW version folder (v60 → v61 → …), never in-place edits of a deployed folder.

## Rules
- Public marketing content uses fictional client data only; contact email info@whizsolutions.net.
- No secrets or passcodes are stored in this repo (and never have been).
- Product applications are NOT here — this repo owns marketing pages only.

## Key editing traps (details in STATUS.md)
1. The nav header exists in the static HTML of 39 pages AND in chunk `_next/static/chunks/289-*.js` — edit both, rename the chunk, update references.
2. Page body content exists twice per file: visible HTML + the `self.__next_f` RSC payload — edit in tandem or React reverts it at hydration.
3. Cloudflare Pages `_headers` applies ALL matching rules — to loosen CSP per-path, first add a `! Content-Security-Policy` removal line.
4. Any change to a referenced .css/.js REQUIRES bumping its `?v=` query everywhere it's linked.
