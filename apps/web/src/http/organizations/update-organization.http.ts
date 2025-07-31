import { api } from '../api';

interface UpdateOrganizationRequest {
  org: string;
  name: string;
  domain: string | null;
  shouldAttachUsersByDomain: boolean;
}

type UpdateOrganizationResponse = void;

export async function updateOrganizationHttp({
  org,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
  await api.put(`organizations/${org}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  });
}
