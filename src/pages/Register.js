import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setHeader } from "./Utils";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const submitRegisterDetails = async (values) => {
    delete values.confirmpassword;
    try {
      const userData = await axios.post("/users/register", values);
      localStorage.setItem("token", userData.data.successMessage.token);
      localStorage.setItem("role", userData.data.successMessage.user.role);
      localStorage.setItem("name", userData.data.successMessage.user.name);
      localStorage.setItem("email", userData.data.successMessage.user.email);
      setHeader(localStorage.getItem("token"));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="register-page">
        <Form layout="vertical" onFinish={submitRegisterDetails}>
          <h2>Register Form</h2>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              { min: 3 },
              { max: 40 },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
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
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                pattern: new RegExp(
                  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,10}$/
                ),
                message:
                  "must be contain 1 small , 1 capital \n 1 special character 1 digit",
              },
              {
                min: 4,
              },
              {
                max: 10,
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please enter your confirm password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("the two passwords does not match");
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your confirm password" />
          </Form.Item>

          <div className="d-flex justify-content-between flex-column">
            <Link to="/login" className="mb-2">
              Already registred ? click here to login
            </Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
