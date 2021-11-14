import React from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { MdDeleteForever } from "react-icons/md";
import apiQueries from "../api/apiQueries";

type Msg = {
  type: "WordDeleted";
};

type WordItemProps = {
  word: Word;
  index: number;
  onMsg: (msg: Msg) => void;
};

export const WordItem = ({ word, index, onMsg }: WordItemProps) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index}
      </TableCell>
      <TableCell>{word.eng}</TableCell>
      <TableCell>{word.rus}</TableCell>
      <TableCell>
        <button
          onClick={(e) => {
            apiQueries.deleteItem(word);
            onMsg({ type: "WordDeleted" });
          }}
        >
          <MdDeleteForever />
        </button>
      </TableCell>
    </TableRow>
  );
};
