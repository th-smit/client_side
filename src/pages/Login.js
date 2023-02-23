import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setHeader } from "./Utils";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onLoginButtonClick = async (values) => {
    console.log(values);
    try {
      const newUserData = await axios.post("/users/login", values);
      localStorage.setItem("role", newUserData.data.successMessage.user.role);
      localStorage.setItem("email", values.email);
      localStorage.setItem("token", newUserData.data.successMessage.token);
      localStorage.setItem("name", newUserData.data.successMessage.user.name);
      setHeader(newUserData.data.successMessage.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="register-page">
        <Form layout="vertical" onFinish={onLoginButtonClick}>
          <h1>login form</h1>
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
            <Input.Password type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between flex-column">
            <Link to="/register" className="mb-2">
              Not have a account ? click here to register
            </Link>

            <Link to="/emailsend" className="mb-2">
              Forgot password
            </Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
