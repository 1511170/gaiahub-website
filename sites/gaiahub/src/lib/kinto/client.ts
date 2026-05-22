import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import type { KintoItem, KintoConfig } from './types';

const DATA_DIR = resolve(process.cwd(), 'src', 'content', 'kinto');
const CONFIG_PATH = resolve(process.cwd(), 'kinto.config.json');

let cachedConfig: KintoConfig | null = null;

export function getConfig(): KintoConfig {
  if (cachedConfig) return cachedConfig;
  if (!existsSync(CONFIG_PATH)) {
    throw new Error(`kinto.config.json not found at ${CONFIG_PATH}`);
  }
  const raw = readFileSync(CONFIG_PATH, 'utf-8');
  cachedConfig = JSON.parse(raw) as KintoConfig;
  return cachedConfig;
}

export async function getCollection<T extends KintoItem>(name: string): Promise<T[]> {
  const filePath = resolve(DATA_DIR, name, 'data.json');
  if (!existsSync(filePath)) {
    return [];
  }
  const raw = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  return (data.default || data || []) as T[];
}

export async function getItem<T extends KintoItem>(
  collection: string,
  slug: string,
  key: string = 'slug'
): Promise<T | undefined> {
  const items = await getCollection<T>(collection);
  return items.find((item) => item[key] === slug);
}

export async function getItemsByField<T extends KintoItem>(
  collection: string,
  field: string,
  value: any
): Promise<T[]> {
  const items = await getCollection<T>(collection);
  return items.filter((item) => item[field] === value);
}

export async function getPublishedItems<T extends KintoItem>(
  collection: string,
  field: string = 'published'
): Promise<T[]> {
  const items = await getCollection<T>(collection);
  return items.filter((item) => item[field] === true || item[field] === undefined);
}
