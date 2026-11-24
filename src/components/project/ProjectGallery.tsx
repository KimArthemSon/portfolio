import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import type { Project, ProjectScreenshot } from '../../types';
import { SCREENSHOT_WIDTHS, avifSrcSet, webpSrcSet } from '../../lib/images';

/** Rendered width of the gallery frame, so the browser picks the right file. */
const FRAME_SIZES = '(min-width: 1280px) 960px, (min-width: 1024px) 70vw, 92vw';

interface ProjectGalleryProps {
  project: Project;
  demoHref?: string;
}

/**
 * Every screenshot in its own browser frame, stacked so the reader scrolls
 * through them. The first frame links to the live demo when there is one.
 */
export function ProjectGallery({ project, demoHref }: ProjectGalleryProps) {
  let host = `${project.id}.app`;
  try {
    if (demoHref) host = new URL(demoHref).host;
  } catch {
    // keep the fallback
  }

  return (
    <ul aria-label={`${project.name} screenshots`} className="flex flex-col gap-6 sm:gap-10">
      {project.screenshots.map((shot, i) => (
        <li key={shot.src}>
          {i === 0 && demoHref ? (
            <a
              href={demoHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name} live demo`}
              className="group block rounded-[20px]"
            >
              <Frame shot={shot} host={host} name={project.name} eager linked />
            </a>
          ) : (
            <div className="group">
              <Frame shot={shot} host={host} name={project.name} eager={i === 0} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

interface FrameProps {
  shot: ProjectScreenshot;
  host: string;
  name: string;
  eager?: boolean;
  linked?: boolean;
}

function Frame({ shot, host, name, eager = false, linked = false }: FrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="overflow-hidden rounded-[20px] bg-inset p-1.5 pt-0 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)] motion-reduce:transform-none sm:p-2 sm:pt-0">
      {/* Browser chrome */}
      <div aria-hidden="true" className="flex h-9 items-center gap-3 px-2.5 sm:h-11">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15 transition-colors duration-300 group-hover:bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15 transition-colors delay-75 duration-300 group-hover:bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15 transition-colors delay-150 duration-300 group-hover:bg-[#28C840]" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-full bg-surface/70 px-4 py-1 text-[11px] text-muted">
          {host}
        </span>
        <span className="w-[42px]" />
      </div>

      <div className="relative aspect-[1280/610] overflow-hidden rounded-[14px] bg-surface/50">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center text-2xl text-muted/70">{name}</div>
        ) : (
          <picture>
            <source type="image/avif" srcSet={avifSrcSet(shot.src, SCREENSHOT_WIDTHS)} sizes={FRAME_SIZES} />
            <source type="image/webp" srcSet={webpSrcSet(shot.src, SCREENSHOT_WIDTHS)} sizes={FRAME_SIZES} />
            <img
              src={shot.src}
              alt={shot.alt}
              width={1280}
              height={610}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          </picture>
        )}
        <figcaption className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-[11px] font-medium leading-none text-ink/75 sm:bottom-4 sm:right-4">
          {shot.caption}
          {linked && <FiArrowUpRight aria-hidden="true" className="h-3 w-3" />}
        </figcaption>
      </div>
    </figure>
  );
}
