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
        navigationLabel: 'Toate componentele',
        description: 'Inventarul familiilor de componente disponibile în versiunea alpha.',
        keywords: ['componente', 'catalog', 'html', 'css', 'javascript', 'alpha'],
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
