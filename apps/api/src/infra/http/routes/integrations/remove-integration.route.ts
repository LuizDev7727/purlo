import { z } from 'zod/v4';
import { auth } from '../../middleware/auth';
import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import removeIntegrationUseCase from '@/app/use-cases/integrations/remove-integration.use-case';

export const removeIntegrationRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).delete(
    '/api/integrations/:integrationId',
    {
      schema: {
        tags: ['Integrations'],
        summary: 'Remove a integration',
        security: [{ bearerAuth: [] }],
        params: z.object({
          integrationId: z.uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { integrationId } = request.params;
      // const { cannot } = getUserPermissions(userId, membership.role);
      // if (cannot('delete', 'Invite')) {
      //   throw new Error(`You're not allowed to delete an invite.`);
      // }
      await removeIntegrationUseCase({ integrationId });
      return reply.status(204).send();
    }
  );
};
