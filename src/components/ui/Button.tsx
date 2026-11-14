import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'filled' | 'outline';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  filled: 'bg-ink text-surface hover:bg-ink/85',
  outline: 'text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink/60',
};

/** Pill-shaped link styled as a button. */
export function Button({ href, variant = 'filled', children, className = '', ...rest }: ButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium transition-[color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:rounded-full motion-reduce:transform-none ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
