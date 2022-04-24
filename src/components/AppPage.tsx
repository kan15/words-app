import React from "react";
import { Word } from "../types/types";
import { AddForm } from "./form/AddForm";
import { WordsList } from "./WordsList";
import Box from "@mui/material/Box";
import { drawerWidth } from "./Menu";

type Msg =
  | {
      type: "new_word_added";
    }
  | {
      type: "list_is_loaded";
    }
  | {
      type: "word_deleted";
    }
  | {
      type: "word_updated";
    };

type AppPageProps = {
  wordsList: Word[];
  onMsg: (msg: Msg) => void;
};

export const AppPage = ({ wordsList, onMsg }: AppPageProps) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <AddForm onMsg={onMsg} />
        <WordsList wordsList={wordsList} onMsg={onMsg} />
      </Box>
    </>
  );
};
