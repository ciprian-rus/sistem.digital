export const navigationComponentNames = [
  'official-banner',
  'major-alert',
  'institution-header',
  'desktop-navigation',
  'mobile-navigation',
  'breadcrumb',
  'service-navigation',
  'search',
  'footer',
  'skip-link',
] as const;

export type NavigationComponentName = (typeof navigationComponentNames)[number];
