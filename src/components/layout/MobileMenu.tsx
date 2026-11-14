import { useEffect, useRef, type MouseEvent } from 'react';
import { FiX } from 'react-icons/fi';
import type { NavItem } from '../../types';

interface MobileMenuProps {
  open: boolean;
  items: NavItem[];
  activeId: string;
  /** Close without navigating — focus returns to the Menu button. */
  onClose: () => void;
  /** Close and go to a section — focus moves to that section. */
  onNavigate: (id: string) => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, items, activeId, onClose, onNavigate }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Keep the latest onClose without re-running the effect.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // While open: lock page scroll, move focus inside, close on Escape, and trap Tab.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    // Wait a frame so the panel is no longer `visibility: hidden` (which blocks focus).
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      const panel = panelRef.current;
      if (event.key !== 'Tab' || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (!panel.contains(current)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const onLinkClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onNavigate(id);
  };

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      // Become visible instantly on open (so focus can move in), but delay hiding on close until the fade ends.
      className={`fixed inset-0 z-50 flex flex-col bg-page px-4 pb-10 pt-3 duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        open
          ? 'visible translate-y-0 opacity-100 transition-[opacity,transform]'
          : 'invisible -translate-y-2 opacity-0 transition-[opacity,transform,visibility]'
      }`}
    >
      <div className="flex h-14 items-center justify-end px-2">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:rounded-full"
        >
          <FiX aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <nav aria-label="Sections" className="mt-8 px-5">
        <ul className="flex flex-col gap-2">
          {items.map(({ id, label }, i) => {
            const active = id === activeId;
            return (
              <li
                key={id}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : '0ms' }}
                className={`transition-[opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                }`}
              >
                <a
                  href={`#${id}`}
                  onClick={(event) => onLinkClick(event, id)}
                  aria-current={active ? 'true' : undefined}
                  className={`block py-1.5 text-[2.5rem] font-normal leading-[1.1] tracking-[-0.02em] transition-opacity ${
                    active ? 'text-ink' : 'text-ink/40 hover:text-ink/80'
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
