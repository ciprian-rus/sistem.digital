import { catalogItems, getCatalogHref } from '../content/catalog';
import { siteSections, type SiteSectionId } from '../content/site-map';

export interface SearchEntry {
  href: string;
  title: string;
  description: string;
  category: string;
  section: SiteSectionId;
  keywords: readonly string[];
}

export interface SearchOptions {
  section?: SiteSectionId;
}

export const searchEntries: readonly SearchEntry[] = [
  ...siteSections.flatMap((section) =>
    section.pages
      .filter((page) => page.status === 'available')
      .map((page) => ({
        href: page.href,
        title: page.title,
        description: page.description,
        category: section.title,
        section: section.id,
        keywords: page.keywords,
      })),
  ),
  ...catalogItems.map((item) => ({
    href: getCatalogHref(item),
    title: item.title,
    description: item.description,
    category: `Catalog · ${item.familyTitle}`,
    section: item.kind === 'foundation' ? ('foundations' as const) : ('components' as const),
    keywords: [
      item.id,
      item.componentName ?? '',
      item.packageName,
      item.cssImport,
      ...item.jsImports,
      ...item.keywords,
    ],
  })),
  {
    href: 'https://github.com/users/ciprian-rus/projects/5',
    title: 'Roadmap Sistem Digital',
    description: 'Milestones, epics, componente planificate și stadiul implementării.',
    category: 'Guvernanță',
    section: 'governance',
    keywords: ['roadmap', 'plan', 'milestone', 'backlog', 'github'],
  },
];

const synonymGroups: readonly (readonly string[])[] = [
  ['adoptie', 'implementare', 'integrare'],
  ['antet', 'header'],
  ['buton', 'actiune'],
  ['camp', 'input'],
  ['cititor', 'nvda', 'jaws', 'screenreader'],
  ['continut', 'date'],
  ['confidentialitate', 'privacy'],
  ['ghid', 'instructiuni'],
  ['meniu', 'navigatie'],
  ['sablon', 'starter', 'template'],
  ['subsol', 'footer'],
];

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLocaleLowerCase('ro-RO')
    .replace(/[^a-z0-9\s-]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function getTermAlternatives(term: string): readonly string[] {
  return synonymGroups.find((group) => group.includes(term)) ?? [term];
}

function directTermScore(term: string, title: string, category: string): number {
  if (title === term) return 12;
  if (title.startsWith(term)) return 8;
  if (title.includes(term)) return 5;
  if (category.includes(term)) return 3;
  return 0;
}

export function searchSite(
  query: string,
  options: SearchOptions = {},
  entries = searchEntries,
): SearchEntry[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < 2) return [];

  const terms = [...new Set(normalizedQuery.split(' '))];
  const concepts = terms.map(getTermAlternatives);

  return entries
    .filter((entry) => !options.section || entry.section === options.section)
    .map((entry) => {
      const title = normalizeSearchText(entry.title);
      const category = normalizeSearchText(entry.category);
      const haystack = normalizeSearchText(
        [entry.title, entry.description, entry.category, ...entry.keywords].join(' '),
      );

      const matchesAllConcepts = concepts.every((alternatives) =>
        alternatives.some((alternative) => haystack.includes(alternative)),
      );
      if (!matchesAllConcepts) return null;

      const score = terms.reduce((total, term, index) => {
        const directScore = directTermScore(term, title, category);
        if (directScore > 0) return total + directScore;
        return (
          total + (concepts[index]?.some((alternative) => haystack.includes(alternative)) ? 1 : 0)
        );
      }, 0);

      return { entry, score };
    })
    .filter((result): result is { entry: SearchEntry; score: number } => result !== null)
    .sort(
      (left, right) =>
        right.score - left.score || left.entry.title.localeCompare(right.entry.title, 'ro-RO'),
    )
    .map(({ entry }) => entry);
}
