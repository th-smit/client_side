import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setHeader, clearStorage } from "./Utils";

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
      const updatedUserData = await axios.put("/users/userDetails", values);
      console.log(updatedUserData);
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
      <form className="App1" onSubmit={handleSubmit(onUserDetailSubmit)}>
        <h3>User Details</h3>
        <label htmlFor="name">User Name : &nbsp;</label>
        <input
          type="text"
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
        <input
          type="text"
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
          className="btn btn-primary"
          value="Update"
        />
        <input
          type="button"
          // disabled={disable}
          className="btn btn-primary mt-2"
          value="My Booking"
          onClick={() => onMyBooked()}
        />
        <div className="mt-2">
          <a className="pointer-link" onClick={() => onBack()}>
            &#60;- Back
          </a>
        </div>
      </form>
    </>
  );
};

export default UserDetails;
