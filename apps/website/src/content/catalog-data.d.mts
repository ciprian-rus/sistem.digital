export interface RawCatalogItem {
  id: string;
  kind: 'component' | 'foundation';
  family: string;
  familyTitle: string;
  componentName?: string;
  title: string;
  description: string;
  packageName: string;
  version: string;
  channel: 'alpha' | 'stable';
  status: 'alpha' | 'stable' | 'deprecated';
  cssImport: string;
  jsImports: readonly string[];
  documentationHref: string;
  sourceHref: string;
  changelogHref: string;
  markup: string;
  keywords: readonly string[];
}

export const catalogSchemaVersion: number;
export const catalogItems: readonly RawCatalogItem[];
export const catalogFamilies: Readonly<Record<string, unknown>>;
