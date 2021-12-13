import React from "react";
import { DataLearningList, Language, Translation } from "../../types/types";
import { LearningForm } from "./LearningForm";

type Msg = {
  type: "start_learning";
  label: Language;
  amount: number;
};

type LearningPageProps = {
  allWordsArray: Translation[];
  onMsg: (msg: Msg) => void;
  dataLearningList: DataLearningList;
};

export const LearningPage = ({ allWordsArray, onMsg }: LearningPageProps) => {
  return (
    <>
      <h3>Here you can learn your words</h3>
      <LearningForm allWordsArray={allWordsArray} onMsg={onMsg} />
    </>
  );
};
