import { jwtDecode } from 'jwt-decode';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const isPrivateRoute = pathname.startsWith('/dashboard');

  if (!isPrivateRoute) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get('purlo-token')?.value ?? '';

  let isTokenExpired = false;

  const jwt = jwtDecode<{ sub: string; exp: number; iat: number }>(authToken);
  const now = Math.floor(Date.now() / 1000);
  isTokenExpired = jwt.exp < now;

  if (isPrivateRoute && isTokenExpired) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = '/auth/sign-in';

    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith('/dashboard/org')) {
    const [, , , id] = pathname.split('/');

    response.cookies.set('purlo-org', id ?? '');
  } else {
    response.cookies.delete('purlo-org');
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
