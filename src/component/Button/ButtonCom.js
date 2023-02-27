import React from "react";

const ButtonCom = (props) => {
  return (
    <input
      type="button"
      value={props.value}
      className="mr-2"
      onClick={props.onHandleFormat}
    />
  );
};

export default ButtonCom;
