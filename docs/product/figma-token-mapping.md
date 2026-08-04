# Mapping-ul token-urilor către un kit Figma

## Scop și limită

Acest document specifică, exact, cum se traduce sursa canonică de token-uri
(`packages/tokens/src/tokens.dtcg.json` + `themes.json`) într-un kit Figma —
ca oricine cu acces la Figma să poată construi kitul fără decizii ad-hoc.

**Acest document nu este kitul Figma.** Construirea efectivă a fișierului
`.fig` rămâne un livrabil separat al [#22](https://github.com/ciprian-rus/sistem.digital/issues/22)
și necesită acces la Figma, indisponibil în mediul de dezvoltare al acestui
monorepo la data scrierii (atât `figma.com`, cât și `api.figma.com` sunt
blocate de politica de rețea a mediului — verificat direct, `CONNECT`
întoarce `403`). Acest document e livrabilul realist posibil fără acel
acces: mapping-ul, nu execuția lui.

Convenția de denumire a **componentelor** în Figma (identică, kebab-case, cu
`componentName` din catalogul versionat) este deja stabilită în
[`design-code-matrix-schema.md`](design-code-matrix-schema.md#identificator-comun-între-figma-și-cod)
și nu se repetă aici — acest document acoperă exclusiv **token-urile**
(culoare, tipografie, spațiere ș.a.), nu componentele.

## Sursa de adevăr nu se schimbă

DTCG (`tokens.dtcg.json`) rămâne sursa canonică, exact ca azi. Variabilele
Figma sunt **generate din** ea, nu invers — orice diferență constatată
între Figma și cod se rezolvă întotdeauna în favoarea DTCG. Acest principiu
e explicit și în scope-ul Epic G ([#145](https://github.com/ciprian-rus/sistem.digital/issues/145)),
care urmărește separat procesul de verificare a deviațiilor; acest document
pregătește terenul pentru el, fără să-l implementeze.

Modelul de referință e cel deja confirmat prin auditul comparativ (PR #99):
Figma (Tokens Studio) → JSON → Style Dictionary → CSS. Sistem Digital
inversează doar prima săgeată (JSON-ul e sursa, nu Figma), restul fluxului
e identic.

## Cele trei straturi devin trei colecții de variabile

Arhitectura pe trei straturi din [ADR 0002](../architecture/adr/0002-dtcg-design-token-architecture.md)
(`core` → `semantic` → `component`) se mapează 1:1 pe trei **colecții** de
variabile Figma, cu aceleași nume:

| Strat DTCG  | Colecție Figma | Conține                                                              |
| ----------- | -------------- | -------------------------------------------------------------------- |
| `core`      | `core`         | primitive fără semnificație de produs (paletă, scale brute)          |
| `semantic`  | `semantic`     | roluri cu sens („text implicit”, „suprafață”), aliasuri către `core` |
| `component` | `component`    | valori compuse per componentă (buton, input, panel, container)       |

Un token semantic care în DTCG este un alias către un token core
(de exemplu `semantic.color.brand.default` → `core.color.blue.600`) devine
în Figma o **alegere de variabilă** (variable alias), nu o valoare
duplicată — la fel cum aliasul funcționează în cod. Nu se copiază valori
hex între colecții.

## Denumire: `--sd-*` devine grupare cu `/`

Figma grupează variabilele după `/` din nume, afișat ca foldere în panoul
Variables. Regula de conversie, derivată direct din numele reale ale
proprietăților CSS generate (`packages/tokens/src/tokens.css`):

| Variabilă CSS (cod)                     | Nume variabilă Figma   |
| --------------------------------------- | ---------------------- |
| `--sd-color-blue-600` (core)            | `color/blue/600`       |
| `--sd-color-brand` (semantic, implicit) | `color/brand/default`  |
| `--sd-color-brand-strong`               | `color/brand/strong`   |
| `--sd-color-text`                       | `color/text/default`   |
| `--sd-component-button-min-height`      | `button/min-height`    |
| `--sd-component-input-padding-inline`   | `input/padding-inline` |

Sufixul „implicit”/fără sufix din CSS (`--sd-color-brand`, nu
`--sd-color-brand-default`) devine explicit `default` în Figma, fiindcă
Figma nu permite un nume de variabilă identic cu numele grupului care îl
conține.

## Tipuri de valori — și ce NU se mapează pe Variables

Figma Variables suportă patru tipuri: `Color`, `Number`, `String`,
`Boolean`. Mapping-ul per categorie DTCG:

| Categorie DTCG (`$type`)          | Tip variabilă Figma | Notă                                                           |
| --------------------------------- | ------------------- | -------------------------------------------------------------- |
| `color`                           | `Color`             | direct, din `$value.hex`                                       |
| `dimension` (spațiere, radius)    | `Number`            | valoarea `rem` × 16 (bază 16px) — vezi „Unități” mai jos       |
| `font.size` fără `clamp()`        | `Number`            | valoarea `rem` × 16                                            |
| `font.size` cu `clamp()`          | **nu se mapează**   | vezi „Tipografie fluidă” mai jos                               |
| `font.weight`                     | `Number`            | valoarea numerică (400, 600 ș.a.), nu string-ul                |
| `duration`                        | `Number`            | milisecunde, ca număr întreg                                   |
| `font.family`, `easing`, `shadow` | **nu se mapează**   | devin Text Styles / Effect Styles, nu Variables — vezi mai jos |

### Unități: rem → px

Token-urile de dimensiune sunt `rem` în DTCG (bază `16px`, nesuprascrisă de
proiect). Figma Variables de tip `Number` nu au unitate — convenția propusă
este ca fiecare variabilă `Number` derivată dintr-un `dimension` să
reprezinte valoarea în `px`, calculată `rem × 16`, cu conversia documentată
explicit lângă fiecare variabilă (descrierea din Figma poate conține
formula sursă, de exemplu „= 1rem, sursă: `core.dimension.space.4`”).

### Tipografie fluidă (`clamp()`)

Unele mărimi de font semantice (`--sd-font-size-body`,
`--sd-font-size-body-large`) folosesc `clamp()` pentru scalare fluidă între
un minim și un maxim, în funcție de lățimea ferestrei — o formulă pe care
Figma Variables nu o poate reprezenta (nu există un tip „fluid” nativ).
Recomandare: creează variabila cu valoarea **minimă** a lui `clamp()` (mai
sigură vizual, de multe ori identică cu inputul mobil), și adaugă o notă
explicită în descrierea variabilei că valoarea reală în producție e fluidă
— nu pretinde echivalență exactă cu CSS-ul.

### Font family, easing, shadow → Styles, nu Variables

Trei categorii nu au echivalent direct în Variables și trebuie create ca
**Styles** Figma (Text Styles / Effect Styles), populate manual din
valorile DTCG:

- `core.font.family.*` → parte din fiecare Text Style (Figma nu separă
  familia de font ca variabilă independentă de restul stilului tipografic);
- `core.easing.*` (curbe cubic-bezier) → nu au echivalent Figma nativ;
  documentează valoarea cubic-bezier în descrierea Effect Style-ului
  asociat unei tranziții, ca referință pentru prototipare manuală;
- `core.shadow.*` → Effect Styles (`Drop Shadow`), cu valorile de offset,
  blur și culoare citite direct din `$value` al fiecărui token.

## Moduri: temă și accent institutional, ca două colecții independente

Sistem Digital are **patru teme** (`light`, `dark`, `high-contrast-light`,
`high-contrast-dark`, din `themes.json`) și **patru accente instituționale**
(`blue`, `teal`, `burgundy`, `purple`) — două dimensiuni independente, cu
39 de roluri semantice rezolvate per temă și 3 valori per accent (implicit/
hover/activ).

Figma Variables suportă mai multe moduri per colecție. Mapping-ul propus:

- colecția `semantic` capătă **patru moduri**, numite identic cu numele
  temelor (`light`, `dark`, `high-contrast-light`, `high-contrast-dark`),
  cu valorile fiecărei variabile de culoare preluate direct din
  `themes.json → themes[].roles`;
- accentul instituțional (`themes.json → accents`) devine o **a doua
  colecție**, `accent`, cu patru moduri (`blue`, `teal`, `burgundy`,
  `purple`) — separată de `semantic`, fiindcă în cod cele două se rezolvă
  independent (`themeStorageKey` vs. selecția de accent), nu ca produs
  cartezian într-un singur token.

Rezultatul: un designer schimbă modul colecției `semantic` pentru a
previzualiza tema, și modul colecției `accent` pentru a previzualiza
personalizarea instituțională — fără să dubleze 16 variante complete.

## Straturi component: scop local, nu global

Cele patru grupuri din `component` (`button`, `input`, `panel`,
`container`) rămân variabile Figma scoped la componentele corespunzătoare
din kit, nu variabile globale — la fel cum, în cod, ele nu sunt niciodată
consumate direct de alte componente decât cea care le declară.

## Proces de actualizare (manual, până la Epic G)

1. La orice modificare a `tokens.dtcg.json` sau `themes.json`, verifică
   diff-ul (`pnpm --filter @sistem-digital/tokens tokens:check`) pentru
   token-uri adăugate, redenumite sau eliminate.
2. Aplică aceleași modificări manual în colecțiile Figma, urmând regulile
   de denumire de mai sus.
3. Notează versiunea sincronizată (din `packages/tokens/package.json`) în
   descrierea fișierului Figma — nu există azi un mecanism automat de
   verificare a acestei sincronizări (vezi Epic G, [#145](https://github.com/ciprian-rus/sistem.digital/issues/145),
   pentru planul viitor).

Acest proces manual e temporar și explicit inferior unei sincronizări
automate (Tokens Studio → JSON → import direct) — dar e singurul realist
înainte ca kitul însuși să existe și să poată fi testat împotriva unui
plugin real.
