import type { Role } from '@purlo/casl';
import { api } from '../api';

interface CreateInviteRequest {
  org: string;
  email: string;
  role: Role;
}

type CreateInviteResponse = void;

export async function createInviteHttp({
  org,
  email,
  role,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
  await api.post(`organizations/${org}/invites`, {
    json: {
      email,
      role,
    },
  });
}
