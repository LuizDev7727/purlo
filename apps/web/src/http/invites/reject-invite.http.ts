import { api } from '../api';

export async function rejectInviteHttp(inviteId: string) {
  await api.post(`invites/${inviteId}/reject`);
}
