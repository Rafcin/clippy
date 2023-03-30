import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ViewedStreamsOrderByWithRelationInputSchema: z.ZodType<Prisma.ViewedStreamsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ViewedStreamsOrderByWithRelationInputSchema;
