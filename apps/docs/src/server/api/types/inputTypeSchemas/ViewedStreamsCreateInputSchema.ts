import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ViewedStreamsCreateInputSchema: z.ZodType<Prisma.ViewedStreamsCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export default ViewedStreamsCreateInputSchema;
