'use server';

import { revalidateTag } from 'next/cache';
import { acceptInviteHttp } from '@/http/invites/accept-invite.http';
import { rejectInviteHttp } from '@/http/invites/reject-invite.http';

export async function acceptInviteAction(inviteId: string) {
  await acceptInviteHttp(inviteId);

  revalidateTag('organizations');
}

export async function rejectInviteAction(inviteId: string) {
  await rejectInviteHttp(inviteId);
}
