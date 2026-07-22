# Principiile de design — Sistem Digital

## Rolul principiilor

Principiile sunt criterii pentru decizii și compromisuri. Ele nu sunt sloganuri decorative.

Atunci când două soluții sunt tehnic posibile, echipa trebuie să poată explica alegerea prin aceste principii și prin dovezi despre utilizatori, context și risc.

## 1. Începe cu rezultatul utilizatorului

Descrie problema prin ceea ce persoana încearcă să obțină, nu prin instituția, compartimentul sau sistemul care procesează cererea.

### Aplicare

- denumește serviciile prin rezultat;
- identifică momentul de început și de sfârșit al experienței;
- măsoară finalizarea și calitatea rezultatului;
- include interacțiunile fizice, telefonice și administrative care influențează fluxul digital.

### Întrebări de decizie

- Ce încearcă persoana să rezolve?
- Cum știe că a reușit?
- Am proiectat doar ecranul nostru sau întregul serviciu?

## 2. Fă munca grea în sistem, nu în fața utilizatorului

Complexitatea instituțională, juridică și tehnică nu trebuie transferată persoanei sub forma unor formulare, documente sau explicații inutile.

### Aplicare

- verifică datele la sursă atunci când este legal și tehnic posibil;
- cere numai informații necesare;
- explică de ce este solicitată o informație;
- completează automat și reutilizează datele cu consimțământ și control;
- separă excepțiile rare de traseul principal.

### Întrebări de decizie

- Cerem utilizatorului să compenseze o limită internă?
- Putem elimina, verifica sau deduce acest pas?
- Ce se întâmplă pentru persoana care nu înțelege organigrama?

## 3. Accesibilitatea este fundație și dovadă

O componentă nu este accesibilă pentru că respectă vizual un kit sau pentru că un instrument automat este verde.

### Aplicare

- folosește HTML nativ înainte de ARIA personalizată;
- testează tastatura, zoom, reflow, forced colors și cititoare de ecran;
- publică starea testării și problemele cunoscute;
- include persoane cu dizabilități în cercetare;
- nu permite personalizări care invalidează contrastul sau semantica.

### Întrebări de decizie

- Poate fi parcursă funcția fără pointer?
- Este informația disponibilă fără culoare, poziție sau vedere?
- Ce dovadă avem și ce nu am testat încă?

## 4. Claritatea precedă densitatea și decorul

Serviciile publice trebuie să reducă incertitudinea. Elementele vizuale sunt justificate dacă ajută orientarea, înțelegerea sau acțiunea.

### Aplicare

- o acțiune principală clară pe etapă;
- titluri descriptive și limbaj direct;
- informația esențială înaintea detaliilor;
- spațiu și ierarhie pentru scanare;
- evitarea dashboard-urilor și cardurilor când un text sau o listă este mai clară.

### Întrebări de decizie

- Ce trebuie observat prima dată?
- Poate fi eliminat acest element fără pierderea sensului?
- Am optimizat pentru aspect sau pentru decizie?

## 5. Proiectează pentru încredere verificabilă

Încrederea nu se obține doar prin stemă sau culoare instituțională. Utilizatorul trebuie să poată verifica originea, responsabilitatea și consecințele unei acțiuni.

### Aplicare

- identifică site-ul oficial și instituția responsabilă;
- afișează ultima actualizare și owner-ul informației;
- explică folosirea datelor și efectul unei acțiuni;
- semnalizează trecerea către alt domeniu sau furnizor;
- oferă confirmare, număr de înregistrare și cale de remediere;
- nu folosi dark patterns sau urgență artificială.

### Întrebări de decizie

- Cum verifică persoana că este pe canalul corect?
- Cine răspunde pentru informație și rezultat?
- Ce dovadă primește după acțiune?

## 6. Reutilizează înainte să inventezi

O soluție comună și bine testată este preferabilă unei variante locale mai spectaculoase, dar incompatibile.

### Aplicare

- verifică mai întâi componentele și pattern-urile existente;
- propunerile noi trebuie să fie utile, distincte și reutilizabile;
- contribuie înapoi cercetarea și îmbunătățirile;
- evită duplicatele diferențiate numai prin aspect;
- mută variațiile legitime în API-uri și token-uri documentate.

### Întrebări de decizie

- Ce problemă nouă rezolvă această variantă?
- Există deja o soluție care poate fi extinsă?
- Poate fi folosită în mai multe servicii?

## 7. Coerență în comportament, flexibilitate controlată în identitate

Instituțiile pot avea identitate proprie, dar acțiunile, stările și semnificațiile comune trebuie să rămână predictibile.

### Aplicare

- rolurile semantice rămân stabile între teme;
- personalizarea folosește token-uri publice;
- focusul, erorile, succesul și avertizările nu se redefinesc local;
- componentele critice păstrează structura și interacțiunea;
- extensiile locale sunt distincte de nucleul oficial.

### Întrebări de decizie

- Schimbarea exprimă identitatea sau schimbă sensul?
- Va recunoaște utilizatorul aceeași acțiune în alt serviciu?
- Poate fi actualizată tema fără fork al componentelor?

## 8. Proiectează mobilul ca un context, nu ca o lățime

Responsive design nu înseamnă comprimarea layout-ului desktop. Mobilul poate implica timp limitat, lumină puternică, conexiune instabilă, o singură mână și întreruperi.

### Aplicare

- prioritizează conținutul și acțiunile;
- păstrează target-uri suficiente;
- evită tabelele și comparațiile imposibil de operat;
- permite salvarea și reluarea;
- minimizează upload-ul și consumul de date;
- testează tastatura virtuală, orientarea și zoom-ul.

