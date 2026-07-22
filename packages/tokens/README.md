# @sistem-digital/tokens

Design tokens canonice pentru Sistem Digital, distribuite independent de framework.

## Arhitectură

Sursa de adevăr este formatul stabil **DTCG 2025.10**, împărțit în trei straturi:

1. `core` — valori primitive, care nu se consumă direct în produsele finale;
2. `semantic` — roluri stabile folosite de teme, pagini și componente;
3. `component` — decizii locale care nu au sens global.

```text
tokens/
  manifest.json
  core.tokens.json
  semantic.tokens.json
  component.tokens.json
```

Fișierele din `src/__generated__`, `src/tokens.css`, `src/tokens.json` și `src/tokens.dtcg.json` sunt generate. Nu se editează manual.

## Instalare

```bash
pnpm add @sistem-digital/tokens
```

## TypeScript

```ts
import {
  flatTokens,
  semanticTokens,
  tokenMetadata,
  tokens,
} from '@sistem-digital/tokens';

const pageBackground = tokens.semantic.color.surface.page;
const buttonHeight = tokens.component.button.minHeight;
const focusColor = flatTokens['semantic.color.focus.ring'];
```

Exportul nu depinde de React sau de alt framework.

## CSS

```css
@import '@sistem-digital/tokens/css';

.service-page {
  max-width: var(--sd-layout-reading);
  color: var(--sd-color-text);
  background: var(--sd-color-surface-page);
}
```

Variabilele semantice existente sunt păstrate, inclusiv:

```css
--sd-color-text
--sd-color-link
--sd-color-focus
--sd-font-sans
--sd-space-4
--sd-radius-control
--sd-layout-content
```

Token-urile primitive și cele de componentă sunt publicate cu prefixele `core` și `component`.

## JSON rezolvat

```js
import resolved from '@sistem-digital/tokens/tokens.json' with { type: 'json' };

console.log(resolved.tokens.semantic.color.text.default);
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
```

Compilatorul validează:

- numele și tipurile DTCG;
- aliasurile inexistente sau ciclice;
- compatibilitatea tipurilor între aliasuri;
- valori color, dimension, duration și fontFamily;
- coliziunile de nume CSS;
- perechile obligatorii de contrast;
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
- mutarea unui token între straturi dacă se schimbă calea publică;
- schimbarea unei variabile CSS publice;
- schimbarea formei exportului TypeScript sau JSON.

O valoare poate fi ajustată într-un release compatibil numai dacă rolul rămâne același și schimbarea trece testele de contrast și regresie. Deprecation folosește proprietatea DTCG `$deprecated`, documentație și o perioadă de migrare.

Pachetul se află în stadiu alpha. API-ul poate suferi schimbări incompatibile până la versiunea `1.0.0`, dar fiecare schimbare trebuie documentată prin Changeset.
