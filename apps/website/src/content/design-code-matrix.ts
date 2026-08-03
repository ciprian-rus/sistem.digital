import { reactHookNames } from '@sistem-digital/react/hook-names';
import { webComponentNames } from '@sistem-digital/web-components';

import type { CatalogItem } from './catalog';

export interface DesignCodeMatrixEntry {
  id: string;
  figma: boolean;
  html: boolean;
  webComponents: boolean;
  react: boolean;
  docs: boolean;
  automatedTests: boolean;
  keyboardTested: boolean;
  screenReaderTested: boolean;
}

// Date simple (nume de tag-uri și de hook-uri), fără a importa efectiv
// implementările — @sistem-digital/react folosește useEffect, ceea ce ar
// forța o graniță "use client" dacă am importa hook-urile reale aici.
const webComponentTagSet = new Set(webComponentNames);
const reactExportSet = new Set<string>(reactHookNames);

function toPascalCase(kebabCase: string): string {
  return kebabCase
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

/**
 * Derivă matricea design–cod direct din exporturile publice ale pachetelor —
 * nu dintr-un registru manual. Vezi docs/product/design-code-matrix-schema.md
 * pentru sursa fiecărui câmp. `keyboardTested`/`screenReaderTested` rămân
 * false până la auditul manual din #53: nu sunt aproximate din testele
 * automate.
 */
export function getDesignCodeMatrix(
  item: Pick<CatalogItem, 'id' | 'kind' | 'componentName'>,
): DesignCodeMatrixEntry | undefined {
  if (item.kind !== 'component' || !item.componentName) return undefined;

  const webComponentTag = `sd-${item.componentName}`;
  const reactHookName = `use${toPascalCase(item.componentName)}`;

  return {
    id: item.id,
    figma: false,
    html: true,
    webComponents: webComponentTagSet.has(webComponentTag),
    react: reactExportSet.has(reactHookName),
    docs: true,
    automatedTests: true,
    keyboardTested: false,
    screenReaderTested: false,
  };
}
