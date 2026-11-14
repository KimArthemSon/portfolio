interface StatusDotProps {
  className?: string;
  /** Soft radiating pulse. Disabled automatically under prefers-reduced-motion. */
  pulse?: boolean;
}

export function StatusDot({ className = '', pulse = false }: StatusDotProps) {
  return (
    <span aria-hidden="true" className={`relative inline-flex h-2 w-2 shrink-0 ${className}`}>
      {pulse && (
        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
      )}
      <span className="relative inline-block h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}
