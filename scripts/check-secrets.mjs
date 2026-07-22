import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skippedExtensions = new Set([
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.pdf',
  '.png',
  '.svg',
  '.webp',
  '.woff',
  '.woff2',
  '.zip',
]);

const signatures = [
  {
    name: 'GitHub personal access token',
    pattern: /\bgh[pousr]_[A-Za-z0-9]{36,255}\b/gu,
  },
  {
    name: 'GitHub fine-grained personal access token',
    pattern: /\bgithub_pat_[A-Za-z0-9_]{20,255}\b/gu,
  },
  {
    name: 'OpenAI API key',
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/gu,
  },
  {
    name: 'AWS access key ID',
    pattern: /\bAKIA[0-9A-Z]{16}\b/gu,
  },
  {
    name: 'Private key material',
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/gu,
  },
];

function listTrackedFiles() {
  return execFileSync('git', ['ls-files', '-z'], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  })
    .split('\0')
    .filter(Boolean);
}

const findings = [];

for (const file of listTrackedFiles()) {
  if (skippedExtensions.has(extname(file).toLowerCase()) || file === 'pnpm-lock.yaml') {
    continue;
  }

  const absoluteFile = resolve(repositoryRoot, file);
  const contents = readFileSync(absoluteFile);

  if (contents.includes(0)) {
    continue;
  }

  const text = contents.toString('utf8');
  const lines = text.split('\n');

  for (const signature of signatures) {
    for (let index = 0; index < lines.length; index += 1) {
      signature.pattern.lastIndex = 0;
      if (signature.pattern.test(lines[index])) {
        findings.push(`${file}:${index + 1} — ${signature.name}`);
      }
    }
  }
}

if (findings.length > 0) {
  console.error('Potential secrets detected. Values are intentionally redacted:');
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log('No high-confidence secret signatures detected.');
