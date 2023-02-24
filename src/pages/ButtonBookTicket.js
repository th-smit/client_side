import React from "react";

const ButtonCom = (props) => {
  return (
    <input
      type="button"
      value={props.value}
      className="col-sm-0.2 btn btn-outline-success btn-sm m-2"
      onClick={props.onHandleSeat}
    />
  );
};

export default ButtonCom;
