import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Completion = (req, res) => {
  const { ticketid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    changeTicketStatus();
  }, []);

  // const v = setTimeout(() => {
  //   navigate("/");
  // }, 9000);

  const changeTicketStatus = async () => {
    const ticketid1 = {
      ticketid: ticketid,
    };
    await axios.put("/ticket", ticketid1);
  };

  const GoToOrder = async () => {
    // clearTimeout(v);
    navigate("/mybooking");
  };

  return (
    <center>
      <div style={{ marginTop: "200px", fontSize: "20px" }} className="">
        <img
          style={{ width: "80px", height: "80px" }}
          src="/images/right.png"
        />{" "}
        <span style={{ fontSize: "30px" }}>Thank You for Your Payment</span>
      </div>
      <button className="border btn" onClick={() => GoToOrder()}>
        Go To Your Order
      </button>
    </center>
  );
};

export default Completion;
