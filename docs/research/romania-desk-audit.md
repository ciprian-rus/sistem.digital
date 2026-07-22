# Audit de birou — contextul serviciilor digitale publice din România

## Scop

Acest document inventariază dovezile publice disponibile și formulează ipoteze pentru cercetarea locală a Sistem Digital.

Nu este un clasament al instituțiilor și nu reprezintă un audit complet de conformitate. Observațiile trebuie validate prin testare tehnică, cercetare cu utilizatori și discuții cu echipele responsabile.

Data auditului: iulie 2026.

## Context instituțional

### Catalogul Național al Serviciilor Publice

Catalogul Național al Serviciilor Publice publică mii de servicii furnizate de sute de instituții și include informații despre nivelul de digitalizare, beneficiari, taxe, documente, termene și canale.

Platforma confirmă amploarea problemei: aceleași tipuri de interacțiuni — căutare, eligibilitate, documente, taxe, programări, depunere și urmărire — apar în foarte multe instituții și pot beneficia de pattern-uri comune.

Surse:

- https://serviciipublice.gov.ro/
- https://serviciipublice.gov.ro/servicii
- https://serviciipublice.gov.ro/institutii

### Obligațiile de accesibilitate

Autoritatea pentru Digitalizarea României publică principiile perceptibilității, operabilității, inteligibilității și robusteții și are rol de monitorizare a site-urilor și aplicațiilor mobile ale organismelor din sectorul public.

Sursa:

- https://www.adr.gov.ro/en/accesibilitate-site-uri-web

### Inițiative de servicii centrate pe utilizator

ADR a anunțat în iunie 2026 un proiect pentru dezvoltarea serviciilor publice digitale centrate pe utilizator, cu etapă pilot și metodologie comună pentru instituții participante.

Acest context oferă o oportunitate de aliniere, dar Sistem Digital nu trebuie prezentat ca parte a proiectului ADR fără un acord sau mandat explicit.

Sursa:

- https://www.adr.gov.ro/articole/lansarea-proiectul-pentru-dezvoltarea-serviciilor-publice-digitale-centrate-pe-utilizator-in-administratia-publica-din-romania-finantat-prin-instrumentul-de-sprijin-tehnic-al-uniunii-europene

## Dovezi observabile în conținutul public

### 1. Calitatea și uniformitatea datelor variază

În catalog există denumiri foarte lungi, concatenări, diferențe de diacritice, majuscule și formulări tehnice. Unele pagini conțin câmpuri incomplete sau răspunsuri generice.

Exemple publice observate:

- rezultate de servicii cu titluri duplicate sau concatenate în pagina de listare;
- categorii și denumiri fără diacritice;
- pași ai procedurii reprezentați prin `-`;
- erori de tastare în descrieri;
- termeni și condiții care au păstrat placeholder-ul `(URL)`.

Surse:

- https://serviciipublice.gov.ro/servicii
- https://serviciipublice.gov.ro/serviciu/sistem-informatic-de-integrare-si-valorificare-operationala-si-analitica-a-volumelor-mari-de-date
- https://serviciipublice.gov.ro/termeni

### Ipoteză

Un design system nu poate rezolva numai prin CSS problemele de date și conținut. Sunt necesare:

- modele de conținut;
- validări editoriale;
- vocabular controlat;
- reguli pentru titluri, pași, taxe și termene;
- stări explicite pentru informații necunoscute sau neaplicabile;
- responsabil și dată de revizuire.

### 2. „Digitalizat” nu descrie suficient experiența

Catalogul clasifică servicii drept complet online, parțial online sau la ghișeu. Această clasificare este utilă, dar nu arată singură:

- dacă autentificarea este necesară;
- dacă utilizatorul poate salva și relua;
- dacă primește confirmare;
- dacă poate urmări statusul;
- dacă documentele sunt verificate la sursă;
- dacă plata este integrată;
- dacă serviciul este accesibil;
- dacă întregul flux este online sau doar formularul.

### Ipoteză

Sistem Digital trebuie să documenteze pattern-uri și stări de serviciu, nu doar pagini instituționale. Validatorul viitor trebuie să măsoare implementarea, nu declarația de digitalizare.

### 3. Aceleași informații apar în formate diferite

Serviciile publice folosesc în mod repetat:

- beneficiari;
- eligibilitate;
- documente necesare;
- pașii procedurii;
- termen mediu și maxim;
- taxe;
- canale;
- rezultat;
- bază legală;
- instituție responsabilă;
- ultima actualizare.

### Ipoteză

Acestea trebuie să devină pattern-uri comune și un model standard de conținut, cu componente precum:

- summary list;
- timeline/steps;
- document checklist;
- fee summary;
- service availability;
- status tracker;
- responsible authority;
- legal basis disclosure;
- last reviewed metadata.

### 4. Încrederea trebuie construită explicit

Catalogul nou afișează că este un site oficial ADR și include informații despre găzduirea în Cloudul Privat Guvernamental. Aceasta este o îmbunătățire relevantă pentru încredere.

### Ipoteză

Sistem Digital trebuie să ofere un pattern standard pentru:

- identificarea site-ului oficial;
- instituția responsabilă;
- domeniul verificabil;
- conexiunea securizată;
- sursa informației;
- ultima actualizare;
- raportarea unei probleme;
- diferența dintre informație orientativă și act juridic.

### 5. Accesibilitatea are bază legală, dar implementarea are nevoie de instrumente

