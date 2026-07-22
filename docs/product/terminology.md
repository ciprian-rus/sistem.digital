# Terminologia canonică — Sistem Digital

Acest glosar se aplică documentației, interfeței platformei, codului și comunicării publice. Termenii noi sau modificările de sens se propun prin RFC.

## Sistem Digital

Numele produsului și al ecosistemului open-source. Se scrie cu majuscule inițiale, fără ghilimele.

Nu se folosește automat formularea „sistemul oficial al statului” în absența unui mandat instituțional formal.

## sistem.digital

Domeniul platformei publice de documentație și comunitate.

## Design system

Ansamblul coerent de fundamente, token-uri, componente, pattern-uri, documentație, cod și procese de guvernanță.

Nu este sinonim cu „ghid de brand”, „template” sau „bibliotecă de componente”.

## Fundație

Regulă transversală care influențează toate componentele și pattern-urile: culoare, tipografie, spațiere, layout, mișcare, iconografie, accesibilitate și content design.

## Design token

Decizie de design reprezentată într-un format reutilizabil și independent de o componentă. Exemple: rol semantic de culoare, spațiere, dimensiune, tipografie sau durată de animație.

Se preferă denumiri semantice, precum `color.text.default`, în locul denumirilor pur vizuale, precum `blue-700`, în API-urile consumatorilor.

## Componentă

Element reutilizabil cu structură, stil, comportament, documentație și criterii de accesibilitate definite.

O componentă nu este doar un mockup și nu devine `stable` fără teste și documentație.

## Pattern

Soluție reutilizabilă pentru o problemă de interacțiune sau de serviciu, construită de regulă din mai multe componente. Exemple: verificarea răspunsurilor, afișarea erorilor sau urmărirea unei solicitări.

## Template

Structură de pagină sau de produs care combină fundații, componente și pattern-uri pentru un context determinat. Template-ul nu trebuie confundat cu o componentă.

## Starter

Proiect tehnic minimal, instalabil și executabil, care demonstrează integrarea Sistem Digital într-o tehnologie sau platformă.

## Serviciu de referință

Aplicație demonstrativă completă, utilizată pentru validarea componentelor și pattern-urilor într-un flux real de la început la confirmare.

## Aplicație de referință

Termen mai larg decât „serviciu de referință”; poate demonstra și dashboard-uri, administrare internă sau alte tipuri de produse digitale.

## Implementare

Utilizarea concretă a Sistem Digital într-un site, serviciu, aplicație sau CMS. Conformitatea implementării trebuie evaluată separat de calitatea pachetului de bază.

## Adopție

Integrarea măsurabilă a Sistem Digital într-un proiect real. Vizualizarea documentației, copierea unui fragment sau exprimarea interesului nu reprezintă singure adopție.

## Conformitate

Îndeplinirea unui set declarat de cerințe într-o implementare și într-un domeniu evaluat. Utilizarea componentelor Sistem Digital nu produce automat conformitate.

## Accesibilitate

Calitatea prin care persoane cu diferite capacități, dispozitive și tehnologii asistive pot percepe, opera și înțelege un produs digital.

Ținta tehnică a proiectului este WCAG 2.2 A și AA, completată de cerințele aplicabile din EN 301 549.

## Progressive enhancement

Abordare prin care funcționalitatea esențială este disponibilă prin HTML și comportamente de bază, iar capabilitățile avansate sunt adăugate fără a distruge experiența fundamentală.

## Framework-agnostic

API sau resursă care nu depinde de un singur framework de interfață. Nu înseamnă că toate adaptoarele sunt identice sau că nu există implementări specializate.

## Self-hosting

Găzduirea locală, de către implementator, a fișierelor și assets Sistem Digital. Este opțiunea recomandată pentru reziliență și control în multe servicii publice.

## CDN versionat

Distribuție de fișiere prin URL-uri imutabile care includ versiunea. Nu se utilizează `latest` în producție.

## Stable

Nivel de maturitate acordat unei componente sau unui API care are documentație, teste, comportament definit și reguli de compatibilitate. `Stable` nu înseamnă lipsa oricărei probleme cunoscute.

## Experimental

Element publicat pentru evaluare, care poate suferi schimbări incompatibile și nu este recomandat pentru utilizare critică fără analiză.

## Deprecated

API sau componentă menținută temporar pentru compatibilitate, dar programată pentru înlocuire sau eliminare. Documentația trebuie să indice alternativa și planul de migrare.

## LTS

Linie de versiune cu suport pe termen lung, desemnată prin RFC și cu termene publice. Nu orice versiune majoră este automat LTS.

## Maintainer

Persoană responsabilă pentru evaluarea, integrarea și întreținerea contribuțiilor într-o arie a proiectului.

## Contributor

Persoană sau organizație care furnizează cod, documentație, cercetare, testare, feedback sau alte contribuții verificabile.

## RFC

Propunere formală pentru o decizie cu impact larg asupra arhitecturii, API-urilor, guvernanței sau direcției de produs.

## ADR

Înregistrare a unei decizii de arhitectură, a contextului și a consecințelor sale.

## Issue

Unitate de lucru, problemă, propunere sau discuție urmărită în GitHub. Un issue nu reprezintă automat un angajament de livrare.

## Epic

Grupare a mai multor issues care contribuie la un rezultat de produs comun.

## Milestone

Etapă de livrare cu obiectiv și criterii de închidere. În documentație se folosesc identificatorii M0–M7 definiți în roadmap.

## Release candidate

Ansamblu de artefacte construit și verificat înaintea publicării: tarball, SBOM, hash-uri și rezultate de testare.

## Provenance

Dovadă verificabilă privind originea și procesul de build al unui artefact. Provenance nu dovedește absența vulnerabilităților.

## SBOM

Inventar machine-readable al componentelor software și dependențelor incluse într-un release.

## Validator

Instrument care verifică automat sau asistat reguli definite de Sistem Digital. Rezultatul validatorului nu înlocuiește evaluarea manuală completă.

## Badge

Indicator public asociat unei versiuni și unei evaluări determinate. Nu se utilizează termenul „certificare” decât dacă există o procedură formală și o autoritate competentă.

## Comunitate

Ansamblul contributorilor, utilizatorilor, organizațiilor și persoanelor implicate în cercetare, testare, propuneri și adopție.

## Vot

Semnal de prioritizare din partea comunității. Votul nu înlocuiește cercetarea cu utilizatori, evaluarea accesibilității, analiza tehnică sau decizia de guvernanță.
