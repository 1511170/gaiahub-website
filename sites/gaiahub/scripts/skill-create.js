#!/usr/bin/env node
/**
 * Script: skill-create.js
 * Crea una nueva skill con componente de ejemplo funcional
 * 
 * Uso: node scripts/skill-create.js [skill-name] [--category=community]
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const skillName = process.argv[2];
const categoryArg = process.argv.find(a => a.startsWith('--category='));
const category = categoryArg ? categoryArg.split('=')[1] : 'community';

if (!skillName) {
  console.error('❌ Error: Debes especificar el nombre de la skill');
  console.log('Uso: node scripts/skill-create.js [skill-name]');
  process.exit(1);
}

const skillsRoot = resolve(process.cwd(), 'skills');
const skillPath = join(skillsRoot, category, skillName);

if (existsSync(skillPath)) {
  console.error(`❌ Skill "${skillName}" ya existe en skills/${category}/`);
  process.exit(1);
}

// Crear estructura de skill
const dirs = ['components', 'config', 'example'];
dirs.forEach(dir => mkdirSync(join(skillPath, dir), { recursive: true }));

// Nombre del componente (PascalCase)
const componentName = skillName.split('-').map(s => 
  s.charAt(0).toUpperCase() + s.slice(1)
).join('');

// Crear SKILL.md template
const skillMd = `# Skill: ${skillName}

## Descripción

Descripción de qué hace esta skill y para qué casos de uso está diseñada.

## Qué hace

- ✅ Funcionalidad principal
- ✅ Funcionalidad secundaria
- ✅ Integración con CMS (si aplica)

## Instalación

\`\`\`bash
node scripts/skill-add.js ${skillName}
\`\`\`

## Uso

### Importar el componente

\`\`\`astro
---
import { ${componentName} } from '@skills/${category}/${skillName}';
---

<${componentName} />
\`\`\`

### Props disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| title | string | "" | Título del componente |

## CMS Integration (opcional)

Esta skill puede configurar colecciones en Sveltia CMS automáticamente.

## Metadata

- **Categoría**: ${category}
- **Fecha**: ${new Date().toISOString().split('T')[0]}
- **Versión**: 1.0.0
- **Reutilizable**: Sí
`;

writeFileSync(join(skillPath, 'SKILL.md'), skillMd);

// Crear componente de ejemplo
const componentAstro = `---
interface Props {
  title?: string;
}

const { title = '${componentName}' } = Astro.props;
---

<div class="p-6 bg-gray-50 rounded-lg border border-gray-200">
  {title && <h3 class="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
  <p class="text-gray-600">
    Este es el componente ${componentName} de la skill ${skillName}.
    Personalízalo según tus necesidades.
  </p>
</div>
`;

writeFileSync(join(skillPath, 'components', `${componentName}.astro`), componentAstro);

// Crear index.ts CON exports de componentes
const indexTs = `/**
 * Skill: ${skillName}
 * Creada por IA
 * Reutilizable para cualquier sitio
 */

// ✅ EXPORTAR COMPONENTES - Esto permite importarlos fácilmente
export { default as ${componentName} } from './components/${componentName}.astro';

export const config = {
  name: '${skillName}',
  version: '1.0.0',
  description: 'Skill ${skillName} - descripción aquí',
  category: '${category}',
  author: 'AI',
  createdFor: '[nombre-proyecto]',
  reusable: true
};

export function install(context) {
  // Registra componentes en el contexto de la skill
  context.addComponent('${componentName}', './components/${componentName}.astro');
  
  // Opcional: Añade CMS collection
  // context.addCMSCollection({
  //   name: '${skillName}',
  //   label: '${componentName}',
  //   folder: 'src/content/${skillName}',
  //   create: true,
  //   fields: [
  //     { label: 'Título', name: 'title', widget: 'string' },
  //   ]
  // });
  
  console.log('✅ Skill ${skillName} instalada');
  console.log('   Componente: ${componentName}');
}
`;

writeFileSync(join(skillPath, 'index.ts'), indexTs);

// Crear ejemplo de uso
const exampleAstro = `---
// Ejemplo de uso de la skill ${skillName}
import Layout from '../layouts/Layout.astro';
import { ${componentName} } from '@skills/${category}/${skillName}';
---

<Layout title="Ejemplo: ${skillName}">
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Skill: ${skillName}</h1>
    
    <!-- Usar el componente -->
    <${componentName} title="Hola desde ${skillName}" />
    
    <div class="mt-8 p-4 bg-blue-50 rounded">
      <p class="text-sm text-blue-700">
        💡 Este es un ejemplo de cómo usar la skill ${skillName}.
        Copia este código a tu página para usarla.
      </p>
    </div>
  </main>
</Layout>
`;

writeFileSync(join(skillPath, 'example', 'page.astro'), exampleAstro);

// Output
console.log(`✅ Skill "${skillName}" creada exitosamente`);
console.log(`   📁 Ubicación: skills/${category}/${skillName}/`);
console.log(`   📦 Archivos:`);
console.log(`      - SKILL.md (documentación)`);
console.log(`      - index.ts (exports + config)`);
console.log(`      - components/${componentName}.astro (componente)`);
console.log(`      - config/ (configuración CMS)`);
console.log(`      - example/page.astro (ejemplo de uso)`);
console.log(`\n📝 Siguientes pasos:`);
console.log(`   1. Edita SKILL.md con la documentación completa`);
console.log(`   2. Personaliza components/${componentName}.astro`);
console.log(`   3. Configura campos de CMS en config/ si aplica`);
console.log(`   4. Prueba la skill: node scripts/skill-add.js ${skillName}`);
console.log(`\n🚀 Para usar en tu sitio:`);
console.log(`   import { ${componentName} } from '@skills/${category}/${skillName}';`);
