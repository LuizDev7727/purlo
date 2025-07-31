import { roleSchema } from '@purlo/casl';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import updateMemberRoleUseCase from '@/app/use-cases/members/update-member-role.use-case';
import { getUserPermissions } from '@/utils/get-user-permissions';
import { auth } from '../../middleware/auth';

export const updateMemberRoleRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).put(
    '/api/organizations/:slug/members/:memberId',
    {
      schema: {
        tags: ['Members'],
        params: z.object({
          organizationId: z.uuid(),
          memberId: z.uuid(),
        }),
        body: z.object({
          role: roleSchema,
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

      const { role } = request.body;

      await updateMemberRoleUseCase({
        memberId,
        organizationId,
        role,
      });

      return reply.status(204).send();
    }
  );
};
