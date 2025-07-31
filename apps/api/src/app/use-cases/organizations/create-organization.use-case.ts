import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { members } from '@/infra/database/schema/members';
import { organizations } from '@/infra/database/schema/organizations';
import { createSlug } from '@/utils/create-slug';

type CreateOrganizationUseCaseRequest = {
  ownerId: string;
  name: string;
  domain?: string;
  avatarUrl?: string;
  shouldAttachUsersByDomain: boolean;
};

type CreateOrganizationUseCaseResponse = {
  organizationId: string;
};

export default async function createOrganizationUseCase(
  request: CreateOrganizationUseCaseRequest
): Promise<CreateOrganizationUseCaseResponse> {
  const { name, ownerId, domain, avatarUrl, shouldAttachUsersByDomain } =
    request;

  if (domain) {
    const [organizationByDomain] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.domain, domain));

    if (organizationByDomain) {
      throw new Error('Another organization with same domain already exists.');
    }
  }

  const slug = createSlug(name);

  const [{ organizationId }] = await db
    .insert(organizations)
    .values({
      name,
      ownerId,
      slug,
      avatarUrl,
      domain,
      shouldAttachUsersByDomain,
    })
    .returning({ organizationId: organizations.id });

  await db.insert(members).values({
    organizationId,
    userId: ownerId,
    role: 'ADMIN',
  });

  return {
    organizationId,
  };
}
