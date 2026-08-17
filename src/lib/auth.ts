import 'server-only';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { isOwnerEmail, ownerConfigured } from './owner';

export const SESSION_COOKIE = 'isl_session';
const SESSION_DAYS = 30;

export type Role = 'STUDENT' | 'ADMIN';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  /** True only for the single account named in OWNER_EMAIL. */
  owner: boolean;
};

function secret(): Uint8Array {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 24) {
    throw new Error(
      'AUTH_SECRET is missing or too short. Set a long random string in .env before starting the server.',
    );
  }
  return new TextEncoder().encode(value);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name, role: user.role, owner: user.owner })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
}

/** Edge-safe: uses only jose, so middleware can call it too. */
export async function readSessionToken(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub) return null;
    const email = String(payload.email ?? '');
    return {
      id: payload.sub,
      email,
      name: String(payload.name ?? ''),
      role: payload.role === 'ADMIN' ? 'ADMIN' : 'STUDENT',
      // Re-derived from the email rather than trusted from the claim, so
      // changing OWNER_EMAIL revokes access immediately without waiting for
      // existing sessions to expire.
      owner: isOwnerEmail(email),
    };
  } catch {
    return null;
  }
}

export async function startSession(user: SessionUser): Promise<void> {
  const token = await createSessionToken(user);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** The signed-in user, or null. Never throws — safe in layouts. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  return readSessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * The full user record. Reads the database so role changes and XP are always
 * current rather than whatever was true when the token was minted.
 */
export async function getCurrentUser() {
  const session = await getSessionUser();
  if (!session) return null;
  return db.user.findUnique({ where: { id: session.id } });
}

export class AuthError extends Error {
  constructor(
    message: string,
    readonly status: 401 | 403,
  ) {
    super(message);
  }
}

/** For API routes: throws AuthError, which handleRoute() turns into a 401/403. */
export async function requireUser(): Promise<SessionUser> {
  const session = await getSessionUser();
  if (!session) throw new AuthError('You need to sign in to use this feature.', 401);
  return session;
}

/**
 * Guards everything administrative.
 *
 * Checks the email on the *database row*, not the session claim, so a forged or
 * stale token cannot get through even if it somehow passed signature checks.
 */
export async function requireOwner(): Promise<SessionUser> {
  const session = await requireUser();

  if (!ownerConfigured()) {
    throw new AuthError(
      'No owner is configured for this installation. Set OWNER_EMAIL in .env.',
      403,
    );
  }

  const user = await db.user.findUnique({ where: { id: session.id }, select: { email: true } });
  if (!user || !isOwnerEmail(user.email)) {
    throw new AuthError('This area belongs to the platform owner.', 403);
  }

  return { ...session, owner: true, role: 'ADMIN' };
}

/**
 * Keeps the `role` column in step with ownership at sign-in, so the database is
 * never in a state where it disagrees with who can actually get in.
 */
export async function syncOwnerRole(userId: string, email: string): Promise<Role> {
  const shouldBeAdmin = isOwnerEmail(email);
  const desired: Role = shouldBeAdmin ? 'ADMIN' : 'STUDENT';

  const user = await db.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (!user) return desired;

  // Only touch the row when ownership and the stored role disagree.
  if (shouldBeAdmin && user.role !== 'ADMIN') {
    await db.user.update({ where: { id: userId }, data: { role: 'ADMIN' } });
    return 'ADMIN';
  }

  return user.role as Role;
}
