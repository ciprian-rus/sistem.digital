# Registrul public de decizii

## Obiectiv

Fiecare decizie RFC (acceptat, acceptat parțial, amânat, respins) luată prin procesul definit în [`docs/governance/proposal-process.md`](proposal-process.md) e înregistrată aici, cu link către discuția originală. Registrul e append-only: o decizie ulterioară care schimbă una anterioară adaugă o intrare nouă, nu editează retroactiv intrarea veche.

## Decizii

| #                                                                | Titlu                                                               | Decizie              | Data       | Motivare (rezumat)                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#202](https://github.com/ciprian-rus/sistem.digital/issues/202) | Șablon YAML/JSON executabil pentru pachetul de achiziție            | **Amânat**           | 2026-08-05 | Fără un consumator real (pilot #26), nu există cum să validăm forma corectă a formatului — construirea lui acum ar fi „pregătire pentru un viitor ipotetic". Se redeschide automat la prima cerere concretă dintr-un pilot real.                              |
| [#203](https://github.com/ciprian-rus/sistem.digital/issues/203) | Regulă de validator automată pentru clauza anti-lock-in (clauza 13) | **Acceptat parțial** | 2026-08-05 | Direcția e acceptată — reutilizează verificarea deja existentă din `scripts/check-catalog.mjs`, risc tehnic scăzut. Implementarea imediată e respinsă: adăugare de scope la #25 fără o achiziție reală care s-o ceară. Rămâne candidat de backlog pentru #25. |

## Cum se adaugă o decizie nouă

1. RFC-ul parcurge ciclul de decizie descris în `proposal-process.md`.
2. Decizia și motivarea se postează ca și comentariu public pe issue-ul RFC, niciodată doar ca etichetă.
3. Issue-ul se închide cu `state_reason` corespunzător (`completed` pentru acceptat/acceptat parțial, `not_planned` pentru amânat/respins — ambele redeschise ulterior conform căilor de contestare din `proposal-process.md`, nu permanent).
4. Se adaugă un rând nou în tabelul de mai sus — niciodată o editare a unui rând existent.
