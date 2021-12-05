export type Translation = {
  eng: string;
  rus: string;
};

export type TranslationKeys = keyof Translation;

export type Word = Translation & {
  key: string;
};

export type Languages = "RU" | "ENG";

export type DataLearningList = {
  label: Languages | string;
  amount: number;
};
