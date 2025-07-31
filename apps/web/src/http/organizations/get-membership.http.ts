import type { Role } from '@purlo/casl';
import { api } from '../api';

export interface GetMembershipResponse {
  id: string;
  role: Role;
  organizationId: string;
  userId: string;
}

export async function getMembershipHttp(org: string) {
  const result = await api
    .get(`organization/${org}/membership`)
    .json<GetMembershipResponse>();

  return result;
}
