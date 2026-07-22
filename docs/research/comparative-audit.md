# Audit comparativ al sistemelor de design mature

## Scop

Acest document fundamentează principiile și arhitectura Sistem Digital printr-o analiză comparativă a sistemelor mature. Auditul este o cercetare de birou și nu înlocuiește interviurile, testarea cu utilizatori sau analiza implementărilor din România.

Data auditului: iulie 2026.

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

## Limitări

- Material 3 necesită JavaScript pentru mare parte din documentația publică; concluziile sale vor fi validate suplimentar în etapa de token architecture.
- Auditul nu evaluează încă performanța reală a componentelor în produse românești.
- Nu au fost efectuate încă interviuri sau teste cu cetățeni, funcționari ori furnizori.
- Rezultatele nu trebuie tratate drept validare a nevoilor locale până la finalizarea cercetării de teren.
