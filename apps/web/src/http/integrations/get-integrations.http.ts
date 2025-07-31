import { api } from '../api';

type GetIntegrationsResponse = {
  id: string;
  name: string;
  provider: 'YOUTUBE' | 'TIKTOK';
}[];

export async function getIntegrationsHttp(org: string) {
  const result = await api
    .get(`organizations/${org}/integrations`,{
      next: {
        tags: [`${org}/integrations`]
      }
    })
    .json<GetIntegrationsResponse>();

  return result;
}
