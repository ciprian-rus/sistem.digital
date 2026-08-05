#!/usr/bin/env node
import { chromium } from 'playwright-core';

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
  --sitemap-path <cale>         Calea sitemap-ului (implicit: /sitemap.xml)
  --robots-path <cale>          Calea robots.txt (implicit: /robots.txt)
  --manifest-path <cale>        Calea manifestului web; poate fi repetată
                                 (implicit: /manifest.webmanifest,
                                 /manifest.json)
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
  const sitemapPathIndex = args.indexOf('--sitemap-path');
  const sitemapPath = sitemapPathIndex >= 0 ? args[sitemapPathIndex + 1] : undefined;
  const robotsPathIndex = args.indexOf('--robots-path');
  const robotsPath = robotsPathIndex >= 0 ? args[robotsPathIndex + 1] : undefined;
  const manifestPaths = args
    .flatMap((arg, index) => (arg === '--manifest-path' ? [args[index + 1]] : []))
    .filter((value): value is string => value !== undefined);

  if (format !== 'json' && format !== 'html' && format !== 'badge') {
    console.error(`Format necunoscut: ${format}. Folosește "json", "html" sau "badge".`);
    process.exitCode = 1;
    return;
  }

  // O singură instanță Chromium, partajată de toate regulile de mai jos —
  // fiecare regulă tot deschide și închide propria pagină, dar nu mai
  // pornește propriul proces de browser (cel mai costisitor pas), spre
  // deosebire de utilizarea directă ca bibliotecă a fiecărei funcții, unde
  // fiecare apel rămâne independent.
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  try {
    const options = { browser };
    const seoOptions = {
      ...options,
      ...(sitemapPath ? { sitemapPath } : {}),
      ...(robotsPath ? { robotsPath } : {}),
      ...(manifestPaths.length > 0 ? { manifestPaths } : {}),
    };
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
      checkRequiredPages(url, seoOptions),
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
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
