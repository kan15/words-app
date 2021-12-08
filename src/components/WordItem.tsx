import React from "react";
import { Word } from "../types/types";
import { EditableWord } from "./EditableWord";
import { StaticWord } from "./StaticWord";

type WordItemProps = {
  word: Word;
  index: number;
  onMsg: (msg: Msg) => void;
  editableWord: null | Word;
  onWordsListMsg: (msg: WordsListMsg) => void;
};

type Msg =
  | {
      type: "WordUpdated";
    }
  | {
      type: "WordDeleted";
    };

type WordsListMsg =
  | {
      type: "ChangeThisWord";
      word: Word;
    }
  | {
      type: "CancelChange";
    };

export const WordItem = ({
  word,
  index,
  onMsg,
  editableWord,
  onWordsListMsg,
}: WordItemProps) => {
  return word === editableWord ? (
    <EditableWord
      word={word}
      index={index}
      onMsg={onMsg}
      onWordsListMsg={onWordsListMsg}
    />
  ) : (
    <StaticWord
      word={word}
      index={index}
      onMsg={onMsg}
      onWordsListMsg={onWordsListMsg}
    />
  );
};
