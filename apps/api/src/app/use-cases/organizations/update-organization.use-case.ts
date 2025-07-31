import { and, eq, ne } from 'drizzle-orm';
import { db } from '@/infra/database/client';
import { organizations } from '@/infra/database/schema/organizations';

type UpdateOrganizationUseCaseRequest = {
  organizationId: string;
  name: string;
  domain: string | null | undefined;
  shouldAttachUsersByDomain: boolean | undefined;
};

export default async function updateOrganizationUseCase(
  request: UpdateOrganizationUseCaseRequest
) {
  const { name, domain, shouldAttachUsersByDomain, organizationId } = request;

  if (domain) {
    // const organizationByDomain = await prisma.organization.findFirst({
    //   where: {
    //     domain,
    //     id: {
    //       not: organization.id,
    //     },
    //   },
    // });

    const [organizationByDomain] = await db
      .select()
      .from(organizations)
      .where(
        and(
          eq(organizations.domain, domain),
          ne(organizations.id, organizationId)
        )
      );

    if (organizationByDomain) {
      throw new Error('Another organization with same domain already exists.');
    }
  }

  await db
    .update(organizations)
    .set({
      name,
      domain,
      shouldAttachUsersByDomain,
    })
    .where(eq(organizations.id, organizationId));
}
