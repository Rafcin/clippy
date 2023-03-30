import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const VerificationRequestWhereInputSchema: z.ZodType<Prisma.VerificationRequestWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationRequestWhereInputSchema),z.lazy(() => VerificationRequestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationRequestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationRequestWhereInputSchema),z.lazy(() => VerificationRequestWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.date() ]).optional(),
}).strict();

export default VerificationRequestWhereInputSchema;
