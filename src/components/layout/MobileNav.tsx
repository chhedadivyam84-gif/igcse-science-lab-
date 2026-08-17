'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { NavIcon } from './icons';
import type { NavUser } from './TopNav';

/** Bottom bar for phones. Five destinations, thumb-reachable, safe-area aware. */
export function MobileNav({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const items = PRIMARY_NAV.filter((item) => item.mobile && (!item.requiresAuth || user)).slice(0, 5);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-page/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
      </ul>
    </nav>
  );
}
