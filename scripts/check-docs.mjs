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

const failures = [];

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
