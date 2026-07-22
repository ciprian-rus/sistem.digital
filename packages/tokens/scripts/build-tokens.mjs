import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokensRoot = resolve(packageRoot, 'tokens');
const generatedRoot = resolve(packageRoot, 'src/__generated__');
const distRoot = resolve(packageRoot, 'dist');
const checkOnly = process.argv.includes('--check');

const aliasPattern = /^\{([^{}]+)\}$/u;
const allowedTypes = new Set(['color', 'dimension', 'duration', 'fontFamily', 'number', 'string']);

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function clone(value) {
  return structuredClone(value);
}

function validateName(name, path) {
  if (name.startsWith('$') || /[{}.]/u.test(name)) {
    throw new Error(`Invalid DTCG name at ${path || '<root>'}: ${name}`);
  }
}

function mergeSources(sources) {
  const document = {};

  for (const source of sources) {
    for (const [key, value] of Object.entries(source.document)) {
      if (key.startsWith('$')) continue;
      validateName(key, source.name);
      if (Object.hasOwn(document, key)) {
        throw new Error(`Duplicate top-level group '${key}' in ${source.name}`);
      }
      document[key] = value;
    }
  }

  return document;
}

function collectTokens(document) {
  const tokens = new Map();

  function walk(node, path = [], inheritedType) {
    if (!isObject(node)) {
      throw new Error(`Group '${path.join('.')}' must be an object`);
    }

    const type = node.$type ?? inheritedType;
    const isToken = Object.hasOwn(node, '$value') || Object.hasOwn(node, '$ref');

    if (isToken) {
      const tokenPath = path.join('.');
      if (!tokenPath) throw new Error('A token cannot exist at the document root');
      if (Object.hasOwn(node, '$value') && Object.hasOwn(node, '$ref')) {
        throw new Error(`Token '${tokenPath}' cannot contain both $value and $ref`);
      }
      tokens.set(tokenPath, { node, declaredType: type });
      return;
    }

    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) continue;
      validateName(key, path.join('.'));
      walk(value, [...path, key], type);
    }
  }

  walk(document);
  return tokens;
}

function jsonPointer(document, pointer) {
  if (!pointer.startsWith('#/')) {
    throw new Error(`Only local JSON Pointer references are supported: ${pointer}`);
  }

  const segments = pointer
    .slice(2)
    .split('/')
    .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'));

  let current = document;
  for (const segment of segments) {
    if (!isObject(current) && !Array.isArray(current)) {
      throw new Error(`JSON Pointer cannot traverse '${segment}' in ${pointer}`);
    }
    if (!Object.hasOwn(current, segment)) {
      throw new Error(`JSON Pointer target does not exist: ${pointer}`);
    }
    current = current[segment];
  }
  return clone(current);
}

function validateColor(value, path) {
  if (!isObject(value) || value.colorSpace !== 'srgb') {
    throw new Error(`Color '${path}' must use an sRGB DTCG value`);
  }
  if (!Array.isArray(value.components) || value.components.length !== 3) {
    throw new Error(`Color '${path}' must contain exactly three sRGB components`);
  }
  for (const component of value.components) {
    if (typeof component !== 'number' || component < 0 || component > 1) {
      throw new Error(`Color '${path}' contains an invalid sRGB component`);
    }
  }
  if (
    value.alpha !== undefined &&
    (typeof value.alpha !== 'number' || value.alpha < 0 || value.alpha > 1)
  ) {
    throw new Error(`Color '${path}' contains an invalid alpha value`);
  }
  if (value.hex !== undefined && !/^#[0-9a-f]{6}$/iu.test(value.hex)) {
    throw new Error(`Color '${path}' contains an invalid hexadecimal fallback`);
  }
}

function validateDimension(value, path) {
  if (!isObject(value) || typeof value.value !== 'number' || !['px', 'rem'].includes(value.unit)) {
    throw new Error(`Dimension '${path}' must contain a numeric value and px/rem unit`);
  }
}

function validateDuration(value, path) {
  if (!isObject(value) || typeof value.value !== 'number' || !['ms', 's'].includes(value.unit)) {
    throw new Error(`Duration '${path}' must contain a numeric value and ms/s unit`);
  }
}

