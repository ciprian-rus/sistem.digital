#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';

import { renderBadgeSvg } from '../dist/index.js';

const [, , reportPath, outputPath] = process.argv;

if (!reportPath) {
  console.error('Utilizare: node scripts/generate-badge.mjs <raport.json> [ieșire.svg]');
  process.exitCode = 1;
} else {
  const report = JSON.parse(await readFile(reportPath, 'utf8'));
  const svg = renderBadgeSvg(report);
  if (outputPath) {
    await writeFile(outputPath, svg);
  } else {
    process.stdout.write(svg);
  }
}
