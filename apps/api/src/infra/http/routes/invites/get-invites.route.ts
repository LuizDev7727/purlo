import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import getInvitesUseCase from '@/app/use-cases/invites/get-invites.use-case';
import { auth } from '../../middleware/auth';
import { roleSchema } from '@purlo/casl';
import { getUserPermissions } from '@/utils/get-user-permissions';

export const getInvitesRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).get(
    '/api/organizations/:organizationId/invites',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Get all organization invites',
        security: [{ bearerAuth: [] }],
        params: z.object({
          organizationId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            invites: z.array(
              z.object({
                id: z.string().uuid(),
                role: roleSchema,
                email: z.string().email(),
                createdAt: z.date(),
                author: z
                  .object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                  })
                  .nullable(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const { organizationId } = request.params;
      const userId = await request.getCurrentUserId();
      const { membership } = await request.getUserMembership(organizationId);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot('get', 'Invite')) {
        throw new Error(`You're not allowed to get organization invites.`);
      }
      return await getInvitesUseCase({ organizationId }).then(result => ({
        invites: result.invites.map(invite => ({
          ...invite,
          role: invite.role as 'ADMIN' | 'MEMBER',
        }))
      }));
    }
  );
}; 