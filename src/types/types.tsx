export type Translation = {
    eng: string;
    rus: string;
};

export type TranslationKeys = keyof Translation;

export type Word = Translation & {
    key: string;
};
