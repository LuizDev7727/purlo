import type { Role } from '@purlo/casl';
import { api } from '../api';

type GetMembersResponse = {
  id: string;
  userId: string;
  role: Role;
  name: string | null;
  email: string;
  avatarUrl: string | null;
}[];

export async function getMembersHttp(org: string) {
  const result = await api
    .get(`organizations/${org}/members`, {
      next: {
        tags: [`${org}/members`],
      },
    })
    .json<GetMembersResponse>();

  return result;
}
