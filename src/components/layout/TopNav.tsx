'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, Search, ShieldCheck, User } from 'lucide-react';
import { PRIMARY_NAV, SECONDARY_NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme';
import { NavIcon } from './icons';
import { Button, LinkButton } from '@/components/ui';

export type NavUser = {
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
  /** Only the OWNER_EMAIL account sees the owner console link. */
  owner: boolean;
} | null;

export function TopNav({ user, onOpenSearch }: { user: NavUser; onOpenSearch: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click or Escape.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) setMoreOpen(false);
      if (userRef.current && !userRef.current.contains(event.target as Node)) setUserOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        setUserOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    setMoreOpen(false);
    setUserOpen(false);
  }, [pathname]);

  const visiblePrimary = PRIMARY_NAV.filter((item) => !item.requiresAuth || user);

  async function signOut() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="IGCSE Science Lab home">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-accent-sheen">
            <span className="h-2.5 w-2.5 rounded-full bg-page" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-ink sm:block">
            IGCSE Science Lab
          </span>
        </Link>

        {/* The inline nav needs lg: at exactly 768px it and the search control
            together overflow the bar, so tablets keep the bottom bar instead. */}
        <nav className="ml-2 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {visiblePrimary.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm transition-colors',
                  active ? 'bg-surface-raised font-medium text-ink' : 'text-ink-muted hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              Tools
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', moreOpen && 'rotate-180')} />
            </button>

            {moreOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full z-50 mt-2 w-[30rem] rounded-panel border border-line bg-surface p-2 shadow-lift animate-fade-up"
              >
                <div className="grid grid-cols-2 gap-0.5">
                  {SECONDARY_NAV.filter((item) => !item.requiresAuth || user).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="flex items-start gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-surface-raised"
                    >
                      <NavIcon name={item.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-ink">{item.label}</span>
                        <span className="block text-xs text-ink-muted">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-sm text-ink-faint transition-colors hover:text-ink-muted sm:w-44 sm:justify-between lg:w-56"
            aria-label="Search everything"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </span>
            <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-2xs sm:inline">⌘K</kbd>
          </button>

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {user ? (
            <div className="relative" ref={userRef}>
              <button
                type="button"
                onClick={() => setUserOpen((open) => !open)}
                aria-expanded={userOpen}
                aria-haspopup="menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold text-ink transition-colors hover:bg-surface-raised"
              >
                {user.name.slice(0, 1).toUpperCase()}
                <span className="sr-only">Account menu</span>
              </button>

              {userOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-60 rounded-card border border-line bg-surface p-1.5 shadow-lift animate-fade-up"
                >
                  <div className="border-b border-line px-2.5 pb-2.5 pt-1.5">
                    <p className="truncate text-sm font-medium text-ink">{user.name}</p>
                    <p className="truncate text-xs text-ink-muted">{user.email}</p>
                  </div>
                  <Link
                    href="/progress"
                    role="menuitem"
                    className="mt-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-ink-muted hover:bg-surface-raised hover:text-ink"
                  >
                    <User className="h-4 w-4" /> Your progress
                  </Link>
                  {user.owner && (
                    <Link
                      href="/admin"
                      role="menuitem"
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-ink-muted hover:bg-surface-raised hover:text-ink"
                    >
                      <ShieldCheck className="h-4 w-4" /> Owner console
                    </Link>
                  )}
                  <div className="my-1 h-px bg-line" />
                  <div className="px-2.5 py-1.5 sm:hidden">
                    <ThemeToggle compact />
                  </div>
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
                    <LogOut className="h-4 w-4" /> Sign out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LinkButton href="/signin" variant="ghost" size="sm" className="hidden sm:inline-flex">
                Sign in
              </LinkButton>
              <LinkButton href="/signup" variant="primary" size="sm">
                Get started
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
