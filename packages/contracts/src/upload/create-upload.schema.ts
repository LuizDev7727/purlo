import { z } from 'zod/v4';

export const createUploadSchema = z.object({
  uploads: z.array(
    z.object({
      file: z.file(),
      social: z.enum(['YOUTUBE', 'TIKTOK']).nullable(),
      information: z
        .object({
          title: z.string(),
          description: z.string(),
        })
        .nullable(),
    })
  ),
});

export type CreateUploadBody = z.infer<typeof createUploadSchema>;
