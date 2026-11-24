import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import type { Project } from '../../types';
import { SCREENSHOT_WIDTHS, avifSrcSet, webpSrcSet } from '../../lib/images';
import { linkHandler, projectPath } from '../../lib/router';
import { stagger } from '../../lib/stagger';
import { Section } from '../layout/Section';

interface ProjectsProps {
  heading: string;
  projects: Project[];
}

/** Compact overview: one card per project, each opening its own detail page. */
export function Projects({ heading, projects }: ProjectsProps) {
  return (
    <Section id="projects" label={heading} number="02">
      <h2 className="heading-display">{heading}</h2>

      <ul className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-14">
        {projects.map((project, index) => (
          <li key={project.id} className="stagger-item" style={stagger(index)}>
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Card image is at most about half the content width. */
const CARD_SIZES = '(min-width: 768px) 45vw, 92vw';
const MAX_PILLS = 4;

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const href = projectPath(project.id);
  const cover = project.screenshots[0];
  const number = String(index + 1).padStart(2, '0');
  const [failed, setFailed] = useState(false);
  const extra = project.tech.length - MAX_PILLS;

  return (
    <a href={href} onClick={linkHandler(href)} className="group block rounded-[20px]">
      <div className="overflow-hidden rounded-[20px] bg-inset p-1.5 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)] motion-reduce:transform-none">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-surface/50">
          {cover && !failed ? (
            <picture>
              <source type="image/avif" srcSet={avifSrcSet(cover.src, SCREENSHOT_WIDTHS)} sizes={CARD_SIZES} />
              <source type="image/webp" srcSet={webpSrcSet(cover.src, SCREENSHOT_WIDTHS)} sizes={CARD_SIZES} />
              <img
                src={cover.src}
                alt=""
                width={1280}
                height={610}
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </picture>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl text-muted/70">
              {project.name}
            </div>
          )}
          {project.screenshots.length > 1 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium leading-none text-ink/75">
              {project.screenshots.length} screens
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 px-1">
        <p className="eyebrow leading-relaxed">
          <span className="text-ink">{number}</span>
          <span className="mx-2 text-muted/50">/</span>
          {project.meta[0]}
          {project.meta.length > 1 && (
            <>
              <span className="mx-2 text-muted/50">·</span>
              {project.meta[project.meta.length - 1]}
            </>
          )}
        </p>
        <h3 className="mt-3 text-[1.5rem] font-normal leading-[1.15] tracking-[-0.02em] text-ink sm:text-[1.75rem]">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-snug text-muted">{project.subtitle}</p>

        <ul aria-label={`${project.name} tech stack`} className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, MAX_PILLS).map((tech) => (
            <li key={tech} className="rounded-full bg-inset px-3 py-1.5 text-[12px] leading-none text-ink/75">
              {tech}
            </li>
          ))}
          {extra > 0 && (
            <li className="rounded-full px-2 py-1.5 text-[12px] leading-none text-muted">+{extra}</li>
          )}
        </ul>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
            View project
          </span>
          <FiArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
          <span className="sr-only">: {project.name}</span>
        </span>
      </div>
    </a>
  );
}
