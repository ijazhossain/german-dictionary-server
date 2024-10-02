type TGender = 'masculine' | 'feminin' | 'neuter';
type TArticle = 'der' | 'die' | 'das';
export type TWordDetails = {
  banglaMeaning: string;
  englishMeaning: string;
  germanExample: string;
  banglaExample: string;
  englishExample: string;
};
export type TWord = {
  germanWord: string;
  germanPlural?: string;
  gender?: TGender;
  article?: TArticle;
  details: [TWordDetails];
  isDeleted: boolean;
};
