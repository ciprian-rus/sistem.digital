export interface RawComponentHistoryEntry {
  version: string;
  date: string;
  change: string;
}

export interface RawComponentPageContent {
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
  history?: readonly RawComponentHistoryEntry[];
}

export const componentPageContent: readonly RawComponentPageContent[];
