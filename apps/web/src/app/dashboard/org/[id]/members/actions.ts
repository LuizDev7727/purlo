'use server';

import { type Role, roleSchema } from '@purlo/casl';
import { HTTPError } from 'ky';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { getCurrentOrg } from '@/auth/auth';
import { createInviteHttp } from '@/http/invites/create-invite.http';
import { revokeInviteHttp } from '@/http/invites/revoke-invite.http';
import { removeMemberHttp } from '@/http/members/remove-member.http';
import { updateMemberHttp } from '@/http/members/update-member.http';

const inviteSchema = z.object({
  email: z.email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
});

export async function createInviteAction(prevState: any, data: FormData) {
  const currentOrg = 'e0ae7af2-2f13-447c-8adb-46834f7b26a5';
  const result = inviteSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errorInput = result.error.issues[0]?.message;

    return { success: false, message: null, error: errorInput };
  }

  const { email, role } = result.data;

  try {
    await createInviteHttp({
      org: 'e0ae7af2-2f13-447c-8adb-46834f7b26a5',
      email,
      role,
    });

    revalidateTag(`${currentOrg}/invites`);
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();

      return { success: false, message, error: null };
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      error: null,
    };
  }

  return {
    success: true,
    message: 'Successfully created the invite.',
    errors: null,
  };
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrg();

  await removeMemberHttp({
    org: 'e0ae7af2-2f13-447c-8adb-46834f7b26a5',
    memberId,
  });

  revalidateTag(`${currentOrg}/members`);
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = getCurrentOrg();

  await updateMemberHttp({
    org: 'e0ae7af2-2f13-447c-8adb-46834f7b26a5',
    memberId,
    role,
  });

  revalidateTag(`${currentOrg}/members`);
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = getCurrentOrg();

  await revokeInviteHttp({
    org: 'e0ae7af2-2f13-447c-8adb-46834f7b26a5',
    inviteId,
  });

  revalidateTag(`${currentOrg}/invites`);
}