function validateValue(type, value, path) {
  if (!allowedTypes.has(type)) throw new Error(`Token '${path}' has unsupported type '${type}'`);

  if (type === 'color') validateColor(value, path);
  if (type === 'dimension') validateDimension(value, path);
  if (type === 'duration') validateDuration(value, path);
  if (type === 'fontFamily') {
    const valid =
      typeof value === 'string' ||
      (Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string'));
    if (!valid) throw new Error(`Font family '${path}' must be a string or non-empty string array`);
  }
  if (type === 'number' && typeof value !== 'number')
    throw new Error(`Number '${path}' must be numeric`);
  if (type === 'string' && typeof value !== 'string')
    throw new Error(`String '${path}' must be text`);
}

function resolveTokens(document, tokenDefinitions) {
  const resolved = new Map();
  const resolving = new Set();
  let aliasCount = 0;

  function resolveComposite(value) {
    if (typeof value === 'string') {
      const alias = value.match(aliasPattern);
      if (alias) {
        aliasCount += 1;
        return clone(resolveToken(alias[1]).value);
      }
      return value;
    }
    if (Array.isArray(value)) return value.map(resolveComposite);
    if (isObject(value)) {
      if (Object.keys(value).length === 1 && typeof value.$ref === 'string') {
        return jsonPointer(document, value.$ref);
      }
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, resolveComposite(item)]),
      );
    }
    return value;
  }

  function resolveToken(path) {
    if (resolved.has(path)) return resolved.get(path);
    if (resolving.has(path)) throw new Error(`Circular token reference detected at '${path}'`);

    const definition = tokenDefinitions.get(path);
    if (!definition) throw new Error(`Token reference does not exist: '${path}'`);
    resolving.add(path);

    const { node, declaredType } = definition;
    let type = declaredType;
    let value;

    if (Object.hasOwn(node, '$ref')) {
      value = jsonPointer(document, node.$ref);
    } else {
      const rawValue = node.$value;
      const alias = typeof rawValue === 'string' ? rawValue.match(aliasPattern) : null;

      if (alias) {
        aliasCount += 1;
        const target = resolveToken(alias[1]);
        type ??= target.type;
        if (declaredType && declaredType !== target.type) {
          throw new Error(`Alias '${path}' changes type ${target.type} to ${declaredType}`);
        }
        value = clone(target.value);
      } else {
        value = resolveComposite(rawValue);
      }
    }

    if (!type) throw new Error(`Token '${path}' has no explicit or inherited type`);
    validateValue(type, value, path);

    const result = { path, type, value, deprecated: node.$deprecated ?? false };
    resolving.delete(path);
    resolved.set(path, result);
    return result;
  }

  for (const path of [...tokenDefinitions.keys()].sort()) resolveToken(path);
  return { resolved, aliasCount };
}

function platformValue(token) {
  const { type, value } = token;
  if (type === 'color') {
    if (value.hex && (value.alpha === undefined || value.alpha === 1))
      return value.hex.toLowerCase();
    const [red, green, blue] = value.components.map((component) => Math.round(component * 255));
    return `rgb(${red} ${green} ${blue} / ${value.alpha ?? 1})`;
  }
  if (type === 'dimension' || type === 'duration') return `${value.value}${value.unit}`;
  return clone(value);
}

function setNested(target, path, value) {
  const segments = path.split('.');
  let current = target;
  for (const segment of segments.slice(0, -1)) {
    current[segment] ??= {};
    current = current[segment];
  }
  current[segments.at(-1)] = value;
}

function kebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/gu, '$1-$2')
    .replaceAll('_', '-')
    .toLowerCase();
}

function cssName(path) {
  let parts = path.split('.');

  if (parts[0] === 'semantic') {
    parts = parts.slice(1);
    if (parts[0] === 'color' && parts[1] === 'feedback') parts = ['color', parts[2]];
    else if (parts[0] === 'color' && parts[1] === 'focus' && parts[2] === 'ring')
      parts = ['color', 'focus'];
    else if (parts[0] === 'font' && parts[1] === 'family') parts = ['font', parts[2]];
    else if (parts.at(-1) === 'default') parts = parts.slice(0, -1);
  } else {
    parts = [parts[0], ...parts.slice(1)];
  }

  return `--sd-${parts.map(kebab).join('-')}`;
}

function cssValue(token) {
  const value = platformValue(token);
  if (Array.isArray(value)) {
    return value.map((family) => (/\s/u.test(family) ? JSON.stringify(family) : family)).join(', ');
  }
  return String(value);
}

