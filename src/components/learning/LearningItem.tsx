import React, { useEffect, useState } from "react";
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
  const [draft, setDraft] = useState<LearningWord>(word);

  useEffect(() => {
    onMsg({ type: "UserEnteredWord", wordFromUser: draft });
  }, [draft]);

  const submitChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value !== draft.userInput &&
      setDraft({
        ...draft,
        userInput: value,
      });
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
