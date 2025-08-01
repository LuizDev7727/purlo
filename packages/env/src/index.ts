import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_REDIRECT_URI: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    OTEL_TRACES_EXPORTER: z.string(),
    OTEL_EXPORTER_OTLP_ENDPOINT: z.url(),
    OTEL_SERVICE_NAME: z.string(),
    OTEL_NODE_ENABLED_INSTRUMENTATIONS: z.string(),
  },
  client: {},
  shared: {
    CLOUDFLARE_URL: z.url(),
    CLOUDFLARE_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_SECRET_ACCESS_KEY_ID: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,

    OTEL_TRACES_EXPORTER: process.env.OTEL_TRACES_EXPORTER,
    OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
    OTEL_NODE_ENABLED_INSTRUMENTATIONS:
      process.env.OTEL_NODE_ENABLED_INSTRUMENTATIONS,

    CLOUDFLARE_URL: process.env.NEXT_PUBLIC_CLOUDFLARE_URL,
    CLOUDFLARE_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID,
    CLOUDFLARE_SECRET_ACCESS_KEY_ID:
      process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY_ID,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  emptyStringAsUndefined: true,
});
