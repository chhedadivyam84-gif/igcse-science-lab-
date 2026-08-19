/**
 * Business identity and policy constants for the legal pages.
 *
 * Kept in one file on purpose: Terms, Privacy, Refunds and Contact all restate
 * the same operator details, and four copies that drift apart is exactly how a
 * legal page ends up contradicting itself. Change it here, everywhere follows.
 *
 * `PENDING` marks a value the operator must supply before these pages are
 * legally usable. The pages render a visible warning while any remain, rather
 * than quietly publishing a placeholder as if it were real — a policy that
 * states a false address is worse than one that admits it is incomplete.
 */

export const PENDING = 'PENDING' as const;

export const BUSINESS = {
  /** Registered or trading name of the operator. */
  legalName: PENDING,
  /** Public-facing product name. */
  productName: 'IGCSE Science Lab',
  /** Full postal address, required by the payment provider. */
  address: PENDING,
  /** Contact telephone, required by the payment provider. */
  phone: PENDING,
  /** Support mailbox students write to. */
  email: 'chhedadivyam84@gmail.com',
  /** Courts whose law governs the agreement. */
  jurisdiction: PENDING,
} as const;

/** Days after payment within which a refund may be requested. */
export const REFUND_WINDOW_DAYS = 7;

/** Shown as the "last updated" date on every policy. */
export const POLICY_UPDATED = '19 August 2026';

/** True when every required detail has been filled in. */
export function legalDetailsComplete(): boolean {
  return !Object.values(BUSINESS).includes(PENDING);
}

/** The detail keys still awaiting a real value. */
export function missingLegalDetails(): string[] {
  return Object.entries(BUSINESS)
    .filter(([, value]) => value === PENDING)
    .map(([key]) => key);
}
