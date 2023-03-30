import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  expires: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();

export default SessionCreateWithoutUserInputSchema;
