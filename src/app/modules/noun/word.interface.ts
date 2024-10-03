type TGender = 'masculine' | 'feminine' | 'neuter';
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
  germanExample: string;
  banglaExample: string;
  englishExample: string;
};
export type TWord = {
  germanWord: string;
  partsOfSpeech: TPartsOfSpeech;
  germanPlural?: string;
  gender?: TGender;
  article?: TArticle;
  details: [TWordDetails];
  isDeleted: boolean;
};
