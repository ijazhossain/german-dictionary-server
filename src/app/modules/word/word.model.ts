import { model, Schema } from 'mongoose';

import { Articles, PartsOfSpeech, VerbType, WordLevel } from './word.constants';
import { TConjugation, TWord, TWordDetails } from './word.interface';
const ConjugationSchema = new Schema<TConjugation>({
  german: { type: String },
  english: { type: String },
  bangla: { type: String },
});
const wordDetailsSchema = new Schema<TWordDetails>({
  banglaMeaning: {
    type: String,
    required: [true, 'Bangla meaning is required'],
  },
  englishMeaning: {
    type: String,
    required: [true, 'English meaning is required'],
  },
  germanExample: {
    type: String,
  },
  banglaExample: {
    type: String,
  },
  englishExample: {
    type: String,
  },
});
const wordSchema = new Schema<TWord>({
  germanWord: {
    type: String,
    required: [true, 'German word is required'],
  },
  partsOfSpeech: {
    type: String,
    enum: PartsOfSpeech,
    required: [true, 'Parts of speech is required'],
  },
  germanPlural: {
    type: String,
  },
  article: {
    type: String,
    enum: { values: Articles, message: 'Article should be der, die or das' },
  },
  wordLevel: {
    type: String,
    enum: {
      values: WordLevel,
      message: 'Word level should be a1, a2, b1, b2, c1 or c2',
    },
  },
  details: [
    {
      type: wordDetailsSchema,
      required: [true, 'Word details is required'],
    },
  ],
  verbType: { type: String, enum: VerbType },
  verbConjugations: {
    präsens: {
      ich: { type: ConjugationSchema },
      du: { type: ConjugationSchema },
      'er/sie/es': { type: ConjugationSchema },
      wir: { type: ConjugationSchema },
      ihr: { type: ConjugationSchema },
      sie: { type: ConjugationSchema },
    },
    präteritum: {
      ich: { type: ConjugationSchema },
      du: { type: ConjugationSchema },
      'er/sie/es': { type: ConjugationSchema },
      wir: { type: ConjugationSchema },
      ihr: { type: ConjugationSchema },
      sie: { type: ConjugationSchema },
    },
    perfekt: {
      ich: { type: ConjugationSchema },
      du: { type: ConjugationSchema },
      'er/sie/es': { type: ConjugationSchema },
      wir: { type: ConjugationSchema },
      ihr: { type: ConjugationSchema },
      sie: { type: ConjugationSchema },
    },
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const Word = model<TWord>('Word', wordSchema);
