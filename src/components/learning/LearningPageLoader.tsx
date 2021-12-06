import React, { useEffect, useState } from "react";
import { DataLearningList, Translation, Word } from "../../types/types";
import { LearningForm } from "./LearningForm";
import { LearningList } from "./LearningList";
import { v4 as uuidv4 } from "uuid";
import { notReachable } from "../../utilities/utilities";

type LearningPageLoaderProps = {
  wordsList: Word[];
};

export type LearningWord = {
  id: string;
  show: string;
  hide: string;
  userInput: string;
};

type StateLearningWords = [] | LearningWord[];

type StateLearningPage =
  | {
      type: "getting_user_data";
    }
  | {
      type: "got_user_data";
      data: DataLearningList;
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
    console.log("Изучаемый массив слов:");
    console.log(wordArrayUnderStudy);
    return wordArrayUnderStudy;
  };

  const addOneUserWordToState = (word: LearningWord) => {
    const newStateLearningWords = [...stateLearningWords];
    const index = newStateLearningWords.findIndex((el) => el.id === word.id);
    newStateLearningWords[index] = word;
    setStateLearningWords(newStateLearningWords);
  };

  switch (stateLearning.type) {
    case "getting_user_data":
      return (
        <>
          <LearningForm
            allWordsArray={allWordsArray}
            onMsg={(msg) => {
              switch (msg.type) {
                case "StartLearning":
                  setStateLearning({
                    type: "got_user_data",
                    data: { label: msg.label, amount: msg.amount },
                  });
              }
            }}
          />
        </>
      );

    case "got_user_data":
      return (
        <>
          {
            <LearningList
              labelTable={stateLearning.data.label}
              learningWords={stateLearningWords}
              onMsg={(msg) => {
                switch (msg.type) {
                  case "UserEnteredWord":
                    addOneUserWordToState(msg.wordFromUser);
                }
              }}
            />
          }
        </>
      );
    case "error":
      return <></>;
  }
};
