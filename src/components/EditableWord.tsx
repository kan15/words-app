import React, { useState } from "react";
import { Word } from "../types/types";
import TableCell from "@mui/material/TableCell";
import apiQueries from "../api/apiQueries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { styleButton } from "./WordItem";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DoDisturbOffOutlinedIcon from "@mui/icons-material/DoDisturbOffOutlined";
import { CustomizedTableRow } from "./constants/customizedComponents";

const inputStyle = {
  fontSize: 24,
  pl: 2,
  pt: 0.5,
  pb: 0.5,
};

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
  };

  return (
    <CustomizedTableRow>
      <TableCell component="th" scope="row">
        {index}
      </TableCell>
      <TableCell sx={{ p: 0 }}>
        <TextField
          variant="outlined"
          value={draftEditableWord.eng}
          onChange={handleChange}
          name="eng"
          inputProps={{
            sx: inputStyle,
          }}
        />
      </TableCell>
      <TableCell sx={{ p: 0 }}>
        <TextField
          variant="outlined"
          value={draftEditableWord.rus}
          onChange={handleChange}
          name="rus"
          inputProps={{
            sx: inputStyle,
          }}
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
            sx={styleButton}
            color="success"
            onClick={(e) => {
              apiQueries
                .updateItem(draftEditableWord)
                .then(() => onMsg({ type: "word_updated" }));
            }}
          >
            <CheckOutlinedIcon fontSize="small" />
          </Button>
          <Button
            variant="contained"
            sx={styleButton}
            color="info"
            onClick={(e) => {
              onWordsListMsg({ type: "cancel_change" });
            }}
          >
            <DoDisturbOffOutlinedIcon fontSize="small" />
          </Button>
        </Stack>
      </TableCell>
    </CustomizedTableRow>
  );
};
