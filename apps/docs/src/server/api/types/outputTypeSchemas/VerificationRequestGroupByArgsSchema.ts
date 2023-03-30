import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestWhereInputSchema } from '../inputTypeSchemas/VerificationRequestWhereInputSchema'
import { VerificationRequestOrderByWithAggregationInputSchema } from '../inputTypeSchemas/VerificationRequestOrderByWithAggregationInputSchema'
import { VerificationRequestScalarFieldEnumSchema } from '../inputTypeSchemas/VerificationRequestScalarFieldEnumSchema'
import { VerificationRequestScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/VerificationRequestScalarWhereWithAggregatesInputSchema'

export const VerificationRequestGroupByArgsSchema: z.ZodType<Prisma.VerificationRequestGroupByArgs> = z.object({
  where: VerificationRequestWhereInputSchema.optional(),
  orderBy: z.union([ VerificationRequestOrderByWithAggregationInputSchema.array(),VerificationRequestOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationRequestScalarFieldEnumSchema.array(),
  having: VerificationRequestScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default VerificationRequestGroupByArgsSchema;
