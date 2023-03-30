import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const VerificationRequestIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationRequestIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export default VerificationRequestIdentifierTokenCompoundUniqueInputSchema;
