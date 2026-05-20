# Gaia Hub Website

> **URL**: [gaiahub.co](https://gaiahub.co)  
> **Stack**: Astro 5 + Tailwind CSS 3 + Sveltia CMS  
> **Dominio**: gaiahub.co

---

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Validar
npm run validate

# Listar skills
npm run skills:list
```

---

## 📁 Estructura

```
sites/gaiahub/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── GaiaContactForm.astro
│   │   └── page-sections/    # Componentes de sección
│   │       ├── PageHero.astro
│   │       ├── ContentSection.astro
│   │       ├── FeatureGrid.astro
│   │       ├── ProcessSteps.astro
│   │       ├── StatsBar.astro
│   │       ├── CTABanner.astro
│   │       ├── DocumentSection.astro
│   │       └── MarkdownDoc.astro
│   ├── layouts/
│   │   └── Layout.astro      # Layout base con SEO, i18n, schema.org
│   ├── pages/                # Páginas estáticas
│   │   ├── index.astro       # Home (EN)
│   │   ├── blog.astro
│   │   ├── blog/[slug].astro
│   │   ├── hub.astro
│   │   ├── market.astro
│   │   ├── commons.astro
│   │   ├── impact-fund.astro
│   │   ├── impact-hub.astro
│   │   ├── vision.astro
│   │   ├── academy.astro
│   │   ├── certification.astro
│   │   ├── confederation.astro
│   │   ├── bioregions.astro
│   │   ├── ecohabitats.astro
│   │   └── es/               # Versiones en español
│   ├── i18n/
│   │   ├── en.json
│   │   └── es.json
│   ├── content/
│   │   ├── blog/
│   │   └── testimonials/
│   └── styles/
│       └── global.css
├── public/
│   └── images/               # Imágenes optimizadas (WebP)
├── config/
│   └── site.config.ts
├── skills-active.json
└── KINTO.md
```

---

## 🎨 Design System

### Colores
- **Primary**: `#776300` (Solar Gold)
- **Primary Container**: `#ffd709` (Bright Solar)
- **Secondary**: `#00743a` (Regenerative Green)
- **Background**: `#fefee5` (Light Solar)
- **On Surface**: `#363b10` (Deep Olive)

### Tipografía
- **Headlines**: Epilogue (700-900)
- **Body**: Manrope (300-800)
- **Icons**: Material Symbols Outlined

---

## 🧩 Skills Instaladas (14)

| Skill | Uso |
|---|---|
| `cms-sveltia` | Panel admin en `/admin` |
| `seo-ai-citations` | Meta tags + Schema.org |
| `testimonials` | Grid de testimonios |
| `contact-form` | Formulario base |
| `webflow-effects` | Animaciones GSAP |
| `blog` | Sistema de blog |
| `i18n` | Toggle EN/ES con banderas 🇺🇸/🇪🇸 |
| `firecrawl-scraper` | Scraper inteligente |
| `image-optimizer` | JPG/PNG → WebP |
| `browser-automation` | Testing visual con Puppeteer |
| `cloudflare-pages` | Deploy a Cloudflare |
| `cloudflare-tunnel` | Túneles de desarrollo |
| `forms-web3forms` | Envío de formularios sin backend |
| `web-scraper` | Scraping con Puppeteer + Cheerio |

---

## 🌐 i18n

El sitio soporta dos idiomas:
- **EN** (default): `/`
- **ES**: `/es/*`

El componente `LanguageToggle` muestra 🇺🇸 / 🇪🇸 y permite cambiar entre versiones.

---

## 📝 Cómo añadir una nueva página

1. Crear `src/pages/mi-pagina.astro`
2. Crear `src/pages/es/mi-pagina.astro`
3. Añadir keys de traducción a `src/i18n/en.json` y `src/i18n/es.json`
4. Añadir link al footer en `src/components/Footer.astro`
5. Añadir link a la navegación en `src/components/Navigation.astro`

---

## 🖼️ Imágenes

Las imágenes se almacenan en `public/images/` y se optimizan con el skill `image-optimizer`:

```bash
# Ver qué se optimizaría
npm run images:optimize:dry

# Optimizar
npm run images:optimize
```

---

## 🏗️ Componentes Page-Sections

Componentes reutilizables para construir páginas rápidamente:

- **PageHero**: Badge, título, subtítulo, CTAs, imagen
- **ContentSection**: Dos columnas (texto + imagen/icono)
- **FeatureGrid**: Grid de cards con icono, título, descripción
- **ProcessSteps**: Timeline vertical numerado
- **StatsBar**: Métricas con contadores
- **CTABanner**: Banner CTA con gradiente
- **DocumentSection**: Bloques estructurados (heading, párrafos, listas)
- **MarkdownDoc**: Renderiza archivos `.md` con TOC y accordion
