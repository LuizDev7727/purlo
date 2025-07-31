import { organizationSchema } from '@purlo/casl';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import shutdownOrganizationUseCase from '@/app/use-cases/organizations/shutdown-organization.use-case';
import { getUserPermissions } from '@/utils/get-user-permissions';
import { auth } from '../../middleware/auth';

export const shutdownOrganizationRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).delete(
    '/api/organizations/:organizationId',
    {
      schema: {
        tags: ['Organization'],
        params: z.object({
          organizationId: z.uuid(),
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

      const authOrganization = organizationSchema.parse(organization);

      const { cannot } = getUserPermissions(userId, membership.role);

      if (cannot('delete', authOrganization)) {
        throw new Error(`You're not allowed to shutdown this organization.`);
      }

      await shutdownOrganizationUseCase({
        organizationId,
      });

      return reply.status(204).send();
    }
  );
};
