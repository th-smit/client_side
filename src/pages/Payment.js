import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import Typography from "@mui/material/Typography";

const Payment = () => {
  const [stripPromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log("helooooooooooooo");
    try {
      const key = axios
        .get("/config")
        .then((result) => {
          setStripePromise(loadStripe(result.data.publishableKey));
          console.log(result.data.publishableKey);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
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
  }, []);

  return (
    <div style={{ margin: "100px" }}>
      <div>
        <div className="d-flex justify-content-center mt-2 mb-4">
          <Typography sx={{ fontSize: 18 }}>P A Y M E N T</Typography>
        </div>
        <div
          //   style={{ backgroundColor: "#D3D3D3" }}
          className="d-flex justify-content-center"
        >
          <div className="">
            {stripPromise && clientSecret && (
              <Elements stripe={stripPromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
