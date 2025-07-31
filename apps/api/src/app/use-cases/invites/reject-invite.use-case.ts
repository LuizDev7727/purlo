import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { invites } from '@/infra/database/schema/invites';
import { users } from '@/infra/database/schema/users';

export type RejectInviteUseCaseRequest = {
  inviteId: string;
  userId: string;
};

export default async function rejectInviteUseCase(
  request: RejectInviteUseCaseRequest
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

  await db.delete(invites).where(eq(invites.id, invite.id));
} 