/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: 'rgb(var(--color-page) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        inset: 'rgb(var(--color-inset) / <alpha-value>)',
        accent: '#4ADE80',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '28px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'spin-in': {
          from: { transform: 'rotate(-120deg) scale(0.6)', opacity: '0' },
          to: { transform: 'rotate(0) scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0) scale(1.1)' },
          '25%': { transform: 'rotate(-14deg) scale(1.1)' },
          '75%': { transform: 'rotate(14deg) scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        'spin-in': 'spin-in 450ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        float: 'float 5s ease-in-out infinite',
        wiggle: 'wiggle 500ms ease-in-out',
      },
      fontSize: {
        display: ['clamp(2rem, 1.4rem + 2.6vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};
