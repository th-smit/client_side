import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { message } from "antd";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorage, setHeader } from "./Utils";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ButtonCom from "../component/Button/ButtonCom";

function AddMovie() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState([]);
  const [format, setFormat] = useState([]);
  const [date, setDate] = React.useState(dayjs(new Date()));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDate = (newDateValue) => {
    setDate(newDateValue);
    console.log(newDateValue);
  };

  useForm({
    defaultValues: {
      checkbox: false,
    },
  });

  const onAddMovieDetailSubmit = async (values) => {
    try {
      if (language.length === 0 || format.length === 0) {
        throw new Error("array is empty");
      } else {
        values.language = language;
        values.format = format;
        values.date = date;
        setHeader(localStorage.getItem("token"));
        await axios.post("/movie", values);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.errorMessage);
      navigate("/");
      // clearStorage();
      // navigate("/login");
    }
  };

  useEffect(() => {
    if (!(localStorage.getItem("role") === "admin")) {
      navigate("/");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  const onBack = async () => {
    navigate("/");
  };

  const handleLanguage = async (e) => {
    if (language.includes(e.target.value)) {
      setLanguage(language.filter((value) => value !== e.target.value));
      e.target.style.backgroundColor = "#efefef";
    } else {
      setLanguage([...language, e.target.value]);
      e.target.style.backgroundColor = "lightblue";
    }
  };

  const handleFormat = async (e) => {
    if (format.includes(e.target.value)) {
      setFormat(format.filter((value) => value !== e.target.value));
      e.target.style.backgroundColor = "#efefef";
    } else {
      setFormat([...format, e.target.value]);
      e.target.style.backgroundColor = "lightblue";
    }
  };
  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onAddMovieDetailSubmit)}>
        <h3 className="title">Add Movies</h3>
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
        <label htmlFor="description">Description : &nbsp;</label>
        <textarea
          type="text"
          {...register("description", {
            required: true,
            minLength: 3,
            maxLength: 5000,
          })}
        />
        <p>
          {errors.description && (
            <span style={{ color: "red" }}>
              description is mandatory, must be length between 3-5000{" "}
            </span>
          )}
        </p>
        <label htmlFor="poster_api">Poster_API : &nbsp;</label>
        <input
          type="text"
          {...register("poster_api", {
            required: true,
          })}
        />
        <p>
          {errors.poster_api && (
            <span style={{ color: "red" }}>poster_api is mandatory</span>
          )}
        </p>
        <label htmlFor="movie_type">Movie Type : &nbsp;</label>
        <input
          type="text"
          {...register("movie_type", {
            required: true,
            minLength: 4,
            maxLength: 50,
          })}
        />
        <p>
          {errors.movie_type && (
            <span style={{ color: "red" }}>
              Movie type is mandatory must be length between 4-50{" "}
            </span>
          )}
        </p>
        <div>
          <label htmlFor="is_released">Is_Released ? &nbsp;</label>
          <input type="checkbox" {...register("is_released")}></input>
        </div>
        <div>
          Release Date:
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={date}
                disablePast
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div>
          Movie Length :
          <div>
            <label htmlFor="hour">Hour : &nbsp;</label>
            <input
              className="w-25 mr-1"
              type="text"
              {...register("hour", {
                required: true,
              })}
            />
            <label htmlFor="minute">Minute : &nbsp;</label>
            <input
              className="w-25"
              type="text"
              {...register("minute", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="mt-4">
          Language :&nbsp;
          <input
            type="button"
            value="Hindi"
            className="mr-2"
            onClick={handleLanguage}
          />
          <input
            type="button"
            value="English"
            className="mr-2"
            onClick={handleLanguage}
          />
          <input
            type="button"
            value="Tamil"
            className="mr-2"
            onClick={handleLanguage}
          />
          <input
            type="button"
            value="Malayalam"
            className="mr-2"
            onClick={handleLanguage}
          />
          <input
            type="button"
            value="Telugu"
            className="mr-2"
            onClick={handleLanguage}
          />
        </div>
        <div className="mt-2">
          Format : &nbsp;
          <ButtonCom value="2D" onHandleFormat={handleFormat} />
          <ButtonCom value="3D" onHandleFormat={handleFormat} />
          <ButtonCom value="4DX" onHandleFormat={handleFormat} />
        </div>
        <input type="submit" className="btn btn-primary mt-3" value="Add" />
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
}
export default AddMovie;
