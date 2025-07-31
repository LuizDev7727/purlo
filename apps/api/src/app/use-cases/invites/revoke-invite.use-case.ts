import { eq, and } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { invites } from '@/infra/database/schema/invites';

export type RevokeInviteUseCaseRequest = {
  inviteId: string;
  organizationId: string;
};

export default async function revokeInviteUseCase(
  request: RevokeInviteUseCaseRequest
): Promise<void> {
  const { inviteId, organizationId } = request;

  const [invite] = await db
    .select()
    .from(invites)
    .where(and(eq(invites.id, inviteId), eq(invites.organizationId, organizationId)));

  if (!invite) {
    throw new Error('Invite not found.');
  }

  await db.delete(invites).where(eq(invites.id, inviteId));
} 