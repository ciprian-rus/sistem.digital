# @sistem-digital/tokens

Design tokens canonice și teme funcționale pentru Sistem Digital, distribuite independent de framework.

## Arhitectură

Sursa de adevăr pentru token-uri este formatul stabil **DTCG 2025.10**, împărțit în trei straturi:

1. `core` — valori primitive, care nu se consumă direct în produsele finale;
2. `semantic` — roluri stabile folosite de teme, pagini și componente;
3. `component` — decizii locale care nu au sens global.

```text
tokens/
  manifest.json
  core.tokens.json
  semantic.tokens.json
  component.tokens.json
themes/
  manifest.json
  light.theme.json
  dark.theme.json
  high-contrast-light.theme.json
  high-contrast-dark.theme.json
  accents.json
```

Fișierele din `src/__generated__` și artefactele CSS/JSON sunt generate. Nu se editează manual.

## Instalare

```bash
pnpm add @sistem-digital/tokens
```

Pachetul publică entry points ESM și CommonJS, plus declarații TypeScript. Poate fi consumat în aplicații moderne, test runners Node și infrastructuri legacy.

## TypeScript

```ts
import {
  flatTokens,
  semanticTokens,
  themeNames,
  themes,
  tokenMetadata,
  tokens,
} from '@sistem-digital/tokens';

const pageBackground = tokens.semantic.color.surface.page;
const buttonHeight = tokens.component.button.minHeight;
const focusColor = flatTokens['semantic.color.focus.ring'];
const darkPage = themes.dark.roles['surface.page'];
```

Exportul nu depinde de React sau de alt framework.

## CSS

```css
@import '@sistem-digital/tokens/css';
@import '@sistem-digital/tokens/themes.css';

.service-page {
  max-width: var(--sd-layout-reading);
  color: var(--sd-color-text);
  background: var(--sd-color-surface-page);
}
```

Variabilele semantice includ:

```css
--sd-color-text
--sd-color-link
--sd-color-link-visited
--sd-color-action-primary-background
--sd-color-feedback-danger-background
--sd-color-focus
--sd-font-sans
--sd-space-4
--sd-radius-control
--sd-layout-content
```

Token-urile primitive și cele de componentă sunt publicate cu prefixele `core` și `component`.

## Teme oficiale

Pachetul publică patru teme cu același contract de 39 de roluri:

- `light`;
- `dark`;
- `high-contrast-light`;
- `high-contrast-dark`.

Tema se aplică pe elementul `html`:

```html
<html data-sd-theme="dark"></html>
```

Fără atribut, CSS folosește `prefers-color-scheme`. Pentru o preferință salvată fără flash vizual, scriptul de inițializare trebuie executat în `head`, înaintea stilurilor care consumă tema:

```html
<script src="/vendor/@sistem-digital/tokens/theme-init.js"></script>
<link rel="stylesheet" href="/vendor/@sistem-digital/tokens/tokens.css" />
<link rel="stylesheet" href="/vendor/@sistem-digital/tokens/themes.css" />
```

În aplicații cu bundler poate fi inclus inline:

```ts
import { themeInitScript } from '@sistem-digital/tokens';
```

Cheia de stocare este exportată prin `themeStorageKey`. Eliminarea ei revine la preferința sistemului de operare.

## Accente instituționale

Accentele aprobate sunt `blue`, `teal`, `burgundy` și `purple`:

```html
<html data-sd-theme="light" data-sd-accent="teal"></html>
```

Accentul modifică numai brandul și acțiunea principală. Nu modifică:

- linkurile;
- stările succes, avertizare, eroare și informație;
- focusul;
- culorile disabled;
- semantica sau comportamentul componentelor.

Un accent nou intră în pachet numai după validarea tuturor stărilor cu textul acțiunii. Pentru identități locale în afara preset-urilor, instituția trebuie să publice rezultatele contrastului și să păstreze rolurile protejate.

## Forced colors

`themes.css` include un strat `@media (forced-colors: active)` bazat pe culorile de sistem `Canvas`, `CanvasText`, `LinkText`, `VisitedText`, `ButtonFace`, `ButtonText`, `Highlight` și `GrayText`. Implementările nu trebuie să dezactiveze acest comportament prin `forced-color-adjust: none` decât pentru elemente strict justificate și testate manual.

## JSON rezolvat

```js
import resolved from '@sistem-digital/tokens/tokens.json' with { type: 'json' };
import themeData from '@sistem-digital/tokens/themes.json' with { type: 'json' };

console.log(resolved.tokens.semantic.color.text.default);
console.log(themeData.themes.dark.roles['text.default']);
```

Valorile JSON sunt rezolvate și ușor de consumat în generatoare, CMS-uri și alte limbaje.

## Sursa DTCG agregată

```js
import dtcg from '@sistem-digital/tokens/tokens.dtcg.json' with { type: 'json' };
```

Fișierele sursă individuale sunt disponibile și prin subpath-urile `source/*`.

## Generare și validare

```bash
pnpm --filter @sistem-digital/tokens tokens:generate
pnpm --filter @sistem-digital/tokens tokens:check
pnpm --filter @sistem-digital/tokens themes:generate
pnpm --filter @sistem-digital/tokens themes:check
```

Compilatoarele validează:

- numele și tipurile DTCG;
- aliasurile inexistente sau ciclice;
- compatibilitatea tipurilor între aliasuri;
- valori color, dimension, duration și fontFamily;
- coliziunile de nume CSS;
- contractul identic al temelor;
- toate perechile obligatorii de contrast pentru fiecare temă;
- contrastul stărilor fiecărui accent instituțional;
- consistența artefactelor generate.

Build-ul este determinist și nu include timestamp-uri.

## Reguli de naming

- numele sunt în engleză și `camelCase` sau chei numerice pentru scale;
- rolurile semantice descriu scopul, nu culoarea sau componenta;
- un token global nu include numele unei componente;
- token-urile de componentă există numai când decizia nu este reutilizabilă global;
- token-urile și grupurile nu folosesc `.`, `{`, `}` și nu încep cu `$`;
- API-ul CSS folosește kebab-case și prefixul `--sd-`.

## Schimbări incompatibile

Următoarele sunt breaking changes:

- redenumirea sau eliminarea unui token public;
- schimbarea tipului DTCG;
- schimbarea semanticii unui rol existent;
- eliminarea unui rol din contractul temelor;
- mutarea unui token între straturi dacă se schimbă calea publică;
- schimbarea unei variabile CSS publice;
- schimbarea formei exportului TypeScript sau JSON.

O valoare poate fi ajustată într-un release compatibil numai dacă rolul rămâne același și schimbarea trece testele de contrast și regresie. Deprecation folosește proprietatea DTCG `$deprecated`, documentație și o perioadă de migrare.

Pachetul se află în stadiu alpha. API-ul poate suferi schimbări incompatibile până la versiunea `1.0.0`, dar fiecare schimbare trebuie documentată prin Changeset.
