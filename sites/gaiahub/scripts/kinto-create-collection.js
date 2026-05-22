#!/usr/bin/env node
/**
 * Kinto CMS — Create Collection
 * Usage: node scripts/kinto-create-collection.js <collection-name>
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const collection = process.argv[2];
if (!collection) {
  console.error('❌ Usage: node scripts/kinto-create-collection.js <collection-name>');
  process.exit(1);
}

const contentDir = resolve(process.cwd(), 'src', 'content', 'kinto', collection);
const dataFile = resolve(contentDir, 'data.json');

if (!existsSync(contentDir)) {
  mkdirSync(contentDir, { recursive: true });
}

if (!existsSync(dataFile)) {
  writeFileSync(dataFile, JSON.stringify([], null, 2), 'utf-8');
  console.log(`✅ Collection '${collection}' created at src/content/${collection}/data.json`);
} else {
  console.log(`⚠️ Collection '${collection}' already exists.`);
}
