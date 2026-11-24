'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutGrid, X } from 'lucide-react';
import { PRIMARY_NAV, SECONDARY_NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { NavIcon } from './icons';
import type { NavUser } from './TopNav';

/**
 * Bottom bar for phones: four main destinations plus a Tools button that
 * opens a sheet with everything else. Without it, the desktop-only Tools menu
 * left Notes, Explainers, Flashcards, Papers and the calculators unreachable
 * on a phone.
 */
export function MobileNav({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const primary = PRIMARY_NAV.filter((item) => item.mobile && (!item.requiresAuth || user));
  const bar = primary.slice(0, 4);
  const sheet = [...primary.slice(4), ...SECONDARY_NAV].filter((item) => !item.requiresAuth || user);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const toolActive = sheet.some((item) => isActive(item.href));

  // Close the sheet on navigation and lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Tools">
          <button type="button" aria-label="Close tools" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div
            className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-line bg-surface p-4 shadow-lift animate-fade-up"
            style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line" />
            <div className="mb-3 flex items-center justify-between">
              <p className="text-base font-semibold text-ink">Tools</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 text-ink-muted hover:bg-surface-raised">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {sheet.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'flex h-full flex-col gap-2 rounded-2xl border p-3 transition-colors',
                      isActive(item.href) ? 'border-accent/50 bg-accent/10' : 'border-line bg-surface-raised/40 active:bg-surface-raised',
                    )}
                  >
                    <NavIcon name={item.icon} className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium leading-tight text-ink">{item.label}</span>
                    <span className="text-xs leading-snug text-ink-muted">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-page/95 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="flex">
          {bar.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center gap-1 py-2.5 text-[0.6875rem] transition-colors',
                    active ? 'text-accent' : 'text-ink-faint',
                  )}
                >
                  <NavIcon name={item.icon} className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className={cn(
                'flex w-full flex-col items-center gap-1 py-2.5 text-[0.6875rem] transition-colors',
                toolActive || open ? 'text-accent' : 'text-ink-faint',
              )}
            >
              <LayoutGrid className="h-5 w-5" />
              Tools
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
