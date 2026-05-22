#!/usr/bin/env node
/**
 * Kinto CMS — Add Content
 * Usage: node scripts/kinto-add-content.js <collection-name>
 * Interactively prompts for required fields from kinto.config.json
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { createInterface } from 'readline';

const collection = process.argv[2];
if (!collection) {
  console.error('❌ Usage: node scripts/kinto-add-content.js <collection-name>');
  process.exit(1);
}

const configPath = resolve(process.cwd(), 'kinto.config.json');
const dataFile = resolve(process.cwd(), 'src', 'content', 'kinto', collection, 'data.json');

if (!existsSync(configPath)) {
  console.error('❌ kinto.config.json not found');
  process.exit(1);
}

if (!existsSync(dataFile)) {
  console.error(`❌ Collection '${collection}' does not exist. Create it first with:`);
  console.error(`   node scripts/kinto-create-collection.js ${collection}`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, 'utf-8'));
const collectionConfig = config.collections?.[collection];

if (!collectionConfig) {
  console.warn(`⚠️ Collection '${collection}' not defined in kinto.config.json`);
}

const data = JSON.parse(readFileSync(dataFile, 'utf-8'));
const items = Array.isArray(data) ? data : (data.default || []);

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const newItem = { id: crypto.randomUUID(), createdAt: new Date().toISOString() };

  const fields = collectionConfig?.fields || ['title', 'slug'];
  const required = collectionConfig?.required || [];

  for (const field of fields) {
    const isRequired = required.includes(field);
    const answer = await ask(`${field}${isRequired ? ' *' : ''}: `);
    if (answer.trim()) {
      newItem[field] = answer.trim();
    } else if (isRequired) {
      console.error(`❌ Field '${field}' is required.`);
      rl.close();
      process.exit(1);
    }
  }

  items.push(newItem);
  writeFileSync(dataFile, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`✅ Item added to '${collection}'. Total items: ${items.length}`);
  rl.close();
}

main();
