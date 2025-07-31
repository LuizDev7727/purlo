import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import getPendingInvitesUseCase from '@/app/use-cases/invites/get-pending-invites.use-case';
import { auth } from '../../middleware/auth';
import { roleSchema } from '@purlo/casl';

export const getPendingInvitesRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).get(
    '/api/pending-invites',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Get all user pending invites',
        response: {
          200: z.object({
            invites: z.array(
              z.object({
                id: z.string().uuid(),
                role: roleSchema,
                email: z.string().email(),
                createdAt: z.date(),
                organization: z.object({ name: z.string() }),
                author: z
                  .object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    avatarUrl: z.string().url().nullable(),
                  })
                  .nullable(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const userId = await request.getCurrentUserId();
      return await getPendingInvitesUseCase({ userId });
    }
  );
}; 