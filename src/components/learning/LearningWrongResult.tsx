import React from "react";

type LearningWrongResultProps = {
  words: number;
};

const textWrongResult = (words: number) => {
  if (words === 0) {
    return "Congratulations! That's right!";
  } else if (words === 1) {
    return "One of them is wrong.";
  } else {
    return `${words} of them are wrong.`;
  }
};

export const LearningWrongResult = ({ words }: LearningWrongResultProps) => {
  return <>{textWrongResult(words)}</>;
};
