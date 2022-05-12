import React from "react";

type LearningStudyingResultProps = {
  words: number;
};

export const LearningStudyingResult = ({
  words,
}: LearningStudyingResultProps) => {
  return (
    <>
      {words === 1
        ? "You have studied one word. "
        : `You have studied ${words} words. `}
    </>
  );
};
