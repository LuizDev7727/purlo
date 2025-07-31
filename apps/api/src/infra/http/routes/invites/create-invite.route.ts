import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import createInviteUseCase from '@/app/use-cases/invites/create-invite.use-case';
import { auth } from '../../middleware/auth';
import { roleSchema } from '@purlo/casl';
import { getUserPermissions } from '@/utils/get-user-permissions';

export const createInviteRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).post(
    '/api/organizations/:organizationId/invites',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Create a new invite',
        security: [{ bearerAuth: [] }],
        body: z.object({
          email: z.string().email(),
          role: roleSchema,
        }),
        params: z.object({
          organizationId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            inviteId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { organizationId } = request.params;
      const userId = await request.getCurrentUserId();
      const { organization, membership } = await request.getUserMembership(organizationId);
      const { cannot } = getUserPermissions(userId, membership.role);
      if (cannot('create', 'Invite')) {
        throw new Error(`You're not allowed to create new invites.`);
      }
      const { email, role } = request.body;
      const result = await createInviteUseCase({
        organizationId,
        email,
        role,
        authorId: userId,
        organizationDomain: organization.domain,
        shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
      });
      return reply.status(201).send({ inviteId: result.inviteId });
    }
  );
};
