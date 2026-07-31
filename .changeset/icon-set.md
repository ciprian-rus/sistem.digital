---
"@sistem-digital/components": minor
---

Add a minimal decorative icon set (`iconMarkup`, `iconNames`, `@sistem-digital/components/icons.css`) — 12 outline icons (info, success, warning, danger, close, chevron-down, search, menu, calendar, download, document, external-link), always `aria-hidden`, meant to sit next to text rather than replace it. The existing `aria-hidden` status marks on alert, notification-banner, major-alert, warning-text and step-indicator now render one of these icons instead of a plain text character — no markup structure or accessibility contract changed, since those spans were already decorative.
