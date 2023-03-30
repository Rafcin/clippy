import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { VerificationRequestCountOrderByAggregateInputSchema } from './VerificationRequestCountOrderByAggregateInputSchema';
import { VerificationRequestMaxOrderByAggregateInputSchema } from './VerificationRequestMaxOrderByAggregateInputSchema';
import { VerificationRequestMinOrderByAggregateInputSchema } from './VerificationRequestMinOrderByAggregateInputSchema';

export const VerificationRequestOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationRequestOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationRequestCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationRequestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationRequestMinOrderByAggregateInputSchema).optional()
}).strict();

export default VerificationRequestOrderByWithAggregationInputSchema;
