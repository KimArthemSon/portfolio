import { useRef, type ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import { Card } from '../ui/Card';

interface SectionProps {
  /** Anchor target and the id the nav rail observes. */
  id: string;
  /** Accessible name for the section landmark. */
  label: string;
  /** Optional editorial index shown in the card's top-right corner, e.g. "01". */
  number?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, label, number, children, className = '' }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);

  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      tabIndex={-1}
      className={`reveal scroll-mt-24 outline-none lg:scroll-mt-4 ${visible ? 'is-visible' : ''}`}
    >
      <Card className={`relative ${className}`}>
        {number && (
          <span
            aria-hidden="true"
            className="absolute right-7 top-7 text-xs tabular-nums tracking-[0.18em] text-muted/70 sm:right-10 sm:top-10 lg:right-12 lg:top-12"
          >
            ({number})
          </span>
        )}
        {children}
      </Card>
    </section>
  );
}
