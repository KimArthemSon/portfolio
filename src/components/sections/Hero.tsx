import { FiArrowDown, FiClock, FiDownload } from 'react-icons/fi';
import { useLocalTime } from '../../hooks/useLocalTime';
import { avif, webp } from '../../lib/images';
import { stagger } from '../../lib/stagger';

// React 18 doesn't type `fetchPriority` yet; the lowercase attribute passes straight to the DOM.
const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>;
import type { Profile } from '../../types';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { StatusDot } from '../ui/StatusDot';

interface HeroProps {
  profile: Profile;
  /** Section id the primary button scrolls to. */
  projectsId: string;
}

export function Hero({ profile, projectsId }: HeroProps) {
  const [line1, line2] = profile.heroHeading;
  const time = useLocalTime(profile.timeZone);

  return (
    <Section id="home" label="Introduction" className="lg:py-[88px]">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-3.5">
          <Avatar src={profile.avatar} className="h-11 w-11 lg:hidden" />
          <div className="leading-tight">
            <p className="text-[15px] font-medium text-ink">{profile.name}</p>
            <p className="text-[13px] text-muted">{profile.role}</p>
          </div>
        </div>
        {time && (
          <p className="flex items-center gap-2 text-[13px] tabular-nums text-muted">
            <FiClock aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span>
              {profile.city} · <time>{time}</time>
            </span>
          </p>
        )}
      </div>

      <div className="mt-16 grid items-center sm:mt-20 lg:mt-16 gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-16">
        <div>
          <h1 className="heading-display">
            <span className="stagger-item block" style={stagger(0)}>
              {line1}
            </span>
            <span className="stagger-item block text-muted" style={stagger(1)}>
              {line2}
            </span>
          </h1>

          <p className="body-copy stagger-item mt-7" style={stagger(2)}>
            {profile.heroIntro}
          </p>

          <p
            className="stagger-item mt-6 inline-flex items-start gap-2.5 rounded-2xl bg-inset px-4 py-2 text-[13px] leading-relaxed text-ink/80"
            style={stagger(3)}
          >
            <StatusDot pulse className="mt-[7px]" />
            <span>{profile.availability.detail}</span>
          </p>

          <div className="stagger-item mt-10 flex flex-wrap gap-3" style={stagger(4)}>
            <Button href={`#${projectsId}`} variant="filled">
              {profile.heroPrimaryCta}
              <FiArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:animate-bounce motion-reduce:animate-none"
                strokeWidth={1.75}
              />
            </Button>
            <Button href={profile.resumeUrl} variant="outline" download>
              Download Resume
              <FiDownload
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={1.75}
              />
            </Button>
          </div>

          <ul className="stagger-item mt-10 flex items-center gap-1" style={stagger(5)} aria-label="Profiles">
            {profile.socials.map(({ label, href, icon: Icon }) => {
              const external = href.startsWith('http');
              return (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group -ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-[color,background-color,transform] duration-200 hover:-translate-y-1 hover:bg-ink/5 hover:text-ink focus-visible:rounded-full motion-reduce:transform-none"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-rotate-[8deg] group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop portrait: gently floats, tilts toward you on hover */}
        {profile.avatar && (
          <div className="stagger-item hidden lg:block" style={stagger(2)}>
            <div className="animate-float motion-reduce:animate-none">
              <div className="group relative transition-transform duration-500 ease-out hover:-rotate-2 hover:scale-[1.03] motion-reduce:transform-none">
                {/* Offset outline frame behind the photo */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-[24px] border border-ink/15 transition-transform duration-500 ease-out group-hover:translate-x-5 group-hover:translate-y-5"
                />
                <picture>
                  <source type="image/avif" srcSet={avif(profile.avatar, 400)} />
                  <source type="image/webp" srcSet={webp(profile.avatar, 400)} />
                  <img
                    src={profile.avatar}
                    alt={`Portrait of ${profile.name}`}
                    width={400}
                    height={400}
                    decoding="async"
                    // Above the fold on desktop: fetch it first.
                    {...HIGH_PRIORITY}
                    className="relative aspect-[4/5] w-full rounded-[24px] bg-inset object-cover object-top"
                  />
                </picture>
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-xs font-medium text-ink">
                  <StatusDot pulse />
                  {profile.availability.short}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

interface AvatarProps {
  src?: string;
  className?: string;
}

function Avatar({ src, className = '' }: AvatarProps) {
  if (!src) return <span aria-hidden="true" className={`shrink-0 rounded-full bg-inset ${className}`} />;
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={webp(src, 96)} />
      <img
        src={src}
        alt=""
        width={44}
        height={44}
        // Hidden on desktop; lazy means it's skipped there instead of downloaded.
        loading="lazy"
        decoding="async"
        className={`shrink-0 rounded-full bg-inset object-cover ${className}`}
      />
    </picture>
  );
}
