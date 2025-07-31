import { z } from 'zod';

import { uploadSchema } from '../models/upload';

export const uploadSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Upload'), uploadSchema]),
]);

export type UploadSubject = z.infer<typeof uploadSubject>;
