import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setHeader, clearStorage } from "./Utils";
import { MdArrowBackIos } from "react-icons/md";
import TextField from "@mui/material/TextField";

const UserDetails = () => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setValue("name", localStorage.getItem("name"));
      setValue("email", localStorage.getItem("email"));
    }
  }, []);

  const onUserDetailSubmit = async (values) => {
    setHeader(localStorage.getItem("token"));
    try {
      await axios.put("/users/userDetails", values);
      localStorage.setItem("name", values.name);
      navigate("/");
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/login");
    }
  };

  const onMyBooked = async () => {
    navigate("/mybooking");
  };

  const onBack = async () => {
    navigate("/");
  };

  return (
    <>
      <form className="App2" onSubmit={handleSubmit(onUserDetailSubmit)}>
        <div className="row">
          <button
            onClick={() => onBack()}
            style={{
              fontSize: "20px",
              background: "#F6D3A3",
              marginLeft: "2px",
            }}
            className="col-md-2"
          >
            <MdArrowBackIos />
          </button>
          <span style={{ marginLeft: "10px" }} className="col-md-7">
            {" "}
            <h3>User Details</h3>
          </span>
        </div>
        <label htmlFor="name">User Name : &nbsp;</label>
        <TextField
          type="text"
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          {...register("name", {
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
          onChange={(e) => {
            getValues("name") === e.target.value
              ? setDisable(true)
              : setDisable(false);
          }}
        />
        <p>
          {errors.name && (
            <span style={{ color: "red" }}>
              title is mandatory, must be length between 3-100{" "}
            </span>
          )}
        </p>

        <label htmlFor="email">Email: &nbsp;</label>
        <TextField
          type="text"
          id="outlined-basic"
          label="User Email"
          variant="outlined"
          disabled={true}
          {...register("email", {
            required: true,
          })}
        />
        <p>
          {errors.description && (
            <span style={{ color: "red" }}>
              description is mandatory, must be length between 3-5000{" "}
            </span>
          )}
        </p>

        <input
          type="submit"
          disabled={disable}
          style={{ background: "#f7b067" }}
          className="btn"
          value="Update"
        />
        <input
          type="button"
          // disabled={disable}
          style={{ background: "#f7b067" }}
          className="btn mt-2"
          value="My Booking"
          onClick={() => onMyBooked()}
        />
        {/* <div className="mt-2">
          <button
            className="btn btn-primary pointer-link"
            onClick={() => onBack()}
          >
            &#60;- Back
          </button>
        </div> */}
      </form>
    </>
  );
};

export default UserDetails;
