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
- `sd-a11y-contrast` — verificarea raportului de contrast WCAG pentru
  perechi text/fundal furnizate explicit (algoritm identic cu
  `packages/tokens/scripts/build-themes.mjs`), disponibilă ca funcție de
  bibliotecă, nu încă parte a CLI-ului (nu poate fi derivată automat doar
  dintr-un URL).
- formatul de raport JSON și un randator HTML minimal, ambele fără scor
  agregat unic (vezi principiul „nu se pretinde conformare completă”).

Restul regulilor din inventar (linkuri defecte, performanță, versiunea
pachetelor ș.a.) rămân neimplementate.

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
```

## Utilizare ca bibliotecă

```ts
import { buildReport, checkAccessibility, checkContrast } from '@sistem-digital/validator';

const accessibility = await checkAccessibility('https://exemplu-institutie.ro');
const contrast = checkContrast([
  { id: 'text/page', foreground: '#17202a', background: '#ffffff', required: 4.5 },
]);
const report = buildReport('https://exemplu-institutie.ro', [accessibility, contrast]);
```

## Teste

Testele pentru `sd-a11y-axe-wcag` rulează integral doar când un executabil
Chromium e disponibil (verificat automat la `/opt/pw-browsers/chromium` sau
prin `SISTEM_DIGITAL_VALIDATOR_CHROMIUM`) — altfel se omit cu un mesaj
explicit. Testele pentru `sd-a11y-contrast` și formatul de raport rulează
mereu (logică pură, fără browser).
