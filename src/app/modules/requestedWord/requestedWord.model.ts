import { model, Schema } from 'mongoose';
import { TRequestedWord } from './requestedWord.interface';

const requestedWordSchema = new Schema({
  requestedWord: {
    type: String,
    required: [true, 'Requested word is required'],
  },
  language: {
    type: String,
    enum: ['german', 'english', 'bangla'],
    required: [true, 'Requested word  is required'],
  },
  isAdded: {
    type: Boolean,
    default: false,
  },
});
export const RequestedWord = model<TRequestedWord>(
  'RequestedWord',
  requestedWordSchema,
);
