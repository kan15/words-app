import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Language } from "../../types/types";

const studyTypes = [
  {
    value: "RU",
    label: "ENG-RU",
  },
  {
    value: "ENG",
    label: "RU-ENG",
  },
];
type FormData = {
  language: Language;
  amountOfWords: number;
};

type Msg = {
  type: "on_form_submitted";
  data: FormData;
};

type LearningFormProps = {
  onMsg: (msg: Msg) => void;
};

export const LearningForm = ({ onMsg }: LearningFormProps) => {
  const [state, setState] = useState<FormData>({
    language: "RU",
    amountOfWords: 0,
  });

  const handleChangeNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value &&
      setState((prevState) => ({
        ...prevState,
        amountOfWords: +event.target.value,
      }));
  };

  return (
    <form
      method="get"
      onSubmit={(e) => {
        onMsg({
          type: "on_form_submitted",
          data: state,
        });
        e.preventDefault();
      }}
    >
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={state.language}
        label="Language"
        onChange={(event) => {
          setState((prevState) => ({
            ...prevState,
            language: event.target.value as Language,
          }));
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
      {state.amountOfWords ? (
        <Button id="startLearningBtn" variant="contained" type="submit">
          Start Learning
        </Button>
      ) : null}
    </form>
  );
};
