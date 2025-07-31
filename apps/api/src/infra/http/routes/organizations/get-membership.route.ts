import { roleSchema } from '@purlo/casl';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { auth } from '../../middleware/auth';

export const getMembershipRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).get(
    '/api/organization/:organizationId/membership',
    {
      schema: {
        tags: ['Organization'],
        params: z.object({
          organizationId: z.string(),
        }),
        response: {
          200: z.object({
            id: z.uuid(),
            role: roleSchema,
            userId: z.string(),
            organizationId: z.uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { organizationId } = request.params;

      const { membership } = await request.getUserMembership(organizationId);

      return reply.status(200).send({
        id: membership.id,
        role: membership.role,
        userId: membership.userId,
        organizationId: membership.organizationId,
      });
    }
  );
};
