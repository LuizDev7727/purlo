import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { auth } from '../../middleware/auth';

export const getOrganizationRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).get(
    '/api/organizations/:organizationId',
    {
      schema: {
        tags: ['Organization'],
        params: z.object({
          organizationId: z.string(),
        }),
        // response: {
        //   200: z.object({
        //     organization: z.object({
        //       id: z.uuid(),
        //       name: z.string(),
        //       slug: z.string(),
        //       domain: z.string().nullable(),
        //       shouldAttachUsersByDomain: z.boolean(),
        //       avatarUrl: z.url().nullable(),
        //       createdAt: z.date(),
        //       updatedAt: z.date(),
        //       ownerId: z.uuid(),
        //     }),
        //   }),
        // },
      },
    },
    async (request, reply) => {
      const { organizationId } = request.params;

      const { organization } = await request.getUserMembership(organizationId);

      return reply.status(200).send({ organization });
    }
  );
};
