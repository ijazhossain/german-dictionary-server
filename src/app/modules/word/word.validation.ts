import { z } from 'zod';
import { Articles, Gender, PartsOfSpeech } from './word.constants';
const wordDetailsValidationSchema = z.object({
  banglaMeaning: z.string(),
  englishMeaning: z.string(),
  germanExample: z.string(),
  banglaExample: z.string(),
  englishExample: z.string(),
});
const createWordValidationSchema = z.object({
  body: z.object({
    germanWord: z.string(),
    partsOfSpeech: z.enum([...(PartsOfSpeech as [string, ...string[]])]),
    germanPlural: z.string().optional(),
    gender: z.enum([...(Gender as [string, ...string[]])]).optional(),
    article: z.enum([...(Articles as [string, ...string[]])]).optional(),
    details: z.array(wordDetailsValidationSchema),
  }),
});
export const WordValidations = {
  createWordValidationSchema,
};
