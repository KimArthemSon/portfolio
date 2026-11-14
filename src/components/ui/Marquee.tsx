import { useEffect, useRef } from 'react';
import { getTechIcon } from '../../data/techIcons';

interface MarqueeProps {
  items: string[];
  /** Cruising speed in pixels per second. */
  speed?: number;
}

/**
 * Continuously gliding strip of tech logos. Driven by requestAnimationFrame so it
 * moves at a steady pixel speed whatever the list length, and eases down to a slow
 * crawl on hover instead of stopping dead. Decorative (the Skills section has the
 * real content), so it is hidden from assistive tech. Stays still under
 * prefers-reduced-motion; the browser pauses it automatically in background tabs.
 */
export function Marquee({ items, speed = 55 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLUListElement>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!track || !copy) return;
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let frame = 0;
    let last = performance.now();
    let offset = 0;
    let current = speed;

    const tick = (now: number) => {
      // Clamp dt so returning to a background tab doesn't cause a big jump.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Ease toward the target speed: slow crawl on hover, full speed otherwise.
      const target = hoveredRef.current ? speed * 0.15 : speed;
      current += (target - current) * Math.min(1, dt * 4);

      // One copy's width is exactly one seamless loop.
      const loop = copy.offsetWidth;
      offset = (offset + current * dt) % loop;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  const row = (copy: number) => (
    <ul
      ref={copy === 0 ? copyRef : undefined}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
    >
      {items.map((name) => {
        const tech = getTechIcon(name);
        const Icon = tech?.icon;
        return (
          <li
            key={`${copy}-${name}`}
            className="group flex items-center gap-2.5 whitespace-nowrap text-sm text-muted transition-colors duration-300 hover:text-ink"
          >
            {Icon && (
              <Icon
                className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-125"
                style={tech.color ? { color: tech.color } : undefined}
              />
            )}
            {name}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      aria-hidden="true"
      className="rounded-card bg-surface py-6 sm:py-7"
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
    >
      <div className="marquee-mask overflow-hidden">
        <div ref={trackRef} className="flex w-max will-change-transform">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </div>
  );
}
