import React from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import apiQueries from "../api/apiQueries";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { tableRowEvenColor, tableRowOddColor } from "./constants/colors";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export const styleButton = {
  maxWidth: 30,
  maxHeight: 30,
  minWidth: 30,
  minHeight: 30,
  p: 0,
};

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
          backgroundColor: tableRowOddColor,
        },
        "&:nth-child(even) td, &:nth-child(even) th": {
          backgroundColor: tableRowEvenColor,
        },
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
            sx={styleButton}
            variant="contained"
            color="warning"
            onClick={(e) => {
              onWordsListMsg({ type: "change_this_word", word: word });
            }}
          >
            <ModeEditOutlineOutlinedIcon fontSize="small" />
          </Button>
          <Button
            sx={styleButton}
            variant="contained"
            color="error"
            onClick={(e) => {
              apiQueries.deleteItem(word);
              onMsg({ type: "word_deleted" });
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
