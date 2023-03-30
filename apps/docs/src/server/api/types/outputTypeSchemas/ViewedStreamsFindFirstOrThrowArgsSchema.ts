import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsWhereInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereInputSchema'
import { ViewedStreamsOrderByWithRelationInputSchema } from '../inputTypeSchemas/ViewedStreamsOrderByWithRelationInputSchema'
import { ViewedStreamsWhereUniqueInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereUniqueInputSchema'
import { ViewedStreamsScalarFieldEnumSchema } from '../inputTypeSchemas/ViewedStreamsScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ViewedStreamsSelectSchema: z.ZodType<Prisma.ViewedStreamsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

export const ViewedStreamsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ViewedStreamsFindFirstOrThrowArgs> = z.object({
  select: ViewedStreamsSelectSchema.optional(),
  where: ViewedStreamsWhereInputSchema.optional(),
  orderBy: z.union([ ViewedStreamsOrderByWithRelationInputSchema.array(),ViewedStreamsOrderByWithRelationInputSchema ]).optional(),
  cursor: ViewedStreamsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ViewedStreamsScalarFieldEnumSchema.array().optional(),
}).strict()

export default ViewedStreamsFindFirstOrThrowArgsSchema;
