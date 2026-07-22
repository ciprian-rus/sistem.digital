# Plan de cercetare de teren — Sistem Digital

## Scop

Cercetarea de teren validează dacă principiile și prioritățile rezultate din auditul comparativ corespund nevoilor reale din România.

Rezultatul nu trebuie să fie o listă de preferințe vizuale, ci o hartă a problemelor, comportamentelor, constrângerilor și rezultatelor urmărite de utilizatori și echipele care livrează servicii.

## Întrebări principale

### Cetățeni și reprezentanți ai mediului de afaceri

- Cum identifică serviciul de care au nevoie?
- Cum verifică dacă un site este oficial și sigur?
- Ce informații caută înainte de a începe?
- Unde abandonează fluxurile?
- Cum interpretează termenii, taxele și documentele solicitate?
- Ce așteptări au privind salvarea, confirmarea, notificarea și statusul?
- Cum se descurcă atunci când serviciul trece între mai multe platforme?
- Ce bariere întâmpină persoanele cu dizabilități, competențe digitale reduse sau acces limitat la dispozitive?

### Funcționari și proprietari de servicii

- Ce pași interni există în spatele formularului public?
- Ce informații sunt cerute din motive juridice și ce informații sunt cerute din obișnuință?
- Ce date ar putea fi verificate la sursă?
- Cine deține conținutul și cine aprobă modificările?
- Ce tipuri de cereri produc cele mai multe erori sau reveniri?
- Ce limite au sistemele existente?
- Ce ar putea fi standardizat fără modificări legislative și ce necesită schimbări de proces?

### Designeri, dezvoltatori și furnizori

- Ce componente și pattern-uri reconstruiesc cel mai frecvent?
- Ce stack-uri, CMS-uri și constrângeri de hosting întâlnesc?
- Cum testează accesibilitatea?
- Ce documentație lipsește la predarea proiectului?
- Ce îi împiedică să actualizeze o bibliotecă comună?
- Ce nivel de personalizare solicită instituțiile?
- Cum se face recepția și cine decide că serviciul este finalizat?
- Ce mecanism de contribuție ar putea folosi realist?

## Segmente de participanți

### Cetățeni

Minimum 24 participanți în prima rundă:

- 6 persoane cu competențe digitale reduse;
- 4 persoane în vârstă de peste 65 de ani;
- 6 persoane care folosesc frecvent servicii digitale publice;
- 4 persoane din mediul rural sau orașe mici;
- 4 persoane care reprezintă microîntreprinderi sau profesii independente.

Segmentele se pot suprapune.

### Persoane cu dizabilități

Minimum 10 participanți, separat sau incluși în eșantionul general:

- utilizatori de NVDA sau JAWS;
- utilizatori VoiceOver pe iOS sau macOS;
- persoane cu vedere redusă care folosesc zoom sau contrast ridicat;
- persoane cu dizabilități motorii care folosesc tastatura, switch sau voice control;
- persoane cu dizabilități cognitive sau dificultăți de învățare.

Participarea trebuie remunerată și organizată accesibil.

### Funcționari și responsabili de serviciu

Minimum 15 participanți:

- administrație centrală;
- primărie de municipiu;
- primărie de oraș sau comună;
- școală sau universitate;
- instituție de sănătate;
- serviciu cu volum mare de solicitări;
- echipă de registratură sau relații cu publicul;
- responsabil IT și responsabil de conținut.

### Furnizori și echipe tehnice

Minimum 12 participanți:

- companii mari de integrare;
- firme mici și freelanceri;
- echipe interne din instituții;
- dezvoltatori WordPress/PHP;
- dezvoltatori .NET/Java;
- echipe React/Angular/Vue;
- specialiști QA și accesibilitate;
- persoane implicate în achiziții și recepție.

## Metode

## 1. Interviuri semi-structurate

Durată: 45–60 minute.

Obiectiv:

- context și comportamente;
- constrângeri organizaționale;
- vocabular;
- criterii de încredere;
- probleme recurente.

Nu se prezintă inițial soluția Sistem Digital, pentru a evita confirmarea prematură a ipotezelor.

## 2. Testare contextuală a serviciilor existente

Participantul rezolvă un scenariu realist:

- găsește serviciul;
- verifică eligibilitatea;
- identifică documentele;
- începe sau simulează depunerea;
- explică ce se întâmplă după trimitere.

Se observă comportamentul; nu se cere doar opinia.

## 3. Card sorting și tree testing

Se testează:

- evenimente de viață;
- categorii de servicii;
- terminologie;
- structura documentației pentru implementatori.

## 4. Co-design cu funcționari și furnizori

