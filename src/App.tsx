import React from "react";
import { PageLoader } from "./components/PageLoader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
// import { styled, createTheme, ThemeProvider } from "@mui/system";

// const theme = createTheme({
//   // spacing: 0,
//   // typography: {
//   // fontFamily: ["Lato", "sans-serif"].join(","),
//   // fontFamily: "Lato",
//   // },
// });

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <PageLoader />
    // </ThemeProvider>
  );
}

export default App;
