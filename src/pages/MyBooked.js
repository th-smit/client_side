import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../component/Layout.js/Layout";
import { setHeader } from "./Utils";
import axios from "axios";
import { useState } from "react";
import moment from "moment/moment";

const MyBooked = () => {
  const navigate = useNavigate();
  const [allTicket, setAllTicket] = useState([]);
  useEffect(() => {
    console.log("from homepage " + localStorage.getItem("token"));
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getTicketRecords();
    console.log("hello");
  }, []);

  const getTicketRecords = async () => {
    try {
      setHeader(localStorage.getItem("token"));
      const userEmail = localStorage.getItem("email");
      //console.log(sort[sortValue].sortedby);
      const TicketData = await axios.get(`/ticket?email=${userEmail}`);

      setAllTicket(TicketData.data.successMessage);
      //console.log("show id " + allTicket[0].show_id);
    } catch (error) {
      console.log(error);
      //clearStorage();
      navigate("/login");
    }
  };

  const onDeleteTicket = async (data) => {
    try {
      console.log(data);
      const deleteticket = await axios.delete(
        `/ticket?ticketid=${data._id}&showid=${data.show_id}`
      );
      console.log(deleteticket);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const onBack = async () => {
    navigate("/");
  };

  return (
    <Layout>
      <body className="container">
        <div className="mt-2">
          <a className="pointer-link" onClick={() => onBack()}>
            &#60;- Back
          </a>
        </div>
        {allTicket.map((data) => {
          return (
            <div
              key={data._id}
              className="border bg-opacity-50 p-4 m-2 w-50 rounded"
            >
              <h6>
                <h5>{data.movie_title}</h5>
                Booked seat: {" " + data.seat}
                <br />
                Price:{data.price}
                <br />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                Show Time:{moment(data.show_datetime).format("LT")}
              </h6>
              <input
                type="button"
                // disabled={disable}
                className="btn btn-primary mt-2"
                value="Cancel Ticket"
                onClick={() => onDeleteTicket(data)}
              />
            </div>
          );
        })}
      </body>
    </Layout>
  );
};

export default MyBooked;
