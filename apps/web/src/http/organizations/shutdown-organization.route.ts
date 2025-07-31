import { api } from '../api';

interface ShutdownOrganizationRequest {
  org: string;
}

export async function shutdownOrganizationHttp({
  org,
}: ShutdownOrganizationRequest) {
  await api.delete(`organizations/${org}`);
}
