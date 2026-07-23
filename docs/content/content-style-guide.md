# Ghid de content design pentru Sistem Digital

## Scop

Acest ghid stabilește regulile editoriale pentru documentația Sistem Digital și pentru exemplele de servicii publice. Obiectivul este ca informația să fie clară, acționabilă și coerentă în limba română.

## Scrie pentru nevoia utilizatorului

Începe cu rezultatul pe care îl poate obține persoana, nu cu instituția, temeiul legal sau structura internă.

Preferă:

> Poți solicita online certificatul și îl primești în inbox.

Evită:

> Instituția pune la dispoziția solicitanților procedura de eliberare a certificatului.

## Folosește verbe și instrucțiuni directe

- „Completează cererea”, nu „Cererea va fi completată”.
- „Verifică datele”, nu „Se va proceda la verificarea datelor”.
- „Încarcă documentul”, nu „Atașarea documentului este necesară”.

## Titluri

- descriu conținutul secțiunii;
- folosesc sentence case;
- nu se termină cu punct;
- nu folosesc „Despre”, „Informații” sau „Generalități” fără context;
- păstrează ierarhia semantică, fără niveluri alese pentru aspect.

## Propoziții și paragrafe

- exprimă o idee principală într-o propoziție;
- folosește, de regulă, maximum 20–25 de cuvinte;
- separă instrucțiunile în pași numai când ordinea contează;
- evită paragrafele care combină condiții, excepții și consecințe diferite.

## Termeni

Folosește termenul cunoscut de utilizator și explică termenul juridic la prima apariție.

Exemplu:

> Numărul de înregistrare, numit în unele proceduri „număr de dosar”, confirmă trimiterea cererii.

Nu folosi sinonime diferite pentru aceeași acțiune în același flux.

## Microcopy pentru acțiuni

Butoanele descriu acțiunea și consecința:

- „Continuă”; 
- „Verifică răspunsurile”;
- „Trimite cererea”;
- „Descarcă documentul”.

Evită „OK”, „Da”, „Submit”, „Click aici” și „Mai multe”.

## Erori

Mesajul de eroare:

1. spune ce s-a întâmplat;
2. indică exact câmpul sau acțiunea;
3. explică remedierea;
4. nu blamează utilizatorul.

Preferă:

> Introdu data în formatul zi, lună, an, de exemplu 31 08 2026.

Evită:

> Dată invalidă.

## Date, numere și bani

- datele vizibile folosesc format românesc și luna scrisă când ambiguitatea este posibilă;
- atributul `datetime` păstrează formatul tehnic ISO;
- sumele includ moneda;
- numerele mari folosesc separator de mii;
- intervalele și termenele precizează dacă zilele sunt calendaristice sau lucrătoare.

## Accesibilitate editorială

- linkul descrie destinația;
- informația nu depinde numai de culoare, poziție sau simbol;
- textul alternativ descrie scopul imaginii în context;
- abrevierile sunt explicate la prima utilizare;
- tabelele au caption și antete explicite;
- emoji-urile nu înlocuiesc etichetele și stările textuale.

## Ton

Tonul este:

- respectuos;
- calm;
- direct;
- instituțional fără formalism inutil;
- neutru politic în componentele și documentația tehnică.

Nu folosim umor în erori, avertismente, plăți sau situații cu consecințe juridice.

## Șablon editorial pentru o componentă

Fiecare pagină de componentă include, în această ordine:

1. scop și nevoie;
2. stadiu și versiune;
3. când se folosește;
4. când nu se folosește;
5. preview;
6. markup și API;
7. reguli de conținut;
8. comportament responsive;
9. accesibilitate și tastatură;
10. probleme cunoscute;
11. changelog și migrare.

## Review

Orice schimbare editorială verifică:

- termenii canonici;
- consistența cu UI-ul real;
- lizibilitatea fără cunoștințe juridice sau tehnice;
- legăturile și exemplele;
- data ultimei actualizări și versiunea documentată.
