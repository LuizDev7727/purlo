import type { Role } from '@purlo/casl';
import 'fastify';

type Member = {
  id: string;
  role: Role;
  userId: string;
  organizationId: string;
};

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>;
    getUserMembership(
      slug: string
    ): Promise<{ organization: Organization; membership: Member }>;
  }
}
