'use server';

import { getCurrentOrg } from '@/auth/auth';
import removeIntegrationHttp from '@/http/integrations/remove-integration.http';
import { env } from '@purlo/env';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

// biome-ignore lint/suspicious/useAwait: Need to be sincroned
export async function addIntegrationWithYoutubeAction() {
  const googleURL = new URL('o/oauth2/v2/auth', 'https://accounts.google.com');

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.upload',
  ];

  googleURL.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
  googleURL.searchParams.set('redirect_uri', env.GOOGLE_REDIRECT_URI);
  googleURL.searchParams.set('response_type', 'code');
  googleURL.searchParams.set('include_granted_scopes', 'true');
  googleURL.searchParams.set('scope', scopes.join(' '));

  redirect(googleURL.toString());
}

// biome-ignore lint/suspicious/useAwait: Need to be sincroned
export async function addIntegrationWithTiktokAction() {
  const tiktokUrl = new URL('v2/auth/authorize/', 'https://www.tiktok.com');
  const csrfState = Math.random().toString(36).substring(2);

  const scopes = ['user.info.basic', 'video.publish'];

  tiktokUrl.searchParams.set('client_key', 'env.TIKTOK_CLIENT_KEY');
  tiktokUrl.searchParams.set('redirect_uri', 'env.TIKTOK_REDIRECT_URI');
  tiktokUrl.searchParams.set('response_type', 'code');
  tiktokUrl.searchParams.set('scope', scopes.join(' '));
  tiktokUrl.searchParams.set('state', csrfState);

  redirect(tiktokUrl.toString());
}


export async function removeIntegrationAction(integrationId: string) {
  const currentOrg = getCurrentOrg();

  await removeIntegrationHttp({
    integrationId
  });

  revalidateTag(`${currentOrg}/integrations`);
}
