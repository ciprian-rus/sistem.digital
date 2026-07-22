# Viziunea de produs — Sistem Digital

## Statutul documentului

Acest document definește direcția de produs pentru Sistem Digital. Orice propunere de componentă, pattern, integrare sau funcționalitate trebuie evaluată în raport cu această viziune.

## Declarația de viziune

**Sistem Digital este infrastructura deschisă prin care organizațiile din România pot construi servicii digitale clare, accesibile, sigure și coerente, fără să reinventeze de fiecare dată interfața, regulile de utilizare și componentele fundamentale.**

Proiectul urmărește ca o persoană să poată învăța o singură dată cum funcționează un serviciu digital și să transfere această experiență între instituții și organizații.

## Promisiunea de produs

Pentru echipele care proiectează și dezvoltă servicii digitale, Sistem Digital oferă:

- decizii de design reutilizabile și documentate;
- componente accesibile și testate;
- pattern-uri pentru fluxuri complete, nu doar elemente vizuale;
- implementări versionate și actualizabile;
- exemple și startere aplicabile în proiecte reale;
- reguli de conținut, accesibilitate, securitate și contribuție;
- o comunitate deschisă în care nevoile pot fi propuse, validate și prioritizate public.

Pentru utilizatorii serviciilor construite cu Sistem Digital, rezultatul urmărit este o experiență:

- ușor de recunoscut;
- predictibilă;
- utilizabilă de pe telefon, desktop și cu tehnologii asistive;
- exprimată într-un limbaj clar;
- tolerantă la erori;
- transparentă în privința pașilor, termenelor și rezultatului.

## Problema pe care o rezolvăm

Serviciile digitale sunt construite frecvent ca proiecte izolate. Aceeași problemă este rezolvată de mai multe ori, cu terminologie, navigație, formulare și comportamente diferite. Rezultatul este:

- cost ridicat de proiectare și dezvoltare;
- inconsistență între servicii;
- accesibilitate tratată tardiv;
- dependență de furnizori și tehnologii;
- actualizări dificile;
- experiență fragmentată pentru utilizator;
- lipsa unei baze comune de cercetare și bune practici.

Sistem Digital nu elimină autonomia organizațiilor, ci elimină reinventarea inutilă a problemelor comune.

## Publicuri

### Publicuri primare

1. **Echipele de produs și serviciu**
   - product managers;
   - service designers;
   - UX/UI designers;
   - content designers;
   - cercetători UX;
   - specialiști în accesibilitate.

2. **Echipele tehnice**
   - dezvoltatori frontend și full-stack;
   - arhitecți software;
   - integratori și furnizori IT;
   - maintainers ai platformelor și CMS-urilor;
   - echipe de securitate și quality assurance.

3. **Instituțiile și organizațiile care achiziționează sau administrează servicii digitale**
   - administrație centrală și locală;
   - școli, universități și spitale;
   - autorități și servicii publice;
   - ONG-uri și proiecte civice;
   - organizații care livrează servicii de interes public.

### Publicuri secundare

- decidenți și responsabili de politici publice;
- echipe de achiziții;
- mediul academic;
- comunități profesionale;
- persoane care testează servicii publice;
- utilizatori care oferă feedback sau participă la cercetare.

## Principii de produs

1. **Nevoile utilizatorului înaintea structurii organizației.**
2. **Accesibilitatea este criteriu de acceptare, nu etapă finală.**
3. **Reutilizarea este opțiunea implicită.**
4. **HTML semantic și standardele web au prioritate.**
5. **Componentele sunt validate în servicii și scenarii complete.**
6. **Personalizarea este permisă numai fără pierderea coerenței și accesibilității.**
7. **Sistemul este independent de un singur framework, CMS sau furnizor.**
8. **Schimbările sunt versionate, testate și explicate.**
9. **Deciziile și limitele cunoscute sunt publice.**
10. **Votul comunității informează prioritizarea, dar nu înlocuiește cercetarea și evaluarea de calitate.**

## Domeniul produsului

### În scope

Sistem Digital include:

