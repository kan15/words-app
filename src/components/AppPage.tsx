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
    }
  | {
      type: "WordDeleted";
    }
  | {
      type: "WordUpdated";
    };

type AppPageProps = {
  wordsList: Word[];
  onMsg: (msg: Msg) => void;
};

export const AppPage = ({ wordsList, onMsg }: AppPageProps) => {
  return (
    <>
      <AddForm onMsg={onMsg} />
      <WordsList wordsList={wordsList} onMsg={onMsg} />
    </>
  );
};
