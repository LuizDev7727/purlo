import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import getIntegrationsUseCase from '@/app/use-cases/integrations/get-integrations.use-case';

export const getIntegrationsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/api/organizations/:organizationId/integrations',
    {
      schema: {
        tags: ['Integrations'],
        summary: 'Get integrations from youtube',
        params: z.object({
          organizationId: z.uuid(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.uuid(),
              name: z.string(),
              provider: z.enum(['YOUTUBE', 'TIKTOK']),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const { organizationId } = request.params;

      const integrations = await getIntegrationsUseCase({
        organizationId,
      });

      return reply.status(200).send(integrations);
    }
  );
};
