import { FiAward, FiFlag, FiStar } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { Award, AwardKind } from '../../types';
import { stagger } from '../../lib/stagger';
import { Section } from '../layout/Section';

interface AwardsProps {
  heading: [string, string];
  intro: string;
  awards: Award[];
}

const kindIcon: Record<AwardKind, IconType> = { win: FiAward, honor: FiStar, participant: FiFlag };

export function Awards({ heading, intro, awards }: AwardsProps) {
  const [line1, line2] = heading;

  return (
    <Section id="awards" label={`${line1} ${line2}`} number="04">
      <h2 className="heading-display">
        <span className="block">{line1}</span>
        <span className="block text-muted">{line2}</span>
      </h2>
      <p className="body-copy mt-6">{intro}</p>

      <ul className="mt-12 border-b border-ink/10 lg:mt-16">
        {awards.map(({ title, issuer, date, kind }, i) => {
          const Icon = kindIcon[kind];
          const win = kind === 'win';
          return (
            <li
              key={`${title}-${issuer}-${date}`}
              style={stagger(i)}
              className="stagger-item group flex items-start gap-4 border-t border-ink/10 py-5 sm:items-center sm:gap-5"
            >
              <span
                aria-hidden="true"
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:scale-110 ${win ? 'group-hover:animate-wiggle' : 'group-hover:-rotate-12'} motion-reduce:animate-none ${
                  win ? 'bg-[#F5B301]/15 text-[#C98A00] dark:text-[#F5B301]' : 'bg-inset text-ink/60'
                }`}
              >
                <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1 transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <p className="text-[15px] leading-relaxed sm:text-base">
                  <span className="text-ink">{title}</span>
                  <span className="text-muted transition-colors duration-300 group-hover:text-ink/70"> — {issuer}</span>
                </p>
                <p className="shrink-0 text-sm tabular-nums text-muted">{date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
