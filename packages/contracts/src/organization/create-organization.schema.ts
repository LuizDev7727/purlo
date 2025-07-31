import { z } from 'zod/v4';

const DOMAIN_REGEX = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

export const createOrganizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { error: 'Por favor, inclua pelo menos 4 caracteres.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = DOMAIN_REGEX;

            return domainRegex.test(value);
          }

          return true;
        },
        {
          message: 'Por favor, insira um domínio válido.',
        }
      ),
    avatarUrl: z.string().optional(),
    shouldAttachUsersByDomain: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false;
      }

      return true;
    },
    {
      message: "Domain é obrigatório quando 'auto-join' está habilitado.",
      path: ['domain'],
    }
  );

export type CreateOrganizationBody = z.infer<typeof createOrganizationSchema>;
