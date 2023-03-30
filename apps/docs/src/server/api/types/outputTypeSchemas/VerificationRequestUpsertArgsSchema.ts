import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationRequestWhereUniqueInputSchema'
import { VerificationRequestCreateInputSchema } from '../inputTypeSchemas/VerificationRequestCreateInputSchema'
import { VerificationRequestUncheckedCreateInputSchema } from '../inputTypeSchemas/VerificationRequestUncheckedCreateInputSchema'
import { VerificationRequestUpdateInputSchema } from '../inputTypeSchemas/VerificationRequestUpdateInputSchema'
import { VerificationRequestUncheckedUpdateInputSchema } from '../inputTypeSchemas/VerificationRequestUncheckedUpdateInputSchema'
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

export const VerificationRequestUpsertArgsSchema: z.ZodType<Prisma.VerificationRequestUpsertArgs> = z.object({
  select: VerificationRequestSelectSchema.optional(),
  where: VerificationRequestWhereUniqueInputSchema,
  create: z.union([ VerificationRequestCreateInputSchema,VerificationRequestUncheckedCreateInputSchema ]),
  update: z.union([ VerificationRequestUpdateInputSchema,VerificationRequestUncheckedUpdateInputSchema ]),
}).strict()

export default VerificationRequestUpsertArgsSchema;
