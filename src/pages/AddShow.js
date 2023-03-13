import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setHeader } from "./Utils";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { message } from "antd";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const AddShow = () => {
  const navigate = useNavigate();
  const [datetime, setDateTime] = React.useState(dayjs(new Date()));
  const [moviedata, setMovieData] = useState(null);

  var { title } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onAddShowDetailSubmit = async (values) => {
    try {
      values.datetime = datetime;
      values.hour = parseInt(moviedata.hour);
      values.minute = parseInt(moviedata.minute);
      console.log(values);
      setHeader(localStorage.getItem("token"));
      await axios.post("/show", values);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.errorMessage.err);
      message.error(error.response.data.errorMessage.err);

      navigate(-1);
    }
  };

  useEffect(() => {
    getMovieRecord();
    if (!(localStorage.getItem("role") === "admin")) {
      navigate("/");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setValue("title", title);
    }
  }, []);

  const getMovieRecord = async () => {
    console.log(title);
    const movieDetails = await axios.get(`/movie?title=${title}`);

    console.log(movieDetails.data.successMessage[0]);
    setMovieData(movieDetails.data.successMessage[0]);
  };

  const handleDateTime = (newDateValue) => {
    setDateTime(newDateValue);
    console.log(newDateValue);
  };

  const onBack = async () => {
    navigate(-1);
  };

  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onAddShowDetailSubmit)}>
        <h3>Add Movies Show</h3>
        <label htmlFor="title">Movie Title : &nbsp;</label>
        <input
          type="text"
          readOnly={true}
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
                // minDate={new Date()}
                disablePast
                onChange={handleDateTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="mt-2">
              <TimePicker
                label="Time"
                value={datetime}
                // minTime={now.hours(now.hour()).minutes(now.minutes())}
                onChange={handleDateTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </div>
        <input type="submit" className="btn btn-primary mt-3" value="Add" />
        <div className="mt-2">
          <a
            className="btn btn-primary pointer-link text-white"
            onClick={() => onBack()}
          >
            &#60;- Back
          </a>
        </div>
      </form>
    </>
  );
};

export default AddShow;
