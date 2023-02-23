import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setHeader } from "./Utils";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const EditMovieDetails = () => {
  const navigate = useNavigate();
  const movieData = useLocation().state.movieData;

  const [language, setLanguage] = useState(movieData.language);
  const [format, setFormat] = useState(movieData.format);
  const [date, setDate] = useState(dayjs(movieData.date));

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDate = (newDateValue) => {
    setDate(newDateValue);
    console.log(newDateValue);
  };

  useEffect(() => {
    console.log(dayjs(movieData.date));
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (movieData === null) {
      navigate("/");
    } else {
      setValue("title", movieData.title);
      setValue("description", movieData.description);
      setValue("movie_type", movieData.movie_type);
      setValue("poster_api", movieData.poster_api);
      setValue("is_released", movieData.is_released);
      setValue("hour", movieData.hour);
      setValue("minute", movieData.minute);
    }
  }, []);

  const onEditMovieDetailSubmit = async (values) => {
    try {
      values.language = language;
      values.format = format;
      values.date = date;
      console.log("updated value" + values);
      setHeader(localStorage.getItem("token"));
      const newUserData = await axios.put(`/movie/${movieData._id}`, values);
      console.log(newUserData);
      navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const onBack = async () => {
    navigate("/moviedetails", {
      state: {
        movie: movieData,
      },
    });
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
      <form className="App1" onSubmit={handleSubmit(onEditMovieDetailSubmit)}>
        <h3 className="title">Edit Movie Details</h3>
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
                sx={{ backgroundColor: "white" }}
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={date}
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
            style={{
              background: language.includes("Hindi") ? "lightblue" : "#efefef",
            }}
            className="mr-2"
            onClick={handleLanguage}
          />
          <input
            type="button"
            value="English"
            style={{
              background: language.includes("English")
                ? "lightblue"
                : "#efefef",
            }}
            className="mr-2"
            onClick={handleLanguage}
          />
          <input
            type="button"
            value="Tamil"
            style={{
              background: language.includes("Tamil") ? "lightblue" : "#efefef",
            }}
            className="mr-2"
            onClick={handleLanguage}
          />
          <input
            type="button"
            value="Malayalam"
            style={{
              background: language.includes("Malayalam")
                ? "lightblue"
                : "#efefef",
            }}
            className="mr-2"
            onClick={handleLanguage}
          />
          <input
            type="button"
            value="Telugu"
            style={{
              background: language.includes("Telugu") ? "lightblue" : "#efefef",
            }}
            className="mr-2"
            onClick={handleLanguage}
          />
        </div>
        <div className="mt-2">
          Format : &nbsp;
          <input
            type="button"
            value="2D"
            style={{
              background: format.includes("2D") ? "lightblue" : "#efefef",
            }}
            className="mr-2"
            onClick={handleFormat}
          />
          <input
            type="button"
            value="3D"
            style={{
              background: format.includes("3D") ? "lightblue" : "#efefef",
            }}
            className="mr-2"
            onClick={handleFormat}
          />
          <input
            type="button"
            value="4DX"
            style={{
              background: format.includes("4DX") ? "lightblue" : "#efefef",
            }}
            className="mr-2"
            onClick={handleFormat}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Update" />
        <div className="mt-2">
          <a className="pointer-link" onClick={() => onBack()}>
            &#60;- Back
          </a>
        </div>
      </form>
    </>
  );
};

export default EditMovieDetails;
