export const iconNames = [
  'info',
  'success',
  'warning',
  'danger',
  'close',
  'chevron-down',
  'search',
  'menu',
  'calendar',
  'download',
  'document',
  'external-link',
] as const;

export type IconName = (typeof iconNames)[number];

/**
 * Inner SVG markup only (no outer `<svg>` wrapper), one 24×24 viewBox
 * geometry per icon. Every icon is decorative by construction — paired
 * with visible text wherever it's used, never a replacement for it —
 * which is why `iconMarkup` always sets `aria-hidden="true"`.
 */
const iconPaths: Record<IconName, string> = {
  info: '<line x1="12" y1="10.5" x2="12" y2="17"/><circle cx="12" cy="6.5" r="0.75" fill="currentColor" stroke="none"/>',
  success: '<polyline points="5 13 10 18 19 7"/>',
  warning:
    '<line x1="12" y1="6" x2="12" y2="14"/><circle cx="12" cy="18" r="0.75" fill="currentColor" stroke="none"/>',
  danger: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  close: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><line x1="20" y1="20" x2="15.3" y2="15.3"/>',
  menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
  calendar:
    '<rect x="4" y="5.5" width="16" height="15" rx="1.5"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>',
  download:
    '<line x1="12" y1="4" x2="12" y2="15"/><polyline points="7 10 12 15 17 10"/><line x1="5" y1="19" x2="19" y2="19"/>',
  document:
    '<path d="M6 3.5h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"/><polyline points="14 3.5 14 7.5 18 7.5"/>',
  'external-link':
    '<path d="M9 6H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-3"/><polyline points="14 4 20 4 20 10"/><line x1="10" y1="14" x2="20" y2="4"/>',
};

export interface IconMarkupOptions {
  /** CSS size for both width and height. Defaults to `1em`, so the icon scales with the surrounding text. */
  size?: string;
}

/** Returns a self-contained `<svg class="sd-icon">` string for `name`, always `aria-hidden`. */
export function iconMarkup(name: IconName, { size = '1em' }: IconMarkupOptions = {}): string {
  return `<svg class="sd-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconPaths[name]}</svg>`;
}
