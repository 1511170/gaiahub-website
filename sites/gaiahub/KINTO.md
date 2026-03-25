# Gaia Hub - Guía del Proyecto

> **Dominio**: gaiahub.co  
> **CMS**: cms.gaiahub.co (oculto)  
> **Tipo**: Landing page corporativa + plataforma de gestión digital

---

## 🎯 Objetivo

Landing page profesional para Gaia Hub que comunica:
- La propuesta de valor de la plataforma
- Servicios disponibles
- Proceso de trabajo
- Testimonios de clientes
- Formulario de contacto

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
    "blog"
  ]
}
```

---

## 📁 Estructura del Sitio

```
sites/gaiahub/
├── src/
│   ├── pages/
│   │   └── index.astro      # Landing page principal
│   ├── layouts/
│   │   └── Layout.astro     # Layout base con SEO
│   └── content/             # Contenido editable
│       ├── blog/            # Posts del blog
│       ├── pages/           # Páginas editables
│       └── testimonials/    # Testimonios
├── config/
│   └── site.config.ts       # Configuración del sitio
└── skills-active.json       # Skills activas
```

---

## 🎨 Secciones de la Landing

1. **Hero** - Value proposition principal con CTA
2. **Servicios** - Grid de 6 servicios clave
3. **Proceso** - 4 pasos de trabajo
4. **Testimonios** - Carrusel de clientes
5. **CTA** - Llamada a la acción final
6. **Contacto** - Formulario de contacto
7. **Footer** - Links y navegación

---

## 📝 Contenido Editable via CMS

- **Blog**: Posts, categorías, tags
- **Testimonios**: Nuevos testimonios de clientes
- **Pages**: Páginas adicionales

---

## 🚀 Comandos de Desarrollo

```bash
# Ver skills disponibles
node scripts/skill-list.js

# Agregar nueva skill
node scripts/skill-add.js nombre-skill

# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

## 📚 Documentación

- [Guía KINTO](../../KINTO.md)
- [Catálogo de Skills](../../SKILLS_CATALOG.md)
- [Generación con IA](../../docs/AI_GENERATION.md)
