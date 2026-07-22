import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const themesRoot = resolve(packageRoot, 'themes');
const generatedRoot = resolve(packageRoot, 'src/__generated__');
const distRoot = resolve(packageRoot, 'dist');
const checkOnly = process.argv.includes('--check');
const hexPattern = /^#[0-9a-f]{6}$/iu;

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function assertHex(value, context) {
  if (typeof value !== 'string' || !hexPattern.test(value)) {
    throw new Error(`${context} must be a six-digit hexadecimal color`);
  }
  return value.toLowerCase();
}

function relativeLuminance(hex) {
  const components = [1, 3, 5]
    .map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((component) =>
      component <= 0.04045 ? component / 12.92 : ((component + 0.055) / 1.055) ** 2.4,
    );
  return components.reduce(
    (sum, component, index) => sum + component * [0.2126, 0.7152, 0.0722][index],
    0,
  );
}

function contrastRatio(foreground, background) {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

function validateTheme(themeDefinition, themeEntry, manifest) {
  if (themeDefinition.name !== themeEntry.name) {
    throw new Error(`Theme source ${themeEntry.source} declares '${themeDefinition.name}'`);
  }
  if (!themeDefinition.roles || typeof themeDefinition.roles !== 'object') {
    throw new Error(`Theme '${themeEntry.name}' must define a roles object`);
  }

  const expected = new Set(manifest.requiredRoles);
  const actual = new Set(Object.keys(themeDefinition.roles));
  const missing = [...expected].filter((role) => !actual.has(role));
  const extra = [...actual].filter((role) => !expected.has(role));
  if (missing.length || extra.length) {
    throw new Error(
      `Theme '${themeEntry.name}' has an invalid role contract. Missing: ${missing.join(', ') || 'none'}. Extra: ${extra.join(', ') || 'none'}.`,
    );
  }

  const roles = Object.fromEntries(
    manifest.requiredRoles.map((role) => [
      role,
      assertHex(themeDefinition.roles[role], `Theme '${themeEntry.name}' role '${role}'`),
    ]),
  );

  for (const pair of manifest.contrastPairs) {
    const ratio = contrastRatio(roles[pair.foreground], roles[pair.background]);
    if (ratio + Number.EPSILON < pair.minimum) {
      throw new Error(
        `Theme '${themeEntry.name}' fails ${pair.foreground} on ${pair.background}: ${ratio.toFixed(2)}; required ${pair.minimum}`,
      );
    }
  }

  return {
    name: themeEntry.name,
    label: themeEntry.label,
    description: themeDefinition.description,
    selector: themeEntry.selector,
    colorScheme: themeEntry.colorScheme,
    roles,
  };
}

function validateAccents(source) {
  const textColor = assertHex(source.textColor, 'Accent textColor');
  const presets = {};
  for (const [name, preset] of Object.entries(source.presets ?? {})) {
    const normalized = {
      label: preset.label,
      default: assertHex(preset.default, `Accent '${name}' default`),
      hover: assertHex(preset.hover, `Accent '${name}' hover`),
      active: assertHex(preset.active, `Accent '${name}' active`),
    };
    for (const state of ['default', 'hover', 'active']) {
      const ratio = contrastRatio(textColor, normalized[state]);
      if (ratio + Number.EPSILON < 4.5) {
        throw new Error(`Accent '${name}' ${state} has contrast ${ratio.toFixed(2)}; required 4.5`);
      }
    }
    presets[name] = normalized;
  }
  if (Object.keys(presets).length === 0)
    throw new Error('At least one institutional accent is required');
  return { textColor, presets };
}

function kebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/gu, '$1-$2')
    .replaceAll('_', '-')
    .toLowerCase();
}

function cssVariable(role) {
  const parts = role.split('.');
  const [group] = parts;
  if (group === 'focus' && parts[1] === 'ring') return '--sd-color-focus';
  if (group === 'focus' && parts[1] === 'contrast') return '--sd-color-focus-contrast';

  if (['brand', 'text', 'surface', 'border', 'link'].includes(group)) {
    const suffix = parts.slice(1);
    if (suffix.at(-1) === 'default') suffix.pop();
    return `--sd-color-${[group, ...suffix].map(kebab).join('-')}`;
  }

  return `--sd-color-${parts.map(kebab).join('-')}`;
}

