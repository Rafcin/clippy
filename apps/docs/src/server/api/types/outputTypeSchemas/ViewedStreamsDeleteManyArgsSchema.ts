import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsWhereInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereInputSchema'

export const ViewedStreamsDeleteManyArgsSchema: z.ZodType<Prisma.ViewedStreamsDeleteManyArgs> = z.object({
  where: ViewedStreamsWhereInputSchema.optional(),
}).strict()

export default ViewedStreamsDeleteManyArgsSchema;
