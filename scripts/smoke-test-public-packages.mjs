import { spawnSync } from 'node:child_process';
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const artifactsRoot = resolve(process.argv[2] ?? 'release-artifacts');
const packagesRoot = resolve('packages');

const manifests = readdirSync(packagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) =>
    JSON.parse(readFileSync(resolve(packagesRoot, entry.name, 'package.json'), 'utf8')),
  )
  .filter(
    (manifest) =>
      manifest.private !== true &&
      typeof manifest.name === 'string' &&
      typeof manifest.version === 'string',
  )
  .map(({ name, version }) => ({ name, version }))
  .sort((left, right) => left.name.localeCompare(right.name));

const tarballs = readdirSync(artifactsRoot)
  .filter((name) => name.endsWith('.tgz'))
  .sort()
  .map((name) => resolve(artifactsRoot, name));

if (manifests.length === 0 || tarballs.length !== manifests.length) {
  throw new Error(
    `Expected ${manifests.length} public package tarballs, found ${tarballs.length}.`,
  );
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      npm_config_cache: resolve(cwd, '.npm-cache'),
      npm_config_update_notifier: 'false',
    },
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join('\n').trim();
    throw new Error(
      `${command} ${args.join(' ')} failed with exit code ${result.status ?? 'unknown'}${output ? `:\n${output}` : '.'}`,
    );
  }
}

const consumerRoot = mkdtempSync(join(tmpdir(), 'sistem-digital-consumer-'));

try {
  writeFileSync(
    resolve(consumerRoot, 'package.json'),
    `${JSON.stringify({ name: 'release-candidate-consumer', private: true }, null, 2)}\n`,
  );

  run(
    'npm',
    [
      'install',
      '--offline',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--package-lock=false',
      ...tarballs,
    ],
    consumerRoot,
  );

  for (const manifest of manifests) {
    const installedManifest = JSON.parse(
      readFileSync(
        resolve(consumerRoot, 'node_modules', ...manifest.name.split('/'), 'package.json'),
        'utf8',
      ),
    );
    if (installedManifest.version !== manifest.version) {
      throw new Error(
        `Installed ${manifest.name}@${installedManifest.version}; expected ${manifest.version}.`,
      );
    }
  }

  const serializedManifests = JSON.stringify(manifests);
  writeFileSync(
    resolve(consumerRoot, 'smoke-esm.mjs'),
    `const manifests = ${serializedManifests};
for (const manifest of manifests) {
  const loaded = await import(manifest.name);
  if (!loaded || typeof loaded !== 'object') {
    throw new Error(\`ESM import failed for \${manifest.name}.\`);
  }
}
const tokens = await import('@sistem-digital/tokens');
const components = await import('@sistem-digital/components');
const expectedTokenVersion = manifests.find(({ name }) => name === '@sistem-digital/tokens')?.version;
if (tokens.tokenVersion !== expectedTokenVersion || tokens.tokens?.core?.color?.blue?.[900] !== '#002a59') {
  throw new Error('ESM tokens API does not match the release candidate.');
}
if (!tokens.themeNames.includes('light') || typeof components.enhanceDialogs !== 'function') {
  throw new Error('ESM public APIs are incomplete.');
}
`,
  );
  writeFileSync(
    resolve(consumerRoot, 'smoke-cjs.cjs'),
    `const manifests = ${serializedManifests};
for (const manifest of manifests) {
  const loaded = require(manifest.name);
  if (!loaded || !['object', 'function'].includes(typeof loaded)) {
    throw new Error(\`CommonJS require failed for \${manifest.name}.\`);
  }
}
const tokens = require('@sistem-digital/tokens');
const components = require('@sistem-digital/components');
const expectedTokenVersion = manifests.find(({ name }) => name === '@sistem-digital/tokens')?.version;
if (tokens.tokenVersion !== expectedTokenVersion || tokens.tokens?.core?.color?.blue?.[900] !== '#002a59') {
  throw new Error('CommonJS tokens API does not match the release candidate.');
}
if (!tokens.themeNames.includes('light') || typeof components.enhanceDialogs !== 'function') {
  throw new Error('CommonJS public APIs are incomplete.');
}
`,
  );

  run(process.execPath, ['smoke-esm.mjs'], consumerRoot);
  run(process.execPath, ['smoke-cjs.cjs'], consumerRoot);
  console.log(
    `Consumed ${manifests.length} release candidates through ESM and CommonJS entry points.`,
  );
} finally {
  rmSync(consumerRoot, { force: true, recursive: true });
}
