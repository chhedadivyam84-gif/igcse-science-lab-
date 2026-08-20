/**
 * Stops development work from reaching the production database.
 *
 * This is not hypothetical: local work once ran against the live Neon database
 * because `.env` was pointed there to get the app running. Reads were harmless,
 * but one seed or one careless delete would not have been, and nothing in the
 * setup would have objected.
 *
 * Deliberately narrow — it only fires outside production, so the deployed app
 * is unaffected — and it can be overridden with `ALLOW_PRODUCTION_DB=1` for the
 * rare occasion when running a migration or a seed against production really is
 * the intent. Making that explicit is the point: it should be a decision, never
 * an accident.
 *
 * Kept free of imports so the seed script and the maintenance scripts, which
 * build their own Prisma client, can all call it.
 */
export function assertNotProductionDatabase(): void {
  if (process.env.NODE_ENV === 'production') return;
  if (process.env.ALLOW_PRODUCTION_DB === '1') return;

  const url = process.env.DATABASE_URL ?? '';
  const host = process.env.PRODUCTION_DB_HOST?.trim();
  if (!host || !url.includes(host)) return;

  throw new Error(
    [
      'Refusing to run: DATABASE_URL points at the production database.',
      '',
      `The host "${host}" is listed in PRODUCTION_DB_HOST, and NODE_ENV is not "production".`,
      'Point DATABASE_URL at a development database instead — see .env.example.',
      '',
      'If you genuinely mean to act on production (a migration or a seed), set',
      'ALLOW_PRODUCTION_DB=1 for that single command:',
      '  ALLOW_PRODUCTION_DB=1 npx tsx prisma/seed.ts',
    ].join('\n'),
  );
}
