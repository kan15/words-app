import React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { textBackgroundColor } from "../constants/colors";

type LearningResultPageProps = {
  onMsg: (msg: { type: "study_again" }) => void;
  result: {
    correctWords: number;
    wrongWords: number;
  };
};

const textStudyingResult = (words: number) => {
  return words === 1
    ? "You have studied one word. "
    : `You have studied ${words} words. `;
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

const textWrongResult = (words: number) => {
  if (words === 0) {
    return "Congratulations! That's right!";
  } else if (words === 1) {
    return "One of them is wrong.";
  } else {
    return `${words} of them are wrong.`;
  }
};

export const LearningResultPage = ({
  result,
  onMsg,
}: LearningResultPageProps) => {
  return (
    <>
      <Typography
        sx={{
          backgroundColor: textBackgroundColor,
          p: 4,
          borderRadius: "15px",
          fontSize: "20px",
          mb: 2,
        }}
      >
        {textStudyingResult(result.correctWords + result.wrongWords)}
        {textCorrectResult(result.correctWords)}
        {textWrongResult(result.wrongWords)}
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
