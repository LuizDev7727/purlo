import type { Role } from '@purlo/casl';
import { asc, eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { members } from '@/infra/database/schema/members';
import { users } from '@/infra/database/schema/users';

type GetMembersUseCaseRequest = {
  organizationId: string;
};

type GetMembersUseCaseResponse = {
  id: string;
  userId: string;
  role: Role;
  name: string | null;
  email: string;
  avatarUrl: string | null;
}[];

export default async function getMembersUseCase({
  organizationId,
}: GetMembersUseCaseRequest): Promise<GetMembersUseCaseResponse> {
  const membersResult = await db
    .select({
      id: members.id,
      role: members.role,
      userId: users.id,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
    })
    .from(members)
    .innerJoin(users, eq(members.userId, users.id))
    .where(eq(members.organizationId, organizationId))
    .orderBy(asc(members.role));
  return membersResult;
}
