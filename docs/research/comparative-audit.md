# Audit comparativ al sistemelor de design mature

## Scop

Acest document fundamentează principiile și arhitectura Sistem Digital printr-o analiză comparativă a sistemelor mature. Auditul este o cercetare de birou și nu înlocuiește interviurile, testarea cu utilizatori sau analiza implementărilor din România.

Data auditului inițial: iulie 2026.

Extindere: 1 august 2026 — au fost adăugate șase administrații suplimentare (Italia, Țările de Jos, Franța, Portugalia, Ucraina, Polonia), o matrice comparativă internațională și un model formal de maturitate a componentelor. Fiecare afirmație din extindere indică sursa și data verificării; unde accesul direct la sursa primară nu a fost posibil din acest mediu, este notat explicit.

## Întrebări de cercetare

1. Cum separă sistemele mature fundamentele, componentele, pattern-urile și template-urile?
2. Cum decid ce intră în nucleul oficial?
3. Cum gestionează adopția, personalizarea și migrarea?
4. Cum documentează accesibilitatea și limitele componentelor?
5. Cum implică comunitatea fără a transforma votul în criteriu unic de calitate?
6. Ce poate fi preluat și ce trebuie evitat în contextul României?

## Sisteme analizate

- GOV.UK Design System;
- U.S. Web Design System — USWDS;
- Europa Component Library — ECL;
- NHS Design System și NHS Digital Service Manual;
- Carbon Design System;
- Material Design 3, utilizat ca referință pentru adaptivitate și ecosisteme multi-platformă;
- Design Tokens Community Group Format Module 2025.10.

### Extindere — 1 august 2026

- Designers Italia — sistemul „.italia";
- NL Design System (Țările de Jos);
- Système de Design de l'État — DSFR (Franța);
- Mosaico și Ágora Design System (Portugalia);
- design.gov.ua (Ucraina);
- Gov.pl și Architektura Informacyjna Państwa (Polonia).

## Metodologie

Fiecare sistem a fost analizat pe aceleași axe:

- scop și public;
- structură informațională;
- distribuția codului;
- accesibilitate;
- model de contribuție;
- personalizare și teme;
- adopție și migrare;
- maturitatea componentelor;
- relația dintre design, conținut și serviciu;
- trasabilitatea cercetării și a deciziilor.

## Rezumat executiv

### 1. Sistemele de succes sunt produse permanente

Sistemele mature au echipe, roadmap, release-uri, suport și cercetare continuă. Ele nu sunt livrate ca un proiect finalizat sau ca un PDF de identitate vizuală.

GOV.UK menține comunitate, cercetare continuă, evenimente și procese publice pentru propuneri. NHS publică versiuni, update guides și schimbări pentru WCAG 2.2. Carbon afișează versiunea bibliotecilor și data actualizării documentației.

### 2. Principiile preced codul

USWDS definește adopția ca progres de la principii la guidance și apoi la cod. O organizație poate începe prin alinierea deciziilor și poate adopta gradual token-uri și componente.

Această abordare este potrivită României, unde sistemele existente nu pot fi migrate simultan.

### 3. Componentele și pattern-urile au roluri diferite

GOV.UK și NHS tratează separat componentele reutilizabile și pattern-urile care rezolvă probleme mai largi. Un input este o componentă; verificarea răspunsurilor, gestionarea erorilor sau finalizarea unei solicitări sunt pattern-uri.

Sistem Digital trebuie să evite transformarea fiecărei pagini într-o componentă și să documenteze fluxurile administrative complete.

### 4. Accesibilitatea unei componente este o stare demonstrabilă

Carbon publică pentru componente o matrice de statusuri: teste automate pentru starea implicită, stări avansate, tastatură și testare manuală cu cititoare de ecran. GOV.UK cere testare cu dispozitive, browsere și tehnologii asistive înainte de publicare.

Un simplu badge „WCAG” fără dovezi, versiune și arie testată nu este suficient.

### 5. Comunitatea aduce dovezi, nu doar idei

GOV.UK cere ca o propunere să fie utilă și unică înainte de dezvoltare, apoi utilizabilă, consistentă și versatilă înainte de publicare. Dovezile includ utilizarea în mai multe servicii și cercetare cu persoane cu dizabilități.

Sistem Digital trebuie să permită votarea priorităților, dar acceptarea în nucleu trebuie să rămână condiționată de cercetare, accesibilitate, calitate tehnică și mentenanță.

### 6. Personalizarea se face prin roluri stabile

Carbon separă token-ul, rolul și valoarea. Rolurile rămân stabile între teme, iar valorile se schimbă. Aceasta permite teme fără rescrierea componentelor.

Sistem Digital trebuie să permită schimbarea valorilor autorizate, nu redefinirea semanticii: o instituție poate configura accentul, dar nu poate transforma culoarea de eroare în culoare decorativă.

### 7. Adopția incrementală este obligatorie

USWDS afirmă explicit că sistemul nu trebuie adoptat integral dintr-o singură etapă. Acesta este un principiu critic pentru servicii legacy, CMS-uri și instituții cu capacități diferite.

Sistem Digital trebuie să ofere niveluri de maturitate și trasee distincte pentru proiecte moderne, aplicații legacy și platforme multi-site.

### 8. Open source reduce lock-in-ul, dar nu elimină nevoia de proprietar

NHS leagă reutilizarea componentelor și standardelor deschise de evitarea dependenței de furnizori. GOV.UK și Carbon au comunități publice, însă există echipe centrale care decid și mențin nucleul.

Un sistem complet descentralizat, fără maintaineri și SLA, nu poate fi infrastructură publică de încredere.

## Matrice comparativă

