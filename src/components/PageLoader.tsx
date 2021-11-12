import React from "react";
import { LoadingComponent } from "./LoadingComponent";
import { useWordsList } from "../hooks/useWordsList";
import { notReachable } from "../utilities/utilities";
import { ErrorComponent } from "./ErrorComponent";
import { AppPage } from "./AppPage";

export const PageLoader = () => {
  const { state, reloadWordsList } = useWordsList();

  switch (state.type) {
    case "loading":
      return <LoadingComponent />;

    case "loaded":
      return (
        <>
          <AppPage
            wordsList={state.wordsList}
            onMsg={(msg) => {
              switch (msg.type) {
                case "NewWordAdded":
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
