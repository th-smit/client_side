import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import moment from "moment/moment";
import SeatCom from "../component/Button/SeatCom";

const BookTicket = () => {
  const movieData = useLocation().state.movieData;
  const date = useLocation().state.date;
  const navigate = useNavigate();
  const seat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const [selectedSeat, setSelectedSeat] = useState(movieData.seat);
  const [price, setPrice] = useState(0);
  const [temSeat, setTemSeat] = useState([]);
  const seatRow = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

  console.log("hello");
  const onBack = async () => {
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleSeat = async (e) => {
    console.log(temSeat);
    if (temSeat.includes(e.target.value)) {
      const index = temSeat.indexOf(e.target.value);
      temSeat.splice(index, 1);
      setTemSeat([...temSeat]);
      e.target.style.backgroundColor = "white";
      setPrice(price - 1);
    } else {
      setTemSeat([...temSeat, e.target.value]);
      e.target.style.backgroundColor = "green";
      setPrice(price + 1);
    }
  };
  const onPay = async () => {
    try {
      const ticketDetails = {
        seat: temSeat,
        movieTitle: movieData.title,
        time: movieData.time,
        date: date,
      };
      await axios.put("/ticket", ticketDetails);
      // await axios.post;
      navigate("/");
    } catch (error) {
      message.error(error.response.data.errorMessage.error);
      console.log(error);
    }
  };

  return (
    <>
      <body>
        <div id="bookticket">
          <div className=" row bg-dark text-white">
            <span className="col-sm-1">
              <a className="pointer-link" onClick={() => onBack()}>
                &#60;- Back
              </a>
            </span>

            <span className="col">
              <h5>{movieData.title}</h5>
              <p>
                INOX - NADIAD |{" "}
                <span>{moment(movieData.datetime).format("llll")}</span>
              </p>
            </span>
          </div>
          <div className="container">
            <div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => onPay()}
              >
                Pay : {price * 112}
              </button>
              <span>Total : </span>
            </div>
            <div className="mt-2"></div>
            <div>
              ROYAL Rs. 112.0
              <table>
                <tfoot>
                  <tr>
                    <SeatCom
                      value="A"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                  <tr>
                    <SeatCom
                      value="B"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                  <tr>
                    <SeatCom
                      value="C"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                  <tr>
                    <SeatCom
                      value="D"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                  <tr>
                    <SeatCom
                      value="E"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                  <tr>
                    <SeatCom
                      value="F"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                  <tr>
                    <SeatCom
                      value="G"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                  <tr>
                    <SeatCom
                      value="H"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                  <tr>
                    <SeatCom
                      value="I"
                      seatArray={seat}
                      onHandleSeat={handleSeat}
                      selectedSeat={selectedSeat}
                    />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default BookTicket;
