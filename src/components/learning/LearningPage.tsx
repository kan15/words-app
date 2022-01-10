import React, { useState } from "react";
import { Word, Language } from "../../types/types";
import { LearningForm } from "./LearningForm";
import { notReachable } from "../../utilities/utilities";
import { LearningTable } from "./LearningTable";
import { LearningResultPage } from "./LearningResultPage";

const sortArray = (array: Word[], amount: number) => {
  return array
    .sort(function () {
      return Math.random() - 0.5;
    })
    .slice(0, amount);
};

type LearningPageProps = {
  wordsList: Word[];
};

type LearningPageState =
  | {
      type: "learning_form";
    }
  | {
      type: "learning_table";
      language: Language;
      words: Word[];
    }
  | {
      type: "learning_result";
      result: {
        correctWords: number;
        wrongWords: number;
      };
    };

export const LearningPage = ({ wordsList }: LearningPageProps) => {
  const [state, setState] = useState<LearningPageState>({
    type: "learning_form",
  });

  switch (state.type) {
    case "learning_result":
      return (
        <LearningResultPage
          result={state.result}
          onMsg={(msg) => {
            switch (msg.type) {
              case "study_again":
                setState({
                  type: "learning_form",
                });
                break;
              default:
                return notReachable(msg.type);
            }
          }}
        />
      );

    case "learning_table":
      return (
        <LearningTable
          words={state.words}
          language={state.language}
          onMsg={(msg) => {
            switch (msg.type) {
              case "show_result":
                setState({
                  type: "learning_result",
                  result: {
                    correctWords: msg.result.correctWords,
                    wrongWords: msg.result.wrongWords,
                  },
                });
                break;
              case "study_again":
                setState({
                  type: "learning_form",
                });
                break;
              default:
                return notReachable(msg);
            }
          }}
        />
      );

    case "learning_form":
      return (
        <LearningForm
          onMsg={(msg) => {
            switch (msg.type) {
              case "on_form_submitted":
                setState({
                  type: "learning_table",
                  language: msg.data.language,
                  words: sortArray(wordsList, msg.data.amountOfWords),
                });
                break;

              default:
                return notReachable(msg.type);
            }
          }}
        />
      );

    default:
      return notReachable(state);
  }
};
