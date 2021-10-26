import React from "react";
import {Word} from "../types/types";

type Msg = {
  type: "ListIsLoaded";
};

type WordsListProps = {
  wordsList: Word[];
  onMsg: (msg: Msg) => void;
};

export const WordsList = ({ wordsList, onMsg }: WordsListProps) => {
  return (
    <>
      <div>{wordsList.length}</div>
    </>
  );
};
