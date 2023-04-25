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
import { MdArrowBackIos } from "react-icons/md";

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
      setHeader(localStorage.getItem("token"));
      await axios.post("/show", values);
      navigate("/");
    } catch (error) {
      message.error(error.response.data.errorMessage);
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
    const movieDetails = await axios.get(`/movie?title=${title}`);
    setMovieData(movieDetails.data.successMessage[0]);
  };

  const handleDateTime = (newDateValue) => {
    setDateTime(newDateValue);
  };

  const onBack = async () => {
    navigate(-1);
  };

  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onAddShowDetailSubmit)}>
        <div className="row">
          <a
            style={{ background: "#F6D3A3" }}
            className="btn col-md-1 ml-1"
            onClick={() => onBack()}
          >
            <MdArrowBackIos />
          </a>

          <span className="col-md-10">
            <h3>Add Movies Show</h3>
          </span>
        </div>
        <label htmlFor="title">Movie Title : &nbsp;</label>
        <TextField
          type="text"
          id="outlined-basic"
          label="Movie Title"
          variant="outlined"
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
        <p>Show Date & Time:</p>
        <div className="row mt-2 mb-2 d-flex justify-content-around">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="col-md-5">
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={datetime}
                disablePast
                onChange={handleDateTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="col-md-5">
              <TimePicker
                label="Time"
                value={datetime}
                onChange={handleDateTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </div>
        <input
          style={{ background: "#ff944d" }}
          type="submit"
          className="btn mt-3"
          value="Add"
        />
      </form>
    </>
  );
};

export default AddShow;