ADR publică obligațiile și rapoarte de monitorizare. Instituțiile mici pot avea însă capacitate tehnică și bugetară reduse.

### Ipoteză

Sistem Digital trebuie să transforme obligațiile abstracte în:

- componente accesibile implicit;
- checklist-uri;
- teste automate;
- template-uri pentru declarația de accesibilitate;
- platformă multi-site sau integrare CMS;
- raportare publică a limitelor;
- ghiduri de remediere.

## Inventarul inițial al problemelor recurente

### Navigație și orientare

- denumiri diferite pentru aceeași destinație;
- meniuri construite după organigramă, nu după nevoia utilizatorului;
- lipsa evenimentelor de viață;
- breadcrumb inconsistent;
- navigație mobilă tratată ca versiune redusă a desktopului.

### Căutare și descoperire

- titluri administrative greu de căutat;
- rezultate duplicate sau prea lungi;
- lipsa sinonimelor și a limbajului cetățeanului;
- filtre greu de înțeles;
- diferență neclară între informație și inițierea serviciului.

### Formulare

- etichete și instrucțiuni inconsistente;
- cererea repetată a informațiilor deținute deja de stat;
- validare la final în loc de validare contextuală;
- mesaje de eroare generice;
- lipsa salvării și reluării;
- documente solicitate fără explicație.

### Conținut

- limbaj juridic sau organizațional;
- abrevieri neexplicate;
- texte foarte lungi;
- diacritice și capitalizare inconsistente;
- câmpuri goale reprezentate prin simboluri ambigue;
- baze legale fără explicația efectului pentru utilizator.

### Tranzacție

- autentificare diferită între servicii;
- plăți și programări în sisteme separate;
- confirmări fără număr de înregistrare clar;
- lipsa statusului dosarului;
- notificări neuniforme;
- trecerea neanunțată între domenii și furnizori.

### Accesibilitate

- focus imprevizibil;
- contraste și target sizes insuficiente;
- PDF-uri ca unic canal;
- formulare fără relații programatice clare;
- tabele greu de folosit pe mobil;
- informație transmisă numai prin culoare;
- lipsa testării cu cititoare de ecran.

### Operațional

- lipsa owner-ului pentru pagină sau serviciu;
- contractul se încheie, iar componenta rămâne neactualizată;
- versiunea bibliotecii nu este vizibilă;
- lipsa feedback-ului structurat;
- aceeași instituție operează mai multe stiluri și stack-uri;
- recepția achiziției nu verifică experiența completă.

## Principii locale care trebuie validate

1. Utilizatorul trebuie să identifice rapid dacă se află pe un site oficial.
2. Serviciul trebuie descris prin rezultatul obținut, nu prin denumirea compartimentului.
3. Datele pe care statul le poate verifica la sursă nu trebuie cerute sub formă de copie.
4. Cerințele juridice trebuie explicate în limbaj clar, fără pierderea preciziei.
5. Canalele fizice și digitale trebuie prezentate împreună, fără a ascunde limitările.
6. Utilizatorul trebuie să poată înțelege costul, termenul, pașii și statusul.
7. Instituțiile mici trebuie să poată adopta sistemul fără echipă frontend proprie.
8. Furnizorii trebuie să livreze cod actualizabil și verificabil, nu doar pagini finale.
9. Conținutul și datele trebuie să aibă owner, dată de revizuire și mecanism de feedback.
10. Orice personalizare trebuie să păstreze contrastul, semantica și interacțiunile comune.

## Eșantionul recomandat pentru auditul extins

Auditul următor trebuie să includă minimum 24 de produse:

- 4 ministere;
- 4 agenții naționale;
- 4 servicii tranzacționale cu trafic mare;
- 4 primării din municipii mari;
- 4 comune sau orașe mici;
- 2 instituții de educație;
- 2 instituții de sănătate.

Pentru fiecare se evaluează:

- desktop la 1440 px;
- mobil la 360–390 px;
- zoom 200% și 400%;
- tastatură;
- screen reader pe un subset;
- performanță de bază;
- conținut și structură;
- continuitatea fluxului între domenii;
- starea documentelor și PDF-urilor;
- existența declarației de accesibilitate.

## Ce nu putem concluziona încă

- care probleme produc cel mai mare abandon;
- ce termeni folosesc cetățenii în căutare;
- ce constrângeri operaționale au funcționarii;
- ce costuri și blocaje întâmpină furnizorii;
- ce componente lipsesc cel mai frecvent;
- ce nivel de personalizare este acceptabil instituțiilor;
- ce model de adopție este realist pentru fiecare categorie.

Aceste întrebări necesită cercetare de teren.

## Surse publice

- CNSP: https://serviciipublice.gov.ro/
- Catalog servicii: https://serviciipublice.gov.ro/servicii
- Instituții: https://serviciipublice.gov.ro/institutii
- Exemplu pagină serviciu: https://serviciipublice.gov.ro/serviciu/sistemul-electronic-de-achizitii-publice
- Termeni: https://serviciipublice.gov.ro/termeni
- ADR accesibilitate: https://www.adr.gov.ro/en/accesibilitate-site-uri-web
- Proiect ADR servicii centrate pe utilizator: https://www.adr.gov.ro/articole/lansarea-proiectul-pentru-dezvoltarea-serviciilor-publice-digitale-centrate-pe-utilizator-in-administratia-publica-din-romania-finantat-prin-instrumentul-de-sprijin-tehnic-al-uniunii-europene
