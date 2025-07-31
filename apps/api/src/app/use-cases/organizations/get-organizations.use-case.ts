import { getFile } from '@purlo/cloudflare';
import { eq } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { organizations } from '@/infra/database/schema/organizations';

type GetOrganizationsUseCaseRequest = {
  ownerId: string;
};

type GetOrganizationsUseCaseResponse = {
  id: string;
  name: string;
  domain: string | null;
  slug: string;
  avatarUrl: string | null;
}[];

export default async function getOrganizationsUseCase(
  request: GetOrganizationsUseCaseRequest
): Promise<GetOrganizationsUseCaseResponse> {
  const { ownerId } = request;

  const savedOrganizations = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      domain: organizations.domain,
      slug: organizations.slug,
      avatarUrl: organizations.avatarUrl,
    })
    .from(organizations)
    .where(eq(organizations.ownerId, ownerId));

  const result = await Promise.all(
    savedOrganizations.map(async (organization) => {
      const avatarUrl = organization.avatarUrl
        ? await getFile(organization.avatarUrl)
        : null;

      return {
        ...organization,
        avatarUrl,
      };
    })
  );

  return result;
}
