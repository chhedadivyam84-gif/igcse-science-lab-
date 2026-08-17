import { z } from 'zod';
import { db } from '@/lib/db';
import { fail, handleRoute, ok, parseBody } from '@/lib/api';
import { requireOwner } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const schema = z.object({
  versionId: z.string(),
  provenance: z.enum(['UNVERIFIED', 'TEACHER_MAPPED', 'OFFICIAL_CHECKED']).optional(),
  sourceNote: z.string().max(1000).optional(),
  isActive: z.boolean().optional(),
});

/**
 * Updates a syllabus version.
 *
 * Marking a version OFFICIAL_CHECKED is a claim that a person has compared it
 * against the published Cambridge specification, so it is deliberately an
 * explicit administrative action rather than something content generation can set.
 */
export const PATCH = handleRoute('admin/syllabus', async (request) => {
  await requireOwner();
  const body = await parseBody(request, schema);

  const version = await db.syllabusVersion.findUnique({ where: { id: body.versionId } });
  if (!version) return fail('Syllabus version not found.', 404);

  // Only one active version per subject, so activating one deactivates the rest.
  if (body.isActive) {
    await db.syllabusVersion.updateMany({
      where: { subjectId: version.subjectId },
      data: { isActive: false },
    });
  }

  const updated = await db.syllabusVersion.update({
    where: { id: body.versionId },
    data: {
      provenance: body.provenance ?? version.provenance,
      sourceNote: body.sourceNote ?? version.sourceNote,
      isActive: body.isActive ?? version.isActive,
    },
  });

  return ok({ ok: true, version: { id: updated.id, provenance: updated.provenance, isActive: updated.isActive } });
});
