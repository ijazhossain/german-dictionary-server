import { Types } from 'mongoose';

type TArticle = 'der' | 'die' | 'das';
type TPartsOfSpeech =
  | 'nomen'
  | 'verb'
  | 'adjektiv'
  | 'pronomen'
  | 'adverb'
  | 'präposition'
  | 'konjunktion'
  | 'interjektion'
  | 'numerale'
  | 'partikel';

export type TWordDetails = {
  banglaMeaning: string;
  englishMeaning: string;
  germanExample?: string;
  banglaExample?: string;
  englishExample?: string;
};
export type TVerbType = 'regular' | 'irregular';
export type TWordLevel = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';
export type TConjugation = {
  german?: string;
  english?: string;
  bangla?: string;
};
export type TWord = {
  germanWord: string;
  partsOfSpeech: TPartsOfSpeech;
  germanPlural?: string;
  wordLevel?: TWordLevel;
  article?: TArticle;
  details: [TWordDetails];
  verbType?: TVerbType;
  verbConjugations?: {
    präsens: {
      ich: TConjugation;
      du: TConjugation;
      'er/sie/es': TConjugation;
      wir: TConjugation;
      ihr: TConjugation;
      sie: TConjugation;
    };
    präteritum: {
      ich: TConjugation;
      du: TConjugation;
      'er/sie/es': TConjugation;
      wir: TConjugation;
      ihr: TConjugation;
      sie: TConjugation;
    };
    perfekt: {
      ich: TConjugation;
      du: TConjugation;
      'er/sie/es': TConjugation;
      wir: TConjugation;
      ihr: TConjugation;
      sie: TConjugation;
    };
  };
  userId: Types.ObjectId;
  isCompleted: boolean;
};
