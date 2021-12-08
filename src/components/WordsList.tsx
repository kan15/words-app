import React, { useState } from "react";
import { Word } from "../types/types";
import { WordItem } from "./WordItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type Msg =
  | {
      type: "WordDeleted";
    }
  | {
      type: "WordUpdated";
    };

type WordsListMsg =
  | {
      type: "ChangeThisWord";
      word: Word;
    }
  | {
      type: "CancelChange";
    };

type WordsListProps = {
  wordsList: Word[];
  onMsg: (msg: Msg) => void;
};

export const WordsList = ({ wordsList, onMsg }: WordsListProps) => {
  const [editableWord, setEditableWord] = useState<null | Word>(null);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Eng</TableCell>
              <TableCell>Rus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wordsList.map((word: Word, index: number) => {
              return (
                <WordItem
                  key={word.key}
                  word={word}
                  index={index + 1}
                  onMsg={onMsg}
                  editableWord={editableWord}
                  onWordsListMsg={(msg: WordsListMsg) => {
                    switch (msg.type) {
                      case "ChangeThisWord":
                        setEditableWord(word);
                        break;
                      case "CancelChange":
                        setEditableWord(null);
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
