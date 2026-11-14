import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { stagger } from '../../lib/stagger';
import type { Role, Service, ServicesContent } from '../../types';
import { Section } from '../layout/Section';
import { PillList } from '../ui/Pill';
import { StatusDot } from '../ui/StatusDot';

interface ServicesProps {
  content: ServicesContent;
}

export function Services({ content }: ServicesProps) {
  const [line1, line2] = content.heading;
  const { lookingFor, offer } = content;

  return (
    <Section id="services" label="Services" number="01">
      <h2 className="heading-display">
        <span className="block">{line1}</span>
        <span className="block text-muted">{line2}</span>
      </h2>

      {/* Part 1 — roles I'm after */}
      <div className="mt-14 lg:mt-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow flex items-center gap-2.5">
            <StatusDot pulse />
            {lookingFor.label}
          </p>
          <a
            href={lookingFor.cta.href}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            <span className="link-draw">{lookingFor.cta.label}</span>
            <FiArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          </a>
        </div>

        <ul className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-3">
          {lookingFor.roles.map((role, i) => (
            <RoleCard key={role.title} role={role} index={i} />
          ))}
        </ul>
      </div>

      {/* Part 2 — what I offer */}
      <div className="mt-16 lg:mt-24">
        <p className="eyebrow">{offer.label}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
          {offer.services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

interface RoleCardProps {
  role: Role;
  index: number;
}

function RoleCard({ role, index }: RoleCardProps) {
  const dark = role.highlight;

  return (
    <li
      style={stagger(index)}
      className={`stagger-item group relative flex flex-col gap-10 overflow-hidden rounded-[22px] p-7 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.45)] motion-reduce:transform-none sm:p-8 lg:min-h-[240px] ${
        dark ? 'bg-ink text-surface' : 'bg-inset text-ink'
      }`}
    >
      <div className="flex h-7 items-center justify-between gap-4">
        <span className={`text-xs tabular-nums tracking-[0.18em] ${dark ? 'text-surface/50' : 'text-muted/70'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        {role.tag && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ${
              dark ? 'bg-surface/10 text-surface' : 'bg-surface text-ink'
            }`}
          >
            <StatusDot pulse />
            {role.tag}
          </span>
        )}
      </div>

      <div>
        <h3 className="flex items-end justify-between gap-3 text-[1.625rem] font-normal leading-[1.1] tracking-[-0.02em] sm:text-[1.875rem]">
          {role.title}
          <FiArrowUpRight
            aria-hidden="true"
            className={`mb-1 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
              dark ? 'text-surface/60' : 'text-muted'
            }`}
            strokeWidth={1.5}
          />
        </h3>
        <p className={`mt-3 text-[15px] leading-relaxed ${dark ? 'text-surface/70' : 'text-muted'}`}>
          {role.detail}
        </p>
      </div>
    </li>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const { title, description, icon: Icon, tags } = service;

  return (
    <li
      className="stagger-item group flex flex-col gap-6 rounded-[22px] bg-inset p-7 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.35)] motion-reduce:transform-none sm:flex-row sm:p-8"
      style={stagger(index + 3)}
    >
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-ink transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none">
        <Icon aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-xl font-normal leading-snug tracking-[-0.01em] text-ink sm:text-[1.375rem]">
          {title}
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{description}</p>
        <PillList items={tags} label={`${title} tools`} tone="surface" className="mt-auto pt-6" />
      </div>
    </li>
  );
}
