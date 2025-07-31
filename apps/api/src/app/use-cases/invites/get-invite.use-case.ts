import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { invites } from '@/infra/database/schema/invites';
import { users } from '@/infra/database/schema/users';
import { organizations } from '@/infra/database/schema/organizations';

export type GetInviteUseCaseRequest = {
  inviteId: string;
};

export type GetInviteUseCaseResponse = {
  invite: {
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
  };
};

export default async function getInviteUseCase(
  request: GetInviteUseCaseRequest
): Promise<GetInviteUseCaseResponse> {
  const { inviteId } = request;

  const [invite] = await db
    .select({
      id: invites.id,
      email: invites.email,
      role: invites.role,
      createdAt: invites.createdAt,
      authorId: invites.authorId,
      organizationId: invites.organizationId,
    })
    .from(invites)
    .where(eq(invites.id, inviteId));

  if (!invite) {
    throw new Error('Invite not found');
  }

  // Buscar dados do author
  let author: GetInviteUseCaseResponse['invite']['author'] = null;
  if (invite.authorId) {
    const [authorUser] = await db
      .select({
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
      })
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
    invite: {
      id: invite.id,
      role: invite.role,
      email: invite.email,
      createdAt: invite.createdAt,
      organization: { name: org?.name ?? '' },
      author,
    },
  };
} 