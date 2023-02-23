import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../component/Layout.js/Layout";
import ButtonBookTicket from "./ButtonBookTicket";

const BookTicket = () => {
  const movieData = useLocation().state.movieData;
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState(movieData.seat);
  const onBack = async () => {
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleSeat = async (e) => {
    console.log(e.target.value);
    if (selectedSeat.includes(e.target.value)) {
      setSelectedSeat(selectedSeat.filter((value) => value !== e.target.value));
      e.target.style.backgroundColor = "white";
      console.log(selectedSeat);
    } else {
      setSelectedSeat([...selectedSeat, e.target.value]);
      e.target.style.backgroundColor = "green";
      console.log(selectedSeat);
    }
  };

  return (
    <Layout>
      <div className="container">
        <p>{movieData.title}</p>
        <p>{movieData.time}</p>
        <div>
          ROYAL Rs. 112.0
          <div className="row">
            A{"  "}&nbsp;
            <ButtonBookTicket value="A1" onHandleSeat={handleSeat}>
              1
            </ButtonBookTicket>
            <ButtonBookTicket value="A2" onHandleSeat={handleSeat}>
              2
            </ButtonBookTicket>
            <ButtonBookTicket value="A3" onHandleSeat={handleSeat}>
              3
            </ButtonBookTicket>
            <ButtonBookTicket value="A4" onHandleSeat={handleSeat}>
              4
            </ButtonBookTicket>
            <ButtonBookTicket value="A5" onHandleSeat={handleSeat}>
              5
            </ButtonBookTicket>
            <ButtonBookTicket value="A6" onHandleSeat={handleSeat}>
              6
            </ButtonBookTicket>
            <ButtonBookTicket value="A7" onHandleSeat={handleSeat}>
              7
            </ButtonBookTicket>
            <ButtonBookTicket value="A8" onHandleSeat={handleSeat}>
              8
            </ButtonBookTicket>
            <ButtonBookTicket value="A9" onHandleSeat={handleSeat}>
              9
            </ButtonBookTicket>
            <ButtonBookTicket value="A10" onHandleSeat={handleSeat}>
              10
            </ButtonBookTicket>
            <ButtonBookTicket value="A11" onHandleSeat={handleSeat}>
              11
            </ButtonBookTicket>
            <ButtonBookTicket value="A12" onHandleSeat={handleSeat}>
              12
            </ButtonBookTicket>
            <ButtonBookTicket value="A13" onHandleSeat={handleSeat}>
              13
            </ButtonBookTicket>
            <ButtonBookTicket value="A14" onHandleSeat={handleSeat}>
              14
            </ButtonBookTicket>
            <ButtonBookTicket value="A15" onHandleSeat={handleSeat}>
              15
            </ButtonBookTicket>
            <ButtonBookTicket value="A16" onHandleSeat={handleSeat}>
              16
            </ButtonBookTicket>
            <ButtonBookTicket value="A17" onHandleSeat={handleSeat}>
              17
            </ButtonBookTicket>
            <ButtonBookTicket value="A18" onHandleSeat={handleSeat}>
              18
            </ButtonBookTicket>
          </div>
        </div>
        <div className="mt-2">
          <a className="pointer-link" onClick={() => onBack()}>
            &#60;- Back
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default BookTicket;
