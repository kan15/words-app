import React from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import apiQueries from "../api/apiQueries";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

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
    <TableRow
      sx={{
        "&:nth-child(odd) td, &:nth-child(odd) th": {
          bgcolor: "white",
        },
        "&:nth-child(even) td, &:nth-child(even) th": { bgcolor: "#99ffbb" },
      }}
    >
      <TableCell component="th" scope="row" width="5%">
        {index}
      </TableCell>
      <TableCell width="45%">{word.eng}</TableCell>
      <TableCell width="45%">{word.rus}</TableCell>
      <TableCell width="5%">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Button
            className={"word-item_button button_change"}
            variant="contained"
            onClick={(e) => {
              onWordsListMsg({ type: "change_this_word", word: word });
            }}
          >
            <GrEdit />
          </Button>
          <Button
            variant="contained"
            className={"word-item_button"}
            color="error"
            onClick={(e) => {
              apiQueries.deleteItem(word);
              onMsg({ type: "word_deleted" });
            }}
          >
            <MdDeleteForever color="black" />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
