#!/usr/bin/env node
/**
 * Firecrawl Scraper — Script CLI para KINTO CMS
 * Usa Firecrawl API v2 para scrapear, crawlear, mapear y extraer contenido.
 *
 * Uso:
 *   node firecrawl-scrape.js --url=https://ejemplo.com --mode=scrape
 *   node firecrawl-scrape.js --url=https://ejemplo.com --mode=crawl --limit=50
 *   node firecrawl-scrape.js --url=https://ejemplo.com --mode=map
 *   node firecrawl-scrape.js --url=https://ejemplo.com --mode=extract --schema=services
 *
 * Env:
 *   FIRECRAWL_API_KEY  (fallback: key hardcodeada para demos)
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── CLI args ────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, v] = arg.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);

// ── API Key resolution (prioridad de más alta a más baja) ───────────────────
// 1. CLI arg --api-key=...
// 2. Archivo .env dentro de la carpeta de la skill
// 3. Variable de entorno FIRECRAWL_API_KEY
// 4. Fallback hardcodeado (demo)
function resolveApiKey() {
  // 1. CLI arg
  if (args['api-key']) {
    return args['api-key'];
  }

  // 2. .env propio de la skill
  const skillEnvPath = join(__dirname, '..', '.env');
  if (existsSync(skillEnvPath)) {
    const envContent = readFileSync(skillEnvPath, 'utf8');
    const match = envContent.match(/^FIRECRAWL_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  }

  // 3. Variable de entorno
  if (process.env.FIRECRAWL_API_KEY) {
    return process.env.FIRECRAWL_API_KEY;
  }

  // 4. Fallback
  return 'fc-f975e304c9f34ac68924fa1e518aaa82';
}

const API_KEY = resolveApiKey();
const API_BASE = 'https://api.firecrawl.dev/v1';

const url = args.url;
const mode = args.mode || 'scrape';
const limit = parseInt(args.limit || '50', 10);
const schemaName = args.schema || 'full_site';
const outputDir = args.output || '.kinto-scraped';

if (!url) {
  console.error('❌ Uso: node firecrawl-scrape.js --url=https://ejemplo.com --mode=[scrape|crawl|map|extract]');
  process.exit(1);
}

// ── Helpers ─────────────────────────────────────────────────────────────────
async function firecrawl(endpoint, body, method = 'POST') {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(`Firecrawl API error ${res.status}: ${data.message || JSON.stringify(data)}`);
  }
  return data;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .substring(0, 60);
}

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function saveJson(filename, data) {
  ensureDir(dirname(filename));
  writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
  console.log(`   💾 Guardado: ${filename}`);
}

// ── Image download helpers ──────────────────────────────────────────────────
function extractImageUrls(markdown, html) {
  const urls = new Set();

  // Extraer de markdown: ![alt](url)
  if (markdown) {
    const mdMatches = markdown.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g);
    for (const m of mdMatches) urls.add(m[2].trim());
  }

  // Extraer de HTML: <img src="url">
  if (html) {
    const htmlMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
    for (const m of htmlMatches) urls.add(m[1].trim());
  }

  return Array.from(urls).filter(u => u.startsWith('http'));
}

async function downloadImage(url, outputPath, referer) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': referer || url,
      },
    });

    clearTimeout(timer);

    if (!res.ok) {
      console.log(`(HTTP ${res.status})`);
      return false;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(outputPath, buffer);
    return true;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('(timeout)');
    } else {
      console.log(`(${err.message.substring(0, 40)})`);
    }
    return false;
  }
}

async function downloadImages(imageUrls, imagesDir, siteSlug, referer) {
  if (!imageUrls.length) return { downloaded: 0, failed: 0, map: {} };
  ensureDir(imagesDir);

  const map = {};
  let downloaded = 0;
  let failed = 0;

  for (const url of imageUrls) {
    const ext = (url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i)?.[1] || 'png').toLowerCase();
    const filename = `${siteSlug}-img-${downloaded + failed + 1}.${ext}`;
    const outputPath = join(imagesDir, filename);

    process.stdout.write(`   🖼️  Descargando ${url.substring(0, 60)}... `);
    const ok = await downloadImage(url, outputPath, referer);
    if (ok) {
      downloaded++;
      map[url] = `/images/${filename}`;
      console.log('✅');
    } else {
      failed++;
      console.log('❌');
    }

    // Pequeño delay para no saturar el servidor
    await new Promise(r => setTimeout(r, 300));
  }

  return { downloaded, failed, map };
}

function updateMarkdownRefs(markdown, urlMap) {
  let updated = markdown;
  for (const [original, local] of Object.entries(urlMap)) {
    const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    updated = updated.replace(new RegExp(escaped, 'g'), local);
  }
  return updated;
}

// ── Modo: SCRAPE (una URL) ──────────────────────────────────────────────────
async function doScrape(targetUrl) {
  console.log(`\n🔥 Firecrawl scrape: ${targetUrl}`);
  const data = await firecrawl('/scrape', {
    url: targetUrl,
    formats: ['markdown', 'html'],
    onlyMainContent: true,
  });

  const siteSlug = slugify(new URL(targetUrl).hostname);
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = join(process.cwd(), outputDir, siteSlug, 'raw', `scrape-${ts}.json`);
  const imagesDir = join(process.cwd(), outputDir, siteSlug, 'images');

  let result = data.data;

  // Descargar imágenes si se solicitó
  if (args['download-images'] || args['downloadImages']) {
    const imageUrls = extractImageUrls(result?.markdown, result?.html);
    console.log(`   📸 Imágenes encontradas: ${imageUrls.length}`);
    if (imageUrls.length) {
      const { downloaded, failed, map } = await downloadImages(imageUrls, imagesDir, siteSlug, targetUrl);
      console.log(`   📸 Descargadas: ${downloaded}, Fallidas: ${failed}`);
      if (result?.markdown && Object.keys(map).length) {
        result = { ...result, markdown: updateMarkdownRefs(result.markdown, map) };
      }
      result = { ...result, _imageMap: map, _imagesDir: imagesDir };
    }
  }

  saveJson(outFile, {
    mode: 'scrape',
    url: targetUrl,
    scrapedAt: new Date().toISOString(),
    result,
  });

  console.log(`✅ Scrape completado. Markdown: ${(result?.markdown || '').length} chars`);
  return outFile;
}

// ── Modo: CRAWL (todo el sitio) ─────────────────────────────────────────────
async function doCrawl(targetUrl) {
  console.log(`\n🔥 Firecrawl crawl: ${targetUrl} (limit=${limit})`);

  // 1. Iniciar crawl
  const startRes = await firecrawl('/crawl', {
    url: targetUrl,
    limit,
    scrapeOptions: {
      formats: ['markdown', 'html'],
      onlyMainContent: true,
    },
  });

  if (!startRes.success || !startRes.id) {
    throw new Error('No se pudo iniciar el crawl: ' + JSON.stringify(startRes));
  }

  const jobId = startRes.id;
  console.log(`   ⏳ Crawl iniciado. Job ID: ${jobId}`);

  // 2. Polling del job
  let completed = false;
  let result = null;
  let attempts = 0;
  const maxAttempts = 120; // ~2 minutos

  while (!completed && attempts < maxAttempts) {
    await new Promise((r) => setTimeout(r, 1500));
    attempts++;

    const statusRes = await firecrawl(`/crawl/${jobId}`, null, 'GET');
    const status = statusRes.status;

    process.stdout.write(`\r   ⏳ Esperando... ${status} (${statusRes.completed || 0}/${statusRes.total || '?'})`);

    if (status === 'completed' || status === 'scraping') {
      result = statusRes;
      if (status === 'completed') {
        completed = true;
        break;
      }
    }

    if (status === 'failed' || status === 'cancelled') {
      throw new Error(`Crawl ${status}: ${statusRes.error || 'Unknown error'}`);
    }
  }

  process.stdout.write('\n');

  if (!completed) {
    console.warn('   ⚠️ Timeout esperando crawl. Guardando estado parcial...');
  }

  // 3. Descargar imágenes si se solicitó
  const siteSlug = slugify(new URL(targetUrl).hostname);
  const imagesDir = join(process.cwd(), outputDir, siteSlug, 'images');
  let pages = result?.data || [];

  if ((args['download-images'] || args['downloadImages']) && pages.length) {
    const allImageUrls = new Set();
    for (const page of pages) {
      const urls = extractImageUrls(page?.markdown, page?.html);
      urls.forEach(u => allImageUrls.add(u));
    }
    console.log(`   📸 Imágenes encontradas (total): ${allImageUrls.size}`);
    if (allImageUrls.size) {
      const { downloaded, failed, map } = await downloadImages(Array.from(allImageUrls), imagesDir, siteSlug, targetUrl);
      console.log(`   📸 Descargadas: ${downloaded}, Fallidas: ${failed}`);
      if (Object.keys(map).length) {
        pages = pages.map(p => ({
          ...p,
          markdown: p?.markdown ? updateMarkdownRefs(p.markdown, map) : p?.markdown,
          _imageMap: map,
        }));
      }
    }
  }

  // 4. Guardar resultado
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = join(process.cwd(), outputDir, siteSlug, 'raw', `crawl-${ts}.json`);

  saveJson(outFile, {
    mode: 'crawl',
    url: targetUrl,
    scrapedAt: new Date().toISOString(),
    jobId,
    total: result?.total || pages.length || 0,
    completed: result?.completed || pages.length || 0,
    pages,
  });

  console.log(`✅ Crawl completado. Páginas: ${pages.length}`);
  return outFile;
}

// ── Modo: MAP (listar URLs) ─────────────────────────────────────────────────
async function doMap(targetUrl) {
  console.log(`\n🔥 Firecrawl map: ${targetUrl}`);
  const data = await firecrawl('/map', {
    url: targetUrl,
    search: args.search || undefined,
  });

  const siteSlug = slugify(new URL(targetUrl).hostname);
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = join(process.cwd(), outputDir, siteSlug, 'raw', `map-${ts}.json`);

  saveJson(outFile, {
    mode: 'map',
    url: targetUrl,
    scrapedAt: new Date().toISOString(),
    links: data.links || [],
  });

  console.log(`✅ Map completado. URLs encontradas: ${data.links?.length || 0}`);
  return outFile;
}

// ── Modo: EXTRACT (LLM extraction) ──────────────────────────────────────────
async function doExtract(targetUrl) {
  console.log(`\n🔥 Firecrawl extract: ${targetUrl} (schema=${schemaName})`);

  // Cargar schema desde config
  const schemasPath = join(__dirname, '..', 'config', 'extraction-schemas.json');
  const schemas = JSON.parse(
    (await import('fs')).readFileSync(schemasPath, 'utf8')
  );

  const schema = schemas.schemas[schemaName];
  if (!schema) {
    console.error(`❌ Schema "${schemaName}" no encontrado.`);
    console.error('   Disponibles:', Object.keys(schemas.schemas).join(', '));
    process.exit(1);
  }

  // Firecrawl extract puede recibir URLs múltiples o una sola
  const data = await firecrawl('/extract', {
    urls: [targetUrl],
    prompt: `Extrae la información estructurada del sitio web siguiendo el schema JSON proporcionado.`,
    schema,
  });

  const siteSlug = slugify(new URL(targetUrl).hostname);
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = join(process.cwd(), outputDir, siteSlug, 'raw', `extract-${schemaName}-${ts}.json`);

  saveJson(outFile, {
    mode: 'extract',
    url: targetUrl,
    schema: schemaName,
    scrapedAt: new Date().toISOString(),
    result: data.data,
  });

  console.log(`✅ Extract completado. Revisa: ${outFile}`);
  return outFile;
}

// ── Main ────────────────────────────────────────────────────────────────────
(async () => {
  try {
    let outFile;
    switch (mode) {
      case 'scrape':
        outFile = await doScrape(url);
        break;
      case 'crawl':
        outFile = await doCrawl(url);
        break;
      case 'map':
        outFile = await doMap(url);
        break;
      case 'extract':
        outFile = await doExtract(url);
        break;
      default:
        console.error(`❌ Modo desconocido: ${mode}`);
        console.error('   Modos válidos: scrape, crawl, map, extract');
        process.exit(1);
    }

    console.log(`\n📍 Output: ${outFile}`);
    console.log(`\n👉 Siguiente paso:`);
    console.log(`   node scripts/convert-to-cms.js --input="${outFile}" --output=src/content --type=all`);
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    if (process.env.DEBUG) console.error(err);
    process.exit(1);
  }
})();
