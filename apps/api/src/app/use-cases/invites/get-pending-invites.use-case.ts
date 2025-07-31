import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { invites } from '@/infra/database/schema/invites';
import { users } from '@/infra/database/schema/users';
import { organizations } from '@/infra/database/schema/organizations';

export type GetPendingInvitesUseCaseRequest = {
  userId: string;
};

export type GetPendingInvitesUseCaseResponse = {
  invites: Array<{
    id: string;
    role: string;
    email: string;
    createdAt: Date;
    organization: {
      name: string;
    };
    author: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    } | null;
  }>;
};

export default async function getPendingInvitesUseCase(
  request: GetPendingInvitesUseCaseRequest
): Promise<GetPendingInvitesUseCaseResponse> {
  const { userId } = request;

  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (!user) {
    throw new Error('User not found.');
  }

  const rows = await db
    .select({
      id: invites.id,
      email: invites.email,
      role: invites.role,
      createdAt: invites.createdAt,
      authorId: invites.authorId,
      organizationId: invites.organizationId,
    })
    .from(invites)
    .where(eq(invites.email, user.email));

  const invitesList = await Promise.all(
    rows.map(async (invite) => {
      // Buscar dados do author
      let author: { id: string; name: string | null; avatarUrl: string | null } | null = null;
      if (invite.authorId) {
        const [authorUser] = await db
          .select({ id: users.id, name: users.name, avatarUrl: users.avatarUrl })
          .from(users)
          .where(eq(users.id, invite.authorId));
        if (authorUser) {
          author = {
            id: authorUser.id,
            name: authorUser.name,
            avatarUrl: authorUser.avatarUrl ?? null,
          };
        }
      }
      // Buscar dados da organização
      const [org] = await db
        .select({ name: organizations.name })
        .from(organizations)
        .where(eq(organizations.id, invite.organizationId));
      return {
        id: invite.id,
        role: invite.role,
        email: invite.email,
        createdAt: invite.createdAt,
        organization: { name: org?.name ?? '' },
        author,
      };
    })
  );

  return { invites: invitesList };
} 