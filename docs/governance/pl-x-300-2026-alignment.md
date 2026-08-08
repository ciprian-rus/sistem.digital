# Aliniere cu PL-x nr. 300/2026 (Aplicația Mobilă Unică)

> **Context, nu conformitate certificată.** Acest document mapează cerințele publice, cunoscute, ale propunerii legislative PL-x nr. 300/2026 pe capacitățile curente ale Sistem Digital — și, la fel de important, pe ce lipsește încă. Nu e o evaluare juridică și nu înlocuiește textul oficial al legii. Sursa primară e cdep.ro/senat.ro; acest mediu de lucru nu are acces la acele domenii (blocate de politica de rețea), deci maparea de mai jos se bazează pe textul propunerii comunicat public de inițiator și pe acoperirea de presă a adoptării în Senat (29 iunie 2026). Orice detaliu tehnic din formularea finală trebuie verificat direct cu textul adoptat, nu presupus din acest document.

## Ce este PL-x nr. 300/2026

Propunere legislativă inițiată de Ciprian Rus (senator USR), care conduce Comisia pentru Comunicații, Tehnologia Informației și Inteligență Artificială din Senat, privind **Aplicația Mobilă Unică (AMU)** și dreptul la servicii publice digitale complete.

Adoptată de Senat (prim for sesizat) pe 29 iunie 2026; aflată acum la Camera Deputaților, for decizional. Pentru a intra în vigoare, mai trebuie adoptată și acolo, promulgată prin decret prezidențial și publicată în Monitorul Oficial — la data acestui document, procesul nu s-a încheiat.

Cerințele-cheie, așa cum au fost comunicate public:

- instituirea **AMU** ca punct unitar de acces digital la serviciile publice digitale ale autorităților și instituțiilor publice;
- un **portal web unitar** al administrației publice, complementar AMU;
- servicii publice digitale **complete**, nu doar depunere de cerere — organizate **după nevoile oamenilor și ale mediului de afaceri**, nu după structura internă a instituțiilor;
- tranziția de la digitalizare fragmentată (platforme separate, conturi multiple, proceduri care tot ajung la ghișeu) la un parcurs unitar, simplu, predictibil;
- dezvoltarea și administrarea AMU revin **Autorității pentru Digitalizarea României (ADR)**;
- finanțare de la bugetul de stat și din fonduri externe nerambursabile (inclusiv PNRR).

## Ce oferă deja Sistem Digital pentru asta

| Cerință AMU                                                               | Ce există deja în sistem.digital                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Servicii organizate după nevoile oamenilor, nu după structura instituției | Cele patru modele sectoriale de referință (primărie, școală, spital, minister — M4) demonstrează exact acest lucru: catalog de servicii + flux de cerere end-to-end, indiferent de cum e organizată instituția intern                                              |
| Parcurs unitar și predictibil între instituții diferite                   | Pattern-urile publicate (formular în pași, verificarea răspunsurilor, confirmarea depunerii, autentificare, urmărirea unei solicitări) sunt gândite ca vocabular comun, reutilizabil între orice serviciu digital public                                           |
| Experiență consecventă indiferent de furnizorul tehnic                    | Design tokens + componente versionate, independente de framework (`@sistem-digital/components`, `@sistem-digital/web-components`) — orice echipă tehnică, inclusiv una contractată de ADR, poate implementa aceeași experiență fără să refacă design-ul de la zero |
| Accesibilitate ca cerință de bază pentru servicii publice                 | Teste automate de accesibilitate (axe-core) integrate în CI pentru fiecare componentă și pattern, nu adăugate ulterior                                                                                                                                             |
| Verificabilitatea conformării unei instituții/aplicații                   | Modelul de adopție pe patru niveluri (`aligned`/`compatible`/`conformant`/`verified`, `docs/governance/adoption-levels.md`) — teoretic până acum, dar exact schema de care ar fi nevoie dacă ADR ar cere instituțiilor dovadă de aliniere la un standard comun     |

## Ce lipsește — gap real, nu presupunere

- **Niciun API sau integrare reală cu ADR, AMU sau portalul unitar.** Nu există acces din acest mediu la sisteme guvernamentale reale; orice integrare tehnică rămâne de negociat cu ADR ca operator legal al AMU.
- **Contactul instituțional cu ADR nu există încă.** Sistem.digital e un proiect open-source independent (vezi banner-ul de pe site), nu un proiect oficial al ADR — alinierea de mai sus e o propunere, nu un mandat.
- **Schema PNIDP rămâne ipotetică** (`docs/governance/pnidp-schema-draft.md`) — pachetul legislativ din care pare să facă parte și PNIDP (Platforma Națională de Infrastructură Publică Digitală) e, la rândul lui, tot în curs de adoptare, nu promulgat.
- **Programul pilot instituțional (#26) nu a pornit** — fără un partener instituțional real, modelul de adopție pe patru niveluri rămâne neverificat empiric.
- **Portalul web unitar** menționat de AMU nu are, deocamdată, un corespondent explicit în roadmap-ul curent (M3 acoperă platforma de documentație sistem.digital, nu un portal guvernamental de servicii).

## Pas următor propus

Nu o implementare tehnică imediată, ci un obiectiv realist pe termen scurt: dacă legea trece de Camera Deputaților, cea mai utilă mișcare pentru sistem.digital e să existe deja, public și documentat, un caz demonstrabil — cele patru modele sectoriale + pattern-urile + validatorul (#25, odată livrat) — pe care ADR să-l poată evalua ca punct de plecare, nu ca proiect de construit de la zero. Până atunci, acest document rămâne markerul explicit al legăturii, actualizat pe măsură ce procesul legislativ avansează.
