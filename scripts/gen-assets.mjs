import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(here, '..', 'src', 'assets');
const outDir = resolve(here, '..', 'public');

const ogSvg = await readFile(resolve(srcDir, 'og-image.svg'));
const iconSvg = await readFile(resolve(srcDir, 'icon-src.svg'));

const targets = [
  { buf: ogSvg, out: 'og-image.png', size: { width: 1200, height: 630 } },
  { buf: iconSvg, out: 'apple-touch-icon.png', size: { width: 180, height: 180 } },
  { buf: iconSvg, out: 'icon-192.png', size: { width: 192, height: 192 } },
  { buf: iconSvg, out: 'icon-512.png', size: { width: 512, height: 512 } },
  { buf: iconSvg, out: 'favicon-32.png', size: { width: 32, height: 32 } },
];

for (const t of targets) {
  const outPath = resolve(outDir, t.out);
  await sharp(t.buf, { density: 384 }).resize(t.size.width, t.size.height).png().toFile(outPath);
  console.log(`✓ ${t.out}`);
}
