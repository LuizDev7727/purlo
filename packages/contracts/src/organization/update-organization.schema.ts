import type { z } from 'zod/v4';
import { createOrganizationSchema } from './create-organization.schema';

export const updateOrganizationSchema = createOrganizationSchema;

export type UpdateOrganizationFormBody = z.infer<
  typeof updateOrganizationSchema
>;
