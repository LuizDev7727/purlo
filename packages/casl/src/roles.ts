import { z } from 'zod';

export const roleSchema = z.union([
  // User Roles

  z.literal('ADMIN'),
  z.literal('MEMBER'),

  // Plan
]);

export type Role = z.infer<typeof roleSchema>;
