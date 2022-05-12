import React from "react";
import { Language, LearningWord } from "../../types/types";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import { customColors } from "../constants/colors";
import { CustomizedTableRow } from "../constants/customizedComponents";

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

const getEmptyInputs = () => {
  const inputs: HTMLElement[] = Array.from(
    document.querySelectorAll("input[type=text]")
  );
  const disabled: HTMLElement[] = Array.from(
    document.querySelectorAll("input[type=text]:disabled")
  );
  return inputs.filter((el) => !disabled.includes(el)); // get inputs without disabled option
};

export const LearningList = ({
  language,
  showAsErrorWords,
  learningWords,
  firstWordNumber,
  onMsg,
}: LearningListProps) => {
  const backgroundColor = () => {
    return showAsErrorWords
      ? customColors.errorInputItem
      : customColors.emptyInputItem;
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputs = getEmptyInputs();
      const currentInput = event.target;
      const index = inputs.findIndex((input) => input === currentInput);
      inputs[index + 1 === inputs.length ? 0 : index + 1].focus();
    }
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
        <Table
          sx={{ width: 900 }}
          aria-label="simple table"
          className={"learning-table"}
        >
          {firstWordNumber === 1 && (
            <TableHead>
              <TableRow sx={{ backgroundColor: customColors.tableHead }}>
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
                <CustomizedTableRow key={word.key}>
                  <TableCell component="th" scope="row" width="6%">
                    {index + firstWordNumber}
                  </TableCell>
                  <TableCell width="47%">
                    {language === "RU" ? word.eng : word.rus}
                  </TableCell>
                  <TableCell sx={{ p: 0 }} width="47%">
                    <TextField
                      onKeyDown={handleEnter}
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
                </CustomizedTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
