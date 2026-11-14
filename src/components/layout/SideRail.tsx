import type { MouseEvent } from 'react';
import { scrollToSection } from '../../lib/scroll';
import type { NavItem } from '../../types';
import { ThemeToggle } from '../ui/ThemeToggle';

interface SideRailProps {
  items: NavItem[];
  activeId: string;
}

/** Desktop-only quiet progress indicator pinned to the right edge. */
export function SideRail({ items, activeId }: SideRailProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className="fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-8 lg:flex xl:right-10">
      <nav aria-label="Sections">
        <ul className="flex flex-col items-end gap-3.5">
          {items.map(({ id, label }) => {
            const active = id === activeId;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(event) => onClick(event, id)}
                  aria-current={active ? 'true' : undefined}
                  className={`group flex items-center gap-3 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.2em] transition-opacity duration-300 ${
                    active ? 'text-ink opacity-100' : 'text-ink opacity-35 hover:opacity-70'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    aria-hidden="true"
                    className={`h-px bg-current transition-[width] duration-300 ease-out ${
                      active ? 'w-10' : 'w-4 group-hover:w-6'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <ThemeToggle className="-mr-2.5" />
    </div>
  );
}
