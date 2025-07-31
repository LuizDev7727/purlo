'use server';

import { signInSchema } from '@purlo/contracts';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import signInWithCredentialsHttp from '@/http/auth/sign-in-with-credentials.http';

// biome-ignore lint/suspicious/noExplicitAny: I just want to use
// biome-ignore lint/correctness/noUnusedFunctionParameters: I just want to use
export async function signInAction(prevState: any, formData: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errorInput = result.error.issues[0]?.message;

    return {
      error: errorInput,
      message: null,
    };
  }

  const body = result.data;

  const { data, error } = await signInWithCredentialsHttp(body);

  if (error) {
    return {
      error: error.message,
      message: null,
    };
  }

  const cookie = await cookies();

  const { token } = data;

  cookie.set('purlo-token', token, {
    httpOnly: true,
    secure: true,
  });

  redirect('/dashboard');

  return {
    error: null,
    message: 'Redirecionando para a dashboard...',
  };
}
