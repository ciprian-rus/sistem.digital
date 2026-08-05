export { renderHtmlReport } from './html-report.js';
export { buildReport } from './report.js';
export { checkAccessibility, type AccessibilityCheckOptions } from './rules/accessibility.js';
export { checkContrast, contrastRatio, type ContrastPair } from './rules/contrast.js';
export {
  checkHeadingOrder,
  checkLandmarks,
  type HeadingLandmarksCheckOptions,
} from './rules/heading-landmarks.js';
export { checkLinks, type LinkCheckOptions } from './rules/links.js';
export { checkPackageVersions, type PackageVersionCheckOptions } from './rules/package-version.js';
export {
  checkCssBudget,
  checkJsBudget,
  type PerformanceBudgetCheckOptions,
} from './rules/performance.js';
export { checkRequiredPages, type SeoCheckOptions } from './rules/seo.js';
export type {
  RuleResult,
  RuleSeverity,
  RuleStatus,
  ValidatorReport,
  ValidatorReportSummary,
} from './types.js';
