import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { ProjectLink } from '../../types';

export const isLive = (href: string) => href !== '' && href !== '#';

interface ProjectLinkItemProps {
  link: ProjectLink;
}

export function ProjectLinkItem({ link }: ProjectLinkItemProps) {
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
