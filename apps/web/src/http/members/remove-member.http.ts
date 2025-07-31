import { api } from '../api';

interface RemoveMemberRequest {
  org: string;
  memberId: string;
}

export async function removeMemberHttp({ org, memberId }: RemoveMemberRequest) {
  await api.delete(`organizations/${org}/members/${memberId}`);
}
