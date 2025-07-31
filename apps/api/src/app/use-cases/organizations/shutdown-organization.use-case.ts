import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { organizations } from '@/infra/database/schema/organizations';

type ShutdownOrganizationUseCase = {
  organizationId: string;
};

export default async function shutdownOrganizationUseCase(
  request: ShutdownOrganizationUseCase
) {
  await db
    .delete(organizations)
    .where(eq(organizations.id, request.organizationId));
}
