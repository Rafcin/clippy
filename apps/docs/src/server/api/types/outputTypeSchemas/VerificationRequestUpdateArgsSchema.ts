import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestUpdateInputSchema } from '../inputTypeSchemas/VerificationRequestUpdateInputSchema'
import { VerificationRequestUncheckedUpdateInputSchema } from '../inputTypeSchemas/VerificationRequestUncheckedUpdateInputSchema'
import { VerificationRequestWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationRequestWhereUniqueInputSchema'
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

export const VerificationRequestUpdateArgsSchema: z.ZodType<Prisma.VerificationRequestUpdateArgs> = z.object({
  select: VerificationRequestSelectSchema.optional(),
  data: z.union([ VerificationRequestUpdateInputSchema,VerificationRequestUncheckedUpdateInputSchema ]),
  where: VerificationRequestWhereUniqueInputSchema,
}).strict()

export default VerificationRequestUpdateArgsSchema;
