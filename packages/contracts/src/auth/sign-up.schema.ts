import { z } from 'zod/v4';

export const signUpSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
    confirmPassword: z.string(),
    avatar: z.file().optional(),
    // plan: z.enum(['FREE', 'PRO', 'BUSINESS']).optional().default('FREE'),
  })
  .check(
    z.refine((data) => data.password === data.confirmPassword, {
      message: 'Senhas Incorretas',
      path: ['confirmPassword'],
    })
  );

export type SignUpBody = z.infer<typeof signUpSchema>;
