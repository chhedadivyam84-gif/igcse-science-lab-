/**
 * Ownership.
 *
 * The admin panel belongs to exactly one person, identified by the email in
 * `OWNER_EMAIL`. This is deliberately NOT a database role: a role can be granted
 * — by a bug, a stray API call, or a future feature — whereas an env-pinned
 * email cannot be handed out from inside the running application.
 *
 * The `role` column still exists and still reads ADMIN for the owner, but it is
 * a reflection of ownership, never the thing that grants it.
 */

/** Normalised owner email, or null when none is configured. */
export function ownerEmail(): string | null {
  const value = process.env.OWNER_EMAIL?.trim().toLowerCase();
  return value ? value : null;
}

export function isOwnerEmail(email: string | null | undefined): boolean {
  const owner = ownerEmail();
  if (!owner || !email) return false;
  return email.trim().toLowerCase() === owner;
}

/**
 * True when the platform has no owner configured. The admin page uses this to
 * explain the situation rather than silently 404ing.
 */
export function ownerConfigured(): boolean {
  return ownerEmail() !== null;
}
