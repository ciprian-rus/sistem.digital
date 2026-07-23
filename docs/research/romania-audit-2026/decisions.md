# Decizii pentru backlog

## Propuneri susținute de audit

| Prioritate | Increment                              | Dovezi                                                        | Acțiune                                                                                                   |
| ---------- | -------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| P0         | Rezumat standard „Înainte să începi”   | OBS-007, OBS-009, OBS-011, OBS-012, OBS-022                   | Definește rezultat, eligibilitate, documente, cost, termen, autentificare și canal înainte de tranzacție. |
| P0         | Transfer între domenii                 | OBS-001, OBS-007, OBS-011, OBS-012, OBS-016, OBS-019, OBS-022 | Adaugă avertizare, operator, motiv, date solicitate și întoarcere sigură.                                 |
| P0         | Status, confirmare și reluare          | OBS-010, OBS-013, OBS-016, OBS-024                            | Transformă stările serviciului într-un model și un pattern documentat.                                    |
| P1         | Documente cu alternativă HTML          | OBS-002, OBS-003, OBS-015, OBS-021                            | Cere rezumat HTML, metadate, format, dimensiune, limbă și dată de revizuire.                              |
| P1         | Alegerea canalului                     | OBS-009, OBS-019, OBS-023, OBS-024                            | Compară canalele după condiții, cost, timp, disponibilitate și urmărire.                                  |
| P1         | Găsire după rezultat                   | OBS-005, OBS-014, OBS-020, OBS-021                            | Extinde taxonomia și sinonimele; validează în #54 și #40–#42.                                             |
| P1         | Șablon de declarație de accesibilitate | OBS-008 și protocolul #53                                     | Include dată, metodă, limitări, feedback, escaladare și plan de remediere.                                |

## Mapare pe roadmap

- #19 — adaugă pattern-urile „Înainte să începi”, transfer extern, documente, alegerea canalului și status.
- #20 — păstrează serviciul demonstrativ drept banc de test pentru stări, reluare, confirmare și indisponibilitate.
- #25 — validatorul trebuie să poată verifica prezența metadatelor, nu să pretindă că poate valida singur calitatea procesului.
- #40–#42 — ghidurile de cercetare trebuie să testeze vocabularul, încrederea la schimbarea domeniului și diferența dintre canale.
- #53 — subsetul manual trebuie să includă un formular, o programare, o pagină cu PDF și un transfer către autentificare.
- #54 — rezultatele tree testing-ului decid dacă etichetele observate ca problematice schimbă taxonomia.

## Criteriul de închidere pentru #39

- [x] eșantion de 24 de produse din cele șapte categorii;
- [x] protocol, severitate, încredere și limitări;
- [x] observații trasabile și exemple pozitive;
- [x] constatări susținute de minimum trei produse din două categorii;
- [x] decizii mapate pe backlog;
- [ ] a doua evaluare / peer review a unui subset;
- [ ] publicarea raportului prin PR și actualizarea issue-urilor.
