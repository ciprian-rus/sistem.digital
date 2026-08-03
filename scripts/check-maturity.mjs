import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const maturityPath = path.join(root, 'apps/website/src/content/component-maturity-data.mjs');
const catalogPath = path.join(root, 'apps/website/src/content/catalog-data.mjs');

const { componentMaturity } = await import(
  `${pathToFileURL(maturityPath).href}?check=${Date.now()}`
);
const { catalogItems } = await import(`${pathToFileURL(catalogPath).href}?check=${Date.now()}`);

const MATURITY_STATES = [
  'proposal',
  'experimental',
  'candidate',
  'stable',
  'deprecated',
  'retired',
];

// Graful de tranziții permise din docs/governance/component-maturity-model.md.
const ALLOWED_TRANSITIONS = {
  proposal: ['experimental'],
  experimental: ['candidate', 'proposal'],
  candidate: ['stable', 'experimental', 'proposal'],
  stable: ['deprecated'],
  deprecated: ['retired'],
  retired: [],
};

const STATES_REQUIRING_OWNER = ['candidate', 'stable', 'deprecated', 'retired'];
const STATES_REQUIRING_DEPRECATION_REASON = ['deprecated', 'retired'];

function fail(message) {
  throw new Error(`Maturitate invalidă: ${message}`);
}

if (!Array.isArray(componentMaturity)) fail('registrul nu este un array.');

const catalogIds = new Set(catalogItems.map((item) => item.id));
const ids = new Set();

for (const entry of componentMaturity) {
  if (!entry || typeof entry !== 'object') fail('o intrare nu este obiect.');
  const { id } = entry;
  if (typeof id !== 'string' || id.length === 0) fail('lipsește id-ul unei intrări.');
  if (ids.has(id)) fail(`id duplicat „${id}”.`);
  ids.add(id);

  if (!catalogIds.has(id)) {
    fail(`„${id}” nu există în catalogul versionat (catalog-data.mjs) — id necunoscut.`);
  }

  if (!MATURITY_STATES.includes(entry.state)) {
    fail(`„${id}” are o stare invalidă: „${entry.state}”.`);
  }

  if (!Array.isArray(entry.evidence) || !entry.evidence.every((item) => typeof item === 'string')) {
    fail(`„${id}”: evidence trebuie să fie un array de string-uri.`);
  }

  if (STATES_REQUIRING_OWNER.includes(entry.state)) {
    if (typeof entry.owner !== 'string' || entry.owner.trim().length === 0) {
      fail(`„${id}”: starea „${entry.state}” necesită un owner explicit.`);
    }
    if (typeof entry.lastReviewed !== 'string' || entry.lastReviewed.trim().length === 0) {
      fail(`„${id}”: starea „${entry.state}” necesită lastReviewed.`);
    }
  }

  if (STATES_REQUIRING_DEPRECATION_REASON.includes(entry.state)) {
    if (
      typeof entry.deprecationReason !== 'string' ||
      entry.deprecationReason.trim().length === 0
    ) {
      fail(`„${id}”: starea „${entry.state}” necesită deprecationReason.`);
    }
  }

  if (!Array.isArray(entry.transitions) || entry.transitions.length === 0) {
    fail(`„${id}”: trebuie să existe cel puțin o tranziție înregistrată.`);
  }

  for (const transition of entry.transitions) {
    if (!transition || typeof transition !== 'object') {
      fail(`„${id}”: o tranziție nu este obiect.`);
    }
    const { from, to, date, approvedBy, reason } = transition;
    if (
      typeof from !== 'string' ||
      typeof to !== 'string' ||
      typeof date !== 'string' ||
      typeof approvedBy !== 'string' ||
      typeof reason !== 'string' ||
      reason.trim().length === 0
    ) {
      fail(`„${id}”: fiecare tranziție necesită from, to, date, approvedBy și reason.`);
    }
    if (!MATURITY_STATES.includes(from) || !MATURITY_STATES.includes(to)) {
      fail(`„${id}”: tranziția ${from} → ${to} folosește o stare necunoscută.`);
    }
    if (!ALLOWED_TRANSITIONS[from].includes(to)) {
      fail(
        `„${id}”: tranziția ${from} → ${to} nu este permisă (vezi docs/governance/component-maturity-model.md).`,
      );
    }
  }
}

console.log(
  `Maturitate validă: ${componentMaturity.length} intrări verificate contra catalogului (${catalogIds.size} componente publicate).`,
);
