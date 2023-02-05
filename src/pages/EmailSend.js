import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailSend = () => {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      console.log(values);
      await axios.post("http://localhost:8080/pwd/emailsend", values);
      localStorage.setItem("email", JSON.stringify(values.email));
      message.success("email verified");
      navigate("/otpverify");
    } catch (error) {
      message.error("Email does not exist");
    }
  };
  // useEffect(() => {
  //   if (localStorage.getItem("email")) {
  //     navigate("/");
  //   }
  // }, [navigate]);
  return (
    <div>
      <div className="register-page">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Enter Mail</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
            hasFeedback
          >
            <Input type="email" />
          </Form.Item>

          <div className="d-flex justify-content-between flex-column">
            <button className="btn btn-primary">Send</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EmailSend;
