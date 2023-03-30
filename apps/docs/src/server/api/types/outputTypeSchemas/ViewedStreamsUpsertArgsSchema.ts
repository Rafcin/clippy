import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsWhereUniqueInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereUniqueInputSchema'
import { ViewedStreamsCreateInputSchema } from '../inputTypeSchemas/ViewedStreamsCreateInputSchema'
import { ViewedStreamsUncheckedCreateInputSchema } from '../inputTypeSchemas/ViewedStreamsUncheckedCreateInputSchema'
import { ViewedStreamsUpdateInputSchema } from '../inputTypeSchemas/ViewedStreamsUpdateInputSchema'
import { ViewedStreamsUncheckedUpdateInputSchema } from '../inputTypeSchemas/ViewedStreamsUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ViewedStreamsSelectSchema: z.ZodType<Prisma.ViewedStreamsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

export const ViewedStreamsUpsertArgsSchema: z.ZodType<Prisma.ViewedStreamsUpsertArgs> = z.object({
  select: ViewedStreamsSelectSchema.optional(),
  where: ViewedStreamsWhereUniqueInputSchema,
  create: z.union([ ViewedStreamsCreateInputSchema,ViewedStreamsUncheckedCreateInputSchema ]),
  update: z.union([ ViewedStreamsUpdateInputSchema,ViewedStreamsUncheckedUpdateInputSchema ]),
}).strict()

export default ViewedStreamsUpsertArgsSchema;
