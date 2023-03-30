import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ViewedStreamsUncheckedCreateInputSchema: z.ZodType<Prisma.ViewedStreamsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export default ViewedStreamsUncheckedCreateInputSchema;
