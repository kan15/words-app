export type Translation = {
  eng: string;
  rus: string;
};

export type TranslationKeys = keyof Translation;

export type Word = Translation & {
  key: string;
};

export type Language = "RU" | "ENG";

export type LearningWord = Word & {
  userValue: string;
};
