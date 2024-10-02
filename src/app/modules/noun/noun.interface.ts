type TGender = 'masculin' | 'feminin' | 'neuter';
type TArticle = 'der' | 'die' | 'das';
export type TNoun = {
  germanWord: string;
  germanPlural: string;
  gender: TGender;
  article: TArticle;
  englishMeaning: [string];
  banglaMeaning: [string];
  germanExample: [string];
  englishExample: [string];
  banglaExample: [string];
};
