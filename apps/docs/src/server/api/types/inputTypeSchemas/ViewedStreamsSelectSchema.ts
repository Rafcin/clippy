import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ViewedStreamsSelectSchema: z.ZodType<Prisma.ViewedStreamsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

export default ViewedStreamsSelectSchema;
