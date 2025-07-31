import { roleSchema } from '@purlo/casl';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import getMembersUseCase from '@/app/use-cases/members/get-members.use-case';
import { auth } from '../../middleware/auth';

export const getMembersRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).get(
    '/api/organizations/:organizationId/members',
    {
      schema: {
        tags: ['Members'],
        params: z.object({
          organizationId: z.string(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.uuid(),
              userId: z.uuid(),
              role: roleSchema,
              name: z.string().nullable(),
              email: z.email(),
              avatarUrl: z.url().nullable(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const { organizationId } = request.params;

      const members = await getMembersUseCase({
        organizationId,
      });

      return reply.send(members);
    }
  );
};
