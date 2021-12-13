import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Language, Translation } from "../../types/types";

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
  type: "start_learning";
  label: Language;
  amount: number;
};

type LearningFormProps = {
  allWordsArray: Translation[];
  onMsg: (msg: Msg) => void;
};

export const LearningForm = ({ allWordsArray, onMsg }: LearningFormProps) => {
  const [typeStudy, setTypeStudy] = useState<Language>("ENG");
  const [amountWords, setAmountWords] = useState<number>(0);

  const handleChangeNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value && setAmountWords(+event.target.value);
    if (+event.target.value > allWordsArray.length) {
      event.target.value = allWordsArray.length.toString();
      console.log("В вашем списке нет столько слов");
    }
  };

  return (
    <form
      method="get"
      onSubmit={(e) => {
        onMsg({
          type: "start_learning",
          label: typeStudy,
          amount: amountWords,
        });
        e.preventDefault();
      }}
    >
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={typeStudy}
        label="Language"
        onChange={(event) => {
          setTypeStudy(event.target.value as Language);
        }}
      >
        {studyTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
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
        <Button id="startLearningBtn" variant="contained" type="submit">
          Start Learning
        </Button>
      ) : null}
    </form>
  );
};
