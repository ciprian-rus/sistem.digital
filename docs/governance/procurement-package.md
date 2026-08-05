# Pachet standard pentru achiziții publice

> **Acesta este un punct de plecare, nu text juridic final.** Clauzele de mai jos pot fi copiate direct într-un caiet de sarcini, dar necesită revizuire legală locală înainte de publicare — nu au fost redactate sau validate de un jurist specializat în achiziții publice românești. Termenul tehnic „sistem.digital" din clauze trebuie înlocuit cu numele instituției/proiectului concret la adaptare.

## Obiectiv

#26 (programul de adopție pilot) menționează „clauze standard pentru caiete de sarcini", dar fără un pachet reutilizabil, complet. Acest document oferă cele 14 clauze cerute, gata de inserat, plus explicația fiecăreia — ca instituțiile publice să poată cere, prin achiziție, un serviciu construit pe Sistem Digital fără să blocheze concurența pe un singur furnizor.

## Clauzele (text de inserat în caietul de sarcini)

### 1. Versiunea minimă sistem.digital cerută

> Furnizorul implementează interfața folosind Sistem Digital, versiunea minimă `0.1.0-alpha.0` sau ulterioară, aflată în suport activ conform politicii publice de release ([`docs/governance/release-policy.md`](release-policy.md)). Ofertantul precizează explicit versiunea folosită la livrare.

### 2. Componente obligatorii

> Interfața folosește componentele publicate din `@sistem-digital/components` (sau adaptoarele oficiale Web Components/React) pentru: navigație instituțională, formulare, mesaje de eroare, confirmări și afișare de date tabelare — nu reimplementări proprii echivalente ale acestor funcții.

### 3. Utilizarea tokenilor de design

> Culorile, tipografia și spațierea provin exclusiv din `@sistem-digital/tokens` (export CSS, JSON sau TypeScript), fără valori hardcodate paralele. Personalizarea vizuală a instituției (logo, accent de culoare) respectă limitele documentate în politica de personalizare (`docs/product/customization-policy.md`).

### 4. Compatibilitate cu validatorul automat

> La livrare, furnizorul rulează validatorul automat de conformitate Sistem Digital, dacă este disponibil la data recepției, și atașează raportul de conformitate ca parte a documentației de recepție. Dacă validatorul nu este încă disponibil public, furnizorul documentează manual conformitatea cu criteriile nivelului de adopție `conformant` ([`docs/governance/adoption-levels.md`](adoption-levels.md)).

### 5. Teste automate

> Furnizorul livrează suita de teste automate a serviciului (unitare, integrare, accesibilitate) și dovada rulării lor în CI, cu rezultate reproductibile independent de mediul de dezvoltare al furnizorului.

### 6. Audit manual de accesibilitate

> Serviciul trece printr-un audit manual de accesibilitate cu cel puțin o tehnologie asistivă de ecran (NVDA, JAWS, VoiceOver sau TalkBack) și navigare completă de la tastatură, înainte de recepție. Rezultatele auditului, inclusiv problemele găsite și planul de remediere, sunt livrate ca document separat.

### 7. Livrarea codului sursă

> Codul sursă complet al serviciului (nu doar artefactele compilate) este livrat instituției, cu drepturi de utilizare, modificare și redistribuire ulterioară, conform contractului de achiziție — nu doar acces temporar la un mediu găzduit de furnizor.

### 8. SBOM (Software Bill of Materials)

> Furnizorul livrează un SBOM în format CycloneDX pentru toate dependențele serviciului, inclusiv pachetele Sistem Digital folosite — conform practicii deja publicate de proiect pentru propriile release-uri ([`docs/security/trusted-publishing.md`](../security/trusted-publishing.md)).

### 9. Provenance

> Pentru pachetele Sistem Digital folosite, furnizorul confirmă că versiunile instalate provin din publicarea oficială (npm, cu provenance GitHub Actions atestat) sau din canalul self-hosted verificat prin hash SHA-256 ([`docs/distribution/channels.md`](../distribution/channels.md)) — nu din surse nesemnate sau modificate.

### 10. Documentație

> Furnizorul livrează documentație tehnică a integrării specifice instituției: ce componente și pattern-uri au fost folosite, orice personalizare aplicată și cum se face o actualizare la o versiune Sistem Digital ulterioară.

### 11. Plan de mentenanță

> Oferta include un plan de mentenanță explicit: cine actualizează serviciul la noi versiuni Sistem Digital, în ce interval, și ce se întâmplă la sfârșitul perioadei de suport a versiunii curente (`docs/governance/release-policy.md`).

### 12. Actualizări de securitate

> Furnizorul se angajează să aplice actualizările de securitate `critical` și `high` ale Sistem Digital și ale dependențelor sale în cel mult 30 de zile calendaristice de la publicare, sau într-un termen mai scurt indicat explicit de un security advisory.

### 13. Clauză anti-lock-in — împotriva copierii și modificării necontrolate a componentelor

> Furnizorul nu poate redenumi, bifurca (fork) sau modifica substanțial componentele Sistem Digital sub o denumire proprie fără să documenteze explicit divergența față de versiunea oficială. Orice adaptare locală este documentată separat de codul componentelor originale, astfel încât instituția să poată reveni oricând la componentele oficiale neschimbate. Verificare: componentele folosite trebuie identificabile ca atare (import direct din `@sistem-digital/*`, fără redenumire a exporturilor publice).

### 14. Exportul datelor și evitarea lock-in-ului

> Toate datele colectate prin serviciu (cereri, documente, istoricul interacțiunilor) sunt exportabile de instituție, oricând, într-un format deschis (CSV, JSON sau XML), fără intervenția furnizorului și fără costuri suplimentare per export. Instituția păstrează dreptul de a migra serviciul către alt furnizor, folosind același cod sursă livrat conform clauzei 7, fără penalizări contractuale pentru migrare.

## Verificarea clauzei anti-lock-in (clauza 13)

Spre deosebire de restul clauzelor, clauza 13 poate fi verificată tehnic, nu doar declarativ:

- exporturile publice ale componentelor (`webComponentNames`, `reactHookNames`, `*ComponentNames`) rămân neschimbate față de pachetul oficial;
- markup-ul canonic generat corespunde exact celui din catalogul versionat (`scripts/check-catalog.mjs`);
- orice divergență e documentată într-un fișier separat, nu amestecată necontrolat în codul componentelor originale.

## Relația cu SBOM și provenance existente

Clauzele 8 și 9 nu cer un proces nou — reutilizează exact ce Sistem Digital publică deja la fiecare release (`sbom.cdx.json`, `SHA256SUMS`, GitHub build provenance attestation, npm provenance attestation — vezi [`docs/security/trusted-publishing.md`](../security/trusted-publishing.md)). Instituția verifică pachetele Sistem Digital folosite de furnizor cu aceleași comenzi documentate acolo, nu cu un proces separat.

## Ce nu include acest document

- negocierea sau adaptarea legală per instituție — rămâne responsabilitatea instituției și a consilierului juridic;
- un șablon YAML sau checklist executabil (poate fi adăugat separat, dacă programul pilot #26 identifică nevoia concretă);
- parcursul complet de achiziție (ce clauze alegi pentru ce nivel de conformitate, cum se leagă recepția de validator) — vezi [`docs/governance/pilot-program.md`](pilot-program.md);
- verificarea automată a clauzei anti-lock-in ca parte a validatorului (#25) — rămâne un candidat pentru scope-ul acelui epic, nu implementat aici.
