import { api } from '../api';

interface GetOrganizationResponse {
  organization: {
    slug: string;
    id: string;
    name: string;
    domain: string | null;
    shouldAttachUsersByDomain: boolean;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
  };
}

export async function getOrganizationHttp(org: string) {
  const result = await api
    .get(`organizations/${org}`, {
      next: {
        tags: ['organization'],
      },
    })
    .json<GetOrganizationResponse>();

  return result;
}
