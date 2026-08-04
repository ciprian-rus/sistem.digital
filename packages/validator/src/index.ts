export { renderHtmlReport } from './html-report.js';
export { buildReport } from './report.js';
export { checkAccessibility, type AccessibilityCheckOptions } from './rules/accessibility.js';
export { checkContrast, contrastRatio, type ContrastPair } from './rules/contrast.js';
export type {
  RuleResult,
  RuleSeverity,
  RuleStatus,
  ValidatorReport,
  ValidatorReportSummary,
} from './types.js';
