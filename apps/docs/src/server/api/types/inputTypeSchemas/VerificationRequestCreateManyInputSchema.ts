import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const VerificationRequestCreateManyInputSchema: z.ZodType<Prisma.VerificationRequestCreateManyInput> = z.object({
  id: z.string().optional(),
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();

export default VerificationRequestCreateManyInputSchema;
