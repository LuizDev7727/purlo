import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { integrations } from '@/infra/database/schema/integrations';

type GetIntegrationsUseCaseRequest = {
  organizationId: string;
};

export default async function getIntegrationsUseCase({
  organizationId,
}: GetIntegrationsUseCaseRequest) {
  const result = await db
    .select({
      id: integrations.id,
      name: integrations.name,
      provider: integrations.provider,
    })
    .from(integrations)
    .where(eq(integrations.organizationId, organizationId));

  return result;
}
