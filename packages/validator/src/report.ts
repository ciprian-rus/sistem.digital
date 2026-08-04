import type { RuleResult, ValidatorReport } from './types.js';

// Bump la orice schimbare a formei RuleResult/ValidatorReport, nu la fiecare
// release al pachetului — versiunea pachetului și versiunea formatului de
// raport evoluează independent.
const REPORT_FORMAT_VERSION = '1.0.0';

/**
 * Construiește raportul final din rezultatele individuale ale regulilor.
 * Deliberat nu calculează un scor agregat unic — vezi principiul „nu se
 * pretinde conformare completă” din docs/product/validator-rules-inventory.md.
 */
export function buildReport(target: string, rules: readonly RuleResult[]): ValidatorReport {
  const summary = { pass: 0, fail: 0, warn: 0, notApplicable: 0 };

  for (const rule of rules) {
    if (rule.status === 'pass') summary.pass += 1;
    else if (rule.status === 'fail') summary.fail += 1;
    else if (rule.status === 'warn') summary.warn += 1;
    else summary.notApplicable += 1;
  }

  return {
    $schema: 'https://sistem.digital/schemas/validator-report-v1.json',
    sistemDigitalValidatorVersion: REPORT_FORMAT_VERSION,
    target,
    generatedAt: new Date().toISOString(),
    rules: [...rules],
    summary,
  };
}
