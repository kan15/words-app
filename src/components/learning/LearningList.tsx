import React from "react";
import { Language, LearningWord } from "../../types/types";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import {
  tableHeadColor,
  tableRowEvenColor,
  tableRowOddColor,
} from "../constants/colors";

type LearningListMsg = {
  type: "on_user_word_changed";
  learningWords: LearningWord[];
};

type LearningListProps = {
  language: Language;
  showAsErrorWords: boolean;
  learningWords: LearningWord[];
  firstWordNumber: number;
  onMsg: (msg: LearningListMsg) => void;
};

export const LearningList = ({
  language,
  showAsErrorWords,
  learningWords,
  firstWordNumber,
  onMsg,
}: LearningListProps) => {
  const backgroundColor = () => {
    return showAsErrorWords ? "#ff6666" : "#fff";
  };
  return (
    <>
      <TableContainer
        sx={{
          "td, th": {
            fontSize: 24,
          },
        }}
      >
        <Table sx={{ width: 900 }} aria-label="simple table">
          {firstWordNumber === 1 && (
            <TableHead>
              <TableRow sx={{ backgroundColor: tableHeadColor }}>
                <TableCell width="6%">№</TableCell>
                <TableCell width="47%">
                  {language === "RU" ? "English" : "Russian"}
                </TableCell>
                <TableCell width="47%">
                  {language === "RU" ? "Russian" : "English"}
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {learningWords.map((word: LearningWord, index: number) => {
              return (
                <TableRow
                  key={word.key}
                  sx={{
                    "&:nth-child(odd) td, &:nth-child(odd) th": {
                      backgroundColor: tableRowOddColor,
                    },
                    "&:nth-child(even) td, &:nth-child(even) th": {
                      backgroundColor: tableRowEvenColor,
                    },
                  }}
                >
                  <TableCell component="th" scope="row" width="6%">
                    {index + firstWordNumber}
                  </TableCell>
                  <TableCell width="47%">
                    {language === "RU" ? word.eng : word.rus}
                  </TableCell>
                  <TableCell sx={{ p: 0 }} width="47%">
                    <TextField
                      onChange={(event) => {
                        const newLearningWords = [...learningWords];
                        newLearningWords[index] = {
                          ...newLearningWords[index],
                          userValue: event.target.value,
                        };
                        onMsg({
                          type: "on_user_word_changed",
                          learningWords: newLearningWords,
                        });
                      }}
                      variant="outlined"
                      inputProps={{
                        sx: {
                          backgroundColor: backgroundColor(),
                          fontSize: 24,
                          pl: 2,
                          pt: 0.5,
                          pb: 0.5,
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
