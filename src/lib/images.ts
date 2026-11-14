/**
 * Helpers for the responsive WebP files that scripts/optimize-images.mjs generates
 * into public/img/. Data files keep pointing at the original image (e.g.
 * '/projects/plantscope-map.jpg'); these turn that into a WebP srcset.
 */

const basename = (src: string) =>
  src
    .split('/')
    .pop()!
    .replace(/\.(jpe?g|png|webp)$/i, '');

/** Path of one generated width, e.g. '/img/plantscope-map-800.webp'. */
export function webp(src: string, width: number): string {
  return `/img/${basename(src)}-${width}.webp`;
}

/** Path of one generated AVIF width, e.g. '/img/plantscope-map-800.avif'. */
export function avif(src: string, width: number): string {
  return `/img/${basename(src)}-${width}.avif`;
}

/** A `srcSet` string covering the given widths. */
export function webpSrcSet(src: string, widths: number[]): string {
  return widths.map((w) => `${webp(src, w)} ${w}w`).join(', ');
}

/** AVIF version of {@link webpSrcSet} (smaller; browsers without AVIF fall back to WebP). */
export function avifSrcSet(src: string, widths: number[]): string {
  return widths.map((w) => `${avif(src, w)} ${w}w`).join(', ');
}

/** Widths generated for project screenshots (keep in sync with the script). */
export const SCREENSHOT_WIDTHS = [400, 800, 1280];
/** Widths generated for the avatar (keep in sync with the script). */
export const AVATAR_WIDTHS = [96, 400];
