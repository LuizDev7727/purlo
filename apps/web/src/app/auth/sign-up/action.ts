'use server';

import { uploadFile } from '@purlo/cloudflare';
import { signUpSchema } from '@purlo/contracts';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import signUpWithCredentialsHttp from '@/http/auth/sign-up-with-credentials.http';

// biome-ignore lint/suspicious/noExplicitAny:asdasd
export async function signUpAction(prevState: any, formData: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const error = result.error.issues[0]?.message;

    return {
      error,
      message: null,
    };
  }

  // upload da foto para o r2
  const body = result.data;

  let avatar = '';

  if (body.avatar) {
    await uploadFile({
      file: body.avatar,
    });
    avatar = body.avatar.name;
  }

  const { error, data } = await signUpWithCredentialsHttp({
    name: body.name,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
    avatarUrl: avatar,
    plan: 'FREE',
  });

  if (error) {
    return {
      error: error.message,
      message: null,
    };
  }

  const { token } = data;

  const { set } = await cookies();

  set('purlo-token', token, {
    httpOnly: true,
    secure: true,
  });

  redirect('/dashboard');

  return {
    error: null,
    message: 'Redirecionando para a dashboard...',
  };
}
