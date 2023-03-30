import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsWhereInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereInputSchema'
import { ViewedStreamsOrderByWithRelationInputSchema } from '../inputTypeSchemas/ViewedStreamsOrderByWithRelationInputSchema'
import { ViewedStreamsWhereUniqueInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereUniqueInputSchema'

export const ViewedStreamsAggregateArgsSchema: z.ZodType<Prisma.ViewedStreamsAggregateArgs> = z.object({
  where: ViewedStreamsWhereInputSchema.optional(),
  orderBy: z.union([ ViewedStreamsOrderByWithRelationInputSchema.array(),ViewedStreamsOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewedStreamsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ViewedStreamsAggregateArgsSchema;
