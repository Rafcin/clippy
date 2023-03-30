import { z } from 'zod';
import type { Prisma } from '@prisma/client';
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

export const VerificationRequestDeleteArgsSchema: z.ZodType<Prisma.VerificationRequestDeleteArgs> = z.object({
  select: VerificationRequestSelectSchema.optional(),
  where: VerificationRequestWhereUniqueInputSchema,
}).strict()

export default VerificationRequestDeleteArgsSchema;
