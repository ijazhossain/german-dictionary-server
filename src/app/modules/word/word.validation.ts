import { z } from 'zod';
import { Articles, PartsOfSpeech, VerbType } from './word.constants';
const createWordDetailsValidationSchema = z.object({
  banglaMeaning: z.string(),
  englishMeaning: z.string(),
  germanExample: z.string(),
  banglaExample: z.string(),
  englishExample: z.string(),
});
const updateWordDetailsValidationSchema = z.object({
  banglaMeaning: z.string().optional(),
  englishMeaning: z.string().optional(),
  germanExample: z.string().optional(),
  banglaExample: z.string().optional(),
  englishExample: z.string().optional(),
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
    article: z.enum([...(Articles as [string, ...string[]])]).optional(),
    verbTypes: z.enum([...(VerbType as [string, ...string[]])]).optional(),
    verbConjugations: createConjugationValidationSchema.optional(),
    details: z.array(createWordDetailsValidationSchema),
  }),
});
const updateWordValidationSchema = z.object({
  body: z.object({
    germanWord: z.string().optional(),
    partsOfSpeech: z
      .enum([...(PartsOfSpeech as [string, ...string[]])])
      .optional(),
    germanPlural: z.string().optional(),
    article: z.enum([...(Articles as [string, ...string[]])]).optional(),
    verbTypes: z.enum([...(VerbType as [string, ...string[]])]).optional(),
    verbConjugations: createConjugationValidationSchema.optional(),
    details: z.array(updateWordDetailsValidationSchema).optional(),
  }),
});
export const WordValidations = {
  createWordValidationSchema,
  updateWordValidationSchema,
};
