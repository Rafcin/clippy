import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';

export const ViewedStreamsWhereInputSchema: z.ZodType<Prisma.ViewedStreamsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ViewedStreamsWhereInputSchema),z.lazy(() => ViewedStreamsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ViewedStreamsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ViewedStreamsWhereInputSchema),z.lazy(() => ViewedStreamsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default ViewedStreamsWhereInputSchema;
