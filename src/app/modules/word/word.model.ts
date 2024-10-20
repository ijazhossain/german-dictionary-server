import { model, Schema } from 'mongoose';

import {
  Articles,
  Gender,
  PartsOfSpeech,
  VerbCase,
  VerbType,
  WordLevel,
} from './word.constants';
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
    //required: [true, 'German meaning is required'],
  },
  banglaExample: {
    type: String,
    //required: [true, 'Bangla example is required'],
  },
  englishExample: {
    type: String,
    required: [true, 'English example is required'],
  },
});
const wordSchema = new Schema<TWord>({
  germanWord: {
    type: String,
    unique: true,
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
  gender: {
    type: String,
    enum: {
      values: Gender,
      message: 'Gender should be masculine, feminin or neuter ',
    },
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
  verbCase: { type: String, enum: VerbCase },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
wordSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
wordSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

wordSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
export const Word = model<TWord>('Word', wordSchema);
