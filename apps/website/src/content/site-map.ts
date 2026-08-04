export type SiteSectionId =
  'foundations' | 'components' | 'patterns' | 'templates' | 'guides' | 'governance';

export type SitePageStatus = 'available' | 'planned';

export interface SitePage {
  href: string;
  title: string;
  navigationLabel: string;
  description: string;
  keywords: readonly string[];
  status: SitePageStatus;
}

export interface SiteSection {
  id: SiteSectionId;
  href: string;
  title: string;
  navigationLabel: string;
  description: string;
  pages: readonly SitePage[];
}

export const siteSections: readonly SiteSection[] = [
  {
    id: 'foundations',
    href: '/fundamente',
    title: 'Fundamente',
    navigationLabel: 'Fundamente',
    description: 'Principii, design tokens, teme, tipografie, layout, focus și motion.',
    pages: [
      {
        href: '/fundamente',
        title: 'Fundamentele Sistem Digital',
        navigationLabel: 'Prezentare generală',
        description: 'Punctul de intrare în principiile și regulile structurale ale sistemului.',
        keywords: ['fundamente', 'principii', 'tokens', 'teme', 'tipografie', 'layout'],
        status: 'available',
      },
    ],
  },
  {
    id: 'components',
    href: '/componente',
    title: 'Componente',
    navigationLabel: 'Componente',
    description: 'Componente HTML, CSS și JavaScript accesibile, independente de framework.',
    pages: [
      {
        href: '/componente',
        title: 'Catalogul componentelor',
        navigationLabel: 'Prezentare generală',
        description: 'Inventarul familiilor de componente disponibile în versiunea alpha.',
        keywords: ['componente', 'familii', 'html', 'css', 'javascript', 'alpha'],
        status: 'available',
      },
      {
        href: '/componente/catalog',
        title: 'Catalog versionat',
        navigationLabel: 'Catalog versionat',
        description: 'Toate fundamentele și componentele cu versiune, importuri, preview și cod.',
        keywords: ['catalog', 'versiune', 'api', 'importuri', 'preview', 'changelog'],
        status: 'available',
      },
      {
        href: '/componente/formulare',
        title: 'Formulare și validare',
        navigationLabel: 'Formulare',
        description: 'Input, textarea, select, checkbox, radio, upload și mesaje de eroare.',
        keywords: ['formular', 'formulare', 'validare', 'eroare', 'input', 'checkbox', 'radio'],
        status: 'available',
      },
      {
        href: '/componente/navigatie',
        title: 'Navigație și structură instituțională',
        navigationLabel: 'Navigație',
        description: 'Header, footer, meniu mobil, breadcrumb, căutare și autenticitate.',
        keywords: ['navigatie', 'header', 'footer', 'breadcrumb', 'meniu', 'cautare'],
        status: 'available',
      },
      {
        href: '/componente/continut-date',
        title: 'Conținut și afișare a datelor',
        navigationLabel: 'Conținut și date',
        description: 'Mesaje, carduri, statusuri, tabele, summary list, details și pagination.',
        keywords: ['continut', 'date', 'tabel', 'card', 'status', 'details', 'pagination'],
        status: 'available',
      },
      {
        href: '/componente/interactive',
        title: 'Componente interactive',
        navigationLabel: 'Interactive',
        description: 'Accordion, dialog, tabs, pași, dată, autocomplete și upload avansat.',
        keywords: ['interactiv', 'accordion', 'dialog', 'tabs', 'autocomplete', 'file upload'],
        status: 'available',
      },
    ],
  },
  {
    id: 'patterns',
    href: '/pattern-uri',
    title: 'Pattern-uri',
    navigationLabel: 'Pattern-uri',
    description: 'Soluții complete pentru probleme recurente din serviciile publice.',
    pages: [
      {
        href: '/pattern-uri',
        title: 'Pattern-uri pentru servicii publice',
        navigationLabel: 'Prezentare generală',
        description: 'Structura viitoarelor fluxuri end-to-end și criteriile lor de acceptare.',
        keywords: ['pattern', 'pattern-uri', 'servicii publice', 'flux', 'end-to-end'],
        status: 'available',
      },
      {
        href: '/exemple/adeverinta',
        title: 'Serviciu demonstrativ — solicită o adeverință',
        navigationLabel: 'Serviciu demonstrativ',
        description:
          'Aplicație de referință end-to-end: eligibilitate, formular, documente, verificare și status.',
        keywords: ['serviciu', 'demonstratie', 'adeverinta', 'formular', 'status', 'reluare'],
        status: 'available',
      },
      {
        href: '/pattern-uri/inainte-sa-incepi',
        title: 'Înainte să începi',
        navigationLabel: 'Înainte să începi',
        description:
          'Informațiile esențiale de care o persoană are nevoie pentru a decide dacă poate și vrea să înceapă un serviciu.',
        keywords: ['rezultat', 'eligibilitate', 'documente', 'cost', 'termen', 'autentificare'],
        status: 'available',
      },
      {
        href: '/pattern-uri/transfer-extern',
        title: 'Transfer extern sigur',
        navigationLabel: 'Transfer extern sigur',
        description:
          'Cum explici trecerea către alt operator sau domeniu și păstrezi continuitatea serviciului.',
        keywords: ['transfer', 'domeniu', 'operator', 'date', 'autenticitate', 'intoarcere'],
        status: 'available',
      },
      {
        href: '/pattern-uri/status-confirmare-reluare',
        title: 'Status, confirmare și reluare',
        navigationLabel: 'Status și reluare',
        description:
          'Confirmarea depunerii, urmărirea cererii, solicitarea completărilor și reluarea în siguranță.',
        keywords: ['status', 'confirmare', 'reluare', 'completari', 'notificari', 'dosar'],
        status: 'available',
      },
      {
        href: '/pattern-uri/verifica-raspunsurile',
        title: 'Verifică răspunsurile înainte de trimitere',
        navigationLabel: 'Verifică răspunsurile',
        description:
          'Sumarul cererii, proveniența datelor, corectarea fără pierderi și trimiterea idempotentă.',
        keywords: ['verificare', 'sumar', 'provenienta', 'idempotency', 'trimitere'],
        status: 'available',
      },
      {
        href: '/pattern-uri/semnare',
        title: 'Semnarea unei cereri sau a unui document',
        navigationLabel: 'Semnarea',
        description:
          'Explică în limbaj simplu ce înseamnă semnarea, oferă o cale de rezervă la eșec și leagă semnarea de confirmarea depunerii.',
        keywords: ['semnatura', 'semnatura electronica', 'declaratie', 'esec', 'confirmare'],
        status: 'available',
      },
      {
        href: '/pattern-uri/plata-taxei',
        title: 'Plata unei taxe sau a unui tarif asociat cererii',
        navigationLabel: 'Plata unei taxe',
        description:
          'Arată suma, motivul și scutirile înainte de plată, apoi redirecționează spre platforma comună de plăți și confirmă rezultatul.',
        keywords: ['plata', 'taxa', 'tarif', 'scutire', 'redirect'],
        status: 'available',
      },
      {
        href: '/pattern-uri/notificarea-deciziei',
        title: 'Notificarea unei decizii administrative',
        navigationLabel: 'Notificarea deciziei',
        description:
          'Comunică ce s-a decis, temeiul, consecința practică și pașii următori — separat pentru aprobare, respingere și aprobare parțială.',
        keywords: ['decizie', 'aprobare', 'respingere', 'notificare', 'temei legal'],
        status: 'available',
      },
      {
        href: '/pattern-uri/contestarea-deciziei',
        title: 'Contestarea unei decizii administrative',
        navigationLabel: 'Contestarea deciziei',
        description:
          'Explică termenul, motivele acceptate și documentele suplimentare, apoi confirmă vizibil înregistrarea contestației.',
        keywords: ['contestare', 'termen', 'decizie', 'motive', 'confirmare'],
        status: 'available',
      },
      {
        href: '/pattern-uri/identificarea-serviciului',
        title: 'Identificarea serviciului potrivit',
        navigationLabel: 'Identificarea serviciului',
        description:
          'Pornește de la nevoia utilizatorului, nu de la structura instituțională, pentru a duce persoana la serviciul corect.',
        keywords: ['cautare', 'servicii', 'nevoie', 'eligibilitate', 'catalog'],
        status: 'available',
      },
      {
        href: '/pattern-uri/autentificare-cont-unic',
        title: 'Autentificarea prin mecanism unic de autentificare sau cont unic',
        navigationLabel: 'Autentificare cont unic',
        description:
          'Explică transferul către furnizorul extern de identitate, gestionează erorile tipice și oferă variantă fără autentificare completă unde e posibil.',
        keywords: ['autentificare', 'cont unic', 'identitate', 'sesiune', 'eroare'],
        status: 'available',
      },
      {
        href: '/pattern-uri/completarea-din-registre',
        title: 'Completarea datelor din registre',
        navigationLabel: 'Completarea din registre',
        description:
          'Afișează datele preluate automat cu sursa lor vizibilă, permite confirmarea sau corectarea, și documentează varianta pentru registrul indisponibil.',
        keywords: ['registre', 'once-only', 'date', 'sursa', 'indisponibilitate'],
        status: 'available',
      },
      {
        href: '/pattern-uri/anularea-cererii',
        title: 'Anularea unei cereri de către solicitant',
        navigationLabel: 'Anularea cererii',
        description:
          'Cere confirmare explicită, comunică toate consecințele înainte de acțiune și distinge clar statusul „anulată" de „respinsă".',
        keywords: ['anulare', 'confirmare', 'consecinte', 'status'],
        status: 'available',
      },
      {
        href: '/pattern-uri/delegare-reprezentare',
        title: 'Delegarea sau reprezentarea unei persoane',
        navigationLabel: 'Delegare și reprezentare',
        description:
          'Afișează persistent în numele cui se acționează, cu documentele care dovedesc calitatea de reprezentant.',
        keywords: ['delegare', 'reprezentare', 'imputernicit', 'context'],
        status: 'available',
      },
      {
        href: '/pattern-uri/consimtamant',
        title: 'Acordarea și retragerea consimțământului',
        navigationLabel: 'Consimțământ',
        description:
          'Explică scopul prelucrării în limbaj simplu, înainte de solicitarea consimțământului, cu retragere la fel de accesibilă ca acordarea.',
        keywords: ['consimtamant', 'date personale', 'retragere', 'prelucrare'],
        status: 'available',
      },
      {
        href: '/exemple/primaria-model',
        title: 'Primăria Model — model sectorial demonstrativ',
        navigationLabel: 'Model sectorial: primărie',
        description:
          'Implementare de referință pentru o primărie: organizare, transparență decizională și catalog de servicii locale.',
        keywords: ['primarie', 'model sectorial', 'organizare', 'hotarari', 'transparenta'],
        status: 'available',
      },
      {
        href: '/exemple/primaria-model/servicii',
        title: 'Servicii — Primăria Model',
        navigationLabel: 'Servicii Primăria Model',
        description:
          'Catalog demonstrativ de servicii locale, organizat după nevoia cetățeanului, nu după structura instituției.',
        keywords: ['primarie', 'servicii locale', 'catalog', 'eligibilitate'],
        status: 'available',
      },
      {
        href: '/exemple/scoala-model',
        title: 'Școala Model — model sectorial demonstrativ',
        navigationLabel: 'Model sectorial: școală',
        description:
          'Implementare de referință pentru o școală: organizare, anunțuri și catalog de servicii pentru părinți și elevi.',
        keywords: ['scoala', 'model sectorial', 'organizare', 'anunturi', 'inscriere'],
        status: 'available',
      },
      {
        href: '/exemple/scoala-model/servicii',
        title: 'Servicii — Școala Model',
        navigationLabel: 'Servicii Școala Model',
        description:
          'Catalog demonstrativ de servicii pentru părinți și elevi, organizat după nevoie, nu după structura instituției.',
        keywords: ['scoala', 'servicii', 'catalog', 'eligibilitate'],
        status: 'available',
      },
      {
        href: '/exemple/inscriere-scoala',
        title: 'Serviciu demonstrativ — cerere de înscriere la școală',
        navigationLabel: 'Cerere de înscriere',
        description:
          'Aplicație de referință end-to-end pentru înscrierea unui copil la școală: eligibilitate, formular, documente, verificare și status.',
        keywords: ['inscriere', 'scoala', 'formular', 'demonstratie', 'status'],
        status: 'available',
      },
      {
        href: '/exemple/spital-model',
        title: 'Spitalul Model — model sectorial demonstrativ',
        navigationLabel: 'Model sectorial: spital',
        description:
          'Implementare de referință pentru o unitate sanitară: organizare, informații pentru pacienți și catalog de servicii.',
        keywords: ['spital', 'unitate sanitara', 'model sectorial', 'organizare', 'incredere'],
        status: 'available',
      },
      {
        href: '/exemple/spital-model/servicii',
        title: 'Servicii — Spitalul Model',
        navigationLabel: 'Servicii Spitalul Model',
        description:
          'Catalog demonstrativ de servicii pentru pacienți, organizat după nevoie, nu după structura instituției.',
        keywords: ['spital', 'servicii', 'catalog', 'eligibilitate'],
        status: 'available',
      },
      {
        href: '/exemple/cerere-document-medical',
        title: 'Serviciu demonstrativ — solicită o copie a unui document medical',
        navigationLabel: 'Copie document medical',
        description:
          'Aplicație de referință end-to-end pentru solicitarea unei copii a unui document medical: eligibilitate, formular, documente, verificare și status.',
        keywords: ['document medical', 'spital', 'formular', 'demonstratie', 'status'],
        status: 'available',
      },
      {
        href: '/exemple/minister-model',
        title: 'Ministerul Model — model sectorial demonstrativ',
        navigationLabel: 'Model sectorial: minister',
        description:
          'Implementare de referință pentru un minister sau o agenție centrală: organizare, acte normative, consultări publice și catalog de servicii.',
        keywords: [
          'minister',
          'agentie centrala',
          'model sectorial',
          'acte normative',
          'consultare publica',
        ],
        status: 'available',
      },
      {
        href: '/exemple/minister-model/servicii',
        title: 'Servicii — Ministerul Model',
        navigationLabel: 'Servicii Ministerul Model',
        description:
          'Catalog demonstrativ de servicii pentru cetățeni și instituții, organizat după nevoie, nu după structura instituției.',
        keywords: ['minister', 'servicii', 'catalog', 'eligibilitate'],
        status: 'available',
      },
      {
        href: '/exemple/cerere-informatii-publice',
        title: 'Serviciu demonstrativ — solicită informații de interes public',
        navigationLabel: 'Cerere informații publice',
        description:
          'Aplicație de referință end-to-end pentru solicitarea de informații de interes public, conform Legii 544/2001: eligibilitate, formular, verificare și status.',
        keywords: ['informatii publice', 'legea 544', 'minister', 'formular', 'demonstratie'],
        status: 'available',
      },
    ],
  },
  {
    id: 'templates',
    href: '/template-uri',
    title: 'Template-uri',
    navigationLabel: 'Template-uri',
    description: 'Structuri reutilizabile pentru site-uri, pagini și servicii digitale.',
    pages: [
      {
        href: '/template-uri',
        title: 'Template-uri și startere',
        navigationLabel: 'Prezentare generală',
        description: 'Planul template-urilor HTML, Next.js și WordPress.',
        keywords: ['template', 'starter', 'html', 'nextjs', 'wordpress'],
        status: 'available',
      },
    ],
  },
  {
    id: 'guides',
    href: '/ghiduri',
    title: 'Ghiduri',
    navigationLabel: 'Ghiduri',
    description: 'Instrucțiuni pentru design, dezvoltare, conținut, achiziții și adopție.',
    pages: [
      {
        href: '/ghiduri',
        title: 'Ghiduri de implementare și adopție',
        navigationLabel: 'Prezentare generală',
        description: 'Punctul de intrare pentru echipele care folosesc Sistem Digital.',
        keywords: ['ghid', 'ghiduri', 'implementare', 'adoptie', 'achizitii'],
        status: 'available',
      },
    ],
  },
  {
    id: 'governance',
    href: '/guvernanta',
    title: 'Guvernanță',
    navigationLabel: 'Guvernanță',
    description: 'Roadmap, contribuții, RFC-uri, versiuni, securitate și decizii publice.',
    pages: [
      {
        href: '/guvernanta',
        title: 'Guvernanța Sistem Digital',
        navigationLabel: 'Prezentare generală',
        description: 'Cum sunt propuse, validate, versionate și menținute schimbările.',
        keywords: ['guvernanta', 'roadmap', 'rfc', 'contributii', 'release', 'securitate'],
        status: 'available',
      },
      {
        href: '/guvernanta/masurare',
        title: 'Măsurare cu protecția vieții private',
        navigationLabel: 'Măsurare și viață privată',
        description: 'Datele minime folosite pentru performanță și feedback, fără profilare.',
        keywords: [
          'masurare',
          'analytics',
          'confidentialitate',
          'privacy',
          'core web vitals',
          'retentie',
          'cookie-uri',
        ],
        status: 'available',
      },
    ],
  },
] as const;

