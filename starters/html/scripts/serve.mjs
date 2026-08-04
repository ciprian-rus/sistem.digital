#!/usr/bin/env node
// Server static minimal, fără dependențe, doar pentru previzualizare locală.
// Nu este destinat producției — instituțiile își aleg propriul server static.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const publicDir = resolve(here, '../public');
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  const requestPath = normalize(decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  const relativePath = requestPath === '/' ? '/index.html' : requestPath;
  const filePath = join(publicDir, relativePath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403).end('Interzis');
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error('not a file');
    const body = await readFile(filePath);
    const contentType = contentTypes[extname(filePath)] ?? 'application/octet-stream';
    res.writeHead(200, { 'content-type': contentType }).end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('404 — negăsit');
  }
});

server.listen(port, () => {
  console.log(`Previzualizare locală: http://localhost:${port}`);
});
