function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Smooth-scrolls to a section, updates the URL hash, and moves focus there for keyboard/AT users. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
  try {
    window.history.replaceState(null, '', `#${id}`);
  } catch {
    // ignore
  }
}
