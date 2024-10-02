import { model, Schema } from 'mongoose';
import { TNoun } from './noun.interface';
import { Articles, Gender } from './noun.constants';

const nounSchema = new Schema<TNoun>({
  germanWord: {
    type: String,
    required: [true, 'German word is required'],
  },
  germanPlural: {
    type: String,
    required: [true, 'German plural word is required'],
  },
  gender: {
    type: String,
    enum: Gender,
    required: [true, 'Gender is required'],
  },
  article: {
    type: String,
    enum: Articles,
    required: [true, 'Article is required'],
  },
  englishMeaning: {
    type: [String],
    required: [true, 'English meaning is required'],
  },
  banglaMeaning: {
    type: [String],

    required: [true, 'Bangla meaning is required'],
  },
  germanExample: {
    type: [String],
    required: [true, 'German example is required'],
  },
  englishExample: {
    type: [String],
    required: [true, 'English example is required'],
  },
  banglaExample: {
    type: [String],
    required: [true, 'Bangla example is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
export const Noun = model<TNoun>('Noun', nounSchema);
