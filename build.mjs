#!/usr/bin/env node
/**
 * Inlines src/ into two self-contained builds:
 *
 *   dist/journey-map.html  a full standalone document — open it from disk, or
 *                          serve it with GitHub Pages
 *   dist/artifact.html     the same page without the doctype/html/head/body
 *                          wrapper, which is the shape Claude Artifacts expects
 *
 * Both are committed so the map can be opened without a toolchain. Run
 * `node build.mjs` after editing anything under src/.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const SRC = join(root, 'src');
const DIST = join(root, 'dist');

/**
 * Resolves the import graph starting from `entry` and returns the modules in
 * dependency order, with their import/export statements stripped so they can be
 * concatenated into one classic script.
 */
async function flattenModules(entry) {
  const ordered = [];
  const seen = new Set();

  async function visit(path) {
    const key = resolve(path);
    if (seen.has(key)) return;
    seen.add(key);

    const source = await readFile(key, 'utf8');
    const deps = [...source.matchAll(/^\s*import\s+[^'"]*from\s+['"]([^'"]+)['"];?\s*$/gm)]
      .map(match => match[1])
      .filter(spec => spec.startsWith('.'));

    for (const spec of deps) {
      await visit(resolve(dirname(key), spec));
    }

    const stripped = source
      // drop import statements entirely
      .replace(/^\s*import\s+[^'"]*from\s+['"][^'"]+['"];?\s*$/gm, '')
      // `export const X` / `export function X` keep their declarations
      .replace(/^(\s*)export\s+(const|let|function|class)\s/gm, '$1$2 ')
      // bare `export { ... }` lists are not needed once everything shares a scope
      .replace(/^\s*export\s*\{[^}]*\};?\s*$/gm, '');

    ordered.push({ path: key, source: stripped.trim() });
  }

  await visit(entry);
  return ordered;
}

function banner(name) {
  const label = name.replace(`${SRC}/`, 'src/');
  return `/* ---------- ${label} ---------- */`;
}

const [shell, css, modules] = await Promise.all([
  readFile(join(SRC, 'index.html'), 'utf8'),
  readFile(join(SRC, 'styles.css'), 'utf8'),
  flattenModules(join(SRC, 'app.js')),
]);

const script = modules.map(m => `${banner(m.path)}\n${m.source}`).join('\n\n');

// The page body is everything between <body> and </body> in the dev shell, with
// the module script tag removed — the bundled script is appended instead.
const bodyMatch = shell.match(/<body>([\s\S]*)<\/body>/);
if (!bodyMatch) throw new Error('src/index.html: could not find <body>');

const title = (shell.match(/<title>([^<]*)<\/title>/) || [, 'Journey Map'])[1];
const body = bodyMatch[1]
  .replace(/\s*<script\s+type="module"[^>]*><\/script>\s*/g, '\n')
  .trim();

const inlined = [
  `<title>${title}</title>`,
  '<style>',
  css.trim(),
  '</style>',
  '',
  body,
  '',
  '<script>',
  script,
  '</script>',
].join('\n');

const standalone = [
  '<!doctype html>',
  '<html lang="en">',
  '<head>',
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  inlined.split('\n').slice(0, 1).join(''),      // <title>
  '<style>',
  css.trim(),
  '</style>',
  '</head>',
  '<body>',
  body,
  '<script>',
  script,
  '</script>',
  '</body>',
  '</html>',
].join('\n');

await mkdir(DIST, { recursive: true });
await writeFile(join(DIST, 'journey-map.html'), `${standalone}\n`);
await writeFile(join(DIST, 'artifact.html'), `${inlined}\n`);

const kb = n => `${(n / 1024).toFixed(1)}KB`;
console.log(`modules bundled : ${modules.length}`);
console.log(`dist/journey-map.html  ${kb(standalone.length)}  (standalone document)`);
console.log(`dist/artifact.html     ${kb(inlined.length)}  (Claude Artifact fragment)`);
