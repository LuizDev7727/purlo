import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { users } from '@/infra/database/schema/users';

type AuthenticateWithCredentialsUseCaseRequest = {
  email: string;
  password: string;
};

type AuthenticateWithCredentialsUseCaseResponse = {
  sub: string;
};

export default async function authenticateWithCredentialsUseCase(
  request: AuthenticateWithCredentialsUseCaseRequest
): Promise<AuthenticateWithCredentialsUseCaseResponse> {
  const { email, password } = request;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new Error('Invalid Credentials.');
  }

  if (user.password === null) {
    throw new Error('User does not have a password, use social login.');
  }

  const isSamePassword = compare(password, user.password);

  if (!isSamePassword) {
    throw new Error('Invalid Credentials.');
  }

  return {
    sub: user.id,
  };
}
