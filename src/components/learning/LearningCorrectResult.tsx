import React from "react";

type textCorrectResultProps = {
  words: number;
};

const textCorrectResult = (words: number) => {
  if (words === 0) {
    return "Unfortunately, there are no right words. ";
  } else if (words === 1) {
    return "And one of them is correct. ";
  } else {
    return `And ${words} of them are correct. `;
  }
};

export const LearningCorrectResult = ({ words }: textCorrectResultProps) => {
  return <>{textCorrectResult(words)}</>;
};
