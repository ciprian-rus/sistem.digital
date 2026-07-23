import { readFile, stat } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const catalogPath = path.join(root, 'apps/website/src/content/catalog-data.mjs');
const { catalogItems } = await import(`${pathToFileURL(catalogPath).href}?check=${Date.now()}`);

const packageDefinitions = {
  '@sistem-digital/components': {
    manifest: 'packages/components/package.json',
    index: 'packages/components/src/index.ts',
  },
  '@sistem-digital/tokens': {
    manifest: 'packages/tokens/package.json',
    index: 'packages/tokens/src/index.ts',
  },
};

const inventoryDefinitions = {
  forms: {
    path: 'packages/components/src/forms.ts',
    exportName: 'formComponentNames',
  },
  navigation: {
    path: 'packages/components/src/navigation.ts',
    exportName: 'navigationComponentNames',
  },
  content: {
    path: 'packages/components/src/content.ts',
    exportName: 'contentComponentNames',
  },
  interactive: {
    path: 'packages/components/src/interactive.ts',
    exportName: 'interactiveComponentNames',
  },
};

function fail(message) {
  throw new Error(`Catalog invalid: ${message}`);
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
}

function parseStringArray(source, exportName, relativePath) {
  const pattern = new RegExp(`export const ${exportName} = \\[([\\s\\S]*?)\\] as const`, 'u');
  const match = source.match(pattern);
  if (!match) fail(`nu poate fi citit inventarul ${exportName} din ${relativePath}`);
  return [...match[1].matchAll(/'([^']+)'/gu)].map((entry) => entry[1]);
}

function exportedNames(source) {
  const names = new Set();
  for (const match of source.matchAll(/\bexport\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/gu)) {
    names.add(match[1]);
  }
  for (const block of source.matchAll(/export\s*\{([\s\S]*?)\}\s*from/gu)) {
    for (const token of block[1].split(',')) {
      const cleaned = token.trim().replace(/^type\s+/u, '').split(/\s+as\s+/u)[1] ??
        token.trim().replace(/^type\s+/u, '').split(/\s+as\s+/u)[0];
      if (cleaned) names.add(cleaned.trim());
    }
  }
  return names;
}

function exportKeyForImport(packageName, importPath) {
  if (importPath === packageName) return '.';
  if (!importPath.startsWith(`${packageName}/`)) {
    fail(`importul ${importPath} nu aparține pachetului ${packageName}`);
  }
  return `./${importPath.slice(packageName.length + 1)}`;
}

function routeToPageFile(route) {
  const clean = route.replace(/^\//u, '').replace(/\/$/u, '');
  return path.join(root, 'apps/website/src/app', clean, 'page.tsx');
}

if (!Array.isArray(catalogItems) || catalogItems.length === 0) fail('registry-ul este gol');

const ids = new Set();
const packageCache = new Map();
const exportCache = new Map();
for (const item of catalogItems) {
  if (!item || typeof item !== 'object') fail('o intrare nu este obiect');
  if (ids.has(item.id)) fail(`id duplicat ${item.id}`);
  ids.add(item.id);

  if (!/^[a-z0-9-]+$/u.test(item.id)) fail(`id invalid ${item.id}`);
  if (!['component', 'foundation'].includes(item.kind)) fail(`kind invalid pentru ${item.id}`);
  if (!['alpha', 'stable'].includes(item.channel)) fail(`channel invalid pentru ${item.id}`);
  if (!['alpha', 'stable', 'deprecated'].includes(item.status)) {
    fail(`status invalid pentru ${item.id}`);
  }
  if (typeof item.markup !== 'string' || item.markup.trim() === '') {
    fail(`markup lipsă pentru ${item.id}`);
  }
  if (/<script\b/iu.test(item.markup) || /\son[a-z]+\s*=/iu.test(item.markup)) {
    fail(`markup nesigur pentru ${item.id}`);
  }
  if (/javascript\s*:/iu.test(item.markup)) fail(`URL javascript în ${item.id}`);

  const definition = packageDefinitions[item.packageName];
  if (!definition) fail(`pachet necunoscut ${item.packageName} pentru ${item.id}`);

  if (!packageCache.has(item.packageName)) {
    packageCache.set(item.packageName, await readJson(definition.manifest));
    exportCache.set(
      item.packageName,
      exportedNames(await readFile(path.join(root, definition.index), 'utf8')),
    );
  }
  const manifest = packageCache.get(item.packageName);
  if (item.version !== manifest.version) {
    fail(`${item.id} documentează ${item.version}, dar ${item.packageName} are ${manifest.version}`);
  }

  const cssExport = exportKeyForImport(item.packageName, item.cssImport);
  if (!Object.hasOwn(manifest.exports, cssExport)) {
    fail(`${item.id} afișează importul CSS inexistent ${item.cssImport}`);
  }

  const publicExports = exportCache.get(item.packageName);
  for (const symbol of item.jsImports) {
    if (!publicExports.has(symbol)) {
      fail(`${item.id} documentează exportul JavaScript inexistent ${symbol}`);
    }
  }

  try {
    await stat(routeToPageFile(item.documentationHref));
  } catch {
    fail(`${item.id} indică pagina inexistentă ${item.documentationHref}`);
  }
}

for (const [family, definition] of Object.entries(inventoryDefinitions)) {
  const source = await readFile(path.join(root, definition.path), 'utf8');
  const published = parseStringArray(source, definition.exportName, definition.path).sort();
  const documented = catalogItems
    .filter((item) => item.kind === 'component' && item.family === family)
    .map((item) => item.componentName)
    .sort();
  if (JSON.stringify(documented) !== JSON.stringify(published)) {
    fail(
      `${family}: registry-ul ${JSON.stringify(documented)} diferă de inventarul public ${JSON.stringify(published)}`,
    );
  }
}

const dynamicCatalogPage = path.join(
  root,
  'apps/website/src/app/componente/catalog/[slug]/page.tsx',
);
try {
  await stat(dynamicCatalogPage);
} catch {
  fail('lipsește ruta dinamică pentru paginile individuale de catalog');
}

console.log(
  `Catalog valid: ${catalogItems.length} intrări, ${ids.size} URL-uri și ${packageCache.size} pachete verificate.`,
);
