import { existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { checkCssBudget, checkJsBudget } from './performance.js';

// Vezi accessibility.test.ts pentru explicația acestui tipar de omitere.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

// Corpuri de dimensiune exactă și cunoscută, ca testele să poată verifica
// numărătoarea de octeți, nu doar depășirea/nedepășirea bugetului.
const JS_BODY_BYTES = 500;
const CSS_BODY_BYTES = 300;
const JS_TOTAL_BYTES = JS_BODY_BYTES + '// '.length;
const CSS_TOTAL_BYTES = CSS_BODY_BYTES + '/*  */'.length;

describeIfChromium('checkJsBudget și checkCssBudget', () => {
  let server: Server;
  let pageUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      switch (request.url) {
        case '/page':
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(
            '<!doctype html><html lang="ro"><head><link rel="stylesheet" href="/app.css"></head><body><script src="/app.js"></script></body></html>',
          );
          return;
        case '/app.js':
          response.setHeader('content-type', 'application/javascript');
          response.end(`// ${'x'.repeat(JS_BODY_BYTES)}`);
          return;
        case '/app.css':
          response.setHeader('content-type', 'text/css');
          response.end(`/* ${'y'.repeat(CSS_BODY_BYTES)} */`);
          return;
        default:
          response.statusCode = 404;
          response.end('Not found');
      }
    });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address() as AddressInfo;
    pageUrl = `http://127.0.0.1:${address.port}/page`;
  });

  afterAll(() => {
    server.close();
  });

  it('checkJsBudget passes when the measured size is under budget', async () => {
    const result = await checkJsBudget(pageUrl, {
      executablePath,
      budgetBytes: JS_TOTAL_BYTES + 1,
    });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([
      expect.objectContaining({ totalBytes: JS_TOTAL_BYTES, overBudget: false }),
    ]);
  }, 30_000);

  it('checkJsBudget warns when the measured size is over budget', async () => {
    const result = await checkJsBudget(pageUrl, {
      executablePath,
      budgetBytes: JS_TOTAL_BYTES - 1,
    });
    expect(result.status).toBe('warn');
    expect(result.evidence).toEqual([
      expect.objectContaining({ totalBytes: JS_TOTAL_BYTES, overBudget: true }),
    ]);
  }, 30_000);

  it('checkCssBudget passes when the measured size is under budget', async () => {
    const result = await checkCssBudget(pageUrl, {
      executablePath,
      budgetBytes: CSS_TOTAL_BYTES + 1,
    });
    expect(result.status).toBe('pass');
    expect(result.evidence).toEqual([
      expect.objectContaining({ totalBytes: CSS_TOTAL_BYTES, overBudget: false }),
    ]);
  }, 30_000);

  it('checkCssBudget warns when the measured size is over budget, independent of JS', async () => {
    const result = await checkCssBudget(pageUrl, {
      executablePath,
      budgetBytes: CSS_TOTAL_BYTES - 1,
    });
    expect(result.status).toBe('warn');
    expect(result.evidence).toEqual([
      expect.objectContaining({ totalBytes: CSS_TOTAL_BYTES, overBudget: true }),
    ]);
  }, 30_000);
});
