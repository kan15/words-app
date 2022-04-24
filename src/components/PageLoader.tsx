import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingComponent } from "./LoadingComponent";
import { useWordsList } from "../hooks/useWordsList";
import { notReachable } from "../utilities/utilities";
import { ErrorComponent } from "./ErrorComponent";
import { AppPage } from "./AppPage";
import { LearningPage } from "./learning/LearningPage";
import { drawerWidth, Menu } from "./Menu";
import Box from "@mui/material/Box";
import { Drawer } from "@mui/material";
import { Navigation } from "./Navigation";

export const PageLoader = () => {
  const { state, reloadWordsList } = useWordsList();
  const [mobileOpen, setMobileOpen] = useState(false);

  switch (state.type) {
    case "loading":
      return <LoadingComponent />;

    case "loaded":
      return (
        <>
          <Box sx={{ display: "flex" }}>
            <Navigation
              onMsg={(msg) => {
                switch (msg.type) {
                  case "mobile_open":
                    setMobileOpen(!mobileOpen);
                }
              }}
            />
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                variant="temporary"
                open={mobileOpen}
                ModalProps={{
                  keepMounted: true,
                }}
                onClose={(e) => {
                  setMobileOpen(!mobileOpen);
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                <Menu />
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                <Menu />
              </Drawer>
            </Box>
            <Routes>
              <Route
                path="/words-app"
                element={
                  <AppPage
                    wordsList={state.wordsList}
                    onMsg={(msg) => {
                      switch (msg.type) {
                        case "new_word_added":
                        case "word_deleted":
                        case "word_updated":
                          reloadWordsList();
                          return;
                        case "list_is_loaded":
                          return;
                        default:
                          notReachable(msg);
                          break;
                      }
                    }}
                  />
                }
              />
              <Route
                path="/learning"
                element={<LearningPage wordsList={state.wordsList} />}
              />
            </Routes>
          </Box>
        </>
      );

    case "error":
      return (
        <ErrorComponent
          onMsg={(msg) => {
            switch (msg.type) {
              case "reload_data_button_clicked":
                reloadWordsList();
                return;
              default:
                notReachable(msg.type);
                break;
            }
          }}
        />
      );

    default:
      return notReachable(state);
  }
};
