import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingComponent } from "./LoadingComponent";
import { useWordsList } from "../hooks/useWordsList";
import { notReachable } from "../utilities/utilities";
import { ErrorComponent } from "./ErrorComponent";
import { AppPage } from "./AppPage";
import { LearningPage } from "./learning/LearningPage";
import { Menu } from "./Menu";
import Box from "@mui/material/Box";

export const PageLoader = () => {
  const { state, reloadWordsList } = useWordsList();

  switch (state.type) {
    case "loading":
      return <LoadingComponent />;

    case "loaded":
      return (
        <>
          <Menu />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
