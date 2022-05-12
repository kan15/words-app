import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "./Menu";
import MenuIcon from "@mui/icons-material/Menu";

type Msg = {
  type: "mobile_open";
};

type HeaderProps = {
  onMsg: (msg: Msg) => void;
};

export const Header = ({ onMsg }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={(e) => {
            onMsg({ type: "mobile_open" });
          }}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          OK Words
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
