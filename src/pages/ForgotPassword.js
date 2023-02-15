import React from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const onEnterPasswordHandler = async (values) => {
    let userEmail = localStorage.getItem("email");
    const userData = {
      password: values.password,
      email: userEmail,
    };

    try {
      await axios.post("http://localhost:8080/pwd/changepassword", userData);
      navigate("/login");
    } catch (error) {
      message.error("Password not changed");
    }
  };

  return (
    <div>
      <div className="register-page">
        <Form layout="vertical" onFinish={onEnterPasswordHandler}>
          <h1 className="mb-3">Enter New Password</h1>
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

          <div className="d-flex justify-content-between flex-column">
            <button className="btn btn-primary">Confirm</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
