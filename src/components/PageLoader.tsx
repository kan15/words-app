import React, { useState, useEffect } from "react";

import apiQueries from "../api/apiQueries";
import { Word } from "../Types/types";


const notReachable = (state: never): never => {
    throw new Error(state);
};

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

export const PageLoader = () => {
    const [state, setState] = useState<State>({
        type: "loading",
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

    switch (state.type) {
        case "loading":
            return (
                <>
                    <div>Loading...</div>
                </>
            );

        case "loaded":
            return (
                <>
                    <div>{state.wordsList.length}</div>
                </>
            );

        case "error":
            return (
                <>
                    <div>Server error</div>
                    <button type="button">Reload data</button>
                </>
            );

        default:
            return notReachable(state);
    }
};