| Sistem | Punct forte | Model de contribuție | Accesibilitate | Personalizare | Lecție pentru Sistem Digital |
|---|---|---|---|---|---|
| GOV.UK | Pattern-uri de servicii și research public | criterii utile, unice, utilizabile, consistente, versatile | criterii generale și specifice, testare cu tehnologii asistive | intenționat limitată pentru coerență | acceptarea în nucleu trebuie bazată pe dovezi și reutilizare multi-serviciu |
| USWDS | adopție incrementală și design tokens | GitHub și comunitate federală | componente mobile și accesibile, guidance | settings, tokens și overrides controlate | definim un maturity model, nu o migrare „totul sau nimic” |
| ECL | identitate coerentă la scară multilingvă europeană | administrare centrală și suport instituțional | componente documentate și utilitare pentru screen readers | teme instituționale definite | trebuie să susținem multilingvism și structuri oficiale fără a lega nucleul de un CMS |
| NHS | design pentru context sensibil și rezultate | feedback și contribuții prin GitHub | WCAG 2.2 AA, cod și guidance | identitate NHS puternică | serviciile critice cer empatie, claritate, încredere și reducerea încărcării cognitive |
| Carbon | ecosistem multi-produs și status vizibil al testării | contribuții în faze și platformă de catalogare | matrice automată/manuală publică | token-uri și teme bazate pe roluri | publicăm starea testării fiecărei componente și separăm rolul de valoare |
| Material 3 | adaptivitate și suport multi-platformă | ecosistem centralizat | guidance pentru componente și platforme | scheme dinamice și teme | folosim ca referință pentru adaptivitate, nu ca bază semantică a serviciilor publice |
| DTCG 2025.10 | interoperabilitatea token-urilor | specificație deschisă | nu este sistem UI | grupuri, aliases, types, extensions | formatul canonic al token-urilor trebuie compatibil cu standardul stabil DTCG |

## Analiză detaliată

## GOV.UK Design System

### Ce funcționează

- combină styles, components și patterns;
- încurajează reutilizarea înaintea inventării;
- cere dovezi de utilizare în servicii;
- publică criterii explicite pentru contribuții;
- menține cercetare „always on” cu utilizatorii sistemului;
- permite contribuții de la comunitate, dar păstrează review central;
- documentează ce urmează și cum sunt prioritizate componentele.

### Ce preluăm

- criteriile `useful` și `unique` la intrarea în backlog;
- criteriile `usable`, `consistent` și `versatile` înainte de stabilizare;
- un research template pentru exemple din servicii;
- separarea resurselor comunității de nucleul oficial;
- roadmap și discuții publice.

### Ce adaptăm

România are o varietate tehnologică mai mare și mai puține echipe publice mature de produs. Sistem Digital trebuie să ofere mai multe startere și un traseu explicit pentru furnizori și instituții mici.

## USWDS

### Ce funcționează

- maturity model pe niveluri;
- design tokens, utilities și componente;
- adopție graduală în sisteme existente;
- posibilitatea de a folosi principiile și guidance înaintea codului;
- contribuție înapoi către sistem.

### Ce preluăm

- un maturity model pentru adopție;
- tokenizarea codului existent înainte de înlocuirea completă a componentelor;
- instrumente de evaluare a stării curente;
- măsurarea versiunii și a token-urilor utilizate.

### Ce evităm

Nu construim nucleul exclusiv pe Sass și nu presupunem un singur proces de build. Sursa canonică trebuie să producă CSS, JSON, TypeScript și adaptoare.

## Europa Component Library

### Ce funcționează

- documentație, demonstrație vizuală și cod pentru fiecare element;
- identitate instituțională coerentă;
- utilitare și layout-uri comune;
- versiuni distincte și migrare.

### Ce preluăm

- documentația componentelor trebuie să includă utilizare, demo și cod;
- layout-ul, print-ul și screen-reader utilities sunt parte din sistem;
- trebuie prevăzut multilingvismul și proprietățile CSS logice.

### Ce evităm

Sistem Digital nu trebuie limitat la un singur tip de site instituțional și nu trebuie să condiționeze folosirea de o platformă centrală anume.

## NHS Design System

### Ce funcționează

Principiile NHS pun accent pe oameni, rezultate, incluziune, context, încredere, testarea ipotezelor, iterație, simplitate, deschidere și sustenabilitate.

Design systemul oferă cod de producție, kit de prototipare, componente, pattern-uri și update guides. Versiunea curentă documentează explicit actualizările pentru WCAG 2.2 AA.

### Ce preluăm

- design pentru întregul context al serviciului;
- nu transferăm complexitatea administrativă către utilizator;
- încrederea este criteriu de design;
- documentăm și impactul asupra personalului, nu doar asupra publicului;
- sustenabilitatea intră în evaluarea componentelor și a performanței.

## Carbon Design System

### Ce funcționează

- separă fundamente, componente și ecosistem local;
- documentează token-uri semantice și teme;
- publică starea testării automate și manuale pentru componente;
- menține code libraries, design tools și guidance;
- folosește o grilă și o scară coerentă.

### Ce preluăm

- matrice publică de testare pentru fiecare componentă;
- stări `not tested`, `partially tested`, `tested`, `manually tested`;
- token-uri cu rol semantic constant între teme;
- catalog separat pentru extensii locale și resurse comunitare;
- testarea implicită, stărilor avansate, tastaturii și cititoarelor de ecran.

### Ce evităm

Sistem Digital nu este orientat prioritar către dashboard-uri enterprise. Claritatea fluxurilor publice și content designul au prioritate față de densitatea informațională.

## Material Design 3

### Utilitate pentru proiect

Material este relevant pentru:

- adaptivitate între dimensiuni și tipuri de dispozitive;
- componente multi-platformă;
- scheme de culoare și teme;
- motion și feedback vizual.

### Limită

Material nu trebuie adoptat ca limbaj implicit al statului. Pattern-urile mobile comerciale nu răspund automat nevoilor juridice, administrative și de încredere ale serviciilor publice.

## Design Tokens Community Group 2025.10

Specificația stabilă DTCG definește un format vendor-neutral cu:

- `$value` și `$type`;
- grupuri;
- aliases/references;
- token-uri compozite;
- `$description`;
- `$deprecated`;
- `$extensions`;
- moștenire și rezolvare de teme prin modulele asociate.

### Decizie recomandată

Fișierele canonice Sistem Digital trebuie să fie compatibile cu DTCG 2025.10. Exporturile CSS și TypeScript sunt artefacte derivate, nu sursa de adevăr.

## Designers Italia — sistemul „.italia"

Verificat: 1 august 2026, direct din repository-urile oficiale `italia/design-tokens-italia` și `italia/design-ui-kit`, plus `designers.italia.it`.

### Structură

„.italia" este ecosistemul, iar Designers Italia este site-ul care îl documentează. Sistemul separă explicit fundamentele (`design-tokens-italia`), UI Kit-ul pentru design (`design-ui-kit`, disponibil și ca fișier Figma community) și implementările de cod pentru diverse tehnologii.

### Relația tokeni–Figma–cod

Repository-ul `design-tokens-italia` este sursa canonică. Tokenii pornesc din Figma prin plugin-ul Tokens Studio, sunt exportați ca JSON și compilați cu Style Dictionary în CSS custom properties și variabile SCSS. Este exact modelul „Figma → JSON → artefacte derivate" pe care Sistem Digital îl aplică deja cu DTCG.

### Tokeni globali, semantici și de componentă

