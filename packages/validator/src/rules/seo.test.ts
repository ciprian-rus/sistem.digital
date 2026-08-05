import { existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkRequiredPages } from './seo.js';

// Vezi accessibility.test.ts pentru explicația acestui tipar de omitere.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

// sitemap/robots/manifest sunt verificate la originea țintei (rădăcina
// serverului), indiferent de calea paginii date — de aceea sunt servite o
// singură dată, la rădăcină, și partajate de ambele scenarii de mai jos.
describeIfChromium('checkRequiredPages', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      switch (request.url) {
        case '/sitemap.xml':
          response.setHeader('content-type', 'application/xml');
          response.end('<?xml version="1.0"?><urlset></urlset>');
          return;
        case '/robots.txt':
          response.setHeader('content-type', 'text/plain');
          response.end('User-agent: *\nSitemap: /sitemap.xml');
          return;
        case '/manifest.webmanifest':
          response.setHeader('content-type', 'application/manifest+json');
          response.end(JSON.stringify({ name: 'Exemplu' }));
          return;
        case '/pagina-cu-canonical':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><head><link rel="canonical" href="/pagina-cu-canonical"></head><body>Ok</body></html>',
          );
          return;
        case '/pagina-fara-canonical':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><head></head><body>Fără canonical</body></html>',
          );
          return;
        default:
          response.statusCode = 404;
          response.end('Not found');
      }
    });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(() => {
    server.close();
  });

  it('passes when sitemap, robots, manifest and canonical are all present', async () => {
    const result = await checkRequiredPages(`${baseUrl}/pagina-cu-canonical`, { executablePath });
    expect(result.status).toBe('pass');
    expect((result.evidence as Array<{ ok: boolean }>).every((item) => item.ok)).toBe(true);
  }, 30_000);

  it('fails and isolates the missing check when only canonical is absent', async () => {
    const result = await checkRequiredPages(`${baseUrl}/pagina-fara-canonical`, { executablePath });
    expect(result.status).toBe('fail');
    const evidence = result.evidence as Array<{ id: string; ok: boolean }>;
    expect(evidence.find((item) => item.id === 'canonical')).toEqual(
      expect.objectContaining({ ok: false }),
    );
    expect(evidence.filter((item) => item.id !== 'canonical').every((item) => item.ok)).toBe(true);
  }, 30_000);
});
