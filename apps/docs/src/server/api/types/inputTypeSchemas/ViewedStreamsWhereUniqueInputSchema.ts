import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ViewedStreamsWhereUniqueInputSchema: z.ZodType<Prisma.ViewedStreamsWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export default ViewedStreamsWhereUniqueInputSchema;
