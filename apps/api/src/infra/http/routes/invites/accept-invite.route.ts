import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import acceptInviteUseCase from '@/app/use-cases/invites/accept-invite.use-case';
import { auth } from '../../middleware/auth';

export const acceptInviteRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).post(
    '/api/invites/:inviteId/accept',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Accept an invite',
        params: z.object({
          inviteId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId();
      const { inviteId } = request.params;
      await acceptInviteUseCase({ inviteId, userId });
      return reply.status(204).send();
    }
  );
}; 