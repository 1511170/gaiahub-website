# Skill: firecrawl-scraper

Web scraper y crawler inteligente usando **Firecrawl API v2**. Extrae contenido de sitios web viejos y lo convierte automáticamente a colecciones de contenido KINTO CMS.

## Qué hace

- 🔥 **Scrapea** una URL individual con contenido limpio (markdown)
- 🕷️ **Crawlea** sitios completos (hasta 100+ páginas)
- 🗺️ **Mapea** todas las URLs de un dominio
- 🤖 **Extrae** datos estructurados con LLM (blog posts, testimonios, servicios, equipo, páginas)
- 📝 **Convierte** todo a archivos `.md` y `.json` compatibles con Astro Content Collections

## Ventajas sobre web-scraper (Puppeteer)

| Característica | web-scraper | firecrawl-scraper |
|---------------|-------------|-------------------|
| Motor | Puppeteer local | API cloud Firecrawl |
| Velocidad | Lenta (1 página/seg) | Rápida (paralela) |
| JavaScript rendering | Sí | Sí |
| Markdown limpio | No | Sí |
| Extracción LLM | No | Sí (schemas definidos) |
| Requiere instalar | puppeteer, cheerio | Nada (fetch nativo) |

## Instalación

```bash
cd sites/gaiahub
node scripts/skill-add.js firecrawl-scraper
```

No requiere instalar dependencias npm adicionales. Usa `fetch()` nativo de Node.js 18+.

## Uso

### 1. Scrapear una página

```bash
node ../../skills/community/firecrawl-scraper/scripts/firecrawl-scrape.js \
  --url=https://ejemplo.com/blog/post-1 --mode=scrape
```

### 2. Crawlear todo un sitio

```bash
node ../../skills/community/firecrawl-scraper/scripts/firecrawl-scrape.js \
  --url=https://ejemplo.com --mode=crawl --limit=50
```

### 3. Mapear URLs

```bash
node ../../skills/community/firecrawl-scraper/scripts/firecrawl-scrape.js \
  --url=https://ejemplo.com --mode=map
```

### 4. Extraer datos estructurados con LLM

```bash
node ../../skills/community/firecrawl-scraper/scripts/firecrawl-scrape.js \
  --url=https://ejemplo.com --mode=extract --schema=full_site
```

Schemas disponibles: `blog`, `testimonials`, `services`, `team`, `pages`, `full_site`

### 5. Convertir a contenido CMS

```bash
node ../../skills/community/firecrawl-scraper/scripts/convert-to-cms.js \
  --input=.kinto-scraped/ejemplo/raw/crawl-2026-05-14Txx.json \
  --output=src/content \
  --type=all
```

Tipos: `all`, `blog`, `testimonials`, `services`, `team`, `pages`

## Flujo completo recomendado

```bash
# 1. Crawlear el sitio viejo
node ../../skills/community/firecrawl-scraper/scripts/firecrawl-scrape.js \
  --url=https://sitio-viejo.com --mode=crawl --limit=100

# 2. Convertir todo a colecciones CMS
node ../../skills/community/firecrawl-scraper/scripts/convert-to-cms.js \
  --input=.kinto-scraped/sitio-viejo/raw/crawl-*.json \
  --output=src/content \
  --type=all

# 3. Reiniciar Astro para que lea las nuevas colecciones
npm run dev
```

## API Key

La skill usa la API key de Firecrawl. Puedes configurarla vía environment variable:

```bash
export FIRECRAWL_API_KEY=fc-f975e304c9f34ac68924fa1e518aaa82
```

O usa la key por defecto incluida en el script (para desarrollo/demo).

## Output generado

```
src/content/
├── blog/
│   ├── post-1.md
│   └── post-2.md
├── testimonials/
│   ├── juan-perez.json
│   └── maria-garcia.json
├── services/
│   ├── consultoria.md
│   └── desarrollo.md
├── team/
│   ├── ana-lopez.json
│   └── carlos-ruiz.json
└── pages/
    ├── nosotros.md
    └── contacto.md
```

## Formato de archivos

### Blog (`.md` — content collection)
```yaml
---
title: Título del post
excerpt: Resumen del post
date: 2024-01-15
author: Equipo
category: General
tags:
  - tag1
  - tag2
image: ''
published: true
---

Contenido en markdown...
```

### Testimonials (`.json` — data collection)
```json
{
  "author": "Juan Pérez",
  "company": "Acme Inc",
  "quote": "Excelente servicio...",
  "rating": 5,
  "date": "2024-01-15",
  "published": true
}
```

## Componente Astro

```astro
---
import { ScraperStatus } from '@skills/community/firecrawl-scraper';
---

<ScraperStatus
  scrapedSite="https://sitio-viejo.com"
  lastRun="2024-01-15 10:30"
  status="completed"
  counts={{ blog: 12, testimonials: 5, services: 4 }}
/>
```

## Schemas de extracción LLM

Definidos en `config/extraction-schemas.json`. Cada schema guía al LLM de Firecrawl para extraer tipos específicos de contenido estructurado.

Puedes añadir schemas personalizados editando ese archivo.

## Requiere

- Node.js >= 18 (fetch nativo)
- API key de Firecrawl (incluida por defecto para demos)
- Colecciones de contenido configuradas en `src/content.config.ts`
