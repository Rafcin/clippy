import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional().nullable()
}).strict();

export default NullableDateTimeFieldUpdateOperationsInputSchema;
