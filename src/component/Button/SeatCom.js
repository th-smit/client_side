import React from "react";

const SeatCom = (props) => {
  return (
    <>
      <h6 className="mt-3">{props.value}</h6>

      {props.seatArray.map((data) => {
        return (
          <td key={`${props.value}${data}`}>
            <button
              value={`${props.value}${data}`}
              key={`${props.value}${data}`}
              style={{
                backgroundColor: props.qseats.includes(`${props.value}${data}`)
                  ? "green"
                  : "white",
              }}
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
