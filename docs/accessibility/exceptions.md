# Excepții și probleme cunoscute de accesibilitate

## Principiu

Excepțiile sunt mecanisme temporare pentru riscuri documentate, nu modalități de a ocoli standardul. Nu se acceptă excepții generale pentru o componentă, un criteriu WCAG sau o regulă axe.

## Când poate fi solicitată o excepție

O excepție poate fi analizată numai când:

- nu există o soluție tehnică disponibilă în termenul release-ului;
- remedierea ar introduce un risc mai grav pentru utilizatori;
- problema aparține unei dependențe externe și există un plan de înlocuire sau actualizare;
- un comportament al browserului ori tehnologiei asistive nu poate fi controlat de implementare;
- este necesară o perioadă scurtă de migrare pentru un sistem existent.

Presiunea de timp, costul obișnuit al implementării sau lipsa testării nu sunt justificări suficiente.

## Informații obligatorii

Fiecare excepție trebuie să aibă un issue public care conține:

- componenta, pattern-ul și versiunile afectate;
- criteriul WCAG, clauza EN 301 549 sau cerința internă relevantă;
- utilizatorii și scenariile afectate;
- severitatea și probabilitatea impactului;
- combinațiile browser–tehnologie asistivă testate;
- alternativa accesibilă temporară;
- motivul pentru care remedierea nu poate fi livrată imediat;
- responsabilul;
- data expirării;
- planul și criteriile de remediere.

## Termene

- excepțiile `critical` și `serious` nu sunt permise pentru componente stable;
- excepțiile moderate pot fi aprobate pentru maximum 90 de zile;
- excepțiile minore pot fi aprobate pentru maximum un release minor sau 180 de zile, oricare survine prima;
- expirarea redeschide automat decizia de release și necesită o nouă evaluare;
- prelungirea nu este automată și trebuie motivată separat.

## Suprimarea testelor automate

O regulă axe poate fi exclusă numai punctual, pe selector și test, nu global, și numai dacă issue-ul asociat este citat în cod.

Nu se acceptă:

- dezactivarea unei categorii WCAG;
- snapshot-uri care ascund HTML-ul complet al încălcărilor;
- `exclude()` pe containere mari fără justificare;
- transformarea automată a unei încălcări în warning;
- ignorarea rezultatelor `incomplete` fără evaluare manuală.

## Probleme provenite din tehnologii asistive

Un comportament diferit într-o tehnologie asistivă nu justifică automat folosirea unui workaround. Echipa trebuie să verifice:

1. dacă markup-ul respectă standardele;
2. dacă problema este reproductibilă pe versiunea stabilă;
3. dacă workaround-ul afectează negativ alte combinații;
4. dacă există o problemă raportată furnizorului;
5. dacă degradarea controlată este preferabilă unei soluții fragile.

## Publicare

Problemele cunoscute relevante pentru utilizatori sunt publicate în documentația componentei, împreună cu:

- impactul;
- combinațiile afectate;
- alternativa recomandată;
- data estimată a remedierii;
- linkul către issue.

O componentă experimentală poate avea probleme cunoscute, dar acestea trebuie să fie vizibile înainte ca implementatorul să adopte componenta.
