# Programul de adopție pilot — criterii, baseline și indicatori

## Obiectiv

#26 cere un program de adopție pilot complet: selecție, baseline, suport, recepție, măsurare a impactului și un registru public. Execuția reală a acestui program are nevoie de instituții partenere reale — nu poate fi simulată. Acest document pregătește partea care **nu** depinde de existența unui partener: criteriile de selecție, metodologia de baseline, indicatorii de măsurare și structura ghidului de achiziție — astfel încât, odată găsit un prim partener, execuția să fie mecanică, nu improvizată.

Acest document nu înlocuiește [`docs/governance/procurement-package.md`](procurement-package.md) (cele 14 clauze standard, deja livrate) și nu duplică [`docs/governance/adoption-levels.md`](adoption-levels.md) (cele patru niveluri de conformitate) — le leagă într-un proces coerent, de la selecția organizației pilot până la registrul public.

## Criterii de selecție a organizațiilor pilot

Criteriul de acceptare al #26 cere minimum trei tipuri diferite de organizații. Modelele sectoriale deja construite (`docs/product/sectoral-model-scoala.md`, `-spital.md`, `-minister.md`, `-primaria.md`) sugerează direct trei tipuri distincte de candidați, plus administrația centrală:

1. **administrație centrală sau minister** — proces de aprobare mai lung, dar impact de vizibilitate mare;
2. **administrație locală (primărie)** — volum și complexitate variabile, de la comune mici la municipii;
3. **instituție sectorială (școală sau spital)** — constrângeri specifice de conținut și date sensibile, diferite de administrația generală.

### Criterii de includere

