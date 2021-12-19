import React from "react";
// import { DataLearningList } from "./LearningPageLoader";
import { Language } from "../../types/types";
import { LearningItem } from "./LearningItem";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { LearningWord, StateResult } from "./LearningPageLoader";

type LearningListProps = {
  labelTable: Language;
  learningWords: LearningWord[];
  onMsg: (msg: Msg) => void;
  result: StateResult[];
  correctButtonIsClicked: boolean;
};

type Msg =
  | {
      type: "user_entered_word";
      wordFromUser: LearningWord;
    }
  | {
      type: "check_user_words";
    };

export const LearningList = ({
  labelTable,
  learningWords,
  onMsg,
  result,
  correctButtonIsClicked,
}: LearningListProps) => {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>
                {labelTable === "RU" ? "Russian" : "English"}
              </TableCell>
              <TableCell>
                {labelTable === "RU" ? "English" : "Russian"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {learningWords.map((word: LearningWord, index: number) => {
              return (
                <LearningItem
                  key={word.id}
                  word={word}
                  index={index}
                  onMsg={onMsg}
                  result={result}
                  correctButtonIsClicked={correctButtonIsClicked}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
