import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsCreateManyInputSchema } from '../inputTypeSchemas/ViewedStreamsCreateManyInputSchema'

export const ViewedStreamsCreateManyArgsSchema: z.ZodType<Prisma.ViewedStreamsCreateManyArgs> = z.object({
  data: z.union([ ViewedStreamsCreateManyInputSchema,ViewedStreamsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ViewedStreamsCreateManyArgsSchema;
