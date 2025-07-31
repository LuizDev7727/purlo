import { api } from '../api';

interface RevokeInviteRequest {
  org: string;
  inviteId: string;
}

export async function revokeInviteHttp({ org, inviteId }: RevokeInviteRequest) {
  await api.delete(`organizations/${org}/invites/${inviteId}`);
}
