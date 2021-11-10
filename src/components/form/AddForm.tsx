import React, { useEffect, useState } from "react";
import { Translation, Word } from "../../types/types";
import apiQueries from "../../api/apiQueries";
import { Input, Button } from "@mui/material";

type AddFormProps = {
  onMsg: (msg: Msg) => void;
  wordsList: Word[];
};

export type State =
  | {
      type: "not_asked";
    }
  | {
      type: "loading";
      draft: Translation;
    }
  | {
      type: "loaded";
      word: Translation;
    }
  | {
      type: "error";
      error: string;
    };

type Msg = {
  type: "NewWordAdded";
  word: Translation;
};

const isDraftValid = (draft: Translation): boolean => {
  const eng = draft.eng.trim();
  const rus = draft.rus.trim();
  const cyrillicRegExpression = /^[а-яА-Я\s]*$/;
  const latinRegExpression = /^[a-zA-Z\s]*$/;
  let isValid = null;
  if (eng.length + rus.length < 2) {
    isValid = false;
  } else
    isValid = !(
      !cyrillicRegExpression.test(rus) || !latinRegExpression.test(eng)
    );
  return isValid;
};

export const AddForm = ({ wordsList, onMsg }: AddFormProps) => {
  const [state, setState] = useState<State>({
    type: "not_asked",
  });

  const [draft, setDraft] = useState<Translation>({
    eng: "",
    rus: "",
  });

  useEffect(() => {
    switch (state.type) {
      case "loading": {
        addingNewWord(state.draft);
        break;
      }
      case "loaded": {
        onMsg({
          type: "NewWordAdded",
          word: state.word,
        });
        break;
      }
    }
  }, [state]);

  const addingNewWord = (word: Translation) => {
    apiQueries.addItem(word).then(() => {
      setState({ type: "loaded", word: word });
    });
    // .catch((error: Error) => {
    //   setState({ type: "error", error: error.message });
    // });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraft((draft) => ({
      ...draft,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isDraftValid(draft)) {
      setState({ type: "loading", draft: draft });
    } else {
      setState({ type: "error", error: "The word is entered incorrectly" });
    }
  };

  return (
    <form method="get" onSubmit={handleSubmit}>
      <Input type="text" value={draft.eng} name="eng" onChange={handleChange} />
      <Input type="text" value={draft.rus} name="rus" onChange={handleChange} />
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
};
