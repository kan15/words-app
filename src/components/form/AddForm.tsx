import React, { useEffect, useState } from "react";
import { Translation, Word } from "../../types/types";
import apiQueries from "../../api/apiQueries";
import { notReachable } from "../../utilities/utilities";
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
        addingNewWord();
        break;
      }
      case "loaded": {
        onMsg({
          type: "NewWordAdded",
          word: state.word,
        });
        break;
      }
      default:
        // notReachable(state);
        break;
    }
  }, [state]);

  const validationPassed = () => {
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

  const addingNewWord = () => {
    if (validationPassed() && state.type === "loading") {
      apiQueries
        .addItem(state.draft)
        .then(() => {
          setState({ type: "loaded", word: draft });
        })
        .catch((error: Error) => {
          setState({ type: "error", error: error.message });
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraft((draft) => ({
      ...draft,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setState({
      type: "loading",
      draft: draft,
    });
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
