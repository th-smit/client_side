import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";

const Payment = () => {
  const [stripPromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const [ticketData, setTicketData] = useState();
  const [movietitle, setMovieTitle] = useState();
  const [count, setCount] = useState();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    ConfigPayment();
    PaymentIntent();
  }, [count]);

  useEffect(() => {
    // setCount(1);
    setTimeout(() => setCount(1), 500);
  });

  const ConfigPayment = async () => {
    try {
      const key = await axios
        .get("/config")
        .then((result) => {
          setStripePromise(loadStripe(result.data.publishableKey));
          console.log(result.data.publishableKey);
        })
        .catch((error) => console.log(error));

      const ticketData = await axios.get(`/ticket?ticket_id=${id}`);
      console.log("ticket data is is ", ticketData.data.successMessage[0]);
      setTicketData(ticketData.data.successMessage[0]);
      setMovieTitle(ticketData.data.successMessage[0].movie_title);
      console.log(
        "pending status " + ticketData.data.successMessage[0].pending_status
      );
      if (!ticketData.data.successMessage[0].pending_status) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PaymentIntent = async () => {
    try {
      await axios
        .post("payment/create-payment-intent")
        .then((result) => {
          setClientSecret(result.data.successMessage.client_secret);
          console.log(result.data.successMessage.client_secret);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("error " + error);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      {stripPromise && clientSecret && ticketData && (
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-center mt-2 mb-4">
              <Typography sx={{ fontSize: 18 }}>P A Y M E N T</Typography>
            </div>
            <div
            //   style={{ backgroundColor: "#D3D3D3" }}
            // className="d-flex justify-content-center"
            >
              <div className="">
                <Elements stripe={stripPromise} options={{ clientSecret }}>
                  <CheckoutForm ticketid={id} />
                </Elements>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <p>hello</p>
            <p>movie title : {ticketData.movie_title + " "}</p>
            <p>seat : {ticketData.seat}</p>
            <p>price : {ticketData.price}</p>
            <p>discount: {ticketData.discount}</p>
            <p>promo_name : {ticketData.promo_name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
