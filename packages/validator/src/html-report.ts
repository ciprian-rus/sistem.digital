import type { RuleResult, ValidatorReport } from './types.js';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const statusLabels: Record<RuleResult['status'], string> = {
  pass: 'Trecut',
  fail: 'Eșuat',
  warn: 'Avertisment',
  'not-applicable': 'Neaplicabil',
};

function renderRule(rule: RuleResult): string {
  return `
    <article>
      <h2>${escapeHtml(rule.id)} — ${escapeHtml(statusLabels[rule.status])}</h2>
      <p>${escapeHtml(rule.summary)}</p>
      <dl>
        <dt>Explicație</dt>
        <dd>${escapeHtml(rule.explanation)}</dd>
        <dt>Remediere</dt>
        <dd>${escapeHtml(rule.remediation)}</dd>
        <dt>Limitări</dt>
        <dd>${escapeHtml(rule.limitations)}</dd>
      </dl>
    </article>`;
}

/**
 * Randare HTML minimală a raportului — livrabilul „raport HTML” din #25.
 * Deliberat nu afișează un scor agregat unic (vezi principiul „nu se
 * pretinde conformare completă” din docs/product/validator-rules-inventory.md).
 */
export function renderHtmlReport(report: ValidatorReport): string {
  return `<!doctype html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <title>Raport Sistem Digital Validator — ${escapeHtml(report.target)}</title>
</head>
<body>
  <h1>Raport de validare</h1>
  <p>Țintă: ${escapeHtml(report.target)}</p>
  <p>Generat: ${escapeHtml(report.generatedAt)}</p>
  <p>Trecute: ${report.summary.pass} · Eșuate: ${report.summary.fail} · Avertismente: ${report.summary.warn} · Neaplicabile: ${report.summary.notApplicable}</p>
  ${report.rules.map(renderRule).join('\n')}
</body>
</html>
`;
}
