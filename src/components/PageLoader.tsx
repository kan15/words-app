import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { LoadingComponent } from "./LoadingComponent";
import { useWordsList } from "../hooks/useWordsList";
import { notReachable } from "../utilities/utilities";
import { ErrorComponent } from "./ErrorComponent";
import { AppPage } from "./AppPage";
import { LearningPageLoader } from "./learning/LearningPageLoader";

export const PageLoader = () => {
  const { state, reloadWordsList } = useWordsList();

  switch (state.type) {
    case "loading":
      return <LoadingComponent />;

    case "loaded":
      return (
        <>
          <header>
            <Link to="/">Home</Link>
            <Link to="/learning">Start learning</Link>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <AppPage
                  wordsList={state.wordsList}
                  onMsg={(msg) => {
                    switch (msg.type) {
                      case "NewWordAdded":
                      case "WordDeleted":
                      case "WordUpdated":
                        reloadWordsList();
                        return;
                      case "ListIsLoaded":
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
              element={<LearningPageLoader wordsList={state.wordsList} />}
            />
          </Routes>
        </>
      );

    case "error":
      return (
        <ErrorComponent
          onMsg={(msg) => {
            switch (msg.type) {
              case "ReloadDataButtonClicked":
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
