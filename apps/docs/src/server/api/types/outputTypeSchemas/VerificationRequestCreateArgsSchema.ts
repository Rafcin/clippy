import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationRequestCreateInputSchema } from '../inputTypeSchemas/VerificationRequestCreateInputSchema'
import { VerificationRequestUncheckedCreateInputSchema } from '../inputTypeSchemas/VerificationRequestUncheckedCreateInputSchema'
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

export const VerificationRequestCreateArgsSchema: z.ZodType<Prisma.VerificationRequestCreateArgs> = z.object({
  select: VerificationRequestSelectSchema.optional(),
  data: z.union([ VerificationRequestCreateInputSchema,VerificationRequestUncheckedCreateInputSchema ]),
}).strict()

export default VerificationRequestCreateArgsSchema;
