import type { Role } from '@purlo/casl';
import { and, eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { members } from '@/infra/database/schema/members';

interface UpdateMemberRoleUseCaseRequest {
  memberId: string;
  organizationId: string;
  role: Role;
}

export default async function updateMemberRoleUseCase({
  memberId,
  organizationId,
  role,
}: UpdateMemberRoleUseCaseRequest) {
  await db
    .update(members)
    .set({ role })
    .where(
      and(eq(members.id, memberId), eq(members.organizationId, organizationId))
    );
}
