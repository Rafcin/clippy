import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ViewedStreamsCreateManyInputSchema: z.ZodType<Prisma.ViewedStreamsCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export default ViewedStreamsCreateManyInputSchema;
