import type { Role } from '@purlo/casl';
import { api } from '../api';

interface GetInviteResponse {
  invite: {
    id: string;
    role: Role;
    email: string;
    createdAt: string;
    organization: {
      name: string;
    };
    author: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    } | null;
  };
}

export async function getInviteHttp(inviteId: string) {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>();

  return result;
}
