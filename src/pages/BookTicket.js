import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../component/Layout.js/Layout";
import axios from "axios";
import { message } from "antd";
import Header from "../component/Layout.js/Header";
import Footer from "../component/Layout.js/Footer";

const BookTicket = () => {
  const movieData = useLocation().state.movieData;
  const date = useLocation().state.date;
  const navigate = useNavigate();
  const seat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const [selectedSeat, setSelectedSeat] = useState(movieData.seat);
  const temSeat = [];
  const onBack = async () => {
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [temSeat]);

  const handleSeat = async (e) => {
    if (temSeat.includes(e.target.value)) {
      const index = temSeat.indexOf(e.target.value);
      temSeat.splice(index, 1);
      e.target.style.backgroundColor = "white";
    } else {
      temSeat.push(e.target.value);
      e.target.style.backgroundColor = "green";
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
      await axios.post;
      navigate("/");
    } catch (error) {
      message.error(error.response.data.errorMessage.error);
      console.log(error);
    }
  };

  return (
    <>
      <body>
        <div className="container" id="bookticket">
          <div>
            <h5>{movieData.title}</h5>
            <p>
              INOX - NADIAD | <span>{movieData.time}</span>
            </p>
          </div>
          <div>
            <div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => onPay()}
              >
                Pay
              </button>
              <span>Total : </span>
            </div>
            <div className="mt-2">
              <a className="pointer-link" onClick={() => onBack()}>
                &#60;- Back
              </a>
            </div>
            <div>
              ROYAL Rs. 112.0
              <table>
                <tfoot>
                  <tr>
                    A{"  "}&nbsp;
                    {seat.map((data) => {
                      return (
                        <td>
                          <button
                            value={data}
                            key={data}
                            className="flex-row btn btn-outline-success btn-sm m-2"
                            disabled={
                              selectedSeat.includes(`${data}`) ? true : false
                            }
                            onClick={handleSeat}
                          >
                            {data}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    B{"  "}&nbsp;
                    {seat.map((data) => {
                      return (
                        <td>
                          <button
                            value={data + 18}
                            key={data + 18}
                            disabled={
                              selectedSeat.includes(`${data + 18}`)
                                ? true
                                : false
                            }
                            className="btn btn-outline-success btn-sm m-2"
                            onClick={handleSeat}
                          >
                            {data}
                          </button>
                        </td>
                      );
                    })}
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
