import React, { useEffect, useState } from "react";
import { Translation } from "../../types/types";
import { Input, Button } from "@mui/material";
import { isDraftValid, useAddWord } from "../../hooks/useAddWord";
import { LoadingComponent } from "../LoadingComponent";

type AddFormProps = {
  onMsg: (msg: Msg) => void;
};

type Msg = {
  type: "NewWordAdded";
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
          type: "NewWordAdded",
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
      setError("draft is not valid");
    }
  };

  switch (state.type) {
    case "loading":
      return <LoadingComponent />;
    case "error":
    case "not_asked":
    case "loaded":
      return (
        <form method="get" onSubmit={handleSubmit}>
          {state.type === "error" ? state.error : "no errors"}
          <Input
            type="text"
            value={draft.eng}
            name="eng"
            onChange={handleChange}
          />
          <Input
            type="text"
            value={draft.rus}
            name="rus"
            onChange={handleChange}
          />
          <Button
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
        </form>
      );
  }
};
