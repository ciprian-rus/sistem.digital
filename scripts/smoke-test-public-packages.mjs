import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

const artifactsRoot = resolve(process.argv[2] ?? 'release-artifacts');
const packagesRoot = resolve('packages');

const packageDirs = readdirSync(packagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    directory: resolve(packagesRoot, entry.name),
    manifest: JSON.parse(readFileSync(resolve(packagesRoot, entry.name, 'package.json'), 'utf8')),
  }))
  .filter(
    ({ manifest }) =>
      manifest.private !== true &&
      typeof manifest.name === 'string' &&
      typeof manifest.version === 'string',
  )
  .sort((left, right) => left.manifest.name.localeCompare(right.manifest.name));

const manifests = packageDirs.map(({ manifest: { name, version } }) => ({ name, version }));

const tarballs = readdirSync(artifactsRoot)
  .filter((name) => name.endsWith('.tgz'))
  .sort()
  .map((name) => resolve(artifactsRoot, name));

if (manifests.length === 0 || tarballs.length !== manifests.length) {
  throw new Error(
    `Expected ${manifests.length} public package tarballs, found ${tarballs.length}.`,
  );
}

// A public package may declare a peerDependency outside this monorepo (e.g.
// react). The offline install below can't fetch those from the registry, so
// resolve the exact copy each package was built and tested against locally
// and install it alongside the packed tarballs — deterministic, and no
// different in spirit from vendoring an already-verified dependency.
const externalPeerDirs = new Map();
for (const { directory, manifest } of packageDirs) {
  const packageRequire = createRequire(resolve(directory, 'package.json'));
  for (const peerName of Object.keys(manifest.peerDependencies ?? {})) {
    if (peerName.startsWith('@sistem-digital/') || externalPeerDirs.has(peerName)) continue;
    externalPeerDirs.set(peerName, dirname(packageRequire.resolve(`${peerName}/package.json`)));
  }
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
      ...externalPeerDirs.values(),
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
const webComponents = await import('@sistem-digital/web-components');
const reactAdapter = await import('@sistem-digital/react');
const expectedTokenVersion = manifests.find(({ name }) => name === '@sistem-digital/tokens')?.version;
if (tokens.tokenVersion !== expectedTokenVersion || tokens.tokens?.core?.color?.blue?.[900] !== '#002a59') {
  throw new Error('ESM tokens API does not match the release candidate.');
}
if (!tokens.themeNames.includes('light') || typeof components.enhanceDialogs !== 'function') {
  throw new Error('ESM public APIs are incomplete.');
}
if (!webComponents.webComponentNames?.includes('sd-dialog') || typeof webComponents.defineWebComponents !== 'function') {
  throw new Error('ESM web-components API does not match the release candidate.');
}
if (typeof reactAdapter.useDialog !== 'function' || typeof reactAdapter.GlobalEnhancements !== 'function') {
  throw new Error('ESM react API does not match the release candidate.');
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
const webComponents = require('@sistem-digital/web-components');
const reactAdapter = require('@sistem-digital/react');
const expectedTokenVersion = manifests.find(({ name }) => name === '@sistem-digital/tokens')?.version;
if (tokens.tokenVersion !== expectedTokenVersion || tokens.tokens?.core?.color?.blue?.[900] !== '#002a59') {
  throw new Error('CommonJS tokens API does not match the release candidate.');
}
if (!tokens.themeNames.includes('light') || typeof components.enhanceDialogs !== 'function') {
  throw new Error('CommonJS public APIs are incomplete.');
}
if (!webComponents.webComponentNames?.includes('sd-dialog') || typeof webComponents.defineWebComponents !== 'function') {
  throw new Error('CommonJS web-components API does not match the release candidate.');
}
if (typeof reactAdapter.useDialog !== 'function' || typeof reactAdapter.GlobalEnhancements !== 'function') {
  throw new Error('CommonJS react API does not match the release candidate.');
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
