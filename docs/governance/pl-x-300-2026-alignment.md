# Aliniere cu PL-x nr. 300/2026 (SUDD — Sistemul Unic de Design Digital)

> **Context, nu conformitate certificată.** Acest document mapează cerințele publice, cunoscute, ale propunerii legislative PL-x nr. 300/2026 pe capacitățile curente ale Sistem Digital — și, la fel de important, pe ce lipsește încă. Nu e o evaluare juridică și nu înlocuiește textul oficial al legii. Sursa primară e cdep.ro/senat.ro; acest mediu de lucru nu are acces la acele domenii (blocate de politica de rețea), deci maparea de mai jos se bazează pe textul propunerii comunicat public de inițiator și pe acoperirea de presă a depunerii și adoptării în Senat. Orice detaliu tehnic din formularea finală trebuie verificat direct cu textul adoptat, nu presupus din acest document.
>
> **Corecție față de o rundă anterioară de verificare:** un document anterior identifica greșit PL-x nr. 300/2026 drept propunerea privind Aplicația Mobilă Unică (AMU). Sunt două inițiative distincte, ambele ale aceluiași inițiator. AMU rămâne relevantă pentru sistem.digital (vezi nota din final), dar SUDD e mapajul corect pentru acest număr de propunere.

## Ce este PL-x nr. 300/2026

Propunere legislativă inițiată de Ciprian Rus (senator USR), care conduce Comisia pentru Comunicații, Tehnologia Informației și Inteligență Artificială din Senat, privind **Sistemul Unic de Design Digital (SUDD)** — un set comun de reguli și componente aplicabil tuturor platformelor digitale ale statului.

Depusă la Senat în februarie 2026; adoptată de Senat cu majoritate largă, în formă îmbunătățită prin amendamente axate pe interoperabilitate, reutilizarea registrelor existente, standarde minime și implementare realistă. Aflată acum la Camera Deputaților, for decizional. Pentru a intra în vigoare, mai trebuie adoptată și acolo, promulgată prin decret prezidențial și publicată în Monitorul Oficial — la data acestui document, procesul nu s-a încheiat.

Cerințele-cheie, așa cum au fost comunicate public:

- un set unic de **reguli și componente** pentru toate platformele digitale ale instituțiilor publice, nu doar recomandări generale;
- **standard deschis**, nu o tehnologie sau un furnizor anume — aplicabil indiferent de soluția tehnică folosită de fiecare instituție;
- unificarea modului în care cetățenii interacționează cu paginile și serviciile online ale instituțiilor publice, ca să nu mai reînvețe „cum funcționează statul" la fiecare instituție în parte;
- reducerea costurilor prin **reutilizarea componentelor digitale**, nu reconstrucția lor de la zero de fiecare instituție;
- accelerarea dezvoltării serviciilor online ale statului;
- accesibilitate mai bună pentru persoane cu dizabilități, ca cerință explicită, nu efect secundar.

## Ce oferă deja Sistem Digital pentru asta

| Cerință SUDD                                                 | Ce există deja în sistem.digital                                                                                                                                                                                                       |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Set unic de reguli și componente pentru platformele statului | Exact asta: design tokens (DTCG, trei niveluri core/semantic/component) + bibliotecă de componente versionate, publicate public                                                                                                        |
| Standard deschis, independent de tehnologie sau furnizor     | `@sistem-digital/components` (framework-agnostic) și `@sistem-digital/web-components` (custom elements) — nu impun React sau orice alt framework anume; licență deschisă, fără restricție de domeniu sau furnizor                      |
| Cetățenii nu reînvață interacțiunea la fiecare instituție    | Pattern-urile publicate (formular în pași, verificarea răspunsurilor, confirmarea depunerii, autentificare, urmărirea unei solicitări) + cele patru modele sectoriale de referință (primărie, școală, spital, minister — M4)           |
| Reducerea costurilor prin reutilizarea componentelor         | Pachete npm versionate, starter kits (HTML, Next.js, WordPress) — o instituție sau un furnizor contractat nu repornește de la zero design-ul unui buton sau al unui formular deja rezolvat                                             |
| Accesibilitate ca cerință explicită                          | Teste automate de accesibilitate (axe-core) integrate în CI pentru fiecare componentă și pattern, nu adăugate ulterior                                                                                                                 |
| Verificabilitatea conformării unei instituții/aplicații      | Modelul de adopție pe patru niveluri (`aligned`/`compatible`/`conformant`/`verified`, `docs/governance/adoption-levels.md`) — teoretic până acum, dar exact schema de care ar fi nevoie dacă statul ar cere dovadă de aliniere la SUDD |

## Ce lipsește — gap real, nu presupunere

- **Niciun mandat oficial.** Sistem.digital e un proiect open-source independent (vezi banner-ul de pe site), nu sistemul oficial desemnat prin lege — alinierea de mai sus e o propunere tehnică, nu o consecință automată a adoptării SUDD. Legea nu numește sistem.digital, și nici nu ar trebui să numească un proiect anume — SUDD, așa cum a fost comunicat, stabilește un standard, nu obligă la un furnizor.
- **Niciun contact instituțional confirmat** cu autoritatea care ar administra SUDD odată promulgat (probabil ADR, prin analogie cu inițiativele conexe, dar neconfirmat direct pentru acest text).
- **Validatorul automat de conformitate** (M7, #25) — planificat, neconstruit încă. Exact genul de instrument de care ar fi nevoie pentru verificarea reală a aderării la un standard obligatoriu prin lege.
- **Programul pilot instituțional (#26) nu a pornit** — fără un partener real, modelul de adopție pe patru niveluri rămâne neverificat empiric.
- **Cerințele de „standarde minime" din amendamentele Senatului** nu au un corespondent public explicit în sistem.digital — nu știm exact ce prag minim va cere legea, deci nu putem confirma dacă nivelul actual al proiectului l-ar satisface.

## Notă — Aplicația Mobilă Unică (AMU) rămâne relevantă separat

AMU (adoptată de Senat pe 29 iunie 2026, tot a aceluiași inițiator) cere servicii publice digitale complete printr-un punct unic de acces și un portal web unitar, administrate de ADR. E o lege de arhitectură și interoperabilitate a platformelor, nu una de standard vizual — dar orice implementare a AMU va avea nevoie, practic, de exact tipul de componente și pattern-uri pe care SUDD le-ar reglementa formal. Cele două propuneri sunt complementare, nu concurente; sistem.digital rămâne relevant tehnic pentru amândouă, din motive diferite.

## Pas următor propus

Nu o implementare tehnică imediată, ci un obiectiv realist pe termen scurt: dacă SUDD trece de Camera Deputaților, cea mai utilă mișcare pentru sistem.digital e să existe deja, public și documentat, un caz demonstrabil — componentele, pattern-urile, cele patru modele sectoriale și validatorul (#25, odată livrat) — pe care autoritatea responsabilă să-l poată evalua ca punct de plecare, nu ca standard de construit de la zero. Până atunci, acest document rămâne markerul explicit al legăturii, actualizat pe măsură ce procesul legislativ avansează.
