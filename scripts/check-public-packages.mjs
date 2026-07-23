import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const packagesRoot = resolve('packages');
const manifests = readdirSync(packagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const directory = resolve(packagesRoot, entry.name);
    const manifest = JSON.parse(readFileSync(resolve(directory, 'package.json'), 'utf8'));
    return { directory, manifest };
  })
  .filter(({ manifest }) => manifest.private !== true)
  .sort((left, right) => left.manifest.name.localeCompare(right.manifest.name));

for (const { directory, manifest } of manifests) {
  if (!manifest.files?.length || !manifest.exports || !manifest.publishConfig) {
    throw new Error(`${manifest.name} does not declare a bounded public contract.`);
  }
  const result = spawnSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    cwd: directory,
    encoding: 'utf8',
    env: {
      ...process.env,
      npm_config_cache: resolve(process.env.RUNNER_TEMP ?? tmpdir(), 'sistem-digital-npm-cache'),
    },
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || `npm pack --dry-run failed for ${manifest.name}.`);
  }
  const report = JSON.parse(result.stdout);
  const files = report[0]?.files?.map((file) => file.path) ?? [];
  if (!files.includes('package.json') || files.some((file) => file.startsWith('src/__tests__'))) {
    throw new Error(`${manifest.name} has an invalid packed file set.`);
  }
  console.log(`Verified ${manifest.name}: ${files.length} packed files.`);
}
