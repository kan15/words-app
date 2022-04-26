import React from "react";
import { PageLoader } from "./components/PageLoader";

import "./index.css";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <PageLoader />
    </>
  );
}

export default App;
