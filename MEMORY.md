# Gaia Hub — Memory & Project State

> **Last updated:** 2026-05-19  
> **Stack:** Astro 5 + Tailwind CSS + Sveltia CMS + Static Build  
> **Domain:** gaiahub.co  
> **Source Repo:** https://github.com/1511170/gaiahub-website (`master` branch)  
> **Static Repo:** https://github.com/1511170/gaiahub-website-static (`master` branch)

---

## Recent Changes (2026-05-19)

### 1. Gaia Commons Card — Home Landing
- **EN + ES pages:** `src/pages/index.astro`, `src/pages/es/index.astro`
- **i18n keys added:** `triad_commons_system`, `triad_commons_desc_new`, `triad_commons_fund_link`, `triad_commons_hub_link`
- **What changed:**
  - Card restructured from `<a>` wrapper to `<div>` + independent links (fixes nested-anchor issue).
  - Subtitle changed to **"Sistema Endocrino"** / **"Endocrine System"**.
  - Description updated to match `CorreccionesSitioWeb.md`.
  - Added two pill links inside the card:
    - "More about the Fund" → `/impact-fund/`
    - "More about the Hub" → `/impact-hub/`
  - Main CTA "Explore Commons" preserved.

### 2. Gaia Market — Background Images + External Links
- **EN + ES pages:** `src/pages/market.astro`, `src/pages/es/market.astro`
- **i18n keys added:** `products_external`, `services_external`, `knowledge_external`, `experiences_external`
- **What changed:**
  - **Products**, **Services**, and **Knowledge** sections converted from flat colored backgrounds to full-bleed background images with dark gradient overlay (same pattern as Experiences).
  - Images sourced from Unsplash:
    - Products: organic market
    - Services: consulting / handshake
    - Knowledge: library / books
  - Added external-link CTAs ("Explore →") under each of the 4 sections.
  - Links use `#` placeholder — replace with real URLs when available.

### 3. New Page — `/allies` (Allied Companies / Compañías Aliadas)
- **Files created:**
  - `src/pages/allies.astro`
  - `src/pages/es/allies.astro`
- **i18n keys added:** Full `allies` section in `en.json` and `es.json`.
- **What changed:**
  - Hero with badge, title, and subtitle.
  - **Holonic Map (desktop):** 900×900px radial layout with SVG dashed connection lines.
    - Center node: Gaia logo (solar-gradient circle).
    - 8 orbiting ally nodes positioned with CSS rotate + translate transforms.
    - Each node shows: icon, name, short tagline.
  - **Mobile fallback:** Responsive grid (2 columns) with Gaia node centered on top.
  - Footer updated to include link to `/allies/` under "Explore" column.
  - Ally data is placeholder — replace the `allies` array with real companies from the Google Spreadsheet.

---

## Build Status
- **Build format:** `directory` with `trailingSlash: 'always'`
- **Pages generated:** 34 static pages (was 32 before this update)
- **New pages:** `/allies/index.html`, `/es/allies/index.html`
- **Build command:** `npm run build` (executes `astro build`)
- **Output folder:** `sites/gaiahub/dist/`
- **Preview server:** `npx serve dist` (or `astro preview`)

---

## Known Technical Notes
- **Flag emoji encoding:** Windows/Node builds corrupt UTF-8 emojis. Always use inline SVG flags or `<img>` tags — never emoji characters in Astro components.
- **Static server 404s:** `trailingSlash: 'always'` + `build.format: 'directory'` ensures `/vision/` resolves correctly on simple static hosts (GitHub Pages, etc.).
- **Anchor scroll:** `scroll-mt-32` class compensates for the fixed 80–96px nav on anchor links (`#economy`, `#mission`, `#governance`).

---

## i18n Architecture
- **Default locale:** `en` (`/`)
- **Secondary locale:** `es` (`/es/*`)
- **Translation files:** `src/i18n/en.json`, `src/i18n/es.json`
- **Language toggle:** SVG inline flags (US / ES) — no emojis.
- **All new content must be added to both JSON files** before merging.

---

## Deploy Rules (CRITICAL)

> **Rule 1:** Static deployments **ALWAYS** go to the `master` branch of `https://github.com/1511170/gaiahub-website-static.git`
>
> **Rule 2:** NEVER use `git init` inside `dist/` + `push --force`. This destroys the repository history.
>
> **Correct deploy process:**
> ```bash
> # 1. Build
> cd sites/gaiahub && npm run build
>
> # 2. Clone the static repo (or use existing clone)
> git clone https://github.com/1511170/gaiahub-website-static.git /tmp/static-deploy
> cd /tmp/static-deploy
>
> # 3. Reset to latest master (preserves history)
> git reset --hard origin/master
>
> # 4. Clean everything except .git/
> find . -mindepth 1 -not -path './.git/*' -not -name '.git' -exec rm -rf {} +
>
> # 5. Copy new build
> cp -r /path/to/dist/* .
>
> # 6. Commit on top of existing history
> git add -A
> git commit -m "deploy: static build from <commit-hash>"
>
> # 7. Push (force only if necessary to recover from bad state)
> git push origin master
> ```

---

## To Do (Pending from CorreccionesSitioWeb.md)
- [ ] **SubMenus in nav:** Gaia Network, Gaia BioLab, Gaia Commonomics, Gaia Academy, BioHabitats Network, Gaia Hub → Google Doc links.
- [ ] **Hero CTA "Diferentes Cuerpos. Un solo EcoSistema."** — tagline + newsletter prominence.
- [ ] **MatchMaking IA search bar** — rename current search to "MatchMaking IA" + add menu item.
- [ ] **Replace placeholder `#` links** in `/market` external CTAs with real URLs.
- [ ] **Replace placeholder allies** in `/allies` with real company data from the spreadsheet.
