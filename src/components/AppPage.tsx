import React from "react";
import { Word } from "../types/types";
import { AddForm } from "./form/AddForm";
import { WordsList } from "./WordsList";

type Msg =
  | {
      type: "new_word_added";
    }
  | {
      type: "list_is_loaded";
    }
  | {
      type: "word_deleted";
    }
  | {
      type: "word_updated";
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
