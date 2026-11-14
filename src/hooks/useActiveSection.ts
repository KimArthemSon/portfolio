import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently "in view" — the one crossing a thin band
 * just above the middle of the viewport. When the page is scrolled to the very
 * bottom, the last section wins (short final sections never reach the band).
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');
  const key = ids.join('|');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const lastId = ids[ids.length - 1];
    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (atBottom()) return;
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(entry.target.id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );
      elements.forEach((el) => observer?.observe(el));
    }

    const onScroll = () => {
      if (atBottom()) setActive(lastId);
      else if (window.scrollY < 8) setActive(ids[0]);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
    // `key` captures the contents of `ids`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
