export interface SearchEntry {
  href: string;
  title: string;
  description: string;
  category: string;
  keywords: readonly string[];
}

export const searchEntries: readonly SearchEntry[] = [
  {
    href: '/componente/formulare',
    title: 'Formulare și validare',
    description: 'Input, textarea, select, checkbox, radio, upload și mesaje de eroare.',
    category: 'Componente',
    keywords: ['formular', 'formulare', 'validare', 'eroare', 'input', 'checkbox', 'radio'],
  },
  {
    href: '/componente/navigatie',
    title: 'Navigație și structură instituțională',
    description: 'Header, footer, meniu mobil, breadcrumb, căutare și autenticitatea domeniului.',
    category: 'Componente',
    keywords: ['navigatie', 'navigație', 'header', 'footer', 'breadcrumb', 'meniu', 'cautare'],
  },
  {
    href: '/componente/continut-date',
    title: 'Conținut și afișare a datelor',
    description: 'Mesaje, carduri, statusuri, tabele, summary list, details și pagination.',
    category: 'Componente',
    keywords: [
      'continut',
      'conținut',
      'date',
      'tabel',
      'table',
      'card',
      'status',
      'summary list',
      'details',
      'pagination',
      'metadata',
    ],
  },
  {
    href: '/#teme',
    title: 'Teme funcționale',
    description: 'Light, dark, high-contrast, forced colors și accente instituționale controlate.',
    category: 'Fundamente',
    keywords: ['tema', 'teme', 'dark', 'contrast', 'culori', 'forced colors'],
  },
  {
    href: '/#fundatie',
    title: 'Design tokens și distribuție',
    description: 'Token-uri DTCG, CSS, JSON, TypeScript, ESM și CommonJS.',
    category: 'Fundamente',
    keywords: ['token', 'tokens', 'dtcg', 'css', 'json', 'typescript', 'npm'],
  },
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
