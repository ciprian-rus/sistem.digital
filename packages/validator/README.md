# @sistem-digital/validator (MVP, nepublicat)

Implementarea inițială a validatorului din
[#25](https://github.com/ciprian-rus/sistem.digital/issues/25), construită
pe inventarul de reguli și formatul de raport din
[`docs/product/validator-rules-inventory.md`](../../docs/product/validator-rules-inventory.md).

Pachet privat (`"private": true`) — nu este publicat pe npm. Rămâne un
punct de plecare pentru implementarea completă planificată pentru M7, nu
un produs finit.

## Ce include azi

- `sd-a11y-axe-wcag` — accesibilitate automată, prin axe-core rulat
  împotriva unei pagini randate reale (Chromium, via `playwright-core`),
  cu același set de taguri WCAG folosit de testele acestui monorepo.
- `sd-a11y-heading-order` — ierarhia titlurilor (h1-h6), extrasă separat
  din axe-core (regulile `heading-order`, `page-has-heading-one`) — sunt
  marcate „best-practice” în axe, nu fac parte din tagurile WCAG rulate
  de `sd-a11y-axe-wcag`, de aceea au propria regulă explicabilă.
- `sd-a11y-landmarks` — prezența și unicitatea regiunilor ARIA
  (`<main>`, `<nav>`, `<header>` etc.), extrasă separat din axe-core
  (`region`, `landmark-one-main`, `landmark-unique` ș.a.), din același
  motiv ca mai sus.
- `sd-content-broken-links` — extrage linkurile din pagina randată (inclusiv
  cele injectate prin JavaScript) și verifică fiecare cu o cerere HTTP
  reală (HEAD, cu fallback GET); linkurile interne stricate dau `fail`,
  cele externe stricate dau `warn` (pot fi în afara controlului
  proiectului).
- `sd-seo-required-pages` — verifică prezența și forma minimă a
  `sitemap.xml`, `robots.txt`, a unui manifest web
  (`manifest.webmanifest` sau `manifest.json`) și a unui
  `<link rel="canonical">` pe pagina randată; `fail` dacă oricare dintre
  cele patru lipsește sau e malformată, cu fiecare verificare raportată
  separat în `evidence`. Verifică doar căile convenționale — un proiect
  care le publică în altă locație are nevoie de căi configurabile,
  neimplementate încă.
- `sd-package-version` — compară versiunea instalată a fiecărui pachet
  `@sistem-digital/*` dintr-un proiect local (citită din
  `node_modules/@sistem-digital/<pachet>/package.json`) cu ultima
  versiune publicată pe npm (dist-tag `latest`); `warn` pentru pachete
  în urmă, niciodată `fail` (severitate `warning` — nu blochează CI
  implicit). Singura regulă care nu operează pe un URL, ci pe o cale de
  proiect local — de aceea e disponibilă doar ca funcție de bibliotecă.
- `sd-a11y-contrast` — verificarea raportului de contrast WCAG pentru
  perechi text/fundal furnizate explicit (algoritm identic cu
  `packages/tokens/scripts/build-themes.mjs`), disponibilă ca funcție de
  bibliotecă, nu încă parte a CLI-ului (nu poate fi derivată automat doar
  dintr-un URL).
- `sd-perf-js-budget` și `sd-perf-css-budget` — dimensiunea totală a
  JavaScript-ului, respectiv CSS-ului, încărcate la randarea inițială a
  paginii (Chromium, măsurate la runtime — spre deosebire de
  `apps/website/scripts/check-performance-budget.mjs`, care citește
  manifestul de build Next.js, inexistent pentru un proiect extern
  generic). `warn`, niciodată `fail`, peste bugetul implicit (600 KiB
  JS / 180 KiB CSS, preluate din bugetele acestui site) — configurabil
  prin `budgetBytes`.
- `sd-content-component-structure` — verifică prezența claselor CSS
  `sd-*` și a atributelor `data-sd-*` în markup-ul randat, ca dovadă
  indirectă că proiectul chiar randează componente Sistem Digital, nu
  doar are pachetele instalate ca dependență neutilizată; `fail` dacă
  pagina nu conține niciun marker.
- formatul de raport JSON, un randator HTML minimal și un badge SVG
  static (`--format badge`), toate fără scor agregat unic — badge-ul
  afișează numărul de reguli pass/fail/warn, nu un procent, cu o
  culoare-indicator de stare (roșu la eșecuri, galben la avertismente,
  verde altfel); vezi principiul „nu se pretinde conformare completă”.

Toate categoriile inițiale din #25 au acum cel puțin o regulă MVP.
Integrarea propriu-zisă în GitHub Actions (rulare programată, publicare
artefact, gate pe `severity: error`) rămâne neimplementată — vezi
[„Ce nu include acest pachet”](#ce-nu-include-acest-pachet-încă) mai jos.

## Acest pachet nu instalează Chromium

`playwright-core` (nu `playwright`) e folosit deliberat — nu descarcă
automat un browser. Utilizatorul trebuie să aibă un executabil Chromium
disponibil:

```sh
npx playwright install chromium
```

apoi să indice calea, fie prin `--executable-path`, fie prin variabila de
mediu `SISTEM_DIGITAL_VALIDATOR_CHROMIUM`.

## Utilizare CLI

```sh
node dist/cli.js https://exemplu-institutie.ro --format json
node dist/cli.js https://exemplu-institutie.ro --format html --executable-path /path/to/chromium
node dist/cli.js https://exemplu-institutie.ro --format badge > badge.svg
node dist/cli.js https://exemplu-institutie.ro --skip-external-links
```

CLI-ul rulează `sd-a11y-axe-wcag`, `sd-a11y-heading-order`,
`sd-a11y-landmarks`, `sd-content-broken-links`, `sd-seo-required-pages`,
`sd-perf-js-budget`, `sd-perf-css-budget` și
`sd-content-component-structure` în paralel (fiecare regulă își
pornește propria instanță de Chromium — neoptimizat pentru MVP, dar
corect).

## Utilizare ca bibliotecă

```ts
import {
  buildReport,
  checkAccessibility,
  checkComponentStructure,
  checkContrast,
  checkCssBudget,
  checkHeadingOrder,
  checkJsBudget,
  checkLandmarks,
  checkLinks,
  checkPackageVersions,
  checkRequiredPages,
  renderBadgeSvg,
} from '@sistem-digital/validator';

const accessibility = await checkAccessibility('https://exemplu-institutie.ro');
const headingOrder = await checkHeadingOrder('https://exemplu-institutie.ro');
const landmarks = await checkLandmarks('https://exemplu-institutie.ro');
const links = await checkLinks('https://exemplu-institutie.ro', { checkExternal: false });
const seo = await checkRequiredPages('https://exemplu-institutie.ro');
const jsBudget = await checkJsBudget('https://exemplu-institutie.ro');
const cssBudget = await checkCssBudget('https://exemplu-institutie.ro');
const componentStructure = await checkComponentStructure('https://exemplu-institutie.ro');
const packageVersions = await checkPackageVersions('/cale/către/proiectul-verificat');
const contrast = checkContrast([
  { id: 'text/page', foreground: '#17202a', background: '#ffffff', required: 4.5 },
]);
const report = buildReport('https://exemplu-institutie.ro', [
  accessibility,
  headingOrder,
  landmarks,
  links,
  seo,
  jsBudget,
  cssBudget,
  componentStructure,
  packageVersions,
  contrast,
]);
const badge = renderBadgeSvg(report);
```

## Teste

Testele pentru `sd-a11y-axe-wcag`, `sd-a11y-heading-order`,
`sd-a11y-landmarks`, `sd-content-broken-links`, `sd-seo-required-pages`,
`sd-perf-js-budget`, `sd-perf-css-budget` și
`sd-content-component-structure` rulează integral doar când un
executabil Chromium e disponibil (verificat automat la
`/opt/pw-browsers/chromium` sau prin
`SISTEM_DIGITAL_VALIDATOR_CHROMIUM`) — altfel se omit cu un mesaj explicit.
Pentru `sd-seo-required-pages`, doar verificarea `<link rel="canonical">`
are nevoie de browser; verificările pentru sitemap/robots/manifest
folosesc `fetch()` simplu. Testele pentru `sd-a11y-contrast`, formatul
de raport și badge-ul SVG (`renderBadgeSvg`) rulează mereu (logică
pură, fără browser). Testele pentru `sd-package-version` rulează mereu,
împotriva unui server local care imită rutele `/<pachet>/latest` ale
registrului npm — nu ating `registry.npmjs.org` real.

## Ce nu include acest pachet încă

Din secțiunea „Livrabile” a #25: integrarea propriu-zisă în GitHub
Actions (un job programat care rulează CLI-ul împotriva unei
previzualizări deployate, publică raportul JSON și badge-ul ca artefact,
și eșuează build-ul doar pe reguli `severity: error`) nu există încă —
doar piesele de care ar avea nevoie (`--format badge`, `renderBadgeSvg`).
Adăugarea unui workflow nou de CI e o decizie separată de infrastructură
(rulează recurent, consumă minute de Actions), nu doar cod de pachet —
tratată distinct de restul regulilor din acest fișier.
