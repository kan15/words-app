import React from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import apiQueries from "../api/apiQueries";
import Button from "@mui/material/Button";

type Msg = {
  type: "word_deleted";
};

type WordsListMsg = {
  type: "change_this_word";
  word: Word;
};

type WordItemProps = {
  word: Word;
  index: number;
  onMsg: (msg: Msg) => void;
  onWordsListMsg: (msg: WordsListMsg) => void;
};

export const WordItem = ({
  word,
  index,
  onMsg,
  onWordsListMsg,
}: WordItemProps) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index}
      </TableCell>
      <TableCell>{word.eng}</TableCell>
      <TableCell>{word.rus}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            onWordsListMsg({ type: "change_this_word", word: word });
          }}
        >
          <GrEdit />
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={(e) => {
            apiQueries.deleteItem(word);
            onMsg({ type: "word_deleted" });
          }}
        >
          <MdDeleteForever />
        </Button>
      </TableCell>
    </TableRow>
  );
};
