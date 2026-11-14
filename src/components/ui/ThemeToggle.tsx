import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../types';

const icons: Record<Theme, IconType> = { system: FiMonitor, light: FiSun, dark: FiMoon };
const next: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' };

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, cycleTheme } = useTheme();
  const Icon = icons[theme];

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Theme: ${theme}. Switch to ${next[theme]}.`}
      title={`Theme: ${theme}`}
      className={`group inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:rounded-full ${className}`}
    >
      {/* key re-mounts the icon on each change so it spins in */}
      <Icon
        key={theme}
        aria-hidden="true"
        className="h-[15px] w-[15px] animate-spin-in transition-transform duration-300 group-hover:rotate-45 motion-reduce:animate-none"
        strokeWidth={1.75}
      />
    </button>
  );
}
