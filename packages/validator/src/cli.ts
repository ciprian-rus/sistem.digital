#!/usr/bin/env node
import { buildReport } from './report.js';
import { renderHtmlReport } from './html-report.js';
import { checkAccessibility } from './rules/accessibility.js';
import { checkLinks } from './rules/links.js';

function printHelp(): void {
  console.log(`Utilizare: sistem-digital-validator <url> [opțiuni]

Opțiuni:
  --format <json|html>          Formatul raportului (implicit: json)
  --executable-path <cale>      Calea către un executabil Chromium existent
  --skip-external-links         Nu verifica linkurile către alte domenii
  --help                        Afișează acest mesaj

MVP: rulează sd-a11y-axe-wcag (accesibilitate automată) și
sd-content-broken-links (linkuri stricate). Celelalte reguli din
docs/product/validator-rules-inventory.md — inclusiv sd-a11y-contrast,
disponibilă ca funcție de bibliotecă
(\`import { checkContrast } from '@sistem-digital/validator'\`) — nu sunt
încă parte a CLI-ului, care cere doar un URL, nu perechile de culori ale
temei.`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help')) {
    printHelp();
    process.exitCode = args.length === 0 ? 1 : 0;
    return;
  }

  const url = args[0]!;
  const formatIndex = args.indexOf('--format');
  const format = formatIndex >= 0 ? args[formatIndex + 1] : 'json';
  const executablePathIndex = args.indexOf('--executable-path');
  const executablePath = executablePathIndex >= 0 ? args[executablePathIndex + 1] : undefined;
  const checkExternal = !args.includes('--skip-external-links');

  if (format !== 'json' && format !== 'html') {
    console.error(`Format necunoscut: ${format}. Folosește "json" sau "html".`);
    process.exitCode = 1;
    return;
  }

  const options = executablePath ? { executablePath } : {};
  const [accessibilityResult, linksResult] = await Promise.all([
    checkAccessibility(url, options),
    checkLinks(url, { ...options, checkExternal }),
  ]);
  const report = buildReport(url, [accessibilityResult, linksResult]);

  if (format === 'html') {
    console.log(renderHtmlReport(report));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }

  process.exitCode = report.summary.fail > 0 ? 1 : 0;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
