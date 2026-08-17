import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireOwner } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const schema = z.object({
  entityType: z.enum(['question', 'lesson', 'formula', 'definition', 'objective']),
  entityId: z.string(),
  status: z.enum(['APPROVED', 'REJECTED']),
  notes: z.string().max(1000).optional(),
});

/**
 * Approves or rejects generated content.
 *
 * Only APPROVED questions are served by the practice engine, so this is the
 * gate between "the model wrote something" and "a student is taught it".
 */
export const POST = handleRoute('admin/review', async (request) => {
  const admin = await requireOwner();
  const body = await parseBody(request, schema);

  if (body.entityType === 'question') {
    const question = await db.question.findUnique({ where: { id: body.entityId } });
    if (!question) return fail('Question not found.', 404);
    await db.question.update({
      where: { id: body.entityId },
      data: { reviewStatus: body.status },
    });
  } else if (body.entityType === 'lesson') {
    const lesson = await db.lesson.findUnique({ where: { id: body.entityId } });
    if (!lesson) return fail('Lesson not found.', 404);
    await db.lesson.update({
      where: { id: body.entityId },
      data: { status: body.status === 'APPROVED' ? 'PUBLISHED' : 'DRAFT' },
    });
  } else if (body.entityType === 'formula') {
    await db.formula.update({
      where: { id: body.entityId },
      data: { verified: body.status === 'APPROVED' },
    });
  } else if (body.entityType === 'definition') {
    await db.definition.update({
      where: { id: body.entityId },
      data: { verified: body.status === 'APPROVED' },
    });
  } else {
    await db.learningObjective.update({
      where: { id: body.entityId },
      data: { verified: body.status === 'APPROVED' },
    });
  }

  const existing = await db.contentReview.findFirst({
    where: { entityType: body.entityType, entityId: body.entityId },
  });

  if (existing) {
    await db.contentReview.update({
      where: { id: existing.id },
      data: { status: body.status, notes: body.notes ?? null, reviewerId: admin.id },
    });
  } else {
    await db.contentReview.create({
      data: {
        entityType: body.entityType,
        entityId: body.entityId,
        status: body.status,
        notes: body.notes ?? null,
        reviewerId: admin.id,
      },
    });
  }

  return ok({ ok: true, status: body.status });
});
