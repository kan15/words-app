import React, { useEffect, useState } from "react";
import { DataLearningList, Translation, Word } from "../../types/types";
import { LearningForm } from "./LearningForm";
import { LearningList } from "./LearningList";
import { v4 as uuidv4 } from "uuid";
import { notReachable } from "../../utilities/utilities";
import { LearningCheckingButtons } from "./LearningCheckingButtons";
import { LearningResult } from "./LearningResult";

type LearningPageLoaderProps = {
  wordsList: Word[];
};

export type LearningWord = {
  id: string;
  show: string;
  hide: string;
  userInput: string;
};

export type StateResult = {
  id: string;
  isCorrect: boolean;
};

type StateLearningWords = LearningWord[];

type StateLearningPage =
  | {
      type: "getting_user_data";
    }
  | {
      type: "got_user_data";
      data: DataLearningList;
    }
  | {
      type: "show_result";
    }
  | {
      type: "error";
      error: string;
    };

export const LearningPageLoader = ({ wordsList }: LearningPageLoaderProps) => {
  const [stateLearning, setStateLearning] = useState<StateLearningPage>({
    type: "getting_user_data",
  });
  const [stateLearningWords, setStateLearningWords] =
    useState<StateLearningWords>([]);

  const [result, setResult] = useState<StateResult[]>([]);

  const [correctButtonIsClicked, setCorrectButtonIsClicked] =
    useState<boolean>(false);

  useEffect(() => {
    switch (stateLearning.type) {
      case "getting_user_data":
        break;
      case "got_user_data":
        setStateLearningWords(learningWordsForUser(stateLearning.data));
        break;
      case "error":
        break;
    }
  }, [stateLearning]);

  const allWordsArray = wordsList.map((word: Word) => {
    const { key, ...translation } = word;
    return translation;
  });

  const learningWordsForUser = (userData: DataLearningList) => {
    const sortArray = allWordsArray
      .sort(function () {
        return Math.random() - 0.5;
      })
      .slice(0, userData.amount);
    const wordArrayUnderStudy = sortArray.map((word: Translation) => {
      return {
        id: uuidv4(),
        show: userData.label === "RU" ? word.rus : word.eng,
        hide: userData.label === "RU" ? word.eng : word.rus,
        userInput: "",
      };
    });
    return wordArrayUnderStudy;
  };

  const addOneUserWordToState = (word: LearningWord) => {
    const newStateLearningWords = [...stateLearningWords];
    const index = newStateLearningWords.findIndex((el) => el.id === word.id);
    newStateLearningWords[index] = word;
    setStateLearningWords(newStateLearningWords);
    console.log(newStateLearningWords);
  };

  const checkResult = (arr: LearningWord[]) => {
    console.log(arr);
    const a = arr.map((word) => {
      return {
        id: word.id,
        isCorrect: word.hide === word.userInput,
      };
    });
    console.log(a);
    return a;
  };

  switch (stateLearning.type) {
    case "getting_user_data":
      return (
        <>
          <LearningForm
            allWordsArray={allWordsArray}
            onMsg={(msg) => {
              switch (msg.type) {
                case "start_learning":
                  setStateLearning({
                    type: "got_user_data",
                    data: { label: msg.label, amount: msg.amount },
                  });
                //TODO: notReacheble here
              }
            }}
          />
        </>
      );

    case "got_user_data":
      return (
        <>
          <LearningList
            labelTable={stateLearning.data.label}
            learningWords={stateLearningWords}
            result={result}
            correctButtonIsClicked={correctButtonIsClicked}
            onMsg={(msg) => {
              switch (msg.type) {
                case "check_user_words":
                  // TODO: check it
                  break;
                case "user_entered_word":
                  addOneUserWordToState(msg.wordFromUser);
                  break;
                default:
                  notReachable(msg);
                  break;
              }
            }}
          />
          <LearningCheckingButtons
            result={result}
            correctButtonIsClicked={correctButtonIsClicked}
            onMsg={(msg) => {
              switch (msg.type) {
                case "check_user_words":
                  setCorrectButtonIsClicked(false);
                  setResult(checkResult(stateLearningWords));
                  break;
                case "correct_user_words":
                  setCorrectButtonIsClicked(true);
                  break;
                case "show_result":
                  setStateLearning({ type: "show_result" });
                //TODO: notReacheble here
              }
            }}
          />
        </>
      );
    case "show_result":
      return <LearningResult result={result} />;
    case "error":
      return <></>;
  }
};
