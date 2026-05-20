# 🤖 AGENTS.md - Inicio Rápido para Cualquier IA

> **Para:** Kimi Code, Claude Code, Cursor, o cualquier IA agente

## 🎯 Tú Entras Aquí y Lees ESTO Primero

### Contexto Inmediato
- **Proyecto**: Gaia Hub - Plataforma de coordinación para ecosistemas regenerativos
- **Sistema**: KINTO CMS - Generador de sitios estáticos con arquitectura de skills
- **Stack**: Astro 5 + Tailwind 3 + Sveltia CMS
- **Dominio**: gaiahub.co
- **Estado**: 14 skills instaladas, 32 páginas estáticas, i18n EN/ES

### Tu Misión
Mantener y evolucionar la plataforma Gaia Hub:
1. Landing page para gaiahub.co (EN + ES)
2. 6 páginas del ecosistema con contenido real de docs
3. Sistema de blog con CMS
4. Panel de administración Sveltia CMS
5. Integración con skills del CMS

---

## ⚡ Empezar (Flujo Paso a Paso)

### Paso 1: Leer el Brief del Proyecto
```bash
cat sites/gaiahub/KINTO.md
cat sites/gaiahub/README.md
```

### Paso 2: Ver Skills Disponibles
```bash
cd sites/gaiahub
node scripts/skill-list.js
```

### Paso 3: Ver Skills Activas
```bash
cat sites/gaiahub/skills-active.json
```

### Paso 4: Generar Contenido
- Editar `src/pages/index.astro` o `src/pages/es/index.astro`
- Crear páginas adicionales en `src/pages/`
- Usar componentes de `src/components/page-sections/`
- Configurar CMS en `config/site.config.ts`

---

## 📁 Estructura Importante

```
.
├── sites/gaiahub/           # ← Aquí trabajas
│   ├── src/pages/            # Páginas Astro
│   ├── src/components/       # Componentes
│   ├── src/components/page-sections/  # Componentes reutilizables
│   ├── src/i18n/             # Traducciones EN/ES
│   ├── src/content/          # Colecciones CMS (blog, testimonials)
│   ├── public/images/        # Imágenes optimizadas WebP
│   ├── config/site.config.ts # Config del sitio
│   ├── KINTO.md              # Brief del proyecto
│   └── README.md             # Documentación del sitio
├── skills/
│   ├── official/             # Skills oficiales (cms-sveltia)
│   └── community/            # Skills comunitarias (14 activas)
├── docs/                     # Documentos fuente del ecosistema
└── KINTO.md                  # Guía completa del sistema KINTO
```

---

## 🧩 Componentes Page-Sections

Usa estos componentes para construir páginas rápidamente:

- **PageHero** — Badge, título, subtítulo, CTAs, imagen
- **ContentSection** — Dos columnas (texto + imagen/icono)
- **FeatureGrid** — Grid de cards con icono, título, descripción
- **ProcessSteps** — Timeline vertical numerado
- **StatsBar** — Métricas con contadores
- **CTABanner** — Banner CTA con gradiente e imagen de fondo
- **DocumentSection** — Bloques estructurados (heading, párrafos, listas)
- **MarkdownDoc** — Renderiza archivos `.md` con TOC y accordion colapsable

### Ejemplo de uso
```astro
---
import PageHero from "@site/components/page-sections/PageHero.astro";
import CTABanner from "@site/components/page-sections/CTABanner.astro";
---

<PageHero
  badge="The Vision"
  title="A civilization that regenerates."
  subtitle="..."
  image="/images/vision-hero.webp"
/>

<CTABanner
  title="Join the Confederation"
  subtitle="..."
  ctaLabel="Join Now"
  ctaHref="https://t.me/..."
  bgImage="/images/cta-banner-bg.webp"
/>
```

---

## 🌐 i18n

El sitio tiene dos idiomas:
- **EN** (default): rutas sin prefijo (`/`, `/vision`, `/blog`)
- **ES**: rutas con prefijo `/es/` (`/es/`, `/es/vision`, `/es/blog`)

- Traducciones en `src/i18n/en.json` y `src/i18n/es.json`
- LanguageToggle muestra 🇺🇸 / 🇪🇸
- Todas las páginas del ecosistema tienen versión EN y ES

---

## 🔗 Referencias

- Guía sistema completa: `KINTO.md`
- Brief del proyecto: `sites/gaiahub/KINTO.md`
- README del sitio: `sites/gaiahub/README.md`
- Arquitectura: `STRUCTURE.md`
- Catálogo de skills: `SKILLS_CATALOG.md`

---

**TL;DR**: Entra a `sites/gaiahub`, lee su `KINTO.md` y `README.md`, usa los componentes page-sections, mantén sincronizado EN/ES, verifica build antes de commitear.
