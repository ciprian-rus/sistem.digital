import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function listMarkdownFiles() {
  const output = execFileSync('git', ['ls-files', '*.md'], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  });

  return output
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean);
}

function removeFencedCode(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '');
}

function normalizeLinkTarget(rawTarget) {
  const withoutTitle = rawTarget
    .trim()
    .replace(/^<|>$/g, '')
    .split(/\s+["']/u, 1)[0];
  const withoutFragment = withoutTitle.split('#', 1)[0].split('?', 1)[0];

  try {
    return decodeURIComponent(withoutFragment);
  } catch {
    return withoutFragment;
  }
}

function isExternalOrAnchor(target) {
  return (
    target.length === 0 ||
    target.startsWith('#') ||
    /^(?:https?:|mailto:|tel:|data:)/iu.test(target)
  );
}

function checkRequiredSections(file, requiredStrings) {
  const absoluteFile = resolve(repositoryRoot, file);
  if (!existsSync(absoluteFile)) {
    return [`${file}: fișierul nu există`];
  }

  const content = readFileSync(absoluteFile, 'utf8');
  return requiredStrings
    .filter((required) => !content.includes(required))
    .map((required) => `${file}: lipsește secțiunea sau textul obligatoriu "${required}"`);
}

const failures = [];

// Validează structura noilor documente despre maturitatea componentelor
// (introduse odată cu extinderea benchmarkului internațional, 1 august 2026).
failures.push(
  ...checkRequiredSections('docs/research/comparative-audit.md', [
    '## Designers Italia',
    '## NL Design System (Țările de Jos)',
    "## Système de Design de l'État — DSFR (Franța)",
    '## Mosaico și Ágora Design System (Portugalia)',
    '## design.gov.ua (Ucraina)',
    '## Gov.pl și Architektura Informacyjna Państwa (Polonia)',
    '## Matrice comparativă internațională extinsă',
    '### Limitele tehnice și de actualitate identificate — explicit',
  ]),
);

failures.push(
  ...checkRequiredSections('docs/governance/component-maturity-model.md', [
    '### `proposal`',
    '### `experimental`',
    '### `candidate`',
    '### `stable`',
    '### `deprecated`',
    '### `retired`',
    '## Tranziții permise',
    '## Relația cu inventarul curent',
  ]),
);

failures.push(
  ...checkRequiredSections('docs/product/component-metadata-schema.md', [
    'state:',
    'owner:',
    'lastReviewed:',
    'evidence:',
    'deprecationReason',
    'transitions:',
    '## Compatibilitate cu structura actuală a catalogului',
  ]),
);

// Validează structura șablonului canonic al paginii unei componente (Epic C, 4 august 2026).
failures.push(
  ...checkRequiredSections('docs/product/component-page-template.md', [
    '## Cele 15 secțiuni',
    '## Schema de date',
    '## Câmpuri obligatorii vs. opționale',
    '## Validare',
    '## Dovadă de concept',
    '## Relația cu documentele sursă',
  ]),
);

// Validează structura nivelurilor de adopție instituțională (Epic H, 4 august 2026).
failures.push(
  ...checkRequiredSections('docs/governance/adoption-levels.md', [
    '### `aligned`',
    '### `compatible`',
    '### `conformant`',
    '### `verified`',
    '## Schema de raportare',
    '## Badge-uri versionate',
    '## Politica excepțiilor de conformitate',
    '## Expirarea certificării',
    '## Planurile de remediere pentru neconformitate',
    '## Punct de legătură conceptual cu PNIDP',
  ]),
);

failures.push(
  ...checkRequiredSections('docs/governance/pnidp-schema-draft.md', [
    'document de backlog, nu o implementare',
    'application:',
    'institution:',
    'servicesProvided:',
    'sistemDigitalVersion:',
    'adoptionLevel:',
  ]),
);

for (const file of listMarkdownFiles()) {
  const absoluteFile = resolve(repositoryRoot, file);
  const markdown = removeFencedCode(readFileSync(absoluteFile, 'utf8'));
  const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/gu;

  for (const match of markdown.matchAll(linkPattern)) {
    const rawTarget = match[1];

    if (isExternalOrAnchor(rawTarget.trim())) {
      continue;
    }

    const target = normalizeLinkTarget(rawTarget);
    const absoluteTarget = target.startsWith('/')
      ? resolve(repositoryRoot, `.${target}`)
      : resolve(dirname(absoluteFile), target);

    if (!existsSync(absoluteTarget)) {
      failures.push(`${file}: local link does not exist: ${rawTarget}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Documentation validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Documentation links are valid.');
