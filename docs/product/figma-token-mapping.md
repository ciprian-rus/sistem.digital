# Mapping-ul token-urilor către un kit Figma

## Status — actualizare

Fișierul Figma există acum: **„Sistem Digital — Design System"**
(`https://www.figma.com/design/oDysCLx6dhwPIa2satziNh`), construit prin
serverul MCP Figma — un canal separat de `figma.com`/`api.figma.com`
directe, care rămân blocate de politica de rețea a mediului de dezvoltare.
Conține variabilele (straturile `core`, `semantic`, `component`, plus
culorile pe cele patru teme și accentele instituționale — vezi secțiunile
de mai jos pentru numărul exact). Stilurile de text și Effect Styles
(umbre) rămân nelivrate — sesiunea MCP s-a întrerupt înainte de acel pas,
neterminat la data acestei actualizări.

**Abatere reală față de planul de mai jos, descoperită la construire**:
planul Figma disponibil la construire limitează o colecție de variabile la
**un singur mod** (`"Limited to 1 modes only"`), nu la patru cum presupune
secțiunea „Moduri" mai jos. Adaptare aplicată: în loc de o colecție
`semantic` cu patru moduri de temă, există patru colecții separate,
`color-light`/`color-dark`/`color-high-contrast-light`/`color-high-contrast-dark`,
fiecare cu un singur mod și aceleași 39 de roluri. La fel pentru accent:
patru colecții `accent-blue`/`accent-teal`/`accent-burgundy`/`accent-purple`,
nu o colecție `accent` cu patru moduri.

Această adaptare **nu e echivalentă funcțional** cu moduri multiple, doar
similară ca organizare a valorilor. Diferența contează pentru fluxul de
lucru al unui designer: cu moduri multiple reale,
`setExplicitVariableModeForCollection` re-rezolvă dintr-o dată _toate_
proprietățile legate de colecția respectivă, pentru orice frame — un
singur switch schimbă tema peste tot. Cu colecții separate, o proprietate
legată de exemplu de `color-light/text/default` rămâne legată de acea
variabilă specifică; nu „comută" automat spre `color-dark/text/default`
doar fiindcă altă colecție e selectată undeva — schimbarea temei pe un
frame construit așa necesită **relegarea manuală** a fiecărei proprietăți
către variabila din cealaltă colecție (secțiunea „Moduri" de mai jos
descrie exact acest flux). Dacă un plan cu mai multe moduri devine
disponibil, colecțiile pot fi consolidate fără să schimbe vreo valoare —
dar până atunci, „Moduri" de mai jos nu descrie un mode-switch, ci un
proces de relegare manuală.

## Scop și limită

Acest document specifică, exact, cum se traduce sursa canonică de token-uri
(`packages/tokens/src/tokens.dtcg.json` + `themes.json`) într-un kit Figma —
ca oricine cu acces la Figma să poată construi kitul fără decizii ad-hoc.

**Acest document nu este kitul Figma** — vezi „Status" mai sus pentru
fișierul real. Rămâne, totuși, sursa de adevăr pentru convențiile de
denumire și conversie folosite la construirea lui, inclusiv pentru munca
neterminată (stiluri de text, Effect Styles) sau viitoare (Epic G,
[#145](https://github.com/ciprian-rus/sistem.digital/issues/145)).

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
pregătește terenul pentru el, fără să-l implementeze — planul tehnic
propriu-zis e documentat în
[`docs/architecture/figma-token-sync.md`](../architecture/figma-token-sync.md).

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

## Moduri: temă și accent instituțional

Sistem Digital are **patru teme** (`light`, `dark`, `high-contrast-light`,
`high-contrast-dark`, din `themes.json`) și **patru accente instituționale**
(`blue`, `teal`, `burgundy`, `purple`) — două dimensiuni independente, cu
39 de roluri semantice rezolvate per temă și 3 valori per accent (implicit/
hover/activ).

### Plan inițial (multi-mod) — neconstruit, din cauza limitei de plan Figma

Figma Variables suportă, în principiu, mai multe moduri per colecție.
Mapping-ul propus inițial, înainte de a descoperi limita de plan (vezi
„Status" de la începutul documentului):

- colecția `semantic` ar fi căpătat **patru moduri**, numite identic cu
  numele temelor (`light`, `dark`, `high-contrast-light`,
  `high-contrast-dark`), cu valorile fiecărei variabile de culoare preluate
  direct din `themes.json → themes[].roles`;
- accentul instituțional (`themes.json → accents`) ar fi devenit o **a
  doua colecție**, `accent`, cu patru moduri (`blue`, `teal`, `burgundy`,
  `purple`) — separată de `semantic`, fiindcă în cod cele două se rezolvă
  independent (`themeStorageKey` vs. selecția de accent), nu ca produs
  cartezian într-un singur token.

Cu acest plan, un designer ar fi schimbat modul colecției `semantic`
pentru a previzualiza tema, și modul colecției `accent` pentru a
previzualiza personalizarea instituțională, fără să dubleze 16 variante
complete — dar **acest plan nu e ce există azi** în fișierul Figma real.

### Ce există azi: colecții separate, relegare manuală

Fișierul Figma actual are, în loc de `semantic` cu patru moduri, patru
colecții cu un singur mod fiecare (`color-light`, `color-dark`,
`color-high-contrast-light`, `color-high-contrast-dark`) — și, în loc de
`accent` cu patru moduri, patru colecții (`accent-blue`, `accent-teal`,
`accent-burgundy`, `accent-purple`).

Nu există un „switch" de temă. Pentru un designer care lucrează azi în
fișier, previzualizarea unei alte teme pe un frame construit înseamnă:

1. selectează proprietatea (fill, stroke, text) legată de o variabilă din
   `color-light`;
2. în panoul de legare a variabilei, alege manual variabila cu același
   nume din colecția temei dorite (de exemplu `color-dark/text/default`
   în loc de `color-light/text/default`);
3. repetă pentru fiecare proprietate afectată — nu există o acțiune unică,
   la nivel de frame sau document, care să re-rezolve toate legăturile
   dintr-o dată, așa cum ar face `setExplicitVariableModeForCollection`
   pentru moduri reale.

Practic, kitul documentează azi valorile corecte per temă și per accent,
dar nu oferă fluxul rapid de previzualizare pe care moduri multiple l-ar
fi permis. Dacă planul Figma disponibil permite în viitor mai multe moduri
per colecție, colecțiile separate pot fi consolidate (fără să schimbe
nicio valoare), iar acest flux manual dispare.

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
   verificare a acestei sincronizări (vezi
   [`docs/architecture/figma-token-sync.md`](../architecture/figma-token-sync.md)
   pentru planul tehnic, care așteaptă publicarea kitului din #22 pentru a
   putea fi implementat).

Acest proces manual e temporar și explicit inferior unei sincronizări
automate (Tokens Studio → JSON → import direct) — dar e singurul realist
înainte ca kitul însuși să existe și să poată fi testat împotriva unui
plugin real.
