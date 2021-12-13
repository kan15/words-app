export type Translation = {
  eng: string;
  rus: string;
};

export type TranslationKeys = keyof Translation;

export type Word = Translation & {
  key: string;
};

export type Language = "RU" | "ENG";

export type DataLearningList = {
  label: Language;
  amount: number;
};
