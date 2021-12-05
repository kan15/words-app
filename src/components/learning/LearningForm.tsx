import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Languages, Translation } from "../../types/types";

const studyTypes = [
  {
    value: "ENG",
    label: "ENG-RU",
  },
  {
    value: "RU",
    label: "RU-ENG",
  },
];

type Msg = {
  type: "StartLearning";
  label: Languages | string;
  amount: number;
};

type LearningFormProps = {
  allWordsArray: Translation[];
  onMsg: (msg: Msg) => void;
};

export const LearningForm = ({ allWordsArray, onMsg }: LearningFormProps) => {
  const [typeStudy, setTypeStudy] = useState<Languages | string>("ENG");
  const [amountWords, setAmountWords] = useState<number>(0);

  const handleChangeLangInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTypeStudy(event.target.value);
  };

  const handleChangeNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value && setAmountWords(+event.target.value);
    if (+event.target.value > allWordsArray.length) {
      event.target.value = allWordsArray.length.toString();
      console.log("В вашем списке нет столько слов");
    }
  };

  const handleSubmit = () => {
    onMsg({
      type: "StartLearning",
      label: typeStudy,
      amount: amountWords,
    });
  };

  return (
    <form method="get" onSubmit={handleSubmit}>
      <TextField
        select
        label="Select"
        value={typeStudy}
        onChange={handleChangeLangInput}
        helperText="Please select your type"
      >
        {studyTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-number"
        InputProps={{ inputProps: { min: 1 } }}
        label="Number of words"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeNumberInput}
      />
      {amountWords ? (
        <Button
          id="startLearningBtn"
          variant="contained"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Start Learning
        </Button>
      ) : null}
    </form>
  );
};
