import { readFile, readdir, stat } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const nextRoot = resolve(root, '.next');
const manifestPath = resolve(nextRoot, 'build-manifest.json');
const budgets = {
  css: 180 * 1024,
  javascriptPerRoute: 600 * 1024,
};

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const sizeCache = new Map();

async function fileSize(relativePath) {
  if (!sizeCache.has(relativePath)) {
    sizeCache.set(relativePath, (await stat(resolve(nextRoot, relativePath))).size);
  }
  return sizeCache.get(relativePath);
}

const entrypoints = {
  ...manifest.pages,
  '/_app-router-shared': [...manifest.polyfillFiles, ...manifest.rootMainFiles],
};
const routeResults = [];
for (const [route, files] of Object.entries(entrypoints)) {
  const javascript = files.filter((file) => file.endsWith('.js'));
  const size = (await Promise.all([...new Set(javascript)].map((file) => fileSize(file)))).reduce(
    (total, value) => total + value,
    0,
  );
  routeResults.push({ route, size });
}

async function findFiles(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return findFiles(path, extension);
      return path.endsWith(extension) ? [relative(nextRoot, path)] : [];
    }),
  );
  return files.flat();
}

const cssFiles = await findFiles(resolve(nextRoot, 'static'), '.css');
const cssSize = (await Promise.all(cssFiles.map((file) => fileSize(file)))).reduce(
  (total, value) => total + value,
  0,
);

const failures = [
  ...routeResults
    .filter(({ size }) => size > budgets.javascriptPerRoute)
    .map(
      ({ route, size }) =>
        `${route}: JavaScript ${(size / 1024).toFixed(1)} KiB > ${budgets.javascriptPerRoute / 1024} KiB`,
    ),
  ...(cssSize > budgets.css
    ? [`CSS total ${(cssSize / 1024).toFixed(1)} KiB > ${budgets.css / 1024} KiB`]
    : []),
];

console.log(
  `Performance budgets: ${routeResults.length} intrări, JS maxim ${(
    Math.max(...routeResults.map(({ size }) => size), 0) / 1024
  ).toFixed(1)} KiB/rută, CSS ${(cssSize / 1024).toFixed(1)} KiB.`,
);

if (failures.length > 0) {
  throw new Error(`Bugetele de performanță au fost depășite:\n${failures.join('\n')}`);
}
