import React, { useEffect, useState } from "react";
import { Translation } from "../types/types";
import apiQueries from "../api/apiQueries";
import { notReachable } from "../utilities/utilities";

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

export const isDraftValid = (draft: Translation): boolean => {
  const eng = draft.eng.trim();
  const rus = draft.rus.trim();
  const cyrillicRegExpression = /^[а-яА-Я,\s]*$/;
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

type ReturnType = {
  state: State;
  addWord: (word: Translation) => void;
  setError: (error: string) => void;
};

export const useAddWord = (): ReturnType => {
  const [state, setState] = useState<State>({
    type: "not_asked",
  });

  useEffect(() => {
    switch (state.type) {
      case "not_asked":
        break;
      case "loaded":
        break;
      case "error":
        break;
      case "loading": {
        addingNewWord(state.draft);
        break;
      }
      default: {
        return notReachable(state);
      }
    }
  }, [state]);

  const addingNewWord = (word: Translation) => {
    apiQueries
      .addItem(word)
      .then(() => {
        setState({ type: "loaded", word: word });
      })
      .catch((error: Error) => {
        setState({ type: "error", error: error.message });
      });
  };

  const addWord = (word: Translation) => {
    setState({ type: "loading", draft: word });
  };

  const setError = (error: string): void => {
    setState({ type: "error", error: error });
  };
  return { state, addWord, setError };
};
