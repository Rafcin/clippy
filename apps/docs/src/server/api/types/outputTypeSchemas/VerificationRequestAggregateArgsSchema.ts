import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestWhereInputSchema } from '../inputTypeSchemas/VerificationRequestWhereInputSchema'
import { VerificationRequestOrderByWithRelationInputSchema } from '../inputTypeSchemas/VerificationRequestOrderByWithRelationInputSchema'
import { VerificationRequestWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationRequestWhereUniqueInputSchema'

export const VerificationRequestAggregateArgsSchema: z.ZodType<Prisma.VerificationRequestAggregateArgs> = z.object({
  where: VerificationRequestWhereInputSchema.optional(),
  orderBy: z.union([ VerificationRequestOrderByWithRelationInputSchema.array(),VerificationRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default VerificationRequestAggregateArgsSchema;
