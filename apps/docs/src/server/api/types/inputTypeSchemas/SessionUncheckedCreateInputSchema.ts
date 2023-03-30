import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  expires: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();

export default SessionUncheckedCreateInputSchema;
