import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ViewedStreamsUpdateManyMutationInputSchema } from '../inputTypeSchemas/ViewedStreamsUpdateManyMutationInputSchema'
import { ViewedStreamsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ViewedStreamsUncheckedUpdateManyInputSchema'
import { ViewedStreamsWhereInputSchema } from '../inputTypeSchemas/ViewedStreamsWhereInputSchema'

export const ViewedStreamsUpdateManyArgsSchema: z.ZodType<Prisma.ViewedStreamsUpdateManyArgs> = z.object({
  data: z.union([ ViewedStreamsUpdateManyMutationInputSchema,ViewedStreamsUncheckedUpdateManyInputSchema ]),
  where: ViewedStreamsWhereInputSchema.optional(),
}).strict()

export default ViewedStreamsUpdateManyArgsSchema;
