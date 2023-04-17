import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Completion = (req, res) => {
  const { ticketid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    changeTicketStatus();
  }, []);

  const changeTicketStatus = async () => {
    const ticketid1 = {
      ticketid: ticketid,
    };
    const ticketData = await axios.put("/ticket", ticketid1);
    setTimeout(() => {
      navigate("/");
    }, 9000);
  };

  return (
    <div>
      <h1>Thank You</h1>
    </div>
  );
};

export default Completion;
