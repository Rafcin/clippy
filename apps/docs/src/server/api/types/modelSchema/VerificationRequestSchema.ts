import { z } from 'zod';

/////////////////////////////////////////
// VERIFICATION REQUEST SCHEMA
/////////////////////////////////////////

export const VerificationRequestSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type VerificationRequest = z.infer<typeof VerificationRequestSchema>

// VERIFICATION REQUEST PARTIAL SCHEMA
//------------------------------------------------------

export const VerificationRequestPartialSchema = VerificationRequestSchema.partial()

export type VerificationRequestPartial = z.infer<typeof VerificationRequestPartialSchema>

// VERIFICATION REQUEST OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const VerificationRequestOptionalDefaultsSchema = VerificationRequestSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type VerificationRequestOptionalDefaults = z.infer<typeof VerificationRequestOptionalDefaultsSchema>

export default VerificationRequestSchema;
