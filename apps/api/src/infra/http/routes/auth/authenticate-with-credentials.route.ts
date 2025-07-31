import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import authenticateWithCredentialsUseCase from '@/app/use-cases/auth/authenticate-with-credential.use-case';

export const authenticateWithCredentialsRoute: FastifyPluginCallbackZod = (
  app
) => {
  app.post(
    '/api/auth/authenticate-with-credentials',
    {
      schema: {
        body: z.object({
          email: z.email(),
          password: z.string(),
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

      const { sub } = await authenticateWithCredentialsUseCase(body);

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
