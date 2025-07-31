import { api } from '../api';

interface CreateInviteRequest {
  organizationId: string;
  code: string;
}

type CreateInviteResponse = void;

export async function addYoutubeIntegrationHttp({
  code,
  organizationId,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
  await api.post(
    `organizations/${organizationId}/add-integration-with-youtube`,
    {
      json: {
        code,
      },
    }
  );
}
