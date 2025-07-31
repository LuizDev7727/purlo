import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import removeMemberUseCase from '@/app/use-cases/members/remove-member.use-case';
import { getUserPermissions } from '@/utils/get-user-permissions';
import { auth } from '../../middleware/auth';

export const removeMembersRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).delete(
    '/api/organizations/:organizationId/members/:memberId',
    {
      schema: {
        tags: ['Members'],
        params: z.object({
          organizationId: z.uuid(),
          memberId: z.uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { memberId, organizationId } = request.params;

      const userId = await request.getCurrentUserId();

      const { membership } = await request.getUserMembership(organizationId);

      const { cannot } = getUserPermissions(userId, membership.role);

      if (cannot('delete', 'User')) {
        throw new Error(
          `You're not allowed to remove this member from organization.`
        );
      }

      await removeMemberUseCase({
        memberId,
        organizationId,
      });

      return reply.status(204).send();
    }
  );
};
