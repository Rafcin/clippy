import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const ViewedStreamsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ViewedStreamsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ViewedStreamsScalarWhereWithAggregatesInputSchema),z.lazy(() => ViewedStreamsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ViewedStreamsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ViewedStreamsScalarWhereWithAggregatesInputSchema),z.lazy(() => ViewedStreamsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default ViewedStreamsScalarWhereWithAggregatesInputSchema;
