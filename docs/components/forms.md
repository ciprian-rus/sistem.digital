# Formulare, validare și mesaje de eroare

**Stadiu:** alpha · **Pachet:** `@sistem-digital/components` · **CSS:** `forms.css`

## Nevoia utilizatorului

Formularele trebuie să permită unei persoane să înțeleagă ce informație este solicitată, de ce este necesară, cum trebuie completată și ce trebuie corectat după validare.

## Folosește aceste componente când

- colectezi date într-un serviciu public;
- ai nevoie de validare pe server și păstrarea valorilor introduse;
- utilizatorul trebuie să aleagă una sau mai multe opțiuni;
- sunt necesare documente justificative;
- trebuie prezentate erori la nivel de câmp și un rezumat general.

## Nu le folosi când

- informația poate fi verificată direct la sursă și nu trebuie cerută din nou;
- un câmp există doar pentru comoditatea structurii interne a instituției;
- utilizatorul nu poate explica sau controla valoarea solicitată;
- o alegere poate fi eliminată printr-o valoare implicită sigură și transparentă.

## Anatomie

Un câmp standard conține, în această ordine:

1. label;
2. informația opțional/obligatoriu, când este necesară;
3. hint;
4. mesajul de eroare, numai după validare;
5. controlul nativ.

Label-ul este obligatoriu și vizibil. Placeholder-ul nu înlocuiește label-ul.

## Asociere programatică

- `for` și `id` asociază label-ul cu controlul;
- hint-ul și eroarea au ID-uri stabile;
- `aria-describedby` include hint-ul înaintea erorii;
- `aria-invalid="true"` apare numai după validare;
- fieldset și legend grupează checkbox-uri și radio-uri cu aceeași întrebare;
- `autocomplete` folosește valorile standard când se colectează date personale.

## Validare

Validarea canonică este pe server. JavaScript poate oferi feedback timpuriu, dar nu devine singura cale de validare și nu modifică regulile de business.

După un răspuns invalid:

- valorile introduse sunt păstrate, cu excepția câmpurilor sensibile;
- rezumatul erorilor apare înaintea formularului;
- fiecare eroare are un link către câmp;
- fiecare câmp invalid are un mesaj propriu;
- mesajul descrie remedierea, nu doar faptul că valoarea este invalidă.

## Error summary

Rezumatul nu înlocuiește mesajele câmpurilor. El oferă o vedere de ansamblu și o cale rapidă de navigare.

```html
<div
  class="sd-error-summary"
  data-sd-error-summary
  aria-labelledby="error-summary-title"
  tabindex="-1"
>
  <h2 class="sd-error-summary__title" id="error-summary-title">
    Sunt două probleme de rezolvat
  </h2>
  <ul class="sd-error-summary__list">
    <li><a href="#email">Introdu adresa de e-mail</a></li>
    <li><a href="#service-type">Alege tipul serviciului</a></li>
  </ul>
</div>
```

Helperul `focusErrorSummary()` este opțional. Markup-ul și linkurile rămân funcționale fără JavaScript.

## Input, textarea și select

- folosește tipul HTML potrivit: `email`, `tel`, `date`, `number` numai când semantica este corectă;
- pentru coduri poștale, CNP-uri, CUI-uri sau numere cu zerouri inițiale folosește text plus `inputmode`, nu `type="number"`;
- textarea este redimensionabilă vertical;
- select se folosește pentru liste stabile și relativ scurte;
- pentru liste mari sau căutabile va exista un pattern separat, testat cu tehnologii asistive.

## Checkbox și radio

Se folosesc controale native:

- radio pentru o singură alegere;
- checkbox pentru zero, una sau mai multe alegeri;
- fiecare target are minimum 44 CSS px;
- textul opțiunii este inclus în label;
- hint-ul opțiunii poate fi în același label;
- opțiunile nu sunt selectate implicit când alegerea are consecințe juridice sau financiare.

## File upload

Versiunea alpha folosește controlul nativ. Documentația trebuie să precizeze:

- formatele acceptate;
- dimensiunea maximă;
- motivul solicitării fișierului;
- alternativele pentru persoanele care nu pot furniza documentul digital;
- comportamentul la scanare antivirus și la eroare.

Nu se ascunde controlul nativ în spatele unui element neoperabil cu tastatura.

## Disabled și readonly

| Stare | Poate primi focus | Este transmisă | Utilizare |
|---|---:|---:|---|
| `readonly` | da | da | valoare vizibilă, dar nemodificabilă |
| `disabled` | nu | nu | control indisponibil în etapa curentă |

Pentru informații pe care utilizatorul trebuie să le copieze sau să le înțeleagă, preferă text simplu ori readonly în loc de disabled.

## Butoane

- un formular are o acțiune principală clară;
- acțiunile secundare nu concurează vizual cu cea principală;
- textul descrie rezultatul: „Trimite cererea”, nu „OK”;
- un link nu este stilizat ca buton când navigarea este comportamentul corect;
- disabled se folosește rar; este preferabil ca utilizatorul să poată încerca și să primească explicații.

## Conținutul erorilor

### Corect

- „Introdu o adresă în formatul nume@exemplu.ro”
- „Alege tipul serviciului”
- „Data începerii trebuie să fie după 1 ianuarie 2025”

### Incorect

- „Valoare invalidă”
- „Câmp obligatoriu” fără numele sau contextul câmpului
- „Ai greșit adresa”
- „Eroare 1042”

## Accesibilitate

Testarea minimă include:

- keyboard-only;
- NVDA + Firefox și JAWS + Chrome pe Windows;
- VoiceOver + Safari pe macOS/iOS;
- TalkBack + Chrome pe Android;
- zoom 200% și 400%;
- 320 CSS px fără scroll orizontal global;
- light, dark, high-contrast și forced colors;
- mesaje anunțate în ordinea corectă;
- target size și focus vizibil.

Axe și testele Playwright reduc regresiile, dar nu înlocuiesc testarea manuală cu screen reader.

## Pagina demonstrativă

Implementarea de referință este disponibilă la `/componente/formulare` pe platforma Sistem Digital. Pagina conține exemple valide, invalide, disabled, readonly, upload, alegeri native și error summary.

## Probleme cunoscute înainte de stabilizare

- testarea manuală completă pe matricea de tehnologii asistive este încă necesară;
- regresia vizuală cu baseline aprobat va fi integrată prin issue #16;
- upload multiplu, autocomplete complex și date picker sunt în afara acestei versiuni;
- validarea asincronă este un pattern separat și nu intră în helperul actual.
