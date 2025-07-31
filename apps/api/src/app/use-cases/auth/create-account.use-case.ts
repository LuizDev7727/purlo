import { hashSync } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { users } from '@/infra/database/schema/users';

type CreateAccountUseCaseRequest = {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

type CreateAccountUseCaseResponse = {
  sub: string;
};

export default async function createAccountUseCase(
  request: CreateAccountUseCaseRequest
): Promise<CreateAccountUseCaseResponse> {
  const { name, email, password, avatarUrl } = request;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (user) {
    throw new Error('User already registred.');
  }

  const passwordHashed = hashSync(password, 10);

  const [{ insertedId }] = await db
    .insert(users)
    .values({
      name,
      email,
      password: passwordHashed,
      avatarUrl,
    })
    .returning({ insertedId: users.id });

  return {
    sub: insertedId,
  };
}
