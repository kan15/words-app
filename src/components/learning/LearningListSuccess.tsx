import React from "react";
import { Language, LearningWord } from "../../types/types";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";

type LearningListSuccessProps = {
  words: LearningWord[];
  language: Language;
};

export const LearningListSuccess = ({
  words,
  language,
}: LearningListSuccessProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>{language === "ENG" ? "Russian" : "English"}</TableCell>
            <TableCell>{language === "ENG" ? "English" : "Russian"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {words.map((word: LearningWord, index: number) => {
            return (
              <TableRow key={word.key}>
                <TableCell component="th" scope="row">
                  {++index}
                </TableCell>
                <TableCell>
                  {language === "ENG" ? word.rus : word.eng}
                </TableCell>
                <TableCell>
                  <TextField
                    value={language === "ENG" ? word.eng : word.rus}
                    disabled
                    variant="outlined"
                    inputProps={{
                      sx: { backgroundColor: "#99ff99" },
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
