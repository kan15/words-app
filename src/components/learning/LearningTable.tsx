import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Word, Language, LearningWord } from "../../types/types";
import { LearningList } from "./LearningList";
import { notReachable } from "../../utilities/utilities";
import { LearningListSuccess } from "./LearningListSuccess";

type LearningTableMsg =
  | {
      type: "show_result";
      result: {
        correctWords: number;
        wrongWords: number;
      };
    }
  | {
      type: "study_again";
    };

type LearningTableProps = {
  language: Language;
  words: Word[];
  onMsg: (msg: LearningTableMsg) => void;
};

type LearningTableState =
  | {
      type: "learning";
      learningWords: LearningWord[];
    }
  | {
      type: "success";
      words: LearningWord[];
    }
  | {
      type: "not_success";
      successWords: LearningWord[];
      errorWords: LearningWord[];
    };

const checkLearningWords = (words: LearningWord[], lang: Language) => {
  const keyLang = lang === "RU" ? "rus" : "eng";
  return !words.some((word) => word[keyLang] !== word.userValue);
};

const getCorrectWords = (words: LearningWord[], lang: Language) => {
  const keyLang = lang === "RU" ? "rus" : "eng";
  return words.filter((word) => word[keyLang] === word.userValue);
};

const getWrongWords = (words: LearningWord[], lang: Language) => {
  const keyLang = lang === "RU" ? "rus" : "eng";
  return words.filter((word) => word[keyLang] !== word.userValue);
};

export const LearningTable = ({
  language,
  words,
  onMsg,
}: LearningTableProps) => {
  const [state, setState] = useState<LearningTableState>({
    type: "learning",
    learningWords: words.map((word) => ({ ...word, userValue: "" })),
  });

  switch (state.type) {
    case "not_success":
      return (
        <>
          <LearningListSuccess words={state.successWords} language={language} />
          <LearningList
            language={language}
            showAsErrorWords={true}
            learningWords={state.errorWords}
            onMsg={(msg) => {
              switch (msg.type) {
                case "on_user_word_changed":
                  return setState({
                    ...state,
                    errorWords: msg.learningWords,
                  });
                default:
                  return notReachable(msg.type);
              }
            }}
          />
          <Button
            variant="contained"
            onClick={(event) => {
              if (checkLearningWords(state.errorWords, language)) {
                setState({
                  type: "success",
                  words: [...state.successWords, ...state.errorWords],
                });
              } else {
                setState({
                  type: "not_success",
                  successWords: [
                    ...state.successWords,
                    ...getCorrectWords(state.errorWords, language),
                  ],
                  errorWords: getWrongWords(state.errorWords, language),
                });
              }
            }}
          >
            Check again
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              onMsg({
                type: "show_result",
                result: {
                  correctWords: state.successWords.length,
                  wrongWords: state.errorWords.length,
                },
              });
            }}
          >
            Get result
          </Button>
        </>
      );
    case "success":
      return (
        <>
          <LearningListSuccess words={state.words} language={language} />
          <Button
            variant="contained"
            onClick={(e) => {
              onMsg({ type: "study_again" });
            }}
          >
            That's right
          </Button>
        </>
      );

    case "learning":
      return (
        <>
          <LearningList
            language={language}
            showAsErrorWords={false}
            learningWords={state.learningWords}
            onMsg={(msg) => {
              switch (msg.type) {
                case "on_user_word_changed":
                  return setState({
                    ...state,
                    learningWords: msg.learningWords,
                  });
                default:
                  return notReachable(msg.type);
              }
            }}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              if (checkLearningWords(state.learningWords, language)) {
                setState({
                  type: "success",
                  words: state.learningWords,
                });
              } else {
                setState({
                  type: "not_success",
                  successWords: getCorrectWords(state.learningWords, language),
                  errorWords: getWrongWords(state.learningWords, language),
                });
              }
            }}
          >
            Check
          </Button>
        </>
      );

    default:
      return notReachable(state);
  }
};
