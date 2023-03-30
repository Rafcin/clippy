import { z } from 'zod';

export const VerificationRequestScalarFieldEnumSchema = z.enum(['id','identifier','token','expires','createdAt','updatedAt']);

export default VerificationRequestScalarFieldEnumSchema;
