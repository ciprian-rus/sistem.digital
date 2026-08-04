import { describe, expect, it } from 'vitest';

import { buildReport } from './report.js';
import type { RuleResult } from './types.js';

function rule(overrides: Partial<RuleResult>): RuleResult {
  return {
    id: 'sd-test-rule',
    category: 'test',
    severity: 'error',
    status: 'pass',
    summary: '',
    explanation: '',
    remediation: '',
    evidence: [],
    limitations: '',
    ...overrides,
  };
}

describe('buildReport', () => {
  it('aggregates rule statuses into the summary', () => {
    const report = buildReport('https://example.ro', [
      rule({ status: 'pass' }),
      rule({ status: 'pass' }),
      rule({ status: 'fail' }),
      rule({ status: 'warn' }),
      rule({ status: 'not-applicable' }),
    ]);

    expect(report.summary).toEqual({ pass: 2, fail: 1, warn: 1, notApplicable: 1 });
    expect(report.target).toBe('https://example.ro');
    expect(report.rules).toHaveLength(5);
  });

  it('never computes a single aggregate score field', () => {
    const report = buildReport('https://example.ro', [rule({ status: 'pass' })]);
    expect(report).not.toHaveProperty('score');
  });
});
