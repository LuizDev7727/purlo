import type { Organization } from '@/types/organization';
import { api } from '../api';

export default async function getOrganizationsHttp() {
  const organizations = await api
    .get('organizations', {
      next: {
        tags: ['organizations'],
      },
    })
    .json<Organization[]>();

  return organizations;
}
