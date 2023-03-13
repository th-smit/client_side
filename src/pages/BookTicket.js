import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import moment from "moment/moment";
import SeatCom from "../component/Button/SeatCom";
import "../App.css";
const BookTicket = () => {
  const query = new URLSearchParams(window.location.search);
  const seats = query.get("seats");
  console.log("run again");
  const navigate = useNavigate();
  const seat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [price, setPrice] = useState(0);
  const [temSeat, setTemSeat] = useState(seats == null ? [] : seats.split(","));
  const bookedSeat = [null];
  const [unBookedSeat, setUnbooked] = useState([null]);
  const [summary, setSummary] = useState(false);
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

  const onBackTicket = async () => {
    setSummary(false);
  };

  const gotosummary = async () => {
    setSummary(true);
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

    let totalprice = 0;
    temSeat.map((data) => {
      if (selectedSeat !== null) {
        if (!selectedSeat.includes(data)) {
          console.log("2nd");
          unBookedSeat.push(data);
          if (data[0].charCodeAt() > 67 && data[0].charCodeAt() <= 73) {
            totalprice = totalprice + 150;
          } else if (data[0].charCodeAt() > 73) {
            totalprice = totalprice + 180;
          } else {
            totalprice = totalprice + 120;
          }
        } else {
          console.log("pushed data " + data);
          bookedSeat.push(data);
        }
      }
    });
    if (bookedSeat.length !== 1) {
      message.error(bookedSeat.slice(1) + " seat already booked");
      console.log("bookes seat aaray " + bookedSeat);
      console.log("length of bookes seat aaray " + bookedSeat.length);
    }

    setPrice(totalprice);
    console.log("unbooked seat " + unBookedSeat);
  }, [selectedSeat]);

  const getShowData = async () => {
    console.log("function2 called");
    const showData = await axios.get(`/show/seat/${id}`);

    console.log(showData.data.successMessage[0]);
    setShowData(showData.data.successMessage[0]);
    if (selectedSeat === null) {
      setSelectedSeat(showData.data.successMessage[0].seat);
    }
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
        e.target.value.charCodeAt(0) > 67 &&
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
        e.target.value.charCodeAt(0) > 67 &&
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
      //setSummary(true);
      //navigate("/");
    } catch (error) {
      console.log(error);
      message.error(error.response.data.errorMessage);
    }
  };

  return (
    <>
      {showdata && !summary && (
        <>
          <div id="bookticket">
            <div className="row bg-dark text-white ">
              <div className="col-sm-1">
                <button
                  className="mt-3 btn pointer-link"
                  onClick={() => onBack()}
                >
                  &#60;- Back
                </button>
              </div>

              <div className="col-sm-10 ml-4">
                <h5>{showdata.title}</h5>
                <p>
                  Inox Cinema - NADIAD |{" "}
                  <span>{moment(showdata.datetime).format("llll")}</span>
                </p>
              </div>
            </div>
            <div className="container">
              <div
                id="pay"
                className="align-bottom d-flex justify-content-left"
              >
                {price !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => gotosummary()}
                  >
                    {price == 0 ? "" : "Pay : " + price}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-2"></div>
              <div>
                <br />
                <div>
                  <table>
                    <tfoot>
                      <tr className=" mt-1">
                        <td colSpan="9">EXCLUSIVE Rs. 120.0</td>
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
                        <td colSpan="9">PREMIUM Rs. 150.0</td>
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
                        <td colSpan="9" className="mt-1">
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
      )}
      {summary && (
        <>
          <div>
            <h6>hello</h6>
            <p>{unBookedSeat.length} seat is unbooked</p>
            <p>{console.log("hello")}</p>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => onPay()}
            >
              pay
            </button>
            <button
              className="mt-3 btn pointer-link"
              onClick={() => onBackTicket()}
            >
              &#60;- Back
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default BookTicket;
