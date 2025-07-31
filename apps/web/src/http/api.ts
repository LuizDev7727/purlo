import ky from 'ky';

export const api = ky.create({
  prefixUrl: 'http://localhost:3333/api',
  credentials: 'include',
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        const status = response.status;

        if (typeof window === 'undefined') {
          if (status === 403) {
            const { redirect } = await import('next/navigation');
            redirect('/auth/sign-in');
          }
        } else if (status === 403) {
          window.location.href = '/auth/sign-in';
        }

        return error;
      },
    ],
    beforeRequest: [
      async (request) => {
        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers');

          const cookies = await serverCookies();

          const token = cookies.get('purlo-token');

          if (!token) {
            return;
          }

          const value = token.value;

          request.headers.set('cookie', `purlo-token=${value}`);
        }
      },
    ],
  },
});
