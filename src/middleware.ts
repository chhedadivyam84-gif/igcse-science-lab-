import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, readSession } from '@/lib/session-edge';

/**
 * Route protection.
 *
 * Pages also check their own access, so this is defence in depth rather than
 * the only guard — but it means an unauthenticated request never reaches a
 * database query, and redirects land somewhere useful.
 */

const STUDENT_ROUTES = [
  '/dashboard',
  '/tutor',
  '/explain',
  '/notes',
  '/diagrams',
  '/explainer',
  '/practice',
  '/exam',
  '/flashcards',
  '/progress',
  '/mistakes',
  '/plan',
  '/photo',
];

const ADMIN_ROUTES = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsAuth = STUDENT_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const needsOwner = ADMIN_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  if (!needsAuth && !needsOwner) return NextResponse.next();

  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    // Preserve where they were heading so sign-in can return them there later.
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // Admin is owner-only: being ADMIN in the database is not sufficient.
  if (needsOwner && !session.owner) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and API routes — the routes do their own auth.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
