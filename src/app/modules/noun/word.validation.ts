import { z } from 'zod';
import { Articles, Gender, PartsOfSpeech } from './word.constants';
const wordDetailsValidationSchema = z.object({
  body: z.object({
    banglaMeaning: z.string(),
    englishMeaning: z.string(),
    germanExample: z.string(),
    banglaExample: z.string(),
    englishExample: z.string(),
  }),
});
const createWordValidationSchema = z.object({
  body: z.object({
    germanWord: z.string(),
    partsOfSpeech: z.enum([...(PartsOfSpeech as [string, ...string[]])]),
    germanPlural: z.string().optional(),
    gender: z.enum([...(Gender as [string, ...string[]])]),
    article: z.enum([...(Articles as [string, ...string[]])]),
    details: wordDetailsValidationSchema,
  }),
});
export const WordValidations = {
  createWordValidationSchema,
};