function relativeLuminance(colorValue) {
  return colorValue.components
    .map((component) =>
      component <= 0.04045 ? component / 12.92 : ((component + 0.055) / 1.055) ** 2.4,
    )
    .reduce((sum, component, index) => sum + component * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrastRatio(foreground, background) {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

function validateContrastPairs(pairs, resolved) {
  for (const pair of pairs) {
    const foreground = resolved.get(pair.foreground);
    const background = resolved.get(pair.background);
    if (!foreground || !background) throw new Error(`Contrast pair references a missing token`);
    if (foreground.type !== 'color' || background.type !== 'color')
      throw new Error(`Contrast pairs must reference color tokens`);
    const ratio = contrastRatio(foreground.value, background.value);
    if (ratio + Number.EPSILON < pair.minimum) {
      throw new Error(
        `${pair.foreground} on ${pair.background} has contrast ${ratio.toFixed(2)}; required ${pair.minimum}`,
      );
    }
  }
}

function renderCss(tokens) {
  const declarations = [...tokens.values()]
    .sort((left, right) => left.path.localeCompare(right.path))
    .map((token) => `  ${cssName(token.path)}: ${cssValue(token)};`);

  const duplicates = declarations.map((line) => line.split(':', 1)[0]);
  if (new Set(duplicates).size !== duplicates.length)
    throw new Error('CSS variable naming produced a collision');

  return `/* Generated from DTCG sources. Do not edit manually. */\n:root {\n${declarations.join('\n')}\n}\n`;
}

function renderTypescript(version, format, nested, flat, metadata) {
  return `/* Generated from DTCG sources. Do not edit manually. */\nexport const tokenVersion = ${JSON.stringify(version)} as const;\nexport const tokenFormat = ${JSON.stringify(format)} as const;\nexport const tokens = ${JSON.stringify(nested, null, 2)} as const;\nexport const flatTokens = ${JSON.stringify(flat, null, 2)} as const;\nexport const tokenMetadata = ${JSON.stringify(metadata, null, 2)} as const;\n\nexport type DesignTokens = typeof tokens;\nexport type TokenPath = keyof typeof flatTokens;\n`;
}

async function writeOrCheck(path, content, stale) {
  if (checkOnly) {
    let current = '';
    try {
      current = await readFile(path, 'utf8');
    } catch {
      // Missing generated files are stale.
    }
    if (current !== content) stale.push(path.replace(`${packageRoot}/`, ''));
    return;
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

const manifestPath = resolve(tokensRoot, 'manifest.json');
const manifestText = await readFile(manifestPath, 'utf8');
const manifest = JSON.parse(manifestText);
const sourceFiles = [];

for (const sourceName of manifest.sources) {
  const path = resolve(tokensRoot, sourceName);
  sourceFiles.push({
    name: sourceName,
    path,
    text: await readFile(path, 'utf8'),
    document: await readJson(path),
  });
}

const document = mergeSources(sourceFiles);
const definitions = collectTokens(document);
const { resolved, aliasCount } = resolveTokens(document, definitions);
validateContrastPairs(manifest.contrastPairs, resolved);

const packageManifest = await readJson(resolve(packageRoot, 'package.json'));
const nested = {};
const flat = {};
for (const token of [...resolved.values()].sort((left, right) =>
  left.path.localeCompare(right.path),
)) {
  const value = platformValue(token);
  setNested(nested, token.path, value);
  flat[token.path] = value;
}

const sourceHash = createHash('sha256')
  .update(manifestText)
  .update(sourceFiles.map((source) => source.text).join(''))
  .digest('hex');
const metadata = {
  format: manifest.format,
  sourceHash,
  tokenCount: resolved.size,
  aliasCount,
  layers: manifest.layers,
  sources: manifest.sources,
};

const combinedDtcg = {
  $description: 'Sursa canonică DTCG agregată pentru distribuție.',
  $extensions: { 'ro.sistem-digital': metadata },
  ...document,
};
const resolvedJson = `${JSON.stringify({ version: packageManifest.version, format: manifest.format, tokens: nested }, null, 2)}\n`;
const combinedJson = `${JSON.stringify(combinedDtcg, null, 2)}\n`;
const metadataJson = `${JSON.stringify(metadata, null, 2)}\n`;
const css = renderCss(resolved);
const typescript = renderTypescript(
  packageManifest.version,
  manifest.format,
  nested,
  flat,
  metadata,
);

const checkedOutputs = [
  [resolve(generatedRoot, 'tokens.ts'), typescript],
  [resolve(packageRoot, 'src/tokens.css'), css],
  [resolve(packageRoot, 'src/tokens.json'), resolvedJson],
  [resolve(packageRoot, 'src/tokens.dtcg.json'), combinedJson],
];
const stale = [];
for (const [path, content] of checkedOutputs) await writeOrCheck(path, content, stale);

if (checkOnly) {
  if (stale.length > 0) {
    throw new Error(
      `Generated token artifacts are stale:\n- ${stale.join('\n- ')}\nRun pnpm --filter @sistem-digital/tokens tokens:generate.`,
    );
  }
  console.log(
    `Validated ${resolved.size} tokens, ${aliasCount} aliases and ${manifest.contrastPairs.length} contrast pairs.`,
  );
} else {
  await mkdir(distRoot, { recursive: true });
  await writeFile(resolve(distRoot, 'tokens.css'), css);
  await writeFile(resolve(distRoot, 'tokens.json'), resolvedJson);
  await writeFile(resolve(distRoot, 'tokens.dtcg.json'), combinedJson);
  await writeFile(resolve(distRoot, 'metadata.json'), metadataJson);
  console.log(`Generated ${resolved.size} tokens from ${manifest.sources.length} DTCG sources.`);
}
