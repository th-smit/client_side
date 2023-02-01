import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerify = () => {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    let myString = localStorage.getItem("email");
    myString = myString.replace(/["]/g, "");

    const valuess = {
      otp: values.otp,
      email: myString,
    };
    try {
      await axios.post("http://localhost:8080/pwd/otpverify", valuess);
      message.success("otp verified");
    } catch (error) {
      message.error("otp not verified");
    }
  };

  return (
    <div>
      <div className="register-page">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1 className="mb-3">otp</h1>
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
            <button className="btn btn-primary">Verify</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OtpVerify;
