import { z } from 'zod';
import { type UserWithRelations, UserWithRelationsSchema } from './UserSchema'
import { type UserPartialWithRelations, UserPartialWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string().nullish(),
  provider: z.string(),
  providerAccountId: z.string(),
  token_type: z.string().nullish(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Account = z.infer<typeof AccountSchema>

// ACCOUNT PARTIAL SCHEMA
//------------------------------------------------------

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

// ACCOUNT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AccountOptionalDefaultsSchema = AccountSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCOUNT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AccountOptionalDefaultsWithRelations = z.infer<typeof AccountOptionalDefaultsSchema> & AccountRelations

export const AccountOptionalDefaultsWithRelationsSchema: z.ZodType<AccountOptionalDefaultsWithRelations> = AccountOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCOUNT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccountPartialRelations = {
  user?: UserPartialWithRelations;
};

export type AccountPartialWithRelations = z.infer<typeof AccountPartialSchema> & AccountPartialRelations

export const AccountPartialWithRelationsSchema: z.ZodType<AccountPartialWithRelations> = AccountPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export default AccountSchema;
