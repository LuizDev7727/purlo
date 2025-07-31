import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import createAccountUseCase from '@/app/use-cases/auth/create-account.use-case';

export const createAccountRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/api/auth/users',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.email(),
          password: z.string(),
          avatarUrl: z.string().optional(),
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

      const { sub } = await createAccountUseCase(body);

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
