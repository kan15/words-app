import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { customColors } from "../constants/colors";
import { LearningStudyingResult } from "./LearningStudyingResult";
import { LearningCorrectResult } from "./LearningCorrectResult";
import { LearningWrongResult } from "./LearningWrongResult";

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
      <Typography
        sx={{
          backgroundColor: customColors.textBackground,
          p: 4,
          borderRadius: "15px",
          fontSize: "20px",
          mb: 2,
        }}
      >
        <LearningStudyingResult
          words={result.correctWords + result.wrongWords}
        />
        <LearningCorrectResult words={result.correctWords} />
        <LearningWrongResult words={result.wrongWords} />
      </Typography>
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
