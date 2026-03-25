# Gaia Hub - Guía del Proyecto

> **Dominio**: gaiahub.co  
> **Tipo**: Landing page del Ecosistema Gaia - Plataforma de Coordinación Digital  
> **Design System**: Solar/Ethereal Theme - Material Design 3

---

## 🎯 Identidad del Proyecto

**Gaia Hub** es el sistema operativo digital del Ecosistema Gaia - una meta-plataforma que permite a la red verse a sí misma, conectarse, coordinarse y evolucionar.

### El Triad de Gaia

1. **Gaia Hub** (Nervous System) - Coordinación digital y matchmaking
2. **Gaia Market** (Circulatory) - Marketplace regenerativo  
3. **Gaia Commons** (Soul) - Marco constitucional y gobernanza

Plus:
- **Gaia Impact Fund** - Fondo madre para regeneración
- **Gaia Impact Hub** - Orquestación e incubación

---

## 🎨 Design System

### Paleta de Colores

```css
--primary: #776300           /* Solar Gold */
--primary-container: #ffd709  /* Bright Solar */
--secondary: #00743a          /* Regenerative Green */
--secondary-container: #86fea7
--tertiary: #8e00fd           /* Wisdom Purple */
--tertiary-container: #d0a7ff
--background: #fefee5         /* Light Solar Background */
--on-surface: #363b10         /* Deep Olive Text */
```

### Tipografía

- **Headlines**: Epilogue (700-900)
- **Body**: Manrope (300-800)
- **Icons**: Material Symbols Outlined

### Efectos

- `ethereal-shadow`: Sombras suaves difuminadas
- `glass-panel`: Efecto vidrio esmerilado
- `solar-gradient`: Gradiente dorado solar

---

## ✅ Skills Instaladas

```json
{
  "skills": [
    "cms-sveltia",           /* Panel de admin */
    "seo-ai-citations",      /* Schema.org, meta tags */
    "testimonials",          /* Testimonios con schema */
    "contact-form",          /* Formulario de contacto */
    "webflow-effects",       /* Animaciones GSAP */
    "blog"                   /* Sistema de blog */
  ]
}
```

---

## 📁 Secciones de la Landing

1. **Navigation** - Sticky nav con glass effect
2. **Hero** - "The Digital Nervous System" con CTA
3. **Stats** - Métricas del ecosistema (4 cards)
4. **The Triad** - Gaia Hub, Market, Commons (3 cards grandes)
5. **Core Functions** - 6 funciones de la plataforma
6. **Impact Fund** - Sección del fondo con stats flotantes
7. **Ecosystem Pulse** - Bento grid con datos en vivo
8. **Testimonials** - Stewards del ecosistema
9. **CTA** - "Join the regenerative organism"
10. **Contact** - Formulario de contacto
11. **Footer** - Links y navegación
12. **Floating Nav** - Sidebar (desktop) / Bottom bar (mobile)

---

## 🌐 Arquitectura de Contenido

### URLs Principales

- `/` - Home Portal
- `/hub` - Gaia Hub Platform
- `/market` - Gaia Marketplace
- `/commons` - Gaia Commons Framework
- `/fund` - Gaia Impact Fund
- `/incubation` - Impact Hub Incubation

### CMS Collections

- **blog/** - Posts del ecosistema
- **pages/** - Páginas editables
- **testimonials/** - Testimonios de stewards
- **projects/** - Proyectos regenerativos
- **team/** - Miembros del equipo

---

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Skills
node scripts/skill-list.js
node scripts/skill-add.js [nombre]
```

---

## 📚 Referencias

- [Documentación Gaia Economy](../../docs/Gaia%20Economy%20Layer%20-%20Commonomics%20&%20Tokenomics%20Explained%20In-Depth.md)
- [Guía KINTO](../../KINTO.md)
- [Catálogo de Skills](../../SKILLS_CATALOG.md)

---

**Gaia Hub**: The Digital Coordination Platform for Regenerative Ecosystems
