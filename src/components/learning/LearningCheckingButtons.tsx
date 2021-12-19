import React from "react";
import Button from "@mui/material/Button";
import { StateResult } from "./LearningPageLoader";

type Msg =
  | {
      type: "check_user_words";
    }
  | {
      type: "correct_user_words";
    }
  | {
      type: "show_result";
    };

type LearningCheckingButtonsProps = {
  onMsg: (msg: Msg) => void;
  result: StateResult[];
  correctButtonIsClicked: boolean;
};
export const LearningCheckingButtons = ({
  onMsg,
  result,
  correctButtonIsClicked,
}: LearningCheckingButtonsProps) => {
  const anyMistakes = (result: StateResult[]) => {
    return result.find((word) => !word.isCorrect);
  };

  if (result.length === 0 || (correctButtonIsClicked && result.length > 0)) {
    return (
      <Button
        variant="contained"
        onClick={(e) => {
          onMsg({ type: "check_user_words" });
        }}
      >
        Check
      </Button>
    );
  } else if (result.length > 0 && anyMistakes(result) !== undefined) {
    return (
      <>
        <Button
          variant="contained"
          onClick={(e) => {
            onMsg({ type: "correct_user_words" });
          }}
        >
          Correct the wrong words
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            onMsg({ type: "show_result" });
          }}
        >
          Get result
        </Button>
      </>
    );
  } else if (result.length > 0 && anyMistakes(result) === undefined) {
    return (
      <Button
        variant="contained"
        onClick={(e) => {
          // onMsg({ type: "correct_user_words" });
        }}
      >
        That's right!
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        onClick={(e) => {
          // onMsg({ type: "check_user_words" });
        }}
      >
        Error
      </Button>
    );
  }
};
