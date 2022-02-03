import React, { useState } from "react";
import { Word } from "../types/types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { EditableWord } from "./EditableWord";
import { WordItem } from "./WordItem";
import "./WordsList.css";

type Msg =
  | {
      type: "word_deleted";
    }
  | {
      type: "word_updated";
    };

type WordsListMsg =
  | {
      type: "change_this_word";
      word: Word;
    }
  | {
      type: "cancel_change";
    };

type WordsListProps = {
  wordsList: Word[];
  onMsg: (msg: Msg) => void;
};

export const WordsList = ({ wordsList, onMsg }: WordsListProps) => {
  const [editableWord, setEditableWord] = useState<null | Word>(null);

  return (
    <>
      <TableContainer
        sx={{
          "td, th": {
            fontSize: 24,
          },
        }}
      >
        <Table sx={{ maxWidth: 900 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#00cc44" }}>
              <TableCell width="5%">№</TableCell>
              <TableCell width="45%">Eng</TableCell>
              <TableCell width="50%" colSpan={2}>
                Rus
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wordsList.map((word: Word, index: number) => {
              return word === editableWord ? (
                <EditableWord
                  key={word.key}
                  word={word}
                  index={index + 1}
                  onMsg={onMsg}
                  onWordsListMsg={(msg: WordsListMsg) => {
                    switch (msg.type) {
                      case "cancel_change":
                        setEditableWord(null);
                        break;
                    }
                  }}
                />
              ) : (
                <WordItem
                  key={word.key}
                  word={word}
                  index={index + 1}
                  onMsg={onMsg}
                  onWordsListMsg={(msg: WordsListMsg) => {
                    switch (msg.type) {
                      case "change_this_word":
                        setEditableWord(word);
                        break;
                    }
                  }}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
