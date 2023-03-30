import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsCreateInputSchema } from '../inputTypeSchemas/ViewedStreamsCreateInputSchema'
import { ViewedStreamsUncheckedCreateInputSchema } from '../inputTypeSchemas/ViewedStreamsUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ViewedStreamsSelectSchema: z.ZodType<Prisma.ViewedStreamsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

export const ViewedStreamsCreateArgsSchema: z.ZodType<Prisma.ViewedStreamsCreateArgs> = z.object({
  select: ViewedStreamsSelectSchema.optional(),
  data: z.union([ ViewedStreamsCreateInputSchema,ViewedStreamsUncheckedCreateInputSchema ]),
}).strict()

export default ViewedStreamsCreateArgsSchema;
