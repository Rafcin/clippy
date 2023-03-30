import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ViewedStreamsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ViewedStreamsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ViewedStreamsCountOrderByAggregateInputSchema;
