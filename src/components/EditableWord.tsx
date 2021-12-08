import React, { useState } from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { GiCancel } from "react-icons/gi";
import { MdDone } from "react-icons/md";
import apiQueries from "../api/apiQueries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type Msg = {
  type: "WordUpdated";
};

type WordsListMsg = {
  type: "CancelChange";
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
          label="English"
          variant="outlined"
          value={draftEditableWord.eng}
          onChange={handleChange}
          name="eng"
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Russian"
          variant="outlined"
          value={draftEditableWord.rus}
          onChange={handleChange}
          name="rus"
        />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="success"
          onClick={(e) => {
            apiQueries.updateItem(draftEditableWord);
            onMsg({ type: "WordUpdated" });
          }}
        >
          <MdDone />
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={(e) => {
            onWordsListMsg({ type: "CancelChange" });
          }}
        >
          <GiCancel />
        </Button>
      </TableCell>
    </TableRow>
  );
};
