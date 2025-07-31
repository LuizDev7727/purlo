import { organizationSchema } from '@purlo/casl';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import transferOrganizationUseCase from '@/app/use-cases/organizations/transfer-organization.use-case';
import { getUserPermissions } from '@/utils/get-user-permissions';
import { auth } from '../../middleware/auth';

export const transferOrganizationRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).patch(
    '/api/organizations/:organizationId/owner',
    {
      schema: {
        tags: ['Organization'],
        summary: 'Transfer organization ownership',
        security: [{ bearerAuth: [] }],
        body: z.object({
          transferToUserId: z.string().uuid(),
        }),
        params: z.object({
          organizationId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { organizationId } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } =
        await request.getUserMembership(organizationId);
      const authOrganization = organizationSchema.parse(organization);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot('transfer_ownership', authOrganization)) {
        throw new Error(
          `You're not allowed to transfer this organization ownership.`
        );
      }
      const { transferToUserId } = request.body;
      await transferOrganizationUseCase({ organizationId, transferToUserId });
      return reply.status(204).send();
    }
  );
};
