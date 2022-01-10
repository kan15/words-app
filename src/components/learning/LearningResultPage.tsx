import React from "react";
import Button from "@mui/material/Button";

type LearningResultPageProps = {
  onMsg: (msg: { type: "study_again" }) => void;
  result: {
    correctWords: number;
    wrongWords: number;
  };
};

export const LearningResultPage = ({
  result,
  onMsg,
}: LearningResultPageProps) => {
  return (
    <>
      <div>
        You have studied {result.correctWords + result.wrongWords}
        words.
        {result.correctWords} of them are correct and
        {result.wrongWords} are incorrect.
      </div>
      <Button
        variant="contained"
        onClick={(e) => {
          onMsg({ type: "study_again" });
        }}
      >
        Study Again
      </Button>
    </>
  );
};
