'use client';

import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Button                                                                     */
/* -------------------------------------------------------------------------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'subject';
type ButtonSize = 'sm' | 'md' | 'lg';

const BUTTON_BASE =
  'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-[-0.01em] transition-all duration-200 ease-spring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985] whitespace-nowrap select-none';

/**
 * The primary button carries an inner top highlight and a real drop shadow, so
 * it reads as a raised physical control. A flat solid fill is the single most
 * common reason a UI looks unfinished.
 */
const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-page shadow-[inset_0_1px_0_0_rgb(255_255_255/0.18),0_1px_2px_-1px_rgb(var(--shadow)/0.4),0_8px_20px_-8px_rgb(var(--shadow)/0.5)] hover:brightness-110 hover:-translate-y-px active:translate-y-0 dark:bg-accent dark:text-[rgb(var(--surface-0))] dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.28),0_8px_24px_-10px_rgb(var(--accent)/0.7)]',
  secondary:
    'border border-line bg-surface text-ink shadow-[inset_0_1px_0_0_rgb(var(--highlight)/var(--highlight-strength))] hover:border-accent/40 hover:bg-surface-raised hover:-translate-y-px active:translate-y-0',
  ghost: 'text-ink-muted hover:bg-surface-raised hover:text-ink',
  danger:
    'bg-negative text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.2),0_8px_20px_-10px_rgb(var(--negative)/0.6)] hover:brightness-110',
  subject: 'text-white shadow-glow',
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[0.8125rem]',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-[0.9375rem]',
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', loading, className, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...props}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  );
});