function themeDeclarations(theme, roles) {
  return roles.map((role) => `  ${cssVariable(role)}: ${theme.roles[role]};`).join('\n');
}

function renderThemesCss(manifest, themes, accents) {
  const blocks = themes.map(
    (theme) =>
      `${theme.selector} {\n  color-scheme: ${theme.colorScheme};\n${themeDeclarations(theme, manifest.requiredRoles)}\n}`,
  );
  const dark = themes.find((theme) => theme.name === manifest.autoDarkTheme);
  if (!dark) throw new Error(`Auto dark theme '${manifest.autoDarkTheme}' does not exist`);

  const accentBlocks = Object.entries(accents.presets).map(
    ([name, accent]) => `[data-sd-accent="${name}"] {
  --sd-color-brand: ${accent.default};
  --sd-color-brand-strong: ${accent.active};
  --sd-color-action-primary-background: ${accent.default};
  --sd-color-action-primary-hover: ${accent.hover};
  --sd-color-action-primary-active: ${accent.active};
  --sd-color-action-primary-text: ${accents.textColor};
}`,
  );

  const forcedColors = `@media (forced-colors: active) {
  :root,
  [data-sd-theme] {
    --sd-color-brand: Highlight;
    --sd-color-brand-strong: CanvasText;
    --sd-color-brand-subtle: Canvas;
    --sd-color-text: CanvasText;
    --sd-color-text-muted: CanvasText;
    --sd-color-text-inverse: Canvas;
    --sd-color-text-disabled: GrayText;
    --sd-color-surface-page: Canvas;
    --sd-color-surface-subtle: Canvas;
    --sd-color-surface-raised: Canvas;
    --sd-color-surface-strong: CanvasText;
    --sd-color-border: CanvasText;
    --sd-color-border-strong: CanvasText;
    --sd-color-border-disabled: GrayText;
    --sd-color-link: LinkText;
    --sd-color-link-hover: LinkText;
    --sd-color-link-active: ActiveText;
    --sd-color-link-visited: VisitedText;
    --sd-color-action-primary-background: ButtonFace;
    --sd-color-action-primary-text: ButtonText;
    --sd-color-action-primary-hover: Highlight;
    --sd-color-action-primary-active: Highlight;
    --sd-color-action-primary-disabled-background: ButtonFace;
    --sd-color-action-primary-disabled-text: GrayText;
    --sd-color-feedback-info-text: CanvasText;
    --sd-color-feedback-info-background: Canvas;
    --sd-color-feedback-info-border: CanvasText;
    --sd-color-feedback-success-text: CanvasText;
    --sd-color-feedback-success-background: Canvas;
    --sd-color-feedback-success-border: CanvasText;
    --sd-color-feedback-warning-text: CanvasText;
    --sd-color-feedback-warning-background: Canvas;
    --sd-color-feedback-warning-border: CanvasText;
    --sd-color-feedback-danger-text: CanvasText;
    --sd-color-feedback-danger-background: Canvas;
    --sd-color-feedback-danger-border: CanvasText;
    --sd-color-focus: Highlight;
    --sd-color-focus-contrast: Canvas;
  }
}`;

  return `/* Generated from validated theme sources. Do not edit manually. */\n${blocks.join('\n\n')}\n\n@media (prefers-color-scheme: dark) {\n  :root:not([data-sd-theme]) {\n    color-scheme: dark;\n${themeDeclarations(dark, manifest.requiredRoles)}\n  }\n}\n\n${accentBlocks.join('\n\n')}\n\n${forcedColors}\n`;
}

function renderInitScript(manifest, themes) {
  const names = themes.map((theme) => theme.name);
  const darkNames = themes
    .filter((theme) => theme.colorScheme === 'dark')
    .map((theme) => theme.name);
  return `(()=>{try{const r=document.documentElement,k=${JSON.stringify(manifest.storageKey)},a=${JSON.stringify(names)},d=${JSON.stringify(darkNames)},s=localStorage.getItem(k),t=a.includes(s)?s:(matchMedia('(prefers-color-scheme: dark)').matches?${JSON.stringify(manifest.autoDarkTheme)}:${JSON.stringify(manifest.defaultTheme)});r.dataset.sdTheme=t;r.dataset.sdThemeSource=a.includes(s)?'stored':'system';r.style.colorScheme=d.includes(t)?'dark':'light'}catch{}})();`;
}

