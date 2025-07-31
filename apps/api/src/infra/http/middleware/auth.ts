import { and, eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { db } from '@/infra/database/client';
import { members } from '@/infra/database/schema/members';
import { organizations } from '@/infra/database/schema/organizations';
import { UnauthorizedError } from '../routes/errors/unauthorized.error';

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const token = request.cookies['purlo-token'] ?? '';
        const { sub } = app.jwt.verify<{ sub: string }>(token);
        return sub;
      } catch {
        throw new UnauthorizedError('Invalid token');
      }
    };

    request.getUserMembership = async (organizationId: string) => {
      const userId = await request.getCurrentUserId();

      const [member] = await db
        .select({
          membership: members,
          organization: organizations,
        })
        .from(members)
        .innerJoin(organizations, eq(members.organizationId, organizationId))
        .where(
          and(eq(members.userId, userId), eq(organizations.id, organizationId))
        );

      if (!member) {
        throw new Error(`You're not a member of this organization.`);
      }

      return {
        organization: member.organization,
        membership: member.membership,
      };
    };
  });
});
