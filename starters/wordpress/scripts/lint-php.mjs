#!/usr/bin/env node
// Verifică sintaxa fiecărui fișier PHP din temă cu `php -l`. Singura
// verificare automată posibilă în acest monorepo — nu există un runtime
// WordPress viu (bază de date, wp-cli) disponibil în CI sau în acest mediu.

import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const themeDir = resolve(here, '../theme');

function findPhpFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entryPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue;
      files.push(...findPhpFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.php')) {
      files.push(entryPath);
    }
  }
  return files;
}

const phpCheck = spawnSync('php', ['--version']);
if (phpCheck.status !== 0) {
  console.warn('php nu este disponibil în acest mediu — se omite verificarea de sintaxă.');
  process.exit(0);
}

const phpFiles = findPhpFiles(themeDir);
let hasErrors = false;

for (const file of phpFiles) {
  const result = spawnSync('php', ['-l', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    hasErrors = true;
    console.error(result.stdout || result.stderr);
  }
}

if (hasErrors) {
  console.error('Sintaxă PHP invalidă.');
  process.exit(1);
}

console.log(`Sintaxă PHP validă: ${phpFiles.length} fișiere verificate.`);
