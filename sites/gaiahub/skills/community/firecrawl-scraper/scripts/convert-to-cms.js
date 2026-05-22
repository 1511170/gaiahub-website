#!/usr/bin/env node
/**
 * Convert to CMS — Convierte output de Firecrawl a archivos KINTO CMS
 *
 * Uso:
 *   node convert-to-cms.js --input=.kinto-scraped/ejemplo/raw/crawl-xxx.json --output=src/content --type=all
 *   node convert-to-cms.js --input=... --type=blog
 *   node convert-to-cms.js --input=... --type=testimonials
 *   node convert-to-cms.js --input=... --type=services
 *   node convert-to-cms.js --input=... --type=team
 *   node convert-to-cms.js --input=... --type=pages
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// ── CLI args ────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, v] = arg.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);

const inputFile = args.input;
const outputBase = args.output || 'src/content';
const type = args.type || 'all';

if (!inputFile) {
  console.error('❌ Uso: node convert-to-cms.js --input=archivo.json --output=src/content --type=[all|blog|testimonials|services|team|pages]');
  process.exit(1);
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/--+/g, '-')
    .substring(0, 60);
}

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function uniqueFile(dir, slug, ext) {
  let file = join(dir, `${slug}.${ext}`);
  if (!existsSync(file)) return file;
  let i = 1;
  while (existsSync(file)) {
    file = join(dir, `${slug}-${i}.${ext}`);
    i++;
  }
  return file;
}

function parseDate(d) {
  if (!d) return new Date().toISOString().split('T')[0];
  const parsed = new Date(d);
  return isNaN(parsed) ? new Date().toISOString().split('T')[0] : parsed.toISOString().split('T')[0];
}

function frontmatter(obj) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      v.forEach((item) => lines.push(`  - ${item}`));
    } else if (typeof v === 'boolean') {
      lines.push(`${k}: ${v}`);
    } else if (typeof v === 'number') {
      lines.push(`${k}: ${v}`);
    } else if (v instanceof Date) {
      lines.push(`${k}: ${v.toISOString().split('T')[0]}`);
    } else {
      lines.push(`${k}: >-`);
      const sanitized = String(v).replace(/\n/g, ' ').trim();
      lines.push(`  ${sanitized}`);
    }
  }
  lines.push('---\n');
  return lines.join('\n');
}

// ── Writers por colección ───────────────────────────────────────────────────
function writeBlogPost(post, outputDir) {
  const dir = join(outputDir, 'blog');
  ensureDir(dir);

  const slug = slugify(post.title || 'untitled');
  const file = uniqueFile(dir, slug, 'md');

  const fm = frontmatter({
    title: post.title || 'Sin título',
    excerpt: post.excerpt || post.description || post.content?.substring(0, 150) + '...' || '',
    date: parseDate(post.date),
    author: post.author || 'Equipo',
    category: post.category || 'General',
    tags: post.tags || [],
    image: post.image || '',
    published: post.published !== false,
  });

  const body = post.content || post.markdown || post.description || '';
  writeFileSync(file, fm + '\n' + body, 'utf8');
  console.log(`   📝 Blog: ${file}`);
}

function writeTestimonial(t, outputDir) {
  const dir = join(outputDir, 'testimonials');
  ensureDir(dir);

  const slug = slugify(t.author || 'anon');
  const file = uniqueFile(dir, slug, 'json');

  const data = {
    author: t.author || 'Anónimo',
    company: t.company || '',
    quote: t.quote || t.testimonial || t.review || '',
    image: t.image || '',
    rating: Math.min(5, Math.max(1, parseInt(t.rating, 10) || 5)),
    date: parseDate(t.date),
    published: t.published !== false,
  };

  writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`   💬 Testimonial: ${file}`);
}

function writeService(s, outputDir) {
  const dir = join(outputDir, 'services');
  ensureDir(dir);

  const slug = slugify(s.title || 'servicio');
  const file = uniqueFile(dir, slug, 'md');

  const fm = frontmatter({
    title: s.title || 'Servicio',
    shortDescription: s.shortDescription || s.description || s.summary || '',
    icon: s.icon || 'star',
    order: s.order || 0,
    published: s.published !== false,
  });

  const body = s.content || s.markdown || s.description || s.longDescription || '';
  writeFileSync(file, fm + '\n' + body, 'utf8');
  console.log(`   🛠️ Service: ${file}`);
}

function writeTeamMember(m, outputDir) {
  const dir = join(outputDir, 'team');
  ensureDir(dir);

  const slug = slugify(m.name || 'miembro');
  const file = uniqueFile(dir, slug, 'json');

  const data = {
    name: m.name || 'Sin nombre',
    position: m.position || m.role || m.title || '',
    bio: m.bio || m.description || '',
    image: m.image || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    order: m.order || 0,
    published: m.published !== false,
  };

  writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`   👤 Team: ${file}`);
}

function writePage(p, outputDir) {
  const dir = join(outputDir, 'pages');
  ensureDir(dir);

  const slug = p.slug || slugify(p.title || 'pagina');
  const file = uniqueFile(dir, slug, 'md');

  const fm = frontmatter({
    title: p.title || 'Página',
    description: p.description || p.summary || '',
    published: p.published !== false,
    lastModified: new Date(),
  });

  const body = p.content || p.markdown || p.body || p.description || '';
  writeFileSync(file, fm + '\n' + body, 'utf8');
  console.log(`   📄 Page: ${file}`);
}

// ── Detectores de tipo de página ────────────────────────────────────────────
function detectPageType(page) {
  const url = (page.metadata?.sourceURL || page.url || '').toLowerCase();
  const title = (page.metadata?.title || page.title || '').toLowerCase();
  const markdown = (page.markdown || '').toLowerCase();

  if (url.includes('/blog/') || url.includes('/articulo/') || url.includes('/post/') || url.includes('/news/')) return 'blog';
  if (url.includes('/servicio/') || url.includes('/service/') || url.includes('/solucion/') || url.includes('/solution/')) return 'services';
  if (url.includes('/equipo/') || url.includes('/team/') || url.includes('/about/') || url.includes('/nosotros/')) return 'team';
  if (url.includes('/testimonio/') || url.includes('/testimonial/') || url.includes('/review/') || url.includes('/cliente/')) return 'testimonials';

  // Heurísticos por contenido
  if (title.includes('blog') || title.includes('artículo') || title.includes('noticia')) return 'blog';
  if (title.includes('servicio') || title.includes('solución') || markdown.includes('nuestros servicios')) return 'services';
  if (title.includes('equipo') || title.includes('team') || markdown.includes('conoce al equipo')) return 'team';
  if (title.includes('testimonio') || title.includes('cliente') || markdown.includes('lo que dicen nuestros clientes')) return 'testimonials';

  return 'pages';
}

// ── Conversión desde CRAWL ──────────────────────────────────────────────────
function convertCrawl(data, outputDir, filterType) {
  const pages = data.pages || [];
  console.log(`\n📦 Convirtiendo ${pages.length} páginas...`);

  const counts = { blog: 0, testimonials: 0, services: 0, team: 0, pages: 0 };

  for (const page of pages) {
    const ptype = detectPageType(page);
    if (filterType !== 'all' && ptype !== filterType) continue;

    const item = {
      title: page.metadata?.title || page.title || 'Sin título',
      description: page.metadata?.description || '',
      content: page.markdown || page.html || '',
      url: page.metadata?.sourceURL || page.url || '',
      slug: slugify(page.metadata?.title || 'pagina'),
    };

    try {
      switch (ptype) {
        case 'blog':
          writeBlogPost({ ...item, excerpt: item.description, author: 'Equipo', category: 'General' }, outputDir);
          counts.blog++;
          break;
        case 'services':
          writeService({ ...item, shortDescription: item.description }, outputDir);
          counts.services++;
          break;
        case 'team':
          // Para team, intentamos extraer miembros del markdown (básico)
          writePage(item, outputDir);
          counts.pages++;
          break;
        case 'testimonials':
          writePage(item, outputDir);
          counts.pages++;
          break;
        default:
          writePage(item, outputDir);
          counts.pages++;
      }
    } catch (err) {
      console.warn(`   ⚠️ Error procesando página: ${err.message}`);
    }
  }

  return counts;
}

// ── Conversión desde EXTRACT ────────────────────────────────────────────────
function convertExtract(data, outputDir, filterType) {
  const result = data.result || {};
  console.log(`\n📦 Convirtiendo datos extraídos (schema: ${data.schema || 'unknown'})...`);

  const counts = { blog: 0, testimonials: 0, services: 0, team: 0, pages: 0 };

  const types = filterType === 'all'
    ? ['blogPosts', 'testimonials', 'services', 'team', 'pages']
    : [filterType === 'blog' ? 'blogPosts' : filterType];

  for (const t of types) {
    const items = result[t] || [];
    for (const item of items) {
      try {
        switch (t) {
          case 'blogPosts':
            writeBlogPost(item, outputDir);
            counts.blog++;
            break;
          case 'testimonials':
            writeTestimonial(item, outputDir);
            counts.testimonials++;
            break;
          case 'services':
            writeService(item, outputDir);
            counts.services++;
            break;
          case 'team':
            writeTeamMember(item, outputDir);
            counts.team++;
            break;
          case 'pages':
            writePage(item, outputDir);
            counts.pages++;
            break;
        }
      } catch (err) {
        console.warn(`   ⚠️ Error procesando item: ${err.message}`);
      }
    }
  }

  return counts;
}

// ── Conversión desde SCRAPE (single page) ───────────────────────────────────
function convertScrape(data, outputDir, filterType) {
  const result = data.result || {};
  const item = {
    title: result.metadata?.title || 'Página',
    description: result.metadata?.description || '',
    content: result.markdown || result.html || '',
    url: result.metadata?.sourceURL || data.url || '',
    slug: slugify(result.metadata?.title || 'pagina'),
  };

  console.log(`\n📦 Convirtiendo página individual...`);
  const counts = { blog: 0, testimonials: 0, services: 0, team: 0, pages: 0 };

  if (filterType === 'all' || filterType === 'pages') {
    writePage(item, outputDir);
    counts.pages++;
  }
  if (filterType === 'blog') {
    writeBlogPost({ ...item, excerpt: item.description, author: 'Equipo', category: 'General' }, outputDir);
    counts.blog++;
  }
  if (filterType === 'services') {
    writeService({ ...item, shortDescription: item.description }, outputDir);
    counts.services++;
  }

  return counts;
}

// ── Main ────────────────────────────────────────────────────────────────────
(async () => {
  try {
    console.log(`📖 Leyendo: ${inputFile}`);
    const raw = JSON.parse(readFileSync(inputFile, 'utf8'));

    const outputDir = join(process.cwd(), outputBase);
    ensureDir(outputDir);

    let counts;
    switch (raw.mode) {
      case 'crawl':
        counts = convertCrawl(raw, outputDir, type);
        break;
      case 'extract':
        counts = convertExtract(raw, outputDir, type);
        break;
      case 'scrape':
        counts = convertScrape(raw, outputDir, type);
        break;
      default:
        // Fallback: intentar inferir
        if (raw.pages) {
          counts = convertCrawl(raw, outputDir, type);
        } else if (raw.result) {
          counts = convertScrape(raw, outputDir, type);
        } else {
          console.error('❌ Formato de JSON no reconocido');
          process.exit(1);
        }
    }

    console.log(`\n✅ Conversión completada.`);
    console.log(`   Output base: ${outputDir}`);
    console.log(`   Resumen:`);
    if (counts.blog) console.log(`     Blog posts: ${counts.blog}`);
    if (counts.testimonials) console.log(`     Testimonials: ${counts.testimonials}`);
    if (counts.services) console.log(`     Services: ${counts.services}`);
    if (counts.team) console.log(`     Team members: ${counts.team}`);
    if (counts.pages) console.log(`     Pages: ${counts.pages}`);

    console.log(`\n👉 Recuerda reiniciar el servidor de Astro para que lea las nuevas colecciones.`);
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    if (process.env.DEBUG) console.error(err);
    process.exit(1);
  }
})();
