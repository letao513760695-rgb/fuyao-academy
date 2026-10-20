import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// The prototype has one bundled JS entry and no external media dependencies.
// Embed the built assets to provide a double-clickable, offline review copy.
const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
let html = await readFile(resolve(dist, 'index.html'), 'utf8');
const jsPath = html.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/)?.[1];
const cssPath = html.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/)?.[1];
if (!jsPath || !cssPath) throw new Error('Build assets not found; run npm run build first.');
const icon = await readFile(resolve(root, 'public/favicon.svg'), 'utf8');
const iconUrl = `data:image/svg+xml;base64,${Buffer.from(icon).toString('base64')}`;
const js = (await readFile(resolve(dist, jsPath.replace(/^\//, '')), 'utf8'))
  .replaceAll('/favicon.svg', iconUrl)
  .replaceAll('</script', '<\\/script');
const css = await readFile(resolve(dist, cssPath.replace(/^\//, '')), 'utf8');
html = html
  .replace(/<script[^>]+src="[^"]+"[^>]*><\/script>/, '')
  .replace(/<link[^>]+href="[^"]+\.css"[^>]*>/, () => `<style>${css}</style>`)
  .replaceAll('/favicon.svg', iconUrl)
  .replace('</body>', () => `<script type="module">${js}</script></body>`);
const target = resolve(dist, 'fuyao-academy-preview.html');
await writeFile(target, html);
console.log(`Standalone preview created: ${target}`);
