import { organizationSchema } from '@purlo/casl';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import updateOrganizationUseCase from '@/app/use-cases/organizations/update-organization.use-case';
import { getUserPermissions } from '@/utils/get-user-permissions';
import { auth } from '../../middleware/auth';

export const updateOrganizationRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).put(
    '/api/organizations/:organizationId',
    {
      schema: {
        tags: ['Organization'],
        params: z.object({
          organizationId: z.uuid(),
        }),
        body: z.object({
          name: z.string(),
          domain: z.string().nullish(),
          shouldAttachUsersByDomain: z.boolean().optional(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { organizationId } = request.params;
      const userId = await request.getCurrentUserId();
      const { membership, organization } =
        await request.getUserMembership(organizationId);

      const { name, domain, shouldAttachUsersByDomain } = request.body;

      const authOrganization = organizationSchema.parse(organization);

      const { cannot } = getUserPermissions(userId, membership.role);

      if (cannot('update', authOrganization)) {
        throw new Error(`You're not allowed to update this organization.`);
      }

      await updateOrganizationUseCase({
        organizationId,
        name,
        domain,
        shouldAttachUsersByDomain,
      });

      return reply.status(204).send();
    }
  );
};
