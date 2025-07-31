import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export const accountPlanEnum = pgEnum('account_plan', [
  'FREE',
  'PRO',
  'BUSINESS',
]);
export const accountProviderEnum = pgEnum('account_provider', ['GOOGLE']);

export const accounts = pgTable(
  'accounts',
  {
    id: uuid().primaryKey().defaultRandom(),
    plan: accountPlanEnum().default('FREE'),
    provider: accountProviderEnum().notNull(),
    providerAccountId: varchar('provider_account_id').notNull().unique(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [
    unique('accounts_provider_user_unique').on(table.provider, table.userId),
  ]
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