export function LinkButton({
  href,
  variant = 'secondary',
  size = 'md',
  className,
  children,
  ...props
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  return (
    <Link
      href={href}
      className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <svg className={cn('animate-spin', className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Surfaces                                                                   */
/* -------------------------------------------------------------------------- */

export function Panel({
  className,
  children,
  as: Tag = 'div',
}: {
  className?: string;
  children: ReactNode;
  as?: 'div' | 'section' | 'article' | 'aside';
}) {
  return <Tag className={cn('panel p-5 sm:p-6', className)}>{children}</Tag>;
}

export function Card({
  className,
  children,
  interactive,
}: {
  className?: string;
  children: ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-card border border-line bg-surface p-4 shadow-[inset_0_1px_0_0_rgb(var(--highlight)/var(--highlight-strength))]',
        interactive && 'hover-lift hover:border-accent/40',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-5 flex flex-wrap items-end justify-between gap-3', className)}>
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h2 className="text-lg font-semibold text-ink sm:text-xl">{title}</h2>
        {description && <p className="mt-1 max-w-2xl text-sm text-ink-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Badge                                                                      */
/* -------------------------------------------------------------------------- */

type BadgeTone =
  | 'neutral'
  | 'accent'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'ict'
  | 'maths'
  | 'add-maths'
  | 'intl-maths'
  | 'positive'
  | 'caution'
  | 'negative';

const BADGE_TONES: Record<BadgeTone, string> = {
  neutral: 'border-line bg-surface-raised text-ink-muted',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  physics: 'border-physics/30 bg-physics/10 text-physics',
  chemistry: 'border-chemistry/30 bg-chemistry/10 text-chemistry',
  biology: 'border-biology/30 bg-biology/10 text-biology',
  ict: 'border-ict/30 bg-ict/10 text-ict',
  maths: 'border-maths/30 bg-maths/10 text-maths',
  'add-maths': 'border-add-maths/30 bg-add-maths/10 text-add-maths',
  'intl-maths': 'border-intl-maths/30 bg-intl-maths/10 text-intl-maths',
  positive: 'border-positive/30 bg-positive/10 text-positive',
  caution: 'border-caution/30 bg-caution/10 text-caution',
  negative: 'border-negative/30 bg-negative/10 text-negative',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
  icon,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wide',
        BADGE_TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Progress                                                                   */
/* -------------------------------------------------------------------------- */

export function ProgressBar({
  value,
  tone = 'accent',
  className,
  label,
}: {
  value: number;
  tone?: BadgeTone;
  className?: string;
  label?: string;
}) {
  const safe = Math.max(0, Math.min(100, Math.round(value)));
  const fill =
    tone === 'positive'
      ? 'bg-positive'
      : tone === 'caution'
        ? 'bg-caution'
        : tone === 'negative'
          ? 'bg-negative'
          : tone === 'physics'
            ? 'bg-physics'
            : tone === 'chemistry'
              ? 'bg-chemistry'
              : 'bg-accent';

  return (
    <div
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-surface-raised', className)}
      role="progressbar"
      aria-valuenow={safe}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-700 ease-spring', fill)}
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

export function ProgressRing({
  value,
  size = 88,
  strokeWidth = 7,
  tone = 'accent',
  children,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  tone?: BadgeTone;
  children?: ReactNode;
}) {
  const safe = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const colour =
    tone === 'physics'
      ? 'rgb(var(--physics))'
      : tone === 'chemistry'
        ? 'rgb(var(--chemistry))'
        : tone === 'positive'
          ? 'rgb(var(--positive))'
          : tone === 'caution'
            ? 'rgb(var(--caution))'
            : tone === 'negative'
              ? 'rgb(var(--negative))'
              : 'rgb(var(--accent))';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(var(--surface-2))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colour}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (safe / 100) * circumference}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Form fields                                                                */
/* -------------------------------------------------------------------------- */

const FIELD_BASE =
  'w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-60';

export function Label({ children, htmlFor, hint }: { children: ReactNode; htmlFor?: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
      {hint && <span className="ml-2 font-normal text-ink-faint">{hint}</span>}
    </label>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { error?: string }>(
  function Input({ className, error, ...props }, ref) {
    return (
      <>
        <input
          ref={ref}
          className={cn(FIELD_BASE, error && 'border-negative focus:border-negative focus:ring-negative/25', className)}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-negative">{error}</p>}
      </>
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }>(
  function Textarea({ className, error, ...props }, ref) {
    return (
      <>
        <textarea
          ref={ref}
          className={cn(FIELD_BASE, 'resize-y leading-relaxed', error && 'border-negative', className)}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-negative">{error}</p>}
      </>
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select ref={ref} className={cn(FIELD_BASE, 'cursor-pointer pr-8', className)} {...props}>
      {children}
    </select>
  );
});

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm text-ink-muted">{label}</span>
        <span className="font-mono text-sm font-medium text-ink">
          {format ? format(value) : value}
          {unit && <span className="ml-1 text-xs text-ink-faint">{unit}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-raised accent-[rgb(var(--accent))]"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-surface-raised', className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-[rgb(var(--surface))] to-transparent" />
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-panel border border-dashed border-line px-6 py-12 text-center', className)}>
      {icon && <div className="mb-3 text-ink-faint">{icon}</div>}
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm text-ink-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
  className,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn('rounded-card border border-negative/30 bg-negative/5 p-4', className)} role="alert">
      <p className="text-sm font-semibold text-negative">{title}</p>
      <p className="mt-1 text-sm text-ink-muted">{description}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export function Notice({
  tone = 'accent',
  title,
  children,
  className,
}: {
  tone?: 'accent' | 'caution' | 'positive' | 'neutral';
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    accent: 'border-accent/25 bg-accent/[0.06]',
    caution: 'border-caution/30 bg-caution/[0.07]',
    positive: 'border-positive/30 bg-positive/[0.07]',
    neutral: 'border-line bg-surface-raised',
  };
  return (
    <div className={cn('rounded-card border p-3.5 text-sm', tones[tone], className)}>
      {title && <p className="mb-1 font-semibold text-ink">{title}</p>}
      <div className="text-ink-muted [&_a]:text-accent [&_a]:underline">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stat                                                                       */
/* -------------------------------------------------------------------------- */

export function Stat({
  label,
  value,
  sub,
  tone = 'neutral',
  icon,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
}) {
  const accent =
    tone === 'physics'
      ? 'text-physics'
      : tone === 'chemistry'
        ? 'text-chemistry'
        : tone === 'positive'
          ? 'text-positive'
          : tone === 'caution'
            ? 'text-caution'
            : tone === 'negative'
              ? 'text-negative'
              : 'text-ink';

  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <div className="flex items-center gap-2">
        {icon && <span className="text-ink-faint">{icon}</span>}
        <p className="eyebrow">{label}</p>
      </div>
      <p className={cn('mt-2 text-2xl font-semibold tabular-nums', accent)}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-muted">{sub}</p>}
    </div>
  );
}
