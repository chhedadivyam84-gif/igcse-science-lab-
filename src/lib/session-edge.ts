import { jwtVerify } from 'jose';

/**
 * Edge-safe session reading.
 *
 * Middleware runs on the edge runtime, where Prisma and bcrypt cannot load, so
 * this deliberately duplicates only the token-verification half of lib/auth.ts
 * and imports nothing else.
 */

export const SESSION_COOKIE = 'isl_session';

export type EdgeSession = { id: string; role: 'STUDENT' | 'ADMIN'; owner: boolean };

export async function readSession(token: string | undefined): Promise<EdgeSession | null> {
  if (!token) return null;
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    if (!payload.sub) return null;

    // Ownership is decided by the email, not by the role claim, so revoking it
    // is a matter of editing OWNER_EMAIL — no session invalidation needed.
    const owner = ownerMatches(String(payload.email ?? ''));

    return { id: payload.sub, role: payload.role === 'ADMIN' ? 'ADMIN' : 'STUDENT', owner };
  } catch {
    return null;
  }
}

/** Duplicated from lib/owner.ts so middleware pulls in nothing server-only. */
function ownerMatches(email: string): boolean {
  const owner = process.env.OWNER_EMAIL?.trim().toLowerCase();
  if (!owner || !email) return false;
  return email.trim().toLowerCase() === owner;
}
