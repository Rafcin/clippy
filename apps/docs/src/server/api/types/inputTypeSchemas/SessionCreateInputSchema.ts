import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutSessionsInputSchema } from './UserCreateNestedOneWithoutSessionsInputSchema';

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  accessToken: z.string().optional().nullable(),
  expires: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema).optional()
}).strict();

export default SessionCreateInputSchema;
