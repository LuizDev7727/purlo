import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import getOrganizationsUseCase from '@/app/use-cases/organizations/get-organizations.use-case';
import { auth } from '../../middleware/auth';

export const getOrganizationsRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).get(
    '/api/organizations',
    {
      schema: {
        tags: ['Organization'],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              domain: z.string().nullable(),
              slug: z.string(),
              avatarUrl: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const ownerId = await request.getCurrentUserId();

      const organizations = await getOrganizationsUseCase({
        ownerId,
      });

      return reply.status(200).send(organizations);
    }
  );
};
