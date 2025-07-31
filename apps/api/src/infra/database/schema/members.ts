import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, unique, uuid } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { users } from './users';

export const roleEnum = pgEnum('role', ['ADMIN', 'MEMBER']);

export const members = pgTable(
  'members',
  {
    id: uuid().primaryKey().defaultRandom(),
    role: roleEnum().default('MEMBER').notNull(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, {
        onDelete: 'cascade',
      }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [
    unique('members_organization_user_unique').on(
      table.organizationId,
      table.userId
    ),
  ]
);

export const membersRelations = relations(members, ({ one }) => ({
  organization: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
}));
