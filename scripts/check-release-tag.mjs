import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const tag = process.env.GITHUB_REF_NAME;

if (!tag) {
  console.error('GITHUB_REF_NAME is required.');
  process.exit(1);
}

const packagePath = resolve('packages/tokens/package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
const expectedTag = `v${packageJson.version}`;

if (tag !== expectedTag) {
  console.error(`Release tag ${tag} does not match package version ${expectedTag}.`);
  process.exit(1);
}

const distTag = packageJson.version.includes('-') ? 'next' : 'latest';

console.log(`Release tag validated: ${tag}`);
console.log(`npm dist-tag: ${distTag}`);

if (process.env.GITHUB_OUTPUT) {
  const output = `version=${packageJson.version}\ndist_tag=${distTag}\n`;
  await import('node:fs/promises').then(({ appendFile }) =>
    appendFile(process.env.GITHUB_OUTPUT, output),
  );
}
