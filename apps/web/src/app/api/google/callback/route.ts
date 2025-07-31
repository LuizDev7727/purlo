import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { addYoutubeIntegrationHttp } from '@/http/integrations/add-youtube-integration.http';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { message: 'Google OAuth code was not found.' },
      { status: 400 }
    );
  }

  const cookie = await cookies();

  const organizationId = cookie.get('purlo-org')?.value ?? '';

  await addYoutubeIntegrationHttp({
    code,
    organizationId,
  });

  const redirectUrl = request.nextUrl.clone();

  redirectUrl.pathname = `/dashboard/org/${organizationId}/integrations`;
  redirectUrl.search = '';

  return NextResponse.redirect(redirectUrl);
}
