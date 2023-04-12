import { PaymentElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Alert } from "react-bootstrap";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
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

        <div className="mt-3" style={{ height: "10px" }}>
          {message && <Alert variant="danger">{message}</Alert>}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