Ierarhia este pe trei niveluri, confirmată direct din sursă:

1. **Global** (`tokens/global.json`) — valori primitive, fără sens de utilizare directă;
2. **Semantic** (`tokens/semantic.json`) — decizii reutilizabile aplicate peste mai multe componente;
3. **Component-specific** (`tokens/specific.json`) — valori exhaustive legate de un element anume.

Structura este identică, la nivel de principiu, cu stratificarea `core` → `semantic` → `component` deja folosită de Sistem Digital.

### Matricea implementărilor pe tehnologii

Ecosistemul include mai multe implementări de cod peste aceiași tokeni: **Bootstrap Italia** (`italia/bootstrap-italia`, o distribuție bazată pe Bootstrap) și librării pentru alte framework-uri, documentate separat pe Designers Italia sub „Per lo sviluppo". Nu am putut verifica direct, din acest mediu, un tabel public unic „Figma–HTML/CSS–Web Components–React" per componentă; secțiunile „Per il design" și „Per lo sviluppo" există ca pagini separate, dar matricea consolidată pare a fi mai degrabă implicită (organizată pe canale) decât un artefact unic, verificabil per componentă. **Nivel de încredere: probabil**, de reverificat cu acces direct la paginile respective.

### Dev Kit Italia și bibliotecile pentru framework-uri

Denumirea „Dev Kit Italia" apare în ecosistemul „.italia" ca material de pornire pentru dezvoltatori; nu am putut confirma direct din acest mediu conținutul exact și dacă este un pachet distinct sau un capitol al Designers Italia. **Nivel de încredere: ipoteză** — necesită verificare suplimentară înainte de a fi folosit ca referință tehnică.

### Modele pentru comune, școli, sănătate și alte sectoare

Ecosistemul italian are, conform surselor secundare, template-uri sectoriale (de exemplu pentru site-uri de comune). Nu am obținut acces direct la un catalog oficial al acestor template-uri în această rundă de verificare. **Nivel de încredere: ipoteză.** Este exact tipul de afirmație pe care Epic E (modele sectoriale) trebuie să o valideze independent, nu să o copieze.

### Legătura cu cerințele normative

Design Tokens Italia și UI Kit Italia sunt distribuite cu licența **BSD-3-Clause**, deci fără restricția „doar domenii .gov" pe care o are Franța. Aceasta sprijină un model de adopție mai deschis, mai apropiat de traseul pe care Sistem Digital îl urmează.

### Ce preluăm

- ierarhia pe trei niveluri a tokenilor (global/semantic/component), deja compatibilă cu structura `core`/`semantic`/`component` a Sistem Digital;
- fluxul „Figma (Tokens Studio) → JSON → Style Dictionary → CSS/SCSS", ca model de referință pentru sincronizarea Figma–tokeni–cod din Epic G;
- licențierea permisivă (BSD-3-Clause) ca argument pentru propria politică de licențiere deschisă.

### Ce adaptăm

Sistem Digital va publica, spre deosebire de ce am putut verifica pentru .italia, un artefact public unic care leagă fiecare componentă de disponibilitatea ei în Figma, HTML/CSS, Web Components și React (Epic B), nu doar pagini separate pe canal.

### Ce evităm

Nu preluăm afirmații despre modelele sectoriale sau despre „Dev Kit Italia" ca fapte confirmate — rămân ipoteze de verificat, nu bază pentru decizii de arhitectură.

## NL Design System (Țările de Jos)

Verificat: 1 august 2026, din `nldesignsystem.nl` (rezultate de căutare indexate; fetch direct al paginilor de handboek a fost blocat cu 403 din acest mediu) și din organizația GitHub `github.com/nl-design-system`.

### Modelul federat și Estafettemodel

NL Design System nu este un singur pachet monolitic, ci o **arhitectură** pe care instituțiile o adoptă și o extind cu propria identitate. „Estafettemodel" (modelul de ștafetă) descrie traseul prin care un ghid, o componentă sau un pattern trece prin patru stări succesive, fiecare cu propriul „Definition of Done":

1. **Help Wanted** — componenta este propusă ca necesară; comunitatea este invitată să contribuie cu cunoaștere și implementări inițiale;
2. **Community** — instituțiile au libertate deplină să inoveze și să învețe unele de la altele, fără un contract public strict;
3. **Candidate** — componenta este generalizată, implementată mai larg și pregătită pentru feedback final;
4. **Hall of Fame** — starea definitivă, cu garanții explicite de accesibilitate și utilizabilitate.

Organizația GitHub `nl-design-system` conține peste 50 de repository-uri, inclusiv implementări instituționale distincte construite pe aceeași arhitectură — de exemplu design systemele Tilburg, Nijmegen, Den Haag, Utrecht, RVO și MinBZK — ceea ce confirmă direct, din sursă, caracterul federat: nucleul definește arhitectura și contractul, iar fiecare instituție publică propria temă.

### Stările Help Wanted, Community, Candidate și Hall of Fame

Fiecare stare are propriul checklist de „Definition of Done", publicat pe `nldesignsystem.nl/handboek/estafettemodel/`. Nu am putut extrage direct, din acest mediu, textul complet al fiecărui checklist (fetch blocat cu 403); structura celor patru stări este însă confirmată din multiple pagini indexate ale site-ului oficial. **Nivel de încredere: probabil** pentru existența și numele stărilor; **ipoteză** pentru conținutul exact al fiecărui criteriu, de reverificat cu acces direct.

### Componente white-label și teme instituționale bazate pe tokeni

Nucleul NL Design System publică componente „white-label" (fără identitate vizuală proprie), iar instituțiile aplică propria temă prin tokeni, fără să rescrie componenta. Acesta este exact modelul pe care Sistem Digital îl folosește deja pentru accente instituționale (`data-sd-accent`), dar Estafettemodel arată cum acest model poate fi extins la un nivel federat, cu mai mulți proprietari de temă.

### Reutilizarea cercetării și a contribuțiilor interinstituționale

Modelul „Community" permite mai multor instituții să contribuie și să reutilizeze soluții înainte ca acestea să devină parte din nucleul oficial („Hall of Fame"). Aceasta reduce riscul ca fiecare instituție să reconstruiască aceeași componentă izolat.

### Ce preluăm

- un model de tranziție pe stări explicite, cu Definition of Done propriu fiecărei stări — inspiră direct structura pe șase stări din Epic A, adaptată la contextul unui nucleu central (nu federat) pentru Sistem Digital;
- separarea clară a componentelor funcționale de identitatea instituțională (deja aliniată cu politica de personalizare existentă a Sistem Digital);
- ideea de nucleu central menținut oficial, chiar și într-un model care încurajează contribuții externe.

