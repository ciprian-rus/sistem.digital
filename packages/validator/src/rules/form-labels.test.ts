import { existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkFormLabels } from './form-labels.js';

// Vezi accessibility.test.ts pentru explicația acestui tipar de omitere.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

describeIfChromium('checkFormLabels', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      switch (request.url) {
        case '/labeled':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><form><label for="a">Nume</label><input id="a" type="text"></form></body></html>',
          );
          return;
        case '/unlabeled':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><form><input type="text"></form></body></html>',
          );
          return;
        case '/title-only':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><form><input type="text" title="Nume"></form></body></html>',
          );
          return;
        case '/aria-toggle-unnamed':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><div role="checkbox" tabindex="0" aria-checked="false"></div></body></html>',
          );
          return;
        case '/multiple-labels':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><form><label for="b">Nume</label><label for="b">Prenume complet</label><input id="b" type="text"></form></body></html>',
          );
          return;
        case '/single-wrapping-label':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><body><form><label>Nume <input type="text"></label></form></body></html>',
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

  it('passes a properly labeled form field', async () => {
    const result = await checkFormLabels(`${baseUrl}/labeled`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([]);
  }, 30_000);

  it('fails a field with no labeling mechanism at all', async () => {
    const result = await checkFormLabels(`${baseUrl}/unlabeled`, { executablePath });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual([expect.objectContaining({ id: 'label' })]);
  }, 30_000);

  it('fails a field relying only on the title attribute', async () => {
    const result = await checkFormLabels(`${baseUrl}/title-only`, { executablePath });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual([expect.objectContaining({ id: 'label-title-only' })]);
  }, 30_000);

  it('fails an unnamed ARIA toggle field', async () => {
    const result = await checkFormLabels(`${baseUrl}/aria-toggle-unnamed`, { executablePath });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual([expect.objectContaining({ id: 'aria-toggle-field-name' })]);
  }, 30_000);

  it('fails a field with two labels pointing at the same id (axe cannot detect this — custom DOM check)', async () => {
    const result = await checkFormLabels(`${baseUrl}/multiple-labels`, { executablePath });
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual([
      expect.objectContaining({ id: 'form-field-multiple-labels', nodes: 1 }),
    ]);
  }, 30_000);

  it('does not flag a single wrapping label as multiple', async () => {
    const result = await checkFormLabels(`${baseUrl}/single-wrapping-label`, { executablePath });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([]);
  }, 30_000);
});
