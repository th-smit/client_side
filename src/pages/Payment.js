import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import "../css/ticket.css";
import QRCode from "qrcode.react";
import Divider from "@mui/material/Divider";
import { MdArrowBackIos } from "react-icons/md";
import Layout from "../component/Layout.js/Layout";
import { message } from "antd";

const Payment = () => {
  const [stripPromise, setStripePromise] = useState(null);
  const [cilentSecretKey, setCilentSecretKey] = useState("");
  const [pik, setPIK] = useState(null);
  const { id } = useParams();
  const [ticketData, setTicketData] = useState();
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    ConfigPayment();
    PaymentIntent();
    // checkPendingStatus();
  }, [cilentSecretKey]);

  // useEffect(() => {
  //   // setCount(1);
  //   setTimeout(() => setCount(1), 500);
  // });

  // const checkPendingStatus = async () => {
  //   const TicketData = await axios.get(`/ticket?ticket_id=${id}`);
  //   console.log("ticket data ", TicketData);
  // };

  const ConfigPayment = async () => {
    try {
      await axios
        .get("/config")
        .then((result) => {
          setStripePromise(loadStripe(result.data.publishableKey));
          console.log("publicahble key ", result.data.publishableKey);
        })
        .catch((error) => console.log(error));

      const ticketData = await axios.get(`/ticket?ticket_id=${id}`);
      setTicketData(ticketData.data.successMessage[0]);
      if (!ticketData.data.successMessage[0].pending_status) {
        // message.success("payment already done");
        navigate("/", { replace: true });
        // navigate(`/completion/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PaymentIntent = async () => {
    try {
      await axios
        .post(`payment/create-payment-intent/${id}`, {
          email: localStorage.getItem("email"),
        })
        .then((result) => {
          if (!cilentSecretKey) {
            setCilentSecretKey(result.data.successMessage.client_secret);
          }
          setPIK(result.data.successMessage.paymentkey);
          setPaymentMethod(result.data.successMessage.paymentMethods);
          console.log(result.data.successMessage.paymentMethods);
        })

        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("error " + error);
    }
  };

  const onBack = async () => {
    await axios.delete(`/ticket?ticketid=${id}&showid=${ticketData.show_id}`);
    navigate(-1);
  };

  return (
    <>
      {stripPromise && cilentSecretKey && ticketData && paymentMethod && (
        <Layout>
          <body className="">
            <div className="mt-3">
              <button
                style={{ background: "#ff944d" }}
                className="col-sm- btn d-flex"
                // onClick={() => onBack()}
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Are you sure want to cancel a transection"
                  );
                  if (confirmBox === true) {
                    onBack();
                  }
                }}
              >
                <div style={{ marginTop: "2px" }}>
                  <MdArrowBackIos />
                </div>

                <div>BACK</div>
              </button>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div style={{ marginTop: "20%" }}>
                  <div className="d-flex justify-content-center mt-2 mb-4">
                    <Typography sx={{ fontSize: 18 }}>P A Y M E N T</Typography>
                  </div>
                  <div>
                    <Elements
                      stripe={stripPromise}
                      options={{ clientSecret: cilentSecretKey }}
                    >
                      <CheckoutForm
                        ticketid={id}
                        paymentMethod={paymentMethod}
                        paymentIntentKey={pik}
                        clientSecret={cilentSecretKey}
                      />
                    </Elements>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div class="ticket">
                  <div class="holes-top"></div>
                  <div class="title">
                    <p class="cinema">INOX CINEMA PRESENTS</p>
                    <p class="movie-title">{ticketData.movie_title + " "}</p>
                  </div>

                  <div className="row">
                    <div className="col-sm-7">
                      <img
                        style={{ width: "170px", height: "250px" }}
                        class="poster"
                        src={ticketData.poster_api}
                        alt="Movie: Only God Forgives"
                      />
                    </div>

                    <div className="col-sm-5 mt-4">
                      <div class="seat" className="mb-3">
                        <div className="row">
                          <th style={{ fontSize: "22px" }}>SEAT</th>
                        </div>
                        <div className="row">
                          <th>{ticketData.seat + " "}</th>
                        </div>
                      </div>

                      <div class="date">
                        <div className="row">
                          <th style={{ fontSize: "22px" }}>DATE</th>
                        </div>
                        <div className="row">
                          <th>
                            {" "}
                            {moment(ticketData.show_datetime).format("l")}
                          </th>
                        </div>
                      </div>
                      <div class="time">
                        <div className="row">
                          <th style={{ fontSize: "22px" }}>TIME</th>
                        </div>
                        <div className="row">
                          <th>
                            {moment(ticketData.show_datetime).format("LT")}
                          </th>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="info">
                    {ticketData.discount && (
                      <div className="row d-flex justify-content-between mr-2 ml-2">
                        <th className="">SAVING</th>
                        {ticketData.discount && (
                          <th className="">₹{ticketData.discount}</th>
                        )}
                      </div>
                    )}

                    {ticketData.promo_name && (
                      <div className="row d-flex justify-content-between mr-2 ml-2">
                        <div>
                          <th className="">PROMO USED</th>
                        </div>
                        {ticketData.discount && (
                          <div>
                            <th className="">{ticketData.promo_name}</th>
                          </div>
                        )}
                      </div>
                    )}

                    <Divider
                      className=" mt-3 mb-3"
                      sx={{ borderStyle: "dashed" }}
                    />
                    <div className="row mt-2 d-flex justify-content-between">
                      <div>
                        <th className="col-md-6">PAYABLE AMOUNT</th>
                      </div>
                      <div>
                        <th className="col-md-6">₹{ticketData.price}</th>
                      </div>
                    </div>
                  </div>

                  <div class="holes-lower"></div>
                  <div class="serial">
                    <div
                      class="qrcode"
                      className="d-flex justify-content-center"
                    >
                      <QRCode
                        id="qrCodeImage"
                        value={ticketData}
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>
                    <table class="numbers"></table>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </Layout>
      )}
    </>
  );
};

export default Payment;
