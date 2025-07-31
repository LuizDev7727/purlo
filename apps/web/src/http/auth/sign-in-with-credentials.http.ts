import type { SignInBody } from '@purlo/contracts';
import myFetch from '../my-fetch';

type Response = {
  token: string;
};

export default async function signInWithCredentialsHttp(body: SignInBody) {
  const response = await myFetch<Response>(
    'auth/authenticate-with-credentials',
    {
      method: 'post',
      json: body,
    }
  );

  return response;
}
