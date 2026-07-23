import { siteSections } from '../content/site-map';

export const treeTestRoles = [
  'design-ux',
  'development',
  'content',
  'public-service',
  'procurement-decision',
] as const;

export const accessibilityProfiles = ['yes', 'no', 'prefer-not-to-say'] as const;

export type TreeTestRole = (typeof treeTestRoles)[number];
export type AccessibilityProfile = (typeof accessibilityProfiles)[number];

export interface TreeTestTask {
  id: number;
  prompt: string;
  expectedPath: string;
  critical: boolean;
}

export interface TreeTestAnswer {
  taskId: number;
  selectedPath: string;
  firstSection: string;
  visitedPaths: readonly string[];
  durationMs: number;
  confidence: number;
  comment: string;
}

export interface TreeTestSubmission {
  schemaVersion: 1;
  studyId: 'm3-tree-test';
  responseId: string;
  role: TreeTestRole;
  accessibilityProfile: AccessibilityProfile;
  taskOrder: readonly number[];
  answers: readonly TreeTestAnswer[];
  totalDurationMs: number;
  completedAt: string;
}

export const treeTestTasks: readonly TreeTestTask[] = [
  {
    id: 1,
    prompt: 'Vrei să afli ce culoare trebuie folosită pentru un mesaj de eroare.',
    expectedPath: '/fundamente',
    critical: true,
  },
  {
    id: 2,
    prompt: 'Vrei markup-ul corect pentru un câmp obligatoriu cu mesaj de eroare.',
    expectedPath: '/componente/formulare',
    critical: true,
  },
  {
    id: 3,
    prompt: 'Vrei un flux complet pentru verificarea răspunsurilor înainte de trimiterea cererii.',
    expectedPath: '/pattern-uri',
    critical: false,
  },
  {
    id: 4,
    prompt: 'Vrei un proiect Next.js pregătit pentru pornire.',
    expectedPath: '/template-uri',
    critical: false,
  },
  {
    id: 5,
    prompt: 'Vrei reguli pentru redactarea textului unui buton.',
    expectedPath: '/ghiduri',
    critical: false,
  },
  {
    id: 6,
    prompt: 'Vrei să propui schimbarea API-ului unei componente.',
    expectedPath: '/guvernanta',
    critical: true,
  },
  {
    id: 7,
    prompt: 'Vrei să verifici dacă un dialog funcționează fără JavaScript.',
    expectedPath: '/componente/interactive',
    critical: false,
  },
  {
    id: 8,
    prompt: 'Vrei criterii pentru o achiziție publică bazată pe Sistem Digital.',
    expectedPath: '/ghiduri',
    critical: false,
  },
  {
    id: 9,
    prompt: 'Vrei să afli ce versiune a pachetului este documentată.',
    expectedPath: '/componente/catalog',
    critical: true,
  },
  {
    id: 10,
    prompt: 'Vrei să raportezi o vulnerabilitate fără a publica detaliile.',
    expectedPath: '/guvernanta',
    critical: true,
  },
] as const;

export const treeTestSections = siteSections.map((section) => ({
  href: section.href,
  label: section.navigationLabel,
  children: section.pages
    .filter((page) => page.status === 'available')
    .map((page) => ({
      href: page.href,
      label: page.navigationLabel,
    })),
}));

const allowedPaths = new Set(
  treeTestSections.flatMap((section) => [
    section.href,
    ...section.children.map((child) => child.href),
  ]),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isIntegerBetween(value: unknown, minimum: number, maximum: number): value is number {
  return Number.isInteger(value) && Number(value) >= minimum && Number(value) <= maximum;
}

function parseAnswer(value: unknown): TreeTestAnswer | undefined {
  if (!isRecord(value)) return undefined;
  if (!isIntegerBetween(value.taskId, 1, treeTestTasks.length)) return undefined;
  if (typeof value.selectedPath !== 'string' || !allowedPaths.has(value.selectedPath)) {
    return undefined;
  }
  if (
    typeof value.firstSection !== 'string' ||
    !treeTestSections.some((section) => section.href === value.firstSection)
  ) {
    return undefined;
  }
  if (
    !Array.isArray(value.visitedPaths) ||
    value.visitedPaths.length > 20 ||
    !value.visitedPaths.every((path) => typeof path === 'string' && allowedPaths.has(path))
  ) {
    return undefined;
  }
  if (!isIntegerBetween(value.durationMs, 0, 3_600_000)) return undefined;
  if (!isIntegerBetween(value.confidence, 1, 5)) return undefined;
  if (typeof value.comment !== 'string' || value.comment.length > 500) return undefined;

  return {
    taskId: value.taskId,
    selectedPath: value.selectedPath,
    firstSection: value.firstSection,
    visitedPaths: value.visitedPaths,
    durationMs: value.durationMs,
    confidence: value.confidence,
    comment: value.comment.trim(),
  };
}

export function parseTreeTestSubmission(value: unknown): TreeTestSubmission | undefined {
  if (!isRecord(value)) return undefined;
  if (value.schemaVersion !== 1 || value.studyId !== 'm3-tree-test') return undefined;
  if (
    typeof value.responseId !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(value.responseId)
  ) {
    return undefined;
  }
  if (!treeTestRoles.includes(value.role as TreeTestRole)) return undefined;
  if (!accessibilityProfiles.includes(value.accessibilityProfile as AccessibilityProfile)) {
    return undefined;
  }
  if (
    !Array.isArray(value.taskOrder) ||
    value.taskOrder.length !== treeTestTasks.length ||
    new Set(value.taskOrder).size !== treeTestTasks.length ||
    !value.taskOrder.every((taskId) => isIntegerBetween(taskId, 1, treeTestTasks.length))
  ) {
    return undefined;
  }
  if (!Array.isArray(value.answers) || value.answers.length !== treeTestTasks.length) {
    return undefined;
  }
  const answers = value.answers.map(parseAnswer);
  if (answers.some((answer) => !answer)) return undefined;
  if (new Set(answers.map((answer) => answer?.taskId)).size !== treeTestTasks.length) {
    return undefined;
  }
  if (!isIntegerBetween(value.totalDurationMs, 0, 7_200_000)) return undefined;
  if (
    typeof value.completedAt !== 'string' ||
    !Number.isFinite(Date.parse(value.completedAt)) ||
    value.completedAt.length > 40
  ) {
    return undefined;
  }

  return {
    schemaVersion: 1,
    studyId: 'm3-tree-test',
    responseId: value.responseId,
    role: value.role as TreeTestRole,
    accessibilityProfile: value.accessibilityProfile as AccessibilityProfile,
    taskOrder: value.taskOrder,
    answers: answers as TreeTestAnswer[],
    totalDurationMs: value.totalDurationMs,
    completedAt: value.completedAt,
  };
}
