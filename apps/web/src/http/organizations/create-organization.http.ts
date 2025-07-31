import type { CreateOrganizationBody } from '@purlo/contracts';
import { api } from '../api';

type Response = {
  organizationId: string;
};

export default async function createOrganizationHttp(
  body: CreateOrganizationBody
) {
  const organizations = await api
    .post('organizations', {
      json: body,
    })
    .json<Response>();

  return organizations;
}
