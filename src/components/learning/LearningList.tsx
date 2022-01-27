import React from "react";
import { Language, LearningWord } from "../../types/types";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";

type LearningListMsg = {
  type: "on_user_word_changed";
  learningWords: LearningWord[];
};

type LearningListProps = {
  language: Language;
  showAsErrorWords: boolean;
  learningWords: LearningWord[];
  onMsg: (msg: LearningListMsg) => void;
};

export const LearningList = ({
  language,
  showAsErrorWords,
  learningWords,
  onMsg,
}: LearningListProps) => {
  const backgroundColor = () => {
    return showAsErrorWords ? "#ff6666" : "#fff";
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ maxWidth: 900 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="6%">№</TableCell>
              <TableCell width="47%">
                {language === "RU" ? "English" : "Russian"}
              </TableCell>
              <TableCell width="47%">
                {language === "RU" ? "Russian" : "English"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {learningWords.map((word: LearningWord, index: number) => {
              return (
                <TableRow key={word.key}>
                  <TableCell component="th" scope="row">
                    {++index}
                  </TableCell>
                  <TableCell>
                    {language === "RU" ? word.eng : word.rus}
                  </TableCell>
                  <TableCell>
                    <TextField
                      onChange={(event) => {
                        const newLearningWords = [...learningWords];
                        newLearningWords[index - 1] = {
                          ...newLearningWords[index - 1],
                          userValue: event.target.value,
                        };
                        onMsg({
                          type: "on_user_word_changed",
                          learningWords: newLearningWords,
                        });
                      }}
                      // value={value}
                      // disabled={disableInput()}
                      variant="outlined"
                      // onBlur={submitChange}
                      inputProps={{
                        sx: { backgroundColor: backgroundColor() },
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
