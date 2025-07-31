import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import getInviteUseCase from '@/app/use-cases/invites/get-invite.use-case';
import { roleSchema } from '@purlo/casl';

export const getInviteRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/api/invites/:inviteId',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Get an invite',
        params: z.object({
          inviteId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            invite: z.object({
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
            }),
          }),
        },
      },
    },
    async (request) => {
      const { inviteId } = request.params;
      return await getInviteUseCase({ inviteId });
    }
  );
}; 