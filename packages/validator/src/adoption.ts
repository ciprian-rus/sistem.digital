import type { RuleResult, ValidatorReport } from './types.js';

/**
 * Cele patru niveluri de adopție instituțională, conform
 * docs/governance/adoption-levels.md — progresie monotonă, `verified`
 * include criteriile `conformant`, care le include pe cele `compatible`,
 * care le include pe cele `aligned`.
 */
export type AdoptionLevel = 'aligned' | 'compatible' | 'conformant' | 'verified';

const LEVEL_ORDER: readonly AdoptionLevel[] = ['aligned', 'compatible', 'conformant', 'verified'];

/**
 * Criteriile pe care validatorul nu le poate verifica automat — vezi
 * docs/governance/adoption-levels.md. Nu sunt presupuse întrunite implicit;
 * apelantul (un om) le confirmă explicit.
 */
export interface AdoptionAttestations {
  /** Serviciul respectă regulile de content design (limbaj simplu, HTML-first). */
  contentDesignReviewed?: boolean;
  /** Instituția are un punct de contact desemnat pentru Sistem Digital. */
  contactPointDesignated?: boolean;
  /** Folosește @sistem-digital/tokens ca sursă de culori/tipografie/spațiere, nu valori arbitrare. */
  usesDesignTokens?: boolean;
  /** Serviciul urmează cel puțin un pattern administrativ documentat la /pattern-uri. */
  followsDocumentedPattern?: boolean;
  /** Link către rezultatele publicate ale unui audit manual de accesibilitate cu tehnologii asistive. */
  manualAccessibilityAuditEvidence?: string;
}

export interface AdoptionException {
  /** Regula sau criteriul afectat (id de regulă din raport, sau id de criteriu de mai jos). */
  ruleId: string;
  reason: string;
  responsible: string;
  /** Termen limită explicit — o excepție fără termen nu e validă (docs/governance/adoption-levels.md). */
  deadline: string;
}

export interface AdoptionLevelOptions {
  attestations?: AdoptionAttestations;
  activeExceptions?: AdoptionException[];
  /** Data evaluării curente. Implicit acum. */
  evaluationDate?: Date;
}

export interface AdoptionCriterion {
  id: string;
  level: AdoptionLevel;
  description: string;
  met: boolean;
  /** false dacă criteriul nu poate fi verificat automat — necesită atestare umană. */
  automatable: boolean;
  /** Dacă true, criteriul e neîntrunit dar acoperit de o excepție activă și netermenă expirată. */
  excepted: boolean;
}

export interface AdoptionLevelAssessment {
  currentLevel: AdoptionLevel | 'none';
  criteria: AdoptionCriterion[];
  limitations: string;
}

/** Aceeași schemă publică documentată în docs/governance/adoption-levels.md. */
export interface InstitutionalAdoptionReport {
  institution: string;
  application: string;
  currentLevel: AdoptionLevel | 'none';
  evaluationDate: string;
  evidence: string[];
  activeExceptions: string[];
}

const CERTIFICATION_VALIDITY_DAYS = 365;

function findRule(report: ValidatorReport, id: string): RuleResult | undefined {
  return report.rules.find((rule) => rule.id === id);
}

function rulePasses(report: ValidatorReport, id: string): boolean {
  return findRule(report, id)?.status === 'pass';
}

function isExcepted(exceptions: readonly AdoptionException[], id: string, now: Date): boolean {
  return exceptions.some(
    (exception) =>
      exception.ruleId === id && new Date(exception.deadline).getTime() >= now.getTime(),
  );
}

/**
 * Evaluează raportul validatorului față de cele patru niveluri de adopție
 * instituțională (docs/governance/adoption-levels.md). Verifică automat doar
 * criteriile pe care le poate verifica dintr-un raport al validatorului —
 * conținut editorial, punct de contact, respectarea unui pattern documentat
 * și auditul manual de accesibilitate rămân, deliberat, neautomatizabile;
 * un criteriu neatestat explicit prin `options.attestations` e tratat ca
 * neîntrunit, nu ca implicit adevărat — conform principiului „nu se
 * pretinde conformare completă doar din teste automate” (#25).
 */
