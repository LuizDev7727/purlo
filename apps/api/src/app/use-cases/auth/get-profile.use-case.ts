import { getFile } from '@purlo/cloudflare';
import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { users } from '@/infra/database/schema/users';

type GetProfileUseCaseRequest = {
  userId: string;
};

type GetProfileUseCaseResponse = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

export default async function getProfileUseCase(
  request: GetProfileUseCaseRequest
): Promise<GetProfileUseCaseResponse> {
  const { userId } = request;

  const [user] = await db
    .select({
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new Error('User not found');
  }

  let avatarUrl: string | null = null;

  if (user.avatarUrl !== null) {
    const url = await getFile(user.avatarUrl);
    avatarUrl = url;
  }

  const response = {
    ...user,
    avatarUrl,
  };

  return response;
}
