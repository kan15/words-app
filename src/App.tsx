import React from "react";
import { PageLoader } from "./components/PageLoader";
import { CssBaseline, Typography } from "@mui/material";
import { customColors } from "./components/constants/colors";

function App() {
  return (
    <>
      <CssBaseline />
      <Typography
        style={{
          height: "100%",
          width: "100%",
          background: customColors.generalBackground,
        }}
      >
        <PageLoader />
      </Typography>
    </>
  );
}

export default App;
