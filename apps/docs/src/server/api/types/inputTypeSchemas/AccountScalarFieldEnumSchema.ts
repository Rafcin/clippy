import { z } from 'zod';

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','token_type','refresh_token','access_token','expires_at','scope','id_token','createdAt','updatedAt']);

export default AccountScalarFieldEnumSchema;
