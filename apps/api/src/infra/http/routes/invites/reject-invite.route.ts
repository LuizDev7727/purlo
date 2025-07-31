import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import rejectInviteUseCase from '@/app/use-cases/invites/reject-invite.use-case';
import { auth } from '../../middleware/auth';

export const rejectInviteRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).post(
    '/api/invites/:inviteId/reject',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Reject an invite',
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
      await rejectInviteUseCase({ inviteId, userId });
      return reply.status(204).send();
    }
  );
}; 