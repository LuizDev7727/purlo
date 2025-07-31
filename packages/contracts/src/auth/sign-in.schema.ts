import { z } from 'zod/v4';

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignInBody = z.infer<typeof signInSchema>;
