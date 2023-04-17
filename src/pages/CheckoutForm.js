import { PaymentElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Alert } from "react-bootstrap";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    console.log("ticket id from the checkout form " + props.ticketid);
    // const ticketid = {
    //   ticketid: props.ticketid,
    // };
    // const ticketData = axios.put("/ticket", ticketid);
    e.preventDefault();

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
  };

  return (
    <div className="d-flex justify-content-center">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div
        // style={{ boxShadow: "10px 5px 5px black" }}
        >
          <div
            style={{
              padding: "10px",
              boxShadow: "10px 5px 5px #D6D6D6",
            }}
          >
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
        </div>

        <div className="mt-3" style={{ height: "10px" }}>
          {message && <Alert variant="danger">{message}</Alert>}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
