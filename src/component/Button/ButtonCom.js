import React from "react";

const ButtonCom = (props) => {
  return (
    <input
      style={{ padding: "3px", borderRadius: "8px" }}
      type="button"
      value={props.value}
      className="mr-2"
      onClick={props.onHandleFormat}
    />
  );
};

export default ButtonCom;
