import { eq, desc } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { invites } from '@/infra/database/schema/invites';
import { users } from '@/infra/database/schema/users';

export type GetInvitesUseCaseRequest = {
  organizationId: string;
};

export type GetInvitesUseCaseResponse = {
  invites: Array<{
    id: string;
    role: string;
    email: string;
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
    } | null;
  }>;
};

export default async function getInvitesUseCase(
  request: GetInvitesUseCaseRequest
): Promise<GetInvitesUseCaseResponse> {
  const { organizationId } = request;

  const rows = await db
    .select({
      id: invites.id,
      email: invites.email,
      role: invites.role,
      createdAt: invites.createdAt,
      authorId: invites.authorId,
    })
    .from(invites)
    .where(eq(invites.organizationId, organizationId))
    .orderBy(desc(invites.createdAt));

  const invitesList = await Promise.all(
    rows.map(async (invite) => {
      let author: { id: string; name: string | null } | null = null;
      if (invite.authorId) {
        const [authorUser] = await db
          .select({ id: users.id, name: users.name })
          .from(users)
          .where(eq(users.id, invite.authorId));
        if (authorUser) {
          author = { id: authorUser.id, name: authorUser.name };
        }
      }
      return {
        id: invite.id,
        role: invite.role,
        email: invite.email,
        createdAt: invite.createdAt,
        author,
      };
    })
  );

  return { invites: invitesList };
} 