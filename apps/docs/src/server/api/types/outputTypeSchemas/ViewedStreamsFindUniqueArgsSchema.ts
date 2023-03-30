import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsWhereUniqueInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ViewedStreamsSelectSchema: z.ZodType<Prisma.ViewedStreamsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

export const ViewedStreamsFindUniqueArgsSchema: z.ZodType<Prisma.ViewedStreamsFindUniqueArgs> = z.object({
  select: ViewedStreamsSelectSchema.optional(),
  where: ViewedStreamsWhereUniqueInputSchema,
}).strict()

export default ViewedStreamsFindUniqueArgsSchema;
