import {
  AbilityBuilder,
  type CreateAbility,
  createMongoAbility,
  type MongoAbility,
} from '@casl/ability';
import { z } from 'zod';

import type { User } from './models/user';
import { permissions } from './permissions';
import { billingSubject } from './subjects/billing';
import { inviteSubject } from './subjects/invite';
import { organizationSubject } from './subjects/organization';
import { uploadSubject } from './subjects/upload';
import { userSubject } from './subjects/user';

export * from './models/organization';
export * from './models/upload';
export * from './models/user';
export * from './roles';

const appAbilitiesSchema = z.union([
  uploadSubject,
  userSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
]);

type AppAbilities = z.infer<typeof appAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`);
  }

  permissions[user.role](user, builder);

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename;
    },
  });

  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);

  return ability;
}
