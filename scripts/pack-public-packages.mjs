import { mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const destination = resolve(process.argv[2] ?? 'release-artifacts');
const packagesRoot = resolve('packages');

mkdirSync(destination, { recursive: true });

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
  .filter((manifest) => manifest && manifest.private !== true && typeof manifest.name === 'string')
  .sort((left, right) => left.name.localeCompare(right.name));

if (publicPackages.length === 0) {
  throw new Error('No public packages were found under packages/*.');
}

for (const manifest of publicPackages) {
  console.log(`Packing ${manifest.name}@${manifest.version}`);
  const result = spawnSync(
    'pnpm',
    ['--filter', manifest.name, 'pack', '--pack-destination', destination],
    { stdio: 'inherit', shell: process.platform === 'win32' },
  );

  if (result.status !== 0) {
    throw new Error(
      `Packing ${manifest.name} failed with exit code ${result.status ?? 'unknown'}.`,
    );
  }
}

console.log(`Packed ${publicPackages.length} public packages into ${destination}.`);
