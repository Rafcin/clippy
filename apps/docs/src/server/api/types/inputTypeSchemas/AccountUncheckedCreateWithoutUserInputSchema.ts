import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string().optional().nullable(),
  provider: z.string(),
  providerAccountId: z.string(),
  token_type: z.string().optional().nullable(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();

export default AccountUncheckedCreateWithoutUserInputSchema;
