# Gaia Hub - Guía del Proyecto

> **Dominio**: gaiahub.co  
> **Tipo**: Landing page del Ecosistema Gaia - Plataforma de Coordinación Digital  
> **Design System**: Solar/Ethereal Theme - Material Design 3  
> **Stack**: Astro 5 + Tailwind CSS 3 + Sveltia CMS

---

## 🎯 Identidad del Proyecto

**Gaia Hub** es el sistema operativo digital del Ecosistema Gaia - una meta-plataforma que permite a la red verse a sí misma, conectarse, coordinarse y evolucionar.

### El Triad de Gaia

1. **Gaia Hub** (Nervous System) - Coordinación digital y matchmaking
2. **Gaia Market** (Circulatory) - Marketplace regenerativo  
3. **Gaia Commons** (Soul) - Marco constitucional y gobernanza

Plus:
- **Gaia Impact Fund** - Fondo madre para regeneración
- **Gaia Impact Hub** - Orquestación e incubación

### Ecosystem Pages (Footer)

Páginas del ecosistema con contenido real extraído de documentos:

| Página | Ruta | Contenido |
|---|---|---|
| Vision | `/vision` | Gaia Economy Layer - Tokenomics |
| Academy | `/academy` | University & School of Life |
| Certification | `/certification` | Certification Program |
| Confederation | `/confederation` | Gaia Confederation Whitepaper |
| Bioregions | `/bioregions` | Gaia GPS Meta-Mapping |
| EcoHabitats | `/ecohabitats` | Place-based Initiatives |

Todas disponibles en EN (`/`) y ES (`/es/`).

---

## 🎨 Design System

### Paleta de Colores

```css
--primary: #776300           /* Solar Gold */
--primary-container: #ffd709  /* Bright Solar */
--secondary: #00743a          /* Regenerative Green */
--secondary-container: #86fea7
--tertiary: #8e00fd           /* Wisdom Purple */
--tertiary-container: #d0a7ff
--background: #fefee5         /* Light Solar Background */
--on-surface: #363b10         /* Deep Olive Text */
```

### Tipografía

- **Headlines**: Epilogue (700-900)
- **Body**: Manrope (300-800)
- **Icons**: Material Symbols Outlined

### Efectos

- `ethereal-shadow`: Sombras suaves difuminadas
- `glass-panel`: Efecto vidrio esmerilado
- `solar-gradient`: Gradiente dorado solar

---

## ✅ Skills Instaladas

```json
{
  "skills": [
    "cms-sveltia",
    "seo-ai-citations",
    "testimonials",
    "contact-form",
    "webflow-effects",
    "blog",
    "i18n",
    "firecrawl-scraper",
    "image-optimizer",
    "browser-automation",
    "cloudflare-pages",
    "cloudflare-tunnel",
    "forms-web3forms",
    "web-scraper"
  ]
}
```

---

## 📁 Secciones de la Landing

1. **Navigation** - Sticky nav con glass effect
2. **Hero** - "The Digital Nervous System" con banner ancho
3. **Search** - Búsqueda en el ecosistema
4. **Concept** - ¿Qué es Gaia? (cards con imágenes)
5. **The Triad** - Gaia Hub, Market, Commons (cards con fondos)
6. **Core Functions** - Flujo de cómo funciona
7. **Impact Fund** - Sección del fondo
8. **Testimonials** - Stewards del ecosistema
9. **Ecosystem Gallery** - Grid visual de imágenes
10. **Blog** - Últimos posts
11. **Contact** - Formulario de contacto
12. **CTA** - "Join the regenerative organism"
13. **Community** - WhatsApp + Telegram
14. **Footer** - Links y navegación

---

## 🌐 Arquitectura de Contenido

### URLs Principales

- `/` - Home Portal (EN)
- `/es/` - Home Portal (ES)
- `/hub` - Gaia Hub Platform
- `/market` - Gaia Marketplace
- `/commons` - Gaia Commons Framework
- `/impact-fund` - Gaia Impact Fund
- `/impact-hub` - Impact Hub Incubation
- `/blog` - Blog
- `/vision`, `/academy`, `/certification`, `/confederation`, `/bioregions`, `/ecohabitats` - Ecosystem pages

### CMS Collections

- **blog/** - Posts del ecosistema
- **testimonials/** - Testimonios de stewards

---

## 🖼️ Imágenes

Las imágenes se almacenan en `public/images/` como WebP optimizadas.

Imágenes principales:
- `hero-banner.webp` - Banner principal del hero
- `vision-hero.webp` - Página Vision
- `academy-hero.webp` - Página Academy
- `certification-hero.webp` - Página Certification
- `confederation-hero.webp` - Página Confederation
- `bioregions-hero.webp` - Página Bioregions
- `ecohabitats-hero.webp` - Página EcoHabitats
- `cta-banner-bg.webp` - Fondo de CTABanner
- `closing-bg.webp` - Fondo de sección de cierre

---

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Skills
node scripts/skill-list.js
node scripts/skill-add.js [nombre]
```

---

## 📚 Referencias

- [README del sitio](./README.md)
- [Documentación Gaia Economy](../../docs/Gaia%20Economy%20Layer%20-%20Commonomics%20&%20Tokenomics%20Explained%20In-Depth.md)
- [Guía KINTO](../../KINTO.md)
- [Catálogo de Skills](../../SKILLS_CATALOG.md)

---

**Gaia Hub**: The Digital Coordination Platform for Regenerative Ecosystems
