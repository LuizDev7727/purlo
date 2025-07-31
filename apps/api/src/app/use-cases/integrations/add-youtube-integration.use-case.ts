import { env } from '@purlo/env';
import { z } from 'zod/v4';
import { db } from '@/infra/database/client';
import { integrations } from '@/infra/database/schema/integrations';

type AddYoutubeIntegrationUseCaseRequest = {
  youtubeCode: string;
  organizationId: string;
};

export default async function addYoutubeIntegrationUseCase({
  youtubeCode,
  organizationId,
}: AddYoutubeIntegrationUseCaseRequest) {
  const googleOauthUrl = new URL('https://oauth2.googleapis.com/token');

  googleOauthUrl.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
  googleOauthUrl.searchParams.set('client_secret', env.GOOGLE_CLIENT_SECRET);
  googleOauthUrl.searchParams.set('redirect_uri', env.GOOGLE_REDIRECT_URI);
  googleOauthUrl.searchParams.set('grant_type', 'authorization_code');
  googleOauthUrl.searchParams.set('code', youtubeCode);

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

  const { name, picture, email } = z
    .object({
      email: z.string(),
      name: z.string(),
      picture: z.string(),
    })
    .parse(googleYoutubeAccountBody);

  await db.insert(integrations).values({
    name,
    email,
    accessToken: googleAccessToken,
    avatarUrl: picture,
    organizationId,
    provider: 'YOUTUBE',
  });

  return {
    message: 'Youtube integrated successfuly.',
  };
}
