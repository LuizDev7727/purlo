import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import authenticateWithGoogleUseCase from '@/app/use-cases/auth/authenticate-with-google.use-case';

export const authenticateWithGoogleRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/api/auth/authenticate-with-google',
    {
      schema: {
        body: z.object({
          code: z.string(),
        }),
        tags: ['auth'],
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const body = request.body;

      const { sub } = await authenticateWithGoogleUseCase(body);

      const payload = {
        sub,
      };

      const token = await reply.jwtSign(payload);

      return reply.status(201).send({
        token,
      });
    }
  );
};
