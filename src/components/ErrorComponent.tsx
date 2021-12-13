import React from "react";

type ErrorComponentProps = {
  onMsg: (msg: Msg) => void;
};

type Msg = {
  type: "reload_data_button_clicked";
};

export const ErrorComponent = ({ onMsg }: ErrorComponentProps) => {
  return (
    <>
      <div>Server error</div>
      <button
        title="Reload data"
        type="button"
        onClick={() => {
          onMsg({ type: "reload_data_button_clicked" });
        }}
      >
        Reload data
      </button>
    </>
  );
};
