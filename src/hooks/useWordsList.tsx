import {useEffect, useState} from "react";
import apiQueries from "../api/apiQueries";
import {Word} from "../types/types";
import {notReachable} from "../utilities/utilities";

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

export const useWordsList = () => {
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