import React, { useEffect, useState } from "react";
import { Translation } from "../types/types";
import apiQueries from "../api/apiQueries";

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
    }
  | {
      type: "not_requested";
      error: string;
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

export const useAddWord = (): {
  state: State;
  addWord: (word: Translation) => void;
} => {
  const [state, setState] = useState<State>({
    type: "not_asked",
  });

  useEffect(() => {
    switch (state.type) {
      case "loading": {
        addingNewWord(state.draft);
        break;
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
        setState({ type: "not_requested", error: error.message });
      });
  };

  const addWord = (word: Translation) => {
    if (isDraftValid(word)) {
      setState({ type: "loading", draft: word });
    } else {
      setState({ type: "error", error: "The word is entered incorrectly" });
    }
  };

  return { state, addWord };
};
