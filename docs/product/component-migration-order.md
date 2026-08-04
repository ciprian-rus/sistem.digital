# Ordinea de migrare a componentelor la șablonul canonic (Epic C, #116)

## Obiectiv

#116 cere explicit „o ordine de migrare documentată, nu ad-hoc" ca prim criteriu de acceptare. Acest document fixează ordinea și motivul ei, înainte de a scrie conținutul narativ pe 15 secțiuni pentru cele 63 de componente rămase nedocumentate (din 64 publicate; `content-bar-chart` are deja o intrare completă, ca dovadă de concept).

## Ordinea, per familie

| # | Familie                  | Componente rămase | Motiv                                                                                                                                                                       |
| - | ------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Formulare**              | 16                  | Numite explicit ca prioritate în #116 („cele mai vizibile"). Prezente în aproape orice serviciu tranzacțional — inclusiv în cele patru modele sectoriale deja livrate (Epic E), toate construite peste `ReferenceService`, care le folosește pe toate.                       |
| 2 | **Navigație**               | 14                  | Numite explicit alături de formulare în #116. Structurează fiecare pagină publică a site-ului (header, footer, breadcrumb) — cel mai reutilizat cod din tot sistemul, chiar dacă mai puțin „vizibil" ca interacțiune directă.                                              |
| 3 | **Conținut și date**        | 18 (din 19; 1 gata) | Folosite pe scară largă (carduri, tabele, alerte), dar eterogene ca scop — documentate după ce formularele și navigația stabilesc convenția de scriere a celor 15 secțiuni.                                                                                                |
| 4 | **Interactive**             | 10                  | Cele mai complexe (necesită enhancement JS explicit: accordion, dialog, tabs, autocomplete, tooltip, dropdown, file-upload-advanced). Migrate ultimele, ca să beneficieze de convențiile de descriere a comportamentului „fără JS / cu JS" deja rodate la `error-summary` și `character-count` din Formulare.                          |

## Ordinea în interiorul unei familii

Criteriul epic-ului este „o familie de componente per pull request" — nu neapărat „toate componentele unei familii într-un singur PR". O familie mare (Formulare, Navigație) poate fi livrată în mai multe PR-uri succesive, dacă asta păstrează fiecare PR revizuibil; ordinea internă urmează structura deja folosită de `familyDefinitions` din `catalog-data.mjs` (ordinea `names[]`), care merge de la elementele structurale (label, hint, fieldset) spre cele mai specializate (segmented-control, character-count) — nu o reordonare arbitrară.

## Sursa de adevăr per componentă

Pentru fiecare componentă, conținutul narativ se derivă din, în această ordine de prioritate:

1. sursa reală (`packages/components/src/<familie>.ts`/`.css`) — comportament, clase CSS, enhancement JS;
2. exemplul de markup deja existent în `catalog-data.mjs` (`markupFor`) — verificat, nu doar citat, contra sursei de mai sus (a se vedea corectarea din PR #174, unde exemplul conținea o clasă CSS inexistentă);
3. `docs/accessibility/component-template.md` și `docs/content/content-style-guide.md`, pentru convențiile deja stabilite de accesibilitate și content design.

Nicio secțiune nu se completează prin presupunere generică — dacă sursa nu conferă suficientă informație pentru un câmp (de exemplu `research`), câmpul rămâne un array gol, la fel ca la `content-bar-chart`.

## Progresul

Vizibil prin `node scripts/check-component-docs.mjs` (raportul per familie, #117) — necondiționat de acest document, dar ordinea de mai sus explică *de ce* procentele cresc în această secvență, nu în alta.
