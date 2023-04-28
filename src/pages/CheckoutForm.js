import { message } from "antd";
import {
  PaymentElement,
  LinkAuthenticationElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { GoChevronRight } from "react-icons/go";

import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message1, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();

  const [display, setDisplay] = useState("new");
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    setMethod();
    setClientSecret(props.clientSecret);
  }, []);

  const setMethod = async () => {
    console.log("h1");
    console.log("props ", props.paymentMethod);
    setPaymentMethod(props.paymentMethod);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ticket id is ", props.ticketid);
    const ticketData = await axios.get(`/ticket?ticket_id=${props.ticketid}`);

    console.log("ticket data is ", ticketData);
    console.log(
      "pending status ",
      ticketData.data.successMessage.pending_status
    );
    if (ticketData.data.successMessage[0].pending_status) {
      if (display === "new") {
        if (!stripe || !elements) {
          return;
        }

        setIsProcessing(true);
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/completion/${props.ticketid}`,
          },
        });
        if (error) {
          setMessage(error.message);
        }

        setIsProcessing(false);
      } else {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: display,
          payment_method_options: {
            card: {
              cvc: elements.getElement(CardCvcElement),
            },
          },
        });

        if (result.error) {
          console.log(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            navigate(`/completion/${props.ticketid}`);
          }
        }
      }
    } else {
      console.log("ticket is ", ticketData.data.successMessage[0]._id);
      message.success("payment already paid");
      navigate(`/completion/${props.ticketid}`);
    }
  };

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setDisplay(event.target.value);
  };

  return (
    <>
      {paymentMethod && (
        <RadioGroup
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className="d-flex justify-content-left"
          onChange={handleRadioChange}
        >
          <form id="payment-form" className="" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-left">
              <div>
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="new payment"
                ></FormControlLabel>
                <br />
                {display === "new" && (
                  <div
                    style={{
                      padding: "10px",
                      boxShadow: "10px 5px 5px #D6D6D6",
                    }}
                  >
                    <LinkAuthenticationElement
                      options={{
                        defaultValues: {
                          email: localStorage.getItem("email"),
                        },
                      }}
                    />

                    <PaymentElement />
                    <button
                      disabled={isProcessing}
                      id="submit"
                      className="mt-4 d-flex justify-content-center"
                      style={{
                        height: "30px",
                        width: "400px",
                        backgroundColor: "#ccd6db",
                      }}
                    >
                      {isProcessing ? "Processing" : "Pay now"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ height: "10px" }}>
              {message1 && <Alert variant="danger">{message1}</Alert>}
            </div>
          </form>

          <List>
            {paymentMethod.map((paymentMethod) => {
              return (
                <span>
                  <ListItemButton
                  // sx={{ bgcolor: "#C5C5C5" }}
                  >
                    <span className="row">
                      <FormControlLabel
                        value={paymentMethod.id}
                        label={`${paymentMethod.card.brand}`}
                        control={<Radio />}
                      ></FormControlLabel>

                      <span className="mt-2">
                        {paymentMethod.card.brand === "visa" ? (
                          <img
                            className="mr-3"
                            src="/images/Visa_Inc._logo.svg.webp"
                            alt="logo"
                            style={{ width: "40px", height: "13px" }}
                          />
                        ) : (
                          <img
                            className=" mr-3"
                            src="/images/MasterCard_Logo.svg.png"
                            alt="logo"
                            style={{ width: "40px", height: "20px" }}
                          />
                        )}{" "}
                        **** **** **** {paymentMethod.card.last4}
                      </span>

                      {display === paymentMethod.id && (
                        <form
                          className="row"
                          id="payment-form"
                          onSubmit={handleSubmit}
                        >
                          <span
                            style={{
                              width: "60px",
                              marginTop: "12px",
                              marginLeft: "50px",
                            }}
                          >
                            <CardCvcElement />
                          </span>
                          <span
                            style={{
                              marginTop: "5px",
                              fontSize: "25px",
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: "transparent",
                              }}
                            >
                              {" "}
                              <GoChevronRight />
                            </button>
                          </span>
                        </form>
                      )}
                    </span>
                  </ListItemButton>
                </span>
              );
            })}
          </List>
        </RadioGroup>
      )}
    </>
  );
};

export default CheckoutForm;
