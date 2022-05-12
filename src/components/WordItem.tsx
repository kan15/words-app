import React from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import apiQueries from "../api/apiQueries";
import { Stack } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  CustomizedButton,
  CustomizedTableRow,
} from "./constants/customizedComponents";

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
    <CustomizedTableRow>
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
          <CustomizedButton
            variant="contained"
            color="warning"
            onClick={(e) => {
              onWordsListMsg({ type: "change_this_word", word: word });
            }}
          >
            <ModeEditOutlineOutlinedIcon fontSize="small" />
          </CustomizedButton>
          <CustomizedButton
            variant="contained"
            color="error"
            onClick={(e) => {
              apiQueries.deleteItem(word);
              onMsg({ type: "word_deleted" });
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </CustomizedButton>
        </Stack>
      </TableCell>
    </CustomizedTableRow>
  );
};
