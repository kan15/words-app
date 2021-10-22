import React from "react";

type Msg = | {
    type: 'ListIsLoaded'
}

interface WordsListProps {
    listLength: number,
    onMsg: (msg: Msg) => void,
}

export const WordsList = ({listLength, onMsg}:WordsListProps) => {
    return (
        <>
            <div>{listLength}</div>
        </>
    )
}