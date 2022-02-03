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
