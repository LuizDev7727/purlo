import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';

export const getHealthRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/api/health',
    {
      schema: {
        tags: ['health'],
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    // biome-ignore lint/suspicious/useAwait: asdasd
    async (_request, reply) => {
      return reply.status(201).send({
        message: 'ok',
      });
    }
  );
};
