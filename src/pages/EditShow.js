import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setHeader, clearStorage } from "./Utils";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment/moment";

const EditShow = () => {
  const navigate = useNavigate();
  const movieData = useLocation().state.movieDetails;
  const [datetime, setDateTime] = useState(moment(movieData.datetime));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onEditShowDetailSubmit = async (values) => {
    try {
      values.datetime = datetime;
      setHeader(localStorage.getItem("token"));
      await axios.put(`/show/${movieData._id}`, values);
      navigate("/");
    } catch (error) {
      console.log(error);
      clearStorage();
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

  const handleDateTime = (newDateValue) => {
    setDateTime(newDateValue);
  };

  const onBack = async () => {
    navigate(-1);
  };

  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onEditShowDetailSubmit)}>
        <h3>Update Movie Show Details</h3>
        <label htmlFor="title">Movie Title : &nbsp;</label>
        <input
          type="text"
          disabled
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
        Show Date & Time:
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={datetime}
                onChange={handleDateTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="mt-2">
              <TimePicker
                label="Time"
                value={datetime}
                onChange={handleDateTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </div>
        <input type="submit" className="btn btn-primary mt-3" value="Update" />
        <div className="mt-2">
          <button
            className="btn btn-primary pointer-link"
            onClick={() => onBack()}
          >
            &#60;- Back
          </button>
        </div>
      </form>
    </>
  );
};

export default EditShow;
