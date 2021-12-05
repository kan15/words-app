import React from "react";
import { DataLearningList, Languages, Translation } from "../../types/types";
import { LearningForm } from "./LearningForm";

type Msg = {
  type: "StartLearning";
  label: Languages | string;
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
