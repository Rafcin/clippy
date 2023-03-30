import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { VerificationRequestIdentifierTokenCompoundUniqueInputSchema } from './VerificationRequestIdentifierTokenCompoundUniqueInputSchema';

export const VerificationRequestWhereUniqueInputSchema: z.ZodType<Prisma.VerificationRequestWhereUniqueInput> = z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationRequestIdentifierTokenCompoundUniqueInputSchema).optional()
}).strict();

export default VerificationRequestWhereUniqueInputSchema;
