import { and, eq } from 'drizzle-orm';
import { z } from 'zod/v4';
import { db } from '@/infra/database/client';
import { accounts } from '@/infra/database/schema/accounts';
import { users } from '@/infra/database/schema/users';

type AuthenticateWithGoogleUseCaseRequest = {
  code: string;
};

type AuthenticateWithGoogleUseCaseResponse = {
  sub: string;
};

export default async function authenticateWithGoogleUseCase(
  request: AuthenticateWithGoogleUseCaseRequest
): Promise<AuthenticateWithGoogleUseCaseResponse> {
  const { code } = request;

  const googleOauthUrl = new URL('https://oauth2.googleapis.com/token');

  googleOauthUrl.searchParams.set('client_id', 'env.GOOGLE_CLIENT_ID');
  googleOauthUrl.searchParams.set('client_secret', 'env.GOOGLE_CLIENT_SECRET');
  googleOauthUrl.searchParams.set('redirect_uri', 'env.GOOGLE_REDIRECT_URI');
  googleOauthUrl.searchParams.set('grant_type', 'authorization_code');
  googleOauthUrl.searchParams.set('code', code);

  const googleAccessTokenRequest = await fetch(googleOauthUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

  const googleAccessTokenResponse = await googleAccessTokenRequest.json();

  const { access_token: googleAccessToken } = z
    .object({
      access_token: z.string(),
      token_type: z.literal('Bearer'),
      scope: z.string(),
    })
    .parse(googleAccessTokenResponse);

  //use googleAccessToken to get channel informations like, name, email and etc.
  const googleYoutubeAccountDataRequest = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }
  );

  const googleYoutubeAccountBody = await googleYoutubeAccountDataRequest.json();

  const { sub, name, picture, email } = z
    .object({
      sub: z.string(),
      email: z.string(),
      name: z.string(),
      picture: z.string(),
    })
    .parse(googleYoutubeAccountBody);

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    await db.insert(users).values({
      name,
      email,
      avatarUrl: picture,
    });
  }

  const [account] = await db
    .select()
    .from(accounts)
    .where(and(eq(accounts.provider, 'GOOGLE'), eq(accounts.userId, user.id)));

  if (!account) {
    await db.insert(accounts).values({
      provider: 'GOOGLE',
      providerAccountId: sub,
      userId: user.id,
    });
  }

  return {
    sub: user.id,
  };
}
