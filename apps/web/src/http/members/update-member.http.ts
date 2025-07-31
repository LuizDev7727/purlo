import type { Role } from '@purlo/casl';
import { api } from '../api';

interface UpdateMemberRequest {
  org: string;
  memberId: string;
  role: Role;
}

export async function updateMemberHttp({
  org,
  memberId,
  role,
}: UpdateMemberRequest) {
  await api.put(`organizations/${org}/members/${memberId}`, {
    json: { role },
  });
}
