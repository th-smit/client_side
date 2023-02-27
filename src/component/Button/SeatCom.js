import React from "react";

const SeatCom = (props) => {
  return (
    <>
      <h6>{props.value}</h6>

      {props.seatArray.map((data) => {
        return (
          <td>
            <button
              value={`${props.value}${data}`}
              key={`${props.value}${data}`}
              className="flex-row btn btn-outline-success btn-sm m-2"
              disabled={
                `${props.selectedSeat}`.includes(`${props.value}${data}`)
                  ? true
                  : false
              }
              onClick={props.onHandleSeat}
            >
              {data}
            </button>
          </td>
        );
      })}
    </>
  );
};

export default SeatCom;
