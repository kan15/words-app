import React, { useState } from "react";
import { Translation } from "../../types/types";

type AddFormProps = {
  onMsg: (msg: Msg) => void;
};

type Msg = {
  type: "AddWordButtonClicked";
  word: Translation;
};

export const AddForm = ({ onMsg }: AddFormProps) => {
  const [newWord, setNewWord] = useState<Translation>({
    eng: "",
    rus: "",
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setNewWord((state) => ({ ...state, [name]: value }));
  };

  return (
    <form>
      <input
        type="text"
        value={newWord.eng}
        name="eng"
        onChange={handleSubmit}
      />
      <input
        type="text"
        value={newWord.rus}
        name="rus"
        onChange={handleSubmit}
      />
      <button
        type="submit"
        onClick={(e) => {
          onMsg({ type: "AddWordButtonClicked", word: newWord });
          e.preventDefault();
        }}
      >
        Add word
      </button>
    </form>
  );
};
