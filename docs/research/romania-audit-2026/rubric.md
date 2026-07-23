# Protocol și grilă

## Reguli de execuție

1. Evaluatorul pornește de la URL-ul din eșantion și urmărește sarcina formulată, fără motor de căutare extern după începerea traseului.
2. Se testează numai suprafața publică. Nu se creează conturi, nu se ocolesc CAPTCHA și nu se trimit formulare reale.
3. Se notează fiecare schimbare de domeniu, cerință de autentificare și punct în care sarcina nu mai poate continua în siguranță.
4. Desktopul se verifică la 1440 CSS px, iar mobilul la 390 CSS px. Reflow-ul se verifică separat la zoom 200% și 400%.
5. Traseul principal se parcurge cu tastatura. Cititorul de ecran se folosește pe un subset stratificat, stabilit înaintea sintezei.
6. Un instrument automat poate descoperi semnale, dar nu justifică singur o concluzie de accesibilitate.
7. Fișierele descărcabile se verifică numai dacă sunt necesare sarcinii. Se notează tipul, titlul, limba, dimensiunea publicată și dacă există alternativă HTML.
8. Nu se introduc date personale reale. Exemplele fictive nu sunt trimise.

## Dimensiuni

| Cod | Dimensiune                               | Întrebarea evaluată                                                                  |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| TRU | Încredere și autenticitate               | Este clar că produsul este oficial, cine îl operează și cum poate fi verificat?      |
| FIN | Găsire și orientare                      | Poate fi găsit serviciul din punctul de intrare și este traseul inteligibil?         |
| CNT | Conținut                                 | Sunt clare rezultatul, eligibilitatea, documentele, costul, termenul și pașii?       |
| MOB | Mobil și reflow                          | Rămâne sarcina utilizabilă la 390 px și la zoom 200%/400%?                           |
| KEY | Tastatură                                | Poate fi parcurs traseul fără mouse, cu focus vizibil și ordine logică?              |
| SEM | Semantică și tehnologii asistive         | Structura, numele accesibile, stările și erorile sunt expuse programatic?            |
| FRM | Formulare și erori                       | Etichetele, instrucțiunile, validarea și recuperarea din erori sunt clare?           |
| AUT | Autentificare                            | Cerința și opțiunile de autentificare sunt explicate înainte de blocaj?              |
| XDM | Continuitate între domenii               | Trecerea către alt domeniu sau furnizor este anticipată și păstrează contextul?      |
| DOC | Documente                                | Documentele sunt identificabile, accesibile și oferite și ca HTML când este posibil? |
| PAY | Plată/programare/status                  | Tranzacția oferă confirmare, anulare sau reluare și un status inteligibil?           |
| ACC | Declarație și feedback de accesibilitate | Există declarație actuală, limitări și canal de contact?                             |
| PER | Performanță de bază                      | Pagina pornește și răspunde rezonabil în condițiile auditului?                       |

`N/A` este permis numai când dimensiunea nu aparține sarcinii. `NT` înseamnă „netestat” și nu intră în scor sau concluzii.

## Scala observațiilor

Auditul păstrează observații, nu un scor competitiv. Pentru rezumate interne se folosește o scală ordinală:

- `0 — blocat`: sarcina nu poate continua prin canalul evaluat;
- `1 — problemă majoră`: este probabilă eroarea, abandonul sau excluderea;
- `2 — problemă moderată`: sarcina poate continua cu efort sau ambiguitate semnificativă;
- `3 — adecvat`: sarcina este posibilă fără obstacole materiale observate;
- `4 — practică utilă`: soluție clară și reutilizabilă, susținută de dovada observată;
- `N/A` sau `NT`.

Scorul nu este publicat ca clasament al instituțiilor. Este folosit pentru consistența evaluatorului și pentru a identifica repetiții.

## Severitate

- `critical`: împiedică accesul la un serviciu esențial sau produce risc serios;
- `high`: blochează sarcina pentru un segment ori face foarte probabil abandonul;
- `medium`: crește material efortul, incertitudinea sau riscul de eroare;
- `low`: problemă locală, fără efect major asupra finalizării;
- `positive`: practică utilă, candidat pentru reutilizare.

## Nivelul de încredere

- `confirmed`: dovada este reproductibilă și converge cu alte metode ori produse;
- `probable`: observația se repetă, dar există limitări de acces sau eșantion;
- `hypothesis`: o singură observație ori acces parțial; necesită validare;
- `contradicted`: dovada observată limitează o ipoteză anterioară.

Concluziile comparative sunt cel mult `probable` în acest audit de birou. Comportamentul, abandonul și impactul asupra utilizatorilor nu pot fi declarate `confirmed` fără cercetare de teren sau date operaționale.

## Schema observațiilor

`observations.csv` va conține:

```text
observation_id,product_id,audit_date,viewport,assistive_technology,
task_step,url,dimension,rating,severity,observation,evidence,
expected_pattern,problem_type,confidence,limitation
```

`problem_type` folosește una dintre valorile:

- `interface`;
- `content`;
- `data`;
- `process`;
- `interoperability`;
- `operations`;
- `legislation`;
- `capacity`;
- `unknown`.

## Controlul calității

- orice constatare transversală trebuie susținută de minimum trei produse din minimum două categorii;
- exemplele pozitive sunt păstrate cu aceeași rigoare ca problemele;
- indisponibilitatea temporară este reverificată înaintea sintezei;
- blocarea prin autentificare sau CAPTCHA este o limitare a auditului, nu automat un defect;
- absența unei dovezi nu este transformată în dovada absenței;
- orice schimbare propusă în backlog indică observațiile care o susțin și ce cercetare suplimentară este necesară.
