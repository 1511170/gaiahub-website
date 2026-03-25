/**
 * i18n Configuration for Gaia Hub
 * 
 * Supports: English (default) and Spanish
 * Routing: / or /en/... → English, /es/... → Spanish
 */
import { createI18n } from '@skills/community/i18n';
import en from './en.json';
import es from './es.json';

export const {
  t,
  getLocaleFromUrl,
  getLocalizedPath,
  getPathWithoutLocale,
  getLocales,
  getDefaultLocale,
} = createI18n({
  translations: { en, es },
  defaultLocale: 'en',
});

export type SiteLocale = 'en' | 'es';
