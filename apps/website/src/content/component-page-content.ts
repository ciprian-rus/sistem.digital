import { componentPageContent as rawComponentPageContent } from './component-page-content-data.mjs';

export interface ComponentHistoryEntry {
  version: string;
  date: string;
  change: string;
}

export interface ComponentPageContent {
  id: string;
  purpose: string;
  whenToUse: readonly string[];
  whenNotToUse: readonly string[];
  anatomy?: string;
  variants?: readonly string[];
  states?: readonly string[];
  behavior?: string;
  contentGuidelines?: readonly string[];
  accessibilityRef?: string;
  research?: readonly string[];
  knownIssues?: readonly string[];
  implementerResponsibilities?: readonly string[];
  history?: readonly ComponentHistoryEntry[];
}

function isNonEmptyStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isHistoryEntry(value: unknown): value is ComponentHistoryEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.version === 'string' &&
    typeof entry.date === 'string' &&
    typeof entry.change === 'string'
  );
}

function fail(id: string, message: string): never {
  throw new Error(`Conținutul paginii pentru „${id}”: ${message}`);
}

function validateEntry(value: unknown): ComponentPageContent {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Conținutul paginii unei componente: intrarea nu este un obiect.');
  }
  const entry = value as Record<string, unknown>;
  const id = typeof entry.id === 'string' ? entry.id : undefined;
  if (!id) throw new Error('Conținutul paginii unei componente: lipsește id-ul.');

  if (typeof entry.purpose !== 'string' || entry.purpose.trim().length === 0) {
    fail(id, 'câmpul purpose (scop și nevoie) este obligatoriu și nu poate fi gol.');
  }
  if (!isNonEmptyStringArray(entry.whenToUse) || entry.whenToUse.length === 0) {
    fail(id, 'câmpul whenToUse trebuie să fie un array cu cel puțin un string.');
  }
  if (!isNonEmptyStringArray(entry.whenNotToUse) || entry.whenNotToUse.length === 0) {
    fail(id, 'câmpul whenNotToUse trebuie să fie un array cu cel puțin un string.');
  }
  if (entry.variants !== undefined && !isNonEmptyStringArray(entry.variants)) {
    fail(id, 'câmpul variants trebuie să fie un array de string-uri.');
  }
  if (entry.states !== undefined && !isNonEmptyStringArray(entry.states)) {
    fail(id, 'câmpul states trebuie să fie un array de string-uri.');
  }
  if (entry.contentGuidelines !== undefined && !isNonEmptyStringArray(entry.contentGuidelines)) {
    fail(id, 'câmpul contentGuidelines trebuie să fie un array de string-uri.');
  }
  if (entry.research !== undefined && !isNonEmptyStringArray(entry.research)) {
    fail(id, 'câmpul research trebuie să fie un array de string-uri.');
  }
  if (entry.knownIssues !== undefined && !isNonEmptyStringArray(entry.knownIssues)) {
    fail(id, 'câmpul knownIssues trebuie să fie un array de string-uri.');
  }
  if (
    entry.implementerResponsibilities !== undefined &&
    !isNonEmptyStringArray(entry.implementerResponsibilities)
  ) {
    fail(id, 'câmpul implementerResponsibilities trebuie să fie un array de string-uri.');
  }
  if (
    entry.history !== undefined &&
    (!Array.isArray(entry.history) || !entry.history.every(isHistoryEntry))
  ) {
    fail(id, 'câmpul history este invalid — fiecare intrare are nevoie de version/date/change.');
  }

  return {
    id,
    purpose: entry.purpose,
    whenToUse: entry.whenToUse as readonly string[],
    whenNotToUse: entry.whenNotToUse as readonly string[],
    ...(typeof entry.anatomy === 'string' ? { anatomy: entry.anatomy } : {}),
    ...(entry.variants !== undefined ? { variants: entry.variants as readonly string[] } : {}),
    ...(entry.states !== undefined ? { states: entry.states as readonly string[] } : {}),
    ...(typeof entry.behavior === 'string' ? { behavior: entry.behavior } : {}),
    ...(entry.contentGuidelines !== undefined
      ? { contentGuidelines: entry.contentGuidelines as readonly string[] }
      : {}),
    ...(typeof entry.accessibilityRef === 'string'
      ? { accessibilityRef: entry.accessibilityRef }
      : {}),
    ...(entry.research !== undefined ? { research: entry.research as readonly string[] } : {}),
    ...(entry.knownIssues !== undefined
      ? { knownIssues: entry.knownIssues as readonly string[] }
      : {}),
    ...(entry.implementerResponsibilities !== undefined
      ? { implementerResponsibilities: entry.implementerResponsibilities as readonly string[] }
      : {}),
    ...(entry.history !== undefined
      ? { history: entry.history as readonly ComponentHistoryEntry[] }
      : {}),
  };
}

export function validatePageContentRegistry(
  items: readonly unknown[],
): readonly ComponentPageContent[] {
  const ids = new Set<string>();
  return items.map((item) => {
    const validated = validateEntry(item);
    if (ids.has(validated.id)) {
      throw new Error(`Conținutul paginii unei componente: id duplicat „${validated.id}”.`);
    }
    ids.add(validated.id);
    return validated;
  });
}

export const componentPageContent: readonly ComponentPageContent[] =
  validatePageContentRegistry(rawComponentPageContent);

export function getComponentPageContent(id: string): ComponentPageContent | undefined {
  return componentPageContent.find((entry) => entry.id === id);
}
