import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const catalogPath = path.join(root, 'apps/website/src/content/catalog-data.mjs');
const maturityPath = path.join(root, 'apps/website/src/content/component-maturity-data.mjs');
const pageContentPath = path.join(root, 'apps/website/src/content/component-page-content-data.mjs');

const { catalogItems, catalogFamilies } = await import(
  `${pathToFileURL(catalogPath).href}?check=${Date.now()}`
);
const { componentMaturity } = await import(
  `${pathToFileURL(maturityPath).href}?check=${Date.now()}`
);
const { componentPageContent } = await import(
  `${pathToFileURL(pageContentPath).href}?check=${Date.now()}`
);

// Stările din component-maturity-model.md la care documentația completă pe
// cele 15 secțiuni face parte din Definition of Done (vezi "candidate": DoD
// cere "documentație completă conform structurii standard pe 15 secțiuni").
const STATES_REQUIRING_COMPLETE_DOCS = ['candidate', 'stable', 'deprecated', 'retired'];

function fail(message) {
  throw new Error(`Documentația componentei invalidă: ${message}`);
}

if (!Array.isArray(componentPageContent)) fail('registrul nu este un array.');

const catalogIds = new Set(catalogItems.map((item) => item.id));
const seenIds = new Set();

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

for (const entry of componentPageContent) {
  if (!entry || typeof entry !== 'object') fail('o intrare nu este obiect.');
  const { id } = entry;
  if (typeof id !== 'string' || id.length === 0) fail('lipsește id-ul unei intrări.');
  if (seenIds.has(id)) fail(`id duplicat „${id}”.`);
  seenIds.add(id);

  if (!catalogIds.has(id)) {
    fail(`„${id}” nu există în catalogul versionat (catalog-data.mjs) — id necunoscut.`);
  }
  if (typeof entry.purpose !== 'string' || entry.purpose.trim().length === 0) {
    fail(`„${id}”: câmpul purpose este obligatoriu.`);
  }
  if (!isStringArray(entry.whenToUse) || entry.whenToUse.length === 0) {
    fail(`„${id}”: whenToUse trebuie să fie un array cu cel puțin un element.`);
  }
  if (!isStringArray(entry.whenNotToUse) || entry.whenNotToUse.length === 0) {
    fail(`„${id}”: whenNotToUse trebuie să fie un array cu cel puțin un element.`);
  }
}

// Modul strict: o componentă `candidate` sau mai avansată în registrul de
// maturitate trebuie să aibă documentație de pagină completă (id prezent și
// valid mai sus). Componentele fără intrare de maturitate rămân "neevaluate"
// și nu blochează nimic — la fel ca la scripts/check-maturity.mjs.
const pageContentIds = new Set(componentPageContent.map((entry) => entry.id));
const strictViolations = [];
for (const maturityEntry of componentMaturity) {
  if (!STATES_REQUIRING_COMPLETE_DOCS.includes(maturityEntry.state)) continue;
  if (!pageContentIds.has(maturityEntry.id)) {
    strictViolations.push(
      `„${maturityEntry.id}” este în starea „${maturityEntry.state}”, care necesită documentație completă pe 15 secțiuni (component-maturity-model.md), dar nu are o intrare în component-page-content-data.mjs.`,
    );
  }
}
if (strictViolations.length > 0) {
  fail(strictViolations.join(' '));
}

// Raport de completitudine per familie (#117) — informativ, nu blochează CI.
const familyReport = Object.entries(catalogFamilies).map(([familyKey, definition]) => {
  const familyItems = catalogItems.filter(
    (item) => item.kind === 'component' && item.family === familyKey,
  );
  const documented = familyItems.filter((item) => pageContentIds.has(item.id));
  const percent =
    familyItems.length === 0 ? 0 : Math.round((documented.length / familyItems.length) * 100);
  return {
    familyKey,
    title: definition.title,
    total: familyItems.length,
    documented: documented.length,
    percent,
  };
});

console.log(
  `Documentația componentelor validă: ${componentPageContent.length} intrări verificate contra catalogului (${catalogIds.size} componente publicate).`,
);
console.log('Completitudine per familie (secțiuni narative pe 15 secțiuni):');
for (const row of familyReport) {
  console.log(`  ${row.title}: ${row.documented}/${row.total} (${row.percent}%)`);
}
