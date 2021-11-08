import React from "react";
import { Word } from "../types/types";
import { AddForm } from "./form/AddForm";
import { WordsList } from "./WordsList";

type Msg =
  | {
      type: "NewWordAdded";
    }
  | {
      type: "ListIsLoaded";
    };

type AppPageProps = {
  wordsList: Word[];
  onMsg: (msg: Msg) => void;
};

export const AppPage = ({ wordsList, onMsg }: AppPageProps) => {
  return (
    <>
      <AddForm wordsList={wordsList} onMsg={onMsg} />
      <WordsList wordsList={wordsList} onMsg={onMsg} />
    </>
  );
};
