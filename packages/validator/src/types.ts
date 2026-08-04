/**
 * Tipurile raportului, conform formatului documentat în
 * docs/product/validator-rules-inventory.md. Orice schimbare de formă aici
 * trebuie reflectată și acolo.
 */

export type RuleSeverity = 'error' | 'warning';

export type RuleStatus = 'pass' | 'fail' | 'warn' | 'not-applicable';

export interface RuleResult {
  id: string;
  category: string;
  severity: RuleSeverity;
  status: RuleStatus;
  summary: string;
  explanation: string;
  remediation: string;
  evidence: unknown;
  limitations: string;
}

export interface ValidatorReportSummary {
  pass: number;
  fail: number;
  warn: number;
  notApplicable: number;
}

export interface ValidatorReport {
  $schema: string;
  sistemDigitalValidatorVersion: string;
  target: string;
  generatedAt: string;
  rules: RuleResult[];
  summary: ValidatorReportSummary;
}
