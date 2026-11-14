import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { Project, ProjectLink } from '../../types';
import { useInView } from '../../hooks/useInView';
import { SCREENSHOT_WIDTHS, avifSrcSet, webp, webpSrcSet } from '../../lib/images';
import { stagger } from '../../lib/stagger';
import { Section } from '../layout/Section';
import { PillList } from '../ui/Pill';

interface ProjectsProps {
  heading: string;
  projects: Project[];
}

export function Projects({ heading, projects }: ProjectsProps) {
  return (
    <Section id="projects" label={heading} number="02">
      <h2 className="heading-display">{heading}</h2>

      <div className="mt-12 divide-y divide-ink/10 lg:mt-16">
        {projects.map((project, index) => (
          <ProjectEntry key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}

const isLive = (href: string) => href !== '' && href !== '#';

interface ProjectEntryProps {
  project: Project;
  index: number;
}

function ProjectEntry({ project, index }: ProjectEntryProps) {
  const headingId = `project-${project.id}`;
  const number = String(index + 1).padStart(2, '0');
  const demo = project.links.find((link) => /demo/i.test(link.label) && isLive(link.href));

  return (
    <article aria-labelledby={headingId} className="py-14 first:pt-0 last:pb-0 lg:py-20">
      <ProjectGallery project={project} demoHref={demo?.href} />

      <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="stagger-item" style={stagger(0)}>
          <p className="eyebrow leading-relaxed">
            <span className="text-ink">{number}</span>
            <span className="mx-2 text-muted/50">/</span>
            {project.meta.join(' · ')}
          </p>
          <h3
            id={headingId}
            className="mt-4 text-[1.75rem] font-normal leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]"
          >
            {project.name}
          </h3>
          <p className="mt-2 text-[15px] leading-snug text-ink/70">{project.subtitle}</p>
          <p className="body-copy mt-5">{project.summary}</p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" aria-label={`${project.name} links`}>
            {project.links.map((link) => (
              <li key={link.label}>
                <ProjectLinkItem link={link} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className="space-y-4">
            {project.highlights.map((highlight, i) => (
              <li key={highlight} className="stagger-item group/item flex gap-4" style={stagger(i + 1)}>
                <span
                  aria-hidden="true"
                  className="mt-[13px] h-px w-3 shrink-0 bg-ink/30 transition-[width,background-color] duration-300 group-hover/item:w-5 group-hover/item:bg-ink"
                />
                <span className="body-copy">{highlight}</span>
              </li>
            ))}
          </ul>
          <PillList items={project.tech} label={`${project.name} tech stack`} className="mt-8" />
        </div>
      </div>
    </article>
  );
}

const AUTOPLAY_MS = 4500;

/** Rendered width of the gallery frame, so the browser picks the right WebP. */
const FRAME_SIZES = '(min-width: 1280px) 960px, (min-width: 1024px) 70vw, 92vw';

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

interface ProjectGalleryProps {
  project: Project;
  demoHref?: string;
}

/**
 * Browser-framed screenshot gallery. Crossfades through the project's screenshots
 * once it has scrolled into view; thumbnails below switch manually and show a
 * progress line for the autoplay timer. Hover or keyboard focus pauses it, and
 * reduced motion turns autoplay off.
 */
function ProjectGallery({ project, demoHref }: ProjectGalleryProps) {
  const shots = project.screenshots;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const paused = hovered || keyboardFocus;
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const [reduceMotion] = useState(prefersReducedMotion);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const autoplay = !reduceMotion && !paused && inView && shots.length > 1;

  // Keyed on `active`, so the timer restarts whenever the slide changes (clicks included).
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % shots.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, autoplay, shots.length]);

  let host = `${project.id}.app`;
  try {
    if (demoHref) host = new URL(demoHref).host;
  } catch {
    // keep the fallback
  }

  const current = shots[active];

  // Only download a slide once it's showing or next up; keep it once loaded.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  useEffect(() => {
    if (!inView) return;
    setLoaded((prev) => {
      const next = (active + 1) % shots.length;
      if (prev.has(active) && prev.has(next)) return prev;
      return new Set([...prev, active, next]);
    });
  }, [active, inView, shots.length]);

  const frame = (
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
        {shots.map((shot, i) => (
          <div
            key={shot.src}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {failed[i] ? (
              <div className="flex h-full w-full items-center justify-center text-2xl text-muted/70">
                {project.name}
              </div>
            ) : loaded.has(i) ? (
              <picture>
                <source type="image/avif" srcSet={avifSrcSet(shot.src, SCREENSHOT_WIDTHS)} sizes={FRAME_SIZES} />
                <source type="image/webp" srcSet={webpSrcSet(shot.src, SCREENSHOT_WIDTHS)} sizes={FRAME_SIZES} />
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={1280}
                  height={610}
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </picture>
            ) : null}
          </div>
        ))}
        <figcaption className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-[11px] font-medium leading-none text-ink/75 sm:bottom-4 sm:right-4">
          {current ? (
            <>
              <span className="hidden sm:inline">{project.name} · </span>
              {current.caption}
            </>
          ) : (
            project.name
          )}
          {demoHref && <FiArrowUpRight aria-hidden="true" className="h-3 w-3" />}
        </figcaption>
      </div>
    </figure>
  );

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Pause for keyboard users only; a mouse click on a thumbnail should not freeze it.
      onFocus={(e) => setKeyboardFocus(e.target.matches(":focus-visible"))}
      onBlur={() => setKeyboardFocus(false)}
    >
      {demoHref ? (
        <a
          href={demoHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.name} live demo`}
          className="group block rounded-[20px]"
        >
          {frame}
        </a>
      ) : (
        <div className="group">{frame}</div>
      )}

      {shots.length > 1 && (
        <div
          role="group"
          aria-label={`${project.name} screenshots`}
          className="mt-3 grid gap-2 sm:gap-3"
          // At least 4 slots so a 2-screenshot project keeps small thumbnails.
          style={{ gridTemplateColumns: `repeat(${Math.max(shots.length, 4)}, minmax(0, 1fr))` }}
        >
          {shots.map((shot, i) => {
            const isActive = i === active;
            return (
              <button
                key={shot.src}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`Show ${shot.caption}`}
                className={`group/thumb relative overflow-hidden rounded-xl bg-inset p-1 text-left transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 focus-visible:rounded-xl motion-reduce:transform-none ${
                  isActive ? 'ring-1 ring-ink/25' : ''
                }`}
              >
                <img
                  src={webp(shot.src, 400)}
                  alt=""
                  width={400}
                  height={191}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Fall back to the original if the WebP is missing.
                    if (!e.currentTarget.src.endsWith(shot.src)) e.currentTarget.src = shot.src;
                  }}
                  className={`aspect-[1280/610] w-full rounded-lg object-cover object-top transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-50 group-hover/thumb:opacity-90'
                  }`}
                />
                <span
                  className={`hidden truncate px-1.5 pb-1 pt-2 text-[11px] leading-none sm:block ${
                    isActive ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {shot.caption}
                </span>
                {/* Autoplay progress */}
                {isActive && autoplay && (
                  <span
                    key={active}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] bg-ink/70"
                    style={{ animation: `gallery-progress ${AUTOPLAY_MS}ms linear forwards` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ProjectLinkItemProps {
  link: ProjectLink;
}

function ProjectLinkItem({ link }: ProjectLinkItemProps) {
  const isGithub = /github/i.test(link.label);

  // A '#' href is a placeholder — show it as quiet text rather than a dead link.
  if (!isLive(link.href)) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted/70">
        {isGithub && <FiGithub aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />}
        {link.label}
        <span className="text-xs">(soon)</span>
      </span>
    );
  }

  if (isGithub) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
      >
        <FiGithub
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[360deg]"
          strokeWidth={1.5}
        />
        {link.label}
      </a>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-medium text-surface transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-ink/85 active:scale-[0.97] focus-visible:rounded-full motion-reduce:transform-none"
    >
      {link.label}
      <FiArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </a>
  );
}
