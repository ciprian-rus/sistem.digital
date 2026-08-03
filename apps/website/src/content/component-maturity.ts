import { componentMaturity as rawComponentMaturity } from './component-maturity-data.mjs';

export type MaturityState =
  'proposal' | 'experimental' | 'candidate' | 'stable' | 'deprecated' | 'retired';

export interface MaturityTransition {
  from: string;
  to: string;
  date: string;
  approvedBy: string;
  reason: string;
}

export interface ComponentMaturityMetadata {
  id: string;
  state: MaturityState;
  owner: string;
  since: string;
  lastReviewed: string;
  evidence: readonly string[];
  deprecationReason?: string;
  replacedBy?: string;
  transitions: readonly MaturityTransition[];
}

const MATURITY_STATES: readonly MaturityState[] = [
  'proposal',
  'experimental',
  'candidate',
  'stable',
  'deprecated',
  'retired',
];

// Graful de tranziții permise din docs/governance/component-maturity-model.md.
const ALLOWED_TRANSITIONS: Readonly<Record<MaturityState, readonly MaturityState[]>> = {
  proposal: ['experimental'],
  experimental: ['candidate', 'proposal'],
  candidate: ['stable', 'experimental', 'proposal'],
  stable: ['deprecated'],
  deprecated: ['retired'],
  retired: [],
};

const STATES_REQUIRING_OWNER: readonly MaturityState[] = [
  'candidate',
  'stable',
  'deprecated',
  'retired',
];

const STATES_REQUIRING_DEPRECATION_REASON: readonly MaturityState[] = ['deprecated', 'retired'];

function isMaturityState(value: unknown): value is MaturityState {
  return typeof value === 'string' && (MATURITY_STATES as readonly string[]).includes(value);
}

function isTransition(value: unknown): value is MaturityTransition {
  if (typeof value !== 'object' || value === null) return false;
  const transition = value as Record<string, unknown>;
  return (
    typeof transition.from === 'string' &&
    typeof transition.to === 'string' &&
    typeof transition.date === 'string' &&
    typeof transition.approvedBy === 'string' &&
    typeof transition.reason === 'string' &&
    transition.reason.trim().length > 0
  );
}

function fail(id: string, message: string): never {
  throw new Error(`Maturitate componentă „${id}”: ${message}`);
}

function validateEntry(value: unknown): ComponentMaturityMetadata {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Maturitate componentă: intrarea nu este un obiect.');
  }
  const entry = value as Record<string, unknown>;
  const id = typeof entry.id === 'string' ? entry.id : undefined;
  if (!id) throw new Error('Maturitate componentă: lipsește id-ul.');

  if (!isMaturityState(entry.state)) fail(id, `stare invalidă „${String(entry.state)}”.`);
  if (!Array.isArray(entry.evidence) || !entry.evidence.every((item) => typeof item === 'string')) {
    fail(id, 'câmpul evidence trebuie să fie un array de string-uri.');
  }
  if (!Array.isArray(entry.transitions) || !entry.transitions.every(isTransition)) {
    fail(
      id,
      'câmpul transitions este invalid — fiecare intrare are nevoie de from/to/date/approvedBy/reason.',
    );
  }

  if (STATES_REQUIRING_OWNER.includes(entry.state) && typeof entry.owner !== 'string') {
    fail(id, `starea „${entry.state}” necesită un owner explicit.`);
  }
  if (STATES_REQUIRING_OWNER.includes(entry.state) && typeof entry.lastReviewed !== 'string') {
    fail(id, `starea „${entry.state}” necesită data ultimei evaluări (lastReviewed).`);
  }
  if (
    STATES_REQUIRING_DEPRECATION_REASON.includes(entry.state) &&
    (typeof entry.deprecationReason !== 'string' || entry.deprecationReason.trim().length === 0)
  ) {
    fail(id, `starea „${entry.state}” necesită deprecationReason documentat.`);
  }

  const transitions = entry.transitions as MaturityTransition[];
  for (const transition of transitions) {
    if (!isMaturityState(transition.from) || !isMaturityState(transition.to)) {
      fail(id, `tranziția ${transition.from} → ${transition.to} folosește o stare necunoscută.`);
    }
    const allowed = ALLOWED_TRANSITIONS[transition.from];
    if (!allowed.includes(transition.to)) {
      fail(
        id,
        `tranziția ${transition.from} → ${transition.to} nu este permisă de graful din component-maturity-model.md.`,
      );
    }
  }

  return {
    id,
    state: entry.state,
    owner: typeof entry.owner === 'string' ? entry.owner : '',
    since: typeof entry.since === 'string' ? entry.since : '',
    lastReviewed: typeof entry.lastReviewed === 'string' ? entry.lastReviewed : '',
    evidence: entry.evidence as readonly string[],
    ...(typeof entry.deprecationReason === 'string'
      ? { deprecationReason: entry.deprecationReason }
      : {}),
    ...(typeof entry.replacedBy === 'string' ? { replacedBy: entry.replacedBy } : {}),
    transitions,
  };
}

export function validateMaturityRegistry(
  items: readonly unknown[],
): readonly ComponentMaturityMetadata[] {
  const ids = new Set<string>();
  return items.map((item) => {
    const validated = validateEntry(item);
    if (ids.has(validated.id)) {
      throw new Error(`Maturitate componentă: id duplicat „${validated.id}”.`);
    }
    ids.add(validated.id);
    return validated;
  });
}

export const componentMaturity: readonly ComponentMaturityMetadata[] =
  validateMaturityRegistry(rawComponentMaturity);

export function getComponentMaturity(id: string): ComponentMaturityMetadata | undefined {
  return componentMaturity.find((entry) => entry.id === id);
}
