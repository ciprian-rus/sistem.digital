import type { AdoptionLevel } from './adoption.js';
import type { ValidatorReport } from './types.js';

const CHAR_WIDTH_PX = 6.5;
const HORIZONTAL_PADDING_PX = 10;
const HEIGHT_PX = 20;

const COLOR_FAIL = '#e05d44';
const COLOR_WARN = '#dfb317';
const COLOR_PASS = '#4c1';

function escapeXml(value: string): string {
  return value
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;');
}

function segmentWidth(text: string): number {
  return Math.round(text.length * CHAR_WIDTH_PX) + HORIZONTAL_PADDING_PX * 2;
}

function statusColor(summary: ValidatorReport['summary']): string {
  if (summary.fail > 0) return COLOR_FAIL;
  if (summary.warn > 0) return COLOR_WARN;
  return COLOR_PASS;
}

/**
 * Randează un badge SVG static, în stilul shields.io, din summary-ul unui
 * raport. Mesajul afișează numărul de reguli pass/fail/warn — niciodată
 * un scor agregat unic — conform principiului „nu se pretinde conformare
 * completă” din docs/product/validator-rules-inventory.md. Culoarea e un
 * indicator de stare (roșu dacă există eșecuri, galben dacă există doar
 * avertismente, verde altfel), nu o reducere la un procent.
 */
export function renderBadgeSvg(
  report: ValidatorReport,
  label = 'sistem digital validator',
): string {
  const { summary } = report;
  const message = `${summary.pass} trec, ${summary.fail} eșuează, ${summary.warn} avertismente`;
  const labelWidth = segmentWidth(label);
  const messageWidth = segmentWidth(message);
  const totalWidth = labelWidth + messageWidth;
  const color = statusColor(summary);
  const accessibleLabel = escapeXml(`${label}: ${message}`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${HEIGHT_PX}" role="img" aria-label="${accessibleLabel}">
  <title>${accessibleLabel}</title>
  <linearGradient id="sd-validator-badge-shine" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="sd-validator-badge-round">
    <rect width="${totalWidth}" height="${HEIGHT_PX}" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#sd-validator-badge-round)">
    <rect width="${labelWidth}" height="${HEIGHT_PX}" fill="#555"/>
    <rect x="${labelWidth}" width="${messageWidth}" height="${HEIGHT_PX}" fill="${color}"/>
    <rect width="${totalWidth}" height="${HEIGHT_PX}" fill="url(#sd-validator-badge-shine)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
    <text x="${labelWidth / 2}" y="14">${escapeXml(label)}</text>
    <text x="${labelWidth + messageWidth / 2}" y="14">${escapeXml(message)}</text>
  </g>
</svg>
`;
}

/**
 * Randează badge-ul de nivel de adopție instituțională, în formatul
 * documentat în docs/governance/adoption-levels.md:
 * `[Sistem Digital: conformant · v0.1.0-alpha.3 · evaluat 2026-08-04]`.
 * Un badge cu data de evaluare mai veche decât perioada de expirare (12
 * luni) devine vizual distinct — culoare de avertizare, nu aceeași culoare
 * ca un badge valid — ca să nu inducă în eroare un vizitator al paginii.
 */
export function renderAdoptionBadgeSvg(
  level: AdoptionLevel | 'none',
  sistemDigitalVersion: string,
  evaluationDate: string,
  expired: boolean,
  label = 'Sistem Digital',
): string {
  const message = `${level} · v${sistemDigitalVersion} · evaluat ${evaluationDate}`;
  const labelWidth = segmentWidth(label);
  const messageWidth = segmentWidth(message);
  const totalWidth = labelWidth + messageWidth;
  const color = expired || level === 'none' ? COLOR_WARN : COLOR_PASS;
  const accessibleLabel = escapeXml(
    `${label}: ${message}${expired ? ' (certificare expirată)' : ''}`,
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${HEIGHT_PX}" role="img" aria-label="${accessibleLabel}">
  <title>${accessibleLabel}</title>
  <linearGradient id="sd-adoption-badge-shine" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="sd-adoption-badge-round">
    <rect width="${totalWidth}" height="${HEIGHT_PX}" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#sd-adoption-badge-round)">
    <rect width="${labelWidth}" height="${HEIGHT_PX}" fill="#555"/>
    <rect x="${labelWidth}" width="${messageWidth}" height="${HEIGHT_PX}" fill="${color}"/>
    <rect width="${totalWidth}" height="${HEIGHT_PX}" fill="url(#sd-adoption-badge-shine)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
    <text x="${labelWidth / 2}" y="14">${escapeXml(label)}</text>
    <text x="${labelWidth + messageWidth / 2}" y="14">${escapeXml(message)}</text>
  </g>
</svg>
`;
}
