/**
 * Moves an account's trial end date, for testing the paywall.
 *
 *   npx tsx scripts/set-trial.ts student@example.com -1   # trial ended yesterday
 *   npx tsx scripts/set-trial.ts student@example.com 30   # 30 days left
 */
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const days = Number(process.argv[3] ?? 30);

  if (!email || !Number.isFinite(days)) {
    console.error('Usage: npx tsx scripts/set-trial.ts <email> <daysFromNow>');
    process.exit(1);
  }

  const trialEndsAt = new Date(Date.now() + days * 86_400_000);
  const user = await db.user.update({
    where: { email },
    data: { trialEndsAt, plan: days > 0 ? 'TRIAL' : 'FREE' },
    select: { email: true, plan: true, trialEndsAt: true },
  });

  console.log(`${user.email}: plan=${user.plan} trialEndsAt=${user.trialEndsAt?.toISOString()}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
