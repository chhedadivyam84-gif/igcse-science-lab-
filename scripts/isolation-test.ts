import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
const MARKER = `isolation-test-${process.argv[2]}`;
async function main(){
  const mode = process.argv[3];
  if (mode === 'write') {
    await db.paymentEvent.create({ data: { provider: 'test', eventId: MARKER, eventType: 'isolation.check', payload: '{}' } });
    console.log('wrote marker to this database');
  } else if (mode === 'check') {
    const found = await db.paymentEvent.findUnique({ where: { eventId: MARKER } });
    console.log(found ? 'MARKER PRESENT' : 'MARKER ABSENT');
  } else if (mode === 'clean') {
    const r = await db.paymentEvent.deleteMany({ where: { eventId: MARKER } });
    console.log('removed', r.count, 'test row(s)');
  }
  await db.$disconnect();
}
main();
