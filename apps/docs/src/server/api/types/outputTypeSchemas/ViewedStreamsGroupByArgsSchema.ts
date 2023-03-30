import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsWhereInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereInputSchema'
import { ViewedStreamsOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ViewedStreamsOrderByWithAggregationInputSchema'
import { ViewedStreamsScalarFieldEnumSchema } from '../inputTypeSchemas/ViewedStreamsScalarFieldEnumSchema'
import { ViewedStreamsScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ViewedStreamsScalarWhereWithAggregatesInputSchema'

export const ViewedStreamsGroupByArgsSchema: z.ZodType<Prisma.ViewedStreamsGroupByArgs> = z.object({
  where: ViewedStreamsWhereInputSchema.optional(),
  orderBy: z.union([ ViewedStreamsOrderByWithAggregationInputSchema.array(),ViewedStreamsOrderByWithAggregationInputSchema ]).optional(),
  by: ViewedStreamsScalarFieldEnumSchema.array(),
  having: ViewedStreamsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ViewedStreamsGroupByArgsSchema;
