import React, { useState } from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { GiCancel } from "react-icons/gi";
import { MdDone } from "react-icons/md";
import apiQueries from "../api/apiQueries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

type Msg = {
  type: "word_updated";
};

type WordsListMsg = {
  type: "cancel_change";
};

type WordItemProps = {
  word: Word;
  index: number;
  onMsg: (msg: Msg) => void;
  onWordsListMsg: (msg: WordsListMsg) => void;
};

export const EditableWord = ({
  word,
  index,
  onMsg,
  onWordsListMsg,
}: WordItemProps) => {
  const [draftEditableWord, setDraftEditableWord] = useState<Word>(word);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDraftEditableWord((draftEditableWord: Word) => ({
      ...draftEditableWord,
      [name]: value,
    }));
    console.log(draftEditableWord);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {index}
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          value={draftEditableWord.eng}
          onChange={handleChange}
          name="eng"
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          value={draftEditableWord.rus}
          onChange={handleChange}
          name="rus"
        />
      </TableCell>
      <TableCell>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Button
            variant="contained"
            className={"word-item_button"}
            color="success"
            onClick={(e) => {
              apiQueries.updateItem(draftEditableWord);
              onMsg({ type: "word_updated" });
            }}
          >
            <MdDone />
          </Button>
          <Button
            variant="contained"
            className={"word-item_button button_cancel"}
            onClick={(e) => {
              onWordsListMsg({ type: "cancel_change" });
            }}
          >
            <GiCancel />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
