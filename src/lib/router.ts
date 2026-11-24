import { useSyncExternalStore, type MouseEvent } from 'react';

/**
 * A tiny History-API router — the site only has two kinds of pages
 * (home and /project/:id), so a dependency would be overkill.
 */

const NAV_EVENT = 'app:navigate';

function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener(NAV_EVENT, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(NAV_EVENT, callback);
  };
}

/** Current pathname, re-rendering on navigation and back/forward. */
export function usePathname(): string {
  return useSyncExternalStore(subscribe, () => window.location.pathname);
}

/** Push a new URL (path, optionally with a #hash) and notify listeners. */
export function navigate(to: string): void {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new Event(NAV_EVENT));
}

/** Click handler for internal links: lets modified clicks (new tab, etc.) through. */
export function linkHandler(to: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to);
  };
}

export const projectPath = (id: string) => `/project/${id}`;

/** Returns the project id for /project/:id, or null for any other path. */
export function matchProject(pathname: string): string | null {
  const match = /^\/project\/([^/]+)\/?$/.exec(pathname);
  return match ? decodeURIComponent(match[1]) : null;
}
