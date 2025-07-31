import myFetch from '../my-fetch';

type Request = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatarUrl: string | null;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
};

type Response = {
  token: string;
};

export default async function signUpWithCredentialsHttp(body: Request) {
  const response = await myFetch<Response>('auth/users', {
    method: 'post',
    json: body,
  });

  return response;
}
