import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Publish the self-contained production bundle so project-subpath assets work
// without changing the development URL, router, or source repository visibility.
const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'pages-dist');
const html = await readFile(resolve(root, 'dist/fuyao-academy-preview.html'), 'utf8');
await mkdir(output, { recursive: true });
await writeFile(resolve(output, 'index.html'), html);
await writeFile(resolve(output, '404.html'), html);
await writeFile(resolve(output, '.nojekyll'), '');
await copyFile(resolve(root, 'public/favicon.svg'), resolve(output, 'favicon.svg'));
console.log('GitHub Pages production files prepared in pages-dist/.');