function renderTypescript(manifest, themes, accents, metadata, initScript) {
  const themeMap = Object.fromEntries(
    themes.map(({ name, label, description, colorScheme, roles }) => [
      name,
      { label, description, colorScheme, roles },
    ]),
  );
  return `/* Generated from validated theme sources. Do not edit manually. */\nexport const themeNames = ${JSON.stringify(
    themes.map((theme) => theme.name),
    null,
    2,
  )} as const;\nexport const themes = ${JSON.stringify(themeMap, null, 2)} as const;\nexport const themeStorageKey = ${JSON.stringify(manifest.storageKey)} as const;\nexport const themeInitScript = ${JSON.stringify(initScript)} as const;\nexport const institutionalAccents = ${JSON.stringify(accents.presets, null, 2)} as const;\nexport const accentNames = ${JSON.stringify(Object.keys(accents.presets), null, 2)} as const;\nexport const themeMetadata = ${JSON.stringify(metadata, null, 2)} as const;\n\nexport type ThemeName = (typeof themeNames)[number];\nexport type AccentName = (typeof accentNames)[number];\nexport type ThemeRole = keyof (typeof themes)[ThemeName]['roles'];\n`;
}

async function writeOrCheck(path, content, stale) {
  if (checkOnly) {
    let current = '';
    try {
      current = await readFile(path, 'utf8');
    } catch {
      // A missing generated file is stale.
    }
    if (current !== content) stale.push(path.replace(`${packageRoot}/`, ''));
    return;
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

const manifestPath = resolve(themesRoot, 'manifest.json');
const manifestText = await readFile(manifestPath, 'utf8');
const manifest = JSON.parse(manifestText);
const themeSources = [];
const themes = [];
for (const entry of manifest.themes) {
  const path = resolve(themesRoot, entry.source);
  const text = await readFile(path, 'utf8');
  themeSources.push(text);
  themes.push(validateTheme(JSON.parse(text), entry, manifest));
}

const accentPath = resolve(themesRoot, 'accents.json');
const accentText = await readFile(accentPath, 'utf8');
const accents = validateAccents(JSON.parse(accentText));
const sourceHash = createHash('sha256')
  .update(manifestText)
  .update(themeSources.join(''))
  .update(accentText)
  .digest('hex');
const metadata = {
  format: manifest.format,
  sourceHash,
  themeCount: themes.length,
  accentCount: Object.keys(accents.presets).length,
  requiredRoleCount: manifest.requiredRoles.length,
  contrastPairCount: manifest.contrastPairs.length,
};
const initScript = renderInitScript(manifest, themes);
const css = renderThemesCss(manifest, themes, accents);
const json = `${JSON.stringify({ metadata, themes, accents: accents.presets }, null, 2)}\n`;
const typescript = renderTypescript(manifest, themes, accents, metadata, initScript);
const standaloneScript = `/* Generated theme initialization. Place before theme styles to avoid a flash. */\n${initScript}\n`;
const checkedOutputs = [
  [resolve(generatedRoot, 'themes.ts'), typescript],
  [resolve(packageRoot, 'src/themes.css'), css],
  [resolve(packageRoot, 'src/themes.json'), json],
  [resolve(packageRoot, 'src/theme-init.js'), standaloneScript],
];
const stale = [];
for (const [path, content] of checkedOutputs) await writeOrCheck(path, content, stale);

if (checkOnly) {
  if (stale.length > 0) {
    throw new Error(
      `Generated theme artifacts are stale:\n- ${stale.join('\n- ')}\nRun pnpm --filter @sistem-digital/tokens themes:generate.`,
    );
  }
  console.log(
    `Validated ${themes.length} themes, ${Object.keys(accents.presets).length} accents and ${manifest.contrastPairs.length} contrast pairs per theme.`,
  );
} else {
  await mkdir(distRoot, { recursive: true });
  await writeFile(resolve(distRoot, 'themes.css'), css);
  await writeFile(resolve(distRoot, 'themes.json'), json);
  await writeFile(resolve(distRoot, 'theme-init.js'), standaloneScript);
  await writeFile(
    resolve(distRoot, 'theme-metadata.json'),
    `${JSON.stringify(metadata, null, 2)}\n`,
  );
  console.log(
    `Generated ${themes.length} themes and ${Object.keys(accents.presets).length} accents.`,
  );
}
