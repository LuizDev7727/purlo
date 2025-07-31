import { and, eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { members } from '@/infra/database/schema/members';

type RemoveMemberUseCaseRequest = {
  memberId: string;
  organizationId: string;
};

export default async function removeMemberUseCase(
  request: RemoveMemberUseCaseRequest
) {
  await db
    .delete(members)
    .where(
      and(
        eq(members.id, request.memberId),
        eq(members.organizationId, request.organizationId)
      )
    );
}
