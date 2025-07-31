import { api } from '../api';

type Request = {
  integrationId: string;
};

export default async function removeIntegrationHttp({
  integrationId,
}: Request) {
  await api.delete(`integrations/${integrationId}`);
}
