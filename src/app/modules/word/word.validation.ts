import { z } from 'zod';
import { Articles, Gender, PartsOfSpeech, VerbType } from './word.constants';
const wordDetailsValidationSchema = z.object({
  banglaMeaning: z.string(),
  englishMeaning: z.string(),
  germanExample: z.string(),
  banglaExample: z.string(),
  englishExample: z.string(),
});
const conjugationValidationSchema = z.object({
  german: z.string().optional(),
  english: z.string().optional(),
  bangla: z.string().optional(),
});
const createConjugationValidationSchema = z.object({
  präsens: z
    .object({
      ich: conjugationValidationSchema.optional(),
      du: conjugationValidationSchema.optional(),
      'er/sie/es': conjugationValidationSchema.optional(),
      wir: conjugationValidationSchema.optional(),
      ihr: conjugationValidationSchema.optional(),
      sie: conjugationValidationSchema.optional(),
    })
    .optional(),
  präteritum: z
    .object({
      ich: conjugationValidationSchema.optional(),
      du: conjugationValidationSchema.optional(),
      'er/sie/es': conjugationValidationSchema.optional(),
      wir: conjugationValidationSchema.optional(),
      ihr: conjugationValidationSchema.optional(),
      sie: conjugationValidationSchema.optional(),
    })
    .optional(),
  perfekt: z
    .object({
      ich: conjugationValidationSchema.optional(),
      du: conjugationValidationSchema.optional(),
      'er/sie/es': conjugationValidationSchema.optional(),
      wir: conjugationValidationSchema.optional(),
      ihr: conjugationValidationSchema.optional(),
      sie: conjugationValidationSchema.optional(),
    })
    .optional(),
});
const createWordValidationSchema = z.object({
  body: z.object({
    germanWord: z.string(),
    partsOfSpeech: z.enum([...(PartsOfSpeech as [string, ...string[]])]),
    germanPlural: z.string().optional(),
    gender: z.enum([...(Gender as [string, ...string[]])]).optional(),
    article: z.enum([...(Articles as [string, ...string[]])]).optional(),
    verbTypes: z.enum([...(VerbType as [string, ...string[]])]).optional(),
    verbConjugations: createConjugationValidationSchema.optional(),
    details: z.array(wordDetailsValidationSchema),
  }),
});
export const WordValidations = {
  createWordValidationSchema,
};
