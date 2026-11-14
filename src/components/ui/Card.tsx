import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** The rounded, borderless surface every section sits on. Separation comes from tone alone. */
export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-card bg-surface px-7 py-12 sm:px-12 sm:py-14 md:p-16 lg:p-[80px] ${className}`}
    >
      {children}
    </div>
  );
}
