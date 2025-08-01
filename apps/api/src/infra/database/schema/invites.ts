import { relations } from 'drizzle-orm';
import {
  index,
  pgEnum,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { users } from './users';

export const roleEnum = pgEnum('role', ['ADMIN', 'MEMBER']);

export const invites = pgTable(
  'invites',
  {
    id: uuid().defaultRandom().primaryKey(),
    email: varchar({ length: 255 }).notNull(),
    role: roleEnum().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    authorId: uuid('author_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'set null',
      }),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [
    index('invites_email_index').on(table.email),
    unique('invites_email_organization_unique').on(
      table.email,
      table.organizationId
    ),
  ]
);

export const invitesRelations = relations(invites, ({ one }) => ({
  author: one(users, {
    fields: [invites.authorId],
    references: [users.id],
    relationName: 'invite_author',
  }),
  organization: one(organizations, {
    fields: [invites.organizationId],
    references: [organizations.id],
  }),
}));
