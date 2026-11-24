import { getTechIcon } from '../../data/techIcons';

/** `inset` sits on a card surface; `surface` sits on an already-inset tile. */
type PillTone = 'inset' | 'surface' | 'familiar';

const tones: Record<PillTone, string> = {
  inset: 'bg-inset',
  surface: 'bg-surface',
  /** Lighter, dashed outline: tech you're familiar with but not strong in yet. */
  familiar: 'border border-dashed border-ink/30 bg-transparent',
};

interface PillProps {
  name: string;
  tone?: PillTone;
}

/** A tech pill. If the name has an entry in techIcons.ts, its brand icon is shown. */
export function Pill({ name, tone = 'inset' }: PillProps) {
  const tech = getTechIcon(name);
  const Icon = tech?.icon;

  return (
    <li
      className={`group inline-flex cursor-default items-center gap-2 rounded-full px-3.5 py-2 text-[13px] leading-none text-ink/80 transition-[transform,color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:text-ink hover:shadow-[0_6px_16px_-8px_rgb(0_0_0/0.3)] motion-reduce:transform-none ${tones[tone]}`}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-125 motion-reduce:transform-none"
          style={tech.color ? { color: tech.color } : undefined}
        />
      )}
      {name}
    </li>
  );
}

interface PillListProps {
  items: string[];
  label: string;
  tone?: PillTone;
  className?: string;
}

export function PillList({ items, label, tone, className = '' }: PillListProps) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <Pill key={item} name={item} tone={tone} />
      ))}
    </ul>
  );
}
