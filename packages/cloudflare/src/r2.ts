import { S3Client } from '@aws-sdk/client-s3';
import { env } from '@purlo/env';

export const r2 = new S3Client({
  region: 'auto',
  endpoint: env.CLOUDFLARE_URL,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY_ID,
  },
});
