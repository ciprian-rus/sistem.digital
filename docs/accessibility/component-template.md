# Șablon de documentare a accesibilității unei componente

Acest șablon se include în documentația fiecărei componente și se completează înainte ca aceasta să treacă în starea `stable`.

## Rezumat

Descrieți pe scurt cum este percepută și operată componenta de utilizatorii tastaturii și ai tehnologiilor asistive.

## Semantică

- elementele HTML native utilizate;
- rolurile ARIA, numai dacă sunt necesare;
- numele accesibil;
- stările și proprietățile expuse programatic;
- relațiile dintre controale, etichete, descrieri și mesaje.

## Interacțiune cu tastatura

| Tastă | Comportament așteptat |
|---|---|
| `Tab` | |
| `Shift+Tab` | |
| `Enter` | |
| `Space` | |
| `Escape` | |
| Săgeți | |
| Alte taste | |

Eliminați rândurile care nu se aplică și adăugați tastele specifice pattern-ului.

## Managementul focusului

Documentați:

- elementul care primește focus la inițializare;
- traseul focusului în interiorul componentei;
- comportamentul la deschidere și închidere;
- restaurarea focusului;
- situațiile în care focusul este mutat programatic;
- indicatorul vizual de focus.

## Anunțuri și actualizări dinamice

Descrieți:

- ce schimbări sunt anunțate;
- mecanismul utilizat (`aria-live`, focus, status nativ);
- nivelul de prioritate;
- cum se evită anunțurile duplicate sau excesive.

## Conținut

Precizați responsabilitățile autorului de conținut:

- etichete și instrucțiuni;
- texte alternative;
- mesaje de eroare;
- abrevieri și termeni tehnici;
- lungimi maxime recomandate;
- exemple corecte și anti-pattern-uri.

## Comportament vizual

Documentați:

- contrastul și stările vizuale;
- reflow și zoom;
- text spacing;
- forced colors;
- dark mode;
- target size;
- `prefers-reduced-motion`.

## Testare automată

- teste axe și tag-urile executate;
- stările componentei acoperite;
- teste de tastatură;
- alte reguli automate;
- link către teste și artefacte.

## Testare manuală

| Data | Versiunea componentei | Sistem și browser | Tehnologie asistivă | Rezultat | Tester |
|---|---|---|---|---|---|
| | | | | | |

## Probleme cunoscute

Pentru fiecare problemă:

- descriere și impact;
- combinațiile afectate;
- alternativa disponibilă;
- issue asociat;
- responsabil;
- termen de remediere.

Scrieți explicit „Nu există probleme cunoscute” numai după finalizarea testării din matrice.

## Responsabilitățile implementatorului

Listați aspectele care nu pot fi garantate de componentă, de exemplu:

- calitatea conținutului;
- unicitatea ID-urilor generate în aplicație;
- ordinea titlurilor paginii;
- contrastul după personalizare;
- integrarea cu rutarea și managementul focusului aplicației;
- accesibilitatea validării și a răspunsurilor backend.

## Istoric

| Versiune | Modificare relevantă pentru accesibilitate | Retestare necesară |
|---|---|---|
| | | |
