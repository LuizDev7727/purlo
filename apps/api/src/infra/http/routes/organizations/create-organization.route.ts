import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import createOrganizationUseCase from '@/app/use-cases/organizations/create-organization.use-case';
import { auth } from '../../middleware/auth';

export const createOrganizationRoute: FastifyPluginCallbackZod = (app) => {
  app.register(auth).post(
    '/api/organizations',
    {
      schema: {
        body: z.object({
          name: z.string(),
          domain: z.string().optional(),
          avatarUrl: z.string().optional(),
          shouldAttachUsersByDomain: z.boolean(),
        }),
        tags: ['Organization'],
        response: {
          201: z.object({
            organizationId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const ownerId = await request.getCurrentUserId();
      const body = request.body;

      const { organizationId } = await createOrganizationUseCase({
        name: body.name,
        ownerId,
        shouldAttachUsersByDomain: body.shouldAttachUsersByDomain,
        avatarUrl: body.avatarUrl,
        domain: body.domain,
      });

      return reply.status(201).send({
        organizationId,
      });
    }
  );
};
