export const contentComponentNames = [
  'link',
  'external-link',
  'alert',
  'notification-banner',
  'inset-text',
  'card',
  'status-tag',
  'responsive-table',
  'summary-list',
  'details',
  'pagination',
  'metadata',
  'last-updated',
] as const;

export type ContentComponentName = (typeof contentComponentNames)[number];
