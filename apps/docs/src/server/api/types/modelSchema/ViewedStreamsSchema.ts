import { z } from 'zod';

/////////////////////////////////////////
// VIEWED STREAMS SCHEMA
/////////////////////////////////////////

export const ViewedStreamsSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type ViewedStreams = z.infer<typeof ViewedStreamsSchema>

// VIEWED STREAMS PARTIAL SCHEMA
//------------------------------------------------------

export const ViewedStreamsPartialSchema = ViewedStreamsSchema.partial()

export type ViewedStreamsPartial = z.infer<typeof ViewedStreamsPartialSchema>

// VIEWED STREAMS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ViewedStreamsOptionalDefaultsSchema = ViewedStreamsSchema.merge(z.object({
  id: z.string().optional(),
}))

export type ViewedStreamsOptionalDefaults = z.infer<typeof ViewedStreamsOptionalDefaultsSchema>

export default ViewedStreamsSchema;
