import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const tag = process.env.RELEASE_TAG ?? process.env.GITHUB_REF_NAME;

if (!tag) {
  console.error('RELEASE_TAG or GITHUB_REF_NAME is required.');
  process.exit(1);
}

const packagesRoot = resolve('packages');
const publicPackages = readdirSync(packagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const manifestPath = resolve(packagesRoot, entry.name, 'package.json');
    try {
      return JSON.parse(readFileSync(manifestPath, 'utf8'));
    } catch {
      return null;
    }
  })
  .filter(
    (manifest) =>
      manifest &&
      manifest.private !== true &&
      typeof manifest.name === 'string' &&
      typeof manifest.version === 'string',
  )
  .sort((left, right) => left.name.localeCompare(right.name));

if (publicPackages.length === 0) {
  console.error('No public packages were found under packages/*.');
  process.exit(1);
}

const versions = new Set(publicPackages.map((manifest) => manifest.version));
if (versions.size !== 1) {
  console.error('Public packages must use one coordinated release version.');
  for (const manifest of publicPackages) console.error(`- ${manifest.name}: ${manifest.version}`);
  process.exit(1);
}

const [version] = [...versions];
const expectedTag = `v${version}`;

if (tag !== expectedTag) {
  console.error(`Release tag ${tag} does not match coordinated package version ${expectedTag}.`);
  process.exit(1);
}

const distTag = version.includes('-') ? 'next' : 'latest';

console.log(`Release tag validated: ${tag}`);
console.log(`Public packages: ${publicPackages.map((manifest) => manifest.name).join(', ')}`);
console.log(`npm dist-tag: ${distTag}`);

if (process.env.GITHUB_OUTPUT) {
  const output = `version=${version}\ndist_tag=${distTag}\npackage_count=${publicPackages.length}\n`;
  await import('node:fs/promises').then(({ appendFile }) =>
    appendFile(process.env.GITHUB_OUTPUT, output),
  );
}
