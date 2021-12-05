import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import { LearningWord } from "./LearningPageLoader";

type LearningItemProps = {
  word: LearningWord;
  index: number;
  onMsg: (msg: Msg) => void;
};

type Msg = {
  type: "UserEnteredWord";
  wordFromUser: LearningWord;
};

export const LearningItem = ({ word, index, onMsg }: LearningItemProps) => {
  const [draft, setDraft] = useState<LearningWord>({
    id: word.id,
    show: word.show,
    hide: "",
  });

  const submitChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDraft({
      ...draft,
      hide: value,
    });
    console.log("Draft на данный момент:");
    console.log(draft);
    onMsg({ type: "UserEnteredWord", wordFromUser: draft });
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {++index}
      </TableCell>
      <TableCell>{word.show}</TableCell>
      <TableCell>
        <TextField variant="outlined" onBlur={submitChange} />
      </TableCell>
    </TableRow>
  );
};
