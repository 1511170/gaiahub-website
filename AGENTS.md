# 🤖 AGENTS.md - Inicio Rápido para Cualquier IA

> **Para:** Kimi Code, Claude Code, Cursor, o cualquier IA agente

## 🎯 Tú Entras Aquí y Lees ESTO Primero

### Contexto Inmediato
- **Proyecto**: Gaia Hub - Plataforma de gestión de presencia digital
- **Sistema**: KINTO CMS - Generador de sitios estáticos con arquitectura de skills
- **Stack**: Astro 5 + Tailwind 4 + Sveltia CMS
- **Dominio**: gaiahub.co
- **Estado**: Core limpio, sin skills instaladas aún

### Tu Misión
Desarrollar la plataforma Gaia Hub:
1. Landing page para gaiahub.co
2. Sistema de gestión de sitios para clientes
3. Panel de administración
4. Integración con skills del CMS

---

## ⚡ Empezar (Flujo Paso a Paso)

### Paso 1: Leer el Brief del Cliente
```bash
cat sites/serviworldlogistics/KINTO.md
```

### Paso 2: Ver Skills Disponibles
```bash
cd sites/serviworldlogistics
node scripts/skill-list.js
```

### Paso 3: Instalar Skills Necesarias
```bash
node scripts/skill-add.js cms-sveltia
node scripts/skill-add.js testimonials
```

### Paso 4: Generar Contenido
- Editar `src/pages/index.astro`
- Crear páginas adicionales
- Configurar CMS en `config/site.config.ts`

---

## 📁 Estructura Importante

```
kinto-cms/
├── KINTO.md              # ← Guía completa del sistema (léela)
├── sites/
│   └── serviworldlogistics/
│       ├── KINTO.md      # ← Brief del cliente (léelo)
│       └── src/pages/    # ← Aquí trabajas
└── skills/
    ├── official/         # Skills oficiales
    └── community/        # Skills comunitarias
```

---

## 🔗 Referencias

- Guía sistema completa: `KINTO.md`
- Brief del proyecto: `sites/serviworldlogistics/KINTO.md`
- Arquitectura: `STRUCTURE.md`

---

**TL;DR**: Entra a `sites/serviworldlogistics`, lee su `KINTO.md`, instala skills, genera el sitio.
