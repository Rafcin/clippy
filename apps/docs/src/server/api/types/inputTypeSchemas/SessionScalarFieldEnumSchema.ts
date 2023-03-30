import { z } from 'zod';

export const SessionScalarFieldEnumSchema = z.enum(['id','userId','sessionToken','accessToken','expires','createdAt','updatedAt']);

export default SessionScalarFieldEnumSchema;
