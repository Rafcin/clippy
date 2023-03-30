import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsUpdateInputSchema } from '../inputTypeSchemas/ViewedStreamsUpdateInputSchema'
import { ViewedStreamsUncheckedUpdateInputSchema } from '../inputTypeSchemas/ViewedStreamsUncheckedUpdateInputSchema'
import { ViewedStreamsWhereUniqueInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ViewedStreamsSelectSchema: z.ZodType<Prisma.ViewedStreamsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

export const ViewedStreamsUpdateArgsSchema: z.ZodType<Prisma.ViewedStreamsUpdateArgs> = z.object({
  select: ViewedStreamsSelectSchema.optional(),
  data: z.union([ ViewedStreamsUpdateInputSchema,ViewedStreamsUncheckedUpdateInputSchema ]),
  where: ViewedStreamsWhereUniqueInputSchema,
}).strict()

export default ViewedStreamsUpdateArgsSchema;
