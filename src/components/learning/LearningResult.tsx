import React from "react";
import { StateResult } from "./LearningPageLoader";

type LearningResultProps = {
  result: StateResult[];
};

export const LearningResult = ({ result }: LearningResultProps) => {
  const rightWords = () => {
    return result.filter((word) => word.isCorrect).length;
  };

  const wrongWords = () => {
    return result.filter((word) => !word.isCorrect).length;
  };

  return (
    <div>
      You have studied {result.length} words. {rightWords()} of them are correct
      and {wrongWords()} are incorrect.
    </div>
  );
};
