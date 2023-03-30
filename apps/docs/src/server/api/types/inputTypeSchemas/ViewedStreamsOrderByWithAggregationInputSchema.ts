import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ViewedStreamsCountOrderByAggregateInputSchema } from './ViewedStreamsCountOrderByAggregateInputSchema';
import { ViewedStreamsMaxOrderByAggregateInputSchema } from './ViewedStreamsMaxOrderByAggregateInputSchema';
import { ViewedStreamsMinOrderByAggregateInputSchema } from './ViewedStreamsMinOrderByAggregateInputSchema';

export const ViewedStreamsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ViewedStreamsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ViewedStreamsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ViewedStreamsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ViewedStreamsMinOrderByAggregateInputSchema).optional()
}).strict();

export default ViewedStreamsOrderByWithAggregationInputSchema;
