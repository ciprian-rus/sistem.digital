import { catalogItems as rawCatalogItems } from './catalog-data.mjs';

export type CatalogKind = 'component' | 'foundation';
export type CatalogChannel = 'alpha' | 'stable';
export type CatalogStatus = 'alpha' | 'stable' | 'deprecated';

export interface CatalogItem {
  id: string;
  kind: CatalogKind;
  family: string;
  familyTitle: string;
  componentName?: string;
  title: string;
  description: string;
  packageName: string;
  version: string;
  channel: CatalogChannel;
  status: CatalogStatus;
  cssImport: string;
  jsImports: readonly string[];
  documentationHref: string;
  sourceHref: string;
  changelogHref: string;
  markup: string;
  keywords: readonly string[];
}

function isCatalogItem(value: unknown): value is CatalogItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    (item.kind === 'component' || item.kind === 'foundation') &&
    typeof item.family === 'string' &&
    typeof item.familyTitle === 'string' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    typeof item.packageName === 'string' &&
    typeof item.version === 'string' &&
    (item.channel === 'alpha' || item.channel === 'stable') &&
    (item.status === 'alpha' || item.status === 'stable' || item.status === 'deprecated') &&
    typeof item.cssImport === 'string' &&
    Array.isArray(item.jsImports) &&
    item.jsImports.every((entry) => typeof entry === 'string') &&
    typeof item.documentationHref === 'string' &&
    typeof item.sourceHref === 'string' &&
    typeof item.changelogHref === 'string' &&
    typeof item.markup === 'string' &&
    Array.isArray(item.keywords) &&
    item.keywords.every((entry) => typeof entry === 'string')
  );
}

function validateCatalog(items: readonly unknown[]): readonly CatalogItem[] {
  const ids = new Set<string>();
  return items.map((item, index) => {
    if (!isCatalogItem(item)) throw new Error(`Catalog: intrarea ${index} este invalidă.`);
    if (ids.has(item.id)) throw new Error(`Catalog: id duplicat „${item.id}”.`);
    if (!/^[a-z0-9-]+$/u.test(item.id)) throw new Error(`Catalog: id invalid „${item.id}”.`);
    if (item.markup.trim().length === 0) throw new Error(`Catalog: markup lipsă pentru ${item.id}.`);
    ids.add(item.id);
    return item;
  });
}

export const catalogItems: readonly CatalogItem[] = validateCatalog(rawCatalogItems);

export const catalogFamilies = [...new Set(catalogItems.map((item) => item.family))].sort(
  (left, right) => left.localeCompare(right, 'ro-RO'),
);

export const catalogVersions = [...new Set(catalogItems.map((item) => item.version))].sort();

export function getCatalogItem(id: string): CatalogItem | undefined {
  return catalogItems.find((item) => item.id === id);
}

export function filterCatalogItems({
  family,
  kind,
  query,
  status,
}: Readonly<{
  family?: string;
  kind?: CatalogKind;
  query?: string;
  status?: CatalogStatus;
}>): readonly CatalogItem[] {
  const normalizedQuery = query?.trim().toLocaleLowerCase('ro-RO') ?? '';
  return catalogItems.filter((item) => {
    if (family && item.family !== family) return false;
    if (kind && item.kind !== kind) return false;
    if (status && item.status !== status) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      item.title,
      item.description,
      item.familyTitle,
      item.componentName ?? '',
      ...item.keywords,
    ]
      .join(' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/gu, '')
      .toLocaleLowerCase('ro-RO');
    const needle = normalizedQuery
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/gu, '');
    return haystack.includes(needle);
  });
}

export function getCatalogHref(item: CatalogItem): string {
  return `/componente/catalog/${item.id}`;
}
