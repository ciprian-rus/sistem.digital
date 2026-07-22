# Teme, culoare semantică și personalizare instituțională

## Scop

Acest document definește modul în care Sistem Digital folosește culoarea, construiește teme și permite personalizarea instituțională fără a modifica sensul, comportamentul sau accesibilitatea serviciilor.

Tema nu este o colecție de culori decorative. Este o mapare completă și verificată a acelorași roluri semantice în condiții vizuale diferite.

## Teme oficiale

Sistem Digital publică patru teme oficiale:

| Temă | Utilizare principală | `color-scheme` |
|---|---|---|
| `light` | tema implicită pentru conținut și servicii | `light` |
| `dark` | utilizare în lumină redusă sau preferință personală | `dark` |
| `high-contrast-light` | contrast maxim pe suprafață luminoasă | `light` |
| `high-contrast-dark` | contrast maxim pe suprafață întunecată | `dark` |

Toate temele implementează același contract. O componentă nu are voie să cunoască valorile concrete ale unei teme și nu trebuie să conțină excepții de tipul „dacă tema este dark”.

## Roluri obligatorii

Contractul temei include următoarele categorii:

- brand: implicit, puternic și subtil;
- text: implicit, secundar, accent, invers și disabled;
- suprafețe: pagină, subtilă, ridicată și puternică;
- borduri: implicită, puternică și disabled;
- link: implicit, hover, active și visited;
- acțiune principală: fundal, text, hover, active și disabled;
- feedback: informație, succes, avertizare și eroare, fiecare cu text, fundal și bordură;
- focus: inel și culoare de contrast adiacentă.

Un rol nu poate fi eliminat dintr-o temă. Compilatorul respinge temele incomplete și rolurile suplimentare neaprobate.

## Reguli de contrast

Compilatorul validează automat minimum:

- text principal pe suprafața paginii: 7:1;
- text secundar și disabled pe suprafața paginii: 4,5:1;
- text de accent pe suprafața paginii și pe suprafața subtilă: 4,5:1;
- text invers pe suprafață puternică: 4,5:1;
- toate stările linkului pe suprafața paginii: 4,5:1;
- textul acțiunii pe stările implicit, hover și active: 4,5:1;
- textul disabled pe fundalul disabled: 4,5:1;
- textul fiecărui mesaj de feedback pe fundalul asociat: 4,5:1;
- indicatorii de focus față de suprafețele adiacente: 3:1.

Aceste verificări nu înlocuiesc testarea manuală. Sunt necesare suplimentar:

- verificarea elementelor grafice și a delimitărilor controalelor;
- testarea la zoom și reflow;
- testarea în `forced-colors`;
- verificarea stărilor reale ale componentelor;
- testarea cu persoane cu vedere redusă și alte nevoi vizuale.

## Culoarea nu este unicul purtător de sens

Feedback-ul și stările trebuie să folosească minimum încă un semnal:

- titlu sau etichetă explicită;
- simbol ori icon accesibil;
- text descriptiv;
- structură și poziționare consecventă;
- atribut și stare programatică, unde este relevant.

„Roșu” nu este o instrucțiune. Documentația nu folosește formulări precum „apasă butonul verde” sau „câmpurile roșii sunt obligatorii”.

## Alegerea și persistența temei

Tema explicită se aplică pe elementul `html`:

```html
<html data-sd-theme="dark">
```

În lipsa atributului, CSS urmărește `prefers-color-scheme`. O preferință salvată folosește cheia `sd-theme` și este aplicată de scriptul oficial înainte de primul paint.

Ordinea recomandată este:

1. scriptul de inițializare în `head`;
2. token-urile de bază;
3. temele;
4. stilurile produsului.

Aplicațiile cu randare pe server pot scrie direct atributul pe `html`. Acest lucru este preferabil când preferința este cunoscută din cookie sau profil.

Schimbarea temei:

- nu reîncarcă pagina;
- nu mută focusul;
- nu resetează formularul;
- nu modifică textul sau ordinea conținutului;
- respectă `prefers-reduced-motion`;
- nu produce flash vizual necontrolat la reîncărcare.

## Forced colors

În `forced-colors: active`, rolurile sunt mapate la culorile sistemului de operare:

- `Canvas` și `CanvasText`;
- `LinkText`, `VisitedText` și `ActiveText`;
- `ButtonFace` și `ButtonText`;
- `Highlight`;
- `GrayText`.

Componentele nu trebuie să suprascrie aceste roluri cu valori fixe. `forced-color-adjust: none` este interzis implicit și necesită:

1. justificare documentată;
2. alternativă echivalentă;
3. testare manuală în minimum Windows High Contrast;
4. issue cunoscut și owner.

## Personalizare instituțională

### Permis implicit

Instituțiile pot configura:

- numele și identificarea instituției;
- sigla și stema, în spațiile documentate;
- accentul aprobat;
- datele de contact și conținutul;
- legăturile instituționale.

### Accente aprobate

Pachetul include:

- `blue`;
- `teal`;
- `burgundy`;
- `purple`.

Accentul modifică numai:

- rolul de brand implicit și puternic;
- fundalul acțiunii principale;
- stările hover și active ale acțiunii principale.

Accentul nu poate modifica:

- linkurile;
- feedback-ul;
- focusul;
- stările disabled;
- culorile de sistem pentru `forced-colors`;
- semantica sau ordinea componentelor.

### Accent personalizat

Un accent în afara preset-urilor este acceptabil numai dacă:

- are valori distincte pentru implicit, hover și active;
- textul acțiunii atinge minimum 4,5:1 în fiecare stare;
- este verificat în toate temele în care va fi folosit;
- nu este confundabil cu succes, avertizare sau eroare;
- rezultatele sunt publicate în documentația implementării;
- nu introduce CSS local în componentele oficiale.

Accentele personalizate nu devin automat parte din nucleul Sistem Digital.

## Stări protejate

Următoarele roluri sunt protejate și nu pot fi personalizate instituțional:

- focus;
- link și visited link;
- succes, avertizare, eroare și informație;
- text și suprafețe de bază;
- disabled;
- selecție și stări de validare;
- culorile pentru `forced-colors`.

O excepție necesită RFC, cercetare și verificare completă de accesibilitate.

## Responsabilitatea implementatorului

Folosirea temei oficiale nu certifică automat produsul. Implementatorul răspunde pentru:

- contrastul după adăugarea imaginilor, gradientelor sau conținutului extern;
- stările tuturor componentelor locale;
- grafice, hărți și vizualizări de date;
- PDF-uri și documente generate;
- iconuri și semnale non-text;
- ordinea CSS și evitarea override-urilor necontrolate;
- testarea în browsere și tehnologii asistive.

## Schimbări și compatibilitate

Este breaking change:

- eliminarea sau redenumirea unei teme oficiale;
- eliminarea unui rol obligatoriu;
- schimbarea sensului unui rol;
- schimbarea cheii de stocare fără migrare;
- schimbarea selectorilor publici;
- eliminarea suportului `forced-colors`.

Ajustarea unei valori este compatibilă numai dacă păstrează sensul, trece toate verificările și nu produce regresii vizuale sau de accesibilitate.
