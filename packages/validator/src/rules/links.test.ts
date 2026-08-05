import { existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkLinks } from './links.js';

// Vezi accessibility.test.ts pentru explicația acestui tipar de omitere.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

describeIfChromium('checkLinks', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      if (request.url === '/pagina-existenta') {
        response.setHeader('content-type', 'text/html; charset=utf-8');
        response.end('<p>Ok</p>');
        return;
      }
      if (request.url === '/') {
        response.setHeader('content-type', 'text/html; charset=utf-8');
        response.end(
          '<!doctype html><html lang="ro"><body>' +
            '<a href="/pagina-existenta">Bună</a>' +
            '<a href="/pagina-inexistenta">Stricat</a>' +
            '</body></html>',
        );
        return;
      }
      if (request.url === '/meniu-mobil-colapsat') {
        response.setHeader('content-type', 'text/html; charset=utf-8');
        response.end(
          '<!doctype html><html lang="ro"><body>' +
            '<details class="sd-mobile-navigation"><summary>Meniu</summary>' +
            '<nav><a href="/pagina-inexistenta">Colapsat, dar tot în DOM</a></nav>' +
            '</details>' +
            '</body></html>',
        );
        return;
      }
      response.statusCode = 404;
      response.end('Not found');
    });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(() => {
    server.close();
  });

  it('passes when every internal link responds successfully', async () => {
    const result = await checkLinks(`${baseUrl}/pagina-existenta`, {
      executablePath,
      checkExternal: false,
    });
    expect(result.status).toBe('pass');
  }, 30_000);

  it('fails when an internal link is broken, with evidence', async () => {
    const result = await checkLinks(`${baseUrl}/`, { executablePath, checkExternal: false });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual([
      expect.objectContaining({
        href: `${baseUrl}/pagina-inexistenta`,
        internal: true,
        status: 404,
      }),
    ]);
  }, 30_000);

  it('checks links inside a collapsed <details> element (real sd-mobile-navigation pattern) — DOM presence, not visibility, is what matters', async () => {
    const result = await checkLinks(`${baseUrl}/meniu-mobil-colapsat`, {
      executablePath,
      checkExternal: false,
    });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual([
      expect.objectContaining({
        href: `${baseUrl}/pagina-inexistenta`,
        internal: true,
        status: 404,
      }),
    ]);
  }, 30_000);
});
