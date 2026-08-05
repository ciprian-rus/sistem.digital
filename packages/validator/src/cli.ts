#!/usr/bin/env node
import { renderBadgeSvg } from './badge.js';
import { buildReport } from './report.js';
import { renderHtmlReport } from './html-report.js';
import { checkAccessibility } from './rules/accessibility.js';
import { checkComponentStructure } from './rules/component-structure.js';
import { checkFocusVisible } from './rules/focus-visible.js';
import { checkFormLabels } from './rules/form-labels.js';
import { checkHeadingOrder, checkLandmarks } from './rules/heading-landmarks.js';
import { checkLinks } from './rules/links.js';
import { checkCssBudget, checkJsBudget } from './rules/performance.js';
import { checkRequiredPages } from './rules/seo.js';

function printHelp(): void {
  console.log(`Utilizare: sistem-digital-validator <url> [opțiuni]

Opțiuni:
  --format <json|html|badge>    Formatul raportului (implicit: json)
  --executable-path <cale>      Calea către un executabil Chromium existent
  --skip-external-links         Nu verifica linkurile către alte domenii
  --help                        Afișează acest mesaj

Formatul "badge" produce un SVG static, în stilul shields.io, cu numărul
de reguli pass/fail/warn — niciodată un scor agregat unic (vezi
principiul „nu se pretinde conformare completă” din
docs/product/validator-rules-inventory.md). Culoarea e doar un indicator
de stare (roșu la eșecuri, galben la avertismente, verde altfel).

MVP: rulează sd-a11y-axe-wcag (accesibilitate automată),
sd-a11y-heading-order (ierarhia titlurilor), sd-a11y-landmarks (regiuni
ARIA), sd-a11y-form-labels (etichetarea câmpurilor de formular),
sd-a11y-focus-visible (euristică pentru indicatorul de focus, best-effort),
sd-content-broken-links (linkuri stricate), sd-seo-required-pages
(sitemap/robots/manifest/canonical), sd-perf-js-budget,
sd-perf-css-budget (buget de JavaScript/CSS la randarea inițială) și
sd-content-component-structure (prezența claselor/atributelor Sistem
Digital în markup). Celelalte reguli din
docs/product/validator-rules-inventory.md — inclusiv sd-a11y-contrast
și sd-package-version, disponibile ca funcții de bibliotecă
(\`import { checkContrast, checkPackageVersions } from
'@sistem-digital/validator'\`) — nu sunt încă parte a CLI-ului, care cere
doar un URL, nu perechile de culori ale temei sau o cale de proiect local.`);
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

  if (format !== 'json' && format !== 'html' && format !== 'badge') {
    console.error(`Format necunoscut: ${format}. Folosește "json", "html" sau "badge".`);
    process.exitCode = 1;
    return;
  }

  const options = executablePath ? { executablePath } : {};
  const [
    accessibilityResult,
    headingOrderResult,
    landmarksResult,
    formLabelsResult,
    focusVisibleResult,
    linksResult,
    seoResult,
    jsBudgetResult,
    cssBudgetResult,
    componentStructureResult,
  ] = await Promise.all([
    checkAccessibility(url, options),
    checkHeadingOrder(url, options),
    checkLandmarks(url, options),
    checkFormLabels(url, options),
    checkFocusVisible(url, options),
    checkLinks(url, { ...options, checkExternal }),
    checkRequiredPages(url, options),
    checkJsBudget(url, options),
    checkCssBudget(url, options),
    checkComponentStructure(url, options),
  ]);
  const report = buildReport(url, [
    accessibilityResult,
    headingOrderResult,
    landmarksResult,
    formLabelsResult,
    focusVisibleResult,
    linksResult,
    seoResult,
    jsBudgetResult,
    cssBudgetResult,
    componentStructureResult,
  ]);

  if (format === 'html') {
    console.log(renderHtmlReport(report));
  } else if (format === 'badge') {
    console.log(renderBadgeSvg(report));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }

  process.exitCode = report.summary.fail > 0 ? 1 : 0;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
