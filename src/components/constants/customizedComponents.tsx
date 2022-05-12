import styled from "styled-components";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";

export const CustomizedTableRow = styled(TableRow)`
  &:nth-child(odd) td, &:nth-child(odd) th {
    background: #deeaed;
  },
  &:nth-child(even) td, &:nth-child(even) th {
    background: #bed5da;
  },
`;

export const CustomizedButton = styled(Button)`
  max-width: 30px;
  max-height: 30px;
  min-width: 30px;
  min-height: 30px;
  padding: 0;
`;