### Ce adaptăm

România nu are, ca Țările de Jos, un ecosistem cu zeci de instituții care mențin propriile implementări pe o arhitectură comună. Sistem Digital rămâne, cel puțin pentru MVP, un nucleu central unic, fără federalizare a mentenanței; posibilitatea de teme instituționale rămâne, dar responsabilitatea tehnică a nucleului nu se distribuie.

### Ce evităm

Nu copiem denumirile stărilor („Help Wanted", „Community" etc.) — ele descriu un proces de colaborare federată care nu se potrivește direct cu un nucleu central. Preluăm principiul (stări explicite, criterii publice de tranziție), nu eticheta.

## Système de Design de l'État — DSFR (Franța)

Verificat: 1 august 2026, direct din `github.com/GouvernementFR/dsfr` (README-ul repository-ului oficial) și din rezultate indexate pentru `systeme-de-design.gouv.fr`.

### Caracterul normativ

Confirmat direct din sursă: DSFR este licențiat **Etalab 2.0**, dar termenii de utilizare interzic explicit folosirea lui în afara administrației publice și în afara domeniilor `.gouv.fr`. Instalarea pachetului npm (`@gouvfr/dsfr`) cere acceptarea explicită a licenței (variabila `DSFR_ACCEPT_LICENSE=1` în CI/CD). DSFR este deci un sistem cu caracter normativ puternic: marchează identitatea vizuală a statului și nu este gândit ca resursă open-source generică.

### Documentarea separată a prezentării, demonstrației, designului, codului și accesibilității

Site-ul public documentează fiecare componentă cu principii de utilizare și fragmente HTML dedicate. Structura reflectă exact separarea pe care Epic C o cere: prezentare, demonstrație, decizii de design, cod și accesibilitate ca secțiuni distincte, nu un singur bloc nediferențiat.

### Componentele pentru autentificare, utilizator autentificat, consimțământ și parcursuri

DSFR include peste 50 de blocuri de interfață gata de utilizat, conform documentației oficiale. Nu am putut confirma direct din acest mediu o listă exhaustivă a componentelor specifice de autentificare/consimțământ (fetch al paginii de componente a fost blocat cu 403); tratăm această listă ca **ipoteză de verificat**, nu ca fapt confirmat.

### Marcarea componentelor beta

Convenția de a marca explicit componentele ca `beta` există în ecosistemele franceze de servicii publice (de exemplu în alte produse ale incubatorului guvernamental). Pentru DSFR specific, marcarea explicită beta/stabil per componentă nu a putut fi confirmată direct din acest mediu de verificare. **Nivel de încredere: ipoteză.**

### Roadmap-ul public și politica de versiuni

Repository-ul este public pe GitHub, cu changelog și versiuni publicate; instalarea unei versiuni specifice este posibilă prin parametru explicit. Un roadmap public dedicat, distinct de changelog, nu a putut fi confirmat direct din acest mediu.

### Restricțiile privind componentele locale

Codul sursă (`src/`) este organizat pe module (`dist/`, `src/`, `example/`, `standalone/`), cu convenția BEM pentru clase CSS. Restricția de utilizare (doar `.gouv.fr`) descurajează implicit forkurile locale necontrolate — o instituție care ar copia și modifica necontrolat DSFR ar încălca explicit termenii licenței.

### Ce preluăm

