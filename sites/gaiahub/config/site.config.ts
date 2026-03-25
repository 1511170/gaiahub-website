/**
 * Configuración del sitio: Gaia Hub
 * 
 * Domains:
 * - Public: gaiahub.co
 * - CMS (oculto): cms.gaiahub.co
 */

export interface SiteConfig {
  site: {
    domain: string;
    name: string;
    description: string;
    language: string;
    logo?: string;
    favicon?: string;
  };
  cms: {
    enabled: boolean;
    subdomain: string;
    hidden: boolean;
    githubRepo: string;
    authEndpoint?: string;
  };
  build: {
    output: 'static';
    compressHTML: boolean;
    inlineStylesheets: 'auto' | 'always' | 'never';
  };
  skills: {
    // Skills activas se leen de skills-active.json
  };
}

export default {
  site: {
    domain: 'gaiahub.co',
    name: 'Gaia Hub',
    description: 'Plataforma de gestión de presencia digital empresarial. Crea, gestiona y escala tu presencia online con tecnología de última generación.',
    language: 'es',
    logo: '/logo.svg',
    favicon: '/favicon.ico'
  },
  cms: {
    enabled: true,
    subdomain: 'cms.gaiahub.co',
    hidden: true,
    githubRepo: 'gaiahub/gaiahub-content',
    authEndpoint: 'https://cms-auth.gaiahub.workers.dev'
  },
  build: {
    output: 'static',
    compressHTML: true,
    inlineStylesheets: 'auto'
  },
  skills: {}
} satisfies SiteConfig;
