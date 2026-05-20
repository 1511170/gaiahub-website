#!/usr/bin/env node
/**
 * Procesador específico para vision.gaiaunion.com
 * Toma el scrape raw y genera contenido CMS estructurado
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, v] = arg.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);

const inputFile = args.input || 'sites/gaiahub/.kinto-scraped/visiongaiaunioncom/raw/scrape-2026-05-15T00-30-33-686Z.json';
const outputBase = args.output || 'sites/gaiahub/src/content';
const stagingDir = args.staging || 'imported-content/vision.gaiaunion.com';

if (!existsSync(inputFile)) {
  console.error('❌ Archivo de entrada no encontrado:', inputFile);
  process.exit(1);
}

const raw = JSON.parse(readFileSync(inputFile, 'utf8'));
const md = raw.result?.markdown || '';

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

function writeMd(dir, slug, frontmatter, body) {
  ensureDir(dir);
  const file = join(dir, `${slug}.md`);
  const dateFields = ['lastModified', 'date'];
  const content = `---\n${Object.entries(frontmatter)
    .map(([k, v]) => {
      if (v === undefined || v === null) return null;
      if (Array.isArray(v)) return `${k}:\n${v.map(i => `  - ${i}`).join('\n')}`;
      if (typeof v === 'boolean') return `${k}: ${v}`;
      if (typeof v === 'number') return `${k}: ${v}`;
      if (dateFields.includes(k) && /^\d{4}-\d{2}-\d{2}/.test(String(v))) {
        return `${k}: ${String(v).replace(/\n/g, ' ')}`;
      }
      return `${k}: ${String(v).replace(/\n/g, ' ')}`;
    }).filter(Boolean).join('\n')}\n---\n\n${body}`;
  writeFileSync(file, content, 'utf8');
  console.log(`   📝 ${file}`);
  return file;
}

function writeJson(dir, slug, data) {
  ensureDir(dir);
  const file = join(dir, `${slug}.json`);
  writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`   📄 ${file}`);
  return file;
}

// ── Extraer secciones por patrones ──────────────────────────────────────────
function extractSection(pattern, mdText) {
  const match = mdText.match(pattern);
  if (!match) return '';
  return (match[1] || match[0]).trim();
}

// Split por secciones principales usando los textos clave
const sections = {};

// Vision / Hero
sections.vision = extractSection(
  /A Distributed Ecosystem to Steward[\s\S]*?Gaia Union:[\s\S]*?Gaia Hub is a network of networks[\s\S]*?global transformation\./,
  md
);

// Mission
sections.mission = extractSection(
  /OUR MISSION[\s\S]*?Love Organized![\s\S]*?initiatives, networks & individuals/,
  md
);

// 3 Pilares
sections.coordination = extractSection(
  /COordination[\s\S]*?Gaia Commons Governance[\s\S]*?values\./,
  md
);
sections.collaboration = extractSection(
  /COllaboration[\s\S]*?Gaia Commonomics[\s\S]*?effects\./,
  md
);
sections.communication = extractSection(
  /COmmunication[\s\S]*?Gaia Digital Ecosystem[\s\S]*?information,/, // cuidado con la coma
  md
);
// Reintentar communication si falló
if (!sections.communication) {
  sections.communication = extractSection(
    /COmmunication[\s\S]*?Gaia Digital Ecosystem[\s\S]*?information/,
    md
  );
}

// Core Principles
sections.principles = extractSection(
  /Core Principles of Gaia Commons Hub[\s\S]*?\*\*Gaia Commons:\*\*/,
  md
);

// Gaia Commons
sections.gaiaCommons = extractSection(
  /\*\*Gaia Commons:\*\*[\s\S]*?\[READ MORE\]\(https:\/\/vision\.gaiaunion\.com\/commons\)/,
  md
);

// Funds
sections.philanthropic = extractSection(
  /1\\\. Gaia Philanthropic Fund[\s\S]*?\[Read More\]\(https:\/\/gaiahub\.net\.co\/gaia-philanthropic-fund\/\)/,
  md
);
sections.ecohabitats = extractSection(
  /2\\\. GLocal EcoHabitats Network Fund[\s\S]*?\[Read More\]\(https:\/\/gaiahub\.net\.co\/communities\/\)/,
  md
);
sections.investments = extractSection(
  /3\\\. Gaia Investments Fund[\s\S]*?\[Read More\]\(https:\/\/gaiahub\.net\.co\/investment-fund\/\)/,
  md
);

// Definition
sections.definition = extractSection(
  /DEFINITION[\s\S]*?in harmony with nature\./,
  md
);

// Actors
sections.actors = extractSection(
  /ACTORS[\s\S]*?Subscribe right now!/,
  md
);

// ── Generar archivos ────────────────────────────────────────────────────────
console.log('\n🏗️ Procesando contenido de vision.gaiaunion.com...\n');

const generated = [];

// 1. Página principal: Vision
if (sections.vision) {
  generated.push(writeMd(
    join(stagingDir, 'pages'),
    'vision',
    {
      title: 'Vision',
      description: 'A Distributed Ecosystem to Steward All Forms of Life',
      published: true,
      lastModified: '2024-01-15',
    },
    sections.vision
  ));
}

// 2. Mission
if (sections.mission) {
  generated.push(writeMd(
    join(stagingDir, 'pages'),
    'mission',
    {
      title: 'Mission',
      description: 'Love Organized! Framework & Toolbox for CO3',
      published: true,
      lastModified: '2024-01-15',
    },
    sections.mission
  ));
}

