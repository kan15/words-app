import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Language } from "../../types/types";
import { Stack, Typography } from "@mui/material";

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
      className={"form"}
      onSubmit={(e) => {
        onMsg({
          type: "on_form_submitted",
          data: state,
        });
        e.preventDefault();
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography
          sx={{
            fontSize: 20,
          }}
        >
          In what direction do you want to repeat the words?
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ width: 110 }}
          value={state.language}
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
        <Typography
          sx={{
            fontSize: 20,
          }}
        >
          How many words do you want to repeat?
        </Typography>
        <TextField
          id="outlined-number"
          InputProps={{ inputProps: { min: 1 } }}
          style={{ width: 110 }}
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
      </Stack>
    </form>
  );
};
