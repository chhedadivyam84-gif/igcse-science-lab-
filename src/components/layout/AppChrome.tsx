'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Assistant } from '@/components/assistant/Assistant';
import { GlobalSearch } from './GlobalSearch';
import { MobileNav } from './MobileNav';
import { TopNav, type NavUser } from './TopNav';

/** Owns the search-palette state so both the nav and the ⌘K shortcut can open it. */
export function AppChrome({ user, children }: { user: NavUser; children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <TopNav user={user} onOpenSearch={() => setSearchOpen(true)} />
      {/* Bottom padding clears the mobile nav bar. */}
      <main className="min-h-[calc(100vh-3.5rem)] pb-20 lg:pb-0">{children}</main>
      <MobileNav user={user} />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      {/* Signed-out visitors get the marketing site without a launcher they
          cannot use — the assistant needs an account and a plan. */}
      {user && <Assistant />}
    </>
  );
}
