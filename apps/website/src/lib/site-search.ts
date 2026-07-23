import { siteSections } from '../content/site-map';

export interface SearchEntry {
  href: string;
  title: string;
  description: string;
  category: string;
  keywords: readonly string[];
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
        keywords: page.keywords,
      })),
  ),
  {
    href: 'https://github.com/users/ciprian-rus/projects/5',
    title: 'Roadmap Sistem Digital',
    description: 'Milestones, epics, componente planificate și stadiul implementării.',
    category: 'Guvernanță',
    keywords: ['roadmap', 'plan', 'milestone', 'backlog', 'github'],
  },
] as const;

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLocaleLowerCase('ro-RO')
    .replace(/[^a-z0-9\s-]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

export function searchSite(query: string, entries = searchEntries): SearchEntry[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < 2) return [];

  const terms = normalizedQuery.split(' ');

  return entries
    .map((entry) => {
      const title = normalizeSearchText(entry.title);
      const category = normalizeSearchText(entry.category);
      const haystack = normalizeSearchText(
        [entry.title, entry.description, entry.category, ...entry.keywords].join(' '),
      );

      const matchesAllTerms = terms.every((term) => haystack.includes(term));
      if (!matchesAllTerms) return null;

      const score = terms.reduce((total, term) => {
        if (title === term) return total + 12;
        if (title.startsWith(term)) return total + 8;
        if (title.includes(term)) return total + 5;
        if (category.includes(term)) return total + 3;
        return total + 1;
      }, 0);

      return { entry, score };
    })
    .filter((result): result is { entry: SearchEntry; score: number } => result !== null)
    .sort(
      (left, right) =>
        right.score - left.score || left.entry.title.localeCompare(right.entry.title),
    )
    .map(({ entry }) => entry);
}
