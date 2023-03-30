import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestWhereInputSchema } from '../inputTypeSchemas/VerificationRequestWhereInputSchema'

export const VerificationRequestDeleteManyArgsSchema: z.ZodType<Prisma.VerificationRequestDeleteManyArgs> = z.object({
  where: VerificationRequestWhereInputSchema.optional(),
}).strict()

export default VerificationRequestDeleteManyArgsSchema;
