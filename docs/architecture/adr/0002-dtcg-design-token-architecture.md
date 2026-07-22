# ADR 0002 — Arhitectura design tokens compatibilă DTCG

## Statut

Propus pentru M1.

## Context

Pachetul inițial `@sistem-digital/tokens` menținea manual aceleași valori în TypeScript, CSS și JSON. Acest model produce risc de divergență, nu oferă aliasuri verificabile și leagă evoluția token-urilor de forma exporturilor curente.

Sistem Digital trebuie să furnizeze token-uri:

- independente de framework;
- interoperabile cu instrumente de design și transformare;
- versionate și verificabile;
- tematizabile fără schimbarea semanticii;
- consumabile din CSS, TypeScript, JSON și sisteme legacy;
- validate pentru accesibilitate și compatibilitate.

Design Tokens Community Group a publicat în octombrie 2025 versiunea stabilă 2025.10 a Format Module și Color Module.

## Decizie

Sursa canonică folosește DTCG 2025.10 și este împărțită în fișiere ordonate de `tokens/manifest.json`:

```text
packages/tokens/tokens/
  manifest.json
  core.tokens.json
  semantic.tokens.json
  component.tokens.json
```

Un compilator propriu, fără dependențe runtime externe, validează și generează:

```text
src/__generated__/tokens.ts
src/tokens.css
src/tokens.json
src/tokens.dtcg.json
dist/metadata.json
```

Artefactele generate nu sunt editate manual.

## Straturi

### Core

Conține primitive fără semnificație de produs:

- palete cromatice;
- scale de spațiere;
- dimensiuni;
- familii de font;
- durate;
- valori de radius și stroke.

Primitivele sunt disponibile pentru extensii și generatoare, dar componentele oficiale trebuie să consume în primul rând roluri semantice.

### Semantic

Conține roluri stabile:

- text, link, surface și border;
- feedback și focus;
- spațiere, layout și target size;
- motion și font family.

Temele modifică valorile asociate acestor roluri, nu numele și sensul rolurilor.

### Component

Conține decizii locale unei componente atunci când nu există un rol global legitim:

- `component.button.minHeight`;
- `component.input.borderWidth`;
- `component.panel.padding`.

Un token nu este mutat în stratul component doar pentru comoditatea implementării.

## Aliasuri

Aliasurile folosesc sintaxa DTCG cu acolade:

```json
{
  "$value": "{semantic.space.6}"
}
```

Compilatorul:

- verifică existența țintei;
- detectează ciclurile;
- păstrează tipul;
- respinge schimbarea tipului prin alias;
- rezolvă aliasurile în exporturile CSS, JSON și TypeScript;
- păstrează aliasurile în exportul DTCG.

Este acceptată și rezolvarea locală prin JSON Pointer `$ref` pentru cazurile avansate prevăzute de specificație.

## Tipuri inițiale

Compilatorul acceptă inițial:

- `color`;
- `dimension`;
- `duration`;
- `fontFamily`;
- `number`;
- `string`.

Alte tipuri DTCG sunt adăugate numai odată cu o nevoie reală și teste aferente.

Culorile folosesc obiectul DTCG cu `colorSpace`, `components`, `alpha` opțional și fallback `hex` opțional. Hex string-ul singur nu este sursă DTCG validă pentru noile token-uri.

## Naming

- numele canonice sunt în engleză;
- grupurile și token-urile folosesc `camelCase`, cu excepția cheilor numerice ale scalelor;
- numele nu încep cu `$` și nu conțin `.`, `{` sau `}`;
- un rol global descrie scopul, nu valoarea: `semantic.color.text.muted`, nu `gray-700`;
- un token de componentă include numele componentei numai când decizia nu poate fi exprimată global;
- variabilele CSS sunt transformate în kebab-case și folosesc prefixul `--sd-`.

## Compatibilitate CSS

Compilatorul păstrează variabilele publice folosite deja de website:

