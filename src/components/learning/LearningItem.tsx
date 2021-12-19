import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import { LearningWord, StateResult } from "./LearningPageLoader";
// import { withStyles } from "@material-ui/core/styles";

type LearningItemProps = {
  word: LearningWord;
  index: number;
  onMsg: (msg: Msg) => void;
  result: StateResult[];
  correctButtonIsClicked: boolean;
};

type Msg = {
  type: "user_entered_word";
  wordFromUser: LearningWord;
};

export const LearningItem = ({
  word,
  index,
  onMsg,
  result,
  correctButtonIsClicked,
}: LearningItemProps) => {
  const [draft, setDraft] = useState<LearningWord>(word);
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    onMsg({ type: "user_entered_word", wordFromUser: draft });
  }, [draft]);

  const submitChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== draft.userInput) {
      setDraft({
        ...draft,
        userInput: value,
      });
      // console.log(draft)
      // не отправляю здесь onMsg потому что почему-то тут в момент отправки сообщения draft еще не изменился
      // поэтому опять отправляю через useEffect
      // onMsg({ type: "user_entered_word", wordFromUser: draft });
    }
  };

  const disableInput = () => {
    const itemResult: StateResult | undefined = result.find(
      (item) => item.id === word.id
    );

    if (!correctButtonIsClicked && result.length > 0) {
      return true;
    } else if (
      correctButtonIsClicked &&
      itemResult !== undefined &&
      !itemResult.isCorrect
    ) {
      return false;
    } else if (
      correctButtonIsClicked &&
      itemResult !== undefined &&
      itemResult.isCorrect
    ) {
      return true;
    }
  };

  const backgroundColor = () => {
    //TODO: Take this part out of the function
    const itemResult: StateResult | undefined = result.find(
      (item) => item.id === word.id
    );

    if (itemResult !== undefined && itemResult.isCorrect) {
      return "#99ff99";
    } else if (itemResult !== undefined && !itemResult.isCorrect) {
      return "#ff6666";
    } else {
      return "#fff";
    }
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {++index}
      </TableCell>
      <TableCell>{word.show}</TableCell>
      <TableCell>
        <TextField
          onChange={handleChange}
          value={value}
          disabled={disableInput()}
          variant="outlined"
          onBlur={submitChange}
          inputProps={{ sx: { backgroundColor: backgroundColor() } }}
        />
      </TableCell>
    </TableRow>
  );
};
