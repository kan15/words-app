import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

export const CustomizedTableRow = styled(TableRow)`
  &:nth-child(odd) td, &:nth-child(odd) th {
    background: #deeaed;
  },
  &:nth-child(even) td, &:nth-child(even) th {
    background: #bed5da;
  },
`;
