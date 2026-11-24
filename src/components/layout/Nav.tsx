import { useRef, useState, type MouseEvent } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { webp } from '../../lib/images';
import { scrollToSection } from '../../lib/scroll';
import type { NavItem } from '../../types';
import { StatusDot } from '../ui/StatusDot';
import { ThemeToggle } from '../ui/ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { SideRail } from './SideRail';

interface NavProps {
  items: NavItem[];
  name: string;
  status: string;
  /** Photo shown beside the name in the mobile bar; an outlined circle when omitted. */
  avatar?: string;
}

export function Nav({ items, name, status, avatar }: NavProps) {
  const activeId = useActiveSection(items.map((item) => item.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const navigateFromMenu = (id: string) => {
    setMenuOpen(false);
    // Wait a frame so the body scroll lock is released before scrolling.
    window.requestAnimationFrame(() => scrollToSection(id));
  };

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(items[0]?.id ?? 'home');
  };

  return (
    <header className="sticky top-3 z-40 mb-3 lg:static lg:mb-0">
      {/* Mobile / tablet: sticky pill bar */}
      <div className="lg:hidden">
        <div className="flex h-14 items-center justify-between gap-3 rounded-full bg-surface pl-3 pr-2 ring-1 ring-ink/[0.06]">
          <a
            href={`#${items[0]?.id ?? 'home'}`}
            onClick={goHome}
            className="flex min-w-0 items-center gap-2.5 focus-visible:rounded-full"
          >
            {avatar ? (
              <picture className="contents">
                <source type="image/webp" srcSet={webp(avatar, 96)} />
                <img
                  src={avatar}
                  alt=""
                  width={32}
                  height={32}
                  decoding="async"
                  className="h-8 w-8 shrink-0 rounded-full bg-inset object-cover object-top ring-1 ring-ink/10"
                />
              </picture>
            ) : (
              <span aria-hidden="true" className="h-7 w-7 shrink-0 rounded-full border-[2.5px] border-ink" />
            )}
            <span className="truncate text-sm font-medium text-ink">{name}</span>
            <span className="ml-1 hidden items-center gap-1.5 text-xs text-muted min-[360px]:flex">
              <StatusDot pulse />
              {status}
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="h-10 rounded-full px-4 text-sm font-medium text-ink transition-colors hover:bg-ink/5 focus-visible:rounded-full"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        items={items}
        activeId={activeId}
        onClose={closeMenu}
        onNavigate={navigateFromMenu}
      />

      {/* Desktop: right-side rail */}
      <SideRail items={items} activeId={activeId} />
    </header>
  );
}
