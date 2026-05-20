/**
 * Skill: firecrawl-scraper
 * Scraper inteligente usando Firecrawl API v2
 * Extrae contenido de sitios web y lo convierte a colecciones KINTO CMS
 */

export { default as ScraperStatus } from './components/ScraperStatus.astro';

export const config = {
  name: 'firecrawl-scraper',
  version: '1.0.0',
  description: 'Web scraper y crawler usando Firecrawl API con extracción LLM. Convierte sitios viejos a contenido KINTO CMS.',
  category: 'community',
  author: 'Kimi Code',
  createdFor: 'gaiahub',
  reusable: true,
  dependencies: []
};

export function install(context: any) {
  context.addComponent('ScraperStatus', './components/ScraperStatus.astro');

  console.log('✅ Skill firecrawl-scraper instalada');
  console.log('   Componente: ScraperStatus');
  console.log('   Scripts:');
  console.log('     - scripts/firecrawl-scrape.js  (scrapea con Firecrawl API)');
  console.log('     - scripts/convert-to-cms.js    (convierte a colecciones CMS)');
}