```css
--sd-color-text
--sd-color-link
--sd-color-focus
--sd-font-sans
--sd-space-4
--sd-radius-control
--sd-layout-content
```

Primitivele și token-urile de componentă folosesc prefixe explicite:

```css
--sd-core-color-blue-900
--sd-component-button-min-height
```

O coliziune între două căi canonice și aceeași variabilă CSS blochează build-ul.

## Exporturi

### TypeScript

Pachetul exportă:

- `tokens` — toate straturile;
- `coreTokens`;
- `semanticTokens`;
- `componentTokens`;
- `flatTokens`;
- `tokenMetadata`;
- tipurile `DesignTokens` și `TokenPath`.

### CSS

Toate token-urile compatibile CSS sunt publicate ca custom properties.

### JSON rezolvat

Conține valori simple și complet rezolvate pentru CMS-uri, generatoare și alte limbaje.

### DTCG agregat

Conține documentul canonic agregat, cu aliasuri, tipuri și metadata.

### Surse individuale

Fișierele stratificate sunt publicate prin subpath-uri `source/*`.

## Determinism

Build-ul:

- sortează căile token-urilor;
- nu include timestamp-uri;
- calculează SHA-256 pentru manifest și surse;
- publică numărul de token-uri și aliasuri;
- compară artefactele generate cu repository-ul prin `tokens:check`;
- folosește aceeași sursă pentru toate platformele.

Aceleași surse și aceeași versiune a compilatorului trebuie să producă aceiași bytes.

## Contrast

`manifest.json` declară perechi obligatorii de foreground/background și pragul minim. Build-ul calculează contrastul sRGB și eșuează dacă o pereche nu respectă pragul.

Această verificare nu înlocuiește testarea tuturor stărilor și temelor din issue #10.

## Deprecation și breaking changes

Proprietatea DTCG `$deprecated` marchează token-urile aflate în retragere.

Sunt breaking changes:

- eliminarea sau redenumirea unui token public;
- schimbarea tipului;
- schimbarea sensului semantic;
- schimbarea căii publice;
- schimbarea numelui unei custom property;
- schimbarea formei exporturilor TypeScript sau JSON.

Schimbarea unei valori poate fi compatibilă dacă rolul nu se schimbă, nu produce regresii și trece testele de contrast, accesibilitate și vizuale.

Înaintea eliminării:

1. token-ul este marcat deprecated;
2. se publică alternativa;
3. se oferă migration guidance;
4. eliminarea are loc într-un release major, cu excepția unei vulnerabilități active.

## Alternative evaluate

### Menținerea manuală a CSS, JSON și TypeScript

Respinsă din cauza divergenței și lipsei unei surse canonice.

### Style Dictionary ca sursă arhitecturală

Poate fi adăugat ulterior ca adaptor, dar nu devine formatul canonic. Proiectul păstrează sursele DTCG vendor-neutral și un compilator minimal auditabil.

### Token-uri numai în TypeScript

Respins deoarece ar exclude CMS-uri, sisteme legacy și instrumente de design.

### Token-uri numai CSS

Respins deoarece CSS nu păstrează suficient tipurile, aliasurile și metadata necesare transformării multi-platformă.

## Consecințe

### Pozitive

- o singură sursă de adevăr;
- exporturi framework-agnostic;
- teme și aliasuri verificabile;
- compatibilitate cu standardul DTCG;
- build auditabil și determinist;
- validare de contrast integrată;
- migrare controlată.

### Costuri

- compilatorul trebuie întreținut și testat;
- artefactele generate trebuie sincronizate;
- tipurile DTCG suplimentare necesită implementare explicită;
- consumatorii alpha trebuie să migreze la structura pe straturi.

## Urmări

- issue #10 definește temele și matricea completă de contrast;
- issue #11 extinde tipografia, grila, focusul și motion;
- pachetele de componente vor consuma roluri semantice;
- validatorul viitor va putea identifica versiunea, formatul și source hash-ul token-urilor.
