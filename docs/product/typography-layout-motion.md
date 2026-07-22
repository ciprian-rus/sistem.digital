# Tipografie, spațiere, layout, focus și motion

Acest document definește contractul structural al Sistem Digital. Regulile sunt normative pentru platforma de documentație, componentele oficiale și serviciile demonstrative.

## Obiective

Fundamentele trebuie să asigure simultan:

- lizibilitate în limba română, inclusiv diacritice și texte administrative lungi;
- reflow fără pierdere de conținut la zoom 200% și 400%;
- utilizare completă cu tastatura;
- target-uri interactive suficient de mari;
- mișcare redusă atunci când utilizatorul o solicită;
- layout-uri previzibile, fără breakpoints dependente de dispozitive;
- comportament coerent în print și în modurile de contrast forțat.

## Tipografie

### Font stack

Stack-ul oficial începe cu `Fira Sans`, apoi `Noto Sans`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial` și `sans-serif`.

Sistem Digital nu descarcă implicit fonturi de la un serviciu terț. O instituție poate self-hosta Fira Sans sau Noto Sans, dar interfața trebuie să funcționeze complet cu fallback-urile de sistem. Schimbarea fontului nu poate modifica ierarhia, dimensiunile minime sau măsura textului.

Pentru cod și identificatori tehnici se folosește stack-ul monospace publicat prin `--sd-font-mono`.

### Scară fluidă

Dimensiunile principale sunt publicate ca formule `clamp()`:

| Rol | Variabilă CSS | Utilizare |
|---|---|---|
| Caption | `--sd-font-size-caption` | metadate, etichete secundare |
| Body small | `--sd-font-size-body-small` | note scurte, cu prudență |
| Body | `--sd-font-size-body` | text curent |
| Body large | `--sd-font-size-body-large` | lead și explicații introductive |
| Heading small | `--sd-font-size-heading-small` | titluri locale |
| Heading medium | `--sd-font-size-heading-medium` | secțiuni secundare |
| Heading large | `--sd-font-size-heading-large` | secțiuni principale |
| Display | `--sd-font-size-display` | titlu principal, maximum unul pe pagină |

Textul curent nu coboară sub `1rem`. Dimensiunea nu se fixează în pixeli și nu se blochează zoom-ul browserului.

### Line-height și măsură

- text curent: `1.6`;
- heading: `1.2`;
- display: `1.05`;
- control: `1.25`;
- măsura implicită: `66ch`;
- măsura îngustă: `45ch`;
- măsura largă: `80ch`, numai pentru conținut specializat.

Pentru texte administrative lungi, `66ch` este plafonul implicit. Tabelele, codul și identificatorii pot folosi scroll intern, dar pagina nu trebuie să producă scroll orizontal global.

### Greutăți

Sunt disponibile 400, 500, 600, 700 și 800. Greutatea nu este singurul semnal pentru ierarhie sau stare. Textul body rămâne 400; controalele folosesc în mod normal 600; titlurile folosesc 700 sau 800.

## Spațiere și densitate

Scara pornește de la 4 px și este publicată între `--sd-space-0` și `--sd-space-24`.

Reguli:

- distanța dintre label și control: `--sd-space-2`;
- distanța dintre grupuri de câmpuri: minimum `--sd-space-6`;
- padding de control: minimum `--sd-space-3`;
- padding de panou: minimum `--sd-space-6`;
- spațiul vertical dintre secțiuni nu se obține prin `<br>` repetat;
- densitatea redusă nu poate micșora target-ul sub 44 CSS px.

## Containere și măsură

- conținut standard: `75rem`;
- conținut larg: `90rem`;
- conținut de lectură: `46rem`;
- gutter implicit: `clamp(1rem, 3vw, 2rem)`.

Containerul include gutter-ul în lățimea sa. Copiii grid trebuie să aibă `min-width: 0` pentru a preveni overflow-ul provocat de conținut lung.

## Grid și breakpoints

Grila conceptuală are:

- 4 coloane în context compact;
- 8 coloane în context mediu;
- 12 coloane în context larg.

Breakpoints:

| Nume | Valoare |
|---|---:|
| Compact | `30rem` |
| Medium | `48rem` |
| Wide | `64rem` |
| Maximum | `80rem` |

Breakpoints sunt exprimate în `rem`, nu în pixeli și nu reprezintă modele de telefon sau tabletă. Componentele trebuie să răspundă la spațiul disponibil, preferabil prin grid flexibil, `minmax()` și container queries când acestea aduc valoare.

## Reflow și zoom

Ținta este WCAG 2.2, criteriul 1.4.10 Reflow:

- la o lățime echivalentă cu 320 CSS px nu se pierde informație sau funcționalitate;
- nu apare scroll orizontal la nivel de pagină;
- sunt permise excepții pentru conținut care necesită două dimensiuni, precum hărți, diagrame și tabele complexe;
- excepțiile trebuie să aibă scroll local, focusabil și etichetat.

CI testează 640 px ca aproximare pentru zoom 200% și 320 px pentru zoom 400% pornind de la un viewport de 1280 px. Validarea manuală în browser rămâne obligatorie înaintea stabilizării unei componente.

## Target size

Controalele interactive au minimum `2.75rem` — 44 CSS px la dimensiunea implicită a fontului.

Target-ul include zona activă, nu doar iconul vizibil. Linkurile inline dintr-un paragraf sunt exceptate, dar trebuie să aibă focus clar și spațiere suficientă față de alte linkuri.

## Focus

Tratamentul comun are trei straturi:

1. outline de `0.25rem` în culoarea `focus.ring`;
2. offset de `0.1875rem`;
3. halo de `0.125rem` în culoarea `focus.contrast`.

Focusul trebuie să fie vizibil pe suprafețe luminoase, întunecate, în teme high-contrast și în forced colors. Nu se folosește `outline: none` fără o înlocuire echivalentă testată.

Ordinea de focus urmează ordinea DOM. `tabindex` pozitiv este interzis. Skip link-ul folosește cel mai înalt nivel z-index publicat.

## Motion

Durate:

- instant: `0ms`;
- fast: `100ms`;
- moderate: `200ms`;
- slow: `350ms`.

Motion trebuie să explice o schimbare de stare, o relație spațială sau rezultatul unei acțiuni. Nu este folosit pentru decor continuu, pentru a întârzia accesul la conținut sau ca unic semnal de succes/eroare.

La `prefers-reduced-motion: reduce`:

- smooth scrolling este dezactivat;
- animațiile rulează cel mult o iterație și aproape instantaneu;
- transformările decorative sunt eliminate;
- informația și starea finală rămân identice.

## Elevation și z-index

Elevation are trei niveluri: low, medium și high. Umbra nu indică singură ordinea sau starea; componentele păstrează borduri și structură semantică.

Z-index este un contract, nu o competiție cu numere arbitrare:

| Nivel | Valoare | Utilizare |
|---|---:|---|
| Base | 0 | conținut normal |
| Raised | 10 | elemente locale ridicate |
| Sticky | 100 | header sau acțiune sticky |
| Overlay | 1000 | backdrop și popover global |
| Modal | 1100 | dialog modal |
| Toast | 1200 | notificare temporară |
| Skip link | 1300 | acces imediat cu tastatura |

O componentă nu inventează un z-index în afara acestei scale fără RFC.

## Print

Print styles trebuie să:

- păstreze titlul, conținutul și informația de stare;
- elimine navigația și controalele fără valoare pe hârtie;
- folosească fundal alb și text negru;
- evite împărțirea cardurilor și mesajelor între pagini;
- afișeze destinația linkurilor externe când este utilă;
- nu depindă de culoare sau umbre.

## Exemple

### Corect

```css
.service-intro {
  max-width: var(--sd-layout-measure);
  font-size: var(--sd-font-size-body-large);
  line-height: var(--sd-font-line-height-body);
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: var(--sd-grid-gap);
}
```

### Anti-pattern-uri

```css
/* Interzis: text fix, prea mic și imposibil de mărit coerent. */
.help-text {
  font-size: 12px;
  line-height: 14px;
}

/* Interzis: breakpoint asociat unui dispozitiv. */
@media (width: 375px) {
  /* iPhone */
}

/* Interzis: eliminarea focusului. */
button:focus {
  outline: none;
}

/* Interzis: număr z-index arbitrar. */
.modal {
  z-index: 999999;
}
```

## Verificare minimă

Fiecare componentă trebuie verificată pentru:

- 320, 640, 1024 și 1440 CSS px;
- zoom 200% și 400%;
- keyboard-only și focus order;
- target size;
- light, dark, high-contrast și forced colors;
- `prefers-reduced-motion`;
- print preview;
- texte lungi, traduceri și identificatori fără spații.
