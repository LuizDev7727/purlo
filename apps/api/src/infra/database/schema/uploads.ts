import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';

export const statusEnum = pgEnum('status', [
  'SUCCES',
  'PENDING',
  'SCHEDULE',
  'ERROR',
]);

export const uploads = pgTable('uploads', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  status: statusEnum().notNull(),
  size: integer().notNull(),
  ownerId: uuid('owner_id').notNull(),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, {
      onDelete: 'cascade',
    }),
});

export const uploadsRelations = relations(uploads, ({ one }) => ({
  organization: one(organizations, {
    fields: [uploads.organizationId],
    references: [organizations.id],
  }),
}));
