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
              <TableRow
                key={word.key}
                sx={{
                  "&:nth-child(odd) td, &:nth-child(odd) th": {
                    bgcolor: "white",
                  },
                  "&:nth-child(even) td, &:nth-child(even) th": {
                    bgcolor: "#99ffbb",
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
                        backgroundColor: "#99ff99",
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