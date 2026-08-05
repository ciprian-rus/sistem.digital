import { describe, expect, it } from 'vitest';

import { renderBadgeSvg } from './badge.js';
import { buildReport } from './report.js';
import type { RuleResult } from './types.js';

function rule(status: RuleResult['status']): RuleResult {
  return {
    id: `sd-fixture-${status}`,
    category: 'fixture',
    severity: 'error',
    status,
    summary: '',
    explanation: '',
    remediation: '',
    evidence: null,
    limitations: '',
  };
}

describe('renderBadgeSvg', () => {
  it('renders a green badge with the exact pass/fail/warn counts when everything passes', () => {
    const report = buildReport('https://exemplu.ro', [
      rule('pass'),
      rule('pass'),
      rule('not-applicable'),
    ]);
    const svg = renderBadgeSvg(report);
    expect(svg).toContain('<svg');
    expect(svg).toContain('2 trec, 0 eșuează, 0 avertismente');
    expect(svg).toContain('#4c1');
    expect(svg).not.toContain('#e05d44');
  });

  it('renders a red badge when at least one rule fails, regardless of warnings', () => {
    const report = buildReport('https://exemplu.ro', [rule('pass'), rule('fail'), rule('warn')]);
    const svg = renderBadgeSvg(report);
    expect(svg).toContain('1 trec, 1 eșuează, 1 avertismente');
    expect(svg).toContain('#e05d44');
  });

  it('renders a yellow badge when there are warnings but no failures', () => {
    const report = buildReport('https://exemplu.ro', [rule('pass'), rule('warn')]);
    const svg = renderBadgeSvg(report);
    expect(svg).toContain('#dfb317');
    expect(svg).not.toContain('#e05d44');
  });

  it('escapes a custom label containing XML-sensitive characters', () => {
    const report = buildReport('https://exemplu.ro', [rule('pass')]);
    const svg = renderBadgeSvg(report, 'validator <beta>');
    expect(svg).toContain('validator &lt;beta&gt;');
    expect(svg).not.toContain('<beta>');
  });

  it('never renders a single aggregate score or percentage as the message', () => {
    // "100%" apare legitim în definiția gradientului SVG (coordonată, nu
    // conformare) — verificăm explicit doar textul mesajului vizibil.
    const report = buildReport('https://exemplu.ro', [rule('pass'), rule('pass'), rule('fail')]);
    const svg = renderBadgeSvg(report);
    const messageMatch = /<text x="[^"]+" y="14">([^<]+)<\/text>\s*<\/g>/u.exec(svg);
    expect(messageMatch?.[1]).toBe('2 trec, 1 eșuează, 0 avertismente');
    expect(messageMatch?.[1]).not.toMatch(/%/u);
    expect(svg).not.toMatch(/\bscor\b/iu);
  });
});
