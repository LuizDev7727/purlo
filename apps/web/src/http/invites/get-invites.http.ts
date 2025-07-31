import type { Role } from '@purlo/casl';
import { api } from '../api';

interface GetInvitesResponse {
  invites: {
    id: string;
    role: Role;
    email: string;
    createdAt: string;
    author: {
      id: string;
      name: string | null;
    } | null;
  }[];
}

export async function getInvitesHttp(org: string) {
  const result = await api
    .get(`organizations/${org}/invites`, {
      next: {
        tags: [`${org}/invites`],
      },
    })
    .json<GetInvitesResponse>();

  return result;
}
