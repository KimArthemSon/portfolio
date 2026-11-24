import { useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import type { Project } from '../types';
import { linkHandler, projectPath } from '../lib/router';
import { stagger } from '../lib/stagger';
import { Section } from '../components/layout/Section';
import { ProjectGallery } from '../components/project/ProjectGallery';
import { ProjectLinkItem, isLive } from '../components/project/ProjectLinkItem';
import { PillList } from '../components/ui/Pill';
import { ThemeToggle } from '../components/ui/ThemeToggle';

interface ProjectPageProps {
  projects: Project[];
  id: string;
  siteName: string;
}

const BACK_HREF = '/#projects';

export function ProjectPage({ projects, id, siteName }: ProjectPageProps) {
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  useEffect(() => {
    const previous = document.title;
    document.title = project ? `${project.name} · ${siteName}` : `Project not found · ${siteName}`;
    return () => {
      document.title = previous;
    };
  }, [project, siteName]);

  return (
    <>
      <header className="sticky top-3 z-40 mb-3 sm:top-4 sm:mb-4">
        <div className="flex h-14 items-center justify-between gap-3 rounded-full bg-surface pl-2 pr-2 ring-1 ring-ink/[0.06]">
          <a
            href={BACK_HREF}
            onClick={linkHandler(BACK_HREF)}
            className="group inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink transition-colors hover:bg-ink/5 focus-visible:rounded-full"
          >
            <FiArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              strokeWidth={1.75}
            />
            All projects
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="flex flex-col gap-3 sm:gap-4">
        {project ? (
          <ProjectDetail project={project} index={index} next={projects[(index + 1) % projects.length]} />
        ) : (
          <Section id="project" label="Project not found">
            <h1 className="heading-display">Project not found</h1>
            <p className="body-copy mt-5">That project doesn’t exist or has moved.</p>
          </Section>
        )}
      </main>
    </>
  );
}

interface ProjectDetailProps {
  project: Project;
  index: number;
  next?: Project;
}

function ProjectDetail({ project, index, next }: ProjectDetailProps) {
  const number = String(index + 1).padStart(2, '0');
  const demo = project.links.find((link) => /demo/i.test(link.label) && isLive(link.href));
  const showNext = next && next.id !== project.id;

  return (
    <>
      <Section id="project" label={project.name} number={number}>
        <div className="stagger-item max-w-3xl" style={stagger(0)}>
          <p className="eyebrow leading-relaxed">{project.meta.join(' · ')}</p>
          <h1 className="heading-display mt-4">{project.name}</h1>
          <p className="mt-3 text-[17px] leading-snug text-ink/70">{project.subtitle}</p>
        </div>

        <div className="stagger-item mt-10 lg:mt-14" style={stagger(1)}>
          <ProjectGallery project={project} demoHref={demo?.href} />
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="stagger-item" style={stagger(2)}>
            <h2 className="eyebrow">Overview</h2>
            <p className="body-copy mt-4">{project.summary}</p>

            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" aria-label={`${project.name} links`}>
              {project.links.map((link) => (
                <li key={link.label}>
                  <ProjectLinkItem link={link} />
                </li>
              ))}
            </ul>

            <h2 className="eyebrow mt-10">Tech stack</h2>
            <PillList items={project.tech} label={`${project.name} tech stack`} className="mt-4" />
          </div>

          <div>
            <h2 className="eyebrow stagger-item" style={stagger(3)}>
              Highlights
            </h2>
            <ul className="mt-4 space-y-4">
              {project.highlights.map((highlight, i) => (
                <li key={highlight} className="stagger-item group/item flex gap-4" style={stagger(i + 4)}>
                  <span
                    aria-hidden="true"
                    className="mt-[13px] h-px w-3 shrink-0 bg-ink/30 transition-[width,background-color] duration-300 group-hover/item:w-5 group-hover/item:bg-ink"
                  />
                  <span className="body-copy">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {showNext && (
        <a
          href={projectPath(next.id)}
          onClick={linkHandler(projectPath(next.id))}
          className="group block rounded-card bg-surface px-7 py-10 transition-colors sm:px-12 md:px-16 lg:px-[80px]"
        >
          <span className="eyebrow">Next project</span>
          <span className="mt-3 flex items-center justify-between gap-6">
            <span className="text-[1.75rem] font-normal leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
              {next.name}
            </span>
            <FiArrowRight
              aria-hidden="true"
              className="h-6 w-6 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </span>
        </a>
      )}
    </>
  );
}
