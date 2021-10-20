import React, { useState, useEffect } from "react";

import apiQueries from "../api/apiQueries";
import { Word } from "../types/types";
import {notReachable} from "../utilities/utilities";
import {LoadingComponent} from "./LoadingComponent";
import {WordsList} from "./WordsList";

export type State =
    | {
    type: "loading";
}
    | {
    type: "loaded";
    wordsList: Word[];
}
    | {
    type: "error";
    error: string;
};

function useWordsList() {
    const [state, setState] = useState<State>({
        type: "loading"
    });

    const showList = () => {
        apiQueries
            .getData()
            .then((words: Word[]) => {
                setState({
                    type: "loaded",
                    wordsList: words,
                });
            })
            .catch((error: Error) => {
                setState({
                    type: "error",
                    error: error.message,
                });
            });
    };

    useEffect(() => {
        switch (state.type) {
            case "loading":
                showList();
                break;
            case "loaded":
            case "error":
                break;
            default:
                return notReachable(state);
        }
    }, [state]);

    const reloadWordsList = () => {
        setState({
            type: "loading"
        })
    }

    return {state, reloadWordsList}
}

export const PageLoader = () => {

    switch (useWordsList().state.type) {
        case "loading":
            return (
                <LoadingComponent/>
            );

        case "loaded":
            return (
                <WordsList wordLength={useWordsList().state.wordsList}/>
            );

        case "error":
            return (
                <>
                    <div>Server error</div>
                    <button type="button">Reload data</button>
                </>
            );

        default:
            // return notReachable(useWordsList().state.type);
            return (
                <>
                    <div>Server error</div>
                    <button type="button">Reload data</button>
                </>
            );
    }
};
