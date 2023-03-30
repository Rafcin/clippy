import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ViewedStreamsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ViewedStreamsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ViewedStreamsMinOrderByAggregateInputSchema;