export function assessAdoptionLevel(
  report: ValidatorReport,
  options: AdoptionLevelOptions = {},
): AdoptionLevelAssessment {
  const attestations = options.attestations ?? {};
  const exceptions = options.activeExceptions ?? [];
  const now = options.evaluationDate ?? new Date();

  const criteria: AdoptionCriterion[] = [
    {
      id: 'aligned-no-wcag-contradiction',
      level: 'aligned',
      description:
        'Nu contrazice explicit principiile de accesibilitate WCAG 2.2 AA (sd-a11y-axe-wcag).',
      met: rulePasses(report, 'sd-a11y-axe-wcag'),
      automatable: true,
      excepted: false,
    },
    {
      id: 'aligned-content-design',
      level: 'aligned',
      description:
        'Respectă regulile de content design (limbaj simplu, HTML-first) — necesită confirmare umană.',
      met: attestations.contentDesignReviewed === true,
      automatable: false,
      excepted: false,
    },
    {
      id: 'aligned-contact-point',
      level: 'aligned',
      description:
        'Are un punct de contact desemnat pentru Sistem Digital — necesită confirmare umană.',
      met: attestations.contactPointDesignated === true,
      automatable: false,
      excepted: false,
    },
    {
      id: 'compatible-tokens',
      level: 'compatible',
      description:
        'Folosește tokeni de design ca sursă pentru culori/tipografie/spațiere, nu valori arbitrare — necesită confirmare umană (nu poate fi dedus fiabil doar din pagina randată).',
      met: attestations.usesDesignTokens === true,
      automatable: false,
      excepted: false,
    },
    {
      id: 'compatible-semantic-html',
      level: 'compatible',
      description:
        'Markup semantic: landmark-uri, ierarhie de titluri, formulare etichetate corect (sd-a11y-landmarks, sd-a11y-heading-order, sd-a11y-form-labels).',
      met:
        rulePasses(report, 'sd-a11y-landmarks') &&
        rulePasses(report, 'sd-a11y-heading-order') &&
        rulePasses(report, 'sd-a11y-form-labels'),
      automatable: true,
      excepted: false,
    },
    {
      id: 'compatible-contrast',
      level: 'compatible',
      description: 'Temele respectă cerințele minime de contrast (parte din sd-a11y-axe-wcag).',
      met: rulePasses(report, 'sd-a11y-axe-wcag'),
      automatable: true,
      excepted: false,
    },
    {
      id: 'conformant-uses-components',
      level: 'conformant',
      description:
        'Folosește componente oficiale @sistem-digital/components, nu reimplementări (sd-content-component-structure).',
      met: rulePasses(report, 'sd-content-component-structure'),
      automatable: true,
      excepted: false,
    },
    {
      id: 'conformant-documented-pattern',
      level: 'conformant',
      description:
        'Serviciul urmează cel puțin un pattern administrativ documentat la /pattern-uri — necesită confirmare umană.',
      met: attestations.followsDocumentedPattern === true,
      automatable: false,
      excepted: false,
    },
    {
      id: 'conformant-supported-version',
      level: 'conformant',
      description:
        'Versiunea Sistem Digital folosită e documentată public și nu a depășit termenul de suport (sd-package-version).',
      met: rulePasses(report, 'sd-package-version'),
      automatable: true,
      excepted: false,
    },
    {
      id: 'verified-no-undocumented-failures',
      level: 'verified',
      description: 'Validatorul nu raportează eșecuri fără o excepție activă documentată.',
      met: report.summary.fail === 0,
      automatable: true,
      excepted: false,
    },
    {
      id: 'verified-manual-audit',
      level: 'verified',
      description:
        'Există un audit manual de accesibilitate cu tehnologii asistive, cu rezultate publicate — necesită confirmare umană.',
      met: Boolean(attestations.manualAccessibilityAuditEvidence),
      automatable: false,
      excepted: false,
    },
  ];

  // O excepție activă (cu termen neexpirat) acoperă un criteriu neîntrunit —
  // nu-l face "met", dar nu blochează nivelul dacă restul criteriilor trec.
  for (const criterion of criteria) {
    if (!criterion.met && isExcepted(exceptions, criterion.id, now)) {
      criterion.excepted = true;
    }
  }

  let currentLevel: AdoptionLevel | 'none' = 'none';
  for (const level of LEVEL_ORDER) {
    const levelCriteria = criteria.filter((criterion) => criterion.level === level);
    const satisfied = levelCriteria.every((criterion) => criterion.met || criterion.excepted);
    if (!satisfied) break;
    currentLevel = level;
  }

  return {
    currentLevel,
    criteria,
    limitations:
      'Verifică doar criteriile automatizabile dintr-un raport al validatorului — content design, punctul de contact, urmarea unui pattern documentat și auditul manual de accesibilitate necesită confirmare umană explicită (options.attestations), altfel sunt tratate ca neîntrunite. Nu se pretinde conformare completă doar din teste automate — vezi docs/governance/adoption-levels.md.',
  };
}

/**
 * Construiește raportul public de adopție instituțională, în forma
 * documentată în docs/governance/adoption-levels.md — schema
 * `InstitutionalAdoptionReport`, verificabilă și comparabilă cu schema
 * PNIDP propusă.
 */
export function buildAdoptionReport(
  institution: string,
  application: string,
  report: ValidatorReport,
  options: AdoptionLevelOptions = {},
): InstitutionalAdoptionReport {
  const assessment = assessAdoptionLevel(report, options);
  const evaluationDate = (options.evaluationDate ?? new Date()).toISOString().slice(0, 10);

  return {
    institution,
    application,
    currentLevel: assessment.currentLevel,
    evaluationDate,
    evidence: [report.target],
    activeExceptions: (options.activeExceptions ?? []).map((exception) => exception.ruleId),
  };
}

/**
 * Verifică dacă o certificare de nivel a expirat — 12 luni de la
 * evaluationDate, conform „Expirarea certificării” din
 * docs/governance/adoption-levels.md. Publicarea unei versiuni majore noi,
 * al doilea criteriu documentat de expirare, nu poate fi verificată aici —
 * necesită compararea cu politica de suport a versiunii (docs/governance/release-policy.md),
 * în afara scope-ului acestei funcții pure.
 */
export function isCertificationExpired(evaluationDate: string, now: Date = new Date()): boolean {
  const evaluatedAt = new Date(evaluationDate);
  const ageMs = now.getTime() - evaluatedAt.getTime();
  return ageMs > CERTIFICATION_VALIDITY_DAYS * 24 * 60 * 60 * 1000;
}