Ateliere separate pentru:

- modelul standard al unui serviciu;
- stările dosarului;
- eroare și remediere;
- pașii interni și externi;
- nivelurile permise de personalizare;
- modelul de contribuție.

## 5. Testarea prototipurilor

Se folosesc prototipuri realiste, nu ecrane izolate.

Primele fluxuri recomandate:

- solicitarea unui document;
- programarea la ghișeu;
- plata unei taxe;
- depunerea unei petiții;
- verificarea statusului.

## 6. Audit tehnic asistat

Echipele tehnice încearcă să:

- instaleze pachetul;
- implementeze o pagină;
- adapteze tema;
- ruleze testele;
- actualizeze versiunea;
- raporteze o problemă.

Se măsoară timpul și blocajele, nu doar satisfacția.

## Scenarii inițiale pentru cercetare

### Scenariul A — Document administrativ

„Ai nevoie de un document pentru un dosar care trebuie depus în 10 zile. Găsește serviciul, spune ce trebuie să pregătești, cât durează și cum vei afla că solicitarea a fost rezolvată.”

### Scenariul B — Programare

„Vrei să faci o programare pentru o procedură care nu poate fi finalizată integral online. Găsește primul interval disponibil și explică ce se întâmplă dacă nu poți ajunge.”

### Scenariul C — Eroare

„Ai trimis un formular, dar un document a fost respins. Identifică problema și arată cum ai corecta solicitarea.”

### Scenariul D — Reprezentant firmă

„Trebuie să obții o autorizare pentru firmă. Identifică taxele, baza legală, documentele și dacă poți delega o altă persoană.”

## Date colectate

- înregistrări audio/video cu consimțământ;
- notițe și observații;
- trasee și timp pe task;
- erori și puncte de abandon;
- termeni folosiți spontan;
- nivel de încredere;
- dispozitiv și tehnologie asistivă;
- constrângeri operaționale;
- idei și soluții existente;
- întrebări fără răspuns.

Nu se colectează date personale care nu sunt necesare cercetării.

## Analiză

Rezultatele sunt codificate în:

- nevoi;
- comportamente;
- bariere;
- contexte;
- rezultate urmărite;
- probleme de conținut;
- probleme de componentă;
- probleme de proces;
- probleme legislative sau de interoperabilitate.

Fiecare concluzie trebuie să indice:

- segmentul;
- numărul de observații;
- metoda;
- nivelul de încredere;
- exemple anonimizate;
- implicația pentru produs.

## Niveluri de încredere

### Confirmat

Observat în mai multe metode și segmente, fără contradicții materiale.

### Probabil

Observat repetat, dar eșantionul sau contextul este limitat.

### Ipoteză

Bazat pe audit, opinie sau un număr redus de observații. Necesită testare.

### Contrazis

Dovezile indică faptul că ipoteza inițială nu este valabilă sau este prea generală.

## Etică și protecția participanților

- consimțământ informat;
- posibilitatea de retragere;
- anonimizare;
- remunerare echitabilă;
- materiale accesibile;
- pauze și durată adaptată;
- evitarea utilizării datelor reale în servicii de producție;
- canal privat pentru experiențe sensibile;
- publicarea rezultatelor agregate.

## Livrabile

1. Research brief aprobat.
2. Ghiduri de interviu pentru fiecare segment.
3. Scenarii și prototipuri.
4. Registrul participanților, păstrat separat și protejat.
5. Research repository cu date anonimizate.
6. Raport de constatări.
7. Opportunity map.
8. Priorități MVP revizuite.
9. Lista problemelor care nu pot fi rezolvate doar prin design system.
10. Recomandări pentru instituționalizare și adopție.

## Criterii pentru finalizarea cercetării M1

- au participat toate cele trei grupuri principale: cetățeni, funcționari și furnizori;
- sunt incluse persoane cu dizabilități;
- există minimum două metode pentru concluziile critice;
- sunt documentate și concluziile care contrazic ipotezele;
- principiile de design au fost testate în minimum două compromisuri reale;
- backlog-ul MVP a fost modificat pe baza dovezilor;
- rezultatele anonimizate sunt publicate;
- limitele cercetării sunt explicite.

## Dependențe și responsabilități

Pentru recrutare și acces instituțional sunt necesare:

- parteneri din administrație;
- organizații ale persoanelor cu dizabilități;
- asociații profesionale și furnizori;
- buget pentru remunerarea participanților;
- facilitator și note-taker;
- responsabil pentru protecția datelor cercetării.

Fără aceste resurse, auditul de birou poate orienta proiectul, dar nu poate valida nevoile locale.
