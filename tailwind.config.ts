import type { Config } from 'tailwindcss';

/**
 * Every colour is declared as an `R G B` triple in globals.css so a single
 * palette can drive both "dark scientific" and "light notebook" themes without
 * duplicating utility classes. `<alpha-value>` keeps `/50` opacity modifiers working.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Named `page`, not `base`: a colour called `base` would generate a
        // `.text-base` utility that collides with Tailwind's own font-size
        // utility of the same name, silently recolouring body text.
        page: token('bg'),
        surface: {
          DEFAULT: token('surface'),
          raised: token('surface-2'),
          sunken: token('surface-0'),
        },
        line: token('border'),
        ink: {
          DEFAULT: token('text'),
          muted: token('muted'),
          faint: token('faint'),
        },
        accent: token('accent'),
        physics: token('physics'),
        chemistry: token('chemistry'),
        biology: token('biology'),
        ict: token('ict'),
        maths: token('maths'),
        'add-maths': token('add-maths'),
        'intl-maths': token('intl-maths'),
        positive: token('positive'),
        caution: token('caution'),
        negative: token('negative'),
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        hand: ['var(--font-hand)'],
        display: ['var(--font-display)'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        card: '1rem',
        panel: '1.5rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--accent) / 0.25), 0 8px 40px -12px rgb(var(--accent) / 0.45)',
        /**
         * Real light falls off in layers, so these stack a tight contact shadow
         * under a wide ambient one. A single large blur is the flat, "default
         * bootstrap" look; the top inset line is the highlight catching the edge.
         */
        panel:
          'inset 0 1px 0 0 rgb(var(--highlight) / var(--highlight-strength)), 0 1px 2px -1px rgb(var(--shadow) / 0.28), 0 8px 24px -12px rgb(var(--shadow) / 0.35)',
        lift:
          'inset 0 1px 0 0 rgb(var(--highlight) / var(--highlight-strength)), 0 2px 4px -2px rgb(var(--shadow) / 0.3), 0 24px 56px -20px rgb(var(--shadow) / 0.5)',
        float:
          'inset 0 1px 0 0 rgb(var(--highlight) / var(--highlight-strength)), 0 4px 8px -4px rgb(var(--shadow) / 0.32), 0 40px 80px -24px rgb(var(--shadow) / 0.6)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgb(var(--border) / 0.55) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border) / 0.55) 1px, transparent 1px)',
        ruled: 'linear-gradient(rgb(var(--border) / 0.8) 1px, transparent 1px)',
        'accent-sheen':
          'linear-gradient(135deg, rgb(var(--physics) / 0.9), rgb(var(--accent) / 0.85) 45%, rgb(var(--chemistry) / 0.9))',
      },
      backgroundSize: {
        // Distinct from the backgroundImage keys above, for the same reason.
        'grid-cell': '44px 44px',
        'ruled-line': '100% 2rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'draw-in': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 1.6s infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 5s ease-in-out infinite',
        'draw-in': 'draw-in 1.6s ease-out forwards',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
