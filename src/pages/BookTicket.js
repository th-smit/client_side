import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import moment from "moment/moment";
import SeatCom from "../component/Button/SeatCom";
import "../App.css";
const BookTicket = () => {
  const query = new URLSearchParams(window.location.search);
  console.log("location " + window.location.search);
  console.log("query" + query);
  const seats = query.get("seats");

  const navigate = useNavigate();
  const seat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [price, setPrice] = useState(0);
  const [temSeat, setTemSeat] = useState(seats == null ? [] : seats.split(","));
  console.log(temSeat);
  const seatRow = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
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
      console.log("target value" + e.target.value.charCodeAt(0));
      if (
        e.target.value.charCodeAt(0) >= 67 &&
        e.target.value.charCodeAt(0) <= 73
      ) {
        setPrice(price - 150);
      } else if (e.target.value.charCodeAt(0) > 73) {
        setPrice(price - 180);
      } else {
        setPrice(price - 120);
      }
    } else {
      setTemSeat([...temSeat, e.target.value]);
      e.target.style.backgroundColor = "green";
      console.log("target value" + e.target.value.charCodeAt(0));
      if (
        e.target.value.charCodeAt(0) >= 67 &&
        e.target.value.charCodeAt(0) <= 73
      ) {
        setPrice(price + 150);
      } else if (e.target.value.charCodeAt(0) > 73) {
        setPrice(price + 180);
      } else {
        setPrice(price + 120);
      }
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
      console.log(error);
    }
  };

  return (
    showdata && (
      <>
        <div id="bookticket">
          <div className="row bg-dark text-white d-flex justify-content-between">
            <span className="col-sm-1">
              <a className="pointer-link" onClick={() => onBack()}>
                &#60;- Back
              </a>
            </span>

            <span className="col-sm-11">
              <h5>{showdata.title}</h5>
              <p>
                INOX - NADIAD |{" "}
                <span>{moment(showdata.datetime).format("llll")}</span>
              </p>
            </span>
          </div>
          <div className="container">
            <div id="pay" className="align-bottom d-flex justify-content-left">
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
              <br />
              <div>
                <table>
                  <tfoot>
                    <tr className=" mt-1">
                      <td colspan="9">EXCLUSIVE Rs. 120.0</td>
                    </tr>
                    {seatRow.slice(0, 3).map((seatRowAlphabet) => {
                      return (
                        <tr key={seatRowAlphabet}>
                          <SeatCom
                            key={seatRowAlphabet}
                            value={seatRowAlphabet}
                            seatArray={seat}
                            qseats={temSeat}
                            onHandleSeat={handleSeat}
                            selectedSeat={selectedSeat}
                          />
                        </tr>
                      );
                    })}

                    <hr />
                    <tr className=" mt-1">
                      <td colspan="9">PREMIUM Rs. 150.0</td>
                    </tr>

                    {seatRow.slice(3, 9).map((seatRowAlphabet) => {
                      return (
                        <tr key={seatRowAlphabet}>
                          <SeatCom
                            key={seatRowAlphabet}
                            value={seatRowAlphabet}
                            seatArray={seat}
                            qseats={temSeat}
                            onHandleSeat={handleSeat}
                            selectedSeat={selectedSeat}
                          />
                        </tr>
                      );
                    })}
                    <hr />
                    <tr>
                      <td colspan="9" className="mt-1">
                        Golden Rs. 180.0
                      </td>
                    </tr>
                    {seatRow.slice(9).map((seatRowAlphabet) => {
                      return (
                        <tr key={seatRowAlphabet}>
                          <SeatCom
                            key={seatRowAlphabet}
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
              <div className="mt-5 ">
                <img
                  id="screenimage"
                  className="rounded mx-auto d-block d-flex justify-content-center"
                  src="/images/screen.png"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default BookTicket;
