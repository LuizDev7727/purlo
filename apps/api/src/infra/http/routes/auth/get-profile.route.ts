import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import getProfileUseCase from '@/app/use-cases/auth/get-profile.use-case';
import { auth } from '../../middleware/auth';

export const getProfileRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).get(
    '/api/auth/get-profile',
    {
      schema: {
        tags: ['auth'],
        response: {
          200: z.object({
            name: z.string(),
            email: z.string(),
            avatarUrl: z.string().nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const profile = await getProfileUseCase({
        userId,
      });

      return reply.status(201).send(profile);
    }
  );
};
