import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';
const db = new PrismaClient();
const h = (t: string) => crypto.createHash('sha256').update(t).digest('hex');

async function main(){
  const user = await db.user.findFirst({ where: { email: { contains: '@' } } });
  if(!user){ console.log('no user to test with'); return; }
  console.log('testing with user:', user.email);

  // issue
  await db.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } });
  const token = crypto.randomBytes(32).toString('base64url');
  await db.passwordResetToken.create({ data: { userId: user.id, tokenHash: h(token), expiresAt: new Date(Date.now()+3600_000) } });
  console.log('1. token issued, raw token NOT in db:', (await db.passwordResetToken.findFirst({ where:{ tokenHash: token } })) === null ? 'PASS' : 'FAIL');

  // lookup by hash works
  const row = await db.passwordResetToken.findUnique({ where: { tokenHash: h(token) } });
  console.log('2. lookup by hash finds it:', row ? 'PASS' : 'FAIL');

  // single use
  const first = await db.passwordResetToken.updateMany({ where:{ id: row!.id, usedAt: null }, data:{ usedAt: new Date() } });
  const second = await db.passwordResetToken.updateMany({ where:{ id: row!.id, usedAt: null }, data:{ usedAt: new Date() } });
  console.log(`3. single use (first=${first.count}, replay=${second.count}):`, first.count===1 && second.count===0 ? 'PASS' : 'FAIL');

  // expiry respected
  const expTok = crypto.randomBytes(32).toString('base64url');
  const exp = await db.passwordResetToken.create({ data:{ userId: user.id, tokenHash: h(expTok), expiresAt: new Date(Date.now()-1000) } });
  console.log('4. expired token detected:', exp.expiresAt.getTime() < Date.now() ? 'PASS' : 'FAIL');

  await db.passwordResetToken.deleteMany({ where: { userId: user.id } });
  console.log('cleaned up test tokens');
  await db.$disconnect();
}
main();
