import { relations } from 'drizzle-orm';

import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { integrations } from './integrations';
import { invites } from './invites';
import { members } from './members';
import { uploads } from './uploads';
import { users } from './users';

export const organizations = pgTable('organizations', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: varchar().notNull().unique(),
  domain: varchar().unique(),
  shouldAttachUsersByDomain: boolean('should_attach_users_by_domain').default(
    false
  ),
  avatarUrl: varchar('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  ownerId: uuid('owner_id').notNull(),
});

export const organizationsRelations = relations(
  organizations,
  ({ one, many }) => ({
    owner: one(users, {
      fields: [organizations.ownerId],
      references: [users.id],
    }),
    invites: many(invites),
    members: many(members),
    uploads: many(uploads),
    integrations: many(integrations),
  })
);
