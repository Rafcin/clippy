import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.date().optional()
}).strict();

export default DateTimeFieldUpdateOperationsInputSchema;
