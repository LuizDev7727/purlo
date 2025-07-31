import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { invites } from '@/infra/database/schema/invites';
import { members } from '@/infra/database/schema/members';
import { users } from '@/infra/database/schema/users';

export type AcceptInviteUseCaseRequest = {
  inviteId: string;
  userId: string;
};

export default async function acceptInviteUseCase(
  request: AcceptInviteUseCaseRequest
): Promise<void> {
  const { inviteId, userId } = request;

  const [invite] = await db.select().from(invites).where(eq(invites.id, inviteId));
  if (!invite) {
    throw new Error('Invite not found or expired.');
  }

  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (!user) {
    throw new Error('User not found.');
  }

  if (invite.email !== user.email) {
    throw new Error('This invite belongs to another user.');
  }

  await db.transaction(async (tx) => {
    await tx.insert(members).values({
      userId,
      organizationId: invite.organizationId,
      role: invite.role,
    });
    await tx.delete(invites).where(eq(invites.id, invite.id));
  });
} 