- principii și fundamente de design;
- design tokens canonice;
- componente HTML, CSS și JavaScript accesibile;
- Web Components și adaptoare pentru framework-uri;
- pattern-uri de interacțiune și de serviciu;
- reguli și exemple de content design;
- iconografie și assets cu licență deschisă;
- template-uri și startere;
- aplicații de referință;
- documentație pentru design, dezvoltare și implementare;
- testare automată și manuală documentată;
- release-uri, changelog, migration guides și versiuni LTS;
- proces public de contribuție, RFC și guvernanță;
- instrumente de validare și adopție, dezvoltate etapizat.

### În afara scope-ului

Sistem Digital nu este:

- un singur site-template obligatoriu;
- un CMS unic impus tuturor;
- o platformă care centralizează automat datele instituțiilor;
- un înlocuitor pentru cercetarea specifică fiecărui serviciu;
- o garanție automată că orice implementare este conformă;
- un brand vizual care elimină identitatea organizațiilor;
- un marketplace comercial în etapa MVP;
- o certificare legală sau instituțională în absența unui mandat formal;
- o bibliotecă React prezentată drept standard universal;
- un instrument prin care popularitatea unei propuneri înlocuiește testarea cu utilizatori.

## MVP

### Obiectivul MVP

MVP-ul trebuie să demonstreze că Sistem Digital poate fi instalat, folosit și actualizat într-un serviciu real, nu doar prezentat într-o galerie de componente.

### Livrabile obligatorii

#### Fundamente

- culori și roluri semantice;
- tipografie;
- spațiere și dimensiuni;
- layout și breakpoints;
- focus și stări interactive;
- iconografie de bază;
- reguli de limbaj și conținut;
- standardul de accesibilitate.

#### Componente MVP

Minimum 15 componente stabile, incluzând:

- link;
- button;
- input;
- textarea;
- select;
- checkbox;
- radio;
- error message și error summary;
- alertă;
- breadcrumb;
- header;
- footer;
- card;
- tabel;
- accordion;
- paginare;
- file upload;
- step indicator;
- summary list.

Numărul poate varia numai dacă cercetarea indică o ordine mai bună, dar MVP-ul trebuie să acopere un flux complet.

#### Pattern-uri MVP

- pornirea unui serviciu;
- verificarea eligibilității;
- completarea unui formular în pași;
- validarea și corectarea erorilor;
- verificarea răspunsurilor;
- confirmarea depunerii;
- urmărirea stadiului unei solicitări.

#### Distribuție

- pachet npm versionat;
- CSS și assets pentru self-hosting;
- starter HTML;
- starter Next.js;
- integrare WordPress demonstrabilă;
- kit de design compatibil cu fluxul de lucru al designerilor.

#### Dovadă de utilizare

- o aplicație de referință care implementează un serviciu administrativ de la început la confirmare;
- minimum un proiect pilot extern repository-ului principal;
- feedback documentat de la designeri, dezvoltatori și utilizatori.

### Criterii de ieșire din MVP

MVP-ul poate fi declarat finalizat numai când:

- toate componentele incluse au documentație de utilizare și accesibilitate;
- testele automate și matricea manuală obligatorie sunt finalizate;
- un proiect poate instala pachetele fără copierea sursei;
- actualizarea între două versiuni este demonstrată;
- serviciul de referință poate fi parcurs exclusiv cu tastatura;
- nu există probleme `critical` sau `serious` deschise în componentele stabile;
- minimum trei echipe distincte au evaluat documentația sau integrarea;
- feedback-ul pilotului este publicat și a produs cel puțin o îmbunătățire verificabilă.

## Scenarii de adopție

### Scenariul 1 — Serviciu modern nou

O echipă construiește un serviciu în Next.js sau alt framework modern.

Echipa:

1. instalează pachetele versionate;
2. folosește token-urile și componentele oficiale;
3. urmează pattern-ul documentat pentru formular;
4. rulează testele locale și CI;
5. primește actualizări prin pull requests automate;
6. păstrează controlul asupra aplicației și datelor proprii.

### Scenariul 2 — Site sau aplicație legacy

O instituție are PHP, .NET, Java sau HTML fără un build frontend modern.

Echipa:

1. descarcă o versiune imutabilă a CSS-ului și JavaScript-ului compilat;
2. găzduiește local fișierele sau folosește un CDN versionat;
3. adoptă incremental componentele;
4. nu folosește niciodată o adresă `latest` în producție;
5. actualizează controlat după testare.

