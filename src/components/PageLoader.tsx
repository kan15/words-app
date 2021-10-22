import React from "react";
import {LoadingComponent} from "./LoadingComponent";
import {WordsList} from "./WordsList";
import {useWordsList} from "../hooks/useWordsList";
import {notReachable} from "../utilities/utilities";
import {ErrorComponent} from "./ErrorComponent";

export const PageLoader = () => {
    const { state, reloadWordsList } = useWordsList();

    switch (state.type) {
        case "loading":
            return (
                <LoadingComponent/>
            );

        case "loaded":
            return (
                <WordsList
                    listLength={state.wordsList.length}
                    onMsg={(msg) => {
                        msg.type === 'ListIsLoaded' && console.log('The list is loaded!');
                    }}
                />
            );

        case "error":
            return (
                <ErrorComponent
                    onMsg={(msg) => {
                        msg.type === 'ReloadDataButtonClicked' && reloadWordsList();
                    }}
                />
            );

        default:
            return notReachable(state.type);
    }
};
