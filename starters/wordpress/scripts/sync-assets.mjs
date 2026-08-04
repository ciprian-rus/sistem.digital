#!/usr/bin/env node
// Copiază CSS/JS din pachetele npm instalate în theme/assets/vendor, ca sursă
// pentru wp_enqueue_style/wp_enqueue_script — găzduirea WordPress tipică nu
// rulează Node, deci tema nu poate depinde de node_modules în producție.
// Rulează după `pnpm install` sau după orice actualizare de versiune.

import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const nodeModules = resolve(root, 'node_modules');
const vendorDir = resolve(root, 'theme/assets/vendor');

const tokensSrc = resolve(nodeModules, '@sistem-digital/tokens/src');
const componentsSrc = resolve(nodeModules, '@sistem-digital/components/src');
const componentsDist = resolve(nodeModules, '@sistem-digital/components/dist');

function copyRequired(from, to) {
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to);
}

// Fișiere adăugate în pachete după prima versiune publicată (de exemplu
// icons.css) nu trebuie să blocheze un starter instalat cu o versiune mai
// veche — le copiem doar dacă există în pachetul instalat.
function copyOptional(from, to) {
  try {
    copyRequired(from, to);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.warn(`Omis (nu există în versiunea instalată): ${from}`);
  }
}

function copyComponentsScripts() {
  const targetDir = resolve(vendorDir, 'components');
  mkdirSync(targetDir, { recursive: true });
  for (const entry of readdirSync(componentsDist, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.js')) continue;
    copyRequired(resolve(componentsDist, entry.name), resolve(targetDir, entry.name));
  }
}

rmSync(vendorDir, { recursive: true, force: true });

copyRequired(resolve(tokensSrc, 'tokens.css'), resolve(vendorDir, 'tokens/tokens.css'));
copyRequired(resolve(tokensSrc, 'themes.css'), resolve(vendorDir, 'tokens/themes.css'));
copyRequired(resolve(tokensSrc, 'theme-init.js'), resolve(vendorDir, 'tokens/theme-init.js'));

copyRequired(resolve(componentsSrc, 'forms.css'), resolve(vendorDir, 'components/forms.css'));
copyRequired(
  resolve(componentsSrc, 'navigation.css'),
  resolve(vendorDir, 'components/navigation.css'),
);
copyRequired(resolve(componentsSrc, 'content.css'), resolve(vendorDir, 'components/content.css'));
copyOptional(
  resolve(componentsSrc, 'interactive.css'),
  resolve(vendorDir, 'components/interactive.css'),
);
copyOptional(resolve(componentsSrc, 'icons.css'), resolve(vendorDir, 'components/icons.css'));
copyComponentsScripts();

console.log(`Active copiate în ${vendorDir}.`);
