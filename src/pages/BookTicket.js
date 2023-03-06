import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import moment from "moment/moment";
import SeatCom from "../component/Button/SeatCom";

const BookTicket = () => {
  const query = new URLSearchParams(window.location.search);
  const seats = query.get("seats");

  const navigate = useNavigate();
  const seat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [price, setPrice] = useState(0);
  const [temSeat, setTemSeat] = useState(seats == null ? [] : seats.split(","));
  console.log(temSeat);
  const seatRow = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
  const [showdata, setShowData] = useState(null);

  var { id } = useParams();

  const onBack = async () => {
    navigate(-1);
  };

  useEffect(() => {
    if (temSeat.length === 0) {
      window.history.replaceState(
        null,
        null,
        window.location.href.split("?")[0]
      );
    } else {
      window.history.replaceState(null, null, `?seats=${temSeat.toString()}`);
    }
  }, [temSeat]);
  useEffect(() => {
    getShowData();
    setPrice(temSeat.length * 112);
  }, []);

  const getShowData = async () => {
    const showData = await axios.get(`/show/seat/${id}`);
    console.log(showData.data.successMessage[0]);
    setShowData(showData.data.successMessage[0]);
    setSelectedSeat(showData.data.successMessage[0].seat);
  };
  const handleSeat = async (e) => {
    console.log(temSeat);
    if (temSeat.includes(e.target.value)) {
      const index = temSeat.indexOf(e.target.value);
      temSeat.splice(index, 1);
      setTemSeat([...temSeat]);
      e.target.style.backgroundColor = "white";
      setPrice(price - 112);
    } else {
      setTemSeat([...temSeat, e.target.value]);
      e.target.style.backgroundColor = "green";
      setPrice(price + 112);
    }
  };
  const onPay = async () => {
    try {
      const ticketDetails = {
        seat: temSeat,
        movieTitle: showdata.title,
        date: showdata.datetime,
        price: price,
        username: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        showid: showdata._id,
      };
      await axios.post("/ticket", ticketDetails);
      navigate(-1);
    } catch (error) {
      message.error(error.response.data.errorMessage.error);
      console.log(error);
    }
  };

  return (
    showdata && (
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
                <h5>{showdata.title}</h5>
                <p>
                  INOX - NADIAD |{" "}
                  <span>{moment(showdata.datetime).format("llll")}</span>
                </p>
              </span>
            </div>
            <div className="container">
              <div>
                {price !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onPay()}
                  >
                    {price == 0 ? "" : "Pay : " + price}
                  </button>
                ) : (
                  " "
                )}
              </div>
              <div className="mt-2"></div>
              <div>
                ROYAL Rs. 112.0
                <table>
                  <tfoot>
                    {seatRow.map((seatRowAlphabet) => {
                      return (
                        <tr>
                          <SeatCom
                            value={seatRowAlphabet}
                            seatArray={seat}
                            qseats={temSeat}
                            onHandleSeat={handleSeat}
                            selectedSeat={selectedSeat}
                          />
                        </tr>
                      );
                    })}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </body>
      </>
    )
  );
};

export default BookTicket;
