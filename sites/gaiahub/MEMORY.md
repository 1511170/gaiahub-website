# MEMORY.md — Gaia Hub

> Última actualización: 2026-05-22
> Estado: Producción-ready | 34 páginas estáticas | Build passing

---

## 📋 Identidad del Proyecto

**Gaia Hub** es el sistema operativo digital del Ecosistema Gaia — una meta-plataforma que permite a la red verse a sí misma, conectarse, coordinarse y evolucionar hacia la regeneración planetaria.

### Triada Regenerativa
| Componente | Función | Ruta |
|---|---|---|
| **Gaia Hub** | Sistema Nervioso — Coordinación digital, matchmaking, mapas vivos | `/hub/` |
| **Gaia Market** | Sistema Circulatorio — Marketplace regenerativo, intercambio de valor | `/market/` |
| **Gaia Commons** | Sistema Endocrino — Gobernanza, principios, capital estratégico | `/commons/` |

### Capas de Impacto
- **Gaia Impact Fund** — Financiamiento regenerativo (`/impact-fund/`)
- **Gaia Impact Hub** — Orquestación e incubación de proyectos (`/impact-hub/`)

**Dominio**: https://gaiahub.co
**Repo principal**: https://github.com/1511170/gaiahub-website
**Repo estático**: https://github.com/1511170/gaiahub-website-static

---

## 🛠 Stack Técnico

| Capa | Tecnología |
|---|---|
| Framework | Astro 5.18.1 (Static Site Generation) |
| Styling | Tailwind CSS 3 + Material Design 3 Tokens |
| CMS | Sveltia CMS + Kinto CMS |
| i18n | EN (default) / ES (`/es/` prefix) |
| Fonts | Epilogue (headlines), Manrope (body), Material Symbols |
| Animations | GSAP 3.12 + ScrollTrigger |
| SEO | Schema.org JSON-LD + Open Graph + AI Citations |
| Images | WebP optimizado (Sharp, calidad 82) |

### Design System: Solar/Ethereal
```css
--primary: #776300           /* Solar Gold */
--primary-container: #ffd709  /* Bright Solar */
--secondary: #00743a          /* Regenerative Green */
--background: #fefee5         /* Light Solar Background */
--on-surface: #363b10         /* Deep Olive Text */
```

---

## 📁 Estructura de Skills (Self-Contained)

Las skills fueron migradas desde `Gaia/skills/` → `sites/gaiahub/skills/` para hacer el proyecto 100% portable.

**Alias Vite** (`astro.config.mjs`):
- `@skills` → `./skills`
- `@skills-official` → `./skills/official`
- `@skills-community` → `./skills/community`

**Skills activas** (15): `kinto-cms`, `cms-sveltia`, `seo-ai-citations`, `testimonials`, `contact-form`, `webflow-effects`, `blog`, `i18n`, `firecrawl-scraper`, `image-optimizer`, `browser-automation`, `cloudflare-pages`, `cloudflare-tunnel`, `forms-web3forms`, `web-scraper`

---

## 🔧 Decisiones Técnicas Clave

### TOC MarkdownDoc con numeración automática
- Parser regex global extrae h2/h3 en orden de aparición
- Numeración automática: h2 = 1, 2, 3... / h3 = 1.1, 1.2, 2.1...
- Badges visuales en headings y TOC sidebar
- Scroll spy resalta sección activa

### Triad Cards: Card Link Pattern
- Contenedor `<div>` + `<a class="absolute inset-0 z-10">` invisible
- Links internos con `relative z-20` para ser clickeables
- Soluciona problema de stacking context que bloqueaba clicks

### Imágenes: Optimización WebP
- 11 JPG/PNG → WebP con Sharp (calidad 82)
- 2.0MB → 1.1MB (-44% ahorro)
- Referencias locales actualizadas a `.webp`

---

## 🚀 Checklist de Despliegue

```bash
# 1. Verificar build
npm run build

# 2. Verificar que dist/ tenga 34 páginas
ls dist/ | wc -l

# 3. Optimizar imágenes (si hay nuevas)
node skills/community/image-optimizer/scripts/optimize.cjs --update-refs

# 4. Test visual
node skills/community/browser-automation/test-runner.cjs --url=http://localhost:4321

# 5. Commit y push
npm run build
git add .
git commit -m "feat: [descripción]"
git push origin master

# 6. Deploy estático
cp -r dist/* ../gaiahub-website-static/
cd ../gaiahub-website-static
git add . && git commit -m "deploy: static" && git push
```

---

## 📂 Colecciones de Contenido

| Colección | Ubicación | Uso |
|---|---|---|
| Blog | `src/content/blog/` | Posts públicos con categorías y tags |
| Testimonials | `src/content/testimonials/` | Testimonios de miembros |
| Páginas | `src/content/pages/` | Documentos markdown para MarkdownDoc |
| Kinto | `src/content/kinto/` | Datos del CMS Kinto |

---

## 🔗 Referencias Rápidas

- **Brief**: `KINTO.md`
- **Skills**: `skills-active.json`
- **i18n**: `src/i18n/en.json`, `src/i18n/es.json`
- **Config**: `config/site.config.ts`
- **Build**: `astro.config.mjs`
- **Estilos globales**: `src/styles/global.css`