### Întrebări de decizie

- Funcționează în 360 px fără pierderea informației?
- Ce se întâmplă dacă sesiunea este întreruptă?
- Poate fi folosit în condiții de conexiune slabă?

## 9. Conținutul este parte din interfață și din API

Denumirile, instrucțiunile și mesajele de eroare influențează comportamentul la fel de mult ca structura vizuală.

### Aplicare

- vocabular controlat pentru acțiuni și stări;
- limbaj clar, activ și specific;
- mesaje de eroare care explică problema și remedierea;
- formate comune pentru taxe, termene, documente și status;
- exemple de conținut și anti-pattern-uri în documentația componentelor;
- data revizuirii și owner pentru conținut critic.

### Întrebări de decizie

- Ce va înțelege o persoană fără cunoștințe administrative?
- Folosim aceeași denumire pentru aceeași acțiune?
- Textul ajută utilizatorul să remedieze situația?

## 10. Construiește pentru schimbare și actualizare

Un serviciu public va fi modificat de legislație, procese, tehnologii și nevoi. Sistemul trebuie să permită evoluția fără copiere și abandon.

### Aplicare

- pachete versionate și lockfile;
- URL-uri CDN imutabile;
- changelog și migration guides;
- deprecation înainte de eliminare;
- update-uri prin pull requests automate;
- rollback fără refolosirea versiunii;
- separarea API-urilor publice de detaliile interne.

### Întrebări de decizie

- Cum va fi actualizat acest cod peste doi ani?
- Ce se întâmplă dacă furnizorul dispare?
- Poate consumatorul identifica versiunea și impactul schimbării?

## 11. Fă starea și limitele vizibile

Utilizatorii sistemului de design trebuie să știe ce este stabil, ce este experimental, ce a fost testat și unde există risc.

### Aplicare

- maturity status pentru componente;
- versiune și owner;
- matrice de accesibilitate;
- issues și limitări cunoscute;
- contexte în care componenta a fost cercetată;
- suport și termen de răspuns;
- diferențiere vizibilă între nucleu și resurse comunitare.

### Întrebări de decizie

- Poate o echipă evalua riscul înainte de adopție?
- Este clar ce garantează sistemul și ce rămâne responsabilitatea implementatorului?
- Avem owner și plan de mentenanță?

## 12. Măsoară rezultatele, nu producția

Numărul de componente, pagini sau vizite nu dovedește succesul unui design system.

### Aplicare

- măsoară servicii și organizații care adoptă;
- urmărește timpul de implementare și actualizare;
- măsoară finalizarea, erorile și abandonul;
- urmărește problemele de accesibilitate prevenite;
- colectează feedback de la implementatori și utilizatori;
- elimină componente care nu produc valoare sau nu pot fi menținute.

### Întrebări de decizie

- Ce rezultat se îmbunătățește?
- Ce dovadă va arăta că soluția funcționează?
- Măsurăm utilizarea reală sau doar activitatea proiectului?

## Principii de content design

1. Folosește cuvintele utilizatorilor, nu denumirile interne.
2. Spune mai întâi ce poate face persoana și ce urmează.
3. O propoziție trebuie să aibă o singură funcție principală.
4. Explică termenii juridici necesari și elimină jargonul nenecesar.
5. Nu folosi „click aici”, „trimite” sau „continuă” fără context când poate exista o etichetă specifică.
6. Nu ascunde costuri, termene, condiții sau consecințe în note secundare.
7. Mesajele de eroare descriu problema, locul și soluția.
8. Câmpurile necunoscute, neaplicabile și necompletate au stări distincte.
9. Diacriticele și formatele de dată, oră, sumă și adresă sunt consecvente.
10. Conținutul critic are owner și dată de revizuire.

## Cum se folosesc principiile în review

Pentru fiecare decizie semnificativă, pull request-ul sau RFC-ul trebuie să răspundă:

1. Ce nevoie și ce rezultat urmărește?
2. Ce dovezi avem?
3. Ce principii susțin soluția?
4. Ce principii sunt în tensiune?
5. Ce alternative au fost evaluate?
6. Ce risc rămâne?
7. Cum vom măsura rezultatul?

## Compromisuri tipice

### Coerență versus personalizare

Se preferă coerența pentru comportament, semantică și accesibilitate. Personalizarea este permisă pentru identitate în limitele token-urilor validate.

### Simplitate versus acoperirea excepțiilor

Traseul principal trebuie să rămână simplu. Excepțiile sunt tratate contextual, fără a încărca fiecare utilizator.

### Viteză versus dovadă

Prototiparea poate fi rapidă, dar o componentă nu devine stabilă fără testare și owner.

### Automatizare versus evaluare umană

Automatizarea blochează regresii detectabile. Evaluarea umană rămâne obligatorie pentru sens, context, cititoare de ecran și utilizabilitate.

### Uniformitate versus autonomie

Sistem Digital nu uniformizează toate paginile. El standardizează blocurile comune și lasă autonomia acolo unde există o nevoie reală și documentată.

## Trasabilitate

Principiile sunt fundamentate în:

- auditul comparativ al sistemelor mature;
- auditul de birou al contextului românesc;
- standardul de accesibilitate;
- viziunea de produs;
- cercetarea de teren, pe măsură ce aceasta este finalizată.

Modificarea unui principiu necesită RFC public și dovezi care arată de ce forma actuală nu mai ghidează corect deciziile.
