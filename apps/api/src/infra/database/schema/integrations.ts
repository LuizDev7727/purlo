import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';

export const providerEnum = pgEnum('provider', ['YOUTUBE', 'TIKTOK']);

export const integrations = pgTable('integrations', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  avatarUrl: varchar(),
  accessToken: varchar().notNull(),
  provider: providerEnum().notNull(),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, {
      onDelete: 'cascade',
    }),
});

export const integrationsRelations = relations(integrations, ({ one }) => ({
  organization: one(organizations, {
    fields: [integrations.organizationId],
    references: [organizations.id],
  }),
}));
