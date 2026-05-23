#!/usr/bin/env node
/**
 * Browser Automation Test Runner — i18n Edition
 * 
 * Valida que el sitio funcione correctamente en inglés (EN) y español (ES).
 * 
 * Uso:
 *   node test-runner-i18n.cjs --url=http://localhost:4321
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Parsear argumentos
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  if (key && value) acc[key.replace('--', '')] = value;
  return acc;
}, {});

// Configuración
const config = {
  baseUrl: args.url || 'http://localhost:4321',
  outputDir: path.join(__dirname, '../../../test-results'),
  viewports: [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'desktop', width: 1280, height: 800 }
  ],
  // Páginas a testear en ambos idiomas
  pagesToTest: [
    { path: '/', name: 'home' },
    { path: '/vision/', name: 'vision' },
    { path: '/commons/', name: 'commons' },
    { path: '/hub/', name: 'hub' },
    { path: '/market/', name: 'market' },
    { path: '/allies/', name: 'allies' },
    { path: '/blog/', name: 'blog' },
  ],
  waitTime: 2000
};

// Crear directorios de salida
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}
if (!fs.existsSync(path.join(config.outputDir, 'screenshots'))) {
  fs.mkdirSync(path.join(config.outputDir, 'screenshots'), { recursive: true });
}

const results = {
  timestamp: new Date().toISOString(),
  baseUrl: config.baseUrl,
  tests: []
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureScreenshot(page, pageName, lang, viewportName) {
  const filename = `${pageName}_${lang}_${viewportName}.png`;
  const filepath = path.join(config.outputDir, 'screenshots', filename);
  await page.screenshot({ path: filepath, fullPage: true });
  return filepath;
}

async function testI18n(page, url, lang) {
  const errors = [];
  const checks = {};

  // 1. Verificar atributo lang del <html>
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  checks.htmlLang = htmlLang;
  const expectedLang = lang === 'es' ? 'es-CO' : 'en-US';
  if (htmlLang !== expectedLang) {
    errors.push(`HTML lang es "${htmlLang}" pero se esperaba "${expectedLang}"`);
  }

  // 2. Verificar que el LanguageToggle existe y tiene el href correcto
  const toggleData = await page.evaluate((currentLang) => {
    const toggles = Array.from(document.querySelectorAll('a[hreflang]'));
    return toggles.map(t => ({
      text: t.textContent.trim(),
      href: t.getAttribute('href'),
      hreflang: t.getAttribute('hreflang'),
      visible: t.offsetParent !== null,
      boundingRect: t.getBoundingClientRect()
    }));
  }, lang);
  checks.languageToggles = toggleData;

  // Verificar que hay al menos un toggle visible
  const visibleToggles = toggleData.filter(t => t.visible);
  if (visibleToggles.length === 0) {
    errors.push(`No se encontró LanguageToggle visible en la página`);
  } else {
    // Verificar que el toggle apunta al idioma alternativo correcto
    const expectedAltLang = lang === 'es' ? 'en' : 'es';
    const altToggle = toggleData.find(t => t.hreflang === expectedAltLang);
    if (!altToggle) {
      errors.push(`No se encontró toggle para el idioma alternativo "${expectedAltLang}"`);
    } else {
      const expectedHref = lang === 'es' ? altToggle.href.replace('/es', '') || '/' : '/es/' + altToggle.href.replace('/', '');
      // Solo verificamos que el href contenga el prefijo del idioma alternativo
      if (lang === 'en' && !altToggle.href.startsWith('/es')) {
        errors.push(`El toggle ES tiene href "${altToggle.href}" pero debería empezar con "/es"`);
      }
      if (lang === 'es' && altToggle.href.startsWith('/es')) {
        errors.push(`El toggle EN tiene href "${altToggle.href}" pero no debería empezar con "/es"`);
      }
    }
  }

  // 3. Verificar contenido específico del idioma
  const pageText = await page.evaluate(() => document.body.innerText);
  checks.hasContent = pageText.length > 500;
  
  if (lang === 'es') {
    // En español debería haber palabras clave en español
    const spanishWords = ['Gaia', 'regenera', 'ecosistema', 'comunidad', 'biorregión'];
    const foundSpanish = spanishWords.some(w => pageText.toLowerCase().includes(w.toLowerCase()));
    checks.hasSpanishContent = foundSpanish;
    if (!foundSpanish) {
      errors.push('No se detectó contenido en español en la página');
    }
    // No debería tener texto en inglés del hero
    if (pageText.includes('People, projects, and communities')) {
      errors.push('La página ES contiene texto en inglés del hero');
    }
  } else {
    // En inglés
    const englishWords = ['Gaia', 'regenerative', 'ecosystem', 'community'];
    const foundEnglish = englishWords.some(w => pageText.toLowerCase().includes(w.toLowerCase()));
    checks.hasEnglishContent = foundEnglish;
    if (!foundEnglish) {
      errors.push('No se detectó contenido en inglés en la página');
    }
  }

  // 4. Verificar meta tags de idioma alternativo
  const alternateLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('link[rel="alternate"]')).map(l => ({
      hreflang: l.getAttribute('hreflang'),
      href: l.getAttribute('href')
    }));
  });
  checks.alternateLinks = alternateLinks;

  // 5. Verificar navegación: los links internos deben tener prefijo correcto
  const internalLinks = await page.evaluate((currentLang) => {
    return Array.from(document.querySelectorAll('a[href^="/"]')).map(l => ({
      href: l.getAttribute('href'),
      text: l.textContent.trim().substring(0, 30)
    })).filter(l => 
      !l.href.startsWith('//') && 
      !l.href.startsWith('/images/') && 
      !l.href.startsWith('/_astro/') &&
      l.href !== '/'
    );
  }, lang);
  
  // Muestra de links para verificar consistencia
  checks.sampleLinks = internalLinks.slice(0, 10);

  // 6. Verificar que imágenes locales cargan (ignorar externas como Unsplash)
  const images = await page.$$eval('img', imgs =>
    imgs.map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth
    }))
  );
  // Solo contar como rotas las imágenes locales (no externas HTTP/HTTPS)
  const localBrokenImages = images.filter(img => {
    const isLocal = !img.src.startsWith('http://') && !img.src.startsWith('https://');
    return isLocal && (!img.complete || img.naturalWidth === 0);
  });
  checks.brokenImagesCount = localBrokenImages.length;
  checks.totalExternalImages = images.filter(img => img.src.startsWith('http')).length;
  if (localBrokenImages.length > 0) {
    errors.push(`Hay ${localBrokenImages.length} imágenes locales rotas`);
  }

  return { url, lang, checks, errors, passed: errors.length === 0 };
}

async function testLanguageSwitch(page, enUrl, esUrl) {
  // Navegar a EN y hacer clic en el toggle ES
  await page.goto(enUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(config.waitTime);

  const esToggle = await page.$('a[hreflang="es"]');
  if (!esToggle) {
    return { canSwitch: false, error: 'No se encontró toggle ES en página EN' };
  }

  // Click en el toggle
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }),
    esToggle.click()
  ]);

  const currentUrl = page.url();
  const switched = currentUrl.includes('/es/') || currentUrl.endsWith('/es');
  
  return {
    canSwitch: switched,
    fromUrl: enUrl,
    toUrl: currentUrl,
    error: switched ? null : `Navegó a "${currentUrl}" pero se esperaba una URL con "/es/"`
  };
}

async function runTests() {
  console.log('🚀 Iniciando Browser Automation — i18n Edition\n');
  console.log(`🌐 Base URL: ${config.baseUrl}\n`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    for (const pageDef of config.pagesToTest) {
      const enUrl = `${config.baseUrl}${pageDef.path}`;
      const esUrl = `${config.baseUrl}/es${pageDef.path === '/' ? '/' : pageDef.path}`;
      
      console.log(`📄 Testing: ${pageDef.name}`);
      console.log(`   EN: ${enUrl}`);
      console.log(`   ES: ${esUrl}`);

      const pageResults = {
        page: pageDef.name,
        en: {},
        es: {},
        switchTest: null
      };

      for (const lang of ['en', 'es']) {
        const url = lang === 'en' ? enUrl : esUrl;
        
        for (const viewport of config.viewports) {
          const page = await browser.newPage();
          await page.setViewport({ width: viewport.width, height: viewport.height });

          try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            await sleep(config.waitTime);

            // Screenshot
            const screenshotPath = await captureScreenshot(page, pageDef.name, lang, viewport.name);
            console.log(`     📸 ${lang.toUpperCase()} ${viewport.name}: ${path.basename(screenshotPath)}`);

            // i18n tests (solo en desktop)
            let i18nTest = null;
            if (viewport.name === 'desktop') {
              i18nTest = await testI18n(page, url, lang);
              const status = i18nTest.passed ? '✅' : '❌';
              console.log(`     ${status} ${lang.toUpperCase()} i18n checks: ${i18nTest.errors.length} errores`);
              i18nTest.errors.forEach(e => console.log(`        ⚠️  ${e}`));
            }

            pageResults[lang][viewport.name] = {
              screenshot: screenshotPath,
              i18n: i18nTest
            };

          } catch (error) {
            console.error(`     ❌ Error en ${lang} ${viewport.name}: ${error.message}`);
            pageResults[lang][viewport.name] = { error: error.message };
          }

          await page.close();
        }
      }

      // Test de cambio de idioma (solo para home en desktop)
      if (pageDef.name === 'home') {
        console.log(`     🔄 Testeando cambio de idioma EN → ES...`);
        const switchPage = await browser.newPage();
        await switchPage.setViewport({ width: 1280, height: 800 });
        try {
          pageResults.switchTest = await testLanguageSwitch(switchPage, enUrl, esUrl);
          const status = pageResults.switchTest.canSwitch ? '✅' : '❌';
          console.log(`     ${status} Cambio de idioma: ${pageResults.switchTest.canSwitch ? 'OK' : 'FALLÓ'}`);
          if (pageResults.switchTest.error) {
            console.log(`        ⚠️  ${pageResults.switchTest.error}`);
          }
        } catch (e) {
          console.error(`     ❌ Error en test de cambio: ${e.message}`);
          pageResults.switchTest = { canSwitch: false, error: e.message };
        }
        await switchPage.close();
      }

      results.tests.push(pageResults);
      console.log('');
    }

    // Guardar resultados
    const resultsPath = path.join(config.outputDir, 'i18n-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    // Generar reporte HTML
    await generateHTMLReport(results);

    // Resumen
    const totalTests = results.tests.length * 2; // EN + ES por página
    const passedTests = results.tests.filter(t => 
      (t.en.desktop?.i18n?.passed ?? false) && 
      (t.es.desktop?.i18n?.passed ?? false)
    ).length;
    const switchPassed = results.tests.find(t => t.page === 'home')?.switchTest?.canSwitch ?? false;

    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMEN DE TESTS i18n');
    console.log('='.repeat(50));
    console.log(`✅ Páginas OK (ambos idiomas): ${passedTests} / ${results.tests.length}`);
    console.log(`${switchPassed ? '✅' : '❌'} Cambio de idioma EN → ES: ${switchPassed ? 'FUNCIONA' : 'FALLA'}`);
    console.log(`📁 Reporte: ${path.join(config.outputDir, 'i18n-report.html')}`);
    console.log(`📁 Screenshots: ${path.join(config.outputDir, 'screenshots')}`);
    console.log('='.repeat(50));

    if (!switchPassed || passedTests < results.tests.length) {
      process.exitCode = 1;
    }

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

async function generateHTMLReport(results) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>i18n Browser Automation Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; padding: 2rem; }
    h1 { color: #38bdf8; margin-bottom: 0.5rem; }
    .meta { color: #94a3b8; margin-bottom: 2rem; }
    .page { background: #1e293b; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
    .page h2 { color: #60a5fa; margin-bottom: 1rem; }
    .lang-section { background: #334155; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    .lang-section h3 { color: #a78bfa; margin-bottom: 0.5rem; }
    .lang-section.en h3 { color: #38bdf8; }
    .lang-section.es h3 { color: #fbbf24; }
    .screenshot { max-width: 100%; border-radius: 4px; margin: 0.5rem 0; border: 1px solid #475569; }
    .checks { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; margin: 1rem 0; }
    .check { background: #1e293b; padding: 0.75rem; border-radius: 6px; font-size: 0.875rem; }
    .check.ok { border-left: 3px solid #4ade80; }
    .check.fail { border-left: 3px solid #f87171; }
    .check-label { color: #94a3b8; }
    .check-value { font-weight: bold; }
    .error { background: #7f1d1d; color: #fecaca; padding: 0.75rem; border-radius: 6px; margin: 0.25rem 0; font-size: 0.875rem; }
    .switch-test { background: #1e293b; padding: 1rem; border-radius: 8px; margin-top: 1rem; }
    .switch-test.ok { border-left: 3px solid #4ade80; }
    .switch-test.fail { border-left: 3px solid #f87171; }
    .passed { color: #4ade80; }
    .failed { color: #f87171; }
  </style>
</head>
<body>
  <h1>🧪 i18n Browser Automation Report</h1>
  <div class="meta">
    <p><strong>URL:</strong> ${results.baseUrl}</p>
    <p><strong>Fecha:</strong> ${new Date(results.timestamp).toLocaleString()}</p>
  </div>
  
  ${results.tests.map(test => `
    <div class="page">
      <h2>📄 ${test.page}</h2>
      
      ${['en', 'es'].map(lang => {
        const desktop = test[lang]?.desktop;
        if (!desktop) return '';
        const i18n = desktop.i18n;
        return `
        <div class="lang-section ${lang}">
          <h3>${lang === 'en' ? '🇺🇸 English' : '🇪🇸 Español'}</h3>
          ${desktop.screenshot ? `<img class="screenshot" src="./screenshots/${path.basename(desktop.screenshot)}" alt="Screenshot ${lang}">` : ''}
          ${i18n ? `
            <div class="checks">
              <div class="check ${i18n.checks.htmlLang === (lang === 'es' ? 'es-CO' : 'en-US') ? 'ok' : 'fail'}">
                <div class="check-label">HTML lang</div>
                <div class="check-value">${i18n.checks.htmlLang || '—'}</div>
              </div>
              <div class="check ${i18n.checks.languageToggles?.some(t => t.visible) ? 'ok' : 'fail'}">
                <div class="check-label">Language Toggle</div>
                <div class="check-value">${i18n.checks.languageToggles?.filter(t => t.visible).length || 0} visible</div>
              </div>
              <div class="check ${i18n.checks.hasContent ? 'ok' : 'fail'}">
                <div class="check-label">Contenido</div>
                <div class="check-value">${i18n.checks.hasContent ? '✓ Presente' : '✗ Vacío'}</div>
              </div>
              <div class="check ${(lang === 'es' ? i18n.checks.hasSpanishContent : i18n.checks.hasEnglishContent) ? 'ok' : 'fail'}">
                <div class="check-label">Idioma detectado</div>
                <div class="check-value">${lang === 'es' ? (i18n.checks.hasSpanishContent ? '✓ Español' : '✗ No detectado') : (i18n.checks.hasEnglishContent ? '✓ Inglés' : '✗ No detectado')}</div>
              </div>
              <div class="check ${i18n.checks.brokenImagesCount === 0 ? 'ok' : 'fail'}">
                <div class="check-label">Imágenes rotas</div>
                <div class="check-value">${i18n.checks.brokenImagesCount || 0}</div>
              </div>
            </div>
            ${i18n.errors.length > 0 ? i18n.errors.map(e => `<div class="error">❌ ${e}</div>`).join('') : '<div class="check ok">✅ Todos los checks pasaron</div>'}
          ` : desktop.error ? `<div class="error">❌ ${desktop.error}</div>` : ''}
        </div>
        `;
      }).join('')}
      
      ${test.switchTest ? `
        <div class="switch-test ${test.switchTest.canSwitch ? 'ok' : 'fail'}">
          <strong>🔄 Test de cambio de idioma:</strong> 
          <span class="${test.switchTest.canSwitch ? 'passed' : 'failed'}">
            ${test.switchTest.canSwitch ? '✅ FUNCIONA' : '❌ FALLA'}
          </span>
          ${test.switchTest.error ? `<div class="error">${test.switchTest.error}</div>` : ''}
          ${test.switchTest.toUrl ? `<div style="margin-top:0.5rem;color:#94a3b8;font-size:0.875rem;">Navegó a: ${test.switchTest.toUrl}</div>` : ''}
        </div>
      ` : ''}
    </div>
  `).join('')}
</body>
</html>`;
  
  fs.writeFileSync(path.join(config.outputDir, 'i18n-report.html'), html);
}

// Ejecutar
runTests();
