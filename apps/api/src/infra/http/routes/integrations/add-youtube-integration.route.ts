import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import addYoutubeIntegrationUseCase from '@/app/use-cases/integrations/add-youtube-integration.use-case';
import { auth } from '../../middleware/auth';

export const addYoutubeIntegrationRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).post(
    '/api/organizations/:organizationId/add-integration-with-youtube',
    {
      schema: {
        tags: ['Integrations'],
        summary: 'Create a new integration with youtube',
        security: [{ bearerAuth: [] }],
        body: z.object({
          code: z.string(),
        }),
        params: z.object({
          organizationId: z.uuid(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { organizationId } = request.params;
      const { code } = request.body;

      console.log('Acessando');
      try {
        await addYoutubeIntegrationUseCase({
          organizationId,
          youtubeCode: code,
        });
      } catch (error) {
        console.log(error);
      }

      return reply.status(201).send({
        message: 'Integração com o youtube adicionada com sucesso.',
      });
    }
  );
};
