import type { Role } from '@purlo/casl';
import { api } from '../api';

interface GetPendingInvitesResponse {
  invites: {
    organization: {
      name: string;
    };
    id: string;
    role: Role;
    email: string;
    createdAt: string;
    author: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    } | null;
  }[];
}

export async function getPendingInvitesHttp() {
  const result = await api
    .get('pending-invites')
    .json<GetPendingInvitesResponse>();

  return result;
}
