import { z } from 'zod';

const createRequestedWordValidationSchema = z.object({
  body: z.object({
    requestedWord: z.string().min(2),
    language: z.string(),
  }),
});
export const RequestedWordValidations = {
  createRequestedWordValidationSchema,
};
