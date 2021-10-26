import React from "react";
import { LoadingComponent } from "./LoadingComponent";
import { WordsList } from "./WordsList";
import { useWordsList } from "../hooks/useWordsList";
import { notReachable } from "../utilities/utilities";
import { ErrorComponent } from "./ErrorComponent";

export const PageLoader = () => {
  const { state, reloadWordsList } = useWordsList();

  switch (state.type) {
    case "loading":
      return <LoadingComponent />;

    case "loaded":
      return (
        <WordsList
          wordsList={state.wordsList}
          onMsg={(msg) => {
            switch (msg.type) {
              case "ListIsLoaded":
                console.log("The list is loaded!");
                return;
            }
          }}
        />
      );

    case "error":
      return (
        <ErrorComponent
          onMsg={(msg) => {
            switch (msg.type) {
              case "ReloadDataButtonClicked":
                reloadWordsList();
                return;
            }
          }}
        />
      );

    default:
      return notReachable(state);
  }
};
