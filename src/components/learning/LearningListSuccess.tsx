import React from "react";
import { Language, LearningWord } from "../../types/types";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import { customColors } from "../constants/colors";

type LearningListSuccessProps = {
  words: LearningWord[];
  language: Language;
};

const showFirstLangTitle = (lang: Language): string => {
  return lang === "RU" ? "English" : "Russian";
};
const showSecondLangTitle = (lang: Language): string => {
  return lang === "RU" ? "Russian" : "English";
};

export const LearningListSuccess = ({
  words,
  language,
}: LearningListSuccessProps) => {
  return (
    <TableContainer
      sx={{
        "td, th": {
          fontSize: 24,
        },
      }}
    >
      <Table sx={{ width: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: customColors.tableHead }}>
            <TableCell width="6%">№</TableCell>
            <TableCell width="47%">{showFirstLangTitle(language)}</TableCell>
            <TableCell width="47%">{showSecondLangTitle(language)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {words.map((word: LearningWord, index: number) => {
            return (
              <TableRow
                key={word.key}
                sx={{
                  "&:nth-child(odd) td, &:nth-child(odd) th": {
                    backgroundColor: customColors.tableRowOdd,
                  },
                  "&:nth-child(even) td, &:nth-child(even) th": {
                    backgroundColor: customColors.tableRowEven,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {++index}
                </TableCell>
                <TableCell>
                  {language === "ENG" ? word.rus : word.eng}
                </TableCell>
                <TableCell sx={{ p: 0 }}>
                  <TextField
                    value={language === "ENG" ? word.eng : word.rus}
                    disabled
                    variant="outlined"
                    inputProps={{
                      sx: {
                        backgroundColor: customColors.successInputItem,
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
  );
};
