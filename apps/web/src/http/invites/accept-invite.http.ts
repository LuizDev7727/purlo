import { api } from '../api';

export async function acceptInviteHttp(inviteId: string) {
  await api.post(`invites/${inviteId}/accept`);
}
