import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { checkPackageVersions } from './package-version.js';

async function writeInstalledPackage(
  nodeModulesDir: string,
  name: string,
  version: string,
): Promise<void> {
  const dir = path.join(nodeModulesDir, name);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'package.json'), JSON.stringify({ name, version }));
}

describe('checkPackageVersions', () => {
  let registry: Server;
  let registryUrl: string;
  let projectDir: string;

  // Simulează doar rutele npm registry de care are nevoie regula:
  // GET /<pachet>/latest -> { version }.
  const latestVersions: Record<string, string> = {
    '@sistem-digital/up-to-date-pkg': '1.0.0',
    '@sistem-digital/outdated-pkg': '3.0.0',
  };

  beforeAll(async () => {
    registry = createServer((request, response) => {
      const match = /^\/(.+)\/latest$/u.exec(decodeURIComponent(request.url ?? ''));
      const version = match ? latestVersions[match[1]!] : undefined;
      if (!version) {
        response.statusCode = 404;
        response.end('Not found');
        return;
      }
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ version }));
    });
    await new Promise<void>((resolve) => registry.listen(0, resolve));
    const address = registry.address() as AddressInfo;
    registryUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(() => {
    registry.close();
  });

  afterEach(async () => {
    if (projectDir) await rm(projectDir, { recursive: true, force: true });
  });

  it('reports not-applicable when the project has no @sistem-digital packages installed', async () => {
    projectDir = await mkdtemp(path.join(tmpdir(), 'sd-validator-pkgver-empty-'));
    const result = await checkPackageVersions(projectDir, { registryUrl });
    expect(result.status).toBe('not-applicable');
    expect(result.evidence).toEqual([]);
  });

  it('passes when every installed package matches the latest published version', async () => {
    projectDir = await mkdtemp(path.join(tmpdir(), 'sd-validator-pkgver-ok-'));
    const nodeModulesDir = path.join(projectDir, 'node_modules', '@sistem-digital');
    await writeInstalledPackage(nodeModulesDir, 'up-to-date-pkg', '1.0.0');

    const result = await checkPackageVersions(projectDir, { registryUrl });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([
      expect.objectContaining({
        name: '@sistem-digital/up-to-date-pkg',
        installed: '1.0.0',
        latest: '1.0.0',
        upToDate: true,
      }),
    ]);
  });

  it('warns and isolates the outdated package, without failing the up-to-date one', async () => {
    projectDir = await mkdtemp(path.join(tmpdir(), 'sd-validator-pkgver-mixed-'));
    const nodeModulesDir = path.join(projectDir, 'node_modules', '@sistem-digital');
    await writeInstalledPackage(nodeModulesDir, 'up-to-date-pkg', '1.0.0');
    await writeInstalledPackage(nodeModulesDir, 'outdated-pkg', '2.5.0');

    const result = await checkPackageVersions(projectDir, { registryUrl });
    expect(result.status).toBe('warn');
    const evidence = result.evidence as Array<{ name: string; upToDate: boolean | null }>;
    expect(evidence.find((item) => item.name === '@sistem-digital/outdated-pkg')).toEqual(
      expect.objectContaining({ installed: '2.5.0', latest: '3.0.0', upToDate: false }),
    );
    expect(evidence.find((item) => item.name === '@sistem-digital/up-to-date-pkg')).toEqual(
      expect.objectContaining({ upToDate: true }),
    );
  });

  it('marks an unpublished/unknown package as upToDate: null instead of failing', async () => {
    projectDir = await mkdtemp(path.join(tmpdir(), 'sd-validator-pkgver-unknown-'));
    const nodeModulesDir = path.join(projectDir, 'node_modules', '@sistem-digital');
    await writeInstalledPackage(nodeModulesDir, 'unpublished-pkg', '0.1.0');

    const result = await checkPackageVersions(projectDir, { registryUrl });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([
      expect.objectContaining({
        name: '@sistem-digital/unpublished-pkg',
        installed: '0.1.0',
        latest: null,
        upToDate: null,
      }),
    ]);
  });
});