### Scenariul 3 — Instituție mică fără echipă tehnică

O școală, comună sau instituție mică folosește o platformă multi-site ori un CMS administrat.

Instituția:

1. selectează un template compatibil Sistem Digital;
2. administrează numai conținutul și datele proprii;
3. primește actualizări centralizate și etapizate;
4. beneficiază de componente și pagini obligatorii preconfigurate;
5. nu dezvoltă individual infrastructura comună.

### Scenariul 4 — Furnizor într-o achiziție publică

Un furnizor implementează un serviciu pentru o instituție.

Caietul de sarcini indică:

- versiunea Sistem Digital;
- componentele și pattern-urile obligatorii;
- criteriile de accesibilitate;
- testele și artefactele de recepție;
- livrarea codului și evitarea lock-in-ului;
- obligația de actualizare pe durata contractului.

## Modelul de comunitate

Comunitatea poate:

- propune probleme și componente;
- vota priorități;
- comenta RFC-uri;
- participa la cercetare și testare;
- contribui cu cod, documentație și exemple;
- raporta incompatibilități și probleme de accesibilitate.

O propunere nu intră în sistem doar prin vot. Acceptarea necesită:

1. dovada unei nevoi recurente;
2. compatibilitate cu principiile de produs;
3. cercetare sau dovezi de utilizare;
4. evaluare tehnică;
5. evaluare de accesibilitate;
6. documentație și teste;
7. decizie publică a maintainerilor.

## Relația cu un posibil standard oficial național

Sistem Digital este inițial un proiect open-source independent și public.

Poate deveni bază pentru un standard oficial numai dacă există:

- mandat instituțional clar;
- proprietar public și echipă permanentă;
- proces transparent de guvernanță;
- finanțare și mentenanță multianuală;
- mecanism de adoptare și migrare;
- compatibilitate cu achizițiile publice;
- monitorizare și răspundere;
- continuitatea licenței deschise și a repository-ului public.

Statutul oficial nu trebuie să schimbe retrospectiv licența, să închidă procesul de contribuție sau să transforme proiectul într-o dependență proprietară.

## Indicatori de succes

### Adopție

- număr de proiecte care instalează pachetele;
- număr de servicii aflate în producție;
- număr de organizații distincte;
- procentul implementărilor pe versiuni suportate;
- număr de startere și integrări utilizate.

### Calitate

- probleme de accesibilitate identificate înainte de producție;
- rata de succes a testelor din matrice;
- timpul de remediere pentru probleme critical/high;
- regresii introduse și retrase;
- procentul componentelor cu documentație completă.

### Eficiență

- timpul de la inițiere la primul prototip;
- timpul economisit prin reutilizarea componentelor;
- reducerea codului duplicat;
- reducerea costurilor de proiectare și mentenanță;
- timpul necesar unei actualizări între versiuni.

### Comunitate

- contributori activi;
- organizații reprezentate;
- RFC-uri discutate și finalizate;
- propuneri validate prin cercetare;
- timpul de răspuns la issues;
- participarea persoanelor cu dizabilități la testare.

### Experiența utilizatorului

- rată de finalizare a serviciilor;
- erori pe formular și abandon;
- timp până la finalizare;
- satisfacția și încrederea utilizatorilor;
- succesul utilizatorilor care folosesc tastatura sau tehnologii asistive.

## Guardrails

Creșterea adopției nu justifică:

- reducerea accesibilității;
- adăugarea necontrolată de componente;
- acceptarea unor API-uri instabile drept standard;
- personalizarea care rupe coerența;
- colectarea de date personale nenecesare;
- dependența de servicii proprietare fără alternativă;
- declararea conformității fără testarea implementării concrete.

## Decizii pentru etapa următoare

După închiderea M0, prioritățile sunt:

1. cercetarea comparativă și validarea nevoilor;
2. maturizarea design tokens;
3. stabilirea fundațiilor vizuale și de conținut;
4. livrarea primelor componente accesibile;
5. dezvoltarea platformei publice de documentație;
6. construirea serviciului de referință;
7. selectarea proiectelor pilot.
