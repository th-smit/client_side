import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerify = () => {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    let userEmail = localStorage.getItem("email");
    const userData = {
      otp: values.otp,
      email: userEmail,
    };
    console.log(userData);
    try {
      await axios.post("http://localhost:8080/pwd/otpverify", userData);
      message.success("otp verified");
      navigate("/forgotpassword");
    } catch (error) {
      message.error("Otp not verified");
    }
  };

  const Emailhandler = async () => {
    try {
      let userEmail = localStorage.getItem("email");
      console.log("from emailhandler");
      console.log(userEmail);
      await axios.post("http://localhost:8080/pwd/emailsend", {
        email: userEmail,
      });
      message.success("email verified");
      navigate("/otpverify");
    } catch (error) {
      message.error("Email does not exist");
    }
  };

  return (
    <div>
      <div className="register-page">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1 className="mb-3">Enter Otp</h1>
          <Form.Item
            label="Otp"
            name="otp"
            rules={[
              {
                required: true,
                message: "Please enter your otp",
              },
            ]}
            hasFeedback
          >
            <Input type="text" />
          </Form.Item>

          <div className="d-flex justify-content-between flex-column">
            <button
              onClick={() => Emailhandler()}
              className="mb-2 btn btn-primary"
            >
              Resend OTP
            </button>
            <button className="btn btn-primary">Verify</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OtpVerify;