- are deja un serviciu digital public, funcțional, care poate servi drept bază de comparație pentru baseline — un pilot fără serviciu existent nu poate demonstra impact, doar cost de pornire;
- acceptă explicit publicarea rezultatelor, inclusiv a problemelor găsite — condiție obligatorie, conform criteriului de acceptare „lecții și probleme publicate"; fără acest acord, organizația nu poate fi pilot;
- are capacitate tehnică minimă (echipă internă sau furnizor contractat) capabilă să integreze pachetele Sistem Digital fără suport zilnic din partea proiectului;
- stack-ul tehnic al organizației nu e identic cu al celorlalte organizații pilot deja selectate — diversitatea tehnică reduce riscul ca rezultatele să reflecte particularitățile unei singure tehnologii, nu ale Sistem Digital însuși (același raționament tehnic din #42).

### Criterii de excludere

- fără un serviciu digital existent de comparat (candidat pentru un proiect nou, nu pentru un pilot de adopție măsurabilă);
- fără acordul de publicare a rezultatelor;
- migrare deja în curs către altă soluție, cu contract semnat — conflict de interes și de resurse.

## Baseline înainte de adopție

Baseline-ul se măsoară **înainte** de orice modificare de cod, pe serviciul existent al organizației, folosind exact instrumentele deja publicate — nu un proces separat:

- **accesibilitate** — raportul validatorului automat (#25), rulat contra serviciului existent, dacă acceptă markup HTML standard; altfel, un audit manual minimal (subset din `docs/accessibility/test-matrix.md`) — severitate și număr de constatări pe categorie;
- **performanță** — Core Web Vitals și bugetul JS/CSS existent, cu aceeași metodologie din `docs/product/performance-budgets.md`, măsurate pe serviciul curent al organizației, nu pe un starter Sistem Digital;
- **cost** — cost de mentenanță anual estimat al serviciului curent (dezvoltare externă, licențe, ore interne), declarat de organizație, nu verificat independent;
- **timp** — timpul mediu documentat (sau estimat de organizație) pentru a finaliza o cerere tipică prin serviciul existent;
- **satisfacție** — un chestionar scurt (maximum 5 întrebări, scală 1-5), aplicat atât cetățenilor cât și personalului instituției, colectat conform `docs/product/privacy-friendly-measurement.md` — fără urmărire individuală, fără date personale în rezultatul agregat.

Baseline-ul e o precondiție a pilotului, nu o etapă opțională: fără el, „măsurarea impactului" din obiectivul #26 devine o afirmație nedemonstrabilă, exact anti-pattern-ul „Accesibilitate declarativă" identificat în auditul comparativ.

## Indicatorii de măsurare (înainte / după)

```ts
interface PilotIndicatorSet {
  /** identifică organizația și perioada evaluată */
  institution: string;
  measuredAt: 'baseline' | 'post-adoption';
  evaluationDate: string;

  /** scor validator (#25), dacă serviciul e evaluabil automat la acel moment */
  validatorScore?: {
    passed: number;
    failed: number;
    total: number;
  };

  /** constatări manuale de accesibilitate pe severitate */
  manualAccessibilityFindings: {
    critical: number;
    major: number;
    minor: number;
  };

  /** Core Web Vitals și bugete, conform docs/product/performance-budgets.md */
  performance: {
    lcpMs: number;
    jsKib: number;
    cssKib: number;
  };

  /** cost anual estimat de mentenanță, în moneda locală, declarat de organizație */
  annualMaintenanceCost: number;

  /** timp mediu pentru finalizarea unei cereri tipice, în minute */
  averageTaskTimeMinutes: number;

  /** satisfacție medie, scală 1-5, colectată separat pentru cetățeni și personal */
  satisfaction: {
    citizens: number;
    staff: number;
    responseCount: number;
  };
}
```

Comparația `baseline` vs. `post-adoption` pe aceeași organizație, cu aceeași metodologie, este dovada de impact cerută de criteriul de acceptare „indicatori înainte și după implementare" — nu o comparație între organizații diferite, care ar amesteca variabile necontrolate.

## Draft ghid de achiziție

Ghidul leagă instrumentele deja publicate într-un parcurs, fără să repete conținutul lor:

1. **alegerea nivelului de conformitate țintă** — organizația decide, înainte de achiziție, ce nivel din [`docs/governance/adoption-levels.md`](adoption-levels.md) urmărește (`aligned`, `compatible`, `conformant` sau `verified`); nivelul țintă determină ce clauze din pachetul de achiziție sunt obligatorii față de opționale;
2. **inserarea clauzelor relevante** — clauzele 1-3 (versiune, componente, tokeni) pentru `compatible`; clauzele 4-6 (validator, teste, audit manual) suplimentar pentru `conformant`/`verified`; toate cele 14 rămân disponibile în [`docs/governance/procurement-package.md`](procurement-package.md), cu textul complet;
3. **definirea recepției** — recepția e condiționată explicit de raportul validatorului (#25, unde e disponibil) și, pentru nivelul `verified`, de auditul manual de accesibilitate — nu de o declarație a furnizorului fără dovadă verificabilă;
4. **planul de mentenanță** — reutilizează clauza 11 (plan de mentenanță) și fereastra de suport din `docs/governance/release-policy.md`; nu introduce un proces separat;
5. **evitarea lock-in-ului** — garantată structural, nu doar declarativ: clauza 13 (anti-lock-in) și clauza 14 (exportul datelor) din pachetul de achiziție, plus limitele documentate în `docs/product/customization-policy.md`. Ghidul nu numește niciun furnizor sau tehnologie proprietară obligatorie — condiția „ghidul evită tehnologii sau furnizori impuși" e satisfăcută prin construcție, pentru că pachetele Sistem Digital sunt open-source și orice furnizor le poate implementa.

Acest parcurs e un draft: ordinea și pragurile de mai sus nu au fost testate cu o achiziție reală și pot necesita ajustare.

## Registrul public al implementărilor (schemă propusă)

```ts
interface PilotRegistryEntry {
  institution: string;
  application: string;
  pilotStartDate: string;

  /** legătura cu nivelul de adopție raportat, din docs/governance/adoption-levels.md */
  adoptionReport: string; // referință la un InstitutionalAdoptionReport

  baseline: PilotIndicatorSet;
  postAdoption?: PilotIndicatorSet;

  /** probleme și lecții publicate — obligatoriu, conform criteriului de acceptare */
  lessonsLearned: string[];
}
```

Registrul propriu-zis (găzduire, formular de intrare, pagină publică) rămâne infrastructură neconstruită — schema de mai sus e punctul de plecare, nu un registru funcțional. Se populează doar cu date reale de la un pilot real; nu va fi umplut cu exemple sintetice care ar simula un impact nedemonstrat.

## Ce nu este acoperit de acest document

- recrutarea efectivă a organizațiilor pilot — necesită parteneri instituționali reali, nu poate fi simulată;
- execuția baseline-ului — necesită un serviciu instituțional real de măsurat;
- suportul și training-ul efectiv oferit unei organizații pilot;
- registrul public populat cu date reale — schema există, datele nu;
- recomandările de instituționalizare — depind explicit de rezultate reale, conform criteriului de acceptare, deci nu pot fi scrise înainte de primul ciclu complet.

## Riscuri

Criteriile de selecție, indicatorii și pragurile de mai sus nu au fost testate cu o organizație pilot reală. Primul ciclu real poate arăta că un criteriu e prea strict, un indicator e greu de colectat onest, sau ghidul de achiziție omite un pas necesar într-un context administrativ real. Acest document e punctul de plecare pentru #26, nu versiunea finală.
