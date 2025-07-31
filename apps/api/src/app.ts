import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { env } from '@purlo/env';
import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { errorHandler } from './infra/http/error-handler';
import { authenticateWithCredentialsRoute } from './infra/http/routes/auth/authenticate-with-credentials.route';
import { authenticateWithGoogleRoute } from './infra/http/routes/auth/authenticate-with-google.route';
import { createAccountRoute } from './infra/http/routes/auth/create-account.route';
import { getProfileRoute } from './infra/http/routes/auth/get-profile.route';
import { getHealthRoute } from './infra/http/routes/health/check-server.route';
import { addYoutubeIntegrationRoute } from './infra/http/routes/integrations/add-youtube-integration.route';
import { getIntegrationsRoute } from './infra/http/routes/integrations/get-integrations.route';
import { removeIntegrationRoute } from './infra/http/routes/integrations/remove-integration.route';
import { acceptInviteRoute } from './infra/http/routes/invites/accept-invite.route';
import { createInviteRoute } from './infra/http/routes/invites/create-invite.route';
import { getInviteRoute } from './infra/http/routes/invites/get-invite.route';
import { getInvitesRoute } from './infra/http/routes/invites/get-invites.route';
import { getPendingInvitesRoute } from './infra/http/routes/invites/get-pending-invites.route';
import { rejectInviteRoute } from './infra/http/routes/invites/reject-invite.route';
import { revokeInviteRoute } from './infra/http/routes/invites/revoke-invite.route';
import { getMembersRoute } from './infra/http/routes/members/get-members.route';
import { removeMembersRoute } from './infra/http/routes/members/remove-member.route';
import { updateMemberRoleRoute } from './infra/http/routes/members/update-member-role.route';
import { createOrganizationRoute } from './infra/http/routes/organizations/create-organization.route';
import { getMembershipRoute } from './infra/http/routes/organizations/get-membership.route';
import { getOrganizationRoute } from './infra/http/routes/organizations/get-organization.route';
import { getOrganizationsRoute } from './infra/http/routes/organizations/get-organizations.route';
import { shutdownOrganizationRoute } from './infra/http/routes/organizations/shutdown-organization.route';
import { transferOrganizationRoute } from './infra/http/routes/organizations/transfer-organization.route';
import { updateOrganizationRoute } from './infra/http/routes/organizations/update-organization.route';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler);

app.register(fastifyCors, {
  origin: ['http://localhost:3000'],
  credentials: true,
});

app.register(fastifyCookie);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Purlo',
      description: 'Full-stack SaaS to centralize uploads.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '2h',
  },
});

// Health
app.register(getHealthRoute);

// Auth
app.register(authenticateWithCredentialsRoute);
app.register(authenticateWithGoogleRoute);
app.register(createAccountRoute);
app.register(getProfileRoute);

// Organizations
app.register(getOrganizationsRoute);
app.register(getOrganizationRoute);
app.register(getMembershipRoute);
app.register(createOrganizationRoute);
app.register(updateOrganizationRoute);
app.register(shutdownOrganizationRoute);
app.register(transferOrganizationRoute);

// Member
app.register(getMembersRoute);
app.register(removeMembersRoute);
app.register(updateMemberRoleRoute);

// Invites
app.register(acceptInviteRoute);
app.register(createInviteRoute);
app.register(getInviteRoute);
app.register(getInvitesRoute);
app.register(getPendingInvitesRoute);
app.register(rejectInviteRoute);
app.register(revokeInviteRoute);

// Integrations
app.register(getIntegrationsRoute);
app.register(addYoutubeIntegrationRoute);
app.register(removeIntegrationRoute);

app.listen({ port: 3333 });
