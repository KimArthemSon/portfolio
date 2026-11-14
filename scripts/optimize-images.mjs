/**
 * Generates responsive AVIF + WebP versions of every photo in public/ so the site
 * downloads only what each screen needs.
 *
 *   public/avatar.jpg               -> public/img/avatar-96.{webp,avif}, avatar-400.{webp,avif}
 *   public/projects/plantscope.jpg  -> public/img/plantscope-{400,800,1280}.{webp,avif}
 *
 * Runs automatically before `npm run dev` and `npm run build` (see package.json),
 * including on Vercel. Skips files whose output is already newer than the source.
 * Never enlarges an image past its original width.
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pub = path.join(root, 'public');
const outDir = path.join(pub, 'img');

/** Which source folders to process, and the widths to generate for each. */
const jobs = [
  { dir: 'projects', widths: [400, 800, 1280] },
  { dir: '.', widths: [96, 400], only: ['avatar'] },
];

const SOURCE_EXT = /\.(jpe?g|png)$/i;
const WEBP_QUALITY = 78;
const AVIF_QUALITY = 50;

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0;
  }
}

async function run() {
  await mkdir(outDir, { recursive: true });
  let made = 0;
  let skipped = 0;

  for (const job of jobs) {
    const srcDir = path.join(pub, job.dir);
    const files = (await readdir(srcDir)).filter((f) => SOURCE_EXT.test(f));

    for (const file of files) {
      const name = file.replace(SOURCE_EXT, '');
      if (job.only && !job.only.includes(name)) continue;

      const src = path.join(srcDir, file);
      const srcTime = await mtime(src);
      const { width: srcWidth = 0 } = await sharp(src).metadata();

      for (const width of job.widths) {
        for (const format of ['webp', 'avif']) {
          const out = path.join(outDir, `${name}-${width}.${format}`);
          if ((await mtime(out)) > srcTime) {
            skipped++;
            continue;
          }
          const pipeline = sharp(src).resize({ width: Math.min(width, srcWidth), withoutEnlargement: true });
          await (format === 'webp'
            ? pipeline.webp({ quality: WEBP_QUALITY, effort: 5 })
            : pipeline.avif({ quality: AVIF_QUALITY, effort: 4 })
          ).toFile(out);
          made++;
        }
      }
    }
  }

  console.log(`[images] ${made} generated, ${skipped} up to date → public/img/`);
}

run().catch((err) => {
  console.error('[images] optimization failed:', err);
  process.exit(1);
});
