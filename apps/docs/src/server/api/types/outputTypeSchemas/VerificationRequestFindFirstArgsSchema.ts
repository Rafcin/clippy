import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestWhereInputSchema } from '../inputTypeSchemas/VerificationRequestWhereInputSchema'
import { VerificationRequestOrderByWithRelationInputSchema } from '../inputTypeSchemas/VerificationRequestOrderByWithRelationInputSchema'
import { VerificationRequestWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationRequestWhereUniqueInputSchema'
import { VerificationRequestScalarFieldEnumSchema } from '../inputTypeSchemas/VerificationRequestScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VerificationRequestSelectSchema: z.ZodType<Prisma.VerificationRequestSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const VerificationRequestFindFirstArgsSchema: z.ZodType<Prisma.VerificationRequestFindFirstArgs> = z.object({
  select: VerificationRequestSelectSchema.optional(),
  where: VerificationRequestWhereInputSchema.optional(),
  orderBy: z.union([ VerificationRequestOrderByWithRelationInputSchema.array(),VerificationRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationRequestScalarFieldEnumSchema.array().optional(),
}).strict()

export default VerificationRequestFindFirstArgsSchema;
