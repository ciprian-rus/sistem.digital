import { existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkComponentStructure } from './component-structure.js';

// Vezi accessibility.test.ts pentru explicația acestui tipar de omitere.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

describeIfChromium('checkComponentStructure', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      switch (request.url) {
        case '/cu-componente':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body>' +
              '<section class="sd-alert sd-alert--info" data-sd-alert>' +
              '<strong class="sd-alert__title">Titlu</strong>' +
              '</section>' +
              '<div class="sd-form-group" data-sd-character-count="280">' +
              '<input data-sd-character-count-field>' +
              '</div>' +
              '</body></html>',
          );
          return;
        case '/fara-componente':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><div class="pagina-simpla">Fără sistem</div></body></html>',
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

  it('passes and deduplicates BEM class roots when component markup is present', async () => {
    const result = await checkComponentStructure(`${baseUrl}/cu-componente`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual({
      classRoots: ['sd-alert', 'sd-form-group'],
      dataAttributes: ['data-sd-alert', 'data-sd-character-count', 'data-sd-character-count-field'],
    });
  }, 30_000);

  it('fails when the page has no sd-* markers at all', async () => {
    const result = await checkComponentStructure(`${baseUrl}/fara-componente`, { executablePath });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual({ classRoots: [], dataAttributes: [] });
  }, 30_000);
});
