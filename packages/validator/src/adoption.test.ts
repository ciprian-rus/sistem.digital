import { describe, expect, it } from 'vitest';

import {
  assessAdoptionLevel,
  buildAdoptionReport,
  isCertificationExpired,
  type AdoptionAttestations,
  type AdoptionException,
} from './adoption.js';
import { renderAdoptionBadgeSvg } from './badge.js';
import { buildReport } from './report.js';
import type { RuleResult, RuleStatus } from './types.js';

function rule(id: string, status: RuleStatus): RuleResult {
  return {
    id,
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

const ALL_ALIGNED_ATTESTATIONS: AdoptionAttestations = {
  contentDesignReviewed: true,
  contactPointDesignated: true,
};

const ALL_COMPATIBLE_ATTESTATIONS: AdoptionAttestations = {
  ...ALL_ALIGNED_ATTESTATIONS,
  usesDesignTokens: true,
};

const ALL_CONFORMANT_ATTESTATIONS: AdoptionAttestations = {
  ...ALL_COMPATIBLE_ATTESTATIONS,
  followsDocumentedPattern: true,
};

const ALL_VERIFIED_ATTESTATIONS: AdoptionAttestations = {
  ...ALL_CONFORMANT_ATTESTATIONS,
  manualAccessibilityAuditEvidence: 'https://exemplu.ro/audit-2026.pdf',
};

function reportWithAutomatableRulesPassing() {
  return buildReport('https://exemplu-institutie.ro', [
    rule('sd-a11y-axe-wcag', 'pass'),
    rule('sd-a11y-landmarks', 'pass'),
    rule('sd-a11y-heading-order', 'pass'),
    rule('sd-a11y-form-labels', 'pass'),
    rule('sd-content-component-structure', 'pass'),
    rule('sd-package-version', 'pass'),
  ]);
}

describe('assessAdoptionLevel', () => {
  it('returns "none" when no attestations are given, even if every automatable rule passes', () => {
    const report = reportWithAutomatableRulesPassing();
    const assessment = assessAdoptionLevel(report);
    expect(assessment.currentLevel).toBe('none');
    const contentDesign = assessment.criteria.find((c) => c.id === 'aligned-content-design');
    expect(contentDesign?.met).toBe(false);
    expect(contentDesign?.automatable).toBe(false);
  });

  it('reaches "aligned" once the entry attestations are given and axe-wcag passes', () => {
    const report = reportWithAutomatableRulesPassing();
    const assessment = assessAdoptionLevel(report, { attestations: ALL_ALIGNED_ATTESTATIONS });
    expect(assessment.currentLevel).toBe('aligned');
  });

  it('does not skip levels: compatible attestations alone are not enough without aligned ones', () => {
    const report = reportWithAutomatableRulesPassing();
    const assessment = assessAdoptionLevel(report, {
      attestations: { usesDesignTokens: true },
    });
    expect(assessment.currentLevel).toBe('none');
  });

  it('reaches "compatible" once semantic HTML rules pass and tokens are attested', () => {
    const report = reportWithAutomatableRulesPassing();
    const assessment = assessAdoptionLevel(report, { attestations: ALL_COMPATIBLE_ATTESTATIONS });
    expect(assessment.currentLevel).toBe('compatible');
  });

  it('reaches "conformant" once component-structure/package-version pass and the pattern is attested', () => {
    const report = reportWithAutomatableRulesPassing();
    const assessment = assessAdoptionLevel(report, { attestations: ALL_CONFORMANT_ATTESTATIONS });
    expect(assessment.currentLevel).toBe('conformant');
  });

  it('reaches "verified" only with zero validator failures and manual audit evidence', () => {
    const report = reportWithAutomatableRulesPassing();
    const assessment = assessAdoptionLevel(report, { attestations: ALL_VERIFIED_ATTESTATIONS });
    expect(assessment.currentLevel).toBe('verified');
  });

  it('caps at "conformant" when the report has a failure and there is no active exception', () => {
    const report = buildReport('https://exemplu-institutie.ro', [
      rule('sd-a11y-axe-wcag', 'pass'),
      rule('sd-a11y-landmarks', 'pass'),
      rule('sd-a11y-heading-order', 'pass'),
      rule('sd-a11y-form-labels', 'pass'),
      rule('sd-content-component-structure', 'pass'),
      rule('sd-package-version', 'pass'),
      rule('sd-content-broken-links', 'fail'),
    ]);
    const assessment = assessAdoptionLevel(report, { attestations: ALL_VERIFIED_ATTESTATIONS });
    expect(assessment.currentLevel).toBe('conformant');
  });

  it('reaches "verified" when the only failure is covered by an unexpired exception', () => {
    const report = buildReport('https://exemplu-institutie.ro', [
      rule('sd-a11y-axe-wcag', 'pass'),
      rule('sd-a11y-landmarks', 'pass'),
      rule('sd-a11y-heading-order', 'pass'),
      rule('sd-a11y-form-labels', 'pass'),
      rule('sd-content-component-structure', 'pass'),
      rule('sd-package-version', 'pass'),
      rule('sd-content-broken-links', 'fail'),
    ]);
    const exceptions: AdoptionException[] = [
      {
        ruleId: 'verified-no-undocumented-failures',
        reason: 'Link extern temporar indisponibil, în afara controlului instituției.',
        responsible: 'echipa IT',
        deadline: '2099-01-01',
      },
    ];
    const assessment = assessAdoptionLevel(report, {
      attestations: ALL_VERIFIED_ATTESTATIONS,
      activeExceptions: exceptions,
    });
    expect(assessment.currentLevel).toBe('verified');
    const failureCriterion = assessment.criteria.find(
      (c) => c.id === 'verified-no-undocumented-failures',
    );
    expect(failureCriterion?.met).toBe(false);
    expect(failureCriterion?.excepted).toBe(true);
  });

  it('does not honor an exception whose deadline has already passed', () => {
    const report = buildReport('https://exemplu-institutie.ro', [
      rule('sd-a11y-axe-wcag', 'pass'),
      rule('sd-a11y-landmarks', 'pass'),
      rule('sd-a11y-heading-order', 'pass'),
      rule('sd-a11y-form-labels', 'pass'),
      rule('sd-content-component-structure', 'pass'),
      rule('sd-package-version', 'pass'),
      rule('sd-content-broken-links', 'fail'),
    ]);
    const exceptions: AdoptionException[] = [
      {
        ruleId: 'verified-no-undocumented-failures',
        reason: 'Expirat.',
        responsible: 'echipa IT',
        deadline: '2020-01-01',
      },
    ];
    const assessment = assessAdoptionLevel(report, {
      attestations: ALL_VERIFIED_ATTESTATIONS,
      activeExceptions: exceptions,
    });
    expect(assessment.currentLevel).toBe('conformant');
  });
});

describe('buildAdoptionReport', () => {
  it('produces the InstitutionalAdoptionReport shape documented in docs/governance/adoption-levels.md', () => {
    const report = reportWithAutomatableRulesPassing();
    const evaluationDate = new Date('2026-08-05T00:00:00Z');
    const institutionalReport = buildAdoptionReport(
      'Primăria Exemplu',
      'Portal cereri online',
      report,
      { attestations: ALL_CONFORMANT_ATTESTATIONS, evaluationDate },
    );
    expect(institutionalReport).toEqual({
      institution: 'Primăria Exemplu',
      application: 'Portal cereri online',
      currentLevel: 'conformant',
      evaluationDate: '2026-08-05',
      evidence: ['https://exemplu-institutie.ro'],
      activeExceptions: [],
    });
  });

  it('lists active exception ids explicitly, per the documented schema', () => {
    const report = reportWithAutomatableRulesPassing();
    const exceptions: AdoptionException[] = [
      {
        ruleId: 'conformant-documented-pattern',
        reason: 'Pattern încă în evaluare.',
        responsible: 'echipa produs',
        deadline: '2099-01-01',
      },
    ];
    const institutionalReport = buildAdoptionReport('Instituție', 'Aplicație', report, {
      activeExceptions: exceptions,
    });
    expect(institutionalReport.activeExceptions).toEqual(['conformant-documented-pattern']);
  });
});

describe('isCertificationExpired', () => {
  it('is not expired immediately after evaluation', () => {
    expect(isCertificationExpired('2026-08-05', new Date('2026-08-05T00:00:00Z'))).toBe(false);
  });

  it('is not expired just under 12 months later', () => {
    expect(isCertificationExpired('2026-08-05', new Date('2027-08-01T00:00:00Z'))).toBe(false);
  });

  it('is expired more than 12 months later', () => {
    expect(isCertificationExpired('2026-08-05', new Date('2027-09-01T00:00:00Z'))).toBe(true);
  });
});

describe('renderAdoptionBadgeSvg', () => {
  it('renders the documented format and a valid (non-warning) color when not expired', () => {
    const svg = renderAdoptionBadgeSvg('conformant', '0.1.0-alpha.3', '2026-08-04', false);
    expect(svg).toContain('<svg');
    expect(svg).toContain('conformant · v0.1.0-alpha.3 · evaluat 2026-08-04');
    expect(svg).toContain('#4c1');
    expect(svg).not.toContain('#dfb317');
  });

  it('renders a visually distinct warning color when the certification has expired', () => {
    const svg = renderAdoptionBadgeSvg('conformant', '0.1.0-alpha.3', '2025-01-01', true);
    expect(svg).toContain('#dfb317');
    expect(svg).not.toContain('#4c1');
    expect(svg).toContain('certificare expirată');
  });

  it('renders a warning color for "none" even when not marked expired', () => {
    const svg = renderAdoptionBadgeSvg('none', '0.1.0-alpha.3', '2026-08-04', false);
    expect(svg).toContain('#dfb317');
  });
});
