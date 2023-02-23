import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setHeader } from "./Utils";

const AddShow = () => {
  const navigate = useNavigate();
  const movieData = useLocation().state.movieDetails;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onAddShowDetailSubmit = async (values) => {
    try {
      console.log(values);
      setHeader(localStorage.getItem("token"));
      await axios.post("/show", values);
      navigate("/");
    } catch (error) {
      console.log(error);
      //clearStorage();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!(localStorage.getItem("role") === "admin")) {
      navigate("/");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setValue("title", movieData.title);
    }
  });

  const onBack = async () => {
    navigate("/");
  };

  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onAddShowDetailSubmit)}>
        <h3>Add Movies Show</h3>
        <label htmlFor="title">Movie Title : &nbsp;</label>
        <input
          type="text"
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
        />
        <p>
          {errors.title && (
            <span style={{ color: "red" }}>
              title is mandatory, must be length between 3-100{" "}
            </span>
          )}
        </p>

        <label htmlFor="title">Time: &nbsp;</label>
        <input
          type="text"
          {...register("time", {
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
        />

        <input type="submit" className="btn btn-primary mt-3" value="Add" />
        <div className="mt-2">
          <a className="pointer-link" onClick={() => onBack()}>
            &#60;- Back
          </a>
        </div>
      </form>
    </>
  );
};

export default AddShow;
