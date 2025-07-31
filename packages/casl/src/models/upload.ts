import { z } from 'zod';

export const uploadSchema = z.object({
  __typename: z.literal('Upload').default('Upload'),
  id: z.string(),
  ownerId: z.string(),
});

export type Upload = z.infer<typeof uploadSchema>;
