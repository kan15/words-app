import React from "react";

interface ErrorComponentProps {
    onMsg: (msg: Msg) => void,
}

type Msg = | {
    type: 'ReloadDataButtonClicked';
}

export const ErrorComponent = ({onMsg}:ErrorComponentProps) => {
    return (
        <>
            <div>Server error</div>
            <button
                title="Reload data"
                type="button"
                onClick={() => {
                    onMsg({type: 'ReloadDataButtonClicked'})
                }}
            >
                Reload data
            </button>
        </>
    )
}