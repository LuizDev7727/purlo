import { eq, and } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { invites } from '@/infra/database/schema/invites';
import { members } from '@/infra/database/schema/members';
import { users } from '@/infra/database/schema/users';

export type CreateInviteUseCaseRequest = {
  organizationId: string;
  email: string;
  role: 'ADMIN' | 'MEMBER' | 'BILLING';
  authorId: string;
  organizationDomain?: string | null;
  shouldAttachUsersByDomain?: boolean;
};

export type CreateInviteUseCaseResponse = {
  inviteId: string;
};

export default async function createInviteUseCase(
  request: CreateInviteUseCaseRequest
): Promise<CreateInviteUseCaseResponse> {
  const { organizationId, email, role, authorId, organizationDomain, shouldAttachUsersByDomain } = request;

  const [, domain] = email.split('@');

  if (shouldAttachUsersByDomain && organizationDomain && domain === organizationDomain) {
    throw new Error(`Users with '${domain}' domain will join your organization automatically on login.`);
  }

  // Checar se já existe invite para o mesmo email/organization
  const [inviteWithSameEmail] = await db
    .select()
    .from(invites)
    .where(and(eq(invites.email, email), eq(invites.organizationId, organizationId)));

  if (inviteWithSameEmail) {
    throw new Error('Another invite with same e-mail already exists.');
  }

  // Checar se já existe membro com o mesmo email
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (user) {
    const [memberWithSameEmail] = await db
      .select()
      .from(members)
      .where(and(eq(members.organizationId, organizationId), eq(members.userId, user.id)));
    if (memberWithSameEmail) {
      throw new Error('A member with this e-mail already belongs to your organization.');
    }
  }

  // Criar o invite
  const [{ id: inviteId }] = await db
    .insert(invites)
    .values({
      organizationId,
      email,
      role,
      authorId,
    })
    .returning({ id: invites.id });

  return { inviteId };
} 