export const primaryNavigation = siteSections.map(({ href, navigationLabel }) => ({
  href,
  label: navigationLabel,
}));

export const sitePages: readonly SitePage[] = siteSections.flatMap((section) => section.pages);

export function findSiteSection(pathname: string): SiteSection | undefined {
  return siteSections.find(
    (section) => pathname === section.href || pathname.startsWith(`${section.href}/`),
  );
}

export function findSitePage(pathname: string): SitePage | undefined {
  return sitePages.find((page) => page.href === pathname);
}

export function getSectionNavigation(pathname: string): readonly SitePage[] {
  return findSiteSection(pathname)?.pages.filter((page) => page.status === 'available') ?? [];
}

export function getSiteBreadcrumbs(pathname: string): readonly { href?: string; label: string }[] {
  const section = findSiteSection(pathname);
  const page = findSitePage(pathname);
  if (!section) return [{ label: 'Acasă', href: '/' }];

  const breadcrumbs: { href?: string; label: string }[] = [{ label: 'Acasă', href: '/' }];
  if (pathname !== section.href) breadcrumbs.push({ label: section.title, href: section.href });
  breadcrumbs.push({ label: page?.title ?? section.title });
  return breadcrumbs;
}

export function getAvailableSitePaths(): readonly string[] {
  return [
    '/',
    '/cautare',
    ...sitePages.filter((page) => page.status === 'available').map((page) => page.href),
  ];
}
