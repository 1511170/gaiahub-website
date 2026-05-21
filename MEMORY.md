# Gaia Hub — Memory & Project State

> **Last updated:** 2026-05-20  
> **Stack:** Astro 5 + Tailwind CSS + Sveltia CMS + Static Build  
> **Domain:** gaiahub.co  
> **Source Repo:** https://github.com/1511170/gaiahub-website (`master` branch)  
> **Static Repo:** https://github.com/1511170/gaiahub-website-static (`master` branch)

---

## Recent Changes (2026-05-20)

### 4. i18n Toggle 404 Fix
- **File:** `skills/community/i18n/utils/utils.ts`
- **Fix:** `getLocalizedPath` now returns `/${locale}/` for root path instead of `/${locale}`.
- **Impact:** Language toggle on homepage no longer 404s on GitHub Pages / static hosts.

### 5. TypeScript Alias Fix
- **File:** `sites/gaiahub/tsconfig.json`
- **Fix:** Added `"@site/*": ["src/*"]` to `compilerOptions.paths`.
- **Impact:** Resolves 198 `Cannot find module` errors in `astro check` and VS Code.

### 6. Trailing Slash Consistency
- **Files:** `Navigation.astro`, `index.astro`, `es/index.astro`, `blog.astro`, `es/blog.astro`, `blog/[slug].astro`, `es/blog/[slug].astro`
- **Fix:** All internal nav links and blog post links now use trailing slash (`/hub/`, `/blog/`, `/blog/post-slug/`).
- **Impact:** Prevents 404s on static hosts that don't auto-redirect `/path` → `/path/`.

### 7. Landing Visual Refresh — Unique Images
- **Files:** `src/pages/index.astro`, `src/pages/es/index.astro`
- **New images:** `concept-bg.webp`, `concept-collab.webp`, `triad-commons.webp`, `triad-hub.webp`, `triad-market.webp`, `flow-bg.webp`
- **What changed:**
  - **Concept Section** converted to full-bleed image overlay (text on top of background image).
  - **Concept Cards** moved to separate section with unique Unsplash images per card.
  - **Triad cards** no longer reuse Concept images — each has a unique background.
  - **Flow Section** background replaced with unique waterfall image.
  - All images optimized to WebP (quality 82).

### 8. MarkdownDoc Refactor — Ecosystem Pages
- **File:** `src/components/page-sections/MarkdownDoc.astro`
- **Fixes:**
  - TOC/anchors now work: `<details open={true}>` by default.
  - Added `remark-gfm` plugin → tables in markdown now render correctly.
  - Added `locale` prop with i18n for "Click to expand", "Full Document", "Contents".
  - Added **mobile TOC dropdown** for responsive navigation.
  - Enhanced CSS: check-circle icons on lists, styled tables with overflow-x-auto, improved blockquotes with gradients, responsive font sizes.
- **Files updated:** All 12 ecosystem pages (EN + ES) pass `locale={locale}` to MarkdownDoc.

### 9. New Reusable Components
- **`InfoCard.astro`** — Icon + title + description cards with variants (primary/secondary/tertiary).
- **`IconHeading.astro`** — H2/H3 with Material Symbol icon and color variants.
- **`DataTable.astro`** — Responsive table wrapper with Tailwind styling.
- **`QuoteBlock.astro`** — Styled blockquote with author/source attribution.

### 10. Hero Banner Overlay
- **Files:** `src/pages/index.astro`, `src/pages/es/index.astro`
- **What changed:**
  - Fused Hero text section + Hero Banner image into a single full-bleed section.
  - `hero-banner.webp` is now the background image with dark gradient overlay.
  - h1 "The infrastructure for a civilization that regenerates" sits directly on top of the image.
  - Text colors changed to white with `drop-shadow` for legibility.
  - CTAs and newsletter converted to glassmorphism style (`bg-white/10 backdrop-blur-sm`).
  - `min-h-[85vh]` for visual impact.

### 11. Blog Typography Fix
- **Files:** `package.json`, `tailwind.config.cjs`
- **Installed:** `@tailwindcss/typography`
- **Configured:** Custom prose colors matching the Solar Design System (headings, links, bullets, tables, blockquotes, code).
- **Impact:** Markdown content in blog posts now renders with proper typographic hierarchy.

### 12. Blog Post Layout Overhaul
- **Files:** `src/pages/blog/[slug].astro`, `src/pages/es/blog/[slug].astro`
- **New features:**
  - **Hero image** — Full-width prominent image with gradient fade into content.
  - **Header card** — Category badge, date, read time, title, excerpt in a styled card overlapping the hero.
  - **TOC sidebar** — Sticky table of contents (desktop) with smooth anchor scroll.
  - **Share buttons** — Twitter/X, LinkedIn, WhatsApp, copy link.
  - **Prev / Next navigation** — Links to adjacent posts by date.
  - **Related posts** — 2-3 posts from same category in sidebar.
  - **Improved author section** — Avatar, name, role.
  - **Tags** — Styled as rounded pills.

### 13. Blog List Improvements
- **Files:** `src/pages/blog.astro`, `src/pages/es/blog.astro`
- **New features:**
  - **Search bar** — Real-time filter by title and excerpt.
  - **Category filters** — Functional JS buttons that filter the grid.
  - **Read time** — Calculated and displayed on each card.
  - **Empty state** — "No results" message with "Clear filters" button.
  - **Improved cards** — Category badge overlaid on image, better hover effects.

### 14. Blog Posts Enriched
- **Files:** `src/content/blog/*.md` (3 posts)
- **What changed:**
  - Added inline images between sections (Unsplash URLs).
  - Added blockquotes/callouts for key ideas.
  - Added comparison tables (Network States vs Traditional States).
  - Added multi-capital accounting table.
  - Added horizontal rules (`---`) between sections.
  - Better visual rhythm and scannability.

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
- [x] **Fix i18n toggle 404** on homepage — fixed `getLocalizedPath` trailing slash.
- [x] **Fix TypeScript errors** — added `@site/*` alias to `tsconfig.json`.
- [x] **Fix trailing slashes** across all nav and blog links.
- [x] **Landing images** — reorganized Concept section, replaced repeated images with unique ones.
- [x] **MarkdownDoc visual improvements** — TOC works, tables render, mobile responsive, i18n.
- [x] **Hero banner overlay** — text "infrastructure for a civilization that regenerates" now sits on top of background image.
- [x] **Blog experience overhaul** — typography fix, post layout with TOC/share/related, list with filters/search, enriched posts.
- [ ] **SubMenus in nav:** Gaia Network, Gaia BioLab, Gaia Commonomics, Gaia Academy, BioHabitats Network, Gaia Hub → Google Doc links.
- [ ] **Hero CTA "Diferentes Cuerpos. Un solo EcoSistema."** — tagline + newsletter prominence.
- [ ] **MatchMaking IA search bar** — rename current search to "MatchMaking IA" + add menu item.
- [ ] **Replace placeholder `#` links** in `/market` external CTAs with real URLs.
- [ ] **Replace placeholder allies** in `/allies` with real company data from the spreadsheet.
