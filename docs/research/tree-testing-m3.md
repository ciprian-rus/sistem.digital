# Protocol de tree testing pentru arhitectura M3

## Obiectiv

Verificarea faptului că persoane cu roluri diferite pot identifica rapid categoria și pagina potrivită fără a vedea designul vizual al platformei.

## Taxonomia testată

- Fundamente;
- Componente;
- Pattern-uri;
- Template-uri;
- Ghiduri;
- Guvernanță.

Căutarea nu este inclusă în arbore, deoarece testul urmărește calitatea clasificării și a denumirilor.

## Participanți

Minimum 20 de participanți, distribuiți astfel:

- 4 designeri sau cercetători UX;
- 4 dezvoltatori;
- 4 autori de conținut sau comunicatori instituționali;
- 4 funcționari ori proprietari de servicii;
- 4 furnizori, responsabili de achiziții sau decidenți instituționali.

Se urmărește includerea a cel puțin patru persoane care folosesc tehnologii asistive ori au nevoi de accesibilitate relevante.

## Sarcini

Participanții aleg locul în care s-ar aștepta să găsească răspunsul pentru fiecare situație:

1. „Vrei să afli ce culoare trebuie folosită pentru un mesaj de eroare.”
2. „Vrei markup-ul corect pentru un câmp obligatoriu cu mesaj de eroare.”
3. „Vrei un flux complet pentru verificarea răspunsurilor înainte de trimiterea cererii.”
4. „Vrei un proiect Next.js pregătit pentru pornire.”
5. „Vrei reguli pentru redactarea textului unui buton.”
6. „Vrei să propui schimbarea API-ului unei componente.”
7. „Vrei să verifici dacă un dialog funcționează fără JavaScript.”
8. „Vrei criterii pentru o achiziție publică bazată pe Sistem Digital.”
9. „Vrei să afli ce versiune a pachetului este documentată.”
10. „Vrei să raportezi o vulnerabilitate fără a publica detaliile.”

## Răspunsuri așteptate

| Sarcină | Destinație principală                      |
| ------- | ------------------------------------------ |
| 1       | Fundamente → Culori și teme                |
| 2       | Componente → Formulare                     |
| 3       | Pattern-uri                                |
| 4       | Template-uri                               |
| 5       | Ghiduri → Content design                   |
| 6       | Guvernanță → RFC și contribuții            |
| 7       | Componente → Interactive                   |
| 8       | Ghiduri → Achiziții și adopție             |
| 9       | pagina componentei sau catalogul versionat |
| 10      | Guvernanță → Securitate                    |

## Indicatori

Pentru fiecare sarcină se măsoară:

- succes direct;
- succes indirect;
- eșec;
- primul clic în arbore;
- timpul până la alegere;
- încrederea declarată pe o scară de la 1 la 5;
- comentariile despre denumiri ambigue.

## Praguri de acceptare

- minimum 80% succes direct pentru sarcinile critice 1, 2, 6, 9 și 10;
- minimum 70% succes direct pentru restul sarcinilor;
- minimum 85% succes direct sau indirect pentru fiecare sarcină;
- maximum 20% dintre participanți aleg o categorie greșită identică;
- scor median de încredere minimum 4 din 5.

Un prag ratat produce modificarea denumirilor sau structurii și o rundă de retestare.

## Procedură

1. participantul primește numai arborele textual;
2. ordinea sarcinilor este randomizată;
3. moderatorul nu explică termenii taxonomiei;
4. participantul verbalizează așteptările după alegere, nu în timpul căutării;
5. rezultatele sunt anonimizate;
6. observațiile sunt grupate pe rol și sarcină;
7. deciziile rezultate sunt publicate în issue #54.

## Instrument public

Testul este disponibil la `/cercetare/tree-testing`. Instrumentul:

- randomizează ordinea celor 10 sarcini pentru fiecare participant;
- prezintă exclusiv arborele textual, fără căutare sau indicii vizuale din platformă;
- măsoară prima categorie, traseul, alegerea finală, timpul și încrederea;
- colectează rolul general și opțiunea privind nevoile de accesibilitate, fără nume, e-mail sau
  cont;
- permite un singur răspuns pe instalarea browserului și oferă participantului o copie JSON;
- validează strict payloadul și colectează numai răspunsurile trimise pe domeniul Production;
- păstrează temporar răspunsurile brute în logurile Vercel, apoi publică numai agregări și
  observații anonimizate.

Pagina rămâne `noindex` pe durata studiului. După atingerea eșantionului și publicarea raportului,
endpointul de colectare este dezactivat sau mutat într-o rundă nouă versionată.

## Limitări

Tree testing-ul nu validează:

- aspectul și lizibilitatea navigației;
- operarea cu tastatura sau cititorul de ecran;
- calitatea căutării;
- conținutul paginii destinație;
- performanța website-ului.

Acestea sunt testate separat prin Playwright, auditul manual de accesibilitate și cercetarea de utilizabilitate.
