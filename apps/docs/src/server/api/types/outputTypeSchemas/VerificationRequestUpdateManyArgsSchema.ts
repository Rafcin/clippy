import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestUpdateManyMutationInputSchema } from '../inputTypeSchemas/VerificationRequestUpdateManyMutationInputSchema'
import { VerificationRequestUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/VerificationRequestUncheckedUpdateManyInputSchema'
import { VerificationRequestWhereInputSchema } from '../inputTypeSchemas/VerificationRequestWhereInputSchema'

export const VerificationRequestUpdateManyArgsSchema: z.ZodType<Prisma.VerificationRequestUpdateManyArgs> = z.object({
  data: z.union([ VerificationRequestUpdateManyMutationInputSchema,VerificationRequestUncheckedUpdateManyInputSchema ]),
  where: VerificationRequestWhereInputSchema.optional(),
}).strict()

export default VerificationRequestUpdateManyArgsSchema;
