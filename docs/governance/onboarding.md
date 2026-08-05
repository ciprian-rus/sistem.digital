# Onboarding pentru contribuitori noi

## Obiectiv

#23 cere un traseu clar de la idee la contribuție și un proces de onboarding. Acest document leagă instrumentele deja publicate (`CONTRIBUTING.md`, `docs/governance/proposal-process.md`, `docs/governance/component-maturity-model.md`) într-un parcurs concret pentru o persoană care nu a mai contribuit niciodată la Sistem Digital.

## Traseul de la idee la contribuție

```text
1. Idee neformalizată
   → docs/governance/proposal-process.md, „Fluxul de admitere"
2. Prima contribuție mică (fără propunere formală)
   → vezi „Prima contribuție" mai jos
3. Propunere formală (componentă sau RFC)
   → docs/governance/proposal-process.md, „Pragul: ce formă de propunere?"
4. Implementare
   → CONTRIBUTING.md, „Flux recomandat"
5. Componenta intră în modelul de maturitate
   → docs/governance/component-maturity-model.md (dacă e cazul)
```

Fiecare pas de mai sus e deja documentat separat — acest document nu repetă conținutul, doar arată ordinea și unde se intră.

## Prima contribuție

Pentru cineva nou, o propunere formală (RFC sau componentă) nu e primul pas recomandat — riscul de a investi efort într-o propunere respinsă e mai mare fără experiență prealabilă cu convențiile proiectului. Traseul recomandat pentru prima contribuție:

1. **citește** `CONTRIBUTING.md` și `CODE_OF_CONDUCT.md` — 10 minute;
2. **alege o primă contribuție mică**: o corecție de documentație, un test lipsă semnalat într-un issue existent, sau o problemă etichetată explicit ca potrivită pentru începători, dacă există una deschisă;
3. **clonează și rulează local**: `pnpm install`, `pnpm check` — confirmă că mediul local funcționează înainte de orice schimbare de cod;
4. **deschide un pull request mic**, urmând checklist-ul din `.github/PULL_REQUEST_TEMPLATE.md`;
5. **primește review** de la un reviewer sau maintainer — feedback-ul e obligatoriu la fiecare tranziție, conform `docs/governance/proposal-process.md`.

Abia după o primă contribuție acceptată, o propunere formală (componentă nouă sau RFC) devine un pas rezonabil.

## Mentorat

Un contribuitor nou poate cere explicit, în primul issue sau PR, să fie asociat cu un reviewer care urmărește contribuția până la finalizare — nu un program formal separat, doar o cerere explicită, onorată de orice reviewer sau maintainer disponibil.

## Ce nu este acoperit de acest document

**Acest proces nu a fost testat cu un contribuitor nou real** — criteriul de acceptare #23 („există minimum un proces de onboarding testat cu contributori noi") cere explicit testare, nu doar documentare, și nu poate fi simulat onest: nu există încă niciun contribuitor extern real. Rămâne blocat exact ca recrutarea de participanți din #40-42 — nu de lipsă de proces scris, ci de lipsă de o primă persoană reală care să-l parcurgă.

Odată ce apare un prim contribuitor extern real, acest document se actualizează cu observațiile concrete din parcursul lui — pașii de mai sus sunt un draft, nu varianta finală.

## Riscuri

Fără testare reală, pașii de mai sus pot avea fricțiuni neanticipate (documentație lipsă, comenzi care eșuează într-un mediu curat, timp de răspuns la review nedefinit). Acest document e punctul de plecare, nu o garanție.
