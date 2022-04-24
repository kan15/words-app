import React, { useEffect, useState } from "react";
import { Translation } from "../../types/types";
import { Input, Button, Typography, Stack } from "@mui/material";
import { isDraftValid, useAddWord } from "../../hooks/useAddWord";
import { LoadingComponent } from "../LoadingComponent";
import Box from "@mui/material/Box";
import { formBackgroundColor } from "../constants/colors";

type AddFormProps = {
  onMsg: (msg: Msg) => void;
};

type Msg = {
  type: "new_word_added";
  word: Translation;
};

export const AddForm = ({ onMsg }: AddFormProps) => {
  const { state, addWord, setError } = useAddWord();

  const [draft, setDraft] = useState<Translation>({
    eng: "",
    rus: "",
  });

  useEffect(() => {
    switch (state.type) {
      case "loaded": {
        onMsg({
          type: "new_word_added",
          word: state.word,
        });
        break;
      }
    }
  }, [onMsg, state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraft((draft) => ({
      ...draft,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isDraftValid(draft)) {
      addWord(draft);
    } else {
      setError("The word you entered is not correct!");
    }
  };

  switch (state.type) {
    case "loading":
      return <LoadingComponent />;
    case "error":
    case "not_asked":
    case "loaded":
      return (
        <>
          <form method="get" onSubmit={handleSubmit} className={"form"}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                border: "2px solid white",
                borderRadius: "15px",
                backgroundColor: formBackgroundColor,
                p: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                }}
              >
                Do you want to add a new word to your list?
              </Typography>
              <Input
                placeholder={"English word version"}
                type="text"
                value={draft.eng}
                name="eng"
                onChange={handleChange}
                sx={{ mt: 1.5, mb: 0.75 }}
                inputProps={{
                  sx: { fontSize: 20 },
                }}
              />
              <Input
                placeholder={"Russian word version"}
                type="text"
                value={draft.rus}
                name="rus"
                onChange={handleChange}
                sx={{ mt: 0.75, mb: 2.5 }}
                inputProps={{
                  sx: { fontSize: 20 },
                }}
              />
              <Button
                className={"form__button"}
                variant="contained"
                color="success"
                type="submit"
                onClick={(e) => {
                  handleSubmit();
                  e.preventDefault();
                }}
              >
                Add word
              </Button>
              <div className={"form_error"}>
                {state.type === "error" ? state.error : null}
              </div>
            </Stack>
          </form>
        </>
      );
  }
};