- separarea documentației fiecărei componente pe prezentare/demo/design/cod/accesibilitate — structură directă pentru template-ul canonic din Epic C;
- guvernanța printr-o echipă centrală (SIG — Service d'Information du Gouvernement) care menține un nucleu unic, nu un fork per instituție;
- ideea de a condiționa explicit instalarea de acceptarea unor termeni de utilizare, ca semnal clar al caracterului normativ.

### Ce adaptăm

Sistem Digital nu va restricționa utilizarea la un singur domeniu sau la administrația centrală — România are nevoie de adopție și de furnizori privați care implementează pentru instituții publice. Licențierea rămâne deschisă (compatibilă cu politica deja documentată a proiectului), dar caracterul normativ al componentelor „oficiale" va fi comunicat prin documentație și maturitate, nu prin restricție de licență.

### Ce evităm

Nu copiem restricția „doar `.gouv.fr`". Un sistem de design public în România trebuie să poată fi folosit de furnizori și de instituții care nu au încă domenii guvernamentale proprii, altfel adopția incrementală (deja un principiu decis) este contrazisă.

## Mosaico și Ágora Design System (Portugalia)

Verificat: 1 august 2026, din rezultate indexate pentru `mosaico.gov.pt` (fetch direct al paginilor a fost blocat cu 403 din acest mediu).

### Etapele de proiectare a serviciilor

Mosaico este documentat ca „modelul comun de desenho e desenvolvimento de serviços públicos digitais" — adică un model comun pentru proiectarea și dezvoltarea serviciilor publice digitale, centrat pe cetățeni și companii, nu doar un catalog de componente vizuale.

### Rolurile profesionale și service blueprint

Sursele indexate confirmă existența unei secțiuni dedicate de „Usabilidade" (usability) în Mosaico, dar nu am putut confirma direct, din acest mediu, un artefact explicit de tip „service blueprint" per serviciu sau o listă publică a rolurilor profesionale implicate. **Nivel de încredere: ipoteză**, de verificat separat.

### Legătura cu autentificarea, plățile, notificările și interoperabilitatea

Mosaico este descris explicit ca model pentru „serviços federados" (servicii federate), cu legătură directă la platforma `gov.pt`. Aceasta confirmă principiul cerut de Epic D/G: pattern-urile de serviciu nu sunt independente de platformele comune (autentificare, plăți, notificări), ci construite explicit peste ele.

### Catalogul Unic al Serviciilor Publice

Nu am identificat, din sursele accesibile în această rundă, un „Catálogo Único" cu acest nume exact; conceptul de catalog centralizat de servicii este însă coerent cu structura `gov.pt` documentată. **Nivel de încredere: ipoteză.**

### Ghidurile de scriere și bunele practici

Sursele indexate menționează `guias.mosaico.gov.pt` ca resursă separată de ghiduri practice (inclusiv despre aplicarea Ágora Design System în servicii). Confirmă principiul „ghidurile de conținut trăiesc separat de componentele vizuale, dar sunt legate explicit de ele" — relevant pentru Epic F.

### Un detaliu instituțional important: accesul controlat

Spre deosebire de toate celelalte sisteme analizate, **Ágora Design System nu este liber accesibil**: accesul la resursele Figma se cere explicit prin e-mail la o adresă instituțională, cu prioritate pentru administrația centrală vizată de Decree-Law nr. 49/2024, apoi primării, furnizori ai administrației locale și autorități locale. Acesta este un model de guvernanță prin acces controlat, diferit de toate celelalte sisteme din audit (care sunt public accesibile, cu diverse restricții de utilizare, dar nu de acces).

### Ce preluăm

- principiul ca pattern-urile de serviciu să fie construite explicit peste platformele comune (autentificare, plăți, notificări), nu independent de ele;
- separarea ghidurilor practice de kit-ul vizual, ca resurse distincte dar legate.

### Ce adaptăm

Sistem Digital rămâne public și liber accesibil (fără cerere de acces prin e-mail), coerent cu principiul deschiderii deja decis. Modelul de prioritizare al Portugaliei (administrație centrală → primării → furnizori) este totuși util ca **secvențiere de adopție**, nu ca restricție de acces: poate inspira ordinea recomandată a programului pilot din Epic H/#26 (administrație centrală și primării mari înaintea instituțiilor mici), fără a restricționa accesul la documentație sau cod.

### Ce evităm

Nu introducem un model de acces controlat pentru documentație sau kit-uri publice. Restricția portugheză este justificată de contextul lor instituțional, dar contrazice principiul de deschidere pe care Sistem Digital l-a decis deja.

### Ce nu este suficient de matur ca referință tehnică

Majoritatea afirmațiilor despre Mosaico/Ágora din această secțiune au nivel de încredere „ipoteză", din cauza accesului limitat la sursele primare din acest mediu de verificare. Nu trebuie folosite ca bază tehnică fără o verificare directă ulterioară (acces la documentația completă sau contact instituțional).

## design.gov.ua (Ucraina)

Verificat: 1 august 2026. **Limită tehnică explicită**: accesul direct la `design.gov.ua`, la pagina de caz Kitsoft și la raportul Open Government Partnership „Ukraine Design Report 2018–2020" a fost blocat cu **HTTP 403** de trei ori, din acest mediu de verificare, la surse diferite (site guvernamental, agenție de implementare, organizație internațională). Nu putem exclude faptul că blocajul reflectă doar politica anti-automatizare a acelor site-uri, dar nici nu putem confirma independent starea curentă a conținutului. Concluziile de mai jos se bazează pe surse secundare verificabile (actul normativ oficial și organizația GitHub open-source a statului), nu pe acces direct la sistemul de design în sine.

### Baza normativă confirmată

Confirmat direct din `zakon.rada.gov.ua`: Hotărârea Cabinetului de Miniștri al Ucrainei nr. 493 din 12 iunie 2019 modifică reglementările privind site-urile oficiale ale autorităților executive și încredințează Ministerului Transformării Digitale sarcina de a dezvolta recomandări pentru dezvoltarea și modernizarea site-urilor și portalurilor web oficiale — recomandări cunoscute ca „дизайн-система державних сайтів України" (sistemul de design al site-urilor de stat ale Ucrainei), implementat ulterior ca `design.gov.ua` de agenția Kitsoft.

### Diia.Open Source ca artefact accesibil

Spre deosebire de `design.gov.ua`, organizația GitHub `diia-open-source` este accesibilă și conține componente reale, publicate sub licența **EUPL**: `DiiaUIComponents` (componente și primitive UI), `DiiaCommonTypes`, `DiiaCommonServices` și module dedicate pentru autorizare, documente și servicii publice. Acesta este însă un kit UI pentru **aplicații mobile native** (iOS/Android), nu un sistem de design web HTML/CSS comparabil direct cu Sistem Digital.

### Principiile de simplificare administrativă și orientarea spre nevoia cetățeanului

Nu am putut verifica direct, din acest mediu, ghidurile publice de content design sau de limbaj simplu de pe `design.gov.ua`. Principiul general al simplificării administrative este documentat la nivel de politică publică ucraineană (Ministerul Transformării Digitale), dar conținutul tehnic specific rămâne neverificat direct.

### HTML-first și cerințele pentru achiziții publice

Nu am putut confirma direct, din sursele accesibile, dacă `design.gov.ua` impune explicit un principiu „HTML-first" sau cerințe de sistem de design în achizițiile publice ucrainene. **Nivel de încredere: ipoteză**, netratată drept concluzie validă pentru Epic F/I.

### Limitele tehnice și de actualitate identificate — explicit

1. Site-ul principal `design.gov.ua` nu a putut fi accesat direct din acest mediu (403) — starea reală a conținutului, versiunea și data ultimei actualizări nu au putut fi confirmate la 1 august 2026.
2. Sursele secundare disponibile (prezentări, articole) datează parțial din 2019, anterior invaziei la scară largă din 2022; nu este clar în ce măsură sistemul de design al site-urilor guvernamentale a fost menținut activ, extins sau doar parțial actualizat de atunci.
3. Artefactul open-source cel mai concret și verificabil (`diia-open-source`) acoperă aplicația mobilă Diia, nu neapărat site-urile guvernamentale generale acoperite de Hotărârea nr. 493/2019 — cele două sisteme pot să fi divergent.
4. Contextul de război afectează probabil capacitatea instituțională de mentenanță continuă a documentației publice; aceasta este o ipoteză rezonabilă, nu o afirmație verificată.

Aceste limite trebuie tratate ca un risc real al auditului, nu ascunse. Sistem Digital nu va folosi design.gov.ua ca referință tehnică principală până la o verificare directă ulterioară, cu acces confirmat la sursă.

### Ce preluăm (cu rezervă)

- principiul, confirmat la nivel normativ, ca un sistem de design al site-urilor de stat să fie stabilit printr-un act oficial explicit, cu un minister responsabil desemnat — relevant pentru guvernanța proprie a Sistem Digital;
- modelul de open-source per-platformă (componente mobile native separate, publicate cu licență deschisă), ca precedent pentru eventuale adaptoare native, dacă vor fi necesare vreodată.

### Ce evităm

Nu preluăm detalii tehnice specifice (tokeni, componente, ghiduri de conținut) de la `design.gov.ua` ca referință directă, din cauza imposibilității de verificare la această dată.

## Gov.pl și Architektura Informacyjna Państwa (Polonia)

Verificat: 1 august 2026, din rezultate indexate pentru `gov.pl/web/ia` și `gov.pl/web/cyfryzacja` (fetch direct al paginilor a fost blocat cu 403 din acest mediu).

### Straturile legislativ, organizațional, semantic și tehnic

Architektura Informacyjna Państwa (AIP) este descrisă explicit ca o descriere formală a modului în care sunt organizate sistemele IT ale statului și mediul lor, împreună cu o metodă de gestionare a dezvoltării lor conform ghidurilor PZIP (Polityka Zarządzania Informacyjną Państwa — politica de gestionare a arhitecturii informaționale a statului). AIP acoperă explicit straturile legal, organizațional, semantic și tehnic — patru straturi, confirmate din sursă, care depășesc scopul unui simplu sistem de design vizual.

### Cataloagele administrației, registrele, API-urile și building blocks

Modelul AIP se concentrează pe gestiunea centralizată a unor componente-cheie: verificarea identității digitale, gateway-ul de e-administrare și platforma analitică, alături de reducerea duplicării datelor și sistemelor IT în administrația publică. Aceasta este o arhitectură la nivel de stat pentru registre, API-uri și „building blocks" comune — nu un catalog de componente UI, ci nivelul de deasupra lui, cu care un sistem de design trebuie să se integreze explicit.

### Relația dintre instituții, servicii și sisteme

Un grup de competențe dedicat AIP funcționează în minister și este responsabil de crearea viziunii de arhitectură, modelelor, standardelor și documentării stării curente — bază pentru planificarea dezvoltării și asigurarea coerenței acțiunilor de informatizare ale diferitelor instituții. Acesta este un precedent direct pentru relația „instituție → serviciu → sistem → componentă comună" pe care Epic J trebuie să o modeleze pentru contextul românesc (SNSP/SUDD → sistem.digital → Catalogul serviciilor → Platformele comune → PNIDP).

### Ce preluăm

- principiul separării explicite pe straturi (legislativ, organizațional, semantic, tehnic) — un sistem de design public nu poate fi doar stratul tehnic, izolat de cadrul legal și organizațional care îi dă sens;
- ideea unui grup central de competențe responsabil de arhitectura informațională, care documentează starea curentă ca bază pentru planificare — relevant pentru guvernanța PNIDP;
- accentul pe reducerea duplicării datelor și sistemelor prin building blocks comune, coerent cu relația „Sistem Digital → Platformele comune → PNIDP" deja definită de arhitectura de referință a proiectului.

### Ce adaptăm

România nu are încă, spre deosebire de Polonia, un grup de competențe AIP consolidat sau o cartografiere publică completă a registrelor și API-urilor. Epic J trebuie tratat explicit ca backlog și contracte preliminare, nu ca integrare reală — exact restricția impusă de acest PR.

### Ce evităm

Nu tratăm Sistem Digital ca înlocuitor al unei arhitecturi informaționale de stat complete. Sistem Digital este stratul de prezentare și interacțiune (tokeni, componente, pattern-uri, template-uri), care trebuie să se conecteze la o arhitectură informațională mai largă, nu să o substituie.

## Probleme recurente identificate transversal

1. **Confuzia dintre brand și utilizabilitate** — libertatea vizuală poate deteriora coerența și contrastul.
2. **Componente fără context** — galerii complete vizual, dar fără pattern-uri de serviciu.
3. **Accesibilitate declarativă** — afirmații fără matrice de teste și limitări cunoscute.
4. **Copierea codului** — proiectele pierd legătura cu actualizările și patch-urile.
5. **Adopție binară** — organizațiile amână dacă li se cere migrare completă.
6. **Contribuții fără owner** — extensiile rămân abandonate.
7. **Framework lock-in** — design systemul devine sinonim cu o bibliotecă React.
8. **Personalizare necontrolată** — override-urile distrug rolurile semantice.
9. **Lipsa content designului** — aceeași componentă transmite mesaje incoerente.
10. **Stare de maturitate opacă** — utilizatorii nu știu ce este experimental, stabil sau parțial testat.
11. **Sistem de design izolat de arhitectura informațională a statului** — componentele vizuale fără legătură explicită cu registre, API-uri și building blocks devin decorative, nu infrastructură (Polonia).
12. **Acces controlat ca substitut al guvernanței** — restricționarea accesului la kit-uri (Portugalia) rezolvă coerența pe termen scurt, dar contrazice deschiderea și reduce verificabilitatea publică pe termen lung.
13. **Verificabilitate afectată de context instituțional sau de criză** — surse oficiale inaccesibile sau neactualizate (Ucraina) nu trebuie tratate tacit ca „sistem matur de referință" doar pentru că există un act normativ care le-a înființat.

## Matrice comparativă internațională extinsă

Matrice separată de matricea inițială, cu coloanele cerute explicit pentru extinderea din 1 august 2026. Pentru fiecare celulă: „da" înseamnă confirmat direct din sursă oficială; „parțial" înseamnă confirmat parțial sau doar din surse secundare; „ipoteză" înseamnă neverificat direct în această rundă; „nu" înseamnă absent sau contrazis de sursele consultate.

| Sistem | Guvernanță | Maturitate componente | Tokeni | Figma–cod | Pattern-uri | Modele sectoriale | Content design | Validator | Caracter normativ |
|---|---|---|---|---|---|---|---|---|---|
| GOV.UK Design System | echipă centrală, criterii publice de contribuție | implicită (useful/unique → usable/consistent/versatile) | da, publicate | parțial documentat public | da, extensiv | nu, generic | da, extensiv | nu | recomandat, nu obligatoriu |
| USWDS | echipă federală, comunitate GitHub | maturity model explicit pe niveluri | da | parțial | parțial | nu | parțial | nu | recomandat |
| Europa Component Library | administrare centrală UE | ipoteză | da | ipoteză | parțial | nu | parțial | nu | recomandat instituțiilor UE |
| NHS Design System | echipă centrală NHS Digital | implicită, prin update guides | da | ipoteză | da | da (context clinic) | da | nu | recomandat în ecosistemul NHS |
| Carbon Design System | echipă centrală IBM | matrice publică de testare (not tested/partially/tested/manually tested) | da, rol constant între teme | ipoteză | parțial | nu | parțial | nu | recomandat |
| Material Design 3 | echipă centrală Google | ipoteză | da | da | nu (mobil-first) | nu | parțial | nu | nerecomandat pentru servicii publice |
| Designers Italia / .italia | echipă centrală (Designers Italia) | ipoteză, neconfirmat direct | da, trei niveluri confirmate din sursă | da, confirmat (Tokens Studio → Style Dictionary) | parțial, canale separate | ipoteză | ipoteză | nu | licență deschisă (BSD-3-Clause), fără restricție de domeniu |
| NL Design System | model federat, nucleu + instituții | da, Estafettemodel cu patru stări confirmate | da, teme pe roluri | ipoteză | parțial | nu, dar arhitectură reutilizabilă per instituție | ipoteză | nu | recomandat, adoptat federat |
| DSFR (Franța) | echipă centrală (SIG) | ipoteză, neconfirmat direct | da | parțial | parțial | nu | ipoteză | nu | **obligatoriu normativ**, restricționat la `.gouv.fr` |
| Mosaico / Ágora (Portugalia) | model federat cu acces controlat | ipoteză | ipoteză | ipoteză | da, legat de servicii federate | ipoteză | parțial (ghiduri separate) | nu | acces controlat, prioritizat legal (Decree-Law 49/2024) |
| design.gov.ua (Ucraina) | minister desemnat prin HG 493/2019 | ipoteză | ipoteză | ipoteză | ipoteză | nu | ipoteză | nu | stabilit normativ, verificare tehnică blocată (403) |
| Gov.pl / AIP (Polonia) | grup central de competențe AIP | nu se aplică (nivel arhitectură stat, nu componente) | nu se aplică | nu se aplică | nu se aplică | nu se aplică | nu se aplică | nu | cadru legal-organizațional pentru toate sistemele statului |
| Sistem Digital (țintă) | nucleu central, criterii publice, comunitate cu dovezi | da, șase stări explicite (Epic A) | da, DTCG, trei niveluri | da, matrice publică per componentă (Epic B) | da, pattern-uri de serviciu (Epic D) | da, primărie/școală/spital/minister (Epic E) | da, ghid explicit (Epic F) | planificat (M7, #25) | recomandat, licență deschisă, fără lock-in |

### Ce preluăm / ce adaptăm / ce evităm — sinteză

**Preluăm:**

- ierarhia pe trei niveluri a tokenilor (Italia), deja compatibilă cu structura existentă;
- stările explicite de maturitate cu Definition of Done propriu (Țările de Jos), adaptate la un nucleu central;
- documentarea componentei pe secțiuni separate — prezentare/demo/design/cod/accesibilitate (Franța);
- legătura obligatorie dintre pattern-uri și platformele comune (Portugalia);
- separarea explicită pe straturi legal/organizațional/semantic/tehnic și legătura cu registre și API-uri (Polonia);
- principiul unui act normativ explicit care înființează și responsabilizează sistemul de design (Ucraina, la nivel de precedent, nu de conținut tehnic).

**Adaptăm:**

- modelul federat (Țările de Jos, Portugalia) — Sistem Digital rămâne, pentru MVP, un nucleu central unic, fără mentenanță distribuită;
- secvențierea de adopție instituțională a Portugaliei (central → local) — utilă ca ordine a programului pilot, nu ca restricție de acces;
- ideea de „building blocks" comune a Poloniei — se leagă de Platformele comune și PNIDP, nu de nucleul vizual al Sistem Digital.

**Evităm:**

- restricția de utilizare la un singur domeniu sau instituție (Franța);
- accesul controlat la documentație și kit-uri publice (Portugalia);
- tratarea unor surse neverificabile ca referință tehnică fermă (Ucraina) doar pentru că există un temei legal.

**Nu este suficient de matur ca referință tehnică:**

- majoritatea afirmațiilor tehnice despre Mosaico/Ágora și design.gov.ua, din cauza accesului limitat la sursele primare în această rundă de verificare;
- „Dev Kit Italia" și modelele sectoriale italiene, neconfirmate direct;
- conținutul exact al criteriilor Definition of Done pentru fiecare stare din Estafettemodel, confirmat ca structură, dar nu extras integral.

## Decizii pentru Sistem Digital

### Structură

Sistem Digital va separa:

1. `Foundations`;
2. `Components`;
3. `Patterns`;
4. `Templates`;
5. `Reference services`;
6. `Community resources`.

### Niveluri de maturitate

Fiecare componentă va avea una dintre stările:

- `proposal`;
- `experimental`;
- `candidate`;
- `stable`;
- `deprecated`;
- `retired`.

### Formalizare — Definition of Done și tranziții (1 august 2026)

Extinderea benchmarkului confirmă și completează acest model deja decis, fără să-l înlocuiască:

- fiecare stare primește un Definition of Done explicit și tranziții documentate, în [`docs/governance/component-maturity-model.md`](../governance/component-maturity-model.md) — inspirat direct din structura pe patru stări a Estafettemodel (Țările de Jos), adaptat la un nucleu central (nu federat);
- fiecare componentă publică o schemă preliminară de metadate — owner, data ultimei evaluări, stare curentă, dovezi, motive de depreciere — documentată în [`docs/product/component-metadata-schema.md`](../product/component-metadata-schema.md), compatibilă cu câmpul `stadiu` deja folosit de [catalogul versionat](../product/versioned-catalog.md);
- documentația fiecărei componente va urma o structură standard pe 15 secțiuni (prezentare, când se folosește, când nu se folosește, anatomie, variante, stări, comportament, conținut, demo, cod, accesibilitate, cercetare, probleme cunoscute, responsabilitățile implementatorului, istoric), inspirată de separarea explicită prezentare/demo/design/cod/accesibilitate a DSFR (Franța);
- fiecare componentă va publica o matrice de disponibilitate în Figma, HTML/CSS, Web Components, React, documentație, teste automate, testare cu tastatura și testare cu cititoare de ecran — nu doar pagini separate pe canal, spre deosebire de ce am putut confirma pentru .italia;
- pattern-urile de servicii publice vor documenta explicit legătura cu platformele comune (autentificare, plăți, notificări, interoperabilitate), urmând principiul confirmat pentru Mosaico (Portugalia);
- integrarea cu PNIDP și validatorul va urma modelul pe straturi legislativ/organizațional/semantic/tehnic al Poloniei — Sistem Digital rămâne stratul de prezentare și interacțiune, nu înlocuiește arhitectura informațională a statului.

### Dovezi publice

Pagina fiecărei componente stabile va indica:

- versiunea;
- owner-ul;
- stările testate;
- testele automate;
- testarea cu tastatura;
- testarea cu cititoare de ecran;
- browserele și dispozitivele;
- problemele cunoscute;
- responsabilitățile implementatorului;
- cercetarea și exemplele de utilizare.

### Personalizare

Personalizarea va fi permisă numai prin:

- token-uri publice documentate;
- teme validate automat;
- slots și API-uri explicite;
- extensii care nu modifică semantică, focus, tastatură sau structură critică.

Nu se încurajează override-ul selectorilor interni.

### Comunitate

O propunere trebuie să demonstreze:

- nevoie repetată în mai multe servicii;
- lipsa unei soluții echivalente;
- owner și capacitate de mentenanță;
- testare cu utilizatori;
- accesibilitate;
- compatibilitate cu fundamentele;
- documentație și migration path.

## Recomandări pentru MVP

1. Prioritizăm componentele necesare unui serviciu administrativ complet.
2. Construim mai întâi input-uri, erori, navigație și confirmare, nu componente decorative.
3. Publicăm token-uri DTCG, CSS și TypeScript din aceeași sursă.
4. Oferim starter HTML înainte de extinderi framework-specific.
5. Introducem maturity model pentru proiectele care adoptă incremental.
6. Publicăm starea testării, nu un badge generic de conformitate.
7. Validăm fiecare componentă în serviciul de referință.
8. Testăm contentul și comportamentul pe mobil, nu doar responsive layout.
9. Formăm un grup de cercetare cu cetățeni, funcționari și furnizori.
10. Separăm nucleul oficial de resursele comunității.

## Surse primare

- GOV.UK Design System: https://design-system.service.gov.uk/
- GOV.UK Community: https://design-system.service.gov.uk/community/
- GOV.UK Contribution criteria: https://design-system.service.gov.uk/community/contribution-criteria/
- GOV.UK Develop a component or pattern: https://design-system.service.gov.uk/community/develop-a-component-or-pattern/
- USWDS: https://designsystem.digital.gov/
- USWDS maturity model: https://designsystem.digital.gov/maturity-model/
- Europa Component Library v5: https://ec.europa.eu/component-library/ec/
- NHS Design principles: https://service-manual.nhs.uk/design-system/design-principles
- NHS Design System: https://service-manual.nhs.uk/design-system/index
- NHS Service Standard point 13: https://service-manual.nhs.uk/standards-and-technology/service-standard-points/13-use-and-contribute-to-open-standards-common-components-and-patterns
- Carbon Design System: https://carbondesignsystem.com/
- Carbon accessibility status: https://carbondesignsystem.com/components/overview/accessibility-status/
- Carbon color tokens: https://carbondesignsystem.com/elements/color/tokens/
- DTCG Format Module 2025.10: https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/

### Surse — extindere 1 august 2026

Verificate direct (fetch reușit al sursei oficiale sau al repository-ului oficial):

- Design Tokens Italia (repository oficial): https://github.com/italia/design-tokens-italia — verificat 1 august 2026;
- UI Kit Italia (repository oficial): https://github.com/italia/design-ui-kit — verificat 1 august 2026;
- Designers Italia: https://designers.italia.it/design-system/fondamenti/design-tokens/ — verificat 1 august 2026 (rezultat indexat);
- DSFR (repository oficial): https://github.com/GouvernementFR/dsfr — verificat 1 august 2026;
- Système de Design de l'État: https://www.systeme-de-design.gouv.fr/ — verificat 1 august 2026 (rezultat indexat; fetch direct al paginii de componente blocat cu 403);
- NL Design System — Estafettemodel: https://nldesignsystem.nl/handboek/estafettemodel/ — verificat 1 august 2026 (rezultat indexat; fetch direct al paginii de Definition of Done blocat cu 403);
- NL Design System — organizația GitHub: https://github.com/nl-design-system — verificat 1 august 2026;
- Mosaico — Ágora Design System: https://mosaico.gov.pt/ferramentas/agora-design-system — verificat 1 august 2026 (rezultat indexat; fetch direct blocat cu 403);
- Hotărârea Cabinetului de Miniștri al Ucrainei nr. 493/2019: https://zakon.rada.gov.ua/laws/show/493-2019-%D0%BF — verificat 1 august 2026;
- Diia Open Source (organizația GitHub): https://github.com/diia-open-source — verificat 1 august 2026 (rezultat indexat; fetch direct al portalului oficial blocat cu 403);
- Gov.pl — Architektura Informacyjna Państwa: https://www.gov.pl/web/ia/architektura-informacyjna-panstwa — verificat 1 august 2026 (rezultat indexat; fetch direct blocat cu 403).

Surse indexate consultate, dar cu fetch direct blocat (HTTP 403) din acest mediu de verificare la 1 august 2026:

- https://design.gov.ua/;
- https://kitsoft.ua/projects/new-website-design-parliament-ukraine;
- https://www.opengovpartnership.org/documents/ukraine-design-report-2018-2020/;
- https://opensource.diia.gov.ua/en.html;
- https://nldesignsystem.nl/handboek/estafettemodel/componenten/definition-of-done/;
- https://nldesignsystem.nl/componenten/definition-of-done/;
- https://www.systeme-de-design.gouv.fr/version-courante/fr/composants;
- https://www.gov.pl/web/ia/architektura-informacyjna-panstwa (fetch direct);
- https://mosaico.gov.pt/ (fetch direct).

## Limitări

- Material 3 necesită JavaScript pentru mare parte din documentația publică; concluziile sale vor fi validate suplimentar în etapa de token architecture.
- Auditul nu evaluează încă performanța reală a componentelor în produse românești.
- Nu au fost efectuate încă interviuri sau teste cu cetățeni, funcționari ori furnizori.
- Rezultatele nu trebuie tratate drept validare a nevoilor locale până la finalizarea cercetării de teren.
- **Extindere 1 august 2026**: pentru Italia, Țările de Jos, Portugalia, Ucraina și Polonia, o parte semnificativă a paginilor oficiale de documentație a refuzat fetch direct din acest mediu (HTTP 403 consistent, pe domenii diferite — guvernamentale, agenții de implementare și organizații internaționale). Concluziile din aceste secțiuni se bazează, unde este marcat explicit, pe rezultate de căutare indexate sau pe repository-uri GitHub oficiale, nu pe acces direct la pagina sursă. Fiecare afirmație afectată este etichetată cu nivelul de încredere corespunzător (confirmat/probabil/ipoteză), conform cadrului deja definit în [`docs/research/README.md`](README.md#nivelurile-de-încredere).
- Pentru Ucraina, limita este mai severă: sursa primară principală (`design.gov.ua`) nu a putut fi verificată deloc direct, iar contextul instituțional (război, din 2022) ridică o întrebare legitimă despre continuitatea mentenanței documentației publice, netratată încă ca fapt confirmat sau infirmat.
- Pentru Polonia, AIP este o arhitectură de stat, nu un sistem de design vizual; comparația directă pe coloanele „tokeni"/„Figma–cod"/„pattern-uri" nu se aplică și este marcată explicit ca atare în matricea comparativă extinsă.
