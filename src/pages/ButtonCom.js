import React from "react";

const ButtonCom = (props) => {
  return (
    <div>
      <input
        type="button"
        value={props.value}
        className="mr-2"
        onClick={props.onHandleFormat}
      />
    </div>
  );
};

export default ButtonCom;
