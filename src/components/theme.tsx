'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ThemeChoice = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'isl-theme';

/**
 * Runs before paint so the correct theme is applied on the first frame.
 * Kept as a string because it has to be inlined into <head>.
 */
export const themeScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}')||'system';var d=s==='dark'||(s==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

type ThemeContextValue = {
  choice: ThemeChoice;
  resolved: 'light' | 'dark';
  setChoice: (choice: ThemeChoice) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>('system');
  const [resolved, setResolved] = useState<'light' | 'dark'>('dark');

  const apply = useCallback((next: ThemeChoice) => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = next === 'dark' || (next === 'system' && prefersDark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    setResolved(dark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as ThemeChoice | null) ?? 'system';
    setChoiceState(stored);
    apply(stored);

    // Follow the OS while the choice is "system".
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if ((localStorage.getItem(STORAGE_KEY) as ThemeChoice | null) !== 'system') return;
      apply('system');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [apply]);

  const setChoice = useCallback(
    (next: ThemeChoice) => {
      localStorage.setItem(STORAGE_KEY, next);
      setChoiceState(next);
      apply(next);
    },
    [apply],
  );

  return <ThemeContext.Provider value={{ choice, resolved, setChoice }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}

const OPTIONS: { value: ThemeChoice; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light notebook', Icon: Sun },
  { value: 'dark', label: 'Dark scientific', Icon: Moon },
  { value: 'system', label: 'Match system', Icon: Monitor },
];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { choice, setChoice } = useTheme();

  return (
    <div
      className={cn('inline-flex items-center gap-0.5 rounded-full border border-line bg-surface p-0.5', compact && 'scale-95')}
      role="radiogroup"
      aria-label="Colour theme"
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={choice === value}
          title={label}
          onClick={() => setChoice(value)}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-full transition-colors',
            choice === value ? 'bg-surface-raised text-ink' : 'text-ink-faint hover:text-ink-muted',
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
}
