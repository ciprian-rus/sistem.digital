import { copyFileSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const arguments_ = process.argv.slice(2);
const checkOnly = arguments_.includes('--check');
const outputArgument = arguments_.find((argument) => !argument.startsWith('--'));
const output = resolve(root, outputArgument ?? 'release-artifacts/static');
const version = JSON.parse(
  readFileSync(resolve(root, 'packages/tokens/package.json'), 'utf8'),
).version;

const sources = [
  ['packages/tokens/src/tokens.css', 'assets/tokens.css'],
  ['packages/tokens/src/themes.css', 'assets/themes.css'],
  ['packages/tokens/src/theme-init.js', 'assets/theme-init.js'],
  ['packages/components/src/forms.css', 'assets/forms.css'],
  ['packages/components/src/navigation.css', 'assets/navigation.css'],
  ['packages/components/src/content.css', 'assets/content.css'],
  ['packages/components/src/interactive.css', 'assets/interactive.css'],
  ['examples/static-release/index.html', 'index.html'],
  ['docs/distribution/self-hosting.md', 'SELF-HOSTING.md'],
];

const sha256 = (content) => createHash('sha256').update(content).digest('hex');
const sri = (content) => `sha256-${createHash('sha256').update(content).digest('base64')}`;

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function zipStored(entries) {
  const localParts = [];
  const directoryParts = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.path.replaceAll('\\', '/'));
    const content = entry.content;
    const crc = crc32(content);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0x0021, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(content.length, 18);
    local.writeUInt32LE(content.length, 22);
    local.writeUInt16LE(name.length, 26);
    localParts.push(local, name, content);

    const directory = Buffer.alloc(46);
    directory.writeUInt32LE(0x02014b50, 0);
    directory.writeUInt16LE(20, 4);
    directory.writeUInt16LE(20, 6);
    directory.writeUInt16LE(0x0800, 8);
    directory.writeUInt16LE(0, 10);
    directory.writeUInt16LE(0, 12);
    directory.writeUInt16LE(0x0021, 14);
    directory.writeUInt32LE(crc, 16);
    directory.writeUInt32LE(content.length, 20);
    directory.writeUInt32LE(content.length, 24);
    directory.writeUInt16LE(name.length, 28);
    directory.writeUInt32LE((0o100644 << 16) >>> 0, 38);
    directory.writeUInt32LE(offset, 42);
    directoryParts.push(directory, name);
    offset += local.length + name.length + content.length;
  }

  const directory = Buffer.concat(directoryParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...localParts, directory, end]);
}

if (!checkOnly) {
  rmSync(output, { recursive: true, force: true });
}

const files = [];
for (const [sourcePath, destinationPath] of sources) {
  const source = resolve(root, sourcePath);
  const content = readFileSync(source);
  files.push({
    path: destinationPath,
    bytes: content.length,
    sha256: sha256(content),
    integrity: sri(content),
  });
  if (!checkOnly) {
    const destination = join(output, destinationPath);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(source, destination);
  }
}

files.sort((left, right) => left.path.localeCompare(right.path));
const manifest = {
  schemaVersion: 1,
  name: '@sistem-digital/static',
  version,
  immutableBasePath: `/releases/${version}/`,
  files,
};
const manifestContent = `${JSON.stringify(manifest, null, 2)}\n`;
const checksumContent = `${files
  .map((file) => `${file.sha256}  ${file.path}`)
  .join('\n')}\n${sha256(manifestContent)}  manifest.json\n`;

if (!checkOnly) {
  writeFileSync(join(output, 'manifest.json'), manifestContent);
  writeFileSync(join(output, 'SHA256SUMS'), checksumContent);
  const entries = [
    ...sources.map(([, path]) => ({
      path: `sistem-digital-${version}/${path}`,
      content: readFileSync(join(output, path)),
    })),
    {
      path: `sistem-digital-${version}/manifest.json`,
      content: Buffer.from(manifestContent),
    },
    {
      path: `sistem-digital-${version}/SHA256SUMS`,
      content: Buffer.from(checksumContent),
    },
  ].sort((left, right) => left.path.localeCompare(right.path));
  const archive = resolve(output, `../sistem-digital-${version}.zip`);
  writeFileSync(archive, zipStored(entries));
  console.log(
    `Built ${relative(root, output)} and ${relative(root, archive)} (${statSync(archive).size} bytes).`,
  );
} else {
  for (const file of files) {
    const generated = resolve(output, file.path);
    const content = readFileSync(generated);
    if (sha256(content) !== file.sha256) {
      throw new Error(`Static release drift detected in ${file.path}.`);
    }
  }
  const generatedManifest = readFileSync(resolve(output, 'manifest.json'), 'utf8');
  if (generatedManifest !== manifestContent) {
    throw new Error('Static release manifest is not reproducible.');
  }
  console.log(`Verified ${files.length} static release files for ${version}.`);
}
