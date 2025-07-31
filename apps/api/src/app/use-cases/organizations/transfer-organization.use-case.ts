import { and, eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { members } from '@/infra/database/schema/members';
import { organizations } from '@/infra/database/schema/organizations';

export type TransferOrganizationUseCaseRequest = {
  organizationId: string;
  transferToUserId: string;
};

export default async function transferOrganizationUseCase(
  request: TransferOrganizationUseCaseRequest
): Promise<void> {
  const { organizationId, transferToUserId } = request;

  // Checar se o usuário destino é membro da organização
  const [transferMembership] = await db
    .select()
    .from(members)
    .where(
      and(
        eq(members.organizationId, organizationId),
        eq(members.userId, transferToUserId)
      )
    );

  if (!transferMembership) {
    throw new Error('Target user is not a member of this organization.');
  }

  await db.transaction(async (tx) => {
    await tx
      .update(members)
      .set({ role: 'ADMIN' })
      .where(
        and(
          eq(members.organizationId, organizationId),
          eq(members.userId, transferToUserId)
        )
      );
    await tx
      .update(organizations)
      .set({ ownerId: transferToUserId })
      .where(eq(organizations.id, organizationId));
  });
}
