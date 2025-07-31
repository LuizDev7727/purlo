import type { FastifyInstance } from 'fastify';
import { ZodError, z } from 'zod/v4';
import { BadRequestError } from './routes/errors/bad-request-error';
import { UnauthorizedError } from './routes/errors/unauthorized.error';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      errors: z.treeifyError(error).errors,
    });
  }

  if (error instanceof BadRequestError) {
    reply.status(400).send({
      message: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    reply.status(403).send({
      message: error.message,
    });
  }

  reply.status(500).send({ message: error.message });
};
