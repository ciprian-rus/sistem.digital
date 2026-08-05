import { existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkHeadingOrder, checkLandmarks } from './heading-landmarks.js';

// Vezi accessibility.test.ts pentru explicația acestui tipar de omitere.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

describeIfChromium('checkHeadingOrder și checkLandmarks', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      switch (request.url) {
        case '/heading-ok':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><h1>Titlu</h1><h2>Secțiune</h2><h3>Sub-secțiune</h3></body></html>',
          );
          return;
        case '/heading-skip':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><h1>Titlu</h1><h3>Sare la h3</h3></body></html>',
          );
          return;
        case '/landmarks-ok':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><header>Banner</header><nav>Meniu</nav><main><h1>Titlu</h1><p>Conținut</p></main><footer>Subsol</footer></body></html>',
          );
          return;
        case '/landmarks-missing-main':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><header>Banner</header><p>Conținut fără landmark</p></body></html>',
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

  it('checkHeadingOrder passes a correct heading hierarchy', async () => {
    const result = await checkHeadingOrder(`${baseUrl}/heading-ok`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([]);
  }, 30_000);

  it('checkHeadingOrder fails when a heading level is skipped', async () => {
    const result = await checkHeadingOrder(`${baseUrl}/heading-skip`, { executablePath });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual([expect.objectContaining({ id: 'heading-order' })]);
  }, 30_000);

  it('checkLandmarks passes a page with header/nav/main/footer landmarks', async () => {
    const result = await checkLandmarks(`${baseUrl}/landmarks-ok`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([]);
  }, 30_000);

  it('checkLandmarks fails when there is no main landmark', async () => {
    const result = await checkLandmarks(`${baseUrl}/landmarks-missing-main`, { executablePath });
    expect(result.status).toBe('fail');
    const evidence = result.evidence as Array<{ id: string }>;
    expect(evidence.map((item) => item.id)).toContain('landmark-one-main');
  }, 30_000);
});
