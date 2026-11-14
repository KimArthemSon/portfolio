import type { CSSProperties } from 'react';

/** Inline style that sets the stagger index used by the `.stagger-item` CSS class. */
export function stagger(index: number): CSSProperties {
  return { '--i': index } as CSSProperties;
}
