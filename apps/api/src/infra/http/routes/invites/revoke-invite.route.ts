import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import revokeInviteUseCase from '@/app/use-cases/invites/revoke-invite.use-case';
import { getUserPermissions } from '@/utils/get-user-permissions';
import { auth } from '../../middleware/auth';

export const revokeInviteRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).delete(
    '/api/organizations/:organizationId/invites/:inviteId',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Revoke a invite',
        security: [{ bearerAuth: [] }],
        params: z.object({
          organizationId: z.string().uuid(),
          inviteId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { organizationId, inviteId } = request.params;
      const userId = await request.getCurrentUserId();
      const { membership } = await request.getUserMembership(organizationId);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot('delete', 'Invite')) {
        throw new Error(`You're not allowed to delete an invite.`);
      }
      await revokeInviteUseCase({ inviteId, organizationId });
      return reply.status(204).send();
    }
  );
};