// 3. Services: 3 Pilares
if (sections.coordination) {
  generated.push(writeMd(
    join(stagingDir, 'services'),
    'coordination',
    {
      title: 'Coordination',
      shortDescription: 'Gaia Commons Governance — distributed, holonic governance for collective intelligence.',
      icon: 'users',
      order: 1,
      published: true,
    },
    sections.coordination
  ));
}

if (sections.collaboration) {
  generated.push(writeMd(
    join(stagingDir, 'services'),
    'collaboration',
    {
      title: 'Collaboration',
      shortDescription: 'Gaia Commonomics — abundance flow of true values for efficient and fair exchange.',
      icon: 'handshake',
      order: 2,
      published: true,
    },
    sections.collaboration
  ));
}

if (sections.communication) {
  generated.push(writeMd(
    join(stagingDir, 'services'),
    'communication',
    {
      title: 'Communication',
      shortDescription: 'Gaia Digital Ecosystem — databases and platforms leveraging AI and OI.',
      icon: 'wifi',
      order: 3,
      published: true,
    },
    sections.communication
  ));
}

// 4. Gaia Commons
if (sections.gaiaCommons) {
  generated.push(writeMd(
    join(stagingDir, 'pages'),
    'gaia-commons',
    {
      title: 'Gaia Commons',
      description: 'A membership eco-system of conscious individuals aligned for a well nourished planet.',
      published: true,
      lastModified: '2024-01-15',
    },
    sections.gaiaCommons
  ));
}

// 5. Funds
if (sections.philanthropic) {
  generated.push(writeMd(
    join(stagingDir, 'services'),
    'philanthropic-fund',
    {
      title: 'Gaia Philanthropic Fund',
      shortDescription: 'EcoSocial aid for healthy food, clean water, education and health.',
      icon: 'heart',
      order: 4,
      published: true,
    },
    sections.philanthropic
  ));
}

if (sections.ecohabitats) {
  generated.push(writeMd(
    join(stagingDir, 'services'),
    'ecohabitats-fund',
    {
      title: 'GLocal EcoHabitats Network Fund',
      shortDescription: 'Supports land-based projects and communities aligned with the Glocal Initiative.',
      icon: 'tree',
      order: 5,
      published: true,
    },
    sections.ecohabitats
  ));
}

if (sections.investments) {
  generated.push(writeMd(
    join(stagingDir, 'services'),
    'investments-fund',
    {
      title: 'Gaia Investments Fund',
      shortDescription: 'Purpose-driven profit generating organizations under the Global Commons Framework.',
      icon: 'trending-up',
      order: 6,
      published: true,
    },
    sections.investments
  ));
}

// 6. Definition
if (sections.definition) {
  generated.push(writeMd(
    join(stagingDir, 'pages'),
    'definition',
    {
      title: 'What is GaiaHub',
      description: 'An Innovative Network EcoSystem bridging worlds in service to all forms of life.',
      published: true,
      lastModified: '2024-01-15',
    },
    sections.definition
  ));
}

// 7. Actors
if (sections.actors) {
  generated.push(writeMd(
    join(stagingDir, 'pages'),
    'actors',
    {
      title: 'Actors',
      description: 'Glocal Agencies, People & Communities, Projects & Ventures.',
      published: true,
      lastModified: '2024-01-15',
    },
    sections.actors
  ));
}

// 8. Core Principles
if (sections.principles) {
  generated.push(writeMd(
    join(stagingDir, 'pages'),
    'core-principles',
    {
      title: 'Core Principles',
      description: 'Holonic Governance, Regeneration, Empowerment, Innovation, Bio-Regional Collaboration.',
      published: true,
      lastModified: '2024-01-15',
    },
    sections.principles
  ));
}

// 9. Guardar raw completo como página fallback
writeMd(
  join(stagingDir, 'pages'),
  'full-content',
  {
    title: 'Gaia Union Vision — Full Content',
    description: 'Complete scraped content from vision.gaiaunion.com',
    published: false,
    lastModified: '2024-01-15',
  },
  md
);

// ── Reporte ─────────────────────────────────────────────────────────────────
const report = `# Import Report: vision.gaiaunion.com

- **Source**: https://vision.gaiaunion.com/
- **Scraped at**: ${raw.scrapedAt || new Date().toISOString()}
- **Total markdown chars**: ${md.length}
- **Sections extracted**: ${Object.entries(sections).filter(([,v]) => v).length}
- **Files generated**: ${generated.length}

## Generated Files

${generated.map(f => `- \`${f.replace(process.cwd() + '/', '')}\``).join('\n')}

## Sections Found

| Section | Status | Length |
|---------|--------|--------|
${Object.entries(sections).map(([k, v]) => `| ${k} | ${v ? '✅' : '❌'} | ${v ? v.length : 0} |`).join('\n')}
`;

const reportFile = join(stagingDir, 'report.md');
writeFileSync(reportFile, report, 'utf8');
console.log(`\n📊 Reporte: ${reportFile}`);

console.log(`\n✅ Procesamiento completado.`);
console.log(`   Carpeta staging: ${stagingDir}/`);
console.log(`   Archivos generados: ${generated.length}`);
console.log(`\n👉 Para fusionar con el sitio gaiahub:`);
console.log(`   cp -r ${stagingDir}/* sites/gaiahub/src/content/`);
