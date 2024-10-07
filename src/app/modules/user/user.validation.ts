import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});
const createUserValidationSchema = z.object({
  body: z.object({
    name: userNameValidationSchema,
    email: z.string().email(),
    password: z.string().min(6).max(20),
    status: z.enum(['in-progress', 'blocked']),
  }),
});
export const UserValidations = {
  createUserValidationSchema,
};
