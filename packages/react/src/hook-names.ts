/**
 * Plain data, no React import — safe to read from a server context (e.g. to
 * compute a design-code availability matrix) without pulling in `useEffect`
 * and forcing a "use client" boundary. Mirrors `webComponentNames` from
 * `@sistem-digital/web-components`. Keep in sync with the named hook exports
 * in index.ts (excludes `useSistemDigitalEnhancements`, which is a global
 * convenience hook, not tied to one component).
 */
export const reactHookNames = [
  'useAccordion',
  'useAutocomplete',
  'useCharacterCount',
  'useCookieBanner',
  'useDialog',
  'useDropdown',
  'useErrorSummary',
  'useExitThisPage',
  'useFileUploadAdvanced',
  'useSortableTable',
  'useTabs',
  'useTooltip',
] as const;
