import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestCreateManyInputSchema } from '../inputTypeSchemas/VerificationRequestCreateManyInputSchema'

export const VerificationRequestCreateManyArgsSchema: z.ZodType<Prisma.VerificationRequestCreateManyArgs> = z.object({
  data: z.union([ VerificationRequestCreateManyInputSchema,VerificationRequestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default VerificationRequestCreateManyArgsSchema;
