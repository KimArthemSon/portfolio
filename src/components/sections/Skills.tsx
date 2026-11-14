import { FiCheck } from 'react-icons/fi';
import { getTechIcon } from '../../data/techIcons';
import { stagger } from '../../lib/stagger';
import type { Skill, Stack } from '../../types';
import { Section } from '../layout/Section';
import { PillList } from '../ui/Pill';

interface SkillsProps {
  heading: string;
  stacksLabel: string;
  stacks: Stack[];
  toolboxLabel: string;
  skills: Skill[];
}

export function Skills({ heading, stacksLabel, stacks, toolboxLabel, skills }: SkillsProps) {
  return (
    <Section id="skills" label={heading} number="03">
      <h2 className="heading-display">{heading}</h2>

      {/* Proficient stacks */}
      <div className="mt-12 lg:mt-16">
        <p className="eyebrow">{stacksLabel}</p>
        <ul className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-3">
          {stacks.map((stack, i) => (
            <StackCard key={stack.name} stack={stack} index={i} />
          ))}
        </ul>
      </div>

      {/* Everything else */}
      <div className="mt-16 lg:mt-20">
        <p className="eyebrow">{toolboxLabel}</p>
        <div className="mt-6 divide-y divide-ink/10">
          {skills.map(({ category, items }, i) => (
            <div
              key={category}
              style={stagger(i + stacks.length)}
              className="stagger-item grid gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[200px_minmax(0,1fr)]"
            >
              <h3 className="eyebrow sm:pt-2.5">{category}</h3>
              <PillList items={items} label={`${category} skills`} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

interface StackCardProps {
  stack: Stack;
  index: number;
}

function StackCard({ stack, index }: StackCardProps) {
  return (
    <li
      style={stagger(index)}
      className="stagger-item group flex flex-col rounded-[22px] bg-inset p-7 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.35)] motion-reduce:transform-none sm:p-8"
    >
      {/* Overlapping logo stack — fans out on hover */}
      <div className="flex items-center" aria-hidden="true">
        {stack.tech.map((name, i) => {
          const tech = getTechIcon(name);
          const Icon = tech?.icon;
          return (
            <span
              key={name}
              title={name}
              className="-ml-2.5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface ring-4 ring-[rgb(var(--color-inset))] transition-[margin,transform] duration-300 ease-out first:ml-0 group-hover:ml-1 group-hover:first:ml-0 motion-reduce:transition-none"
              style={{ zIndex: stack.tech.length - i, transitionDelay: `${i * 40}ms` }}
            >
              {Icon && (
                <Icon
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  style={tech.color ? { color: tech.color } : undefined}
                />
              )}
            </span>
          );
        })}
      </div>

      <h3 className="mt-8 text-[1.625rem] font-normal leading-[1.1] tracking-[-0.02em] text-ink sm:text-[1.75rem]">
        {stack.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted">{stack.full}</p>

      {stack.usedIn && (
        <p className="mt-auto flex items-center gap-2 pt-7 text-[13px] text-ink/75">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[#16A34A] dark:text-accent">
            <FiCheck aria-hidden="true" className="h-3 w-3" strokeWidth={2.5} />
          </span>
          Used in {stack.usedIn}
        </p>
      )}
    </li>
  );
}
