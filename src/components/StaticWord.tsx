import React from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import apiQueries from "../api/apiQueries";
import Button from "@mui/material/Button";

type Msg = {
  type: "WordDeleted";
};

type WordsListMsg = {
  type: "ChangeThisWord";
  word: Word;
};

type StaticWordProps = {
  word: Word;
  index: number;
  onMsg: (msg: Msg) => void;
  onWordsListMsg: (msg: WordsListMsg) => void;
};

export const StaticWord = ({
  word,
  index,
  onMsg,
  onWordsListMsg,
}: StaticWordProps) => {
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
            onWordsListMsg({ type: "ChangeThisWord", word: word });
          }}
        >
          <GrEdit />
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={(e) => {
            apiQueries.deleteItem(word);
            onMsg({ type: "WordDeleted" });
          }}
        >
          <MdDeleteForever />
        </Button>
      </TableCell>
    </TableRow>
  );
};
