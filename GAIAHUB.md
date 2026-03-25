# 🌐 Gaia Hub - Plataforma de Gestión Digital

> Sistema de gestión de presencia digital empresarial con arquitectura de skills/plugins bajo demanda.

---

## 🎯 Visión

Gaia Hub es una plataforma que permite a empresas gestionar su presencia digital de manera centralizada, usando tecnología de última generación con arquitectura modular de skills.

## 🏗️ Arquitectura: Core Mínimo + Skills Bajo Demanda

```
┌─────────────────────────────────────────────┐
│            Gaia Hub Architecture            │
├─────────────────────────────────────────────┤
│  CORE (Astro + Tailwind) - Mínimo, limpio   │
│  └── Sin skills activas por defecto         │
├─────────────────────────────────────────────┤
│  SKILLS - Se instalan SOLO cuando se        │
│  necesitan via: kinto skill add [name]      │
│  └── Una vez creada, disponible para todos  │
└─────────────────────────────────────────────┘
```

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 5 (SSG) |
| Styling | Tailwind CSS 4 |
| CMS | Sveltia CMS (Git-based) |
| Hosting | Cloudflare Pages |
| Testing | Puppeteer + Browser Automation |
| Animaciones | GSAP + ScrollTrigger |

## 📦 Skills Disponibles (14 total)

### Oficiales
- `cms-sveltia` - Gestión de contenido
- `kinto-cms` - CMS basado en JSON

### Community
- `blog` - Sistema de blog con schema.org
- `contact-form` - Formularios profesionales
- `forms-web3forms` - Formularios sin backend
- `testimonials` - Testimonios con AI citations
- `cloudflare-tunnel` - Túneles permanentes
- `web-scraper` - Scraping de contenido
- `browser-automation` - Testing visual/E2E
- `webflow-effects` - Animaciones premium GSAP
- `seo-ai-citations` - SEO + AI Citations
- `image-optimizer` - Optimización de imágenes
- `i18n` - Internacionalización

[Ver catálogo completo →](SKILLS_CATALOG.md)

---

## 🛠️ Comandos Disponibles

```bash
# Crear nuevo sitio
node kinto.js init nombre-sitio

# Desarrollo
node kinto.js dev --site=nombre-sitio

# Build
node kinto.js build --site=nombre-sitio

# Listar skills
node kinto.js skills:list

# Instalar skill en un sitio
cd sites/nombre-sitio
node scripts/skill-add.js nombre-skill

# Crear nueva skill
node scripts/skill-create.js nombre-skill
```

---

**Gaia Hub**: Tu presencia digital, simplificada y potenciada.
